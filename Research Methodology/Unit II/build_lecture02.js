const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Research Methodology in CS";
pres.title = "Proof Methods in Computer Science";
pres.subject = "Unit II, Lecture 2 - Proof Methods";

/* ------------------------------------------------------------------ */
/*  Design system (sampled from Unit 02 Lecture 01)                     */
/* ------------------------------------------------------------------ */
const W = 13.333, H = 7.5;
const ML = 0.55, CW = 12.23;

const BG    = "1A1535"; // deep indigo, dark slides
const INK   = "241A4C"; // headings on white
const GOLD  = "D8A73E";
const GOLDD = "B08C3A"; // gold, legible on white
const BLUE  = "3D6EA6";
const RUST  = "B4522B";
const RUSTD = "8E3F20";
const TINT  = "F3F1FC";
const TINT2 = "FAF9FE";
const BODY  = "5C5A66";
const MUTED = "8A8894";
const DKMUT = "6E688F";
const DKBODY= "CFCAE6";

const HF = "Cambria";  // headings
const BF = "Calibri";  // body
const MF = "Courier New";

const RUNNING = "PROOF METHODS IN CS";
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

// Standard light content slide header. Returns the y where content may begin.
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

// Numbered circle marker.
function numDot(slide, x, y, d, n, color, textColor) {
  slide.addShape(pres.ShapeType.ellipse, {
    x: x, y: y, w: d, h: d, fill: { color: color }, line: { type: "none" },
  });
  txt(slide, String(n), {
    x: x, y: y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HF, fontSize: 13, bold: true, color: textColor || "FFFFFF",
  });
}

/**
 * Manual table: navy header band, zebra rows, left accent bar.
 */
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

  // motif: three overlapping translucent discs (carried over from Lecture 1)
  s.addShape(pres.ShapeType.ellipse, { x: 9.32, y: 4.42, w: 2.32, h: 2.32, fill: { color: BLUE, transparency: 45 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 10.06, y: 3.62, w: 2.32, h: 2.32, fill: { color: GOLD, transparency: 45 }, line: { color: GOLD, width: 0.75, transparency: 40 } });
  s.addShape(pres.ShapeType.ellipse, { x: 10.72, y: 4.56, w: 2.32, h: 2.32, fill: { color: RUST, transparency: 45 }, line: { type: "none" } });

  txt(s, "A LESSON IN RESEARCH METHODOLOGY", {
    x: 0.88, y: 1.52, w: 8, h: 0.28, fontFace: BF, fontSize: 10, bold: true,
    color: GOLD, charSpacing: 1.9, valign: "middle",
  });
  txt(s, "Proof Methods in\nComputer Science", {
    x: 0.84, y: 2.02, w: 9.4, h: 1.72, fontFace: HF, fontSize: 42, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.06,
  });
  txt(s, "Demonstration, Empirical, and Mathematical Argument", {
    x: 0.88, y: 4.12, w: 9, h: 0.36, fontFace: HF, fontSize: 16, italic: true,
    color: "E4DFFA", valign: "middle",
  });
  s.addShape(pres.ShapeType.line, {
    x: 0.88, y: 4.72, w: 2.6, h: 0, line: { color: "6E688F", width: 1 },
  });
  txt(s, "How a claim about a program, an algorithm, or a system is actually established —\nby building it, by measuring it, or by deriving it — and what each mode does and does not license.", {
    x: 0.88, y: 5.0, w: 8.4, h: 0.72, fontFace: BF, fontSize: 11.5,
    color: DKBODY, valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Research Methodology in CS   ·   Unit II · Lecture 2", {
    x: 0.88, y: 6.34, w: 7, h: 0.26, fontFace: BF, fontSize: 9,
    color: DKMUT, valign: "middle",
  });
  N += 1; // title slide carries no footer, but occupies a number
}

/* ================================================================== */
/*  2 — Three different things called proof                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What “Proof” Means in CS",
    "Three Different Things Called “Proof”",
    "Last session ended on Toulmin's Grounds — the evidence a claim rests on. Today's question is narrower and harder: what procedure actually manufactures admissible grounds in computing science?");

  const pts = [
    "In mathematics, “proof” means deductive certainty. In experimental science it means evidence strong enough to survive attempted refutation. A CS paper routinely uses the word in both senses, often on the same page.",
    "Computing science can settle a claim three ways — by building the thing, by measuring the thing, or by deriving the thing from assumptions. Each licenses a different strength of conclusion.",
    "The syllabus names them demonstration, empirical, and mathematical. They are instruments, not a ranking: a benchmark cannot establish necessity, and a theorem cannot establish that real users are faster.",
    "Choosing the wrong instrument is not a stylistic slip. It makes the claim unprovable in principle — however good the underlying work is.",
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
  txt(s, "THE CATEGORY ERROR", {
    x: 8.58, y: y + 0.22, w: 3.9, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true,
    color: GOLDD, charSpacing: 1.3, valign: "middle",
  });
  txt(s, "You cannot benchmark your way to a universal claim, and you cannot prove your way to a claim about real workloads.", {
    x: 8.58, y: y + 0.62, w: 3.9, h: 1.1, fontFace: HF, fontSize: 14.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.2,
  });
  txt(s, "Reviewers reject far more papers for a mismatch between the claim and the mode of proof than for arithmetic errors in the evidence itself.", {
    x: 8.58, y: y + 1.86, w: 3.9, h: 1.0, fontFace: BF, fontSize: 11,
    color: BODY, valign: "top", lineSpacingMultiple: 1.22,
  });
  s.addShape(pres.ShapeType.line, { x: 8.58, y: y + 3.4, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "Match the instrument to the quantifier in your claim.", {
    x: 8.58, y: y + 3.58, w: 3.9, h: 0.5, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  3 — Three modes                                                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What “Proof” Means in CS",
    "The Three Modes of Proof",
    "Each mode answers a different question, produces a different artifact, and supports a different logical form of claim.", true);

  const modes = [
    { k: "Mode 1", t: "Demonstration", c: RUST,
      q: "“It can be done.”",
      rows: [
        ["Establishes", "Feasibility and existence — that a design is realizable."],
        ["Instrument", "A working artifact, exercised under the conditions that made the claim doubtful."],
        ["Logical form", "∃ a system S such that property P holds of S."],
        ["Home fields", "Systems, PL, HCI, security, architecture."],
      ] },
    { k: "Mode 2", t: "Empirical", c: BLUE,
      q: "“It behaves this way, under these conditions.”",
      rows: [
        ["Establishes", "Regularity in observed behaviour; effect size; comparison."],
        ["Instrument", "Controlled measurement over a sample, plus statistical inference."],
        ["Logical form", "Under conditions C, X outperforms Y by δ, with confidence c."],
        ["Home fields", "ML, databases, SE, networking, performance analysis."],
      ] },
    { k: "Mode 3", t: "Mathematical", c: GOLDD,
      q: "“It must be so — and here is why.”",
      rows: [
        ["Establishes", "Necessity within a stated model; bounds; impossibility."],
        ["Instrument", "Deductive derivation from explicit assumptions."],
        ["Logical form", "∀ inputs of class I, property P holds — no exceptions."],
        ["Home fields", "Algorithms, complexity, verification, cryptography."],
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
      x: x + 0.28, y: y + 0.94, w: cw - 0.56, h: 0.44, fontFace: HF, fontSize: 11.5,
      italic: true, color: m.c, valign: "top", lineSpacingMultiple: 1.15,
    });
    let ry = y + 1.48;
    const hs = [0.62, 0.78, 0.66, 0.6];
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

  closer(s, "The three are not a hierarchy — they answer different questions. Ranking evidence is Shaw's taxonomy (Lecture 1); matching evidence to a claim is your job as an author.");
  footer(s);
}

/* ================================================================== */
/*  4 — What each mode can and cannot establish                        */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 1 · What “Proof” Means in CS",
    "What Each Mode Can — and Cannot — Establish",
    "Read the third column as the reviewer's opening question, and the fourth as the way papers most often fail it.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "Mode", w: 2.15 },
      { label: "Establishes", w: 3.4 },
      { label: "Cannot establish", w: 3.28 },
      { label: "Characteristic failure", w: 3.4 },
    ],
    rowH: [1.18, 1.18, 1.18],
    accents: [RUST, BLUE, GOLD],
    rows: [
      ["Demonstration",
       "Existence and feasibility. A constructive proof that the design is realizable and its constraints are jointly satisfiable.",
       "Generality, comparative superiority, or any performance guarantee beyond the configuration actually exercised.",
       "Reporting one working configuration as though it were a universal property of the approach."],
      ["Empirical",
       "Behaviour over a sampled population: effect size, comparative performance, variance, and the conditions each holds under.",
       "Necessity, and behaviour outside the sampled distribution of workloads, datasets, hardware, or users.",
       "Generalising past the benchmark population — or comparing against a baseline nobody tuned."],
      ["Mathematical",
       "Necessity inside the stated model: worst-case bounds, correctness, security reductions, impossibility results.",
       "That the model matches deployment. Constants, cache behaviour, and specification errors sit outside the proof.",
       "A theorem about a machine model no real system inhabits, with the load-bearing premise stated once and never revisited."],
    ],
  });

  closer(s, "Every claim carries a quantifier — “there exists,” “on average under C,” “for all.” The quantifier tells you which row you are in.");
  footer(s);
}

