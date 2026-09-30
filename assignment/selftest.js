// ---------------------------------------------------------------------------
// Offline self-test for the assignment system. No Firebase.
// ---------------------------------------------------------------------------
import {
  normalizeAssignment, nextSectionId, starterToHtml, sanitizeHtml, answerStats,
  authorshipWords, mergeCounts, authorshipShares, validSplit, peerSummary, suggestedFactor,
  checkLink, validMobile, validSap, emailDomainOk, parseGroups, effectiveDeadline,
  fmtCountdown, toLocalInput, fromLocalInput, joinCode, JOIN_CODE_RE, totalMarks,
} from "./common.js";
import { createGuard } from "./guard.js";

const results = [];
function check(name, fn) {
  let pass = false;
  let detail = "";
  try {
    const r = fn();
    pass = r === true;
    if (!pass) detail = typeof r === "string" ? r : JSON.stringify(r);
  } catch (e) {
    detail = "threw: " + e.message;
  }
  results.push({ name, pass, detail });
}
const eq = (a, b) => (JSON.stringify(a) === JSON.stringify(b) ? true : `got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);

// ---- Brief / sections ----
check("JSON sections are normalised with stable ids", () => {
  const n = normalizeAssignment({ title: "T", questions: [{ question: "A", marks: 5 }, { question: "B" }] });
  return eq([n.title, n.questions.map((q) => q.id), totalMarks(n.questions)], ["T", ["q1", "q2"], 15]);
});
check("new section ids never reuse an old one", () => eq(nextSectionId(["q1", "q4", "q2"]), "q5"));
check("starter text becomes headings, paragraphs and bullets", () =>
  eq(starterToHtml("## Intro\nText <b>\n- one\n- two"), "<h3>Intro</h3><p>Text &lt;b&gt;</p><ul><li>one</li><li>two</li></ul>"));

// ---- Sanitiser ----
check("scripts and handlers are stripped", () => {
  const out = sanitizeHtml('<p onclick="x()">hi<script>alert(1)</script></p><img src=x onerror=y>');
  return !/script|onclick|onerror|<img/i.test(out) ? true : out;
});
check("author stamps survive on blocks", () =>
  eq(sanitizeHtml('<p data-a="500101">x</p>'), '<p data-a="500101">x</p>'));
check("a malformed author stamp is dropped", () =>
  eq(sanitizeHtml('<p data-a="a b<c">x</p>'), "<p>x</p>"));
check("author stamps are not kept on inline elements", () =>
  eq(sanitizeHtml('<b data-a="500101">x</b>'), "<b>x</b>"));

// ---- Authorship ----
const doc1 = '<h3>Intro</h3><p data-a="A">one two three</p><p data-a="B">four five</p>' +
  '<ul><li data-a="A">six <ul><li data-a="B">seven eight</li></ul></li></ul>';
check("words are credited to whoever stamped the block", () =>
  eq(authorshipWords(doc1), { A: 4, B: 4, "": 1 }));
check("nested stamped blocks are not counted twice", () => {
  const c = authorshipWords(doc1);
  return eq(c.A + c.B + c[""], answerStats(doc1).words);
});
check("counts from several sections add up", () =>
  eq(mergeCounts([{ A: 2 }, { A: 3, B: 1 }]), { A: 5, B: 1 }));
check("shares ignore template text and cover every member", () =>
  eq(authorshipShares({ A: 30, B: 10, "": 50 }, ["A", "B", "C"]), { A: 75, B: 25, C: 0 }));

// ---- Peer assessment ----
check("a split must cover every member and total 100", () =>
  validSplit({ A: 50, B: 50 }, ["A", "B"]) && !validSplit({ A: 60, B: 50 }, ["A", "B"])
  && !validSplit({ A: 100 }, ["A", "B"]) && !validSplit({ A: 50, B: 50, C: 0 }, ["A", "B"]));
check("peer rating excludes self-rating", () => {
  const d = {
    A: { split: { A: 60, B: 20, C: 20 } },
    B: { split: { A: 40, B: 40, C: 20 } },
    C: { split: { A: 50, B: 30, C: 20 } },
  };
  const s = peerSummary(d, ["A", "B", "C"]);
  return eq([s.A.peer, s.A.self, s.A.raters, s.B.peer], [45, 60, 2, 25]);
});
check("generous self-ratings do not mark the whole group down", () => {
  // Each rates themselves 70/60; team-mates give 30 and 40 — both under 50.
  const s = peerSummary({ A: { split: { A: 60, B: 40 } }, B: { split: { A: 30, B: 70 } } }, ["A", "B"]);
  const fa = suggestedFactor(s.A.share, null, 2);
  const fb = suggestedFactor(s.B.share, null, 2);
  return eq([s.A.share, s.B.share, fa, fb, Math.round((fa + fb) * 50) / 100], [42.9, 57.1, 0.86, 1.14, 1]);
});
check("no rescaled share until every member has been rated", () => {
  const s = peerSummary({ A: { split: { A: 50, B: 30, C: 20 } } }, ["A", "B", "C"]);
  return eq([s.A.share, s.B.share, s.B.peer], [null, null, 30]);
});
check("an invalid declaration is ignored", () => {
  const s = peerSummary({ A: { split: { A: 90, B: 90 } }, B: { split: { A: 50, B: 50 } } }, ["A", "B"]);
  return eq([s.A.peer, s.B.self, s.A.self], [50, 50, null]);
});
check("suggested factor: equal share is 1, clamped at the ends", () =>
  eq([suggestedFactor(25, null, 4), suggestedFactor(50, null, 4), suggestedFactor(0, null, 4),
    suggestedFactor(null, 20, 4), suggestedFactor(null, null, 4)], [1, 1.2, 0.5, 0.8, 1]));

// ---- Links ----
check("Drive and GitHub links are accepted", () =>
  checkLink("https://drive.google.com/file/d/abc/view").ok && checkLink("github.com/u/repo").ok);
check("a bare host gets https://", () => eq(checkLink("github.com/u/r").url, "https://github.com/u/r"));
check("javascript:, http: and unknown hosts are refused", () =>
  !checkLink("javascript:alert(1)").ok && !checkLink("http://drive.google.com/x").ok
  && !checkLink("https://evil.example.com/drive.google.com").ok);
check("a look-alike host is refused", () => !checkLink("https://drive.google.com.evil.io/x").ok);
check("sub-domains of an accepted host pass (SharePoint)", () => checkLink("https://upes-my.sharepoint.com/x").ok);

// ---- Identity ----
check("mobile numbers with +91 are accepted", () => eq(validMobile("+91 98765 43210"), "9876543210"));
check("SAP IDs must be letters and digits", () => validSap("500098765") === "500098765" && validSap("50 0") === null);
check("email domain is an exact match, as in the rules", () =>
  emailDomainOk("a@stu.upes.ac.in", ["stu.upes.ac.in"]) && !emailDomainOk("a@x.stu.upes.ac.in", ["stu.upes.ac.in"])
  && emailDomainOk("a@gmail.com", []));

// ---- Groups ----
check("teacher groups parse with and without names", () => {
  const { groups, errors } = parseGroups("Alpha: 1 2 3\n4, 5", { min: 2, max: 4 });
  return eq([groups.map((g) => g.name), groups.map((g) => g.members), errors], [["Alpha", "Group 2"], [["1", "2", "3"], ["4", "5"]], []]);
});
check("a student in two groups is reported", () =>
  parseGroups("A: 1 2\nB: 2 3", { min: 2, max: 4 }).errors.some((e) => e.includes("2 is in both")));
check("a group outside the size limits is reported", () =>
  parseGroups("A: 1", { min: 2, max: 4 }).errors.length === 1);
check("join codes match the pattern the rules enforce", () => {
  for (let i = 0; i < 200; i++) if (!JOIN_CODE_RE.test(joinCode())) return "bad code";
  return true;
});

// ---- Time ----
check("an extension later than the deadline wins", () =>
  eq(effectiveDeadline({ deadline: 1000 }, { extensionUntil: 5000 }), 5000));
check("an extension earlier than the deadline is ignored", () =>
  eq(effectiveDeadline({ deadline: 9000 }, { extensionUntil: 5000 }), 9000));
check("countdown is coarse far away and exact near the end", () =>
  eq([fmtCountdown(3 * 86400000 + 4 * 3600000), fmtCountdown(2 * 3600000 + 5 * 60000), fmtCountdown(65000), fmtCountdown(-1)],
    ["3 days 4 h", "2 h 5 min", "01:05", "closed"]));
check("datetime-local round-trips without shifting", () => {
  const t = new Date(2026, 9, 15, 23, 59).getTime();
  return eq(fromLocalInput(toLocalInput(t)), t);
});

// ---- Guard ----
function fakeKey(key, extra = {}) {
  let prevented = false;
  return { key, ctrlKey: true, preventDefault: () => { prevented = true; }, get prevented() { return prevented; }, ...extra };
}
check("Ctrl+V is swallowed outside a link field", () => {
  const g = createGuard({ doc: null });
  const e = fakeKey("v", { target: document.body });
  return g.keyGuard(e) === true && e.prevented;
});
check("Ctrl+V works in a link field (.allow-paste)", () => {
  const input = document.createElement("input");
  input.className = "allow-paste";
  document.body.appendChild(input);
  const g = createGuard({ doc: null });
  const r = g.keyGuard(fakeKey("v", { target: input }));
  input.remove();
  return r === false;
});
check("formatting shortcuts are left alone", () => {
  const g = createGuard({ doc: null });
  return ["b", "i", "z", "y", "a"].every((k) => g.keyGuard(fakeKey(k, { target: document.body })) === false);
});
check("a paste event outside a link field is blocked and counted", () => {
  let blocked = 0;
  const target = new EventTarget();
  const g = createGuard({ doc: target, onBlocked: () => { blocked += 1; } }).attach();
  const ev = new Event("paste", { cancelable: true });
  target.dispatchEvent(ev);
  g.detach();
  return ev.defaultPrevented && blocked === 1 ? true : `prevented=${ev.defaultPrevented} blocked=${blocked}`;
});
check("detach removes the guard", () => {
  let blocked = 0;
  const target = new EventTarget();
  const g = createGuard({ doc: target, onBlocked: () => { blocked += 1; } }).attach();
  g.detach();
  const ev = new Event("paste", { cancelable: true });
  target.dispatchEvent(ev);
  return !ev.defaultPrevented && blocked === 0;
});

// ---- Report ----
const passed = results.filter((r) => r.pass).length;
document.getElementById("summary").innerHTML =
  `<div class="notice ${passed === results.length ? "ok" : "err"}"><b>${passed} of ${results.length}</b> checks passed.</div>`;
document.getElementById("results").innerHTML = `<tbody>${results.map((r) =>
  `<tr><td style="width:34px">${r.pass ? "✅" : "❌"}</td><td>${r.name}${r.detail ? `<br><span class="muted mono" style="font-size:.78rem">${r.detail.replace(/</g, "&lt;")}</span>` : ""}</td></tr>`).join("")}</tbody>`;
