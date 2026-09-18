// ---------------------------------------------------------------------------
// Answer editor: formatting, symbols, equations, hand-drawn diagrams
// ---------------------------------------------------------------------------
// One instance per question. It is a contenteditable with a toolbar, plus three
// things a normal rich-text box does not have:
//
//   * an INTERNAL clipboard. Cut/copy/paste work on the student's own text and
//     never touch the system clipboard, so answers cannot be carried in from
//     another window or carried out of the exam.
//   * a LaTeX equation dialog (KaTeX) and a Unicode symbol palette, so a maths
//     answer does not have to be written as "integral of x dx".
//   * diagram upload: a photo of a pen-and-paper drawing is compressed in the
//     browser, stored by the caller, and inserted as a figure. The pixels never
//     go into the answer HTML — only the figure's id does.
//
// execCommand is deprecated but is the only formatting API every current
// browser implements for contenteditable, so it is what this uses.
// ---------------------------------------------------------------------------

import {
  sanitizeHtml, stripImages, hydrateImages, answerStats,
  MAX_ANSWER_CHARS, IMG_MAX_BYTES, IMG_MAX_DIM, IMG_MAX_PER_QUESTION,
  escapeHtml, uid8,
} from "./common.js";

const KATEX_VERSION = "0.16.11";

// ---------------------------------------------------------------------------
// Toolbar definition
// ---------------------------------------------------------------------------
const BLOCKS = [
  ["<p>", "Normal text"],
  ["<h2>", "Heading"],
  ["<h3>", "Sub-heading"],
  ["<h4>", "Minor heading"],
  ["<blockquote>", "Quote / note"],
  ["<pre>", "Code / monospace"],
];

const TOOLS = [
  { group: "style" },
  { cmd: "bold", label: "B", title: "Bold (Ctrl+B)", cls: "tb-b" },
  { cmd: "italic", label: "I", title: "Italic (Ctrl+I)", cls: "tb-i" },
  { cmd: "underline", label: "U", title: "Underline (Ctrl+U)", cls: "tb-u" },
  { cmd: "strikeThrough", label: "S", title: "Strikethrough", cls: "tb-s" },
  { group: "sep" },
  { cmd: "superscript", label: "x²", title: "Superscript" },
  { cmd: "subscript", label: "x₂", title: "Subscript" },
  { group: "sep" },
  { cmd: "insertUnorderedList", label: "• ≡", title: "Bulleted list" },
  { cmd: "insertOrderedList", label: "1. ≡", title: "Numbered list" },
  { act: "table", label: "▦", title: "Insert a table" },
  { act: "rule", label: "—", title: "Horizontal line" },
  { group: "sep" },
  { act: "symbol", label: "Ω", title: "Insert a special symbol" },
  { act: "math", label: "√x", title: "Insert a maths equation" },
  { act: "draw", label: "✏", title: "Draw a diagram here with the mouse or a stylus", key: "image" },
  { act: "image", label: "🖼", title: "Upload a photo of a diagram you drew on paper", key: "image" },
  { group: "sep" },
  { act: "cut", label: "✂", title: "Cut (Ctrl+X) — within this exam only" },
  { act: "copy", label: "⧉", title: "Copy (Ctrl+C) — within this exam only" },
  { act: "paste", label: "📋", title: "Paste (Ctrl+V) — only text you cut or copied here" },
  { group: "sep" },
  { cmd: "undo", label: "↶", title: "Undo (Ctrl+Z)" },
  { cmd: "redo", label: "↷", title: "Redo (Ctrl+Y)" },
  { cmd: "removeFormat", label: "T̶", title: "Clear formatting" },
];

// The internal clipboard is deliberately shared by every editor on the page, so
// a student can move a paragraph from one answer to another.
let internalClipboard = "";

