const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Research Methodology in CS";
pres.title = "Mathematical Modelling in Computing Science";
pres.subject = "Unit II, Lecture 5 - Mathematical Modelling";

/* ------------------------------------------------------------------ */
/*  Design system — identical to Unit II Lectures 1–4                   */
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

const RUNNING = "MATHEMATICAL MODELLING IN CS";
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
  txt(s, "Mathematical Modelling\nin Computing Science", {
    x: 0.84, y: 2.02, w: 9.6, h: 1.72, fontFace: HF, fontSize: 41, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.06,
  });
  txt(s, "Abstraction, Derivation, and Validation", {
    x: 0.88, y: 4.12, w: 9, h: 0.36, fontFace: HF, fontSize: 16, italic: true,
    color: "E4DFFA", valign: "middle",
  });
  s.addShape(pres.ShapeType.line, {
    x: 0.88, y: 4.72, w: 2.6, h: 0, line: { color: "6E688F", width: 1 },
  });
  txt(s, "How to reason quantitatively about a system you have not built, or cannot afford to measure —\nand how to establish that the reasoning is worth anything.", {
    x: 0.88, y: 5.0, w: 8.4, h: 0.72, fontFace: BF, fontSize: 11.5,
    color: DKBODY, valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Research Methodology in CS   ·   Unit II · Lecture 5", {
    x: 0.88, y: 6.34, w: 7, h: 0.26, fontFace: BF, fontSize: 9,
    color: DKMUT, valign: "middle",
  });
  N += 1;
}

