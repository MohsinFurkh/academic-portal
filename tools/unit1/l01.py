# -*- coding: utf-8 -*-
"""Unit I - Lecture 1: Understanding the Research Problem."""
from kit import box, eq, marks, ol, p, qlist, sec, sub, table, tw, ul

STEM = "CSEG3060_Unit1_L01_Understanding_Research_Problem_Notes"

HUB_LINKS = [(STEM + ".html", "Notes &rarr;"),
             ("CSEG3060_Unit1_L01_Understanding_Research_Problem.pdf", "Slides (PDF) &rarr;")]

NOTES_META = {
    "title": "CSEG3060 · Unit I · Lecture 1 Notes — Understanding the Research Problem",
    "desc": ("Student notes for Unit I Lecture 1 of CSEG3060: the meaning of a research "
             "problem and how it differs from a topic, its methodological, theoretical, "
             "practical and personal significance, the primary, secondary and tertiary "
             "sources from which problems emerge, and the five-phase process and techniques "
             "for identifying one."),
    "unitno": "Unit I",
    "lecno": "1",
    "lectitle": "Understanding the Research Problem",
    "subline": ("Meaning and significance, sources, and identification &middot; 60 minutes "
                "(two-slot delivery) &middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO1", "Problem vs topic", "Significance", "Sources",
               "Identification process"],
    "pager": [("index.html", "&larr; Unit I contents"),
              ("CSEG3060_Unit1_L02_Criteria_and_Characteristics_Notes.html",
               "Lecture 2: Criteria and Characteristics &rarr;")],
    "deck": "CSEG3060_Unit1_L01_Understanding_Research_Problem.pdf",
    "decklabel": "Lecture 1 slides (PDF)",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO1",
        p("Understand the meaning, significance and foundational components of research, "
          "including the formulation and evaluation of research problems.")
        + p("Research is the systematic and rigorous pursuit of knowledge through structured "
            "inquiry. In computer science, where the pace of change is rapid and the boundary "
            "between applied and theoretical work is porous, <span class=\"kw\">formulating a "
            "clear research problem is the single most consequential decision a researcher "
            "makes</span>. A poorly conceived problem compromises the validity, feasibility "
            "and contribution of the whole effort, however sophisticated the methodology that "
            "follows.")),

    box("exam", "How to use these notes",
        p("Two things in this lecture are examined most often: the "
          "<span class=\"kw\">topic-versus-problem distinction</span> in Section 2.5, and the "
          "<span class=\"kw\">sources</span> enumerated in Section 4. Both reward a "
          "computer-science example rather than a generic one.")
        + p("The descending hierarchy in Section 3.3 &mdash; theme, topic, problem, question, "
            "objective &mdash; is the most useful diagnostic in the unit. Apply it to your own "
            "project: whichever level you stall at is the level you have not yet done the "
            "work on.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["Define and distinguish a <em>problem</em> from a <em>research problem</em>.",
        "Articulate the academic, practical and societal significance of a well-formulated "
        "research problem.",
        "Enumerate and critically evaluate the primary sources of research problems in "
        "computer science.",
        "Apply structured techniques for the identification and initial screening of research "
        "problems.",
        "Recognise the typical errors committed during research problem selection."]),

    sec(2, "Key Concepts and Definitions", "s2"),
    sub("2.1 Problem", "s2-1"),
    p("A <span class=\"kw\">problem</span> is any situation, condition or phenomenon that "
      "exhibits a discernible gap between an existing state (<em>what is</em>) and a desired "
      "state (<em>what ought to be</em>). In everyday language a problem may be trivial, "
      "ambiguous or merely descriptive."),

    sub("2.2 Research Problem", "s2-2"),
    box("def", "Definition &mdash; Research problem",
        p("A <span class=\"kw\">research problem</span> is a specific, well-articulated and "
          "researchable issue arising from a recognised gap in knowledge, theory or practice. "
          "It must be amenable to systematic investigation using scientific methods, and its "
          "investigation must contribute to the body of existing knowledge.")),
    p("Formally, a research problem can be expressed as:"),
    eq("R = f( G, Q, F )", "the research problem"),
    p("where <span class=\"mv\">R</span> denotes the research problem, "
      "<span class=\"mv\">G</span> the identified gap or deficiency, "
      "<span class=\"mv\">Q</span> the research questions to be addressed, and "
      "<span class=\"mv\">F</span> the feasibility constraints within which the inquiry is to "
      "be conducted."),

    sub("2.3 Problem Statement and Research Question", "s2-3"),
    ul(["A <span class=\"kw\">problem statement</span> is the textual and logical articulation "
        "of the research problem. It situates the problem in its disciplinary context, "
        "justifies its significance, and previews the general approach to be adopted.",
        "A <span class=\"kw\">research question</span> is a focused interrogative that "
        "operationalises the problem statement, translating it into specific, answerable "
        "inquiries. Research questions typically address <em>what</em>, <em>how</em>, "
        "<em>why</em> or <em>to what extent</em>."]),

    sub("2.4 Research Topic versus Research Problem", "s2-4"),
    tw(table(["Aspect", "Research topic", "Research problem"], [
        ["Scope", "Broad area of interest", "Specific issue within the topic"],
        ["Nature", "Descriptive label", "Investigative question"],
        ["Formulation", "Often a noun phrase",
         "Usually an interrogative or declarative proposition"],
        ["Investigation", "Not directly investigable",
         "Directly investigable using scientific methods"],
        ["Example", "Machine Learning in Healthcare",
         "Mitigating demographic bias in chest X-ray classification models"],
    ])),
    box("caution", "Why this distinction matters",
        p("Students frequently begin their theses with <em>topics</em> rather than "
          "<em>problems</em>, which leads to vague, unfocused and ultimately unmanageable "
          "research designs. If your project can be named but not asked as a question, you "
          "still have a topic.")),

    sec(3, "The Meaning of a Research Problem", "s3"),
    sub("3.1 What Kind of Thing a Research Problem Is", "s3-1"),
    p("A research problem is not merely an inconvenience or a difficulty; it is a "
      "<span class=\"kw\">structured epistemic encounter with the unknown</span>. In computer "
      "science the unknown manifests in several forms:"),
    ul(["A previously unstudied phenomenon &mdash; for instance emergent behaviour in large "
        "language model agents.",
        "An unresolved inconsistency in the literature &mdash; conflicting performance claims "
        "of competing algorithms.",
        "A practical constraint that lacks a satisfactory solution &mdash; latency in "
        "real-time edge AI inference.",
        "A theoretical proposition awaiting empirical verification."]),
    p("The research problem occupies the ontological core of any research endeavour: it "
      "defines <em>what is to be known</em> and constrains <em>how that knowing is to be "
      "pursued</em>."),

    sub("3.2 Components of a Well-Formulated Problem", "s3-2"),
    ol(["<span class=\"kw\">Problem domain identification</span> &mdash; the broad subject "
        "area in which the problem resides (natural language processing, distributed systems, "
        "software engineering).",
        "<span class=\"kw\">Gap specification</span> &mdash; a precise articulation of what is "
        "missing, unresolved or contradictory in current knowledge.",
        "<span class=\"kw\">Contextualisation</span> &mdash; the situational, technological or "
        "societal context that renders the problem relevant.",
        "<span class=\"kw\">Population or subject definition</span> &mdash; the entities "
        "(software systems, users, algorithms, datasets) under investigation.",
        "<span class=\"kw\">Variable identification</span> &mdash; the key constructs whose "
        "relationships or behaviours are to be examined.",
        "<span class=\"kw\">Preliminary boundaries</span> &mdash; the scope constraints "
        "delineating what is included and excluded."]),

    sub("3.3 The Hierarchy of Inquiry", "s3-3"),
    eq("Research theme &rarr; Research topic &rarr; Research problem &rarr; Research "
       "question(s) &rarr; Research objective(s)", "the descending hierarchy"),
    box("eg", "The hierarchy worked through",
        ul(["<span class=\"kw\">Theme:</span> deep learning for medical image analysis.",
            "<span class=\"kw\">Topic:</span> explainability of diagnostic models.",
            "<span class=\"kw\">Problem:</span> the lack of clinically interpretable "
            "explanations for transformer-based radiology models.",
            "<span class=\"kw\">Question:</span> how do post-hoc explanation techniques "
            "compare in conveying clinically meaningful information to radiologists?",
            "<span class=\"kw\">Objective:</span> to evaluate three explanation techniques "
            "across 200 chest X-ray predictions."])
        + p("This descending hierarchy is a powerful diagnostic for assessing the maturity of "
            "any research formulation. The level at which you stall is the level at which the "
            "thinking has not yet been done.")),

    sec(4, "Significance of the Research Problem", "s4"),
    p("The research problem is the fulcrum on which the entire project balances. Its "
      "significance can be enumerated across four dimensions."),
    sub("4.1 Methodological Significance", "s4-1"),
    p("The choice of problem dictates the choice of methodology. A problem seeking causal "
      "explanation demands experimental or quasi-experimental design; one seeking in-depth "
      "understanding of user experience demands qualitative inquiry; one seeking measurable "
      "improvement in system performance demands benchmark-driven evaluation. An ill-defined "
      "problem forces the researcher into inappropriate methodologies, producing results that "
      "are technically valid but practically irrelevant."),
    sub("4.2 Theoretical Significance", "s4-2"),
    p("A well-formulated problem contributes to theory construction, refinement or extension. "
      "In computing this may take the form of new algorithms, complexity bounds, formal "
      "models or architectural frameworks. Without a strong problem foundation, theoretical "
      "contributions tend to be incremental, fragmented or ad hoc."),
    sub("4.3 Practical and Societal Significance", "s4-3"),
    p("In an applied discipline, problems are often judged by practical relevance. A problem "
      "addressing an industry pain point (reducing false positives in fraud detection), a "
      "societal challenge (accessibility of digital interfaces for persons with disabilities) "
      "or an environmental concern (energy-efficient training of deep learning models) "
      "carries tangible impact."),
    sub("4.4 Personal and Academic Significance", "s4-4"),
    p("For the individual researcher, the problem shapes the entire scholarly trajectory. A "
      "well-chosen problem sustains motivation through the inevitable setbacks of empirical "
      "work, opens pathways for publication, and forms the basis of doctoral or postdoctoral "
      "work."),
    box("caution", "The cost of a poorly defined problem",
        ul(["<span class=\"kw\">Methodological mismatch</span> &mdash; applying inappropriate "
            "instruments or techniques.",
            "<span class=\"kw\">Scope creep</span> &mdash; continuous expansion that renders "
            "the project unfinishable.",
            "<span class=\"kw\">Invalid conclusions</span> &mdash; inferences the data cannot "
            "support, because the question was poorly framed.",
            "<span class=\"kw\">Wasted resources</span> &mdash; months or years spent on "
            "questions the literature has already answered.",
            "<span class=\"kw\">Publication rejection</span> &mdash; manuscripts are routinely "
            "desk-rejected for vagueness of problem."])),

    sec(5, "Sources of Research Problems", "s5"),
    p("Research problems in computer science originate from a remarkably diverse set of "
      "sources. A mature researcher cultivates habits of attention across several channels."),

    sub("5.1 Primary Sources", "s5-1"),
    p("Those encountered directly through the researcher's own engagement with the field."),
    ul(["<span class=\"kw\">Personal experience and practice.</span> Practitioners who have "
        "spent years in development, system administration or data engineering develop an "
        "intuitive sense of recurring inefficiencies and unmet needs. A developer who has "
        "repeatedly struggled to debug microservices may formulate a problem on automated "
        "root-cause analysis.",
        "<span class=\"kw\">Direct observation.</span> Watching how users interact with "
        "technology, how developers collaborate, or how systems fail in production surfaces "
        "problems invisible from the theoretical level.",
        "<span class=\"kw\">Industrial experience and internships.</span> Internships, "
        "capstone projects and industry collaborations expose students to practical "
        "constraints not addressed in the academic literature."]),

    sub("5.2 Secondary Sources", "s5-2"),
    p("Those accessed through the documented work of others."),
    ul(["<span class=\"kw\">Academic literature</span> &mdash; the most disciplined source. "
        "Journal articles, conference proceedings and reviews routinely identify gaps in the "
        "form of &ldquo;future work&rdquo;, &ldquo;limitation&rdquo;, &ldquo;unresolved "
        "issue&rdquo; and &ldquo;open question&rdquo;. A systematic scan of top-tier venues "
        "&mdash; NeurIPS, ICSE, SIGCOMM, CCS, IEEE S&amp;P &mdash; reveals patterns of "
        "unresolved questions that aggregate into a coherent problem.",
        "<span class=\"kw\">Theses and dissertations</span> &mdash; these conclude with "
        "explicit suggestions for further research, valuable because they have already passed "
        "peer scrutiny.",
        "<span class=\"kw\">Books and monographs</span> &mdash; authoritative texts articulate "
        "the foundational problems of a sub-discipline and trace their evolution (Cormen et "
        "al. on algorithms, Tanenbaum and Van Steen on distributed systems, Sommerville on "
        "software engineering).",
        "<span class=\"kw\">Patents and industrial publications</span> &mdash; patents "
        "disclose novel solutions and, by implication, the problems they solve. Industrial "
        "white papers from Google, Microsoft, IBM and Meta often articulate research problems "
        "years before they appear in academic venues.",
        "<span class=\"kw\">Funding agency calls</span> &mdash; calls from DST, SERB and MeitY "
        "in India, or NSF, DARPA and the ERC internationally, articulate priorities and "
        "identify problems of strategic importance.",
        "<span class=\"kw\">Standards and regulatory documents</span> &mdash; ISO, IEEE, NIST "
        "and similar bodies identify technical problems requiring resolution for "
        "interoperability, security or performance."]),

    sub("5.3 Tertiary Sources", "s5-3"),
    ul(["<span class=\"kw\">Discussions with peers and mentors.</span> Supervisors and senior "
        "researchers hold contextual knowledge that points to promising problems.",
        "<span class=\"kw\">Conferences, workshops and symposia.</span> Live discussion "
        "surfaces disagreements and unexplored intersections; the questions raised after a "
        "presentation are particularly good indicators of unresolved issues.",
        "<span class=\"kw\">Online communities.</span> Stack Overflow, ResearchGate, arXiv "
        "comment threads, GitHub issue trackers and specialised mailing lists reveal recurring "
        "pain points."]),

    sub("5.4 Sources Particular to Computer Science", "s5-4"),
    tw(table(["Source type", "Example", "Typical problem type"], [
        ["Open-source issue trackers", "GitHub issues on TensorFlow",
         "Reproducibility, performance bugs"],
        ["Benchmark leaderboards", "Papers With Code", "Performance gaps in specific tasks"],
        ["Kaggle competitions", "Past competition problems", "Real-world data science challenges"],
        ["Industry tech blogs", "Google AI Blog, Meta Research", "Emerging research directions"],
        ["Government reports", "AI safety reports", "Sociotechnical problems"],
        ["CVE databases", "Common Vulnerabilities and Exposures", "Cybersecurity research gaps"],
    ])),

    sec(6, "Identification of the Research Problem", "s6"),
    p("Identification differs from <em>selection</em>: identification surfaces candidate "
      "problems from the broader landscape, whereas selection evaluates them against criteria "
      "(the subject of Lectures 2 and 3)."),

    sub("6.1 The Five-Phase Identification Process", "s6-1"),
    ol(["<span class=\"kw\">Broad familiarisation.</span> Immerse in the domain through a "
        "survey of recent literature, textbooks and proceedings, developing a working mental "
        "map of its contours.",
        "<span class=\"kw\">Deliberate gap search.</span> Search for &ldquo;future "
        "work&rdquo;, &ldquo;limitation&rdquo; and &ldquo;open challenge&rdquo; in recent "
        "reviews; examine reference lists of seminal works for threads that have remained "
        "dormant; compare competing approaches to identify unresolved trade-offs.",
        "<span class=\"kw\">Question articulation.</span> For each candidate gap, write a "
        "provisional research question. A useful heuristic: attempt it in a single declarative "
        "sentence. If that proves impossible, the question is not yet mature.",
        "<span class=\"kw\">Preliminary feasibility check.</span> Check availability of data, "
        "instruments, expertise and time. Problems that fail are set aside or deferred.",
        "<span class=\"kw\">Refinement and crystallisation.</span> Refine the survivors "
        "through iterative writing, peer discussion and supervisor consultation until a "
        "single, well-articulated problem emerges."]),

    sub("6.2 Techniques for Problem Identification", "s6-2"),
    ul(["<span class=\"kw\">Literature-driven identification</span> &mdash; the most common "
        "technique: a systematic or scoping review, documented using PRISMA, synthesised into "
        "a conceptual map that visualises the structure of knowledge and its gaps.",
        "<span class=\"kw\">Curiosity-driven identification</span> &mdash; less structured but "
        "often more creative. The researcher keeps a research journal of observations, "
        "questions and intuitions over weeks or months; patterns that emerge frequently "
        "crystallise into problems.",
        "<span class=\"kw\">The Delphi technique</span> &mdash; a structured communication "
        "method in which a panel of experts answers questionnaires over multiple rounds. "
        "Anonymity reduces conformity pressure and surfaces non-obvious problems; "
        "particularly useful at disciplinary intersections.",
        "<span class=\"kw\">Brainstorming and focus groups</span> &mdash; used less often in "
        "computing, but valuable in human-centred computing, HCI and educational technology.",
        "<span class=\"kw\">Problem tree analysis</span> &mdash; borrowed from development "
        "research: identify the focal issue, then enumerate its causes (roots) and effects "
        "(branches). The problem may emerge from prioritising one of these.",
        "<span class=\"kw\">Concept mapping</span> &mdash; visual representation of "
        "relationships among concepts. Maps frequently reveal clusters of densely "
        "interconnected concepts separated by sparse connections, and "
        "<em>the sparse connections often indicate research opportunities</em>."]),

    sub("6.3 Natural versus Artifactual Problems", "s6-3"),
    box("def", "Wohlin et al. (2012)",
        ul(["<span class=\"kw\">Natural problems</span> &mdash; encountered in the wild, "
            "typically through industry collaboration.",
            "<span class=\"kw\">Artifactual problems</span> &mdash; constructed for the "
            "purpose of experimentation, typically in controlled settings."])
        + p("Each type has implications for the <em>external validity</em> of the resulting "
            "research. Researchers should consciously identify which they are pursuing and "
            "structure the methodology accordingly.")),

    sec(7, "Illustrative Case Studies", "s7"),
    box("eg", "Case A &mdash; explainability in deep learning for medical diagnosis",
        p("<span class=\"kw\">Source:</span> published literature on deep learning for "
          "radiology, supplemented by clinical observation during a hospital internship.")
        + p("<span class=\"kw\">Gap:</span> models achieve high diagnostic accuracy but "
            "produce outputs radiologists find difficult to interpret, limiting clinical "
            "adoption.")
        + p("<span class=\"kw\">Refined problem:</span> &ldquo;How do post-hoc explanation "
            "methods (Grad-CAM, LIME, SHAP) compare in supporting diagnostic reasoning by "
            "radiologists using transformer-based chest X-ray classifiers?&rdquo;")),
    box("eg", "Case B &mdash; energy efficiency in large language model training",
        p("<span class=\"kw\">Source:</span> industry white papers and personal observation "
          "during a research internship.")
        + p("<span class=\"kw\">Gap:</span> training consumes substantial energy, but the "
            "contribution of individual architectural choices is poorly characterised.")
        + p("<span class=\"kw\">Refined problem:</span> &ldquo;What is the relative "
            "contribution of attention mechanism variants to the energy consumption of "
            "transformer training, and how does this interact with model size?&rdquo;")),
    box("eg", "Case C &mdash; technical debt in machine learning systems",
        p("<span class=\"kw\">Source:</span> industry experience combined with surveys of the "
          "software engineering literature.")
        + p("<span class=\"kw\">Gap:</span> traditional technical-debt frameworks do not "
            "capture ML-specific debts &mdash; data dependencies, model staleness, feedback "
            "loops.")
        + p("<span class=\"kw\">Refined problem:</span> &ldquo;How can existing technical debt "
            "taxonomies be extended to capture ML-specific debt in production systems, and "
            "what evidence supports the prevalence of each category?&rdquo;")),

    sec(8, "Common Errors in Selection: A Preview", "s8"),
    p("A detailed treatment belongs to Lectures 2 and 3, but preliminary awareness is "
      "valuable. Researchers commonly select a problem that is:"),
    ol(["too broad to be investigated within the available resources;",
        "already conclusively addressed in the literature;",
        "driven primarily by technical fashion rather than genuine intellectual or practical "
        "need;",
        "dependent on data or instruments that are inaccessible;",
        "insignificant &mdash; interesting to the researcher but immaterial to the field;",
        "infeasible for ethical, technical or logistical reasons."]),

    sec(9, "Summary", "s9"),
    ul(["A research problem is a specific, researchable articulation of a gap between existing "
        "and desired knowledge &mdash; more precise and methodologically tractable than a "
        "general topic.",
        "Its significance is multidimensional: <span class=\"kw\">methodological, theoretical, "
        "practical and personal</span>.",
        "Sources are diverse, spanning personal experience, observation, academic literature, "
        "industrial practice, funding calls and online communities. Computing enjoys a "
        "particularly rich ecosystem through open-source repositories, benchmark platforms and "
        "industry publications.",
        "Identification is a structured five-phase process &mdash; familiarisation, gap search, "
        "question articulation, feasibility assessment, refinement &mdash; assisted by "
        "systematic review, the Delphi method and concept mapping.",
        "A clear hierarchy descends from theme to topic to problem to question to objective, "
        "providing a diagnostic for formulation maturity."]),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Key terms to define without reference",
        ul(["Problem versus research problem",
            "Research problem versus research question",
            "Problem statement versus problem formulation",
            "Primary, secondary and tertiary sources",
            "Systematic literature review; PRISMA",
            "Delphi technique; concept mapping",
            "Natural versus artifactual problems"])),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Differentiate between a research topic and a research problem. Illustrate with a "
           "computer science example. " + marks("3 marks"),
           "Why is the formulation of a research problem considered the most critical step in "
           "the research process? " + marks("3 marks"),
           "Enumerate four sources of research problems relevant to computer science and "
           "briefly explain each. " + marks("4 marks"),
           "Explain the role of the literature review in identifying a research problem. "
           + marks("3 marks"),
           "What is the Delphi technique, and how does it assist in problem identification? "
           + marks("3 marks"),
           "Distinguish between natural and artifactual problems in software engineering "
           "research. " + marks("2 marks")]),

    sub("10.2 Long-Answer Questions", "s10-2"),
    qlist(["Discuss the meaning and significance of a research problem in computer science. "
           "With suitable examples, illustrate how a broad research area is progressively "
           "narrowed into a well-defined research problem. " + marks("15 marks"),
           "Critically examine the various sources from which research problems in computer "
           "science may be identified. Which sources do you consider most reliable, and why? "
           + marks("10 marks"),
           "Describe the structured process of identifying a research problem. Explain at "
           "least three techniques employed during the identification phase, with computing "
           "examples. " + marks("12 marks"),
           "A student wishes to undertake research on &ldquo;artificial intelligence in "
           "healthcare&rdquo;. Guide the student through the formulation of a well-defined "
           "research problem, citing appropriate sources and techniques. " + marks("15 marks")]),

    sub("10.3 Applied Exercise and Reflective Prompt", "s10-3"),
    box("eg", "Applied exercise",
        p("Select one theme: generative AI for software engineering; blockchain-based identity "
          "management; quantum-resistant cryptographic algorithms; edge AI for autonomous "
          "systems; or privacy-preserving machine learning. Within one week, submit a maximum "
          "of 1,500 words that:")
        + ol(["identifies at least three candidate research problems within the theme, citing "
              "the source from which each was identified;",
              "refines one of them into a single, well-articulated problem statement;",
              "justifies its significance across academic, practical and societal dimensions;",
              "gives a preliminary feasibility assessment with respect to data, "
              "instrumentation and time."])),
    box("callout", "Reflective prompt",
        p("Before the next lecture, keep a research journal for one week recording every "
          "instance in which you encounter a difficulty, limitation or unresolved question in "
          "your daily academic or computational work. Bring it to the next session; it becomes "
          "the basis of the first classroom exercise in problem identification.")),

    sec(11, "Reading and References", "s11"),
    ol(["Creswell, J. W., &amp; Creswell, J. D. (2018). <em>Research Design: Qualitative, "
        "Quantitative, and Mixed Methods Approaches</em> (5th ed.). SAGE.",
        "Kothari, C. R. (2004). <em>Research Methodology: Methods and Techniques</em> "
        "(2nd ed.). New Age International.",
        "Kumar, R. (2014). <em>Research Methodology: A Step-by-Step Guide for Beginners</em> "
        "(4th ed.). SAGE.",
        "Sekaran, U., &amp; Bougie, R. (2016). <em>Research Methods for Business</em> "
        "(7th ed.). Wiley.",
        "Wohlin, C., Runeson, P., H&ouml;st, M., Ohlsson, M. C., Regnell, B., &amp; "
        "Wessl&eacute;n, A. (2012). <em>Experimentation in Software Engineering</em>. "
        "Springer."]),
])
