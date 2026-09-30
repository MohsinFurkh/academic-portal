import { db, onUser, signIn, logOut, isAdminUser, authMessage } from "./firebase.js";
import {
  collection, doc, setDoc, updateDoc, getDoc, getDocs, deleteDoc, query, where, orderBy,
  onSnapshot, writeBatch, serverTimestamp, arrayUnion, arrayRemove, deleteField, Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  normalizeAssignment, totalMarks, nextSectionId, starterToHtml, sanitizeHtml, answerStats,
  authorshipWords, mergeCounts, authorshipShares, peerSummary, suggestedFactor, checkLink,
  parseRoster, parseDomains, parseGroups, toMillis, effectiveDeadline, fmtDate, fmtMinutes,
  toLocalInput, fromLocalInput, escapeHtml, slug, joinCode, memberColour,
  MAX_SECTIONS, GROUP_MIN_LIMIT, GROUP_MAX_LIMIT, TEMPLATE_MAX_BYTES, TEMPLATE_CHUNK_CHARS,
} from "./common.js";
import { renderMath } from "./editor.js";

// ---------------------------------------------------------------------------
// Faculty dashboard for assignments
// ---------------------------------------------------------------------------
//   * create / edit an assignment: brief, deadline, individual or group,
//     roster, optional template, sections with starter text and marking scheme
//   * watch submissions live, manage groups, grant extensions, reopen
//   * evaluate with the contribution evidence side by side: who wrote which
//     paragraph, typing and editing history, private peer declarations —
//     and turn a group mark into individual marks
//   * release marks: each student then sees only their own
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}
let toastHandle = null;
function toast(text, kind = "ok") {
  const el = $("toast");
  el.textContent = text;
  el.className = `toast ${kind}`;
  clearTimeout(toastHandle);
  toastHandle = setTimeout(() => el.classList.add("hidden"), 3600);
}

// ---- Form state ----
let qRows = [];
let editingId = null;          // null = a new assignment
let editingA = null;           // the stored version of the one being edited
let editingHasSubs = false;

// ---- Monitor state ----
let monA = null;               // assignment being monitored
let monKey = null;
let rows = [];                 // submissions
let claims = {};               // sap -> claim
let decls = {};                // sid -> { sap: declaration }
let evals = {};                // sid -> evaluation
let monUnsubs = [];
let started = false;

// ===========================================================================
// Sign-in
// ===========================================================================
$("gateBtn").addEventListener("click", enter);
$("password").addEventListener("keydown", (e) => { if (e.key === "Enter") enter(); });

async function enter() {
  const email = $("email").value.trim();
  const password = $("password").value;
  if (!email || !password) return msg($("gateMsg"), "Enter your email and password.");
  $("gateBtn").disabled = true;
  msg($("gateMsg"), "");
  try {
    await signIn(email, password);
  } catch (e) {
    msg($("gateMsg"), "Sign-in failed: " + authMessage(e));
  } finally {
    $("gateBtn").disabled = false;
  }
}

onUser((user) => {
  if (user && isAdminUser(user)) {
    $("gateView").classList.add("hidden");
    $("app").classList.remove("hidden");
    $("whoAdmin").innerHTML =
      `${escapeHtml(user.email)} · <a href="#" id="signOutLink" style="color:#fff">sign out</a>`;
    $("signOutLink").addEventListener("click", (e) => { e.preventDefault(); logOut(); });
    if (!started) { started = true; initApp(); }
  } else {
    $("gateView").classList.remove("hidden");
    $("app").classList.add("hidden");
    $("whoAdmin").textContent = "";
    if (user && !user.isAnonymous && !isAdminUser(user)) {
      msg($("gateMsg"), "That account is not on the faculty list.", "err");
      logOut();
    }
  }
});

// ===========================================================================
function initApp() {
  $("jsonFile").addEventListener("change", onJsonFile);
  $("rosterFile").addEventListener("change", onRosterFile);
  ["roster", "title", "groups", "gMin", "gMax", "domains"].forEach((id) =>
    $(id).addEventListener("input", refreshForm));
  ["rosterOpen", "gForm"].forEach((id) => $(id).addEventListener("change", refreshForm));
  document.querySelectorAll('input[name="mode"], input[name="tpl"]').forEach((el) =>
    el.addEventListener("change", refreshForm));
  $("tplFile").addEventListener("change", refreshForm);
  $("addQBtn").addEventListener("click", () => {
    addSectionRow().querySelector(".f-q").focus();
    refreshForm();
  });
  $("saveBtn").addEventListener("click", saveAssignment);
  $("newBtn").addEventListener("click", () => resetForm());
  $("editSelect").addEventListener("change", () => {
    const id = $("editSelect").value;
    if (id) loadForEdit(id);
  });

  $("monitorSel").addEventListener("change", () => startMonitor($("monitorSel").value));
  $("toggleOpenBtn").addEventListener("click", toggleOpen);
  $("releaseBtn").addEventListener("click", toggleRelease);
  $("exportBtn").addEventListener("click", exportCsv);
  $("reportBtn").addEventListener("click", downloadReport);
  $("rows").addEventListener("click", onRowAction);
  $("strayTable").addEventListener("click", onStrayAction);

  $("evalCancel").addEventListener("click", closeEval);
  $("evalSave").addEventListener("click", saveEval);
  $("manageClose").addEventListener("click", () => $("manageModal").classList.add("hidden"));
  $("manageBody").addEventListener("click", onManageAction);
  $("extCancel").addEventListener("click", () => $("extModal").classList.add("hidden"));
  $("extSave").addEventListener("click", () => saveExtension(false));
  $("extClear").addEventListener("click", () => saveExtension(true));

  resetForm();
  loadLists();
  setInterval(() => { if (rows.length) renderRows(); }, 30000);
}

// ===========================================================================
// Section builder
// ===========================================================================
function addSectionRow(q) {
  const row = document.createElement("div");
  row.className = "qbuild-row";
  row.dataset.id = q?.id || nextSectionId(qRows.map((r) => r.dataset.id));
  row.innerHTML = `
    <div class="qnum"></div>
    <div class="qtext">
      <label>Task / question</label>
      <textarea class="f-q" rows="2" placeholder="e.g. Review at least eight papers on federated learning for healthcare and compare their methods.">${escapeHtml(q?.question || "")}</textarea>
      <label style="margin-top:8px">Guidance shown to students (optional)</label>
      <input type="text" class="f-guide" value="${escapeHtml(q?.guidance || "")}"
        placeholder="e.g. Use a comparison table; cite in IEEE style." />
      <label style="margin-top:8px">Starter text in the student's editor (optional) — one line per paragraph, <code>## </code> for a heading, <code>- </code> for a bullet</label>
      <textarea class="f-starter" rows="3" placeholder="## Introduction&#10;## Method&#10;## Results">${escapeHtml(q?.starter || "")}</textarea>
      <label style="margin-top:8px">Marking scheme (faculty only — never sent to students)</label>
      <textarea class="f-model" rows="2" placeholder="What a full-mark answer contains, and how marks are split.">${escapeHtml(q?.modelAnswer || "")}</textarea>
    </div>
    <div class="qside">
      <label>Marks</label>
      <input type="number" class="f-marks small" value="${q?.marks ?? 10}" min="0" step="0.5" />
      <label style="margin-top:8px">Min words</label>
      <input type="number" class="f-min small" value="${q?.minWords ?? 0}" min="0" />
      <label style="margin-top:8px">Max words</label>
      <input type="number" class="f-max small" value="${q?.maxWords ?? 0}" min="0" />
      <div class="qmove">
        <button type="button" class="btn secondary xs f-up" title="Move up">↑</button>
        <button type="button" class="btn secondary xs f-down" title="Move down">↓</button>
        <button type="button" class="btn secondary xs f-del">Remove</button>
      </div>
    </div>`;
  row.querySelector(".f-del").addEventListener("click", () => {
    if (row.querySelector(".f-q").value.trim() &&
      !window.confirm(editingHasSubs
        ? "Remove this section? Students have already started — anything they wrote in it will no longer be shown or marked."
        : "Remove this section?")) return;
    qRows = qRows.filter((r) => r !== row);
    row.remove();
    renumber();
    refreshForm();
  });
  row.querySelector(".f-up").addEventListener("click", () => moveRow(row, -1));
  row.querySelector(".f-down").addEventListener("click", () => moveRow(row, 1));
  row.addEventListener("input", refreshForm);
  $("qbuild").appendChild(row);
  qRows.push(row);
  renumber();
  return row;
}

function moveRow(row, dir) {
  const i = qRows.indexOf(row);
  const j = i + dir;
  if (j < 0 || j >= qRows.length) return;
  [qRows[i], qRows[j]] = [qRows[j], qRows[i]];
  qRows.forEach((r) => $("qbuild").appendChild(r));
  renumber();
}