/* ================================================================== */
/*  5 — Divider: Part 1 -> Part 2                                      */
/* ================================================================== */
{
  const s = pres.addSlide();
  darkBase(s);
  txt(s, "PART 1  →  PART 2", {
    x: 0.88, y: 2.1, w: 8, h: 0.28, fontFace: BF, fontSize: 11, bold: true,
    color: GOLD, charSpacing: 2.0, valign: "middle",
  });
  txt(s, "From a taxonomy of proof\nto the first instrument: building it", {
    x: 0.84, y: 2.62, w: 10.4, h: 1.4, fontFace: HF, fontSize: 32, bold: true,
    color: "FFFFFF", valign: "middle", lineSpacingMultiple: 1.1,
  });
  txt(s, "If a claim can be settled by exhibiting a working thing, what exactly has been settled — and what has quietly not been?", {
    x: 0.88, y: 4.24, w: 9.2, h: 0.72, fontFace: HF, fontSize: 14, italic: true,
    color: "E4DFFA", valign: "top", lineSpacingMultiple: 1.25,
  });
  txt(s, "Next: proof by demonstration — the constructive existence proof of engineering.", {
    x: 0.88, y: 5.28, w: 9.2, h: 0.3, fontFace: BF, fontSize: 11,
    color: GOLD, valign: "middle",
  });
  footer(s, true);
}

/* ================================================================== */
/*  6 — Proof by demonstration                                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Proof by Demonstration",
    "Proof by Demonstration",
    "Establishing a claim by constructing an artifact and exercising it under conditions that make the claimed behaviour directly observable.");

  const steps = [
    ["Claim", "An existential assertion: this can be built, and it will do P."],
    ["Artifact", "A prototype, system, tool, language, or attack — actually implemented."],
    ["Exercise", "Run it on the case that made the claim doubtful, not the easy case."],
    ["Witness", "Observed behaviour that P holds of this artifact, in this configuration."],
    ["Conclusion", "∃ S : P(S). Feasibility settled; generality untouched."],
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
      bold: true, color: i === 4 ? GOLDD : RUST, charSpacing: 1.3, valign: "middle",
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
    ["The engineer's existence proof", "Where a mathematician writes “such an object exists,” a systems researcher builds one and switches it on. Both are constructive arguments; only the medium differs."],
    ["Strongest for “can”, weakest for “is”", "A demonstration is the most direct answer to “is this possible?” and the least informative answer to “is this generally true?”"],
    ["Why whole fields rely on it", "In systems, HCI, PL and security, what is theoretically possible and what is practically achievable diverge sharply. The artifact is the only witness that closes that gap."],
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
/*  7 — What a demonstration proves / doesn't                          */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Proof by Demonstration",
    "What a Demonstration Proves — and What It Doesn't",
    "The same artifact, read as evidence for two different claims, is decisive for one and silent on the other.", true);

  const panels = [
    { t: "It does prove", c: BLUE, fill: "EEF3F9", items: [
      "Realizability — the design is not merely a diagram; the constraints can be met simultaneously.",
      "That an assumed barrier is not fundamental — “this was thought impractical” is refuted by a running counter-instance.",
      "An upper bound on difficulty — the problem is at most as hard as the effort this artifact took.",
      "Existence of a design point — a concrete location in the design space that others can now measure against.",
    ] },
    { t: "It does not prove", c: RUST, fill: "F8EEEA", items: [
      "Superiority — “better than X” is a comparative claim, and it silently switches you into the empirical mode.",
      "Generality — behaviour outside the demonstrated workload, scale, dataset, or hardware is simply unobserved.",
      "Optimality or necessity — that this is the best way, or the only way, is a mathematical claim.",
      "Robustness — that it survives adversarial, degraded, or long-running conditions you never exercised.",
    ] },
  ];
  const pw = 5.99, pg = 0.25;
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: pw, h: 3.96, rectRadius: 0.05,
      fill: { color: p.fill }, line: { type: "none" },
    });
    txt(s, p.t.toUpperCase(), {
      x: x + 0.32, y: y + 0.26, w: pw - 0.64, h: 0.28, fontFace: BF, fontSize: 10,
      bold: true, color: p.c, charSpacing: 1.5, valign: "middle",
    });
    let iy = y + 0.72;
    p.items.forEach((it) => {
      s.addShape(pres.ShapeType.ellipse, {
        x: x + 0.34, y: iy + 0.14, w: 0.1, h: 0.1,
        fill: { color: p.c }, line: { type: "none" },
      });
      txt(s, it, {
        x: x + 0.62, y: iy, w: pw - 0.96, h: 0.74, fontFace: BF, fontSize: 11,
        color: BODY, valign: "top", lineSpacingMultiple: 1.2,
      });
      iy += 0.8;
    });
  });

  closer(s, "A demonstration answers “is it possible?” Every “is it better?” sentence in your paper has quietly changed instruments — and now owes a baseline.");
  footer(s);
}