/* ================================================================== */
/*  2 — Why build a model at all                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What a Model Is",
    "Why Build a Model at All?",
    "A mathematical model is the bridge between Lecture 3's theoretical models and Lecture 4's measurements: it lets you reason quantitatively about a system that does not yet exist.");

  const pts = [
    "Models answer questions measurement cannot. What happens at ten times the load? Where would the bottleneck move under a different arrival pattern? What is the optimum, rather than merely what this configuration happened to achieve?",
    "A model is a deliberate simplification built for a purpose. Its worth is not how faithful it is, but how useful its predictions are within a stated scope — the same fidelity-against-tractability trade Lecture 3 named for models of computation.",
    "In computing science the thing modelled is almost always a resource under contention: queues, caches, links, schedulers, and the workloads driving them. That is why queueing and Markov models dominate the field's toolkit.",
    "The mathematics is the easy half. The hard half is deciding what to leave out, saying so, and then establishing that what remains still predicts anything.",
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
  txt(s, "THE MODELLER'S BARGAIN", {
    x: 8.58, y: y + 0.22, w: 3.9, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true,
    color: GOLDD, charSpacing: 1.3, valign: "middle",
  });
  txt(s, "Every simplification buys tractability and spends fidelity. A model is honest when it says what it spent.", {
    x: 8.58, y: y + 0.62, w: 3.9, h: 1.1, fontFace: HF, fontSize: 14.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.2,
  });
  txt(s, "Which is why the question is never “is this model true?”. It is “is this model adequate for the question I am asking, over the range I am asking it in?”", {
    x: 8.58, y: y + 1.86, w: 3.9, h: 1.3, fontFace: BF, fontSize: 11,
    color: BODY, valign: "top", lineSpacingMultiple: 1.22,
  });
  s.addShape(pres.ShapeType.line, { x: 8.58, y: y + 3.4, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Adequacy is a claim about scope — so scope must be reported.", {
    x: 8.58, y: y + 3.58, w: 3.9, h: 0.5, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  3 — Anatomy of a model                                             */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What a Model Is",
    "The Anatomy of a Model",
    "Six components. Papers routinely publish the first four and omit the last two — which are precisely the ones a reader needs in order to reuse or challenge the model.", true);

  const parts = [
    ["Entities", BLUE, "The things the model contains: jobs, servers, packets, nodes, processes, users. Choosing them is already an act of abstraction."],
    ["State variables", BLUE, "What changes over time: queue length, cache contents, number in system, remaining work. The state is what the model must track to keep predicting."],
    ["Parameters", BLUE, "Quantities fixed within a run but varied across experiments: arrival rate λ, service rate μ, buffer size, number of replicas."],
    ["Relations", GOLDD, "The equations, transitions, or constraints tying entities, state, and parameters together. This is the model proper — everything else is scaffolding around it."],
    ["Assumptions", RUST, "What is asserted about the world so that the relations hold: independence, stationarity, exponentiality, no failures. These are the premises, in Lecture 3's sense."],
    ["Scope", RUST, "The range of conditions over which the model claims to say anything at all — load levels, system sizes, workload types, time horizons."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  parts.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    numDot(s, x + 0.28, cy + 0.24, 0.32, i + 1, a[1]);
    txt(s, a[0], { x: x + 0.7, y: cy + 0.2, w: cw - 0.98, h: 0.42, fontFace: HF, fontSize: 14.5, bold: true, color: INK, valign: "middle" });
    txt(s, a[2], { x: x + 0.28, y: cy + 0.74, w: cw - 0.56, h: 1.12, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  4 — Classes of model                                               */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What a Model Is",
    "Classes of Model",
    "Five choices, made explicitly or by default, that determine what kind of object you have built.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "The choice", w: 1.75 },
      { label: "One pole", w: 3.5 },
      { label: "The other pole", w: 3.4 },
      { label: "How to decide", w: 3.58 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [GOLD, BLUE, GOLD, RUST, INK],
    rows: [
      ["Determinism", "Deterministic: same input, same output.", "Stochastic: randomness is part of the model; outputs are distributions.",
       "Stochastic whenever variability is what you are studying — averages hide the tail."],
      ["Time", "Static: a snapshot, with no evolution.", "Dynamic: state evolves; transient and steady-state behaviour differ.",
       "Dynamic if warm-up, bursts, or convergence are part of the question."],
      ["State space", "Discrete: countable states and events.", "Continuous: real-valued state, differential or fluid equations.",
       "Discrete for modest systems; fluid approximations for very large ones."],
      ["Purpose", "Descriptive: reproduces observed behaviour.", "Prescriptive: recommends a decision — optimisation or control.",
       "Say which. A descriptive model used to justify a decision is being misused."],
      ["Derivation", "Mechanistic: built from known structure.", "Empirical: fitted to data, with no structural claim.",
       "Mechanistic models may extrapolate. Empirical ones usually must not."],
    ],
  });

  closer(s, "The last row is the one most often left implicit — and the one that decides whether you are allowed to use the model outside the range you fitted it on.");
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
  txt(s, "From what a model is\nto how one is actually built", {
    x: 0.84, y: 2.62, w: 10.4, h: 1.4, fontFace: HF, fontSize: 32, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.1,
  });
  txt(s, "The mathematics is rarely the difficult part. The difficult part is deciding what to leave out — and then finding out whether what remains still predicts anything.", {
    x: 0.88, y: 4.24, w: 9.2, h: 0.72, fontFace: HF, fontSize: 14, italic: true,
    color: "E4DFFA", valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Next: the modelling cycle, abstraction, the model-class toolkit, and a derivation carried out in full.", {
    x: 0.88, y: 5.28, w: 9.2, h: 0.3, fontFace: BF, fontSize: 11,
    color: GOLD, valign: "middle",
  });
  footer(s, true);
}

/* ================================================================== */
/*  6 — The modelling cycle                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Building a Model",
    "The Modelling Cycle",
    "Five stages, and a loop. Compare Lecture 4's algorithm-engineering cycle: the same structure, because it is the same idea.", true);

  const steps = [
    ["Abstract", "Decide what is inside the system and what is outside. The question you are asking determines this, and nothing else does.", GOLDD],
    ["Formalise", "Express entities, state, and relations mathematically. Assumptions become explicit at this stage or they never do.", BLUE],
    ["Parameterise", "Estimate parameters from measurement, literature, or specification — recording the source and uncertainty of each.", BLUE],
    ["Solve", "Derive closed-form results where the model class permits it, and simulate where it does not.", RUST],
    ["Validate", "Compare predictions against data the model was not fitted to. Then return to stage one with what you learned.", RUST],
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
  txt(s, "←———————————  a failed validation sends you back to the abstraction, not just to the parameters  ———————————", {
    x: ML, y: 5.0, w: CW, h: 0.3, align: "center", valign: "middle",
    fontFace: BF, fontSize: 10, italic: true, color: GOLDD,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: ML, y: 5.46, w: CW, h: 0.9, rectRadius: 0.05,
    fill: { color: TINT }, line: { type: "none" },
  });
  txt(s, "The loop is the point. A model that was never revised after contact with data has not been validated — it has merely been published. And note where a failure sends you: if the structure is wrong, no amount of re-fitting the parameters will repair it, though it will usually hide it.", {
    x: ML + 0.32, y: 5.46, w: CW - 0.64, h: 0.9, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  7 — Abstraction                                                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Building a Model",
    "Abstraction: Deciding What to Leave Out",
    "The least teachable stage, and the one that decides whether everything downstream is worth doing.");

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y, w: 6.4, h: 1.24, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "THE RULE THAT GOVERNS EVERYTHING ELSE", { x: ML + 0.32, y: y + 0.2, w: 5.76, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "There is no such thing as a model of a system.\nThere is only a model of a system, for a question.", {
    x: ML + 0.32, y: y + 0.5, w: 5.76, h: 0.62, fontFace: HF, fontSize: 15, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  const ex = [
    ["“Will the queue stay stable?”", "You need λ and μ, and essentially nothing else. Service-time distribution, scheduling policy and buffer size are all irrelevant to that one question."],
    ["“What is the 99th-percentile latency?”", "Now the service-time distribution is the whole answer, and the mean is nearly useless. A different question has made a discarded detail essential."],
    ["“Will this deployment fit in memory?”", "The queueing model is irrelevant entirely. A different question calls for a different model, not a more detailed version of this one."],
  ];
  let ey = y + 1.62;
  ex.forEach((e) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: ey + 0.09, w: 0.12, h: 0.12, fill: { color: BLUE }, line: { type: "none" } });
    txt(s, e[0], { x: ML + 0.34, y: ey, w: 6.06, h: 0.28, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "top" });
    txt(s, e[1], { x: ML + 0.34, y: ey + 0.32, w: 6.06, h: 0.9, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    ey += 1.22;
  });

  const rules = [
    ["Include what the question is sensitive to.", "Everything else is decoration, and decoration costs tractability without buying accuracy where it matters."],
    ["Prefer the simplest model that still discriminates.", "If two candidate answers give the same prediction, the model cannot help you choose between them."],
    ["Add detail only when a validation failure demands it.", "Pre-emptive complexity produces models nobody can solve, parameterise, or check. Let the data ask for each addition."],
    ["Record every omission.", "An omission you cannot name is an assumption you cannot check — and it will be the one a reviewer finds."],
  ];
  s.addShape(pres.ShapeType.roundRect, { x: 7.3, y: y, w: 5.48, h: 4.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "FOUR WORKING RULES", { x: 7.62, y: y + 0.28, w: 4.84, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  let ry = y + 0.68;
  rules.forEach((r, i) => {
    numDot(s, 7.62, ry + 0.02, 0.3, i + 1, i % 2 === 0 ? BLUE : INK);
    txt(s, r[0], { x: 8.04, y: ry, w: 4.42, h: 0.3, fontFace: HF, fontSize: 12, bold: true, color: INK, valign: "top" });
    txt(s, r[1], { x: 8.04, y: ry + 0.32, w: 4.42, h: 0.6, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.16 });
    ry += 0.96;
  });

  footer(s);
}

/* ================================================================== */
/*  8 — Model-class toolkit                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Building a Model",
    "The Model-Class Toolkit",
    "Eight families that between them cover most quantitative modelling in computing science. Recognising which one a problem admits is most of the work.", true);

  const tools = [
    ["Queueing models", "Jobs, servers, and waiting.", "M/M/1, M/G/1, queueing networks. Response time, utilisation, throughput."],
    ["Markov chains", "Memoryless transitions with fixed rates.", "Reliability, cache behaviour, protocol analysis. Solved by balance equations."],
    ["Graph models", "Structure as vertices and edges.", "Networks, dependencies, citation and social structure. Connectivity, flow, centrality."],
    ["Optimisation models", "Decision variables, objective, constraints.", "LP, ILP, convex programming. Scheduling, placement, allocation."],
    ["Game-theoretic models", "Several agents with conflicting aims.", "Equilibria and mechanism design. Congestion, auctions, incentive-compatible protocols."],
    ["Fluid and differential", "Continuous approximation of large discrete systems.", "Epidemic spread, congestion-control dynamics, large-scale load behaviour."],
    ["Stochastic processes", "Randomness evolving in time, beyond Markov.", "Arrival processes, renewal theory, heavy tails in traffic and file sizes."],
    ["Information-theoretic", "Uncertainty and capacity as measurable quantities.", "Entropy, channel capacity, compression and coding bounds."],
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

  closer(s, "Most real modelling combines them: a queueing network whose service rates come from a measured empirical distribution, optimised over a decision variable, and checked by simulation.");
  footer(s);
}

/* ================================================================== */
/*  9 — Parameters                                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Building a Model",
    "Parameters: Estimation and Calibration",
    "A model with unstated parameter provenance is not reproducible, and a model calibrated on the data used to validate it has not been validated at all.", true);

  const items = [
    { t: "Provenance", c: BLUE, q: "Where did each number actually come from?",
      ex: "Measured on a running system, taken from published literature, read off a specification sheet, or estimated by hand. These are not equally trustworthy — say which for every parameter." },
    { t: "Identifiability", c: RUST, q: "Can the data you hold determine these parameters uniquely?",
      ex: "Two parameters that only ever appear as a product cannot be separated by any quantity of data. Fitting them anyway produces confident numbers that mean nothing." },
    { t: "Calibration ≠ validation", c: GOLDD, q: "Fitting parameters so the model reproduces a dataset proves only that the fit succeeded.",
      ex: "This is Lecture 3's overfitting in modelling dress. Validate on data held back from the fitting, or the exercise is circular." },
    { t: "Uncertainty", c: INK, q: "A parameter estimated from data has a confidence interval.",
      ex: "Propagate it. Report predicted ranges rather than single numbers whenever the inputs were themselves uncertain — otherwise the output's precision is fictional." },
  ];
  const cw = 2.87, gp = 0.25;
  items.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "CONCERN " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "IN PRACTICE", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "A useful test: could a reader rebuild your model from the paper and get your numbers? If any parameter has no stated source, the answer is no.");
  footer(s);
}

/* ================================================================== */
/*  10 — Worked: M/M/1                                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Building a Model",
    "Worked Example: Deriving the M/M/1 Queue");

  txt(s, [
    { text: "Question:  ", options: { bold: true, color: INK } },
    { text: "“For a single server with random arrivals, how does mean response time depend on load?”", options: { color: BODY } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 2.2, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "THE MODEL", { x: ML + 0.3, y: y + 0.36, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "Arrivals:  Poisson, rate λ\nService:  exponential, rate μ, one server\nQueue:  infinite capacity, first-come-first-served\nStability:  ρ = λ/μ  <  1", {
    x: ML + 0.3, y: y + 0.66, w: 4.0, h: 1.5, fontFace: BF, fontSize: 11.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.32,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.56, w: 4.6, h: 1.5, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "WHAT THE ASSUMPTIONS BUY", { x: ML + 0.3, y: y + 2.76, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Memorylessness is what makes the number in system a sufficient state. Without it the chain would have to remember elapsed service times, and no closed form would follow.", {
    x: ML + 0.3, y: y + 3.04, w: 4.0, h: 0.9, fontFace: BF, fontSize: 11, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  txt(s, "Read the result again: as λ approaches μ, response time diverges. The model's most useful output is not a number — it is that shape.", {
    x: ML, y: y + 4.3, w: 4.6, h: 0.9, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["State and transitions", "Let the state be n, the number in system. From state n the chain moves up at rate λ, and for n ≥ 1 down at rate μ. This is a birth–death process."],
    ["Balance equations", "In steady state, flow across the cut between n and n+1 must balance: λ·pₙ = μ·pₙ₊₁. Hence pₙ₊₁ = ρ·pₙ, and so pₙ = p₀·ρ^n."],
    ["Normalise", "Probabilities sum to one: p₀ · Σ ρ^n = p₀ / (1 − ρ) = 1. Therefore p₀ = 1 − ρ, giving pₙ = (1 − ρ)·ρ^n — a geometric distribution."],
    ["Derive the answers", "Mean number in system L = Σ n·pₙ = ρ / (1 − ρ). By Little's Law, mean response time W = L / λ = 1 / (μ − λ)."],
  ];
  let sy = y + 0.12;
  steps.forEach((st, i) => {
    numDot(s, 5.5, sy + 0.02, 0.34, i + 1, i < 2 ? BLUE : GOLDD);
    txt(s, st[0], { x: 6.06, y: sy, w: 6.72, h: 0.3, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "top" });
    txt(s, st[1], { x: 6.06, y: sy + 0.34, w: 6.72, h: 0.8, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    sy += 1.14;
  });

  txt(s, "And that shape is a consequence of the exponential service assumption — which real service times, with their heavy tails, routinely violate. The M/G/1 formula exists precisely because that assumption had to be relaxed.", {
    x: 6.06, y: sy + 0.06, w: 6.72, h: 0.62, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  11 — Operational laws                                              */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Building a Model",
    "Operational Laws: Checks That Hold Regardless",
    "A small set of relations that follow from bookkeeping alone. They assume nothing about distributions, scheduling, or independence — which makes them the model-builder's sanity checks.", true);

  const laws = [
    { n: "Law 1", t: "Little's Law", f: "L  =  λ · W", c: GOLDD,
      b: "The mean number of jobs in a system equals the arrival rate times the mean time each spends there.",
      ex: "Holds for any arrival process, any service distribution, and any scheduling discipline — provided the system is stable and you measure L, λ and W over the same boundary." },
    { n: "Law 2", t: "Utilisation Law", f: "U  =  X · S", c: BLUE,
      b: "A resource's utilisation equals its throughput times its mean service time per visit.",
      ex: "Gives you an immediate consistency check between three quantities that simulations and measurements report separately — and often inconsistently." },
    { n: "Law 3", t: "Forced Flow Law", f: "Xᵢ  =  Vᵢ · X", c: RUST,
      b: "Throughput at a device equals system throughput times the number of visits each job makes to it.",
      ex: "Turns a system-level measurement into per-device predictions, and exposes the bottleneck as the device with the largest product of visits and service time." },
  ];
  const cw = 3.83, gp = 0.37;
  laws.forEach((l, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, l.n.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: l.c, charSpacing: 1.2, valign: "middle" });
    txt(s, l.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.38, fontFace: HF, fontSize: 18, bold: true, color: INK, valign: "middle" });
    txt(s, l.f, { x: x + 0.28, y: y + 0.96, w: cw - 0.56, h: 0.32, fontFace: MF, fontSize: 13, color: l.c, valign: "middle" });
    txt(s, l.b, { x: x + 0.28, y: y + 1.4, w: cw - 0.56, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, l.ex, { x: x + 0.28, y: y + 2.36, w: cw - 0.56, h: 1.0, fontFace: BF, fontSize: 10, italic: true, color: l.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 6.02, w: CW, h: 0.72, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "If your simulation output violates Little's Law, you do not have an interesting finding — you have a bug. Check the operational laws before you interpret anything else.", {
    x: ML + 0.32, y: 6.02, w: CW - 0.64, h: 0.72, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle",
  });

  footer(s);
}

/* ================================================================== */
/*  12 — Analytical or simulation                                      */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Getting Answers Out of a Model",
    "Analytical Solution or Simulation?",
    "Two ways to extract predictions from the same model, with opposite strengths. The choice is a methodological decision that must be defended, not a matter of taste.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "ANALYTICAL", c: GOLDD, fill: "F6EFE4",
      quote: "Closed-form expressions relating inputs to outputs.",
      rows: [
        ["Gives you", "The shape of a dependence, not merely points on it. W = 1/(μ−λ) tells you about every load at once."],
        ["Strengths", "Exact, instant across the whole parameter space, and sensitivity analysis reduces to differentiation."],
        ["Costs", "Available only for restricted model classes. The closed form is usually bought with assumptions the real system violates."],
        ["Use when", "The question is about trends, limits, asymptotics, or optimising over a parameter."],
      ] },
    { tag: "SIMULATION", c: BLUE, fill: "EEF3F9",
      quote: "Sample paths, from which statistics are estimated.",
      rows: [
        ["Gives you", "Estimates at the parameter points you actually ran — with confidence intervals attached to every one."],
        ["Strengths", "Almost no restriction on structure: arbitrary distributions, priorities, failures, dependence, finite buffers."],
        ["Costs", "Every output is a statistical estimate, so all of Lecture 2's empirical obligations apply in full. Expensive."],
        ["Use when", "The realistic features you need destroy analytical tractability — which is most of the time."],
      ] },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 4.06, rectRadius: 0.05, fill: { color: p.fill }, line: { type: "none" } });
    txt(s, p.tag, { x: x + 0.32, y: y + 0.24, w: pw - 0.64, h: 0.26, fontFace: BF, fontSize: 10, bold: true, color: p.c, charSpacing: 1.6, valign: "middle" });
    txt(s, p.quote, { x: x + 0.32, y: y + 0.58, w: pw - 0.64, h: 0.4, fontFace: HF, fontSize: 13.5, color: INK, valign: "top", lineSpacingMultiple: 1.15 });
    let ry = y + 1.12;
    p.rows.forEach((r) => {
      txt(s, r[0].toUpperCase(), { x: x + 0.32, y: ry, w: pw - 0.64, h: 0.18, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
      txt(s, r[1], { x: x + 0.32, y: ry + 0.2, w: pw - 0.64, h: 0.5, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });
      ry += 0.72;
    });
  });

  closer(s, "The mature answer is usually both: an analytical model to understand the shape, a simulation to check it under realistic conditions, and measurement to validate the simulation.");
  footer(s);
}

