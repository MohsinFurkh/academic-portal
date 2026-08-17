// ---------------------------------------------------------------------------
// Shared helpers: quiz JSON normalization + grading
// ---------------------------------------------------------------------------

// Accepts either of the two formats used in this repo and returns a uniform
// array of questions:
//   {
//     id, question, explanation, topic,
//     multi: true|false,
//     options: [{ key: "A", text: "..." }, ...],
//     correct: ["A", "C"]        // array of keys
//   }
//
// Format A (DevOps_MidSem_MCQs.json):
//   options: { "A": "...", "B": "..." }, correct_answers: ["A","B"]
// Format B (mcq-tests/questions.js):
//   options: ["...", "..."], correctAnswer: 1   (0-based index)
export function normalizeQuestions(raw) {
  const list = Array.isArray(raw) ? raw : (raw.questions || []);
  return list.map((q, i) => {
    let options = [];
    let correct = [];
    let multi = false;

    // Already normalized (e.g. re-read from Firestore): pass through unchanged.
    if (Array.isArray(q.options) && q.options[0] &&
        typeof q.options[0] === "object" && "key" in q.options[0] && "text" in q.options[0]) {
      return {
        id: q.id != null ? String(q.id) : String(i + 1),
        question: q.question || "(no question text)",
        explanation: q.explanation || "",
        topic: q.topic || "",
        multi: !!q.multi,
        options: q.options.map((o) => ({ key: String(o.key), text: o.text })),
        correct: (q.correct || []).map(String),
      };
    }

    if (Array.isArray(q.options)) {
      // Format B — array of option strings, single correct index
      options = q.options.map((text, idx) => ({ key: String(idx), text }));
      if (Array.isArray(q.correct_answers)) {
        correct = q.correct_answers.map(String);
        multi = true;
      } else {
        correct = [String(q.correctAnswer)];
        multi = false;
      }
    } else if (q.options && typeof q.options === "object") {
      // Format A — { "A": "...", ... }
      options = Object.entries(q.options).map(([key, text]) => ({ key, text }));
      correct = (q.correct_answers || (q.correct_answer ? [q.correct_answer] : []))
        .map(String);
      multi = correct.length !== 1;
    }

    return {
      id: q.id != null ? String(q.id) : String(i + 1),
      question: q.question || q.text || "(no question text)",
      explanation: q.explanation || "",
      topic: q.topic || q.unit || "",
      multi,
      options,
      correct,
    };
  });
}

// Reads the metadata block of an uploaded quiz JSON (Format A style).
export function readMeta(raw) {
  return {
    course: raw.course || "",
    assessment: raw.assessment || raw.title || "",
    instructions: raw.instructions || "",
  };
}

// Compares two arrays of keys as sets.
function sameSet(a, b) {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((k) => s.has(k));
}

// Grades a single question. Exact-match rule: full marks only when the selected
// set equals the correct set. Wrong/partial => 0 (or -negativeMarks if set).
export function gradeQuestion(question, selectedKeys, marksPerQuestion, negativeMarks) {
  const selected = selectedKeys || [];
  if (selected.length === 0) return 0; // unanswered: never negative
  if (sameSet(selected, question.correct)) return marksPerQuestion;
  return -Math.abs(negativeMarks || 0);
}

// Grades a whole attempt. answers = { [questionId]: [keys] }
export function gradeAttempt(questions, answers, marksPerQuestion, negativeMarks) {
  let score = 0;
  let correctCount = 0;
  for (const q of questions) {
    const sel = answers[q.id] || [];
    const s = gradeQuestion(q, sel, marksPerQuestion, negativeMarks);
    score += s;
    if (s === marksPerQuestion) correctCount += 1;
  }
  const maxScore = questions.length * marksPerQuestion;
  return {
    score: Math.round(score * 100) / 100,
    maxScore,
    correctCount,
    total: questions.length,
  };
}

// ---------------------------------------------------------------------------
// Splitting the answer key away from the student-visible quiz
// ---------------------------------------------------------------------------
// The student's browser must never receive `correct`. `splitKey()` produces the
// two documents we store:
//   quizzes/{id}    -> public: questions WITHOUT correct answers
//   quizKeys/{id}   -> faculty only: { correct: {qid: [keys]}, roster: [...] }
export function splitKey(questions) {
  const publicQuestions = questions.map((q) => ({
    id: q.id,
    question: q.question,
    topic: q.topic || "",
    multi: !!q.multi,
    options: q.options.map((o) => ({ key: String(o.key), text: o.text })),
  }));
  const correct = {};
  questions.forEach((q) => { correct[q.id] = (q.correct || []).map(String); });
  return { publicQuestions, correct };
}

// Rebuilds gradable questions from the public doc + the faculty key document.
export function mergeKey(publicQuestions, correctMap) {
  return (publicQuestions || []).map((q) => ({
    ...q,
    correct: (correctMap && correctMap[q.id]) || [],
  }));
}

// Normalises a pasted/uploaded roster into a clean list of SAP IDs.
export function parseRoster(text) {
  return [...new Set(
    String(text || "")
      .split(/[\s,;]+/)
      .map((s) => s.trim())
      .filter(Boolean)
  )];
}

// Fisher–Yates shuffle (returns a new array).
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Safe Firestore doc id from a SAP id (doc ids can't contain / etc.).
export function safeId(str) {
  return String(str).trim().replace(/[^a-zA-Z0-9_-]/g, "_");
}

export function fmtTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
