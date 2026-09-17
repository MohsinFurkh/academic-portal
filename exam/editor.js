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
  { act: "image", label: "🖼", title: "Upload a diagram you drew on paper", key: "image" },
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
    else if (act === "image") fileInput.click();
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
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    fileInput.value = "";
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
  function insertTable() {
    const spec = window.prompt("Table size as rows x columns (for example 3x4):", "3x3");
    if (!spec) return;
    const m = /^\s*(\d+)\s*[x×,\s]\s*(\d+)\s*$/i.exec(spec);
    if (!m) return onNotice("Enter the size as rows x columns, e.g. 3x4.", "warn");
    const rows = Math.min(20, Math.max(1, +m[1]));
    const cols = Math.min(10, Math.max(1, +m[2]));
    let html = "<table><thead><tr>";
    for (let c = 0; c < cols; c++) html += "<th>Head</th>";
    html += "</tr></thead><tbody>";
    for (let r = 1; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) html += "<td>&nbsp;</td>";
      html += "</tr>";
    }
    html += "</tbody></table><p><br></p>";
    insertHTML(html);
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
