const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Research Methodology in CS";
pres.title = "Deduction and Induction in Computer Science";
pres.subject = "Unit II, Lecture 3 - Deduction and Induction; Theoretical Models";

/* ------------------------------------------------------------------ */
/*  Design system — identical to Unit II Lectures 1 and 2               */
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

const RUNNING = "DEDUCTION & INDUCTION IN CS";
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
  txt(s, "Deduction and Induction\nin Computer Science", {
    x: 0.84, y: 2.02, w: 9.4, h: 1.72, fontFace: HF, fontSize: 42, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.06,
  });
  txt(s, "Theoretical Models and Approaches", {
    x: 0.88, y: 4.12, w: 9, h: 0.36, fontFace: HF, fontSize: 16, italic: true,
    color: "E4DFFA", valign: "middle",
  });
  s.addShape(pres.ShapeType.line, {
    x: 0.88, y: 4.72, w: 2.6, h: 0, line: { color: "6E688F", width: 1 },
  });
  txt(s, "The three directions of inference a researcher can travel — deduction, induction, and abduction —\nand the theoretical models that make each of them possible in computing science.", {
    x: 0.88, y: 5.0, w: 8.4, h: 0.72, fontFace: BF, fontSize: 11.5,
    color: DKBODY, valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Research Methodology in CS   ·   Unit II · Lecture 3", {
    x: 0.88, y: 6.34, w: 7, h: 0.26, fontFace: BF, fontSize: 9,
    color: DKMUT, valign: "middle",
  });
  N += 1;
}

/* ================================================================== */
/*  2 — Every research move is an inference                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Directions of Inference",
    "Every Research Move Is an Inference",
    "Lecture 2 asked how a claim is proved. This session asks the question underneath it: in which direction is the reasoning travelling, and what is that direction allowed to conclude?");

  const pts = [
    "There are only three directions available. Deduction moves from a general rule to a particular consequence. Induction moves from particulars to a general rule. Abduction moves from an observation to the hypothesis that would explain it.",
    "Each direction has a fixed price. Deduction preserves truth but adds nothing new; induction adds new content but cannot preserve truth; abduction generates the hypotheses on which the other two go to work.",
    "A CS paper normally uses all three, in sequence — and gets into trouble when it reports a conclusion drawn in one direction as though it had been reached in another.",
    "This is also the machinery behind Unit I: a “research problem” is an abduction, and the “investigative approach” you choose determines which of the other two directions carries the argument.",
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
  txt(s, "THE PRICE OF EACH DIRECTION", {
    x: 8.58, y: y + 0.22, w: 3.9, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true,
    color: GOLDD, charSpacing: 1.3, valign: "middle",
  });
  txt(s, "No form of inference gives you both certainty and new information. You choose which one to give up.", {
    x: 8.58, y: y + 0.62, w: 3.9, h: 1.1, fontFace: HF, fontSize: 14.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.2,
  });
  txt(s, "A theorem is certain and tells you nothing you had not assumed. A benchmark result is informative and could be overturned tomorrow. Both are legitimate; conflating them is not.", {
    x: 8.58, y: y + 1.86, w: 3.9, h: 1.2, fontFace: BF, fontSize: 11,
    color: BODY, valign: "top", lineSpacingMultiple: 1.22,
  });
  s.addShape(pres.ShapeType.line, { x: 8.58, y: y + 3.4, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Name the direction before you defend the claim.", {
    x: 8.58, y: y + 3.58, w: 3.9, h: 0.5, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  3 — Deduction, induction, abduction                                */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Directions of Inference",
    "Deduction, Induction, Abduction",
    "Charles Sanders Peirce's three-way division, in the form CS actually uses it. Read the “form” row as the shape of the argument, stripped of content.", true);

  const modes = [
    { k: "Direction 1", t: "Deduction", c: GOLDD,
      q: "Rule + case  ⇒  result",
      rows: [
        ["Moves from", "A general rule to a particular consequence."],
        ["Form", "Sorted arrays are searchable in O(log n). A is sorted. So A is searchable in O(log n)."],
        ["Guarantee", "Truth-preserving. If the premises hold, the conclusion cannot fail."],
        ["In CS", "Type soundness, Hoare logic, complexity bounds, model checking."],
      ] },
    { k: "Direction 2", t: "Induction", c: BLUE,
      q: "Case + result  ⇒  rule",
      rows: [
        ["Moves from", "Observed instances to a rule covering unobserved ones."],
        ["Form", "These 40 traces showed a 12% gain. So the method gains ~12% on such traces."],
        ["Guarantee", "None. Ampliative — it says more than the premises."],
        ["In CS", "Machine learning, benchmarking, empirical SE, performance models."],
      ] },
    { k: "Direction 3", t: "Abduction", c: RUST,
      q: "Rule + result  ⇒  case",
      rows: [
        ["Moves from", "A surprising observation to a hypothesis explaining it."],
        ["Form", "Latency spikes hourly. An hourly cache flush would cause that. So suspect the flush."],
        ["Guarantee", "None, and only as good as the rivals you considered."],
        ["In CS", "Debugging, fault localisation, root-cause analysis, problem framing."],
      ] },
  ];

  const cw = 3.83, gap = 0.37;
  modes.forEach((m, i) => {
    const x = ML + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: cw, h: 4.28, rectRadius: 0.05,
      fill: { color: i === 1 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 },
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
      x: x + 0.28, y: y + 0.96, w: cw - 0.56, h: 0.3, fontFace: MF, fontSize: 10.5,
      color: m.c, valign: "middle",
    });
    let ry = y + 1.34;
    const hs = [0.64, 0.7, 0.64, 0.64];
    m.rows.forEach((r, j) => {
      txt(s, r[0].toUpperCase(), {
        x: x + 0.28, y: ry, w: cw - 0.56, h: 0.18, fontFace: BF, fontSize: 7.5,
        bold: true, color: MUTED, charSpacing: 1.1, valign: "middle",
      });
      txt(s, r[1], {
        x: x + 0.28, y: ry + 0.19, w: cw - 0.56, h: hs[j] - 0.19, fontFace: BF,
        fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15,
      });
      ry += hs[j] + 0.06;
    });
  });

  closer(s, "Peirce's point was that the three are not competing accounts of reasoning — they are three distinct operations, and a working science needs all of them in rotation.");
  footer(s);
}

