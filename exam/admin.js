import {
  db, signInAdmin, signOutAdmin, onAdminChange, isAdminUser,
} from "../quiz/firebase-config.js";
import {
  collection, query, where, orderBy, onSnapshot, getDocs, doc, getDoc,
  setDoc, updateDoc, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  normalizeExam, totalMarks, parseRoster, parseDomains, escapeHtml,
  sanitizeHtml, hydrateImages, STALE_MS, extraMinutes,
} from "./common.js";
import { renderMath } from "./editor.js";

// ---------------------------------------------------------------------------
// Faculty dashboard for descriptive class tests
//   * questions are written here; model answers go to a faculty-only document
//   * the live monitor shows words, keystrokes and blocked paste attempts
//   * evaluation is manual, per question, and only faculty may write a score
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}

let monitorUnsub = null;
let currentRows = [];
let currentExam = null;      // { id, ...public doc }
let currentKey = null;       // { rubric, roster }  — faculty only
let started = false;
let qRows = [];              // the question builder's state

// ---------------------------------------------------------------------------
// Sign in
// ---------------------------------------------------------------------------
$("gateBtn").addEventListener("click", enter);
$("password").addEventListener("keydown", (e) => { if (e.key === "Enter") enter(); });

async function enter() {
  const email = $("email").value.trim();
  const password = $("password").value;
  if (!email || !password) return msg($("gateMsg"), "Enter your email and password.");
  $("gateBtn").disabled = true;
  msg($("gateMsg"), "");
  try {
    await signInAdmin(email, password);
  } catch (e) {
    msg($("gateMsg"), "Sign-in failed: " + friendlyAuthError(e));
  } finally {
    $("gateBtn").disabled = false;
  }
}

onAdminChange((user) => {
  if (user && isAdminUser(user)) {
    $("gateView").classList.add("hidden");
    $("app").classList.remove("hidden");
    $("whoAdmin").innerHTML =
      `${escapeHtml(user.email)} · <a href="#" id="signOutLink" style="color:#fff">sign out</a>`;
    $("signOutLink").addEventListener("click", (e) => { e.preventDefault(); signOutAdmin(); });
    if (!started) { started = true; initApp(); }
  } else {
    $("gateView").classList.remove("hidden");
    $("app").classList.add("hidden");
    $("whoAdmin").textContent = "";
    if (user && user.email && !isAdminUser(user)) {
      msg($("gateMsg"), "That account is not on the faculty list.", "err");
      signOutAdmin();
    }
  }
});

function friendlyAuthError(e) {
  const c = (e && e.code) || "";
  if (c.includes("invalid-credential") || c.includes("wrong-password")) return "wrong email or password.";
  if (c.includes("user-not-found")) return "no such account — create it in Firebase → Authentication → Users.";
  if (c.includes("operation-not-allowed")) return "Email/Password sign-in is not enabled in your Firebase project.";
  if (c.includes("too-many-requests")) return "too many attempts — wait a minute and retry.";
  return e.message || String(e);
}

// ---------------------------------------------------------------------------
function initApp() {
  $("jsonFile").addEventListener("change", onFile);
  $("rosterFile").addEventListener("change", onRosterFile);
  $("roster").addEventListener("input", refreshSaveState);
  $("rosterOpen").addEventListener("change", refreshSaveState);
  $("title").addEventListener("input", refreshSaveState);
  $("addQBtn").addEventListener("click", () => { addQuestionRow(); refreshSaveState(); });
  $("saveExamBtn").addEventListener("click", saveExam);
  $("monitorExam").addEventListener("change", startMonitor);
  $("exportBtn").addEventListener("click", exportCsv);
  $("reportBtn").addEventListener("click", downloadAllPapers);
  $("closeExamBtn").addEventListener("click", closeExam);
  // Delegated: rows are re-rendered on every snapshot.
  $("rows").addEventListener("click", onRowAction);
  $("evalCancel").addEventListener("click", closeEval);
  $("evalSave").addEventListener("click", saveEval);
  $("evalModal").addEventListener("mousedown", (e) => { if (e.target === $("evalModal")) closeEval(); });

  addQuestionRow();
  loadExamList();
  setInterval(() => renderRows(currentRows), 15000);   // refresh the "Live" column
}

