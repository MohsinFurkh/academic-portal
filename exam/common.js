// ---------------------------------------------------------------------------
// Shared helpers for the descriptive (subjective) class-test system
// ---------------------------------------------------------------------------
// Nothing here touches Firestore, so it can be unit-tested from selftest.html.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Exam JSON -> uniform question list
// ---------------------------------------------------------------------------
// Accepted shape:
//   {
//     course, assessment | title, instructions,
//     questions: [
//       { id, question, marks, minWords, maxWords, allowImages, guidance }
//     ]
//   }
// A bare array of questions is accepted too.
export function normalizeExam(raw) {
  const src = Array.isArray(raw) ? { questions: raw } : (raw || {});
  const list = Array.isArray(src.questions) ? src.questions : [];
  const questions = list.map((q, i) => ({
    id: q.id != null ? String(q.id) : String(i + 1),
    question: String(q.question || q.text || "(no question text)"),
    guidance: String(q.guidance || q.hint || ""),
    marks: numOr(q.marks, 5),
    minWords: numOr(q.minWords, 0),
    maxWords: numOr(q.maxWords, 0),
    // Diagram upload is on unless the question explicitly turns it off.
    allowImages: q.allowImages !== false,
  }));
  return {
    course: String(src.course || ""),
    title: String(src.assessment || src.title || ""),
    instructions: String(src.instructions || ""),
    questions,
  };
}

function numOr(v, dflt) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : dflt;
}

export function totalMarks(questions) {
  return (questions || []).reduce((s, q) => s + (Number(q.marks) || 0), 0);
}

// ---------------------------------------------------------------------------
// HTML sanitisation
// ---------------------------------------------------------------------------
// Answers are written in a contenteditable, so the HTML that reaches Firestore
// is normally ours. "Normally" is not good enough: a student with the developer
// console open can put anything into that element, and the faculty dashboard
// later renders it. Everything is therefore whitelisted on the way out of the
// student's browser AND again on the way into the faculty's.
const ALLOWED_TAGS = new Set([
  "P", "BR", "H1", "H2", "H3", "H4",
  "STRONG", "B", "EM", "I", "U", "S", "SUP", "SUB",
  "UL", "OL", "LI", "BLOCKQUOTE", "PRE", "CODE", "HR",
  "TABLE", "THEAD", "TBODY", "TR", "TD", "TH",
  "SPAN", "FIGURE", "FIGCAPTION", "IMG", "DIV",
]);

// class names a student's markup is allowed to carry
const ALLOWED_CLASSES = new Set(["mathx", "dgm"]);

export function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(
    `<body>${String(html || "")}</body>`, "text/html");
  walk(doc.body);
  return doc.body.innerHTML;
}

function walk(node) {
  // Iterate over a copy: the loop replaces and removes children as it goes.
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === 3) return;                 // text — always fine
    if (child.nodeType !== 1) return child.remove();  // comments, CDATA, …

    const tag = child.tagName;
    if (!ALLOWED_TAGS.has(tag)) {
      // Keep what the student wrote, drop the tag around it.
      const text = child.textContent || "";
      child.replaceWith(document.createTextNode(text));
      return;
    }

    // A math span is rebuilt from its LaTeX on render, so only the LaTeX is
    // kept here — never whatever HTML happens to be inside it.
    if (tag === "SPAN") {
      const latex = child.getAttribute("data-latex");
      if (latex == null) {
        child.replaceWith(...[...child.childNodes]);
        return;
      }
      const clean = child.ownerDocument.createElement("span");
      clean.className = "mathx";
      clean.setAttribute("data-latex", String(latex).slice(0, 600));
      clean.textContent = String(latex).slice(0, 600);
      child.replaceWith(clean);
      return;
    }

    stripAttrs(child, tag);
    walk(child);
  });
}

