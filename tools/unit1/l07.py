# -*- coding: utf-8 -*-
"""Unit I - Lecture 7: Interpretation of Data and Necessary Instrumentation."""
from kit import box, eq, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L07_Interpretation_and_Instrumentation_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 7 Notes — Interpretation of Data and Necessary Instrumentation",
    "desc": ("Student notes for Unit I Lecture 7 of CSEG3060: the process and three levels of "
             "data interpretation, precautions and common errors, the types of research "
             "instrument, measurement scales, validity and reliability including Cronbach's "
             "alpha and Cohen's kappa, and the measurement-interpretation loop."),
    "unitno": "Unit I",
    "lecno": "7",
    "lectitle": "Interpretation of Data and Necessary Instrumentation",
    "subline": ("Turning analysed data into defensible findings &middot; B.Tech. (CSE) "
                "&middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Three levels", "Measurement scales", "Validity",
               "Cronbach's &alpha;", "Cohen's &kappa;"],
    "pager": [("CSEG3060_Unit1_L06_Data_Collection_and_Analysis_Notes.html",
               "&larr; Lecture 6: Data Collection and Analysis"),
              ("index.html", "Unit I contents &rarr;")],
    "deck": "index.html",
    "decklabel": "Unit I contents",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Utilise various investigative approaches and methodologies for problem-solving in "
          "computing science research.")
        + p("Data interpretation and instrumentation together constitute the "
            "<span class=\"kw\">analytical backbone</span> of any investigation. Earlier "
            "lectures established how problems are identified, scoped and approached; this one "
            "moves into the operational phase: how raw observations become meaningful "
            "conclusions, and what tools make that transformation reliable, replicable and "
            "valid.")),

    box("exam", "How to use these notes",
        p("Two statements carry most of the marks in this topic. First, "
          "<span class=\"kw\">instrumentation determines what can be observed; interpretation "
          "determines what that observation means</span> &mdash; and the quality of any "
          "interpretation is bounded by the quality of the instrument. Second, "
          "<span class=\"kw\">a perfectly reliable instrument is not necessarily valid, but a "
          "valid instrument must be reliable</span>.")
        + p("Know Cronbach's alpha and Cohen's kappa by formula <em>and</em> by interpretation; "
            "both appear as computation or interpretation items.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["Define and explain the process of data interpretation in computing research.",
        "Distinguish between the descriptive, inferential and conceptual levels of "
        "interpretation.",
        "Identify the principles, instruments and measurement scales required for rigorous data "
        "collection.",
        "Critically evaluate the reliability and validity of research instruments.",
        "Recognise common errors in interpretation and instrumentation.",
        "Apply appropriate interpretation strategies to computing research case studies."]),

    sec(2, "Interpretation: Conceptual Foundations", "s2"),
    sub("2.1 Meaning and Definition", "s2-1"),
    box("def", "Definition &mdash; Interpretation",
        p("<span class=\"kw\">Interpretation</span> is the process of assigning meaning, "
          "significance and implication to the data gathered during a research investigation. "
          "It is the intellectual activity through which raw observations are translated into "
          "findings, conclusions and recommendations.")),
    p("Formally, if <span class=\"mv\">D</span> is the collected dataset and "
      "<span class=\"mv\">C</span> the research context &mdash; problem statement, objectives, "
      "hypothesis &mdash; then interpretation can be modelled as a function:"),
    eq("I = f( D, C, T )", "T is the guiding theoretical framework"),
    p("This formulation highlights that <span class=\"kw\">interpretation is never "
      "context-free</span>: it depends equally on the data, the researcher's theoretical "
      "grounding, and the framing of the problem."),

    sub("2.2 Why Interpretation Matters", "s2-2"),
    ul(["<span class=\"kw\">Crystallises meaning</span> &mdash; without it, data remains a "
        "collection of disconnected facts.",
        "<span class=\"kw\">Links observation and theory</span> &mdash; it bridges empirical "
        "evidence and theoretical propositions.",
        "<span class=\"kw\">Enables generalisation</span> &mdash; properly interpreted data "
        "supports extrapolation to broader populations or contexts.",
        "<span class=\"kw\">Guides decision-making</span> &mdash; findings inform policy, "
        "engineering practice or further research.",
        "<span class=\"kw\">Validates hypotheses</span> &mdash; this is the stage at which "
        "hypotheses are accepted, modified or rejected."]),
    p("In computing this matters acutely because empirical results &mdash; benchmark "
      "performance, user-study outcomes, algorithm accuracy &mdash; require careful "
      "contextualisation. <em>A 5% improvement in execution time is meaningful only when "
      "interpreted against the baseline, the dataset characteristics and the deployment "
      "scenario.</em>"),

    sub("2.3 The Process of Interpretation", "s2-3"),
    ol(["<span class=\"kw\">Review of research objectives</span> &mdash; revisit the aims and "
        "hypotheses stated at the outset.",
        "<span class=\"kw\">Categorisation of data</span> &mdash; group data into meaningful "
        "categories aligned with the research questions.",
        "<span class=\"kw\">Pattern identification</span> &mdash; look for trends, regularities, "
        "anomalies and clusters.",
        "<span class=\"kw\">Contextualisation</span> &mdash; position findings within the "
        "theoretical framework and existing literature.",
        "<span class=\"kw\">Causal inference</span>, where applicable &mdash; move beyond "
        "correlation to suggest causation, with appropriate caveats.",
        "<span class=\"kw\">Synthesis</span> &mdash; combine partial interpretations into a "
        "coherent narrative.",
        "<span class=\"kw\">Reporting</span> &mdash; articulate findings clearly, supported by "
        "tables, figures and statistical evidence."]),

    sub("2.4 Three Levels of Interpretation", "s2-4"),
    box("exam", "Descriptive, inferential, conceptual",
        p("<span class=\"kw\">Descriptive</span> &mdash; the lowest level, summarising what the "
          "data shows. It answers <em>what happened?</em> &ldquo;Out of 500 software projects "
          "surveyed, 62% adopted Agile methodologies in 2024.&rdquo;")
        + p("<span class=\"kw\">Inferential</span> &mdash; extrapolates from sample to "
            "population, or from a case to a general principle. It answers <em>what does this "
            "imply for a broader context?</em> &ldquo;Given the 62% adoption rate with a 95% "
            "confidence interval of [57%, 67%], it can be inferred that Agile adoption in "
            "mid-sized IT firms has surpassed 55% nationally.&rdquo;")
        + p("<span class=\"kw\">Conceptual</span> &mdash; the highest level, abstracting "
            "findings into theoretical constructs. It answers <em>what does this mean for "
            "theory or for the discipline?</em> &ldquo;The observed adoption pattern supports "
            "the Technology Acceptance Model's proposition that perceived usefulness and "
            "organisational readiness are the dominant predictors of methodology choice, even "
            "after controlling for firm size.&rdquo;")),

    sub("2.5 Techniques of Interpretation", "s2-5"),
    tw(table(["Technique", "Description", "Typical use"], [
        ["**Categorical grouping**", "Sorting data into pre-defined or emergent categories",
         "Qualitative coding"],
        ["**Statistical aggregation**", "Computing means, medians, distributions",
         "Quantitative analysis"],
        ["**Comparative analysis**",
         "Comparing results across groups, conditions or time periods",
         "Experimental CS research"],
        ["**Thematic synthesis**",
         "Identifying recurring themes across textual or interview data",
         "Qualitative CS studies"],
        ["**Triangulation**", "Cross-verifying findings using multiple sources or methods",
         "Mixed-method research"],
        ["**Logical reasoning**", "Applying deductive or inductive logic",
         "Theoretical CS research"],
    ])),

    sub("2.6 Precautions and Common Errors", "s2-6"),
    p("<span class=\"kw\">Precautions.</span> Avoid generalisation beyond the data; distinguish "
      "correlation from causation; account for confounding variables; maintain theoretical "
      "fidelity; acknowledge researcher subjectivity, particularly in qualitative work; and "
      "verify reproducibility, so that independent reanalysis yields congruent interpretations."),
    box("caution", "Five named errors",
        ul(["<span class=\"kw\">Confirmation bias</span> &mdash; favouring data that supports "
            "pre-existing beliefs.",
            "<span class=\"kw\">Overgeneralisation</span> &mdash; applying sample-specific "
            "findings to broader populations.",
            "<span class=\"kw\">Ecological fallacy</span> &mdash; drawing conclusions about "
            "individuals from aggregate data.",
            "<span class=\"kw\">Reductionism</span> &mdash; explaining complex phenomena through "
            "oversimplified variables.",
            "<span class=\"kw\">HARKing</span> &mdash; hypothesising after results are known, "
            "then presenting post-hoc hypotheses as a priori."])),

    sec(3, "Instrumentation: Conceptual Foundations", "s3"),
    sub("3.1 Meaning and Significance", "s3-1"),
    box("def", "Definition &mdash; Instrumentation",
        p("<span class=\"kw\">Instrumentation</span> is the systematic design, selection and "
          "deployment of the tools, devices or procedures used to measure, observe, record or "
          "analyse data. An <em>instrument</em> is anything that operationalises a research "
          "construct into a measurable form.")),
    p("In the physical sciences instruments are often tangible devices &mdash; a thermometer, an "
      "oscilloscope. In computer science they are typically a blend of software tools, "
      "protocols, questionnaires, observational schemes and computational procedures."),
    ul(["<span class=\"kw\">Operationalisation</span> &mdash; translating abstract constructs "
        "such as &ldquo;usability&rdquo;, &ldquo;code quality&rdquo; or &ldquo;system "
        "scalability&rdquo; into measurable indicators.",
        "<span class=\"kw\">Standardisation</span> &mdash; ensuring collection is consistent "
        "across subjects, sessions or trials.",
        "<span class=\"kw\">Precision and accuracy</span> &mdash; reducing measurement noise and "
        "error.",
        "<span class=\"kw\">Replication</span> &mdash; enabling independent researchers to "
        "repeat the study.",
        "<span class=\"kw\">Validity</span> &mdash; ensuring the instrument measures what it is "
        "intended to measure."]),

    sub("3.2 Types of Research Instrument", "s3-2"),
    ul(["<span class=\"kw\">Observation-based</span> &mdash; structured observation schedules, "
        "unstructured field notes, video and audio recording protocols, screen-capture and "
        "keystroke-logging tools.",
        "<span class=\"kw\">Self-report</span> &mdash; questionnaires (closed-ended, Likert, "
        "semantic differential), interviews, surveys, diaries and experience-sampling methods.",
        "<span class=\"kw\">Performance-based</span> &mdash; standardised tests, benchmark "
        "suites (SPEC, LINPACK for hardware; JUnit for software testing), code repositories and "
        "version-controlled logs, profiling tools (Valgrind, gprof, perf).",
        "<span class=\"kw\">Archival / document-based</span> &mdash; software repositories "
        "(GitHub, GitLab), bug-tracking systems (Jira, Bugzilla), issue trackers and commit "
        "histories, publication databases (Scopus, Web of Science, arXiv).",
        "<span class=\"kw\">Computational</span> &mdash; statistical software (R, Python, SPSS, "
        "MATLAB), simulation environments (NS-3 for networks, Gazebo for robotics), "
        "visualisation tools (Tableau, D3.js, Matplotlib)."]),

    sub("3.3 Measurement Scales", "s3-3"),
    p("The choice of instrument must align with the appropriate measurement scale."),
    tw(table(["Scale", "Properties", "Example in CS", "Permissible operations"], [
        ["**Nominal**", "Categorisation only", "Programming language used", "Counting, mode"],
        ["**Ordinal**", "Order, unequal intervals", "Likert rating of satisfaction (1&ndash;5)",
         "Median, percentile"],
        ["**Interval**", "Order, equal intervals, no true zero",
         "Temperature in Celsius (rare in CS)", "Mean, standard deviation"],
        ["**Ratio**", "Order, equal intervals, true zero",
         "Execution time, memory usage, response latency", "All statistical operations"],
    ])),
    p("In computing, <span class=\"kw\">ratio</span> scales dominate performance studies, while "
      "<span class=\"kw\">ordinal</span> scales dominate usability and user-experience research "
      "&mdash; for instance System Usability Scale scores."),

    sec(4, "What Makes an Instrument Good", "s4"),
    sub("4.1 Validity", "s4-1"),
    p("Validity is the degree to which an instrument measures what it claims to measure:"),
    ul(["<span class=\"kw\">Content validity</span> &mdash; coverage of all relevant aspects of "
        "the construct.",
        "<span class=\"kw\">Criterion validity</span> &mdash; correlation with an external "
        "benchmark or gold standard.",
        "<span class=\"kw\">Construct validity</span> &mdash; alignment with theoretical "
        "expectations, often established through factor analysis.",
        "<span class=\"kw\">Face validity</span> &mdash; apparent suitability as judged by "
        "experts."]),
    p("Mathematically, validity can be expressed as the correlation between the instrument's "
      "score and the true or criterion score:"),
    eq("r<sub>xy</sub> = &Sigma;( x<sub>i</sub> &minus; x&#772; )( y<sub>i</sub> &minus; "
       "y&#772; ) / &radic;[ &Sigma;( x<sub>i</sub> &minus; x&#772; )&sup2; &Sigma;( "
       "y<sub>i</sub> &minus; y&#772; )&sup2; ]", "x observed, y true scores"),

    sub("4.2 Reliability", "s4-2"),
    p("Reliability is the consistency of measurement across time, instrument or rater."),
    ul(["<span class=\"kw\">Test&ndash;retest reliability</span> &mdash; stability over time, "
        "measured by the correlation coefficient "
        "<span class=\"mv\">r<sub>tt</sub></span>.",
        "<span class=\"kw\">Internal consistency</span> &mdash; homogeneity of items, commonly "
        "measured by Cronbach's alpha.",
        "<span class=\"kw\">Inter-rater reliability</span> &mdash; agreement among independent "
        "coders, measured using Cohen's kappa."]),
    eq("&alpha; = [ k / (k &minus; 1) ] &middot; ( 1 &minus; &Sigma;&sigma;&sup2;<sub>y<sub>i</sub></sub> "
       "/ &sigma;&sup2;<sub>x</sub> )", "Cronbach's alpha"),
    p("where <span class=\"mv\">k</span> is the number of items, "
      "<span class=\"mv\">&sigma;&sup2;<sub>y<sub>i</sub></sub></span> the variance of item "
      "<span class=\"mv\">i</span>, and <span class=\"mv\">&sigma;&sup2;<sub>x</sub></span> the "
      "variance of the total score. Values of <span class=\"mv\">&alpha; &ge; 0.70</span> are "
      "typically considered acceptable."),
    eq("&kappa; = ( p<sub>o</sub> &minus; p<sub>e</sub> ) / ( 1 &minus; p<sub>e</sub> )",
       "Cohen's kappa"),
    p("where <span class=\"mv\">p<sub>o</sub></span> is the observed agreement and "
      "<span class=\"mv\">p<sub>e</sub></span> the agreement expected by chance."),

    sub("4.3 Designing an Instrument", "s4-3"),
    ol(["<span class=\"kw\">Specify the construct</span> &mdash; define what is to be measured, "
        "for instance &ldquo;code maintainability&rdquo;.",
        "<span class=\"kw\">Review the literature</span> &mdash; identify established scales or "
        "items.",
        "<span class=\"kw\">Draft items</span> &mdash; develop an initial pool of questions, "
        "observations or measurement procedures.",
        "<span class=\"kw\">Expert review</span> &mdash; have domain experts evaluate content "
        "validity.",
        "<span class=\"kw\">Pilot test</span> &mdash; administer to a small sample, typically "
        "20&ndash;50 participants.",
        "<span class=\"kw\">Refine</span> &mdash; revise items based on pilot feedback and "
        "statistical analysis.",
        "<span class=\"kw\">Establish reliability</span> &mdash; compute Cronbach's alpha, "
        "test&ndash;retest or inter-rater metrics.",
        "<span class=\"kw\">Final deployment</span> &mdash; use the validated instrument in the "
        "main study."]),

    sub("4.4 Instrumentation in Practice", "s4-4"),
    box("eg", "Three computing examples",
        p("<span class=\"kw\">Software defect prediction.</span> Construct: defect proneness. "
          "Instrument: static code analysis tools such as SonarQube or PMD, generating "
          "cyclomatic complexity, lines of code and code churn. Scale: ratio. Reliability check: "
          "repeated runs on identical codebases should yield identical results &mdash; "
          "instrument objectivity.")
        + p("<span class=\"kw\">Usability evaluation.</span> Construct: perceived usability. "
            "Instrument: the System Usability Scale, a 10-item Likert questionnaire. Scale: "
            "ordinal for items, interval for the composite score. Validation: SUS has been "
            "validated across hundreds of studies; benchmark scores above 68 are considered "
            "above average.")
        + p("<span class=\"kw\">Algorithm performance benchmarking.</span> Construct: "
            "computational efficiency. Instrument: a standardised benchmark suite in a "
            "controlled hardware environment, with repeated trials. Scale: ratio. Analysis: mean "
            "execution time, 95% confidence intervals, and significance testing using paired "
            "t-tests or Wilcoxon signed-rank tests.")),

    sec(5, "The Measurement&ndash;Interpretation Loop", "s5"),
    p("Interpretation and instrumentation are intimately connected. "
      "<span class=\"kw\">Instrumentation determines what can be observed; interpretation "
      "determines what that observation means.</span> The quality of any interpretation is "
      "bounded by the quality of the underlying instrument; conversely, even a perfect "
      "instrument produces meaningless data if interpreted out of context."),
    ol(["Construct definition &rarr; instrument design.",
        "Instrument deployment &rarr; data collection.",
        "Data processing &rarr; statistical analysis.",
        "Statistical analysis &rarr; interpretation.",
        "Interpretation &rarr; theoretical refinement or further research."]),
    p("A break at any stage compromises the integrity of the entire process. An ill-defined "
      "construct leads to an instrument that does not measure the intended phenomenon, which in "
      "turn produces data that resists meaningful interpretation."),

    sec(6, "Case Study: Code Review and Software Quality", "s6"),
    box("eg", "Evaluating the impact of code review practices in open-source projects",
        p("<span class=\"kw\">Research question:</span> does the adoption of mandatory peer code "
          "review reduce post-release defect density in open-source software projects?")
        + tw(table(["Construct", "Instrument", "Scale"], [
            ["Peer code review adoption", "Mining GitHub pull-request logs", "Nominal (yes/no)"],
            ["Code review thoroughness", "Number of review comments per pull request", "Ratio"],
            ["Defect density", "Bugs per thousand lines of code post-release", "Ratio"],
            ["Code quality (control)", "Static analysis scores (SonarQube)", "Interval"],
            ["Team experience", "Years of contributor activity", "Ratio"],
        ]))
        + p("<span class=\"kw\">Interpretation plan:</span> compute descriptive statistics for "
            "all variables; apply Pearson correlation to assess linear associations; use "
            "multiple regression to control for confounders; interpret coefficients with "
            "confidence intervals; and discuss whether the observed relationships warrant causal "
            "claims.")
        + eq("DD = &beta;<sub>0</sub> + &beta;<sub>1</sub>&middot;CR + &beta;<sub>2</sub>&middot;RT "
             "+ &beta;<sub>3</sub>&middot;CE + &epsilon;", "the regression model")
        + p("where <span class=\"mv\">DD</span> is defect density, <span class=\"mv\">CR</span> "
            "code-review adoption, <span class=\"mv\">RT</span> review thoroughness, "
            "<span class=\"mv\">CE</span> contributor experience, and "
            "<span class=\"mv\">&epsilon;</span> the error term.")
        + p("<span class=\"kw\">Instrumentation precautions:</span> verify that pull-request logs "
            "are consistent across projects; validate the static-analysis tool against a "
            "benchmark corpus; pilot the data-extraction script on a subsample; and address "
            "missing data through multiple imputation if necessary.")),

    sec(7, "Summary", "s7"),
    ul(["<span class=\"kw\">Interpretation</span> is the cognitive and analytical process by "
        "which data is rendered meaningful. It operates at descriptive, inferential and "
        "conceptual levels, and must be guarded against bias, overgeneralisation and the "
        "ecological fallacy.",
        "<span class=\"kw\">Instrumentation</span> operationalises abstract constructs into "
        "measurable entities. Effective instruments are valid, reliable, appropriate to the "
        "paradigm, and aligned with the correct measurement scale.",
        "The two are inseparable: instrumentation sets the boundary of what can be observed, "
        "while interpretation determines the significance of those observations."]),
    p("Mastery of both is essential for computer science researchers, whose work increasingly "
      "blends quantitative performance metrics with qualitative insight into human&ndash;computer "
      "interaction, software engineering practice and algorithmic behaviour."),

    sec(8, "Exam Preparation", "s8"),
    box("exam", "Seven preparation points",
        ol(["<span class=\"kw\">Memorise definitions precisely.</span> Examiners often begin "
            "with definitional questions on interpretation, validity, reliability and "
            "measurement scales.",
            "<span class=\"kw\">Master the four measurement scales.</span> Be prepared to "
            "classify examples, identify permissible operations and justify scale choices.",
            "<span class=\"kw\">Know Cronbach's alpha and Cohen's kappa</span> by formula and "
            "interpretation; both are frequent computation items.",
            "<span class=\"kw\">Differentiate correlation from causation</span> &mdash; a "
            "high-yield conceptual question.",
            "<span class=\"kw\">Practise identifying errors in interpretation.</span> Examiners "
            "present small datasets or summaries and ask you to detect the error.",
            "<span class=\"kw\">Connect theory to CS examples</span> &mdash; algorithm "
            "benchmarking, usability testing, software defect prediction.",
            "<span class=\"kw\">Draw diagrams.</span> Schematic representations of the "
            "interpretation process or instrument design earn additional credit."])),

    sub("8.1 Short-Answer Questions", "s8-1"),
    qlist(["Define &ldquo;interpretation of data&rdquo; in the context of research methodology. "
           + marks("2 marks"),
           "Differentiate between descriptive, inferential and conceptual levels of "
           "interpretation. " + marks("3 marks"),
           "List any four types of research instrument commonly used in computing research. "
           + marks("2 marks"),
           "What is the difference between nominal and ordinal measurement scales? Provide one "
           "computing example of each. " + marks("3 marks"),
           "State the formula for Cronbach's alpha and explain what a value of 0.65 indicates. "
           + marks("3 marks")]),

    sub("8.2 Medium-Answer Questions", "s8-2"),
    qlist(["Explain the significance of data interpretation in research. Discuss at least three "
           "precautions researchers should observe. " + marks("7 marks"),
           "Distinguish between validity and reliability. Describe at least two types of each, "
           "with computing examples. " + marks("7 marks"),
           "Describe the procedural steps involved in designing a research instrument. Why is "
           "pilot testing essential? " + marks("6 marks"),
           "Discuss Cohen's kappa as a measure of inter-rater reliability. What does a kappa of "
           "0.40 indicate, and how might it be improved? " + marks("6 marks")]),

    sub("8.3 Long-Answer and Application Questions", "s8-3"),
    qlist(["A researcher wishes to evaluate the effectiveness of a new intrusion-detection "
           "system. Propose the constructs to be measured, the instruments (datasets, metrics, "
           "software tools), the appropriate measurement scales, the validation strategy, and a "
           "plan for interpretation including potential confounding variables. " + marks("15 marks"),
           "Critically analyse the statement: <em>&ldquo;A perfectly reliable instrument is not "
           "necessarily valid, but a valid instrument must be reliable.&rdquo;</em> Justify with "
           "examples from computing research. " + marks("10 marks"),
           "A team conducts a usability study of a mobile health application, administering the "
           "System Usability Scale to 30 users. The mean SUS score is 72.5 with a standard "
           "deviation of 8.2, and Cronbach's alpha is 0.62. Interpret the mean score, comment on "
           "the internal consistency, and recommend two improvements to strengthen the "
           "instrument. " + marks("12 marks")]),

    sec(9, "Suggested Further Reading", "s9"),
    ol(["Creswell, J. W., &amp; Creswell, J. D. (2018). <em>Research Design: Qualitative, "
        "Quantitative, and Mixed Methods Approaches</em> (5th ed.). SAGE.",
        "Field, A. (2018). <em>Discovering Statistics Using IBM SPSS Statistics</em> (5th ed.). "
        "SAGE.",
        "Kitchenham, B. A., Pfahl, D., &amp; Pickard, L. M. (2007). Quantitative Empirical "
        "Software Engineering. In <em>Guide to Advanced Empirical Software Engineering</em>. "
        "Springer.",
        "Dillman, D. A., Smyth, J. D., &amp; Christian, L. M. (2014). <em>Internet, Phone, Mail, "
        "and Mixed-Mode Surveys: The Tailored Design Method</em> (4th ed.). Wiley.",
        "Brooke, J. (1996). SUS: A &lsquo;Quick and Dirty&rsquo; Usability Scale. In "
        "<em>Usability Evaluation in Industry</em>. Taylor &amp; Francis."]),
])
