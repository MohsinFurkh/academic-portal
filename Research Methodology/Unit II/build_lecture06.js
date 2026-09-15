const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Research Methodology in CS";
pres.title = "Performance Estimation and Evaluation";
pres.subject = "Unit II, Lecture 6 - Performance Estimation and Evaluation";

/* ------------------------------------------------------------------ */
/*  Design system — identical to Unit II Lectures 1–5                   */
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

const RUNNING = "PERFORMANCE ESTIMATION & EVALUATION";
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
  txt(s, "Performance Estimation\nand Evaluation", {
    x: 0.84, y: 2.02, w: 9.6, h: 1.72, fontFace: HF, fontSize: 41, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.06,
  });
  txt(s, "Metrics, Measurement, and Scaling", {
    x: 0.88, y: 4.12, w: 9, h: 0.36, fontFace: HF, fontSize: 16, italic: true,
    color: "E4DFFA", valign: "middle",
  });
  s.addShape(pres.ShapeType.line, {
    x: 0.88, y: 4.72, w: 2.6, h: 0, line: { color: "6E688F", width: 1 },
  });
  txt(s, "Where Unit II closes its loop: the models of Lecture 5 meet a stopwatch, under the evidential\nstandards of Lecture 2 and the empirical discipline of Lecture 4.", {
    x: 0.88, y: 5.0, w: 8.4, h: 0.72, fontFace: BF, fontSize: 11.5,
    color: DKBODY, valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Research Methodology in CS   ·   Unit II · Lecture 6", {
    x: 0.88, y: 6.34, w: 7, h: 0.26, fontFace: BF, fontSize: 9,
    color: DKMUT, valign: "middle",
  });
  N += 1;
}

/* ================================================================== */
/*  2 — Performance is not a number                                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What Performance Evaluation Is",
    "Performance Is Not a Number",
    "“Faster” is not a property of a system. It is a property of a system, on a workload, on a platform, under a metric, summarised by a statistic — and changing any one of the five can reverse the answer.");

  const pts = [
    "This session closes Unit II's loop. Lecture 5 built models that predict performance; Lecture 4 set the standards for empirical claims; Lecture 2 said what admissible evidence looks like. Performance evaluation is where all three meet a stopwatch.",
    "Most disputed performance claims are not dishonest. They fail on a summary statistic, an unrepresentative workload, or a baseline nobody tuned — each of which is a methodological choice, made silently and rarely reported.",
    "The failure modes are so consistent that the field has codified them. Jain's 1991 text, the SPEC and TPC run rules, and the statistically-rigorous-evaluation literature all exist because the same mistakes kept recurring.",
    "The discipline it demands is unglamorous: control what you can, report what you cannot, and state precisely which of the five dependencies your number is conditional on.",
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
  txt(s, "WHAT EVERY NUMBER DEPENDS ON", {
    x: 8.58, y: y + 0.22, w: 3.9, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true,
    color: GOLDD, charSpacing: 1.3, valign: "middle",
  });
  txt(s, "System · Workload · Platform\nMetric · Summary statistic", {
    x: 8.58, y: y + 0.62, w: 3.9, h: 0.9, fontFace: HF, fontSize: 15,
    color: INK, valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "A performance claim that names fewer than five of these is under-specified. It cannot be reproduced by anyone else, and it cannot be contested on its merits — only believed or disbelieved.", {
    x: 8.58, y: y + 1.76, w: 3.9, h: 1.4, fontFace: BF, fontSize: 11,
    color: BODY, valign: "top", lineSpacingMultiple: 1.22,
  });
  s.addShape(pres.ShapeType.line, { x: 8.58, y: y + 3.4, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Write all five into the sentence that states your result.", {
    x: 8.58, y: y + 3.58, w: 3.9, h: 0.5, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  3 — Three techniques                                               */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What Performance Evaluation Is",
    "Three Techniques for a Performance Answer",
    "Jain's classification. They differ in when they can be applied, what they cost, and how much a reader will believe them.", true);

  const modes = [
    { k: "Technique 1", t: "Analytical", c: GOLDD,
      q: "Solve a model — Lecture 5's method.",
      rows: [
        ["Available", "At any stage, including before the system exists."],
        ["Accuracy", "Low to moderate; entirely dependent on the assumptions."],
        ["Cost and time", "Small. Hours to days, and no hardware."],
        ["Best for", "Trends, limits, and “what happens at ten times this load”."],
      ] },
    { k: "Technique 2", t: "Simulation", c: BLUE,
      q: "Execute a model of the system.",
      rows: [
        ["Available", "At any stage, including before the system exists."],
        ["Accuracy", "Moderate; limited by model detail and by run length."],
        ["Cost and time", "Medium. Days to weeks, plus statistical analysis."],
        ["Best for", "Realistic structure that admits no closed form."],
      ] },
    { k: "Technique 3", t: "Measurement", c: RUST,
      q: "Run the real system and time it.",
      rows: [
        ["Available", "Only once the system exists, in a runnable configuration."],
        ["Accuracy", "High if done carefully, and worthless if not."],
        ["Cost and time", "High. Hardware, isolation, and many repetitions."],
        ["Best for", "The configuration you actually have — and nothing beyond it."],
      ] },
  ];

  const cw = 3.83, gap = 0.37;
  modes.forEach((m, i) => {
    const x = ML + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: cw, h: 4.28, rectRadius: 0.05,
      fill: { color: i === 2 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 },
    });
    txt(s, m.k.toUpperCase(), {
      x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8.5,
      bold: true, color: m.c, charSpacing: 1.3, valign: "middle",
    });
    txt(s, m.t, {
      x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.4, fontFace: HF, fontSize: 20,
      bold: true, color: INK, valign: "middle",
    });
    txt(s, m.q, {
      x: x + 0.28, y: y + 0.94, w: cw - 0.56, h: 0.32, fontFace: HF, fontSize: 11.5,
      italic: true, color: m.c, valign: "middle",
    });
    let ry = y + 1.4;
    m.rows.forEach((r) => {
      txt(s, r[0].toUpperCase(), {
        x: x + 0.28, y: ry, w: cw - 0.56, h: 0.18, fontFace: BF, fontSize: 7.5,
        bold: true, color: MUTED, charSpacing: 1.1, valign: "middle",
      });
      txt(s, r[1], {
        x: x + 0.28, y: ry + 0.2, w: cw - 0.56, h: 0.46, fontFace: BF,
        fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15,
      });
      ry += 0.7;
    });
  });

  closer(s, "Jain's rule: use at least two, and reconcile them. Agreement is far more persuasive than either alone — and disagreement is usually where the finding is.");
  footer(s);
}

