import {
  db, auth, signInAdmin, signOutAdmin, onAdminChange, isAdminUser,
} from "./firebase-config.js";
import {
  collection, doc, setDoc, updateDoc, getDoc, getDocs, query, where, orderBy, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  normalizeQuestions, readMeta, splitKey, mergeKey, parseRoster, gradeAttempt,
} from "./common.js";

const $ = (id) => document.getElementById(id);
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}

let uploadedRaw = null;
let uploadedQuestions = null;
let monitorUnsub = null;
let currentRows = [];
let started = false;

// ---------------------------------------------------------------------------
// Sign in (real Firebase Auth — the Firestore rules check the same account)
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
    // An anonymous session (left over from opening the student page in this
    // browser) is not an error — just show the sign-in form.
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
  $("roster").addEventListener("input", onRosterInput);
  $("saveQuizBtn").addEventListener("click", saveQuiz);
  $("monitorQuiz").addEventListener("change", startMonitor);
  $("exportBtn").addEventListener("click", exportCsv);
  $("gradeBtn").addEventListener("click", gradeAll);
  $("closeQuizBtn").addEventListener("click", closeQuiz);
  loadQuizList();
  setInterval(() => renderRows(currentRows), 15000); // refresh "live" column
}

// ---- Upload questions ----
function onFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      uploadedRaw = JSON.parse(reader.result);
      uploadedQuestions = normalizeQuestions(uploadedRaw);
      if (!uploadedQuestions.length) throw new Error("No questions found in file");

      const missing = uploadedQuestions.filter((q) => !q.correct || !q.correct.length);
      const meta = readMeta(uploadedRaw);
      if (!$("title").value.trim()) {
        $("title").value = meta.assessment || meta.course || file.name.replace(/\.json$/i, "");
      }
      $("jsonInfo").innerHTML =
        `✅ <b>${uploadedQuestions.length}</b> questions loaded` +
        (meta.course ? ` · ${escapeHtml(meta.course)}` : "") +
        (missing.length
          ? `<br><span style="color:var(--bad)">⚠ ${missing.length} question(s) have no correct answer marked — they would score 0 for everyone.</span>`
          : "");
      refreshSaveState();
      msg($("createMsg"), "");
    } catch (e) {
      uploadedQuestions = null;
      $("jsonInfo").textContent = "";
      refreshSaveState();
      msg($("createMsg"), "Could not read that file: " + e.message);
    }
  };
  reader.readAsText(file);
}

// ---- Roster ----
function onRosterFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    $("roster").value = String(reader.result);
    onRosterInput();
  };
  reader.readAsText(file);
}

function onRosterInput() {
  const ids = parseRoster($("roster").value);
  $("rosterInfo").innerHTML = ids.length
    ? `✅ <b>${ids.length}</b> SAP ID(s) on the roster. Only these students can start the quiz.`
    : `No roster loaded — <b>the quiz cannot be saved without one</b>.`;
  refreshSaveState();
}

function refreshSaveState() {
  const ok = !!uploadedQuestions && parseRoster($("roster").value).length > 0;
  $("saveQuizBtn").disabled = !ok;
}

// ---- Save quiz (splits public questions from the answer key) ----
async function saveQuiz() {
  if (!uploadedQuestions) return;
  const title = $("title").value.trim();
  if (!title) return msg($("createMsg"), "Please enter a quiz title.");
  const roster = parseRoster($("roster").value);
  if (!roster.length) return msg($("createMsg"), "Please add the allowed SAP IDs.");

  const meta = readMeta(uploadedRaw);
  const quizId = slug(title) + "_" + Date.now().toString(36);
  const { publicQuestions, correct, explanations } = splitKey(uploadedQuestions);

  const publicDoc = {
    title,
    instructions: meta.instructions || "",
    durationMinutes: Math.max(1, parseInt($("duration").value, 10) || 20),
    marksPerQuestion: parseFloat($("marks").value) || 1,
    negativeMarks: parseFloat($("negative").value) || 0,
    maxViolations: Math.max(1, parseInt($("maxViolations").value, 10) || 3),
    active: $("active").value === "true",
    shuffle: $("shuffle").value === "true",
    questions: publicQuestions,          // no correct answers here
    totalQuestions: publicQuestions.length,
    createdAt: Date.now(),
  };

  $("saveQuizBtn").disabled = true;
  try {
    // Key first: if this fails, no half-published quiz exists for students.
    await setDoc(doc(db, "quizKeys", quizId), {
      correct, explanations, roster, createdAt: Date.now(), title,
    });
    await setDoc(doc(db, "quizzes", quizId), publicDoc);

    msg($("createMsg"),
      `Quiz "<b>${escapeHtml(title)}</b>" saved with <b>${roster.length}</b> students on the roster and ` +
      `${publicDoc.active ? "<b>is now ACTIVE</b>" : "saved as a draft"}. ` +
      `The answer key is stored separately in <code>quizKeys/${quizId}</code>.`, "ok");
    $("jsonFile").value = ""; $("jsonInfo").textContent = "";
    uploadedRaw = uploadedQuestions = null;
    refreshSaveState();
    await loadQuizList(quizId);
  } catch (e) {
    console.error(e);
    msg($("createMsg"), "Save failed: " + e.message +
      " — check that your account is in the Firestore rules.");
  } finally {
    refreshSaveState();
  }
}