function renumber() {
  qRows.forEach((r, i) => { r.querySelector(".qnum").textContent = `${i + 1}`; });
}

// Section ids are kept exactly as they were, so editing the wording after
// students have started never detaches their answers.
function readSections() {
  const questions = [];
  const rubric = {};
  qRows.forEach((r) => {
    const text = r.querySelector(".f-q").value.trim();
    if (!text) return;
    const id = r.dataset.id;
    questions.push({
      id,
      question: text,
      guidance: r.querySelector(".f-guide").value.trim(),
      starter: r.querySelector(".f-starter").value.replace(/\r/g, "").trim().slice(0, 4000),
      marks: Number(r.querySelector(".f-marks").value) || 0,
      minWords: Number(r.querySelector(".f-min").value) || 0,
      maxWords: Number(r.querySelector(".f-max").value) || 0,
    });
    const model = r.querySelector(".f-model").value.trim();
    if (model) rubric[id] = model;
  });
  return { questions, rubric };
}

function radio(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value;
}
function setRadio(name, value) {
  const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (el) el.checked = true;
}

function refreshForm() {
  const mode = radio("mode");
  const tpl = radio("tpl");
  $("groupOpts").classList.toggle("hidden", mode !== "group");
  $("fixedBox").classList.toggle("hidden", !(mode === "group" && $("gForm").value === "fixed"));
  $("tplFileBox").classList.toggle("hidden", tpl !== "file");
  $("tplLinkBox").classList.toggle("hidden", tpl !== "link");

  const { questions } = readSections();
  $("qTotals").textContent = questions.length
    ? `${questions.length} section(s) · ${totalMarks(questions)} marks`
    : "No sections yet.";

  const roster = parseRoster($("roster").value);
  $("rosterInfo").innerHTML = $("rosterOpen").checked
    ? "<b>Roster check is off</b> — any student with an account may start."
    : (roster.length ? `<b>${roster.length}</b> SAP ID(s) may take this assignment.`
      : "No roster yet — required unless you tick the box below.");

  if (mode === "group" && $("gForm").value === "fixed" && !editingHasSubs) {
    const { groups, errors } = parseGroups($("groups").value, groupBounds());
    const off = roster.length && !$("rosterOpen").checked
      ? groups.flatMap((g) => g.members).filter((m) => !roster.includes(m)) : [];
    $("groupsInfo").innerHTML = (groups.length ? `${groups.length} group(s), ${groups.reduce((s, g) => s + g.members.length, 0)} students.` : "No groups yet.") +
      (errors.length ? `<br><span style="color:var(--bad)">⚠ ${errors.map(escapeHtml).join("<br>⚠ ")}</span>` : "") +
      (off.length ? `<br><span style="color:var(--warn)">⚠ Not on the roster: ${off.map(escapeHtml).join(", ")}</span>` : "");
  }

  if (tpl === "file") {
    const f = $("tplFile").files[0];
    const cur = editingA?.template?.kind === "file" ? editingA.template : null;
    $("tplFileInfo").innerHTML = f
      ? (f.size > TEMPLATE_MAX_BYTES
        ? `<span style="color:var(--bad)">⚠ ${escapeHtml(f.name)} is ${(f.size / 1048576).toFixed(1)} MB — the limit is 4 MB. Share it as a link instead.</span>`
        : `Will upload <b>${escapeHtml(f.name)}</b> (${Math.round(f.size / 1024)} KB).`)
      : (cur ? `Current template: <b>${escapeHtml(cur.name)}</b>. Choose a file to replace it.`
        : "Word, PDF, LaTeX, slides, a zip — up to 4 MB. Students download it from the brief.");
  }
}

function groupBounds() {
  const min = Math.min(GROUP_MAX_LIMIT, Math.max(GROUP_MIN_LIMIT, parseInt($("gMin").value, 10) || 2));
  const max = Math.min(GROUP_MAX_LIMIT, Math.max(min, parseInt($("gMax").value, 10) || min));
  return { min, max };
}

function resetForm() {
  editingId = null;
  editingA = null;
  editingHasSubs = false;
  $("formTitle").textContent = "Create an assignment";
  $("editSelect").value = "";
  ["title", "course", "instructions", "roster", "groups", "tplUrl", "tplLabel"].forEach((id) => { $(id).value = ""; });
  $("jsonFile").value = "";
  $("tplFile").value = "";
  $("rosterOpen").checked = false;
  $("active").value = "true";
  $("listed").value = "true";
  $("domains").value = "stu.upes.ac.in, ddn.upes.ac.in";
  const d = new Date(Date.now() + 7 * 86400000);
  d.setHours(23, 59, 0, 0);
  $("deadline").value = toLocalInput(d.getTime());
  setRadio("mode", "individual");
  setRadio("tpl", "none");
  $("gMin").value = 2; $("gMax").value = 4; $("gForm").value = "self";
  setModeLock(false);
  $("qbuild").innerHTML = "";
  qRows = [];
  addSectionRow();
  msg($("createMsg"), "");
  $("saveBtn").textContent = "Save assignment";
  refreshForm();
}

function setModeLock(locked) {
  $("modeBox").querySelectorAll("input, select, textarea").forEach((el) => { el.disabled = locked; });
  $("modeLock").innerHTML = locked
    ? "Students have already started, so individual/group settings cannot change. Manage groups from the table below."
    : "";
}

async function loadForEdit(id) {
  try {
    const [aSnap, kSnap, subSnap] = await Promise.all([
      getDoc(doc(db, "assignments", id)),
      getDoc(doc(db, "assignmentKeys", id)),
      getDocs(query(collection(db, "assignSubs"), where("aid", "==", id))),
    ]);
    if (!aSnap.exists()) return msg($("createMsg"), "That assignment no longer exists.");
    const a = aSnap.data();
    const k = kSnap.exists() ? kSnap.data() : {};
    editingId = id;
    editingA = a;
    editingHasSubs = !subSnap.empty;
    $("formTitle").textContent = `Editing: ${a.title}`;
    $("title").value = a.title || "";
    $("course").value = a.course || "";
    $("instructions").value = a.instructions || "";
    $("deadline").value = toLocalInput(toMillis(a.deadline));
    $("active").value = String(!!a.active);
    $("listed").value = String(a.listed !== false);
    setRadio("mode", a.mode || "individual");
    $("gMin").value = a.groupMin || 2;
    $("gMax").value = a.groupMax || 4;
    $("gForm").value = a.groupFormation || "self";
    $("groups").value = "";
    $("roster").value = (k.roster || []).join("\n");
    $("rosterOpen").checked = !!k.rosterOpen;
    $("domains").value = (a.emailDomains || []).join(", ");
    setRadio("tpl", a.template?.kind || "none");
    $("tplUrl").value = a.template?.kind === "link" ? a.template.url : "";
    $("tplLabel").value = a.template?.kind === "link" ? (a.template.label || "") : "";
    $("tplFile").value = "";
    $("qbuild").innerHTML = "";
    qRows = [];
    (a.questions || []).forEach((q) => addSectionRow({ ...q, modelAnswer: (k.rubric || {})[q.id] || "" }));
    if (!qRows.length) addSectionRow();
    setModeLock(editingHasSubs);
    $("saveBtn").textContent = "Save changes";
    msg($("createMsg"), editingHasSubs
      ? `Students have started this assignment (${subSnap.size} submission(s)). You can still change the brief, deadline, sections and roster.`
      : "", "warn");
    refreshForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    console.error(e);
    msg($("createMsg"), "Could not load that assignment: " + escapeHtml(e.message));
  }
}

function onJsonFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const norm = normalizeAssignment(JSON.parse(reader.result));
      if (!norm.questions.length) throw new Error("no sections found in that file");
      const hasWork = qRows.some((r) => r.querySelector(".f-q").value.trim());
      if (hasWork && !window.confirm("Replace the sections in the form with the ones from this file?")) {
        $("jsonFile").value = "";
        return;
      }
      $("qbuild").innerHTML = "";
      qRows = [];
      norm.questions.forEach((q) => addSectionRow({ ...q, id: undefined }));
      if (norm.title && !$("title").value.trim()) $("title").value = norm.title;
      if (norm.course && !$("course").value.trim()) $("course").value = norm.course;
      if (norm.instructions && !$("instructions").value.trim()) $("instructions").value = norm.instructions;
      msg($("createMsg"), `Loaded <b>${norm.questions.length}</b> section(s) worth <b>${totalMarks(norm.questions)}</b> marks. Check them below, then save.`, "ok");
    } catch (e) {
      msg($("createMsg"), "That file could not be read: " + escapeHtml(e.message));
    }
    refreshForm();
  };
  reader.readAsText(file);
}

function onRosterFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { $("roster").value = String(reader.result || ""); refreshForm(); };
  reader.readAsText(file);
}

// ===========================================================================
// Save
// ===========================================================================
async function saveAssignment() {
  const title = $("title").value.trim();
  const { questions, rubric } = readSections();
  const deadline = fromLocalInput($("deadline").value);
  const roster = parseRoster($("roster").value);
  const rosterOpen = $("rosterOpen").checked;
  const mode = radio("mode");
  const { min, max } = groupBounds();
  const formation = $("gForm").value;
  const tpl = radio("tpl");

  if (!title) return msg($("createMsg"), "Please give the assignment a title.");
  if (!questions.length) return msg($("createMsg"), "Please write at least one section.");
  if (questions.length > MAX_SECTIONS) return msg($("createMsg"), `At most ${MAX_SECTIONS} sections.`);
  if (!deadline) return msg($("createMsg"), "Please set a deadline.");
  if (!editingId && deadline <= Date.now()) return msg($("createMsg"), "The deadline is in the past.");
  if (!roster.length && !rosterOpen) return msg($("createMsg"), "Add the allowed SAP IDs, or tick the open-roster box.");

  let fixedGroups = [];
  if (mode === "group" && formation === "fixed" && !editingHasSubs) {
    const parsed = parseGroups($("groups").value, { min, max });
    if (!parsed.groups.length) return msg($("createMsg"), "Enter the groups, one per line.");
    if (parsed.errors.length) return msg($("createMsg"), "Fix the groups first:<br>" + parsed.errors.map(escapeHtml).join("<br>"));
    fixedGroups = parsed.groups;
  }

  let template = editingA?.template || null;
  let tplFile = null;
  if (tpl === "none") template = null;
  if (tpl === "link") {
    const c = checkLink($("tplUrl").value);
    if (!c.ok) return msg($("createMsg"), "Template link: " + escapeHtml(c.reason));
    template = { kind: "link", url: c.url, label: $("tplLabel").value.trim().slice(0, 80) };
  }
  if (tpl === "file") {
    tplFile = $("tplFile").files[0] || null;
    if (!tplFile && template?.kind !== "file") return msg($("createMsg"), "Choose the template file, or pick None.");
    if (tplFile && tplFile.size > TEMPLATE_MAX_BYTES) return msg($("createMsg"), "The template is larger than 4 MB. Share it as a link instead.");
  }

  const aid = editingId || `${slug(title)}_${Date.now().toString(36)}`;
  $("saveBtn").disabled = true;
  msg($("createMsg"), "Saving…", "ok");
  try {
    if (tplFile) template = await uploadTemplate(aid, tplFile, editingA?.template);

    // The faculty-only document first: if it fails, nothing is half-published.
    await setDoc(doc(db, "assignmentKeys", aid), {
      roster, rosterOpen, rubric, title, updatedAt: serverTimestamp(),
    }, { merge: true });

    const pub = {
      title,
      course: $("course").value.trim(),
      instructions: $("instructions").value.trim(),
      deadline: Timestamp.fromMillis(deadline),
      active: $("active").value === "true",
      listed: $("listed").value === "true",
      emailDomains: parseDomains($("domains").value),
      questions,
      template,
      updatedAt: serverTimestamp(),
    };
    if (!editingHasSubs) {
      Object.assign(pub, {
        mode,
        groupMin: mode === "group" ? min : 1,
        groupMax: mode === "group" ? max : 1,
        groupFormation: mode === "group" ? formation : "none",
      });
    }
    if (!editingId) Object.assign(pub, { createdAt: serverTimestamp(), marksReleased: false });
    await setDoc(doc(db, "assignments", aid), pub, { merge: true });

    if (fixedGroups.length) await createFixedGroups(aid, fixedGroups);

    editingId = aid;
    await loadForEdit(aid);
    await loadLists(aid);
    msg($("createMsg"),
      `“<b>${escapeHtml(title)}</b>” saved — ${questions.length} section(s), ${totalMarks(questions)} marks, ` +
      `due ${fmtDate(deadline)}${fixedGroups.length ? `, ${fixedGroups.length} group(s) created` : ""}. ` +
      `Students open it at <code>assignment/</code>.`, "ok");
  } catch (e) {
    console.error(e);
    msg($("createMsg"), "Save failed: " + escapeHtml(e.message) + " — check that the Firestore rules are published.");
  } finally {
    $("saveBtn").disabled = false;
  }
}

async function uploadTemplate(aid, file, old) {
  const b64 = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = () => reject(new Error("could not read the template file"));
    r.readAsDataURL(file);
  });
  const parts = [];
  for (let i = 0; i < b64.length; i += TEMPLATE_CHUNK_CHARS) parts.push(b64.slice(i, i + TEMPLATE_CHUNK_CHARS));
  for (let i = 0; i < parts.length; i++) {
    await setDoc(doc(db, "assignTemplates", aid, "chunks", String(i)), { b64: parts[i], i });
  }
  // A shorter replacement must not leave the old file's tail behind.
  for (let i = parts.length; i < (old?.chunks || 0); i++) {
    await deleteDoc(doc(db, "assignTemplates", aid, "chunks", String(i))).catch(() => { });
  }
  return { kind: "file", name: file.name.slice(0, 120), type: file.type || "application/octet-stream", size: file.size, chunks: parts.length };
}

// Teacher-defined groups exist before any student signs in. Each member is
// listed by SAP ID, and an index entry lets them find their group when they
// first open the assignment.
async function createFixedGroups(aid, groups) {
  const b = writeBatch(db);
  groups.forEach((g, i) => {
    const sid = `${aid}__g_${joinCode()}`;
    b.set(doc(db, "assignSubs", sid), {
      aid, kind: "group", formation: "fixed", gname: g.name || `Group ${i + 1}`,
      members: g.members, memberUids: [], memberNames: {},
      leader: g.members[0], confirmed: true, status: "draft",
      answers: {}, wordCounts: {}, locks: {}, links: [], contrib: {},
      createdAt: serverTimestamp(), lastEditAt: null, lastEditBy: null, actor: "faculty", revCount: 0,
    });
    g.members.forEach((m) => b.set(doc(db, "assignGroupIndex", `${aid}__${m}`), { aid, sid, sapId: m }));
  });
  await b.commit();
}

// ===========================================================================
// Lists
// ===========================================================================
async function loadLists(selectId) {
  let items = [];
  try {
    const snap = await getDocs(query(collection(db, "assignments"), orderBy("createdAt", "desc")));
    items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error(e);
    $("monitorSel").innerHTML = `<option value="">Could not load assignments</option>`;
    return;
  }
  const opts = items.map((z) => {
    const open = z.active && toMillis(z.deadline) > Date.now();
    return `<option value="${z.id}">${escapeHtml(z.title)} · ${open ? "OPEN" : "closed"}${z.listed === false ? " · hidden" : ""}</option>`;
  }).join("");
  $("editSelect").innerHTML = `<option value="">Edit an existing assignment…</option>${opts}`;
  if (editingId) $("editSelect").value = editingId;
  if (!items.length) {
    $("monitorSel").innerHTML = `<option value="">No assignments yet</option>`;
    return;
  }
  const keep = selectId || $("monitorSel").value;
  $("monitorSel").innerHTML = opts;
  if (keep && items.some((z) => z.id === keep)) $("monitorSel").value = keep;
  startMonitor($("monitorSel").value);
}

// ===========================================================================
// Monitor
// ===========================================================================
function startMonitor(aid) {
  monUnsubs.forEach((u) => u());
  monUnsubs = [];
  monA = null; monKey = null; rows = []; claims = {}; decls = {}; evals = {};
  msg($("monitorMsg"), "");
  if (!aid) return;

  getDoc(doc(db, "assignmentKeys", aid)).then((s) => { monKey = s.exists() ? s.data() : {}; renderRows(); });
  monUnsubs.push(onSnapshot(doc(db, "assignments", aid), (s) => {
    monA = s.exists() ? { id: aid, ...s.data() } : null;
    renderRows();
  }));
  const watch = (col, fn) => monUnsubs.push(onSnapshot(
    query(collection(db, col), where("aid", "==", aid)), fn,
    (err) => { console.error(col, err); msg($("monitorMsg"), `Live updates for ${col} unavailable: ${escapeHtml(err.message)}`); }));
  watch("assignSubs", (snap) => {
    rows = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
    renderRows();
  });
  watch("assignStudents", (snap) => {
    claims = {};
    snap.docs.forEach((d) => { claims[d.data().sapId] = { _id: d.id, ...d.data() }; });
    renderRows();
  });
  watch("assignDecls", (snap) => {
    decls = {};
    snap.docs.forEach((d) => { const x = d.data(); (decls[x.sid] = decls[x.sid] || {})[x.sapId] = x; });
    renderRows();
  });
  watch("assignEvals", (snap) => {
    evals = {};
    snap.docs.forEach((d) => { evals[d.id] = d.data(); });
    renderRows();
  });
}

