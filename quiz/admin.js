import { db, ADMIN_PASSCODE, ensureAuth } from "./firebase-config.js";
import {
  collection, doc, setDoc, getDocs, query, where, orderBy, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { normalizeQuestions, readMeta } from "./common.js";

const $ = (id) => document.getElementById(id);
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}

let uploadedRaw = null;        // parsed JSON from file
let uploadedQuestions = null;  // normalized
let monitorUnsub = null;

// ---- Gate ----
$("gateBtn").addEventListener("click", enter);
$("passcode").addEventListener("keydown", (e) => { if (e.key === "Enter") enter(); });
async function enter() {
  if ($("passcode").value !== ADMIN_PASSCODE) {
    return msg($("gateMsg"), "Incorrect passcode.");
  }
  await ensureAuth();
  $("gateView").classList.add("hidden");
  $("app").classList.remove("hidden");
  initApp();
}

// ---- App ----
function initApp() {
  $("jsonFile").addEventListener("change", onFile);
  $("saveQuizBtn").addEventListener("click", saveQuiz);
  $("monitorQuiz").addEventListener("change", startMonitor);
  $("exportBtn").addEventListener("click", exportCsv);
  loadQuizList();
}

// ---- Upload JSON ----
function onFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      uploadedRaw = JSON.parse(reader.result);
      uploadedQuestions = normalizeQuestions(uploadedRaw);
      if (!uploadedQuestions.length) throw new Error("No questions found in file");
      const meta = readMeta(uploadedRaw);
      if (!$("title").value.trim()) {
        $("title").value = meta.assessment || meta.course || file.name.replace(/\.json$/i, "");
      }
      $("jsonInfo").innerHTML =
        `✅ <b>${uploadedQuestions.length}</b> questions loaded` +
        (meta.course ? ` · ${escapeHtml(meta.course)}` : "");
      $("saveQuizBtn").disabled = false;
      msg($("createMsg"), "");
    } catch (e) {
      uploadedQuestions = null;
      $("saveQuizBtn").disabled = true;
      $("jsonInfo").textContent = "";
      msg($("createMsg"), "Could not read that file: " + e.message);
    }
  };
  reader.readAsText(file);
}

// ---- Save quiz ----
async function saveQuiz() {
  if (!uploadedQuestions) return;
  const title = $("title").value.trim();
  if (!title) return msg($("createMsg"), "Please enter a quiz title.");

  const meta = readMeta(uploadedRaw);
  const quizId = slug(title) + "_" + Date.now().toString(36);
  const data = {
    title,
    instructions: meta.instructions || "",
    durationMinutes: Math.max(1, parseInt($("duration").value, 10) || 30),
    marksPerQuestion: parseFloat($("marks").value) || 1,
    negativeMarks: parseFloat($("negative").value) || 0,
    active: $("active").value === "true",
    shuffle: $("shuffle").value === "true",
    questions: uploadedQuestions,     // stored normalized
    totalQuestions: uploadedQuestions.length,
    createdAt: Date.now(),
  };

  $("saveQuizBtn").disabled = true;
  try {
    await setDoc(doc(db, "quizzes", quizId), data);
    msg($("createMsg"),
      `Quiz "<b>${escapeHtml(title)}</b>" saved and ${data.active ? "is now ACTIVE for students" : "saved as draft"}.`,
      "ok");
    // reset file input, keep settings
    $("jsonFile").value = ""; $("jsonInfo").textContent = "";
    uploadedRaw = uploadedQuestions = null;
    await loadQuizList(quizId);
  } catch (e) {
    console.error(e);
    msg($("createMsg"), "Save failed: " + e.message);
  } finally {
    $("saveQuizBtn").disabled = false;
  }
}

// ---- Quiz list (for the monitor dropdown) ----
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
      `<option value="${z.id}">${escapeHtml(z.title)} ${z.active ? "· active" : "· draft"}</option>`).join("");
    if (selectId) sel.value = selectId;
    startMonitor();
  } catch (e) {
    console.error(e);
    sel.innerHTML = `<option value="">Could not load quizzes</option>`;
  }
}

// ---- Live monitor ----
let currentRows = [];
function startMonitor() {
  const quizId = $("monitorQuiz").value;
  if (monitorUnsub) monitorUnsub();
  if (!quizId) return;

  const q = query(collection(db, "attempts"), where("quizId", "==", quizId));
  monitorUnsub = onSnapshot(q, (snap) => {
    currentRows = snap.docs.map((d) => d.data());
    currentRows.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    renderRows(currentRows);
  }, (err) => {
    console.error(err);
    $("rows").innerHTML = `<tr><td colspan="8" class="muted">Live updates unavailable: ${escapeHtml(err.message)}</td></tr>`;
  });
}

function renderRows(rows) {
  if (!rows.length) {
    $("rows").innerHTML = `<tr><td colspan="8" class="muted">No students yet.</td></tr>`;
  } else {
    $("rows").innerHTML = rows.map((r) => {
      const done = r.status === "submitted";
      const statusPill = done
        ? `<span class="pill done">Submitted${r.autoSubmitted ? " (auto)" : ""}</span>`
        : `<span class="pill live">In progress</span>`;
      const flag = (r.tabSwitches || 0) >= 3 ? "flag" : "";
      return `<tr>
        <td>${escapeHtml(r.name || "")}</td>
        <td class="mono">${escapeHtml(r.sapId || "")}</td>
        <td>${statusPill}</td>
        <td class="right-align"><span class="pill ${flag}">${r.tabSwitches || 0}</span></td>
        <td class="right-align">${r.score == null ? "–" : `${r.score} / ${r.maxScore}`}</td>
        <td class="right-align">${r.correctCount == null ? "–" : `${r.correctCount}/${r.totalQuestions ?? r.total ?? ""}`}</td>
        <td>${fmtDate(r.startedAt)}</td>
        <td>${fmtDate(r.submittedAt)}</td>
      </tr>`;
    }).join("");
  }

  // stats
  const total = rows.length;
  const live = rows.filter((r) => r.status !== "submitted").length;
  const done = rows.filter((r) => r.status === "submitted").length;
  const scored = rows.filter((r) => r.score != null);
  const avg = scored.length
    ? (scored.reduce((s, r) => s + r.score, 0) / scored.length).toFixed(1)
    : "–";
  const flagged = rows.filter((r) => (r.tabSwitches || 0) >= 3).length;
  $("sTotal").textContent = total;
  $("sLive").textContent = live;
  $("sDone").textContent = done;
  $("sAvg").textContent = avg;
  $("sFlag").textContent = flagged;
}

// ---- CSV export ----
function exportCsv() {
  if (!currentRows.length) return;
  const head = ["Name", "SAP ID", "Status", "Auto-submitted", "Tab switches", "Score", "Max", "Correct", "Started", "Submitted"];
  const lines = [head.join(",")];
  currentRows.forEach((r) => {
    lines.push([
      csv(r.name), csv(r.sapId), csv(r.status),
      r.autoSubmitted ? "yes" : "no",
      r.tabSwitches || 0,
      r.score ?? "", r.maxScore ?? "", r.correctCount ?? "",
      fmtDate(r.startedAt), fmtDate(r.submittedAt),
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
function csv(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function fmtDate(ms) {
  if (!ms) return "";
  const d = new Date(ms);
  return d.toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
}
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "quiz";
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
