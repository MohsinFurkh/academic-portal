const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Research Methodology in CS";
pres.title = "Algorithmic and Software Engineering Approaches";
pres.subject = "Unit II, Lecture 4 - Algorithmic and Software Engineering Approaches";

/* ------------------------------------------------------------------ */
/*  Design system — identical to Unit II Lectures 1–3                   */
/* ------------------------------------------------------------------ */
const W = 13.333, H = 7.5;
const ML = 0.55, CW = 12.23;

const BG    = "1A1535";
const INK   = "241A4C";
const GOLD  = "D8A73E";
const GOLDD = "B08C3A";
const BLUE  = "3D6EA6";
const RUST  = "B4522B";
const RUSTD = "8E3F20";
const TINT  = "F3F1FC";
const TINT2 = "FAF9FE";
const BODY  = "5C5A66";
const MUTED = "8A8894";
const DKMUT = "6E688F";
const DKBODY= "CFCAE6";

const HF = "Cambria";
const BF = "Calibri";
const MF = "Courier New";

const RUNNING = "ALGORITHMIC & SE APPROACHES";
const TOTAL = 26;
let N = 0;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function txt(slide, text, opts) {
  slide.addText(text, Object.assign({ isTextBox: true, margin: 0 }, opts));
}

function footer(slide, dark) {
  N += 1;
  const c = dark ? DKMUT : MUTED;
  txt(slide, RUNNING, {
    x: ML, y: 6.96, w: 6, h: 0.26, fontFace: BF, fontSize: 8,
    color: c, charSpacing: 1.4, valign: "middle",
  });
  txt(slide, `${N} / ${TOTAL}`, {
    x: W - ML - 2.5, y: 6.96, w: 2.5, h: 0.26, align: "right",
    fontFace: BF, fontSize: 8, color: c, valign: "middle",
  });
}

function head(slide, eyebrow, title, lede, ledeItalic) {
  if (eyebrow) {
    txt(slide, eyebrow.toUpperCase(), {
      x: ML, y: 0.34, w: CW, h: 0.26, fontFace: BF, fontSize: 9, bold: true,
      color: GOLDD, charSpacing: 1.7, valign: "middle",
    });
  }
  txt(slide, title, {
    x: ML, y: 0.68, w: CW, h: 0.62, fontFace: HF, fontSize: 28, bold: true,
    color: INK, valign: "middle",
  });
  if (!lede) return 1.62;
  txt(slide, lede, {
    x: ML, y: 1.36, w: CW, h: 0.62, fontFace: BF, fontSize: 12.5,
    italic: !!ledeItalic, color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });
  return 2.12;
}

function closer(slide, text, color) {
  txt(slide, text, {
    x: ML, y: 6.42, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, italic: true,
    color: color || BODY, valign: "middle", lineSpacingMultiple: 1.15,
  });
}

function darkBase(slide) {
  slide.background = { color: BG };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: BG }, line: { type: "none" } });
}

function numDot(slide, x, y, d, n, color, textColor) {
  slide.addShape(pres.ShapeType.ellipse, {
    x: x, y: y, w: d, h: d, fill: { color: color }, line: { type: "none" },
  });
  txt(slide, String(n), {
    x: x, y: y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HF, fontSize: 13, bold: true, color: textColor || "FFFFFF",
  });
}

function matrix(slide, o) {
  const x0 = o.x, cols = o.cols;
  const hdrH = o.hdrH || 0.42;
  let cx = x0;
  cols.forEach((c) => {
    slide.addShape(pres.ShapeType.rect, {
      x: cx, y: o.y, w: c.w, h: hdrH,
      fill: { color: INK }, line: { color: "FFFFFF", width: 1.5 },
    });
    txt(slide, c.label.toUpperCase(), {
      x: cx + 0.16, y: o.y, w: c.w - 0.32, h: hdrH, fontFace: BF, fontSize: 8.5,
      bold: true, color: "FFFFFF", charSpacing: 1.2,
      align: c.align || "left", valign: "middle",
    });
    cx += c.w;
  });
  let ry = o.y + hdrH + 0.06;
  o.rows.forEach((row, r) => {
    const rh = o.rowH[r];
    const fill = r % 2 === 0 ? TINT : "FFFFFF";
    slide.addShape(pres.ShapeType.rect, {
      x: x0, y: ry, w: o.w, h: rh, fill: { color: fill }, line: { type: "none" },
    });
    if (o.accents) {
      slide.addShape(pres.ShapeType.rect, {
        x: x0, y: ry, w: 0.055, h: rh,
        fill: { color: o.accents[r] }, line: { type: "none" },
      });
    }
    cx = x0;
    row.forEach((cell, i) => {
      const first = i === 0;
      txt(slide, cell, {
        x: cx + (first ? 0.24 : 0.18), y: ry, w: cols[i].w - (first ? 0.42 : 0.36),
        h: rh, fontFace: first ? HF : BF, fontSize: first ? 12 : 10.5,
        bold: first, color: first ? INK : BODY, valign: "middle",
        lineSpacingMultiple: 1.15,
      });
      cx += cols[i].w;
    });
    ry += rh + 0.06;
  });
  return ry;
}

