# -*- coding: utf-8 -*-
"""Unit III - Lecture 2: Approaches to Literature Review."""
from kit import (box, card, eqbox, flow, goals, grid, marks, ol, p, qlist, rule,
                 sec, stack, sub, table, tw, ul, eq)

STEM = "CSEG3060_Unit3_L02_Approaches_to_Literature_Review"
RUNNER = "CSEG3060 · Unit III · Lecture 2 — Approaches to Literature Review"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 2 — Approaches to Literature Review",
    "desc": ("Unit III Lecture 2 for Research Methodology in Computer Science "
             "(CSEG3060): systematic, narrative, scoping and meta-analytical review "
             "methods, PRISMA reporting, effect sizes, fixed and random-effects models, "
             "heterogeneity and the decision heuristic for choosing an approach."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Approaches to Literature Review",
     "body": stack([
         p("Systematic, narrative, scoping and meta-analytical methods", "lead",
           "max-width:820px;color:var(--mint)"),
         card(p("Given my research question, which review method can legitimately "
                "answer it?", None,
                "margin:0;font-size:21px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 2 of 8 · 60 minutes · CO2", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO2",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Define and distinguish** the four approaches: systematic, narrative, scoping, meta-analytical",
         "**Identify** the methodological steps each approach requires",
         "**Evaluate** which approach suits a given CS research question",
         "**Apply** reporting standards — PRISMA, PRISMA-S, PRISMA-ScR",
         "**Critically appraise** published reviews for methodological rigour",
     ]), None, "fill")},

    {"title": "What a review is", "kicker": "Foundations",
     "h": "A review is not a summary — it is a method",
     "body": stack([
         rule("A literature review is a <b>systematic, replicable and transparent "
              "synthesis</b> of existing scholarly contributions within a defined domain."),
         grid([
             card(ul(["The **breadth** and **depth** of evidence included",
                      "The **reproducibility** of search and synthesis",
                      "The **type of inference** permitted — qualitative or quantitative",
                      "The **defensibility** of claims under peer review"],
                     None, "margin:0;font-size:14px"),
                  "Your choice of approach determines…", "rust"),
             card(ul(["Maps the intellectual terrain",
                      "Identifies gaps, contradictions, open questions",
                      "Justifies the contribution of new work",
                      "Grounds hypotheses theoretically and empirically"],
                     None, "margin:0;font-size:14px"),
                  "What every review must do", "teal"),
         ]),
         card(p("CS research output roughly <b>doubles every five years</b>. Expert "
                "intuition alone can no longer guarantee coverage — which is why "
                "protocolised methods migrated into the discipline.", "small", "margin:0"),
              "Why this matters in computing", "tint"),
     ], 12)},

    {"title": "Framing the question", "kicker": "Foundations",
     "h": "Protocols, question formats and reporting standards",
     "body": stack([
         grid([
             card(p("A <b>pre-specified plan</b> stating the research question, "
                    "inclusion/exclusion criteria, search strategy, data-extraction "
                    "method and synthesis approach. The primary defence against "
                    "post-hoc bias.", "small", "margin:0"), "The review protocol", "teal"),
             card(stack([
                 p("<b>PICO</b> — Population, Intervention, Comparison, Outcome · "
                   "systematic reviews and meta-analyses", "small", "margin:0"),
                 p("<b>PEO</b> — Population, Exposure, Outcome · qualitative phenomena",
                   "small", "margin:0"),
                 p("<b>PCC</b> — Population, Concept, Context · scoping reviews",
                   "small", "margin:0"),
             ], 5), "Question formats"),
         ], "1fr 1.15fr"),
         grid([
             card(p("Systematic reviews and meta-analyses", "fine", "margin:0"),
                  "PRISMA", "tint"),
             card(p("Search reporting", "fine", "margin:0"), "PRISMA-S", "tint"),
             card(p("Scoping reviews", "fine", "margin:0"), "PRISMA-ScR", "tint"),
         ], "1fr 1fr 1fr", gap="10px"),
         rule("<b>Protocol &ne; reporting standard.</b> A protocol governs <i>what you "
              "will do</i>; a reporting standard governs <i>what you must disclose</i>. "
              "PRISMA compliance does not make a weak review strong — it makes a weak "
              "review visible."),
     ], 11)},

    {"title": "Systematic review", "kicker": "Approach 1 of 4",
     "h": "Systematic Literature Review: the methodological anatomy",
     "body": stack([
         rule("A review using <b>explicit, reproducible methods</b> to collate and "
              "synthesise <i>all</i> studies meeting pre-defined eligibility criteria, "
              "in answer to a specific, bounded question."),
         flow(["Protocol", "Search", "Screen", "Appraise", "Extract", "Report"]),
         grid([
             card(p("Published or institutionally archived <b>before</b> screening begins, "
                    "fixing criteria in advance.", "small", "margin:0"),
                  "Pre-registered protocol"),
             card(p("IEEE Xplore, ACM DL, Scopus, Web of Science, ScienceDirect, plus "
                    "backward and forward citation chasing.", "small", "margin:0"),
                  "Exhaustive search"),
             card(p("Two-phase screening; quality appraisal of every included study "
                    "using validated instruments (JBI, CASP).", "small", "margin:0"),
                  "Screen and appraise"),
             card(p("Standardised extraction forms; transparent reporting via a PRISMA "
                    "flow diagram.", "small", "margin:0"), "Extract and report"),
         ], "1fr 1fr 1fr 1fr", gap="10px"),
         card(p("In computing the canonical procedural reference is <b>Kitchenham &amp; "
                "Charters (2007)</b>, <i>Guidelines for performing Systematic Literature "
                "Reviews in Software Engineering</i> — itself the product of a systematic "
                "review across seven digital libraries.", "small", "margin:0"),
              None, "rust"),
     ], 11)},

    {"title": "PRISMA flow", "kicker": "Approach 1 of 4",
     "h": "The PRISMA flow, and the SLR trade-off",
     "body": stack([
         grid([
             stack([
                 flow(["Identification", "Screening", "Eligibility", "Included"]),
                 eqbox("N<sub>e</sub> = N<sub>i</sub> &minus; N<sub>d,s</sub> "
                       "&minus; N<sub>d,e</sub> &minus; N<sub>d,r</sub> "
                       "&nbsp;&nbsp;with&nbsp;&nbsp; N<sub>e</sub> &le; N<sub>i</sub>"),
                 card(p("Worked counts: <b>3,142</b> identified &rarr; 2,801 excluded on "
                        "title/abstract &rarr; 294 excluded at full text &rarr; "
                        "<b>47 included</b>. Every exclusion at eligibility must carry a "
                        "stated reason.", "small", "margin:0"), None, "tint"),
             ], 10),
             stack([
                 card(ul(["Reproducible and transparent",
                          "Materially reduces selection bias",
                          "Licenses evidence-based conclusions"],
                         None, "margin:0;font-size:14px"), "Strengths", "teal"),
                 card(ul(["Time- and resource-intensive: **6–24 months**",
                          "May exclude valuable grey literature — arXiv, technical reports",
                          "Quality appraisal contested in CS: designs are heterogeneous"],
                         None, "margin:0;font-size:14px"), "Limitations", "rust"),
             ], 10),
         ], "1.25fr 1fr"),
     ], 11)},

    {"title": "Narrative review", "kicker": "Approach 2 of 4",
     "h": "Narrative review: interpretive synthesis and expert judgement",
     "body": stack([
         rule("A comprehensive, discursive synthesis <b>without rigidly defined search "
              "protocols</b> — interpretive rather than aggregative."),
         grid([
             card(ul(["Sources selected on the author's expertise and judgement",
                      "No registered protocol",
                      "Thematic or chronological organisation",
                      "Quality appraisal informal or absent",
                      "Aims at breadth, contextualisation, theoretical framing"],
                     None, "margin:0;font-size:14px"), "Methodological profile"),
             stack([
                 grid([
                     card(p("Short, opinion-driven", "fine", "margin:0"), "Editorial", "tint"),
                     card(p("Evaluative, argumentative stance", "fine", "margin:0"),
                          "Critical", "tint"),
                     card(p("Current developments and future directions", "fine", "margin:0"),
                          "State-of-the-art", "tint"),
                 ], "1fr 1fr 1fr", gap="8px"),
                 card(p("<b>Where it appears in CS:</b> survey articles in <i>ACM Computing "
                        "Surveys</i>; tutorials in <i>IEEE Transactions</i> introducing an "
                        "emerging sub-field; the framing chapter of a thesis.",
                        "small", "margin:0"), None, "teal"),
             ], 10),
         ], "1fr 1.2fr"),
         grid([
             card(p("Flexible · theoretically deep · viable for emerging topics · "
                    "<b>2–8 weeks</b>", "small", "margin:0"), "Strengths", "teal"),
             card(p("Susceptible to selection bias · hard to replicate · often "
                    "methodologically opaque", "small", "margin:0"), "Limitations", "rust"),
         ]),
     ], 11)},

    {"title": "Scoping review", "kicker": "Approach 3 of 4",
     "h": "Scoping review: mapping a heterogeneous field",
     "body": stack([
         rule("Maps the key <b>concepts, types of evidence and gaps</b> in an area — the "
              "method of choice when a topic is broad, heterogeneous or not previously "
              "reviewed. Arksey &amp; O'Malley (2005), refined by the Joanna Briggs Institute."),
         flow(["1 Identify the question", "2 Identify studies", "3 Select studies",
               "4 Chart the data", "5 Collate and report"]),
         grid([
             card(p("<b>Optional stage 6 — stakeholder consultation.</b> Practitioners "
                    "routinely identify grey literature and deployment concerns absent "
                    "from indexed venues.", "small", "margin:0"), None, "tint"),
             card(p("<b>PCC</b> — Population/Participants · Concept · Context. Reported "
                    "under <b>PRISMA-ScR</b>.", "small", "margin:0"), "Question framing", "teal"),
         ], "1.3fr 1fr"),
         grid([
             card(ul(["Broad, exploratory questions",
                      "Maps heterogeneity across a field",
                      "Identifies gaps for future SLRs · **3–6 months**"],
                     None, "margin:0;font-size:14px"), "Strengths", "teal"),
             card(ul(["**Does not appraise quality** of included studies",
                      "Findings are less definitive",
                      "Can blur conceptually into a narrative review"],
                     None, "margin:0;font-size:14px"), "Limitations", "rust"),
         ]),
     ], 10)},

    {"title": "Meta-analysis I", "kicker": "Approach 4 of 4 · part 1",
     "h": "Meta-analysis: quantitative synthesis and effect sizes",
     "body": stack([
         rule("A <b>quantitative synthesis</b> that statistically combines results from "
              "independent studies to produce a pooled effect estimate. A systematic "
              "review is its <b>precondition</b>, not its alternative."),
         grid([
             stack([
                 p("Continuous outcomes — standardised mean difference", "fine", "margin:0"),
                 eqbox("SMD = (X&#772;<sub>1</sub> &minus; X&#772;<sub>2</sub>) / "
                       "s<sub>pooled</sub>"),
                 eqbox("s<sub>pooled</sub> = &radic;[ ((n<sub>1</sub>&minus;1)s<sub>1</sub>&sup2; "
                       "+ (n<sub>2</sub>&minus;1)s<sub>2</sub>&sup2;) / "
                       "(n<sub>1</sub>+n<sub>2</sub>&minus;2) ]", "light"),
             ], 8),
             stack([
                 p("Binary outcomes — odds ratio from a 2&times;2 table", "fine", "margin:0"),
                 eqbox("OR = (a &middot; d) / (b &middot; c)"),
                 card(p("<b>Feasibility condition.</b> Studies must report commensurable "
                        "outcomes with dispersion statistics. Incompatible metrics make "
                        "pooling <i>illegitimate</i>, not merely difficult.",
                        "small", "margin:0"), None, "rust"),
             ], 8),
         ]),
         card(p("<b>Applications in CS:</b> empirical software engineering (pair programming "
                "and defect density) · educational data mining (intelligent tutoring) · "
                "HCI (interface design and task-completion time).", "small", "margin:0"),
              None, "tint"),
     ], 11)},

    {"title": "Meta-analysis II", "kicker": "Approach 4 of 4 · part 2",
     "h": "Fixed-effect and random-effects pooling",
     "body": stack([
         grid([
             stack([
                 card(p("Assumes a <b>single true effect</b>; all divergence is sampling "
                        "error.", "small", "margin:0"), "Fixed effect", "teal"),
                 eqbox("&theta;&#770;<sub>FE</sub> = &Sigma; w<sub>i</sub>&theta;&#770;<sub>i</sub> "
                       "/ &Sigma; w<sub>i</sub> &nbsp;&nbsp; w<sub>i</sub> = 1 / Var(&theta;&#770;<sub>i</sub>)"),
             ], 8),
             stack([
                 card(p("Assumes true effects <b>vary</b>; adds between-study variance "
                        "&tau;&sup2; to every weight.", "small", "margin:0"),
                      "Random effects", "rust"),
                 eqbox("w<sub>i</sub><sup>RE</sup> = 1 / (Var(&theta;&#770;<sub>i</sub>) + &tau;&sup2;)"),
             ], 8),
         ]),
         eqbox("&tau;&#770;&sup2; = max( 0 , (Q &minus; (k&minus;1)) / C )&nbsp;&nbsp;&nbsp; "
               "C = &Sigma;w<sub>i</sub> &minus; &Sigma;w<sub>i</sub>&sup2; / &Sigma;w<sub>i</sub>"
               "&nbsp;&nbsp;<span style='font-size:14px'>(DerSimonian&ndash;Laird)</span>",
               "light"),
         grid([
             card(p("Fixed effect asks <i>what is <b>the</b> effect?</i> Random effects "
                    "asks <i>what is the <b>average</b> of a distribution of effects?</i>",
                    "small", "margin:0"), "The estimand differs", "tint"),
             card(p("CS studies differ in datasets, hardware, hyperparameters and "
                    "participants — so <b>random effects is the appropriate default</b>. "
                    "Fixed effect under real heterogeneity gives intervals that are too "
                    "narrow.", "small", "margin:0"), "Model selection rule", "rust"),
         ], "1fr 1.25fr"),
     ], 10)},

    {"title": "Meta-analysis III", "kicker": "Approach 4 of 4 · part 3",
     "h": "Heterogeneity and publication bias",
     "body": stack([
         grid([
             stack([
                 eqbox("Q = &Sigma; w<sub>i</sub> (&theta;&#770;<sub>i</sub> &minus; "
                       "&theta;&#770;<sub>FE</sub>)&sup2;"),
                 eqbox("I&sup2; = max( 0 , (Q &minus; (k&minus;1)) / Q ) &times; 100%", "light"),
                 card(stack([
                     p("I&sup2; &lt; 25% &nbsp;·&nbsp; <b>low</b> heterogeneity", "small", "margin:0"),
                     p("25% &le; I&sup2; &lt; 75% &nbsp;·&nbsp; <b>moderate</b>", "small", "margin:0"),
                     p("I&sup2; &ge; 75% &nbsp;·&nbsp; <b>high</b> — demands subgroup analysis "
                       "or meta-regression, not a louder pooled claim", "small", "margin:0"),
                 ], 3), "Interpretation bands", "tint"),
             ], 8),
             stack([
                 card(p("The preferential publication of statistically significant results. "
                        "Diagnosed by <b>funnel-plot asymmetry</b>; tested formally by "
                        "<b>Egger's regression</b>.", "small", "margin:0"),
                      "Publication bias", "rust"),
                 eqbox("t = b / SE(b)"),
                 card(p("A symmetric funnel: precise studies cluster near the pooled "
                        "estimate, imprecise ones fan out below. A missing lower-left "
                        "corner indicates small negative studies that were run but never "
                        "published.", "small", "margin:0"), None, "tint"),
                 card(p("<b>CS-specific pressure:</b> benchmark culture rewards improvements "
                        "over null results, so negative findings on a popular architecture "
                        "are systematically under-published.", "small", "margin:0"),
                      None, "rust"),
             ], 8),
         ]),
     ], 10)},

    {"title": "Comparative synthesis", "kicker": "Choosing an approach",
     "h": "Four approaches across eight dimensions",
     "body": stack([
         table(["Dimension", "Systematic", "Narrative", "Scoping", "Meta-analysis"], [
             ["Research question", "Specific, focused", "Broad, contextual",
              "Broad, exploratory", "Specific, quantitative"],
             ["Protocol", "Pre-specified", "Optional", "Optional", "Pre-specified"],
             ["Search strategy", "Exhaustive", "Selective", "Comprehensive, iterative",
              "Exhaustive"],
             ["**Quality appraisal**", "**Mandatory**", "Informal", "**Not required**",
              "**Mandatory**"],
             ["Synthesis", "Qualitative or quantitative", "Qualitative (thematic)",
              "Descriptive mapping", "Quantitative pooling"],
             ["**Reproducibility**", "**High**", "**Low**", "Moderate", "**High**"],
             ["Output", "Evidence-based conclusions", "Conceptual synthesis",
              "Conceptual map", "Pooled effect size"],
             ["Typical duration", "6–24 months", "2–8 weeks", "3–6 months", "3–12 months"],
         ]),
         rule("<b>Decision heuristic.</b> Quantitative pooling feasible and metrics "
              "compatible &rarr; <b>meta-analysis</b>. Precise question needing exhaustive, "
              "reproducible synthesis &rarr; <b>systematic</b>. Mapping an emerging or "
              "heterogeneous field &rarr; <b>scoping</b>. Conceptual or theoretical framing "
              "&rarr; <b>narrative</b>."),
         card(p("<b>Fastest diagnostic pair:</b> Is the question broad or precise? Are the "
                "outcome metrics commensurable? These two answers isolate the correct "
                "method almost every time.", "small", "margin:0"), None, "tint"),
     ], 10)},

    {"title": "SLR workflow in CS", "kicker": "Practical application",
     "h": "Executing an SLR in computer science — and where bias enters",
     "body": stack([
         grid([
             table(["Step", "What you do", "Bias risk"], [
                 ["**1–2** Question and protocol", "PICO/PEO; fix strings, databases, criteria, appraisal tools",
                  "A question so narrow it guarantees a pre-decided answer"],
                 ["**3–4** Search and screen", "IEEE Xplore, ACM DL, Scopus, ScienceDirect, Scholar; two-phase screen",
                  "Single-database reliance; over-restrictive terms; unjustified date limits"],
                 ["**5–6** Extract and appraise", "Standardised forms; JBI or CASP checklists, two reviewers",
                  "Extraction drift; weak studies treated as equal evidence"],
                 ["**7–8** Synthesise and report", "Thematic synthesis, pooling where legitimate, PRISMA 2020",
                  "Selective citation; silent method reclassification"],
             ]),
             stack([
                 card(p("Boolean search string", "fine", "margin:0 0 6px"), None, "tint",
                      "padding:10px 12px"),
                 eqbox("(term<sub>1</sub> &or; term<sub>2</sub>) &and; (term<sub>3</sub>) "
                       "&and; &not;(exclusion term)", "light"),
                 card(ol(["Review written as an annotated bibliography",
                          "No clear research question",
                          "Search bias",
                          "Absent quality appraisal",
                          "Selective citation",
                          "Misclassified review type",
                          "Unjustified publication window"],
                         None, "margin:0;font-size:13px"), "Seven pitfalls", "rust"),
             ], 8),
         ], "1.45fr 1fr"),
     ], 10)},

    {"title": "Case: zero-day detection", "kicker": "Case study",
     "h": "One question, four review lenses",
     "body": stack([
         rule("<i>“What is the effectiveness of deep learning models in detecting zero-day "
              "network intrusions?”</i>"),
         table(["Approach", "What you actually do", "What you legitimately obtain"], [
             ["**Narrative**", "Synthesise seminal deep-learning IDS work by expert judgement",
              "Conceptual framing; dominant architectures identified"],
             ["**Systematic**", "Exhaustive PRISMA-governed search across CS databases",
              "Reproducible evidence across 47 primary studies"],
             ["**Scoping**", "Map all ML applications across cybersecurity subdomains",
              "Gaps surfaced — adversarial robustness in real deployments"],
             ["**Meta-analysis**", "Pool F1-scores and detection rates across comparable studies",
              "Quantitative estimate of average improvement"],
         ]),
         grid([
             card(p("A mature programme uses them <b>in sequence</b>: scoping to locate a "
                    "defensible gap &rarr; systematic to answer it rigorously &rarr; "
                    "meta-analysis where metrics permit pooling.", "small", "margin:0"),
                  "Complementary, not competing", "teal"),
             card(p("Pooling F1 across NSL-KDD, CICIDS2017 and a proprietary trace invites "
                    "exactly the heterogeneity that inflates I&sup2;. Report it, stratify by "
                    "dataset, and resist a single triumphant number.", "small", "margin:0"),
                  "Feasibility caution", "rust"),
         ]),
     ], 10)},

    {"title": "Takeaways and exam focus", "kicker": "Consolidation",
     "h": "What to retain, and what the examiner asks",
     "body": stack([
         grid([
             card(ul(["**Systematic** — reproducible, protocol-driven; gold standard for a bounded question",
                      "**Narrative** — flexible, theoretically deep; suits emerging topics",
                      "**Scoping** — maps heterogeneous literatures, exposes gaps",
                      "**Meta-analysis** — pools results, assesses heterogeneity and bias"],
                     None, "margin:0;font-size:14px"), "Four takeaways", "teal"),
             card(ol(["Master the **comparative table** — especially quality appraisal and reproducibility",
                      "Memorise **PRISMA stages** and the **Arksey &amp; O'Malley** five(+1) stages",
                      "Contrast **fixed-effect vs random-effects**; interpret **I&sup2;** conceptually",
                      "Know **PRISMA vs PRISMA-ScR** and their purposes",
                      "Apply the **decision heuristic** to unseen research questions",
                      "Practise **critiquing** a published review for rigour"],
                     None, "margin:0;font-size:13px"), "Exam focus", "rust"),
         ], "1fr 1.15fr"),
         card(p("<b>Numerical practice.</b> Three studies: d = 0.45 (SE 0.10), d = 0.62 "
                "(SE 0.15), d = 0.38 (SE 0.08). Compute fixed-effect weights "
                "w<sub>i</sub> = 1/SE<sub>i</sub>&sup2;, the pooled effect, Q and I&sup2;, "
                "then interpret the heterogeneity.", "small", "margin:0"),
              None, "tint"),
         p("Method follows from the <b>research question</b>, the <b>available evidence</b> "
           "and the <b>intended inference</b> — never from convenience or prestige.",
           "fine", "margin:0"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Frame the review not as a chapter students must write to satisfy a template, but as a method with its own protocol, failure modes and standards of proof. Tell them the guiding question reappears as the decision heuristic on slide 12.",
    2: "Read the five objectives as the assessment contract: examination items ask students to differentiate, select and critique, not merely to recall definitions. Signal that the comparative table on slide 12 is the single most examinable artefact.",
    3: "The conceptual gate: if students leave believing a review is a summary, every subsequent method becomes arbitrary procedure. Use the doubling rate to argue that expert intuition alone can no longer guarantee coverage in fast-moving subfields.",
    4: "Stress the distinction students most often lose: a protocol governs what you will do, a reporting standard governs what you must disclose. Give a concrete CS PICO — population: undergraduate programmers; intervention: automated feedback tooling; comparison: manual TA feedback; outcome: defect rate.",
    5: "Emphasise the operative word 'all': the SLR's authority rests entirely on the claim that nothing eligible was silently omitted, which is why search strings and database lists must be published verbatim. Kitchenham's guidelines are examinable by name.",
    6: "Walk the flow with real numbers — students reproduce the diagram far more reliably once they have watched the arithmetic close. Raise the grey-literature tension honestly: excluding arXiv can remove the most recent and most deployed evidence.",
    7: "Correct the prejudice that narrative reviews are lazy systematic reviews: for a three-year-old subfield with forty heterogeneous papers and no comparable metrics, expert interpretive framing is the correct choice. The honest move is disclosure of purposive selection.",
    8: "Underline the two features that distinguish scoping from systematic work: inclusion criteria refined post hoc, and quality appraisal deliberately not performed. A scoping review can describe what exists but never adjudicate what works.",
    9: "Make the dependency explicit: every defensible meta-analysis sits on top of a systematic search, so the two methods are stacked rather than parallel. Standardisation is the key idea — dividing by pooled SD converts milliseconds or defect counts into a unitless quantity.",
    10: "Frame the choice as a question about the estimand, not statistical taste. Show that tau-squared equal to zero collapses random-effects weights exactly onto fixed-effect weights, so the models are nested rather than rival.",
    11: "Insist on I-squared as a ratio, not an absolute quantity — a large value with tightly clustered effects can be unimportant. Connect publication bias back to the ethics thread: selective reporting is a research-integrity failure, not merely a statistical inconvenience.",
    12: "Tell students plainly that this table is the highest-yield artefact of the lecture, and that examiners routinely test the quality-appraisal and reproducibility rows. Work the heuristic live on two or three questions volunteered from the class.",
    13: "Present this as the operational checklist to keep beside them while producing their own project review. Dwell on the temporal pitfall: a review of deep learning that silently begins in 2012 has made a methodological commitment and must defend it.",
    14: "Run this as guided discussion: give the question, ask which approach they would choose, then reveal that a mature programme uses three in sequence. Press on the meta-analysis row — ask what it means to average F1 scores computed on different datasets.",
    15: "Set the numerical exercise as compulsory homework; it is the fastest way to discover whether understanding of inverse-variance weighting is genuine or verbal. Ask students to read one published CS systematic review and one meta-analysis before the next session.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 2 Notes — Approaches to Literature Review",
    "desc": ("Student notes for Unit III Lecture 2 of CSEG3060: systematic, narrative, "
             "scoping and meta-analytical review approaches, review protocols, PICO/PEO/PCC, "
             "the PRISMA family, effect sizes, fixed- and random-effects models, "
             "heterogeneity, publication bias and the decision heuristic."),
    "lecno": "2",
    "lectitle": "Approaches to Literature Review",
    "subline": ("Systematic, narrative, scoping and meta-analytical methods &middot; 60 minutes "
                "&middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Systematic", "Narrative", "Scoping", "Meta-analysis",
               "PRISMA", "I&sup2; and &tau;&sup2;"],
    "pager": [("CSEG3060_Unit3_L01_Effective_Literature_Studies_Notes.html",
               "&larr; Lecture 1: Effective Literature Studies"),
              ("CSEG3060_Unit3_L03_Literature_Analysis_Techniques_Notes.html",
               "Lecture 3: Literature Analysis Techniques &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 2 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Demonstrate an understanding of literature exploration and ethical "
          "considerations in conducting research.")
        + p("Lecture 1 established <em>why</em> a literature study matters. This lecture "
            "supplies the four <span class=\"kw\">methods</span> by which one is actually "
            "conducted, and the rules for choosing between them.")),

    box("exam", "How to use these notes",
        p("Section 6 (the comparative table) is the single highest-yield artefact in this "
          "lecture: examiners test the <em>quality appraisal</em> and <em>reproducibility</em> "
          "rows most often, because that is where the four methods differ most "
          "consequentially.")
        + p("The meta-analysis mathematics in Section 5 is examined <em>conceptually</em>. "
            "You must be able to say what each quantity measures and when each model is "
            "appropriate; numerical computation appears only in the practice question at "
            "the end.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["Define and distinguish the four principal approaches to literature review: "
        "systematic, narrative, scoping and meta-analytical.",
        "Identify the methodological steps required to conduct each type of review.",
        "Evaluate the appropriateness of a review approach for a given research question "
        "in computer science.",
        "Apply established reporting standards (PRISMA) to structure a literature review.",
        "Critically appraise published reviews for methodological rigour."]),

    sec(2, "Introduction: The Review as a Method", "s2"),
    p("A literature review is far more than a descriptive summary of prior work. It is a "
      "<span class=\"kw\">systematic, replicable and transparent synthesis</span> of "
      "existing scholarly contributions within a defined domain. In computer science, "
      "where research output doubles approximately every five years, conducting a rigorous "
      "review is a foundational research competency."),
    p("The choice of approach shapes four things:"),
    ul(["The <span class=\"kw\">breadth</span> and <span class=\"kw\">depth</span> of "
        "evidence included.",
        "The <span class=\"kw\">reproducibility</span> of the search and synthesis process.",
        "The <span class=\"kw\">type of conclusion</span> that can legitimately be drawn "
        "&mdash; qualitative or quantitative.",
        "The <span class=\"kw\">defensibility</span> of the resulting claims under peer "
        "review."]),

    sec(3, "Foundational Concepts", "s3"),
    sub("3.1 The Review Protocol", "s3-1"),
    box("def", "Definition &mdash; Review protocol",
        p("A <span class=\"kw\">review protocol</span> is a pre-specified plan that outlines "
          "the research question, inclusion and exclusion criteria, search strategy, data "
          "extraction methods and synthesis approach. Protocols enhance transparency and "
          "minimise bias.")),
    p("Pre-registration of protocols &mdash; on PROSPERO in health research, or in an "
      "institutional archive or the Open Science Framework in computing &mdash; is becoming "
      "an expectation in empirical software engineering."),

    sub("3.2 Structured Question Formats", "s3-2"),
    tw(table(["Framework", "Components", "Typical use"], [
        ["**PICO**", "Population, Intervention, Comparison, Outcome",
         "Systematic reviews with quantitative outcomes"],
        ["**PEO**", "Population, Exposure, Outcome",
         "Scoping and narrative reviews of qualitative phenomena"],
        ["**PCC**", "Population/Participants, Concept, Context",
         "Scoping reviews"],
    ])),
    box("eg", "A computer science PICO",
        p("<em>Population:</em> undergraduate programming students. <em>Intervention:</em> "
          "automated feedback tooling. <em>Comparison:</em> manual teaching-assistant "
          "feedback. <em>Outcome:</em> assignment defect rate.")),

    sub("3.3 Reporting Standards", "s3-3"),
    ul(["<span class=\"kw\">PRISMA</span> &mdash; Preferred Reporting Items for Systematic "
        "Reviews and Meta-Analyses.",
        "<span class=\"kw\">PRISMA-S</span> &mdash; the extension for reporting the search.",
        "<span class=\"kw\">PRISMA-ScR</span> &mdash; the extension for scoping reviews."]),
    box("caution", "Protocol is not the same as reporting standard",
        p("A protocol governs <em>what you will do</em>; a reporting standard governs "
          "<em>what you must disclose</em>. Compliance with PRISMA does not make a weak "
          "review strong &mdash; it makes a weak review <em>visible</em>. Examiners test "
          "this distinction.")),

    sec(4, "The Four Approaches", "s4"),
    sub("4.1 Systematic Literature Review (SLR)", "s4-1"),
    box("def", "Definition &mdash; Systematic literature review",
        p("A review that employs <span class=\"kw\">explicit, reproducible methods</span> to "
          "collate and synthesise <em>all</em> studies that meet pre-defined eligibility "
          "criteria in response to a specific research question.")),
    p("Methodological characteristics:"),
    ol(["<span class=\"kw\">Pre-registered protocol</span>, often published or "
        "institutionally archived before screening begins.",
        "<span class=\"kw\">Exhaustive and reproducible search</span> across multiple "
        "databases &mdash; IEEE Xplore, ACM Digital Library, Scopus, Web of Science, "
        "Google Scholar &mdash; supplemented by backward and forward citation chasing.",
        "<span class=\"kw\">Explicit inclusion and exclusion criteria</span> applied through "
        "a two-phase screening process.",
        "<span class=\"kw\">Quality appraisal</span> of included studies using validated "
        "tools (JBI Critical Appraisal Tools, CASP).",
        "<span class=\"kw\">Structured data extraction</span> using standardised forms.",
        "<span class=\"kw\">Transparent reporting</span> using PRISMA flow diagrams."]),
    p("The PRISMA flow diagram documents records identified, screened, eligible and "
      "included, in four stages: <span class=\"kw\">Identification &rarr; Screening &rarr; "
      "Eligibility &rarr; Included</span>. Writing <span class=\"mv\">N<sub>i</sub></span> "
      "for records identified and <span class=\"mv\">N<sub>e</sub></span> for records "
      "included:"),
    eq("N<sub>e</sub> = N<sub>i</sub> &minus; N<sub>d,s</sub> &minus; N<sub>d,e</sub> "
       "&minus; N<sub>d,r</sub> &nbsp;&nbsp;&nbsp; with &nbsp; N<sub>e</sub> &le; N<sub>i</sub>",
       "PRISMA record accounting"),
    p("where <span class=\"mv\">N<sub>d,s</sub></span>, <span class=\"mv\">N<sub>d,e</sub></span> "
      "and <span class=\"mv\">N<sub>d,r</sub></span> denote records removed during screening, "
      "eligibility and final inclusion. This is a bookkeeping identity: it is examinable as "
      "a statement of completeness rather than as a computation."),
    box("eg", "Illustrative example &mdash; Kitchenham",
        p("The systematic review by Kitchenham et al. on <em>evidence-based software "
          "engineering</em> applied rigorous search strategies across seven digital "
          "libraries and produced the methodological guidelines that have become standard "
          "for software engineering SLRs.")),
    tw(table(["Strengths", "Limitations"], [
        ["Reproducible and transparent", "Time- and resource-intensive (6&ndash;24 months)"],
        ["Reduces selection bias", "May exclude contextually relevant grey literature"],
        ["Enables evidence-based conclusions",
         "Quality appraisal in CS is contested: designs are methodologically heterogeneous"],
    ])),

    sub("4.2 Narrative Literature Review", "s4-2"),
    box("def", "Definition &mdash; Narrative review",
        p("A <span class=\"kw\">narrative review</span> &mdash; also called a traditional or "
          "qualitative review &mdash; provides a comprehensive, discursive synthesis of the "
          "literature without rigidly defined search protocols. It is <em>interpretive</em> "
          "rather than aggregative.")),
    ul(["Selection of sources rests on the author's expertise and judgement.",
        "No formal protocol is typically registered.",
        "Synthesis follows a thematic or chronological organisation.",
        "Quality appraisal is informal or absent.",
        "The aim is breadth, contextualisation and theoretical framing."]),
    p("Three recognised variants: the <span class=\"kw\">editorial review</span> (short, "
      "opinion-driven), the <span class=\"kw\">critical review</span> (evaluative synthesis "
      "with an explicit stance), and the <span class=\"kw\">state-of-the-art review</span> "
      "(current developments and future directions)."),
    p("In computing, narrative reviews appear as survey articles in <em>ACM Computing "
      "Surveys</em>, as tutorial articles in <em>IEEE Transactions</em> introducing an "
      "emerging sub-field, and as the framing chapter of a thesis."),
    box("caution", "Narrative is not a lazy systematic review",
        p("For a three-year-old subfield with forty heterogeneous papers and no comparable "
          "metrics, expert interpretive framing is the methodologically <em>correct</em> "
          "choice. The honest move is disclosure: state that selection was purposive rather "
          "than implying an exhaustiveness never attempted.")),

    sub("4.3 Scoping Review", "s4-3"),
    box("def", "Definition &mdash; Scoping review",
        p("A <span class=\"kw\">scoping review</span> maps the key concepts, types of "
          "evidence and gaps in a research area, particularly where the topic has not been "
          "extensively reviewed or is complex and heterogeneous. Formalised by Arksey and "
          "O'Malley (2005) and refined by the Joanna Briggs Institute.")),
    p("The Arksey and O'Malley framework specifies five stages, with an optional sixth:"),
    ol(["<span class=\"kw\">Identifying the research question</span> &mdash; broad and often "
        "iterative.",
        "<span class=\"kw\">Identifying relevant studies</span> &mdash; comprehensive but not "
        "exhaustive.",
        "<span class=\"kw\">Study selection</span> &mdash; using post-hoc inclusion criteria.",
        "<span class=\"kw\">Charting the data</span> &mdash; extracting key information in "
        "tabular form.",
        "<span class=\"kw\">Collating, summarising and reporting</span> &mdash; descriptive "
        "and thematic.",
        "<span class=\"kw\">Consultation with stakeholders</span> (optional) &mdash; adds "
        "interpretive value; in computing, practitioners routinely identify grey literature "
        "and deployment concerns absent from indexed venues."]),
    p("Question formulation uses the <span class=\"kw\">PCC</span> mnemonic &mdash; "
      "Population/Participants, Concept, Context &mdash; and reporting follows PRISMA-ScR. "
      "Scoping reviews suit mapping AI applications in healthcare, cataloguing "
      "privacy-preserving techniques in IoT, or charting trends in quantum computing."),
    box("eg", "Illustrative example",
        p("A scoping review titled <em>Machine Learning in Cybersecurity</em> mapped ML "
          "applications across intrusion detection, malware classification and threat "
          "intelligence, identifying adversarial robustness in real-world deployments as an "
          "underexplored subdomain.")),
    tw(table(["Strengths", "Limitations"], [
        ["Useful for broad, exploratory questions",
         "Does not assess the methodological quality of included studies"],
        ["Maps heterogeneity in a field", "Findings may be less definitive"],
        ["Identifies gaps for future SLRs", "May overlap conceptually with narrative reviews"],
    ])),

    sub("4.4 Meta-Analysis", "s4-4"),
    box("def", "Definition &mdash; Meta-analysis",
        p("A <span class=\"kw\">meta-analysis</span> is a quantitative synthesis that "
          "statistically combines the results of multiple independent studies addressing the "
          "same question, producing a pooled effect estimate. A systematic review is its "
          "<em>precondition</em>, not its alternative.")),

    sec(5, "The Statistics of Pooling", "s5"),
    sub("5.1 Effect Sizes", "s5-1"),
    p("For continuous outcomes the <span class=\"kw\">standardised mean difference</span> is "
      "commonly used:"),
    eq("SMD = (X&#772;<sub>1</sub> &minus; X&#772;<sub>2</sub>) / s<sub>pooled</sub>",
       "standardised mean difference"),
    eq("s<sub>pooled</sub> = &radic;[ ((n<sub>1</sub>&minus;1)s<sub>1</sub>&sup2; + "
       "(n<sub>2</sub>&minus;1)s<sub>2</sub>&sup2;) / (n<sub>1</sub>+n<sub>2</sub>&minus;2) ]",
       "pooled standard deviation"),
    p("For binary outcomes the <span class=\"kw\">odds ratio</span> is preferred, computed "
      "from the cell counts <span class=\"mv\">a, b, c, d</span> of a 2&times;2 contingency "
      "table:"),
    eq("OR = (a &middot; d) / (b &middot; c)", "odds ratio"),
    p("Standardisation is the conceptual key: dividing by the pooled standard deviation "
      "converts a raw millisecond or defect-count difference into a unitless quantity that "
      "can be averaged across studies using different scales."),

    sub("5.2 Fixed-Effect and Random-Effects Models", "s5-2"),
    p("The <span class=\"kw\">fixed-effect model</span> assumes a single true effect size "
      "across studies; all divergence is sampling error:"),
    eq("&theta;&#770;<sub>FE</sub> = &Sigma;<sub>i=1..k</sub> w<sub>i</sub>&theta;&#770;<sub>i</sub> "
       "/ &Sigma;<sub>i=1..k</sub> w<sub>i</sub> &nbsp;&nbsp;&nbsp; "
       "w<sub>i</sub> = 1 / Var(&theta;&#770;<sub>i</sub>)", "fixed effect"),
    p("The <span class=\"kw\">random-effects model</span> assumes effect sizes vary across "
      "studies, incorporating between-study variance <span class=\"mv\">&tau;&sup2;</span>:"),
    eq("w<sub>i</sub><sup>RE</sup> = 1 / (Var(&theta;&#770;<sub>i</sub>) + &tau;&sup2;)",
       "random effects"),
    p("Between-study variance is often estimated by the DerSimonian and Laird method:"),
    eq("&tau;&#770;&sup2; = max( 0 , (Q &minus; (k &minus; 1)) / C ) &nbsp;&nbsp;&nbsp; "
       "C = &Sigma;w<sub>i</sub> &minus; (&Sigma;w<sub>i</sub>&sup2; / &Sigma;w<sub>i</sub>)",
       "DerSimonian&ndash;Laird"),
    box("exam", "Which model, and why",
        p("Fixed effect asks <em>what is <strong>the</strong> effect?</em> Random effects "
          "asks <em>what is the <strong>average</strong> of a distribution of effects?</em> "
          "Because CS studies differ in datasets, hardware, hyperparameters and participant "
          "pools, <span class=\"kw\">random effects is the appropriate default</span>.")
        + p("Note that the models are <em>nested</em>: when "
            "<span class=\"mv\">&tau;&sup2; = 0</span> the random-effects weights collapse "
            "exactly onto the fixed-effect weights. Choosing fixed effect in the presence of "
            "real heterogeneity produces confidence intervals that are too narrow, and "
            "therefore overconfident conclusions.")),

    sub("5.3 Heterogeneity", "s5-3"),
    p("Cochran's <span class=\"mv\">Q</span> measures the weighted dispersion of study "
      "estimates about the fixed-effect pooled value, referred to a chi-square distribution "
      "on <span class=\"mv\">k &minus; 1</span> degrees of freedom:"),
    eq("Q = &Sigma;<sub>i=1..k</sub> w<sub>i</sub> (&theta;&#770;<sub>i</sub> &minus; "
       "&theta;&#770;<sub>FE</sub>)&sup2;", "Cochran's Q"),
    eq("I&sup2; = max( 0 , (Q &minus; (k &minus; 1)) / Q ) &times; 100%", "I&sup2; statistic"),
    tw(table(["I&sup2; value", "Interpretation", "What it obliges you to do"], [
        ["Below 25%", "Low heterogeneity", "Pooled estimate is readily interpretable"],
        ["25% to 75%", "Moderate heterogeneity", "Investigate sources; consider subgroups"],
        ["75% or above", "High heterogeneity",
         "Subgroup analysis or meta-regression &mdash; not a louder pooled claim"],
    ])),
    p("Read <span class=\"mv\">I&sup2;</span> as a <em>ratio</em>, not an absolute quantity: "
      "a large value with tightly clustered effects can be practically unimportant, while a "
      "modest value across wildly different effect magnitudes still matters. Always read it "
      "beside the forest plot."),

    sub("5.4 Publication Bias", "s5-4"),
    p("<span class=\"kw\">Publication bias</span> is the tendency for studies with "
      "statistically significant results to be published preferentially. It is diagnosed by "
      "<span class=\"kw\">funnel plot</span> asymmetry and tested formally by "
      "<span class=\"kw\">Egger's regression</span>:"),
    eq("t = b / SE(b)", "Egger's test statistic"),
    p("where <span class=\"mv\">b</span> is the regression coefficient of the standard "
      "normal deviate on precision. In a symmetric funnel, precise studies cluster near the "
      "top around the pooled estimate and imprecise ones fan out below; a missing lower-left "
      "corner indicates small negative studies that were run but never published."),
    box("caution", "The CS-specific pressure",
        p("Benchmark culture rewards reporting improvements over null results, so negative "
          "findings on a popular architecture are systematically under-published. This links "
          "directly to the research-integrity material in Lectures 6 and 7: selective "
          "reporting is an ethics failure, not merely a statistical inconvenience.")),

    sec(6, "Comparative Synthesis and the Decision Heuristic", "s6"),
    box("exam", "Table &mdash; the four approaches across eight dimensions (learn this)",
        tw(table(["Dimension", "Systematic", "Narrative", "Scoping", "Meta-analysis"], [
            ["Research question", "Specific, focused", "Broad, contextual",
             "Broad, exploratory", "Specific, quantitative"],
            ["Protocol", "Pre-specified", "Optional", "Optional", "Pre-specified"],
            ["Search strategy", "Exhaustive", "Selective", "Comprehensive, iterative",
             "Exhaustive"],
            ["Quality appraisal", "Mandatory", "Informal", "Not required", "Mandatory"],
            ["Synthesis", "Qualitative or quantitative", "Qualitative (thematic)",
             "Descriptive mapping", "Quantitative (statistical pooling)"],
            ["Reproducibility", "High", "Low", "Moderate", "High"],
            ["Output", "Evidence-based conclusions", "Conceptual synthesis",
             "Conceptual map", "Pooled effect size"],
            ["Typical duration", "6&ndash;24 months", "2&ndash;8 weeks", "3&ndash;6 months",
             "3&ndash;12 months"],
        ]))),
    p("A simple decision rule:"),
    ol(["Choose a <span class=\"kw\">meta-analysis</span> if quantitative pooling is feasible "
        "and the studies report compatible metrics.",
        "Choose a <span class=\"kw\">systematic review</span> if a precise question demands "
        "exhaustive, reproducible synthesis.",
        "Choose a <span class=\"kw\">scoping review</span> if the goal is to map an emerging "
        "or heterogeneous field.",
        "Choose a <span class=\"kw\">narrative review</span> if the goal is conceptual or "
        "theoretical framing without formal synthesis."]),
    p("The fastest diagnostic pair is: <em>Is the question broad or precise?</em> and "
      "<em>Are the outcome metrics commensurable?</em> These two answers isolate the correct "
      "method almost every time. Feasibility constraints &mdash; time, team size, database "
      "access &mdash; legitimately shape the choice and should be stated in the methods "
      "section rather than concealed."),

    sec(7, "Practical Workflow: An SLR in Computer Science", "s7"),
    p("Adapted from Kitchenham's guidelines for evidence-based software engineering."),
    ol(["<span class=\"kw\">Define the research question</span> using PICO or PEO.",
        "<span class=\"kw\">Develop the review protocol</span> &mdash; search strings, "
        "databases, inclusion and exclusion criteria, quality-assessment instruments.",
        "<span class=\"kw\">Conduct the search</span> across IEEE Xplore, ACM Digital "
        "Library, Scopus, ScienceDirect and Google Scholar.",
        "<span class=\"kw\">Screen records</span> in two phases: title and abstract, then "
        "full text.",
        "<span class=\"kw\">Extract data</span> using a standardised form capturing study "
        "metadata, methodology and findings.",
        "<span class=\"kw\">Assess quality</span> using validated checklists (JBI, CASP).",
        "<span class=\"kw\">Synthesise findings</span> thematically and, where legitimate, "
        "quantitatively via meta-analysis.",
        "<span class=\"kw\">Report</span> following PRISMA 2020 guidelines."]),
    eq("Search string = (term<sub>1</sub> &or; term<sub>2</sub>) &and; (term<sub>3</sub>) "
       "&and; &not;(exclusion term)", "Boolean form"),

    sec(8, "Case Study: Review Approaches in Cybersecurity", "s8"),
    p("Research question: <em>What is the effectiveness of deep learning models in detecting "
      "zero-day network intrusions?</em>"),
    tw(table(["Approach", "Application", "Outcome"], [
        ["Narrative", "Synthesise seminal works on deep learning for intrusion detection",
         "Conceptual framing; dominant architectures identified"],
        ["Systematic", "Exhaustive search across CS databases using PRISMA",
         "Reproducible evidence on effectiveness across 47 primary studies"],
        ["Scoping", "Map all ML applications in cybersecurity",
         "Underexplored areas identified, such as adversarial robustness"],
        ["Meta-analysis", "Pool F1-scores and detection rates across studies",
         "Quantitative estimate of average performance improvement"],
    ])),
    p("Each approach yields a different but complementary contribution. A rigorous research "
      "programme may use several sequentially: a scoping review to identify gaps, followed "
      "by a systematic review and meta-analysis to address a specific gap."),
    box("caution", "Feasibility caution",
        p("Pooling F1-scores across studies using different datasets, threat models and "
          "train/test splits invites exactly the methodological heterogeneity that inflates "
          "<span class=\"mv\">I&sup2;</span>. Report it, stratify by dataset, and resist a "
          "single triumphant pooled number.")),

    sec(9, "Common Pitfalls", "s9"),
    ol(["<span class=\"kw\">Conflating a review with an annotated bibliography.</span> A "
        "review synthesises; a bibliography lists.",
        "<span class=\"kw\">Absence of a clear research question.</span> Without focus the "
        "review is unfocused and impossible to replicate.",
        "<span class=\"kw\">Search bias.</span> Relying on a single database or using "
        "overly restrictive terms.",
        "<span class=\"kw\">Failure to appraise quality.</span> Including flawed studies "
        "without acknowledging their limitations.",
        "<span class=\"kw\">Selective citation.</span> Citing only studies that support the "
        "researcher's hypothesis.",
        "<span class=\"kw\">Misclassification of the review type.</span> Applying systematic "
        "methods but reporting them as narrative, or the reverse.",
        "<span class=\"kw\">Ignoring the temporal dimension.</span> Failing to specify and "
        "justify the publication window. A review of deep learning that silently begins in "
        "2012 has made a substantive methodological commitment."]),

    sec(10, "Summary", "s10"),
    ul(["<span class=\"kw\">Systematic reviews</span> offer reproducible, protocol-driven "
        "synthesis with strong evidentiary claims; the gold standard when the question is "
        "specific and bounded.",
        "<span class=\"kw\">Narrative reviews</span> allow flexibility, theoretical depth and "
        "contextualisation, suited to emerging or interdisciplinary topics.",
        "<span class=\"kw\">Scoping reviews</span> map heterogeneous literatures to identify "
        "conceptual boundaries, definitions and gaps.",
        "<span class=\"kw\">Meta-analyses</span> statistically combine quantitative results "
        "to produce pooled estimates and to assess heterogeneity and bias.",
        "The choice should be guided by the <span class=\"kw\">research question</span>, the "
        "<span class=\"kw\">available evidence</span> and the <span class=\"kw\">intended "
        "inference</span>."]),

    sec(11, "Exam Preparation", "s11"),
    box("exam", "Seven preparation points",
        ol(["Distinguish the four review types using the comparative table. Examiners "
            "commonly test the ability to differentiate methodological characteristics.",
            "Memorise the PRISMA stages and the Arksey and O'Malley scoping framework.",
            "Understand fixed-effect and random-effects models and the "
            "<span class=\"mv\">I&sup2;</span> statistic conceptually.",
            "Apply the decision heuristic to example research questions.",
            "Know the reporting standards (PRISMA, PRISMA-ScR) and their purposes.",
            "Review at least one published SLR and one meta-analysis in computer science.",
            "Practise critiquing reviews for rigour &mdash; selection bias, missing quality "
            "appraisal, inappropriate synthesis."])),

    sub("11.1 Short-Answer Questions", "s11-1"),
    qlist(["Differentiate between a systematic review and a narrative review. Under what "
           "circumstances is each most appropriate? " + marks("3 marks"),
           "List the five stages of the Arksey and O'Malley framework. Why is the optional "
           "sixth stage valuable? " + marks("3 marks"),
           "What is the role of PRISMA in literature reviews? Identify two differences "
           "between PRISMA and PRISMA-ScR. " + marks("3 marks"),
           "Define the <span class=\"mv\">I&sup2;</span> statistic. What does a value of 80% "
           "suggest about heterogeneity? " + marks("2 marks")]),

    sub("11.2 Long-Answer Questions", "s11-2"),
    qlist(["You are researching <em>federated learning for healthcare applications</em>. "
           "Compare the suitability of a scoping review versus a systematic review, with "
           "reference to the research question, expected evidence base and review "
           "objectives. " + marks("10 marks"),
           "Explain the difference between fixed-effect and random-effects meta-analytic "
           "models. Under what conditions is each preferred, and how does "
           "<span class=\"mv\">&tau;&sup2;</span> influence the choice? " + marks("10 marks"),
           "Critically evaluate: <em>&ldquo;A systematic review is always superior to a "
           "narrative review.&rdquo;</em> Use examples from computer science. "
           + marks("10 marks"),
           "Describe the methodological steps of a systematic literature review in software "
           "engineering, citing Kitchenham's guidelines. What are the major sources of bias "
           "at each step? " + marks("10 marks")]),

    sub("11.3 Numerical Question", "s11-3"),
    box("eg", "Compute and interpret",
        p("Three studies report the following effect sizes and standard errors:")
        + tw(table(["Study", "Effect size (d)", "Standard error (SE)"], [
            ["A", "0.45", "0.10"], ["B", "0.62", "0.15"], ["C", "0.38", "0.08"]]))
        + ol(["Compute the weight of each study under a fixed-effect model "
              "(<span class=\"mv\">w<sub>i</sub> = 1/SE<sub>i</sub>&sup2;</span>).",
              "Calculate the pooled effect size.",
              "Compute Cochran's <span class=\"mv\">Q</span> and the "
              "<span class=\"mv\">I&sup2;</span> value.",
              "Interpret the heterogeneity."])),

    sec(12, "Further Reading", "s12"),
    ol(["Kitchenham, B., &amp; Charters, S. (2007). <em>Guidelines for performing Systematic "
        "Literature Reviews in Software Engineering</em>. EBSE Technical Report.",
        "Arksey, H., &amp; O'Malley, L. (2005). Scoping studies: Towards a methodological "
        "framework. <em>International Journal of Social Research Methodology</em>, 8(1), "
        "19&ndash;32.",
        "Moher, D., Liberati, A., Tetzlaff, J., Altman, D. G., &amp; The PRISMA Group (2009). "
        "Preferred Reporting Items for Systematic Reviews and Meta-Analyses. <em>PLOS "
        "Medicine</em>, 6(7).",
        "Tricco, A. C., et al. (2018). PRISMA Extension for Scoping Reviews (PRISMA-ScR). "
        "<em>Annals of Internal Medicine</em>, 169(7), 467&ndash;473.",
        "Borenstein, M., Hedges, L. V., Higgins, J. P. T., &amp; Rothstein, H. R. (2009). "
        "<em>Introduction to Meta-Analysis</em>. Wiley.",
        "Page, M. J., et al. (2021). The PRISMA 2020 statement. <em>BMJ</em>, 372, n71."]),
])