function stripAttrs(el, tag) {
  [...el.attributes].forEach((a) => {
    const name = a.name.toLowerCase();
    const keep =
      (name === "class" && ALLOWED_CLASSES.has(a.value.trim())) ||
      (name === "data-img" && tag === "FIGURE") ||
      (name === "src" && tag === "IMG" && /^data:image\//i.test(a.value)) ||
      (name === "alt" && tag === "IMG") ||
      (["colspan", "rowspan"].includes(name) && (tag === "TD" || tag === "TH"));
    if (!keep) el.removeAttribute(a.name);
  });
}

// ---------------------------------------------------------------------------
// Diagrams: the attempt document stores placeholders, not pixels
// ---------------------------------------------------------------------------
// A Firestore document is capped at 1 MiB. Uploaded diagrams live in
// examAttempts/{id}/images/{imgId} and the answer HTML only references them,
// so a paper with ten photographs still writes a few kilobytes per save.
export function stripImages(html) {
  const d = new DOMParser().parseFromString(`<body>${html || ""}</body>`, "text/html");
  d.body.querySelectorAll("figure.dgm img").forEach((img) => img.remove());
  return d.body.innerHTML;
}

// Puts the pixels back for the faculty view / offline report.
// images: { [imgId]: dataUrl }
export function hydrateImages(html, images) {
  const d = new DOMParser().parseFromString(`<body>${html || ""}</body>`, "text/html");
  d.body.querySelectorAll("figure.dgm").forEach((fig) => {
    const id = fig.getAttribute("data-img");
    const url = images && images[id];
    const cap = fig.querySelector("figcaption");
    fig.innerHTML = "";
    if (url) {
      const img = d.createElement("img");
      img.src = url;
      img.alt = "student diagram";
      fig.appendChild(img);
    } else {
      const p = d.createElement("p");
      p.textContent = "[diagram missing]";
      fig.appendChild(p);
    }
    if (cap) fig.appendChild(cap);
  });
  return d.body.innerHTML;
}

// ---------------------------------------------------------------------------
// Word counting
// ---------------------------------------------------------------------------
export function htmlToText(html) {
  const d = new DOMParser().parseFromString(`<body>${html || ""}</body>`, "text/html");
  // Block boundaries must become whitespace, or "end.Next" counts as one word.
  d.body.querySelectorAll("p,div,br,li,h1,h2,h3,h4,tr,blockquote,pre")
    .forEach((el) => el.appendChild(d.createTextNode(" ")));
  return (d.body.textContent || "").replace(/\s+/g, " ").trim();
}

export function countWords(text) {
  const t = String(text || "").trim();
  return t ? t.split(/\s+/).length : 0;
}

export function answerStats(html) {
  const text = htmlToText(html);
  return { text, words: countWords(text), chars: text.length };
}

// A hard ceiling per answer, enforced in the editor. Ten questions at this
// length is ~200 KB — comfortably inside the 1 MiB document limit.
export const MAX_ANSWER_CHARS = 20000;

// ---------------------------------------------------------------------------
// Diagram limits
// ---------------------------------------------------------------------------
// A Firestore document is capped at 1 MiB in total. A data: URL costs about
// 4 characters per 3 bytes, so 450 KB of JPEG becomes a ~600 KB string — good
// quality for a photographed notebook page, with room to spare under the cap.
export const IMG_MAX_BYTES = 450000;   // after compression; also checked in rules
export const IMG_MAX_DIM = 1500;       // px, longest side
export const IMG_MAX_PER_QUESTION = 4;
export const IMG_MAX_PER_ATTEMPT = 15;

// ---------------------------------------------------------------------------
// Identity checks on the sign-in screen
// ---------------------------------------------------------------------------
export function validMobile(v) {
  const digits = String(v || "").replace(/\D/g, "");
  // Accept a bare 10-digit Indian number or one written with 91 / 091 / +91.
  const local = digits.replace(/^(0|91|091)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

export function validEmail(v, domains) {
  const email = String(v || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  const list = (domains || []).map((d) => String(d).trim().toLowerCase()).filter(Boolean);
  if (list.length === 0) return email;                    // no restriction set
  const host = email.split("@")[1];
  const ok = list.some((d) => host === d || host.endsWith("." + d));
  return ok ? email : null;
}

export function parseDomains(text) {
  return [...new Set(String(text || "")
    .split(/[\s,;]+/).map((s) => s.trim().toLowerCase().replace(/^@/, "")).filter(Boolean))];
}

export function parseRoster(text) {
  return [...new Set(String(text || "")
    .split(/[\s,;]+/).map((s) => s.trim()).filter(Boolean))];
}

// ---------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------
export const STALE_MS = 60000;

export function readingSeconds(exam) {
  const raw = exam ? exam.readingMinutes : undefined;
  if (raw === 0 || raw === "0") return 0;
  const n = Number(raw);
  return Math.round((Number.isFinite(n) && n > 0 ? n : 2) * 60);
}

export function extraMinutes(attempt) {
  const n = Number(attempt && attempt.extraMinutes);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function attemptMinutes(exam, attempt) {
  const base = Number((attempt && attempt.durationMinutes) ||
    (exam && exam.durationMinutes)) || 0;
  return base + extraMinutes(attempt);
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------
export function safeId(str) {
  return String(str).trim().replace(/[^a-zA-Z0-9_-]/g, "_");
}

export function fmtTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function uid8() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