/* ================================================================== */
/*  4 — What each preserves, what each risks                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Directions of Inference",
    "What Each Preserves, What Each Risks",
    "The same three directions, read as a reviewer reads them: what does this step buy, and where can it break?", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Direction", w: 1.95 },
      { label: "Adds new content?", w: 1.95 },
      { label: "Preserves truth?", w: 1.85 },
      { label: "Fails when…", w: 3.24 },
      { label: "How it is defended", w: 3.24 },
    ],
    rowH: [1.18, 1.18, 1.18],
    accents: [GOLD, BLUE, RUST],
    rows: [
      ["Deduction", "No — it unpacks what the premises already entail.", "Yes, absolutely, given the premises.",
       "A premise is false, or the model it describes is not the system you deployed.",
       "Expose the axioms. Show the inference steps. Argue the model applies."],
      ["Induction", "Yes — the conclusion ranges beyond the sample.", "No. The next observation may overturn it.",
       "The sample is unrepresentative, or the distribution shifts after training.",
       "Sampling design, controls, held-out data, effect size, a stated bias."],
      ["Abduction", "Yes — it proposes an entirely new hypothesis.", "No. Several hypotheses can explain one fact.",
       "Rival explanations were never enumerated, so “best” means “only one considered”.",
       "List the rivals. Derive a prediction that separates them. Then test it."],
    ],
  });

  closer(s, "Notice the pattern: the only direction that guarantees its conclusion is the one that tells you nothing you had not already assumed.");
  footer(s);
}

/* ================================================================== */
/*  5 — Mathematical induction is not induction                        */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · Two Directions of Inference",
    "“Mathematical Induction” Is Not Induction",
    "A name collision that causes real confusion in CS writing — and the single most useful distinction in this session.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "MATHEMATICAL INDUCTION", c: GOLDD, fill: "F6EFE4",
      form: "Prove P(0). Prove P(n) ⇒ P(n+1).\nConclude ∀n ∈ ℕ, P(n).",
      note: "The conclusion is already contained in the two premises together with the induction axiom. Nothing is added; nothing observed. It is a deductive rule that happens to be named after its inductive cousin.",
      verdict: "Belongs to Lecture 2's mathematical mode. Only an error in the proof can defeat it." },
    { tag: "EMPIRICAL INDUCTION", c: BLUE, fill: "EEF3F9",
      form: "Observe P(x₁) … P(xₘ) on a sample.\nConclude P holds generally.",
      note: "The conclusion says strictly more than the premises. It is supported, never entailed, and the next observation can overturn it however careful the sampling was.",
      verdict: "Belongs to Lecture 2's empirical mode. This is the induction Hume worried about." },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 2.94, rectRadius: 0.05, fill: { color: p.fill }, line: { type: "none" } });
    txt(s, p.tag, { x: x + 0.32, y: y + 0.24, w: pw - 0.64, h: 0.26, fontFace: BF, fontSize: 9.5, bold: true, color: p.c, charSpacing: 1.4, valign: "middle" });
    txt(s, p.form, { x: x + 0.32, y: y + 0.62, w: pw - 0.64, h: 0.72, fontFace: HF, fontSize: 13.5, color: INK, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, p.note, { x: x + 0.32, y: y + 1.48, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, p.verdict, { x: x + 0.32, y: y + 2.42, w: pw - 0.64, h: 0.42, fontFace: BF, fontSize: 10, italic: true, color: p.c, valign: "top", lineSpacingMultiple: 1.15 });
  });

  const notes = [
    ["Why the collision matters", "Write “we prove by induction that our approach generalises” and a reviewer cannot tell whether you are offering a theorem or a hope. The two carry completely different obligations."],
    ["A quick test", "Ask what could overturn the conclusion. If only a flawed proof could, the reasoning is deductive. If a new observation could, it is inductive — regardless of the word used."],
    ["Structural induction too", "Induction over terms, derivations, or data types is likewise deductive. It is the standard tool for proving properties of recursive programs and languages."],
  ];
  const cw = 3.83, gp = 0.37;
  notes.forEach((n, i) => {
    const x = ML + i * (cw + gp);
    txt(s, n[0], { x: x, y: 5.34, w: cw, h: 0.44, fontFace: HF, fontSize: 12.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, n[1], { x: x, y: 5.84, w: cw, h: 1.0, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  6 — Divider Part 1 -> Part 2                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  darkBase(s);
  txt(s, "PART 1  →  PART 2", {
    x: 0.88, y: 2.1, w: 8, h: 0.28, fontFace: BF, fontSize: 11, bold: true,
    color: GOLD, charSpacing: 2.0, valign: "middle",
  });
  txt(s, "From the shape of an inference\nto the machinery that runs it", {
    x: 0.84, y: 2.62, w: 10.4, h: 1.4, fontFace: HF, fontSize: 32, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.1,
  });
  txt(s, "Deduction only guarantees anything inside a formal system. What does such a system consist of, what does it promise, and where does the promise run out?", {
    x: 0.88, y: 4.24, w: 9.2, h: 0.72, fontFace: HF, fontSize: 14, italic: true,
    color: "E4DFFA", valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Next: deduction in computing science — formal systems, soundness, and their limits.", {
    x: 0.88, y: 5.28, w: 9.2, h: 0.3, fontFace: BF, fontSize: 11,
    color: GOLD, valign: "middle",
  });
  footer(s, true);
}

/* ================================================================== */
/*  7 — Deduction: from model to consequence                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Deduction in Computing Science",
    "Deduction: From Model to Consequence",
    "Deriving a particular consequence from a general rule by steps that cannot introduce error — inside a model you chose.");

  const steps = [
    ["Model", "A formalisation of the system: a machine model, an operational semantics, a protocol specification."],
    ["Premises", "Axioms and assumptions, stated explicitly. Everything the conclusion will rest on lives here."],
    ["Rules", "Inference steps that are purely syntactic — applicable without understanding what the symbols mean."],
    ["Derivation", "A finite chain of rule applications, each checkable in isolation, by a person or a machine."],
    ["Theorem", "A consequence that holds in every model satisfying the premises. Certain, and bounded by them."],
  ];
  const bw = 2.23, bgap = 0.27;
  steps.forEach((st, i) => {
    const x = ML + i * (bw + bgap);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: bw, h: 2.06, rectRadius: 0.06,
      fill: { color: i === 4 ? "F6EFE4" : TINT }, line: { type: "none" },
    });
    txt(s, st[0].toUpperCase(), {
      x: x + 0.2, y: y + 0.24, w: bw - 0.4, h: 0.24, fontFace: BF, fontSize: 9,
      bold: true, color: i === 4 ? GOLDD : BLUE, charSpacing: 1.3, valign: "middle",
    });
    txt(s, st[1], {
      x: x + 0.2, y: y + 0.6, w: bw - 0.4, h: 1.26, fontFace: BF, fontSize: 10.5,
      color: BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
    if (i < 4) {
      txt(s, "→", {
        x: x + bw, y: y + 0.82, w: bgap, h: 0.34, align: "center", valign: "middle",
        fontFace: BF, fontSize: 14, color: MUTED,
      });
    }
  });

  const notes = [
    ["Mechanical by construction", "Because the rules are syntactic, a derivation can be checked without judgement. This is precisely what makes proof assistants — Coq, Isabelle, Lean — possible at all."],
    ["The model is the contribution", "Choosing what to formalise, and at what level of detail, is the creative act. The derivation that follows is comparatively routine."],
    ["Where CS differs from mathematics", "A CS theorem usually concerns an artifact that also exists physically. The gap between the formal model and the running system is a permanent part of the argument."],
  ];
  const cw = 3.83, gp = 0.37;
  notes.forEach((n, i) => {
    const x = ML + i * (cw + gp);
    txt(s, n[0], {
      x: x, y: y + 2.62, w: cw, h: 0.52, fontFace: HF, fontSize: 13.5, bold: true,
      color: INK, valign: "top", lineSpacingMultiple: 1.1,
    });
    txt(s, n[1], {
      x: x, y: y + 3.24, w: cw, h: 1.36, fontFace: BF, fontSize: 11,
      color: BODY, valign: "top", lineSpacingMultiple: 1.22,
    });
  });

  footer(s);
}

/* ================================================================== */
/*  8 — Anatomy of a formal system                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Deduction in Computing Science",
    "Anatomy of a Formal System",
    "Five components. The last two are the ones a research claim actually trades on.", true);

  const parts = [
    ["Syntax", BLUE, "The well-formed formulas — what can be written down at all. Grammar, not meaning."],
    ["Semantics", BLUE, "What the formulas mean: the models, states, or executions in which a formula is true. Written ⊨."],
    ["Inference rules", BLUE, "The sanctioned moves from formulas to formulas. Purely syntactic, so a machine can apply and check them. Written ⊢."],
    ["Soundness", GOLDD, "Everything provable is true: ⊢ φ implies ⊨ φ. Without it, a proof means nothing — you can derive falsehoods."],
    ["Completeness", RUST, "Everything true is provable: ⊨ φ implies ⊢ φ. Without it, some truths are simply out of the system's reach."],
  ];
  const bw = 2.23, bg = 0.27;
  parts.forEach((p, i) => {
    const x = ML + i * (bw + bg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: bw, h: 2.5, rectRadius: 0.06, fill: { color: i > 2 ? "F6EFE4" : TINT }, line: { type: "none" } });
    numDot(s, x + 0.2, y + 0.22, 0.32, i + 1, p[1]);
    txt(s, p[0], { x: x + 0.2, y: y + 0.66, w: bw - 0.4, h: 0.34, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "middle" });
    txt(s, p[2], { x: x + 0.2, y: y + 1.06, w: bw - 0.4, h: 1.28, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  const pw = 5.99, pg = 0.25;
  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "YOU CANNOT ALWAYS HAVE BOTH", { x: ML + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Gödel showed that any consistent system strong enough to express arithmetic cannot be both complete and able to prove its own consistency. In CS this is not a curiosity — it is why no automatic tool decides every interesting property of every program.", {
    x: ML + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  s.addShape(pres.ShapeType.roundRect, { x: ML + pw + pg, y: y + 2.9, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: "EEF3F9" }, line: { type: "none" } });
  txt(s, "HOW TOOLS CHOOSE", { x: ML + pw + pg + 0.32, y: y + 3.1, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.3, valign: "middle" });
  txt(s, "Verifiers and static analysers are usually sound but incomplete: they may raise false alarms on correct programs, but never stay silent on a real error. Bug-finders often invert the trade — complete in practice, unsound in principle. A tool paper must say which it is.", {
    x: ML + pw + pg + 0.32, y: y + 3.38, w: pw - 0.64, h: 0.9, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  footer(s);
}

/* ================================================================== */
/*  9 — Deduction at work in CS                                        */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Deduction in Computing Science",
    "Deduction at Work in Computing Science",
    "Six research areas whose central results are derived, not measured. Each is a formal system with its own syntax, semantics, and rules.", true);

  const areas = [
    ["Type systems", BLUE, "Progress and preservation together give type soundness: a well-typed program cannot get stuck. The proof is structural induction over typing derivations."],
    ["Program logics", BLUE, "Hoare logic and separation logic derive {P} C {Q} triples from axioms and rules. The basis of Dafny, Why3, Frama-C, and Iris."],
    ["Model checking", BLUE, "Exhaustive deduction over a finite state space: a temporal-logic property is decided for every reachable state, not sampled on some of them."],
    ["Complexity theory", GOLDD, "Bounds, hierarchies and separations derived inside a machine model. Lecture 2's Ω(n log n) argument was one of these."],
    ["Cryptographic reductions", GOLDD, "Security by deduction from an assumption: breaking this scheme would solve a problem believed hard. The guarantee is conditional, and says so."],
    ["Distributed protocols", RUST, "Safety and liveness of consensus algorithms — Paxos, Raft, PBFT — specified and machine-checked in TLA+, Coq, or Ivy."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  areas.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, a[0], { x: x + 0.28, y: cy + 0.24, w: cw - 0.56, h: 0.4, fontFace: HF, fontSize: 14.5, bold: true, color: a[1], valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, a[2], { x: x + 0.28, y: cy + 0.72, w: cw - 0.56, h: 1.14, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.18 });
  });

  footer(s);
}

/* ================================================================== */
/*  10 — Worked: Hoare logic                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Deduction in Computing Science",
    "Worked Example: Deriving a Hoare Triple");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "{ n ≥ 0 }   SUM   { sum = n(n−1)/2 }   —  the program computes the sum of 0 … n−1, for every n.", options: { color: BODY } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 1.94, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "sum := 0\ni := 0\nwhile i < n do\n    sum := sum + i\n    i := i + 1", {
    x: ML + 0.3, y: y + 0.34, w: 4.0, h: 1.6, fontFace: MF, fontSize: 11.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.24,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.3, w: 4.6, h: 1.4, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "THE LOOP INVARIANT", { x: ML + 0.3, y: y + 2.48, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "I  ≡   sum = i(i−1)/2   ∧   0 ≤ i ≤ n\n\nStated once, it discharges every obligation opposite.", {
    x: ML + 0.3, y: y + 2.74, w: 4.0, h: 0.84, fontFace: BF, fontSize: 11, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  txt(s, "Lecture 2 argued an invariant in prose; Hoare logic is the calculus that makes the same argument mechanical, and therefore machine-checkable. Termination is a separate obligation: i strictly increases and is bounded above by n.", {
    x: ML, y: y + 3.94, w: 4.6, h: 1.2, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["Establish I — the assignment axiom", "The rule { Q[e/x] } x := e { Q } is applied backwards through i := 0 and sum := 0, yielding the precondition 0 = 0 ∧ 0 ≤ 0 ≤ n. The given n ≥ 0 implies it, so I holds when the loop is first reached."],
    ["Preserve I — the while rule", "From { I ∧ B } body { I } the rule infers { I } while B do body { I ∧ ¬B }. The single obligation is that the body re-establishes I, assuming I and i < n held on entry."],
    ["Discharge the body obligation", "After sum := sum + i we have sum = i(i−1)/2 + i = i(i+1)/2. After i := i + 1 the counter is i+1, and i(i+1)/2 is exactly (i+1)((i+1)−1)/2 — which is I at the new value of i."],
    ["Conclude — the rule of consequence", "On exit I ∧ ¬(i < n) gives sum = i(i−1)/2 ∧ i = n, and weakening that yields sum = n(n−1)/2. The triple is derived, for every n at once."],
  ];
  let sy = y + 0.2;
  steps.forEach((st, i) => {
    numDot(s, 5.5, sy + 0.02, 0.34, i + 1, GOLDD);
    txt(s, st[0], { x: 6.06, y: sy, w: 6.72, h: 0.3, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "top" });
    txt(s, st[1], { x: 6.06, y: sy + 0.34, w: 6.72, h: 0.86, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    sy += 1.2;
  });

  footer(s);
}

/* ================================================================== */
/*  11 — The limits of deduction                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Deduction in Computing Science",
    "The Limits of Deduction",
    "Four boundaries worth stating in your own limitations section, before a reviewer states them for you.", true);

  const lims = [
    { t: "Premises, not truth", c: BLUE, q: "Soundness guarantees the conclusion given the axioms — and nothing about the axioms.",
      ex: "A verified system is correct with respect to its specification. A wrong specification is verified just as cheerfully as a right one." },
    { t: "Undecidability", c: RUST, q: "No complete automatic procedure exists for non-trivial semantic properties of programs.",
      ex: "Rice's theorem, met again from Lecture 2. Every analyser must sacrifice completeness, soundness, or termination — and should say which." },
    { t: "State explosion", c: GOLDD, q: "Exhaustive methods are exhaustive only over spaces small enough to exhaust.",
      ex: "Model-checking state grows exponentially in concurrent components. Abstraction restores tractability and reintroduces approximation." },
    { t: "No new content", c: INK, q: "Deduction unpacks what the premises entail. It cannot propose the premises.",
      ex: "It will not tell you which axioms to adopt, which model to formalise, or which hypothesis is worth testing. That is abduction's work — Part 4." },
  ];
  const cw = 2.87, gp = 0.25;
  lims.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "LIMIT " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 16, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "IN PRACTICE", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "None of these makes deduction weak. They make its scope precise — and a precisely scoped guarantee is worth more to a reader than an unbounded one.");
  footer(s);
}

/* ================================================================== */
/*  12 — Induction: from instances to generalisation                   */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Induction in Computing Science",
    "Induction: From Instances to Generalisation",
    "Reasoning from observed instances to a rule that covers unobserved ones. The conclusion is supported by the premises, never entailed by them.");

  s.addShape(pres.ShapeType.roundRect, {
    x: ML, y: y, w: 3.1, h: 1.24, rectRadius: 0.06,
    fill: { color: TINT }, line: { type: "none" },
  });
  txt(s, "INSTANCES", { x: ML + 0.24, y: y + 0.22, w: 2.62, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, valign: "middle" });
  txt(s, "A finite sample: training examples, benchmark runs, mined repositories, study participants.", { x: ML + 0.24, y: y + 0.52, w: 2.62, h: 0.72, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });

  txt(s, "generalisation", { x: ML + 3.1, y: y + 0.3, w: 1.5, h: 0.24, align: "center", valign: "middle", fontFace: BF, fontSize: 9, italic: true, color: GOLDD });
  txt(s, "————→", { x: ML + 3.1, y: y + 0.56, w: 1.5, h: 0.3, align: "center", valign: "middle", fontFace: BF, fontSize: 12, color: GOLD });
  txt(s, "the leap", { x: ML + 3.1, y: y + 0.88, w: 1.5, h: 0.24, align: "center", valign: "middle", fontFace: BF, fontSize: 9, italic: true, color: MUTED });

  s.addShape(pres.ShapeType.roundRect, {
    x: ML + 4.6, y: y, w: 3.1, h: 1.24, rectRadius: 0.06,
    fill: { color: "F6EFE4" }, line: { type: "none" },
  });
  txt(s, "RULE", { x: ML + 4.84, y: y + 0.22, w: 2.62, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.2, valign: "middle" });
  txt(s, "A hypothesis, model, or classifier that applies to cases nobody has yet observed.", { x: ML + 4.84, y: y + 0.52, w: 2.62, h: 0.72, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });

  const pts = [
    ["Ampliative, and therefore fallible.", "The rule asserts something about cases the sample never contained. That surplus is exactly what makes it useful, and exactly what makes it defeasible."],
    ["Lecture 2's empirical mode, seen from the inside.", "Everything said there about sampling, controls and effect size is machinery for making one specific inductive leap defensible."],
    ["In CS the leap is usually automated.", "A learning algorithm performs the induction. We therefore reason about the algorithm's guarantees rather than about each individual inference it makes."],
  ];
  let py = y + 1.62;
  pts.forEach((p) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: py + 0.09, w: 0.12, h: 0.12, fill: { color: BLUE }, line: { type: "none" } });
    txt(s, p[0], { x: ML + 0.34, y: py, w: 7.36, h: 0.28, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "top" });
    txt(s, p[1], { x: ML + 0.34, y: py + 0.32, w: 7.36, h: 0.74, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    py += 1.1;
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 8.55, y: y, w: 4.23, h: 4.5, rectRadius: 0.05,
    fill: { color: TINT }, line: { type: "none" },
  });
  txt(s, "THE ASYMMETRY", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Deduction tells you what follows.\n\nInduction tells you what to expect.\n\nOnly the second can be wrong while every step was correct.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 2.0, fontFace: HF, fontSize: 15, color: INK,
    valign: "top", lineSpacingMultiple: 1.15,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 2.86, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "This is why inductive claims must carry qualifiers and deductive ones must carry premises. Each names the place where the reasoning could fail.", {
    x: 8.85, y: y + 3.06, w: 3.63, h: 1.2, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  13 — Where induction lives in CS                                   */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Induction in Computing Science",
    "Where Induction Lives in Computing Science",
    "Four research areas built entirely on the inductive leap. In each, the interesting question is what licenses the generalisation.", true);

  const areas = [
    { t: "Machine learning", c: BLUE, q: "A learner is literally an inductive engine: it maps a finite sample to a function over an infinite domain.",
      ex: "The generalisation claim is the contribution. Test accuracy is the sample; deployment accuracy is the population." },
    { t: "Empirical software engineering", c: RUST, q: "Rules induced from observed projects: defect prediction, effort estimation, developer studies.",
      ex: "The population is “software projects”. The sample is usually “public repositories that happen to be mineable”." },
    { t: "Performance modelling", c: GOLDD, q: "Regression models and scaling laws fitted to measured runs, then extrapolated past the measured range.",
      ex: "Extrapolation is induction at its most exposed: the fitted curve has no evidence at all where the claim matters most." },
    { t: "Algorithm engineering", c: INK, q: "Heuristics tuned on instance families and reported as good on “typical” inputs.",
      ex: "Average-case and “works well in practice” claims are inductive, even when made about an object that also has theorems." },
  ];
  const cw = 2.87, gp = 0.25;
  areas.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "AREA " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.78, fontFace: HF, fontSize: 15.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.34, w: cw - 0.52, h: 0.88, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "WHERE THE LEAP HIDES", { x: x + 0.26, y: y + 2.26, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.5, w: cw - 0.52, h: 0.9, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "In all four, the honest question is the same: what is the population, and what makes this particular sample stand in for it?");
  footer(s);
}