// ---------------------------------------------------------------------------
// Question builder
// ---------------------------------------------------------------------------
function addQuestionRow(q) {
  const row = document.createElement("div");
  row.className = "qbuild-row";
  const n = qRows.length + 1;
  row.innerHTML = `
    <div class="qnum">Q${n}</div>
    <div class="qtext">
      <label>Question</label>
      <textarea class="f-q" rows="2" placeholder="e.g. Explain deadlock with a neat diagram, and state the four Coffman conditions.">${escapeHtml(q?.question || "")}</textarea>
      <label style="margin-top:8px">Model answer / marking scheme (faculty only — never sent to students)</label>
      <textarea class="f-model" rows="2" placeholder="Key points expected, and how the marks are split.">${escapeHtml(q?.modelAnswer || "")}</textarea>
      <label style="margin-top:8px">Guidance shown to the student (optional)</label>
      <input type="text" class="f-guide" value="${escapeHtml(q?.guidance || "")}"
        placeholder="e.g. Answer in about 200 words with a labelled diagram." />
    </div>
    <div>
      <label>Marks</label>
      <input type="number" class="f-marks small" value="${q?.marks ?? 5}" min="0" step="0.5" />
      <label style="margin-top:8px">Min words</label>
      <input type="number" class="f-min small" value="${q?.minWords ?? 0}" min="0" />
      <label style="margin-top:8px">Max words</label>
      <input type="number" class="f-max small" value="${q?.maxWords ?? 0}" min="0" />
      <label style="margin-top:8px" title="Lets the student photograph a diagram drawn on paper">
        <input type="checkbox" class="f-img" ${q?.allowImages === false ? "" : "checked"} /> diagrams
      </label>
      <button type="button" class="btn secondary xs f-del" style="margin-top:10px">Remove</button>
    </div>`;
  $("qbuild").appendChild(row);
  qRows.push(row);
  row.querySelector(".f-del").addEventListener("click", () => {
    qRows = qRows.filter((r) => r !== row);
    row.remove();
    renumber();
    refreshSaveState();
  });
  row.querySelectorAll("textarea, input").forEach((el) =>
    el.addEventListener("input", refreshSaveState));
  renumber();
  return row;
}

function renumber() {
  qRows.forEach((r, i) => { r.querySelector(".qnum").textContent = `Q${i + 1}`; });
}

// Splits what the builder holds into the two documents that get stored: the
// student-visible questions, and the faculty-only marking scheme.
function readBuilder() {
  const questions = [];
  const rubric = {};
  qRows.forEach((r, i) => {
    const text = r.querySelector(".f-q").value.trim();
    if (!text) return;
    const id = String(i + 1);
    questions.push({
      id,
      question: text,
      guidance: r.querySelector(".f-guide").value.trim(),
      marks: Number(r.querySelector(".f-marks").value) || 0,
      minWords: Number(r.querySelector(".f-min").value) || 0,
      maxWords: Number(r.querySelector(".f-max").value) || 0,
      allowImages: r.querySelector(".f-img").checked,
    });
    const model = r.querySelector(".f-model").value.trim();
    if (model) rubric[id] = model;
  });
  return { questions, rubric };
}

function refreshSaveState() {
  const { questions } = readBuilder();
  const hasTitle = !!$("title").value.trim();
  const hasRoster = parseRoster($("roster").value).length > 0 || $("rosterOpen").checked;
  $("qTotals").textContent = questions.length
    ? `${questions.length} question(s) · ${totalMarks(questions)} marks total`
    : "No questions written yet.";
  const roster = parseRoster($("roster").value);
  $("rosterInfo").innerHTML = $("rosterOpen").checked
    ? "<b>Roster check is OFF</b> — any signed-in student may start this test."
    : (roster.length
      ? `<b>${roster.length}</b> SAP ID(s) may take this test.`
      : "No roster loaded — <b>the test cannot be saved without one</b> unless you tick the box below.");
  $("saveExamBtn").disabled = !(hasTitle && hasRoster && questions.length);
}

// ---- Questions JSON upload (fills the builder) ----
function onFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const raw = JSON.parse(reader.result);
      const norm = normalizeExam(raw);
      if (!norm.questions.length) throw new Error("no questions found in that file");

      $("qbuild").innerHTML = "";
      qRows = [];
      const models = Object.fromEntries(
        (Array.isArray(raw) ? raw : raw.questions || [])
          .map((q, i) => [String(q.id ?? i + 1), q.modelAnswer || q.answer || ""]));
      norm.questions.forEach((q) => addQuestionRow({ ...q, modelAnswer: models[q.id] || "" }));

      if (norm.title && !$("title").value.trim()) $("title").value = norm.title;
      if (norm.instructions && !$("instructions").value.trim()) {
        $("instructions").value = norm.instructions;
      }
      if (norm.durationMinutes) $("duration").value = norm.durationMinutes;
      if (norm.readingMinutes >= 0) $("readingMinutes").value = norm.readingMinutes;
      msg($("createMsg"),
        `Loaded <b>${norm.questions.length}</b> question(s) worth <b>${totalMarks(norm.questions)}</b> marks. ` +
        `Edit anything below, then save.`, "ok");
    } catch (e) {
      msg($("createMsg"), "That file could not be read: " + escapeHtml(e.message));
    }
    refreshSaveState();
  };
  reader.readAsText(file);
}

function onRosterFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    $("roster").value = String(reader.result || "");
    refreshSaveState();
  };
  reader.readAsText(file);
}

// ---------------------------------------------------------------------------
// Save
// ---------------------------------------------------------------------------
async function saveExam() {
  const title = $("title").value.trim();
  const { questions, rubric } = readBuilder();
  const roster = parseRoster($("roster").value);
  const rosterOpen = $("rosterOpen").checked;
  if (!title) return msg($("createMsg"), "Please enter a test title.");
  if (!questions.length) return msg($("createMsg"), "Please write at least one question.");
  if (!roster.length && !rosterOpen) {
    return msg($("createMsg"), "Add the allowed SAP IDs, or tick the open-roster box.");
  }

  const examId = slug(title) + "_" + Date.now().toString(36);
  const publicDoc = {
    title,
    instructions: $("instructions").value.trim(),
    durationMinutes: Math.max(1, parseInt($("duration").value, 10) || 45),
    maxViolations: Math.max(1, parseInt($("maxViolations").value, 10) || 3),
    readingMinutes: Math.max(0, parseInt($("readingMinutes").value, 10) || 0),
    emailDomains: parseDomains($("domains").value),
    active: $("active").value === "true",
    questions,                           // no model answers here
    totalQuestions: questions.length,
    maxScore: totalMarks(questions),
    createdAt: Date.now(),
  };

  $("saveExamBtn").disabled = true;
  try {
    // The faculty-only document goes first: if this write fails, no test is
    // left half-published for students to open.
    await setDoc(doc(db, "examKeys", examId), {
      rubric, roster, rosterOpen, title, createdAt: Date.now(),
    });
    await setDoc(doc(db, "exams", examId), publicDoc);

    msg($("createMsg"),
      `Test "<b>${escapeHtml(title)}</b>" saved — ${questions.length} question(s), ` +
      `${totalMarks(questions)} marks, ` +
      (rosterOpen ? "<b>open to any student</b>" : `<b>${roster.length}</b> students on the roster`) +
      `, and it ${publicDoc.active ? "<b>is now ACTIVE</b>" : "is saved as a draft"}. ` +
      `The marking scheme is stored separately in <code>examKeys/${examId}</code>.`, "ok");
    await loadExamList(examId);
  } catch (e) {
    console.error(e);
    msg($("createMsg"), "Save failed: " + escapeHtml(e.message) +
      " — check that your account is in the Firestore rules.");
  } finally {
    refreshSaveState();
  }
}

async function loadExamList(selectId) {
  const sel = $("monitorExam");
  try {
    const snap = await getDocs(query(collection(db, "exams"), orderBy("createdAt", "desc")));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (!items.length) {
      sel.innerHTML = `<option value="">No tests yet</option>`;
      return;
    }
    sel.innerHTML = items.map((z) =>
      `<option value="${z.id}">${escapeHtml(z.title)} ${z.active ? "· ACTIVE" : "· draft"}</option>`).join("");
    if (selectId) sel.value = selectId;
    startMonitor();
  } catch (e) {
    console.error(e);
    sel.innerHTML = `<option value="">Could not load tests</option>`;
  }
}

// ---------------------------------------------------------------------------
// Live monitor
// ---------------------------------------------------------------------------
async function startMonitor() {
  const examId = $("monitorExam").value;
  if (monitorUnsub) monitorUnsub();
  msg($("monitorMsg"), "");
  currentExam = null;
  currentKey = null;
  if (!examId) return;

  try {
    const [zSnap, kSnap] = await Promise.all([
      getDoc(doc(db, "exams", examId)),
      getDoc(doc(db, "examKeys", examId)),
    ]);
    currentExam = zSnap.exists() ? { id: examId, ...zSnap.data() } : null;
    currentKey = kSnap.exists() ? kSnap.data() : { rubric: {}, roster: [] };
  } catch (e) {
    console.warn("could not load the test", e);
  }

  const q = query(collection(db, "examAttempts"), where("examId", "==", examId));
  monitorUnsub = onSnapshot(q, (snap) => {
    currentRows = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
    currentRows.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    renderRows(currentRows);
  }, (err) => {
    console.error(err);
    $("rows").innerHTML =
      `<tr><td colspan="13" class="muted">Live updates unavailable: ${escapeHtml(err.message)}</td></tr>`;
  });
}

