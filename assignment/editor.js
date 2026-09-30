// ---------------------------------------------------------------------------
// Answer editor: formatting, symbols, equations, authorship
// ---------------------------------------------------------------------------
// One instance per section. It is the exam's editor with the diagram tools
// removed (attachments go to the student's own cloud drive, not into this
// database) and two things added for group work:
//
//   * AUTHORSHIP. Every paragraph, list item, table cell and heading the
//     student types in is stamped with their SAP ID (data-a). The faculty
//     dashboard counts the words under each stamp to see who wrote what in the
//     final text. The stamp follows the LAST person to type in a block.
//   * READ-ONLY mode. In a group only one member edits a section at a time
//     (the lock lives in the submission document). Everyone else sees the
//     section update live but cannot type into it until the lock is free.
//
// As in the exam, cut/copy/paste work on the student's own text through an
// INTERNAL clipboard and never touch the system clipboard.
//
// execCommand is deprecated but is the only formatting API every current
// browser implements for contenteditable, so it is what this uses.
// ---------------------------------------------------------------------------

import {
  sanitizeHtml, answerStats, MAX_ANSWER_CHARS, AUTHORED_BLOCKS, AUTHOR_ATTR, escapeHtml,
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
  { group: "sep" },
  { act: "cut", label: "✂", title: "Cut (Ctrl+X) — within this assignment only" },
  { act: "copy", label: "⧉", title: "Copy (Ctrl+C) — within this assignment only" },
  { act: "paste", label: "📋", title: "Paste (Ctrl+V) — only text you cut or copied here" },
  { group: "sep" },
  { cmd: "undo", label: "↶", title: "Undo (Ctrl+Z)" },
  { cmd: "redo", label: "↷", title: "Redo (Ctrl+Y)" },
  { cmd: "removeFormat", label: "T̶", title: "Clear formatting" },
];

// Shared by every editor on the page, so a student can move a paragraph from
// one section to another. It lives only as long as the page does.
let internalClipboard = "";

const BLOCK_SELECTOR = [...AUTHORED_BLOCKS].map((t) => t.toLowerCase()).join(",");