/* ================================================================== */
/*  13 — Discrete-event simulation                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Getting Answers Out of a Model",
    "Discrete-Event Simulation and Its Obligations",
    "A clock, a future-event list, and a state. Repeatedly advance the clock to the next scheduled event, execute it, and schedule its consequences. Time moves by events, not by ticks — which is what makes it efficient.", true);

  const obligations = [
    ["Warm-up", BLUE, "Steady-state statistics must exclude the transient start-up period. Deleting too little biases toward the empty system; deleting too much wastes runs and widens intervals."],
    ["Replications", BLUE, "One run is one sample path, not an answer. Estimate from independent replications and report confidence intervals — never a single number."],
    ["Run length", BLUE, "Determined by the precision the question needs, computed in advance — not by how long you were willing to wait for the job to finish."],
    ["Random streams", GOLDD, "Use a separate stream per stochastic component, so that changing one part of the model does not perturb the random draws in another. Report the seeds."],
    ["Common random numbers", GOLDD, "When comparing alternatives, drive them with the same random inputs. This is variance reduction, and it makes a fair comparison dramatically cheaper."],
    ["Verification", RUST, "Confirm the simulator implements the model: trace small cases by hand, and compare against an analytical special case such as M/M/1 wherever one exists."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  obligations.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, a[0], { x: x + 0.28, y: cy + 0.24, w: cw - 0.56, h: 0.4, fontFace: HF, fontSize: 14.5, bold: true, color: a[1], valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, a[2], { x: x + 0.28, y: cy + 0.72, w: cw - 0.56, h: 1.14, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  14 — Worked: optimisation model                                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Getting Answers Out of a Model",
    "Worked Example: Formulating an Optimisation Model");

  txt(s, [
    { text: "Question:  ", options: { bold: true, color: INK } },
    { text: "“Assign a set of tasks to a set of machines so that the time until the last one finishes is as small as possible.”", options: { color: BODY } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 3.0, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "THE FORMULATION", { x: ML + 0.3, y: y + 0.36, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "Sets:      tasks i ∈ T,  machines j ∈ M\nData:      pᵢⱼ = time for task i on machine j\nVariables: xᵢⱼ ∈ {0,1},  C ≥ 0\n\nminimise   C\n\nsubject to   Σⱼ xᵢⱼ = 1        for all i\n                 Σᵢ pᵢⱼ xᵢⱼ ≤ C   for all j", {
    x: ML + 0.3, y: y + 0.66, w: 4.0, h: 2.3, fontFace: MF, fontSize: 10.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.24,
  });

  txt(s, "Notice that the second constraint does all the work of the objective. Most of the skill in optimisation modelling lies in expressing what you want as something a solver will accept — without quietly changing what you meant.", {
    x: ML, y: y + 3.36, w: 4.6, h: 1.2, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["Identify the decision", "What is actually being chosen? Here it is the assignment xᵢⱼ. Everything else is either data or a consequence, and getting this wrong yields a precise model of the wrong problem."],
    ["Linearise the objective", "“Minimise the maximum load” is not a linear function. Introducing C, and forcing it above every machine's load, converts it into one — a standard move worth recognising on sight."],
    ["State what is assumed away", "No precedence between tasks, no machine failures, no setup or migration costs, and processing times known exactly in advance. Each is a modelling decision, and each is where this model can be wrong."],
    ["Choose a solution method", "This formulation is NP-hard, so Lecture 4's four bargains apply: an exact solver on small instances, an approximation with a proved ratio, or a heuristic carrying experimental evidence."],
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
/*  15 — Sensitivity analysis                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Getting Answers Out of a Model",
    "Sensitivity Analysis",
    "Determining how the model's outputs respond to changes in its inputs — that is, which parameters are actually driving your conclusion.", true);

  const items = [
    { t: "Local sensitivity", c: BLUE, q: "Partial derivatives, or one-at-a-time perturbation around the operating point.",
      ex: "Cheap and often sufficient. Misleading whenever parameters interact, because it only ever explores one axis at a time." },
    { t: "Global sensitivity", c: RUST, q: "Vary parameters jointly across their plausible ranges.",
      ex: "Latin hypercube sampling, variance-based indices. Necessary when the model is non-linear or the parameters are coupled — which is the normal case." },
    { t: "Extreme-condition tests", c: GOLDD, q: "Push parameters to their limits and see whether the model still behaves sensibly.",
      ex: "Zero load, saturation, a single server, infinite capacity. A model that behaves absurdly at ρ → 1 is telling you something structural." },
    { t: "Why it is not optional", c: INK, q: "It is how you find out whether you have a result or a restatement of a guess.",
      ex: "If the conclusion flips when a parameter you estimated by hand moves ten per cent, then that guess — and not your model — is what produced the finding." },
  ];
  const cw = 2.87, gp = 0.25;
  items.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "APPROACH " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "IN PRACTICE", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "Report it. A sensitivity analysis showing your conclusion is robust across the plausible parameter range is often the most persuasive paragraph in a modelling paper.");
  footer(s);
}

/* ================================================================== */
/*  16 — Verification, validation, calibration                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Trusting a Model",
    "Verification, Validation, Calibration",
    "Three words used interchangeably in student write-ups, which name three entirely different questions and demand three different kinds of data.", true);

  const three = [
    { n: "Question 1", t: "Verification", c: BLUE, q: "“Did I build the model right?”",
      b: "Does the implementation correctly realise the mathematics I intended? Checked by tracing small cases, unit tests, and comparison against analytical special cases.",
      ex: "An internal question. It never involves the real system at all." },
    { n: "Question 2", t: "Validation", c: GOLDD, q: "“Did I build the right model?”",
      b: "Does the model correspond adequately to the real system, for the intended purpose and over the intended range? Checked against data the model was not fitted to.",
      ex: "An external question — and the only one that licenses a claim about reality." },
    { n: "Question 3", t: "Calibration", c: RUST, q: "“What parameter values make it fit?”",
      b: "Tuning parameters until the model reproduces observed data. Necessary, routine, and not evidence of anything on its own.",
      ex: "A model can be calibrated to fit almost anything and still be structurally wrong." },
  ];
  const cw = 3.83, gp = 0.37;
  three.forEach((l, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, l.n.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: l.c, charSpacing: 1.2, valign: "middle" });
    txt(s, l.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.38, fontFace: HF, fontSize: 19, bold: true, color: INK, valign: "middle" });
    txt(s, l.q, { x: x + 0.28, y: y + 0.96, w: cw - 0.56, h: 0.32, fontFace: HF, fontSize: 12.5, italic: true, color: l.c, valign: "middle" });
    txt(s, l.b, { x: x + 0.28, y: y + 1.4, w: cw - 0.56, h: 1.28, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, l.ex, { x: x + 0.28, y: y + 2.74, w: cw - 0.56, h: 0.6, fontFace: BF, fontSize: 10, italic: true, color: l.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 6.02, w: CW, h: 0.72, rectRadius: 0.05, fill: { color: "F8EEEA" }, line: { type: "none" } });
  txt(s, "The commonest modelling error in student work is presenting calibration results as validation: fitting on a dataset, then showing the fit on that same dataset as evidence the model is right.", {
    x: ML + 0.32, y: 6.02, w: CW - 0.64, h: 0.72, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle",
  });

  footer(s);
}

/* ================================================================== */
/*  17 — How a model is validated                                      */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Trusting a Model",
    "How a Model Is Validated",
    "Five techniques, roughly ordered by how hard they are to pass. A model reported with only the first has been checked in the weakest way available.", true);

  const tech = [
    ["Face validity", "Does it behave as domain experts expect? Weak evidence, but a cheap filter that catches gross structural errors early.", BLUE],
    ["Extreme conditions", "Set parameters to their limits — zero load, saturation, one server, infinite buffer — and check the model degenerates correctly.", BLUE],
    ["Trace validation", "Drive the model with a recorded workload trace and compare its output against what the real system actually did.", GOLDD],
    ["Predictive validation", "Fit on one period or configuration, predict a different one, and compare. The strongest routine check available.", RUST],
    ["Structural validation", "Compare the model's mechanism, not just its outputs, against known system behaviour. Two wrong assumptions can cancel and still fit.", RUST],
  ];
  const bw = 2.23, bg = 0.27;
  tech.forEach((p, i) => {
    const x = ML + i * (bw + bg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: bw, h: 2.5, rectRadius: 0.06, fill: { color: i > 2 ? "F6EFE4" : TINT }, line: { type: "none" } });
    numDot(s, x + 0.2, y + 0.22, 0.32, i + 1, p[2]);
    txt(s, p[0], { x: x + 0.2, y: y + 0.66, w: bw - 0.4, h: 0.52, fontFace: HF, fontSize: 12.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.02 });
    txt(s, p[1], { x: x + 0.2, y: y + 1.24, w: bw - 0.4, h: 1.1, fontFace: BF, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.16 });
  });

  const pw = 5.99, pg = 0.25;
  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "WHY OUTPUT AGREEMENT IS NOT ENOUGH", { x: ML + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "A model can reproduce observed output through compensating errors — one mechanism overstated, another understated — and will then fail the moment conditions change. Structural checks are what distinguish a model that works from one that happens to fit.", {
    x: ML + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  s.addShape(pres.ShapeType.roundRect, { x: ML + pw + pg, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: "EEF3F9" }, line: { type: "none" } });
  txt(s, "HOW MUCH AGREEMENT IS ENOUGH?", { x: ML + pw + pg + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "There is no universal threshold — it depends on the decision the model supports. State the accuracy you need before you validate, so that “close enough” is a criterion rather than a verdict reached after seeing the plot.", {
    x: ML + pw + pg + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  footer(s);
}

/* ================================================================== */
/*  18 — Where model error comes from                                  */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Trusting a Model",
    "Where Model Error Comes From",
    "Four distinct sources. They are not equally detectable, and calibration can conceal the most serious of them.", true);

  const errs = [
    { t: "Structural error", c: RUST, q: "The relations themselves are wrong: a mechanism omitted, or a dependence assumed away.",
      ex: "The most serious and least detectable, because fitting parameters can absorb it — producing a model that matches the data and mispredicts everything new." },
    { t: "Parameter error", c: BLUE, q: "The structure is right but the values are off.",
      ex: "Measurement noise, a small sample, or an estimate imported from a different system. Detectable, and quantifiable through sensitivity analysis." },
    { t: "Numerical error", c: GOLDD, q: "Introduced by how the model was solved rather than by the model itself.",
      ex: "Discretisation, truncation, floating-point accumulation, or a solver stopped short of convergence. Usually small, occasionally decisive." },
    { t: "Scope error", c: INK, q: "The model is used outside the range it was built and validated for.",
      ex: "This is extrapolation, and it is the commonest way a perfectly good model produces a confidently wrong answer." },
  ];
  const cw = 2.87, gp = 0.25;
  errs.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "SOURCE " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "WHY IT MATTERS", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "Only two of the four are visible in a goodness-of-fit plot. That is why validation has to include structural and extreme-condition checks, and not just agreement on the data you happen to hold.");
  footer(s);
}

