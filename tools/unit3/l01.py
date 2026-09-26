# -*- coding: utf-8 -*-
"""Unit III - Lecture 1: Introduction to Effective Literature Studies."""
from kit import (card, flow, goals, grid, marks, ol, p, rule, stack, table, ul,
                 box, qlist, sec, sub, tw)

STEM = "CSEG3060_Unit3_L01_Effective_Literature_Studies"
RUNNER = "CSEG3060 · Unit III · Lecture 1 — Effective Literature Studies"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 1 — Introduction to Effective Literature Studies",
    "desc": ("Unit III Lecture 1 for Research Methodology in Computer Science "
             "(CSEG3060): what a literature study is, its eight objectives, the five "
             "dimensions of scope, its significance at four levels, and why it is the "
             "ethical foundation of research."),
    "runner": RUNNER,
}

# ----------------------------------------------------------------- slides ----

SLIDES = [
    # 1
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Introduction to Effective Literature Studies",
     "body": stack([
         p("Objectives, scope and significance in research", "lead",
           "max-width:820px;color:var(--mint)"),
         card(p("Ethical research begins in the library, not in the laboratory.", None,
                "margin:0;font-size:22px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 1 of 8 · 60 minutes · B.Tech (CSE) Semester V",
           "fine", "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},
    # 2
    {"title": "Learning outcomes", "kicker": "Learning outcomes · CO2",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Define** a literature study and separate it from general or casual reading",
         "**Articulate** the principal objectives a literature study must achieve",
         "**Describe** its scope across sources, time, disciplines and methods",
         "**Explain** its significance as the foundation of rigorous, ethical research",
         "**Recognise** how literature studies connect to research ethics — the Unit III theme",
     ]), None, "fill")},
    # 3
    {"title": "What it is — and is not", "kicker": "Foundational definition",
     "h": "A literature study is an argument, not a summary",
     "body": stack([
         rule("The methodical <b>identification, selection, evaluation and synthesis</b> "
              "of existing scholarly works relevant to a research question — conducted "
              "to establish the state of knowledge and to justify new research."),
         grid([
             card(p("Without method it becomes a casual bibliography: sources accumulate, "
                    "nothing is decided.", "small", "margin:0"), "Methodical", "rust"),
             card(p("Without appraisal it only paraphrases: every source is treated as "
                    "equally authoritative.", "small", "margin:0"), "Critical", "rust"),
             card(p("Without synthesis it advances nothing: five summaries are still five "
                    "summaries.", "small", "margin:0"), "Synthetic", "rust"),
         ], "1fr 1fr 1fr"),
         grid([
             card(ul(["Paper 1 says…", "Paper 2 says…", "Paper 3 says…"],
                     None, "margin:0;font-size:14px"),
                  "Annotated bibliography — lists", "tint"),
             card(ul(["Where the field agrees", "Where it contradicts itself",
                      "What nobody has yet asked"], None, "margin:0;font-size:14px"),
                  "Literature study — adjudicates", "teal"),
         ]),
     ], 12)},
    # 4
    {"title": "The CS evidence landscape", "kicker": "Where the evidence lives",
     "h": "Six source categories — and why journals alone are not enough",
     "body": stack([
         grid([
             card(p("IEEE Transactions, ACM Computing Surveys, JMLR.", "small", "margin:0"),
                  "Peer-reviewed journals"),
             card(p("NeurIPS, ICSE, SIGCOMM, CVPR. In computing these are <b>archival</b>, "
                    "not preliminary.", "small", "margin:0"), "Conference proceedings", "rust"),
             card(p("Books, monographs, and doctoral theses — the most exhaustive reviews "
                    "available on a narrow topic.", "small", "margin:0"), "Books &amp; dissertations"),
             card(p("Microsoft Research, Google DeepMind. Results of real consequence "
                    "outside conventional venues.", "small", "margin:0"), "Technical reports"),
             card(p("ISO, IEEE, NIST, W3C specifications — normative wording that must be "
                    "quoted, not paraphrased.", "small", "margin:0"), "Standards &amp; patents"),
             card(p("arXiv, SSRN, white papers. Indispensable for currency; unrefereed.",
                    "small", "margin:0"), "Grey literature"),
         ], "1fr 1fr 1fr", gap="11px"),
         rule("Consequence: a CS literature study confined to journal articles alone "
              "is <b>systematically incomplete</b>."),
     ], 12)},
    # 5
    {"title": "Objectives 1–2", "kicker": "Objectives · 1 of 3",
     "h": "State of the art, and the five kinds of gap",
     "body": stack([
         grid([
             card(p("Map the theories, algorithms, architectures, datasets, benchmarks and "
                    "findings that already exist. Without this map you cannot "
                    "<b>legitimately</b> claim to address an open problem.", "small", "margin:0"),
                  "1 · Establish the state of the art", "teal"),
             card(p("The review is the mechanism by which gaps surface — and "
                    "<b>the articulation of a gap is itself a contribution</b>.", "small", "margin:0"),
                  "2 · Identify research gaps", "teal"),
         ]),
         table(["Gap type", "What is missing", "CS example"], [
             ["**Knowledge**", "An unanswered empirical or conceptual question",
              "No study measures energy cost of this layer"],
             ["**Methodological**", "No adequate method, tool or metric",
              "No benchmark exists for the task"],
             ["**Theoretical**", "No framework explains a class of observations",
              "No account of why scaling helps here"],
             ["**Population / context**", "An under-studied dataset, domain or region",
              "Never evaluated on non-English corpora"],
             ["**Replication**", "Prior findings never independently validated",
              "Headline ML result never reproduced"],
         ]),
         rule("A gap is a claim <b>about the literature</b> — it must be evidenced by a "
              "documented search, never asserted because you have not read enough."),
     ], 11)},
    # 6
    {"title": "Objectives 3–5", "kicker": "Objectives · 2 of 3",
     "h": "Efficiency, refinement and method selection",
     "body": stack([
         grid([
             card(p("Prevents costly repetition of published work — acute in computing, "
                    "where architectures and benchmarks proliferate faster than anyone can "
                    "informally track.", "small", "margin:0"), "3 · Avoid duplication"),
             card(p("Reading <b>reshapes the question</b>: narrowing, broadening, "
                    "re-framing, or operationalising it in measurable terms.", "small", "margin:0"),
                  "4 · Refine problem and hypotheses", "rust"),
             card(p("The literature is a repository of validated designs, metrics, "
                    "statistical tests, simulators and tooling.", "small", "margin:0"),
                  "5 · Select methods"),
         ], "1fr 1fr 1fr"),
         grid([
             card(stack([
                 p("Before reading", "fine", "margin:0"),
                 p("“Can AI detect disease?”", "small",
                   "margin:0;font-size:17px;color:var(--rust)"),
                 p("After reading", "fine", "margin:8px 0 0"),
                 p("“Does a 3D U-Net trained on MIMIC-CXR improve segmentation Dice over "
                   "2D baselines?”", "small", "margin:0;font-size:17px;color:var(--teal)"),
             ], 3), "Objective 4 in action", "tint"),
             card(ul(["Experimental design borrowed and adapted",
                      "The metric the field actually reports",
                      "The baselines reviewers will expect",
                      "The pitfalls predecessors documented"], None, "margin:0;font-size:14px"),
                  "What Objective 5 buys you"),
         ], "1.15fr 1fr"),
         rule("Diagnostic: a student whose research question is <b>identical before and "
              "after</b> the review has almost certainly not read critically."),
     ], 11)},
    # 7
    {"title": "Objectives 6–8", "kicker": "Objectives · 3 of 3",
     "h": "Frameworks, credibility, and the ethical objective",
     "body": stack([
         grid([
             card(p("Concepts, taxonomies and theoretical lenses make new observations "
                    "interpretable rather than anecdotal.", "small", "margin:0"),
                  "6 · Build conceptual frameworks"),
             card(p("Engaging with foundational work signals that the research was not "
                    "conducted in intellectual isolation. Examiners expect this lineage.",
                    "small", "margin:0"), "7 · Establish credibility"),
             card(p("Wide reading familiarises you with attribution norms. A researcher who "
                    "has read widely is far less likely to plagiarise.", "small", "margin:0"),
                  "8 · Support ethical practice", "rust"),
         ], "1fr 1fr 1fr"),
         table(["#", "Objective", "Core function"], [
             ["1", "Establish the state of the art", "Map existing knowledge"],
             ["2", "Identify research gaps", "Justify novelty"],
             ["3", "Avoid duplication", "Ensure efficiency and originality"],
             ["4", "Refine problem and hypotheses", "Improve precision"],
             ["5", "Select methods", "Borrow and adapt validated tools"],
             ["6", "Build conceptual frameworks", "Provide theoretical grounding"],
             ["7", "Establish scholarly credibility", "Demonstrate engagement"],
             ["8", "Support ethical practice", "Reinforce norms of attribution"],
         ]),
     ], 11)},
    # 8
    {"title": "Scope — sources and time", "kicker": "Scope · 1 of 2",
     "h": "Declare your boundaries: sources and time horizons",
     "body": stack([
         rule("<b>Scope</b> is a deliberately declared boundary, set to prevent "
              "<i>both</i> superficial coverage and unmanageable breadth. Undeclared "
              "scope is the root of most unfair criticism a review receives."),
         grid([
             card(stack([
                 p("<b>Primary</b> — original research articles, full conference papers, patents",
                   "small", "margin:0"),
                 p("<b>Secondary</b> — surveys, reviews, meta-analyses, textbooks",
                   "small", "margin:0"),
                 p("<b>Tertiary</b> — ACM DL, IEEE Xplore, Scopus, Web of Science, DBLP",
                   "small", "margin:0"),
                 p("<b>Grey</b> — arXiv, SSRN, technical reports, dissertations",
                   "small", "margin:0"),
                 p("<b>Standards</b> — ISO, IEEE, ACM, NIST, W3C", "small", "margin:0"),
             ], 5), "Source scope — five tiers"),
             stack([
                 card(stack([
                     p("<b>Foundational</b> — Turing 1950, Dijkstra 1959", "small", "margin:0"),
                     p("<b>Contemporary</b> — the last 3–5 years: current debates, datasets, benchmarks",
                       "small", "margin:0"),
                     p("<b>Emerging</b> — preprints signalling future direction", "small", "margin:0"),
                 ], 4), "Temporal scope — three horizons", "teal"),
                 card(p("<b>60–70%</b> of citations from the last five years, while "
                        "deliberately retaining the classics that anchor your lineage.",
                        "small", "margin:0"), "Working heuristic", "tint"),
             ], 11),
         ]),
         card(p("Common error: relying only on secondary sources. Citing a survey's "
                "characterisation of a paper rather than the paper itself propagates any "
                "error the survey made — and examiners can detect it.", "small", "margin:0"),
              None, "rust"),
     ], 11)},
    # 9
    {"title": "Scope — discipline and bias", "kicker": "Scope · 2 of 2",
     "h": "Disciplinary, methodological and geographic boundaries",
     "body": stack([
         grid([
             card(stack([
                 p("A review of <b>deep learning for medical image segmentation</b> must traverse:",
                   "small", "margin:0"),
                 ul(["Core CS — ML, vision, software engineering",
                     "Applied mathematics — optimisation, probability, linear algebra",
                     "Domain — radiology, biomedical imaging, clinical workflow",
                     "Ethics and policy — data privacy, regulation"],
                    None, "margin:0;font-size:14px"),
                 p("Because interdisciplinary literatures are unbounded, state which "
                   "neighbouring fields are <b>in</b> scope and which are excluded, with reasons.",
                   "small", "margin:0"),
             ], 6), "Disciplinary scope"),
             stack([
                 card(p("Represent the field's methods — theoretical analysis, simulation, "
                        "controlled experiment, case study, design science — so your own "
                        "design is justified <b>by contrast or extension</b>, not by default.",
                        "small", "margin:0"), "Methodological scope", "teal"),
                 card(stack([
                     p("<b>Geographical bias</b> — over-reliance on Anglo-American literature",
                       "small", "margin:0"),
                     p("<b>Linguistic bias</b> — excluding significant non-English work",
                       "small", "margin:0"),
                     p("These shape whose problems count as important and whose datasets "
                       "count as representative.", "fine", "margin:0"),
                 ], 4), "Two biases to check for", "rust"),
             ], 11),
         ], "1.1fr 1fr"),
     ], 12)},
    # 10
    {"title": "Significance at four levels", "kicker": "Significance",
     "h": "Why it matters — at four levels",
     "body": stack([
         grid([
             card(p("The foundation for every later stage. Without it the design is poorly "
                    "motivated, the contribution unclear, the evaluation criteria "
                    "unjustified.", "small", "margin:0"), "1 · Project"),
             card(p("Builds critical reasoning, synthesis, disciplinary vocabulary, and the "
                    "capacity to position your work in a live conversation.", "small", "margin:0"),
                  "2 · Researcher", "teal"),
             card(p("Aggregated across a community, reviews identify trends, controversies "
                    "and frontiers, and give newcomers a defensible entry point.",
                    "small", "margin:0"), "3 · Discipline"),
             card(p("As computing governs decisions, surveillance, healthcare and transport, "
                    "the review is how researchers meet the social, legal and ethical "
                    "consequences of their work.", "small", "margin:0"), "4 · Society", "rust"),
         ], "1fr 1fr 1fr 1fr", gap="11px"),
         rule("Examinable distinction — <b>scope</b> is coverage: <i>what is included</i>. "
              "<b>Significance</b> is importance: <i>why it matters</i>. They are routinely "
              "tested against each other."),
         card(p("A review of facial recognition that never engages the literature on "
                "demographic error-rate disparity has met a technical standard while "
                "failing a societal one.", "small", "margin:0"), "Societal level, concretely", "tint"),
     ], 12)},
    # 11
    {"title": "The ethical foundation", "kicker": "Unit III thesis", "dark": True,
     "h": "The literature study is the ethical foundation of research",
     "body": stack([
         card(p("Ethical research practice begins <b>long before data collection</b>. "
                "This unit pairs literature studies with ethics because the two are "
                "causally linked — not merely adjacent.", "small",
                "margin:0;font-size:17px"), None, "dark", "border-color:#2b5360"),
         grid([
             card(p("Attribute ideas correctly and avoid plagiarism.", "small", "margin:0"),
                  None, "dark"),
             card(p("Recognise prior contributions; respect intellectual property.",
                    "small", "margin:0"), None, "dark"),
             card(p("Identify ethical controversies already debated in the literature.",
                    "small", "margin:0"), None, "dark"),
             card(p("Avoid the redundant — and ethically questionable — repetition of "
                    "completed studies.", "small", "margin:0"), None, "dark"),
         ], "1fr 1fr", gap="10px"),
         card(p("Mechanism, not exhortation: plagiarism is frequently a <b>symptom of "
                "insufficient reading</b>. A researcher who cannot restate a concept in "
                "their own words has not yet understood it.", "small",
                "margin:0;color:var(--peach)"), None, "dark", "border-color:#6a4030"),
         p("Codified in the <b>ACM Code of Ethics and Professional Conduct (2018)</b> and "
           "the <b>IEEE Code of Ethics</b> · developed further in Lectures 4–8 of this unit.",
           "fine", "color:#9fb3b6;margin:0"),
     ], 11)},
    # 12
    {"title": "Types of review", "kicker": "Practical application",
     "h": "Six types of review — and choosing between them",
     "body": stack([
         table(["Type", "Purpose", "Typical use"], [
             ["**Narrative**", "Broad overview of a topic", "Thesis background chapter"],
             ["**Systematic**", "Exhaustive, protocol-driven synthesis", "Mapping a whole evidence base"],
             ["**Meta-analysis**", "Statistical synthesis of quantitative results", "Pooling effect sizes"],
             ["**Scoping**", "Maps breadth and nature of activity", "Emerging or heterogeneous fields"],
             ["**Integrative**", "Combines empirical and theoretical work", "Mature fields needing synthesis"],
             ["**Umbrella**", "Synthesises multiple systematic reviews", "Policy or curriculum decisions"],
         ]),
         grid([
             card(ul(["The research question", "The maturity of the field",
                      "The resources available", "The depth of analysis required"],
                     None, "margin:0;font-size:14px"), "Four selection determinants", "tint"),
             card(p("A B.Tech or PG project usually embeds a <b>narrative or integrative</b> "
                    "review in a background chapter — but elements of systematic method "
                    "(predefined search strings, explicit inclusion criteria) are "
                    "increasingly expected.", "small", "margin:0"),
                  "Realistic expectation for you", "teal"),
         ], "1fr 1.25fr"),
         rule("<b>Lecture 2 preview:</b> systematic, narrative, scoping and meta-analytical "
              "methods in technical depth — PRISMA reporting, and the statistics of pooling."),
     ], 11)},
    # 13
    {"title": "Process and pitfalls", "kicker": "Practical application",
     "h": "Seven iterative stages — and where each pitfall bites",
     "body": stack([
         flow(["Define scope", "Search", "Screen", "Assess quality",
               "Extract", "Synthesise", "Report"]),
         grid([
             table(["Stage", "Pitfall that bites here"], [
                 ["Define scope", "**Bibliographic shopping** — no integrating argument"],
                 ["Search", "**Closed-system searching** — Google Scholar alone"],
                 ["Screen / assess", "**No critical appraisal** — all sources equal"],
                 ["Extract / synthesise", "**Chronological listing** instead of themes"],
                 ["Extract", "**Unmanaged references** — no Zotero or Mendeley"],
                 ["Report", "**Recency bias** · **disciplinary parochialism**"],
                 ["Report", "**Plagiarism through paraphrase** — no attribution"],
             ]),
             stack([
                 card(p("Screening commonly forces you back to the search; synthesis "
                        "regularly reveals the need to search again. Returning to an "
                        "earlier stage is evidence of a <b>maturing</b> review, not of "
                        "earlier failure.", "small", "margin:0"),
                      "The process is iterative", "teal"),
                 card(p("Install Zotero or Mendeley <b>this week</b>. Retrofitting citations "
                        "at submission time is where most accidental attribution failures "
                        "occur.", "small", "margin:0"), "One action today", "rust"),
             ], 11),
         ], "1.4fr 1fr"),
     ], 11)},
    # 14
    {"title": "Case: federated learning", "kicker": "Case study",
     "h": "Scope → state of the art → gap → contribution",
     "body": stack([
         rule("Project proposal: <b>“Federated Learning for Privacy-Preserving Healthcare "
              "Analytics”</b>"),
         grid([
             card(ul(["Foundational FL — McMahan et al., 2017",
                      "Differential privacy and secure aggregation",
                      "Healthcare datasets — MIMIC, UK Biobank",
                      "Regulation — HIPAA, GDPR",
                      "Benchmarks and evaluation metrics"],
                     None, "margin:0;font-size:14px"), "1 · Scope defined"),
             card(p("Recent surveys optimise <b>accuracy under privacy constraints</b> but "
                    "neglect communication efficiency, energy consumption, and fairness "
                    "across hospital sites with heterogeneous data.", "small", "margin:0"),
                  "2 · Gap identified", "rust"),
             card(p("A communication-efficient aggregation algorithm with formal "
                    "differential-privacy guarantees, evaluated across heterogeneous "
                    "clinical sites — a claim now <b>warranted</b> by the review.",
                    "small", "margin:0"), "3 · Contribution articulated", "teal"),
         ], "1fr 1fr 1fr", gap="11px"),
         card(p("The review must also surface literature on patient consent, secondary use "
                "of health data and bias in clinical algorithms — binding the project to "
                "the ethical theme of Unit III.", "small", "margin:0"),
              "4 · Ethical dimension", "tint"),
         card(p("<b>Your turn.</b> For “Blockchain-based Trust Management in IoT Networks”, "
                "specify (a) three source categories, (b) two foundational works, "
                "(c) one likely research gap, (d) one ethical concern the review should "
                "surface.", "small", "margin:0"), None, "rust"),
     ], 10)},
    # 15
    {"title": "Takeaways and exam focus", "kicker": "Consolidation",
     "h": "What to retain, and what the examiner asks",
     "body": stack([
         grid([
             card(ul(["**Methodical, critical, synthetic** — not casual reading, not a bibliography",
                      "**Eight objectives** — from state of the art to ethical practice",
                      "**Scope** spans sources, time, disciplines, methods, geography — and is declared",
                      "**Significance** at project, researcher, discipline and society levels",
                      "**Types** differ by purpose; the **process is iterative**",
                      "Above all, the **ethical foundation** of research"],
                     None, "margin:0;font-size:14px"), "Seven takeaways", "teal"),
             card(ol(["Write a precise **definition** and distinguish it from a colloquial “literature survey”",
                      "Know all **eight objectives**; develop any one at length with a CS example",
                      "**Scope vs significance** — coverage against importance",
                      "**Primary / secondary / tertiary** sources with a CS example of each",
                      "The **five gap types**, and three review types compared with a scenario",
                      "Always articulate the **ethics link** — the through-line of this unit"],
                     None, "margin:0;font-size:14px"), "Exam focus", "rust"),
         ], "1fr 1fr"),
         grid([
             card(p("Which single objective does your own draft review currently fail?",
                    "small", "margin:0"), "Discussion", "tint"),
             card(p("Webster &amp; Watson (2002) · Creswell &amp; Creswell (2018) · "
                    "Fink (2019) · vom Brocke et al. (2009) · ACM Code of Ethics (2018)",
                    "small", "margin:0"), "Reading", "tint"),
         ], "1fr 1.3fr"),
         p("Next — <b>Lecture 2: Approaches to Literature Review</b>: systematic, narrative, "
           "scoping and meta-analytical methods.", "fine", "margin:0"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Open with the guiding claim and leave it on screen: this unit pairs literature studies with ethics deliberately, not incidentally. Tell students the claim is argued formally on slide 11 and everything before it builds the case.",
    2: "Read the five outcomes as the assessment contract. Outcomes 2 and 3 are enumeration items; 4 and 5 demand argued answers. Flag that scope and significance are separate ideas examiners test against each other.",
    3: "This is the conceptual gate for the whole unit. Write the three adjectives on the board and return to them — each names a distinct, diagnosable failure mode in submitted work. Ask who has written an annotated bibliography dressed as a review.",
    4: "Emphasise that top-tier conferences are the primary archival venue in computing; students trained to privilege journals omit the field's most important papers. Mining related-work sections of recent dissertations is the most efficient bootstrap available.",
    5: "Press the point that 'nobody has done this' is a claim about the literature and therefore needs evidence. Use the taxonomy generatively: ask students to name a candidate gap in their own area and classify it. Replication gaps are acutely common in machine learning.",
    6: "Dwell on Objective 4 — students treat the question as fixed once approved. Frame refinement as intellectual progress, not initial error. On Objective 5, adopting the community's datasets and metrics is what makes a result comparable at all.",
    7: "Treat this table as the highest-yield artefact and say so; objective enumeration is the most predictable examination item in the unit. On Objective 8, make the mechanism concrete: plagiarism is often a symptom of thin reading.",
    8: "Insist that scope is a declared decision recorded in the methods section, not an accident of what was found. Present 60–70% as a planning heuristic: a fast-moving subfield justifies more, a theory-heavy one less.",
    9: "Ask what a purely algorithmic review of clinical segmentation would miss — typically the annotation protocol, the clinical decision context and the regulatory constraint, each of which can invalidate an excellent model. Treat the bias discussion as an ethics touchpoint.",
    10: "Put the scope-versus-significance distinction on the board and test it live with two volunteers; it is among the most reliably confused pairs in the unit. Stress to final-year students that the researcher-level benefits persist after submission.",
    11: "This slide justifies the unit's structure, so deliver it as argument rather than as warnings. Paraphrase-plagiarism typically happens at 2 a.m. about a paper that was skimmed — the remedy is earlier, deeper reading, not better disguise.",
    12: "Position this as the map before Lecture 2 supplies the terrain; the comparison will be extended to eight dimensions next session. Be explicit that nobody expects a twelve-month systematic review in one semester, but a documented search string is now the minimum standard.",
    13: "Present pitfalls at the stage where they originate — students recognise their own habits when the failure is located in a step they are about to perform. Make the reference-manager point operational and set it as this week's task.",
    14: "Run this as a worked demonstration of the whole lecture: scope becomes state of the art, which becomes a gap, which licenses a contribution, with ethics underlying all four. Note that the gap statement is specific and falsifiable, which is what distinguishes it from vague novelty claims.",
    15: "Return to the guiding claim from slide 1 and ask the class to justify it in one sentence using the four ethical capabilities. Recommend Webster and Watson (2002) as the single most useful short reading — it argues for concept-centric rather than author-centric writing.",
}

# ------------------------------------------------------------------ notes ----

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 1 Notes — Effective Literature Studies",
    "desc": ("Student notes for Unit III Lecture 1 of Research Methodology in Computer "
             "Science (CSEG3060): definition of a literature study, its eight objectives, "
             "the five dimensions of scope, significance at four levels, types of review, "
             "the iterative process, common pitfalls and the link to research ethics."),
    "lecno": "1",
    "lectitle": "Introduction to Effective Literature Studies",
    "subline": ("Objectives, scope and significance in research &middot; 60 minutes &middot; "
                "B.Tech. (Computer Science &amp; Engineering) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO2", "Definition &amp; distinction", "Eight objectives",
               "Five dimensions of scope", "Four levels of significance",
               "Ethics link"],
    "pager": [("../index.html", "&larr; Course home"),
              ("CSEG3060_Unit3_L02_Approaches_to_Literature_Review_Notes.html",
               "Lecture 2: Approaches to Literature Review &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 1 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO2",
        p("Demonstrate the ability to critically review scientific literature, identify "
          "research gaps, and apply ethical principles in conducting and reporting "
          "research.")
        + p("This lecture establishes the vocabulary &mdash; <span class=\"kw\">objectives, "
            "scope, significance</span> &mdash; against which your own project literature "
            "review will be assessed.")),

    box("exam", "How to use these notes",
        p("The single sentence to carry out of this lecture is that <em>ethical research "
          "begins in the library, not in the laboratory</em>. Sections 2&ndash;4 build the "
          "case; Section 8 states it.")
        + p("Answer pattern for the examination: <span class=\"kw\">definition &rarr; "
            "numbered points &rarr; computer-science example</span>. Sections 3 and 4 are "
            "written as numbered points for exactly this reason.")),

    sec(1, "Learning Outcomes", "s1"),
    ol(["Define literature studies and distinguish them from general or casual reading.",
        "Articulate the principal objectives that a literature study is expected to achieve.",
        "Describe the scope of literature studies in terms of sources, time horizons, "
        "disciplines and methodologies.",
        "Explain the significance of literature studies as the foundation of rigorous and "
        "ethical research.",
        "Recognise the relationship between effective literature studies and research "
        "ethics &mdash; the central theme of Unit III."]),

    sec(2, "What is a Literature Study?", "s2"),
    box("def", "Definition &mdash; Literature study",
        p("A <span class=\"kw\">literature study</span> is the methodical identification, "
          "selection, evaluation and synthesis of existing scholarly works that are directly "
          "relevant to a research question, conducted to establish the state of knowledge "
          "and to justify the need for new research.")),
    p("The terms <em>literature study</em>, <em>literature review</em> and <em>scholarly "
      "review of literature</em> are used interchangeably in this course. The colloquial "
      "&ldquo;literature survey&rdquo; often means something much weaker &mdash; a list of "
      "what has been read &mdash; and should not be conflated with it."),
    p("A literature study is not a summary of what other people have written. It is an "
      "<span class=\"kw\">organised argument</span> that synthesises prior knowledge, "
      "identifies conceptual and empirical gaps, and positions the proposed research within "
      "the existing scholarly conversation."),

    sub("2.1 Three Adjectives That Do the Work", "s2-1"),
    ol(["<span class=\"kw\">Methodical.</span> A study that is not methodical degenerates "
        "into a casual bibliography: sources accumulate and nothing is decided.",
        "<span class=\"kw\">Critical.</span> A study that is not critical merely paraphrases "
        "its sources, treating a weak preprint and a replicated study as equally authoritative.",
        "<span class=\"kw\">Synthetic.</span> A study that does not synthesise fails to "
        "advance understanding: five summaries remain five summaries."]),

    sub("2.2 Functions of a Literature Study", "s2-2"),
    ul(["Maps the intellectual terrain of a research area.",
        "Identifies gaps, contradictions and unresolved questions.",
        "Justifies the contribution of the new research.",
        "Provides theoretical and empirical grounding for hypotheses."]),

    sub("2.3 The Evidence Landscape in Computer Science", "s2-3"),
    p("A literature study in computing draws on six categories of source:"),
    ul(["<span class=\"kw\">Peer-reviewed journals</span> &mdash; <em>IEEE Transactions on "
        "Software Engineering</em>, <em>ACM Computing Surveys</em>, <em>Journal of Machine "
        "Learning Research</em>.",
        "<span class=\"kw\">Conference proceedings</span> &mdash; NeurIPS, ICSE, SIGCOMM, "
        "CVPR. In computing these carry archival weight equal to or greater than journals, "
        "unlike most other disciplines.",
        "<span class=\"kw\">Books, monographs and dissertations.</span> Doctoral and "
        "master&rsquo;s theses are undervalued by students yet contain the most exhaustive "
        "literature reviews available on a narrow topic.",
        "<span class=\"kw\">Technical reports</span> from research laboratories and industry "
        "&mdash; Microsoft Research, Google DeepMind.",
        "<span class=\"kw\">Patents and standards documents</span> &mdash; ISO, IEEE, NIST, W3C.",
        "<span class=\"kw\">Grey literature</span> &mdash; preprints on arXiv, white papers, "
        "working papers."]),
    box("caution", "Consequence",
        p("A computer science literature study confined to journal articles alone will be "
          "<span class=\"kw\">systematically incomplete</span>. This is a disciplinary fact, "
          "not a matter of taste.")),

    sec(3, "Objectives of an Effective Literature Study", "s3"),
    p("The literature study serves eight interlinked objectives. Examiners commonly ask for "
      "any four, or for one developed at length with an example."),

    sub("3.1 Establishing the State of the Art", "s3-1"),
    p("The first objective is to determine what is currently known about the research "
      "problem: existing theories, algorithms, architectures, datasets, benchmarks and "
      "empirical findings. Without this map, a researcher cannot legitimately claim that "
      "the work addresses an open problem."),

    sub("3.2 Identifying Research Gaps", "s3-2"),
    p("The literature study is the principal mechanism through which research gaps are "
      "surfaced. <span class=\"kw\">The articulation of a gap is, in itself, a contribution "
      "to scholarship.</span>"),
    tw(table(["Gap type", "What is absent", "Computer science example"], [
        ["**Knowledge gap**", "An unanswered empirical or conceptual question",
         "No study measures the energy cost of this layer type"],
        ["**Methodological gap**", "No adequate method, tool or metric exists",
         "No benchmark exists for the task"],
        ["**Theoretical gap**", "No framework explains a class of observations",
         "No account of why scaling helps in this regime"],
        ["**Population / context gap**", "An under-studied dataset, demographic, domain or region",
         "Never evaluated on low-resource Indic languages"],
        ["**Replication gap**", "Prior findings never independently validated",
         "A headline ML result never reproduced"],
    ])),
    box("caution", "The cardinal error &mdash; gap by omission",
        p("A gap is a claim <em>about the literature</em>. It must be demonstrated by a "
          "structured search, never asserted because the student has not read enough. "
          "Naming the <em>type</em> of gap also determines the research design that can "
          "close it: a data gap needs a dataset contribution, a replication gap needs a "
          "replication.")),

    sub("3.3 Avoiding Duplication of Effort", "s3-3"),
    p("A disciplined review prevents the costly waste that arises when researchers "
      "unknowingly repeat published studies. In computing, where novel architectures and "
      "benchmarks proliferate rapidly, this objective is particularly important."),

    sub("3.4 Refining the Research Problem and Hypotheses", "s3-4"),
    p("Reading the literature reshapes the research question itself. The initial formulation "
      "is rarely the final one: exposure to existing work leads to narrowing, broadening, "
      "re-framing, or <span class=\"kw\">operationalisation in measurable terms</span>. "
      "Hypotheses are similarly refined against the evidence already available."),
    box("eg", "Example &mdash; operationalisation",
        p("<em>Before reading:</em> &ldquo;Can AI detect disease?&rdquo;")
        + p("<em>After reading:</em> &ldquo;Does a 3D U-Net trained on MIMIC-CXR improve "
            "segmentation Dice over 2D baselines?&rdquo;")
        + p("A student whose research question is identical before and after the review has "
            "almost certainly not read critically.")),

    sub("3.5 Selecting Appropriate Methods", "s3-5"),
    p("The literature is a repository of validated methodologies &mdash; experimental "
      "designs, evaluation metrics, statistical tests, simulation frameworks and software "
      "tools. Adopting the community&rsquo;s standard datasets, metrics and baselines is "
      "what makes a result <em>comparable</em>; idiosyncratic evaluation is a common reason "
      "student work cannot be published."),

    sub("3.6 Building Theoretical and Conceptual Frameworks", "s3-6"),
    p("Concepts, taxonomies, models and theoretical lenses drawn from the literature give "
      "the researcher the scaffolding needed to interpret new observations coherently "
      "rather than anecdotally."),

    sub("3.7 Establishing Credibility and Scholarly Lineage", "s3-7"),
    p("By engaging with the foundational works of a field, a researcher demonstrates "
      "scholarly citizenship. Reviewers and examiners expect this lineage; it signals that "
      "the work was not conducted in intellectual isolation."),

    sub("3.8 Supporting Ethical Practice", "s3-8"),
    p("Finally, and centrally for this unit, the literature study supports ethical research "
      "practice. It familiarises the researcher with the norms of attribution, citation and "
      "acknowledgement that govern scholarly communication. A researcher who has read "
      "widely is far less likely to commit plagiarism, fabrication or inappropriate "
      "self-citation."),

    box("exam", "Table 1 &mdash; the eight objectives (learn this table)",
        tw(table(["#", "Objective", "Core function"], [
            ["1", "Establish the state of the art", "Map existing knowledge"],
            ["2", "Identify research gaps", "Justify novelty"],
            ["3", "Avoid duplication", "Ensure efficiency and originality"],
            ["4", "Refine problem and hypotheses", "Improve precision"],
            ["5", "Select methods", "Borrow and adapt validated tools"],
            ["6", "Build conceptual frameworks", "Provide theoretical grounding"],
            ["7", "Establish scholarly credibility", "Demonstrate engagement"],
            ["8", "Support ethical practice", "Reinforce norms of attribution"],
        ]))),

    sec(4, "Scope of an Effective Literature Study", "s4"),
    box("def", "Definition &mdash; Scope",
        p("<span class=\"kw\">Scope</span> refers to the boundaries within which the "
          "literature is gathered, evaluated and synthesised. Scope must be "
          "<em>deliberately declared</em> to prevent both superficial coverage and "
          "unmanageable breadth.")),
    p("Undeclared scope is the root of most unfair criticism a review receives: a reader "
      "cannot distinguish a deliberate exclusion from an oversight unless the boundary is "
      "stated in the methods section."),

    sub("4.1 Source Scope", "s4-1"),
    ul(["<span class=\"kw\">Primary sources</span> &mdash; original research articles "
        "reporting novel results: journal articles, full conference papers, patents.",
        "<span class=\"kw\">Secondary sources</span> &mdash; review articles, meta-analyses, "
        "surveys and textbooks that synthesise primary literature.",
        "<span class=\"kw\">Tertiary sources</span> &mdash; bibliographic databases, indices "
        "and curated repositories: ACM Digital Library, IEEE Xplore, Scopus, Web of Science, "
        "DBLP, Google Scholar.",
        "<span class=\"kw\">Grey literature</span> &mdash; preprints (arXiv, SSRN), technical "
        "reports, white papers and dissertations that have not undergone formal peer review "
        "but contain valuable preliminary findings.",
        "<span class=\"kw\">Standards and specifications</span> &mdash; documents issued by "
        "ISO, IEEE, ACM, NIST, W3C and similar bodies."]),
    box("caution", "Common error &mdash; the secondary-source trap",
        p("Relying exclusively on textbooks and review articles. These provide a useful "
          "entry point but must be supplemented with primary sources. Citing a survey&rsquo;s "
          "characterisation of a paper rather than the paper itself propagates any error the "
          "survey made &mdash; and examiners can detect it.")),

    sub("4.2 Temporal Scope", "s4-2"),
    ul(["<span class=\"kw\">Foundational works</span> &mdash; seminal papers that introduced "
        "enduring concepts: Turing, <em>Computing Machinery and Intelligence</em> (1950); "
        "Dijkstra, <em>A Note on Two Problems in Connexion with Graphs</em> (1959).",
        "<span class=\"kw\">Contemporary works</span> &mdash; papers from the last 3&ndash;5 "
        "years, reflecting current debates, datasets and benchmarks.",
        "<span class=\"kw\">Emerging works</span> &mdash; preprints and very recent "
        "publications that signal future directions."]),
    box("eg", "Working heuristic",
        p("Ensure that roughly <span class=\"kw\">60&ndash;70 per cent</span> of cited works "
          "are from the most recent five years, while deliberately retaining the classical "
          "references that anchor the research in its intellectual lineage. Treat this as a "
          "planning figure rather than a rule: a fast-moving subfield may justify a higher "
          "proportion, a theory-heavy one a lower.")),

    sub("4.3 Disciplinary and Interdisciplinary Scope", "s4-3"),
    p("Modern computer science is irreducibly interdisciplinary. A literature study on "
      "<em>deep learning for medical image segmentation</em> must traverse:"),
    ul(["Core computer science &mdash; machine learning, computer vision, software engineering.",
        "Applied mathematics &mdash; optimisation, probability, linear algebra.",
        "Domain disciplines &mdash; radiology, biomedical imaging, clinical workflows.",
        "Ethics and policy &mdash; data privacy, regulatory frameworks."]),
    p("Because interdisciplinary literatures are effectively unbounded, the researcher must "
      "state explicitly which neighbouring fields are included and which are excluded, with "
      "reasons."),

    sub("4.4 Methodological Scope", "s4-4"),
    p("The review should represent the range of methodologies employed in the area &mdash; "
      "theoretical analyses, simulations, controlled experiments, case studies, design "
      "science research &mdash; so that the chosen methodology of the proposed research is "
      "justified <span class=\"kw\">by contrast or extension</span> rather than by default."),

    sub("4.5 Geographical and Linguistic Scope", "s4-5"),
    p("Particular care is required to avoid <span class=\"kw\">geographical bias</span> "
      "(over-reliance on Anglo-American literature) and <span class=\"kw\">linguistic "
      "bias</span> (excluding significant work published in other languages). At minimum, "
      "the researcher should reflect on whether such biases are present. These are not "
      "merely technical omissions: they shape whose problems are treated as important and "
      "whose datasets are treated as representative."),

    sec(5, "Significance of Literature Studies", "s5"),
    sub("5.1 At the Project Level", "s5-1"),
    p("The literature study is the foundation on which every subsequent stage is built. "
      "Without it, the research design is poorly motivated, the contribution unclear and "
      "the evaluation criteria unjustified. It is also the source of the references that "
      "appear throughout the eventual thesis, paper or report."),
    sub("5.2 At the Researcher Level", "s5-2"),
    ul(["Critical thinking and analytical reasoning.",
        "The ability to synthesise disparate findings.",
        "Discipline-specific vocabulary and conceptual literacy.",
        "The capacity to position one&rsquo;s own work within an ongoing scholarly "
        "conversation."]),
    sub("5.3 At the Disciplinary Level", "s5-3"),
    p("Aggregated across the community, literature studies advance collective knowledge. "
      "Well-conducted systematic reviews and mapping studies identify trends, controversies "
      "and emerging frontiers, and provide entry points for newcomers to a field."),
    sub("5.4 At the Societal Level", "s5-4"),
    p("In computer science, where research increasingly affects public life through "
      "algorithmic decision-making, surveillance, healthcare, transportation and "
      "communication, an ethically conducted literature study that engages with the "
      "societal implications of technology is essential. A review of facial recognition "
      "that never engages the literature on demographic error-rate disparity has met a "
      "technical standard while failing a societal one."),
    box("exam", "Examinable distinction &mdash; scope versus significance",
        p("<span class=\"kw\">Scope</span> refers to coverage: <em>what is included</em>. "
          "<span class=\"kw\">Significance</span> refers to importance: <em>why it "
          "matters</em>. Examiners frequently test this distinction, and conflating the two "
          "is a common and costly error.")),

    sec(6, "Types of Literature Review", "s6"),
    p("Not all reviews serve the same purpose. The choice depends on the research question, "
      "the maturity of the field, the resources available and the depth of analysis "
      "required."),
    tw(table(["Type", "Purpose", "Typical use"], [
        ["**Narrative review**", "Provides a broad overview of a topic",
         "Thesis background chapter, introductory sections"],
        ["**Systematic review**", "Exhaustive, protocol-driven search and synthesis",
         "Evidence-based studies; mapping an entire evidence base"],
        ["**Meta-analysis**", "Statistical synthesis of quantitative results",
         "Combining effect sizes across empirical studies"],
        ["**Scoping review**", "Maps the breadth and nature of research activity",
         "Emerging or heterogeneous fields"],
        ["**Integrative review**", "Combines empirical and theoretical literature",
         "Mature fields requiring conceptual synthesis"],
        ["**Umbrella review**", "Synthesises multiple systematic reviews",
         "High-level policy or curriculum decisions"],
    ])),
    p("In a typical B.Tech project or postgraduate dissertation in computer science, a "
      "narrative or integrative review embedded within a background chapter is most common "
      "&mdash; although elements of systematic methodology (predefined search strings, "
      "explicit inclusion and exclusion criteria) are increasingly expected. Lecture 2 "
      "treats these approaches in technical depth."),

    sec(7, "The Process, and Its Pitfalls", "s7"),
    sub("7.1 Seven Stages", "s7-1"),
    ol(["<span class=\"kw\">Define the scope</span> &mdash; formulate review questions and "
        "eligibility criteria.",
        "<span class=\"kw\">Search the literature</span> &mdash; identify databases, search "
        "terms and search strings.",
        "<span class=\"kw\">Screen sources</span> &mdash; apply inclusion and exclusion criteria.",
        "<span class=\"kw\">Assess quality</span> &mdash; evaluate methodological rigour and "
        "relevance.",
        "<span class=\"kw\">Extract data</span> &mdash; record bibliographic and conceptual "
        "information systematically.",
        "<span class=\"kw\">Synthesise</span> &mdash; integrate findings thematically, "
        "methodologically or chronologically.",
        "<span class=\"kw\">Report</span> &mdash; present the synthesis in a structured and "
        "transparent manner."]),
    p("Each stage is <span class=\"kw\">iterative rather than strictly linear</span>. "
      "Searches are refined after screening, and synthesis often reveals the need to return "
      "to the search stage. Returning to an earlier stage is evidence of a maturing review, "
      "not of earlier failure."),

    sub("7.2 Eight Recurrent Pitfalls", "s7-2"),
    tw(table(["Pitfall", "What it looks like", "Stage where it enters"], [
        ["**Bibliographic shopping**", "Collecting sources without an integrating argument",
         "Define scope"],
        ["**Closed-system searching**", "Relying on a single database, usually Google Scholar",
         "Search"],
        ["**Lack of critical appraisal**", "Treating every source as equally authoritative",
         "Screen / assess"],
        ["**Chronological listing**", "Organising by publication date rather than by theme",
         "Synthesise"],
        ["**Unmanaged references**", "No Zotero, Mendeley or EndNote",
         "Extract"],
        ["**Recency bias**", "Citing only recent papers, ignoring seminal works", "Report"],
        ["**Disciplinary parochialism**", "Ignoring neighbouring disciplines", "Report"],
        ["**Plagiarism through paraphrase**", "Paraphrasing without proper attribution",
         "Report"],
    ])),
    box("caution", "One action to take this week",
        p("Install Zotero or Mendeley and start capturing citations <em>at the moment of "
          "reading</em>. Retrofitting citations at submission time is where most accidental "
          "attribution failures occur &mdash; a point developed fully in Lecture 5.")),

    sec(8, "The Literature Study as the Ethical Foundation", "s8"),
    p("The unit is titled <em>Ethical Conduct and Literature Studies</em> because the two "
      "are causally linked, not merely adjacent. Ethical research practice begins long "
      "before data collection. A researcher who has conducted a thorough literature study "
      "is better equipped to:"),
    ul(["Attribute ideas correctly and avoid plagiarism.",
        "Recognise prior contributions and respect intellectual property.",
        "Identify ethical controversies that have already been debated in the literature.",
        "Avoid the redundant &mdash; and ethically questionable &mdash; repetition of studies "
        "already conducted."]),
    box("def", "Mechanism, not exhortation",
        p("Plagiarism is frequently a <span class=\"kw\">symptom of insufficient "
          "reading</span>. A researcher who cannot restate a concept in their own words has "
          "not yet understood it, and copies instead. The remedy is earlier and deeper "
          "reading rather than better disguise.")),
    p("These obligations are codified for computing professionals in the <span class=\"kw\">"
      "ACM Code of Ethics and Professional Conduct (2018)</span> and the <span class=\"kw\">"
      "IEEE Code of Ethics</span>. The themes of addressing plagiarism and of ethical "
      "considerations in research, developed in Lectures 4&ndash;8 of this unit, are "
      "anchored directly in the literature-study practices introduced here."),

    sec(9, "Worked Case: Federated Learning for Healthcare", "s9"),
    p("A B.Tech student proposes a project on <em>Federated Learning for Privacy-Preserving "
      "Healthcare Analytics</em>. An effective literature study proceeds as follows."),
    ol(["<span class=\"kw\">Scope.</span> Foundational work on federated learning (McMahan "
        "et al., 2017); differential privacy and secure aggregation; healthcare applications "
        "and datasets (MIMIC, UK Biobank); regulatory frameworks (HIPAA, GDPR); benchmarks "
        "and evaluation metrics.",
        "<span class=\"kw\">Identified gap.</span> Critical reading of recent surveys reveals "
        "that most systems optimise for accuracy under privacy constraints but neglect "
        "communication efficiency, energy consumption, and fairness across hospital sites "
        "with heterogeneous data distributions.",
        "<span class=\"kw\">Contribution.</span> A communication-efficient aggregation "
        "algorithm with formal differential-privacy guarantees, evaluated empirically across "
        "heterogeneous clinical sites.",
        "<span class=\"kw\">Ethical dimension.</span> The review must also surface the "
        "ethical literature on patient consent, secondary use of health data and bias in "
        "clinical algorithms, linking the project explicitly to the ethical theme of Unit III."]),
    p("Note that the gap statement is <em>specific and falsifiable</em> &mdash; communication "
      "efficiency, energy, fairness &mdash; which is what distinguishes a genuine gap from "
      "the vague &ldquo;little work exists&rdquo; that examiners penalise."),

    sec(10, "Summary", "s10"),
    ul(["A literature study is a <span class=\"kw\">methodical, critical and synthetic</span> "
        "survey of scholarly sources, distinct from casual reading and from an annotated "
        "bibliography.",
        "Its <span class=\"kw\">eight objectives</span> run from establishing the state of "
        "the art to supporting ethical practice.",
        "Its <span class=\"kw\">scope</span> spans source categories, time horizons, "
        "disciplines, methodologies and geography, and must be deliberately declared.",
        "It is <span class=\"kw\">significant</span> at the project, researcher, disciplinary "
        "and societal levels.",
        "Different <span class=\"kw\">types of review</span> serve different purposes; the "
        "process is <span class=\"kw\">iterative</span>.",
        "Above all, the literature study is the <span class=\"kw\">ethical foundation</span> "
        "of research."]),

    sec(11, "Exam Preparation", "s11"),
    box("exam", "Six preparation points",
        ol(["<span class=\"kw\">Definitions first.</span> Be able to write a precise "
            "definition of a literature study and to distinguish it from a &ldquo;literature "
            "survey&rdquo; in the colloquial sense.",
            "<span class=\"kw\">Objectives as enumeration.</span> Memorise the eight "
            "objectives and be ready to discuss any one at length with a computer science "
            "example.",
            "<span class=\"kw\">Scope versus significance.</span> Coverage against "
            "importance. Frequently tested.",
            "<span class=\"kw\">Types of review.</span> Compare at least three and identify "
            "which suits a given scenario.",
            "<span class=\"kw\">Ethics link.</span> Always be ready to articulate how the "
            "literature study underpins ethical research &mdash; the through-line of the unit.",
            "<span class=\"kw\">Application over recall.</span> Practise applying these "
            "concepts to a specific sub-domain &mdash; cybersecurity, NLP, IoT &mdash; rather "
            "than answering in the abstract."])),

    sub("11.1 Short-Answer Questions", "s11-1"),
    qlist(["Define <em>literature study</em> in the context of research methodology. How "
           "does it differ from a general reading assignment? " + marks("3 marks"),
           "State any four objectives of an effective literature study. " + marks("2 marks"),
           "Distinguish between <em>primary</em>, <em>secondary</em> and <em>tertiary</em> "
           "sources, giving one example of each from computer science. " + marks("3 marks"),
           "What is a <em>research gap</em>? Name the five types identified in this lecture. "
           + marks("3 marks"),
           "Why is temporal balance important in a literature study? " + marks("2 marks")]),

    sub("11.2 Long-Answer Questions", "s11-2"),
    qlist(["Discuss the scope of an effective literature study in computer science. What are "
           "the principal dimensions along which scope must be defined? " + marks("10 marks"),
           "Critically evaluate the significance of literature studies at the project, "
           "researcher, disciplinary and societal levels. " + marks("10 marks"),
           "Compare and contrast narrative, systematic and meta-analytic reviews. Under what "
           "circumstances is each most appropriate? " + marks("8 marks"),
           "Describe the iterative process of conducting a literature study. What are the "
           "common pitfalls at each stage? " + marks("10 marks"),
           "&ldquo;The literature study is the ethical foundation of research.&rdquo; Discuss "
           "this statement with reference to plagiarism, attribution and scholarly integrity. "
           + marks("10 marks")]),

    sub("11.3 Think-and-Apply", "s11-3"),
    box("eg", "Applied task",
        p("You are beginning a research project on <em>Blockchain-based Trust Management in "
          "Internet of Things Networks</em>. Sketch the scope of an effective literature "
          "study by specifying (a) at least three source categories, (b) two foundational "
          "works that should be included, (c) one likely research gap and its type, and "
          "(d) one ethical concern the review should surface.")),

    sec(12, "Suggested Reading", "s12"),
    ol(["Creswell, J. W., &amp; Creswell, J. D. (2018). <em>Research Design: Qualitative, "
        "Quantitative, and Mixed Methods Approaches</em> (5th ed.). SAGE.",
        "Fink, A. (2019). <em>Conducting Research Literature Reviews: From the Internet to "
        "Paper</em> (5th ed.). SAGE.",
        "Webster, J., &amp; Watson, R. T. (2002). Analyzing the past to prepare for the "
        "future: Writing a literature review. <em>MIS Quarterly</em>, 26(2), xiii&ndash;xxiii. "
        "<em>The single most useful short reading: it argues for concept-centric rather than "
        "author-centric synthesis.</em>",
        "vom Brocke, J., et al. (2009). Reconstructing the giant: On the importance of rigour "
        "in documenting the literature search process. <em>Proceedings of ECIS 2009</em>, "
        "2206&ndash;2217.",
        "ACM. (2018). <em>ACM Code of Ethics and Professional Conduct</em>.",
        "IEEE. (2024). <em>IEEE Code of Ethics</em>."]),
])