// ---------------------------------------------------------------------------
export function createEditor(mount, opts) {
  const {
    qid = "q",
    author = "",                    // SAP ID stamped on the blocks this user types in
    minWords = 0,
    maxWords = 0,
    maxChars = MAX_ANSWER_CHARS,
    spellcheck = true,
    placeholder = "Start typing here…",
    onChange = () => { },           // (html, stats) — after every edit
    onTyped = () => { },            // (n) printable keystrokes
    onSuspicious = () => { },       // (kind, detail)
    onNotice = () => { },           // (text, kind)
    onWantEdit = () => { },         // student clicked a read-only section
  } = opts || {};

  // ---- DOM -------------------------------------------------------------
  const wrap = document.createElement("div");
  wrap.className = "ed";
  wrap.innerHTML = `
    <div class="ed-toolbar" role="toolbar" aria-label="Formatting">${renderTools()}</div>
    <div class="ed-body" contenteditable="true" spellcheck="${spellcheck}"
         role="textbox" aria-multiline="true" data-qid="${escapeHtml(qid)}"
         data-placeholder="${escapeHtml(placeholder)}"></div>
    <div class="ed-foot">
      <span class="ed-count"><b class="ed-words">0</b> words</span>
      <span class="ed-target"></span>
      <span class="ed-tip">Pasting from outside this page is disabled.</span>
    </div>`;
  mount.appendChild(wrap);

  const body = wrap.querySelector(".ed-body");
  const wordsEl = wrap.querySelector(".ed-words");
  const targetEl = wrap.querySelector(".ed-target");

  let savedRange = null;
  let editable = true;

  paintTarget(0);

  // ---- Formatting ------------------------------------------------------
  try { document.execCommand("styleWithCSS", false, false); } catch (e) { /* older browsers */ }
  // Enter starts a <p>, not a <div>, so paragraphs look and count alike.
  try { document.execCommand("defaultParagraphSeparator", false, "p"); } catch (e) { /* ignore */ }

  const toolbar = wrap.querySelector(".ed-toolbar");
  toolbar.addEventListener("mousedown", (e) => {
    // Keep the caret where it is: a toolbar click must not steal the selection.
    if (e.target.closest("button, select")) e.preventDefault();
  });

  toolbar.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cmd], button[data-act]");
    if (!btn || !editable) return;
    body.focus();
    restore();
    if (btn.dataset.cmd) exec(btn.dataset.cmd);
    else doAction(btn.dataset.act);
    refreshState();
  });

  const styleSel = wrap.querySelector(".ed-style");
  styleSel.addEventListener("change", () => {
    if (!editable) return;
    body.focus();
    restore();
    exec("formatBlock", styleSel.value);
    afterInput();
  });

  function exec(cmd, val) {
    try { document.execCommand(cmd, false, val); } catch (e) { /* ignore */ }
    save();
    afterInput();
  }

  function doAction(act) {
    if (act === "table") insertTable();
    else if (act === "rule") insertHTML("<hr>");
    else if (act === "symbol") openSymbols(insertHTML);
    else if (act === "math") openMath(insertMath);
    else if (act === "cut") clipCut();
    else if (act === "copy") clipCopy();
    else if (act === "paste") clipPaste();
  }

  // ---- Read-only mode --------------------------------------------------
  // A section someone else is editing. A click asks for the lock instead of
  // silently doing nothing, so the student learns why they cannot type.
  body.addEventListener("mousedown", () => { if (!editable) onWantEdit(); });
  body.addEventListener("focus", () => { if (!editable) onWantEdit(); });

  function setEditable(on) {
    editable = !!on;
    body.setAttribute("contenteditable", editable ? "true" : "false");
    wrap.classList.toggle("ro", !editable);
    toolbar.querySelectorAll("button, select").forEach((b) => { b.disabled = !editable; });
  }

  // ---- Selection bookkeeping ------------------------------------------
  function save() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && body.contains(sel.anchorNode)) {
      savedRange = sel.getRangeAt(0).cloneRange();
    }
  }
  // A stale saved range silently collapses to the START of the box, so when it
  // is no longer usable, insert at the END instead.
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
    if (!editable) return;
    body.focus();
    restore();
    try { document.execCommand("insertHTML", false, html); } catch (e) { /* ignore */ }
    save();
    afterInput();
  }

  // ---- Authorship ------------------------------------------------------
  // Stamps the block(s) around the caret — or every block the selection
  // touches — with this student's SAP ID. Called after every change.
  function stampAuthor() {
    if (!author) return;
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    if (!body.contains(range.commonAncestorContainer)) return;

    const blocks = new Set();
    const nearest = (node) => {
      const el = node && (node.nodeType === 1 ? node : node.parentElement);
      const b = el && el.closest(BLOCK_SELECTOR);
      return b && body.contains(b) && b !== body ? b : null;
    };
    [range.startContainer, range.endContainer].forEach((n) => {
      const b = nearest(n);
      if (b) blocks.add(b);
    });
    if (!range.collapsed) {
      body.querySelectorAll(BLOCK_SELECTOR).forEach((b) => {
        if (range.intersectsNode(b)) blocks.add(b);
      });
    }
    // Text typed straight into the box with no paragraph around it: wrap it,
    // so it can carry a stamp like everything else.
    if (!blocks.size) {
      try { document.execCommand("formatBlock", false, "<p>"); } catch (e) { /* ignore */ }
      const b = nearest(window.getSelection()?.anchorNode);
      if (b) blocks.add(b);
    }
    blocks.forEach((b) => {
      if (b.getAttribute(AUTHOR_ATTR) !== author) b.setAttribute(AUTHOR_ATTR, author);
    });
  }

  // ---- Internal clipboard ---------------------------------------------
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
    if (!html) return onNotice("Select some text in this assignment first.", "warn");
    internalClipboard = html;
    onNotice("Copied — use Paste to put it somewhere else in this assignment.", "ok");
  }

  function clipCut() {
    if (!editable) return;
    const html = selectionHtml();
    if (!html) return onNotice("Select some of your own text first.", "warn");
    internalClipboard = html;
    try { document.execCommand("delete"); } catch (e) { /* ignore */ }
    afterInput();
    onNotice("Cut — use Paste to put it back somewhere else.", "ok");
  }

  function clipPaste() {
    if (!editable) return;
    if (!internalClipboard) {
      return onNotice(
        "Nothing to paste. You can only paste text you cut or copied inside this assignment.", "warn");
    }
    insertHTML(sanitizeHtml(internalClipboard));
  }

  // ---- Keyboard --------------------------------------------------------
  // guard.js has already called preventDefault() on these in the capture
  // phase, so the browser will not act on them; what happens instead is here.
  body.addEventListener("keydown", (e) => {
    const mod = e.ctrlKey || e.metaKey;
    const k = String(e.key || "").toLowerCase();
    if (mod && k === "c") { e.preventDefault(); clipCopy(); return; }
    if (mod && k === "x") { e.preventDefault(); clipCut(); return; }
    if (mod && k === "v") { e.preventDefault(); clipPaste(); return; }
    if (mod || !editable) return;
    // Printable keystrokes are counted so the dashboard can compare "words
    // written" with "keys actually pressed", per member.
    if (e.key && e.key.length === 1) onTyped(1);
  });

  // ---- Import guard ----------------------------------------------------
  // The last line of defence: every way the platform has of putting text into
  // a contenteditable that is not a keystroke.
  body.addEventListener("beforeinput", (e) => {
    if (!editable) { e.preventDefault(); return; }
    const t = e.inputType || "";
    if (["insertFromPaste", "insertFromPasteAsQuotation", "insertFromDrop",
      "insertReplacementText", "insertFromYank"].includes(t)) {
      // Spell-check corrections arrive as insertReplacementText. They are the
      // student's own words, corrected — allow them, but only when short.
      if (t === "insertReplacementText" && String(e.data || e.dataTransfer?.getData("text") || "").length <= 40) {
        return;
      }
      e.preventDefault();
      onSuspicious("import blocked", t);
      onNotice("Text can only be typed here — pasting and dropping are disabled.", "err");
      return;
    }
    if (t.startsWith("insert") && currentChars() >= maxChars) {
      e.preventDefault();
      onNotice(`This section has reached its ${maxChars.toLocaleString()} character limit.`, "warn");
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

  // ---- Tables ----------------------------------------------------------
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
    if (editable) stampAuthor();
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
    targetEl.textContent = `· expected ${bits.join(", ")} words`;
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
  // What leaves this editor is sanitised, so the caller can write it straight
  // to Firestore.
  function getHTML() {
    return sanitizeHtml(body.innerHTML);
  }

  // Replaces the content (a team-mate's saved version, or the starter
  // template). The caret is kept where it was when the content is unchanged.
  async function setHTML(html) {
    const clean = sanitizeHtml(html || "");
    if (clean === sanitizeHtml(body.innerHTML) && clean) return;
    body.innerHTML = clean || "<p><br></p>";
    await renderMath(body);
    const st = answerStats(body.innerHTML);
    wordsEl.textContent = st.words;
    paintTarget(st.words);
  }

  return {
    root: wrap,
    body,
    getHTML,
    setHTML,
    setEditable,
    get editable() { return editable; },
    focus: () => body.focus(),
    stats: () => answerStats(body.innerHTML),
    destroy: () => wrap.remove(),
  };
}

function renderTools() {
  const style = `<select class="ed-style" title="Paragraph style">${BLOCKS
    .map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>`;
  return TOOLS.map((t) => {
    if (t.group === "style") return style;
    if (t.group === "sep") return `<span class="ed-sep"></span>`;
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
