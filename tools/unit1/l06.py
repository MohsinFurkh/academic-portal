# -*- coding: utf-8 -*-
"""Unit I - Lecture 6: Data Collection and Analysis in Research."""
from kit import box, eq, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L06_Data_Collection_and_Analysis_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;"),
             ("CSEG3060_Unit1_L07_Research_Fundamentals_SMART_Objectives_Data.html",
              "Related slides &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 6 Notes — Data Collection and Analysis",
    "desc": ("Student notes for Unit I Lecture 6 of CSEG3060: the classification of research "
             "data and measurement scales, primary and secondary collection methods, "
             "probability and non-probability sampling with sample-size calculation, "
             "instrumentation, reliability and validity, data preparation, and descriptive, "
             "inferential and qualitative analysis."),
    "unitno": "Unit I",
    "lecno": "6",
    "lectitle": "Data Collection and Analysis",
    "subline": ("Data types, collection methods, sampling, instrumentation and analysis "
                "&middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Quantitative &amp; qualitative", "Sampling", "Instrumentation",
               "Descriptive stats", "Inferential stats"],
    "pager": [("CSEG3060_Unit1_L05_Investigative_Approaches_Notes.html",
               "&larr; Lecture 5: Investigative Approaches"),
              ("CSEG3060_Unit1_L07_Interpretation_and_Instrumentation_Notes.html",
               "Lecture 7: Interpretation and Instrumentation &rarr;")],
    "deck": "CSEG3060_Unit1_L07_Research_Fundamentals_SMART_Objectives_Data.html",
    "decklabel": "related slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Utilise various investigative approaches and methodologies for problem-solving in "
          "computing science research.")
        + p("Data collection and analysis constitute the <span class=\"kw\">empirical heart</span> "
            "of any investigation. The formulation of a research problem provides intellectual "
            "direction, but it is the systematic acquisition and rigorous examination of data "
            "that transforms a conceptual inquiry into verifiable knowledge.")),

    box("exam", "How to use these notes",
        p("Three items recur in examinations: the <span class=\"kw\">four measurement "
          "scales</span> (Section 2.1), the <span class=\"kw\">sampling techniques</span> and "
          "the sample-size formula (Section 4), and choosing the "
          "<span class=\"kw\">right statistical test</span> for a described scenario "
          "(Section 7.1).")
        + p("Learn the formulae with their symbol definitions. Examiners ask you to state the "
            "formula, define every symbol, and then interpret the result in one sentence "
            "&mdash; all three steps carry marks.")),

    sec(1, "Learning Objectives", "s1"),
    ul(["Differentiate between qualitative and quantitative data within a research framework.",
        "Identify and apply appropriate primary and secondary data collection techniques.",
        "Evaluate sampling strategies and justify their suitability for specific problems.",
        "Describe the instruments used for data collection and their reliability and validity "
        "considerations.",
        "Apply descriptive and inferential statistical techniques.",
        "Interpret analytical results in the context of research objectives and hypotheses.",
        "Recognise the role of instrumentation and modern computational tools in the research "
        "workflow."]),

    sec(2, "The Nature and Classification of Research Data", "s2"),
    sub("2.1 Quantitative Data and Measurement Scales", "s2-1"),
    p("Quantitative data are expressed numerically and can be subjected to arithmetic operations "
      "and statistical analysis. In computing, examples include algorithm response times in "
      "milliseconds, memory consumption in megabytes, protocol throughput in packets per "
      "second, and classifier accuracy as a percentage. They are further classified as "
      "<span class=\"kw\">discrete</span> (countable, often integers &mdash; the number of "
      "concurrent users on a web server) or <span class=\"kw\">continuous</span> (any value "
      "within a range &mdash; execution time, signal strength)."),
    tw(table(["Scale", "Description", "Example in CS research"], [
        ["**Nominal**", "Categories without order",
         "Programming language used (Python, Java, C++)"],
        ["**Ordinal**", "Ordered categories",
         "Likert ratings of usability (1 = Poor to 5 = Excellent)"],
        ["**Interval**", "Equal intervals, no true zero",
         "Temperature in Celsius during a server test"],
        ["**Ratio**", "Equal intervals with a true zero", "Execution time in seconds"],
    ])),

    sub("2.2 Qualitative and Mixed Data", "s2-2"),
    p("<span class=\"kw\">Qualitative data</span> describe characteristics, perceptions or "
      "experiences in non-numeric form: interview transcripts, open-ended survey responses, "
      "observational notes, case study narratives. They are indispensable in human&ndash;"
      "computer interaction, software engineering practice research and the study of ethical "
      "implications of AI. Qualitative data may be textual, visual or auditory, and typically "
      "require coding and thematic interpretation rather than statistical summarisation."),
    p("<span class=\"kw\">Mixed data</span> integrate numerical measurement with contextual "
      "qualitative insight to provide a richer understanding. This methodological pluralism is "
      "increasingly common in design science research and user studies."),

    sec(3, "Sources and Methods of Data Collection", "s3"),
    sub("3.1 Primary Data Collection", "s3-1"),
    p("Primary data are collected directly by the researcher for the problem at hand. They offer "
      "high relevance but require greater investment in time, cost and effort."),
    ul(["<span class=\"kw\">Surveys and questionnaires.</span> A structured or semi-structured "
        "set of questions administered to a sample, distributed physically, telephonically or "
        "online. Best practice: design clear, unambiguous, bias-free items; combine closed- and "
        "open-ended questions; pilot test to refine the instrument; use digital platforms such "
        "as Google Forms, Qualtrics or SurveyMonkey for efficient capture.",
        "<span class=\"kw\">Interviews.</span> <em>Structured</em> (predetermined questions in "
        "fixed sequence), <em>semi-structured</em> (core questions with freedom to probe) or "
        "<em>unstructured</em> (open conversation). Particularly valuable for understanding "
        "developer experiences or end-user perceptions of security mechanisms.",
        "<span class=\"kw\">Observation.</span> Systematic recording of behaviour as it occurs, "
        "either <em>participant</em> (the researcher is part of the group) or "
        "<em>non-participant</em> (the researcher remains external). Applied to user "
        "interactions with software, network traffic patterns, or laboratory protocol execution.",
        "<span class=\"kw\">Experiments.</span> Manipulation of independent variables to observe "
        "effects on dependent variables under controlled conditions &mdash; for example "
        "evaluating a sorting algorithm across varying input sizes and distributions. The design "
        "specifies the <em>independent variable</em> (algorithm type), the <em>dependent "
        "variable</em> (execution time) and the <em>control variables</em> held constant.",
        "<span class=\"kw\">Case studies.</span> An intensive, holistic description and analysis "
        "of a single instance or bounded system, such as the adoption of a software framework "
        "within an organisation. May be exploratory, descriptive or explanatory.",
        "<span class=\"kw\">Focus groups.</span> A small selected group discussing a topic under "
        "a moderator. The interactive dialogue reveals collective perspectives and social "
        "dynamics not accessible through individual interviews."]),

    sub("3.2 Secondary Data Collection", "s3-2"),
    p("Secondary data consist of information already gathered and recorded by others:"),
    ul(["published academic literature &mdash; journals, conference proceedings, theses;",
        "government and industry reports;",
        "public datasets such as the UCI Machine Learning Repository, Kaggle, and governmental "
        "open-data portals;",
        "internal organisational records &mdash; logs, performance metrics, audit trails;",
        "digital archives, online encyclopedias and patent databases."]),
    p("Secondary data are cost-effective and time-efficient, but the researcher must evaluate "
      "their <span class=\"kw\">relevance, accuracy, timeliness and methodological "
      "soundness</span> before use."),

    sec(4, "Sampling Techniques", "s4"),
    p("Because it is rarely feasible to examine every element of a population, researchers rely "
      "on samples. <span class=\"kw\">The validity of findings depends critically on the "
      "sampling strategy.</span>"),

    sub("4.1 Probability Sampling", "s4-1"),
    p("Each member of the population has a known, non-zero chance of selection."),
    ul(["<span class=\"kw\">Simple random sampling</span> &mdash; every individual chosen purely "
        "by chance, by lottery method or random number generator.",
        "<span class=\"kw\">Systematic sampling</span> &mdash; every <span class=\"mv\">k</span>"
        "th element selected from an ordered list.",
        "<span class=\"kw\">Stratified sampling</span> &mdash; the population is divided into "
        "homogeneous subgroups (strata) and random samples drawn from each in proportion to its "
        "size.",
        "<span class=\"kw\">Cluster sampling</span> &mdash; the population is divided into "
        "clusters, often geographic, and entire clusters are randomly selected."]),

    sub("4.2 Non-Probability Sampling", "s4-2"),
    p("Selection rests on the researcher's judgement or convenience rather than random "
      "assignment."),
    ul(["<span class=\"kw\">Convenience sampling</span> &mdash; respondents selected because "
        "they are readily accessible.",
        "<span class=\"kw\">Purposive (judgmental) sampling</span> &mdash; participants chosen "
        "for specific characteristics relevant to the study.",
        "<span class=\"kw\">Snowball sampling</span> &mdash; existing participants refer "
        "additional subjects; useful for hidden or specialised populations.",
        "<span class=\"kw\">Quota sampling</span> &mdash; categories are pre-defined and "
        "participants selected non-randomly to fill them."]),

    sub("4.3 Determining Sample Size", "s4-3"),
    p("Sample-size calculations balance statistical power, confidence level, acceptable margin "
      "of error and population variability. A frequently used formula for estimating a "
      "proportion is:"),
    eq("n = Z&sup2; &middot; p &middot; (1 &minus; p) / e&sup2;", "sample size for a proportion"),
    p("where <span class=\"mv\">Z</span> is the standard normal value for the desired confidence "
      "level (1.96 for 95% confidence), <span class=\"mv\">p</span> is the estimated proportion "
      "(commonly 0.5 for maximum variability), and <span class=\"mv\">e</span> is the acceptable "
      "margin of error."),
    box("eg", "Worked figure",
        p("To estimate a population proportion within &plusmn;5% at 95% confidence with "
          "<span class=\"mv\">p = 0.5</span>, a sample of approximately "
          "<span class=\"kw\">385 respondents</span> is required.")),

    sec(5, "Instrumentation, Reliability and Validity", "s5"),
    sub("5.1 Measurement Instruments", "s5-1"),
    p("A research instrument is the tool used to capture observations. The principal instruments "
      "in computing research are:"),
    ul(["<span class=\"kw\">Questionnaires and interview protocols</span> &mdash; standardised "
        "forms for eliciting self-reported data.",
        "<span class=\"kw\">Sensors and loggers</span> &mdash; hardware or software devices that "
        "automatically record events: application performance monitors, network analysers such "
        "as Wireshark.",
        "<span class=\"kw\">Profiling and benchmarking tools</span> &mdash; perf, gprof, JMH, "
        "recording execution times, memory usage and resource consumption.",
        "<span class=\"kw\">Eye-trackers and biosensors</span> &mdash; used in HCI research to "
        "capture gaze, heart rate or galvanic skin response.",
        "<span class=\"kw\">Source code analysers</span> &mdash; SonarQube, PMD, measuring "
        "cyclomatic complexity, lines of code and defect density."]),

    sub("5.2 Reliability and Validity", "s5-2"),
    p("The credibility of collected data rests on two psychometric properties."),
    p("<span class=\"kw\">Reliability</span> is the consistency of measurements across time, "
      "instruments or raters. The most common coefficient is Cronbach's alpha:"),
    eq("&alpha; = [ k / (k &minus; 1) ] &middot; ( 1 &minus; &Sigma;&sigma;&sup2;<sub>Y<sub>i</sub></sub> "
       "/ &sigma;&sup2;<sub>X</sub> )", "Cronbach's alpha"),
    p("where <span class=\"mv\">k</span> is the number of items, "
      "<span class=\"mv\">&sigma;&sup2;<sub>Y<sub>i</sub></sub></span> the variance of item "
      "<span class=\"mv\">i</span>, and <span class=\"mv\">&sigma;&sup2;<sub>X</sub></span> the "
      "total variance. Values of <span class=\"mv\">&alpha; &ge; 0.7</span> are generally "
      "considered acceptable."),
    p("<span class=\"kw\">Validity</span> is the degree to which an instrument measures what it "
      "purports to measure:"),
    ul(["<span class=\"kw\">Content validity</span> &mdash; coverage of the full domain by the "
        "instrument.",
        "<span class=\"kw\">Construct validity</span> &mdash; alignment with theoretical "
        "expectations.",
        "<span class=\"kw\">Criterion-related validity</span> &mdash; correspondence with an "
        "external benchmark."]),
    p("<span class=\"kw\">Pre-testing.</span> Before deployment, instruments should be piloted on "
      "a small sample to identify ambiguities, technical errors and timing issues. Feedback from "
      "the pilot refines the instrument for the main study."),

    sec(6, "Data Preparation", "s6"),
    p("Raw data are rarely suitable for immediate analysis. Preparation involves six steps:"),
    ol(["<span class=\"kw\">Editing</span> &mdash; detecting and correcting errors, omissions "
        "and inconsistencies.",
        "<span class=\"kw\">Coding</span> &mdash; assigning numerical or symbolic labels to "
        "responses, especially for qualitative and categorical data.",
        "<span class=\"kw\">Data entry</span> &mdash; transferring data into digital formats, "
        "often spreadsheets or statistical software.",
        "<span class=\"kw\">Transcription</span> &mdash; converting audio recordings of "
        "interviews into text.",
        "<span class=\"kw\">Cleaning</span> &mdash; handling missing values through imputation "
        "or exclusion, detecting outliers, standardising formats.",
        "<span class=\"kw\">Tabulation</span> &mdash; organising data into structured tables for "
        "inspection."]),

    sec(7, "Data Analysis", "s7"),
    sub("7.1 Quantitative Analysis", "s7-1"),
    p("<span class=\"kw\">Descriptive statistics</span> summarise the salient features of a "
      "dataset. Measures of central tendency are the mean, median and mode:"),
    eq("x&#772; = (1/n) &Sigma;<sub>i=1..n</sub> x<sub>i</sub>", "the sample mean"),
    p("Measures of dispersion are the range, variance and standard deviation:"),
    eq("s&sup2; = [ 1 / (n &minus; 1) ] &Sigma;<sub>i=1..n</sub> ( x<sub>i</sub> &minus; "
       "x&#772; )&sup2;", "the sample variance"),
    p("Measures of shape &mdash; skewness and kurtosis &mdash; describe asymmetry and "
      "peakedness, and are complemented by frequency distributions and visual representations: "
      "histograms, box plots, scatter plots and bar charts."),
    p("<span class=\"kw\">Inferential statistics</span> allow generalisation from a sample to a "
      "broader population. Hypothesis testing formulates a null hypothesis "
      "<span class=\"mv\">H<sub>0</sub></span> and an alternative "
      "<span class=\"mv\">H<sub>1</sub></span>, then computes a test statistic and a "
      "corresponding <span class=\"mv\">p</span>-value."),
    eq("t = ( x&#772;<sub>1</sub> &minus; x&#772;<sub>2</sub> ) / &radic;( s&sup2;<sub>1</sub>/n<sub>1</sub> "
       "+ s&sup2;<sub>2</sub>/n<sub>2</sub> )", "independent-samples t-statistic"),
    eq("&chi;&sup2; = &Sigma; ( O<sub>i</sub> &minus; E<sub>i</sub> )&sup2; / E<sub>i</sub>",
       "chi-square, O observed and E expected"),
    eq("r = &Sigma;( x<sub>i</sub> &minus; x&#772; )( y<sub>i</sub> &minus; y&#772; ) / "
       "&radic;[ &Sigma;( x<sub>i</sub> &minus; x&#772; )&sup2; &Sigma;( y<sub>i</sub> &minus; "
       "y&#772; )&sup2; ]", "Pearson correlation coefficient"),
    ul(["<span class=\"kw\">t-tests</span> compare two group means.",
        "<span class=\"kw\">Analysis of variance (ANOVA)</span> compares three or more group "
        "means.",
        "<span class=\"kw\">Chi-square</span> examines associations between categorical "
        "variables.",
        "<span class=\"kw\">Correlation and regression</span> quantify relationships among "
        "variables.",
        "<span class=\"kw\">Non-parametric tests</span> &mdash; Mann&ndash;Whitney U, Wilcoxon "
        "signed-rank, Kruskal&ndash;Wallis &mdash; are used where data violate normality "
        "assumptions."]),

    sub("7.2 Qualitative Analysis", "s7-2"),
    ul(["<span class=\"kw\">Thematic analysis</span> &mdash; identifying, analysing and "
        "reporting patterns (themes) within data.",
        "<span class=\"kw\">Content analysis</span> &mdash; coding textual material into "
        "categories and quantifying occurrences.",
        "<span class=\"kw\">Discourse analysis</span> &mdash; examining language use in social "
        "context.",
        "<span class=\"kw\">Grounded theory</span> &mdash; building theory inductively from data "
        "through open, axial and selective coding.",
        "<span class=\"kw\">Narrative analysis</span> &mdash; focusing on the stories people "
        "tell and their structural and linguistic features."]),
    p("Software tools that assist qualitative analysis include NVivo, ATLAS.ti and MAXQDA."),

    sub("7.3 Mixed-Methods Analysis", "s7-3"),
    p("Mixed-methods studies integrate quantitative and qualitative strands. Analysis proceeds "
      "in parallel, with results triangulated to enrich interpretation. Common designs are "
      "concurrent triangulation, sequential explanatory and sequential exploratory."),

    sec(8, "Interpretation of Data", "s8"),
    p("Interpretation is the intellectual bridge between analysis and conclusion. It involves "
      "relating findings to the hypotheses, questions or objectives; comparing results with "
      "prior studies and theoretical expectations; identifying patterns, anomalies and "
      "unexpected observations; acknowledging limitations in data, methods and generalisability; "
      "and offering explanations and implications."),
    box("caution", "Disciplined interpretation",
        p("Interpretation must avoid overreaching conclusions that exceed the empirical evidence "
          "or the scope defined at the outset of the study. Lecture 7 develops this in depth.")),

    sec(9, "Worked Illustration: Sorting Algorithm Performance", "s9"),
    box("eg", "The integrated pipeline",
        p("A researcher investigates the claim that quicksort outperforms merge sort on average "
          "for random integer arrays of size <span class=\"mv\">n &le; 10<sup>6</sup></span>.")
        + ol(["<span class=\"kw\">Data collection.</span> Implement both algorithms, generate "
              "100 random integer arrays at each of several sizes "
              "(<span class=\"mv\">n = 10<sup>4</sup>, 10<sup>5</sup>, 10<sup>6</sup></span>), "
              "and record execution times in milliseconds using a benchmarking harness.",
              "<span class=\"kw\">Data preparation.</span> Remove outliers attributable to "
              "background processes; average times across runs.",
              "<span class=\"kw\">Analysis.</span> Compute descriptive statistics for each "
              "algorithm at each size; perform a paired-samples t-test at "
              "<span class=\"mv\">&alpha; = 0.05</span>.",
              "<span class=\"kw\">Interpretation.</span> If the mean difference is significant "
              "and the effect size meaningful, conclude empirical support for the hypothesis "
              "<em>within the tested conditions</em> &mdash; noting that generalisation to other "
              "distributions, such as nearly sorted or reverse sorted, requires further "
              "experiments."])),

    sec(10, "Common Errors in Data Collection and Analysis", "s10"),
    ul(["<span class=\"kw\">Selection bias</span> &mdash; systematic differences between sample "
        "and population.",
        "<span class=\"kw\">Measurement bias</span> &mdash; systematic distortion in instruments "
        "or procedures.",
        "<span class=\"kw\">Non-response bias</span> &mdash; failure to capture data from "
        "significant segments of the sample.",
        "<span class=\"kw\">Confirmation bias</span> &mdash; interpreting ambiguous evidence in "
        "favour of one's own hypothesis.",
        "<span class=\"kw\">p-hacking</span> &mdash; performing many tests and selectively "
        "reporting only those that reach significance.",
        "<span class=\"kw\">Violation of assumptions</span> &mdash; applying parametric tests to "
        "non-normal data without transformation or a non-parametric alternative."]),

    sec(11, "Summary", "s11"),
    p("This lecture surveyed the principal elements of data collection and analysis: the "
      "distinction between qualitative and quantitative data, primary and secondary sources, "
      "sampling strategies, measurement instruments, and the psychometric criteria of validity "
      "and reliability. It then addressed data preparation, descriptive and inferential "
      "statistical methods, qualitative analytical techniques, and the interpretive practices "
      "that culminate in research conclusions. Mastery of these methods equips the computer "
      "science researcher to generate evidence that is both <span class=\"kw\">credible and "
      "meaningful</span>."),

    sec(12, "Practice and Review Questions", "s12"),
    qlist(["Differentiate between primary and secondary data, providing two computing examples "
           "of each. " + marks("4 marks"),
           "A researcher wishes to estimate the average time students spend daily on programming "
           "practice, with a margin of error of &plusmn;10 minutes at 95% confidence. Assuming a "
           "population standard deviation of 30 minutes, compute the required sample size using "
           "<span class=\"mv\">n = ( Z &middot; &sigma; / e )&sup2;</span>. " + marks("5 marks"),
           "Explain the difference between reliability and validity. Why is a measure that is "
           "reliable not necessarily valid? " + marks("5 marks"),
           "Describe three situations in which qualitative methods are preferable to "
           "quantitative methods in computing research. " + marks("6 marks"),
           "A study compares the execution times of three sorting algorithms across 50 test "
           "cases each. Which statistical test is most appropriate, and why? State the null and "
           "alternative hypotheses. " + marks("6 marks"),
           "What is stratified sampling? Under what circumstances is it more appropriate than "
           "simple random sampling? " + marks("5 marks"),
           "Discuss three common errors in data analysis and how they may be mitigated. "
           + marks("6 marks"),
           "Describe the role of pilot testing in questionnaire design. " + marks("4 marks")]),

    sec(13, "Suggested Readings", "s13"),
    ul(["Creswell, J. W., &amp; Creswell, J. D. (2018). <em>Research Design: Qualitative, "
        "Quantitative, and Mixed Methods Approaches</em> (5th ed.). SAGE.",
        "Kothari, C. R. (2004). <em>Research Methodology: Methods and Techniques</em> "
        "(2nd ed.). New Age International.",
        "Field, A. (2018). <em>Discovering Statistics Using IBM SPSS Statistics</em> (5th ed.). "
        "SAGE.",
        "Bryman, A. (2016). <em>Social Research Methods</em> (5th ed.). Oxford University Press.",
        "Wohlin, C., et al. (2012). <em>Experimentation in Software Engineering</em>. Springer."]),
])
