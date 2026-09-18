import { db, ensureAuth } from "../quiz/firebase-config.js";
import {
  collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc,
  increment, arrayUnion, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  safeId, fmtTime, escapeHtml, readingSeconds, attemptMinutes, extraMinutes,
  validMobile, validEmail,
  IMG_MAX_PER_ATTEMPT, IMG_MAX_PER_QUESTION, MAX_ANSWER_CHARS,
} from "./common.js";
import { createEditor } from "./editor.js";
import { createProctor, goFullscreen, exitFullscreen } from "./proctor.js";

// ---------------------------------------------------------------------------
// Student runner for a descriptive (written-answer) class test
//   * answers are typed, never pasted in — see proctor.js and editor.js
//   * diagrams live in a subcollection, not in the attempt document
//   * all timing comes from the Firestore server clock, not the device clock
//   * marks are never computed here; the faculty dashboard evaluates the paper
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
const views = {
  login: $("loginView"), ready: $("readyView"),
  exam: $("examView"), result: $("resultView"), rescue: $("rescueView"),
};
function show(name) {
  Object.entries(views).forEach(([k, el]) => el.classList.toggle("hidden", k !== name));
}
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}

// ---- State ----
let exams = [];
let exam = null;
let attemptRef = null;
let attemptId = null;
let uid = null;
let answers = {};          // { qid: sanitized html, images stripped }
let wordCounts = {};       // { qid: number }
let order = [];
let editors = {};          // { qid: editor instance }
let violations = 0;
let maxViolations = 3;
let typedChars = 0;
let pasteAttempts = 0;
let loggedEvents = 0;
let imageCount = 0;
let timerHandle = null;
let heartbeatHandle = null;
let deadlineAt = 0;        // SERVER time
let clockOffset = 0;       // serverNow - Date.now()
let grantedExtra = 0;
let submitting = false;
let finished = false;
let saveTimer = null;
let paused = false;
let pendingWrites = 0;

const LS_KEY = "examAttempt_v1";
const MAX_LOGGED_EVENTS = 80;   // keeps the attempt document small
const now = () => Date.now() + clockOffset;

// ---- Boot ----
init();
async function init() {
  const user = await ensureAuth();
  uid = user ? user.uid : null;
  await loadExams();
  $("startBtn").addEventListener("click", onContinue);
  $("beginBtn").addEventListener("click", onBegin);
  $("agree").addEventListener("change", syncBeginBtn);
  $("submitBtn").addEventListener("click", () => confirmSubmit("manual"));
  $("submitBtn2").addEventListener("click", () => confirmSubmit("manual"));
  $("resumeBtn").addEventListener("click", resumeFromViolation);
  $("retryBtn").addEventListener("click", () => doSubmit(lastSubmitReason, true));
  $("downloadBtn").addEventListener("click", downloadPaper);

  if (!document.documentElement.requestFullscreen) {
    $("fsWarn").innerHTML =
      "⚠ This browser does not support full screen. Please switch to Chrome, Edge or Firefox on a laptop.";
  }
}

async function loadExams() {
  const sel = $("examSelect");
  try {
    const q = query(collection(db, "exams"), where("active", "==", true));
    const snap = await getDocs(q);
    exams = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (exams.length === 0) {
      sel.innerHTML = `<option value="">No active tests right now</option>`;
      return;
    }
    sel.innerHTML = exams
      .map((z) => `<option value="${z.id}">${escapeHtml(z.title)} (${z.durationMinutes} min)</option>`)
      .join("");
    sel.addEventListener("change", paintDomainHint);
    paintDomainHint();
  } catch (e) {
    console.error(e);
    sel.innerHTML = `<option value="">Could not load tests</option>`;
    msg($("loginMsg"), "Could not reach the test server. Check your connection.", "err");
  }
}

function selectedExam() {
  return exams.find((z) => z.id === $("examSelect").value) || null;
}