/* ================================================================== */
/*  4 — A systematic procedure                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What Performance Evaluation Is",
    "A Systematic Procedure",
    "Jain's ten steps, grouped into five phases. Each phase exists to prevent one specific, well-documented mistake.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Phase", w: 1.9 },
      { label: "What it involves", w: 5.6 },
      { label: "The mistake it prevents", w: 4.73 },
    ],
    rowH: [0.78, 0.78, 0.78, 0.78, 0.78],
    accents: [GOLD, BLUE, GOLD, RUST, INK],
    rows: [
      ["Frame", "State the goals of the study and define the system boundary — what is inside the thing being evaluated and what is environment.",
       "Evaluating a component while stating a conclusion about the whole system."],
      ["Specify", "List the services the system offers and their possible outcomes; then select the metrics that capture them.",
       "Choosing the metric after seeing which one flatters your system."],
      ["Parameterise", "List system and workload parameters, then select the subset you will actually vary as factors.",
       "Varying whatever was easy to vary rather than what the outcome depends on."],
      ["Design", "Choose the evaluation technique, select the workload, and design the set of experiments to run.",
       "One-factor-at-a-time designs that cannot detect interactions."],
      ["Execute and report", "Run, analyse, interpret — then present the data in a form a reader can check.",
       "Reporting a mean with no dispersion, no baseline detail, and no statement of scope."],
    ],
  });

  closer(s, "Notice that eight of the ten steps happen before any measurement is taken. That ordering is not bureaucratic: it is what makes the result falsifiable, exactly as in Lecture 2's five-stage empirical anatomy.");
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
  txt(s, "From the procedure\nto the two choices that decide the answer", {
    x: 0.84, y: 2.62, w: 10.8, h: 1.4, fontFace: HF, fontSize: 31, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.1,
  });
  txt(s, "Before a single measurement is taken, two decisions have already fixed what the study can conclude: which metric, and which workload.", {
    x: 0.88, y: 4.24, w: 9.2, h: 0.72, fontFace: HF, fontSize: 14, italic: true,
    color: "E4DFFA", valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Next: metrics, summary statistics, the tail, and workload characterisation.", {
    x: 0.88, y: 5.28, w: 9.2, h: 0.3, fontFace: BF, fontSize: 11,
    color: GOLD, valign: "middle",
  });
  footer(s, true);
}

/* ================================================================== */
/*  6 — Choosing the right metric                                      */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Metrics and Workloads",
    "Choosing the Right Metric",
    "Four families. The first two answer different questions and are routinely traded against each other, which is why reporting only one is rarely honest.", true);

  const items = [
    { t: "Response time", c: BLUE, q: "Time from request to completion. Smaller is better.",
      ex: "What a user experiences. Must be reported as a distribution: a mean response time describes almost nobody's actual experience." },
    { t: "Throughput", c: RUST, q: "Work completed per unit time. Larger is better.",
      ex: "What an operator cares about. Meaningless unless you state the offered load at which it was measured — throughput at saturation is a different claim." },
    { t: "Utilisation", c: GOLDD, q: "Fraction of time a resource is busy. Neither better nor worse.",
      ex: "A diagnostic, not an objective. A device at 100% utilisation is a bottleneck, not an achievement — and Lecture 5's laws let you compute it." },
    { t: "Cost and error", c: INK, q: "Energy per operation, cost per transaction, failure and deadline-miss rates.",
      ex: "Increasingly the metrics that decide real deployments, and the ones academic evaluations most often leave out entirely." },
  ];
  const cw = 2.87, gp = 0.25;
  items.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "METRIC " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "WHAT TO WATCH", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "Batching improves throughput and worsens tail latency. Whenever a mechanism trades one metric for another, report both — otherwise the improvement you show is being paid for off-screen.");
  footer(s);
}