function isStale(r, nowMs) {
  return r.status !== "submitted" && !!ms(r.lastSeenAt) && (nowMs - ms(r.lastSeenAt) > STALE_MS);
}

function totalWords(r) {
  return Object.values(r.wordCounts || {}).reduce((s, n) => s + (Number(n) || 0), 0);
}

function renderRows(rows) {
  const nowMs = Date.now();
  if (!rows.length) {
    $("rows").innerHTML = `<tr><td colspan="13" class="muted">No students yet.</td></tr>`;
  } else {
    $("rows").innerHTML = rows.map((r) => {
      const done = r.status === "submitted";
      const v = r.violations || 0;
      const blocked = r.pasteAttempts || 0;
      const words = totalWords(r);
      const keys = r.typedChars || 0;
      const stale = isStale(r, nowMs);
      const extra = extraMinutes(r);

      const statusPill = done
        ? `<span class="pill done">Submitted${r.autoSubmitted ? ` (${escapeHtml(r.submitReason || "auto")})` : ""}</span>`
        : `<span class="pill live">Writing</span>`;
      const resumePill = r.resumeAllowed ? ` <span class="pill warnpill">resume open</span>` : "";
      const extraPill = extra ? ` <span class="pill warnpill">+${extra}m</span>` : "";
      const gradedPill = r.graded ? ` <span class="pill done">evaluated</span>` : "";

      // Far more words on the page than keys pressed means the text did not
      // come from this keyboard. It is evidence to look at, not a verdict.
      const suspect = words > 40 && keys < words * 2.5;

      const actions = [];
      if (done) {
        actions.push(`<button class="btn xs" data-act="eval" data-id="${r._id}">Evaluate</button>`);
        actions.push(`<button class="btn secondary xs" data-act="resume" data-id="${r._id}">Reopen</button>`);
      } else {
        actions.push(`<button class="btn secondary xs" data-act="resume" data-id="${r._id}">Allow resume</button>`);
        actions.push(`<button class="btn danger xs" data-act="submit" data-id="${r._id}">Force submit</button>`);
      }

      return `<tr>
        <td>${escapeHtml(r.name || "–")}</td>
        <td class="mono">${escapeHtml(r.sapId || "–")}</td>
        <td class="mono" style="font-size:.78rem">
          ${escapeHtml(r.mobile || "–")}<br><span class="muted">${escapeHtml(r.email || "")}</span></td>
        <td>${statusPill}${resumePill}${extraPill}${gradedPill}</td>
        <td class="right-align">${v ? `<b style="color:var(--bad)">${v}</b>` : "0"}</td>
        <td class="right-align">${blocked ? `<b style="color:var(--warn)">${blocked}</b>` : "0"}</td>
        <td class="right-align">${words}${suspect ? ' <span title="Word count is high relative to keystrokes — check this paper">⚑</span>' : ""}</td>
        <td class="right-align muted">${keys}</td>
        <td class="right-align">${r.imageCount || 0}</td>
        <td class="right-align">${r.score == null ? "–" : `<b>${r.score}</b> / ${r.maxScore ?? "?"}`}</td>
        <td class="muted" style="font-size:.8rem">${fmtDate(ms(r.startedAt))}</td>
        <td>${done ? "–" : (stale ? `<span class="pill flag">stale</span>` : `<span class="pill live">ok</span>`)}</td>
        <td class="row-actions">${actions.join("")}</td>
      </tr>`;
    }).join("");
  }

  const done = rows.filter((r) => r.status === "submitted");
  const graded = rows.filter((r) => r.graded);
  const scores = graded.map((r) => Number(r.score)).filter((n) => Number.isFinite(n));
  $("sTotal").textContent = rows.length;
  $("sLive").textContent = rows.length - done.length;
  $("sDone").textContent = done.length;
  $("sGraded").textContent = graded.length;
  $("sAvg").textContent = scores.length
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "–";
  $("sFlag").textContent = rows.filter((r) => (r.violations || 0) > 0 || (r.pasteAttempts || 0) > 0).length;
  $("sStale").textContent = rows.filter((r) => isStale(r, nowMs)).length;
}