function paintDomainHint() {
  const z = selectedExam();
  const list = (z && z.emailDomains) || [];
  $("domainHint").innerHTML = list.length
    ? `Must be your college address — ending in ${list.map((d) => `<b>@${escapeHtml(d)}</b>`).join(" or ")}.`
    : "Use the email address your instructor has on record for you.";
}

// ---- Step 1 -> 2 ----
async function onContinue() {
  const name = $("name").value.trim();
  const sapId = $("sapId").value.trim();
  const rawMobile = $("mobile").value.trim();
  const rawEmail = $("email").value.trim();
  const examId = $("examSelect").value;

  if (!name || name.length < 3) return msg($("loginMsg"), "Please enter your full name.");
  if (!sapId) return msg($("loginMsg"), "Please enter your SAP ID.");
  if (!examId) return msg($("loginMsg"), "Please select a test.");

  const mobile = validMobile(rawMobile);
  if (!mobile) {
    return msg($("loginMsg"),
      "Please enter a valid 10-digit mobile number (with or without +91).");
  }

  const picked = selectedExam();
  const email = validEmail(rawEmail, (picked && picked.emailDomains) || []);
  if (!email) {
    const list = (picked && picked.emailDomains) || [];
    return msg($("loginMsg"), list.length
      ? `Please use your college email address — it must end in ${list.map((d) => `<b>@${escapeHtml(d)}</b>`).join(" or ")}.`
      : "Please enter a valid email address.");
  }

  if (!uid) return msg($("loginMsg"), "Could not sign in to the test server. Reload the page.");
  msg($("loginMsg"), "");

  $("startBtn").disabled = true;
  try {
    const zdoc = await getDoc(doc(db, "exams", examId));
    if (!zdoc.exists()) throw new Error("Test not found");
    exam = { id: examId, ...zdoc.data() };
    maxViolations = Math.max(1, exam.maxViolations || 3);
    $("ruleMax").textContent = maxViolations;
    $("switchMax").textContent = maxViolations;
    $("proctorMax").textContent = maxViolations;

    attemptId = `${examId}__${safeId(sapId)}`;
    attemptRef = doc(db, "examAttempts", attemptId);

    let existing = null;
    try {
      const snap = await getDoc(attemptRef);
      existing = snap.exists() ? snap.data() : null;
    } catch (e) {
      console.warn("attempt read failed:", e.code, e.message);
      $("startBtn").disabled = false;
      if (e.code === "permission-denied") {
        // A missing attempt reads back cleanly under the published rules, so a
        // denial means the document exists and belongs to another browser.
        return msg($("loginMsg"),
          "This SAP ID already has a paper open on another device or browser. " +
          "If that was you and the other device is gone, ask your instructor to press " +
          "<b>Allow resume</b> on the dashboard, then try again. If it was not you, " +
          "tell your instructor now.", "warn");
      }
      return msg($("loginMsg"),
        "Could not reach the test server (" + escapeHtml(e.code || "network error") +
        "). Check your connection and try again.", "err");
    }

    if (existing && existing.status === "submitted") {
      $("startBtn").disabled = false;
      return msg($("loginMsg"),
        "You have already submitted this test. You cannot take it again.", "warn");
    }

    $("whoami").textContent = `${name} · ${sapId}`;
    window.__student = { name, sapId, mobile, email };

    if (existing && existing.status === "in-progress") {
      await resumeAttempt(existing);
    } else {
      showReady();
    }
  } catch (e) {
    console.error(e);
    msg($("loginMsg"), "Something went wrong starting the test. Please try again.");
  } finally {
    $("startBtn").disabled = false;
  }
}

function showReady() {
  const qs = exam.questions || [];
  const total = qs.reduce((s, q) => s + (Number(q.marks) || 0), 0);
  $("readyTitle").textContent = exam.title;
  $("readyMeta").textContent =
    `${qs.length} question${qs.length === 1 ? "" : "s"} · ${exam.durationMinutes} minutes · ` +
    `${total} mark${total === 1 ? "" : "s"} in total`;
  const instr = exam.instructions || "";
  $("readyInstructions").style.display = instr ? "block" : "none";
  $("readyInstructions").textContent = instr;
  show("ready");
  startReadingGate(readingSeconds(exam));
}