/* ================================================================== */
/*  19 — All models are wrong                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Trusting a Model",
    "All Models Are Wrong",
    "George Box's remark is quoted so often that its methodological content is usually lost. It is a statement about scope, not a licence for imprecision.");

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y, w: 7.7, h: 1.24, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "GEORGE BOX, 1976", { x: ML + 0.32, y: y + 0.2, w: 7.06, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "“All models are wrong, but some are useful.”", {
    x: ML + 0.32, y: y + 0.52, w: 7.06, h: 0.5, fontFace: HF, fontSize: 19, color: INK,
    valign: "middle",
  });

  const pts = [
    ["Wrongness is not a defect to be repaired.", "A model that was wrong in no respect would be the system itself, and would be no easier to reason about than the system was. Simplification is the entire mechanism by which a model earns its keep."],
    ["Parsimony, up to a point.", "Adding parameters always improves the fit and eventually destroys the predictive power. This is Lecture 3's overfitting again, and preferring the simpler model is an inductive bias — a necessary one, not a stylistic preference."],
    ["The question is adequacy, not truth.", "“Is it adequate for this question, over this range, at this accuracy?” — the same fidelity-against-tractability trade Lecture 3 named for models of computation."],
  ];
  let py = y + 1.52;
  pts.forEach((p) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: py + 0.09, w: 0.12, h: 0.12, fill: { color: GOLD }, line: { type: "none" } });
    txt(s, p[0], { x: ML + 0.34, y: py, w: 7.36, h: 0.28, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "top" });
    txt(s, p[1], { x: ML + 0.34, y: py + 0.32, w: 7.36, h: 0.86, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    py += 1.22;
  });

  s.addShape(pres.ShapeType.roundRect, { x: 8.55, y: y, w: 4.23, h: 4.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "WHAT THE OBLIGATION ACTUALLY IS", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Not to be right. To say precisely how you are wrong.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 1.0, fontFace: HF, fontSize: 15.5, color: INK,
    valign: "top", lineSpacingMultiple: 1.18,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 1.9, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Which mechanisms you omitted, which parameters you guessed, over what range you validated, and where the predictions should not be trusted at all.\n\nA modelling paper that supplies those four things is useful even when its numbers are later shown to be off. One that omits them is not useful even when its numbers happen to be right.", {
    x: 8.85, y: y + 2.1, w: 3.63, h: 2.2, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  20 — Reporting a model                                             */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "What Must Appear in the Paper",
    "Six elements a reader needs in order to reuse, check, or challenge your model. The last column is how often each is actually supplied.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Element", w: 3.15 },
      { label: "Why a reader needs it", w: 6.5 },
      { label: "Usually omitted?", w: 2.58 },
    ],
    rowH: [0.55, 0.55, 0.55, 0.55, 0.55, 0.55],
    accents: [BLUE, RUST, GOLD, BLUE, RUST, RUSTD],
    rows: [
      ["The purpose and question", "It determines whether every simplification you made was legitimate.", "Often"],
      ["Assumptions, listed explicitly", "They are the premises; Lecture 3 showed that is where a result's content actually sits.", "Very often"],
      ["Parameters, with source and uncertainty", "It distinguishes measured quantities from guessed ones, which readers cannot otherwise tell apart.", "Very often"],
      ["Solution method and its error", "Analytical, numerical, or simulated — each carries a different kind of error to account for.", "Sometimes"],
      ["Validation evidence, and against what data", "It distinguishes a validated model from one that was merely calibrated successfully.", "Very often"],
      ["The range validated over", "It tells a reader exactly where to stop trusting the model, which is the most useful sentence you can write.", "Almost always"],
    ],
  });

  closer(s, "None of these is difficult to supply. They are omitted because they are the parts that limit the claim — which is exactly why a careful reader looks for them first.");
  footer(s);
}

