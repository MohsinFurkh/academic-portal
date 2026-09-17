// ---------------------------------------------------------------------------
// Self-test: the parts that must not silently break
// ---------------------------------------------------------------------------
// Everything here runs offline. The proctor is driven with a fake document and
// a fake clock, so violations can be tested without actually leaving the page.
// ---------------------------------------------------------------------------

import {
  sanitizeHtml, stripImages, hydrateImages, htmlToText, countWords, answerStats,
  validMobile, validEmail, parseDomains, parseRoster, normalizeExam, totalMarks,
  readingSeconds, attemptMinutes, extraMinutes, safeId, fmtTime, escapeHtml,
} from "./common.js";
import { createProctor, VIOLATION_DEBOUNCE_MS } from "./proctor.js";
import { createEditor } from "./editor.js";

const results = [];
function check(name, fn) {
  try {
    const out = fn();
    results.push({ name, pass: out === true, detail: out === true ? "" : String(out) });
  } catch (e) {
    results.push({ name, pass: false, detail: e.message });
  }
}
const eq = (a, b) => (a === b ? true : `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

// ---------------------------------------------------------------------------
// Sanitiser — this is what stands between a student's console and the
// faculty's browser.
// ---------------------------------------------------------------------------
check("sanitiser keeps ordinary formatting", () =>
  eq(sanitizeHtml("<h2>Title</h2><p><strong>bold</strong> and <em>it</em></p>"),
    "<h2>Title</h2><p><strong>bold</strong> and <em>it</em></p>"));

check("sanitiser drops <script> but keeps its text out of the DOM", () => {
  const out = sanitizeHtml("<p>hi</p><script>alert(1)<\/script>");
  return out.includes("<script") ? `script survived: ${out}` : true;
});

check("sanitiser strips event handlers", () => {
  const out = sanitizeHtml(`<p onclick="steal()">text</p>`);
  return out.includes("onclick") ? `handler survived: ${out}` : eq(out, "<p>text</p>");
});

check("sanitiser strips javascript: links", () => {
  const out = sanitizeHtml(`<a href="javascript:alert(1)">x</a>`);
  return out.includes("href") || out.includes("<a") ? `link survived: ${out}` : true;
});

check("sanitiser refuses remote images", () => {
  const out = sanitizeHtml(`<img src="https://evil.example/track.gif">`);
  return out.includes("evil.example") ? `remote src survived: ${out}` : true;
});

check("sanitiser rebuilds an equation from its LaTeX only", () => {
  const out = sanitizeHtml(
    `<span class="mathx" data-latex="x^2"><b onclick="x()">anything at all</b></span>`);
  return out.includes("onclick") || out.includes("anything")
    ? `payload survived: ${out}`
    : (out.includes('data-latex="x^2"') ? true : `latex lost: ${out}`);
});

check("sanitiser keeps tables with spans", () =>
  eq(sanitizeHtml(`<table><tbody><tr><td colspan="2" class="x">a</td></tr></tbody></table>`),
    `<table><tbody><tr><td colspan="2">a</td></tr></tbody></table>`));

// ---------------------------------------------------------------------------
// Diagrams: pixels must not reach the attempt document
// ---------------------------------------------------------------------------
const FIG = `<figure class="dgm" data-img="abc123"><img src="data:image/jpeg;base64,AAAA">` +
  `<figcaption>Figure 1</figcaption></figure>`;

check("image data is stripped before saving", () => {
  const out = stripImages(sanitizeHtml(FIG));
  return out.includes("base64") ? `pixels survived: ${out}` : (out.includes("abc123") ? true : "id lost");
});

check("image data comes back for the faculty view", () => {
  const stored = stripImages(sanitizeHtml(FIG));
  const out = hydrateImages(stored, { abc123: "data:image/jpeg;base64,BBBB" });
  return out.includes("BBBB") && out.includes("Figure 1") ? true : out;
});

check("a missing diagram is reported, not silently dropped", () => {
  const out = hydrateImages(stripImages(sanitizeHtml(FIG)), {});
  return out.includes("diagram missing") ? true : out;
});

// ---------------------------------------------------------------------------
// Word counting
// ---------------------------------------------------------------------------
check("block boundaries are word boundaries", () =>
  eq(countWords(htmlToText("<p>end.</p><p>Next one</p>")), 3));
check("an empty answer counts zero", () => eq(answerStats("<p><br></p>").words, 0));
check("list items are counted", () =>
  eq(countWords(htmlToText("<ul><li>one</li><li>two three</li></ul>")), 3));

// ---------------------------------------------------------------------------
// Sign-in checks
// ---------------------------------------------------------------------------
check("plain 10-digit mobile", () => eq(validMobile("9876543210"), "9876543210"));
check("+91 mobile", () => eq(validMobile("+91 98765 43210"), "9876543210"));
check("0-prefixed mobile", () => eq(validMobile("09876543210"), "9876543210"));
check("short mobile refused", () => eq(validMobile("98765"), null));
check("mobile starting 1 refused", () => eq(validMobile("1234567890"), null));

check("college email accepted", () =>
  eq(validEmail("A.Student@stu.upes.ac.in", ["stu.upes.ac.in"]), "a.student@stu.upes.ac.in"));
check("sub-domain accepted", () =>
  eq(validEmail("x@mail.upes.ac.in", ["upes.ac.in"]), "x@mail.upes.ac.in"));
check("outside email refused", () => eq(validEmail("x@gmail.com", ["upes.ac.in"]), null));
check("look-alike domain refused", () =>
  eq(validEmail("x@notupes.ac.in", ["upes.ac.in"]), null));
check("no domain list accepts any valid address", () =>
  eq(validEmail("x@gmail.com", []), "x@gmail.com"));
check("domains parse with or without @", () =>
  eq(parseDomains("@a.in, B.IN\nc.in").join("|"), "a.in|b.in|c.in"));
check("roster de-duplicates", () => eq(parseRoster("1, 1 2\n3;3").join("|"), "1|2|3"));

// ---------------------------------------------------------------------------
// Exam JSON
// ---------------------------------------------------------------------------
check("questions normalise with defaults", () => {
  const n = normalizeExam({ questions: [{ question: "Explain X" }] });
  const q = n.questions[0];
  return q.id === "1" && q.marks === 5 && q.allowImages === true ? true : JSON.stringify(q);
});
check("allowImages:false is respected", () =>
  eq(normalizeExam({ questions: [{ question: "q", allowImages: false }] })
    .questions[0].allowImages, false));
check("total marks add up", () =>
  eq(totalMarks(normalizeExam({ questions: [{ question: "a", marks: 5 }, { question: "b", marks: 7.5 }] })
    .questions), 12.5));

// ---------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------
check("reading time defaults to two minutes", () => eq(readingSeconds({}), 120));
check("reading time can be switched off", () => eq(readingSeconds({ readingMinutes: 0 }), 0));
check("granted minutes extend the attempt", () =>
  eq(attemptMinutes({ durationMinutes: 45 }, { extraMinutes: 10 }), 55));
check("negative extra time is ignored", () => eq(extraMinutes({ extraMinutes: -30 }), 0));
check("SAP id is safe as a document id", () => eq(safeId("500/098 765"), "500_098_765"));
check("clock formats", () => eq(fmtTime(125), "02:05"));

// ---------------------------------------------------------------------------
// Proctoring
// ---------------------------------------------------------------------------
function fakeProctor(over) {
  const fired = { violations: [], limit: null, blocked: [] };
  let clock = 0;
  const noop = { addEventListener() { }, removeEventListener() { }, hidden: false };
  const p = createProctor({
    maxViolations: 3,
    doc: noop, win: noop,
    now: () => clock,
    onViolation: (c, k) => fired.violations.push([c, k]),
    onLimit: (c, k) => { fired.limit = [c, k]; },
    onBlocked: (k, n) => fired.blocked.push([k, n]),
    ...over,
  });
  return { p, fired, tick: (ms) => { clock += ms; } };
}

check("one incident counts once", () => {
  const { p, fired, tick } = fakeProctor();
  p.report("tab/minimise");
  tick(VIOLATION_DEBOUNCE_MS - 200);
  p.report("window focus lost");          // same incident, different event
  return eq(fired.violations.length, 1);
});

check("separate incidents both count", () => {
  const { p, fired, tick } = fakeProctor();
  p.report("tab/minimise");
  tick(VIOLATION_DEBOUNCE_MS + 100);
  p.report("tab/minimise");
  return eq(fired.violations.length, 2);
});

check("the limit fires once and then stops counting", () => {
  const { p, fired, tick } = fakeProctor();
  for (let i = 0; i < 6; i++) { p.report("tab/minimise"); tick(VIOLATION_DEBOUNCE_MS + 10); }
  return fired.limit && fired.limit[0] === 3 && p.count === 3
    ? true : `limit=${JSON.stringify(fired.limit)} count=${p.count}`;
});

check("a resumed attempt keeps its violation history", () => {
  const { p, fired, tick } = fakeProctor();
  p.count = 2;                               // as restored from Firestore
  tick(VIOLATION_DEBOUNCE_MS + 10);
  p.report("left full screen");
  return fired.limit && fired.limit[0] === 3 ? true : "resumed count was not carried over";
});

// Key guard: typing must survive, everything that leaks must not.
function keyRes(p, key, opts = {}) {
  let prevented = false;
  const blocked = p.keyGuard({
    key, ctrlKey: !!opts.ctrl, metaKey: !!opts.meta, shiftKey: !!opts.shift,
    preventDefault() { prevented = true; },
  });
  return { blocked, prevented };
}

check("plain letters are not blocked", () => {
  const { p } = fakeProctor();
  return eq(keyRes(p, "a").blocked, false);
});
check("space and enter are not blocked", () => {
  const { p } = fakeProctor();
  return keyRes(p, " ").blocked || keyRes(p, "Enter").blocked ? "typing was blocked" : true;
});
check("Ctrl+V is swallowed", () => {
  const { p } = fakeProctor();
  const r = keyRes(p, "v", { ctrl: true });
  return r.blocked && r.prevented ? true : "paste key reached the browser";
});
check("Ctrl+C and Ctrl+X are swallowed", () => {
  const { p } = fakeProctor();
  return keyRes(p, "c", { ctrl: true }).blocked && keyRes(p, "x", { ctrl: true }).blocked
    ? true : "clipboard key reached the browser";
});
check("Ctrl+P / Ctrl+S / Ctrl+U are blocked", () => {
  const { p } = fakeProctor();
  return ["p", "s", "u"].every((k) => keyRes(p, k, { ctrl: true }).blocked)
    ? true : "a leak shortcut got through";
});
check("F12 and Ctrl+Shift+I are blocked", () => {
  const { p } = fakeProctor();
  return keyRes(p, "F12").blocked && keyRes(p, "i", { ctrl: true, shift: true }).blocked
    ? true : "devtools shortcut got through";
});
check("Ctrl+B / Ctrl+I / Ctrl+Z stay with the editor", () => {
  const { p } = fakeProctor();
  return ["b", "i", "z", "y"].every((k) => !keyRes(p, k, { ctrl: true }).blocked)
    ? true : "a formatting shortcut was swallowed";
});
check("Cmd works like Ctrl on a Mac", () => {
  const { p } = fakeProctor();
  return eq(keyRes(p, "v", { meta: true }).blocked, true);
});

check("blocked pastes escalate to a violation", () => {
  // clipGuard is wired up inside attach(), so the listeners are collected from
  // a fake document and then fired the way a real paste would fire them.
  const fired = { violations: [], blocked: [] };
  const fake = {
    listeners: {},
    addEventListener(k, fn) { (this.listeners[k] = this.listeners[k] || []).push(fn); },
    removeEventListener() { },
    hidden: false,
  };
  const p = createProctor({
    maxViolations: 3, doc: fake, win: fake, now: () => 0, pasteEscalateAt: 3,
    onViolation: (c, k) => fired.violations.push([c, k]),
    onBlocked: (k, n) => fired.blocked.push([k, n]),
  }).attach();

  const ev = { preventDefault() { } };
  for (let i = 0; i < 3; i++) fake.listeners.paste.forEach((fn) => fn(ev));

  return p.blockedCount === 3 && fired.blocked.length === 3 && fired.violations.length === 1
    ? true
    : `blocked=${p.blockedCount} logged=${fired.blocked.length} violations=${fired.violations.length}`;
});

check("two blocked pastes do not cost a violation", () => {
  const fired = { violations: [] };
  const fake = {
    listeners: {},
    addEventListener(k, fn) { (this.listeners[k] = this.listeners[k] || []).push(fn); },
    removeEventListener() { }, hidden: false,
  };
  createProctor({
    maxViolations: 3, doc: fake, win: fake, now: () => 0, pasteEscalateAt: 5,
    onViolation: (c, k) => fired.violations.push([c, k]),
  }).attach();
  const ev = { preventDefault() { } };
  fake.listeners.paste.forEach((fn) => fn(ev));
  fake.listeners.paste.forEach((fn) => fn(ev));
  return eq(fired.violations.length, 0);
});

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const passed = results.filter((r) => r.pass).length;
document.getElementById("summary").innerHTML =
  `<div class="notice ${passed === results.length ? "ok" : "err"}">
     <b>${passed} of ${results.length}</b> checks passed.</div>`;
document.getElementById("results").innerHTML = `<table><tbody>${results.map((r) =>
  `<tr><td style="width:34px">${r.pass ? "✅" : "❌"}</td>
       <td>${escapeHtml(r.name)}</td>
       <td class="muted mono" style="font-size:.8rem">${escapeHtml(r.detail)}</td></tr>`)
  .join("")}</tbody></table>`;

// ---------------------------------------------------------------------------
// Editor sandbox
// ---------------------------------------------------------------------------
const localImages = {};
const ed = createEditor(document.getElementById("sandbox"), {
  qid: "demo",
  minWords: 50, maxWords: 300,
  onNotice: (t) => console.log("[notice]", t),
  onSuspicious: (k, d) => console.log("[suspicious]", k, d),
  // The real page writes this to Firestore; here it just stays in memory.
  onImageUpload: async (file, meta) => { localImages[meta.id] = meta.dataUrl; return meta.id; },
});
ed.setHTML("<h2>Try me</h2><p>Type here, then press <b>Show what would be saved</b>.</p>", {});

document.getElementById("dumpBtn").addEventListener("click", () => {
  const st = ed.stats();
  document.getElementById("dump").textContent =
    `words: ${st.words}   characters: ${st.chars}   diagrams held: ${Object.keys(localImages).length}\n\n` +
    `--- what would be written to Firestore ---\n${ed.getHTML()}`;
});