/* ================================================================== */
/*  8 — Making a demonstration admissible                              */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Proof by Demonstration",
    "Making a Demonstration Admissible",
    "Six moves that separate Shaw's “Analysis” from Shaw's “Example” — the difference between evidence and an anecdote.", true);

  const items = [
    ["State the existential claim", "Name the property the artifact is meant to witness, in one sentence, before any implementation detail. If you cannot write it, the demonstration has no target."],
    ["Report the configuration fully", "Versions, hardware, dataset, parameters, seeds. An unreproducible demonstration is not admissible evidence — it is a story about a machine nobody else has."],
    ["Ship the artifact", "Code, data, and run scripts. Artifact-evaluation badges at ICSE, PLDI, OSDI and SOSP exist precisely because a demonstration is only checkable when it is re-runnable."],
    ["Exercise the hard case", "The demonstration must cover the condition that made the claim doubtful. A prototype shown only on the easy input witnesses nothing that was ever in question."],
    ["Ablate the novel component", "Remove each new mechanism and show the property degrades or fails. Without ablation you have shown that a system works, not that your idea is what made it work."],
    ["Name the boundary", "State the configuration beyond which you did not demonstrate anything. This is Toulmin's rebuttal component, doing its job in advance."],
  ];
  const cw = 3.83, gp = 0.37, ch = 2.06, rg = 0.3;
  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: cy, w: cw, h: ch, rectRadius: 0.05,
      fill: { color: TINT }, line: { type: "none" },
    });
    numDot(s, x + 0.28, cy + 0.24, 0.32, i + 1, i < 3 ? RUST : INK);
    txt(s, it[0], {
      x: x + 0.7, y: cy + 0.2, w: cw - 0.98, h: 0.42, fontFace: HF, fontSize: 12.5,
      bold: true, color: INK, valign: "middle", lineSpacingMultiple: 1.05,
    });
    txt(s, it[1], {
      x: x + 0.28, y: cy + 0.78, w: cw - 0.56, h: 1.1, fontFace: BF, fontSize: 10.5,
      color: BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
  });

  footer(s);
}

/* ================================================================== */
/*  9 — Worked example: demonstration                                  */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 2 · Proof by Demonstration",
    "Worked Example: A Demonstration, Read as an Argument");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "“A general-purpose programming model can let non-specialists write fault-tolerant computations over thousands of commodity machines.”   ", options: { color: BODY } },
    { text: "— Dean & Ghemawat, MapReduce, OSDI 2004", options: { italic: true, color: MUTED, fontSize: 10.5 } },
  ], { x: ML, y: y - 0.28, w: CW, h: 0.5, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  matrix(s, {
    x: ML, y: y + 0.34, w: CW,
    cols: [
      { label: "Toulmin component", w: 2.6 },
      { label: "How the demonstration supplies it", w: 9.63 },
    ],
    rowH: [0.55, 0.55, 0.55, 0.55, 0.55, 0.55],
    accents: [RUST, BLUE, BLUE, GOLD, GOLD, RUSTD],
    rows: [
      ["Claim", "The programming model is feasible and adoptable at production scale — an existential, not a comparative, assertion."],
      ["Grounds", "A working implementation, plus roughly a thousand distinct jobs written in the model and run inside Google over the reporting period."],
      ["Warrant", "If the model is realizable and non-specialists actually express real jobs in it at this scale, then the feasibility claim is settled."],
      ["Backing", "Established functional-programming primitives (map, reduce) and an existing distributed filesystem substrate the design could rest on."],
      ["Qualifier", "Holds for batch, data-parallel workloads on large commodity clusters — the scope the deployment actually covers."],
      ["Rebuttal", "Says nothing about iterative or low-latency workloads — precisely the gap that Spark, Dryad and their successors were later built to attack."],
    ],
  });

  closer(s, "Notice what is never claimed: no optimality, no proof, no head-to-head benchmark against alternatives that did not yet exist. The paper's power comes from a correctly bounded claim.");
  footer(s);
}