// ---------------------------------------------------------------------------
export function createEditor(mount, opts) {
  const {
    qid = "q",
    allowImages = true,
    minWords = 0,
    maxWords = 0,
    maxChars = MAX_ANSWER_CHARS,
    maxImages = IMG_MAX_PER_QUESTION,
    spellcheck = false,
    onChange = () => { },
    onTyped = () => { },
    onSuspicious = () => { },
    onNotice = () => { },
    // Called just before the operating system's file chooser opens, and again
    // once it has closed. exam.js uses this to tell the proctor that the focus
    // loss it is about to see was caused by the page, not by the student.
    onPickerOpen = () => { },
    onPickerClose = () => { },
    // (file, {qid, dataUrl, bytes, w, h}) -> Promise<imageId>. Rejecting
    // cancels the insertion, so a diagram is only ever shown once it is safely
    // on the server.
    onImageUpload = null,
  } = opts || {};

  // ---- DOM -------------------------------------------------------------
  const wrap = document.createElement("div");
  wrap.className = "ed";
  wrap.innerHTML = `
    <div class="ed-toolbar" role="toolbar" aria-label="Formatting">
      ${renderTools(allowImages)}
    </div>
    <div class="ed-body" contenteditable="true" spellcheck="${spellcheck}"
         role="textbox" aria-multiline="true" data-qid="${escapeHtml(qid)}"></div>
    <div class="ed-foot">
      <span class="ed-count"><b class="ed-words">0</b> words</span>
      <span class="ed-target"></span>
      <span class="ed-imgs"></span>
      <span class="ed-tip">Pasting from outside the exam is disabled.</span>
    </div>
    <input type="file" class="ed-file" accept="image/*" hidden />`;
  mount.appendChild(wrap);

  const body = wrap.querySelector(".ed-body");
  const fileInput = wrap.querySelector(".ed-file");
  const wordsEl = wrap.querySelector(".ed-words");
  const targetEl = wrap.querySelector(".ed-target");
  const imgsEl = wrap.querySelector(".ed-imgs");

  let savedRange = null;
  let imageCount = 0;

  paintTarget(0);

  // ---- Formatting ------------------------------------------------------
  try { document.execCommand("styleWithCSS", false, false); } catch (e) { /* older browsers */ }

  wrap.querySelector(".ed-toolbar").addEventListener("mousedown", (e) => {
    // Keep the caret where it is: a toolbar click must not steal the selection.
    if (e.target.closest("button, select")) e.preventDefault();
  });

  wrap.querySelector(".ed-toolbar").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cmd], button[data-act]");
    if (!btn) return;
    body.focus();
    restore();
    if (btn.dataset.cmd) exec(btn.dataset.cmd);
    else doAction(btn.dataset.act);
    refreshState();
  });

  const styleSel = wrap.querySelector(".ed-style");
  styleSel.addEventListener("change", () => {
    body.focus();
    restore();
    exec("formatBlock", styleSel.value);
    afterInput();
  });

  function exec(cmd, val) {
    try { document.execCommand(cmd, false, val); } catch (e) { /* ignore */ }
    save();          // selectionchange is async; the next click must not race it
    afterInput();
  }

  function doAction(act) {
    if (act === "table") insertTable();
    else if (act === "rule") insertHTML("<hr>");
    else if (act === "symbol") openSymbols(insertHTML);
    else if (act === "math") openMath(insertMath);
    else if (act === "draw") {
      if (imageCount >= maxImages) {
        onNotice(`You can attach at most ${maxImages} diagrams to this answer.`, "warn");
      } else {
        openDraw(insertDrawing);
      }
    }
    else if (act === "image") openPicker();
    else if (act === "cut") clipCut();
    else if (act === "copy") clipCopy();
    else if (act === "paste") clipPaste();
  }

  // ---- Selection bookkeeping ------------------------------------------
  function save() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && body.contains(sel.anchorNode)) {
      savedRange = sel.getRangeAt(0).cloneRange();
    }
  }
  // Putting the caret back after a toolbar button, a modal or a file picker has
  // taken the focus away. A range can go stale when the DOM it pointed into is
  // replaced, and a stale range silently collapses to the START of the box —
  // which drops the student's equation above their first heading. When the
  // saved range is no longer usable, insert at the END instead.
  function restore() {
    const sel = window.getSelection();
    const usable = savedRange
      && savedRange.startContainer
      && savedRange.startContainer.isConnected
      && body.contains(savedRange.startContainer);
    sel.removeAllRanges();
    sel.addRange(usable ? savedRange : endOfBody());
  }

  function endOfBody() {
    const r = document.createRange();
    r.selectNodeContents(body);
    r.collapse(false);
    return r;
  }
  document.addEventListener("selectionchange", () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && body.contains(sel.anchorNode)) { save(); refreshState(); }
  });

  function insertHTML(html) {
    body.focus();
    restore();
    try { document.execCommand("insertHTML", false, html); } catch (e) { /* ignore */ }
    // The caret now sits after what was just inserted. Record that immediately:
    // selectionchange only fires on the next task, and the symbol palette stays
    // open, so a second click would otherwise insert at the previous position
    // and reverse the order the student clicked in.
    save();
    afterInput();
  }

  // ---- Internal clipboard ---------------------------------------------
  // Nothing here reads or writes navigator.clipboard. The text lives in a
  // module variable for the lifetime of the page and dies with it.
  function selectionHtml() {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) return "";
    const range = sel.getRangeAt(0);
    if (!body.contains(range.commonAncestorContainer)) return "";
    const holder = document.createElement("div");
    holder.appendChild(range.cloneContents());
    return holder.innerHTML;
  }

  function clipCopy() {
    const html = selectionHtml();
    if (!html) return onNotice("Select some of your own text first.", "warn");
    internalClipboard = html;
    onNotice("Copied — use Paste to put it somewhere else in your answers.", "ok");
  }

  function clipCut() {
    const html = selectionHtml();
    if (!html) return onNotice("Select some of your own text first.", "warn");
    internalClipboard = html;
    try { document.execCommand("delete"); } catch (e) { /* ignore */ }
    afterInput();
    onNotice("Cut — use Paste to put it back somewhere else.", "ok");
  }

  function clipPaste() {
    if (!internalClipboard) {
      return onNotice(
        "Nothing to paste. You can only paste text you cut or copied inside this exam.", "warn");
    }
    insertHTML(sanitizeHtml(internalClipboard));
  }

  // ---- Keyboard --------------------------------------------------------
  // proctor.js has already called preventDefault() on these in the capture
  // phase, so the browser will not act on them; what happens instead is here.
  body.addEventListener("keydown", (e) => {
    const mod = e.ctrlKey || e.metaKey;
    const k = String(e.key || "").toLowerCase();
    if (mod && k === "c") { e.preventDefault(); clipCopy(); return; }
    if (mod && k === "x") { e.preventDefault(); clipCut(); return; }
    if (mod && k === "v") { e.preventDefault(); clipPaste(); return; }
    if (mod) return;
    // Printable keystrokes are counted so the dashboard can compare "words
    // written" with "keys actually pressed".
    if (e.key && e.key.length === 1) onTyped(1);
  });

  // ---- Import guard ----------------------------------------------------
  // The last line of defence: every way the platform has of putting text into
  // a contenteditable that is not a keystroke.
  body.addEventListener("beforeinput", (e) => {
    const t = e.inputType || "";
    if (["insertFromPaste", "insertFromPasteAsQuotation", "insertFromDrop",
      "insertReplacementText", "insertFromYank"].includes(t)) {
      e.preventDefault();
      onSuspicious("import blocked", t);
      onNotice("Text can only be typed here — pasting and dropping are disabled.", "err");
      return;
    }
    if (t.startsWith("insert") && currentChars() >= maxChars) {
      e.preventDefault();
      onNotice(`This answer has reached its ${maxChars.toLocaleString()} character limit.`, "warn");
    }
  });

  body.addEventListener("input", (e) => {
    // A single input event that lands a paragraph at once is not typing. It is
    // recorded for the instructor rather than punished, because dictation and
    // some IMEs legitimately do it.
    const data = e.data || "";
    if (e.inputType === "insertText" && data.length > 40) {
      onSuspicious("bulk text insert", `${data.length} chars at once`);
    }
    afterInput();
  });

  body.addEventListener("focus", save);
  body.addEventListener("blur", save);

  // ---- Diagrams --------------------------------------------------------
  // Opening the chooser is the one moment this editor genuinely hands control
  // to the operating system. Announce it, so the proctor can expect the blur.
  function openPicker() {
    if (imageCount >= maxImages) {
      return onNotice(`You can attach at most ${maxImages} diagrams to this answer.`, "warn");
    }
    onPickerOpen();
    fileInput.click();
    // The chooser gives no event when it is cancelled, so close the window on
    // the next focus instead of waiting for the grace period to time out.
    window.addEventListener("focus", () => onPickerClose(), { once: true });
  }

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    fileInput.value = "";
    onPickerClose();
    if (!file) return;
    if (!/^image\//i.test(file.type)) {
      return onNotice("Please choose an image file (JPG, PNG or HEIC photo).", "err");
    }
    if (imageCount >= maxImages) {
      return onNotice(`You can attach at most ${maxImages} diagrams to this answer.`, "warn");
    }
    if (!onImageUpload) return onNotice("Diagram upload is not available.", "err");

    onNotice("Preparing your diagram…", "ok");
    try {
      const shot = await compressImage(file, IMG_MAX_DIM, IMG_MAX_BYTES);
      const id = await onImageUpload(file, { qid, ...shot });
      if (!id) return;                                  // caller refused / failed
      insertFigure(id, shot.dataUrl);
      onNotice("Diagram attached.", "ok");
    } catch (err) {
      console.error(err);
      onNotice("That image could not be read. Try a JPG or PNG photo.", "err");
    }
  });

  // A drawing made in the canvas takes exactly the same route as an uploaded
  // photo: same compression contract, same upload callback, same figure markup,
  // so the Firestore rules, the faculty view and the offline report need to
  // know nothing about where the picture came from.
  async function insertDrawing(shot) {
    if (!onImageUpload) return onNotice("Diagram upload is not available.", "err");
    onNotice("Saving your drawing…", "ok");
    try {
      const id = await onImageUpload(null, { qid, ...shot });
      if (!id) return;
      insertFigure(id, shot.dataUrl);
      onNotice("Drawing attached.", "ok");
    } catch (err) {
      console.error(err);
      onNotice("That drawing could not be saved. Check your connection.", "err");
    }
  }

  function insertFigure(id, dataUrl) {
    const n = imageCount + 1;
    insertHTML(
      `<figure class="dgm" data-img="${escapeHtml(id)}">` +
      `<img src="${dataUrl}" alt="diagram">` +
      `<figcaption>Figure ${n} — describe it here</figcaption></figure><p><br></p>`);
    countImages();
  }

  function countImages() {
    imageCount = body.querySelectorAll("figure.dgm").length;
    imgsEl.textContent = imageCount
      ? `· ${imageCount} diagram${imageCount > 1 ? "s" : ""}` : "";
  }

  // ---- Tables ----------------------------------------------------------
  // This used to call window.prompt(). A native dialog is drawn by the browser
  // chrome, not by the page: it blurs the window and on some desktops drops
  // full screen, which the proctor could only read as the student leaving. The
  // size is now asked for inside the page, so nothing leaves the document.
  function insertTable() {
    openTable((rows, cols, header) => {
      let html = "<table>";
      if (header) {
        html += "<thead><tr>";
        for (let c = 0; c < cols; c++) html += "<th>Heading</th>";
        html += "</tr></thead>";
        rows -= 1;
      }
      html += "<tbody>";
      for (let r = 0; r < rows; r++) {
        html += "<tr>";
        for (let c = 0; c < cols; c++) html += "<td>&nbsp;</td>";
        html += "</tr>";
      }
      html += "</tbody></table><p><br></p>";
      insertHTML(html);
    });
  }

  // ---- Equations -------------------------------------------------------
  async function insertMath(latex) {
    if (!latex) return;
    const span = document.createElement("span");
    span.className = "mathx";
    span.setAttribute("data-latex", latex);
    span.textContent = latex;
    insertHTML(span.outerHTML + "&nbsp;");
    await renderMath(body);
    afterInput();
  }

  // ---- Bookkeeping -----------------------------------------------------
  function currentChars() {
    return (body.textContent || "").length;
  }

  function afterInput() {
    countImages();
    const st = answerStats(body.innerHTML);
    wordsEl.textContent = st.words;
    paintTarget(st.words);
    onChange(getHTML(), st);
  }

  function paintTarget(words) {
    if (!minWords && !maxWords) { targetEl.textContent = ""; return; }
    const bits = [];
    if (minWords) bits.push(`min ${minWords}`);
    if (maxWords) bits.push(`max ${maxWords}`);
    targetEl.textContent = `· suggested ${bits.join(", ")} words`;
    const under = minWords && words < minWords;
    const over = maxWords && words > maxWords;
    targetEl.classList.toggle("warn", !!(under || over));
  }

  function refreshState() {
    ["bold", "italic", "underline", "strikeThrough"].forEach((c) => {
      let on = false;
      try { on = document.queryCommandState(c); } catch (e) { /* ignore */ }
      wrap.querySelector(`button[data-cmd="${c}"]`)?.classList.toggle("on", on);
    });
    let block = "";
    try { block = (document.queryCommandValue("formatBlock") || "").toLowerCase(); } catch (e) { }
    const match = BLOCKS.find(([tag]) => tag === `<${block}>`);
    styleSel.value = match ? match[0] : "<p>";
  }

  // ---- Public API ------------------------------------------------------
  // What leaves this editor is sanitised and has its image data removed, so the
  // caller can write it straight to Firestore.
  function getHTML() {
    return stripImages(sanitizeHtml(body.innerHTML));
  }

  async function setHTML(html, images) {
    body.innerHTML = sanitizeHtml(hydrateImages(html || "", images || {}));
    if (!body.innerHTML.trim()) body.innerHTML = "<p><br></p>";
    await renderMath(body);
    countImages();
    const st = answerStats(body.innerHTML);
    wordsEl.textContent = st.words;
    paintTarget(st.words);
  }

  return {
    root: wrap,
    body,
    getHTML,
    setHTML,
    focus: () => body.focus(),
    stats: () => answerStats(body.innerHTML),
    get imageCount() { return imageCount; },
    destroy: () => wrap.remove(),
  };
}