/* ================================================================== */
/*  1 — Title                                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  darkBase(s);

  s.addShape(pres.ShapeType.ellipse, { x: 9.32, y: 4.42, w: 2.32, h: 2.32, fill: { color: BLUE, transparency: 45 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 10.06, y: 3.62, w: 2.32, h: 2.32, fill: { color: GOLD, transparency: 45 }, line: { color: GOLD, width: 0.75, transparency: 40 } });
  s.addShape(pres.ShapeType.ellipse, { x: 10.72, y: 4.56, w: 2.32, h: 2.32, fill: { color: RUST, transparency: 45 }, line: { type: "none" } });

  txt(s, "A LESSON IN RESEARCH METHODOLOGY", {
    x: 0.88, y: 1.52, w: 8, h: 0.28, fontFace: BF, fontSize: 10, bold: true,
    color: GOLD, charSpacing: 1.9, valign: "middle",
  });
  txt(s, "Algorithmic and Software\nEngineering Approaches", {
    x: 0.84, y: 2.02, w: 9.8, h: 1.72, fontFace: HF, fontSize: 40, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.06,
  });
  txt(s, "Two Research Traditions in Computing Science", {
    x: 0.88, y: 4.12, w: 9, h: 0.36, fontFace: HF, fontSize: 16, italic: true,
    color: "E4DFFA", valign: "middle",
  });
  s.addShape(pres.ShapeType.line, {
    x: 0.88, y: 4.72, w: 2.6, h: 0, line: { color: "6E688F", width: 1 },
  });
  txt(s, "How research is actually organised when the object of study is an algorithm, and how it changes\nwhen the object is a software system built and maintained by people.", {
    x: 0.88, y: 5.0, w: 8.4, h: 0.72, fontFace: BF, fontSize: 11.5,
    color: DKBODY, valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Research Methodology in CS   ·   Unit II · Lecture 4", {
    x: 0.88, y: 6.34, w: 7, h: 0.26, fontFace: BF, fontSize: 9,
    color: DKMUT, valign: "middle",
  });
  N += 1;
}

/* ================================================================== */
/*  2 — Two traditions                                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Research Traditions",
    "The Object of Study Decides the Method",
    "Unit II has covered how a claim is argued, proved, and inferred. This session is about how the work is organised — and computing science organises it in two quite different ways.");

  const pts = [
    "In the algorithmic tradition the object of study is a problem and the procedures that solve it: a mathematical object that also executes. In the software-engineering tradition it is a socio-technical practice — code, tools, process, and the people using them.",
    "Nearly everything downstream follows from that difference: which of Lecture 2's proof modes carries the argument, which of Lecture 3's inference directions dominates, and what a reviewer will attack first.",
    "This is not “theory versus practice”. Both traditions build artifacts, both measure, and both prove things. What differs is where the uncertainty sits — and therefore what the paper must spend its effort defending.",
    "Most CS theses draw on both. The trouble starts when one tradition's standards are used to judge the other's work: demanding a theorem from a field study, or a user study from a lower bound.",
  ];
  let cy = y;
  pts.forEach((p, i) => {
    numDot(s, ML, cy + 0.02, 0.34, i + 1, i % 2 === 0 ? INK : BLUE);
    txt(s, p, {
      x: ML + 0.55, y: cy - 0.03, w: 6.75, h: 1.06, fontFace: BF, fontSize: 11.5,
      color: BODY, valign: "top", lineSpacingMultiple: 1.22,
    });
    cy += 1.25;
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 8.28, y: y - 0.06, w: 4.5, h: 4.56, rectRadius: 0.05,
    fill: { color: TINT }, line: { type: "none" },
  });
  txt(s, "WHERE THE UNCERTAINTY SITS", {
    x: 8.58, y: y + 0.22, w: 3.9, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true,
    color: GOLDD, charSpacing: 1.3, valign: "middle",
  });
  txt(s, "In algorithmic work the risky premise is the model. In software-engineering work it is the population.", {
    x: 8.58, y: y + 0.62, w: 3.9, h: 1.1, fontFace: HF, fontSize: 14.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.2,
  });
  txt(s, "One asks whether the machine model prices real hardware; the other asks whether these projects and these developers stand for the ones you claim about. Same slot in the argument, different contents.", {
    x: 8.58, y: y + 1.86, w: 3.9, h: 1.3, fontFace: BF, fontSize: 11,
    color: BODY, valign: "top", lineSpacingMultiple: 1.22,
  });
  s.addShape(pres.ShapeType.line, { x: 8.58, y: y + 3.4, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Find that slot in your own work before a reviewer does.", {
    x: 8.58, y: y + 3.58, w: 3.9, h: 0.5, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  3 — The two traditions side by side                                */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Research Traditions",
    "The Two Traditions, Side by Side",
    "Read down either column: each row is the same methodological question, answered differently.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "Tradition 1", t: "Algorithmic", c: GOLDD, fill: TINT2,
      rows: [
        ["Object of study", "A problem, and the procedures that solve it."],
        ["Central question", "How well can this problem be solved, and can it be proved?"],
        ["Proof mode (Lecture 2)", "Mathematical, with empirical support from an implementation."],
        ["Inference (Lecture 3)", "Deduction, inside a stated machine model."],
        ["What a result looks like", "A bound, a guarantee, a hardness result, or a measured speed-up."],
        ["Typical venues", "SODA, ICALP, ESA, SEA, ALENEX."],
      ] },
    { tag: "Tradition 2", t: "Software engineering", c: BLUE, fill: TINT,
      rows: [
        ["Object of study", "A socio-technical system: code, tools, process, and people."],
        ["Central question", "What happens when people build software, and what helps?"],
        ["Proof mode (Lecture 2)", "Empirical, often with a demonstration artifact alongside."],
        ["Inference (Lecture 3)", "Induction, from sampled projects, repositories, developers."],
        ["What a result looks like", "A finding on a defined population, or an artifact plus evaluation."],
        ["Typical venues", "ICSE, FSE, ASE, MSR, EMSE."],
      ] },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 4.6, rectRadius: 0.05, fill: { color: p.fill }, line: { color: "E6E2F5", width: 1 } });
    txt(s, p.tag.toUpperCase(), { x: x + 0.32, y: y + 0.22, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: p.c, charSpacing: 1.3, valign: "middle" });
    txt(s, p.t, { x: x + 0.32, y: y + 0.46, w: pw - 0.64, h: 0.4, fontFace: HF, fontSize: 20, bold: true, color: INK, valign: "middle" });
    let ry = y + 0.96;
    p.rows.forEach((r) => {
      txt(s, r[0].toUpperCase(), { x: x + 0.32, y: ry, w: pw - 0.64, h: 0.18, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
      txt(s, r[1], { x: x + 0.32, y: ry + 0.2, w: pw - 0.64, h: 0.34, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });
      ry += 0.6;
    });
  });
  footer(s);
}

