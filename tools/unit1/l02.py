# -*- coding: utf-8 -*-
"""Unit I - Lecture 2: Criteria and Characteristics of a Good Research Problem."""
from kit import box, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L02_Criteria_and_Characteristics_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;"),
             ("CSEG3060_Unit1_L04_Criteria_FINER.pdf", "Slides (PDF) &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 2 Notes — Criteria and Characteristics of a Good Research Problem",
    "desc": ("Student notes for Unit I Lecture 2 of CSEG3060: what makes a research problem "
             "good, the eight external criteria used to evaluate one, the eight internal "
             "characteristics it must possess, the distinction between criteria and "
             "characteristics, and the ten common errors of problem selection."),
    "unitno": "Unit I",
    "lecno": "2",
    "lectitle": "Criteria and Characteristics of a Good Research Problem",
    "subline": ("External criteria, internal characteristics and the errors of selection "
                "&middot; 50&ndash;60 minutes &middot; B.Tech. (CSE) &middot; "
                "Dr. Mohsin Furkh Dar"),
    "badges": ["CO1", "Criteria", "Characteristics", "Feasibility",
               "Ten errors", "Diagnostic checklist"],
    "pager": [("CSEG3060_Unit1_L01_Understanding_Research_Problem_Notes.html",
               "&larr; Lecture 1: Understanding the Research Problem"),
              ("CSEG3060_Unit1_L03_Essential_Attributes_and_Errors_Notes.html",
               "Lecture 3: Essential Attributes and Errors &rarr;")],
    "deck": "CSEG3060_Unit1_L04_Criteria_FINER.pdf",
    "decklabel": "Lecture 2 slides (PDF)",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO1",
        p("Understand the meaning, significance and foundational components of research, "
          "including the formulation and evaluation of research problems.")
        + p("Lecture 1 gave the <em>conceptual</em> understanding of a research problem. This "
            "lecture moves to the <span class=\"kw\">evaluative</span> understanding: the "
            "benchmarks that distinguish a scientifically rigorous and academically valuable "
            "problem from one that is trivial, infeasible or otherwise inadequate.")),

    box("exam", "How to use these notes",
        p("The single most examined item here is the <span class=\"kw\">criteria versus "
          "characteristics</span> distinction in Section 4. Memorise the table and reproduce "
          "it: criteria are the evaluative lenses applied <em>from outside</em>; "
          "characteristics are the attributes the problem <em>itself possesses</em>.")
        + p("The ten errors in Section 5 are the second most frequent question. Know all ten "
            "and be able to give one computing example and one corrective measure for each.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["Define the concept of a &ldquo;good&rdquo; research problem and articulate why "
        "evaluation is necessary before inquiry commences.",
        "Enumerate and explain the essential criteria for evaluating a research problem.",
        "Describe the distinguishing characteristics a well-formulated problem must inherently "
        "possess.",
        "Differentiate between criteria (external standards) and characteristics (intrinsic "
        "properties).",
        "Identify the common errors committed during the selection of a research problem.",
        "Apply the criteria and characteristics to assess sample problems drawn from computer "
        "science.",
        "Critically self-evaluate a proposed research problem using a structured checklist."]),
    p("<span class=\"kw\">Prerequisites:</span> the meaning and significance of a research "
      "problem, its sources and the preliminary steps of identification, all from Lecture 1. "
      "Familiarity with the IMRaD structure of a research paper is also helpful."),

    sec(2, "Key Concepts and Definitions", "s2"),
    tw(table(["Term", "Definition"], [
        ["**Research problem**",
         "A specific intellectual or practical issue a researcher seeks to investigate, "
         "analyse or resolve through systematic scientific inquiry"],
        ["**Criteria**",
         "The external standards, benchmarks or yardsticks against which a problem is judged "
         "for adequacy before approval and execution"],
        ["**Characteristics**",
         "The inherent, internal qualities the problem itself must possess in order to be "
         "considered scientifically valid"],
        ["**Feasibility**",
         "The practical possibility of conducting the research within constraints of time, "
         "resources, expertise and access to data"],
        ["**Novelty (originality)**",
         "The extent to which the problem contributes new knowledge, a new perspective or a "
         "new solution"],
        ["**Researchability**",
         "The degree to which the problem can be empirically or analytically investigated "
         "using available methods"],
        ["**Scope**", "The clearly defined boundaries delineating what the research will and "
         "will not cover"],
    ])),
    box("caution", "A note on terminology",
        p("Some textbooks treat <em>criteria</em> and <em>characteristics</em> as "
          "interchangeable. These notes adopt the more rigorous distinction in which criteria "
          "are the evaluative lenses applied from outside, and characteristics are the "
          "inherent attributes possessed by the problem itself. "
          "<span class=\"kw\">This distinction is critical for examination purposes.</span>")),

    sec(3, "What Makes a Research Problem &ldquo;Good&rdquo;", "s3"),
    p("A research problem is good when it is simultaneously:"),
    ol(["<span class=\"kw\">Worth investigating</span> &mdash; it addresses an important gap, "
        "conflict or need.",
        "<span class=\"kw\">Investigable</span> &mdash; it can be studied empirically or "
        "analytically using rigorous methods.",
        "<span class=\"kw\">Manageable</span> &mdash; it can be completed within realistic "
        "resource, time and expertise constraints.",
        "<span class=\"kw\">Generative</span> &mdash; it has the potential to produce "
        "meaningful, publishable or applicable results."]),
    p("Goodness is <em>not</em> an absolute property. It is relative to the researcher's "
      "training, institutional context, available resources and the current state of the "
      "discipline. A problem that is excellent for a doctoral candidate may be unsuitable for "
      "an undergraduate project, and the reverse."),

    sec(4, "Criteria: The External Standards", "s4"),
    p("Criteria function as evaluation standards, applied to the problem by the researcher, "
      "supervisor, review committee or funding body."),

    sub("4.1 Novelty and Originality", "s4-1"),
    p("The problem must address a gap in existing knowledge. Pure replication, unless "
      "explicitly justified as replication research, does not constitute original research. "
      "Novelty may manifest as:"),
    ul(["discovery of a new phenomenon;",
        "development of a new method, algorithm or tool;",
        "application of an existing method to a new domain;",
        "refutation or substantial modification of an existing theory;",
        "deeper understanding of a known phenomenon through novel data or analytical "
        "techniques."]),
    p("In computer science, novelty is often demonstrated through comparative performance "
      "evaluation against state-of-the-art baselines on benchmark datasets."),

    sub("4.2 Feasibility", "s4-2"),
    tw(table(["Dimension", "Illustrative question"], [
        ["**Technical**", "Are the required tools, software, hardware and datasets accessible?"],
        ["**Financial**", "Is the budget sufficient for computation, data acquisition or "
         "participant recruitment?"],
        ["**Temporal**", "Can the research be completed within the stipulated timeline &mdash; "
         "one semester, three years?"],
        ["**Cognitive**", "Does the researcher possess, or can they acquire, the requisite "
         "statistical, programming and domain knowledge?"],
        ["**Ethical**", "Will the research pass institutional ethics review?"],
        ["**Data**", "Are the required data sources accessible, or can they be generated "
         "within the project?"],
    ])),
    p("A problem that fails any one of these dimensions is unlikely to yield a successful "
      "study."),

    sub("4.3 Relevance and Significance", "s4-3"),
    p("The problem must be relevant to the discipline and significant in its potential "
      "contribution. Significance is judged by the size of the population or system affected, "
      "the severity of the problem addressed, the generalisability of the expected findings, "
      "and the potential to inform theory, policy or practice. A problem on the scalability of "
      "distributed databases in cloud environments is highly relevant because of the "
      "widespread adoption of cloud computing across industries."),

    sub("4.4 Clarity and Specificity", "s4-4"),
    p("The problem must be stated clearly and unambiguously: the variables, the population or "
      "system under study, and the boundaries of the investigation must all be evident. "
      "&ldquo;Studying artificial intelligence&rdquo; is not a research problem &mdash; it is "
      "a research <em>domain</em>. &ldquo;Evaluating the impact of attention mechanisms on the "
      "inference latency of transformer models in edge computing environments&rdquo; meets the "
      "criterion."),

    sub("4.5 Researchability", "s4-5"),
    p("The problem must be amenable to systematic investigation. This requires that the "
      "variables can be operationalised into measurable indicators, that the hypotheses can be "
      "tested, that the data can be collected or generated, and that appropriate methods of "
      "analysis are available. Some problems, though intellectually compelling, are not "
      "researchable: &ldquo;What is the ultimate nature of consciousness?&rdquo; is a "
      "philosophical problem current scientific methods cannot resolve."),

    sub("4.6 Ethical Acceptability", "s4-6"),
    p("The problem must not violate human dignity, privacy, informed consent, "
      "non-maleficence or justice. In computing, ethical considerations are especially salient "
      "in research involving personal data, surveillance systems, algorithmic bias and "
      "fairness, cybersecurity exploits, and dual-use AI capabilities."),

    sub("4.7 Timeliness and Manageability of Scope", "s4-7"),
    p("<span class=\"kw\">Timeliness:</span> the problem should be relevant to the current "
      "state of the discipline. A problem significant two decades ago but since thoroughly "
      "resolved is not a good current problem unless a clear new angle can be articulated. "
      "<span class=\"kw\">Manageability:</span> the scope must be commensurate with available "
      "resources; overly ambitious problems that cannot realistically be completed violate "
      "this criterion."),

    sec(5, "Characteristics: The Internal Properties", "s5"),
    p("Characteristics are the attributes the problem must possess. Once present, they make "
      "the problem amenable to evaluation by the criteria above."),
    ol(["<span class=\"kw\">It is clearly defined.</span> Well-articulated boundaries, a "
        "specified population or system, and identified dependent and independent variables "
        "where applicable. This is what allows the problem to be tested against the criterion "
        "of clarity.",
        "<span class=\"kw\">It is researchable.</span> By its nature it can be subjected to "
        "scientific method; it is not purely speculative, philosophical or normative.",
        "<span class=\"kw\">It is significant.</span> When resolved, it makes a non-trivial "
        "contribution to theory, practice or policy.",
        "<span class=\"kw\">It is novel.</span> It is new, or it extends, refines or "
        "re-examines existing knowledge from a fresh perspective.",
        "<span class=\"kw\">It is feasible.</span> It is realistic given the researcher's "
        "competencies and available resources.",
        "<span class=\"kw\">It is interesting and motivating.</span> A good problem generates "
        "intrinsic curiosity. Problems the researcher finds mechanical rarely produce "
        "high-quality work.",
        "<span class=\"kw\">It generates testable hypotheses or answerable questions.</span> "
        "It leads naturally to specific questions that can be empirically or analytically "
        "addressed.",
        "<span class=\"kw\">It is consistent with the researcher's expertise.</span> It aligns "
        "with their academic background, training and prior work."]),

    sub("5.1 Distinguishing Criteria from Characteristics", "s5-1"),
    box("exam", "Learn this table",
        tw(table(["Aspect", "Criteria", "Characteristics"], [
            ["Nature", "External standards of judgment", "Internal properties of the problem"],
            ["Function", "Used to evaluate the problem", "Possessed by the problem"],
            ["Examples", "Feasibility, relevance, ethical acceptability",
             "Clarity, novelty, researchability"],
            ["Applied by", "Reviewer, supervisor, funding body", "Inherent to formulation"],
        ]))
        + p("<span class=\"kw\">A useful analogy.</span> A candidate at an interview is judged "
            "against criteria &mdash; communication skills, technical knowledge &mdash; but "
            "must already possess the corresponding characteristics: articulation, knowledge. "
            "The interview evaluates; the attributes enable the evaluation.")),

    sec(6, "Ten Errors in the Selection of a Research Problem", "s6"),
    p("Novice researchers frequently make the following errors. Recognising them is the first "
      "step toward avoiding them; each is given here with its corrective measure."),
    tw(table(["Error", "Example", "Correction"], [
        ["**1. The overly broad problem**", "&ldquo;Developing a general-purpose artificial "
         "intelligence system.&rdquo; The scope makes meaningful progress impossible.",
         "Narrow to a specific sub-area, population or application"],
        ["**2. The overly narrow problem**", "&ldquo;Investigating the typing speed of ten "
         "students on one keyboard model on a specific day.&rdquo;",
         "Broaden until findings are generalisable or theoretically meaningful"],
        ["**3. The vague problem**", "&ldquo;Studying the impact of technology.&rdquo;",
         "Operationalise the variables: specify the technology, population and outcome"],
        ["**4. The already-solved problem**", "The literature has thoroughly addressed it and "
         "the study offers no new angle.",
         "Conduct a comprehensive literature review first; find a related unresolved sub-question"],
        ["**5. The trendy but shallow problem**", "A currently popular topic pursued without "
         "intellectual depth or genuine contribution.",
         "Substantiate significance beyond trendiness"],
        ["**6. The infeasible problem**", "It requires resources, data, expertise or access "
         "the researcher cannot reasonably acquire.",
         "Assess feasibility honestly and revise to fit available resources"],
        ["**7. The ethically problematic problem**", "It raises serious ethical concerns that "
         "cannot be mitigated.", "Redesign to comply with ethical standards, or abandon it"],
        ["**8. The problem without theoretical grounding**", "Purely empirical, anchored in no "
         "framework; findings cannot be generalised or interpreted meaningfully.",
         "Ground it in an established framework or develop a conceptual model"],
        ["**9. The supervisor-dictated problem**", "Accepted without genuine intellectual "
         "engagement, leading to weak motivation and shallow contribution.",
         "Negotiate ownership, aligning your interests with the supervisor's expertise"],
        ["**10. The methodologically inappropriate problem**", "Interesting, but not "
         "adequately addressable by the chosen &mdash; or by any available &mdash; methodology.",
         "Reconsider the problem, or identify an alternative methodology"],
    ])),

    sec(7, "Applying the Criteria: Three Worked Cases", "s7"),
    box("eg", "Case 1 &mdash; a good research problem",
        p("<em>&ldquo;A Hybrid Deep Learning and Graph-Based Approach for Real-Time Detection "
          "of Zero-Day Vulnerabilities in Software-Defined Networks.&rdquo;</em>")
        + ul(["<span class=\"kw\">Novelty:</span> yes &mdash; combines deep learning with "
              "graph-based analysis; both zero-day detection and SDN security are active areas.",
              "<span class=\"kw\">Feasibility:</span> yes &mdash; public datasets (CICIDS, "
              "NSL-KDD) exist, frameworks are open-source, computation is manageable.",
              "<span class=\"kw\">Relevance:</span> high &mdash; SDN security is a critical "
              "industry concern.",
              "<span class=\"kw\">Clarity:</span> yes &mdash; variables (traffic features), "
              "population (SDN traffic) and outcomes (detection accuracy, false-positive rate) "
              "are specified.",
              "<span class=\"kw\">Researchability:</span> yes &mdash; empirically evaluable "
              "against baselines.",
              "<span class=\"kw\">Ethical acceptability:</span> yes &mdash; public datasets, "
              "no human subjects.",
              "<span class=\"kw\">Timeliness and manageability:</span> yes &mdash; appropriate "
              "for a master's thesis or doctoral investigation."])
        + p("<span class=\"kw\">Verdict:</span> a high-quality research problem.")),
    box("caution", "Case 2 &mdash; a poorly formulated problem",
        p("<em>&ldquo;Studying Computer Security.&rdquo;</em>")
        + p("Novelty is indeterminate because no gap is identified; feasibility is "
            "indeterminate because scope is undefined; clarity fails outright; researchability "
            "fails because the problem cannot be operationalised; manageability fails because "
            "the scope is enormous.")
        + p("<span class=\"kw\">Verdict:</span> this is a research <em>domain</em>, not a "
            "research problem. It is the title of a textbook, not a thesis.")),
    box("eg", "Case 3 &mdash; a borderline problem",
        p("<em>&ldquo;A Comparative Study of Sorting Algorithms.&rdquo;</em>")
        + p("Novelty is limited, since sorting has been exhaustively studied; feasibility and "
            "clarity are fine, but the work is potentially trivial if confined to standard "
            "algorithms on standard hardware.")
        + p("<span class=\"kw\">Verdict:</span> weak as stated; potentially strong if refined "
            "&mdash; for instance <em>Comparative Performance of Sorting Algorithms on Quantum "
            "Annealers</em>, which supplies the missing novel angle.")),

    sec(8, "A Diagnostic Checklist", "s8"),
    box("exam", "Self-evaluate before submitting for approval",
        ol(["Have I stated the problem in a single, precise sentence?",
            "Have I clearly identified the population, system or phenomenon under study?",
            "Have I specified the variables or research questions?",
            "Does the problem address a gap identified through a literature review?",
            "Can the problem be investigated within my timeframe?",
            "Do I have, or can I acquire, the necessary data, tools and expertise?",
            "Has the problem passed ethical review?",
            "Is the scope manageable?",
            "Is the problem interesting enough to sustain my motivation?",
            "Is the problem grounded in an appropriate theoretical or conceptual framework?"])
        + p("If any answer is &ldquo;no&rdquo; or &ldquo;uncertain&rdquo;, the problem requires "
            "further refinement before approval.")),

    sec(9, "Summary", "s9"),
    ul(["A <span class=\"kw\">good</span> research problem is worth investigating, "
        "investigation-ready, manageable, and generative of meaningful contribution.",
        "<span class=\"kw\">Criteria</span> are the external benchmarks &mdash; novelty, "
        "feasibility, relevance, clarity, researchability, ethical acceptability, timeliness, "
        "manageability &mdash; used to judge the problem.",
        "<span class=\"kw\">Characteristics</span> are the internal properties &mdash; clarity, "
        "researchability, significance, novelty, feasibility, interest, testability, expertise "
        "alignment &mdash; the problem itself must possess.",
        "The two are interrelated: <em>characteristics enable the problem to satisfy the "
        "criteria</em>.",
        "The most common selection errors are excessive breadth, excessive narrowness, "
        "vagueness, premature saturation of the literature, ethical infeasibility and absence "
        "of theoretical grounding.",
        "In computing these standards apply across algorithms, machine learning, "
        "cybersecurity, software engineering, networks, databases and emerging areas such as "
        "quantum computing and ethical AI."]),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Seven preparation points",
        ol(["<span class=\"kw\">Master the distinctions.</span> Examiners frequently ask you "
            "to differentiate criteria from characteristics. Memorise the table in Section 5.1 "
            "and reproduce it clearly.",
            "<span class=\"kw\">Use CS-specific examples.</span> Generic answers drawn from "
            "social science attract less credit.",
            "<span class=\"kw\">Apply, do not just list.</span> Demonstrate the application: "
            "&ldquo;this problem satisfies feasibility because the NSL-KDD dataset is publicly "
            "available&hellip;&rdquo;",
            "<span class=\"kw\">Memorise the common errors.</span> Know all ten and give one "
            "computing example for each.",
            "<span class=\"kw\">Practise problem diagnosis.</span> Take sample research titles "
            "and evaluate them against the Section 8 checklist &mdash; the most common style "
            "of question.",
            "<span class=\"kw\">Use tables judiciously.</span> A well-structured comparison "
            "table can earn full marks even in a short answer.",
            "<span class=\"kw\">Link to CO1.</span> Show that you understand not just what the "
            "criteria are, but why they matter for the integrity of the research process."])),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Define the term &ldquo;criterion&rdquo; in the context of evaluating a research "
           "problem. Give two examples. " + marks("3 marks"),
           "Differentiate between a criterion and a characteristic of a research problem. "
           + marks("3 marks"),
           "State any four common errors committed during the selection of a research problem. "
           + marks("2 marks"),
           "Why is novelty considered an essential criterion of a good research problem? "
           + marks("2 marks"),
           "What is meant by &ldquo;manageability of scope&rdquo;? " + marks("2 marks")]),

    sub("10.2 Long-Answer Questions", "s10-2"),
    qlist(["Critically examine the criteria of a good research problem. Illustrate with two "
           "examples from computer science research. " + marks("10 marks"),
           "Discuss the characteristics a research problem must inherently possess. How do "
           "these enable the problem to satisfy the evaluation criteria? " + marks("10 marks"),
           "Identify and explain any six common errors in the selection of a research problem. "
           "For each, provide a CS-specific example and a corrective measure. " + marks("10 marks"),
           "&ldquo;A good research problem is one that is both intrinsically valuable and "
           "methodologically tractable.&rdquo; Discuss in the context of computer science "
           "research. " + marks("8 marks"),
           "Evaluate the problem &ldquo;Improving the efficiency of search engines using "
           "artificial intelligence&rdquo; against the criteria. Suggest a refined formulation. "
           + marks("10 marks")]),

    sub("10.3 Applied and Diagnostic Questions", "s10-3"),
    box("eg", "Diagnose these",
        p("Three research titles are given below. Identify which is a well-formulated research "
          "problem and justify your choice using the criteria and characteristics.")
        + ol(["&ldquo;A Study of Cloud Computing.&rdquo;",
              "&ldquo;Evaluating the Impact of Containerisation on the Cold-Start Latency of "
              "Serverless Functions in Multi-Cloud Environments.&rdquo;",
              "&ldquo;Everything About Computers.&rdquo;"])
        + p("Then: a PhD scholar wishes to study the fairness of facial recognition systems "
            "across demographic groups. Using the checklist in Section 8, evaluate whether "
            "this is a well-formulated problem, identify gaps in formulation, and propose "
            "refinements.")),

    sec(11, "Suggested Further Reading", "s11"),
    ol(["Kothari, C. R., &amp; Garg, G. (2019). <em>Research Methodology: Methods and "
        "Techniques</em> (4th ed.). New Age International. &mdash; Chapters 2 and 3 cover "
        "problem formulation and criteria in depth.",
        "Creswell, J. W., &amp; Creswell, J. D. (2018). <em>Research Design</em> (5th ed.). "
        "SAGE. &mdash; Chapter 4 on problem statement formulation.",
        "Sekaran, U., &amp; Bougie, R. (2016). <em>Research Methods for Business</em> "
        "(7th ed.). Wiley. &mdash; Chapter 4 on criteria and characteristics.",
        "Bryman, A. (2016). <em>Social Research Methods</em> (5th ed.). Oxford University "
        "Press.",
        "Wohlin, C., et al. (2012). <em>Experimentation in Software Engineering</em>. Springer. "
        "&mdash; CS-specific guidance on formulating research problems."]),
])
