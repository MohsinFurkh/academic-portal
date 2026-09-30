// ---------------------------------------------------------------------------
// Copy/paste guard — the exam's import/export rules without the proctoring
// ---------------------------------------------------------------------------
// An assignment is written over days, so there is no full screen, no violation
// count and no watching of tabs. What stays from the exam is the part that
// keeps the work the student's own:
//
//   * bringing text in from outside (paste, drop)   -> BLOCKED + counted
//   * taking text out (copy, cut)                   -> BLOCKED
//   * typing, selecting, formatting in an answer    -> ALLOWED
//   * cut/copy/paste of the student's OWN text      -> ALLOWED, through the
//     editor's internal clipboard (editor.js); the system clipboard is never
//     read or written
//
// Exception: fields marked .allow-paste (a Google Drive link, a password on
// the sign-in form) accept a normal paste — a URL is not answer content, and
// nobody should have to retype a 60-character share link.
//
// The guard is attached only while a workspace is open, never on the sign-in
// screen, so password managers keep working.
// ---------------------------------------------------------------------------

export function createGuard(opts) {
  const {
    onBlocked = () => { },           // (kind, total) — an import attempt was refused
    isEditor = () => false,          // (element) -> inside an answer box?
    doc: docRef = (typeof document !== "undefined" ? document : null),
  } = opts || {};

  let blocked = 0;
  let handlers = [];

  function on(target, evt, fn, capture) {
    if (!target) return;
    target.addEventListener(evt, fn, capture);
    handlers.push([target, evt, fn, capture]);
  }

  const targetEl = (e) => {
    const t = e && (e.target || e.srcElement);
    if (!t) return null;
    return t.nodeType === 1 ? t : t.parentElement;
  };
  const pasteAllowed = (e) => {
    const t = targetEl(e);
    return !!(t && t.closest && t.closest(".allow-paste"));
  };
  const inEditor = (e) => {
    const t = targetEl(e);
    return !!(t && isEditor(t));
  };
  // Ordinary form fields (a name, a statement, a percentage) may be selected
  // and edited normally; only the answer boxes use the internal clipboard.
  const inField = (e) => {
    const t = targetEl(e);
    return !!(t && t.closest && t.closest("input, textarea, select"));
  };

  function importGuard(kind) {
    return (e) => {
      if (kind === "paste" && pasteAllowed(e)) return true;
      e.preventDefault();
      blocked += 1;
      onBlocked(kind, blocked);
      return false;
    };
  }

  function exportGuard(e) {
    // Copying a link out of a link field, or a join code, is harmless.
    if (pasteAllowed(e)) return true;
    e.preventDefault();
    return false;
  }

  function selectGuard(e) {
    if (inEditor(e) || inField(e) || pasteAllowed(e)) return;
    e.preventDefault();
    return false;
  }

  // Returns true when the key was swallowed — this is what selftest asserts on.
  function keyGuard(e) {
    const k = String(e.key || "").toLowerCase();
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return false;
    if (["c", "x", "v"].includes(k)) {
      // A link field and the join-code box handle the clipboard natively.
      if (pasteAllowed(e)) return false;
      // Inside an answer, editor.js serves these from its own clipboard.
      e.preventDefault?.();
      return true;
    }
    // Save-as and view-source would carry the paper out whole.
    if (["s", "u"].includes(k) && !e.shiftKey) { e.preventDefault?.(); return true; }
    return false;
  }

  function attach() {
    detach();
    on(docRef, "paste", importGuard("paste"), true);
    on(docRef, "drop", importGuard("drop"), true);
    on(docRef, "copy", exportGuard, true);
    on(docRef, "cut", exportGuard, true);
    on(docRef, "dragstart", (e) => { if (!inField(e)) e.preventDefault(); });
    on(docRef, "dragover", (e) => e.preventDefault());
    on(docRef, "contextmenu", (e) => { if (!pasteAllowed(e)) e.preventDefault(); });
    on(docRef, "selectstart", selectGuard);
    on(docRef, "keydown", keyGuard, true);
    return api;
  }

  function detach() {
    handlers.forEach(([t, e, f, c]) => t && t.removeEventListener(e, f, c));
    handlers = [];
    return api;
  }

  const api = {
    attach, detach, keyGuard,
    get blockedCount() { return blocked; },
    set blockedCount(v) { blocked = v; },
  };
  return api;
}
