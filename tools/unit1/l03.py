# -*- coding: utf-8 -*-
"""Unit I - Lecture 3: Essential Attributes and Errors in Selection."""
from kit import box, eq, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L03_Essential_Attributes_and_Errors_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;"),
             ("CSEG3060_Unit1_L05_Errors_in_Problem_Selection.html", "Slides &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 3 Notes — Essential Attributes and Errors in Selection",
    "desc": ("Student notes for Unit I Lecture 3 of CSEG3060: the essential attributes of a "
             "good research problem grouped under conceptual quality, operational feasibility "
             "and strategic value; the ATTR-FEAS diagnostic checklist; and the five families "
             "of error in problem selection, with computing case studies."),
    "unitno": "Unit I",
    "lecno": "3",
    "lectitle": "Essential Attributes and Errors in Selection",
    "subline": ("Conceptual quality, operational feasibility, strategic value &mdash; and the "
                "five families of selection error &middot; B.Tech. (CSE) &middot; "
                "Dr. Mohsin Furkh Dar"),
    "badges": ["CO1", "Essential attributes", "ATTR-FEAS", "Falsifiability",
               "Five error families", "Reframing"],
    "pager": [("CSEG3060_Unit1_L02_Criteria_and_Characteristics_Notes.html",
               "&larr; Lecture 2: Criteria and Characteristics"),
              ("CSEG3060_Unit1_L04_Scope_and_Objectives_Notes.html",
               "Lecture 4: Scope and Objectives &rarr;")],
    "deck": "CSEG3060_Unit1_L05_Errors_in_Problem_Selection.html",
    "decklabel": "Lecture 3 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO1",
        p("Understand the meaning, significance and foundational components of research, "
          "including the formulation and evaluation of research problems.")
        + p("The selection of a research problem is the single most consequential decision in "
            "the research lifecycle. An elegant methodology, a sophisticated toolchain or a "
            "powerful statistical model <span class=\"kw\">cannot rescue a study built on a "
            "poorly chosen problem</span>. Conversely, a well-selected problem &mdash; even "
            "investigated with modest resources &mdash; tends to produce useful, publishable "
            "and citable contributions.")),

    box("exam", "How to use these notes",
        p("This lecture answers two complementary questions: <em>what makes a research problem "
          "good?</em> (the essential attributes, Section 2) and <em>what makes one bad?</em> "
          "(the selection errors, Section 4).")
        + p("The <span class=\"kw\">ATTR-FEAS checklist</span> in Section 3 consolidates the "
            "attributes into eight diagnostic questions. Memorise it: examiners ask you to "
            "apply it to a given problem statement, and it is also the fastest way to audit "
            "your own project proposal.")),

    sec(1, "Learning Objectives", "s1"),
    ul(["Describe the essential attributes that distinguish a scientifically sound research "
        "problem from a trivial or unworkable one.",
        "Apply a structured set of evaluative criteria when shortlisting a research problem in "
        "computer science.",
        "Identify and diagnose the common errors researchers commit at the problem-selection "
        "stage.",
        "Reframe a poorly stated problem into a well-defined one using practical heuristics.",
        "Connect the abstract qualities of a &ldquo;good&rdquo; problem to concrete CS research "
        "scenarios &mdash; algorithms, networks, AI/ML, software engineering."]),

    sec(2, "Essential Attributes of a Good Research Problem", "s2"),
    p("The attributes are interrelated: weakness in one often compromises the others. They "
      "group under three meta-categories &mdash; <span class=\"kw\">conceptual quality</span>, "
      "<span class=\"kw\">operational feasibility</span> and <span class=\"kw\">strategic "
      "value</span>."),

    sub("2.1 Conceptual Quality", "s2-1"),
    p("<span class=\"kw\">Clarity and precision of statement.</span> The problem must be "
      "expressed in unambiguous, operationally defined terms. Vague verbs such as "
      "<em>study</em>, <em>understand</em>, <em>look at</em> or <em>explore the area of</em> "
      "should be replaced with precise verbs: <em>evaluate</em>, <em>compare</em>, "
      "<em>predict</em>, <em>classify</em>, <em>optimise</em>."),
    box("eg", "Precision in one rewrite",
        p("<span class=\"kw\">Poor:</span> &ldquo;Study deep learning.&rdquo;")
        + p("<span class=\"kw\">Improved:</span> &ldquo;Evaluate the impact of "
            "activation-function selection (ReLU, GELU, Swish) on the convergence speed of "
            "residual CNNs trained on CIFAR-10.&rdquo;")),
    p("<span class=\"kw\">Novelty and originality.</span> Novelty is relative and can be "
      "expressed along several dimensions, and a problem need not be novel in every one "
      "&mdash; CS theses routinely make methodological or empirical contributions alone:"),
    ul(["<span class=\"kw\">Theoretical novelty</span> &mdash; a new model, proof or "
        "complexity bound.",
        "<span class=\"kw\">Methodological novelty</span> &mdash; applying an existing method "
        "to a new domain, or refining it non-trivially.",
        "<span class=\"kw\">Empirical novelty</span> &mdash; new evidence on a contested "
        "question, for instance benchmarking a new optimiser across heterogeneous hardware.",
        "<span class=\"kw\">Application novelty</span> &mdash; deploying an established "
        "technique against a previously unsolved practical problem."]),
    p("<span class=\"kw\">Theoretical grounding.</span> A problem should arise from an "
      "identifiable body of literature and contribute back to it. You must be able to position "
      "the work with respect to at least one established theory &mdash; PAC learning, "
      "information theory, queueing theory, type theory, software metrics theory."),
    p("<span class=\"kw\">Testability and falsifiability.</span> Following Popperian "
      "epistemology, a problem should admit hypotheses that can in principle be refuted. In "
      "computing this means questions whose answers rest on measurable outcomes: does the "
      "proposed algorithm reduce worst-case time complexity? Does the model achieve "
      "statistically significant gains in F1 on a held-out test set? Does the protocol lower "
      "end-to-end latency under specified load? <em>A problem that cannot, even in principle, "
      "be refuted is closer to speculation than to research.</em>"),

    sub("2.2 Operational Feasibility", "s2-2"),
    p("<span class=\"kw\">Researchability.</span> The problem must be investigable using "
      "available or obtainable methods. One demanding access to a hyperscale data centre or "
      "proprietary industrial control systems may be theoretically interesting but practically "
      "unresearchable for a student."),
    p("<span class=\"kw\">Feasibility of data acquisition.</span> Empirical CS research depends "
      "on data &mdash; benchmark datasets, log files, survey responses, simulation traces. The "
      "problem must specify the sources and confirm they are accessible, ethical, and of "
      "adequate volume and quality. For quantitative work a rough sample-size awareness helps; "
      "comparing two means with expected effect size <span class=\"mv\">d</span>, the normal "
      "approximation gives a per-group size of:"),
    eq("n &asymp; 2( z<sub>1&minus;&alpha;/2</sub> + z<sub>1&minus;&beta;</sub> )&sup2; / "
       "d&sup2;", "per-group sample size"),
    p("where <span class=\"mv\">z<sub>1&minus;&alpha;/2</sub></span> and "
      "<span class=\"mv\">z<sub>1&minus;&beta;</sub></span> are the standard normal deviates "
      "for the significance level and the statistical power. A problem whose data requirements "
      "vastly exceed the attainable <span class=\"mv\">n</span> is not feasible."),
    p("<span class=\"kw\">Compatibility with the researcher's competence.</span> The problem "
      "should lie within, or just beyond, the existing skill envelope. A novice attempting "
      "quantum algorithm design or category-theoretic semantics without preparation is "
      "unlikely to produce credible work."),
    p("<span class=\"kw\">Manageability of scope.</span> Over-scoping is a common failure mode. "
      "Scope must be commensurate with the time, computing and human resources available: a "
      "manageable problem produces at least one defensible contribution within the stipulated "
      "duration."),
    p("<span class=\"kw\">Ethical acceptability.</span> The problem must conform to "
      "institutional norms &mdash; responsible data handling, avoidance of harm from deployed "
      "AI systems, and compliance with ethics-committee requirements."),

    sub("2.3 Strategic Value", "s2-3"),
    ul(["<span class=\"kw\">Relevance and significance.</span> The problem should matter to the "
        "discipline, to industry or to society. Significance is established by a gap explicitly "
        "acknowledged in prior surveys, a pain point documented in industry reports, or a "
        "theoretical contradiction that warrants resolution.",
        "<span class=\"kw\">Timeliness.</span> Applied CS problems are especially "
        "time-sensitive because platforms evolve rapidly &mdash; LLM architectures, edge "
        "devices, 6G networks.",
        "<span class=\"kw\">Generative potential.</span> A truly fertile problem, once solved, "
        "opens three new avenues rather than closing the field.",
        "<span class=\"kw\">Interest and motivation.</span> Intrinsic interest is not a luxury "
        "but a strategic asset: it sustains the inevitable periods of dead-end debugging, "
        "negative results and reviewer criticism."]),

    sec(3, "The ATTR-FEAS Checklist", "s3"),
    box("exam", "A mnemonic for problem selection and proposal review",
        tw(table(["Letter", "Attribute", "Diagnostic question"], [
            ["**A**", "Aim clarity", "Can the problem be stated in one unambiguous sentence?"],
            ["**T**", "Testability", "Can at least one falsifiable hypothesis be formulated?"],
            ["**T**", "Theoretical link", "Is the problem grounded in an identifiable literature?"],
            ["**R**", "Relevance", "Does the problem matter to a recognised community?"],
            ["**F**", "Feasibility", "Are data, tools and skills realistically available?"],
            ["**E**", "Ethical soundness", "Does the study pass an ethics review?"],
            ["**A**", "Achievability of scope", "Can the work be completed in the allotted time?"],
            ["**S**", "Significance of contribution",
             "Will the outcome advance knowledge or practice?"],
        ]))
        + p("A problem scoring affirmatively on at least <span class=\"kw\">seven of the "
            "eight</span> items is generally defensible.")),

    sec(4, "Errors in the Selection of a Research Problem", "s4"),
    p("Selection errors fall into five families, each illustrated below with a typical "
      "computing scenario."),

    sub("4.1 Errors of Scope", "s4-1"),
    ul(["<span class=\"kw\">The over-broad problem.</span> <em>Symptom:</em> the statement "
        "covers an entire subfield &mdash; &ldquo;improve the performance of deep neural "
        "networks&rdquo;. This cannot be answered in any finite study. <em>Remedy:</em> narrow "
        "by algorithm, dataset, hardware or task.",
        "<span class=\"kw\">The over-narrow problem.</span> <em>Symptom:</em> the problem "
        "addresses a trivial special case &mdash; &ldquo;optimise a bubble sort routine on a "
        "32-element array of integers&rdquo;. The result will not generalise or interest "
        "anyone. <em>Remedy:</em> generalise by parameter, structure or domain until the result "
        "is indicative of a class of phenomena."]),

    sub("4.2 Errors of Conceptual Grounding", "s4-2"),
    ul(["<span class=\"kw\">Insufficient literature review.</span> Selecting without an "
        "adequate scan leads to duplication; a problem already solved is wasted effort even if "
        "the solver is unaware of the prior work. <em>Remedy:</em> conduct a systematic mapping "
        "or scoping review before finalising.",
        "<span class=\"kw\">Absence of a theoretical framework.</span> A problem unanchored in "
        "theory produces descriptive but not explanatory results &mdash; reporting that Model A "
        "outperforms Model B without invoking any learning-theoretic explanation. "
        "<em>Remedy:</em> identify at least one theoretical lens (bias&ndash;variance "
        "decomposition, VC dimension, software evolution theory) and design around it."]),

    sub("4.3 Errors of Empirical Design", "s4-3"),
    ul(["<span class=\"kw\">Unavailability of data.</span> A problem requiring proprietary, "
        "sensitive or practically inaccessible data is non-researchable &mdash; a thesis "
        "requiring millions of patient ECG records without a hospital collaboration. "
        "<em>Remedy:</em> secure the data through formal agreement, or reframe around publicly "
        "available surrogates.",
        "<span class=\"kw\">Inadequate measurement instruments.</span> Constructs that cannot "
        "be reliably measured yield noisy, uninterpretable results &mdash; measuring "
        "&ldquo;code quality&rdquo; using only lines of code. <em>Remedy:</em> validate the "
        "instruments, through inter-rater reliability for human-coded data or established "
        "benchmarks for algorithmic comparison."]),

    sub("4.4 Errors of Motivation and Context", "s4-4"),
    ul(["<span class=\"kw\">Fad-driven selection.</span> Choosing a problem because it is "
        "fashionable &mdash; &ldquo;I want to work on blockchain&rdquo;, &ldquo;I want to "
        "fine-tune an LLM&rdquo; &mdash; without a genuine research question leads to shallow "
        "work. <em>Remedy:</em> begin with the question, not the technology. "
        "<strong>The tool should serve the question, not the reverse.</strong>",
        "<span class=\"kw\">Adviser-driven selection without ownership.</span> A problem "
        "imposed without the student's intellectual buy-in tends to produce low-quality "
        "dissertations. <em>Remedy:</em> negotiate ownership of a sub-problem that genuinely "
        "interests you while still aligning with the larger grant.",
        "<span class=\"kw\">Politically convenient topics.</span> Problems selected because "
        "they are safe or aligned with institutional branding can be technically correct but "
        "lack intellectual edge. <em>Remedy:</em> look for the genuine intellectual tension "
        "inside the safe topic."]),

    sub("4.5 Errors of Self-Assessment", "s4-5"),
    ul(["<span class=\"kw\">Problem beyond competence.</span> Designing a novel cryptographic "
        "primitive without a background in number theory or complexity theory is unlikely to "
        "produce credible work. <em>Remedy:</em> upskill systematically, or select a problem "
        "one tier below the current frontier.",
        "<span class=\"kw\">Problem beneath interest.</span> A problem selected purely for ease "
        "&mdash; the &ldquo;safe PhD&rdquo; &mdash; rarely produces the deep engagement "
        "original work requires. <em>Remedy:</em> aim for the intersection of competence, "
        "interest and significance, under the additional constraint of feasibility.",
        "<span class=\"kw\">Ignored cost and time constraints.</span> A problem whose solution "
        "requires a six-month cluster run on a personal laptop is an error of planning rather "
        "than of conception. <em>Remedy:</em> estimate resource budgets &mdash; compute hours, "
        "storage, personnel, calendar time &mdash; before finalising."]),

    sub("4.6 Diagnostic Summary", "s4-6"),
    tw(table(["Error family", "Typical symptom", "Most effective remedy"], [
        ["**Scope**", "Problem too broad or too narrow", "Restate with explicit boundary conditions"],
        ["**Conceptual**", "No theory, no literature anchor", "Conduct a systematic literature review"],
        ["**Empirical**", "No data, no instruments", "Pilot data collection early"],
        ["**Motivation**", "Fad-driven, externally imposed",
         "Reframe around genuine intellectual tension"],
        ["**Self-assessment**", "Beyond competence, beneath interest",
         "Calibrate scope to the researcher profile"],
    ])),

    sec(5, "Case Studies", "s5"),
    box("eg", "Case A &mdash; a well-formed problem in network security",
        p("<em>&ldquo;Evaluate the detection latency and false-positive rate of a "
          "transformer-based intrusion detection system against three baselines "
          "(signature-based Snort, random forest, and LSTM) on the CICIDS-2017 dataset, under "
          "class-imbalanced conditions.&rdquo;</em>")
        + ul(["<span class=\"kw\">Clear aim</span> &mdash; the comparison is operationalised "
              "through two metrics.",
              "<span class=\"kw\">Novelty</span> &mdash; applying transformers to a "
              "class-imbalanced IDS task is non-trivial.",
              "<span class=\"kw\">Feasibility</span> &mdash; CICIDS-2017 is public and the "
              "baselines are open-source.",
              "<span class=\"kw\">Testability</span> &mdash; hypotheses are explicit, for "
              "instance <span class=\"mv\">H<sub>0</sub></span>: no significant difference in "
              "detection latency at <span class=\"mv\">&alpha; = 0.05</span>.",
              "<span class=\"kw\">Relevance</span> &mdash; intrusion detection is a perennial "
              "security concern."])),
    box("caution", "Case B &mdash; a poorly formed problem, and its reframing",
        p("<em>&ldquo;Investigate artificial intelligence.&rdquo;</em> This violates nearly "
          "every attribute: no scope, no testable hypothesis, no theoretical anchor, no "
          "feasibility boundary, no measurement. It is not a problem but a topic.")
        + p("<span class=\"kw\">Reframed:</span> &ldquo;Quantify the effect of curriculum "
            "learning on the sample efficiency of vision transformers fine-tuned for medical "
            "image classification under a fixed compute budget of 100 GPU-hours.&rdquo;")),
    box("caution", "Case C &mdash; the hidden feasibility trap",
        p("<em>&ldquo;Train a foundation model for Indian legal text from scratch and benchmark "
          "it against GPT-4.&rdquo;</em> The compute cost of pretraining is incompatible with a "
          "B.Tech or M.Tech budget, and benchmarking against a proprietary model introduces "
          "intellectual-property and reproducibility problems.")
        + p("<span class=\"kw\">Reframed:</span> &ldquo;Fine-tune an open-source 7B-parameter "
            "LLM on a curated Indian legal corpus and evaluate its performance on three "
            "downstream tasks: case summarisation, statutory QA, and judgement "
            "classification.&rdquo; The reframing retains the original motivation while "
            "rendering the study feasible.")),

    sec(6, "Summary", "s6"),
    p("The selection of a research problem is <span class=\"kw\">not an act of inspiration but "
      "an act of disciplined evaluation</span>. A good problem in computer science is "
      "simultaneously clear, novel, theoretically grounded, testable, feasible, ethical, "
      "manageable and significant; the ATTR-FEAS checklist operationalises these into a "
      "reusable diagnostic."),
    p("Equally important is the diagnosis of selection errors, which fall into five families "
      "&mdash; errors of scope, of conceptual grounding, of empirical design, of motivation, "
      "and of self-assessment. Recognising them early converts a doomed study into a salvageable "
      "one through reframing."),
    box("callout", "A closing heuristic",
        p("The best research problem is one that, when stated aloud, a peer in the same "
          "subfield can criticise constructively &mdash; because what can be criticised is what "
          "can be improved, and what can be improved is what can be defended.")),

    sec(7, "Exam Preparation", "s7"),
    box("exam", "Preparation tips",
        ul(["Memorise the <span class=\"kw\">ATTR-FEAS</span> heuristic and be able to apply it "
            "to any given problem statement.",
            "Prepare two contrasting examples &mdash; one well-formed, one poorly formed "
            "&mdash; from your own area of interest.",
            "Be able to <span class=\"kw\">reframe</span> a vague problem into a precise, "
            "testable one; examiners test this skill directly.",
            "Distinguish conceptual from operational errors in problem selection.",
            "Practise writing hypotheses in null and alternative form, with the corresponding "
            "test statistic."])),

    sub("7.1 Short-Answer Questions", "s7-1"),
    qlist(["State and justify any five essential attributes of a good research problem. "
           + marks("5 marks"),
           "Differentiate between an over-broad and an over-narrow research problem, giving one "
           "computing example of each. " + marks("3 marks"),
           "Explain why &ldquo;novelty&rdquo; should not be confused with "
           "&ldquo;complexity&rdquo; in problem selection. " + marks("3 marks"),
           "Why is theoretical grounding important even for an empirically oriented CS thesis? "
           + marks("3 marks")]),

    sub("7.2 Long-Answer and Applied Questions", "s7-2"),
    qlist(["A peer proposes the problem &ldquo;Make cloud computing faster&rdquo;. Diagnose the "
           "errors and rewrite it as a well-formed research problem in distributed systems or "
           "cloud resource management. " + marks("10 marks"),
           "For each attribute in the ATTR-FEAS checklist, give one diagnostic question you "
           "would pose to a student presenting a research proposal. " + marks("8 marks"),
           "A funding agency offers a grant to study &ldquo;AI for healthcare&rdquo; but "
           "specifies completion in 18 months with a single GPU workstation. Discuss the "
           "ethical, feasibility and scope concerns, and propose a defensible formulation. "
           + marks("12 marks")]),

    sub("7.3 Higher-Order Question", "s7-3"),
    box("eg", "Classify the error, then reframe",
        p("For each of the following, classify the primary error &mdash; scope, conceptual, "
          "empirical, motivational or self-assessment &mdash; and propose a one-paragraph "
          "reframing that preserves the underlying motivation:")
        + ul(["&ldquo;Build a chatbot that talks like a human.&rdquo;",
              "&ldquo;Prove P &ne; NP.&rdquo;",
              "&ldquo;Survey all machine-learning algorithms ever published.&rdquo;",
              "&ldquo;Reimplement TensorFlow from scratch in a new language.&rdquo;"])),

    sec(8, "Suggested Further Reading", "s8"),
    ul(["Kothari, C. R., &amp; Garg, G. (2019). <em>Research Methodology: Methods and "
        "Techniques</em> (4th ed.). New Age International.",
        "Creswell, J. W., &amp; Creswell, J. D. (2018). <em>Research Design</em> (5th ed.). SAGE.",
        "Wohlin, C., et al. (2012). <em>Experimentation in Software Engineering</em>. Springer. "
        "&mdash; chapter on defining the experimental goal.",
        "Kitchenham, B. A., &amp; Charters, S. (2007). <em>Guidelines for Performing Systematic "
        "Literature Reviews in Software Engineering</em>. EBSE Technical Report.",
        "Popper, K. (2002). <em>The Logic of Scientific Discovery</em> (reprint). Routledge. "
        "&mdash; for the falsifiability criterion."]),
])