// ---- Compulsory reading time ----
let readHandle = null;
let readingUnlocked = false;

function startReadingGate(total) {
  clearInterval(readHandle);
  readingUnlocked = total <= 0;
  $("agree").checked = false;
  $("agree").disabled = !readingUnlocked;
  $("beginBtn").disabled = true;

  const gate = $("readGate");
  if (readingUnlocked) {
    gate.classList.add("hidden");
    syncBeginBtn();
    return;
  }
  gate.classList.remove("hidden", "unlocked");
  let left = total;
  $("readTimer").textContent = fmtTime(left);
  readHandle = setInterval(() => {
    left -= 1;
    $("readTimer").textContent = fmtTime(Math.max(0, left));
    if (left <= 0) {
      clearInterval(readHandle);
      readHandle = null;
      unlockReading();
    }
  }, 1000);
}

function unlockReading() {
  readingUnlocked = true;
  $("agree").disabled = false;
  $("readGate").classList.add("unlocked");
  $("readTimer").textContent = "00:00";
  $("readGateNote").innerHTML =
    "Reading time is over. Tick the box below, then start when you are ready.";
  syncBeginBtn();
}

function syncBeginBtn() {
  $("beginBtn").disabled = !(readingUnlocked && $("agree").checked);
}

// ---- Step 2 -> 3 ----
async function onBegin() {
  if (!readingUnlocked) return;
  clearInterval(readHandle);
  readHandle = null;
  $("beginBtn").disabled = true;

  const qs = exam.questions || [];
  order = qs.map((q) => q.id);
  answers = {};
  wordCounts = {};
  violations = 0;

  // Full screen has to be requested inside the click that started it.
  await goFullscreen();

  const s = window.__student;
  try {
    await setDoc(attemptRef, {
      uid,
      examId: exam.id,
      examTitle: exam.title,
      name: s.name,
      sapId: s.sapId,
      mobile: s.mobile,
      email: s.email,
      status: "in-progress",
      startedAt: serverTimestamp(),
      submittedAt: null,
      lastSeenAt: serverTimestamp(),
      durationMinutes: exam.durationMinutes,
      violations: 0,
      violationLog: [],
      eventLog: [],
      pasteAttempts: 0,
      typedChars: 0,
      imageCount: 0,
      answers: {},
      wordCounts: {},
      order,
      marks: null,
      feedback: null,
      score: null,
      graded: false,
      maxScore: qs.reduce((t, q) => t + (Number(q.marks) || 0), 0),
      totalQuestions: qs.length,
      autoSubmitted: false,
      submitReason: null,
      userAgent: navigator.userAgent.slice(0, 300),
    });
  } catch (e) {
    console.error(e);
    exitFullscreen();
    $("beginBtn").disabled = false;
    show("login");
    return msg($("loginMsg"),
      "Your SAP ID is not on the list for this test, or the server refused the attempt. " +
      "Please check the ID with your instructor.", "err");
  }

  // Read the server's own timestamp back, so the countdown cannot be stretched
  // by changing the device clock.
  const fresh = await getDoc(attemptRef);
  const startedMs = toMillis(fresh.data().startedAt) || Date.now();
  clockOffset = startedMs - Date.now();
  deadlineAt = startedMs + attemptMinutes(exam, fresh.data()) * 60 * 1000;

  persistLocal();
  await enterExam();
}