/* ================================================================== */
/*  10 — Empirical: the inductive leap                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Empirical Proof",
    "Empirical Proof: The Inductive Leap",
    "Establishing a claim by systematic observation of instances, then inferring a regularity that extends beyond the instances observed.");

  s.addShape(pres.ShapeType.roundRect, {
    x: ML, y: y, w: 3.1, h: 1.24, rectRadius: 0.06,
    fill: { color: TINT }, line: { type: "none" },
  });
  txt(s, "OBSERVED SAMPLE", { x: ML + 0.24, y: y + 0.22, w: 2.62, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, valign: "middle" });
  txt(s, "The runs you actually made: these traces, this hardware, these seeds, these participants.", { x: ML + 0.24, y: y + 0.52, w: 2.62, h: 0.72, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });

  txt(s, "induction", { x: ML + 3.1, y: y + 0.3, w: 1.5, h: 0.24, align: "center", valign: "middle", fontFace: BF, fontSize: 9, italic: true, color: GOLDD });
  txt(s, "————→", { x: ML + 3.1, y: y + 0.56, w: 1.5, h: 0.3, align: "center", valign: "middle", fontFace: BF, fontSize: 12, color: GOLD });
  txt(s, "the warrant", { x: ML + 3.1, y: y + 0.88, w: 1.5, h: 0.24, align: "center", valign: "middle", fontFace: BF, fontSize: 9, italic: true, color: MUTED });

  s.addShape(pres.ShapeType.roundRect, {
    x: ML + 4.6, y: y, w: 3.1, h: 1.24, rectRadius: 0.06,
    fill: { color: "F6EFE4" }, line: { type: "none" },
  });
  txt(s, "UNOBSERVED POPULATION", { x: ML + 4.84, y: y + 0.22, w: 2.62, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.2, valign: "middle" });
  txt(s, "Every workload, machine, dataset and user your claim silently ranges over.", { x: ML + 4.84, y: y + 0.52, w: 2.62, h: 0.72, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });

  const pts = [
    ["Every result is a sample; every claim is about a population.", "The measurement is not the contested part. The inference from the sample to the population is — and that inference is exactly Toulmin's warrant."],
    ["The warrant is never free.", "It is bought with sampling design, controls, repetition and statistics. Skip the purchase and the leap is unlicensed, however carefully the numbers were collected."],
    ["Hume's problem, in modern dress.", "No finite set of benchmark runs entails the next one. Empirical proof buys graded confidence, never necessity — which is why its claims must carry qualifiers."],
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
  txt(s, "THE DISTINCTION THAT MATTERS", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "A benchmark result is a measurement.\n\nA benchmark claim is an inference.\n\nReviewers attack the second.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 1.9, fontFace: HF, fontSize: 15, color: INK,
    valign: "top", lineSpacingMultiple: 1.15,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 2.78, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "This is why an empirical claim with no stated population is not merely imprecise — it is unfalsifiable. Nothing could count against a claim that never said what it was about.", {
    x: 8.85, y: y + 2.98, w: 3.63, h: 1.3, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  11 — Anatomy of an empirical study                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Empirical Proof",
    "Anatomy of an Empirical Study",
    "Five stages. The order is not a convention — it is what makes the result falsifiable at all.", true);

  const steps = [
    ["Hypothesis", "A falsifiable statement naming the comparison, the metric, and the expected direction. “X reduces P99 latency versus Y on read-heavy traces.”"],
    ["Design", "Subjects, factors, levels, controls, and sample size — fixed before any data is seen. Pre-registration in SE and HCI formalises exactly this."],
    ["Measurement", "Instrumented, repeated runs. Warm-up discarded, confounds held constant, seeds recorded, environment pinned."],
    ["Analysis", "Effect size first, significance second, dispersion always. Tests chosen for the data's actual distribution, not for convenience."],
    ["Inference", "The claim, qualified down to the population the design can genuinely support — and no further than that."],
  ];
  const bw = 2.23, bg = 0.27;
  steps.forEach((st, i) => {
    const x = ML + i * (bw + bg);
    numDot(s, x, y, 0.42, i + 1, i === 4 ? GOLDD : BLUE);
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
  txt(s, "WHY THE ORDER IS LOAD-BEARING", { x: ML + 0.32, y: 5.3, w: 5, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "Stages 1 and 2 must precede stage 3. Fix the hypothesis after seeing the data and every subsequent p-value is meaningless: the analysis is now guaranteed to confirm whatever the data happened to show. Reordering these stages is the mechanism behind HARKing, p-hacking, and the replication crisis — and it silently converts an empirical study into an elaborate description of noise.", {
    x: ML + 0.32, y: 5.56, w: CW - 0.64, h: 0.66, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.18,
  });

  footer(s);
}

/* ================================================================== */
/*  12 — Benchmarks, baselines, controls                               */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Empirical Proof",
    "Benchmarks, Baselines, and Controls",
    "Three design decisions that determine whether measurements are admissible at all — made before the first run, not defended after the last.", true);

  const cards = [
    { k: "The population, made concrete", t: "Benchmark", c: BLUE, b: "The workload standing in for everything your claim ranges over. It must be representative of that population, publicly available so others can re-run it, and chosen before you see which one flatters your method.",
      risk: "Risk: a whole subfield over-fitting to one dataset, until progress on the benchmark stops tracking progress on the problem." },
    { k: "The alternative, at full strength", t: "Baseline", c: RUST, b: "The strongest reasonable competitor, tuned with the same care and the same effort budget as your own system. Use the current state of the art, not the version that was current when you started.",
      risk: "Risk: an untuned or outdated baseline turns a comparison into a strawman, and the result evaporates the moment someone tunes it." },
    { k: "Everything else, held still", t: "Control", c: GOLDD, b: "All variables except the factor under study, fixed: hardware and thermal state, compiler flags, warm-up, dataset order, random seeds, background load, and library versions.",
      risk: "Risk: an uncontrolled confound means the difference you measured may have nothing to do with the change you made." },
  ];
  const cw = 3.83, gp = 0.37;
  cards.forEach((c, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: cw, h: 3.5, rectRadius: 0.05,
      fill: { color: TINT }, line: { type: "none" },
    });
    txt(s, c.k.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: c.c, charSpacing: 1.2, valign: "middle" });
    txt(s, c.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.38, fontFace: HF, fontSize: 19, bold: true, color: INK, valign: "middle" });
    txt(s, c.b, { x: x + 0.28, y: y + 0.98, w: cw - 0.56, h: 1.5, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, c.risk, { x: x + 0.28, y: y + 2.54, w: cw - 0.56, h: 0.78, fontFace: BF, fontSize: 10, italic: true, color: c.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: ML, y: 6.02, w: CW, h: 0.72, rectRadius: 0.05,
    fill: { color: "F6EFE4" }, line: { type: "none" },
  });
  txt(s, "The most common objection in empirical CS review is not “your numbers are wrong.” It is “your baseline was weak,” or “your benchmark was chosen after the fact.”", {
    x: ML + 0.32, y: 6.02, w: CW - 0.64, h: 0.72, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle",
  });

  footer(s);
}