/* ================================================================== */
/*  4 — What counts as done                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Research Traditions",
    "What Counts as a Finished Contribution",
    "Three families of CS work, and the standard each is actually held to.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Family of work", w: 2.3 },
      { label: "It is complete when…", w: 4.4 },
      { label: "The reviewer's first question", w: 2.5 },
      { label: "The characteristic weak paper", w: 3.03 },
    ],
    rowH: [1.18, 1.18, 1.18],
    accents: [GOLD, BLUE, RUST],
    rows: [
      ["Algorithmic",
       "There is a stated model, a proved correctness argument, a derived bound or a proved impossibility — and, increasingly, an implementation measured on accepted instances.",
       "Is the bound tight, and is the model the right one?",
       "A new procedure with no analysis and no baseline, evaluated on instances the authors generated themselves."],
      ["Software engineering",
       "A question is answered on a defined population, with threats to validity stated, and with the protocol or data available for someone else to re-run.",
       "What population is this about, and would it replicate?",
       "A tool paper whose entire evaluation is the authors demonstrating their own tool on examples they chose."],
      ["Spanning both",
       "An artifact exists and is available, and its claimed property is both argued and measured against the strongest available alternative.",
       "Can I run it, and was the baseline a fair one?",
       "A prototype, a demo, a related-work list — and no comparison against anything."],
    ],
  });

  closer(s, "Note what all three share: a stated premise, an honest comparison, and something a stranger could check. The rest is tradition-specific detail.");
  footer(s);
}

/* ================================================================== */
/*  5 — Divider Part 1 -> Part 2                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  darkBase(s);
  txt(s, "PART 1  →  PART 2", {
    x: 0.88, y: 2.1, w: 8, h: 0.28, fontFace: BF, fontSize: 11, bold: true,
    color: GOLD, charSpacing: 2.0, valign: "middle",
  });
  txt(s, "From two traditions\nto the first one's working method", {
    x: 0.84, y: 2.62, w: 10.4, h: 1.4, fontFace: HF, fontSize: 32, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.1,
  });
  txt(s, "If the object of study is a problem, what does a research programme around it actually consist of — from the first formalisation to the last measurement?", {
    x: 0.88, y: 4.24, w: 9.2, h: 0.72, fontFace: HF, fontSize: 14, italic: true,
    color: "E4DFFA", valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Next: the algorithmic approach — pipeline, paradigms, analysis, and the engineering loop.", {
    x: 0.88, y: 5.28, w: 9.2, h: 0.3, fontFace: BF, fontSize: 11,
    color: GOLD, valign: "middle",
  });
  footer(s, true);
}

/* ================================================================== */
/*  6 — The algorithmic pipeline                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · The Algorithmic Approach",
    "The Algorithmic Research Pipeline",
    "Five stages. The first is where most of the intellectual work lives, and the one most often skipped in student projects.", true);

  const steps = [
    ["Formalise", "Turn an informal problem into a precise input–output specification, with an objective and a cost model. Everything later is relative to this.", GOLDD],
    ["Design", "Construct a procedure, usually by instantiating a known paradigm and adapting it to the structure of the problem.", BLUE],
    ["Analyse", "Prove correctness, then derive a resource bound in the stated model. Both obligations, not one.", BLUE],
    ["Implement", "Realise it — at which point constants, memory layout, and engineering effort become visible for the first time.", RUST],
    ["Experiment", "Measure on accepted instance families, against the strongest available alternatives, with Lecture 2's obligations.", RUST],
  ];
  const bw = 2.23, bg = 0.27;
  steps.forEach((st, i) => {
    const x = ML + i * (bw + bg);
    numDot(s, x, y, 0.42, i + 1, st[2]);
    txt(s, st[0], {
      x: x, y: y + 0.58, w: bw, h: 0.32, fontFace: HF, fontSize: 14.5, bold: true,
      color: INK, valign: "middle",
    });
    txt(s, st[1], {
      x: x, y: y + 0.98, w: bw, h: 1.8, fontFace: BF, fontSize: 10.5, color: BODY,
      valign: "top", lineSpacingMultiple: 1.2,
    });
    if (i < 4) {
      txt(s, "→", { x: x + bw - 0.06, y: y + 0.04, w: bg + 0.12, h: 0.34, align: "center", valign: "middle", fontFace: BF, fontSize: 14, color: MUTED });
    }
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: ML, y: 5.12, w: CW, h: 1.24, rectRadius: 0.05,
    fill: { color: TINT }, line: { type: "none" },
  });
  txt(s, "STAGES 4 AND 5 USED TO BE OPTIONAL", { x: ML + 0.32, y: 5.3, w: 6, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "For decades an algorithms paper could end at stage 3, and many still legitimately do — a lower bound needs no implementation. But the experimental algorithmics community, the ALENEX and SEA venues, the DIMACS Implementation Challenges, and conference artifact evaluation have together made the full pipeline the default expectation for any paper claiming practical benefit.", {
    x: ML + 0.32, y: 5.56, w: CW - 0.64, h: 0.66, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.18,
  });

  footer(s);
}

/* ================================================================== */
/*  7 — Design paradigms                                               */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · The Algorithmic Approach",
    "The Design-Paradigm Toolkit",
    "Eight recurring structures. As with Lecture 3's proof techniques, the skill is not executing them — it is recognising which the problem's structure admits.", true);

  const tools = [
    ["Divide and conquer", "Split, recurse, combine.", "Analysed by recurrence. Mergesort, FFT, Strassen."],
    ["Greedy", "Take the locally best choice and never revise it.", "Correctness by exchange argument or matroid structure. Kruskal, Huffman."],
    ["Dynamic programming", "Overlapping subproblems with optimal substructure.", "Correctness by induction over subproblem order. Bellman–Ford, alignment."],
    ["Randomisation", "Use random choices to buy simplicity or expected speed.", "Analysed in expectation or with high probability. Quicksort, Karger, hashing."],
    ["Approximation", "Give up optimality, keep a provable ratio.", "For NP-hard problems. Vertex cover 2-approximation; PTAS families."],
    ["Branch and bound", "Exhaustive search with sound pruning.", "No worst-case gain, large practical one. ILP, SAT and CP solvers."],
    ["Local search", "Iteratively improve; no guarantee at all.", "Judged purely empirically. Simulated annealing, LKH for TSP."],
    ["Parameterised", "Confine the exponential to a parameter k.", "f(k)·poly(n), plus kernelisation. Treewidth, vertex-cover size."],
  ];
  const cw = 2.87, gp = 0.25, ch = 1.72, rg = 0.22;
  tools.forEach((t, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, t[0], { x: x + 0.26, y: cy + 0.2, w: cw - 0.52, h: 0.32, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "middle" });
    txt(s, t[1], { x: x + 0.26, y: cy + 0.56, w: cw - 0.52, h: 0.56, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });
    txt(s, t[2], { x: x + 0.26, y: cy + 1.14, w: cw - 0.52, h: 0.46, fontFace: BF, fontSize: 9.5, italic: true, color: GOLDD, valign: "top", lineSpacingMultiple: 1.12 });
  });

  closer(s, "Also standard: streaming, online, sublinear and external-memory algorithms — paradigms defined by a resource constraint rather than a control structure, each with its own analysis style.");
  footer(s);
}