function subLabel(r) {
  if (r.kind !== "group") return r.memberNames?.[r.members[0]] || r.members[0];
  if (r.gname) return r.gname;
  return `${r.memberNames?.[r.leader] || r.leader}’s group`;
}

function subState(r) {
  if (r.kind === "group" && !r.confirmed) return { key: "forming", html: `<span class="pill live">Forming</span>` };
  if (r.status === "submitted") return { key: "submitted", html: `<span class="pill done">Submitted</span>` };
  const open = monA && monA.active && Date.now() < effectiveDeadline(monA, r);
  if (!open) return { key: "closed", html: `<span class="pill warnpill">Closed at deadline</span>` };
  return { key: "draft", html: `<span class="pill live">In progress</span>` };
}

function authorCounts(r) {
  return mergeCounts((monA?.questions || []).map((q) => authorshipWords(r.answers?.[q.id] || "")));
}

function totalWordsOf(r) {
  return Object.values(r.wordCounts || {}).reduce((s, n) => s + (Number(n) || 0), 0);
}

function renderRows() {
  if (!monA) return;
  const a = monA;
  const nowMs = Date.now();
  const open = a.active && toMillis(a.deadline) > nowMs;
  $("toggleOpenBtn").textContent = a.active ? "Close now" : "Reopen";
  $("releaseBtn").textContent = a.marksReleased ? "Hide marks" : "Release marks";
  $("monitorSub").innerHTML =
    `${a.mode === "group" ? `Group (${a.groupMin}–${a.groupMax}, ${a.groupFormation === "fixed" ? "set by you" : "students form their own"})` : "Individual"} · ` +
    `${(a.questions || []).length} section(s), ${totalMarks(a.questions)} marks · deadline <b>${fmtDate(toMillis(a.deadline))}</b> · ` +
    `${open ? `<span class="pill live">open</span>` : `<span class="pill muted">closed</span>`}` +
    `${a.marksReleased ? ` <span class="pill done">marks released</span>` : ""} · ` +
    `student link: <code>assignment/#a=${escapeHtml(a.id)}</code>`;

  const live = rows.filter((r) => r.members && r.members.length);
  live.sort((x, y) => subLabel(x).localeCompare(subLabel(y)));
  $("rows").innerHTML = live.length ? live.map((r) => {
    const st = subState(r);
    const words = totalWordsOf(r);
    const counts = authorCounts(r);
    const shares = authorshipShares(counts, r.members);
    const bar = r.kind === "group"
      ? `<div class="sharebar" title="${r.members.map((m) => `${escapeHtml(r.memberNames?.[m] || m)}: ${shares[m]}%`).join("\n")}">
          ${r.members.map((m) => `<span style="width:${shares[m]}%;background:${memberColour(r.members, m)}"></span>`).join("")}</div>`
      : `<span class="muted">–</span>`;
    const ndecl = Object.keys(decls[r._id] || {}).length;
    const ev = evals[r._id];
    const ext = toMillis(r.extensionUntil) > toMillis(a.deadline)
      ? ` <span class="pill warnpill" title="Extended to ${fmtDate(toMillis(r.extensionUntil))}">ext. ${fmtDate(toMillis(r.extensionUntil))}</span>` : "";
    const who = r.members.map((m) => {
      const joined = !!(r.memberNames && r.memberNames[m]);
      return `<span class="${joined ? "" : "muted"}" title="${joined ? "" : "has not signed in"}">${escapeHtml(r.memberNames?.[m] || "—")} <span class="mono muted" style="font-size:.75rem">${escapeHtml(m)}</span>${m === r.leader && r.kind === "group" ? " ★" : ""}</span>`;
    }).join("<br>");
    const acts = [
      `<button class="btn xs" data-act="eval" data-id="${r._id}">${st.key === "draft" || st.key === "forming" ? "View" : "Evaluate"}</button>`,
      `<button class="btn secondary xs" data-act="ext" data-id="${r._id}">Extend</button>`,
    ];
    if (r.kind === "group") acts.push(`<button class="btn secondary xs" data-act="manage" data-id="${r._id}">Manage</button>`);
    if (r.status === "submitted") acts.push(`<button class="btn secondary xs" data-act="reopen" data-id="${r._id}">Reopen</button>`);
    else if (st.key === "draft") acts.push(`<button class="btn danger xs" data-act="close" data-id="${r._id}">Mark submitted</button>`);
    return `<tr>
      <td><b>${escapeHtml(subLabel(r))}</b>${r.kind === "group" ? `<br><span style="font-size:.82rem">${who}</span>` : `<br><span class="mono muted" style="font-size:.78rem">${escapeHtml(r.members[0])}</span>`}</td>
      <td>${st.html}${ext}${r.status === "submitted" ? `<br><span class="muted" style="font-size:.75rem">${fmtDate(toMillis(r.submittedAt))}</span>` : ""}</td>
      <td class="right-align">${words}</td>
      <td>${bar}</td>
      <td class="muted" style="font-size:.8rem">${r.lastEditAt ? `${escapeHtml(r.memberNames?.[r.lastEditBy] || r.lastEditBy || "")}<br>${fmtDate(toMillis(r.lastEditAt))}` : "–"}</td>
      <td class="right-align">${r.kind === "group" ? `${ndecl}/${r.members.length}` : "–"}</td>
      <td class="right-align">${(r.links || []).length}</td>
      <td class="right-align">${ev ? `<b>${ev.groupScore}</b> / ${ev.maxScore}` : "–"}</td>
      <td class="row-actions">${acts.join("")}</td>
    </tr>`;
  }).join("") : `<tr><td colspan="9" class="muted">No submissions yet.</td></tr>`;

  // Stats
  const roster = monKey?.roster || [];
  const states = live.map(subState);
  const graded = live.filter((r) => evals[r._id]);
  const scores = graded.map((r) => Number(evals[r._id].groupScore)).filter(Number.isFinite);
  $("sRoster").textContent = monKey?.rosterOpen ? "open" : roster.length;
  $("sLinked").textContent = Object.keys(claims).length;
  $("sSubs").textContent = live.length;
  $("sSubsL").textContent = a.mode === "group" ? "Groups" : "Submissions";
  $("sDone").textContent = states.filter((s) => s.key === "submitted").length;
  $("sClosed").textContent = states.filter((s) => s.key === "closed").length;
  $("sGraded").textContent = graded.length;
  $("sAvg").textContent = scores.length ? (scores.reduce((x, y) => x + y, 0) / scores.length).toFixed(1) : "–";
  renderStrays(live);
}

// Roster students with no submission, and signed-in students without a group.
function renderStrays(live) {
  const inSub = new Map();
  live.forEach((r) => r.members.forEach((m) => inSub.set(m, r)));
  const roster = monKey?.rosterOpen ? Object.keys(claims) : (monKey?.roster || []);
  const all = [...new Set([...roster, ...Object.keys(claims)])];
  const strays = all.filter((m) => !inSub.has(m)).sort();
  $("strayCount").textContent = strays.length;
  $("strayTable").innerHTML = strays.length
    ? `<thead><tr><th>SAP ID</th><th>Name</th><th>Email</th><th>State</th><th>Action</th></tr></thead><tbody>${strays.map((m) => {
      const c = claims[m];
      return `<tr><td class="mono">${escapeHtml(m)}</td><td>${escapeHtml(c?.name || "–")}</td>
        <td style="font-size:.82rem">${escapeHtml(c?.email || "")}</td>
        <td>${c ? (monA.mode === "group" ? "Signed in, not in a group" : "Signed in") : "Has not opened it"}</td>
        <td>${c ? `<button class="btn secondary xs" data-act="reset" data-sap="${escapeHtml(m)}">Reset account link</button>` : ""}</td></tr>`;
    }).join("")}</tbody>`
    : `<tbody><tr><td class="muted">Everyone on the roster is in a submission.</td></tr></tbody>`;
}

async function onStrayAction(e) {
  const b = e.target.closest("button[data-act='reset']");
  if (!b) return;
  await resetLink(b.dataset.sap, null);
}

