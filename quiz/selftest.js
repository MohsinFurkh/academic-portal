// ---------------------------------------------------------------------------
// Offline self-test. No Firebase. Open quiz/selftest.html to run.
// ---------------------------------------------------------------------------
import {
  normalizeQuestions, splitKey, mergeKey, parseRoster,
  gradeQuestion, gradeAttempt, shuffle, safeId, fmtTime,
} from "./common.js";
import { createProctor, VIOLATION_DEBOUNCE_MS } from "./proctor.js";

const out = document.getElementById("results");
let pass = 0, fail = 0;

function group(name) {
  const d = document.createElement("div");
  d.className = "grp";
  d.textContent = name;
  out.appendChild(d);
}
function check(name, cond, why = "") {
  const ok = !!cond;
  ok ? pass++ : fail++;
  const d = document.createElement("div");
  d.className = "t-row " + (ok ? "pass" : "fail");
  d.innerHTML = `<span class="st">${ok ? "PASS" : "FAIL"}</span><span>${name}</span>` +
    (why && !ok ? `<span class="why">— ${why}</span>` : "");
  out.appendChild(d);
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// --- fixtures -------------------------------------------------------------
const rawFormatA = {
  course: "CSEG3060",
  assessment: "Quiz 1",
  questions: [
    { id: 1, question: "Single answer?", options: { A: "a", B: "b", C: "c" }, correct_answer: "B" },
    { id: 2, question: "Multi answer?", options: { A: "a", B: "b", C: "c" }, correct_answers: ["A", "C"] },
  ],
};
const rawFormatB = [
  { question: "Index style?", options: ["zero", "one", "two"], correctAnswer: 2 },
];

// --- normalisation --------------------------------------------------------
group("Question normalisation");
const qa = normalizeQuestions(rawFormatA);
check("Format A: two questions parsed", qa.length === 2);
check("Format A: single-answer question is not multi", qa[0].multi === false);
check("Format A: correct key preserved", eq(qa[0].correct, ["B"]));
check("Format A: multi-answer flagged and both keys kept",
  qa[1].multi === true && eq(qa[1].correct, ["A", "C"]));
const qb = normalizeQuestions(rawFormatB);
check("Format B: index converted to a key", eq(qb[0].correct, ["2"]));
check("Re-normalising an already-normal question is stable",
  eq(normalizeQuestions(qa), qa));

// --- the security-critical split -----------------------------------------
group("Answer key is stripped from the student document");
const { publicQuestions, correct } = splitKey(qa);
const publicJson = JSON.stringify(publicQuestions);
check("No 'correct' field survives in the public questions",
  !publicJson.includes("correct"));
check("Correct answer values are not leaked anywhere in the public JSON",
  publicQuestions.every((q) => !("correct" in q)));
check("Public questions keep id, text and options",
  publicQuestions[0].id === "1" && publicQuestions[0].options.length === 3);
check("Key document maps every question id", eq(Object.keys(correct), ["1", "2"]));
const merged = mergeKey(publicQuestions, correct);
check("mergeKey restores a gradable set for the dashboard",
  eq(merged[1].correct, ["A", "C"]) && merged[1].options.length === 3);

// --- grading --------------------------------------------------------------
group("Grading");
check("Exact single answer scores full marks", gradeQuestion(qa[0], ["B"], 1, 0) === 1);
check("Wrong single answer scores zero", gradeQuestion(qa[0], ["A"], 1, 0) === 0);
check("Unanswered is never negative", gradeQuestion(qa[0], [], 1, 0.25) === 0);
check("Wrong answer applies negative marking", gradeQuestion(qa[0], ["A"], 1, 0.25) === -0.25);
check("Multi: exact set scores full", gradeQuestion(qa[1], ["C", "A"], 1, 0) === 1);
check("Multi: partial set scores zero", gradeQuestion(qa[1], ["A"], 1, 0) === 0);
check("Multi: superset scores zero", gradeQuestion(qa[1], ["A", "B", "C"], 1, 0) === 0);

const attempt = gradeAttempt(qa, { "1": ["B"], "2": ["A"] }, 1, 0);
check("Attempt total adds up", attempt.score === 1 && attempt.maxScore === 2);
check("Correct count counts only full marks", attempt.correctCount === 1);
const empty = gradeAttempt(qa, {}, 1, 0.5);
check("Blank paper scores zero, not negative", empty.score === 0);

// --- roster ---------------------------------------------------------------
group("Roster parsing");
check("Splits on spaces, commas and newlines",
  eq(parseRoster("500098765, 500098766\n500098767  500098768"),
    ["500098765", "500098766", "500098767", "500098768"]));
check("Removes duplicates", parseRoster("5001 5001 5002").length === 2);
check("Empty input gives an empty roster", parseRoster("  \n ").length === 0);

// --- misc helpers ---------------------------------------------------------
group("Helpers");
check("safeId strips characters Firestore rejects", safeId("500/098 765") === "500_098_765");
check("Timer formats mm:ss", fmtTime(95) === "01:35");
check("Timer clamps negative time to 00:00", fmtTime(-5) === "00:00");
const src = [1, 2, 3, 4, 5];
const sh = shuffle(src);
check("shuffle does not mutate the source", eq(src, [1, 2, 3, 4, 5]));
check("shuffle keeps every element", eq([...sh].sort(), [1, 2, 3, 4, 5]));

// --- proctoring engine ----------------------------------------------------
group("Proctoring engine");
{
  let clock = 0;
  const seen = [];
  let limitFired = 0;
  const p = createProctor({
    maxViolations: 3,
    now: () => clock,
    doc: null, win: null,                      // no real listeners in the test
    onViolation: (c, kind, remaining) => seen.push({ c, kind, remaining }),
    onLimit: () => { limitFired++; },
  });

  p.report("tab/minimise");
  check("First violation is counted", p.count === 1);

  clock += 100;
  p.report("window focus lost");
  check("A second event from the same incident is ignored (debounce)", p.count === 1,
    `count became ${p.count}`);

  clock += VIOLATION_DEBOUNCE_MS + 1;
  p.report("left full screen");
  check("A genuinely new incident is counted", p.count === 2);
  check("Remaining count is reported to the UI", seen[1] && seen[1].remaining === 1);
  check("Limit has not fired early", limitFired === 0);

  clock += VIOLATION_DEBOUNCE_MS + 1;
  p.report("tab/minimise");
  check("Reaching the limit fires onLimit exactly once", limitFired === 1);
  check("onViolation is NOT also fired at the limit", seen.length === 2);

  clock += VIOLATION_DEBOUNCE_MS + 1;
  p.report("tab/minimise");
  check("No further violations are counted after the limit",
    p.count === 3 && limitFired === 1);
}

// --- keyboard blocking ----------------------------------------------------
group("Blocked shortcuts");
{
  const p = createProctor({ doc: null, win: null });
  const key = (k, mod = {}) => p.keyGuard({ key: k, preventDefault() { }, ...mod });
  check("F12 blocked", key("F12"));
  check("Ctrl+Shift+I blocked", key("I", { ctrlKey: true, shiftKey: true }));
  check("Ctrl+U (view source) blocked", key("u", { ctrlKey: true }));
  check("Ctrl+C blocked", key("c", { ctrlKey: true }));
  check("Cmd+C blocked on Mac", key("c", { metaKey: true }));
  check("Ctrl+P (print) blocked", key("p", { ctrlKey: true }));
  check("Ctrl+T (new tab) blocked", key("t", { ctrlKey: true }));
  check("Plain typing is NOT blocked", key("a") === false);
  check("Arrow keys are NOT blocked", key("ArrowDown") === false);
  check("Tab key is NOT blocked (keyboard navigation still works)", key("Tab") === false);
}

// --- attach/detach lifecycle ---------------------------------------------
group("Listener lifecycle");
{
  const added = [], removed = [];
  const fakeDoc = {
    hidden: false, fullscreenElement: null,
    addEventListener: (e) => added.push("doc:" + e),
    removeEventListener: (e) => removed.push("doc:" + e),
  };
  const fakeWin = {
    addEventListener: (e) => added.push("win:" + e),
    removeEventListener: (e) => removed.push("win:" + e),
  };
  const p = createProctor({ doc: fakeDoc, win: fakeWin });
  p.attach();
  check("attach() listens for visibilitychange", added.includes("doc:visibilitychange"));
  check("attach() listens for blur", added.includes("win:blur"));
  check("attach() listens for fullscreenchange", added.includes("doc:fullscreenchange"));
  check("attach() blocks copy/paste/contextmenu",
    added.includes("doc:copy") && added.includes("doc:paste") && added.includes("doc:contextmenu"));
  p.detach();
  check("detach() removes every listener it added", removed.length === added.length,
    `${added.length} added, ${removed.length} removed`);
  p.report("tab/minimise");
  check("No violations are recorded after detach (submitted attempts stay clean)",
    p.count === 0);
}

// --- summary --------------------------------------------------------------
const s = document.getElementById("summary");
s.className = "notice " + (fail === 0 ? "ok" : "err");
s.innerHTML = fail === 0
  ? `<b>All ${pass} checks passed.</b> Grading, answer-key separation, roster handling and the proctoring engine behave correctly on this machine.`
  : `<b>${fail} check(s) failed</b> out of ${pass + fail}. Do not run the quiz until these are fixed.`;