// ---- Quiz list ----
async function loadQuizList(selectId) {
  const sel = $("monitorQuiz");
  try {
    const snap = await getDocs(query(collection(db, "quizzes"), orderBy("createdAt", "desc")));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (!items.length) {
      sel.innerHTML = `<option value="">No quizzes yet</option>`;
      return;
    }
    sel.innerHTML = items.map((z) =>
      `<option value="${z.id}">${escapeHtml(z.title)} ${z.active ? "· ACTIVE" : "· draft"}</option>`).join("");
    if (selectId) sel.value = selectId;
    startMonitor();
  } catch (e) {
    console.error(e);
    sel.innerHTML = `<option value="">Could not load quizzes</option>`;
  }
}

// ---- Live monitor ----
function startMonitor() {
  const quizId = $("monitorQuiz").value;
  if (monitorUnsub) monitorUnsub();
  msg($("monitorMsg"), "");
  if (!quizId) return;

  checkQuizHealth(quizId);

  const q = query(collection(db, "attempts"), where("quizId", "==", quizId));
  monitorUnsub = onSnapshot(q, (snap) => {
    currentRows = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
    currentRows.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    renderRows(currentRows);
  }, (err) => {
    console.error(err);
    $("rows").innerHTML =
      `<tr><td colspan="10" class="muted">Live updates unavailable: ${escapeHtml(err.message)}</td></tr>`;
  });
}

function renderRows(rows) {
  const nowMs = Date.now();
  if (!rows.length) {
    $("rows").innerHTML = `<tr><td colspan="10" class="muted">No students yet.</td></tr>`;
  } else {
    $("rows").innerHTML = rows.map((r) => {
      const done = r.status === "submitted";
      const v = r.violations || 0;
      const lastSeen = ms(r.lastSeenAt);
      const stale = !done && lastSeen && (nowMs - lastSeen > 60000);
      const statusPill = done
        ? `<span class="pill done">Submitted${r.autoSubmitted ? ` (${escapeHtml(r.submitReason || "auto")})` : ""}</span>`
        : `<span class="pill live">In progress</span>`;
      const answered = Object.values(r.answers || {}).filter((a) => a && a.length).length;
      const log = r.violationLog || [];
      const last = log.length ? log[log.length - 1] : null;
      return `<tr>
        <td>${escapeHtml(r.name || "")}</td>
        <td class="mono">${escapeHtml(r.sapId || "")}</td>
        <td>${statusPill}</td>
        <td class="right-align"><span class="pill ${v >= 2 ? "flag" : ""}">${v}</span></td>
        <td class="muted" style="font-size:.82rem">${last ? `${escapeHtml(last.kind || "")} · ${fmtDate(last.at)}` : "–"}</td>
        <td class="right-align">${answered}/${r.totalQuestions ?? "–"}</td>
        <td class="right-align">${r.score == null ? (r.graded ? "0" : "<span class='muted'>ungraded</span>") : `<b>${r.score}</b> / ${r.maxScore}`}</td>
        <td>${fmtDate(ms(r.startedAt))}</td>
        <td>${fmtDate(ms(r.submittedAt))}</td>
        <td>${done ? "–" : stale ? `<span class="pill flag">stale</span>` : `<span class="pill done">live</span>`}</td>
      </tr>`;
    }).join("");
  }

  const total = rows.length;
  const done = rows.filter((r) => r.status === "submitted").length;
  const scored = rows.filter((r) => r.score != null);
  const avg = scored.length
    ? (scored.reduce((s, r) => s + r.score, 0) / scored.length).toFixed(1) : "–";
  const stale = rows.filter((r) =>
    r.status !== "submitted" && ms(r.lastSeenAt) && (nowMs - ms(r.lastSeenAt) > 60000)).length;
  $("sTotal").textContent = total;
  $("sLive").textContent = total - done;
  $("sDone").textContent = done;
  $("sAvg").textContent = avg;
  $("sFlag").textContent = rows.filter((r) => (r.violations || 0) >= 2).length;
  $("sStale").textContent = stale;
}

