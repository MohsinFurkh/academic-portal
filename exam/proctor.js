// ---------------------------------------------------------------------------
// Proctoring engine — descriptive (typed-answer) tests
// ---------------------------------------------------------------------------
// A typed exam cannot use the MCQ proctor unchanged. There, every key is
// blocked and nothing is selectable. Here the student must type for an hour,
// select their own sentences to format them, and undo their own mistakes — so
// the guard has to be precise instead of total:
//
//   * leaving the exam (tab, app, minimise, full screen)  -> VIOLATION
//   * bringing text in from outside (paste, drop, autofill) -> BLOCKED + logged,
//     escalating to a violation once it keeps happening
//   * taking text out (copy, cut, print, view-source)      -> BLOCKED
//   * developer tools                                      -> BLOCKED
//   * typing, selecting and formatting inside an answer    -> ALLOWED
//
// Cut/copy/paste of the student's *own* text still works inside the exam, but
// through an internal clipboard owned by editor.js — the system clipboard is
// never read and never written, so nothing can travel in or out of the paper.
// ---------------------------------------------------------------------------

export const VIOLATION_DEBOUNCE_MS = 1200;

export function createProctor(opts) {
  const {
    maxViolations = 3,
    // Every nth blocked import attempt also costs a violation, so a student who
    // keeps hammering Ctrl+V eventually runs out of paper — but a single
    // absent-minded press does not.
    pasteEscalateAt = 5,
    onViolation = () => { },   // (count, kind, remaining)
    onLimit = () => { },       // (count, kind) — fires once, at the limit
    onBlocked = () => { },     // (kind, totalBlocked) — did not count as a violation
    onGrace = () => { },       // (kind, reason) — focus loss the page itself caused
    isEditor = () => false,    // (element) -> is this inside an answer box?
    doc: docRef = (typeof document !== "undefined" ? document : null),
    win = (typeof window !== "undefined" ? window : null),
    now = () => Date.now(),
  } = opts || {};

  let count = 0;
  let blocked = 0;
  let graceUntil = 0;
  let graceReason = "";
  let lastTs = -Infinity;
  let stopped = false;
  let limitReached = false;
  let handlers = [];

  function on(target, evt, fn, capture) {
    if (!target) return;
    target.addEventListener(evt, fn, capture);
    handlers.push([target, evt, fn, capture]);
  }

  const inEditor = (e) => {
    const t = e && (e.target || e.srcElement);
    return !!(t && t.nodeType === 1 ? isEditor(t) : (t && t.parentElement && isEditor(t.parentElement)));
  };

  // ---- Import/export of text -------------------------------------------
  // Blocked everywhere, including inside the answer box. editor.js intercepts
  // the keyboard shortcuts first and serves them from its own clipboard, so by
  // the time a real clipboard event arrives it is either a right-click paste,
  // a middle-click paste or a drag from another window: all of them mean text
  // the student did not type.
  function clipGuard(kind) {
    return (e) => {
      e.preventDefault();
      blocked += 1;
      onBlocked(kind, blocked);
      if (pasteEscalateAt > 0 && blocked % pasteEscalateAt === 0) report(`repeated ${kind}`);
      return false;
    };
  }

  // Selection is free inside an answer, refused outside it: the question paper
  // itself cannot be swept up and dragged into another window.
  function selectGuard(e) {
    if (inEditor(e)) return;
    e.preventDefault();
    return false;
  }

  function plainBlock(e) { e.preventDefault(); return false; }

  // Returns true when the key was swallowed — this is what selftest asserts on.
  function keyGuard(e) {
    const k = String(e.key || "").toLowerCase();
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) {
      if (e.key === "F12") { e.preventDefault?.(); return true; }
      return false;                                   // ordinary typing
    }

    // Developer tools, save, print, find-on-page, view-source, new tab/window.
    const hardBlocked =
      (e.shiftKey && ["i", "j", "c", "k"].includes(k)) ||
      ["p", "s", "u", "f", "t", "n", "w", "o", "h"].includes(k);
    if (hardBlocked) { e.preventDefault?.(); return true; }

    // Clipboard keys: editor.js handles these itself inside an answer box; the
    // browser must not also act on them. Outside an answer box they are simply
    // refused.
    if (["c", "x", "v"].includes(k)) { e.preventDefault?.(); return true; }

    // Formatting, undo/redo and select-all are the student's own tools.
    if (["b", "i", "u", "z", "y", "a"].includes(k)) return false;

    return false;
  }

  // -------------------------------------------------------------------------
  // Grace windows
  // -------------------------------------------------------------------------
  // A file picker is an operating-system window. When it opens, the browser
  // fires exactly the same blur that alt-tabbing fires, and on some desktops
  // full screen is dropped too — so a student who did what the paper asked and
  // uploaded their diagram was being charged a violation for it.
  //
  // grace() is how the page says "I am about to cause a focus loss, on purpose,
  // because the student clicked a control I own". It is deliberately narrow:
  //
  //   * only the page can open one, never the student directly;
  //   * it is time-boxed, and it ENDS the moment focus comes back, so it is one
  //     round trip to a dialog and not a window of free absence;
  //   * the paper stays blurred while focus is away, exactly as before;
  //   * every suppressed event is still reported through onGrace and logged,
  //     so the instructor sees that it happened and why.
  function grace(reason, ms = 25000) {
    graceUntil = now() + ms;
    graceReason = String(reason || "page dialog");
    return api;
  }

  function clearGrace() {
    graceUntil = 0;
    graceReason = "";
    return api;
  }

  function inGrace() {
    return now() < graceUntil;
  }

  function report(kind) {
    if (stopped || limitReached) return null;
    // Caused by the page, not by the student leaving it.
    if (inGrace()) {
      onGrace(kind, graceReason);
      return null;
    }
    const ts = now();
    if (ts - lastTs < VIOLATION_DEBOUNCE_MS) return null;   // one incident, one count
    lastTs = ts;
    count += 1;

    const remaining = Math.max(0, maxViolations - count);
    if (count >= maxViolations) {
      limitReached = true;
      onLimit(count, kind);
    } else {
      onViolation(count, kind, remaining);
    }
    return { count, kind, remaining, at: ts };
  }

  function attach() {
    stopped = false;
    on(docRef, "copy", clipGuard("copy"));
    on(docRef, "cut", clipGuard("cut"));
    on(docRef, "paste", clipGuard("paste"));
    on(docRef, "drop", clipGuard("drop"));
    on(docRef, "dragstart", plainBlock);
    on(docRef, "dragover", (e) => e.preventDefault());
    on(docRef, "contextmenu", plainBlock);
    on(docRef, "selectstart", selectGuard);
    on(docRef, "keydown", keyGuard, true);
    on(docRef, "visibilitychange", () => { if (docRef.hidden) report("tab/minimise"); });
    on(win, "blur", () => report("window focus lost"));
    // Focus is back: the dialog is closed, so the grace has done its job and
    // must not linger as unmonitored time.
    on(win, "focus", () => { if (inGrace()) clearGrace(); });
    on(docRef, "fullscreenchange", () => {
      if (!docRef.fullscreenElement) report("left full screen");
    });
    return api;
  }

  function detach() {
    stopped = true;
    handlers.forEach(([t, e, f, c]) => t && t.removeEventListener(e, f, c));
    handlers = [];
    return api;
  }

  const api = {
    attach, detach, report, keyGuard, grace, clearGrace,
    get inGrace() { return inGrace(); },
    get count() { return count; },
    get blockedCount() { return blocked; },
    get limitReached() { return limitReached; },
    set count(v) { count = v; },       // restored when an attempt resumes
    set blockedCount(v) { blocked = v; },
  };
  return api;
}

// ---- Full screen ----------------------------------------------------------
export async function goFullscreen(el) {
  const target = el || document.documentElement;
  try {
    if (target.requestFullscreen && !document.fullscreenElement) {
      await target.requestFullscreen({ navigationUI: "hide" });
      return true;
    }
  } catch (e) {
    console.warn("fullscreen request refused", e);
  }
  return !!document.fullscreenElement;
}

export function exitFullscreen() {
  try {
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
  } catch (e) { /* ignore */ }
}