// ---------------------------------------------------------------------------
// Row actions
// ---------------------------------------------------------------------------
async function onRowAction(ev) {
  const btn = ev.target.closest("button[data-act]");
  if (!btn) return;
  const row = currentRows.find((r) => r._id === btn.dataset.id);
  if (!row) return;
  btn.disabled = true;
  try {
    if (btn.dataset.act === "submit") await forceSubmit(row);
    else if (btn.dataset.act === "eval") await openEval(row);
    else await allowResume(row);
  } finally {
    btn.disabled = false;
  }
}

async function forceSubmit(row) {
  const who = row.name || row.sapId || "this student";
  const attempted = Object.values(row.wordCounts || {}).filter((n) => n > 0).length;
  if (!window.confirm(
    `Submit ${who}'s paper as it stands?\n\n` +
    `${attempted} of ${row.totalQuestions ?? "?"} question(s) have been written on. The paper ` +
    `is closed and can be evaluated, and the student cannot add to it afterwards.`)) return;
  try {
    await updateDoc(doc(db, "examAttempts", row._id), {
      status: "submitted",
      submittedAt: serverTimestamp(),
      autoSubmitted: true,
      submitReason: "faculty",
      resumeAllowed: false,
    });
    msg($("monitorMsg"),
      `<b>${escapeHtml(who)}</b> is now marked submitted. Press <b>Evaluate</b> to mark it.`, "ok");
  } catch (e) {
    console.error(e);
    msg($("monitorMsg"), "Could not submit that paper: " + escapeHtml(e.message));
  }
}

async function allowResume(row) {
  const who = row.name || row.sapId || "this student";
  const lastSeen = ms(row.lastSeenAt);
  const lostMin = lastSeen ? Math.max(0, Math.round((Date.now() - lastSeen) / 60000)) : 0;
  const already = extraMinutes(row);

  if (row.status === "submitted" && !window.confirm(
    `${who}'s paper is already SUBMITTED.\n\n` +
    `Reopening it lets them write again and clears any marks you gave, so the paper ` +
    `will need evaluating again. Continue?`)) return;

  const reply = window.prompt(
    `Let ${who} back into the test.\n\n` +
    `They sign in again with the same SAP ID — on any device — and carry on from the ` +
    `answers already saved on the server.\n\n` +
    `Their clock kept running while they were away (about ${lostMin} min lost).\n` +
    `TOTAL extra minutes for this paper (0 for none):`,
    String(already + lostMin));
  if (reply === null) return;

  const n = Number(String(reply).trim());
  if (!Number.isFinite(n) || n < 0) {
    return msg($("monitorMsg"), "That is not a number of minutes — nothing was changed.", "warn");
  }

  const payload = {
    status: "in-progress",
    extraMinutes: Math.round(n),
    resumeAllowed: true,          // spent by the first browser that resumes
    resumeGrantedAt: Date.now(),
  };
  if (row.status === "submitted") {
    Object.assign(payload, {
      submittedAt: null, autoSubmitted: false, submitReason: null,
      score: null, graded: false, marks: null, feedback: null,
    });
  }

  try {
    await updateDoc(doc(db, "examAttempts", row._id), payload);
    msg($("monitorMsg"),
      `<b>${escapeHtml(who)}</b> may resume now` +
      (n ? ` with <b>${Math.round(n)} extra minute(s)</b>` : " with no extra time") +
      `. Tell them to reopen the test page and sign in with the same SAP ID.`, "ok");
  } catch (e) {
    console.error(e);
    msg($("monitorMsg"), "Could not reopen that paper: " + escapeHtml(e.message));
  }
}

// ---------------------------------------------------------------------------
// Evaluation
// ---------------------------------------------------------------------------
let evalRow = null;

async function fetchImages(attemptId) {
  const map = {};
  try {
    const snap = await getDocs(collection(db, "examAttempts", attemptId, "images"));
    snap.forEach((d) => { map[d.id] = d.data().dataUrl; });
  } catch (e) {
    console.warn("could not load diagrams", e);
  }
  return map;
}