function renderTools(allowImages) {
  const style = `<select class="ed-style" title="Paragraph style">${BLOCKS
    .map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>`;
  return TOOLS.map((t) => {
    if (t.group === "style") return style;
    if (t.group === "sep") return `<span class="ed-sep"></span>`;
    if (t.key === "image" && !allowImages) return "";
    const attr = t.cmd ? `data-cmd="${t.cmd}"` : `data-act="${t.act}"`;
    return `<button type="button" ${attr} class="${t.cls || ""}" title="${escapeHtml(t.title)}"
             aria-label="${escapeHtml(t.title)}">${t.label}</button>`;
  }).join("");
}

// ---------------------------------------------------------------------------
// KaTeX, loaded the first time an equation is needed
// ---------------------------------------------------------------------------
let katexPromise = null;
export function loadKatex() {
  if (katexPromise) return katexPromise;
  katexPromise = new Promise((resolve) => {
    if (window.katex) return resolve(window.katex);
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.css`;
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`;
    s.onload = () => resolve(window.katex);
    s.onerror = () => resolve(null);      // offline: equations stay as LaTeX text
    document.head.appendChild(s);
  });
  return katexPromise;
}

// Rebuilds every equation in `root` from its stored LaTeX. Used by the editor,
// the faculty grading view and the offline report — all three therefore render
// from the same source of truth and none of them trusts stored HTML.
export async function renderMath(root) {
  const nodes = root.querySelectorAll("span.mathx[data-latex]");
  if (!nodes.length) return;
  const katex = await loadKatex();
  nodes.forEach((n) => {
    const latex = n.getAttribute("data-latex") || "";
    if (!katex) { n.textContent = latex; return; }
    try {
      katex.render(latex, n, { throwOnError: false, displayMode: false });
    } catch (e) {
      n.textContent = latex;
    }
  });
}