// ===========================================================================
// Row actions
// ===========================================================================
async function onRowAction(ev) {
  const b = ev.target.closest("button[data-act]");
  if (!b) return;
  const r = rows.find((x) => x._id === b.dataset.id);
  if (!r) return;
  b.disabled = true;
  try {
    if (b.dataset.act === "eval") await openEval(r);
    else if (b.dataset.act === "ext") openExtension(r);
    else if (b.dataset.act === "manage") openManage(r);
    else if (b.dataset.act === "reopen") await reopen(r);
    else if (b.dataset.act === "close") await markSubmitted(r);
  } finally {
    b.disabled = false;
  }
}

async function reopen(r) {
  const open = monA.active && Date.now() < effectiveDeadline(monA, r);
  if (!window.confirm(`Reopen ${subLabel(r)} for editing?` +
    (open ? "" : "\n\nThe deadline has passed — they will not be able to edit unless you also give them an extension (Extend)."))) return;
  try {
    await updateDoc(doc(db, "assignSubs", r._id), { status: "draft", submittedAt: deleteField(), submittedBy: deleteField(), actor: "faculty" });
    toast("Reopened.", "ok");
  } catch (e) {
    toast("Could not reopen: " + e.message, "err");
  }
}

async function markSubmitted(r) {
  if (!window.confirm(`Mark ${subLabel(r)} as submitted now? Nobody in it can edit afterwards.`)) return;
  try {
    await updateDoc(doc(db, "assignSubs", r._id), {
      status: "submitted", submittedAt: serverTimestamp(), submittedBy: "faculty", locks: {}, actor: "faculty",
    });
    toast("Marked submitted.", "ok");
  } catch (e) {
    toast("Could not update: " + e.message, "err");
  }
}

async function toggleOpen() {
  if (!monA) return;
  const to = !monA.active;
  if (!to && !window.confirm("Close this assignment now? Nobody can edit until you reopen it — extensions included.")) return;
  if (to && toMillis(monA.deadline) <= Date.now()) {
    window.alert("The deadline has passed. Reopening lets only groups with an extension edit. To reopen for everyone, edit the assignment and move the deadline.");
  }
  await updateDoc(doc(db, "assignments", monA.id), { active: to });
  toast(to ? "Reopened." : "Closed.", "ok");
  loadLists(monA.id);
}

async function toggleRelease() {
  if (!monA) return;
  const to = !monA.marksReleased;
  const graded = rows.filter((r) => evals[r._id]).length;
  if (to && !window.confirm(`Release marks? ${graded} of ${rows.filter((r) => r.members?.length).length} submission(s) are evaluated. Each student sees only their own mark and the feedback.`)) return;
  await updateDoc(doc(db, "assignments", monA.id), { marksReleased: to });
  toast(to ? "Marks released." : "Marks hidden from students.", "ok");
}

// ===========================================================================
// Extensions
// ===========================================================================
let extRow = null;
function openExtension(r) {
  extRow = r;
  const cur = effectiveDeadline(monA, r);
  $("extTitle").textContent = `Extend — ${subLabel(r)}`;
  $("extSub").textContent = `Assignment deadline: ${fmtDate(toMillis(monA.deadline))}.` +
    (toMillis(r.extensionUntil) ? ` Current extension: ${fmtDate(toMillis(r.extensionUntil))}.` : "");
  $("extUntil").value = toLocalInput(Math.max(cur, Date.now()) + 86400000);
  $("extReopenWrap").classList.toggle("hidden", r.status !== "submitted");
  $("extReopen").checked = r.status === "submitted";
  $("extModal").classList.remove("hidden");
}

async function saveExtension(clear) {
  if (!extRow) return;
  const f = { actor: "faculty" };
  if (clear) f.extensionUntil = deleteField();
  else {
    const t = fromLocalInput($("extUntil").value);
    if (!t || t <= Date.now()) return toast("Choose a time in the future.", "err");
    f.extensionUntil = Timestamp.fromMillis(t);
    if (extRow.status === "submitted" && $("extReopen").checked) {
      Object.assign(f, { status: "draft", submittedAt: deleteField(), submittedBy: deleteField() });
    }
  }
  try {
    await updateDoc(doc(db, "assignSubs", extRow._id), f);
    $("extModal").classList.add("hidden");
    toast(clear ? "Extension removed." : "Extension saved.", "ok");
  } catch (e) {
    toast("Could not save: " + e.message, "err");
  }
}

// ===========================================================================
// Manage a group
// ===========================================================================
let manageId = null;
function openManage(r) {
  manageId = r._id;
  paintManage();
  $("manageModal").classList.remove("hidden");
}

function paintManage() {
  const r = rows.find((x) => x._id === manageId);
  if (!r) { $("manageModal").classList.add("hidden"); return; }
  msg($("manageMsg"), "");
  $("manageTitle").textContent = `Manage — ${subLabel(r)}`;
  const hasText = totalWordsOf(r) > 0;
  $("manageBody").innerHTML = `
    <label for="mgName">Group name</label>
    <div style="display:flex;gap:8px"><input type="text" id="mgName" value="${escapeHtml(r.gname || "")}" maxlength="60" />
      <button class="btn secondary sm" data-act="rename">Rename</button></div>
    <table style="margin-top:14px"><thead><tr><th>Member</th><th>Account</th><th>Action</th></tr></thead><tbody>
    ${r.members.map((m) => {
      const c = claims[m];
      return `<tr><td>${escapeHtml(r.memberNames?.[m] || "—")} <span class="mono muted">${escapeHtml(m)}</span>${m === r.leader ? " ★ leader" : ""}</td>
        <td style="font-size:.8rem">${c ? escapeHtml(c.email) : "<span class='muted'>not signed in</span>"}</td>
        <td class="row-actions">
          ${m !== r.leader ? `<button class="btn secondary xs" data-act="lead" data-sap="${escapeHtml(m)}">Make leader</button>` : ""}
          ${c ? `<button class="btn secondary xs" data-act="reset" data-sap="${escapeHtml(m)}">Reset link</button>` : ""}
          <button class="btn danger xs" data-act="remove" data-sap="${escapeHtml(m)}">Remove</button>
        </td></tr>`;
    }).join("")}</tbody></table>
    <label for="mgAdd" style="margin-top:14px">Add a student by SAP ID</label>
    <div style="display:flex;gap:8px"><input type="text" id="mgAdd" placeholder="e.g. 500098765" />
      <button class="btn secondary sm" data-act="add">Add</button></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
      <button class="btn secondary sm" data-act="confirm">${r.confirmed ? "Reopen for joining" : "Confirm group"}</button>
      ${hasText ? "" : `<button class="btn danger sm" data-act="delete">Delete group</button>`}
    </div>
    <p class="fine">Removing a member keeps everything they wrote in the group's text. The
      student can then join or be added to another group.</p>`;
}

async function onManageAction(e) {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const r = rows.find((x) => x._id === manageId);
  if (!r) return;
  const ref = doc(db, "assignSubs", r._id);
  const m = b.dataset.sap;
  b.disabled = true;
  try {
    if (b.dataset.act === "rename") {
      await updateDoc(ref, { gname: $("mgName").value.trim().slice(0, 60), actor: "faculty" });
    } else if (b.dataset.act === "lead") {
      await updateDoc(ref, { leader: m, actor: "faculty" });
    } else if (b.dataset.act === "reset") {
      await resetLink(m, r);
    } else if (b.dataset.act === "remove") {
      if (!window.confirm(`Remove ${r.memberNames?.[m] || m} from ${subLabel(r)}?`)) return;
      const c = claims[m];
      const bt = writeBatch(db);
      const rest = r.members.filter((x) => x !== m);
      const f = { members: arrayRemove(m), [`memberNames.${m}`]: deleteField(), actor: "faculty" };
      if (c?.uid) f.memberUids = arrayRemove(c.uid);
      if (r.leader === m && rest.length) f.leader = rest[0];
      bt.update(ref, f);
      if (c && c.groupId === r._id) bt.update(doc(db, "assignStudents", c._id), { groupId: null });
      bt.delete(doc(db, "assignGroupIndex", `${monA.id}__${m}`));
      await bt.commit();
    } else if (b.dataset.act === "add") {
      const sapId = $("mgAdd").value.trim();
      if (!/^[A-Za-z0-9]{3,20}$/.test(sapId)) return msg($("manageMsg"), "Enter a valid SAP ID.");
      const other = rows.find((x) => x._id !== r._id && (x.members || []).includes(sapId));
      if (other) return msg($("manageMsg"), `${escapeHtml(sapId)} is already in ${escapeHtml(subLabel(other))}. Remove them there first.`);
      if (r.members.includes(sapId)) return msg($("manageMsg"), "Already in this group.");
      if (r.members.length >= monA.groupMax && !window.confirm(`This makes the group larger than ${monA.groupMax}. Add anyway?`)) return;
      const c = claims[sapId];
      const bt = writeBatch(db);
      const f = { members: arrayUnion(sapId), actor: "faculty" };
      if (c) { f.memberUids = arrayUnion(c.uid); f[`memberNames.${sapId}`] = c.name || sapId; }
      bt.update(ref, f);
      if (c) bt.update(doc(db, "assignStudents", c._id), { groupId: r._id });
      bt.set(doc(db, "assignGroupIndex", `${monA.id}__${sapId}`), { aid: monA.id, sid: r._id, sapId });
      await bt.commit();
    } else if (b.dataset.act === "confirm") {
      await updateDoc(ref, { confirmed: !r.confirmed, actor: "faculty" });
    } else if (b.dataset.act === "delete") {
      if (!window.confirm("Delete this group? Its members become ungrouped.")) return;
      const bt = writeBatch(db);
      r.members.forEach((x) => {
        const c = claims[x];
        if (c && c.groupId === r._id) bt.update(doc(db, "assignStudents", c._id), { groupId: null });
        bt.delete(doc(db, "assignGroupIndex", `${monA.id}__${x}`));
      });
      bt.delete(ref);
      await bt.commit();
      $("manageModal").classList.add("hidden");
      return;
    }
    // The snapshot listener updates `rows`; repaint once it has.
    setTimeout(paintManage, 400);
  } catch (err) {
    console.error(err);
    msg($("manageMsg"), "Could not update the group: " + escapeHtml(err.message));
  } finally {
    b.disabled = false;
  }
}