/* ================================================================== */
/*  8 — Analysis dimensions                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · The Algorithmic Approach",
    "Which Analysis Are You Reporting?",
    "Five distinct claims, routinely confused with one another in write-ups. Each answers a different question about cost.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Analysis", w: 1.9 },
      { label: "What it reports", w: 4.05 },
      { label: "Appropriate when", w: 3.14 },
      { label: "Watch out for", w: 3.14 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [GOLD, BLUE, GOLD, RUST, BLUE],
    rows: [
      ["Worst case", "A bound that holds for every input of size n, with no exceptions.",
       "A guarantee is required, or inputs may be adversarial.", "It can be dominated by inputs nobody will ever supply."],
      ["Average case", "Expected cost under an assumed distribution over inputs.",
       "That distribution is genuinely known or defensible.", "The distribution is a premise — usually the weakest one present."],
      ["Amortised", "Average cost per operation across a worst-case sequence.",
       "Individual operations vary but sequences are what run.", "Still a worst-case claim. Do not report it as “typical”."],
      ["Smoothed", "Worst case over slightly perturbed inputs.",
       "Explaining why an exponential method is fast in practice.", "The perturbation model is itself an unverified assumption."],
      ["Competitive", "Ratio to an offline optimum that knows the whole future.",
       "Online problems where decisions cannot be revised.", "The yardstick may be unreachably strong, making ratios look bad."],
    ],
  });

  closer(s, "State which one you are claiming, in the abstract. A reader who assumes “worst case” and finds “average case under a uniform distribution” has been misled, whether or not you intended it.");
  footer(s);
}

/* ================================================================== */
/*  9 — When exact and efficient is out of reach                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · The Algorithmic Approach",
    "When Exact and Efficient Is Out of Reach",
    "Lecture 3's reductions tell you a problem is hard. They do not end the research — they define which four bargains remain open.", true);

  const opts = [
    { t: "Approximation", c: GOLDD, q: "Give up optimality; keep a proved ratio to the optimum.",
      ex: "Contribution: a better ratio, a faster algorithm at the same ratio, or an inapproximability bound showing no better ratio exists." },
    { t: "Heuristics", c: RUST, q: "Give up the guarantee entirely; shift the whole burden onto experiment.",
      ex: "Contribution: a method that wins on accepted instance libraries, against tuned competitors, with Lecture 2's empirical obligations in full." },
    { t: "Parameterisation", c: BLUE, q: "Keep exactness; confine the exponential to a parameter small in practice.",
      ex: "Contribution: an f(k)·poly(n) algorithm, a polynomial kernel, or a proof that no such kernel exists." },
    { t: "Restricted inputs", c: INK, q: "Keep exactness and efficiency; narrow the problem instead.",
      ex: "Contribution: tractability on planar graphs, bounded treewidth, or whatever structure real instances actually have." },
  ];
  const cw = 2.87, gp = 0.25;
  opts.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "BARGAIN " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 16, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "WHAT COUNTS AS A RESULT", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "Each is a different bargain with the same hardness result. Naming which one you struck is the first sentence of your contribution — and the thing an unfocused paper never manages to say.");
  footer(s);
}

/* ================================================================== */
/*  10 — Algorithm engineering                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · The Algorithmic Approach",
    "Algorithm Engineering: Closing the Loop",
    "The pipeline becomes a cycle. Measurement is allowed to refute not just the code, but the model the analysis was carried out in.");

  const nodes = [
    ["Design", "Realistic models, not just clean ones.", BLUE],
    ["Analysis", "Bounds derived in the model actually chosen.", GOLDD],
    ["Implementation", "Constants, memory layout, and engineering effort.", RUST],
    ["Experimentation", "Accepted instances, tuned baselines, reported hardware.", BLUE],
  ];
  const bw = 2.87, bgap = 0.25;
  nodes.forEach((nd, i) => {
    const x = ML + i * (bw + bgap);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: bw, h: 1.5, rectRadius: 0.06,
      fill: { color: TINT }, line: { type: "none" },
    });
    txt(s, nd[0].toUpperCase(), {
      x: x + 0.24, y: y + 0.26, w: bw - 0.48, h: 0.24, fontFace: BF, fontSize: 9,
      bold: true, color: nd[2], charSpacing: 1.3, valign: "middle",
    });
    txt(s, nd[1], {
      x: x + 0.24, y: y + 0.6, w: bw - 0.48, h: 0.74, fontFace: BF, fontSize: 10.5,
      color: BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
    if (i < 3) {
      txt(s, "→", {
        x: x + bw, y: y + 0.54, w: bgap, h: 0.34, align: "center", valign: "middle",
        fontFace: BF, fontSize: 14, color: MUTED,
      });
    }
  });
  txt(s, "←———————————  what the measurements reveal feeds back into the design and the model  ———————————", {
    x: ML, y: y + 1.66, w: CW, h: 0.3, align: "center", valign: "middle",
    fontFace: BF, fontSize: 10, italic: true, color: GOLDD,
  });

  const notes = [
    ["Measurement can refute the model", "Finding that a “linear” routine is memory-bound is not an implementation detail. It says the RAM model priced the wrong resource, and the analysis has to be redone in a model that counts block transfers."],
    ["Shared instances make results comparable", "TSPLIB, the DIMACS Implementation Challenges, SATLIB and SNAP let a claim made in 2008 still be checked against one made today. Self-generated instances cannot do this."],
    ["The empirical half inherits every obligation", "The moment the claim is “faster in practice”, it is an inductive claim, and Lecture 2's rules apply in full: tuned baselines, repetitions, dispersion, and a stated instance population."],
  ];
  const cw = 3.83, gp = 0.37;
  notes.forEach((nd, i) => {
    const x = ML + i * (cw + gp);
    txt(s, nd[0], {
      x: x, y: y + 2.5, w: cw, h: 0.52, fontFace: HF, fontSize: 13.5, bold: true,
      color: INK, valign: "top", lineSpacingMultiple: 1.1,
    });
    txt(s, nd[1], {
      x: x, y: y + 3.14, w: cw, h: 1.5, fontFace: BF, fontSize: 11,
      color: BODY, valign: "top", lineSpacingMultiple: 1.22,
    });
  });

  footer(s);
}

/* ================================================================== */
/*  11 — Worked: an algorithmic contribution                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · The Algorithmic Approach",
    "Worked Example: An Algorithmic Contribution, End to End");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "“Point-to-point shortest-path queries on continental road networks can be answered in microseconds after preprocessing.”   ", options: { color: BODY } },
    { text: "— contraction hierarchies, Geisberger et al., 2008", options: { italic: true, color: MUTED, fontSize: 10.5 } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.5, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 2.2, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "THE FORMALISATION", { x: ML + 0.3, y: y + 0.36, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "Given a directed graph with non-negative edge weights, fixed in advance, answer many s–t distance queries.\n\nPreprocessing time is amortised over the query stream, so it is a separate budget — a modelling choice that makes the whole approach possible.", {
    x: ML + 0.3, y: y + 0.64, w: 4.0, h: 1.6, fontFace: BF, fontSize: 11,
    color: INK, valign: "top", lineSpacingMultiple: 1.2,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.56, w: 4.6, h: 1.44, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "THE SPLIT THAT MATTERS", { x: ML + 0.3, y: y + 2.76, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Correctness is deductive and unconditional. The speed-up is inductive and conditional on road networks having highway-like structure.", {
    x: ML + 0.3, y: y + 3.04, w: 4.0, h: 0.84, fontFace: BF, fontSize: 11, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  txt(s, "A paper that reported both as though they were one claim would invite exactly the objection Lecture 2's triangulation table predicts: a proof offered where a benchmark was needed, or the reverse.", {
    x: ML, y: y + 4.24, w: 4.6, h: 0.9, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["Design", "Contract nodes one at a time in a heuristically chosen order, inserting shortcut edges wherever a removed node lay on the only shortest path between two neighbours."],
    ["Analyse", "Prove that contraction preserves all shortest-path distances, so a bidirectional search over upward edges only is still exact. Correctness holds for every input graph."],
    ["Implement", "The achieved speed-up is dominated by engineering: the contraction order, the priority queue, and the memory layout of the shortcut graph."],
    ["Experiment", "Measure on the standard continental road networks used by the DIMACS shortest-path challenge, against plain Dijkstra and against earlier speed-up techniques."],
  ];
  let sy = y + 0.2;
  steps.forEach((st, i) => {
    numDot(s, 5.5, sy + 0.02, 0.34, i + 1, i < 2 ? BLUE : RUST);
    txt(s, st[0], { x: 6.06, y: sy, w: 6.72, h: 0.3, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "top" });
    txt(s, st[1], { x: 6.06, y: sy + 0.34, w: 6.72, h: 0.86, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    sy += 1.2;
  });

  footer(s);
}

/* ================================================================== */
/*  12 — SE research: the object is socio-technical                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · The Software Engineering Approach",
    "The Object of Study Contains People",
    "Software-engineering research studies the construction and evolution of software by people, using tools and processes, under organisational constraints.");

  const pts = [
    ["Human variance dwarfs most effects you are looking for.", "Individual developer productivity varies by a large factor on the same task. A 20% difference is decisive for an algorithm and easily noise across developers — which is why sample size and dispersion matter more here, not less."],
    ["You cannot hold the world fixed and keep it realistic.", "Laboratory experiments buy control and lose realism; field studies do the reverse. Neither is the better method — the choice is a design decision that must be stated and defended."],
    ["Threats to validity are the centre of the paper.", "Because the dominant mode is empirical and the dominant inference is induction, the argument lives or dies on the population and the constructs. That section is not an appendix here."],
  ];
  let py = y;
  pts.forEach((p) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: py + 0.1, w: 0.12, h: 0.12, fill: { color: BLUE }, line: { type: "none" } });
    txt(s, p[0], { x: ML + 0.34, y: py, w: 7.36, h: 0.32, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "top" });
    txt(s, p[1], { x: ML + 0.34, y: py + 0.38, w: 7.36, h: 0.92, fontFace: BF, fontSize: 11.5, color: BODY, valign: "top", lineSpacingMultiple: 1.22 });
    py += 1.3;
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: py - 0.02, w: 7.7, h: 0.82, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "The reason SE research feels harder than it looks: the interesting questions are causal, and the available data is almost always observational.", {
    x: ML + 0.3, y: py - 0.02, w: 7.1, h: 0.82, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle", lineSpacingMultiple: 1.18,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 8.55, y: y, w: 4.23, h: 4.5, rectRadius: 0.05, fill: { color: "EEF3F9" }, line: { type: "none" } });
  txt(s, "THE SAME SLOT, DIFFERENT CONTENTS", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "In algorithmic work, the risky premise is the model.\n\nIn SE work, it is the population.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 1.5, fontFace: HF, fontSize: 15.5, color: INK,
    valign: "top", lineSpacingMultiple: 1.18,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 2.4, w: 1.5, h: 0, line: { color: BLUE, width: 1.25 } });
  txt(s, "Both occupy the position Lecture 1 called the warrant: the unstated reason the evidence supports the claim. Making it explicit is the same discipline in both traditions — it just has a different name in each.", {
    x: 8.85, y: y + 2.6, w: 3.63, h: 1.6, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  13 — Empirical SE methods                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · The Software Engineering Approach",
    "The Empirical Methods Toolkit",
    "Six standard designs. They differ mainly in what they sacrifice — control, realism, scale, or the ability to say anything causal.", true);

  const methods = [
    ["Controlled experiment", BLUE, "Assign participants to treatments and measure an outcome on a fixed task. Highest internal validity, lowest external: the tasks small enough to run are rarely the work you care about."],
    ["Case study", BLUE, "Deep investigation of one or a few real settings, with a stated unit of analysis and several data sources. High realism, limited and carefully argued generalisation."],
    ["Survey", BLUE, "A designed instrument administered to a sampled population of practitioners. Good for prevalence and attitude; weak for causal claims. Report the sampling frame and response rate."],
    ["Repository mining", GOLDD, "Observational data at scale from version control, issue trackers and CI logs. Enormous samples, no control at all, and heavy selection bias toward public projects."],
    ["Observational study", GOLDD, "Watching practitioners in situ, including ethnographic work. Strongest for discovering constructs and generating hypotheses that other designs then test."],
    ["Design science", RUST, "Build an artifact to solve a real problem in a real context, evaluate it there, and report the design knowledge that transfers beyond the one case."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  methods.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, a[0], { x: x + 0.28, y: cy + 0.24, w: cw - 0.56, h: 0.4, fontFace: HF, fontSize: 14.5, bold: true, color: a[1], valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, a[2], { x: x + 0.28, y: cy + 0.72, w: cw - 0.56, h: 1.14, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  14 — Design science                                                */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · The Software Engineering Approach",
    "Design Science: When the Contribution Is an Artifact",
    "Wieringa's engineering cycle, the standard framing for thesis work that builds something to solve a real problem.", true);

  const steps = [
    ["Problem investigation", "Whose problem is it, what causes it, and what would count as an improvement? Answered before anything is built.", BLUE],
    ["Treatment design", "Specify requirements, then design an artifact — a tool, method, or process — intended to satisfy them.", BLUE],
    ["Treatment validation", "Would this artifact produce the intended effect, in the intended context? Argued before deployment, not after.", GOLDD],
    ["Implementation", "Deploy the artifact in the real context it was designed for, with real users and real constraints.", RUST],
    ["Evaluation", "Did it work? The answer becomes the next problem investigation, and the cycle turns again.", RUST],
  ];
  const bw = 2.23, bg = 0.27;
  steps.forEach((st, i) => {
    const x = ML + i * (bw + bg);
    numDot(s, x, y, 0.42, i + 1, st[2]);
    txt(s, st[0], {
      x: x, y: y + 0.58, w: bw, h: 0.52, fontFace: HF, fontSize: 13.5, bold: true,
      color: INK, valign: "top", lineSpacingMultiple: 1.05,
    });
    txt(s, st[1], {
      x: x, y: y + 1.18, w: bw, h: 1.6, fontFace: BF, fontSize: 10.5, color: BODY,
      valign: "top", lineSpacingMultiple: 1.2,
    });
    if (i < 4) {
      txt(s, "→", { x: x + bw - 0.06, y: y + 0.04, w: bg + 0.12, h: 0.34, align: "center", valign: "middle", fontFace: BF, fontSize: 14, color: MUTED });
    }
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: ML, y: 5.12, w: CW, h: 1.24, rectRadius: 0.05,
    fill: { color: "F6EFE4" }, line: { type: "none" },
  });
  txt(s, "THE DISTINCTION THAT ORGANISES A THESIS", { x: ML + 0.32, y: 5.3, w: 6, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Wieringa separates design problems — “how do we build something that achieves X?” — from knowledge questions — “is it true that Y?”. They call for different evidence and belong in different chapters: a design problem is answered by an artifact plus a validation argument, a knowledge question by a study. Most confused theses are confused because these two were attempted in the same chapter.", {
    x: ML + 0.32, y: 5.56, w: CW - 0.64, h: 0.66, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.18,
  });

  footer(s);
}