// ---------------------------------------------------------------------------
// Equation dialog
// ---------------------------------------------------------------------------
const MATH_TEMPLATES = [
  ["\\frac{a}{b}", "fraction"], ["x^{2}", "power"], ["x_{i}", "subscript"],
  ["\\sqrt{x}", "square root"], ["\\sqrt[n]{x}", "nth root"],
  ["\\sum_{i=1}^{n} x_i", "summation"], ["\\prod_{i=1}^{n} x_i", "product"],
  ["\\int_{a}^{b} f(x)\\,dx", "integral"], ["\\lim_{x \\to 0} f(x)", "limit"],
  ["\\frac{\\partial f}{\\partial x}", "partial derivative"],
  ["\\frac{dy}{dx}", "derivative"], ["\\log_{2} n", "logarithm"],
  ["O(n \\log n)", "big-O"], ["\\binom{n}{k}", "combination"],
  ["\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}", "matrix"],
  ["\\begin{cases} x & x>0 \\\\ -x & x\\le 0 \\end{cases}", "cases"],
  ["\\vec{v}", "vector"], ["\\bar{x}", "mean"], ["\\hat{y}", "estimate"],
  ["P(A \\mid B) = \\frac{P(B \\mid A)P(A)}{P(B)}", "Bayes"],
  ["\\alpha \\beta \\gamma \\theta \\lambda \\mu \\sigma", "Greek"],
  ["\\leq \\geq \\neq \\approx \\equiv \\propto", "relations"],
  ["\\in \\notin \\subset \\subseteq \\cup \\cap \\emptyset", "sets"],
  ["\\forall \\exists \\neg \\land \\lor \\Rightarrow \\Leftrightarrow", "logic"],
];

