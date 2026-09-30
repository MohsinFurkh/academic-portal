// ---------------------------------------------------------------------------
// Shared helpers for the assignment system
// ---------------------------------------------------------------------------
// Nothing here touches Firestore, so all of it is unit-tested by selftest.html.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------
// One submission document holds every section's text for the whole group. A
// Firestore document is capped at 1 MiB, so the sections are capped too:
// 12 sections × 30 000 characters of HTML stays well under half of that.
export const MAX_SECTIONS = 12;
export const MAX_ANSWER_CHARS = 30000;
export const MAX_LINKS = 12;
export const GROUP_MIN_LIMIT = 2;
export const GROUP_MAX_LIMIT = 6;

// A lock whose holder has not been heard from for this long is abandoned (the
// laptop slept, the tab was closed) and may be taken over by a team-mate.
export const LOCK_STALE_MS = 70000;
export const LOCK_HEARTBEAT_MS = 25000;
export const LOCK_IDLE_RELEASE_MS = 180000;

// Declarations (peer assessment) stay open this long after the deadline, so a
// group that submits at the last minute can still fill them in.
export const DECLARATION_GRACE_HOURS = 72;

// Template files are stored in Firestore in chunks (there is no Storage bucket
// in this project). 700 000 characters keeps every chunk under the 1 MiB cap.
export const TEMPLATE_MAX_BYTES = 4 * 1024 * 1024;
export const TEMPLATE_CHUNK_CHARS = 700000;

// ---------------------------------------------------------------------------
// Assignment JSON -> uniform section list
// ---------------------------------------------------------------------------
// Accepted shape (every field optional except the questions):
//   { title, course, instructions,
//     questions: [ { id, question, guidance, marks, minWords, maxWords,
//                    starter, modelAnswer } ] }
export function normalizeAssignment(raw) {
  const src = Array.isArray(raw) ? { questions: raw } : (raw || {});
  const list = Array.isArray(src.questions) ? src.questions
    : Array.isArray(src.sections) ? src.sections : [];
  const questions = list.slice(0, MAX_SECTIONS).map((q, i) => ({
    id: q.id != null ? String(q.id) : `q${i + 1}`,
    question: String(q.question || q.title || q.text || "(no task text)"),
    guidance: String(q.guidance || q.hint || ""),
    marks: numOr(q.marks, 10),
    minWords: numOr(q.minWords, 0),
    maxWords: numOr(q.maxWords, 0),
    starter: String(q.starter || q.template || ""),
    modelAnswer: String(q.modelAnswer || q.rubric || ""),
  }));
  return {
    title: String(src.title || src.assessment || ""),
    course: String(src.course || ""),
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

// Next free section id, so ids stay stable when sections are added or removed
// after students have started — answers are keyed by id, not by position.
export function nextSectionId(ids) {
  let max = 0;
  (ids || []).forEach((id) => {
    const m = /^q(\d+)$/.exec(String(id));
    if (m) max = Math.max(max, Number(m[1]));
  });
  return `q${max + 1}`;
}

// ---------------------------------------------------------------------------
// Starter text -> editor HTML
// ---------------------------------------------------------------------------
// Faculty type the scaffold as plain text: one paragraph per line, "## " for a
// heading, "- " for a bullet. It is converted here rather than stored as HTML,
// so the faculty form never has to be trusted with markup.
export function starterToHtml(text) {
  const lines = String(text || "").replace(/\r/g, "").split("\n");
  const out = [];
  let list = null;
  const flush = () => { if (list) { out.push(`<ul>${list.join("")}</ul>`); list = null; } };
  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) { flush(); return; }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      (list = list || []).push(`<li>${escapeHtml(line.slice(2))}</li>`);
      return;
    }
    flush();
    if (line.startsWith("### ")) out.push(`<h4>${escapeHtml(line.slice(4))}</h4>`);
    else if (line.startsWith("## ")) out.push(`<h3>${escapeHtml(line.slice(3))}</h3>`);
    else if (line.startsWith("# ")) out.push(`<h2>${escapeHtml(line.slice(2))}</h2>`);
    else out.push(`<p>${escapeHtml(line)}</p>`);
  });
  flush();
  return out.join("");
}

// ---------------------------------------------------------------------------
// HTML sanitisation
// ---------------------------------------------------------------------------
// Answers are typed into a contenteditable, but a student with the developer
// console open can put anything into that element, and the faculty dashboard
// renders it later. Everything is whitelisted on the way out of the student's
// browser AND again on the way into the faculty's.
const ALLOWED_TAGS = new Set([
  "P", "BR", "H1", "H2", "H3", "H4",
  "STRONG", "B", "EM", "I", "U", "S", "SUP", "SUB",
  "UL", "OL", "LI", "BLOCKQUOTE", "PRE", "CODE", "HR",
  "TABLE", "THEAD", "TBODY", "TR", "TD", "TH",
  "SPAN", "DIV",
]);