async function openEval(row) {
  evalRow = row;
  const questions = (currentExam && currentExam.questions) || [];
  const rubric = (currentKey && currentKey.rubric) || {};
  const images = await fetchImages(row._id);
  const marks = row.marks || {};
  const feedback = row.feedback || {};

  $("evalTitle").textContent = `${row.name || "Student"} — ${row.sapId || ""}`;
  $("evalMeta").textContent =
    `${row.email || ""} · ${row.mobile || ""} · submitted ${fmtDate(ms(row.submittedAt))} · ` +
    `${totalWords(row)} words · ${row.imageCount || 0} diagram(s) · ${row.typedChars || 0} keystrokes`;

  const flags = [];
  if (row.violations) flags.push(`${row.violations} proctoring violation(s)`);
  if (row.pasteAttempts) flags.push(`${row.pasteAttempts} blocked paste attempt(s)`);
  if (row.submitReason && row.submitReason !== "manual") {
    flags.push(`submitted automatically (${escapeHtml(row.submitReason)})`);
  }
  const events = (row.eventLog || []).slice(0, 12)
    .map((e) => `${new Date(e.at).toLocaleTimeString()} — ${escapeHtml(e.kind)}${e.detail ? ": " + escapeHtml(e.detail) : ""}`);
  $("evalFlags").innerHTML = flags.length
    ? `<div class="notice warn"><b>Proctoring:</b> ${flags.join(", ")}.` +
    (events.length ? `<br><span class="mono" style="font-size:.78rem">${events.join("<br>")}</span>` : "") +
    `</div>`
    : `<div class="notice ok">No proctoring events recorded for this paper.</div>`;

  $("evalBody").innerHTML = questions.map((q, i) => {
    // Sanitised again on the way in: the HTML in the document came from a
    // browser the student controlled.
    const html = hydrateImages(sanitizeHtml(row.answers?.[q.id] || ""), images);
    const words = (row.wordCounts || {})[q.id] || 0;
    return `<div class="paper-q">
      <div class="q-num">QUESTION ${i + 1}
        <span class="q-marks">${escapeHtml(String(q.marks))} mark${q.marks === 1 ? "" : "s"}</span></div>
      <div class="q-text">${escapeHtml(q.question)}</div>
      ${rubric[q.id] ? `<div class="rubric"><b>Marking scheme:</b> ${escapeHtml(rubric[q.id])}</div>` : ""}
      <div class="paper-ans" style="margin-top:10px">${html || "<i class='muted'>Not attempted</i>"}</div>
      <div class="mark-row">
        <div class="mk">
          <label>Marks (max ${escapeHtml(String(q.marks))})</label>
          <input type="number" class="ev-mark" data-qid="${escapeHtml(q.id)}"
            min="0" max="${escapeHtml(String(q.marks))}" step="0.5"
            value="${marks[q.id] ?? ""}" />
        </div>
        <div class="fb">
          <label>Comment to the student (optional)</label>
          <textarea class="ev-fb" data-qid="${escapeHtml(q.id)}" rows="1">${escapeHtml(feedback[q.id] || "")}</textarea>
        </div>
        <div class="muted" style="font-size:.8rem;padding-bottom:8px">${words} words</div>
      </div>
    </div>`;
  }).join("");

  $("evalMax").textContent = totalMarks(questions);
  $("evalBody").querySelectorAll(".ev-mark").forEach((el) =>
    el.addEventListener("input", recomputeTotal));
  recomputeTotal();
  await renderMath($("evalBody"));
  $("evalModal").classList.remove("hidden");
}

function recomputeTotal() {
  let t = 0;
  $("evalBody").querySelectorAll(".ev-mark").forEach((el) => {
    const n = Number(el.value);
    if (Number.isFinite(n)) t += n;
  });
  $("evalTotal").textContent = Math.round(t * 100) / 100;
}

function closeEval() {
  $("evalModal").classList.add("hidden");
  evalRow = null;
}

async function saveEval() {
  if (!evalRow) return;
  const marks = {};
  const feedback = {};
  let over = null;
  $("evalBody").querySelectorAll(".ev-mark").forEach((el) => {
    const qid = el.dataset.qid;
    if (el.value === "") return;
    const n = Number(el.value);
    if (!Number.isFinite(n)) return;
    const max = Number(el.max);
    if (Number.isFinite(max) && n > max) over = qid;
    marks[qid] = n;
  });
  $("evalBody").querySelectorAll(".ev-fb").forEach((el) => {
    if (el.value.trim()) feedback[el.dataset.qid] = el.value.trim().slice(0, 1000);
  });
  if (over && !window.confirm(
    `Question ${over} has more marks than it is worth. Save anyway?`)) return;

  const score = Math.round(Object.values(marks).reduce((a, b) => a + b, 0) * 100) / 100;
  $("evalSave").disabled = true;
  try {
    await updateDoc(doc(db, "examAttempts", evalRow._id), {
      marks, feedback, score, graded: true,
      gradedAt: serverTimestamp(),
    });
    msg($("monitorMsg"),
      `Saved <b>${score}</b> for <b>${escapeHtml(evalRow.name || evalRow.sapId)}</b>.`, "ok");
    closeEval();
  } catch (e) {
    console.error(e);
    window.alert("Could not save the marks: " + e.message);
  } finally {
    $("evalSave").disabled = false;
  }
}