// Warns about quizzes saved before the security update: they have no answer key
// document and no roster, so (a) students cannot start them under the new rules
// and (b) their answers are still sitting in the student-readable document.
async function checkQuizHealth(quizId) {
  try {
    const [zSnap, kSnap] = await Promise.all([
      getDoc(doc(db, "quizzes", quizId)),
      getDoc(doc(db, "quizKeys", quizId)),
    ]);
    if (!zSnap.exists()) return;
    const z = zSnap.data();
    const leaks = (z.questions || []).some((q) => "correct" in q);
    if (!kSnap.exists() || leaks) {
      msg($("monitorMsg"),
        "<b>This quiz was created before the security update.</b> " +
        (leaks ? "Its correct answers are still stored in the student-readable document, and " : "") +
        "it has no roster, so students will be blocked by the new Firestore rules. " +
        "Re-upload the JSON above, add the roster, and save it again as a new quiz " +
        "before using it.", "err");
    }
  } catch (e) {
    console.warn("health check failed", e);
  }
}

// ---- Grading (faculty side only) ----
async function gradeAll() {
  const quizId = $("monitorQuiz").value;
  if (!quizId) return;
  if (!currentRows.length) return msg($("monitorMsg"), "No attempts to grade.", "warn");
  if (!window.confirm(`Grade ${currentRows.length} attempt(s) for this quiz?`)) return;

  $("gradeBtn").disabled = true;
  msg($("monitorMsg"), "Grading…", "warn");
  try {
    const [zSnap, kSnap] = await Promise.all([
      getDoc(doc(db, "quizzes", quizId)),
      getDoc(doc(db, "quizKeys", quizId)),
    ]);
    if (!zSnap.exists()) throw new Error("Quiz not found");
    if (!kSnap.exists()) throw new Error("Answer key not found for this quiz (was it saved before the update?)");

    const z = zSnap.data();
    const questions = mergeKey(z.questions, kSnap.data().correct);
    const marks = z.marksPerQuestion || 1;
    const neg = z.negativeMarks || 0;

    let graded = 0, failed = 0;
    for (const r of currentRows) {
      if (r.status !== "submitted") continue;
      const res = gradeAttempt(questions, r.answers || {}, marks, neg);
      try {
        await updateDoc(doc(db, "attempts", r._id), {
          score: res.score,
          maxScore: res.maxScore,
          correctCount: res.correctCount,
          totalQuestions: res.total,
          graded: true,
          gradedAt: Date.now(),
        });
        graded++;
      } catch (e) {
        console.error("grade failed for", r._id, e);
        failed++;
      }
    }
    msg($("monitorMsg"),
      `Graded <b>${graded}</b> submitted attempt(s)${failed ? `, <b>${failed}</b> failed` : ""}. ` +
      `Unsubmitted attempts were skipped.`, failed ? "warn" : "ok");
  } catch (e) {
    console.error(e);
    msg($("monitorMsg"), "Grading failed: " + e.message);
  } finally {
    $("gradeBtn").disabled = false;
  }
}

// ---- Close a quiz (stops new attempts immediately) ----
async function closeQuiz() {
  const quizId = $("monitorQuiz").value;
  if (!quizId) return;
  if (!window.confirm("Close this quiz? Students who have not started will no longer be able to.")) return;
  try {
    await updateDoc(doc(db, "quizzes", quizId), { active: false });
    msg($("monitorMsg"), "Quiz closed. Students already in progress can still submit.", "ok");
    await loadQuizList(quizId);
  } catch (e) {
    msg($("monitorMsg"), "Could not close the quiz: " + e.message);
  }
}

// ---- CSV ----
function exportCsv() {
  if (!currentRows.length) return;
  const head = ["Name", "SAP ID", "Status", "Submit reason", "Violations", "Violation times",
    "Answered", "Score", "Max", "Correct", "Started", "Submitted", "Duration (min)"];
  const lines = [head.join(",")];
  currentRows.forEach((r) => {
    const started = ms(r.startedAt), sub = ms(r.submittedAt);
    const answered = Object.values(r.answers || {}).filter((a) => a && a.length).length;
    const times = (r.violationLog || []).map((v) => `${v.kind}@${fmtDate(v.at)}`).join(" | ");
    lines.push([
      csv(r.name), csv(r.sapId), csv(r.status), csv(r.submitReason || ""),
      r.violations || 0, csv(times), answered,
      r.score ?? "", r.maxScore ?? "", r.correctCount ?? "",
      csv(fmtDate(started)), csv(fmtDate(sub)),
      started && sub ? ((sub - started) / 60000).toFixed(1) : "",
    ].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `quiz_results_${$("monitorQuiz").value}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ---- utils ----
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
  return new Date(msVal).toLocaleString([], {
    hour: "2-digit", minute: "2-digit", second: "2-digit", day: "2-digit", month: "short",
  });
}
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "quiz";
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
