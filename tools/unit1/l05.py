# -*- coding: utf-8 -*-
"""Unit I - Lecture 5: Investigative Approaches for Solutions."""
from kit import box, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L05_Investigative_Approaches_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 5 Notes — Investigative Approaches for Solutions",
    "desc": ("Student notes for Unit I Lecture 5 of CSEG3060: the eight investigative "
             "approaches used in computing research — experimental, analytical, simulation, "
             "survey, case study, design science, comparative and mixed-methods — the decision "
             "rubric for choosing between them, instrumentation, and common selection errors."),
    "unitno": "Unit I",
    "lecno": "5",
    "lectitle": "Investigative Approaches for Solutions",
    "subline": ("Eight approaches, the decision rubric, and instrumentation &middot; 60 minutes "
                "(two-segment delivery) &middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Experimental", "Analytical", "Simulation", "Case study",
               "Design science", "Mixed methods"],
    "pager": [("CSEG3060_Unit1_L04_Scope_and_Objectives_Notes.html",
               "&larr; Lecture 4: Scope and Objectives"),
              ("CSEG3060_Unit1_L06_Data_Collection_and_Analysis_Notes.html",
               "Lecture 6: Data Collection and Analysis &rarr;")],
    "deck": "index.html",
    "decklabel": "Unit I contents",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Utilise various investigative approaches and methodologies for problem-solving in "
          "computing science research.")
        + p("A research problem, once defined and bounded, <span class=\"kw\">remains an "
            "abstraction until a systematic method is identified to investigate possible "
            "solutions</span>. The investigative approach is the bridge between the formulated "
            "problem and the operationalised study that follows.")),

    box("exam", "How to use these notes",
        p("Computer science is simultaneously <span class=\"kw\">empirical</span> (artefacts "
          "must be measured), <span class=\"kw\">constructive</span> (new systems are built, "
          "not merely observed) and <span class=\"kw\">formal</span> (many claims demand "
          "deductive proof). Because of this triadic nature there is "
          "<em>no single best approach</em>.")
        + p("The examinable skill is therefore not recall but justification. Do not ask "
            "&ldquo;which approach is best?&rdquo; but &ldquo;which approach is justified for "
            "<em>this</em> problem, given <em>these</em> constraints, to support <em>these</em> "
            "claims?&rdquo; Section 3 gives the rubric that answers it.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["Distinguish clearly between <em>identifying</em> a research problem and "
        "<em>investigating</em> solutions to it.",
        "Enumerate the principal investigative approaches adopted in computer science research.",
        "Match a given research problem to an appropriate approach using decision criteria such "
        "as the nature of evidence required, feasibility and validity.",
        "Recognise how each approach shapes data collection, instrumentation and analysis "
        "choices.",
        "Critically evaluate the strengths and limitations of each approach in the context of "
        "computing artefacts.",
        "Justify, in writing, the selection of an investigative approach for a sample problem."]),

    sec(2, "Key Terminology", "s2"),
    tw(table(["Term", "Definition"], [
        ["**Investigative approach**",
         "The overall strategy used to gather and analyse evidence about a proposed solution"],
        ["**Methodology**",
         "The broader theoretical framework informing the choice of approach &mdash; the logic "
         "behind the strategy"],
        ["**Method**",
         "The specific technique (survey, controlled experiment) used to operationalise the "
         "approach"],
        ["**Construct**",
         "An artefact, model, hypothesis or theoretical statement the research seeks to "
         "evaluate or improve"],
        ["**Validity**",
         "The degree to which the evidence supports the claims made &mdash; internal, external, "
         "construct, conclusion"],
        ["**Reliability**",
         "The consistency of evidence across repetitions, observers or instruments"],
        ["**Instrumentation**", "The apparatus, software or measurement scheme used to capture data"],
        ["**Iteration**",
         "A cyclical refinement process in which each investigative pass informs the next"],
    ])),
    box("caution", "Approach is not method",
        p("Running a questionnaire is a <em>method</em>, not an approach. The approach decides "
          "<em>what kind of evidence is sought</em>; the method is how that evidence is "
          "collected. Many rubric points hinge on using these terms precisely.")),

    sec(3, "The Eight Investigative Approaches", "s3"),
    p("These are not mutually exclusive &mdash; contemporary CS research commonly combines them "
      "as mixed-methods investigations. Nonetheless every design privileges one or two as the "
      "primary engine of evidence."),

    sub("3.1 Experimental Investigation", "s3-1"),
    p("<span class=\"kw\">Definition.</span> Manipulates one or more independent variables, "
      "controls extraneous factors, and measures the effect on dependent variables using "
      "quantitative metrics. This is the dominant approach for evaluating algorithms, systems "
      "and software products under controlled conditions."),
    ol(["<span class=\"kw\">Hypothesis statement</span> &mdash; "
        "<span class=\"mv\">H<sub>0</sub></span>: no difference; "
        "<span class=\"mv\">H<sub>1</sub></span>: a statistically significant difference exists.",
        "<span class=\"kw\">Variable identification</span> &mdash; independent (algorithm "
        "variant), dependent (runtime), controlled (hardware, dataset).",
        "<span class=\"kw\">Experimental design</span> &mdash; randomised block, factorial, "
        "Latin square or repeated-measures.",
        "<span class=\"kw\">Measurement</span> &mdash; calibrated instruments: profilers, "
        "hardware counters, benchmark suites.",
        "<span class=\"kw\">Statistical analysis</span> &mdash; t-test, ANOVA or non-parametric "
        "equivalents, reporting <em>effect size and confidence intervals, not just "
        "p-values</em>."]),
    box("eg", "Example",
        p("Comparing the energy efficiency of three memory allocators in a containerised "
          "workload. Independent variable: the allocator. Dependent variable: joules per "
          "transaction. Controlled: CPU frequency, OS, workload trace.")
        + p("<span class=\"kw\">Strengths:</span> high internal validity, replicable, precise "
            "quantitative claims. <span class=\"kw\">Limitations:</span> artificial "
            "simplification; threats to ecological validity when the lab diverges from "
            "production; expensive instrumentation.")),

    sub("3.2 Analytical / Theoretical Investigation", "s3-2"),
    p("<span class=\"kw\">Definition.</span> Relies on logical and mathematical reasoning to "
      "derive properties of constructs without empirical measurement, producing proofs, "
      "complexity bounds or formal specifications. It fits algorithm analysis, formal "
      "verification, cryptography, complexity theory and theoretical machine learning."),
    ol(["<span class=\"kw\">Statement of claim</span> &mdash; a theorem, conjecture or formal "
        "property.",
        "<span class=\"kw\">Assumption set</span> &mdash; the pre-conditions under which the "
        "claim holds.",
        "<span class=\"kw\">Reasoning apparatus</span> &mdash; lemmas, proofs by induction, "
        "contradiction or construction.",
        "<span class=\"kw\">Bound derivation</span> &mdash; worst-case, average-case or "
        "amortised complexity, expressed asymptotically.",
        "<span class=\"kw\">Counter-example or proof</span> &mdash; either disproves the claim "
        "or establishes it."]),
    p("<span class=\"kw\">Example:</span> proving that a proposed cache replacement policy is "
      "starvation-free using an invariant-based argument over the request queue. "
      "<span class=\"kw\">Strengths:</span> definitive within the assumption set, immune to "
      "measurement noise, foundational. <span class=\"kw\">Limitations:</span> results may not "
      "predict real-world performance, and the formal model may not reflect reality."),

    sub("3.3 Simulation-Based Investigation", "s3-3"),
    p("<span class=\"kw\">Definition.</span> Builds a computational model of a system and runs "
      "experiments on the model when the real system is inaccessible, unsafe or too costly to "
      "operate at scale. It fits network protocol evaluation, distributed systems, large-scale "
      "ML pipelines, urban computing and epidemic modelling on graphs."),
    ol(["<span class=\"kw\">Model formulation</span> &mdash; identify entities, attributes and "
        "behaviours.",
        "<span class=\"kw\">Calibration</span> &mdash; tune parameters against historical or "
        "pilot data.",
        "<span class=\"kw\">Validation</span> &mdash; confirm the simulator's output matches "
        "reference behaviour (face validity, predictive validity).",
        "<span class=\"kw\">Scenario execution</span> &mdash; run synthetic scenarios varying "
        "key parameters.",
        "<span class=\"kw\">Sensitivity analysis</span> &mdash; examine how output changes "
        "under input perturbation."]),
    p("<span class=\"kw\">Example:</span> using a discrete-event simulator such as ns-3 to "
      "evaluate congestion-control behaviour across 10,000 simulated TCP flows, infeasible on a "
      "physical testbed. <span class=\"kw\">Strengths:</span> scalable, repeatable, safe for "
      "edge cases. <span class=\"kw\">Limitations:</span> garbage in, garbage out &mdash; "
      "fidelity is bounded by the model, and there is publication bias toward optimistic "
      "results."),

    sub("3.4 Survey Investigation", "s3-4"),
    p("<span class=\"kw\">Definition.</span> Cross-sectionally captures the attitudes, "
      "practices or self-reported behaviours of a population sample, typically through "
      "questionnaires or interviews. It fits software engineering practice, developer "
      "experience, cybersecurity awareness and paradigm adoption."),
    ol(["<span class=\"kw\">Population and sampling</span> &mdash; define the target "
        "population; choose probability or non-probability sampling.",
        "<span class=\"kw\">Instrument design</span> &mdash; question construction, pilot "
        "testing and validation; Cronbach's alpha of "
        "<span class=\"mv\">&alpha; &ge; 0.7</span> is typically regarded as acceptable.",
        "<span class=\"kw\">Data collection</span> &mdash; online, telephone or in-person "
        "distribution.",
        "<span class=\"kw\">Analysis</span> &mdash; descriptive statistics, factor analysis, "
        "regression, or thematic coding for open-ended items.",
        "<span class=\"kw\">Reporting</span> &mdash; response rate, confidence intervals and "
        "discussion of non-response bias."]),
    p("<span class=\"kw\">Example:</span> a study of how Indian IT firms adopted DevOps "
      "practices between 2018 and 2024, surveying 250 project managers. "
      "<span class=\"kw\">Strengths:</span> captures breadth; useful for phenomena not directly "
      "observable. <span class=\"kw\">Limitations:</span> self-report bias, and the "
      "cross-sectional nature rules out strong causal claims."),

    sub("3.5 Case Study Investigation", "s3-5"),
    p("<span class=\"kw\">Definition.</span> Investigates a contemporary phenomenon in its "
      "real-world context, relying on multiple sources of evidence, when the boundaries between "
      "phenomenon and context are unclear. It fits industry pilots, large-scale deployment "
      "studies and post-mortem analyses of system failures. Following Yin's protocol:"),
    ol(["<span class=\"kw\">Case definition</span> &mdash; single holistic, single embedded, "
        "multiple holistic or multiple embedded.",
        "<span class=\"kw\">Case selection</span> &mdash; literal, theoretical or extreme-case "
        "replication logic.",
        "<span class=\"kw\">Data triangulation</span> among interviews, documents, direct "
        "observation and physical artefacts.",
        "<span class=\"kw\">Pattern matching</span> between empirical findings and theoretical "
        "propositions.",
        "<span class=\"kw\">Case report</span> with thick description."]),
    p("<span class=\"kw\">Example:</span> investigating the failure of a multi-region cloud "
      "deployment by interviewing SREs, reviewing incident logs and reproducing the failure in "
      "a sandbox. <span class=\"kw\">Strengths:</span> ecological validity, preserves context, "
      "supports theory-building from data. <span class=\"kw\">Limitations:</span> limited "
      "generalisability, researcher subjectivity, difficulty of replication."),

    sub("3.6 Design Science (Constructive) Investigation", "s3-6"),
    p("<span class=\"kw\">Definition.</span> Design science research creates and evaluates "
      "innovative IT artefacts intended to solve identified problems; the artefact may be a "
      "construct, model, method or instantiation. It fits HCI prototyping, novel algorithm "
      "design, new language features and system architectures."),
    p("The canonical cycle is <span class=\"kw\">build &rarr; evaluate &rarr; reflect &rarr; "
      "iterate</span>: construct an artefact, observe its utility in a realistic setting, "
      "refine it, and repeat. This maps onto the Hevner&ndash;Chatterjee framework of three "
      "cycles &mdash; the <em>relevance</em> cycle (problem), the <em>rigour</em> cycle (theory "
      "base) and the <em>design</em> cycle (build&ndash;evaluate)."),
    p("<span class=\"kw\">Example:</span> designing a privacy-preserving federated learning "
      "aggregator, instantiating it as a prototype, and demonstrating utility on three "
      "benchmark datasets. <span class=\"kw\">Strengths:</span> concrete contribution, "
      "immediate applicability. <span class=\"kw\">Limitations:</span> requires both "
      "engineering and evaluation rigour, with a risk of conflating innovation with validation."),

    sub("3.7 Comparative / Benchmarking Investigation", "s3-7"),
    p("<span class=\"kw\">Definition.</span> Positions a new solution against established "
      "baselines on shared workloads and metrics to demonstrate relative merit. It fits ML "
      "model evaluation, database engine comparison and framework-versus-framework studies."),
    ol(["<span class=\"kw\">Selection of baselines</span> &mdash; state-of-the-art and credible "
        "baselines, <em>not strawmen</em>.",
        "<span class=\"kw\">Standardised workloads</span> &mdash; public datasets with "
        "documented characteristics.",
        "<span class=\"kw\">Common evaluation protocol</span> &mdash; identical hardware "
        "budget, identical preprocessing.",
        "<span class=\"kw\">Multiple metrics</span> &mdash; beyond accuracy alone: latency, "
        "fairness, energy.",
        "<span class=\"kw\">Statistical rigour</span> &mdash; multiple seeds, paired tests, "
        "reported variance."]),
    p("<span class=\"kw\">Limitations:</span> risk of <em>benchmark overfitting</em> and metric "
      "gaming."),

    sub("3.8 Mixed-Methods Investigation", "s3-8"),
    p("<span class=\"kw\">Definition.</span> Strategically combines qualitative and quantitative "
      "strands so the strengths of one offset the weaknesses of the other. Increasingly the norm "
      "for industry&ndash;academic collaborations. Creswell and Plano Clark identify four major "
      "designs:"),
    ul(["<span class=\"kw\">Convergent parallel</span> &mdash; both strands run independently, "
        "then merge.",
        "<span class=\"kw\">Explanatory sequential</span> &mdash; quantitative first, "
        "qualitative deepens the findings.",
        "<span class=\"kw\">Exploratory sequential</span> &mdash; qualitative first, "
        "quantitative generalises.",
        "<span class=\"kw\">Embedded / nested</span> &mdash; one strand plays a supportive role "
        "inside the other."]),
    p("<span class=\"kw\">Example:</span> quantitatively benchmarking a new IDE refactoring "
      "plugin, followed by qualitative interviews with five developers to interpret usage "
      "patterns. <span class=\"kw\">Strengths:</span> triangulation, richer findings. "
      "<span class=\"kw\">Limitations:</span> demands dual competence and longer timelines."),

    sec(4, "Choosing an Approach", "s4"),
    box("exam", "Decision rubric",
        tw(table(["Criterion", "Experimental", "Analytical", "Simulation", "Survey",
                  "Case study", "DSR"], [
            ["Is the real system available?", "Yes", "n/a", "No / expensive", "n/a",
             "Yes, in situ", "Prototype only"],
            ["Is a causal claim required?", "Strongly yes", "Modelled via proof",
             "Modelled in abstract", "No", "No (rich description)", "Limited"],
            ["Is the construct novel?", "Optional", "Optional", "Optional", "n/a", "n/a", "Yes"],
            ["Is the population broad?", "Small sample", "n/a", "n/a", "Large",
             "One unit or few", "n/a"],
            ["Is generalisability a goal?", "Yes (statistical)", "High within model",
             "Conditional on fidelity", "Statistical", "Analytical generalisation",
             "Domain-general transfer"],
        ]))),
    p("Additional pragmatic filters:"),
    ul(["<span class=\"kw\">Resource envelope</span> &mdash; compute budget, time, human "
        "participants.",
        "<span class=\"kw\">Skill mix</span> &mdash; statistical literacy, proof-writing "
        "capability, fieldwork access.",
        "<span class=\"kw\">Ethical clearance</span> &mdash; human-subject protocols, data "
        "privacy.",
        "<span class=\"kw\">Publication venue norms</span> &mdash; theory venues favour "
        "analytical work; systems venues favour experimental and design-science work; software "
        "engineering venues favour case studies and surveys."]),

    sec(5, "Instrumentation Across Approaches", "s5"),
    p("Instrumentation is the operational expression of measurement, and it is tightly coupled "
      "to the approach."),
    tw(table(["Approach", "Typical instrumentation"], [
        ["**Experimental**", "Profilers (perf, VTune), hardware performance counters, automated "
         "test harnesses, benchmark suites (SPEC CPU, MLPerf)"],
        ["**Analytical**", "Pen and paper, or proof assistants (Coq, Isabelle, Lean); "
         "complexity analysers"],
        ["**Simulation**", "Simulators (ns-3, OMNeT++, SUMO), random workload generators"],
        ["**Survey**", "Online survey platforms (Qualtrics, LimeSurvey), validated psychometric "
         "instruments"],
        ["**Case study**", "Interview protocols, archival templates, logging infrastructure"],
        ["**Design science**", "Version-controlled prototype repositories, automated CI "
         "pipelines, evaluation harnesses"],
        ["**Comparative**", "Reproducibility scripts, Docker containers, compute-tracking sheets"],
        ["**Mixed-methods**", "Survey platform, interview transcription, statistical package, "
         "qualitative coding software (NVivo, ATLAS.ti)"],
    ])),
    box("caution", "Calibration is mandatory",
        p("An uncalibrated clock, an unvalidated rubric or an unseeded random number generator "
          "degrades evidence quality <em>irrespective of the approach chosen</em>.")),

    sec(6, "Worked Examples", "s6"),
    box("eg", "Example A &mdash; algorithm research",
        p("<span class=\"kw\">Problem:</span> is a proposed in-memory join algorithm faster than "
          "the radix-join baseline across varied cardinality distributions?")
        + p("<span class=\"kw\">Approach:</span> experimental, with embedded analytical "
            "reasoning (asymptotic bounds) and comparative benchmarking. "
            "<span class=\"kw\">Instrumentation:</span> Pin or Intel VTune for cycle counts; "
            "Docker containers for reproducibility. <span class=\"kw\">Analysis:</span> Welch's "
            "t-test for unequal variances; effect size via Cohen's <span class=\"mv\">d</span>; "
            "family-wise error controlled with Holm&ndash;Bonferroni.")),
    box("eg", "Example B &mdash; usable security research",
        p("<span class=\"kw\">Problem:</span> do developers detect insecure code snippets faster "
          "using a static-analysis warning redesigned with cognitive load principles?")
        + p("<span class=\"kw\">Approach:</span> mixed-methods &mdash; a between-subjects "
            "experiment followed by think-aloud interviews. "
            "<span class=\"kw\">Instrumentation:</span> eye-tracker, screen recorder, "
            "code-review task suite, interview protocol and coding scheme. "
            "<span class=\"kw\">Analysis:</span> ANOVA on time-to-detection; thematic analysis "
            "of transcripts to explain the observed patterns.")),
    box("eg", "Example C &mdash; distributed systems research",
        p("<span class=\"kw\">Problem:</span> can a leaderless consensus protocol guarantee "
          "liveness under bounded latency partitions?")
        + p("<span class=\"kw\">Approach:</span> analytical proof of liveness combined with "
            "simulation exploring the latency threshold. "
            "<span class=\"kw\">Instrumentation:</span> TLA+ or Isabelle for the proof; a custom "
            "Java simulator for parameter sweeps. <span class=\"kw\">Analysis:</span> "
            "contradiction-based proof; regression curves from simulation.")),

    sec(7, "Common Errors in Choosing an Approach", "s7"),
    ol(["<span class=\"kw\">Tool-led selection.</span> Picking a survey because Qualtrics is "
        "easy, rather than because a survey answers the research question.",
        "<span class=\"kw\">Single-method tunnel vision.</span> Treating one approach as "
        "universally applicable to all sub-questions.",
        "<span class=\"kw\">Confusing method with approach.</span> Running a questionnaire is a "
        "method; the approach decides what kind of evidence is sought.",
        "<span class=\"kw\">Ignoring ecological validity.</span> A clean lab experiment that "
        "fails to reflect deployment realities.",
        "<span class=\"kw\">Neglecting venue rigour expectations.</span> A theory paper without "
        "proofs; a systems paper without statistical comparison.",
        "<span class=\"kw\">Over-claiming beyond the approach.</span> Drawing causal conclusions "
        "from cross-sectional survey data.",
        "<span class=\"kw\">No instrumentation validation.</span> Trusting an ad-hoc timer or an "
        "unverified rubric."]),

    sec(8, "How the Approach Cascades Downstream", "s8"),
    p("The investigative approach is not a stand-alone decision. It determines:"),
    ul(["<span class=\"kw\">Data collection design</span> &mdash; what to record, at what "
        "granularity, over what time horizon.",
        "<span class=\"kw\">Data analysis plan</span> &mdash; descriptive, inferential, "
        "qualitative coding, or hybrid.",
        "<span class=\"kw\">Interpretation strategy</span> &mdash; confirmatory, exploratory or "
        "theory-driven.",
        "<span class=\"kw\">Reporting format</span> &mdash; replication package, open dataset, "
        "qualitative codebook."]),
    box("exam", "The one-sentence self-check",
        p("After selecting an approach, complete this sentence: <em>&ldquo;Using [approach], "
          "with [instrumentation], on [sample or system], I will measure [metric or phenomenon] "
          "to test [hypothesis or proposition] under [conditions].&rdquo;</em>")
        + p("If the sentence cannot be completed crisply, the approach choice requires "
            "revisiting.")),

    sec(9, "Summary", "s9"),
    p("Investigative approaches in computer science are plural by necessity. Experimental, "
      "analytical, simulation-based, survey, case study, design science, comparative and "
      "mixed-methods investigations each contribute a distinct evidentiary logic. The rigorous "
      "researcher does not ask <em>which approach is best</em> but <em>which approach is "
      "justified for this problem, given these constraints, to support these claims</em>."),
    p("Selection criteria include the nature of the construct, accessibility of the system, "
      "causality requirements, resource envelope and venue expectations. The chosen approach "
      "then orchestrates downstream decisions in data collection, instrumentation, analysis and "
      "interpretation &mdash; the subjects of Lectures 6 and 7."),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Ten preparation points",
        ol(["<span class=\"kw\">Frame answers around claims and evidence.</span> Examiners "
            "reward explicit links between the research question and the type of evidence "
            "required.",
            "<span class=\"kw\">Master the strengths&ndash;limitations trade-off.</span> Listing "
            "approaches without acknowledging their vulnerabilities costs marks.",
            "<span class=\"kw\">Be CS-specific.</span> Generic social science or physics "
            "illustrations signal shallow engagement.",
            "<span class=\"kw\">Use terminology precisely.</span> Distinguish approach, method, "
            "technique and instrument.",
            "<span class=\"kw\">Practise method-justification writing.</span> Two-paragraph "
            "justifications are a common short-answer format.",
            "<span class=\"kw\">Memorise one canonical study per approach.</span> A real study "
            "&mdash; author, year, venue, finding &mdash; is far more convincing than an "
            "abstract description.",
            "<span class=\"kw\">Prepare for scenario questions.</span> &ldquo;Given problem X "
            "and constraints Y, which approach and why?&rdquo; tests synthesis, not recall.",
            "<span class=\"kw\">Revisit validity terminology.</span> Internal, external, "
            "construct and conclusion validity recur across question papers.",
            "<span class=\"kw\">Be ready to draw a comparison table.</span> Tabular contrasts "
            "between two approaches are frequently requested.",
            "<span class=\"kw\">Plan time for diagrams.</span> A clean block diagram of the DSR "
            "cycle earns quick marks."])),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Differentiate between investigative approach and research method, with a computing "
           "example. " + marks("5 marks"),
           "Under what conditions would a simulation-based investigation be preferable to an "
           "experimental one? Illustrate from networking or distributed systems. " + marks("6 marks"),
           "Explain the role of the relevance, rigour and design cycles in the "
           "Hevner&ndash;Chatterjee design science framework. " + marks("6 marks"),
           "Why are cross-sectional surveys unable, on their own, to establish causality in "
           "software-engineering research? " + marks("5 marks")]),

    sub("10.2 Medium-Answer Questions", "s10-2"),
    qlist(["Compare and contrast experimental and case-study investigations along six dimensions "
           "of your choice. Conclude with the kind of problem best suited to each. "
           + marks("10 marks"),
           "Describe the principal threats to validity in a controlled experiment measuring the "
           "runtime of a new database index, and propose mitigations. " + marks("10 marks"),
           "For the problem &ldquo;How do Indian product-based startups evaluate the "
           "cost-effectiveness of migrating monoliths to microservices?&rdquo;, propose an "
           "investigative approach and justify it with reference to validity, resources and "
           "venue expectations. " + marks("10 marks")]),

    sub("10.3 Long-Answer and Project Questions", "s10-3"),
    qlist(["Design a mixed-methods investigation for a research problem of your choice. Include "
           "research questions, an approach diagram, an instrumentation plan, a sampling "
           "strategy, an analysis plan, threats to validity and a reproducibility statement. "
           + marks("20 marks"),
           "Critically review a published CS paper for the appropriateness of its investigative "
           "approach. Highlight mismatches, missing evidence and recommended revisions. "
           + marks("15 marks"),
           "Construct a decision rubric &mdash; table or flowchart &mdash; mapping a research "
           "problem to an investigative approach, and apply it to three diverse problems drawn "
           "from algorithmic, systems and HCI sub-fields. " + marks("20 marks")]),

    sec(11, "Suggested Readings", "s11"),
    ul(["Wohlin, C., Runeson, P., H&ouml;st, M., Ohlsson, M. C., Regnell, B., &amp; "
        "Wessl&eacute;n, A. (2012). <em>Experimentation in Software Engineering</em>. Springer.",
        "Yin, R. K. (2018). <em>Case Study Research and Applications: Design and Methods</em> "
        "(6th ed.). SAGE.",
        "Hevner, A., &amp; Chatterjee, S. (2020). Design Science Research in Information "
        "Systems. In <em>Design Research in Information Systems</em>. Springer.",
        "Creswell, J. W., &amp; Plano Clark, V. L. (2018). <em>Designing and Conducting Mixed "
        "Methods Research</em> (3rd ed.). SAGE.",
        "Kitchenham, B., &amp; Charters, S. (2007). <em>Guidelines for Performing Systematic "
        "Literature Reviews in Software Engineering</em>. EBSE Technical Report.",
        "<em>ACM Code of Ethics and Professional Conduct</em> (current edition)."]),
])