/* ================================================================== */
/*  21 — Matching model class to question                              */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Matching Model Class to Research Question",
    "Find the question, then read across. The last column is the assumption a reviewer will test first.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "If your question is…", w: 3.75 },
      { label: "Model class", w: 2.35 },
      { label: "Typical output", w: 2.9 },
      { label: "The assumption most likely to break", w: 3.23 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [GOLD, BLUE, RUST, GOLD, INK],
    rows: [
      ["“How does latency grow with load?”", "Queueing model", "Closed-form W(λ), or simulated percentiles", "Exponential service times; independent arrivals"],
      ["“What is the long-run failure probability?”", "Markov / reliability", "Steady-state distribution, mean time to failure", "Memorylessness; constant failure rates"],
      ["“What is the best allocation here?”", "Optimisation (LP/ILP)", "An optimal or near-optimal decision", "That the objective captures what you actually want"],
      ["“How does something spread in a network?”", "Graph or epidemic", "Reach, threshold, time to saturation", "Homogeneous mixing; a static topology"],
      ["“What will self-interested agents do?”", "Game-theoretic", "Equilibria, price of anarchy", "Rationality, common knowledge, correct payoffs"],
    ],
  });

  closer(s, "Every entry in the last column is a premise you can state, test, and if necessary relax. That is what makes a modelling paper reviewable rather than merely impressive.");
  footer(s);
}