let mathModal = null;
function openMath(onInsert) {
  if (!mathModal) mathModal = buildMathModal();
  mathModal.open(onInsert);
}

function buildMathModal() {
  const el = document.createElement("div");
  el.className = "modal hidden";
  el.innerHTML = `
    <div class="modal-box">
      <h3>Insert an equation</h3>
      <p class="sub">Type it in LaTeX, or click a template below and edit the letters.
        The preview shows exactly what your instructor will see.</p>
      <textarea class="m-src" rows="3" spellcheck="false"
        placeholder="e.g.  \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"></textarea>
      <div class="m-preview" aria-live="polite"></div>
      <div class="m-templates"></div>
      <div class="modal-actions">
        <button type="button" class="btn secondary m-cancel">Cancel</button>
        <button type="button" class="btn m-ok">Insert equation</button>
      </div>
    </div>`;
  document.body.appendChild(el);

  const src = el.querySelector(".m-src");
  const preview = el.querySelector(".m-preview");
  el.querySelector(".m-templates").innerHTML = MATH_TEMPLATES
    .map(([tex, name]) =>
      `<button type="button" class="m-t" data-tex="${escapeHtml(tex)}">${escapeHtml(name)}</button>`)
    .join("");

  let cb = null;

  async function paint() {
    const katex = await loadKatex();
    const tex = src.value.trim();
    if (!tex) { preview.innerHTML = `<span class="muted">Preview appears here.</span>`; return; }
    if (!katex) { preview.textContent = tex; return; }
    try {
      katex.render(tex, preview, { throwOnError: true, displayMode: true });
    } catch (err) {
      preview.innerHTML = `<span class="m-err">${escapeHtml(err.message || "Not valid LaTeX yet")}</span>`;
    }
  }

  src.addEventListener("input", paint);
  el.querySelector(".m-templates").addEventListener("click", (e) => {
    const b = e.target.closest(".m-t");
    if (!b) return;
    const tex = b.dataset.tex;
    const at = src.selectionStart ?? src.value.length;
    src.value = src.value.slice(0, at) + tex + src.value.slice(at);
    src.focus();
    src.setSelectionRange(at + tex.length, at + tex.length);
    paint();
  });
  const close = () => { el.classList.add("hidden"); cb = null; };
  el.querySelector(".m-cancel").addEventListener("click", close);
  el.addEventListener("mousedown", (e) => { if (e.target === el) close(); });
  el.querySelector(".m-ok").addEventListener("click", () => {
    const tex = src.value.trim().slice(0, 600);
    const fn = cb;
    close();
    if (tex && fn) fn(tex);
  });

  return {
    open(onInsert) {
      cb = onInsert;
      src.value = "";
      paint();
      el.classList.remove("hidden");
      setTimeout(() => src.focus(), 30);
    },
  };
}