// ---- Resume ----
async function resumeAttempt(data) {
  answers = data.answers || {};
  wordCounts = data.wordCounts || {};
  violations = data.violations || 0;
  typedChars = data.typedChars || 0;
  pasteAttempts = data.pasteAttempts || 0;
  imageCount = data.imageCount || 0;
  loggedEvents = (data.eventLog || []).length;
  order = (data.order && data.order.length)
    ? data.order
    : (exam.questions || []).map((q) => q.id);

  // Faculty pressed "Allow resume": the paper may be picked up on a device
  // other than the one that started it. Claiming it ties the attempt to THIS
  // browser and spends the grant, so nobody can walk in behind the student.
  if (data.resumeAllowed && data.uid !== uid) {
    try {
      await updateDoc(attemptRef, { uid, resumeAllowed: false, lastSeenAt: serverTimestamp() });
    } catch (e) {
      console.warn("resume claim failed", e);
      return msg($("loginMsg"),
        "The server would not hand this paper over to this device. Ask your " +
        "instructor to press <b>Allow resume</b> again, then reload this page.", "err");
    }
  }

  const startedMs = toMillis(data.startedAt) || (now() - 1000);
  deadlineAt = startedMs + attemptMinutes(exam, data) * 60 * 1000;
  await syncClock();
  if (finished) return;

  await goFullscreen();
  persistLocal();
  await enterExam();
}

async function syncClock() {
  try {
    await updateDoc(attemptRef, { lastSeenAt: serverTimestamp() });
    const snap = await getDoc(attemptRef);
    const data = snap.data() || {};
    const serverNow = toMillis(data.lastSeenAt);
    if (serverNow) clockOffset = serverNow - Date.now();
    if (data.status === "submitted" && !finished && !submitting) return endByFaculty();
    applyGrantedTime(data);
  } catch (e) {
    console.warn("clock sync failed", e);
  }
}

// Faculty pressed "Force submit" while this browser was still open.
function endByFaculty() {
  finished = true;
  clearInterval(timerHandle);
  clearInterval(heartbeatHandle);
  clearTimeout(saveTimer);
  disableProctoring();
  exitFullscreen();
  $("proctorOverlay").classList.add("hidden");
  localStorage.removeItem(LS_KEY);
  paintResult("Attempt closed",
    "Your instructor closed this paper. Everything already saved on the server was kept.");
}

function applyGrantedTime(data) {
  const startedMs = toMillis(data.startedAt);
  if (!startedMs) return;
  deadlineAt = startedMs + attemptMinutes(exam, data) * 60 * 1000;
  const granted = extraMinutes(data);
  if (granted === grantedExtra) return;
  grantedExtra = granted;
  const chip = $("extraChip");
  chip.classList.toggle("hidden", granted === 0);
  chip.textContent = granted ? `+${granted} min granted` : "";
}

function toMillis(ts) {
  if (!ts) return 0;
  if (typeof ts === "number") return ts;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (ts.seconds) return ts.seconds * 1000;
  return 0;
}

// ---------------------------------------------------------------------------
// The paper
// ---------------------------------------------------------------------------
async function enterExam() {
  $("examViewTitle").textContent = exam.title;
  $("switchCount").textContent = violations;
  show("exam");                      // editors need to be laid out to size right
  await renderQuestions();
  addWatermark();
  enableProctoring();
  startTimer();
  startHeartbeat();
  if (now() >= deadlineAt) confirmSubmit("time", true);
}

async function renderQuestions() {
  const byId = Object.fromEntries((exam.questions || []).map((q) => [q.id, q]));
  const container = $("questions");
  container.innerHTML = "";
  editors = {};

  // Diagrams uploaded in an earlier session have to come back with the text.
  const saved = await loadMyImages();

  for (let i = 0; i < order.length; i++) {
    const qid = order[i];
    const q = byId[qid];
    if (!q) continue;

    const card = document.createElement("div");
    card.className = "card q-block";
    card.id = `qc_${qid}`;
    card.innerHTML = `
      <div class="q-num">QUESTION ${i + 1} OF ${order.length}
        <span class="q-marks">${escapeHtml(String(q.marks))} mark${q.marks === 1 ? "" : "s"}</span></div>
      <div class="q-text">${escapeHtml(q.question)}</div>
      ${q.guidance ? `<div class="q-guide">${escapeHtml(q.guidance)}</div>` : ""}
      <div class="ed-mount"></div>`;
    container.appendChild(card);

    const ed = createEditor(card.querySelector(".ed-mount"), {
      qid,
      allowImages: q.allowImages !== false,
      minWords: q.minWords || 0,
      maxWords: q.maxWords || 0,
      maxChars: MAX_ANSWER_CHARS,
      maxImages: IMG_MAX_PER_QUESTION,
      onChange: (html, st) => {
        answers[qid] = html;
        wordCounts[qid] = st.words;
        renderDots();
        persistLocal();
        scheduleSave();
      },
      onTyped: (n) => { typedChars += n; },
      onSuspicious: (kind, detail) => {
        if (kind === "import blocked") onPasteBlocked("paste into answer");
        else logEvent(kind, `${qid}: ${detail}`);
      },
      onNotice: toast,
      onImageUpload: (file, meta) => uploadImage(qid, meta),
      // The file chooser is an operating-system window: opening it blurs this
      // one, and on some desktops drops full screen. Tell the proctor the page
      // caused it, so a student who uploads the diagram the paper asked for is
      // not charged a violation for doing as they were told.
      onPickerOpen: () => proctor?.grace("diagram file chooser"),
      onPickerClose: () => proctor?.clearGrace(),
    });
    editors[qid] = ed;
    await ed.setHTML(answers[qid] || "", saved);
  }
  renderDots();
}