/* ================================================================== */
/*  13 — Statistics: the warrant made explicit                         */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Empirical Proof",
    "Statistics: The Warrant Made Explicit",
    "Statistical reporting is not decoration on a result. It is the written form of the reason your evidence supports your claim.", true);

  const pw = 5.99, pg = 0.25;
  const panels = [
    { tag: "WEAK", c: RUST, fill: "F8EEEA",
      quote: "“Our method is 12% faster than the baseline.”",
      note: "One run per configuration, no dispersion, no test, no effect size. Nothing in the sentence distinguishes a real improvement from ordinary run-to-run variance on a shared machine — and timing noise on modern hardware routinely exceeds 12%.",
      verdict: "The warrant is missing entirely. The reader is asked to make the inductive leap on trust." },
    { tag: "STRONG", c: BLUE, fill: "EEF3F9",
      quote: "“Across 30 runs per configuration on 3 hardware generations, median speed-up 1.12× (IQR 1.08–1.17); Mann–Whitney U, p < 0.01; Cliff's δ = 0.61 (large).”",
      note: "Sample size, dispersion, a test appropriate to skewed timing data, and a magnitude the reader can weigh against engineering cost. The population is named, and the qualifier is visible in the sentence itself.",
      verdict: "The warrant is stated, backed, and bounded — Toulmin's components, in statistical clothing." },
  ];
  panels.forEach((p, i) => {
    const x = ML + i * (pw + pg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: pw, h: 2.94, rectRadius: 0.05, fill: { color: p.fill }, line: { type: "none" } });
    txt(s, p.tag, { x: x + 0.32, y: y + 0.24, w: 2, h: 0.26, fontFace: BF, fontSize: 10, bold: true, color: p.c, charSpacing: 1.6, valign: "middle" });
    txt(s, p.quote, { x: x + 0.32, y: y + 0.6, w: pw - 0.64, h: 0.86, fontFace: HF, fontSize: 13, color: INK, valign: "top", lineSpacingMultiple: 1.18 });
    txt(s, p.note, { x: x + 0.32, y: y + 1.52, w: pw - 0.64, h: 0.86, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, p.verdict, { x: x + 0.32, y: y + 2.42, w: pw - 0.64, h: 0.42, fontFace: BF, fontSize: 10, italic: true, color: p.c, valign: "top", lineSpacingMultiple: 1.15 });
  });

  const rules = [
    ["Report distributions, not points", "Execution times are skewed and rarely normal. Give median and spread; a mean alone hides the tail your users will actually feel."],
    ["Effect size, then significance", "A p-value answers “distinguishable from noise?”. Effect size answers “does it matter?”. Only the second is a research finding."],
    ["Fix and publish your seeds", "An unreported random seed is an uncontrolled variable. Reporting the best of many seeds is a selection effect, not a result."],
    ["Correct for multiple comparisons", "Test twenty configurations at α = 0.05 and one will look significant by construction. Adjust, or pre-register the one you meant."],
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
/*  14 — Threats to validity                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 3 · Empirical Proof",
    "Threats to Validity",
    "Four standing questions any empirical claim must answer. Each maps to a different link in the chain from measurement to conclusion.", true);

  const th = [
    { t: "Internal", c: BLUE, q: "Did the factor you changed actually cause the difference you measured?",
      ex: "Warm-up and JIT effects · thermal throttling · hardware drift between runs · dataset ordering · a change shipped alongside yours." },
    { t: "External", c: RUST, q: "Does the result extend beyond the workloads, machines, and users you sampled?",
      ex: "A single benchmark suite · one hardware generation · one dataset scale · students standing in for professional developers." },
    { t: "Construct", c: GOLDD, q: "Does your metric measure the property your claim is actually about?",
      ex: "Throughput as a proxy for user-perceived latency · raw accuracy on an imbalanced set · lines of code as a proxy for effort." },
    { t: "Conclusion", c: INK, q: "Do the statistics support the strength of the claim you drew from them?",
      ex: "Too few runs · no reported variance · violated test assumptions · p-hacking · HARKing · fishing across many configurations." },
  ];
  const cw = 2.87, gp = 0.25;
  th.forEach((t, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.62, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, "THREAT " + (i + 1), { x: x + 0.26, y: y + 0.24, w: cw - 0.52, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: t.c, charSpacing: 1.2, valign: "middle" });
    txt(s, t.t + " validity", { x: x + 0.26, y: y + 0.5, w: cw - 0.52, h: 0.6, fontFace: HF, fontSize: 17, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.05 });
    txt(s, t.q, { x: x + 0.26, y: y + 1.16, w: cw - 0.52, h: 1.0, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, "TYPICAL THREATS", { x: x + 0.26, y: y + 2.2, w: cw - 0.52, h: 0.2, fontFace: BF, fontSize: 7.5, bold: true, color: MUTED, charSpacing: 1.1, valign: "middle" });
    txt(s, t.ex, { x: x + 0.26, y: y + 2.44, w: cw - 0.52, h: 0.96, fontFace: BF, fontSize: 10, color: t.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "In Toulmin's terms, a threats-to-validity section is the paper naming its own rebuttals before a reviewer gets to name them — on the author's terms rather than the reviewer's.");
  footer(s);
}

/* ================================================================== */
/*  15 — Mathematical proof                                            */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Mathematical Proof",
    "Mathematical Proof: Deductive Certainty",
    "Establishing a claim by deriving it from explicitly stated assumptions, using truth-preserving rules of inference.");

  const pts = [
    ["What it buys you: universality.", "A theorem holds for every input in its scope — including the inputs nobody has run, will run, or could afford to run. No amount of measurement reaches that far."],
    ["What it costs you: the model.", "The conclusion is only as true as its premises. The RAM cost model, uniform memory access, an adversary's bounded power, an independence assumption — each is a premise smuggled in with the notation."],
    ["What only it can do: impossibility.", "No experiment shows that something cannot be done; a failed search is not a proof of absence. Impossibility results are mathematics' unique contribution to engineering."],
  ];
  let py = y;
  pts.forEach((p) => {
    s.addShape(pres.ShapeType.ellipse, { x: ML, y: py + 0.1, w: 0.12, h: 0.12, fill: { color: GOLD }, line: { type: "none" } });
    txt(s, p[0], { x: ML + 0.34, y: py, w: 7.36, h: 0.32, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "top" });
    txt(s, p[1], { x: ML + 0.34, y: py + 0.36, w: 7.36, h: 0.88, fontFace: BF, fontSize: 11.5, color: BODY, valign: "top", lineSpacingMultiple: 1.22 });
    py += 1.3;
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: py - 0.02, w: 7.7, h: 0.82, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
  txt(s, "A CS claim is “mathematically proved” when it follows necessarily from stated assumptions — not when it is merely expressed in symbols. Notation is not proof.", {
    x: ML + 0.3, y: py - 0.02, w: 7.1, h: 0.82, fontFace: BF, fontSize: 11.5, italic: true,
    color: INK, valign: "middle", lineSpacingMultiple: 1.18,
  });

  s.addShape(pres.ShapeType.roundRect, { x: 8.55, y: y, w: 4.23, h: 4.5, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "WHERE THE CONTENT ACTUALLY SITS", { x: 8.85, y: y + 0.3, w: 3.63, h: 0.24, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "A proof transfers certainty from premises to conclusion. It does not create certainty.", {
    x: 8.85, y: y + 0.74, w: 3.63, h: 1.2, fontFace: HF, fontSize: 15.5, color: INK,
    valign: "top", lineSpacingMultiple: 1.18,
  });
  s.addShape(pres.ShapeType.line, { x: 8.85, y: y + 2.08, w: 1.5, h: 0, line: { color: GOLD, width: 1.25 } });
  txt(s, "So the real content of any theorem lives in its assumptions. When you read a proof critically, you are rarely hunting for an invalid inference step — you are hunting for the premise that quietly did all the work, and asking whether any real system satisfies it.", {
    x: 8.85, y: y + 2.28, w: 3.63, h: 1.9, fontFace: BF, fontSize: 11, color: BODY,
    valign: "top", lineSpacingMultiple: 1.22,
  });

  footer(s);
}

/* ================================================================== */
/*  16 — Proof technique toolkit                                       */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Mathematical Proof",
    "The Proof-Technique Toolkit",
    "Eight techniques that cover most of what a CS paper or thesis needs. The skill is not executing them — it is recognising which one the claim calls for.", true);

  const tools = [
    ["Direct proof", "Chain the assumptions forward to the conclusion.", "Correctness of a straight-line transformation; closure properties."],
    ["Contraposition", "Prove ¬Q ⇒ ¬P instead of P ⇒ Q.", "When the negated statement is the tractable one to reason about."],
    ["Contradiction", "Assume ¬P and derive an absurdity.", "Non-existence claims; minimal-counterexample arguments."],
    ["Induction", "Base case plus inductive step, over ℕ or over structure.", "Recursion, recursive data types, algorithm correctness in n."],
    ["Loop invariant", "Initialisation, maintenance, termination.", "Correctness of iterative algorithms — induction, specialised to loops."],
    ["Construction", "Exhibit the object the claim says exists.", "Achievability results and upper bounds; the theorist's demonstration."],
    ["Counter-example", "One instance refutes a universal claim.", "Killing a conjecture, or a guarantee someone stated too broadly."],
    ["Reduction", "Transform problem A into problem B.", "NP-hardness, undecidability, lower bounds, cryptographic security."],
  ];
  const cw = 2.87, gp = 0.25, ch = 1.72, rg = 0.22;
  tools.forEach((t, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = ML + col * (cw + gp), cy = y + row * (ch + rg);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: cy, w: cw, h: ch, rectRadius: 0.05, fill: { color: row === 0 ? TINT : TINT2 }, line: { color: "E6E2F5", width: 1 } });
    txt(s, t[0], { x: x + 0.26, y: cy + 0.2, w: cw - 0.52, h: 0.32, fontFace: HF, fontSize: 13.5, bold: true, color: INK, valign: "middle" });
    txt(s, t[1], { x: x + 0.26, y: cy + 0.56, w: cw - 0.52, h: 0.56, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.15 });
    txt(s, t[2], { x: x + 0.26, y: cy + 1.14, w: cw - 0.52, h: 0.46, fontFace: BF, fontSize: 9.5, italic: true, color: GOLDD, valign: "top", lineSpacingMultiple: 1.12 });
  });

  closer(s, "Also in regular use: exhaustive case analysis, the probabilistic method, adversary arguments, and diagonalisation — the last of which we meet again three slides from now.");
  footer(s);
}