// ---------------------------------------------------------------------------
// Symbol palette — plain Unicode, inserted straight into the text
// ---------------------------------------------------------------------------
const SYMBOLS = {
  "Greek": "α β γ δ ε ζ η θ ι κ λ μ ν ξ π ρ σ τ υ φ χ ψ ω Γ Δ Θ Λ Ξ Π Σ Φ Ψ Ω",
  "Operators": "+ − × ÷ ± ∓ · ⋅ ∗ √ ∛ ∑ ∏ ∫ ∮ ∂ ∇ ∆ % ‰ ∞ ⌈ ⌉ ⌊ ⌋ | ‖",
  "Relations": "= ≠ ≈ ≅ ≡ ∝ < > ≤ ≥ ≪ ≫ ∼ ≐ ≜ ∴ ∵",
  "Sets & logic": "∈ ∉ ∋ ⊂ ⊃ ⊆ ⊇ ⊄ ∪ ∩ ∖ ∅ ℕ ℤ ℚ ℝ ℂ ∀ ∃ ∄ ¬ ∧ ∨ ⊕ ⊤ ⊥",
  "Arrows": "→ ← ↔ ⇒ ⇐ ⇔ ↦ ⇀ ↑ ↓ ↕ ⇑ ⇓ ↗ ↘ ⟶ ⟵",
  "Super / sub": "⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁿ ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₓ",
  "Units & misc": "° ′ ″ ℃ ℉ Å μ Ω ħ ℓ € £ ₹ § ¶ † ‡ … — – • ✓ ✗ ⟨ ⟩ ≜",
};

let symbolModal = null;
function openSymbols(onInsert) {
  if (!symbolModal) symbolModal = buildSymbolModal();
  symbolModal.open(onInsert);
}