/* ================================================================== */
/*  22 — Modelling failures                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Modelling Failures to Watch For",
    "Six recurring faults. Each has appeared, in a different dialect, in one of the previous four lectures.", true);

  const f = [
    ["Calibration as validation", RUST, "Parameters tuned on exactly the data later used to demonstrate that the model fits. The demonstration was guaranteed to succeed before it was run."],
    ["The unstated assumption", RUST, "Exponentiality, independence, or stationarity adopted for tractability, used throughout, and never mentioned again after the first page."],
    ["Extrapolation past the range", GOLDD, "A model fitted and checked at ten to fifty per cent utilisation, then used to make confident claims about behaviour at ninety-five."],
    ["Precision without accuracy", GOLDD, "Four significant figures reported from a model whose input parameters were estimated to within a factor of two."],
    ["The decorative model", BLUE, "Mathematics added to a paper that makes no prediction, is never solved, and is never checked against anything. It signals rigour without supplying it."],
    ["Fitting the model to the conclusion", BLUE, "Adding structure or parameters until the desired result appears — and stopping there, which guarantees the search terminated at a flattering point."],
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
    "A Checklist for Your Own Model");

  const items = [
    ["State the question before the model.", "A model is built for a question, never for a system. If you cannot write the question in one sentence, you cannot yet judge which simplifications are safe."],
    ["List every assumption where a reader will find it.", "These are your premises, and Lecture 3 established that a result's real content sits in its premises rather than its derivation."],
    ["Give every parameter a source and an uncertainty.", "Measured, cited, specified, or estimated by hand — never leave a reader unable to tell which, or unable to propagate the error."],
    ["Keep verification, validation, and calibration apart.", "Say which data was used for each, and never use the same data for the last two. This single discipline prevents the commonest failure in the field."],
    ["Run a sensitivity analysis before interpreting anything.", "If a parameter you guessed can flip the conclusion, that fact is the finding — and it belongs in the paper rather than in your drawer."],
    ["Publish the range you validated over.", "And say plainly that outside it the model makes no claim. This is Lecture 2's rebuttal component, doing its job for a model."],
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
    "Take a system you know well. Write down the simplest model that would answer one specific question about it — then list what you left out, and why each omission is safe for that question.",
    "Find a paper in your area containing a mathematical model. Which of its assumptions is doing the most work, and is it stated where a reader will find it or buried in a preamble?",
    "The M/M/1 result says response time diverges as λ approaches μ. Real systems do not become infinitely slow — they shed load, time out, or fail. What does that tell you about the model's scope?",
    "Take a model validated on data from one system. What exactly would you need to check before using it on a different one — and which of Lecture 3's inferences is that check?",
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
    "A mathematical model is a deliberate simplification built for a question. There is no model of a system — only a model of a system, for a purpose, over a stated range.",
    "The modelling cycle runs abstract, formalise, parameterise, solve, validate — and loops. A model never revised after contact with data has not been validated; it has only been published.",
    "Analytical solutions give you the shape of a dependence and are bought with restrictive assumptions; simulation relaxes the assumptions and returns statistical estimates, inheriting every empirical obligation from Lecture 2.",
    "Verification, validation, and calibration answer three different questions and need three different datasets. Presenting calibration as validation is the commonest modelling error in student work.",
    "Every model is wrong. The obligation is to say precisely how: which mechanisms were omitted, which parameters were guessed, and over what range the predictions may be trusted at all.",
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
    ["Box, G. E. P.", "“Science and Statistics.” Journal of the American Statistical Association, 1976. — the source of the remark."],
    ["Kleinrock, L.", "Queueing Systems, Volume 1: Theory. Wiley, 1975. — the standard derivation of the results in this session."],
    ["Lazowska, E. D., Zahorjan, J., Graham, G. S. & Sevcik, K. C.", "Quantitative System Performance: Computer System Analysis Using Queueing Network Models. Prentice-Hall, 1984."],
    ["Denning, P. J. & Buzen, J. P.", "“The Operational Analysis of Queueing Network Models.” ACM Computing Surveys, 1978. — the operational laws."],
    ["Jain, R.", "The Art of Computer Systems Performance Analysis. Wiley, 1991. — carried over from Lecture 2."],
    ["Law, A. M.", "Simulation Modeling and Analysis. 5th ed., McGraw-Hill, 2015. — warm-up, replications, and run length."],
    ["Sargent, R. G.", "“Verification and Validation of Simulation Models.” Proc. Winter Simulation Conference, revised across editions."],
    ["Wolsey, L. A.", "Integer Programming. 2nd ed., Wiley, 2020. — formulation technique for the optimisation example."],
    ["Saltelli, A. et al.", "Global Sensitivity Analysis: The Primer. Wiley, 2008."],
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
