# -*- coding: utf-8 -*-
"""Unit III - Lecture 3: Literature Analysis Techniques."""
from kit import (box, card, eqbox, flow, goals, grid, marks, ol, p, qlist, rule,
                 sec, stack, sub, table, tw, ul, eq)

STEM = "CSEG3060_Unit3_L03_Literature_Analysis_Techniques"
RUNNER = "CSEG3060 · Unit III · Lecture 3 — Literature Analysis Techniques"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 3 — Literature Analysis Techniques",
    "desc": ("Unit III Lecture 3 for Research Methodology in Computer Science "
             "(CSEG3060): critical appraisal, synthesis, gap identification and "
             "theoretical framing — checklists, validity threats, synthesis workflows, "
             "the gap-statement grammar and building a theoretical framework."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Literature Analysis Techniques",
     "body": stack([
         p("Critical appraisal, synthesis, gap identification and theoretical framing",
           "lead", "max-width:840px;color:var(--mint)"),
         card(p("Searching gives you a corpus. Analysis gives you an argument.", None,
                "margin:0;font-size:22px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 3 of 8 · 60 minutes (90 with activities) · CO2", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO2",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Critically appraise** a paper using structured checklists — rigour, validity, contribution",
         "**Synthesise** findings across studies using at least two formal techniques",
         "**Articulate** research gaps using the canonical gap-statement grammar",
         "**Construct** a theoretical framework linking theory to questions, propositions and method",
         "**Integrate** all four techniques into a coherent literature review chapter",
     ]), None, "fill")},

    {"title": "The four operations", "kicker": "Orientation",
     "h": "Four operations — and the direction each one looks",
     "body": stack([
         grid([
             card(p("Looks <b>inward</b> at each study: are the claims warranted by the "
                    "evidence presented?", "small", "margin:0"), "Critical appraisal", "rust"),
             card(p("Looks <b>outward</b> across the corpus: what does the body of work "
                    "say that no single paper says?", "small", "margin:0"), "Synthesis", "teal"),
             card(p("Looks at <b>what is absent</b>: a defensible gap that warrants new "
                    "research.", "small", "margin:0"), "Gap identification"),
             card(p("Supplies the <b>lens</b>: the theory through which all of it is read "
                    "and interpreted.", "small", "margin:0"), "Theoretical framing"),
         ], "1fr 1fr 1fr 1fr", gap="10px"),
         table(["Concept", "One-line definition"], [
             ["**Critical appraisal**", "A structured evaluation of the trustworthiness and value of a study"],
             ["**Synthesis**", "The integrative recombination of evidence across studies to produce new understanding"],
             ["**Research gap**", "An explicit, defensible absence in the body of knowledge that warrants new research"],
             ["**Theoretical framework**", "The conceptual scaffolding of theory guiding questions, hypotheses and interpretation"],
         ]),
         rule("These are <b>recursive, not sequential</b>: synthesis exposes gaps, gaps "
              "motivate the choice of theory, and theory redirects what you appraise."),
     ], 11)},

    {"title": "Appraisal: three lenses", "kicker": "Critical appraisal · 1 of 3",
     "h": "Ask not only what a paper claims, but whether it is warranted",
     "body": stack([
         rule("Critical appraisal is the <b>methodological conscience</b> of the literature "
              "review. Without it, a survey degenerates into an uncritical catalogue."),
         grid([
             card(p("Were the methods appropriate, rigorously executed and transparently "
                    "reported?", "small", "margin:0"), "1 · Methodological lens", "rust"),
             card(p("Is the theoretical grounding coherent, and are the constructs well "
                    "defined?", "small", "margin:0"), "2 · Conceptual lens", "rust"),
             card(p("Does the work advance knowledge beyond incremental description?",
                    "small", "margin:0"), "3 · Contribution lens", "rust"),
         ], "1fr 1fr 1fr"),
         grid([
             card(p("For each lens record both <b>strengths and weaknesses</b>, then tag the "
                    "paper with a one-line verdict — e.g. <i>“methodologically sound but "
                    "conceptually narrow”</i>. Forcing the verdict is what converts passive "
                    "reading into appraisal.", "small", "margin:0"), "Recording practice", "teal"),
             card(p("In health research the randomised controlled trial sits at the top of "
                    "the evidence hierarchy. In computing the strongest evidence may be a "
                    "<b>correctness proof</b> or a <b>benchmark on standardised datasets</b> "
                    "— so frameworks must be <b>adapted</b>, not imported.", "small", "margin:0"),
                  "Adapt to the discipline", "tint"),
         ]),
     ], 11)},

    {"title": "Appraisal: instruments", "kicker": "Critical appraisal · 2 of 3",
     "h": "CASP, AMSTAR-2, and a CS-adapted checklist",
     "body": stack([
         grid([
             card(ul(["Clear statement of aims", "Appropriate methodology",
                      "Appropriate design", "Recruitment strategy", "Data collection",
                      "Researcher–participant relationship", "Ethical considerations",
                      "Rigour of analysis", "Clear statement of findings",
                      "Value of the research"], None, "margin:0;font-size:13px"),
                  "CASP — 10 questions · qualitative primary studies", "teal"),
             stack([
                 card(p("Sixteen domains for appraising <b>reviews</b>, not primary studies: "
                        "protocol registration, comprehensiveness of the search, "
                        "justification for excluding studies, risk-of-bias assessment, "
                        "consideration of publication bias.", "small", "margin:0"),
                      "AMSTAR-2 — systematic reviews"),
                 card(ul(["Are datasets, hyperparameters and **random seeds** reported?",
                          "Is the setup reproducible — code, environment, container?",
                          "Are baselines appropriate **and recent**?",
                          "Are tests reported with **effect sizes and confidence intervals**?",
                          "Is there a threats-to-validity section?"],
                         None, "margin:0;font-size:13px"),
                      "CS-adapted — computational studies", "rust"),
             ], 10),
         ], "1fr 1.2fr"),
         rule("Know <b>one</b> framework thoroughly — CASP is the most versatile. Applying a "
              "primary-study checklist to a survey paper produces nonsense."),
     ], 11)},

    {"title": "Threats to validity", "kicker": "Critical appraisal · 3 of 3",
     "h": "Four validity types — and one appraisal verdict",
     "body": stack([
         table(["Validity type", "Question posed", "Typical CS threat"], [
             ["**Internal**", "Did the treatment actually cause the effect?",
              "Confounds, hyperparameter leakage, data snooping"],
             ["**Construct**", "Do the operationalisations measure the intended constructs?",
              "Accuracy used as a proxy for “fairness” without justification"],
             ["**External**", "Can the findings generalise?",
              "Single-dataset evaluation, no demographic diversity"],
             ["**Statistical conclusion**", "Are the statistical inferences correct?",
              "Multiple comparisons uncorrected, underpowered studies"],
         ]),
         card(stack([
             p("<i>“A Deep Learning Model for Phishing URL Detection Achieving 99.2% "
               "Accuracy”</i>", "small", "margin:0;font-size:16px"),
             ul(["**Methodological** — single dataset, no temporal split, possible leakage",
                 "**Methodological** — baseline is logistic regression only; no recent transformer detectors",
                 "**Conceptual** — “phishing” adopted in a narrow URL-only sense",
                 "**Contribution** — headline metric misleading absent a sound protocol"],
                None, "margin:0;font-size:14px"),
             p("<b>Verdict:</b> promising idea, but the evidence does not yet support the "
               "claimed performance level — treat as preliminary.", "small",
               "margin:0;color:var(--rust)"),
         ], 7), "Worked appraisal", "rust"),
     ], 11)},

    {"title": "Synthesis: five types", "kicker": "Synthesis · 1 of 2",
     "h": "From a stack of summaries to an argument",
     "body": stack([
         rule("Synthesis is the deliberate recombination of evidence into a coherent — often "
              "<b>new</b> — understanding. Without it, a review is a stack of summaries."),
         grid([
             card(p("Textual integration by theme, method or chronology. Flexible; exposed "
                    "to reviewer bias.", "fine", "margin:0"), "Narrative", "tint"),
             card(p("Statistical aggregation of effect sizes. Most rigorous; needs "
                    "comparable metrics.", "fine", "margin:0"), "Meta-analysis", "tint"),
             card(p("Codes and themes developed then mapped across studies. Thomas &amp; "
                    "Harden (2008).", "fine", "margin:0"), "Thematic", "tint"),
             card(p("Combines empirical and theoretical sources. Suits conceptual and "
                    "design-science work.", "fine", "margin:0"), "Integrative", "tint"),
             card(p("Uses a pre-existing framework as the organising scaffold.", "fine",
                    "margin:0"), "Framework", "tint"),
         ], "1fr 1fr 1fr 1fr 1fr", gap="8px"),
         grid([
             eqbox("S = f( C<sub>1</sub>, C<sub>2</sub>, &hellip;, C<sub>n</sub> )"),
             card(p("<b>f is a defensible inferential move</b> — aggregation, contrast or "
                    "explanation — not a mechanical combination. Naming the move is what "
                    "makes the synthesis auditable.", "small", "margin:0"), None, "rust"),
         ], "1fr 1.3fr"),
         p("<b>Selection logic:</b> comparable quantitative metrics &rarr; meta-analysis · "
           "heterogeneous or mixed evidence &rarr; thematic · an existing theory available "
           "as scaffold &rarr; framework synthesis.", "fine", "margin:0"),
     ], 10)},

    {"title": "Synthesis: demonstrated", "kicker": "Synthesis · 2 of 2",
     "h": "The five-stage workflow, demonstrated",
     "body": stack([
         flow(["1 Tabulate", "2 Code", "3 Cluster", "4 Relate", "5 Narrate"]),
         grid([
             card(ul(["A — Random Forest outperforms SVM on the NVD corpus",
                      "B — deep models excel only with large, balanced corpora",
                      "C — class imbalance is the dominant performance barrier",
                      "D — static features insufficient; semantic features improve recall",
                      "E — cross-project prediction is poor: distributional shift"],
                     None, "margin:0;font-size:13px"),
                  "Five studies on ML vulnerability prediction", "tint"),
             stack([
                 card(p("“Study A found…, Study B found…, Study C found…” — five sentences, "
                        "<b>zero claims</b>.", "small", "margin:0"),
                      "Summary — what students write", "rust"),
                 card(p("<i>Across the corpus, prediction accuracy is shaped more strongly by "
                        "data characteristics — imbalance, distributional shift — than by "
                        "algorithmic choice. While deep models show potential in data-rich "
                        "settings, classical models retain a Pareto advantage when labelled "
                        "data is scarce.</i>", "small", "margin:0"),
                      "Synthesis — what is required", "teal"),
             ], 10),
         ], "1fr 1.35fr"),
         rule("Why this qualifies: the claim appears in <b>none</b> of the five studies. It "
              "is produced by <b>contrasting</b> B, C and E (data effects) against A and D "
              "(model and feature effects)."),
     ], 11)},

    {"title": "Gap taxonomy", "kicker": "Gap identification · 1 of 2",
     "h": "Six types of research gap — and what each obliges you to build",
     "body": stack([
         table(["Gap type", "What is absent", "Design implication"], [
             ["**Empirical**", "The phenomenon has not been examined, or not sufficiently",
              "A study that measures it"],
             ["**Theoretical**", "Theory fails to explain the pattern, or none applied",
              "A framework, or an application of one"],
             ["**Methodological**", "Prior work relies on a narrow set of methods",
              "An alternative method or metric"],
             ["**Population / contextual**", "Findings restricted to one demographic, geography or domain",
              "Evaluation in the missing context"],
             ["**Data**", "Required datasets absent, inaccessible or lacking attributes",
              "A dataset contribution"],
             ["**Inconsistency**", "Conflicting results never reconciled",
              "A replication or moderator analysis"],
         ]),
         grid([
             card(p("“No evaluation on low-resource Indic languages” &rarr; <b>contextual</b><br>"
                    "“Two reviews report contradictory effect sizes” &rarr; <b>inconsistency</b><br>"
                    "“Adoption theory never applied to QCaaS” &rarr; <b>theoretical</b>",
                    "small", "margin:0"), "Rapid classification drill", "tint"),
             card(p("<b>Gap-by-omission</b> — claiming a gap because <i>you</i> found no "
                    "paper, rather than demonstrating absence through a structured search.",
                    "small", "margin:0"), "The cardinal error", "rust"),
         ], "1.25fr 1fr"),
     ], 10)},

    {"title": "Gap statement grammar", "kicker": "Gap identification · 2 of 2",
     "h": "The canonical grammar, and four diagnostic tests",
     "body": stack([
         card(p("<i>“Despite [extensive/some] research on <b>[A]</b> in [context C], "
                "[little/no] attention has been paid to <b>[B]</b>, particularly with "
                "respect to [specific dimension]. This is consequential because [reason]. "
                "Therefore, this study investigates [research question] using [method] in "
                "[context].”</i>", "small", "margin:0;font-size:16px"),
              "Canonical grammar", "teal"),
         grid([
             card(ul(["***Despite*** — signals awareness of prior work",
                      "***Gap*** — names the absence precisely",
                      "***Consequence*** — demonstrates significance",
                      "***Therefore*** — positions the new research"],
                     None, "margin:0;font-size:13px"), "What each clause does", "tint"),
             card(ul(["**Evidence** — can the absence be demonstrated by a structured search?",
                      "**Novelty** — is it distinct from gaps already addressed?",
                      "**Tractability** — can it be addressed with your resources, data and time?",
                      "**Significance** — will closing it matter to theory, practice or both?"],
                     None, "margin:0;font-size:13px"), "Four diagnostic tests", "rust"),
         ]),
         card(p("<i>“Despite extensive research on adversarial robustness in image "
                "classifiers, limited attention has been paid to the intersection of "
                "robustness and fairness, particularly for L<sub>2</sub>-bounded "
                "perturbations under realistic threat models. This intersection is "
                "consequential because deployed classifiers may fail unequally across "
                "subgroups, raising ethical and operational concerns. Therefore, this study "
                "investigates the fairness–robustness trade-off in medical imaging "
                "classifiers using a constrained optimisation framework.”</i>",
                "small", "margin:0"), "Worked example — adversarial robustness", "tint"),
     ], 10)},

    {"title": "Theoretical framing I", "kicker": "Theoretical framing · 1 of 2",
     "h": "Theoretical versus conceptual framework",
     "body": stack([
         rule("A theoretical framework is <b>not decoration</b> — it is the organising logic "
              "of the research, informing every methodological and interpretive choice."),
         table(["Aspect", "Theoretical framework", "Conceptual framework"], [
             ["Source", "Established, citable theory (TAM, DOI)", "Researcher-built diagram linking variables"],
             ["Function", "Supplies explanatory logic and propositions", "Clarifies relationships to be tested"],
             ["**Testability**", "**Generates falsifiable hypotheses**", "Provides a roadmap for analysis"],
             ["Example", "Technology Acceptance Model",
              "A diagram linking code-review frequency, defect density and team size"],
         ]),
         grid([
             card(p("<b>TAM</b> · <b>UTAUT</b> · <b>DOI</b> · <b>TOE</b> · Activity Theory · "
                    "Constructivism and Situated Learning · General Deterrence Theory · "
                    "PDCA · Resource-Based View", "small", "margin:0"),
                  "Recurring theories in CS research", "teal"),
             card(p("<b>Theory-of-the-month</b> — adopting a theory because it is "
                    "fashionable rather than because its constructs align with the research "
                    "questions.", "small", "margin:0"), "Failure mode", "rust"),
         ], "1.4fr 1fr"),
     ], 11)},

    {"title": "Theoretical framing II", "kicker": "Practical application",
     "h": "Building a framework in four steps",
     "body": stack([
         grid([
             stack([
                 card(p("Surface three to five candidates via seminal works, systematic "
                        "reviews and citation tracing. Competition between candidates is "
                        "what makes the final choice defensible.", "small", "margin:0"),
                      "1 · Identify candidate theories"),
                 card(p("Verify that the theory's constructs align with what you are "
                        "actually asking; modify or extend where they do not.",
                        "small", "margin:0"), "2 · Map constructs to questions"),
                 card(p("Translate theoretical relationships into testable statements — "
                        "e.g. H<sub>1</sub>: &beta;<sub>1</sub> &gt; 0 for the effect of "
                        "perceived usefulness on adoption intention.", "small", "margin:0"),
                      "3 · Derive propositions"),
                 card(p("State the boundary conditions under which the theory is believed "
                        "to hold, so later disconfirmation is interpretable rather than "
                        "fatal.", "small", "margin:0"), "4 · Articulate assumptions"),
             ], 9),
             stack([
                 card(stack([
                     p("<b>Theory:</b> DOI combined with TOE", "small", "margin:0"),
                     p("<b>Constructs:</b> relative advantage, compatibility, complexity "
                       "(DOI); firm size, top-management support, regulatory environment, "
                       "competitive pressure (TOE)", "small", "margin:0"),
                     p("<b>H<sub>1</sub>:</b> relative advantage positively affects adoption",
                       "small", "margin:0"),
                     p("<b>H<sub>2</sub>:</b> top-management support moderates the effect of "
                       "complexity on adoption", "small", "margin:0"),
                     p("<b>Assumptions:</b> startups operate under resource scarcity; "
                       "respondents are technically literate", "small", "margin:0"),
                 ], 5), "Worked example — serverless adoption among Indian startups", "teal"),
                 card(p("The framework now determines the survey instrument, the sampling "
                        "strategy, the analysis (PLS-SEM) and the interpretation — which is "
                        "<b>why framing precedes design</b>.", "small", "margin:0"),
                      None, "tint"),
             ], 9),
         ], "1fr 1.1fr"),
     ], 10)},

    {"title": "Integration and case", "kicker": "Case study",
     "h": "Energy-efficient inference on the edge — all four operations",
     "body": stack([
         flow(["Appraise", "Extract &amp; code", "Synthesise", "Identify gap",
               "Frame", "Research questions"]),
         grid([
             card(p("<b>23 primary studies</b> appraised and tagged by dataset, quantisation "
                    "method, hardware target and reported metrics. Studies flagged where "
                    "latency, energy and accuracy are not reported <i>jointly</i>.",
                    "small", "margin:0"), "1 · Appraisal"),
             card(p("Three convergent themes: the <b>quantisation-depth/accuracy trade-off</b> "
                    "(8-bit as Pareto sweet spot); <b>hardware–software co-design</b> "
                    "outperforms algorithmic optimisation alone; <b>workload heterogeneity</b> "
                    "— vision and speech diverge.", "small", "margin:0"), "2 · Synthesis", "teal"),
         ]),
         card(p("<i>“Despite extensive research on quantisation and pruning for "
                "energy-efficient edge inference, limited attention has been paid to "
                "adaptive policies that dynamically trade accuracy for energy based on "
                "runtime context. This is consequential because static configurations "
                "underutilise the flexibility of modern edge accelerators. Therefore, this "
                "study proposes a reinforcement-learning-based adaptive inference framework "
                "and evaluates it on a Jetson Nano platform.”</i>", "small", "margin:0"),
              "3 · Gap — methodological", "rust"),
         grid([
             card(p("The <b>Markov Decision Process</b> formalism supplies the lens; the "
                    "policy is learned by deep RL. State, action and reward derive from "
                    "system-level measurements.", "small", "margin:0"), "4 · Framing", "teal"),
             card(p("Appraisal and synthesis without framing leaves questions "
                    "<b>empirically orphaned</b>. Sophisticated theory on a poorly evidenced "
                    "gap fails equally. <b>Mastery requires all four.</b>", "small", "margin:0"),
                  "Two failure modes", "rust"),
         ]),
     ], 9)},

    {"title": "Pitfalls and summary", "kicker": "Consolidation",
     "h": "Five pitfalls, and what to retain",
     "body": stack([
         table(["Pitfall", "Description", "Mitigation"], [
             ["**Cataloguing**", "Listing studies without evaluation",
              "Append appraisal and synthesis sentences to every cluster"],
             ["**Gap-by-omission**", "Claiming a gap because no paper was found",
              "Demonstrate absence with a structured search"],
             ["**Theory-of-the-month**", "Adopting a fashionable theory",
              "Justify selection by construct alignment"],
             ["**Synthesis-by-citation**", "Dropping names without integrating findings",
              "Write integrative claims; cite evidence for *and against*"],
             ["**Mixing levels**", "Conflating empirical findings with opinion",
              "Separate evidence from interpretation explicitly"],
         ]),
         grid([
             card(ul(["**Appraisal** — trustworthiness and contribution, per study",
                      "**Synthesis** — new defensible claims, across studies",
                      "**Gaps** — taxonomy, grammar, four tests",
                      "**Framing** — citable theory, testable propositions"],
                     None, "margin:0;font-size:14px"), "Four takeaways", "teal"),
             card(p("Diagnose your own draft: which of the five pitfalls does it currently "
                    "exhibit?", "small", "margin:0"), "Discussion", "tint"),
         ], "1.4fr 1fr"),
     ], 10)},

    {"title": "Exam focus", "kicker": "Exam preparation",
     "h": "What the examiner asks, and how to answer",
     "body": stack([
         grid([
             card(ol(["**Internalise the gap-statement grammar** — practise five statements across different CS sub-fields",
                      "**Master one appraisal framework** — CASP; know its ten questions and apply two to a sample paper",
                      "**Distinguish synthesis from summary** — be ready to rewrite a summary paragraph as a synthetic one",
                      "**Connect theory to method** — “TAM suggests mediation, hence structural equation modelling”",
                      "**Use the validity vocabulary** — internal, construct, external, statistical conclusion",
                      "**Follow the worked-example format** — definition, procedure, example, pitfalls"],
                     None, "margin:0;font-size:13px"), "Six preparation points", "rust"),
             stack([
                 card(p("A senior researcher claims that <i>“in fast-moving CS sub-fields, "
                        "formal theoretical framing is impossible because theories become "
                        "obsolete quickly.”</i> Evaluate with reference to two theories.",
                        "small", "margin:0"), "Higher-order prompt 1", "tint"),
                 card(p("Diagnose: <i>“Across all surveyed studies, larger models always "
                        "outperform smaller ones.”</i> Name the synthesis technique, the "
                        "embedded assumptions, and the conditions under which it fails.",
                        "small", "margin:0"), "Higher-order prompt 2", "tint"),
             ], 10),
         ], "1.15fr 1fr"),
         p("<b>Further reading:</b> Booth, Sutton &amp; Papaioannou (2016) · Kitchenham &amp; "
           "Charters (2007) · Müller-Bloch &amp; Kranz (2015) · Thomas &amp; Harden (2008) · "
           "Webster &amp; Watson (2002) · Wohlin (2014).", "fine", "margin:0"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Locate this lecture precisely in the unit: earlier sessions established why reviews matter and which method to choose; this one covers the four intellectual operations performed once the papers are on the desk. The gap between a corpus and an argument is where most student reviews fail.",
    2: "Objective 3 is the highest-yield item: gap-statement formulation and critique appear repeatedly in assessment. In the 90-minute version, slides 6, 8 and 10 run as hands-on activities on papers students bring.",
    3: "Use the inward / outward / absent / lens formulation as the mental index for the whole lecture — students who hold these four directions can reconstruct the rest from first principles. Preview the recursion so the linear order of the next slides is not mistaken for a strict procedure.",
    4: "Insist on the distinction between reading for content and reading for warrant: students can restate a paper's claims but rarely ask whether the evidence could support them. Require the one-line verdict in their own extraction sheets.",
    5: "Stress that AMSTAR-2 and CASP answer different questions — students routinely apply a primary-study checklist to a survey paper. Dwell on 'recent baselines': comparing a 2025 method against a 2015 baseline is the commonest way CS papers manufacture apparent improvement.",
    6: "Run this as a live appraisal: show the title, ask what students would believe, then dismantle it lens by lens. Make the temporal-split point explicitly — phishing URLs are non-stationary, so random splits leak future information into training.",
    7: "Anchor the slide on the summary-versus-synthesis distinction, the most reliably examined idea in this lecture and the most commonly failed in submitted work. The schema is a reminder that a synthesised claim must be traceable to coded observations.",
    8: "Put the summary version and the synthesis version side by side and let the class name the difference before you do. Trace the derivation aloud so the inferential move is visible: the integrative claim is the contrast between two themes.",
    9: "Make the design implication explicit — students treat gap classification as labelling rather than as the decision determining what they will build or measure. Use the three examples as a rapid-fire classification drill.",
    10: "Tell students this grammar is the highest-yield sentence pattern in the unit; they should produce one in ninety seconds for any topic. Walk the worked example clause by clause so they see every specific phrase is earned by a documented feature of the literature.",
    11: "Confront the belief that theory is a humanities imposition irrelevant to systems work: without a lens, research questions are empirically orphaned. Ask whether their own project has a citable theory or a self-drawn variable diagram — the latter is acceptable if labelled correctly.",
    12: "Emphasise the examination heuristic: always close the loop from theory to method. Highlight the theory-combination move, since single theories rarely span both individual-perception and organisational-context constructs.",
    13: "Show that the four operations compose: the flagged reporting omission in step 1 becomes the heterogeneity theme in step 2, which exposes the adaptivity gap in step 3, which the MDP formalism makes tractable. An MDP is their theory — stating it converts an engineering tweak into a research contribution.",
    14: "Use the pitfalls table diagnostically: ask students to identify which pitfall their own draft review currently exhibits. Self-diagnosis is more durable than correction.",
    15: "Give the four-move answer technique and insist on the CS-example step. The 'larger models always outperform' prompt is the marquee discussion item because it exposes overgeneralised synthesis, the scaling-regime assumption and the data-budget caveat at once.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 3 Notes — Literature Analysis Techniques",
    "desc": ("Student notes for Unit III Lecture 3 of CSEG3060: critical appraisal with CASP "
             "and AMSTAR-2, threats to validity, five synthesis techniques and the synthesis "
             "workflow, the taxonomy of research gaps and the gap-statement grammar, and "
             "building a theoretical framework."),
    "lecno": "3",
    "lectitle": "Literature Analysis Techniques",
    "subline": ("Critical appraisal, synthesis, gap identification and theoretical framing "
                "&middot; 60 minutes &middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Critical appraisal", "Synthesis", "Gap identification",
               "Theoretical framing", "CASP", "Validity"],
    "pager": [("CSEG3060_Unit3_L02_Approaches_to_Literature_Review_Notes.html",
               "&larr; Lecture 2: Approaches to Literature Review"),
              ("CSEG3060_Unit3_L04_Addressing_Plagiarism_Notes.html",
               "Lecture 4: Addressing Plagiarism &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 3 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Demonstrate an understanding of literature exploration and ethical considerations "
          "in conducting research.")
        + p("Lectures 1 and 2 covered why a review matters and which method to use. This "
            "lecture covers the four intellectual operations performed once the papers are "
            "actually on the desk.")),

    box("exam", "How to use these notes",
        p("Four operations, four directions of attention: appraisal looks <em>inward</em> at "
          "each study, synthesis looks <em>outward</em> across the corpus, gap identification "
          "looks at <em>what is absent</em>, and framing supplies the <em>lens</em>. Students "
          "who hold these four directions can reconstruct the rest from first principles.")
        + p("The single highest-yield item is the <span class=\"kw\">gap-statement "
            "grammar</span> in Section 5.2. Practise writing five, across different CS "
            "sub-fields, until you can produce one in ninety seconds.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["<span class=\"kw\">Critically appraise</span> a research paper using structured "
        "checklists, evaluating methodological rigour, validity and contribution.",
        "<span class=\"kw\">Synthesise</span> findings from multiple primary studies using at "
        "least two formal synthesis techniques.",
        "<span class=\"kw\">Articulate research gaps</span> precisely using the canonical "
        "gap-statement grammar.",
        "<span class=\"kw\">Construct a theoretical framework</span> by linking a chosen "
        "theory to research questions, propositions and methodological choices.",
        "<span class=\"kw\">Integrate</span> the four techniques into a coherent literature "
        "review chapter or related-work section."]),
    p("Prerequisites: familiarity with basic research designs (experimental, "
      "quasi-experimental, case study, survey); literature search strategies and database "
      "operators; and working knowledge of IEEE, ACM and APA citation styles."),

    sec(2, "Key Concepts", "s2"),
    tw(table(["Concept", "One-line definition"], [
        ["**Critical appraisal**",
         "A structured evaluation of the trustworthiness and value of a research study"],
        ["**Synthesis**",
         "The integrative recombination of evidence across studies to produce new understanding"],
        ["**Research gap**",
         "An explicit, defensible absence in the body of knowledge that warrants new research"],
        ["**Theoretical framework**",
         "The conceptual scaffolding of theory guiding research questions, hypotheses and interpretation"],
    ])),
    p("The four are <span class=\"kw\">recursive and overlapping</span>, not sequential "
      "silos: synthesis exposes gaps, gaps motivate the choice of theory, and theory "
      "redirects what you appraise."),

    sec(3, "Critical Appraisal", "s3"),
    sub("3.1 Definition and Purpose", "s3-1"),
    box("def", "Definition &mdash; Critical appraisal",
        p("<span class=\"kw\">Critical appraisal</span> is the disciplined act of asking not "
          "only <em>what</em> a paper claims but <em>whether those claims are warranted by "
          "the evidence presented</em>. It is the methodological conscience of the "
          "literature review; without it, a literature survey degenerates into an uncritical "
          "catalogue.")),
    p("A researcher must rank claims by the strength of the methods that produced them. In "
      "computer science this is subtle: the strongest evidence is sometimes a correctness "
      "proof or a benchmark on standardised datasets, whereas in health research it is the "
      "randomised controlled trial. Appraisal frameworks must therefore be "
      "<em>adapted</em> to the discipline rather than imported wholesale."),

    sub("3.2 The Three-Lens Model", "s3-2"),
    ol(["<span class=\"kw\">Methodological lens.</span> Were the methods appropriate, "
        "rigorously executed and transparently reported?",
        "<span class=\"kw\">Conceptual lens.</span> Is the theoretical grounding coherent, "
        "and are the constructs well defined?",
        "<span class=\"kw\">Contribution lens.</span> Does the work advance knowledge beyond "
        "incremental description?"]),
    p("For each lens, record both <em>strengths</em> and <em>weaknesses</em>, and tag the "
      "paper with an appraisal summary &mdash; for example, <em>&ldquo;methodologically sound "
      "but conceptually narrow&rdquo;</em>. Forcing a one-line verdict is what converts "
      "passive reading into appraisal."),

    sub("3.3 Frameworks and Checklists", "s3-3"),
    p("<span class=\"kw\">CASP</span> (Critical Appraisal Skills Programme) is widely used "
      "for qualitative studies, with variants for randomised trials, cohort studies and "
      "systematic reviews. The qualitative checklist poses ten questions:"),
    ol(["Was there a clear statement of the aims of the research?",
        "Is a qualitative methodology appropriate?",
        "Was the research design appropriate to address the aims?",
        "Was the recruitment strategy appropriate?",
        "Was the data collected in a way that addressed the research issue?",
        "Has the relationship between researcher and participants been adequately considered?",
        "Have ethical issues been taken into consideration?",
        "Was the data analysis sufficiently rigorous?",
        "Is there a clear statement of findings?",
        "How valuable is the research?"]),
    p("<span class=\"kw\">AMSTAR-2</span> (A MeaSurement Tool to Assess systematic Reviews, "
      "version 2) evaluates sixteen domains, including protocol registration, "
      "comprehensiveness of the search strategy, justification for excluding studies, "
      "risk-of-bias assessment and consideration of publication bias. Use it when appraising "
      "<em>reviews</em>, not primary studies."),
    box("eg", "An adapted checklist for computational studies",
        ul(["Are the datasets, hyperparameters and random seeds reported?",
            "Is the experimental setup reproducible &mdash; code, environment, container?",
            "Are baselines appropriate <em>and recent</em>?",
            "Are statistical tests reported with effect sizes and confidence intervals?",
            "Is there a threats-to-validity section?"])
        + p("These items now reflect community practice: artefact-evaluation tracks at ICSE, "
            "NeurIPS and similar venues enforce several of them.")),

    sub("3.4 Threats to Validity", "s3-4"),
    p("Cook and Campbell's classical framework distinguishes four validity types, "
      "operationalised here for computing research."),
    tw(table(["Validity type", "Question posed", "Typical threat in CS research"], [
        ["**Internal validity**", "Did the treatment actually cause the observed effect?",
         "Confounding variables, hyperparameter leakage, data snooping"],
        ["**Construct validity**", "Do the operationalisations measure the intended constructs?",
         "Using accuracy as a proxy for &ldquo;fairness&rdquo; without conceptual justification"],
        ["**External validity**", "Can the findings generalise?",
         "Single-dataset evaluation, lack of demographic diversity"],
        ["**Statistical conclusion validity**", "Are the statistical inferences correct?",
         "Multiple comparisons without correction, underpowered studies"],
    ])),
    box("exam", "Vocabulary discipline",
        p("Examiners reward precision. Use <span class=\"kw\">internal</span>, "
          "<span class=\"kw\">construct</span>, <span class=\"kw\">external</span> and "
          "<span class=\"kw\">statistical conclusion</span> validity by name &mdash; never "
          "the generic word &ldquo;reliable&rdquo;.")),

    sub("3.5 Worked Appraisal", "s3-5"),
    box("eg", "&ldquo;A Deep Learning Model for Phishing URL Detection Achieving 99.2% Accuracy&rdquo;",
        tw(table(["Lens", "Question", "Finding"], [
            ["Methodological", "Were datasets representative?",
             "Single dataset, no temporal split, possible data leakage"],
            ["Methodological", "Were baselines compared?",
             "Only logistic regression; no recent transformer-based detectors"],
            ["Conceptual", "Is &ldquo;phishing&rdquo; well defined?",
             "Definition varies across sources; a narrow URL-only view is adopted"],
            ["Contribution", "Does 99.2% advance the field?",
             "Without a proper evaluation protocol the headline metric is misleading"],
        ]))
        + p("<span class=\"kw\">Verdict:</span> promising idea, but the evidence does not yet "
            "support the claimed performance level; treat as preliminary.")
        + p("The transferable lesson: a high reported number is a claim about an "
            "<em>evaluation protocol</em>, not about the world. Phishing URLs are "
            "non-stationary, so a random split leaks future information into training "
            "&mdash; a failure mode that generalises to fraud, intrusion and recommendation "
            "research.")),

    sec(4, "Synthesis", "s4"),
    sub("4.1 Definition and Purpose", "s4-1"),
    box("def", "Definition &mdash; Synthesis",
        p("<span class=\"kw\">Synthesis</span> is the deliberate recombination of evidence "
          "from multiple sources into a coherent, often new, understanding. Without "
          "synthesis, a literature review is a stack of summaries; with synthesis, it "
          "becomes an argument.")),

    sub("4.2 Five Types of Synthesis", "s4-2"),
    ol(["<span class=\"kw\">Narrative synthesis</span> &mdash; textual integration grouping "
        "studies by theme, method or chronology. Flexible and discursive, but susceptible to "
        "reviewer bias.",
        "<span class=\"kw\">Meta-analysis</span> &mdash; statistical aggregation of effect "
        "sizes across quantitative studies. The most rigorous form, but requires comparable "
        "metrics.",
        "<span class=\"kw\">Thematic synthesis</span> &mdash; codes and themes developed "
        "inductively or deductively, then mapped across studies. Originating in health "
        "research (Thomas and Harden, 2008), increasingly used in software engineering.",
        "<span class=\"kw\">Integrative synthesis</span> &mdash; combines empirical and "
        "theoretical sources; suits conceptual papers and design-science research.",
        "<span class=\"kw\">Framework synthesis</span> &mdash; uses a pre-existing "
        "theoretical or conceptual framework as a scaffold for organising evidence."]),
    p("Selection logic: comparable quantitative metrics point to meta-analysis; heterogeneous "
      "qualitative or mixed evidence points to thematic synthesis; an available theory points "
      "to framework synthesis."),

    sub("4.3 The Synthesis Workflow", "s4-3"),
    ol(["<span class=\"kw\">Tabulate</span> the corpus using an extraction sheet: authors, "
        "year, method, sample or dataset, findings, limitations.",
        "<span class=\"kw\">Code</span> each study &mdash; open coding for inductive "
        "synthesis, deductive coding for framework synthesis.",
        "<span class=\"kw\">Cluster</span> codes into themes or categories.",
        "<span class=\"kw\">Relate</span> clusters back to the research questions, "
        "identifying convergences and divergences.",
        "<span class=\"kw\">Narrate</span> the relationships, citing studies both as evidence "
        "and as counter-evidence."]),
    p("A conceptual schema for what is happening:"),
    eq("S = f( C<sub>1</sub>, C<sub>2</sub>, &hellip;, C<sub>n</sub> )", "synthesis schema"),
    p("where <span class=\"mv\">S</span> is the synthesised claim and "
      "<span class=\"mv\">C<sub>i</sub></span> are coded observations. In practice "
      "<span class=\"mv\">f</span> is a <span class=\"kw\">defensible inferential move</span> "
      "&mdash; aggregation, contrast or explanation &mdash; not a mechanical combination. "
      "Naming the move is what makes the synthesis auditable."),

    sub("4.4 Worked Example: Summary versus Synthesis", "s4-4"),
    p("Five studies on software vulnerability prediction using machine learning:"),
    ul(["<span class=\"kw\">Study A:</span> Random Forest outperforms SVM on the NVD corpus.",
        "<span class=\"kw\">Study B:</span> deep models excel only with large, balanced corpora.",
        "<span class=\"kw\">Study C:</span> class imbalance remains the dominant performance barrier.",
        "<span class=\"kw\">Study D:</span> static features alone are insufficient; semantic "
        "features improve recall.",
        "<span class=\"kw\">Study E:</span> cross-project prediction is poor owing to "
        "distributional shift."]),
    box("caution", "What students usually write &mdash; summary",
        p("&ldquo;Study A found&hellip;, Study B found&hellip;, Study C found&hellip;&rdquo; "
          "Five sentences, zero claims.")),
    box("eg", "What is required &mdash; thematic synthesis",
        p("<em>Across the corpus, prediction accuracy is shaped more strongly by data "
          "characteristics &mdash; imbalance, distributional shift &mdash; than by "
          "algorithmic choice. While deep models show potential in data-rich settings, "
          "classical models retain a Pareto advantage when labelled data is scarce.</em>")
        + p("This qualifies as synthesis because the claim appears in <em>none</em> of the "
            "five studies. It is produced by relating B, C and E (data effects) against A and "
            "D (model and feature effects) &mdash; a claim greater than the sum of its parts.")),

    sec(5, "Gap Identification", "s5"),
    sub("5.1 A Taxonomy of Gaps", "s5-1"),
    box("def", "Definition &mdash; Research gap",
        p("A <span class=\"kw\">research gap</span> is a defensible absence &mdash; of "
          "evidence, theory, method, population, context or data &mdash; that justifies new "
          "research. Gap identification is the bridge between the literature review and the "
          "research question.")),
    p("Adapted from M&uuml;ller-Bloch and Kranz (2015) and refined for computing contexts:"),
    tw(table(["Gap type", "What is absent", "What it obliges you to build"], [
        ["**Empirical gap**", "No study, or insufficient study, of the phenomenon",
         "A study that measures it"],
        ["**Theoretical gap**", "Existing theory does not explain observed patterns, or none applied",
         "A framework, or an application of one"],
        ["**Methodological gap**", "Prior work relies on a narrow set of methods",
         "An alternative method, tool or metric"],
        ["**Population / contextual gap**", "Findings restricted to a demographic, geography or domain",
         "Evaluation in the missing context"],
        ["**Data gap**", "Required datasets do not exist, are inaccessible, or lack key attributes",
         "A dataset contribution"],
        ["**Inconsistency gap**", "Existing studies report conflicting results, unreconciled",
         "A replication or moderator analysis"],
    ])),
    box("exam", "Classification drill",
        ol(["&ldquo;No study has evaluated the algorithm on low-resource Indic "
            "languages.&rdquo; &rarr; <span class=\"kw\">population / contextual gap</span>",
            "&ldquo;Two systematic reviews report contradictory effect sizes for the same "
            "intervention.&rdquo; &rarr; <span class=\"kw\">inconsistency gap</span>",
            "&ldquo;Technology-adoption theory has not been applied to "
            "quantum-computing-as-a-service.&rdquo; &rarr; <span class=\"kw\">theoretical "
            "gap</span>"])),

    sub("5.2 The Canonical Gap-Statement Grammar", "s5-2"),
    box("def", "The grammar",
        p("<em>Despite [extensive / some] research on <strong>[A]</strong> in [context C], "
          "[little / no] attention has been paid to <strong>[B]</strong>, particularly with "
          "respect to [specific dimension]. This is consequential because [reason]. "
          "Therefore, this study investigates [research question] using [method] in "
          "[context].</em>")),
    ul(["<span class=\"kw\">Despite clause</span> &mdash; signals awareness of and respect "
        "for prior work.",
        "<span class=\"kw\">Gap clause</span> &mdash; names the absence precisely.",
        "<span class=\"kw\">Consequence clause</span> &mdash; demonstrates significance.",
        "<span class=\"kw\">Therefore clause</span> &mdash; positions the new research."]),

    sub("5.3 Four Diagnostic Tests", "s5-3"),
    tw(table(["Test", "Question"], [
        ["**Evidence test**", "Can the absence be demonstrated by a structured search?"],
        ["**Novelty test**", "Is the gap distinct from gaps already addressed in recent literature?"],
        ["**Tractability test**", "Can the gap be addressed with available resources, data and time?"],
        ["**Significance test**", "Will closing the gap matter to theory, practice, or both?"],
    ])),
    p("The tractability test is the one students skip and supervisors enforce: a perfectly "
      "novel gap that requires inaccessible clinical data is not a viable project."),

    sub("5.4 Worked Example", "s5-4"),
    box("eg", "Adversarial robustness",
        p("The literature reveals that most studies use the ImageNet benchmark; most evaluate "
          "only <span class=\"mv\">L<sub>&infin;</sub></span>-bounded perturbations; "
          "real-world threat models such as physical-world stickers and audio adversarial "
          "examples are sparsely studied; and few studies evaluate robustness across "
          "demographic subgroups.")
        + p("<em>Despite extensive research on adversarial robustness in image classifiers, "
            "limited attention has been paid to the intersection of robustness and fairness, "
            "particularly for <span class=\"mv\">L<sub>2</sub></span>-bounded perturbations "
            "under realistic threat models. This intersection is consequential because "
            "deployed classifiers may fail unequally across subgroups, raising both ethical "
            "and operational concerns. Therefore, this study investigates the "
            "fairness&ndash;robustness trade-off in medical imaging classifiers using a "
            "constrained optimisation framework.</em>")
        + p("Every specific phrase &mdash; <span class=\"mv\">L<sub>2</sub></span>, realistic "
            "threat models, subgroups &mdash; is <em>earned</em> by a documented feature of "
            "the literature rather than invented.")),

    sec(6, "Theoretical Framing", "s6"),
    sub("6.1 Definition and Purpose", "s6-1"),
    box("def", "Definition &mdash; Theoretical framing",
        p("<span class=\"kw\">Theoretical framing</span> is the act of selecting, adapting "
          "and articulating a theory, or combination of theories, that informs every "
          "subsequent methodological and interpretive choice. A theoretical framework is not "
          "decoration; it is the <em>organising logic</em> of the research.")),

    sub("6.2 Theoretical versus Conceptual Framework", "s6-2"),
    tw(table(["Aspect", "Theoretical framework", "Conceptual framework"], [
        ["Source", "Established, citable theory (TAM, DOI)",
         "Researcher-built diagram linking variables"],
        ["Function", "Provides explanatory logic and propositions",
         "Clarifies relationships to be tested"],
        ["Testability", "Generates hypotheses that can be falsified",
         "Provides a roadmap for analysis"],
        ["Example", "Technology Acceptance Model",
         "A diagram linking code-review frequency, defect density and team size"],
    ])),
    p("In practice a theoretical framework can <em>incorporate</em> a conceptual framework "
      "when the constructs derive from a theory but are arranged to suit the specific study. "
      "A self-drawn variable diagram is acceptable provided it is labelled honestly as such."),

    sub("6.3 Theories That Recur in CS Research", "s6-3"),
    ul(["<span class=\"kw\">TAM</span> (Technology Acceptance Model) &mdash; predicts "
        "adoption through perceived usefulness and perceived ease of use.",
        "<span class=\"kw\">UTAUT</span> &mdash; extends TAM with social and facilitating "
        "conditions.",
        "<span class=\"kw\">DOI</span> (Diffusion of Innovations) &mdash; explains how "
        "innovations spread through social systems.",
        "<span class=\"kw\">TOE</span> (Technology&ndash;Organization&ndash;Environment) "
        "&mdash; used in information-systems adoption studies.",
        "<span class=\"kw\">Activity Theory</span> &mdash; used in HCI and CSCW to analyse "
        "mediated action.",
        "<span class=\"kw\">Constructivism / Situated Learning</span> &mdash; used in "
        "educational technology and CS pedagogy.",
        "<span class=\"kw\">General Deterrence Theory</span> &mdash; used in cybersecurity "
        "compliance research.",
        "<span class=\"kw\">PDCA</span> and variants &mdash; used in software process "
        "improvement research.",
        "<span class=\"kw\">Resource-Based View</span> &mdash; explains firm-level IT "
        "capabilities."]),

    sub("6.4 Building a Framework in Four Steps", "s6-4"),
    ol(["<span class=\"kw\">Identify candidate theories.</span> Surface three to five "
        "candidates by reviewing seminal works, systematic reviews and citation tracing. "
        "Competition between candidates is what makes the final choice defensible.",
        "<span class=\"kw\">Map constructs to research questions.</span> Verify that the "
        "theory's constructs align with the questions; modify or extend where they do not.",
        "<span class=\"kw\">Derive propositions or hypotheses.</span> Translate theoretical "
        "relationships into testable statements &mdash; for example "
        "<span class=\"mv\">H<sub>1</sub>: &beta;<sub>1</sub> &gt; 0</span> for the effect of "
        "perceived usefulness on adoption intention.",
        "<span class=\"kw\">Articulate assumptions.</span> State the boundary conditions "
        "under which the theory is believed to hold, so that later disconfirmation is "
        "interpretable rather than fatal."]),
    box("eg", "Worked example &mdash; adoption of serverless computing among Indian startups",
        ul(["<span class=\"kw\">Theory selected:</span> DOI combined with TOE.",
            "<span class=\"kw\">Constructs mapped:</span> relative advantage, compatibility, "
            "complexity (DOI); firm size, top-management support, regulatory environment, "
            "competitive pressure (TOE).",
            "<span class=\"kw\">H<sub>1</sub>:</span> relative advantage has a positive effect "
            "on serverless adoption.",
            "<span class=\"kw\">H<sub>2</sub>:</span> top-management support moderates the "
            "effect of complexity on adoption.",
            "<span class=\"kw\">Assumptions:</span> startups operate under resource scarcity; "
            "respondents are technically literate."])
        + p("The framework now anchors every subsequent choice &mdash; survey instrument, "
            "sampling, analysis (partial least squares structural equation modelling) and "
            "interpretation. This is precisely why framing precedes design.")),

    sec(7, "Integrating the Four Techniques", "s7"),
    p("A robust literature review chapter exhibits the following movement:"),
    ol(["Critical appraisal, per study.",
        "Extraction and coding.",
        "Synthesis, across studies.",
        "Gap identification, within and across themes.",
        "Theoretical framing, as the lens for interpretation.",
        "Research questions, anchored in <em>both</em> the gap and the theory."]),
    box("caution", "Two failure modes",
        p("A common failure is to perform critical appraisal and synthesis but skip "
          "theoretical framing, leaving the research questions <span class=\"kw\">empirically "
          "orphaned</span>. Conversely, a theoretically sophisticated paper can be undermined "
          "by a poorly evidenced gap. Mastery requires all four.")),

    sub("7.1 Case Study: Energy-Efficient Edge Inference", "s7-1"),
    ol(["<span class=\"kw\">Appraisal.</span> Twenty-three primary studies are appraised and "
        "tagged by dataset, quantisation method, hardware target and reported metrics. "
        "Studies are flagged where latency, energy and accuracy are not reported jointly.",
        "<span class=\"kw\">Synthesis.</span> A thematic synthesis yields three convergent "
        "themes: the quantisation-depth versus accuracy trade-off, with most studies "
        "converging on 8-bit as a Pareto sweet spot; hardware&ndash;software co-design "
        "yielding larger gains than algorithmic optimisation alone; and workload "
        "heterogeneity, with findings diverging between vision and speech.",
        "<span class=\"kw\">Gap (methodological).</span> Most studies optimise for accuracy "
        "under a fixed energy budget; few explore <em>adaptive</em> policies that respond to "
        "runtime context such as battery level, network latency or user activity.",
        "<span class=\"kw\">Framing.</span> The study adopts the "
        "<span class=\"kw\">Markov Decision Process</span> formalism as its theoretical lens, "
        "with the policy learned by deep reinforcement learning. State, action and reward are "
        "derived from system-level measurements."]),
    box("eg", "The resulting gap statement",
        p("<em>Despite extensive research on quantisation and pruning for energy-efficient "
          "edge inference, limited attention has been paid to adaptive policies that "
          "dynamically trade accuracy for energy based on runtime context. This is "
          "consequential because static configurations underutilise the flexibility of modern "
          "edge accelerators. Therefore, this study proposes a reinforcement-learning-based "
          "adaptive inference framework and evaluates it on a Jetson Nano platform.</em>")),

    sec(8, "Common Pitfalls", "s8"),
    tw(table(["Pitfall", "Description", "Mitigation"], [
        ["**Cataloguing**", "Listing studies without evaluation",
         "Always append appraisal and synthesis sentences"],
        ["**Gap-by-omission**", "Claiming a gap simply because no paper was found",
         "Use structured searches to demonstrate absence"],
        ["**Theory-of-the-month**", "Adopting a theory because it is fashionable",
         "Justify theory selection with construct alignment"],
        ["**Synthesis-by-citation**", "Dropping names without integrating findings",
         "Write integrative claims and cite evidence for and against them"],
        ["**Mixing levels**", "Mixing empirical findings with opinion",
         "Clearly distinguish evidence from interpretation"],
    ])),

    sec(9, "Summary", "s9"),
    ul(["<span class=\"kw\">Critical appraisal</span> evaluates each study's trustworthiness "
        "and contribution, using a structured checklist and the four-validity framework.",
        "<span class=\"kw\">Synthesis</span> integrates evidence into new, defensible claims "
        "through narrative, thematic, meta-analytic, integrative or framework approaches.",
        "<span class=\"kw\">Gap identification</span> articulates absences precisely, using a "
        "taxonomy, a canonical grammar and four diagnostic tests.",
        "<span class=\"kw\">Theoretical framing</span> anchors the research in established "
        "theory, generates testable propositions, and guides every methodological decision.",
        "The techniques are interdependent; a strong literature review chapter is often the "
        "single most cited section of a thesis or paper."]),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Six preparation points",
        ol(["<span class=\"kw\">Internalise the gap-statement grammar.</span> Practise "
            "writing five gap statements across different CS sub-fields.",
            "<span class=\"kw\">Memorise one appraisal framework thoroughly.</span> CASP is "
            "the most versatile; know its ten questions and apply two to a sample paper.",
            "<span class=\"kw\">Distinguish synthesis from summary.</span> Be prepared to "
            "rewrite a summary paragraph as a genuinely synthetic one.",
            "<span class=\"kw\">Connect theory to method.</span> &ldquo;TAM suggests testing "
            "mediation, hence structural equation modelling is appropriate.&rdquo;",
            "<span class=\"kw\">Use the threats-to-validity vocabulary</span> &mdash; "
            "internal, external, construct, statistical conclusion.",
            "<span class=\"kw\">Follow the worked-example format:</span> definition, "
            "procedure, example, pitfalls."])),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Differentiate between critical appraisal and synthesis. Give a one-sentence "
           "example of each from a CS paper you have read. " + marks("3 marks"),
           "List the four validity types in Cook and Campbell's framework and give one "
           "CS-specific threat to each. " + marks("4 marks"),
           "What is the difference between a theoretical framework and a conceptual "
           "framework? When is each appropriate? " + marks("3 marks"),
           "Classify each as empirical, theoretical, methodological, contextual, data or "
           "inconsistency: (a) no study has evaluated a proposed algorithm on low-resource "
           "Indic languages; (b) two systematic reviews report contradictory effect sizes; "
           "(c) adoption theory has not been applied to quantum-computing-as-a-service. "
           + marks("3 marks")]),

    sub("10.2 Long-Answer Questions", "s10-2"),
    qlist(["Select five papers from a recent CS conference and produce an appraisal table "
           "using the three-lens model. " + marks("10 marks"),
           "Write a thematic synthesis of five studies on a topic of your choice. Include at "
           "least one integrative claim that goes beyond any individual study. "
           + marks("10 marks"),
           "Formulate a gap statement for a hypothetical study on automated test-case "
           "generation using large language models, and apply the four diagnostic tests. "
           + marks("10 marks"),
           "Propose a theoretical framework for a study on the adoption of AI-assisted code "
           "generation tools among undergraduate students. Identify candidate theories, "
           "derive two propositions, and justify your choice. " + marks("10 marks")]),

    sub("10.3 Higher-Order Questions", "s10-3"),
    qlist(["A senior researcher argues that <em>&ldquo;in fast-moving CS sub-fields, formal "
           "theoretical framing is impossible because theories become obsolete "
           "quickly.&rdquo;</em> Critically evaluate with reference to at least two theories "
           "discussed above.",
           "Some authors argue that systematic reviews are inappropriate for CS because the "
           "field lacks standardised reporting conventions. Defend or refute this position.",
           "Consider the synthesis claim <em>&ldquo;Across all surveyed studies, larger "
           "models always outperform smaller ones.&rdquo;</em> Identify the synthesis "
           "technique used, the assumptions embedded in the claim, and the conditions under "
           "which it would not hold."]),

    sec(11, "Further Reading", "s11"),
    ol(["Booth, A., Sutton, A., &amp; Papaioannou, D. (2016). <em>Systematic Approaches to a "
        "Successful Literature Review</em>. SAGE.",
        "Cronin, P., Ryan, F., &amp; Coughlan, M. (2008). Undertaking a literature review: A "
        "step-by-step approach. <em>British Journal of Nursing</em>, 17(1), 38&ndash;43.",
        "Kitchenham, B., &amp; Charters, S. (2007). <em>Guidelines for Performing Systematic "
        "Literature Reviews in Software Engineering</em>. EBSE Technical Report.",
        "M&uuml;ller-Bloch, C., &amp; Kranz, J. (2015). A framework for rigorously "
        "identifying research gaps in qualitative literature reviews. <em>ICIS 2015</em>.",
        "Thomas, J., &amp; Harden, A. (2008). Methods for the thematic synthesis of "
        "qualitative research in systematic reviews. <em>BMC Medical Research "
        "Methodology</em>, 8(1), 45.",
        "Webster, J., &amp; Watson, R. T. (2002). Analyzing the past to prepare for the "
        "future: Writing a literature review. <em>MIS Quarterly</em>, 26(2), "
        "xiii&ndash;xxiii.",
        "Wohlin, C. (2014). Guidelines for snowballing in systematic literature studies. "
        "<em>EASE 2014</em>."]),
])