// Blocks that carry an author stamp (see AUTHOR_ATTR). Kept in one place: the
// editor stamps exactly these, and the sanitizer keeps the stamp on exactly
// these.
export const AUTHORED_BLOCKS = new Set([
  "P", "H1", "H2", "H3", "H4", "LI", "BLOCKQUOTE", "PRE", "TD", "TH", "DIV",
]);
export const AUTHOR_ATTR = "data-a";
const AUTHOR_RE = /^[A-Za-z0-9_-]{1,40}$/;

const ALLOWED_CLASSES = new Set(["mathx"]);

export function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(
    `<body>${String(html || "")}</body>`, "text/html");
  walk(doc.body);
  return doc.body.innerHTML;
}

function walk(node) {
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === 3) return;
    if (child.nodeType !== 1) return child.remove();

    const tag = child.tagName;
    if (!ALLOWED_TAGS.has(tag)) {
      child.replaceWith(child.ownerDocument.createTextNode(child.textContent || ""));
      return;
    }

    // A math span is rebuilt from its LaTeX on render, so only the LaTeX is
    // kept — never whatever HTML happens to be inside it.
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
      (name === AUTHOR_ATTR && AUTHORED_BLOCKS.has(tag) && AUTHOR_RE.test(a.value)) ||
      (["colspan", "rowspan"].includes(name) && (tag === "TD" || tag === "TH"));
    if (!keep) el.removeAttribute(a.name);
  });
}

// ---------------------------------------------------------------------------
// Word counting
// ---------------------------------------------------------------------------
export function htmlToText(html) {
  const d = new DOMParser().parseFromString(`<body>${html || ""}</body>`, "text/html");
  return nodeText(d.body);
}

function nodeText(root) {
  // Block boundaries must become whitespace, or "end.Next" counts as one word.
  root.querySelectorAll("p,div,br,li,h1,h2,h3,h4,tr,td,th,blockquote,pre")
    .forEach((el) => el.appendChild(root.ownerDocument.createTextNode(" ")));
  return (root.textContent || "").replace(/\s+/g, " ").trim();
}

export function countWords(text) {
  const t = String(text || "").trim();
  return t ? t.split(/\s+/).length : 0;
}

export function answerStats(html) {
  const text = htmlToText(html);
  return { text, words: countWords(text), chars: text.length };
}

// ---------------------------------------------------------------------------
// Authorship
// ---------------------------------------------------------------------------
// Every paragraph (list item, table cell, heading…) is stamped with the SAP ID
// of the member who last typed in it. Counting the words under each stamp says
// who wrote how much of the FINAL text — the strongest single piece of
// contribution evidence, because it cannot be inflated without actually
// writing. Text with no stamp came from the faculty's starter template.
//
// Returns { [sapId | ""]: words } where "" is unattributed (template) text.
export function authorshipWords(html) {
  const d = new DOMParser().parseFromString(`<body>${html || ""}</body>`, "text/html");
  const out = {};
  const add = (who, n) => { if (n) out[who] = (out[who] || 0) + n; };

  // A stamped block's own words, excluding any stamped blocks nested inside it
  // (a list item holding a sub-list), so nothing is counted twice.
  d.body.querySelectorAll(`[${AUTHOR_ATTR}]`).forEach((el) => {
    const copy = el.cloneNode(true);
    copy.querySelectorAll(`[${AUTHOR_ATTR}]`).forEach((n) => n.remove());
    add(el.getAttribute(AUTHOR_ATTR), countWords(nodeText(copy)));
  });

  // Whatever is left outside every stamp.
  const rest = d.body.cloneNode(true);
  rest.querySelectorAll(`[${AUTHOR_ATTR}]`).forEach((n) => n.remove());
  add("", countWords(nodeText(rest)));
  return out;
}

// Adds several authorship maps together (one per section).
export function mergeCounts(maps) {
  const out = {};
  (maps || []).forEach((m) => Object.entries(m || {}).forEach(([k, v]) => {
    out[k] = (out[k] || 0) + (Number(v) || 0);
  }));
  return out;
}

// Share of the attributed words per member, in percent, over `members`.
// Template text is left out: it was nobody's work.
export function authorshipShares(counts, members) {
  const list = members || Object.keys(counts || {}).filter(Boolean);
  const total = list.reduce((s, m) => s + (Number(counts?.[m]) || 0), 0);
  const out = {};
  list.forEach((m) => {
    out[m] = total ? Math.round(((Number(counts?.[m]) || 0) / total) * 1000) / 10 : 0;
  });
  return out;
}