function renderDots() {
  $("dots").innerHTML = order.map((qid, i) => {
    const done = (wordCounts[qid] || 0) > 0;
    return `<button class="dot ${done ? "answered" : ""}" data-qid="${qid}"
             title="${done ? wordCounts[qid] + " words" : "not started"}">${i + 1}</button>`;
  }).join("");
  $("dots").querySelectorAll(".dot").forEach((d) => {
    d.addEventListener("click", () => {
      document.getElementById(`qc_${d.dataset.qid}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      editors[d.dataset.qid]?.focus();
    });
  });
}

// ---------------------------------------------------------------------------
// Diagrams
// ---------------------------------------------------------------------------
// Each picture is its own document under the attempt, so the attempt document
// itself stays a few kilobytes no matter how much the student draws.
async function uploadImage(qid, meta) {
  if (imageCount >= IMG_MAX_PER_ATTEMPT) {
    toast(`You have reached the limit of ${IMG_MAX_PER_ATTEMPT} diagrams for this paper.`, "warn");
    return null;
  }
  const s = window.__student;
  const ref = doc(db, "examAttempts", attemptId, "images", meta.id);
  try {
    await setDoc(ref, {
      uid, qid, sapId: s.sapId,
      dataUrl: meta.dataUrl,
      bytes: meta.bytes, w: meta.w, h: meta.h,
      at: serverTimestamp(),
    });
  } catch (e) {
    console.error("image upload failed", e);
    toast("The diagram could not be uploaded. Check your connection and try again.", "err");
    return null;
  }
  imageCount += 1;
  safeUpdate({ imageCount, lastSeenAt: serverTimestamp() });
  return meta.id;
}

async function loadMyImages() {
  const map = {};
  try {
    const snap = await getDocs(collection(db, "examAttempts", attemptId, "images"));
    snap.forEach((d) => { map[d.id] = d.data().dataUrl; });
  } catch (e) {
    console.warn("could not load saved diagrams", e);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------
function startTimer() {
  updateTimer();
  timerHandle = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const remain = Math.round((deadlineAt - now()) / 1000);
  const t = $("timer");
  t.textContent = fmtTime(remain);
  t.classList.toggle("low", remain <= 120);
  $("proctorTimer").textContent = fmtTime(remain);
  if (remain <= 0) {
    clearInterval(timerHandle);
    confirmSubmit("time", true);
  }
}

// Periodic save + presence + clock re-sync. Caps data loss at ~20 seconds even
// if the browser is killed outright.
function startHeartbeat() {
  heartbeatHandle = setInterval(async () => {
    if (finished) return;
    await safeUpdate({ answers, wordCounts, typedChars, lastSeenAt: serverTimestamp() });
    if (Math.random() < 0.34) await syncClock();
  }, 20000);
}

// ---------------------------------------------------------------------------
// Proctoring
// ---------------------------------------------------------------------------
let proctor = null;
let focusHandlers = [];
// Set when a grace window absorbed a full-screen exit. Full screen can only be
// re-entered from a user gesture, so the student is asked for one click rather
// than being silently left outside it.
let needsFullscreen = false;

function enableProctoring() {
  proctor = createProctor({
    maxViolations,
    isEditor: (el) => !!(el && el.closest && el.closest(".ed-body, .modal")),
    onViolation: (count, kind, remaining) => {
      violations = count;
      recordViolation(kind);
      showOverlay(
        "Test paused",
        `You left the test window (${escapeHtml(kind)}). This is violation ${count} of ` +
        `${maxViolations}. ${remaining} remaining — on the last one your paper is ` +
        `submitted automatically.`,
        true
      );
    },
    onLimit: (count, kind) => {
      violations = count;
      recordViolation(kind);
      showOverlay(
        "Attempt ended",
        `That was violation ${count} of ${maxViolations}. Your paper is being submitted automatically.`,
        false
      );
      confirmSubmit("proctoring", true);
    },
    onBlocked: (kind) => onPasteBlocked(kind),
    // A focus loss the page asked for. It costs nothing, but it is still put in
    // front of the instructor with its reason, so "no violation" never means
    // "no record".
    onGrace: (kind, reason) => {
      logEvent("allowed focus loss", `${kind} during ${reason}`);
      needsFullscreen = true;
    },
  });
  proctor.count = violations;
  proctor.blockedCount = pasteAttempts;
  proctor.attach();

  // Hide the paper the instant focus is lost, so a screenshot or screen share
  // taken while switching away captures nothing readable.
  addFocusHandler(window, "blur", () => document.body.classList.add("screen-hidden"));
  addFocusHandler(window, "focus", () => {
    if (!paused) document.body.classList.remove("screen-hidden");
    if (needsFullscreen) checkFullscreen();
  });
  addFocusHandler(window, "beforeunload", beforeUnload);
}

function addFocusHandler(target, evt, fn) {
  target.addEventListener(evt, fn);
  focusHandlers.push([target, evt, fn]);
}

function disableProctoring() {
  proctor?.detach();
  focusHandlers.forEach(([t, e, f]) => t.removeEventListener(e, f));
  focusHandlers = [];
  document.body.classList.remove("screen-hidden");
  document.querySelector(".wm")?.remove();
}

function beforeUnload(e) {
  if (submitting || finished) return;
  e.preventDefault();
  e.returnValue = "";
}

function recordViolation(kind) {
  $("switchCount").textContent = violations;
  persistLocal();
  const fields = {
    violations: increment(1),
    answers, wordCounts, typedChars,
    lastSeenAt: serverTimestamp(),
  };
  if (loggedEvents < MAX_LOGGED_EVENTS) {
    fields.violationLog = arrayUnion({ at: Date.now(), kind });
  }
  safeUpdate(fields);
}

// An attempt to bring text in from outside. It does not cost a violation on its
// own — a student can press Ctrl+V out of habit — but it is counted, shown to
// them, reported to the instructor, and proctor.js escalates if it keeps up.
function onPasteBlocked(kind) {
  pasteAttempts += 1;
  const chip = $("pasteChip");
  chip.classList.remove("hidden");
  chip.textContent = `${pasteAttempts} blocked paste${pasteAttempts > 1 ? "s" : ""}`;
  toast("Pasting is disabled in this test. Answers must be typed.", "err");
  logEvent(kind, "");
  safeUpdate({ pasteAttempts: increment(1), lastSeenAt: serverTimestamp() });
}

function logEvent(kind, detail) {
  if (loggedEvents >= MAX_LOGGED_EVENTS) return;
  loggedEvents += 1;
  safeUpdate({
    eventLog: arrayUnion({ at: Date.now(), kind, detail: String(detail).slice(0, 120) }),
  });
}

function showOverlay(title, body, canResume) {
  paused = true;
  document.body.classList.add("screen-hidden");
  $("proctorTitle").textContent = title;
  $("proctorBody").innerHTML = body;
  $("proctorCount").textContent = violations;
  $("resumeBtn").classList.toggle("hidden", !canResume);
  $("proctorOverlay").classList.remove("hidden");
}

async function resumeFromViolation() {
  await goFullscreen();
  paused = false;
  $("proctorOverlay").classList.add("hidden");
  document.body.classList.remove("screen-hidden");
}

// After a dialog that dropped full screen, offer one click to go back in. This
// is not a violation and is not counted as one — but the paper must not carry
// on outside full screen either, or the protection is simply gone.
function checkFullscreen() {
  needsFullscreen = false;
  if (finished || submitting || document.fullscreenElement) return;
  showOverlay(
    "Return to full screen",
    "The dialog you just used closed full screen. This was <b>not</b> counted as a " +
    "violation \u2014 click below to carry on with your paper.",
    true);
  paused = true;
}

function addWatermark() {
  if (document.querySelector(".wm")) return;
  const wm = document.createElement("div");
  wm.className = "wm";
  wm.textContent = `${window.__student.sapId} · ${window.__student.name}`;
  document.body.appendChild(wm);
}

// ---------------------------------------------------------------------------
// Toasts
// ---------------------------------------------------------------------------
let toastHandle = null;
function toast(text, kind = "ok") {
  const el = $("toast");
  el.textContent = text;
  el.className = `toast ${kind}`;
  clearTimeout(toastHandle);
  toastHandle = setTimeout(() => el.classList.add("hidden"), 3200);
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(
    () => safeUpdate({ answers, wordCounts, typedChars, lastSeenAt: serverTimestamp() }),
    1200);
}

async function safeUpdate(fields, attempts = 4) {
  pendingWrites += 1;
  paintNet();
  for (let i = 0; i < attempts; i++) {
    try {
      await updateDoc(attemptRef, fields);
      pendingWrites -= 1;
      paintNet(true);
      return true;
    } catch (e) {
      if (i === attempts - 1) {
        console.warn("write failed", e);
        pendingWrites -= 1;
        paintNet();
        return false;
      }
      await sleep(600 * Math.pow(2, i));
    }
  }
  return false;
}

function paintNet(justSaved) {
  $("netChip").classList.toggle("hidden", pendingWrites === 0);
  if (justSaved) {
    const chip = $("savedChip");
    chip.classList.add("flash");
    setTimeout(() => chip.classList.remove("flash"), 700);
  }
}

function persistLocal() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      attemptId, examId: exam?.id, examTitle: exam?.title,
      ...window.__student, answers, wordCounts, order, violations,
      deadlineAt, savedAt: Date.now(),
    }));
  } catch (e) { /* storage full or disabled — the server copy is the real one */ }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Submission
// ---------------------------------------------------------------------------
let lastSubmitReason = "manual";

function collectAnswers() {
  Object.entries(editors).forEach(([qid, ed]) => {
    answers[qid] = ed.getHTML();
    wordCounts[qid] = ed.stats().words;
  });
}

function confirmSubmit(reason, auto = false) {
  if (submitting || finished) return;
  collectAnswers();
  if (!auto) {
    // window.confirm() is browser chrome, so it blurs the page exactly as a
    // file chooser does. A student who opens it and then changes their mind
    // would have paid a violation for pressing Submit and cancelling. Grace it.
    proctor?.grace("submit confirmation", 60000);
    const blank = order.filter((qid) => (wordCounts[qid] || 0) === 0).length;
    const note = blank ? `\n\nYou have not written anything for ${blank} question(s).` : "";
    const ok = window.confirm(`Submit your answer paper now? This cannot be undone.${note}`);
    proctor?.clearGrace();
    if (!ok) {
      if (!document.fullscreenElement) needsFullscreen = true;
      return;
    }
  }
  doSubmit(reason);
}

async function doSubmit(reason, isRetry = false) {
  if (submitting) return;
  submitting = true;
  lastSubmitReason = reason;
  clearInterval(timerHandle);
  clearInterval(heartbeatHandle);
  clearTimeout(saveTimer);
  if (isRetry) $("retryBtn").disabled = true;
  collectAnswers();

  const ok = await safeUpdate({
    status: "submitted",
    submittedAt: serverTimestamp(),
    lastSeenAt: serverTimestamp(),
    answers, wordCounts, order, violations, typedChars, imageCount,
    autoSubmitted: reason !== "manual",
    submitReason: reason,
  }, 6);

  if (!ok) {
    submitting = false;
    if (isRetry) $("retryBtn").disabled = false;
    $("proctorOverlay").classList.add("hidden");
    document.body.classList.remove("screen-hidden");
    show("rescue");
    return;
  }

  finished = true;
  disableProctoring();
  exitFullscreen();
  $("proctorOverlay").classList.add("hidden");
  localStorage.removeItem(LS_KEY);

  paintResult(
    reason === "proctoring" ? "Attempt ended" : "Submitted ✅",
    reason === "time" ? "Time expired — your paper was submitted automatically."
      : reason === "proctoring" ? "Submitted automatically after repeated proctoring violations."
        : "Your answer paper has been recorded.");
}

function paintResult(title, meta) {
  const attempted = order.filter((qid) => (wordCounts[qid] || 0) > 0).length;
  const words = order.reduce((s, qid) => s + (wordCounts[qid] || 0), 0);
  $("resultTitle").textContent = title;
  $("resultMeta").textContent = meta;
  $("rAnswered").textContent = `${attempted} / ${order.length}`;
  $("rWords").textContent = words;
  $("rImages").textContent = imageCount;
  $("rSwitches").textContent = violations;
  $("rReceipt").textContent = receiptCode();
  show("result");
}

function receiptCode() {
  const words = order.reduce((s, qid) => s + (wordCounts[qid] || 0), 0);
  const base = `${attemptId}|${words}|${violations}|${imageCount}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) >>> 0;
  return h.toString(36).toUpperCase().slice(0, 8);
}

// Rescue path: a self-contained copy of the paper, diagrams included, that the
// student can email to the instructor if the server never accepted the submit.
function downloadPaper() {
  const s = window.__student || {};
  const byId = Object.fromEntries((exam.questions || []).map((q) => [q.id, q]));
  const body = order.map((qid, i) => {
    const q = byId[qid] || {};
    // Straight from the live editor, so the images are still embedded.
    const html = editors[qid] ? editors[qid].body.innerHTML : (answers[qid] || "");
    return `<section><h3>Q${i + 1}. ${escapeHtml(q.question || "")}
      <small>(${escapeHtml(String(q.marks || ""))} marks · ${wordCounts[qid] || 0} words)</small></h3>
      <div class="ans">${html || "<i>Not attempted</i>"}</div></section>`;
  }).join("");

  const page = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Answer paper — ${escapeHtml(s.sapId || "")}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<style>body{font-family:Segoe UI,system-ui,sans-serif;max-width:860px;margin:30px auto;padding:0 18px;line-height:1.55}
h1{font-size:1.3rem}section{border-top:1px solid #ddd;padding-top:14px;margin-top:20px}
.ans{background:#fafbfc;border:1px solid #e3e8ee;border-radius:8px;padding:14px}
img{max-width:100%;border:1px solid #ccc;border-radius:6px}
figcaption{font-size:.85rem;color:#666;font-style:italic}
table{border-collapse:collapse}td,th{border:1px solid #bbb;padding:5px 8px}</style></head><body>
<h1>${escapeHtml(exam.examTitle || exam.title || "Class test")} — backup copy</h1>
<p><b>${escapeHtml(s.name || "")}</b> · SAP ${escapeHtml(s.sapId || "")} ·
${escapeHtml(s.mobile || "")} · ${escapeHtml(s.email || "")}<br>
Saved locally at ${new Date().toLocaleString()} · receipt ${receiptCode()}<br>
<i>Submission to the server was not confirmed. Email this file to your instructor.</i></p>
${body}</body></html>`;

  const blob = new Blob([page], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `answer_paper_${safeId(s.sapId || "student")}.html`;
  a.click();
  URL.revokeObjectURL(a.href);
}