/* ================================================================== */
/*  14 — Inductive bias and no free lunch                              */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Induction in Computing Science",
    "Inductive Bias and the No-Free-Lunch Theorem",
    "Why assumption-free learning is not merely difficult but impossible — and why that is good news for your methodology section.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "INDUCTIVE BIAS", c: BLUE, fill: "EEF3F9",
      quote: "The assumptions a learner uses to prefer one generalisation over the others equally consistent with the data.",
      note: "Any finite sample is consistent with infinitely many rules. Something other than the data must choose between them — the hypothesis class itself, a smoothness or sparsity prior, convolutional locality, a preference for shorter descriptions.",
      verdict: "Every learner has one. The only question is whether the paper states it." },
    { tag: "NO FREE LUNCH", c: RUST, fill: "F8EEEA",
      quote: "Averaged over all possible target functions, every learning algorithm has the same expected off-training-set error.",
      note: "Wolpert and Macready's result says superiority is never universal: an algorithm that does better than another on one class of problems must do worse on some other class. There is no best learner, only a best-matched one.",
      verdict: "So “our method is better” always means “better on problems shaped like these”." },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 3.16, rectRadius: 0.05, fill: { color: p.fill }, line: { type: "none" } });
    txt(s, p.tag, { x: x + 0.32, y: y + 0.24, w: pw - 0.64, h: 0.26, fontFace: BF, fontSize: 10, bold: true, color: p.c, charSpacing: 1.6, valign: "middle" });
    txt(s, p.quote, { x: x + 0.32, y: y + 0.62, w: pw - 0.64, h: 0.9, fontFace: HF, fontSize: 13.5, color: INK, valign: "top", lineSpacingMultiple: 1.18 });
    txt(s, p.note, { x: x + 0.32, y: y + 1.62, w: pw - 0.64, h: 1.06, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, p.verdict, { x: x + 0.32, y: y + 2.7, w: pw - 0.64, h: 0.4, fontFace: BF, fontSize: 10, italic: true, color: p.c, valign: "top", lineSpacingMultiple: 1.15 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 5.62, w: CW, h: 1.06, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "Bias is not a defect to be engineered away — it is the precondition for generalising at all. Which makes stating it a methodological obligation, not an admission: an unstated bias is an unstated premise, and Part 2 already established what that does to a claim.", {
    x: ML + 0.32, y: 5.62, w: CW - 0.64, h: 1.06, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  15 — Worked: PAC learning                                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Induction in Computing Science",
    "Worked Example: Induction, Made Quantitative");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "“With m ≥ (1/ε)(ln|H| + ln(1/δ)) samples, any hypothesis consistent with the data has true error ≤ ε, with probability ≥ 1 − δ.”   ", options: { color: BODY } },
    { text: "— Valiant's PAC framework, 1984", options: { italic: true, color: MUTED, fontSize: 10.5 } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.5, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  const steps = [
    ["Set up", "An unknown distribution D over inputs, an unknown target concept, a finite hypothesis class H fixed in advance, and m examples drawn independently from D."],
    ["Define “bad”", "Call h bad if its true error on D exceeds ε. A single bad h agrees with one random example with probability at most 1 − ε, so it survives all m with probability ≤ (1 − ε)ᵐ."],
    ["Union bound", "There are at most |H| bad hypotheses, so the chance that any of them survives all m examples is at most |H|(1 − ε)ᵐ ≤ |H|e^(−εm)."],
    ["Solve for m", "Require |H|e^(−εm) ≤ δ. Rearranging gives m ≥ (1/ε)(ln|H| + ln(1/δ)) — a sample size that makes the inductive leap quantitatively safe."],
  ];
  const cw = 2.87, gp = 0.25, ty = y + 0.32;
  steps.forEach((st, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: ty, w: cw, h: 2.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    numDot(s, x + 0.26, ty + 0.22, 0.34, i + 1, BLUE);
    txt(s, st[0], { x: x + 0.26, y: ty + 0.66, w: cw - 0.52, h: 0.32, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "middle" });
    txt(s, st[1], { x: x + 0.26, y: ty + 1.04, w: cw - 0.52, h: 1.32, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
  });

  const pw = 5.99, pg = 0.25;
  s.addShape(pres.ShapeType.roundRect, { x: ML, y: ty + 2.82, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "WHY THIS SLIDE SITS IN BOTH PARTS", { x: ML + 0.32, y: ty + 3.0, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Every line of the argument is deductive — yet the theorem is about induction. Learning theory is precisely this: deduction applied to the reliability of inductive procedures, converting “it seems to generalise” into a bounded quantity.", {
    x: ML + 0.32, y: ty + 3.28, w: pw - 0.64, h: 0.94, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  s.addShape(pres.ShapeType.roundRect, { x: ML + pw + pg, y: ty + 2.82, w: pw, h: 1.5, rectRadius: 0.05, fill: { color: "F8EEEA" }, line: { type: "none" } });
  txt(s, "AND WHERE IT STOPS", { x: ML + pw + pg + 0.32, y: ty + 3.0, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: RUST, charSpacing: 1.3, valign: "middle" });
  txt(s, "Read the premises: examples independent and identically distributed, H fixed before seeing data, some hypothesis in H consistent with it. Modern practice violates all three routinely — which is why the bound is a way of thinking, not a certificate.", {
    x: ML + pw + pg + 0.32, y: ty + 3.28, w: pw - 0.64, h: 0.94, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });

  footer(s);
}

/* ================================================================== */
/*  16 — The limits of induction                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Induction in Computing Science",
    "The Limits of Induction",
    "Four ways a correctly executed generalisation still ends up false. Each has a standard name and a standard defence.", true);

  const lims = [
    { t: "Sampling bias", c: BLUE, q: "The population you sampled is not the population your claim is about.",
      ex: "Defence: describe the sampling frame explicitly, and qualify the claim down to it. GitHub is not software; ImageNet is not vision." },
    { t: "Overfitting", c: RUST, q: "A rule that fits the sample perfectly and the population poorly.",
      ex: "Defence: held-out data untouched during development, and reporting how many configurations were tried before this one." },
    { t: "Distribution shift", c: GOLDD, q: "The i.i.d. premise that licensed the generalisation fails after deployment.",
      ex: "Defence: measure on data from a genuinely later period or a different source, and report the degradation rather than the best case." },
    { t: "Goodhart's law", c: INK, q: "Once a benchmark becomes the target, it stops being a good measure.",
      ex: "Defence: report on more than one benchmark, and treat saturation on a leaderboard as evidence about the benchmark, not the field." },
  ];
  const cw = 2.87, gp = 0.25;
  lims.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "LIMIT " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t, { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 16, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "IN PRACTICE", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "All four are failures of the population, not of the arithmetic. That is why Lecture 2 put threats to validity, and not statistical technique, at the centre of empirical review.");
  footer(s);
}

/* ================================================================== */
/*  17 — Abduction                                                     */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Abduction and Theoretical Models",
    "Abduction: Inference to the Best Explanation",
    "From a surprising observation to the hypothesis that, if true, would make the observation a matter of course.");

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y, w: 7.7, h: 1.36, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "PEIRCE'S SCHEMA", { x: ML + 0.32, y: y + 0.2, w: 7.06, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "The surprising fact C is observed.  ·  But if H were true, C would follow as a matter of course.\nHence, there is reason to suspect that H is true.", {
    x: ML + 0.32, y: y + 0.5, w: 7.06, h: 0.72, fontFace: HF, fontSize: 13.5, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  const pts = [
    ["It is the only direction that creates hypotheses.", "Deduction and induction can only operate on candidates already on the table. Everything either of them ever works on was put there by an abduction."],
    ["It fails in one specific way.", "The conclusion is only as good as the field of rivals you actually considered. Abduction over a single candidate is not inference — it is a guess with a citation attached."],
    ["In CS it is daily practice, rarely named.", "Debugging is abduction: symptom to cause. So are fault localisation, root-cause analysis, performance triage — and framing a research problem, which is Unit I's whole subject."],
  ];
  let py = y + 1.74;
  pts.forEach((p) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: py + 0.09, w: 0.12, h: 0.12, fill: { color: RUST }, line: { type: "none" } });
    txt(s, p[0], { x: ML + 0.34, y: py, w: 7.36, h: 0.28, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "top" });
    txt(s, p[1], { x: ML + 0.34, y: py + 0.32, w: 7.36, h: 0.72, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    py += 1.08;
  });

  s.addShape(pres.ShapeType.roundRect, { x: 8.55, y: y, w: 4.23, h: 4.5, rectRadius: 0.05, fill: { color: "F8EEEA" }, line: { type: "none" } });
  txt(s, "THE STANDARD OF EVIDENCE", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: RUST, charSpacing: 1.3, valign: "middle" });
  txt(s, "“Best explanation” is meaningful only relative to the alternatives you listed.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 1.2, fontFace: HF, fontSize: 15.5, color: INK,
    valign: "top", lineSpacingMultiple: 1.18,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 2.08, w: 1.5, h: 0, line: { color: RUST, width: 1.25 } });
  txt(s, "So an abductive step is defended by enumeration, not by eloquence: name the rival explanations, say what each would predict, and show which predictions the observation rules out. A related-work section that reads as antithesis — Lecture 1's point — is doing exactly this job.", {
    x: 8.85, y: y + 2.28, w: 3.63, h: 1.9, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  18 — The research cycle                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Abduction and Theoretical Models",
    "The Research Cycle: Abduce, Deduce, Test",
    "The three directions are not alternatives to choose between. They are stages of one loop, and each does work the others cannot.", true);

  const steps = [
    ["Observe", "A surprising fact: an anomaly in a measurement, a failure nobody predicted, a gap left open by the literature.", BLUE],
    ["Abduce", "Propose a hypothesis that would render the fact unsurprising — and propose its rivals at the same time.", RUST],
    ["Deduce", "Derive a consequence that your hypothesis entails and the rivals do not. This is what makes the next step decisive.", GOLDD],
    ["Test", "Measure. Update confidence across the rival hypotheses — inductively, with all of Lecture 2's machinery.", BLUE],
    ["Iterate", "The surviving hypothesis becomes the new background, and its own anomalies start the loop again.", INK],
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
  txt(s, "WHY STEP 3 IS THE ONE PAPERS SKIP", { x: ML + 0.32, y: 5.3, w: 6, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "It is easy to observe, easy to propose an explanation, and easy to collect data that is consistent with it. What is hard — and what separates a study from an anecdote — is deriving a prediction that the rival explanations would not also make. Evidence consistent with every hypothesis on the table discriminates between none of them, however much of it you gather.", {
    x: ML + 0.32, y: 5.56, w: CW - 0.64, h: 0.66, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.18,
  });

  footer(s);
}

/* ================================================================== */
/*  19 — What counts as a theoretical model                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Abduction and Theoretical Models",
    "What Counts as a Theoretical Model",
    "A theoretical model is a deliberate simplification, adopted so that deduction becomes possible. David Marr's three levels are the standard way to say which simplification you have made.", true);

  const levels = [
    { n: "Level 1", t: "Computational", c: GOLDD,
      q: "What problem is being solved, and why is solving it appropriate?",
      b: "The specification, independent of any method: the input–output relation and the constraints it must respect.",
      ex: "Sorting: return a permutation of the input in non-decreasing order." },
    { n: "Level 2", t: "Algorithmic", c: BLUE,
      q: "What representation, and what process transforms input into output?",
      b: "The data structures and the procedure — still abstract, still independent of any particular machine.",
      ex: "Mergesort over arrays: divide, recurse, merge; Θ(n log n) comparisons." },
    { n: "Level 3", t: "Implementational", c: RUST,
      q: "How is the process physically realised?",
      b: "The substrate: instruction set, memory hierarchy, cache-line behaviour, compiler, hardware — or, in Marr's original setting, neurons.",
      ex: "A cache-aware merge in C, tuned for L2 residency on a specific x86 generation." },
  ];
  const cw = 3.83, gp = 0.37;
  levels.forEach((l, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.5, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, l.n.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: l.c, charSpacing: 1.2, valign: "middle" });
    txt(s, l.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.38, fontFace: HF, fontSize: 19, bold: true, color: INK, valign: "middle" });
    txt(s, l.q, { x: x + 0.28, y: y + 0.98, w: cw - 0.56, h: 0.62, fontFace: HF, fontSize: 11.5, italic: true, color: l.c, valign: "top", lineSpacingMultiple: 1.15 });
    txt(s, l.b, { x: x + 0.28, y: y + 1.68, w: cw - 0.56, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, l.ex, { x: x + 0.28, y: y + 2.74, w: cw - 0.56, h: 0.6, fontFace: BF, fontSize: 10, italic: true, color: l.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: 6.02, w: CW, h: 0.72, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "A great many confused CS papers confuse the levels: a claim proved at level 1 defended with level-3 measurements, or a level-3 optimisation reported as a level-2 advance. Naming your level is half of naming your contribution.", {
    x: ML + 0.32, y: 6.02, w: CW - 0.64, h: 0.72, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle",
  });

  footer(s);
}

/* ================================================================== */
/*  20 — Models of computation                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Abduction and Theoretical Models",
    "Models of Computation as Deductive Substrates",
    "Every cost claim and every impossibility result is stated inside one of these. The model is a premise — usually the load-bearing one.", true);

  const models = [
    ["Turing machine", "Unbounded tape, finite control.", "Defines computability itself; the reference model for decidability and reductions."],
    ["λ-calculus", "Functions as the primitive; substitution as the only rule.", "Substrate of functional languages, type theory, and proof assistants."],
    ["RAM model", "Unit-cost access to any memory cell.", "The default for algorithm analysis — and the premise Lecture 2 attacked."],
    ["PRAM", "Many processors, synchronous shared memory.", "Parallel algorithm design and lower bounds, abstracting away communication cost."],
    ["External-memory model", "Counts block transfers, not instructions; cache-oblivious variants too.", "Predicts real performance once data exceeds cache, where RAM misleads."],
    ["Finite automata", "Finite state, no auxiliary memory.", "Lexing, regular languages, protocols, and the substrate for model checking."],
    ["Process calculi", "Concurrent agents exchanging messages — CSP, π-calculus, actors.", "Reasoning about concurrency, deadlock, and distributed protocol correctness."],
    ["Probabilistic models", "Randomised steps; Markov chains; classes such as BPP.", "Randomised algorithms, average-case analysis, and probabilistic model checking."],
  ];
  const cw = 2.87, gp = 0.25, ch = 1.72, rg = 0.22;
  models.forEach((t, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, t[0], { x: x + 0.26, y: cy + 0.18, w: cw - 0.52, h: 0.36, fontFace: HF, fontSize: 12.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.02 });
    txt(s, t[1], { x: x + 0.26, y: cy + 0.58, w: cw - 0.52, h: 0.52, fontFace: BF, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.14 });
    txt(s, t[2], { x: x + 0.26, y: cy + 1.12, w: cw - 0.52, h: 0.5, fontFace: BF, fontSize: 9.5, italic: true, color: GOLDD, valign: "top", lineSpacingMultiple: 1.12 });
  });

  closer(s, "Choosing a model trades fidelity against tractability: the more faithfully it prices real hardware, the harder it becomes to prove anything in it. State which one you chose, and why.");
  footer(s);
}

/* ================================================================== */
/*  21 — Matching reasoning to research question                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Matching Reasoning to the Research Question",
    "Read the question you are actually asking, then read across. The last column is where the review will land.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "The question you are asking", w: 3.75 },
      { label: "Dominant direction", w: 2.15 },
      { label: "What licenses it", w: 3.06 },
      { label: "What a reviewer attacks", w: 3.27 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [RUST, GOLD, BLUE, GOLD, RUST],
    rows: [
      ["“Why does this system fail under X?”", "Abduction", "Rival explanations enumerated and ruled out", "The explanation you never considered"],
      ["“Does this property always hold?”", "Deduction", "A formal model with premises stated", "The premise that fails in deployment"],
      ["“Does this method generalise?”", "Induction", "Sampling design, held-out data, a stated bias", "The distribution you never sampled"],
      ["“What does this algorithm cost?”", "Deduction, in a model", "The machine model the analysis assumes", "Whether that model prices real hardware"],
      ["“Which account of this data is right?”", "Abduction, then deduction", "A prediction that separates the rivals", "Two hypotheses predicting the same thing"],
    ],
  });

  closer(s, "Most methodological objections reduce to a mismatch in this table — a question asked in one direction and answered in another.");
  footer(s);
}

/* ================================================================== */
/*  22 — Reasoning failures                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Reasoning Failures to Watch For",
    "Lecture 1 catalogued argumentative fallacies and Lecture 2 evidential ones. These are their inferential cousins — errors in the direction of travel itself.", true);

  const f = [
    ["Affirming the consequent", GOLDD, "“Our theory predicts X. We observed X. Therefore the theory is true.” X may follow from several theories; observing it eliminates none of them on its own."],
    ["Deductive overreach", GOLDD, "Treating a theorem's conclusion as a claim about a running system, when the model's premises were never checked against that system."],
    ["The convenience sample", BLUE, "Generalising from whatever data was easiest to collect — public repositories, undergraduate participants, one hardware generation — as though it were the population."],
    ["Stopping at the first explanation", RUST, "An abduction that never enumerated rivals, so “best explanation” silently means “the only one that occurred to us.”"],
    ["Confusing the two inductions", RUST, "Presenting a proof by mathematical induction as empirical support, or an empirical trend as though it had been proved. Different obligations, identical vocabulary."],
    ["Model laundering", BLUE, "Dressing an inductive guess in formal notation so that it inherits deduction's authority without acquiring deduction's guarantees."],
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
    "A Checklist for Your Own Reasoning");

  const items = [
    ["Name the direction.", "For each central step: deductive, inductive, or abductive? A paper that cannot answer this for its main claim has not yet decided what it is arguing."],
    ["Expose the premises, whichever direction you took.", "Deduction: which axioms must hold for the theorem to bite? Induction: what population was sampled? Abduction: which rivals were on the table?"],
    ["Enumerate before you abduce.", "“Best explanation” is empty until at least two candidates exist and you have said what would distinguish them."],
    ["Keep the two inductions apart.", "Mathematical and structural induction prove. Empirical induction supports. Never let one word carry both obligations in the same paragraph."],
    ["State your model and its level.", "Which model of computation licenses your cost claims, and which of Marr's levels is your contribution at? Both belong in the paper, not in your head."],
    ["Say what would falsify it.", "A deductive claim falls to a counter-example or a false premise; an inductive one to a shifted distribution; an abductive one to a better rival."],
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
    "Take a theorem from your own area and write out its premises as a numbered list. Which premise is most likely to be false in a system you have actually run — and what would that do to the conclusion?",
    "Find a machine-learning or empirical software-engineering paper. What is its inductive bias, and where in the paper is it stated? If it is not stated, what would you have to know to reproduce the result?",
    "Reconstruct a bug you have debugged as an abduction. Which hypotheses did you hold at once, and what observation finally discriminated between them?",
    "Take a performance claim from any paper. Which model of computation does its cost argument assume, and does that model price the hardware you would run it on?",
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
    "Deduction preserves truth but adds no content; induction adds content but cannot preserve truth; abduction generates the hypotheses on which the other two go to work. Research needs all three, in that cycle.",
    "Mathematical and structural induction are deductive despite the name. Confusing them with empirical induction lets a hope be read as a guarantee — the most consequential terminological slip in CS writing.",
    "Deduction in CS happens inside a formal system, and delivers exactly the strength of its premises: soundness, completeness, and the chosen model are all part of the claim.",
    "Induction is only possible because of inductive bias. No-free-lunch says an assumption-free learner cannot generalise; PAC theory bounds how much data a stated bias needs. So state the bias.",
    "A theoretical model is a deliberate simplification adopted to make deduction possible. Name the model, name its level in Marr's sense, and name where its predictions stop.",
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
    ["Peirce, C. S.", "“Deduction, Induction, and Hypothesis.” Popular Science Monthly, 1878; Collected Papers, Vol. 2."],
    ["Hoare, C. A. R.", "“An Axiomatic Basis for Computer Programming.” Communications of the ACM, 1969."],
    ["Pierce, B. C.", "Types and Programming Languages. MIT Press, 2002. — progress, preservation, and structural induction."],
    ["Winskel, G.", "The Formal Semantics of Programming Languages. MIT Press, 1993."],
    ["Clarke, E. M., Grumberg, O. & Peled, D.", "Model Checking. MIT Press, 1999. — exhaustive deduction and state explosion."],
    ["Valiant, L. G.", "“A Theory of the Learnable.” Communications of the ACM, 1984. — the PAC framework."],
    ["Shalev-Shwartz, S. & Ben-David, S.", "Understanding Machine Learning: From Theory to Algorithms. Cambridge University Press, 2014."],
    ["Wolpert, D. H. & Macready, W. G.", "“No Free Lunch Theorems for Optimization.” IEEE Trans. Evolutionary Computation, 1997."],
    ["Marr, D.", "Vision. Freeman, 1982. — the three levels of analysis, Chapter 1."],
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
