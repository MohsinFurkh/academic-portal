import { db, ensureAuth } from "./firebase-config.js";
import {
  collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc,
  increment, arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  normalizeQuestions, gradeAttempt, shuffle, safeId, fmtTime,
} from "./common.js";

// ---- DOM ----
const $ = (id) => document.getElementById(id);
const views = {
  login: $("loginView"), ready: $("readyView"),
  quiz: $("quizView"), result: $("resultView"),
};
function show(name) {
  Object.entries(views).forEach(([k, el]) => el.classList.toggle("hidden", k !== name));
}
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}

// ---- State ----
let quizzes = [];          // active quiz docs
let quiz = null;           // selected quiz (normalized questions attached)
let attemptRef = null;     // Firestore doc ref for this attempt
let attemptId = null;
let answers = {};          // { qid: [keys] }
let order = [];            // question display order (ids)
let tabSwitches = 0;
let timerHandle = null;
let deadline = 0;          // epoch ms
let submitting = false;
let saveTimer = null;

// ---- Boot ----
init();
async function init() {
  await ensureAuth();
  await loadQuizzes();
  $("startBtn").addEventListener("click", onContinue);
  $("beginBtn").addEventListener("click", onBegin);
  $("submitBtn").addEventListener("click", () => confirmSubmit(false));
  $("submitBtn2").addEventListener("click", () => confirmSubmit(false));
}

async function loadQuizzes() {
  const sel = $("quizSelect");
  try {
    const q = query(collection(db, "quizzes"), where("active", "==", true));
    const snap = await getDocs(q);
    quizzes = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (quizzes.length === 0) {
      sel.innerHTML = `<option value="">No active quizzes right now</option>`;
      return;
    }
    sel.innerHTML = quizzes
      .map((z) => `<option value="${z.id}">${escapeHtml(z.title)} (${z.durationMinutes} min)</option>`)
      .join("");
  } catch (e) {
    console.error(e);
    sel.innerHTML = `<option value="">Could not load quizzes</option>`;
    msg($("loginMsg"), "Could not reach the quiz server. Check your connection / Firebase config.", "err");
  }
}

// ---- Step 1 -> 2 ----
async function onContinue() {
  const name = $("name").value.trim();
  const sapId = $("sapId").value.trim();
  const quizId = $("quizSelect").value;
  if (!name) return msg($("loginMsg"), "Please enter your name.");
  if (!sapId) return msg($("loginMsg"), "Please enter your SAP ID.");
  if (!quizId) return msg($("loginMsg"), "Please select a quiz.");
  msg($("loginMsg"), "");

  $("startBtn").disabled = true;
  try {
    const zdoc = await getDoc(doc(db, "quizzes", quizId));
    if (!zdoc.exists()) throw new Error("Quiz not found");
    quiz = { id: quizId, ...zdoc.data() };
    quiz.questions = normalizeQuestions(quiz.questions);

    attemptId = `${quizId}__${safeId(sapId)}`;
    attemptRef = doc(db, "attempts", attemptId);
    const existing = await getDoc(attemptRef);

    if (existing.exists() && existing.data().status === "submitted") {
      $("startBtn").disabled = false;
      return msg($("loginMsg"),
        "You have already submitted this quiz. You cannot take it again.", "warn");
    }

    $("whoami").textContent = `${name} · ${sapId}`;
    window.__student = { name, sapId };

    if (existing.exists() && existing.data().status === "in-progress") {
      // Resume the same attempt
      await resume(existing.data());
    } else {
      showReady();
    }
  } catch (e) {
    console.error(e);
    msg($("loginMsg"), "Something went wrong starting the quiz. Please try again.");
  } finally {
    $("startBtn").disabled = false;
  }
}

function showReady() {
  $("readyTitle").textContent = quiz.title;
  $("readyMeta").textContent =
    `${quiz.questions.length} questions · ${quiz.durationMinutes} minutes · ${quiz.marksPerQuestion} mark(s) each`;
  const instr = quiz.instructions || "";
  $("readyInstructions").style.display = instr ? "block" : "none";
  $("readyInstructions").textContent = instr;
  show("ready");
}