// Frees a SAP ID from the account that claimed it — a forgotten password, or
// an ID someone else took. The student's place in their group is kept (by SAP
// ID); their next account slots back into it on first sign-in.
async function resetLink(sapId, r) {
  const c = claims[sapId];
  if (!c) return;
  if (!window.confirm(`Reset the account link for ${c.name || sapId} (${c.email})?\n\n` +
    "That account loses access. The student signs in with a new (or the same) account and is put straight back into their submission.")) return;
  const bt = writeBatch(db);
  bt.delete(doc(db, "assignStudents", c._id));
  const sid = c.groupId || r?._id;
  if (sid) {
    bt.update(doc(db, "assignSubs", sid), { memberUids: arrayRemove(c.uid), actor: "faculty" });
    bt.set(doc(db, "assignGroupIndex", `${monA.id}__${sapId}`), { aid: monA.id, sid, sapId });
  }
  try {
    await bt.commit();
    toast("Account link reset.", "ok");
  } catch (e) {
    toast("Could not reset: " + e.message, "err");
  }
}

// ===========================================================================
// Evaluation
// ===========================================================================
let evalRow = null;
let evalRevs = [];

async function openEval(r) {
  evalRow = r;
  const a = monA;
  const qs = a.questions || [];
  const rubric = monKey?.rubric || {};
  const ev = evals[r._id] || {};
  const isGroup = r.kind === "group";
  const counts = authorCounts(r);
  const shares = authorshipShares(counts, r.members);
  const d = decls[r._id] || {};
  const peers = isGroup ? peerSummary(Object.fromEntries(Object.entries(d).map(([k, v]) => [k, { split: v.split }])), r.members) : {};
  const st = subState(r);

  try {
    const snap = await getDocs(query(collection(db, "assignSubs", r._id, "revs"), orderBy("at", "asc")));
    evalRevs = snap.docs.map((x) => ({ _id: x.id, ...x.data() }));
  } catch (e) {
    evalRevs = [];
  }

  $("evalTitle").textContent = `${subLabel(r)} — ${a.title}`;
  $("evalMeta").innerHTML =
    `${st.html} · ${totalWordsOf(r)} words · ` +
    (r.status === "submitted"
      ? `submitted ${fmtDate(toMillis(r.submittedAt))} by ${escapeHtml(r.memberNames?.[r.submittedBy] || r.submittedBy || "")}`
      : `deadline ${fmtDate(effectiveDeadline(a, r))}`) +
    ` · ${evalRevs.length} edit session(s) recorded`;

  // ---- Evidence ----
  const c = r.contrib || {};
  const evidence = r.members.map((m) => {
    const s = c[m] || {};
    const words = counts[m] || 0;
    const typed = s.typed || 0;
    // A member credited with far more words than keys they pressed did not
    // type them here. Evidence to look at, not a verdict.
    const suspect = words > 40 && typed < words * 3;
    const p = peers[m] || {};
    const factor = suggestedFactor(p.share, isGroup ? shares[m] : 100, r.members.length);
    return { m, s, words, typed, suspect, p, factor };
  });

  const evidenceHtml = `
    <h3 style="margin:6px 0">Who did what</h3>
    <div class="legend">${r.members.map((m) => `<span><i style="background:${memberColour(r.members, m)}"></i>${escapeHtml(r.memberNames?.[m] || m)}</span>`).join("")}
      ${counts[""] ? `<span><i style="background:#7f8c8d"></i>starter template (${counts[""]} words)</span>` : ""}</div>
    <div style="overflow-x:auto"><table class="contrib-table">
      <thead><tr><th>Member</th><th class="right-align">Words written</th><th class="right-align">Keys typed</th>
        <th class="right-align">Active</th><th class="right-align">Sessions</th><th class="right-align">Blocked pastes</th>
        ${isGroup ? `<th class="right-align">Team-mates say</th><th class="right-align">Self</th><th class="right-align">Suggested factor</th>` : ""}</tr></thead>
      <tbody>${evidence.map((x) => `<tr>
        <td><span class="legend" style="margin:0"><span><i style="background:${memberColour(r.members, x.m)}"></i>${escapeHtml(r.memberNames?.[x.m] || x.m)}</span></span>
          <span class="mono muted" style="font-size:.75rem">${escapeHtml(x.m)}${claims[x.m] ? " · " + escapeHtml(claims[x.m].email) : ""}</span></td>
        <td class="right-align">${x.words}${isGroup ? ` <span class="muted">(${shares[x.m]}%)</span>` : ""}</td>
        <td class="right-align">${x.typed.toLocaleString()}${x.suspect ? ` <span title="Many more words than keys typed — check the edit history" style="color:var(--bad)">⚑</span>` : ""}</td>
        <td class="right-align">${fmtMinutes(x.s.activeSec)}</td>
        <td class="right-align">${x.s.sessions || 0}</td>
        <td class="right-align">${(x.s.pastes || 0) ? `<b style="color:var(--warn)">${x.s.pastes}</b>` : 0}${(x.s.bulk || 0) ? ` <span class="muted" title="bulk text inserts">+${x.s.bulk}b</span>` : ""}</td>
        ${isGroup ? `<td class="right-align">${x.p.peer == null ? "–" : x.p.peer + "%"} <span class="muted">(${x.p.raters})</span>${x.p.share != null ? `<br><span class="muted" style="font-size:.75rem">→ ${x.p.share}% share</span>` : ""}</td>
          <td class="right-align">${x.p.self == null ? "–" : x.p.self + "%"}</td>
          <td class="right-align"><b>${x.factor}</b></td>` : ""}
      </tr>`).join("")}</tbody></table></div>
    <p class="fine">An equal share is ${isGroup ? (100 / r.members.length).toFixed(0) + "%" : "100%"}. Suggested factor =
      team-mates’ ratings, rescaled so the group adds up to 100%, ÷ equal share. Until every member has
      been rated it falls back to the share of words written. Limited to 0.5–1.2.</p>
    ${isGroup ? `<details><summary style="cursor:pointer;font-weight:600;color:var(--primary)">Private declarations (${Object.keys(d).length} of ${r.members.length})</summary>
      ${r.members.map((m) => {
      const x = d[m];
      if (!x) return `<p class="fine"><b>${escapeHtml(r.memberNames?.[m] || m)}</b> — not filled in.</p>`;
      return `<div style="margin:8px 0"><b>${escapeHtml(r.memberNames?.[m] || m)}</b> <span class="muted" style="font-size:.8rem">${fmtDate(toMillis(x.at))}</span>
          <div class="fine">Split: ${r.members.map((y) => `${escapeHtml(r.memberNames?.[y] || y)} ${x.split?.[y] ?? "?"}%`).join(" · ")}</div>
          <div class="stmt">${escapeHtml(x.statement || "")}</div></div>`;
    }).join("")}</details>` : ""}
    ${(r.links || []).length ? `<h3 style="margin:14px 0 6px">Supplementary files</h3><ul class="link-list">${r.links.map((l) => {
      const ok = checkLink(l.url);
      return `<li><div class="lk">${ok.ok ? `<a href="${escapeHtml(ok.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || ok.host)}</a>` : escapeHtml(l.label || "")}
        <div class="by">${escapeHtml(ok.host || l.url)} · added by ${escapeHtml(l.name || l.by || "")}</div></div></li>`;
    }).join("")}</ul>` : ""}
    <label class="chk-line" style="margin-top:14px"><input type="checkbox" id="showAuthors" checked /> Colour each paragraph by who wrote it</label>`;

  // ---- Sections ----
  const sectionsHtml = qs.map((q, i) => {
    const html = sanitizeHtml(r.answers?.[q.id] || "");
    const byWho = authorshipWords(html);
    const who = Object.entries(byWho).filter(([k]) => k).map(([k, v]) => `${escapeHtml(r.memberNames?.[k] || k)} ${v}`).join(" · ");
    return `<div class="paper-q">
      <div class="q-num">SECTION ${i + 1} <span class="q-marks">${escapeHtml(String(q.marks))} marks</span></div>
      <div class="q-text">${escapeHtml(q.question)}</div>
      ${rubric[q.id] ? `<div class="rubric"><b>Marking scheme:</b> ${escapeHtml(rubric[q.id])}</div>` : ""}
      <div class="fine" style="margin-top:8px">${answerStats(html).words} words${who ? " — " + who : ""}</div>
      <div class="paper-ans authors-on" style="margin-top:6px">${html || "<i class='muted'>Empty</i>"}</div>
      <div class="mark-row">
        <div class="mk"><label>Marks (max ${escapeHtml(String(q.marks))})</label>
          <input type="number" class="ev-mark" data-qid="${escapeHtml(q.id)}" min="0" max="${escapeHtml(String(q.marks))}" step="0.5" value="${ev.marks?.[q.id] ?? ""}" /></div>
        <div class="fb"><label>Feedback on this section</label>
          <textarea class="ev-fb" data-qid="${escapeHtml(q.id)}" rows="1">${escapeHtml(ev.feedback?.[q.id] || "")}</textarea></div>
      </div>
    </div>`;
  }).join("");

  // ---- History ----
  const qIndex = Object.fromEntries(qs.map((q, i) => [q.id, i + 1]));
  const historyHtml = `
    <h3 style="margin:18px 0 6px">Edit history</h3>
    ${evalRevs.length ? `<div class="tl"><table><thead><tr><th>When</th><th>Who</th><th>Section</th><th class="right-align">Words</th><th class="right-align">Keys</th><th></th></tr></thead><tbody>
      ${evalRevs.map((v, i) => {
      const delta = (v.words || 0) - (v.wordsBefore || 0);
      return `<tr><td>${fmtDate(toMillis(v.at))}</td><td>${escapeHtml(v.name || v.actor)}</td><td>${qIndex[v.qid] || "?"}${v.kind && v.kind !== "session" ? ` <span class="muted">(${escapeHtml(v.kind)})</span>` : ""}</td>
          <td class="right-align">${v.wordsBefore ?? "?"} → ${v.words ?? "?"} <span class="${delta < 0 ? "muted" : ""}">(${delta >= 0 ? "+" : ""}${delta})</span></td>
          <td class="right-align">${v.typed || 0}</td>
          <td><button class="btn secondary xs" data-rev="${i}">View</button></td></tr>`;
    }).join("")}</tbody></table></div><div id="revView"></div>`
      : `<p class="fine">No edit sessions recorded yet.</p>`}`;

  // ---- Marks ----
  const members = r.members;
  const indiv = isGroup ? `
    <h3 style="margin:18px 0 6px">Individual marks</h3>
    <p class="fine">Individual mark = group total × factor (rounded to 0.5, never above the maximum). Change a factor, or type a mark directly.</p>
    <table><thead><tr><th>Member</th><th style="width:100px">Factor</th><th style="width:110px">Mark</th><th>Comment for this student only</th></tr></thead><tbody>
    ${members.map((m) => {
      const saved = ev.members?.[m];
      const sug = evidence.find((x) => x.m === m).factor;
      return `<tr><td>${escapeHtml(r.memberNames?.[m] || m)}</td>
        <td><input type="number" class="ev-factor" data-m="${escapeHtml(m)}" step="0.05" min="0" max="2" value="${saved?.factor ?? sug}" /></td>
        <td><input type="number" class="ev-score" data-m="${escapeHtml(m)}" step="0.5" min="0" value="${saved?.score ?? ""}" ${saved?.manual ? 'data-manual="1"' : ""} /></td>
        <td><textarea class="ev-comment" data-m="${escapeHtml(m)}" rows="1" style="font-family:inherit">${escapeHtml(saved?.comment || "")}</textarea></td></tr>`;
    }).join("")}</tbody></table>` : `
    <label>Comment for the student</label>
    <textarea class="ev-comment" data-m="${escapeHtml(members[0])}" rows="2" style="font-family:inherit">${escapeHtml(ev.members?.[members[0]]?.comment || "")}</textarea>`;

  $("evalBody").innerHTML = `
    ${evidenceHtml}
    <div id="evalSections">${sectionsHtml}</div>
    ${historyHtml}
    <label style="margin-top:18px">Overall feedback (seen by every member)</label>
    <textarea id="evOverall" rows="3" style="font-family:inherit">${escapeHtml(ev.overall || "")}</textarea>
    ${indiv}`;

  paintAuthorColours($("evalSections"), r);
  $("showAuthors").addEventListener("change", (e) => {
    $("evalSections").classList.toggle("show-authors", e.target.checked);
  });
  $("evalSections").classList.add("show-authors");
  $("evalBody").querySelectorAll(".ev-mark").forEach((el) => el.addEventListener("input", recompute));
  $("evalBody").querySelectorAll(".ev-factor").forEach((el) => el.addEventListener("input", recompute));
  $("evalBody").querySelectorAll(".ev-score").forEach((el) => el.addEventListener("input", () => { el.dataset.manual = "1"; }));
  $("evalBody").querySelectorAll("button[data-rev]").forEach((b) => b.addEventListener("click", () => showRev(Number(b.dataset.rev))));
  $("evalMax").textContent = totalMarks(qs);
  recompute();
  await renderMath($("evalBody"));
  $("evalModal").classList.remove("hidden");
}

function paintAuthorColours(root, r) {
  root.querySelectorAll("[data-a]").forEach((el) => {
    const who = el.getAttribute("data-a");
    el.style.setProperty("--author", memberColour(r.members, who));
    el.title = `Written by ${r.memberNames?.[who] || who}`;
  });
}

async function showRev(i) {
  const v = evalRevs[i];
  if (!v) return;
  const q = (monA.questions || []).find((x) => x.id === v.qid);
  $("revView").innerHTML = `<div class="notice ok" style="color:var(--text);margin-top:10px">
    <b>${escapeHtml(v.name || v.actor)}</b> · ${fmtDate(toMillis(v.at))} · section “${escapeHtml((q?.question || "").slice(0, 60))}”
    — the section as it stood at the end of this session:
    <div class="paper-ans show-authors" style="margin-top:8px">${sanitizeHtml(v.html || "") || "<i>empty</i>"}</div></div>`;
  paintAuthorColours($("revView"), evalRow);
  await renderMath($("revView"));
}

function recompute() {
  let t = 0;
  $("evalBody").querySelectorAll(".ev-mark").forEach((el) => {
    const n = Number(el.value);
    if (el.value !== "" && Number.isFinite(n)) t += n;
  });
  t = Math.round(t * 100) / 100;
  $("evalTotal").textContent = t;
  const max = totalMarks(monA.questions);
  $("evalBody").querySelectorAll(".ev-score").forEach((el) => {
    if (el.dataset.manual === "1") return;
    const f = Number($("evalBody").querySelector(`.ev-factor[data-m="${CSS.escape(el.dataset.m)}"]`)?.value);
    const s = Math.min(max, Math.round(t * (Number.isFinite(f) ? f : 1) * 2) / 2);
    el.value = s;
  });
}

function closeEval() {
  $("evalModal").classList.add("hidden");
  evalRow = null;
}

async function saveEval() {
  if (!evalRow) return;
  const r = evalRow;
  const qs = monA.questions || [];
  const marks = {};
  const feedback = {};
  let over = null;
  $("evalBody").querySelectorAll(".ev-mark").forEach((el) => {
    if (el.value === "") return;
    const n = Number(el.value);
    if (!Number.isFinite(n)) return;
    if (n > Number(el.max)) over = el.dataset.qid;
    marks[el.dataset.qid] = n;
  });
  $("evalBody").querySelectorAll(".ev-fb").forEach((el) => {
    if (el.value.trim()) feedback[el.dataset.qid] = el.value.trim().slice(0, 2000);
  });
  if (over && !window.confirm("A section has more marks than it is worth. Save anyway?")) return;
  const missing = qs.filter((q) => marks[q.id] == null).length;
  if (missing && !window.confirm(`${missing} section(s) have no mark. Save anyway?`)) return;

  const groupScore = Math.round(Object.values(marks).reduce((x, y) => x + y, 0) * 100) / 100;
  const maxScore = totalMarks(qs);
  const overall = $("evOverall").value.trim().slice(0, 4000);
  const members = {};
  r.members.forEach((m) => {
    const comment = $("evalBody").querySelector(`.ev-comment[data-m="${CSS.escape(m)}"]`)?.value.trim().slice(0, 2000) || "";
    if (r.kind === "group") {
      const fEl = $("evalBody").querySelector(`.ev-factor[data-m="${CSS.escape(m)}"]`);
      const sEl = $("evalBody").querySelector(`.ev-score[data-m="${CSS.escape(m)}"]`);
      members[m] = {
        factor: Number(fEl.value) || 0,
        score: Number(sEl.value) || 0,
        manual: sEl.dataset.manual === "1",
        comment,
      };
    } else {
      members[m] = { factor: 1, score: groupScore, manual: false, comment };
    }
  });

  $("evalSave").disabled = true;
  try {
    const b = writeBatch(db);
    b.set(doc(db, "assignEvals", r._id), {
      aid: monA.id, sid: r._id, marks, feedback, overall, groupScore, maxScore, members,
      gradedAt: serverTimestamp(),
    });
    // One released-mark document per student: team-mates never see each
    // other's individual mark or the comment written for someone else.
    r.members.forEach((m) => {
      b.set(doc(db, "assignGrades", `${r._id}__${m}`), {
        aid: monA.id, sid: r._id, sapId: m, name: r.memberNames?.[m] || "", title: monA.title,
        groupScore, maxScore, score: members[m].score, marks, feedback, overall,
        comment: members[m].comment, gradedAt: serverTimestamp(),
      });
    });
    await b.commit();
    toast(`Saved ${groupScore} / ${maxScore} for ${subLabel(r)}.`, "ok");
    closeEval();
  } catch (e) {
    console.error(e);
    window.alert("Could not save the marks: " + e.message);
  } finally {
    $("evalSave").disabled = false;
  }
}

// ===========================================================================
// Export
// ===========================================================================
function exportCsv() {
  if (!monA) return;
  const header = ["Assignment", "Group", "SAP ID", "Name", "Email", "Status", "Submitted", "Words written",
    "Share %", "Keys typed", "Active min", "Sessions", "Blocked pastes", "Peer %", "Self %",
    "Group mark", "Individual mark", "Max"];
  const lines = [header.map(csv).join(",")];
  rows.filter((r) => r.members?.length).forEach((r) => {
    const counts = authorCounts(r);
    const shares = authorshipShares(counts, r.members);
    const peers = r.kind === "group"
      ? peerSummary(Object.fromEntries(Object.entries(decls[r._id] || {}).map(([k, v]) => [k, { split: v.split }])), r.members) : {};
    const ev = evals[r._id];
    r.members.forEach((m) => {
      const s = r.contrib?.[m] || {};
      lines.push([
        monA.title, r.kind === "group" ? subLabel(r) : "", m, r.memberNames?.[m] || claims[m]?.name || "",
        claims[m]?.email || "", subState(r).key, r.submittedAt ? fmtDate(toMillis(r.submittedAt)) : "",
        counts[m] || 0, r.kind === "group" ? shares[m] : 100, s.typed || 0, Math.round((s.activeSec || 0) / 60),
        s.sessions || 0, s.pastes || 0, peers[m]?.peer ?? "", peers[m]?.self ?? "",
        ev ? ev.groupScore : "", ev ? (ev.members?.[m]?.score ?? "") : "", ev ? ev.maxScore : totalMarks(monA.questions),
      ].map(csv).join(","));
    });
  });
  download(lines.join("\n"), `${slug(monA.title)}_marks.csv`, "text/csv");
}

function csv(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function downloadReport() {
  if (!monA) return;
  const a = monA;
  const qs = a.questions || [];
  const rubric = monKey?.rubric || {};
  const live = rows.filter((r) => r.members?.length).sort((x, y) => subLabel(x).localeCompare(subLabel(y)));
  if (!live.length) return toast("There are no submissions yet.", "warn");

  const colourise = (html, r) => {
    const d = new DOMParser().parseFromString(`<body>${sanitizeHtml(html)}</body>`, "text/html");
    d.body.querySelectorAll("[data-a]").forEach((el) => {
      el.setAttribute("style", `border-left:4px solid ${memberColour(r.members, el.getAttribute("data-a"))};padding-left:8px`);
    });
    return d.body.innerHTML;
  };

  const body = live.map((r) => {
    const counts = authorCounts(r);
    const shares = authorshipShares(counts, r.members);
    const ev = evals[r._id];
    const legend = r.members.map((m) => `<span style="margin-right:14px"><span style="display:inline-block;width:10px;height:10px;background:${memberColour(r.members, m)};border-radius:2px"></span>
      ${escapeHtml(r.memberNames?.[m] || m)} (${escapeHtml(m)}) — ${counts[m] || 0} words${r.kind === "group" ? `, ${shares[m]}%` : ""}${ev?.members?.[m] ? ` · mark ${ev.members[m].score}` : ""}</span>`).join("");
    return `<article><h2>${escapeHtml(subLabel(r))}</h2>
      <p class="meta">${subState(r).key} ${r.submittedAt ? "· submitted " + fmtDate(toMillis(r.submittedAt)) : ""}
        ${ev ? ` · <b>group mark ${ev.groupScore} / ${ev.maxScore}</b>` : ""}<br>${legend}</p>
      ${(r.links || []).length ? `<p class="meta">Files: ${r.links.map((l) => `<a href="${escapeHtml(checkLink(l.url).url || "")}">${escapeHtml(l.label || l.url)}</a>`).join(" · ")}</p>` : ""}
      ${qs.map((q, i) => `<section><h3>${i + 1}. ${escapeHtml(q.question)} <small>(${escapeHtml(String(q.marks))} marks${ev?.marks?.[q.id] != null ? ` · awarded ${ev.marks[q.id]}` : ""})</small></h3>
        ${rubric[q.id] ? `<div class="rub"><b>Marking scheme:</b> ${escapeHtml(rubric[q.id])}</div>` : ""}
        <div class="ans">${colourise(r.answers?.[q.id] || "", r) || "<i>Empty</i>"}</div>
        ${ev?.feedback?.[q.id] ? `<div class="fb"><b>Feedback:</b> ${escapeHtml(ev.feedback[q.id])}</div>` : ""}</section>`).join("")}
    </article>`;
  }).join("");

  const page = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${escapeHtml(a.title)} — all submissions</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<style>body{font-family:Segoe UI,system-ui,sans-serif;max-width:920px;margin:28px auto;padding:0 18px;line-height:1.55;color:#22303c}
h1{font-size:1.4rem;color:#1a5276}article{page-break-before:always;border-top:3px solid #1a5276;padding-top:16px;margin-top:34px}
article:first-of-type{page-break-before:avoid}h2{font-size:1.15rem;color:#1a5276;margin:0 0 4px}
.meta{font-size:.85rem;color:#6b7b8a;margin:0 0 10px}section{margin:16px 0}h3{font-size:1rem;margin:0 0 6px}h3 small{font-weight:400;color:#6b7b8a}
.ans{background:#fafbfc;border:1px solid #e3e8ee;border-radius:8px;padding:13px 15px}
.rub{background:#fff8e8;border:1px solid #f0dca8;border-radius:6px;padding:8px 12px;font-size:.87rem;margin-bottom:8px}
.fb{background:#eafaf1;border:1px solid #b7e4c7;border-radius:6px;padding:8px 12px;font-size:.87rem;margin-top:8px}
table{border-collapse:collapse}td,th{border:1px solid #cfd8e0;padding:5px 8px}</style></head><body>
<h1>${escapeHtml(a.title)} — submissions</h1>
<p class="meta">${live.length} submission(s) · ${qs.length} section(s) · ${totalMarks(qs)} marks · deadline ${fmtDate(toMillis(a.deadline))} ·
generated ${new Date().toLocaleString()}<br>Coloured bars show who last wrote each paragraph.
<b>Faculty copy — contains the marking scheme.</b></p>
${body}
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"><\/script>
<script>document.querySelectorAll('span.mathx[data-latex]').forEach(function(n){
  try{katex.render(n.getAttribute('data-latex'),n,{throwOnError:false});}catch(e){}});<\/script>
</body></html>`;
  download(page, `${slug(a.title)}_submissions.html`, "text/html");
}

function download(text, filename, type) {
  const blob = new Blob([text], { type: `${type};charset=utf-8;` });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

void starterToHtml;