/* ================================================================== */
/*  15 — Measuring software                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · The Software Engineering Approach",
    "Every Software Metric Is a Proxy",
    "Lecture 2 called this construct validity. In SE research it is the threat that sinks the most papers, because the metric is easy to compute and the construct is hard to define.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Metric", w: 2.6 },
      { label: "The construct it is meant to capture", w: 4.35 },
      { label: "Why the construct is contested", w: 5.28 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [BLUE, RUST, GOLD, BLUE, RUST],
    rows: [
      ["Cyclomatic complexity", "Comprehension difficulty and testing effort.",
       "Correlates so strongly with size that most studies find it adds little beyond counting lines."],
      ["Defect density", "Product quality.",
       "Depends on how hard anyone looked. More testing produces more recorded defects, not worse software."],
      ["Code churn", "Instability and change risk.",
       "Cannot distinguish thrashing from healthy, active development on a component under deliberate revision."],
      ["Coupling and cohesion", "Maintainability and modularity.",
       "Definitions differ between tools, so absolute values are not comparable across studies or languages."],
      ["Lines of code", "Size, effort, and productivity.",
       "Language- and style-dependent; as a productivity measure it actively rewards writing more code."],
    ],
  });

  closer(s, "None of this makes the metrics useless. It makes them proxies that must be named as proxies — and defended, whenever the claim is about the construct rather than the number.");
  footer(s);
}

/* ================================================================== */
/*  16 — Human subjects                                                */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · The Software Engineering Approach",
    "Working With Human Participants",
    "Four obligations that apply the moment your data comes from people rather than machines.", true);

  const items = [
    { t: "Sampling", c: BLUE, q: "Who are the participants, and who exactly do they stand for?",
      ex: "Students are a defensible proxy for junior developers on small, well-specified tasks — and a poor one for architectural judgement or long-horizon maintenance." },
    { t: "Tasks", c: RUST, q: "Is the task short enough to run also representative of the work you claim about?",
      ex: "Usually not. State the trade explicitly rather than letting the abstract quietly generalise from a two-hour exercise to professional practice." },
    { t: "Statistical power", c: GOLDD, q: "Can this design detect the effect you care about, if it exists?",
      ex: "Developer performance varies enormously between individuals. Small n plus large variance makes most negative results uninformative — compute power before running, not after." },
    { t: "Ethics", c: INK, q: "Consent, anonymisation, the right to withdraw, and institutional approval.",
      ex: "Mining public repositories still involves identifiable people and their work. Unit III returns to this in detail; treat it as binding, not procedural." },
  ];
  const cw = 2.87, gp = 0.25;
  items.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "OBLIGATION " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 16, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "IN PRACTICE", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "The participants are not instruments. Every one of these obligations is simultaneously a methodological requirement and an ethical one.");
  footer(s);
}