/* ================================================================== */
/*  17 — Worked: loop invariant                                        */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Mathematical Proof",
    "Worked Example: Correctness by Loop Invariant");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "“Insertion sort terminates, and on termination the array is a sorted permutation of its input.”", options: { color: BODY } },
  ], { x: ML, y: y - 0.44, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 0.16, w: 4.6, h: 2.5, rectRadius: 0.05, fill: { color: "F5F4FB" }, line: { type: "none" } });
  txt(s, "for j = 2 to A.length\n    key = A[j]\n    i = j - 1\n    while i > 0 and A[i] > key\n        A[i+1] = A[i]\n        i = i - 1\n    A[i+1] = key", {
    x: ML + 0.3, y: y + 0.34, w: 4.0, h: 2.14, fontFace: MF, fontSize: 11.5,
    color: INK, valign: "top", lineSpacingMultiple: 1.24,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 2.86, w: 4.6, h: 1.5, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "THE INVARIANT", { x: ML + 0.3, y: y + 3.04, w: 4.0, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "At the start of each iteration of the for loop, A[1 .. j−1] contains exactly the elements originally in A[1 .. j−1], in sorted order.", {
    x: ML + 0.3, y: y + 3.3, w: 4.0, h: 0.94, fontFace: BF, fontSize: 11, color: INK,
    valign: "top", lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["Initialisation", "Before the first iteration j = 2, so A[1 .. 1] is a single element — trivially sorted, and trivially a permutation of itself. The invariant holds on entry."],
    ["Maintenance", "The while loop shifts every element of A[1 .. j−1] greater than key one position right, then places key in the vacated slot. Only positions change, so the multiset is preserved; key lands after all smaller elements and before all larger ones, so A[1 .. j] is sorted when j is incremented."],
    ["Termination", "The for loop ends with j = n + 1. Substituting into the invariant gives: A[1 .. n] contains the original elements, in sorted order — which is exactly the postcondition, so insertion sort is correct."],
  ];
  let sy = y + 0.16;
  steps.forEach((st, i) => {
    numDot(s, 5.5, sy + 0.02, 0.34, i + 1, GOLDD);
    txt(s, st[0], { x: 6.06, y: sy, w: 6.72, h: 0.3, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "top" });
    txt(s, st[1], { x: 6.06, y: sy + 0.36, w: 6.72, h: 1.06, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    sy += 1.5;
  });

  txt(s, "Termination of the inner loop needs its own argument: i strictly decreases on each pass and is bounded below by 0, so the while loop cannot run forever. A correctness proof that skips this step establishes only partial correctness.", {
    x: 6.06, y: sy - 0.02, w: 6.72, h: 0.72, fontFace: BF, fontSize: 10.5, italic: true,
    color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  18 — Worked: lower bound                                           */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Mathematical Proof",
    "Worked Example: A Lower Bound No Benchmark Could Give");

  txt(s, [
    { text: "Claim under test:  ", options: { bold: true, color: INK } },
    { text: "“Any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case.”", options: { color: BODY } },
  ], { x: ML, y: y - 0.44, w: CW, h: 0.42, fontFace: BF, fontSize: 11.5, valign: "middle", isTextBox: true, margin: 0 });

  const steps = [
    ["Model", "Represent any comparison sort as a binary decision tree. Internal nodes are comparisons, the two children are the two outcomes, and each leaf is one permutation the algorithm can output."],
    ["Count the leaves", "To sort correctly, the algorithm must be able to produce every one of the n! possible orderings. So the tree has at least n! reachable leaves."],
    ["Bound the height", "A binary tree of height h has at most 2^h leaves. Therefore 2^h ≥ n!, and so h ≥ log₂(n!)."],
    ["Estimate", "By Stirling's approximation, log₂(n!) = Θ(n log n). The longest root-to-leaf path is the worst-case comparison count, so that count is Ω(n log n) — as claimed."],
  ];
  const cw = 2.87, gp = 0.25, ty = y + 0.16;
  steps.forEach((st, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: ty, w: cw, h: 2.66, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    numDot(s, x + 0.26, ty + 0.24, 0.34, i + 1, GOLDD);
    txt(s, st[0], { x: x + 0.26, y: ty + 0.7, w: cw - 0.52, h: 0.32, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "middle" });
    txt(s, st[1], { x: x + 0.26, y: ty + 1.08, w: cw - 0.52, h: 1.44, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
  });

  const pw = 5.99, pg = 0.25;
  s.addShape(pres.ShapeType.roundRect, { x: ML, y: y + 3.0, w: pw, h: 1.68, rectRadius: 0.05, fill: { color: "F6EFE4" }, line: { type: "none" } });
  txt(s, "WHAT THIS BUYS", { x: ML + 0.32, y: y + 3.2, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: GOLDD, charSpacing: 1.3, valign: "middle" });
  txt(s, "A statement about every comparison sort that will ever be written, including ones nobody has thought of yet. No quantity of benchmarking could establish this — measurement can only ever report on algorithms that already exist.", {
    x: ML + 0.32, y: y + 3.48, w: pw - 0.64, h: 1.06, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  s.addShape(pres.ShapeType.roundRect, { x: ML + pw + pg, y: y + 3.0, w: pw, h: 1.68, rectRadius: 0.05, fill: { color: "F8EEEA" }, line: { type: "none" } });
  txt(s, "WHAT IT COSTS", { x: ML + pw + pg + 0.32, y: y + 3.2, w: pw - 0.64, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: RUST, charSpacing: 1.3, valign: "middle" });
  txt(s, "Notice the premise doing all the work: comparison-based. Counting sort and radix sort run in linear time precisely because they leave that model. The theorem is airtight and, for the right input, entirely escapable.", {
    x: ML + pw + pg + 0.32, y: y + 3.48, w: pw - 0.64, h: 1.06, fontFace: BF, fontSize: 11, color: BODY, valign: "top", lineSpacingMultiple: 1.2,
  });

  footer(s);
}

/* ================================================================== */
/*  19 — Reduction and impossibility                                   */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 4 · Mathematical Proof",
    "Reduction and Impossibility",
    "The two mathematical results that most directly change what engineers do next — by telling them which doors are locked.", true);

  const cards = [
    { k: "Technique", t: "Reduction for hardness", c: BLUE,
      b: "If a known-hard problem B can be transformed into your problem A in polynomial time, then A is at least as hard as B. Cook–Levin gave the first NP-complete problem; every later NP-completeness result is a chain of reductions back to it.",
      out: "Consequence for practice: stop searching for an efficient exact algorithm. Redirect the effort to approximation, heuristics, parameterised algorithms, or restricted input classes." },
    { k: "Technique", t: "Diagonalisation for undecidability", c: RUST,
      b: "Turing's halting argument constructs a program that contradicts any supposed universal decider. Rice's theorem generalises it: every non-trivial semantic property of programs is undecidable.",
      out: "Consequence for practice: static analysers and verifiers must be approximate by necessity. Soundness and completeness cannot both be had, so every tool chooses which to sacrifice — and must say which." },
    { k: "Result class", t: "Impossibility results", c: GOLDD,
      b: "FLP (1985) proves that no deterministic protocol solves consensus in an asynchronous system if even one process may crash. Cryptographic lower bounds and distributed-systems trade-offs work the same way.",
      out: "Consequence for practice: real systems adopt randomisation, partial synchrony, or failure detectors — engineered escapes from a premise, not refutations of the theorem." },
  ];
  const cw = 3.83, gp = 0.37;
  cards.forEach((c, i) => {
    const x = ML + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: cw, h: 3.86, rectRadius: 0.05, fill: { color: TINT }, line: { type: "none" } });
    txt(s, c.k.toUpperCase(), { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.22, fontFace: BF, fontSize: 8, bold: true, color: c.c, charSpacing: 1.2, valign: "middle" });
    txt(s, c.t, { x: x + 0.28, y: y + 0.5, w: cw - 0.56, h: 0.64, fontFace: HF, fontSize: 16, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06 });
    txt(s, c.b, { x: x + 0.28, y: y + 1.22, w: cw - 0.56, h: 1.42, fontFace: BF, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.2 });
    txt(s, c.out, { x: x + 0.28, y: y + 2.7, w: cw - 0.56, h: 1.0, fontFace: BF, fontSize: 10, italic: true, color: c.c, valign: "top", lineSpacingMultiple: 1.18 });
  });

  closer(s, "An impossibility proof is a contribution because it redirects a field's effort. It does not tell you what to build — it tells you to stop pushing on a door that is locked, and go find the window.");
  footer(s);
}

/* ================================================================== */
/*  20 — Where proof meets practice                                    */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Where Proof Meets Practice",
    "Four places where the mathematical mode and the empirical mode disagree — and why the disagreement is information, not a defect.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "The tension", w: 3.15 },
      { label: "What actually happens", w: 5.28 },
      { label: "What an honest paper does", w: 3.8 },
    ],
    rowH: [0.86, 0.86, 0.86, 0.86],
    accents: [GOLD, BLUE, RUST, INK],
    rows: [
      ["Asymptotics hide constants",
       "Θ(n log n) with a constant of 10⁶ loses to Θ(n²) at every input size you will ever deploy. Complexity classes rank growth, not running time.",
       "Report the crossover point, or say plainly that the claim is asymptotic only."],
      ["The cost model is a premise",
       "The RAM model prices every memory access identically. Cache hierarchies, branch prediction, NUMA and prefetching do not — and the gap is orders of magnitude.",
       "State the model. If it is violated in deployment, measure the violation instead of ignoring it."],
      ["Worst case versus observed case",
       "Simplex is exponential in the worst case and fast in practice; SAT is NP-complete, and solvers routinely dispatch instances with millions of variables.",
       "Pair the bound with a distributional or empirical claim about the inputs that actually occur."],
      ["Verified is not the same as correct",
       "A proof is about a model of the program. Bugs then live in the gap: the specification, the compiler, the hardware, or an assumption the deployment quietly violates.",
       "Name what was verified, and against which specification — CompCert and seL4 both do this carefully."],
    ],
  });

  closer(s, "None of this is an argument against proof. It is an argument for saying explicitly which mode carries which part of your claim — and where you handed off from one to the other.");
  footer(s);
}

/* ================================================================== */
/*  21 — Triangulation                                                 */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Triangulation: Matching Claim to Proof Mode",
    "Find the sentence carrying your contribution, read its quantifier, then read across.", true);

  matrix(s, {
    x: ML, y: y, w: CW,
    cols: [
      { label: "The claim you are making", w: 3.6 },
      { label: "Primary mode", w: 2.05 },
      { label: "Supporting mode", w: 2.45 },
      { label: "What a reviewer will ask first", w: 4.13 },
    ],
    rowH: [0.68, 0.68, 0.68, 0.68, 0.68],
    accents: [RUST, BLUE, GOLD, GOLD, BLUE],
    rows: [
      ["“This is possible.”", "Demonstration", "—", "Is the artifact available, re-runnable, and exercised on the hard case?"],
      ["“This is faster / more accurate.”", "Empirical", "Demonstration", "Was the baseline tuned, and was the benchmark fixed before you saw results?"],
      ["“This always holds.”", "Mathematical", "Empirical", "Do your assumptions hold in any deployment anyone actually runs?"],
      ["“This cannot be done.”", "Mathematical", "—", "Is the model general enough for the impossibility to actually bite?"],
      ["“This is usable / adoptable.”", "Empirical (human)", "Demonstration", "Enough participants — and is the construct you measured the one you claim?"],
    ],
  });

  closer(s, "Strong papers stack modes: prove the bound, build the system, then measure the gap between the two — Shaw's Analysis and Evaluation, reinforcing each other.");
  footer(s);
}