// ---------------------------------------------------------------------------
// Close the test
// ---------------------------------------------------------------------------
async function closeExam() {
  const examId = $("monitorExam").value;
  if (!examId) return;
  if (!window.confirm("Close this test? Students who have not started will not be able to.")) return;
  try {
    await updateDoc(doc(db, "exams", examId), { active: false });
    msg($("monitorMsg"), "Test closed. Papers already in progress are unaffected.", "ok");
    await loadExamList(examId);
  } catch (e) {
    msg($("monitorMsg"), "Could not close the test: " + escapeHtml(e.message));
  }
}

// ---------------------------------------------------------------------------
// Offline report: every paper, diagrams included, in one file
// ---------------------------------------------------------------------------
async function downloadAllPapers() {
  const examId = $("monitorExam").value;
  if (!examId || !currentExam) return;
  const rows = currentRows.slice();
  if (!rows.length) return msg($("monitorMsg"), "There are no papers to download yet.", "warn");

  msg($("monitorMsg"), "Collecting papers and diagrams — this can take a moment…", "ok");
  const questions = currentExam.questions || [];
  const rubric = (currentKey && currentKey.rubric) || {};

  // Diagrams are one document each, so they are fetched per student rather
  // than in one query — a class of 60 is a few hundred small reads.
  const papers = [];
  for (const r of rows) {
    const images = await fetchImages(r._id);
    papers.push({ r, images });
  }

  const body = papers.map(({ r, images }) => {
    const marks = r.marks || {};
    const feedback = r.feedback || {};
    const qs = questions.map((q, i) => {
      const html = hydrateImages(sanitizeHtml(r.answers?.[q.id] || ""), images);
      const w = (r.wordCounts || {})[q.id] || 0;
      return `<section>
        <h3>Q${i + 1}. ${escapeHtml(q.question)}
          <small>(${escapeHtml(String(q.marks))} marks · ${w} words${marks[q.id] != null ? ` · awarded ${marks[q.id]}` : ""})</small></h3>
        ${rubric[q.id] ? `<div class="rub"><b>Marking scheme:</b> ${escapeHtml(rubric[q.id])}</div>` : ""}
        <div class="ans">${html || "<i>Not attempted</i>"}</div>
        ${feedback[q.id] ? `<div class="fb"><b>Comment:</b> ${escapeHtml(feedback[q.id])}</div>` : ""}
      </section>`;
    }).join("");
    return `<article>
      <h2>${escapeHtml(r.name || "–")} — ${escapeHtml(r.sapId || "")}</h2>
      <p class="meta">${escapeHtml(r.email || "")} · ${escapeHtml(r.mobile || "")} ·
        ${escapeHtml(r.status || "")} ${r.submitReason && r.submitReason !== "manual" ? `(${escapeHtml(r.submitReason)})` : ""} ·
        started ${fmtDate(ms(r.startedAt))} · submitted ${fmtDate(ms(r.submittedAt))}<br>
        ${totalWords(r)} words · ${r.typedChars || 0} keystrokes · ${r.imageCount || 0} diagram(s) ·
        <b>${r.violations || 0}</b> violation(s) · <b>${r.pasteAttempts || 0}</b> blocked paste(s)
        ${r.score != null ? ` · <b>score ${r.score} / ${r.maxScore ?? "?"}</b>` : ""}</p>
      ${qs}
    </article>`;
  }).join("");

  const summary = `<table class="sum"><thead><tr>
      <th>Name</th><th>SAP ID</th><th>Email</th><th>Words</th><th>Keys</th>
      <th>Viol.</th><th>Blocked</th><th>Score</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${escapeHtml(r.name || "")}</td><td>${escapeHtml(r.sapId || "")}</td>
        <td>${escapeHtml(r.email || "")}</td><td>${totalWords(r)}</td><td>${r.typedChars || 0}</td>
        <td>${r.violations || 0}</td><td>${r.pasteAttempts || 0}</td>
        <td>${r.score == null ? "–" : r.score}</td></tr>`).join("")}
      </tbody></table>`;

  const page = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${escapeHtml(currentExam.title)} — all papers</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<style>
body{font-family:Segoe UI,system-ui,sans-serif;max-width:900px;margin:28px auto;padding:0 18px;line-height:1.55;color:#22303c}
h1{font-size:1.4rem;color:#1a5276}
article{page-break-before:always;border-top:3px solid #1a5276;padding-top:16px;margin-top:34px}
article:first-of-type{page-break-before:avoid}
h2{font-size:1.15rem;color:#1a5276;margin:0 0 4px}
.meta{font-size:.84rem;color:#6b7b8a;margin:0 0 12px}
section{margin:16px 0}
h3{font-size:1rem;margin:0 0 6px}h3 small{font-weight:400;color:#6b7b8a}
.ans{background:#fafbfc;border:1px solid #e3e8ee;border-radius:8px;padding:13px 15px}
.rub{background:#fff8e8;border:1px solid #f0dca8;border-radius:6px;padding:8px 12px;font-size:.87rem;margin-bottom:8px}
.fb{background:#eafaf1;border:1px solid #b7e4c7;border-radius:6px;padding:8px 12px;font-size:.87rem;margin-top:8px}
img{max-width:100%;border:1px solid #ccc;border-radius:6px}
figure{margin:12px 0;text-align:center}figcaption{font-size:.84rem;color:#666;font-style:italic}
table{border-collapse:collapse;width:100%;font-size:.86rem}
td,th{border:1px solid #cfd8e0;padding:5px 8px;text-align:left}
th{background:#f0f5f9}
.mathx{background:#f4f9fd}
@media print{article{page-break-before:always}}
</style></head><body>
<h1>${escapeHtml(currentExam.title)} — answer papers</h1>
<p class="meta">${rows.length} student(s) · ${questions.length} question(s) ·
${totalMarks(questions)} marks · generated ${new Date().toLocaleString()}<br>
<b>Faculty copy — it contains the marking scheme. Do not hand it back as it is.</b></p>
${summary}
${body}
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"><\/script>
<script>document.querySelectorAll('span.mathx[data-latex]').forEach(function(n){
  try{katex.render(n.getAttribute('data-latex'),n,{throwOnError:false});}catch(e){}
});<\/script>
</body></html>`;

  download(page, `${slug(currentExam.title)}_papers.html`, "text/html");
  msg($("monitorMsg"), `Downloaded ${rows.length} paper(s).`, "ok");
}