// ---------------------------------------------------------------------------
// Peer assessment
// ---------------------------------------------------------------------------
// Each member splits 100% of the work between every member of the group,
// themselves included. A split must cover every member exactly and add up to
// 100 — anything else is rejected before it is saved.
export function validSplit(split, members) {
  if (!split || typeof split !== "object") return false;
  const keys = Object.keys(split);
  if (keys.length !== members.length || !members.every((m) => keys.includes(m))) return false;
  let sum = 0;
  for (const m of members) {
    const n = Number(split[m]);
    if (!Number.isFinite(n) || n < 0 || n > 100) return false;
    sum += n;
  }
  return Math.abs(sum - 100) < 0.01;
}

// Average percentage each member was given by their TEAM-MATES (self-ratings
// are reported separately — they are the least reliable number in the set).
//   declarations: { [rater]: { split: { [member]: pct } } }
// Returns { [member]: { peer: avg | null, share: pct | null, self: pct | null, raters: n } }
//
// `peer` is the raw average. It cannot be used as a share on its own: when
// every member rates themselves generously, every member's team-mates give
// them less than an equal share, and all of them would be marked down. So
// `share` rescales the peer averages to add up to 100% across the group —
// only possible once every member has been rated by someone.
export function peerSummary(declarations, members) {
  const out = {};
  members.forEach((m) => {
    const given = [];
    let self = null;
    members.forEach((r) => {
      const split = declarations?.[r]?.split;
      if (!split || !validSplit(split, members)) return;
      if (r === m) self = Number(split[m]);
      else given.push(Number(split[m]));
    });
    out[m] = {
      peer: given.length ? Math.round((given.reduce((a, b) => a + b, 0) / given.length) * 10) / 10 : null,
      share: null,
      self,
      raters: given.length,
    };
  });
  const all = members.every((m) => out[m].peer != null);
  const sum = members.reduce((s, m) => s + (out[m].peer || 0), 0);
  if (all && sum > 0) {
    members.forEach((m) => { out[m].share = Math.round((out[m].peer / sum) * 1000) / 10; });
  }
  return out;
}

// Suggested individual-mark factor (WebPA style). An equal share is 1.0; a
// member the team says did twice an equal share gets more, one who did little
// gets less. Evidence from team-mates is used when there is any, otherwise the
// authorship share. Clamped so one lopsided rating cannot zero a student or
// hand them far more than the work was worth.
export function suggestedFactor(peerPct, authorPct, n, { min = 0.5, max = 1.2 } = {}) {
  const fair = 100 / Math.max(1, n);
  const basis = peerPct != null ? peerPct : authorPct;
  if (basis == null || !Number.isFinite(Number(basis))) return 1;
  const f = Number(basis) / fair;
  return Math.round(Math.min(max, Math.max(min, f)) * 100) / 100;
}

// ---------------------------------------------------------------------------
// Supplementary links
// ---------------------------------------------------------------------------
// Attachments live in the student's own cloud drive. Only well-known file hosts
// are accepted, so a "link" cannot be a tracking pixel, a phishing page or a
// javascript: URL rendered in the faculty dashboard.
export const LINK_HOSTS = [
  "drive.google.com", "docs.google.com", "colab.research.google.com", "sites.google.com",
  "onedrive.live.com", "1drv.ms", "sharepoint.com", "office.com", "live.com",
  "dropbox.com", "box.com", "icloud.com",
  "github.com", "gitlab.com", "bitbucket.org", "kaggle.com",
  "youtube.com", "youtu.be", "figma.com", "canva.com", "overleaf.com",
  "notion.so", "notion.site", "replit.com", "codepen.io", "huggingface.co",
];