// ---- Step 2 -> 3 (fresh start) ----
async function onBegin() {
  $("beginBtn").disabled = true;
  const now = Date.now();
  order = (quiz.shuffle ? shuffle(quiz.questions) : quiz.questions).map((q) => q.id);
  answers = {};
  tabSwitches = 0;

  await setDoc(attemptRef, {
    quizId: quiz.id,
    quizTitle: quiz.title,
    name: window.__student.name,
    sapId: window.__student.sapId,
    status: "in-progress",
    startedAt: now,
    submittedAt: null,
    durationMinutes: quiz.durationMinutes,
    tabSwitches: 0,
    tabSwitchLog: [],
    answers: {},
    score: null,
    maxScore: quiz.questions.length * quiz.marksPerQuestion,
    autoSubmitted: false,
  });

  deadline = now + quiz.durationMinutes * 60 * 1000;
  persistLocal();
  enterQuiz();
}

// ---- Resume an interrupted attempt ----
async function resume(data) {
  answers = data.answers || {};
  tabSwitches = data.tabSwitches || 0;
  order = quiz.questions.map((q) => q.id); // keep stable order on resume
  deadline = data.startedAt + (data.durationMinutes || quiz.durationMinutes) * 60 * 1000;
  persistLocal();
  enterQuiz();
}

// ---- Enter quiz screen ----
function enterQuiz() {
  $("quizViewTitle").textContent = quiz.title;
  $("switchCount").textContent = tabSwitches;
  renderQuestions();
  addWatermark();
  enableAntiCheat();
  startTimer();
  show("quiz");

  if (Date.now() >= deadline) confirmSubmit(true); // time already gone (resume edge case)
}

// ---- Render ----
function renderQuestions() {
  const byId = Object.fromEntries(quiz.questions.map((q) => [q.id, q]));
  const container = $("questions");
  container.innerHTML = order.map((qid, i) => {
    const q = byId[qid];
    const type = q.multi ? "checkbox" : "radio";
    const opts = q.options.map((o) => {
      const checked = (answers[qid] || []).includes(o.key);
      return `
        <label class="opt ${checked ? "checked" : ""}" data-qid="${qid}" data-key="${o.key}">
          <input type="${type}" name="q_${qid}" value="${o.key}" ${checked ? "checked" : ""} />
          <span><span class="key">${escapeHtml(o.key)}.</span> ${escapeHtml(o.text)}</span>
        </label>`;
    }).join("");
    return `
      <div class="card q-block" id="qc_${qid}">
        <div class="q-num">QUESTION ${i + 1} OF ${order.length}${q.multi ? " · select all that apply" : ""}</div>
        <div class="q-text">${escapeHtml(q.question)}</div>
        ${opts}
      </div>`;
  }).join("");

  container.querySelectorAll(".opt").forEach((el) => {
    el.addEventListener("click", (ev) => {
      // let the native input toggle, then read state
      setTimeout(() => onAnswerChange(el.dataset.qid), 0);
    });
  });
  renderDots();
}

function onAnswerChange(qid) {
  const inputs = document.querySelectorAll(`input[name="q_${qid}"]`);
  const sel = [];
  inputs.forEach((inp) => { if (inp.checked) sel.push(inp.value); });
  answers[qid] = sel;
  // reflect checked styling
  document.querySelectorAll(`#qc_${qid} .opt`).forEach((el) => {
    const on = sel.includes(el.dataset.key);
    el.classList.toggle("checked", on);
  });
  renderDots();
  persistLocal();
  scheduleSave();
}