function download(text, filename, type) {
  const blob = new Blob([text], { type: `${type};charset=utf-8;` });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------
function exportCsv() {
  if (!currentRows.length) return msg($("monitorMsg"), "Nothing to export yet.", "warn");
  const questions = (currentExam && currentExam.questions) || [];
  const head = [
    "Name", "SAP ID", "Mobile", "Email", "Status", "Submit reason",
    "Violations", "Violation detail", "Blocked pastes", "Words", "Keystrokes",
    "Diagrams", "Extra minutes", "Started", "Submitted", "Elapsed (min)",
    ...questions.map((q, i) => `Q${i + 1} (${q.marks})`),
    "Score", "Max",
  ];
  const lines = [head.join(",")];

  currentRows.forEach((r) => {
    const start = ms(r.startedAt);
    const end = ms(r.submittedAt);
    const detail = (r.violationLog || [])
      .map((v) => `${v.kind}@${new Date(v.at).toLocaleTimeString()}`).join(" | ");
    lines.push([
      csv(r.name), csv(r.sapId), csv(r.mobile), csv(r.email),
      csv(r.status), csv(r.submitReason || ""),
      r.violations || 0, csv(detail), r.pasteAttempts || 0,
      totalWords(r), r.typedChars || 0, r.imageCount || 0, extraMinutes(r),
      csv(fmtDate(start)), csv(fmtDate(end)),
      start && end ? Math.round((end - start) / 60000) : "",
      ...questions.map((q) => (r.marks || {})[q.id] ?? ""),
      r.score == null ? "" : r.score, r.maxScore ?? totalMarks(questions),
    ].join(","));
  });

  download(lines.join("\n"), `${slug(currentExam?.title || "test")}_marks.csv`, "text/csv");
}

// ---------------------------------------------------------------------------
function ms(ts) {
  if (!ts) return 0;
  if (typeof ts === "number") return ts;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (ts.seconds) return ts.seconds * 1000;
  return 0;
}

function csv(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function fmtDate(msVal) {
  if (!msVal) return "";
  const d = new Date(msVal);
  return d.toLocaleString([], {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);
}