// Returns { ok, url, host, reason }.
export function checkLink(input) {
  const raw = String(input || "").trim();
  if (!raw) return { ok: false, reason: "Paste the link to the file or folder." };
  let u;
  try {
    u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`);
  } catch (e) {
    return { ok: false, reason: "That is not a valid web address." };
  }
  if (u.protocol !== "https:") return { ok: false, reason: "Only secure https:// links are accepted." };
  if (u.username || u.password) return { ok: false, reason: "Links with a user name or password in them are not accepted." };
  const host = u.hostname.toLowerCase();
  const allowed = LINK_HOSTS.some((h) => host === h || host.endsWith("." + h));
  if (!allowed) {
    return {
      ok: false, host,
      reason: `Links to ${host} are not accepted. Use Google Drive, OneDrive, Dropbox, GitHub or a similar cloud service.`,
    };
  }
  if (u.href.length > 600) return { ok: false, reason: "That link is too long." };
  return { ok: true, url: u.href, host };
}

// ---------------------------------------------------------------------------
// Identity checks
// ---------------------------------------------------------------------------
export function validMobile(v) {
  const digits = String(v || "").replace(/\D/g, "");
  const local = digits.replace(/^(0|91|091)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

export function validSap(v) {
  const s = String(v || "").trim();
  return /^[A-Za-z0-9]{3,20}$/.test(s) ? s : null;
}

export function validEmail(v) {
  const email = String(v || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : null;
}

// Exact domain match. The Firestore rules compare the text after the "@"
// with this list exactly, so the page must not be more lenient than they are.
export function emailDomainOk(email, domains) {
  const list = (domains || []).map((d) => String(d).trim().toLowerCase()).filter(Boolean);
  if (!list.length) return true;
  const host = String(email || "").toLowerCase().split("@")[1] || "";
  return list.includes(host);
}

export function parseDomains(text) {
  return [...new Set(String(text || "")
    .split(/[\s,;]+/).map((s) => s.trim().toLowerCase().replace(/^@/, "")).filter(Boolean))];
}

export function parseRoster(text) {
  return [...new Set(String(text || "")
    .split(/[\s,;]+/).map((s) => s.trim()).filter(Boolean))];
}

// Teacher-defined groups, one per line:
//   Team Alpha: 500101, 500102, 500103
//   500104 500105            (unnamed — gets "Group 2")
// Returns { groups: [{ name, members }], errors: [string] }.
export function parseGroups(text, { min = GROUP_MIN_LIMIT, max = GROUP_MAX_LIMIT } = {}) {
  const groups = [];
  const errors = [];
  const seen = new Map();
  String(text || "").replace(/\r/g, "").split("\n").forEach((line, i) => {
    const t = line.trim();
    if (!t) return;
    let name = "";
    let body = t;
    const colon = t.indexOf(":");
    if (colon > 0) { name = t.slice(0, colon).trim(); body = t.slice(colon + 1); }
    const members = parseRoster(body);
    const label = name || `Group ${groups.length + 1}`;
    if (members.length < min || members.length > max) {
      errors.push(`Line ${i + 1} (${label}) has ${members.length} member(s); groups must have ${min}–${max}.`);
    }
    members.forEach((m) => {
      if (seen.has(m)) errors.push(`${m} is in both ${seen.get(m)} and ${label}.`);
      else seen.set(m, label);
    });
    groups.push({ name: label.slice(0, 60), members });
  });
  return { groups, errors };
}

// ---------------------------------------------------------------------------
// Time
// ---------------------------------------------------------------------------
export function toMillis(ts) {
  if (!ts) return 0;
  if (typeof ts === "number") return ts;
  if (ts instanceof Date) return ts.getTime();
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (ts.seconds != null) return ts.seconds * 1000 + Math.round((ts.nanoseconds || 0) / 1e6);
  return 0;
}

// The deadline that applies to one submission: the assignment's, or a later
// extension granted to that student/group.
export function effectiveDeadline(assignment, sub) {
  const base = toMillis(assignment && assignment.deadline);
  const ext = toMillis(sub && sub.extensionUntil);
  return Math.max(base, ext);
}

// "3 days 4 h", "5 h 12 min", "12:04" — coarse when far away, exact when near.
export function fmtCountdown(ms) {
  if (!(ms > 0)) return "closed";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d >= 1) return `${d} day${d > 1 ? "s" : ""} ${h} h`;
  if (h >= 1) return `${h} h ${m} min`;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function fmtDate(msVal) {
  if (!msVal) return "–";
  return new Date(msVal).toLocaleString(undefined, {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function fmtMinutes(sec) {
  const m = Math.round((Number(sec) || 0) / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${m % 60} min`;
}

// <input type="datetime-local"> works in local time with no zone. These two
// convert to and from it without any UTC shifting.
export function toLocalInput(msVal) {
  if (!msVal) return "";
  const d = new Date(msVal);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function fromLocalInput(value) {
  if (!value) return 0;
  const t = new Date(value).getTime();
  return Number.isFinite(t) ? t : 0;
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------
export function safeId(str) {
  return String(str).trim().replace(/[^a-zA-Z0-9_-]/g, "_");
}

export function slug(s) {
  return String(s || "assignment").toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 40) || "assignment";
}

// Join codes: 8 characters, no look-alikes (0/o, 1/l/i), from the platform's
// cryptographic generator — the code is the only thing standing between a
// group's work and a stranger, so it must not be guessable.
const CODE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
export function joinCode(len = 8) {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}
export const JOIN_CODE_RE = /^[a-hj-km-np-z2-9]{8}$/;

export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function uid8() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, 10);
}

// Stable colour per member for authorship highlighting.
const PALETTE = ["#2e86c1", "#c0392b", "#1e8449", "#8e44ad", "#d35400", "#16a085"];
export function memberColour(members, sap) {
  const i = (members || []).indexOf(sap);
  return i >= 0 ? PALETTE[i % PALETTE.length] : "#7f8c8d";
}
