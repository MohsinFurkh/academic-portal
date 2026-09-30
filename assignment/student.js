import {
  db, onUser, signIn, register, resetPassword, logOut, authMessage, isAdminUser,
} from "./firebase.js";
import {
  collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, addDoc, onSnapshot,
  writeBatch, runTransaction, serverTimestamp, increment, arrayUnion, arrayRemove, deleteField,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  starterToHtml, answerStats, authorshipWords, mergeCounts, authorshipShares, validSplit,
  checkLink, validMobile, validSap, validEmail, emailDomainOk, toMillis, effectiveDeadline,
  fmtCountdown, fmtDate, fmtMinutes, escapeHtml, joinCode, JOIN_CODE_RE, uid8, memberColour,
  totalMarks, sanitizeHtml, countWords, safeId, slug,
  MAX_LINKS, LOCK_STALE_MS, LOCK_HEARTBEAT_MS, LOCK_IDLE_RELEASE_MS, DECLARATION_GRACE_HOURS,
} from "./common.js";
import { createEditor, renderMath } from "./editor.js";
import { createGuard } from "./guard.js";

// ---------------------------------------------------------------------------
// Student side of the assignment system
// ---------------------------------------------------------------------------
//   * a real account (email + password): work continues from any device
//   * individual or group submissions; groups formed by code or by the teacher
//   * one member edits a section at a time (a lock in the submission), and
//     everyone else sees it update live
//   * every paragraph is stamped with its writer; keystrokes, active time and
//     edit sessions are counted per member; each editing session leaves an
//     immutable snapshot in the history — the evidence of who did what
//   * pasting from outside is blocked, as in the exam (guard.js / editor.js)
//   * supplementary files are LINKS to the student's own cloud drive
//   * the deadline is enforced by the Firestore rules on the server's clock;
//     this page only mirrors it
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
const views = {
  boot: $("bootView"), auth: $("authView"), profile: $("profileView"),
  home: $("homeView"), work: $("workView"),
};
function show(name) {
  Object.entries(views).forEach(([k, el]) => el.classList.toggle("hidden", k !== name));
  document.body.classList.toggle("working", name === "work");
  window.scrollTo(0, 0);
}
function msg(el, text, kind = "err") {
  el.innerHTML = text ? `<div class="notice ${kind}">${text}</div>` : "";
}

// ---- Session state ----
let user = null;
let profile = null;
let pendingProfile = null;       // filled in by "Create account", written once signed in
let clockOffset = 0;             // serverNow - Date.now()
const now = () => Date.now() + clockOffset;
const DEV = uid8();              // this tab — tells "me, here" from "me, on my phone"

// ---- Workspace state ----
let A = null;                    // the assignment (with .id)
let aid = null;
let sap = null;                  // my SAP ID
let myName = "";
let claimRef = null;
let sid = null;
let subRef = null;
let sub = null;                  // latest snapshot of the submission
let unsubs = [];
let editors = {};                // qid -> editor
let applied = {};                // qid -> last remote HTML put into the editor
let held = {};                   // qid -> this tab's editing session on that section
let pending = { typed: 0, active: 0, pastes: 0, bulk: 0 };
let lastKeyAt = 0;
let tickers = [];
let guard = null;
let writesInFlight = 0;
let lastWriteFailed = false;
let built = false;
let closedReason = "";           // "", "submitted", "deadline", "closed"
let myDecl = null;

// ===========================================================================
// Boot and accounts
// ===========================================================================
bindStatic();

onUser(async (u) => {
  teardownWorkspace();
  if (!u || u.isAnonymous) {
    user = null;
    profile = null;
    paintWho();
    show("auth");
    return;
  }
  if (isAdminUser(u)) {
    user = null;
    show("auth");
    msg($("authMsg"),
      "You are signed in with the <b>faculty</b> account. Use the " +
      "<a href=\"admin.html\">faculty dashboard</a>, or " +
      "<button class=\"linkbtn\" id=\"adminOut\">sign out</button> to use a student account.", "warn");
    $("adminOut")?.addEventListener("click", () => logOut());
    return;
  }
  user = u;
  try {
    profile = await loadProfile();
  } catch (e) {
    console.error(e);
    show("auth");
    return msg($("authMsg"), "Could not reach the server. Check your connection and reload.");
  }
  if (!profile) {
    show("profile");
    if (pendingProfile) {
      $("pfName").value = pendingProfile.name;
      $("pfSap").value = pendingProfile.sapId;
      $("pfMobile").value = pendingProfile.mobile;
    }
    return;
  }
  await syncClock();
  paintWho();
  route();
});

