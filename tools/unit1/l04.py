# -*- coding: utf-8 -*-
"""Unit I - Lecture 4: Scope and Objectives of Research."""
from kit import box, eq, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L04_Scope_and_Objectives_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;"),
             ("CSEG3060_Unit1_L06_Scope_Objectives_Hypotheses.html", "Slides &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 4 Notes — Scope and Objectives of Research",
    "desc": ("Student notes for Unit I Lecture 4 of CSEG3060: the six dimensions of research "
             "scope, delimitations against limitations, the aim-objective-question-hypothesis "
             "hierarchy, the SMART framework, Bloom's cognitive levels for objectives, and the "
             "common errors in defining scope and objectives."),
    "unitno": "Unit I",
    "lecno": "4",
    "lectitle": "Scope and Objectives of Research",
    "subline": ("Bounding the study and writing SMART objectives &middot; 45&ndash;55 minutes "
                "&middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Six dimensions of scope", "Delimitation vs limitation",
               "SMART", "Aim &rarr; hypothesis", "Bloom's levels"],
    "pager": [("CSEG3060_Unit1_L03_Essential_Attributes_and_Errors_Notes.html",
               "&larr; Lecture 3: Essential Attributes and Errors"),
              ("CSEG3060_Unit1_L05_Investigative_Approaches_Notes.html",
               "Lecture 5: Investigative Approaches &rarr;")],
    "deck": "CSEG3060_Unit1_L06_Scope_Objectives_Hypotheses.html",
    "decklabel": "Lecture 4 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Utilise various investigative approaches and methodologies for problem-solving in "
          "computing science research.")
        + p("Lectures 1&ndash;3 covered identifying and validating a research problem. Once "
            "validated, the next intellectual task is to translate it into a clearly bounded "
            "<span class=\"kw\">scope</span> and a set of well-articulated "
            "<span class=\"kw\">objectives</span>. Without these, even a brilliant problem "
            "statement cannot be operationalised into a tractable study.")),

    box("exam", "How to use these notes",
        p("Three items here are examined repeatedly: the <span class=\"kw\">six dimensions of "
          "scope</span> (Section 3.1), the <span class=\"kw\">delimitation versus "
          "limitation</span> distinction (Section 3.3), and the ability to rewrite a woolly "
          "objective in <span class=\"kw\">SMART</span> form (Section 4.2).")
        + p("Be ready to construct the full <span class=\"kw\">Aim &rarr; Objective &rarr; "
            "Research Question &rarr; Hypothesis</span> chain for an unseen problem in about "
            "ten minutes. That is a standard descriptive question.")),

    sec(1, "Learning Objectives", "s1"),
    ul(["Distinguish clearly between the scope of a study and its objectives.",
        "Apply established frameworks such as SMART to formulate research objectives.",
        "Recognise delimitations and limitations in a computing research context.",
        "Critically evaluate a research proposal for the quality of its scope and objectives.",
        "Convert a high-level research problem into bounded, achievable objectives."]),

    sec(2, "Key Concepts at a Glance", "s2"),
    tw(table(["Concept", "Working definition"], [
        ["**Research scope**", "The boundaries of a study &mdash; what will and will not be covered"],
        ["**Research aim (goal)**", "The broad, long-term intention of the research"],
        ["**Research objective**",
         "A specific, measurable, achievable outcome that contributes to the aim"],
        ["**Research question**", "A precise interrogative form of an objective"],
        ["**Hypothesis**",
         "A testable proposition that operationalises an objective in deductive research"],
        ["**Delimitation**", "An intentional boundary imposed by the researcher"],
        ["**Limitation**", "A constraint imposed externally, by data, time or resources"],
        ["**Operationalisation**",
         "Converting a conceptual objective into measurable indicators"],
    ])),
    p("These are <em>not</em> synonyms. Conflating them is a frequent origin of methodological "
      "weakness."),

    sec(3, "Defining the Scope", "s3"),
    sub("3.1 The Six Dimensions of Scope", "s3-1"),
    p("Scope is the perimeter inside which the entire inquiry is conducted. It answers: "
      "<em>what exactly am I studying, where, when, on whom or on what, and under what "
      "conditions?</em> In synopses, proposals and theses it is expressed through six "
      "dimensions:"),
    ol(["<span class=\"kw\">Domain or subject boundary</span> &mdash; the subdomain of "
        "computer science: natural language processing, network security, human-computer "
        "interaction, distributed systems.",
        "<span class=\"kw\">Theoretical boundary</span> &mdash; the theories, models or "
        "frameworks consulted: information retrieval theory, game theory, complexity theory.",
        "<span class=\"kw\">Population or sampling boundary</span> &mdash; the datasets, users, "
        "software artefacts, hardware platforms or system events examined.",
        "<span class=\"kw\">Geographical boundary</span> &mdash; the geographic or "
        "institutional context, for instance an IoT deployment in a single smart-campus "
        "testbed.",
        "<span class=\"kw\">Temporal boundary</span> &mdash; the time horizon, for instance "
        "traffic logs collected between January and June 2024.",
        "<span class=\"kw\">Methodological boundary</span> &mdash; the methods permitted, for "
        "instance only empirical benchmarks and no theoretical proofs."]),

    sub("3.2 The Funnel of Specificity", "s3-2"),
    eq("Research domain &rarr; Research area &rarr; Research topic &rarr; Research problem "
       "&rarr; Research scope &rarr; Objectives", "the funnel"),
    p("Each level narrows the inquiry. Scope is the next-to-last level; objectives are the "
      "smallest and most concrete formulations."),

    sub("3.3 Delimitations versus Limitations", "s3-3"),
    box("def", "The distinction that signals rigour",
        p("A <span class=\"kw\">delimitation</span> is a boundary deliberately chosen by the "
          "researcher, often because exploring everything is impossible. "
          "&ldquo;The study considers only supervised classifiers; unsupervised and "
          "semi-supervised methods are excluded.&rdquo; &ldquo;The proposed algorithm is "
          "benchmarked on English-language corpora only.&rdquo;")
        + p("A <span class=\"kw\">limitation</span> is a boundary imposed externally. "
            "&ldquo;The available GPU compute &mdash; a single A100 &mdash; restricts model "
            "size.&rdquo; &ldquo;Access to only one medical institution restricts patient "
            "diversity in the dataset.&rdquo;")
        + p("<strong>Delimitations are choices; limitations are constraints.</strong> Both must "
            "be acknowledged, but only delimitations are arguable.")),

    sub("3.4 Common Errors When Defining Scope", "s3-4"),
    ul(["<span class=\"kw\">Scope creep</span> &mdash; gradual, uncontrolled expansion after "
        "the study has begun. In software engineering research this typically appears as "
        "adding new modules, datasets or comparison systems midway.",
        "<span class=\"kw\">Over-scoping</span> &mdash; attempting to address too many "
        "sub-problems at once.",
        "<span class=\"kw\">Under-scoping</span> &mdash; carving out a niche so narrow that the "
        "result has no generalisable or publishable contribution.",
        "<span class=\"kw\">Implicit scope</span> &mdash; leaving boundaries unstated, so the "
        "reader must infer them."]),

    sec(4, "Defining the Objectives", "s4"),
    sub("4.1 The Hierarchy: Aim, Objectives, Tasks", "s4-1"),
    p("Aim and objectives should not be stated as the same sentence at the same level of "
      "abstraction. The aim is essentially <em>non-testable</em>; each objective is "
      "<em>independently testable</em>."),
    tw(table(["Level", "Example in a computing context"], [
        ["**Aim**", "To improve the robustness of deep learning models against adversarial "
         "perturbations in image classification"],
        ["**Objective 1**", "To design a novel adversarial training algorithm that reduces "
         "attack success rate by at least 15% on benchmark datasets"],
        ["**Objective 2**", "To evaluate the trade-off between clean accuracy and adversarial "
         "robustness using standardised metrics such as robust accuracy"],
        ["**Objective 3**", "To validate the proposed method across at least three "
         "representative attacks (FGSM, PGD, C&amp;W)"],
        ["**Objective 4**", "To compare the proposed method against three state-of-the-art "
         "baselines under identical experimental conditions"],
    ])),

    sub("4.2 The SMART Framework", "s4-2"),
    eq("Objective = Specific &cap; Measurable &cap; Achievable &cap; Relevant &cap; Time-bound",
       "SMART (Doran, 1981)"),
    ul(["<span class=\"kw\">Specific</span> &mdash; the objective identifies what will be done, "
        "to what, in which context.",
        "<span class=\"kw\">Measurable</span> &mdash; a metric or criterion exists by which "
        "success can be judged. In computing this usually means accuracy, F1-score, AUC, "
        "latency in milliseconds, throughput in requests per second, energy in joules, or a "
        "qualitative rubric.",
        "<span class=\"kw\">Achievable</span> &mdash; feasible given available datasets, "
        "compute, time and expertise.",
        "<span class=\"kw\">Relevant</span> &mdash; aligned with the stated aim and "
        "contributing to the field.",
        "<span class=\"kw\">Time-bound</span> &mdash; schedulable within the research window, "
        "often 6, 12 or 24 months."]),

    sub("4.3 Types of Objectives", "s4-3"),
    p("<span class=\"kw\">By generality:</span> <em>general</em> or primary objectives state "
      "the umbrella intent, usually in one statement; <em>specific</em> or secondary objectives "
      "are the operational breakdowns that collectively satisfy it."),
    p("<span class=\"kw\">By cognitive intent</span>, drawing on Bloom's revised taxonomy. "
      "<strong>The cognitive level of an objective must match its actual deliverable</strong>:"),
    tw(table(["Cognitive level", "Verb examples", "Typical CS deliverable"], [
        ["Remember", "identify, list, recall", "Taxonomy of attacks"],
        ["Understand", "describe, summarise", "Literature synthesis"],
        ["Apply", "implement, deploy", "Prototype system"],
        ["Analyse", "compare, examine", "Benchmark study"],
        ["Evaluate", "assess, justify", "Comparative empirical study"],
        ["Create", "design, develop, propose", "Novel algorithm or architecture"],
    ])),
    p("A frequent methodological fault is to state an objective at the <em>Create</em> level "
      "but to conduct only an <em>Analyse</em>-level study."),

    sub("4.4 Objectives, Research Questions and Hypotheses", "s4-4"),
    p("In qualitative and mixed-methods research, each objective is often rephrased as a "
      "research question."),
    box("eg", "Objective to research question",
        p("<span class=\"kw\">Objective:</span> to evaluate the latency impact of edge "
          "offloading in mobile cloud computing.")
        + p("<span class=\"kw\">Research question:</span> what is the effect of edge offloading "
            "on request&ndash;response latency under varying network conditions?")),
    p("In quantitative, positivist research each question is often rephrased as a falsifiable "
      "hypothesis:"),
    eq("H<sub>1</sub> : &mu;<sub>offload</sub> &lt; &mu;<sub>local-execution</sub>",
       "where &mu; is mean response latency"),
    eq("Aim &rarr; Objective &rarr; Research Question &rarr; Hypothesis", "the conceptual chain"),
    p("Not every computing study uses hypotheses: design science and exploratory research often "
      "bypass the hypothesis form and proceed directly from objectives to artefacts."),

    sec(5, "How Scope and Objectives Constrain Each Other", "s5"),
    p("Scope and objectives are not redundant; they are <span class=\"kw\">mutually "
      "constraining</span>. A scope that is too wide makes the objectives unfalsifiable; "
      "objectives that are over-ambitious force the scope to expand beyond feasibility. A "
      "well-formulated study requires the scope to be just wide enough to make the objectives "
      "meaningful, and the objectives just narrow enough to fit the scope."),
    box("exam", "The Objectives-in-Scope test",
        p("For each objective, ask: <em>is there a documented, available and ethical way to "
          "gather the data required to satisfy this objective within the stated scope?</em>")
        + p("If the answer is no for any objective, either the scope or the objective must be "
            "revised.")),

    sec(6, "Worked Examples", "s6"),
    box("eg", "Example A &mdash; reformulating a vague problem",
        p("<span class=\"kw\">Initial, poorly formed:</span> &ldquo;AI is very useful. We want "
          "to use AI for healthcare.&rdquo;")
        + p("<span class=\"kw\">Defined scope:</span> &ldquo;This study focuses on deep "
            "learning models for chest X-ray classification, restricted to publicly available "
            "datasets (CheXpert and NIH ChestX-ray14), evaluated using AUROC and clinical "
            "sensitivity, on a single institutional GPU cluster, between the academic year "
            "2024&ndash;2025.&rdquo;")
        + p("<span class=\"kw\">Defined objectives:</span>")
        + ol(["To curate and standardise two benchmark chest X-ray datasets for binary "
              "pneumonia detection.",
              "To design a transfer-learning pipeline based on a pre-trained convolutional "
              "backbone.",
              "To evaluate the model using five-fold cross-validation against two "
              "state-of-the-art baselines.",
              "To interpret model decisions using Grad-CAM visualisations."])
        + p("Each objective is SMART, internally consistent, and bounded by the stated scope.")),
    box("eg", "Example B &mdash; a network security problem",
        p("<span class=\"kw\">Problem:</span> insider threats remain a leading cause of data "
          "breaches in enterprises.")
        + p("<span class=\"kw\">Scope:</span> user behavioural logs from a single enterprise "
            "testbed; a six-month observation window; three observable channels (file access, "
            "email, login patterns); detection restricted to offline batch processing, not "
            "real-time streaming.")
        + p("<span class=\"kw\">Objectives:</span>")
        + ol(["To engineer a multi-view feature representation combining file-system, email "
              "and authentication logs.",
              "To train and tune an ensemble anomaly detector based on isolation forests and "
              "recurrent neural networks.",
              "To evaluate detection using precision, recall and F1 against a labelled "
              "ground-truth set.",
              "To estimate the operational cost, in false alarms per analyst-shift, of the "
              "proposed system."])
        + eq("H<sub>1</sub> : false alarms per shift &lt; 3", "hypothesis for objective 4")),
    box("eg", "Case study &mdash; Android malware detection",
        p("A scan of the published literature on Android malware detection reveals a consistent "
          "pattern. Studies that clearly delimit themselves to a specific feature family "
          "&mdash; API-call sequences, or permissions &mdash; and a specific detection paradigm "
          "&mdash; static analysis only &mdash; consistently produce reproducible results. "
          "Studies that attempt to &ldquo;cover all features and all detection methods&rdquo; "
          "tend to underperform on any single benchmark, suffering from over-scoping.")
        + p("<span class=\"kw\">Lesson:</span> defining scope narrowly is often the path to "
            "stronger empirical evidence. This is counterintuitive but reliable.")),

    sub("6.1 Well-Defined versus Poorly-Defined Objectives", "s6-1"),
    tw(table(["Aspect", "Poorly-defined objective", "Well-defined objective"], [
        ["Specificity", "&ldquo;To study deep learning.&rdquo;",
         "&ldquo;To fine-tune BERT variants for sentiment classification on three "
         "product-review datasets.&rdquo;"],
        ["Measurability", "&ldquo;To improve performance.&rdquo;",
         "&ldquo;To achieve a macro-F1 improvement of at least 3 percentage points over the "
         "baseline.&rdquo;"],
        ["Achievability", "&ldquo;To solve general AI.&rdquo;",
         "&ldquo;To reduce inference latency by 20% via INT8 quantisation on the same "
         "hardware.&rdquo;"],
        ["Relevance", "&ldquo;To use big data.&rdquo;",
         "&ldquo;To mitigate class imbalance in real-time network intrusion detection.&rdquo;"],
        ["Time-bound", "Implicit.", "&ldquo;Within an 8-month implementation window.&rdquo;"],
    ])),

    sec(7, "Common Errors When Defining Objectives", "s7"),
    ol(["<span class=\"kw\">Conflating activities with outcomes.</span> &ldquo;To perform a "
        "literature survey&rdquo; is an activity; &ldquo;to identify the three most influential "
        "research gaps in federated learning&rdquo; is an outcome. Objectives must be outcomes.",
        "<span class=\"kw\">Multiple objectives in a single sentence.</span> Compound "
        "objectives obscure which deliverable serves which evaluation. Split them.",
        "<span class=\"kw\">Objectives that exceed the scope.</span> An objective requiring "
        "proprietary medical records when the scope restricts the study to public datasets is "
        "unachievable.",
        "<span class=\"kw\">Objectives that are not testable.</span> &ldquo;To deeply "
        "understand interpretability&rdquo; cannot be measured and is therefore not a research "
        "objective in the strict sense.",
        "<span class=\"kw\">Objectives that contradict the stated aim.</span> An aim of "
        "improving efficiency paired with an objective of improving accuracy, without "
        "acknowledging the trade-off, signals weak integration.",
        "<span class=\"kw\">Neglecting the time dimension.</span> Without a schedule anchor, "
        "objectives become aspirations rather than commitments."]),

    sec(8, "Summary", "s8"),
    ul(["<span class=\"kw\">Scope</span> establishes the boundaries of the study &mdash; "
        "domain, theory, population, geography, time and methodology. Delimitations are chosen; "
        "limitations are imposed.",
        "<span class=\"kw\">Objectives</span> are the measurable outcomes through which the aim "
        "is realised. They should follow SMART and align with a clear cognitive level.",
        "A sound design requires <span class=\"kw\">mutual consistency</span> between scope and "
        "objectives: each objective must be satisfiable within the declared boundaries.",
        "In computing research, where artefacts &mdash; algorithms, systems, datasets &mdash; "
        "often constitute the contribution, objectives typically lead to one or more artefacts, "
        "each with an evaluation plan.",
        "Writing tight scope statements and SMART objectives is itself a strong indicator of "
        "research quality, and among the first things examiners and reviewers assess."]),
    p("Defining scope and objectives is therefore not a bureaucratic preliminary. It is "
      "<span class=\"kw\">the act that converts intellectual curiosity into executable "
      "research</span>."),

    sec(9, "Exam Preparation", "s9"),
    box("exam", "Preparation tips",
        ul(["<span class=\"kw\">Memorise the dimensions of scope.</span> Examiners ask students "
            "to enumerate them from memory.",
            "<span class=\"kw\">Be fluent with SMART.</span> Convert poorly formed objectives "
            "into SMART form during revision; this builds speed.",
            "<span class=\"kw\">Practise the Aim &rarr; Objective &rarr; RQ &rarr; Hypothesis "
            "chain.</span> Be ready to construct it for any given problem in ten minutes.",
            "<span class=\"kw\">Distinguish delimitations from limitations</span> &mdash; a "
            "recurring one- and two-mark question.",
            "<span class=\"kw\">Know Bloom's verbs.</span> Pair each CS artefact &mdash; model, "
            "benchmark, framework &mdash; with its appropriate cognitive level."])),

    sub("9.1 Short-Answer Questions", "s9-1"),
    qlist(["Differentiate between delimitation and limitation in a computing research context. "
           "Provide one example of each from a study on cloud security. " + marks("3 marks"),
           "List the five elements of the SMART framework and rewrite the following objective "
           "in SMART form: &ldquo;To study machine learning algorithms.&rdquo; " + marks("3 marks"),
           "Why must the cognitive level of an objective match the actual deliverable of the "
           "study? Illustrate with a computing example. " + marks("3 marks")]),

    sub("9.2 Descriptive Questions", "s9-2"),
    qlist(["Take the following research problem and, in approximately 200 words, define the "
           "scope and write three SMART objectives: &ldquo;Online learning platforms face "
           "challenges in student dropout prediction.&rdquo; " + marks("10 marks"),
           "Discuss with examples the common errors researchers make while defining research "
           "scope. How does scope creep manifest in software-engineering research projects? "
           + marks("8 marks"),
           "Convert the following aim into a hierarchical structure &mdash; one aim, four "
           "specific objectives, corresponding research questions, and two hypotheses where "
           "applicable: &ldquo;To improve the privacy of federated learning systems.&rdquo; "
           + marks("10 marks")]),

    sub("9.3 Higher-Order Question", "s9-3"),
    box("eg", "Critique exercise",
        p("A student submits the following objective in a research proposal: &ldquo;To study "
          "various deep learning models comprehensively for image classification to see which "
          "is best.&rdquo;")
        + p("Identify at least five methodological weaknesses in this objective. Rewrite it "
            "into three well-formed SMART objectives consistent with a defined scope in image "
            "classification research. " + marks("15 marks"))),
])