/* ================================================================== */
/*  7 — Which mean                                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Metrics and Workloads",
    "Which Mean Are You Taking?",
    "The summary statistic is a methodological choice, not a formatting one. Choosing the wrong one can name the losing system as the winner — as the next slide demonstrates with numbers.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Statistic", w: 1.85 },
      { label: "What it computes", w: 3.0 },
      { label: "Use it for", w: 3.8 },
      { label: "Using it wrongly gives", w: 3.58 },
    ],
    rowH: [0.78, 0.78, 0.78, 0.78],
    accents: [BLUE, GOLD, RUST, INK],
    rows: [
      ["Arithmetic", "The sum of the values, divided by how many there are.",
       "Quantities that add up: total times, total work, total energy — anywhere the sum is itself meaningful.",
       "The wrong winner, whenever it is applied to rates or ratios."],
      ["Harmonic", "The count divided by the sum of the reciprocals.",
       "Rates measured over a fixed amount of work — MIPS, FLOPS, operations per second per benchmark.",
       "Nothing: this is the correct choice for rates, and it equals total work over total time."],
      ["Geometric", "The nth root of the product of the values.",
       "Normalised ratios, such as speed-ups against a baseline. Its result does not depend on which baseline was chosen.",
       "A number with no physical dimension — which is why SPEC uses it only for normalised ratios."],
      ["Median", "The middle value of the sorted observations.",
       "Skewed distributions, where a heavy tail drags the mean away from typical behaviour.",
       "(Not an error — a different question. Always report it with a spread.)"],
    ],
  });

  closer(s, "The rule that catches most of it: if the quantity is a rate, never take its arithmetic mean. Average the times arithmetically, or the rates harmonically — they give the same answer.");
  footer(s);
}

/* ================================================================== */
/*  8 — Worked: the wrong mean                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Metrics and Workloads",
    "Worked Example: The Wrong Mean Picks the Wrong Winner");

  txt(s, [
    { text: "Question:  ", options: { bold: true, color: INK } },
    { text: "“Two machines run the same two benchmarks. Which machine is faster?”", options: { color: BODY } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 1.92, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "THE MEASUREMENTS", { x: ML + 0.3, y: y + 0.36, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "                Bench 1   Bench 2\n  work            100 M     100 M   ops\n  ------------------------------------\n  Machine A         1 s      100 s\n  Machine B        10 s       10 s", {
    x: ML + 0.3, y: y + 0.66, w: 4.0, h: 1.22, fontFace: MF, fontSize: 10,
    color: INK, valign: "top", lineSpacingMultiple: 1.26,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.28, w: 4.6, h: 1.86, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "THE TWO SUMMARIES", { x: ML + 0.3, y: y + 2.48, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "  rates (Mops/s)   B1     B2\n  Machine A        100      1\n  Machine B         10     10\n\n  arithmetic mean   A = 50.5   B = 10.0\n  harmonic mean     A =  1.98  B = 10.0", {
    x: ML + 0.3, y: y + 2.78, w: 4.0, h: 1.3, fontFace: MF, fontSize: 10, color: INK,
    valign: "top", lineSpacingMultiple: 1.26,
  });

  const steps = [
    ["The tempting summary", "Convert each benchmark to a rate, then average the two rates arithmetically. Machine A scores 50.5 Mops/s against B's 10.0, and appears five times better."],
    ["The reality check", "Total work is 200 million operations. Machine A takes 101 seconds to do it; Machine B takes 20. B completes the same work in a fifth of the time — so the arithmetic mean picked the loser."],
    ["The correct summary", "The harmonic mean of the rates gives A = 1.98 and B = 10.0 Mops/s. That is exactly total work divided by total time. It agrees with reality because it is reality, rearranged."],
    ["Why it happens", "Averaging rates arithmetically implicitly weights each benchmark by its own running time, so the fastest case dominates the summary — and a machine can “win on average” while losing on every job you run."],
  ];
  let sy = y + 0.12;
  steps.forEach((st, i) => {
    numDot(s, 5.5, sy + 0.02, 0.34, i + 1, i < 2 ? BLUE : GOLDD);
    txt(s, st[0], { x: 6.06, y: sy, w: 6.72, h: 0.3, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "top" });
    txt(s, st[1], { x: 6.06, y: sy + 0.34, w: 6.72, h: 0.8, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    sy += 1.14;
  });

  txt(s, "This is not a contrived case. It is why SPEC reports a geometric mean of normalised ratios rather than an arithmetic mean of rates, and why Jain devotes an entire chapter to choosing the summary statistic.", {
    x: 6.06, y: sy + 0.06, w: 6.72, h: 0.62, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  9 — Percentiles and the tail                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Metrics and Workloads",
    "Percentiles and the Tail",
    "Latency distributions in real systems are skewed and often heavy-tailed, which makes the mean a poor description of anybody's actual experience.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "WHY THE MEAN MISLEADS", c: RUST, fill: "F8EEEA",
      quote: "A mean of 20 ms is consistent with 95% of requests at 5 ms and 5% at 300 ms.",
      note: "Those are entirely different systems to a user, and the mean cannot distinguish them. The heavier the tail, the further the mean sits from both the typical case and the worst one.",
      verdict: "Reporting only a mean is a construct-validity failure: the statistic is not measuring the property being claimed." },
    { tag: "AND IT COMPOUNDS AT SCALE", c: BLUE, fill: "EEF3F9",
      quote: "A request that fans out to N services waits for the slowest of the N.",
      note: "At N = 100, an event at one service's 99th percentile is expected on most requests. The tail of a component becomes the median of the system — Dean and Barroso's “tail at scale”.",
      verdict: "So in a distributed system, the p99 of a dependency is not an edge case. It is the common case." },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 2.94, rectRadius: 0.05, fill: { color: p.fill }, line: { type: "none" } });
    txt(s, p.tag, { x: x + 0.32, y: y + 0.24, w: pw - 0.64, h: 0.26, fontFace: BF, fontSize: 9.5, bold: true, color: p.c, charSpacing: 1.4, valign: "middle" });
    txt(s, p.quote, { x: x + 0.32, y: y + 0.6, w: pw - 0.64, h: 0.86, fontFace: HF, fontSize: 13.5, color: INK, valign: "top", lineSpacingMultiple: 1.18 });
    txt(s, p.note, { x: x + 0.32, y: y + 1.52, w: pw - 0.64, h: 0.86, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, p.verdict, { x: x + 0.32, y: y + 2.42, w: pw - 0.64, h: 0.42, fontFace: BF, fontSize: 10, italic: true, color: p.c, valign: "top", lineSpacingMultiple: 1.15 });
  });

  const rules = [
    ["Report the distribution", "At minimum: median, 95th, 99th, and maximum — together with how many samples produced them."],
    ["Percentiles do not average", "You cannot take the mean of per-machine p99 values and call it the system p99. Aggregate the raw observations."],
    ["State the load", "Tail latency is far more load-sensitive than the mean. A percentile without an offered load is not interpretable."],
    ["Run long enough", "A p99.9 estimated from 500 requests rests on roughly one observation. Compute the sample size you need."],
  ];
  const rw = 2.87, rg = 0.25;
  rules.forEach((r, i) => {
    const x = ML + i * (rw + rg);
    txt(s, r[0], { x: x, y: 5.34, w: rw, h: 0.46, fontFace: HF, fontSize: 12, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, r[1], { x: x, y: 5.86, w: rw, h: 0.94, fontFace: BF, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  10 — Workload characterisation                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Metrics and Workloads",
    "Workload Characterisation",
    "Four kinds of load, ordered roughly from most realistic to most controllable. You cannot have both.", true);

  const items = [
    { t: "Real workload", c: BLUE, q: "The actual production load, measured in place.",
      ex: "Maximally representative, entirely unrepeatable, and usually unavailable to anyone else. Excellent for validation; useless for a controlled comparison." },
    { t: "Trace-driven", c: RUST, q: "A recorded log of real requests, replayed against the system.",
      ex: "Repeatable and realistic. But a trace captures one period and one deployment, and replaying it loses the feedback between system speed and user behaviour." },
    { t: "Benchmark suite", c: GOLDD, q: "Standard programs with published run rules.",
      ex: "SPEC CPU, TPC-C, YCSB, DaCapo. Comparable across papers and across years — and, per Lecture 3, steadily eroded by Goodhart's law." },
    { t: "Synthetic", c: INK, q: "Generated load with tunable parameters, or a microbenchmark isolating one operation.",
      ex: "Ideal for explaining a mechanism and for sweeping a parameter. Dangerous as evidence about whole-system performance, which it systematically distorts." },
  ];
  const cw = 2.87, gp = 0.25;
  items.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "KIND " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "THE TRADE", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "Whichever you choose, state how the workload relates to the population you are claiming about. That single sentence is Lecture 4's external-validity argument, in performance clothing.");
  footer(s);
}

/* ================================================================== */
/*  11 — Experimental design                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Measuring Properly",
    "Experimental Design: Factors and Levels",
    "With k factors at l levels each, a full sweep costs l^k runs. These are the standard ways of spending fewer without learning less than you need.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Design", w: 2.5 },
      { label: "What it does", w: 4.3 },
      { label: "Runs", w: 1.55 },
      { label: "When to use it", w: 3.88 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [RUST, GOLD, BLUE, BLUE, INK],
    rows: [
      ["One factor at a time", "Vary a single input; hold everything else fixed.", "k(l−1)+1",
       "Only when factors are known not to interact — which is rarely established."],
      ["Full factorial", "Every combination of every level of every factor.", "l^k",
       "Few factors, few levels. Reveals every interaction, at a cost that explodes."],
      ["2^k factorial", "Every factor at just two levels, low and high.", "2^k",
       "Screening: finding cheaply which of many factors actually matter."],
      ["Fractional factorial", "A carefully chosen subset of the full design.", "2^(k−p)",
       "Many factors, accepting that high-order interactions become confounded."],
      ["Randomised replication", "Repeat runs, in randomised order.", "× r",
       "Always. Randomising order converts systematic drift into random error."],
    ],
  });

  closer(s, "One-factor-at-a-time is the default in student work and the design that cannot detect interactions — which, in computer systems, is precisely where the interesting behaviour lives.");
  footer(s);
}

/* ================================================================== */
/*  12 — Instruments                                                   */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Measuring Properly",
    "Instruments: What You Can Actually Measure",
    "Four instruments, answering different questions. The first tells you how slow; the others tell you why.", true);

  const items = [
    { t: "Wall-clock timers", c: BLUE, q: "The ground truth for end-to-end latency and throughput.",
      ex: "Check the clock's resolution, and never time an interval shorter than the timer call's own overhead. Prefer a monotonic clock over wall time." },
    { t: "Hardware counters", c: RUST, q: "Cycles, instructions, cache misses, branch mispredictions — via perf or PAPI.",
      ex: "These explain why something is slow. Beware counter multiplexing: request more events than the hardware has registers and each is sampled part-time." },
    { t: "Sampling profilers", c: GOLDD, q: "Periodically interrupt execution and record the call stack.",
      ex: "Cheap, and attributes cost to code. Beware skid and safepoint bias: a sample lands where the interrupt was taken, not necessarily where the time went." },
    { t: "Tracing", c: INK, q: "Record every event of interest, with timestamps and context.",
      ex: "Exact attribution, paid for with overhead that perturbs the very thing being measured. The heavier the tracing, the less it describes the untraced system." },
  ];
  const cw = 2.87, gp = 0.25;
  items.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "INSTRUMENT " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "THE CATCH", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "Every instrument perturbs what it measures. Report the overhead of your apparatus, or demonstrate that it is negligible relative to the effect you are claiming.");
  footer(s);
}