function renderDots() {
  $("dots").innerHTML = order.map((qid, i) => {
    const answered = (answers[qid] || []).length > 0;
    return `<button class="dot ${answered ? "answered" : ""}" data-qid="${qid}">${i + 1}</button>`;
  }).join("");
  $("dots").querySelectorAll(".dot").forEach((d) => {
    d.addEventListener("click", () => {
      document.getElementById(`qc_${d.dataset.qid}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

// ---- Timer ----
function startTimer() {
  updateTimer();
  timerHandle = setInterval(updateTimer, 1000);
}
function updateTimer() {
  const remain = Math.round((deadline - Date.now()) / 1000);
  const t = $("timer");
  t.textContent = fmtTime(remain);
  t.classList.toggle("low", remain <= 60);
  if (remain <= 0) {
    clearInterval(timerHandle);
    confirmSubmit(true); // auto-submit
  }
}

// ---- Anti-cheat ----
const block = (e) => { e.preventDefault(); return false; };
let visHandler, blurHandler, lastSwitchTs = 0;

function enableAntiCheat() {
  ["copy", "cut", "paste", "contextmenu"].forEach((evt) =>
    document.addEventListener(evt, block));
  document.addEventListener("keydown", keyGuard, true);

  // Tab switch / minimize detection (debounced so vis+blur don't double count)
  visHandler = () => { if (document.hidden) registerSwitch(); };
  blurHandler = () => registerSwitch();
  document.addEventListener("visibilitychange", visHandler);
  window.addEventListener("blur", blurHandler);
  window.addEventListener("beforeunload", beforeUnload);
}
function disableAntiCheat() {
  ["copy", "cut", "paste", "contextmenu"].forEach((evt) =>
    document.removeEventListener(evt, block));
  document.removeEventListener("keydown", keyGuard, true);
  document.removeEventListener("visibilitychange", visHandler);
  window.removeEventListener("blur", blurHandler);
  window.removeEventListener("beforeunload", beforeUnload);
  document.querySelector(".wm")?.remove();
}
function keyGuard(e) {
  // block Ctrl/Cmd + C/V/X/A/P and Ctrl+U (view source)
  if ((e.ctrlKey || e.metaKey) && ["c", "v", "x", "a", "p", "u", "s"].includes(e.key.toLowerCase())) {
    e.preventDefault();
    return false;
  }
}
function beforeUnload(e) {
  if (submitting) return;
  e.preventDefault();
  e.returnValue = "";
}

function registerSwitch() {
  if (submitting) return;
  const now = Date.now();
  if (now - lastSwitchTs < 800) return; // debounce duplicate events
  lastSwitchTs = now;
  tabSwitches += 1;
  $("switchCount").textContent = tabSwitches;
  // persist to Firestore (atomic increment) + log the moment
  updateDoc(attemptRef, {
    tabSwitches: increment(1),
    tabSwitchLog: arrayUnion(now),
  }).catch((err) => console.warn("switch save failed", err));
  persistLocal();
}

function addWatermark() {
  const wm = document.createElement("div");
  wm.className = "wm";
  wm.textContent = `${window.__student.sapId} · ${window.__student.name}`;
  document.body.appendChild(wm);
}

// ---- Save (debounced answer autosave) ----
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    updateDoc(attemptRef, { answers }).catch((e) => console.warn("answer save failed", e));
  }, 900);
}
function persistLocal() {
  localStorage.setItem("quizAttempt", JSON.stringify({
    attemptId, quizId: quiz.id, answers, tabSwitches, deadline,
  }));
}

// ---- Submit ----
function confirmSubmit(auto) {
  if (submitting) return;
  if (!auto) {
    const unanswered = order.filter((qid) => (answers[qid] || []).length === 0).length;
    const note = unanswered ? `\n\nYou have ${unanswered} unanswered question(s).` : "";
    if (!window.confirm(`Submit your quiz now?${note}`)) return;
  }
  doSubmit(auto);
}

async function doSubmit(auto) {
  submitting = true;
  clearInterval(timerHandle);
  disableAntiCheat();

  const result = gradeAttempt(quiz.questions, answers, quiz.marksPerQuestion, quiz.negativeMarks || 0);
  try {
    await updateDoc(attemptRef, {
      status: "submitted",
      submittedAt: Date.now(),
      answers,
      tabSwitches,
      score: result.score,
      maxScore: result.maxScore,
      correctCount: result.correctCount,
      totalQuestions: result.total,
      autoSubmitted: !!auto,
    });
  } catch (e) {
    console.error("submit failed", e);
  }
  localStorage.removeItem("quizAttempt");

  $("resultMeta").textContent = auto
    ? "Time expired — your answers were submitted automatically."
    : "Your answers have been recorded.";
  $("rScore").textContent = `${result.score} / ${result.maxScore}`;
  $("rCorrect").textContent = `${result.correctCount} / ${result.total}`;
  $("rSwitches").textContent = tabSwitches;
  show("result");
}

// ---- utils ----
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