/* ================================================================== */
/*  22 — Failures of proof                                             */
/* ================================================================== */
{
  const s = pres.addSlide();
  const y = head(s, "Part 5 · Practice",
    "Failures of Proof to Watch For",
    "Lecture 1 catalogued argumentative fallacies. These are their specifically evidential cousins — each one a mode used to support a claim it cannot reach.", true);

  const f = [
    ["Demonstration as generality", RUST, "One working configuration reported as though it were a property of the approach. The existential quantifier silently becomes a universal one somewhere between the results section and the abstract."],
    ["The strawman baseline", RUST, "A comparison against an untuned, outdated, or deliberately naive alternative. The result is real; it just measures the baseline's neglect rather than your contribution."],
    ["Asymptotic sleight of hand", GOLDD, "Claiming practical superiority from a complexity class, with constants and lower-order terms left unmentioned — and no measurement offered at the sizes anyone runs."],
    ["The seed lottery", BLUE, "Reporting the best random seed, the best run, or the best checkpoint. This is selection, not measurement, and it is invisible unless variance is reported."],
    ["The hidden premise", GOLDD, "A theorem whose real work is done by an assumption stated once in a preamble and never revisited — independence, synchrony, bounded adversaries, uniform cost."],
    ["HARKing", BLUE, "Hypothesising after the results are known: the finding is chosen from the data, then presented as though it had been predicted. The empirical twin of the post-hoc warrant."],
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
    "A Checklist for Your Own Proofs");

  const items = [
    ["Name the mode.", "In one sentence: is this claim settled by construction, by measurement, or by derivation? If the answer is “all three, a bit,” none of them is finished."],
    ["Match the mode to the quantifier.", "“There exists” → demonstration. “On average, under conditions C” → empirical. “For all inputs of class I” → mathematical. A mismatch here is not fixable by better writing."],
    ["Make the assumptions visible.", "Every theorem's premises, every study's population, every demonstration's configuration — stated where a reader will find them, not buried in a footnote."],
    ["Strengthen the alternative before you publish.", "Tune the baseline. Hunt for the counter-example. Attack your own model. Whatever you skip here, a reviewer will do for you, less charitably."],
    ["Report dispersion, not just the centre.", "Runs, variance, effect size, confidence. If you cannot supply them, say plainly that you have an existence proof rather than a comparison."],
    ["Say where it stops.", "The workload, the scale, the assumption, the input class beyond which you proved, measured, and built nothing at all."],
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
    "Take a paper from your own area. Which of the three modes carries its central claim — and does the quantifier in the abstract match the mode used in the evaluation?",
    "Find an empirical CS paper whose headline claim is stated universally (“X is faster than Y”). Rewrite it with the qualifier its evidence actually supports. How much of the claim survives?",
    "Pick an impossibility result you know — FLP, the halting problem, the Ω(n log n) sorting bound. Which premise would you have to break to escape it, and is that premise breakable in a real system?",
    "When is a demonstration sufficient on its own? Name a subfield where “we built it and it runs” is a complete contribution, and defend that position against someone who wants a benchmark.",
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
    "Computing science settles claims three ways — by demonstration, by empirical study, and by mathematical derivation — and each licenses a different strength of conclusion.",
    "A demonstration settles existence and feasibility. It never settles generality or superiority; the moment your sentence turns comparative, you owe a baseline.",
    "Empirical proof is an inference from a sample to a population. Its warrant is bought with design, control, repetition and statistics — and reported as effect size and dispersion, not significance alone.",
    "Mathematical proof gives universality inside a model, and is the only mode that can establish impossibility — but it inherits the truth of its assumptions, which is where critical reading should aim.",
    "The category error to avoid is a mismatch between the claim's quantifier and the mode used to support it. The mark of strong work is stacking modes, and saying honestly where each one stops.",
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
    ["Cormen, Leiserson, Rivest & Stein.", "Introduction to Algorithms. 4th ed., MIT Press, 2022. — loop invariants; the decision-tree lower bound."],
    ["Velleman, D. J.", "How to Prove It: A Structured Approach. 3rd ed., Cambridge University Press, 2019."],
    ["Sipser, M.", "Introduction to the Theory of Computation. 3rd ed., Cengage, 2013. — diagonalisation, reduction, undecidability."],
    ["Garey, M. R. & Johnson, D. S.", "Computers and Intractability: A Guide to the Theory of NP-Completeness. Freeman, 1979."],
    ["Fischer, M. J., Lynch, N. A. & Paterson, M. S.", "“Impossibility of Distributed Consensus with One Faulty Process.” Journal of the ACM, 1985."],
    ["Wohlin, C., Runeson, P., Höst, M., Ohlsson, M. C., Regnell, B. & Wesslén, A.", "Experimentation in Software Engineering. Springer, 2012."],
    ["Jain, R.", "The Art of Computer Systems Performance Analysis. Wiley, 1991."],
    ["Shaw, M.", "“Writing Good Software Engineering Research Papers.” Proc. ICSE, 2003. — the validation-type taxonomy from Lecture 1."],
    ["Dean, J. & Ghemawat, S.", "“MapReduce: Simplified Data Processing on Large Clusters.” Proc. OSDI, 2004."],
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