/* ================================================================== */
/*  13 — Sources of measurement error                                  */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Measuring Properly",
    "Sources of Measurement Error",
    "Six effects that routinely produce swings larger than the speed-ups being reported. Control each, or state that you did not.", true);

  const errs = [
    ["Warm-up and JIT", BLUE, "Managed runtimes compile, deoptimise and recompile. Steady state can take thousands of iterations, and “startup performance” and “steady-state performance” are two separate claims."],
    ["Frequency scaling", BLUE, "Turbo and DVFS mean identical code runs at different clock rates depending on thermal and power history. Pin the frequency, or report honestly that you did not."],
    ["Memory layout bias", RUST, "Link order, environment size, and address-space randomisation shift code and data alignment. Mytkowicz et al. showed this alone can produce swings exceeding many published speed-ups."],
    ["Co-tenancy", RUST, "Other processes, other containers, and noisy neighbours on the same cloud host. Report the isolation you actually had — shared hardware makes three significant figures fictional."],
    ["NUMA and affinity", GOLDD, "Which core a thread lands on, and which memory node its data sits on, changes results substantially and non-deterministically unless threads are pinned."],
    ["Cache and predictor state", GOLDD, "Repeated runs on the same input warm caches and branch predictors that a cold production system would not have. Measure the state you intend to claim about."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  errs.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, a[0], { x: x + 0.28, y: cy + 0.24, w: cw - 0.56, h: 0.4, fontFace: HF, fontSize: 14.5, bold: true, color: a[1], valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, a[2], { x: x + 0.28, y: cy + 0.72, w: cw - 0.56, h: 1.14, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  14 — Reporting a performance result                                */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Measuring Properly",
    "Reporting a Performance Result",
    "Five elements. Together they are what makes a number reproducible, and therefore contestable.", true);

  const parts = [
    ["The configuration", "Hardware, OS, compiler and flags, runtime versions, dataset, and the number of repetitions — enough that a stranger could rebuild it.", BLUE],
    ["The distribution", "Median and spread, or percentiles with the sample count. Never a bare mean, and never a single run.", BLUE],
    ["The baseline", "What you compared against, which version, and exactly how you tuned it. An untuned baseline invalidates a comparison rather than merely weakening it.", GOLDD],
    ["The statistic", "Which mean you took and why that one; which test you used and why it suits this data's actual distribution.", RUST],
    ["The scope", "The workloads, load levels and platforms over which the claim holds — and a plain statement that outside them it does not.", RUST],
  ];
  const bw = 2.23, bg = 0.27;
  parts.forEach((p, i) => {
    const x = ML + i * (bw + bg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: bw, h: 2.5, rectRadius: 0.06, fill: { color: i > 2 ? "F6EFE4" : TINT }, line: { type: "none" } });
    numDot(s, x + 0.2, y + 0.22, 0.32, i + 1, p[2]);
    txt(s, p[0], { x: x + 0.2, y: y + 0.66, w: bw - 0.4, h: 0.34, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "middle" });
    txt(s, p[1], { x: x + 0.2, y: y + 1.06, w: bw - 0.4, h: 1.28, fontFace: BF, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.16 });
  });

  const pw = 5.99, pg = 0.25;
  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "THE TEST TO APPLY BEFORE SUBMITTING", { x: ML + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Could a competent stranger, holding only your paper and your artifact, obtain a number close to yours? If any of the five elements is missing, the honest answer is no — and Lecture 4's badge terminology gives you the vocabulary to say so.", {
    x: ML + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  s.addShape(pres.ShapeType.roundRect, { x: ML + pw + pg, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: "EEF3F9" }, line: { type: "none" } });
  txt(s, "ON SIGNIFICANT FIGURES", { x: ML + pw + pg + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "Report no more precision than your measurement supports. Four significant figures from runs whose variance is five per cent is a claim about the formatting of your spreadsheet, not about the system.", {
    x: ML + pw + pg + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  footer(s);
}

/* ================================================================== */
/*  15 — Speedup, efficiency, scalability                              */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Scaling and Bottlenecks",
    "Speedup, Efficiency, and Scalability",
    "Three definitions that look elementary and are misreported constantly — almost always through an unstated choice of baseline.", true);

  const defs = [
    { n: "Definition 1", t: "Speedup", f: "S(p)  =  T(1) / T(p)", c: GOLDD,
      b: "How much faster the parallel version is than the sequential one.",
      ex: "Everything depends on what T(1) means: the best known sequential algorithm, or your own parallel code run on one core? Only the first is an honest baseline." },
    { n: "Definition 2", t: "Efficiency", f: "E(p)  =  S(p) / p", c: BLUE,
      b: "The fraction of ideal speedup that p processors actually delivered.",
      ex: "Falling efficiency is the normal case, and it is the interesting quantity. Plotting only speedup lets a badly scaling system still look like a rising line." },
    { n: "Definition 3", t: "Strong vs weak scaling", f: "fixed problem  vs  fixed work per p", c: RUST,
      b: "Strong scaling holds the total problem fixed; weak scaling grows it with p.",
      ex: "They answer different questions and produce different curves. Saying only “it scales” without saying which is not a claim a reader can evaluate." },
  ];
  const cw = 3.83, gp = 0.37;
  defs.forEach((l, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, l.n.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: l.c, charSpacing: 1.2, valign: "middle" });
    txt(s, l.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.5, fontFace: HF, fontSize: 17, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.02 });
    txt(s, l.f, { x: x + 0.28, y: y + 1.06, w: cw - 0.56, h: 0.32, fontFace: MF, fontSize: 11, color: l.c, valign: "middle" });
    txt(s, l.b, { x: x + 0.28, y: y + 1.48, w: cw - 0.56, h: 0.8, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, l.ex, { x: x + 0.28, y: y + 2.34, w: cw - 0.56, h: 1.02, fontFace: BF, fontSize: 10, italic: true, color: l.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 6.02, w: CW, h: 0.72, rectRadius: 0.05, fill: { color: "F8EEEA" }, line: { type: "none" } });
  txt(s, "Speedup measured against a deliberately poor sequential implementation is the performance world's strawman baseline — Lecture 4's failure mode, with a rising graph attached to it.", {
    x: ML + 0.32, y: 6.02, w: CW - 0.64, h: 0.72, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle",
  });

  footer(s);
}

/* ================================================================== */
/*  16 — Worked: Amdahl                                                */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Scaling and Bottlenecks",
    "Worked Example: What Amdahl's Law Forbids");

  txt(s, [
    { text: "Question:  ", options: { bold: true, color: INK } },
    { text: "“Five per cent of this program is inherently serial. How much can parallel hardware possibly help?”", options: { color: BODY } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 2.0, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "THE MODEL", { x: ML + 0.3, y: y + 0.36, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "  f          serial fraction of the work\n  1 − f      perfectly parallelisable\n  p          number of processors\n\n  S(p)  =  1 / ( f + (1 − f)/p )", {
    x: ML + 0.3, y: y + 0.66, w: 4.0, h: 1.32, fontFace: MF, fontSize: 10.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.26,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.36, w: 4.6, h: 1.66, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "THE PREMISE DOING THE WORK", { x: ML + 0.3, y: y + 2.56, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "A fixed problem size, with a serial fraction that does not change as p grows. Everything the law forbids follows from that one assumption.", {
    x: ML + 0.3, y: y + 2.86, w: 4.0, h: 1.0, fontFace: BF, fontSize: 11, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  txt(s, "This is a Lecture 3 deduction carried out inside a model — and its premise is precisely what Gustafson's reframing attacks on the next slide.", {
    x: ML, y: y + 4.22, w: 4.6, h: 0.9, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["Set up", "Normalise the total sequential time to 1. The serial part costs f no matter how many processors you add; the parallel part costs (1 − f)/p."],
    ["Compute a case", "With f = 0.05 and p = 16:  S = 1 / (0.05 + 0.95/16) = 1 / 0.1094 = 9.14. Sixteen processors deliver a speedup of nine — an efficiency of 57%."],
    ["Take the limit", "With the same f = 0.05 and unbounded p, the second term vanishes and S → 1/f = 20. No quantity of hardware, ever, gets past twenty."],
    ["Read what it forbids", "The bound applies to this fixed problem. It says nothing about a larger problem, and nothing about whether f itself can be reduced — which is usually where the engineering effort actually belongs."],
  ];
  let sy = y + 0.12;
  steps.forEach((st, i) => {
    numDot(s, 5.5, sy + 0.02, 0.34, i + 1, i < 2 ? BLUE : GOLDD);
    txt(s, st[0], { x: 6.06, y: sy, w: 6.72, h: 0.3, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "top" });
    txt(s, st[1], { x: 6.06, y: sy + 0.34, w: 6.72, h: 0.8, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    sy += 1.14;
  });

  txt(s, "Note the practical reading: at f = 0.05 the useful range of p is small, so “we ran it on 256 cores” is only impressive once the serial fraction has been reported alongside it.", {
    x: 6.06, y: sy + 0.06, w: 6.72, h: 0.62, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  17 — Gustafson and the USL                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Scaling and Bottlenecks",
    "Gustafson's Law and the Universal Scalability Law",
    "Two responses to Amdahl. The first changes the premise; the second adds the mechanisms Amdahl leaves out.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "GUSTAFSON, 1988", c: GOLDD, fill: "F6EFE4",
      form: "S(p)  =  p − f·(p − 1)",
      note: "Hold the running time fixed rather than the problem. If the parallel portion grows with the machine — as it does whenever people buy bigger hardware to solve bigger problems — scaled speedup is linear in p.",
      verdict: "Same arithmetic, different premise, opposite conclusion. A clean illustration of Lecture 3's point that a theorem's content sits in its assumptions." },
    { tag: "GUNTHER'S UNIVERSAL SCALABILITY LAW", c: BLUE, fill: "EEF3F9",
      form: "C(p) = p / (1 + α(p−1) + βp(p−1))",
      note: "Adds two effects Amdahl omits: α is contention — queueing for a shared resource — and β is coherency, the cost of keeping p workers' data consistent. When β > 0 the throughput curve rises, peaks, and then falls.",
      verdict: "Which is what real systems do, and what neither Amdahl nor Gustafson can express at all." },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 3.16, rectRadius: 0.05, fill: { color: p.fill }, line: { type: "none" } });
    txt(s, p.tag, { x: x + 0.32, y: y + 0.24, w: pw - 0.64, h: 0.26, fontFace: BF, fontSize: 9.5, bold: true, color: p.c, charSpacing: 1.4, valign: "middle" });
    txt(s, p.form, { x: x + 0.32, y: y + 0.62, w: pw - 0.64, h: 0.4, fontFace: MF, fontSize: 13, color: INK, valign: "middle" });
    txt(s, p.note, { x: x + 0.32, y: y + 1.16, w: pw - 0.64, h: 1.4, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, p.verdict, { x: x + 0.32, y: y + 2.6, w: pw - 0.64, h: 0.48, fontFace: BF, fontSize: 10, italic: true, color: p.c, valign: "top", lineSpacingMultiple: 1.15 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 5.62, w: CW, h: 1.06, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "The USL's practical value: fit α and β to a handful of measured load points, and it predicts where the throughput curve turns over — the point past which adding capacity actively makes the system slower. That is a prediction, made from measurement, that can then be checked. Lecture 5's whole discipline, applied to a scaling claim.", {
    x: ML + 0.32, y: 5.62, w: CW - 0.64, h: 1.06, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  18 — Bottleneck analysis                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Scaling and Bottlenecks",
    "Bottleneck Analysis with Operational Bounds",
    "Lecture 5's operational laws again, now used to compute a ceiling before running a single experiment. No distributional assumptions are needed.");

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y, w: 7.7, h: 1.5, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "THE QUANTITIES, AND THE TWO BOUNDS", { x: ML + 0.32, y: y + 0.2, w: 7.06, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "  Di = service demand at device i     D = sum of all Di     Dmax = the largest Di\n  N  = number of users                Z = think time\n\n  X(N)  ≤  min( N / (D + Z),  1 / Dmax )            R(N)  ≥  max( D,  N·Dmax − Z )", {
    x: ML + 0.32, y: y + 0.5, w: 7.06, h: 0.92, fontFace: MF, fontSize: 10,
    color: INK, valign: "top", lineSpacingMultiple: 1.26,
  });

  const pts = [
    ["The bottleneck is the device with the largest service demand.", "Not the busiest-looking one, and not the one that is easiest to optimise. Dmax alone sets the asymptotic throughput ceiling, so improving any other device cannot raise it at all."],
    ["The bounds are free, and they come first.", "They need only the service demands, which a single light-load measurement gives you. You can compute the ceiling before designing the experiment — and then find out whether the system reaches it."],
    ["A gap between bound and measurement is diagnostic.", "If measured throughput falls well short of 1/Dmax, something outside the model — contention, coherency, a software serialisation — is costing you."],
  ];
  let py = y + 1.78;
  pts.forEach((p) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: py + 0.09, w: 0.12, h: 0.12, fill: { color: GOLD }, line: { type: "none" } });
    txt(s, p[0], { x: ML + 0.34, y: py, w: 7.36, h: 0.28, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "top" });
    txt(s, p[1], { x: ML + 0.34, y: py + 0.32, w: 7.36, h: 0.8, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    py += 1.12;
  });

  s.addShape(pres.ShapeType.roundRect, { x: 8.55, y: y, w: 4.23, h: 4.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "WHY THIS IS METHODOLOGY", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "A bound computed in advance turns a measurement into a test.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 1.0, fontFace: HF, fontSize: 15.5, color: INK,
    valign: "top", lineSpacingMultiple: 1.18,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 1.9, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Without it, a throughput number is just a number: nothing could have contradicted it, so nothing was learned by obtaining it.\n\nWith it, the measurement either confirms the bound, or reveals a mechanism the operational model does not contain. Either outcome is informative — which, by Lecture 1's standard, is what makes it an experiment at all.", {
    x: 8.85, y: y + 2.1, w: 3.63, h: 2.2, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  19 — Where the model meets the measurement                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Scaling and Bottlenecks",
    "Where the Model Meets the Measurement",
    "Lecture 5 built models that predict performance. This session measures it. Comparing the two is the most informative thing you can do with either.", true);

  const three = [
    { n: "Outcome 1", t: "They agree", c: BLUE,
      b: "The model is validated within the range you measured — and only within it. You may now use it to interpolate with confidence, and to extrapolate with stated caution.",
      ex: "This is the weakest of the three outcomes intellectually, and the most useful practically: you have a cheap predictor you can trust." },
    { n: "Outcome 2", t: "They disagree", c: RUST,
      b: "Some mechanism the model omitted is dominating. Locating it is a finding, not a failure — and it is frequently the most interesting sentence in the paper.",
      ex: "Contention, coherency, cache behaviour, a software serialisation. Lecture 5 called this structural error; here it has a name and a magnitude." },
    { n: "Outcome 3", t: "The model was fitted after", c: GOLDD,
      b: "If the model's parameters were tuned once the measurements were in, nothing has been validated. The model was calibrated, and calibration proves only that the fit succeeded.",
      ex: "Lecture 5's central distinction and Lecture 3's HARKing, arriving together in the same paragraph." },
  ];
  const cw = 3.83, gp = 0.37;
  three.forEach((l, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, l.n.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: l.c, charSpacing: 1.2, valign: "middle" });
    txt(s, l.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.64, fontFace: HF, fontSize: 17, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.04 });
    txt(s, l.b, { x: x + 0.28, y: y + 1.24, w: cw - 0.56, h: 1.36, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, l.ex, { x: x + 0.28, y: y + 2.66, w: cw - 0.56, h: 0.7, fontFace: BF, fontSize: 10, italic: true, color: l.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 6.02, w: CW, h: 0.72, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "Predict first. Then measure. Then explain the gap. That sequence is what turns a table of benchmark numbers into a contribution — and it is where all five earlier sessions of this unit converge.", {
    x: ML + 0.32, y: 6.02, w: CW - 0.64, h: 0.72, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle",
  });

  footer(s);
}

/* ================================================================== */
/*  20 — Matching evaluation to the claim                              */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Matching Evaluation to the Claim",
    "Find the claim you intend to make, then read across. The last column is the objection to pre-empt.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "The claim you want to make", w: 3.5 },
      { label: "Technique", w: 2.5 },
      { label: "What to report", w: 3.2 },
      { label: "The objection to pre-empt", w: 3.03 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [RUST, BLUE, GOLD, GOLD, INK],
    rows: [
      ["“This is faster on workload W”", "Measurement", "Distribution, baseline, full configuration", "Was the baseline tuned, and is W representative?"],
      ["“This scales to p processors”", "Measurement + scaling model", "Speedup and efficiency curves, with T(1) defined", "Which T(1)? And strong or weak scaling?"],
      ["“This handles ten times today's load”", "Analytical model or simulation", "Predicted curve, plus validation at current load", "Does the model hold outside the measured range?"],
      ["“Component X is the bottleneck”", "Profiling + operational bounds", "Service demands, and the effect of removing X", "Would fixing X actually move the ceiling?"],
      ["“This uses less energy per request”", "Measurement with power instrumentation", "Joules per operation at matched throughput", "Was throughput held equal, or quietly traded away?"],
    ],
  });

  closer(s, "Every row pairs a claim with the only kind of evidence that can settle it — the same discipline as Lecture 2's triangulation table, narrowed to performance.");
  footer(s);
}

/* ================================================================== */
/*  21 — How performance claims fail                                   */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "How Performance Claims Fail",
    "Six recurring faults. None requires dishonesty — each is an ordinary choice, made without stating it.", true);

  const f = [
    ["The arithmetic mean of rates", RUST, "A summary statistic that can, and demonstrably does, name the losing system as the winner. Slide 8 was not a contrived case."],
    ["The bare mean latency", RUST, "A single number summarising a skewed distribution, concealing precisely the tail that determines what users actually experience."],
    ["The unstated T(1)", GOLDD, "Speedup reported against the authors' own single-threaded code rather than the best known sequential algorithm for the problem."],
    ["The unmatched configuration", GOLDD, "Different compilers, flags, runtimes or hardware between the proposed system and its baseline — so the comparison measures the setup."],
    ["Measurement without isolation", BLUE, "Numbers collected on a shared or thermally throttled machine, then reported to three significant figures as though the noise were not there."],
    ["Extrapolating the curve", BLUE, "Measuring at twenty per cent load and asserting behaviour at ninety, where queueing makes the relationship sharply non-linear."],
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
/*  22 — Run rules                                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Run Rules: What Disciplined Benchmarking Looks Like",
    "What SPEC and TPC actually require. Each rule exists because a specific defect was found the expensive way.", true);

  const rules = [
    ["Full disclosure", "A published configuration report: hardware, software, tuning, and every compiler flag. Results submitted without it are simply not accepted.", BLUE],
    ["Run rules", "Which optimisations are permitted, how many iterations must run, and which results may be reported — preventing tuning that helps only the benchmark.", BLUE],
    ["Repeated measurement", "A required minimum number of runs and a defined statistic over them, so that a single lucky run can never be reported on its own.", GOLDD],
    ["Audit and review", "TPC results are independently audited before publication; SPEC results are reviewed by the committee before they are accepted.", RUST],
    ["Price and power", "TPC requires a total cost of ownership figure; SPECpower requires energy measured at graduated load. Performance without cost is half a comparison.", RUST],
  ];
  const bw = 2.23, bg = 0.27;
  rules.forEach((p, i) => {
    const x = ML + i * (bw + bg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: bw, h: 2.5, rectRadius: 0.06, fill: { color: i > 2 ? "F6EFE4" : TINT }, line: { type: "none" } });
    numDot(s, x + 0.2, y + 0.22, 0.32, i + 1, p[2]);
    txt(s, p[0], { x: x + 0.2, y: y + 0.66, w: bw - 0.4, h: 0.34, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "middle" });
    txt(s, p[1], { x: x + 0.2, y: y + 1.06, w: bw - 0.4, h: 1.28, fontFace: BF, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.16 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.9, w: CW, h: 1.16, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "WHAT THIS MEANS FOR A RESEARCH PAPER", { x: ML + 0.32, y: y + 3.1, w: 6, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "You are not obliged to follow SPEC's rules in a paper — those bodies are certifying products, not publishing research. You are obliged to make a comparable disclosure, because every one of these rules encodes a defect the field discovered by being misled. Adopting them costs an appendix and buys a result that survives scrutiny.", {
    x: ML + 0.32, y: y + 3.38, w: CW - 0.64, h: 0.6, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  footer(s);
}

/* ================================================================== */
/*  23 — Checklist                                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "A Checklist for Your Own Evaluation");

  const items = [
    ["Name the five dependencies.", "System, workload, platform, metric, summary statistic. If any is missing from the sentence stating your result, the number cannot be reproduced or contested."],
    ["Justify your mean.", "Arithmetic for times, harmonic for rates, geometric for normalised ratios, median for skewed data. Say which you used, and why that one."],
    ["Report a distribution, not a point.", "Median and spread, or percentiles with the sample count — and the offered load at which they were measured."],
    ["Tune the baseline as hard as your own system.", "And describe what you did to it. This is the single most common reason a performance result does not survive review."],
    ["Control what you can; report what you cannot.", "Frequency scaling, memory layout, co-tenancy, NUMA placement, warm-up. Silence here reads as an uncontrolled experiment, because it is one."],
    ["Predict before you measure.", "Compute a bound or a model prediction first, then measure, then explain the gap. That gap is usually the most interesting result you have."],
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
    "Find a performance claim in a recent paper from your area. Which of the five dependencies does it actually state, and which must you guess in order to interpret the number?",
    "Take a speedup graph you have seen. What is T(1) in it — and would using the best known sequential algorithm as the baseline change the shape of the curve, or only its height?",
    "A service reports a p99 latency of 40 ms, and a user request fans out to fifty such services. What is the user likely to experience, and why is the answer not 40 ms?",
    "Pick a system you can actually run. Estimate its service demands, compute the asymptotic throughput bound, then measure. Where does the measurement fall short of the bound, and what does that gap tell you?",
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
  const y = head(s, "Recap · Unit II", "Key Takeaways");

  const t = [
    "Performance is not a property of a system. It is a property of a system, on a workload, on a platform, under a metric, summarised by a statistic — and a claim naming fewer than five of those is under-specified.",
    "The summary statistic is a methodological choice with consequences: the arithmetic mean of rates can name the losing system as the winner, and a bare mean conceals the tail that users actually experience.",
    "Measurement is the most persuasive technique and the easiest to get wrong. Warm-up, frequency scaling, memory layout and co-tenancy routinely produce swings larger than the speed-ups being reported.",
    "Scaling laws are deductions inside models. Amdahl fixes the problem, Gustafson fixes the time, and the Universal Scalability Law adds contention and coherency so that throughput can peak and then fall. Each conclusion follows from its premise.",
    "The strongest evaluations predict first and measure second, then explain the gap — which is where this unit's six sessions converge: an argument (L1), proved in a mode (L2), by an inference (L3), within a tradition (L4), through a model (L5), against a number (L6).",
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
    ["Jain, R.", "The Art of Computer Systems Performance Analysis. Wiley, 1991. — the standard text, carried through Lectures 2, 5 and 6."],
    ["Lilja, D. J.", "Measuring Computer Performance: A Practitioner's Guide. Cambridge University Press, 2000."],
    ["Lazowska, E. D. et al.", "Quantitative System Performance. Prentice-Hall, 1984. — operational bounds and bottleneck analysis."],
    ["Amdahl, G. M.", "“Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities.” AFIPS, 1967."],
    ["Gustafson, J. L.", "“Reevaluating Amdahl's Law.” Communications of the ACM, 1988."],
    ["Gunther, N. J.", "Guerrilla Capacity Planning. Springer, 2007. — the Universal Scalability Law."],
    ["Mytkowicz, T., Diwan, A., Hauswirth, M. & Sweeney, P. F.", "“Producing Wrong Data Without Doing Anything Obviously Wrong!” ASPLOS, 2009."],
    ["Georges, A., Buytaert, D. & Eeckhout, L.", "“Statistically Rigorous Java Performance Evaluation.” OOPSLA, 2007."],
    ["Dean, J. & Barroso, L. A.", "“The Tail at Scale.” Communications of the ACM, 2013."],
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