async function loadProfile() {
  const ref = doc(db, "assignProfiles", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  // Just registered: the details typed on the form are written now.
  if (pendingProfile) {
    const data = { ...pendingProfile, email: user.email, createdAt: serverTimestamp() };
    await setDoc(ref, data);
    pendingProfile = null;
    return data;
  }
  return null;
}

// The server's clock, not the laptop's: a deadline shown from a wrong device
// clock would tell a student they have an hour they do not have.
async function syncClock() {
  try {
    const ref = doc(db, "assignProfiles", user.uid);
    await updateDoc(ref, { seenAt: serverTimestamp() });
    const snap = await getDoc(ref);
    const t = toMillis(snap.data()?.seenAt);
    if (t) clockOffset = t - Date.now();
  } catch (e) {
    console.warn("clock sync failed", e);
  }
}

function paintWho() {
  if (!user || !profile) { $("whoami").innerHTML = ""; return; }
  $("whoami").innerHTML =
    `${escapeHtml(profile.name)} · ${escapeHtml(profile.sapId)} · ` +
    `<button class="linkbtn" id="signOutBtn">sign out</button>`;
  $("signOutBtn").addEventListener("click", async () => {
    if (hasUnsaved() && !(await ask("Sign out?", "Some changes are still being saved. Signing out now may lose them.", "Sign out"))) return;
    await releaseAll("sign-out");
    location.hash = "";
    logOut();
  });
}

function bindStatic() {
  $("tabSignIn").addEventListener("click", () => authTab(false));
  $("tabRegister").addEventListener("click", () => authTab(true));
  $("signInBtn").addEventListener("click", onSignIn);
  $("inPass").addEventListener("keydown", (e) => { if (e.key === "Enter") onSignIn(); });
  $("registerBtn").addEventListener("click", onRegister);
  $("forgotBtn").addEventListener("click", onForgot);
  $("profileBtn").addEventListener("click", onSaveProfile);
  $("refreshBtn").addEventListener("click", showHome);
  $("backBtn").addEventListener("click", () => { location.hash = ""; });
  $("submitBtn").addEventListener("click", openSubmit);
  $("submitBtn2").addEventListener("click", openSubmit);
  $("backupBtn").addEventListener("click", downloadCopy);
  $("backupBtn2").addEventListener("click", downloadCopy);
  $("submitCancel").addEventListener("click", () => $("submitModal").classList.add("hidden"));
  $("submitGo").addEventListener("click", doSubmit);
  $("linkAddBtn").addEventListener("click", addLink);
  $("linkUrl").addEventListener("keydown", (e) => { if (e.key === "Enter") addLink(); });
  $("declSaveBtn").addEventListener("click", saveDeclaration);
  $("declStmt").addEventListener("input", paintDeclWords);
  $("sections").addEventListener("click", onSectionClick);
  $("groupCard").addEventListener("click", onGroupClick);
  $("linkList").addEventListener("click", onLinkListClick);
  window.addEventListener("hashchange", route);
  window.addEventListener("beforeunload", (e) => {
    if (!hasUnsaved()) return;
    e.preventDefault();
    e.returnValue = "";
  });
  // Best effort: free the sections this tab holds, so team-mates are not
  // left waiting for the stale timeout.
  window.addEventListener("pagehide", () => {
    if (!subRef || !Object.keys(held).length) return;
    const f = { actor: sap };
    Object.keys(held).forEach((q) => { if (lockIsMine(q)) f[`locks.${q}`] = deleteField(); });
    updateDoc(subRef, f).catch(() => { });
  });
}

function authTab(register) {
  $("tabSignIn").classList.toggle("on", !register);
  $("tabRegister").classList.toggle("on", register);
  $("signInForm").classList.toggle("hidden", register);
  $("registerForm").classList.toggle("hidden", !register);
  msg($("authMsg"), "");
}

async function onSignIn() {
  const email = validEmail($("inEmail").value);
  const pass = $("inPass").value;
  if (!email || !pass) return msg($("authMsg"), "Enter your college email and password.");
  $("signInBtn").disabled = true;
  msg($("authMsg"), "");
  try {
    await signIn(email, pass);
  } catch (e) {
    msg($("authMsg"), authMessage(e));
  } finally {
    $("signInBtn").disabled = false;
  }
}

async function onRegister() {
  const name = $("regName").value.trim().replace(/\s+/g, " ");
  const sapId = validSap($("regSap").value);
  const mobile = validMobile($("regMobile").value);
  const email = validEmail($("regEmail").value);
  const pass = $("regPass").value;
  if (name.length < 3) return msg($("authMsg"), "Please enter your full name.");
  if (!sapId) return msg($("authMsg"), "Please enter a valid SAP ID (letters and digits only).");
  if (!mobile) return msg($("authMsg"), "Please enter a valid 10-digit mobile number.");
  if (!email) return msg($("authMsg"), "Please enter a valid college email address.");
  if (pass.length < 8) return msg($("authMsg"), "Choose a password of at least 8 characters.");
  if (pass !== $("regPass2").value) return msg($("authMsg"), "The two passwords do not match.");

  pendingProfile = { name: name.slice(0, 80), sapId, mobile };
  $("registerBtn").disabled = true;
  msg($("authMsg"), "");
  try {
    await register(email, pass);          // onUser takes it from here
  } catch (e) {
    pendingProfile = null;
    msg($("authMsg"), authMessage(e));
  } finally {
    $("registerBtn").disabled = false;
  }
}

async function onForgot() {
  const email = validEmail($("inEmail").value);
  if (!email) return msg($("authMsg"), "Type your email address above first, then press Forgot password.");
  try {
    await resetPassword(email);
    msg($("authMsg"),
      `If an account exists for <b>${escapeHtml(email)}</b>, a reset link is on its way. ` +
      `Check your junk folder too.`, "ok");
  } catch (e) {
    msg($("authMsg"), authMessage(e));
  }
}

async function onSaveProfile() {
  const name = $("pfName").value.trim().replace(/\s+/g, " ");
  const sapId = validSap($("pfSap").value);
  const mobile = validMobile($("pfMobile").value);
  if (name.length < 3) return msg($("profileMsg"), "Please enter your full name.");
  if (!sapId) return msg($("profileMsg"), "Please enter a valid SAP ID.");
  if (!mobile) return msg($("profileMsg"), "Please enter a valid 10-digit mobile number.");
  $("profileBtn").disabled = true;
  try {
    const data = { name: name.slice(0, 80), sapId, mobile, email: user.email, createdAt: serverTimestamp() };
    await setDoc(doc(db, "assignProfiles", user.uid), data);
    profile = data;
    pendingProfile = null;
    await syncClock();
    paintWho();
    route();
  } catch (e) {
    console.error(e);
    msg($("profileMsg"), "Could not save your profile: " + escapeHtml(e.message));
  } finally {
    $("profileBtn").disabled = false;
  }
}

// ===========================================================================
// Routing: #a=<assignmentId> opens a workspace, anything else the list
// ===========================================================================
function route() {
  if (!user || !profile) return;
  const m = /(?:^|[#&])a=([A-Za-z0-9_-]+)/.exec(location.hash);
  if (m) openAssignment(m[1]);
  else showHome();
}

// ===========================================================================
// My assignments
// ===========================================================================
async function showHome() {
  await teardownWorkspace();
  show("home");
  msg($("homeMsg"), "");
  $("asgList").innerHTML = `<p class="muted">Loading…</p>`;
  let items = [];
  try {
    const snap = await getDocs(query(collection(db, "assignments"), where("listed", "==", true)));
    items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error(e);
    $("asgList").innerHTML = "";
    return msg($("homeMsg"), "Could not load assignments. Check your connection and press Refresh.");
  }
  if (!items.length) {
    $("asgList").innerHTML = `<div class="card"><p class="muted" style="margin:0">
      No assignments have been published yet.</p></div>`;
    return;
  }
  const t = now();
  // Open ones first, nearest deadline first; closed ones after.
  items.sort((a, b) => {
    const ao = a.active && toMillis(a.deadline) > t;
    const bo = b.active && toMillis(b.deadline) > t;
    if (ao !== bo) return ao ? -1 : 1;
    return ao ? toMillis(a.deadline) - toMillis(b.deadline) : toMillis(b.deadline) - toMillis(a.deadline);
  });
  const states = await Promise.all(items.map(statusFor));
  $("asgList").innerHTML = items.map((z, i) => {
    const st = states[i];
    const dl = toMillis(z.deadline);
    const left = dl - t;
    const open = z.active && left > 0;
    const dueCls = !open ? "over" : (left < 86400000 ? "soon" : "");
    const mode = z.mode === "group" ? `Group of ${z.groupMin}–${z.groupMax}` : "Individual";
    return `<div class="asg-item">
      <div>
        <h3>${escapeHtml(z.title)}</h3>
        <div class="meta">${z.course ? escapeHtml(z.course) + " · " : ""}${mode} ·
          ${(z.questions || []).length} section(s) · ${totalMarks(z.questions)} marks</div>
        <div class="due ${dueCls}">${open
      ? `Due ${fmtDate(dl)} · ${fmtCountdown(left)} left`
      : `Closed ${fmtDate(dl)}`}</div>
      </div>
      <div class="side">
        <span class="pill ${st.cls}">${escapeHtml(st.label)}</span>
        <a class="btn sm" href="#a=${encodeURIComponent(z.id)}">${st.cta}</a>
      </div>
    </div>`;
  }).join("");
}

async function statusFor(z) {
  const t = now();
  const open = z.active && toMillis(z.deadline) > t;
  const base = { cls: "muted", label: open ? "Not started" : "Closed", cta: open ? "Start" : "View" };
  let g;
  try {
    const c = await getDoc(doc(db, "assignStudents", `${z.id}__${profile.sapId}`));
    if (!c.exists()) return base;
    g = c.data().groupId;
  } catch (e) {
    if (e.code === "permission-denied") {
      return { cls: "flag", label: "SAP ID linked to another account", cta: "Details" };
    }
    return base;
  }
  if (!g) return { cls: "live", label: z.mode === "group" ? "No group yet" : "Started", cta: "Open" };
  try {
    const s = await getDoc(doc(db, "assignSubs", g));
    const d = s.data() || {};
    if (z.marksReleased) return { cls: "done", label: "Marks released", cta: "View" };
    if (d.status === "submitted") return { cls: "done", label: "Submitted", cta: "View" };
    if (d.kind === "group" && !d.confirmed) return { cls: "live", label: "Forming group", cta: "Open" };
    if (!open && !(toMillis(d.extensionUntil) > t)) return { cls: "done", label: "Closed — saved work kept", cta: "View" };
    return { cls: "live", label: "In progress", cta: "Continue" };
  } catch (e) {
    return { cls: "flag", label: "No access — ask your instructor", cta: "Details" };
  }
}

// ===========================================================================
// Opening an assignment
// ===========================================================================
async function openAssignment(id) {
  await teardownWorkspace();
  show("work");
  aid = id;
  sap = profile.sapId;
  myName = profile.name;
  $("wsBanner").innerHTML = banner("info", "Loading the assignment…");
  $("sections").innerHTML = "";
  ["groupCard", "linksCard", "contribCard", "declCard", "gradeCard"].forEach((c) => $(c).classList.add("hidden"));
  $("submitCard").classList.add("hidden");
  setHeaderButtons(false);

  try {
    const snap = await getDoc(doc(db, "assignments", id));
    if (!snap.exists()) throw new Error("not found");
    A = { id, ...snap.data() };
  } catch (e) {
    location.hash = "";
    return;
  }
  paintBrief();
  // Live: an extended deadline or a closed assignment reaches the page at once.
  unsubs.push(onSnapshot(doc(db, "assignments", id), (s) => {
    if (!s.exists()) return;
    A = { id, ...s.data() };
    paintBrief();
    if (sub) onSubChanged();
  }));
  startTickers();

  // ---- Claim: this account speaks for this SAP ID on this assignment ----
  claimRef = doc(db, "assignStudents", `${aid}__${sap}`);
  let c;
  try {
    c = await getDoc(claimRef);
  } catch (e) {
    if (e.code === "permission-denied") {
      return setBanner("bad",
        `Your SAP ID <b>${escapeHtml(sap)}</b> is already linked to a <b>different account</b> for ` +
        `this assignment. If you created two accounts, sign in with the other one. If you did not, ` +
        `someone else has used your SAP ID — tell your instructor now; they can reset it.`);
    }
    return setBanner("bad", "Could not reach the server. Check your connection and reload.");
  }

  if (!c.exists()) {
    if (!accepting()) {
      return setBanner("warn", "This assignment is closed. You did not start it, so there is nothing to show.");
    }
    if (!emailDomainOk(user.email, A.emailDomains)) {
      return setBanner("bad",
        `This assignment only accepts accounts with a college email ending in ` +
        `${(A.emailDomains || []).map((d) => `<b>@${escapeHtml(d)}</b>`).join(" or ")}. ` +
        `You are signed in as <b>${escapeHtml(user.email)}</b> — create an account with your college email.`);
    }
    try {
      await setDoc(claimRef, {
        aid, sapId: sap, uid: user.uid, name: myName, email: user.email,
        mobile: profile.mobile || "", groupId: null, createdAt: serverTimestamp(),
      });
      c = await getDoc(claimRef);
    } catch (e) {
      console.warn("claim refused", e);
      return setBanner("bad",
        `The server did not accept SAP ID <b>${escapeHtml(sap)}</b> for this assignment. ` +
        `Most likely it is not on the class list your instructor uploaded — check the ID on your ` +
        `profile, then ask your instructor.`);
    }
  }
  await resolveSubmission(c.data());
}

function accepting() {
  return !!A && A.active === true && now() < toMillis(A.deadline);
}

// Finds — or makes — the submission this student works in.
async function resolveSubmission(claim) {
  if (claim.groupId) return enterSubmission(claim.groupId);

  if (A.mode === "individual") {
    const id = `${aid}__${sap}`;
    const state = await probe(id);
    if (state === "missing") {
      if (!accepting()) return setBanner("warn", "This assignment is closed.");
      try {
        const b = writeBatch(db);
        b.set(doc(db, "assignSubs", id), newSubmission({ kind: "individual", formation: "individual", confirmed: true }));
        b.update(claimRef, { groupId: id });
        await b.commit();
      } catch (e) {
        console.error(e);
        return setBanner("bad", "Could not start your submission: " + escapeHtml(e.message));
      }
      return enterSubmission(id);
    }
    // It exists but this account is not on it: the account link was reset.
    return attachTo(id);
  }

  // Group: placed by the teacher (or re-linked after a reset)?
  let placed = null;
  try {
    const ix = await getDoc(doc(db, "assignGroupIndex", `${aid}__${sap}`));
    if (ix.exists()) placed = ix.data().sid;
  } catch (e) { /* no index entry */ }
  if (placed) return attachTo(placed);

  if (A.groupFormation === "self") {
    setBanner("info", "Before you can start, you need a group. Create one and share its code, or join a team-mate’s group with their code.");
    return paintNoGroup();
  }
  setBanner("warn",
    "Your instructor has not put you in a group for this assignment yet. Check back later, or ask your instructor.");
}

async function probe(id) {
  try {
    const s = await getDoc(doc(db, "assignSubs", id));
    return s.exists() ? "mine" : "missing";
  } catch (e) {
    return "other";
  }
}

async function attachTo(id) {
  try {
    const b = writeBatch(db);
    b.update(doc(db, "assignSubs", id), {
      memberUids: arrayUnion(user.uid),
      [`memberNames.${sap}`]: myName,
      actor: sap,
    });
    b.update(claimRef, { groupId: id });
    await b.commit();
  } catch (e) {
    console.warn("attach refused", e);
    return setBanner("bad",
      "Your instructor has placed you in a group, but the server would not add this account to it " +
      "(the assignment may be closed). Please tell your instructor.");
  }
  return enterSubmission(id);
}

function newSubmission(extra) {
  return {
    aid, gname: "", members: [sap], memberUids: [user.uid], memberNames: { [sap]: myName },
    leader: sap, status: "draft", answers: {}, wordCounts: {}, locks: {}, links: [],
    contrib: {}, createdAt: serverTimestamp(), lastEditAt: null, lastEditBy: null,
    actor: sap, revCount: 0, ...extra,
  };
}

function enterSubmission(id) {
  sid = id;
  subRef = doc(db, "assignSubs", id);
  guard = createGuard({
    isEditor: (el) => !!(el && el.closest && el.closest(".ed-body, .modal")),
    onBlocked: (kind) => {
      pending.pastes += 1;
      toast("Pasting from outside this page is disabled. Your answers must be typed.", "err");
      if (kind) flushContrib();
    },
  }).attach();

  unsubs.push(onSnapshot(subRef, (s) => {
    if (!s.exists()) {
      sub = null;
      return setBanner("bad", "This submission no longer exists. Your instructor may have removed it.");
    }
    sub = s.data();
    onSubChanged();
  }, (err) => {
    console.warn("submission listener", err);
    setBanner("bad",
      "You no longer have access to this submission — you may have been moved to another group, " +
      "or your account link was reset. Reload the page, and ask your instructor if it persists.");
    Object.values(editors).forEach((ed) => ed.setEditable(false));
  }));
}

// ===========================================================================
// Every change to the submission (mine, a team-mate's, the faculty's)
// ===========================================================================
function onSubChanged() {
  if (!sub) return;
  if (sub.kind === "group" && !sub.confirmed) {
    $("sections").innerHTML = "";
    built = false;
    editors = {};
    ["linksCard", "contribCard", "declCard"].forEach((c) => $(c).classList.add("hidden"));
    $("submitCard").classList.add("hidden");
    setHeaderButtons(false);
    paintForming();
    return;
  }
  if (!built) buildWorkspace();
  paintGroupCard();
  updateClosed();
  syncSections();
  paintLinks();
  paintContrib();
  paintDots();
  paintHeader();
  paintBannerState();
}

function buildWorkspace() {
  built = true;
  const qs = A.questions || [];
  $("sections").innerHTML = "";
  editors = {};
  applied = {};
  qs.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "card q-block";
    card.id = `qc_${q.id}`;
    card.innerHTML = `
      <div class="q-num">SECTION ${i + 1} OF ${qs.length}
        <span class="q-marks">${escapeHtml(String(q.marks))} mark${Number(q.marks) === 1 ? "" : "s"}</span></div>
      <div class="q-text">${escapeHtml(q.question)}</div>
      ${q.guidance ? `<div class="q-guide">${escapeHtml(q.guidance)}</div>` : ""}
      <div class="lockbar" id="lb_${escapeHtml(q.id)}"></div>
      <div class="ed-mount"></div>`;
    $("sections").appendChild(card);

    const ed = createEditor(card.querySelector(".ed-mount"), {
      qid: q.id,
      author: sap,
      minWords: q.minWords || 0,
      maxWords: q.maxWords || 0,
      placeholder: sub.kind === "group"
        ? "Click here to start editing this section…"
        : "Click here and start typing…",
      onChange: () => onLocalEdit(q.id),
      onTyped: (n) => {
        pending.typed += n;
        lastKeyAt = Date.now();
        if (held[q.id]) held[q.id].typed += n;
      },
      onSuspicious: (kind) => {
        if (kind === "import blocked") pending.pastes += 1;
        else if (kind === "bulk text insert") pending.bulk += 1;
      },
      onNotice: toast,
      onWantEdit: () => { if (!closedReason) tryEdit(q.id); },
    });
    ed.setEditable(false);
    editors[q.id] = ed;
  });

  $("linksCard").classList.remove("hidden");
  $("contribCard").classList.toggle("hidden", sub.kind !== "group");
  $("submitCard").classList.remove("hidden");
  if (sub.kind === "group") loadDeclaration();
  loadGrades();
  setHeaderButtons(true);
}

// Puts team-mates' saved text into every section this tab is NOT editing.
function syncSections() {
  (A.questions || []).forEach((q) => {
    const ed = editors[q.id];
    if (!ed) return;
    if (held[q.id]) {
      // Someone took this section over (this tab was idle past the stale
      // limit, or the student took it over from another device).
      if (!lockIsMine(q.id)) lostLock(q.id);
      else { paintLockbar(q.id); return; }
    }
    const remote = sub.answers && sub.answers[q.id] != null
      ? sub.answers[q.id]
      : starterToHtml(q.starter);
    if (applied[q.id] !== remote) {
      applied[q.id] = remote;
      ed.setHTML(remote);
    }
    ed.setEditable(false);
    paintLockbar(q.id);
  });
}

// ===========================================================================
// Section locks
// ===========================================================================
function lockOf(qid) {
  const L = sub && sub.locks && sub.locks[qid];
  return L && L.sap ? L : null;           // a half-written lock counts as none
}
function lockAge(L) {
  const t = toMillis(L.at);
  return t ? Math.max(0, now() - t) : 0;  // pending local write: fresh
}
function lockIsMine(qid) {
  const L = lockOf(qid);
  return !!(L && L.sap === sap && L.dev === DEV);
}

function paintLockbar(qid) {
  const el = document.getElementById(`lb_${qid}`);
  if (!el) return;
  if (closedReason) {
    el.innerHTML = `<span class="who">🔒 Read only — ${closedReason === "submitted" ? "submitted" : "closed"}.</span>`;
    return;
  }
  const L = lockOf(qid);
  const solo = sub.kind !== "group";
  if (held[qid]) {
    el.innerHTML = `<span class="who me">✎ You are editing${solo ? "" : " — team-mates see your changes live"}.</span>
      <button class="btn secondary xs" data-act="done" data-qid="${escapeHtml(qid)}">Done editing</button>`;
    return;
  }
  if (!L || lockAge(L) > LOCK_STALE_MS) {
    const was = L && L.sap !== sap ? ` <span class="who">(${escapeHtml(L.name || L.sap)} stopped editing)</span>` : "";
    el.innerHTML = `<button class="btn secondary xs" data-act="edit" data-qid="${escapeHtml(qid)}">✎ Edit${solo ? "" : " this section"}</button>
      <span class="who">or click in the text.</span>${was}`;
    return;
  }
  const ago = Math.round(lockAge(L) / 1000);
  if (L.sap === sap) {
    el.innerHTML = `<span class="who other">You are editing this in another tab or on another device.</span>
      <button class="btn secondary xs" data-act="takeover" data-qid="${escapeHtml(qid)}">Edit here instead</button>`;
    return;
  }
  el.innerHTML = `<span class="who other">🔒 ${escapeHtml(L.name || L.sap)} is editing this section</span>
    <span class="who">(active ${ago < 5 ? "just now" : ago + " s ago"}). You can edit it once they finish.</span>`;
}

function onSectionClick(e) {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const qid = b.dataset.qid;
  if (b.dataset.act === "edit") tryEdit(qid);
  else if (b.dataset.act === "takeover") tryEdit(qid, true);
  else if (b.dataset.act === "done") release(qid, "session");
}

let acquiring = {};
async function tryEdit(qid, force = false) {
  if (held[qid] || acquiring[qid] || closedReason || !sub) return;
  acquiring[qid] = true;
  try {
    await runTransaction(db, async (tx) => {
      const s = await tx.get(subRef);
      const d = s.data() || {};
      const L = d.locks && d.locks[qid];
      if (L && L.sap && !(L.sap === sap && L.dev === DEV)) {
        const age = toMillis(L.at) ? now() - toMillis(L.at) : 0;
        const stale = age > LOCK_STALE_MS;
        const mineElsewhere = L.sap === sap;
        if (!stale && !(mineElsewhere && force)) {
          const err = new Error("locked");
          err.lock = L;
          throw err;
        }
      }
      tx.update(subRef, {
        [`locks.${qid}`]: { sap, name: myName, dev: DEV, at: serverTimestamp() },
        [`contrib.${sap}.sessions`]: increment(1),
        [`contrib.${sap}.name`]: myName,
        [`contrib.${sap}.lastAt`]: serverTimestamp(),
        actor: sap,
      });
    });
  } catch (e) {
    acquiring[qid] = false;
    if (e.lock) {
      if (e.lock.sap === sap) {
        toast("You are editing this section in another tab or device. Use “Edit here instead”.", "warn");
      } else {
        toast(`${e.lock.name || e.lock.sap} is editing this section right now.`, "warn");
      }
    } else if (e.code === "permission-denied") {
      checkClosedAfterDenied();
    } else {
      console.error(e);
      toast("Could not start editing — check your connection.", "err");
    }
    return;
  }
  acquiring[qid] = false;
  const ed = editors[qid];
  // Start from the latest saved text, not from whatever this tab last showed.
  const latest = sub.answers && sub.answers[qid] != null
    ? sub.answers[qid]
    : starterToHtml((A.questions || []).find((q) => q.id === qid)?.starter);
  await ed.setHTML(latest);
  applied[qid] = latest;
  const base = ed.getHTML();
  held[qid] = {
    wordsBefore: ed.stats().words, typed: 0, lastInput: Date.now(),
    lastRevAt: Date.now(), revHtml: base, dirty: false, saveTimer: null,
  };
  ed.setEditable(true);
  ed.focus();
  paintLockbar(qid);
}

async function release(qid, reason) {
  const h = held[qid];
  if (!h) return;
  clearTimeout(h.saveTimer);
  const ed = editors[qid];
  ed.setEditable(false);
  if (h.dirty) await saveSection(qid);
  await writeRevision(qid, reason);
  delete held[qid];
  try {
    await runTransaction(db, async (tx) => {
      const s = await tx.get(subRef);
      const L = s.data()?.locks?.[qid];
      if (L && L.sap === sap && L.dev === DEV) {
        tx.update(subRef, { [`locks.${qid}`]: deleteField(), actor: sap });
      }
    });
  } catch (e) { /* the stale timeout frees it anyway */ }
  paintLockbar(qid);
}

function lostLock(qid) {
  const h = held[qid];
  if (!h) return;
  clearTimeout(h.saveTimer);
  delete held[qid];
  editors[qid].setEditable(false);
  const L = lockOf(qid);
  toast(L && L.sap !== sap
    ? `${L.name || L.sap} took over this section after you were inactive.`
    : "This section is now being edited somewhere else.", "warn");
}

async function releaseAll(reason) {
  await Promise.all(Object.keys(held).map((q) => release(q, reason)));
}

// ===========================================================================
// Saving
// ===========================================================================
function onLocalEdit(qid) {
  const h = held[qid];
  if (!h) return;
  h.dirty = true;
  h.lastInput = Date.now();
  paintSave();
  clearTimeout(h.saveTimer);
  h.saveTimer = setTimeout(() => saveSection(qid), 1200);
  scheduleContribPaint();
}

async function saveSection(qid) {
  const h = held[qid];
  if (!h || !lockIsMine(qid)) return;
  const ed = editors[qid];
  const html = ed.getHTML();
  h.dirty = false;
  const fields = {
    [`answers.${qid}`]: html,
    [`wordCounts.${qid}`]: ed.stats().words,
    [`locks.${qid}.at`]: serverTimestamp(),
    lastEditAt: serverTimestamp(),
    lastEditBy: sap,
  };
  const ok = await write(fields, true);
  if (ok) applied[qid] = html;
  else if (held[qid]) held[qid].dirty = true;
}

// Every student write goes through here: it carries `actor` (the rules check
// it) and whatever contribution counters have built up since the last write.
async function write(fields, withContrib) {
  if (!subRef) return false;
  const taken = withContrib ? takeContrib() : null;
  const payload = { ...fields, actor: sap, ...(taken ? taken.fields : {}) };
  writesInFlight += 1;
  paintSave();
  try {
    await updateDoc(subRef, payload);
    lastWriteFailed = false;
    return true;
  } catch (e) {
    console.warn("write failed", e);
    if (taken) taken.restore();
    lastWriteFailed = true;
    if (e.code === "permission-denied") checkClosedAfterDenied();
    return false;
  } finally {
    writesInFlight -= 1;
    paintSave();
  }
}

function takeContrib() {
  const p = pending;
  pending = { typed: 0, active: 0, pastes: 0, bulk: 0 };
  const f = {
    [`contrib.${sap}.lastAt`]: serverTimestamp(),
    [`contrib.${sap}.name`]: myName,
  };
  if (p.typed) f[`contrib.${sap}.typed`] = increment(p.typed);
  if (p.active) f[`contrib.${sap}.activeSec`] = increment(p.active);
  if (p.pastes) f[`contrib.${sap}.pastes`] = increment(p.pastes);
  if (p.bulk) f[`contrib.${sap}.bulk`] = increment(p.bulk);
  return {
    fields: f,
    restore: () => {
      pending.typed += p.typed; pending.active += p.active;
      pending.pastes += p.pastes; pending.bulk += p.bulk;
    },
  };
}

function flushContrib() {
  if (closedReason || !sub || (sub.kind === "group" && !sub.confirmed)) return;
  if (!pending.typed && !pending.active && !pending.pastes && !pending.bulk) return;
  write({}, true);
}

// One immutable history entry per editing session: who, which section, how
// many words before and after, how many keys, and the text itself.
async function writeRevision(qid, kind) {
  const h = held[qid];
  if (!h || !subRef) return;
  const ed = editors[qid];
  const html = ed.getHTML();
  if (html === h.revHtml && !h.typed) return;
  try {
    await addDoc(collection(db, "assignSubs", sid, "revs"), {
      actor: sap, name: myName, qid, kind,
      words: ed.stats().words, wordsBefore: h.wordsBefore, typed: h.typed,
      html: html.slice(0, 99000), at: serverTimestamp(),
    });
    h.revHtml = html;
    h.lastRevAt = Date.now();
    h.wordsBefore = ed.stats().words;
    h.typed = 0;
    write({ revCount: increment(1) }, false);
  } catch (e) {
    console.warn("revision not written", e);
  }
}

function hasUnsaved() {
  return writesInFlight > 0 || Object.values(held).some((h) => h.dirty);
}

function paintSave() {
  const el = $("saveState");
  if (!el) return;
  const dirty = Object.values(held).some((h) => h.dirty);
  el.className = "save-state";
  if (lastWriteFailed && !writesInFlight) { el.classList.add("err"); el.textContent = "Not saved"; }
  else if (writesInFlight || dirty) { el.classList.add("busy"); el.textContent = "Saving…"; }
  else el.textContent = Object.keys(held).length ? "All saved" : "";
}

// ===========================================================================
// Timers: countdown, lock heartbeat, idle release, active time, history
// ===========================================================================
function startTickers() {
  stopTickers();
  tickers.push(setInterval(paintHeader, 1000));
  tickers.push(setInterval(() => {
    if (Date.now() - lastKeyAt < 15000) pending.active += 15;
  }, 15000));
  tickers.push(setInterval(heartbeat, LOCK_HEARTBEAT_MS));
  tickers.push(setInterval(() => {
    if (!sub) return;
    (A.questions || []).forEach((q) => { if (!held[q.id]) paintLockbar(q.id); });
  }, 5000));
}

function stopTickers() {
  tickers.forEach(clearInterval);
  tickers = [];
}

async function heartbeat() {
  if (!sub || closedReason) return;
  for (const qid of Object.keys(held)) {
    const h = held[qid];
    if (Date.now() - h.lastInput > LOCK_IDLE_RELEASE_MS) {
      await release(qid, "idle");
      toast("You stopped typing for a while, so the section was freed for your team-mates.", "warn");
      continue;
    }
    if (Date.now() - h.lastRevAt > 5 * 60000) await writeRevision(qid, "periodic");
    if (!h.dirty && lockIsMine(qid)) {
      write({ [`locks.${qid}.at`]: serverTimestamp() }, true);
    }
  }
  if (!Object.keys(held).length) flushContrib();
}

// ===========================================================================
// Deadline, submission state
// ===========================================================================
function effDeadline() {
  return effectiveDeadline(A, sub);
}

function updateClosed() {
  let reason = "";
  if (sub && sub.status === "submitted") reason = "submitted";
  else if (A && A.active !== true) reason = "closed";
  else if (A && now() >= effDeadline()) reason = "deadline";
  if (reason === closedReason) return;
  const was = closedReason;
  closedReason = reason;
  if (reason) {
    Object.keys(held).forEach((q) => { clearTimeout(held[q].saveTimer); });
    held = {};
    Object.values(editors).forEach((ed) => ed.setEditable(false));
    $("linkAdd").classList.add("hidden");
    $("linkShareWrap").classList.add("hidden");
  } else if (was) {
    $("linkAdd").classList.remove("hidden");
    $("linkShareWrap").classList.remove("hidden");
  }
  (A.questions || []).forEach((q) => paintLockbar(q.id));
  paintLinks();
  paintBannerState();
  setHeaderButtons(!!built);
}

// A write was refused: most likely the deadline passed or someone submitted.
async function checkClosedAfterDenied() {
  try {
    const s = await getDoc(subRef);
    if (s.exists()) { sub = s.data(); }
  } catch (e) { /* ignore */ }
  updateClosed();
  if (!closedReason) {
    toast("The server refused that change. Reload the page if this keeps happening.", "err");
  }
}

function paintHeader() {
  if (!A) return;
  $("wsTitle").textContent = A.title;
  const dl = sub ? effDeadline() : toMillis(A.deadline);
  const left = dl - now();
  const cd = $("countdown");
  cd.className = "countdown";
  if (sub && sub.status === "submitted") {
    cd.textContent = "Submitted";
  } else if (left <= 0 || A.active !== true) {
    cd.textContent = "Closed";
    cd.classList.add("over");
  } else {
    cd.textContent = `${fmtCountdown(left)} left`;
    if (left < 3600000) cd.classList.add("urgent");
    else if (left < 86400000) cd.classList.add("soon");
  }
  const ext = sub && toMillis(sub.extensionUntil) > toMillis(A.deadline);
  $("wsSub").textContent = `Due ${fmtDate(dl)}${ext ? " (extended for you)" : ""}` +
    (sub && sub.kind === "group" ? ` · ${groupLabel()}` : "");
  // Crossing the deadline while the page is open.
  if (sub && !closedReason && (now() >= effDeadline() || A.active !== true)) updateClosed();
}

function paintBannerState() {
  if (!sub) return;
  const t = now();
  const left = effDeadline() - t;
  if (closedReason === "submitted") {
    const by = sub.memberNames?.[sub.submittedBy] || sub.submittedBy || "";
    return setBanner("good",
      `✅ Submitted ${fmtDate(toMillis(sub.submittedAt))}${sub.kind === "group" && by ? ` by <b>${escapeHtml(by)}</b>` : ""}. ` +
      `It is now read-only.` + (sub.kind === "group" ? " You can still update your private contribution declaration below." : ""));
  }
  if (closedReason === "deadline") {
    return setBanner("warn",
      `⏰ The deadline has passed. The work saved at that moment is what your instructor receives — ` +
      `nothing can be changed now.`);
  }
  if (closedReason === "closed") {
    return setBanner("warn", "Your instructor has closed this assignment. It is read-only.");
  }
  if (left < 3600000) {
    return setBanner("bad",
      `Less than an hour left. At the deadline the assignment closes by itself, and the saved text becomes the final version.`);
  }
  if (sub.kind === "group") {
    const pendingMembers = sub.members.length - (sub.memberUids || []).length;
    if (pendingMembers > 0) {
      return setBanner("info", `${pendingMembers} member(s) of your group have not signed in yet. They join automatically when they do.`);
    }
  }
  setBanner("", "");
}

function setHeaderButtons(on) {
  const canSubmit = on && !closedReason && sub && (sub.kind !== "group" || sub.confirmed);
  ["submitBtn", "submitBtn2"].forEach((id) => { $(id).disabled = !canSubmit; });
  ["backupBtn", "backupBtn2"].forEach((id) => { $(id).disabled = !on; });
}

// ===========================================================================
// The brief
// ===========================================================================
function paintBrief() {
  $("briefTitle").textContent = A.title;
  const qs = A.questions || [];
  const bits = [
    A.course ? `<span>Course <b>${escapeHtml(A.course)}</b></span>` : "",
    `<span>Type <b>${A.mode === "group" ? `Group (${A.groupMin}–${A.groupMax} students)` : "Individual"}</b></span>`,
    `<span>Sections <b>${qs.length}</b></span>`,
    `<span>Marks <b>${totalMarks(qs)}</b></span>`,
    `<span>Deadline <b>${fmtDate(toMillis(A.deadline))}</b></span>`,
  ];
  $("briefKv").innerHTML = bits.join("");
  $("briefInstr").textContent = A.instructions || "";
  $("briefInstr").classList.toggle("hidden", !A.instructions);
  const t = A.template;
  if (t && t.kind === "file") {
    $("briefTemplate").innerHTML =
      `<button class="btn secondary sm" id="tplBtn">⬇ Download template — ${escapeHtml(t.name)}
        (${Math.max(1, Math.round((t.size || 0) / 1024))} KB)</button>`;
    $("tplBtn").addEventListener("click", downloadTemplate);
  } else if (t && t.kind === "link" && checkLink(t.url).ok) {
    $("briefTemplate").innerHTML =
      `<a class="btn secondary sm" href="${escapeHtml(checkLink(t.url).url)}" target="_blank"
        rel="noopener noreferrer">↗ Open the template${t.label ? ` — ${escapeHtml(t.label)}` : ""}</a>`;
  } else {
    $("briefTemplate").innerHTML = "";
  }
  paintHeader();
}

async function downloadTemplate() {
  const t = A.template;
  const btn = $("tplBtn");
  btn.disabled = true;
  try {
    const parts = [];
    for (let i = 0; i < t.chunks; i++) {
      const s = await getDoc(doc(db, "assignTemplates", aid, "chunks", String(i)));
      parts.push(s.data().b64);
    }
    const bin = atob(parts.join(""));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    saveBlob(new Blob([bytes], { type: t.type || "application/octet-stream" }), t.name);
  } catch (e) {
    console.error(e);
    toast("The template could not be downloaded. Try again in a moment.", "err");
  } finally {
    btn.disabled = false;
  }
}

// ===========================================================================
// Groups
// ===========================================================================
function groupLabel() {
  if (!sub) return "";
  if (sub.gname) return sub.gname;
  const lead = sub.memberNames?.[sub.leader] || sub.leader;
  return `${lead}’s group`;
}

function memberChips(s) {
  return `<div class="members">${s.members.map((m) => {
    const nm = s.memberNames?.[m] || "";
    const joined = s.kind !== "group" || !!nm;
    const col = memberColour(s.members, m);
    const initials = (nm || m).split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return `<span class="member ${joined ? "" : "pending"}">
      <span class="av" style="background:${col}">${escapeHtml(initials)}</span>
      <span>${escapeHtml(nm || "not signed in yet")}<br><span class="tag">${escapeHtml(m)}${m === s.leader && s.kind === "group" ? " · leader" : ""}${m === sap ? " · you" : ""}</span></span>
    </span>`;
  }).join("")}</div>`;
}

function paintNoGroup() {
  const card = $("groupCard");
  card.classList.remove("hidden");
  const open = accepting();
  card.innerHTML = `
    <h2>Your group</h2>
    <p class="sub">Groups for this assignment have <b>${A.groupMin}–${A.groupMax}</b> members.
      One of you creates the group and shares its code; everyone else joins with that code.
      When everyone is in, the creator confirms the group and work can begin.</p>
    ${open ? `<div class="two-col">
      <div>
        <h3 style="margin:0 0 6px;font-size:1rem">Create a new group</h3>
        <label for="gName">Group name (optional)</label>
        <input type="text" id="gName" maxlength="60" placeholder="e.g. Team Photon" />
        <button class="btn" data-act="create" style="margin-top:10px">Create group</button>
      </div>
      <div>
        <h3 style="margin:0 0 6px;font-size:1rem">Join a team-mate’s group</h3>
        <label for="gCode">Group code</label>
        <input type="text" id="gCode" class="allow-paste mono" maxlength="8" placeholder="8 letters/digits"
          autocomplete="off" style="text-transform:lowercase;letter-spacing:.1em" />
        <button class="btn secondary" data-act="find" style="margin-top:10px">Find group</button>
        <div id="gPreview"></div>
      </div>
    </div>` : `<div class="notice warn">This assignment is closed, so new groups cannot be formed.</div>`}
    <div id="gMsg"></div>`;
}

function paintForming() {
  const card = $("groupCard");
  card.classList.remove("hidden");
  const s = sub;
  const n = s.members.length;
  const isLeader = s.leader === sap;
  const allIn = n === (s.memberUids || []).length;
  const enough = n >= A.groupMin;
  const code = sid.split("__g_")[1] || "";
  setBanner("info", "Your group is still forming. Work begins once the leader confirms the group.");
  card.innerHTML = `
    <h2>${escapeHtml(groupLabel())} <span class="pill live" style="vertical-align:3px">forming</span></h2>
    <p class="sub">Share this code with your team-mates. They choose <b>Join a team-mate’s group</b> on
      this assignment and type it in.</p>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <span class="code-box allow-paste" id="codeBox">${escapeHtml(code)}</span>
      <button class="btn secondary sm" data-act="copycode">Copy code</button>
    </div>
    <h3 style="margin:16px 0 4px;font-size:1rem">Members (${n} of ${A.groupMin}–${A.groupMax})</h3>
    ${memberChips(s)}
    <div id="gMsg"></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
      ${isLeader ? `<button class="btn" data-act="confirm" ${enough && allIn ? "" : "disabled"}>Confirm group and start</button>` : ""}
      <button class="btn secondary" data-act="leave">Leave group</button>
    </div>
    <p class="fine">${isLeader
      ? (enough ? "Confirm when everyone is in. After that nobody can join or leave — only your instructor can change the group."
        : `You need at least ${A.groupMin} members before you can confirm.`)
      : "Waiting for the group leader to confirm the group."}</p>`;
}

function paintGroupCard() {
  const card = $("groupCard");
  if (sub.kind !== "group") { card.classList.add("hidden"); return; }
  card.classList.remove("hidden");
  card.innerHTML = `
    <h2>${escapeHtml(groupLabel())}</h2>
    <p class="sub" style="margin-bottom:4px">${sub.members.length} members${sub.formation === "fixed" ? " · set by your instructor" : ""}.
      Every member works in this same submission.</p>
    ${memberChips(sub)}`;
}

async function onGroupClick(e) {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const act = b.dataset.act;
  b.disabled = true;
  try {
    if (act === "create") await createGroup();
    else if (act === "find") await findGroup();
    else if (act === "join") await joinGroup(b.dataset.sid);
    else if (act === "leave") await leaveGroup();
    else if (act === "confirm") await confirmGroup();
    else if (act === "copycode") {
      const code = $("codeBox")?.textContent || "";
      try { await navigator.clipboard.writeText(code); toast("Code copied.", "ok"); }
      catch (err) { toast(`The code is ${code}`, "ok"); }
    }
  } finally {
    b.disabled = false;
  }
}

async function createGroup() {
  const gname = ($("gName")?.value || "").trim().slice(0, 60);
  const code = joinCode();
  const id = `${aid}__g_${code}`;
  try {
    const b = writeBatch(db);
    b.set(doc(db, "assignSubs", id),
      newSubmission({ kind: "group", formation: "self", confirmed: false, gname }));
    b.update(claimRef, { groupId: id });
    await b.commit();
  } catch (e) {
    console.error(e);
    return msg($("gMsg"), "Could not create the group: " + escapeHtml(e.message));
  }
  enterSubmission(id);
}

async function findGroup() {
  const code = ($("gCode").value || "").trim().toLowerCase();
  if (!JOIN_CODE_RE.test(code)) return msg($("gPreview"), "A group code is 8 letters and digits.");
  const id = `${aid}__g_${code}`;
  let s;
  try {
    s = await getDoc(doc(db, "assignSubs", id));
  } catch (e) {
    return msg($("gPreview"), "That group has already been confirmed by its leader, so nobody can join it now. Ask your instructor.", "warn");
  }
  if (!s.exists()) return msg($("gPreview"), "No group has that code on this assignment. Check it with your team-mate.");
  const d = s.data();
  if (d.members.length >= A.groupMax) return msg($("gPreview"), `That group is full (${A.groupMax} members).`, "warn");
  $("gPreview").innerHTML = `<div class="notice ok" style="color:var(--text)">
    <b>${escapeHtml(d.gname || (d.memberNames?.[d.leader] || d.leader) + "’s group")}</b>
    ${memberChips(d)}
    <button class="btn sm" data-act="join" data-sid="${escapeHtml(id)}">Join this group</button></div>`;
}

async function joinGroup(id) {
  try {
    const b = writeBatch(db);
    b.update(doc(db, "assignSubs", id), {
      members: arrayUnion(sap),
      memberUids: arrayUnion(user.uid),
      [`memberNames.${sap}`]: myName,
      actor: sap,
    });
    b.update(claimRef, { groupId: id });
    await b.commit();
  } catch (e) {
    console.warn(e);
    return msg($("gPreview"),
      "Could not join — the group may have just been confirmed or become full. Find it again to check.");
  }
  enterSubmission(id);
}

async function leaveGroup() {
  const others = sub.members.filter((m) => m !== sap);
  const text = sub.leader === sap && others.length
    ? `You are the leader. If you leave, ${escapeHtml(sub.memberNames?.[others[0]] || others[0])} becomes the leader.`
    : "You can join or create another group afterwards.";
  if (!(await ask("Leave this group?", text, "Leave group"))) return;
  const newLeader = sub.leader === sap ? (others[0] || sap) : sub.leader;
  try {
    const b = writeBatch(db);
    b.update(subRef, {
      members: arrayRemove(sap),
      memberUids: arrayRemove(user.uid),
      [`memberNames.${sap}`]: deleteField(),
      leader: newLeader,
      actor: sap,
    });
    b.update(claimRef, { groupId: null });
    await b.commit();
  } catch (e) {
    console.error(e);
    return msg($("gMsg"), "Could not leave the group: " + escapeHtml(e.message));
  }
  await teardownSubmission();
  setBanner("info", "You left the group. Create a new one or join another.");
  paintNoGroup();
}

async function confirmGroup() {
  if (!(await ask("Confirm the group?",
    `${sub.members.length} members: ${sub.members.map((m) => escapeHtml(sub.memberNames?.[m] || m)).join(", ")}. ` +
    "After this, nobody can join or leave — only your instructor can change it.", "Confirm group"))) return;
  try {
    await updateDoc(subRef, { confirmed: true, confirmedAt: serverTimestamp(), actor: sap });
  } catch (e) {
    console.error(e);
    msg($("gMsg"), "Could not confirm the group: " + escapeHtml(e.message));
  }
}

// ===========================================================================
// Supplementary links
// ===========================================================================
function paintLinks() {
  if (!sub) return;
  const links = sub.links || [];
  $("linkList").innerHTML = links.length ? links.map((l, i) => {
    const ok = checkLink(l.url);
    const mine = l.by === sap;
    return `<li>
      <div class="lk">
        ${ok.ok ? `<a href="${escapeHtml(ok.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || ok.host)}</a>`
        : `<span>${escapeHtml(l.label || "link")}</span>`}
        <div class="by">${escapeHtml(ok.host || "")} · added by ${escapeHtml(l.name || l.by || "")}</div>
      </div>
      ${mine && !closedReason ? `<button class="btn secondary xs" data-i="${i}">Remove</button>` : ""}
    </li>`;
  }).join("") : `<li class="muted" style="justify-content:flex-start">No links added yet.</li>`;
  const full = links.length >= MAX_LINKS;
  $("linkAddBtn").disabled = full || !!closedReason;
}

async function addLink() {
  if (closedReason) return;
  const c = checkLink($("linkUrl").value);
  if (!c.ok) return toast(c.reason, "err");
  if (!$("linkShared").checked) {
    return toast("Set the link to “anyone with the link can view”, then tick the box.", "warn");
  }
  const links = sub.links || [];
  if (links.some((l) => l.url === c.url)) return toast("That link is already in the list.", "warn");
  if (links.length >= MAX_LINKS) return toast(`At most ${MAX_LINKS} links.`, "warn");
  const label = $("linkLabel").value.trim().slice(0, 80);
  const ok = await write({
    links: arrayUnion({ url: c.url, host: c.host, label, by: sap, name: myName, at: now() }),
  }, true);
  if (ok) {
    $("linkUrl").value = "";
    $("linkLabel").value = "";
    $("linkShared").checked = false;
    toast("Link added.", "ok");
  }
}

async function onLinkListClick(e) {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  const l = (sub.links || [])[Number(b.dataset.i)];
  if (!l || l.by !== sap) return;
  if (!(await ask("Remove this link?", escapeHtml(l.label || l.url), "Remove"))) return;
  write({ links: arrayRemove(l) }, true);
}

// ===========================================================================
// Contribution (visible to the whole group)
// ===========================================================================
let contribTimer = null;
function scheduleContribPaint() {
  clearTimeout(contribTimer);
  contribTimer = setTimeout(paintContrib, 1500);
}

function currentHtml(qid) {
  if (held[qid]) return editors[qid].getHTML();
  return sub.answers?.[qid] || "";
}

function paintContrib() {
  if (!sub || sub.kind !== "group") return;
  const counts = mergeCounts((A.questions || []).map((q) => authorshipWords(currentHtml(q.id))));
  const shares = authorshipShares(counts, sub.members);
  const c = sub.contrib || {};
  const rows = sub.members.map((m) => {
    const s = c[m] || {};
    const col = memberColour(sub.members, m);
    return `<tr>
      <td><span class="legend" style="margin:0"><span><i style="background:${col}"></i>${escapeHtml(sub.memberNames?.[m] || m)}</span></span>
        <span class="muted mono" style="font-size:.75rem">${escapeHtml(m)}</span></td>
      <td class="right-align">${counts[m] || 0}</td>
      <td><div class="sharebar"><span style="width:${shares[m] || 0}%;background:${col}"></span></div>
        <span class="muted" style="font-size:.75rem">${shares[m] || 0}%</span></td>
      <td class="right-align">${(s.typed || 0).toLocaleString()}</td>
      <td class="right-align">${fmtMinutes(s.activeSec)}</td>
      <td class="right-align">${s.sessions || 0}</td>
      <td class="muted" style="font-size:.8rem">${s.lastAt ? fmtDate(toMillis(s.lastAt)) : "–"}</td>
    </tr>`;
  }).join("");
  const tmpl = counts[""] ? `<p class="fine">${counts[""]} word(s) are still the starter template text and count for nobody.</p>` : "";
  $("contribTable").innerHTML = `<thead><tr><th>Member</th><th class="right-align">Words written</th>
    <th>Share</th><th class="right-align">Keys typed</th><th class="right-align">Active time</th>
    <th class="right-align">Edit sessions</th><th>Last active</th></tr></thead><tbody>${rows}</tbody>`;
  const note = $("contribCard").querySelector(".tmpl-note");
  if (note) note.remove();
  if (tmpl) $("contribCard").insertAdjacentHTML("beforeend", `<div class="tmpl-note">${tmpl}</div>`);
}

// ===========================================================================
// Private contribution declaration (group)
// ===========================================================================
function declDeadline() {
  return toMillis(A.deadline) + DECLARATION_GRACE_HOURS * 3600000;
}

async function loadDeclaration() {
  $("declCard").classList.remove("hidden");
  $("declUntil").textContent = fmtDate(declDeadline());
  myDecl = null;
  try {
    const s = await getDoc(doc(db, "assignDecls", `${sid}__${sap}`));
    if (s.exists()) myDecl = s.data();
  } catch (e) { /* none yet */ }
  paintDeclaration();
}

function paintDeclaration() {
  const members = sub.members;
  const saved = myDecl && myDecl.split;
  const even = Math.floor(100 / members.length);
  $("splitGrid").innerHTML = members.map((m, i) => {
    const v = saved && saved[m] != null ? saved[m]
      : (i === 0 ? 100 - even * (members.length - 1) : even);
    return `<span>${escapeHtml(sub.memberNames?.[m] || m)}${m === sap ? " (you)" : ""}</span>
      <input type="number" min="0" max="100" step="1" data-m="${escapeHtml(m)}" value="${v}" />`;
  }).join("") + `<span class="split-total">Total</span><span class="split-total" id="splitTotal"></span>`;
  $("splitGrid").querySelectorAll("input").forEach((el) => el.addEventListener("input", paintSplitTotal));
  $("declStmt").value = myDecl?.statement || "";
  paintSplitTotal();
  paintDeclWords();
  const open = now() < declDeadline();
  $("declSaveBtn").disabled = !open;
  $("splitGrid").querySelectorAll("input").forEach((el) => { el.disabled = !open; });
  $("declStmt").disabled = !open;
  msg($("declMsg"), myDecl
    ? `Saved ${fmtDate(toMillis(myDecl.at))}.${open ? " You can still change it." : ""}`
    : (open ? "Not filled in yet." : "The declaration period has ended."), myDecl ? "ok" : "warn");
}

function readSplit() {
  const split = {};
  $("splitGrid").querySelectorAll("input[data-m]").forEach((el) => { split[el.dataset.m] = Number(el.value); });
  return split;
}

function paintSplitTotal() {
  const sum = Object.values(readSplit()).reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const el = $("splitTotal");
  el.textContent = `${Math.round(sum * 10) / 10}%`;
  el.classList.toggle("bad", Math.abs(sum - 100) > 0.01);
}

function paintDeclWords() {
  const n = countWords($("declStmt").value);
  $("declWords").textContent = `${n} word${n === 1 ? "" : "s"} — at least 20.`;
}

async function saveDeclaration() {
  const split = readSplit();
  if (!validSplit(split, sub.members)) {
    return msg($("declMsg"), "Give every member a whole percentage from 0 to 100, adding up to exactly 100%.");
  }
  const statement = $("declStmt").value.trim();
  if (countWords(statement) < 20) {
    return msg($("declMsg"), "Describe what you did in at least 20 words.");
  }
  $("declSaveBtn").disabled = true;
  try {
    await setDoc(doc(db, "assignDecls", `${sid}__${sap}`), {
      aid, sid, sapId: sap, split, statement: statement.slice(0, 4000), at: serverTimestamp(),
    });
    myDecl = { split, statement, at: Date.now() };
    msg($("declMsg"), "Declaration saved. Only you and your instructor can see it.", "ok");
  } catch (e) {
    console.error(e);
    msg($("declMsg"), "Could not save the declaration: " + escapeHtml(e.message));
  } finally {
    $("declSaveBtn").disabled = now() >= declDeadline();
  }
}

// ===========================================================================
// Marks (after release)
// ===========================================================================
async function loadGrades() {
  const card = $("gradeCard");
  card.classList.add("hidden");
  if (!A.marksReleased) return;
  let g;
  try {
    const s = await getDoc(doc(db, "assignGrades", `${sid}__${sap}`));
    if (!s.exists()) return;
    g = s.data();
  } catch (e) {
    return;
  }
  const qs = A.questions || [];
  card.classList.remove("hidden");
  card.innerHTML = `
    <h2>Your marks</h2>
    <div class="stat-grid" style="margin:10px 0 14px">
      <div class="stat"><div class="n">${escapeHtml(String(g.score ?? "–"))}<span style="font-size:1rem;color:var(--muted)"> / ${escapeHtml(String(g.maxScore ?? totalMarks(qs)))}</span></div>
        <div class="l">${sub.kind === "group" ? "Your individual mark" : "Your mark"}</div></div>
      ${sub.kind === "group" ? `<div class="stat"><div class="n">${escapeHtml(String(g.groupScore ?? "–"))}</div><div class="l">Group mark</div></div>` : ""}
    </div>
    ${g.comment ? `<div class="notice ok" style="color:var(--text)"><b>Comment for you:</b> ${escapeHtml(g.comment)}</div>` : ""}
    ${g.overall ? `<div class="notice ok" style="color:var(--text)"><b>Overall feedback:</b> ${escapeHtml(g.overall)}</div>` : ""}
    <table style="margin-top:8px"><thead><tr><th>Section</th><th class="right-align">Marks</th><th>Feedback</th></tr></thead>
    <tbody>${qs.map((q, i) => `<tr><td>${i + 1}. ${escapeHtml(q.question.slice(0, 90))}${q.question.length > 90 ? "…" : ""}</td>
      <td class="right-align">${g.marks?.[q.id] ?? "–"} / ${escapeHtml(String(q.marks))}</td>
      <td>${escapeHtml(g.feedback?.[q.id] || "")}</td></tr>`).join("")}</tbody></table>`;
}

// ===========================================================================
// Section navigation dots
// ===========================================================================
function paintDots() {
  const qs = A.questions || [];
  $("dots").innerHTML = qs.map((q, i) => {
    const words = held[q.id] ? editors[q.id].stats().words : (sub.wordCounts?.[q.id] || 0);
    const L = lockOf(q.id);
    const busy = L && L.sap !== sap && lockAge(L) <= LOCK_STALE_MS;
    return `<button class="dot ${words ? "answered" : ""}" data-qid="${escapeHtml(q.id)}"
      title="Section ${i + 1}: ${words} words${busy ? ` · ${escapeHtml(L.name || L.sap)} is editing` : ""}">${i + 1}</button>`;
  }).join("");
  $("dots").querySelectorAll(".dot").forEach((d) => {
    d.addEventListener("click", () => {
      document.getElementById(`qc_${d.dataset.qid}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ===========================================================================
// Submission
// ===========================================================================
function openSubmit() {
  if (closedReason || !sub) return;
  const qs = A.questions || [];
  const warns = [];
  qs.forEach((q, i) => {
    const w = held[q.id] ? editors[q.id].stats().words : (sub.wordCounts?.[q.id] || 0);
    if (!w) warns.push(`Section ${i + 1} is empty.`);
    else if (q.minWords && w < q.minWords) warns.push(`Section ${i + 1} has ${w} words; at least ${q.minWords} are expected.`);
    const L = lockOf(q.id);
    if (L && L.sap !== sap && lockAge(L) <= LOCK_STALE_MS) {
      warns.push(`${escapeHtml(L.name || L.sap)} is editing section ${i + 1} right now. Submitting ends editing for everyone.`);
    }
  });
  if (sub.kind === "group" && !myDecl) warns.push("You have not filled in your contribution declaration yet (you can still do it after submitting).");
  const pendingMembers = sub.members.length - (sub.memberUids || []).length;
  if (pendingMembers > 0) warns.push(`${pendingMembers} member(s) have never signed in.`);

  $("submitWho").textContent = sub.kind === "group"
    ? `This submits the work of the whole group (${sub.members.length} members). After this nobody in the group can change it.`
    : "After this you cannot change your work.";
  $("submitWarn").innerHTML = warns.length
    ? `<div class="notice warn"><b>Please check:</b><ul class="warn-list">${warns.map((w) => `<li>${w}</li>`).join("")}</ul></div>` : "";
  const checks = [
    sub.kind === "group"
      ? "Every member of the group has agreed that the work is ready to submit."
      : "I have finished and checked my work.",
    `This is ${sub.kind === "group" ? "our" : "my"} own work, and every source used is acknowledged.`,
  ];
  if ((sub.links || []).length) checks.push("Every link above opens for anyone who has it (no access request needed).");
  $("submitChecks").innerHTML = checks.map((c, i) =>
    `<li><input type="checkbox" id="sc${i}" /><label for="sc${i}" style="margin:0;font-weight:500">${c}</label></li>`).join("");
  $("submitChecks").querySelectorAll("input").forEach((el) => el.addEventListener("change", () => {
    $("submitGo").disabled = ![...$("submitChecks").querySelectorAll("input")].every((x) => x.checked);
  }));
  $("submitGo").disabled = true;
  $("submitModal").classList.remove("hidden");
}

async function doSubmit() {
  $("submitGo").disabled = true;
  // Save and record everything this tab is editing first — the history is
  // closed to new entries the moment the status changes.
  for (const qid of Object.keys(held)) {
    clearTimeout(held[qid].saveTimer);
    if (held[qid].dirty) await saveSection(qid);
    await writeRevision(qid, "submit");
  }
  held = {};
  const ok = await write({
    status: "submitted", submittedAt: serverTimestamp(), submittedBy: sap, locks: {},
  }, true);
  $("submitModal").classList.add("hidden");
  if (ok) toast("Submitted. Well done!", "ok");
  else toast("The submission was not accepted — the deadline may have passed. Your saved work is kept.", "err");
}

// ===========================================================================
// Download a copy
// ===========================================================================
function downloadCopy() {
  if (!A || !sub) return;
  const qs = A.questions || [];
  const body = qs.map((q, i) => {
    const html = sanitizeHtml(currentHtml(q.id) || starterToHtml(q.starter));
    return `<section><h3>${i + 1}. ${escapeHtml(q.question)} <small>(${escapeHtml(String(q.marks))} marks ·
      ${answerStats(html).words} words)</small></h3><div class="ans">${html || "<i>Empty</i>"}</div></section>`;
  }).join("");
  const links = (sub.links || []).map((l) =>
    `<li><a href="${escapeHtml(checkLink(l.url).url || "")}">${escapeHtml(l.label || l.url)}</a> — ${escapeHtml(l.url)}</li>`).join("");
  const page = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${escapeHtml(A.title)} — ${escapeHtml(sap)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<style>body{font-family:Segoe UI,system-ui,sans-serif;max-width:860px;margin:30px auto;padding:0 18px;line-height:1.55;color:#22303c}
h1{font-size:1.35rem;color:#1a5276}section{border-top:1px solid #ddd;padding-top:12px;margin-top:20px}
h3{font-size:1rem}h3 small{font-weight:400;color:#6b7b8a}
.ans{background:#fafbfc;border:1px solid #e3e8ee;border-radius:8px;padding:14px}
table{border-collapse:collapse}td,th{border:1px solid #bbb;padding:5px 8px}.meta{color:#6b7b8a;font-size:.9rem}</style></head><body>
<h1>${escapeHtml(A.title)}</h1>
<p class="meta">${sub.kind === "group" ? `${escapeHtml(groupLabel())}: ${sub.members.map((m) => `${escapeHtml(sub.memberNames?.[m] || "")} (${escapeHtml(m)})`).join(", ")}`
      : `${escapeHtml(myName)} (${escapeHtml(sap)})`}<br>
Status: ${escapeHtml(sub.status)} · copy taken ${new Date().toLocaleString()}<br>
<i>This is a personal copy. It is not a submission — your work is submitted from the assignment page.</i></p>
${body}
${links ? `<h3>Supplementary files</h3><ul>${links}</ul>` : ""}
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"><\/script>
<script>document.querySelectorAll('span.mathx[data-latex]').forEach(function(n){
  try{katex.render(n.getAttribute('data-latex'),n,{throwOnError:false});}catch(e){}});<\/script>
</body></html>`;
  saveBlob(new Blob([page], { type: "text/html" }), `${slug(A.title)}_${safeId(sap)}.html`);
}

function saveBlob(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

// ===========================================================================
// Teardown
// ===========================================================================
async function teardownSubmission() {
  await releaseAll("leave");
  // Keep the assignment listener (the first one); drop the submission one.
  while (unsubs.length > 1) unsubs.pop()();
  guard?.detach();
  guard = null;
  sub = null;
  sid = null;
  subRef = null;
  built = false;
  editors = {};
  $("sections").innerHTML = "";
}

async function teardownWorkspace() {
  if (Object.keys(held).length) await releaseAll("leave");
  unsubs.forEach((u) => u());
  unsubs = [];
  stopTickers();
  guard?.detach();
  guard = null;
  A = null; aid = null; sub = null; sid = null; subRef = null; claimRef = null;
  editors = {}; applied = {}; held = {}; built = false; closedReason = ""; myDecl = null;
  pending = { typed: 0, active: 0, pastes: 0, bulk: 0 };
  document.body.classList.remove("working");
}

// ===========================================================================
// Small UI helpers
// ===========================================================================
function banner(kind, html) {
  return html ? `<div class="banner ${kind}">${html}</div>` : "";
}
function setBanner(kind, html) {
  $("wsBanner").innerHTML = banner(kind, html);
}

let toastHandle = null;
function toast(text, kind = "ok") {
  const el = $("toast");
  el.textContent = text;
  el.className = `toast ${kind}`;
  clearTimeout(toastHandle);
  toastHandle = setTimeout(() => el.classList.add("hidden"), 3600);
}

// In-page confirmation (never window.confirm — a native dialog on top of a
// half-typed paragraph is a poor experience, and it cannot be styled).
function ask(title, bodyHtml, okLabel = "OK") {
  return new Promise((resolve) => {
    $("askTitle").textContent = title;
    $("askBody").innerHTML = bodyHtml;
    $("askYes").textContent = okLabel;
    $("askModal").classList.remove("hidden");
    const done = (v) => {
      $("askModal").classList.add("hidden");
      $("askYes").onclick = null;
      $("askNo").onclick = null;
      resolve(v);
    };
    $("askYes").onclick = () => done(true);
    $("askNo").onclick = () => done(false);
  });
}

// Keep renderMath referenced for the equation tool's lazy loader.
void renderMath;