function buildSymbolModal() {
  const el = document.createElement("div");
  el.className = "modal hidden";
  el.innerHTML = `
    <div class="modal-box">
      <h3>Special symbols</h3>
      <p class="sub">Click a symbol to drop it into your answer at the cursor.
        For a full equation use the <b>√x</b> button instead.</p>
      <div class="sym-groups">
        ${Object.entries(SYMBOLS).map(([name, chars]) => `
          <div class="sym-group">
            <div class="sym-title">${escapeHtml(name)}</div>
            <div class="sym-row">${chars.split(" ").filter(Boolean)
      .map((c) => `<button type="button" class="sym" data-c="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
      .join("")}</div>
          </div>`).join("")}
      </div>
      <div class="modal-actions">
        <button type="button" class="btn secondary s-close">Done</button>
      </div>
    </div>`;
  document.body.appendChild(el);

  let cb = null;
  const close = () => { el.classList.add("hidden"); cb = null; };
  el.querySelector(".s-close").addEventListener("click", close);
  el.addEventListener("mousedown", (e) => { if (e.target === el) close(); });
  // Stays open on purpose: an answer usually needs several symbols in a row.
  el.querySelector(".sym-groups").addEventListener("click", (e) => {
    const b = e.target.closest(".sym");
    if (b && cb) cb(escapeHtml(b.dataset.c));
  });

  return {
    open(onInsert) { cb = onInsert; el.classList.remove("hidden"); },
  };
}

// ---------------------------------------------------------------------------
// Table dialog
// ---------------------------------------------------------------------------
let tableModal = null;
function openTable(onInsert) {
  if (!tableModal) tableModal = buildTableModal();
  tableModal.open(onInsert);
}

function buildTableModal() {
  const el = document.createElement("div");
  el.className = "modal hidden";
  el.innerHTML = `
    <div class="modal-box">
      <h3>Insert a table</h3>
      <p class="sub">Choose the size. You can type in the cells afterwards, and pressing
        Tab in the last cell does <b>not</b> add a row — pick the size you need now.</p>
      <div class="tbl-row">
        <div>
          <label for="tblRows">Rows</label>
          <input type="number" id="tblRows" class="small" value="3" min="1" max="20" />
        </div>
        <div>
          <label for="tblCols">Columns</label>
          <input type="number" id="tblCols" class="small" value="3" min="1" max="10" />
        </div>
        <label class="tbl-head">
          <input type="checkbox" id="tblHead" checked />
          <span>First row is a heading row</span>
        </label>
      </div>
      <div class="tbl-preview" aria-hidden="true"></div>
      <div class="modal-actions">
        <button type="button" class="btn secondary t-cancel">Cancel</button>
        <button type="button" class="btn t-ok">Insert table</button>
      </div>
    </div>`;
  document.body.appendChild(el);

  const rowsEl = el.querySelector("#tblRows");
  const colsEl = el.querySelector("#tblCols");
  const headEl = el.querySelector("#tblHead");
  const preview = el.querySelector(".tbl-preview");
  let cb = null;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, parseInt(v, 10) || lo));

  function paint() {
    const rows = clamp(rowsEl.value, 1, 20);
    const cols = clamp(colsEl.value, 1, 10);
    const header = headEl.checked;
    let html = "<table>";
    for (let r = 0; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) {
        html += (header && r === 0) ? "<th>Heading</th>" : "<td>&nbsp;</td>";
      }
      html += "</tr>";
    }
    preview.innerHTML = html + "</table>";
  }

  [rowsEl, colsEl, headEl].forEach((n) => n.addEventListener("input", paint));
  const close = () => { el.classList.add("hidden"); cb = null; };
  el.querySelector(".t-cancel").addEventListener("click", close);
  el.addEventListener("mousedown", (e) => { if (e.target === el) close(); });
  el.querySelector(".t-ok").addEventListener("click", () => {
    const rows = clamp(rowsEl.value, 1, 20);
    const cols = clamp(colsEl.value, 1, 10);
    const header = headEl.checked;
    const fn = cb;
    close();
    if (fn) fn(rows, cols, header);
  });

  return {
    open(onInsert) {
      cb = onInsert;
      paint();
      el.classList.remove("hidden");
    },
  };
}

// ---------------------------------------------------------------------------
// Drawing pad
// ---------------------------------------------------------------------------
// Lets a student draw the diagram here instead of drawing it on paper,
// photographing it and uploading the photo. It works with a mouse, a trackpad,
// a touchscreen or a stylus, and — because it never leaves the page — it costs
// no focus, no full-screen exit and therefore no violation.
//
// Strokes are kept as points rather than painted straight onto the canvas, so
// undo is exact and the export can be redrawn at a higher resolution than the
// on-screen pad.
const PEN_COLOURS = [["#111827", "black"], ["#1d4ed8", "blue"], ["#b91c1c", "red"],
                     ["#047857", "green"]];
const PEN_SIZES = [[2, "fine"], [4, "medium"], [8, "thick"]];
const DRAW_EXPORT_SCALE = 2;        // export at twice the on-screen size

let drawModal = null;
function openDraw(onInsert, remaining) {
  if (!drawModal) drawModal = buildDrawModal();
  drawModal.open(onInsert, remaining);
}

function buildDrawModal() {
  const el = document.createElement("div");
  el.className = "modal hidden";
  el.innerHTML = `
    <div class="modal-box wide">
      <h3>Draw a diagram</h3>
      <p class="sub">Draw with the mouse, your trackpad, a finger or a stylus. This stays
        inside the exam — nothing is downloaded and no file chooser opens, so it will not
        interrupt your paper.</p>
      <div class="draw-tools">
        <span class="draw-group" data-role="colours"></span>
        <span class="ed-sep"></span>
        <span class="draw-group" data-role="sizes"></span>
        <span class="ed-sep"></span>
        <button type="button" class="draw-btn d-erase" title="Eraser">⌫ Eraser</button>
        <button type="button" class="draw-btn d-undo" title="Undo the last stroke">↶ Undo</button>
        <button type="button" class="draw-btn d-clear" title="Clear the whole drawing">Clear</button>
        <span class="draw-hint">Tip: hold and drag to draw.</span>
      </div>
      <div class="draw-wrap"><canvas class="draw-canvas" width="1000" height="560"></canvas></div>
      <div class="modal-actions">
        <span class="draw-count muted"></span>
        <button type="button" class="btn secondary d-cancel">Cancel</button>
        <button type="button" class="btn d-ok">Insert drawing</button>
      </div>
    </div>`;
  document.body.appendChild(el);

  const canvas = el.querySelector(".draw-canvas");
  const ctx = canvas.getContext("2d");
  const countEl = el.querySelector(".draw-count");
  let strokes = [];
  let current = null;
  let colour = PEN_COLOURS[0][0];
  let size = PEN_SIZES[1][0];
  let erasing = false;
  let cb = null;

  el.querySelector('[data-role="colours"]').innerHTML = PEN_COLOURS
    .map(([hex, name], i) => `<button type="button" class="draw-swatch${i === 0 ? " on" : ""}"
       data-colour="${hex}" title="${name}" style="background:${hex}"></button>`).join("");
  el.querySelector('[data-role="sizes"]').innerHTML = PEN_SIZES
    .map(([px, name], i) => `<button type="button" class="draw-btn${i === 1 ? " on" : ""}"
       data-size="${px}" title="${name} line">${"•".repeat(i + 1)}</button>`).join("");

  function setActive(group, el2) {
    el.querySelectorAll(group).forEach((b) => b.classList.remove("on"));
    el2.classList.add("on");
  }

  el.querySelector('[data-role="colours"]').addEventListener("click", (e) => {
    const b = e.target.closest(".draw-swatch");
    if (!b) return;
    colour = b.dataset.colour;
    erasing = false;
    el.querySelector(".d-erase").classList.remove("on");
    setActive(".draw-swatch", b);
  });
  el.querySelector('[data-role="sizes"]').addEventListener("click", (e) => {
    const b = e.target.closest(".draw-btn[data-size]");
    if (!b) return;
    size = Number(b.dataset.size);
    setActive(".draw-btn[data-size]", b);
  });
  el.querySelector(".d-erase").addEventListener("click", (e) => {
    erasing = !erasing;
    e.currentTarget.classList.toggle("on", erasing);
  });
  // Undo walks a stack of snapshots rather than popping strokes, so Clear is
  // undoable too — a student who clears a nearly-finished diagram by mistake
  // has no other way back, and there is no native dialog available to warn them.
  let history = [];
  function snapshot() {
    history.push(strokes.map((st) => ({ ...st, pts: st.pts.slice() })));
    if (history.length > 40) history.shift();
  }
  el.querySelector(".d-undo").addEventListener("click", () => {
    if (!history.length) return;
    strokes = history.pop();
    current = null;
    repaint();
  });
  el.querySelector(".d-clear").addEventListener("click", () => {
    if (!strokes.length) return;
    snapshot();
    strokes = [];
    repaint();
  });

  // ---- pointer handling ----
  // Pointer events cover mouse, touch and stylus with one code path. The canvas
  // is drawn at a fixed internal size and scaled by CSS, so every coordinate is
  // mapped through the element's real box.
  function pointAt(ev) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (ev.clientX - r.left) * (canvas.width / r.width),
      y: (ev.clientY - r.top) * (canvas.height / r.height),
    };
  }

  canvas.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    canvas.setPointerCapture(ev.pointerId);
    snapshot();
    current = {
      colour, erasing,
      // An eraser stroke has to be fat enough to be usable.
      size: erasing ? size * 4 : size,
      pts: [pointAt(ev)],
    };
    strokes.push(current);
    repaint();
  });
  canvas.addEventListener("pointermove", (ev) => {
    if (!current) return;
    ev.preventDefault();
    current.pts.push(pointAt(ev));
    repaint();
  });
  const endStroke = () => {
    if (current && current.pts.length === 1) current.pts.push({ ...current.pts[0] });  // a dot
    current = null;
    repaint();
  };
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);
  canvas.addEventListener("pointerleave", endStroke);

  function paintTo(c, scale) {
    c.save();
    c.scale(scale, scale);
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.lineCap = "round";
    c.lineJoin = "round";
    strokes.forEach((st) => {
      c.beginPath();
      // The eraser paints white rather than clearing, because the export needs
      // an opaque background for JPEG anyway.
      c.strokeStyle = st.erasing ? "#ffffff" : st.colour;
      c.lineWidth = st.size;
      st.pts.forEach((p, i) => (i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y)));
      c.stroke();
    });
    c.restore();
  }

  function repaint() {
    paintTo(ctx, 1);
    const n = strokes.length;
    countEl.textContent = n ? `${n} stroke${n > 1 ? "s" : ""}` : "Nothing drawn yet";
    el.querySelector(".d-ok").disabled = n === 0;
  }

  const close = () => { el.classList.add("hidden"); cb = null; };
  el.querySelector(".d-cancel").addEventListener("click", close);
  el.addEventListener("mousedown", (e) => { if (e.target === el) close(); });

  el.querySelector(".d-ok").addEventListener("click", () => {
    if (!strokes.length || !cb) return;
    const out = document.createElement("canvas");
    out.width = canvas.width * DRAW_EXPORT_SCALE;
    out.height = canvas.height * DRAW_EXPORT_SCALE;
    paintTo(out.getContext("2d"), DRAW_EXPORT_SCALE);

    // A line drawing is mostly flat white, so it compresses far below the
    // photograph ceiling; step the quality down only if it somehow does not.
    let quality = 0.92;
    let dataUrl = out.toDataURL("image/jpeg", quality);
    while (bytesOf(dataUrl) > IMG_MAX_BYTES && quality > 0.4) {
      quality -= 0.12;
      dataUrl = out.toDataURL("image/jpeg", quality);
    }
    const fn = cb;
    close();
    fn({ dataUrl, bytes: bytesOf(dataUrl), w: out.width, h: out.height, id: uid8() });
  });

  return {
    open(onInsert) {
      cb = onInsert;
      strokes = [];
      history = [];
      current = null;
      repaint();
      el.classList.remove("hidden");
    },
  };
}

// ---------------------------------------------------------------------------
// Image compression
// ---------------------------------------------------------------------------
// A phone photo of a notebook page is 3–6 MB. Firestore caps a document at
// 1 MiB, so the picture is re-drawn at a sane size and re-encoded until it is
// small enough to store — while staying readable enough to mark.
export async function compressImage(file, maxDim, maxBytes) {
  const bitmap = await loadBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";                    // flatten transparency for JPEG
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  if (bitmap.close) bitmap.close();

  let quality = 0.82;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (bytesOf(dataUrl) > maxBytes && quality > 0.35) {
    quality -= 0.12;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  if (bytesOf(dataUrl) > maxBytes) {
    // Still too big at low quality: the photo is simply very large, so shrink it.
    const small = document.createElement("canvas");
    small.width = Math.round(w * 0.7);
    small.height = Math.round(h * 0.7);
    small.getContext("2d").drawImage(canvas, 0, 0, small.width, small.height);
    dataUrl = small.toDataURL("image/jpeg", 0.6);
  }
  if (bytesOf(dataUrl) > maxBytes) throw new Error("image too large");
  return { dataUrl, bytes: bytesOf(dataUrl), w, h, id: uid8() };
}

function bytesOf(dataUrl) {
  return Math.ceil((dataUrl.length - (dataUrl.indexOf(",") + 1)) * 3 / 4);
}

async function loadBitmap(file) {
  if (window.createImageBitmap) {
    try { return await createImageBitmap(file); } catch (e) { /* HEIC etc. — fall through */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("decode failed")); };
    img.src = url;
  });
}