/* ================================================================== */
/*  17 — Worked: an SE study                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · The Software Engineering Approach",
    "Worked Example: An SE Study, Read as an Argument");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "“Test-driven development improves external code quality without reducing productivity.”   ", options: { color: BODY } },
    { text: "— one of the most replicated claims in empirical SE", options: { italic: true, color: MUTED, fontSize: 10.5 } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.5, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  matrix(s, {
    x: ML, y: y + 0.34, w: CW,
    cols: [
      { label: "Component", w: 2.6 },
      { label: "How the study supplies it", w: 9.63 },
    ],
    rowH: [0.55, 0.55, 0.55, 0.55, 0.55, 0.55],
    accents: [BLUE, BLUE, GOLD, GOLD, RUST, RUSTD],
    rows: [
      ["Question type", "A knowledge question, comparative and causal — which forces a controlled design rather than repository mining."],
      ["Design", "Participants assigned to test-first or test-last on the same task; defect count and completion time measured."],
      ["Population", "Whoever the participants stand for: usually students, or the developers of one company. This is where the qualifier must live."],
      ["Constructs", "“External quality” operationalised as failures against a hidden acceptance suite; “productivity” as time to completion."],
      ["Threats", "Internal: did the test-first group actually write tests first? External: task size and duration. Construct: a hidden suite measures conformance, not quality."],
      ["Outcome", "Across many replications and systematic reviews the effect is small and inconsistent, with process conformance a stronger moderator than TDD itself."],
    ],
  });

  closer(s, "That is a real result, and a publishable one. A field that reports only confirmations is not, by Lecture 1's Popperian standard, testing anything at all.");
  footer(s);
}

/* ================================================================== */
/*  18 — Shared infrastructure                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Where the Two Traditions Meet",
    "Shared Instances and Datasets",
    "Both traditions depend on data nobody in the paper chose. These are the collections that make results comparable across groups and across years.", true);

  const libs = [
    ["TSPLIB · DIMACS Challenges", GOLDD, "Curated instances for routing, shortest paths, graph partitioning and matching, with published reference results from the implementation challenges."],
    ["SATLIB · SAT Competition", GOLDD, "An annual competition where anyone may submit adversarial instances — an unusually honest arrangement, and a major driver of solver progress."],
    ["SNAP · Network Repository", GOLDD, "Large real-world graphs — social, web, citation, road — so that graph-algorithm claims are tested on structures that actually occur."],
    ["Defects4J · BugsInPy", BLUE, "Reproducible real bugs with tests, for fault-localisation and automated program-repair research. Reproducibility is the entire point of the dataset."],
    ["SPEC CPU · DaCapo", BLUE, "Standard workloads for systems, compiler and runtime measurement, with strict published rules on how results may be reported."],
    ["PROMISE · SEACRAFT", BLUE, "Curated software-engineering datasets for defect prediction and effort estimation, assembled precisely so studies can be re-run and compared."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  libs.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, a[0], { x: x + 0.28, y: cy + 0.24, w: cw - 0.56, h: 0.4, fontFace: HF, fontSize: 13.5, bold: true, color: a[1], valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, a[2], { x: x + 0.28, y: cy + 0.74, w: cw - 0.56, h: 1.12, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  19 — Artifact evaluation                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Where the Two Traditions Meet",
    "Artifact Evaluation and Reproducibility",
    "The ACM badges, in the order of increasing demand. Knowing what each one actually certifies tells you what to claim — and what not to.", true);

  const badges = [
    ["Artifacts Available", "The artifact is placed in a permanent public archive with a DOI. Says nothing about whether it works.", BLUE],
    ["Evaluated — Functional", "Documented, consistent, complete, and exercisable: a reviewer got it to run and produce something.", BLUE],
    ["Evaluated — Reusable", "All of the above, plus structured well enough for someone else to build on beyond this paper.", GOLDD],
    ["Results Reproduced", "A different team obtained the same results using the authors' own artifacts.", RUST],
    ["Results Replicated", "A different team obtained the same results without the authors' artifacts, from the description alone.", RUST],
  ];
  const bw = 2.23, bg = 0.27;
  badges.forEach((p, i) => {
    const x = ML + i * (bw + bg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: bw, h: 2.5, rectRadius: 0.06, fill: { color: i > 2 ? "F6EFE4" : TINT }, line: { type: "none" } });
    numDot(s, x + 0.2, y + 0.22, 0.32, i + 1, p[2]);
    txt(s, p[0], { x: x + 0.2, y: y + 0.66, w: bw - 0.4, h: 0.52, fontFace: HF, fontSize: 12.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.02 });
    txt(s, p[1], { x: x + 0.2, y: y + 1.24, w: bw - 0.4, h: 1.1, fontFace: BF, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.16 });
  });

  const pw = 5.99, pg = 0.25;
  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "A TERMINOLOGY TRAP WORTH KNOWING", { x: ML + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "ACM swapped the meanings of “reproduced” and “replicated” in 2020 to align with the NISO terminology. Papers published before then use the two words the other way round. When you use either term in your own writing, say which definition you mean.", {
    x: ML + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  s.addShape(pres.ShapeType.roundRect, { x: ML + pw + pg, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: "EEF3F9" }, line: { type: "none" } });
  txt(s, "WHY THIS IS METHODOLOGY, NOT ADMIN", { x: ML + pw + pg + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "Lecture 2 argued that a demonstration is only admissible evidence when it is re-runnable. Badging is that argument made institutional: it converts “trust us” into something a stranger can check, in both traditions at once.", {
    x: ML + pw + pg + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  footer(s);
}

/* ================================================================== */
/*  20 — Threats by tradition                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Where the Two Traditions Meet",
    "The Same Five Threats, in Two Dialects",
    "Read across each row: the traditions use different vocabulary for what is structurally the same methodological failure.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "The threat", w: 2.4 },
      { label: "In algorithmic work", w: 4.9 },
      { label: "In software engineering work", w: 4.93 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [GOLD, BLUE, RUST, GOLD, INK],
    rows: [
      ["The risky premise", "The cost model: unit-cost memory, an assumed input distribution, a machine that does not exist.",
       "The population: which projects, which developers, which tasks the sample is taken to stand for."],
      ["Tuning to the test set", "Parameters and heuristics tuned on the very instances used to report the results.",
       "The model, metric or subgroup selected after seeing which one separated the groups."],
      ["The weak baseline", "Comparing an engineered implementation against a textbook one, and reporting the engineering as the idea.",
       "Comparing a new tool against no tool at all, or against a deliberately naive process."],
      ["Generalisation", "Instance families chosen — or generated — because the method happens to suit them.",
       "Public repositories and student participants standing in, unqualified, for professional practice."],
      ["The standard defence", "Accepted instance libraries, released code, and the machine, compiler and flags reported.",
       "A defended sampling frame, a published protocol, held-out replication, and available data."],
    ],
  });

  closer(s, "The symmetry is the point: if you can diagnose one tradition's methodology, you already have most of what you need to read the other's.");
  footer(s);
}

/* ================================================================== */
/*  21 — Choosing an approach                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Choosing an Approach for Your Own Question",
    "Find the question you are actually asking, then read across. The last column is what taking that route commits you to.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "If your question is…", w: 3.75 },
      { label: "Approach", w: 2.3 },
      { label: "Primary evidence", w: 2.95 },
      { label: "The obligation it brings", w: 3.23 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [GOLD, GOLD, BLUE, BLUE, RUST],
    rows: [
      ["“Can this be solved faster, provably?”", "Design and analysis", "A proof inside a stated model", "Show the bound is tight, or say plainly that it is not"],
      ["“Is my algorithm faster on real inputs?”", "Algorithm engineering", "Measurement on accepted instances", "Tuned baselines, released code, reported hardware"],
      ["“Does this technique help developers?”", "Experiment or case study", "Human-subject data, threats stated", "Ethics approval, power analysis, a defined population"],
      ["“What do developers actually do?”", "Repository mining", "Observational data at scale", "A defended sampling frame — and no causal language"],
      ["“Does this tool solve a real problem?”", "Design science", "An artifact plus evaluation in context", "Separate the design problem from the knowledge question"],
    ],
  });

  closer(s, "Nothing here forbids combining routes — most strong theses do. What it forbids is answering a question from one row with the evidence from another.");
  footer(s);
}

/* ================================================================== */
/*  22 — Failure modes                                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Failure Modes of Each Tradition",
    "Three from each side. Every one is common enough that reviewers have a stock phrase ready for it.", true);

  const f = [
    ["The unanalysed algorithm", GOLDD, "A new procedure with no correctness argument and no derived bound, evaluated only on instances the authors generated themselves."],
    ["The self-selected instance family", GOLDD, "Benchmark instances chosen, or synthesised, because the proposed method happens to exploit their structure."],
    ["The textbook baseline", GOLDD, "An engineered implementation compared against a naive one, so that ordinary engineering effort is reported as the scientific contribution."],
    ["The demo as evaluation", BLUE, "The authors running their own tool on examples they picked, presented as evidence that it helps anyone other than the authors."],
    ["Students as industry", BLUE, "A short laboratory study on undergraduates whose abstract states its conclusion about professional software developers."],
    ["Causal language on observational data", BLUE, "“Adopting X reduces defects”, drawn from repository mining that could only ever have shown a correlation."],
  ];
  const cw = 3.83, gp = 0.37, ch = 1.9, rg = 0.24;
  f.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, it[0], { x: x + 0.28, y: cy + 0.24, w: cw - 0.56, h: 0.56, fontFace: HF, fontSize: 14, bold: true, color: it[1], valign: "top", lineSpacingMultiple: 1.06 });
    txt(s, it[2], { x: x + 0.28, y: cy + 0.84, w: cw - 0.56, h: 0.9, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  23 — Checklist                                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "A Checklist for Your Own Study");

  const items = [
    ["Name the tradition.", "Is the object of study a problem, an artifact, or a practice? Every later methodological decision follows from that answer, so make it explicitly."],
    ["State the model or the population.", "An algorithmic paper's cost model and an SE paper's sampling frame occupy the same slot in the argument. Whichever you have, put it where a reader will find it."],
    ["Analyse before you measure, and measure after you analyse.", "A bound with no implementation and an implementation with no bound are each half a contribution. Say which half you are offering if you only have one."],
    ["Use instances and baselines you did not choose.", "Accepted libraries, the tuned state of the art, and somebody else's data wherever it exists. Self-chosen everything is the fastest route to rejection."],
    ["Separate design problems from knowledge questions.", "“How do we build X” and “is it true that Y” need different evidence and different chapters. Mixing them is the commonest structural fault in a thesis."],
    ["Release the artifact, and claim only the badge it would earn.", "Available, functional, reusable — or none. Claim only what a stranger with your repository could actually verify."],
  ];
  let cy = y - 0.06;
  items.forEach((it, i) => {
    s.addShape(pres.ShapeType.roundRect, { x: ML, y: cy, w: CW, h: 0.76, rectRadius: 0.04, fill: { color: i % 2 === 0 ? TINT : "FFFFFF" }, line: { type: "none" } });
    txt(s, "✓", { x: ML + 0.24, y: cy, w: 0.4, h: 0.76, align: "center", valign: "middle", fontFace: BF, fontSize: 15, bold: true, color: GOLDD });
    txt(s, [
      { text: it[0] + "  ", options: { bold: true, color: INK, fontFace: HF, fontSize: 12.5 } },
      { text: it[1], options: { color: BODY, fontFace: BF, fontSize: 11 } },
    ], { x: ML + 0.78, y: cy, w: CW - 1.1, h: 0.76, valign: "middle", lineSpacingMultiple: 1.16, isTextBox: true, margin: 0 });
    cy += 0.84;
  });

  footer(s);
}

/* ================================================================== */
/*  24 — Discussion                                                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice", "Discussion",
    "In pairs, ten minutes. Bring one answer back for class critique.", true);

  const qs = [
    "Take your own project or thesis topic. Is its object of study a problem, an artifact, or a practice — and does the evaluation you have planned match that answer?",
    "Find an algorithms paper with an experimental section. Where did its instances come from, who tuned the baseline, and could you re-run any of it from what is written?",
    "Find an SE paper with a human-subject study. What population do the participants stand for, and does the abstract respect that boundary or quietly cross it?",
    "Pick a widely repeated claim in your area that you have never seen replicated. Design the cheapest study that could overturn it — and say what result would.",
  ];
  let cy = y + 0.1;
  qs.forEach((q, i) => {
    numDot(s, ML + 0.1, cy, 0.42, i + 1, i % 2 === 0 ? INK : GOLDD);
    txt(s, q, {
      x: ML + 0.82, y: cy - 0.06, w: 11.2, h: 0.9, fontFace: BF, fontSize: 13,
      color: BODY, valign: "top", lineSpacingMultiple: 1.24,
    });
    cy += 1.14;
  });

  footer(s);
}

/* ================================================================== */
/*  25 — Key takeaways                                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Recap", "Key Takeaways");

  const t = [
    "Computing science research runs in two dominant traditions. The algorithmic studies a problem, and its risky premise is the cost model; the software-engineering studies a socio-technical practice, and its risky premise is the population.",
    "The algorithmic pipeline runs formalise, design, analyse, implement, experiment — and algorithm engineering closes it into a loop, where measurement can refute the model itself and not merely the code.",
    "Once a problem is proved hard, four honest bargains remain: approximation, heuristics, parameterisation, and restricted inputs. Naming the one you struck is the first sentence of your contribution.",
    "Empirical SE must trade control against realism and cannot have both; its methods differ mainly in which they sacrifice. Every software metric is a proxy, so construct validity is the standing threat.",
    "Shared instance libraries, tuned baselines, and artifact badging are what make either tradition's claims comparable across groups and years — and they are the cheapest thing you can do to make your own work checkable.",
  ];
  let cy = y - 0.02;
  t.forEach((x, i) => {
    numDot(s, ML + 0.1, cy + 0.06, 0.42, i + 1, i % 2 === 0 ? GOLDD : INK);
    txt(s, x, {
      x: ML + 0.82, y: cy, w: 11.2, h: 0.9, fontFace: BF, fontSize: 12.5,
      color: BODY, valign: "top", lineSpacingMultiple: 1.24,
    });
    cy += 1.06;
  });

  footer(s);
}

/* ================================================================== */
/*  26 — Further reading                                               */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "", "Further Reading");

  const refs = [
    ["Skiena, S. S.", "The Algorithm Design Manual. 3rd ed., Springer, 2020. — the course's listed reference for algorithmic method."],
    ["Sanders, P.", "“Algorithm Engineering — An Attempt at a Definition.” Efficient Algorithms, LNCS 5760, Springer, 2009."],
    ["McGeoch, C. C.", "A Guide to Experimental Algorithmics. Cambridge University Press, 2012."],
    ["Williamson, D. P. & Shmoys, D. B.", "The Design of Approximation Algorithms. Cambridge University Press, 2011."],
    ["Cygan, M. et al.", "Parameterized Algorithms. Springer, 2015."],
    ["Wohlin, C. et al.", "Experimentation in Software Engineering. Springer, 2012. — the standard reference for SE experiments."],
    ["Runeson, P. & Höst, M.", "“Guidelines for Conducting and Reporting Case Study Research in Software Engineering.” Empirical Software Engineering, 2009."],
    ["Wieringa, R. J.", "Design Science Methodology for Information Systems and Software Engineering. Springer, 2014."],
    ["Geisberger, R., Sanders, P., Schultes, D. & Delling, D.", "“Contraction Hierarchies: Faster and Simpler Hierarchical Routing in Road Networks.” WEA, LNCS 5038, 2008."],
  ];
  let cy = y - 0.06;
  refs.forEach((r, i) => {
    if (i % 2 === 0) {
      s.addShape(pres.ShapeType.rect, { x: ML, y: cy, w: CW, h: 0.55, fill: { color: TINT }, line: { type: "none" } });
    }
    txt(s, [
      { text: r[0] + "  ", options: { bold: true, color: INK, fontFace: HF, fontSize: 11.5 } },
      { text: r[1], options: { color: BODY, fontFace: BF, fontSize: 11 } },
    ], { x: ML + 0.28, y: cy, w: CW - 0.56, h: 0.55, valign: "middle", lineSpacingMultiple: 1.14, isTextBox: true, margin: 0 });
    cy += 0.57;
  });

  footer(s);
}

/* ------------------------------------------------------------------ */
const out = process.argv[2] || "out.pptx";
pres.writeFile({ fileName: out }).then(() => console.log("wrote " + out + " — " + N + " slides"));
