# -*- coding: utf-8 -*-
"""Unit III - Lecture 6: Research Ethics - Foundational Principles."""
from kit import (box, card, eqbox, flow, goals, grid, marks, ol, p, qlist, rule,
                 sec, stack, sub, table, tw, ul, eq)

STEM = "CSEG3060_Unit3_L06_Research_Ethics_Principles"
RUNNER = "CSEG3060 · Unit III · Lecture 6 — Research Ethics: Foundational Principles"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 6 — Research Ethics: Foundational Principles",
    "desc": ("Unit III Lecture 6 for Research Methodology in Computer Science "
             "(CSEG3060): honesty, objectivity, integrity and respect for intellectual "
             "property — honest error versus misconduct, conflicts of interest, CRediT "
             "authorship, the legal-ethical boundary and a five-test diagnostic workflow."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Research Ethics: Foundational Principles",
     "body": stack([
         p("Honesty, objectivity, integrity and respect for intellectual property",
           "lead", "max-width:850px;color:var(--mint)"),
         card(p("A fabricated benchmark does not stay in the paper. It ships.", None,
                "margin:0;font-size:22px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 6 of 8 · 60 minutes · CO3", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO3",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Articulate** the meaning and operational scope of each of the four principles",
         "**Identify** concrete ethical dilemmas computer scientists face",
         "**Distinguish** honest error from research misconduct",
         "**Recognise** the forms of IP — ideas, text, code, data, models — requiring attribution",
         "**Apply** ethical reasoning to ambiguous, real-world scenarios",
     ]), None, "fill")},

    {"title": "Why ethics binds computing", "kicker": "Context",
     "h": "Ethical failures in computing propagate",
     "body": stack([
         flow(["Dishonest result", "Cited baseline", "Engineering decision",
               "Deployed system", "Public consequence"]),
         grid([
             card(p("Computing outputs shape commerce, governance, communication, healthcare "
                    "and warfare — so failures propagate <b>beyond the laboratory and the "
                    "publication page</b>.", "small", "margin:0"), "The reach", "rust"),
             card(p("A fabricated algorithm, a plagiarised model or a falsified benchmark can "
                    "corrupt downstream engineering, mislead policymakers and <b>erode public "
                    "trust</b> in the scientific enterprise.", "small", "margin:0"),
                  "The mechanism", "rust"),
         ]),
         grid([
             card(p("Truthful representation of methods, data and contributions", "fine", "margin:0"),
                  "Honesty", "teal"),
             card(p("Evidence, not interest, drives inference", "fine", "margin:0"),
                  "Objectivity", "teal"),
             card(p("Consistency of conduct across the whole lifecycle", "fine", "margin:0"),
                  "Integrity", "teal"),
             card(p("Attribution of ideas, text, code, data and methods", "fine", "margin:0"),
                  "Respect for IP", "teal"),
         ], "1fr 1fr 1fr 1fr", gap="9px"),
         p("Codified in the <b>Belmont Report (1979)</b> · <b>Singapore Statement (2010)</b> · "
           "<b>European Code of Conduct for Research Integrity (ALLEA, 2023)</b> · "
           "<b>ACM Code of Ethics (2018)</b>.", "fine", "margin:0"),
     ], 11)},

    {"title": "Honesty", "kicker": "Principle I",
     "h": "Honesty, and its computing-specific failure modes",
     "body": stack([
         rule("The <b>truthful representation of methods, procedures, data, results and "
              "contributions</b> — the bedrock on which the credibility of scientific "
              "knowledge rests."),
         grid([
             card(ul(["Report results **as observed**, including negative findings",
                      "Disclose methodologies faithfully, **including limitations**",
                      "Avoid **fabrication** — inventing data, results or experiments",
                      "Avoid **falsification** — manipulating, altering or omitting data",
                      "**Report errors promptly** and correct the record"],
                     None, "margin:0;font-size:13px"), "Five obligations", "teal"),
             stack([
                 card(p("Reporting only the best of many runs artificially inflates claimed "
                        "gains. This is <b>selective honesty</b> — technically true statements "
                        "that omit context and mislead.", "small", "margin:0"),
                      "Failure mode 1 · selective reporting", "rust"),
                 card(p("Claiming an algorithm is “novel” when it is a renamed prior method · "
                        "reporting on a cleaned subset <b>without disclosing exclusions</b>.",
                        "small", "margin:0"), "Failure modes 2 and 3", "rust"),
             ], 9),
         ], "1fr 1.1fr"),
         card(p("CS research is driven by software, hardware, datasets, benchmarks and trained "
                "models — and the <b>reproducibility of every one of them depends on honest "
                "reporting</b>.", "small", "margin:0"), None, "tint"),
     ], 11)},

    {"title": "Error versus misconduct", "kicker": "Principle I · continued",
     "h": "Being wrong is not misconduct",
     "body": stack([
         table(["Dimension", "Honest error", "Misconduct"], [
             ["Intent", "Unintentional, accidental", "Willful or **reckless**"],
             ["**Response to discovery**", "**Open acknowledgment, correction**", "**Concealment, denial**"],
             ["Documentation", "Reproducible records of process", "Inconsistent, missing"],
             ["Frequency", "Sparse and explainable", "A pattern of irregularities"],
         ]),
         grid([
             card(p("Research-integrity policy worldwide centres on <b>Fabrication, "
                    "Falsification, Plagiarism</b>. Honesty is the positive disposition that "
                    "prevents all three.", "small", "margin:0"), "The FFP framework", "rust"),
             card(ul(["Maintain a tamper-evident **research log** — a version-controlled notebook",
                      "Preserve **raw data with metadata**",
                      "Adopt **pre-registration** for confirmatory studies",
                      "Uphold **double-blind review** norms"],
                     None, "margin:0;font-size:13px"), "Operational practices", "teal"),
         ]),
         rule("Note that <b>reckless</b> sits on the misconduct side: negligence severe enough "
              "to disregard obvious checks is not excused by absence of intent to deceive."),
     ], 11)},

    {"title": "Objectivity", "kicker": "Principle II",
     "h": "Objectivity is a regulative ideal, not a property of the subject",
     "body": stack([
         rule("The commitment to let <b>evidence — not personal interest, ideology, prior "
              "commitment or external pressure — drive</b> design, analysis and interpretation."),
         card(p("Computing <i>feels</i> objective because it handles formal systems. Yet every "
                "layer of an empirical CS study — dataset choice, hyperparameter selection, "
                "evaluation metric — is shaped by human judgement. Objectivity requires "
                "<b>continuous effort</b>.", "small", "margin:0"),
              "The CS-specific illusion", "rust"),
         grid([
             card(p("Emotional investment in a proposed method leads to benchmarks that "
                    "unconsciously favour it.<br><b>Remedy:</b> matched baseline conditions, "
                    "standard suites, report across the <b>full input distribution</b>.",
                    "small", "margin:0"), "1 · Confirmation bias", "tint"),
             card(p("Industry funding, equity, consulting and personal relationships "
                    "compromise disinterest.<br><b>Remedy:</b> disclosure — necessary but "
                    "<b>never fully neutralising</b>.", "small", "margin:0"),
                  "2 · Conflicts of interest", "tint"),
             card(p("Tweaking architectures, hyperparameters, seeds or preprocessing until a "
                    "result “works”.<br><b>Remedy:</b> pre-registration, blinding, "
                    "<b>adversarial collaboration</b>.", "small", "margin:0"),
                  "3 · Significance hunting", "tint"),
         ], "1fr 1fr 1fr"),
         p("Every individual action in the significance-hunting loop is standard practice — "
           "which is exactly why the aggregate is so hard to see and so easy to rationalise.",
           "fine", "margin:0"),
     ], 10)},

    {"title": "Objectivity as competence", "kicker": "Principle II · continued",
     "h": "You cannot report honestly what you cannot measure",
     "body": stack([
         grid([
             card(p("<b>“12% faster.”</b><br><br>Without confidence intervals, standard "
                    "deviations, hardware variance and sample-size justification, this is "
                    "<b>a number but not an empirical finding</b>.", "small", "margin:0"),
                  "The claim as usually stated", "rust"),
             stack([
                 p("Effect size — how large is the difference?", "fine", "margin:0"),
                 eqbox("Cohen's d = (&mu;<sub>new</sub> &minus; &mu;<sub>baseline</sub>) / "
                       "&sigma;<sub>pooled</sub>"),
                 p("Uncertainty — how well is it pinned down?", "fine", "margin:0"),
                 eqbox("x&#772; &plusmn; t<sub>0.025, n&minus;1</sub> &middot; s / &radic;n", "light"),
             ], 7),
         ], "1fr 1.25fr"),
         rule("<b>Both are required.</b> Effect size without uncertainty overstates confidence; "
              "uncertainty without effect size obscures practical relevance. Together they let "
              "readers assess the claim <b>on its merits rather than on the author's "
              "enthusiasm</b>."),
         card(p("Objectivity is <b>partly a technical competence</b>, not only a disposition — "
                "a researcher who cannot quantify uncertainty cannot report it honestly, "
                "however good their intentions.", "small", "margin:0"), None, "tint"),
     ], 12)},

    {"title": "Integrity", "kicker": "Principle III",
     "h": "Integrity is consistency of character",
     "body": stack([
         grid([
             card(p("Pertains to <b>specific statements and data</b>. Can be satisfied "
                    "statement by statement.", "small", "margin:0"), "Honesty", "tint"),
             card(p("Pertains to the <b>character and consistency of the researcher</b> across "
                    "the whole research lifecycle. Cannot be satisfied piecemeal — it is the "
                    "property of a <i>pattern</i>.", "small", "margin:0"), "Integrity", "teal"),
         ]),
         rule("The operative test: a researcher of integrity acts ethically <b>when no one is "
              "watching</b>, when peer pressure pushes the other way, and when expedience "
              "tempts compromise."),
         grid([
             card(ul(["Adherence to institutional and professional standards",
                      "**Consistency between public statement and private conduct**",
                      "Willingness to take **costly** ethical stands — retracting one's own work, reporting misconduct",
                      "Asking *“Is this the right thing to do?”* before every significant decision"],
                     None, "margin:0;font-size:13px"), "What integrity subsumes"),
             card(ul(["Adopt transparent authorship frameworks — **CRediT**",
                      "Establish **lab agreements** on data ownership and publication",
                      "**Document difficult decisions** and their reasoning at the time"],
                     None, "margin:0;font-size:13px"), "Operational practices", "teal"),
         ], "1.25fr 1fr"),
     ], 12)},

    {"title": "Integrity in practice", "kicker": "Principle III · continued",
     "h": "Authorship, mentorship and whistleblowing",
     "body": stack([
         card(p("<b>CRediT — 14 contributor roles:</b> conceptualisation · methodology · "
                "<b>software</b> · validation · formal analysis · investigation · "
                "<b>data curation</b> · writing – original draft · writing – review and "
                "editing · visualisation · supervision · project administration · funding "
                "acquisition · resources", "small", "margin:0"),
              "Authorship attribution", "teal"),
         grid([
             card(p("<b>Gift authorship</b> — including someone who did not meaningfully "
                    "contribute.<br><b>Ghost authorship</b> — omitting a contributor whose "
                    "work materially shaped the paper. <i>The second is the one that harms "
                    "students.</i>", "small", "margin:0"), "Two named abuses", "rust"),
             card(p("The CS convention of <b>alphabetical ordering</b> sometimes masks the "
                    "actual contribution distribution. Integrity requires transparent "
                    "disclosure when the alphabet misrepresents the work.", "small", "margin:0"),
                  "Order of authorship", "tint"),
         ]),
         grid([
             card(ul(["Pressuring students to keep the lab's “story” consistent in reviews",
                      "Accepting authorship **in exchange for funding or lab resources**",
                      "Failing to credit students whose code and experiments populate papers"],
                     None, "margin:0;font-size:13px"), "Mentorship failures", "rust"),
             card(p("Whistleblowers face retaliation, ostracism and stalled careers, yet the "
                    "practice is essential. <b>Ombudspersons</b>, confidential channels and "
                    "protective law — <b>U.S. Whistleblower Protection Act</b>, "
                    "<b>EU Directive 2019/1937</b> — mitigate the cost.", "small", "margin:0"),
                  "Whistleblowing", "tint"),
         ]),
     ], 9)},

    {"title": "Respect for IP", "kicker": "Principle IV",
     "h": "Five categories of intellectual property in CS",
     "body": stack([
         rule("Ideas, expressions, methods, data and code <b>have authors</b> with legitimate "
              "claims to attribution — and this principle extends <b>beyond what law strictly "
              "requires</b>."),
         grid([
             card(p("<b>Verbatim</b> and <b>idea</b> plagiarism. CS papers are densely "
                    "argumentative, so the threshold for attribution is <b>lower</b> than in "
                    "many disciplines: even one lifted sentence is misconduct.",
                    "small", "margin:0"), "A · Textual IP", "rust"),
             card(p("Honour licence terms — <b>GPL, MIT, Apache, BSD</b> differ materially · "
                    "do not re-implement a protected expressive structure after reading "
                    "another team's code · <b>cite the libraries</b> you use · deposit your "
                    "own code where possible.", "small", "margin:0"), "B · Software and code IP"),
             card(p("<b>Cite dataset creators</b> · respect licences (Creative Commons, "
                    "dataset-specific terms) · never redistribute restricted data through side "
                    "channels · <b>respect the consent terms</b> under which human-subjects "
                    "data were collected.", "small", "margin:0"), "C · Data IP"),
         ], "1fr 1fr 1fr"),
         grid([
             card(p("Unpatented algorithms still have authors. The community convention is "
                    "eponymous citation: <b>RSA</b>, <b>Dijkstra's algorithm</b>, "
                    "<b>Adam</b> (Kingma &amp; Ba), <b>Transformer</b> (Vaswani et al.), "
                    "<b>ResNet</b> (He et al.).", "small", "margin:0"),
                  "D · Algorithmic and methodological IP", "teal"),
             card(p("Naming a system after a competitor's trademark, or using proprietary "
                    "screenshots beyond fair use, risks infringement — and is in any case "
                    "unprofessional.", "small", "margin:0"), "E · Trademark and brand IP", "tint"),
         ]),
     ], 10)},

    {"title": "Legal versus ethical", "kicker": "Principle IV · continued",
     "h": "Legal is the floor, not the standard",
     "body": stack([
         table(["Act", "Legal status", "Ethical status"], [
             ["Verbatim copying of text without citation", "Generally not illegal in small amounts (fair use)", "**Unethical**"],
             ["Re-implementing an algorithm after reading prior code", "Generally legal", "**Often unethical**"],
             ["Using a copyrighted figure in a review paper", "Often permitted under fair use", "**Still requires citation**"],
             ["Falsifying results", "Not typically illegal", "**Unethical; sometimes illegal** (e.g. federal grants)"],
             ["Stockpiling research data for years", "Generally legal", "**May be unethical** if it blocks community progress"],
         ]),
         grid([
             card(p("IP law is <b>broader</b> than research ethics in some respects (patent "
                    "law) and <b>narrower</b> in others — many forms of idea plagiarism are "
                    "perfectly legal and clearly unethical.", "small", "margin:0"),
                  "The two domains do not coincide", "rust"),
             card(ul(["Track every idea, method and quotation in a **citation manager**",
                      "Run submissions through **plagiarism detection** before submitting",
                      "Maintain a **licence-awareness checklist** for every dependency",
                      "When paraphrasing, ensure the **structure** as well as the wording is yours"],
                     None, "margin:0;font-size:13px"), "Operational practices", "teal"),
         ], "1fr 1.2fr"),
         rule("“It is legal” is <b>never a sufficient answer</b> to an ethical question. Legal "
              "compliance is assessed by counsel after the fact; ethical compliance is assessed "
              "by the community continuously."),
     ], 9)},

    {"title": "How the four interact", "kicker": "Synthesis",
     "h": "One act, four principles — and a five-test workflow",
     "body": stack([
         grid([
             card(p("<b>Fabricating data</b> is dishonest, decouples inference from evidence "
                    "(objectivity), reflects a failure of character (integrity), and betrays "
                    "the community's trust.", "small", "margin:0"), None, "rust"),
             card(p("<b>Plagiarism</b> disrespects IP, is dishonest about authorship, corrupts "
                    "the integrity of the record, and <b>skews objectivity</b> by inflating "
                    "apparent support for a claim.", "small", "margin:0"), None, "rust"),
         ]),
         card(ol(["**Honesty test** — can I state this plainly, including what is less flattering?",
                  "**Objectivity test** — has the evidence, not my preference, driven this conclusion?",
                  "**Integrity test** — would I be comfortable if this were reported in the campus newspaper?",
                  "**IP-respect test** — have I credited sources, code, data and methods?",
                  "**Public-reason test** — can I justify this in a forum of respected peers?"],
                 None, "margin:0;font-size:14px"),
              "The five-test diagnostic workflow", "teal"),
         rule("If all five pass, the decision is almost certainly ethical. <b>If any fails</b>, "
              "further reflection — or consultation with an advisor or ethics officer — is "
              "warranted. A failed test is a prompt to consult, not a verdict of guilt."),
     ], 12)},

    {"title": "Case studies", "kicker": "Case studies",
     "h": "Five scenarios — diagnose the principle",
     "body": stack([
         table(["Scenario", "Principle", "Verdict and best practice"], [
             ["**Trimmed benchmarks** — architecture loses to three baselines; after re-runs and tuning it wins; only final results reported",
              "**Honesty**, partly Integrity",
              "Misconduct. Report all runs, document the search protocol, use statistical tests"],
             ["**The borrowed paragraph** — a survey paragraph, synonyms swapped, no citation",
              "**Respect for IP**",
              "High severity. Reread, set aside, rewrite with citation — or quote with marks"],
             ["**The ghost in the code** — student implements and evaluates; advisor adds a paragraph, both names on the byline, “sorted out later”",
              "**Integrity**",
              "Agree authorship *before* submission under a documented policy"],
             ["**The open-source trap** — GPL library forked, modified, shipped in a closed-source product",
              "**Respect for IP**, Integrity",
              "Derivative work. High legal exposure. Maintain a dependency licence inventory"],
             ["**The convenient control** — a known, recent, better-performing open-source baseline silently omitted",
              "**Objectivity**",
              "High severity. Disclose all known comparators and explain any exclusion"],
         ]),
         rule("<b>Four of the five are omissions, not falsehoods</b> — which is why the honesty "
              "test asks specifically about <i>what is less flattering</i>."),
     ], 11)},

    {"title": "Summary and discussion", "kicker": "Consolidation",
     "h": "Four takeaways, and three applied scenarios",
     "body": stack([
         grid([
             card(p("Truthful reporting of methods, data and findings — the antidote to "
                    "fabrication, falsification and selective reporting.", "fine", "margin:0"),
                  "Honesty", "teal"),
             card(p("Evidence rather than interest drives inference — managing conflicts, "
                    "resisting confirmation bias, methodological rigour.", "fine", "margin:0"),
                  "Objectivity", "teal"),
             card(p("Consistency across the whole lifecycle — authorship, mentorship, and "
                    "defending truth at a cost.", "fine", "margin:0"), "Integrity", "teal"),
             card(p("Attribution of ideas, text, code, data and methods, with licence "
                    "compliance.", "fine", "margin:0"), "Respect for IP", "teal"),
         ], "1fr 1fr 1fr 1fr", gap="9px"),
         grid([
             card(p("A co-author removes your name from the byline because they disagree with "
                    "your methodological criticism. How do you proceed, and which principles "
                    "are at stake?", "small", "margin:0"), "Scenario 1", "tint"),
             card(p("Your advisor presses you to report benchmark results from a partial "
                    "dataset because “the full dataset will take too long”. Identify the "
                    "principles and propose a constructive course of action.", "small", "margin:0"),
                  "Scenario 2", "tint"),
             card(p("An elegant open-source implementation does almost what you need. Compare "
                    "(a) fork and modify with citation, (b) reimplement from the paper alone, "
                    "(c) use as-is and relicense.", "small", "margin:0"), "Scenario 3", "tint"),
         ], "1fr 1fr 1fr", gap="9px"),
         rule("Weakness in one principle <b>weakens the whole system</b>. In a field whose "
              "outputs scale rapidly into society, adherence is <b>constitutive of the "
              "discipline's claim to scientific status</b>."),
     ], 11)},

    {"title": "Exam focus", "kicker": "Exam preparation",
     "h": "Revision map and answer technique",
     "body": stack([
         grid([
             card(ul(["Honest error vs misconduct — intent, response, documentation, frequency",
                      "**FFP** — fabrication, falsification, plagiarism",
                      "Selective reporting vs negative-results reporting",
                      "Objectivity vs confirmation bias vs conflict of interest",
                      "Integrity vs honesty — character against specific statement",
                      "Authorship — gift, ghost, alphabetical, **CRediT**",
                      "IP categories and licence compliance — GPL, MIT, Apache, BSD, CC",
                      "The **five-test** diagnostic workflow"],
                     None, "margin:0;font-size:13px"), "Revision concept map", "teal"),
             stack([
                 card(p("Name the <b>principle</b>, then the specific <b>obligation "
                        "breached</b>, then the <b>remedy</b>. Prefer the omission-detecting "
                        "reading of a scenario — most examination cases turn on what was left "
                        "undisclosed.", "small", "margin:0"), "Answer technique", "rust"),
                 card(p("Singapore Statement (2010) · European Code of Conduct (ALLEA, 2023) · "
                        "ACM Code of Ethics (2018) · Resnik, <i>What Is Ethics in "
                        "Research?</i> · Steneck, <i>Introduction to the Responsible Conduct "
                        "of Research</i> · Pineau et al., <i>JMLR</i> (2021).",
                        "fine", "margin:0"), "Further reading", "tint"),
             ], 9),
         ], "1.2fr 1fr"),
         p("Next — <b>Lecture 7: Ethical Considerations in Research</b>: informed consent, "
           "confidentiality, fabrication and falsification, authorship norms and conflict of "
           "interest.", "fine", "margin:0"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Open with the guiding claim: computing students under-estimate the propagation distance of a dishonest result — a corrupted benchmark becomes a design decision, then a product, then a policy assumption. Position this lecture as the conceptual roof over the unit.",
    2: "Objective 3 is the most frequently misunderstood: students assume any wrong result is misconduct, which is both false and corrosive to the culture of honest correction. Objective 5 carries the highest-mark examination items.",
    3: "Make the propagation argument concrete: an inflated accuracy claim becomes a cited baseline, then a procurement criterion, then a deployed system making decisions about people. Note that the ACM Code is the document students are professionally bound by.",
    4: "Spend most of this slide on selective honesty — the failure mode students will actually encounter and do not currently recognise as dishonesty. Reporting a single best run without variance across seeds is the undergraduate version of the same offence.",
    5: "Teach the 'response to discovery' row as the decisive one: how a researcher behaves in the hour after finding their own error is the clearest available signal of character. Reassure students explicitly that admitting an error is a professional act, not a confession.",
    6: "Lead with the illusion — a room full of computer scientists believes objectivity is automatic in a formal discipline and will not guard against a bias they consider impossible. Present adversarial collaboration as the most practical heuristic available.",
    7: "Make the competence argument explicitly: it reframes statistics from an examination hurdle into an ethical obligation. Use the 12% example live — ask how many runs, on what hardware, with what variance, and let a confident number dissolve.",
    8: "Anchor on the honesty-versus-integrity distinction, an almost certain short-answer item. Integrity is only observable under pressure: conduct that costs nothing tests nothing. Recommend documenting the reasoning behind judgement calls at the time they are made.",
    9: "Teach CRediT as a practical instrument: agreeing roles in writing before submission prevents nearly every authorship dispute that reaches a supervisor. Address the power asymmetry honestly — students are the party structurally exposed to ghost authorship.",
    10: "Emphasise the licence-difference point: students treat 'open source' as a single permission when GPL, MIT, Apache and BSD impose materially different obligations. The eponymous-citation convention is respect for IP operating as ordinary professional courtesy.",
    11: "Make the 'it is legal' rebuttal the centrepiece — it is the rationalisation students reach for most often, and the table dismantles it row by row. The data-stockpiling row is the most interesting case: harm to the community without breaking any rule.",
    12: "Present the workflow as the portable takeaway of the unit: students will not remember four definitions in five years, but they can carry five questions. Tests 3 and 5 are deliberately social, because the most reliable check on a rationalisation is stating it aloud.",
    13: "Run this as cold-call diagnosis. Draw out the omission pattern explicitly: students expect misconduct to look like lying and are surprised that four of five cases involve things left unsaid. Spend extra time on the ghost-in-the-code case.",
    14: "Work scenario 2 aloud: the constructive answer is to propose reporting the partial result labelled as preliminary with the full run to follow, which satisfies both supervisor and honesty obligation. Scenario 3's option (b) is ethically safest and often costliest.",
    15: "Give the three-move answer technique explicitly, because case answers that merely narrate the scenario lose most of the marks. Recommend Pineau et al. as the CS-specific reading connecting abstract principles to reproducibility checklists.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 6 Notes — Research Ethics: Foundational Principles",
    "desc": ("Student notes for Unit III Lecture 6 of CSEG3060: honesty, objectivity, "
             "integrity and respect for intellectual property; honest error versus "
             "misconduct and the FFP framework; confirmation bias and conflicts of interest; "
             "CRediT authorship; the legal-ethical boundary; and a five-test diagnostic "
             "workflow."),
    "lecno": "6",
    "lectitle": "Research Ethics: Foundational Principles",
    "subline": ("Honesty, objectivity, integrity and respect for intellectual property "
                "&middot; 60 minutes &middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO3", "Honesty", "Objectivity", "Integrity", "Respect for IP",
               "FFP", "CRediT"],
    "pager": [("CSEG3060_Unit3_L05_Plagiarism_Prevention_Strategies_Notes.html",
               "&larr; Lecture 5: Plagiarism Prevention Strategies"),
              ("CSEG3060_Unit3_L07_Ethical_Considerations_in_Research_Notes.html",
               "Lecture 7: Ethical Considerations in Research &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 6 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO3",
        p("Demonstrate understanding of ethical standards governing scholarly research in "
          "computer science.")
        + p("Lectures 4 and 5 addressed one specific violation and its prevention. This "
            "lecture supplies the <span class=\"kw\">principles from which those rules "
            "derive</span> &mdash; rules are derivative, principles are generative.")),

    box("exam", "How to use these notes",
        p("The four principles are examined <em>as a system</em>, not as four separate "
          "definitions. Section 7 shows how a single act implicates all four, and supplies "
          "the five-test workflow that is the portable takeaway of this lecture.")
        + p("Section 3.3 (honest error versus misconduct) is the most frequently "
            "misunderstood material in the unit: students assume any wrong result is "
            "misconduct, which is both false and corrosive to the culture of honest "
            "correction.")),

    sec(1, "Learning Objectives", "s1"),
    ul(["Articulate the meaning and operational scope of each of the four foundational "
        "principles.",
        "Identify concrete ethical dilemmas that computer scientists face in applying these "
        "principles.",
        "Distinguish between honest error and research misconduct.",
        "Recognise forms of intellectual property &mdash; ideas, text, code, data, models "
        "&mdash; that require respect and attribution.",
        "Apply ethical reasoning to ambiguous, real-world scenarios."]),

    sec(2, "Why Ethics Binds Computing Acutely", "s2"),
    p("Research ethics provides the moral and professional compass that guides scholars in "
      "the creation, evaluation and dissemination of knowledge. In computer science &mdash; a "
      "discipline whose outputs increasingly shape commerce, governance, communication, "
      "healthcare and warfare &mdash; ethical conduct carries consequences that extend well "
      "beyond the laboratory or the publication page."),
    p("A single fabricated algorithm, a plagiarised model or a falsified benchmark can "
      "<span class=\"kw\">corrupt downstream engineering, mislead policymakers and erode "
      "public trust</span> in the scientific enterprise. The propagation chain is concrete: "
      "an inflated accuracy claim becomes a cited baseline, then a procurement criterion, "
      "then a deployed system making decisions about people."),
    p("Four foundational principles anchor ethical practice: "
      "<span class=\"kw\">honesty</span>, <span class=\"kw\">objectivity</span>, "
      "<span class=\"kw\">integrity</span> and <span class=\"kw\">respect for intellectual "
      "property</span>. These are not abstract ideals: they are operationalised daily, from "
      "the design of an experiment to the writing of a paper, the reviewing of a peer's "
      "manuscript and the assignment of credit on a multi-author codebase."),
    box("eg", "The codifying frameworks",
        ul(["<span class=\"kw\">Belmont Report</span> (1979).",
            "<span class=\"kw\">Singapore Statement on Research Integrity</span> (2010).",
            "<span class=\"kw\">European Code of Conduct for Research Integrity</span> "
            "(ALLEA, revised 2023).",
            "<span class=\"kw\">ACM Code of Ethics and Professional Conduct</span> (2018) "
            "&mdash; the document you are professionally bound by as a computing "
            "practitioner."])),

    sec(3, "Principle I &mdash; Honesty", "s3"),
    sub("3.1 Definition and Scope", "s3-1"),
    box("def", "Definition &mdash; Honesty",
        p("<span class=\"kw\">Honesty</span> in research is the truthful representation of "
          "methods, procedures, data, results and contributions. It is the bedrock upon which "
          "the credibility of scientific knowledge rests.")),
    p("Honesty obliges the researcher to:"),
    ul(["Report results <em>as observed</em>, including negative or unexpected findings.",
        "Disclose methodologies faithfully, <em>including their limitations</em>.",
        "Avoid <span class=\"kw\">fabrication</span> &mdash; inventing data, results or "
        "experiments.",
        "Avoid <span class=\"kw\">falsification</span> &mdash; manipulating research "
        "materials, equipment or processes, or altering or omitting data.",
        "Report errors promptly and correct the record when mistakes are discovered."]),

    sub("3.2 Why Honesty Matters in Computer Science", "s3-2"),
    p("Computer science research is largely driven by <em>artefacts</em> &mdash; software, "
      "hardware, datasets, benchmarks and trained models. The reproducibility of these "
      "artefacts depends on honest reporting."),
    ul(["<span class=\"kw\">Benchmark performance.</span> Selective reporting of metrics "
        "&mdash; reporting only the best of many runs &mdash; artificially inflates claimed "
        "performance gains. This constitutes <em>selective honesty</em>: technically true "
        "statements that omit context and mislead readers.",
        "<span class=\"kw\">Algorithm novelty.</span> Claiming an algorithm is "
        "&ldquo;novel&rdquo; when it is essentially a renamed prior method is dishonest even "
        "though it is non-trivial to detect.",
        "<span class=\"kw\">Data integrity.</span> Reporting on a cleaned subset of a dataset "
        "without disclosing exclusions can lead reviewers and readers to draw invalid "
        "conclusions."]),
    box("caution", "The undergraduate version of the same offence",
        p("Reporting a single best run without the variance across random seeds is selective "
          "honesty. Every sentence is true, and the report still misleads.")),

    sub("3.3 Honest Error versus Misconduct", "s3-3"),
    p("Not every wrong result is misconduct. Science advances by correcting honest error. The "
      "distinction rests on <span class=\"kw\">intent</span> and "
      "<span class=\"kw\">transparency</span>."),
    tw(table(["Dimension", "Honest error", "Misconduct"], [
        ["Intent", "Unintentional, accidental", "Willful or reckless"],
        ["Response to discovery", "Open acknowledgment, correction", "Concealment, denial"],
        ["Documentation", "Reproducible records of process", "Inconsistent, missing"],
        ["Frequency", "Sparse and explainable", "A pattern of irregularities"],
    ])),
    p("The <span class=\"kw\">FFP framework</span> &mdash; fabrication, falsification, "
      "plagiarism &mdash; is the basis of research-integrity policy worldwide. Honesty is the "
      "positive counterpart that prevents FFP in the first place. Note that "
      "<em>reckless</em> sits on the misconduct side: negligence severe enough to disregard "
      "obvious checks is not excused by absence of intent to deceive."),
    box("exam", "The decisive row",
        p("<span class=\"kw\">Response to discovery</span> is the decisive dimension in "
          "practice: how a researcher behaves in the hour after finding their own error is the "
          "clearest available signal of character. Admitting an error is a professional act, "
          "not a confession &mdash; a culture that punishes correction manufactures "
          "concealment.")),

    sub("3.4 Operational Practices", "s3-4"),
    ul(["Maintain a tamper-evident <span class=\"kw\">research log</span> &mdash; a "
        "version-controlled lab notebook. This is the cheapest available protection, because "
        "it produces exactly the documentation that distinguishes error from misconduct if a "
        "claim is challenged.",
        "Preserve <span class=\"kw\">raw data</span> with metadata indefinitely where feasible.",
        "Adopt <span class=\"kw\">pre-registration</span> for confirmatory studies.",
        "Uphold <span class=\"kw\">double-blind review</span> norms, which deflate the "
        "incentive for selective reporting."]),

    sec(4, "Principle II &mdash; Objectivity", "s4"),
    sub("4.1 Definition and Scope", "s4-1"),
    box("def", "Definition &mdash; Objectivity",
        p("<span class=\"kw\">Objectivity</span> is the commitment to let evidence &mdash; not "
          "personal interest, ideology, prior commitment or external pressure &mdash; drive "
          "the design, analysis and interpretation of research. It is the discipline of "
          "allowing the data to speak, even when the message is unwelcome.")),
    ul(["Design experiments and evaluations that can <em>in principle falsify</em> a "
        "hypothesis.",
        "Avoid conflicts of interest, or disclose them when unavoidable.",
        "Distinguish empirical observation from interpretation.",
        "Submit claims to peer scrutiny rather than defend them rhetorically."]),

    sub("4.2 The CS-Specific Illusion, and Three Pressure Points", "s4-2"),
    p("Computer science is often perceived as &ldquo;objective&rdquo; because it deals with "
      "formal systems. Yet every layer of an empirical CS study &mdash; from dataset choice, "
      "to hyperparameter selection, to evaluation metric &mdash; is shaped by human "
      "judgement. <span class=\"kw\">Objectivity is a regulative ideal</span>, requiring "
      "continuous effort, not a property conferred by the subject matter."),
    ol(["<span class=\"kw\">Confirmation bias in algorithm design.</span> A researcher "
        "emotionally invested in a proposed algorithm may unconsciously design benchmarks "
        "that favour it. Robust objectivity requires running baselines under matched "
        "conditions, using standard suites, and reporting performance across the full "
        "distribution of inputs rather than cherry-picked cases.",
        "<span class=\"kw\">Conflicts of interest.</span> Industry funding, equity stakes, "
        "consulting relationships and personal relationships can compromise the disinterested "
        "stance objectivity requires. Disclosure is necessary but <em>never fully "
        "neutralising</em>; readers should interpret funded work accordingly.",
        "<span class=\"kw\">Significance hunting.</span> Although computing research rarely "
        "uses null-hypothesis significance testing in the biomedical sense, analogous risks "
        "exist. Tweaking architectures, hyperparameters, random seeds or preprocessing "
        "pipelines until a result &ldquo;works&rdquo; corrodes objectivity even when each "
        "individual technique is conventional."]),

    sub("4.3 Objectivity as Technical Competence", "s4-3"),
    p("Objectivity is, in part, a competence: a researcher who cannot quantify uncertainty "
      "cannot report it honestly, however good their intentions. Consider a claim that a new "
      "compiler optimisation yields a mean speedup of 12 per cent over a baseline. Without "
      "confidence intervals, standard deviations, hardware variance and sample-size "
      "justification, the claim is <em>technically a number but not an empirical finding</em>."),
    eq("Cohen's d = (&mu;<sub>new</sub> &minus; &mu;<sub>baseline</sub>) / &sigma;<sub>pooled</sub>",
       "effect size"),
    eq("95% CI: x&#772; &plusmn; t<sub>0.025, n&minus;1</sub> &middot; (s / &radic;n)",
       "uncertainty"),
    p("The first expression gives effect size; the second gives uncertainty. Effect size "
      "without uncertainty overstates confidence; uncertainty without effect size obscures "
      "practical relevance. Together they allow readers to assess the claim "
      "<span class=\"kw\">on its merits rather than on the author's enthusiasm</span>."),

    sub("4.4 Operational Practices", "s4-4"),
    ul(["Use <span class=\"kw\">pre-registered</span> experimental protocols where appropriate.",
        "Apply <span class=\"kw\">blinding</span> in evaluation: whoever runs the benchmarks "
        "should not know which system is the proposed one.",
        "Disclose all <span class=\"kw\">conflicts of interest</span> explicitly.",
        "Encourage <span class=\"kw\">adversarial collaboration</span> &mdash; design the "
        "experiment a sceptic would accept, before running it."]),

    sec(5, "Principle III &mdash; Integrity", "s5"),
    sub("5.1 Definition and Scope", "s5-1"),
    box("def", "Definition &mdash; Integrity",
        p("<span class=\"kw\">Integrity</span> is the consistent and coherent application of "
          "ethical principles across the entire research lifecycle. Where honesty pertains to "
          "specific statements and data, integrity pertains to the <em>character</em> and "
          "<em>consistency</em> of the researcher.")),
    p("A researcher of integrity acts ethically even when no one is watching, when peer "
      "pressure pushes the other way, and when expedience tempts compromise. Integrity "
      "subsumes:"),
    ul(["Adherence to institutional and professional standards.",
        "Consistency between what one says publicly and what one does privately.",
        "Willingness to take ethical stands that may be costly &mdash; retracting one's own "
        "work, or reporting a colleague's misconduct.",
        "The disposition to ask <em>&ldquo;Is this the right thing to do?&rdquo;</em> before "
        "every significant research decision."]),
    box("exam", "Honesty against integrity",
        p("Honesty can be satisfied statement by statement; integrity cannot be satisfied "
          "piecemeal, because it is the property of a <em>pattern</em> of conduct &mdash; "
          "which is why the frequency row in Section 3.3 matters. Integrity is also only "
          "observable under pressure: conduct that costs nothing tests nothing.")),

    sub("5.2 Integrity in Multi-Author Work", "s5-2"),
    p("Modern CS research is collaborative, so integrity must scale across teams, "
      "institutions and nations."),
    ul(["<span class=\"kw\">Authorship attribution.</span> The "
        "<span class=\"kw\">CRediT</span> (Contributor Roles Taxonomy) provides fourteen "
        "roles: conceptualisation, methodology, software, validation, formal analysis, "
        "investigation, data curation, writing &ndash; original draft, writing &ndash; review "
        "and editing, visualisation, supervision, project administration, funding "
        "acquisition, resources. Misattribution of these roles is an integrity violation.",
        "<span class=\"kw\">Gift and ghost authorship.</span> Including someone who did not "
        "meaningfully contribute, or omitting a contributor whose work materially shaped the "
        "paper, are both breaches. The second is the one that harms students.",
        "<span class=\"kw\">Order of authorship.</span> The CS convention of alphabetical "
        "ordering sometimes masks the actual contribution order. Integrity requires "
        "transparent disclosure when the alphabet misrepresents the work distribution."]),
    p("Agreeing roles in writing <em>before</em> submission prevents nearly every authorship "
      "dispute that reaches a supervisor."),

    sub("5.3 Integrity in Mentoring and Supervision", "s5-3"),
    p("Computer science research is heavily mentored, and an advisor's integrity directly "
      "shapes a student's professional formation. Practices that compromise integrity "
      "include:"),
    ul(["Pressuring students to keep the lab's &ldquo;story&rdquo; consistent in review "
        "responses.",
        "Accepting authorship in exchange for funding or lab resources.",
        "Failing to credit students whose code, datasets or experiments populate papers."]),
    p("The power asymmetry here is real rather than symmetric: students are the party "
      "structurally exposed to both ghost authorship and mentorship failure."),

    sub("5.4 Whistleblowing and the Costs of Integrity", "s5-4"),
    p("Whistleblowers often pay a price &mdash; retaliation, social ostracism, stalled careers "
      "&mdash; yet whistleblowing remains essential to the integrity of the scientific system. "
      "Institutional <span class=\"kw\">ombudspersons</span>, confidential reporting channels "
      "and protective policies such as the U.S. Whistleblower Protection Act and "
      "<span class=\"kw\">EU Directive 2019/1937</span> exist to mitigate these costs. "
      "B.Tech graduates entering industry research may one day face such choices."),

    sec(6, "Principle IV &mdash; Respect for Intellectual Property", "s6"),
    sub("6.1 Definition and Scope", "s6-1"),
    box("def", "Definition &mdash; Respect for IP",
        p("<span class=\"kw\">Respect for intellectual property</span> acknowledges that "
          "ideas, expressions, methods, data and code have authors, and that these authors "
          "have legitimate claims over attribution and, in some cases, over use and "
          "commercialisation. It bridges ethics and law &mdash; and it extends "
          "<em>beyond what the law strictly requires</em>.")),

    sub("6.2 Five Categories in CS Research", "s6-2"),
    ol(["<span class=\"kw\">Textual IP.</span> <em>Verbatim plagiarism</em> (copying without "
        "quotation marks or citation) and <em>idea plagiarism</em> (paraphrasing an argument "
        "so closely that structure and substance remain the source's). Computer science "
        "papers are densely argumentative, so the threshold for attribution is <em>lower</em> "
        "than in many other disciplines: even a single lifted sentence is misconduct.",
        "<span class=\"kw\">Software and code IP.</span> Do not copy open-source code without "
        "honouring licence terms &mdash; GPL, MIT, Apache and BSD impose materially different "
        "obligations. Do not re-implement a protected expressive structure after reading "
        "another team's code. Cite the software libraries used in experiments, and deposit "
        "your own code where possible under a permissive licence.",
        "<span class=\"kw\">Data IP.</span> Cite dataset creators; respect licences (Creative "
        "Commons variants, dataset-specific terms); do not redistribute restricted-access "
        "datasets through side channels; respect the consent terms under which human-subjects "
        "data were collected.",
        "<span class=\"kw\">Algorithmic and methodological IP.</span> Even unpatented "
        "algorithms have authors. The community convention is eponymous citation: RSA "
        "(Rivest&ndash;Shamir&ndash;Adleman), Dijkstra's algorithm, the Adam optimizer (Kingma "
        "and Ba), the Transformer (Vaswani et al.), ResNet (He et al.).",
        "<span class=\"kw\">Trademark and brand IP.</span> Naming a system after a "
        "competitor's trademarked product, or using screenshots of proprietary software "
        "beyond fair-use bounds, can infringe trademark and copyright &mdash; and even where "
        "legally defensible may be unprofessional."]),

    sub("6.3 The Legal&ndash;Ethical Boundary", "s6-3"),
    p("IP law varies by jurisdiction and is broader than research ethics in some respects "
      "(patent law) and narrower in others: many forms of idea plagiarism are legal but "
      "unethical."),
    tw(table(["Act", "Legal status", "Ethical status"], [
        ["Verbatim copying of text without citation",
         "Generally not illegal in small amounts (fair use)", "Unethical"],
        ["Re-implementing an algorithm from reading prior code", "Generally legal",
         "Often unethical"],
        ["Using a copyrighted figure in a review paper", "Often permitted under fair use",
         "Still requires citation"],
        ["Falsifying results", "Not typically illegal",
         "Unethical; sometimes illegal (e.g. federal grants)"],
        ["Stockpiling research data for years", "Generally legal",
         "May be unethical if it blocks community progress"],
    ])),
    box("exam", "Legal is the floor, not the standard",
        p("The ethical principle of respect for IP operates independently of, and often more "
          "strictly than, the legal minimum. <em>&ldquo;It is legal&rdquo;</em> is never a "
          "sufficient answer to an ethical question. Legal compliance is assessed by counsel "
          "after the fact; ethical compliance is assessed by the community continuously, and "
          "reputational sanction does not require a court.")),
    p("Operational practices: track every idea, method and quotation in a citation manager "
      "(Zotero, Mendeley, EndNote); run submitted papers through plagiarism-detection "
      "software before submission; maintain a licence-awareness checklist for every "
      "dependency used in research code; and when paraphrasing, ensure the <em>structure</em> "
      "as well as the wording is your own."),

    sec(7, "How the Four Principles Interact", "s7"),
    p("The four principles are not independent. A single act of conduct can implicate all "
      "four:"),
    ul(["<span class=\"kw\">Fabricating data</span> is dishonest; it lacks objectivity in the "
        "sense that evidence is decoupled from inference; it reflects a failure of integrity; "
        "and it disrespects the community whose trust is being betrayed.",
        "<span class=\"kw\">Plagiarising</span> disrespects IP, is dishonest about authorship "
        "contribution, compromises the integrity of the scholarly record, and skews the "
        "objectivity of the literature by inflating apparent support for claims."]),
    box("exam", "The five-test diagnostic workflow",
        ol(["<span class=\"kw\">Honesty test</span> &mdash; can I state this plainly, "
            "including what is less flattering?",
            "<span class=\"kw\">Objectivity test</span> &mdash; has the evidence, not my "
            "preference, driven my conclusion?",
            "<span class=\"kw\">Integrity test</span> &mdash; would I be comfortable if this "
            "decision were reported in the campus newspaper?",
            "<span class=\"kw\">IP-respect test</span> &mdash; have I given proper credit to "
            "sources, code, data and methods?",
            "<span class=\"kw\">Public-reason test</span> &mdash; can I justify this decision "
            "in a forum of respected peers?"])
        + p("If all five pass, the decision is almost certainly ethical. If any fails, further "
            "reflection &mdash; or consultation with an advisor or ethics officer &mdash; is "
            "warranted. A failed test is a prompt to consult, not a verdict of guilt.")),

    sec(8, "Case Studies", "s8"),
    tw(table(["Scenario", "Principle implicated", "Verdict and best practice"], [
        ["**Trimmed benchmarks.** A proposed architecture underperforms three baselines; after "
         "re-runs and tuning it wins; only the final results are reported",
         "Honesty, partly Integrity",
         "Misconduct. Report the full set of runs, document the hyperparameter search "
         "protocol, use statistical tests"],
        ["**The borrowed paragraph.** A survey paragraph, synonyms swapped, no citation",
         "Respect for IP",
         "High severity. Reread, set aside, rewrite with citation &mdash; or quote verbatim "
         "with marks"],
        ["**The ghost in the code.** A student implements and evaluates; the advisor adds a "
         "paragraph, places both names on the byline, and says authorship will be sorted out "
         "later", "Integrity",
         "Agree authorship before submission under a documented policy consistent with the "
         "venue's standards"],
        ["**The open-source re-use trap.** A GPL-licensed library is forked, modified and used "
         "inside a closed-source commercial product", "Respect for IP, Integrity",
         "Derivative work. High legal exposure and a clear ethical breach. Maintain a "
         "dependency licence inventory"],
        ["**The convenient control experiment.** A known, recently published open-source "
         "baseline that outperforms the system is silently omitted", "Objectivity",
         "High severity. Disclose all known relevant comparators and explain any exclusion"],
    ])),
    box("caution", "The pattern worth noticing",
        p("In four of these five cases the offending act is an <span class=\"kw\">omission, "
          "not a falsehood</span>. This is why the honesty test asks specifically about "
          "<em>what is less flattering</em>. Students expect misconduct to look like lying; "
          "most of it looks like things left unsaid.")),

    sec(9, "Summary", "s9"),
    ul(["<span class=\"kw\">Honesty</span> demands truthful reporting of methods, data and "
        "findings; it is the antidote to fabrication, falsification and selective reporting.",
        "<span class=\"kw\">Objectivity</span> demands that evidence rather than interest "
        "drives inference; it requires management of conflicts of interest, avoidance of "
        "confirmation bias, and methodological rigour.",
        "<span class=\"kw\">Integrity</span> demands consistency of ethical conduct across the "
        "entire research lifecycle, including authorship, mentorship and the willingness to "
        "defend the truth when it is costly.",
        "<span class=\"kw\">Respect for intellectual property</span> demands attribution of "
        "ideas, text, code, data and methods, together with compliance with the licences under "
        "which they are shared.",
        "These principles operate together: weakness in one weakens the system as a whole. In "
        "computer science, adherence is <em>constitutive of the discipline's claim to "
        "scientific status</em>."]),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Revision concept map",
        ul(["Honest error versus misconduct &mdash; intent, response, documentation, frequency.",
            "Fabrication &mdash; Falsification &mdash; Plagiarism (FFP).",
            "Selective reporting versus negative-results reporting.",
            "Objectivity versus confirmation bias versus conflict of interest.",
            "Integrity versus honesty &mdash; character against specific statement.",
            "Authorship: gift, ghost, alphabetical, CRediT roles.",
            "IP categories: text, code, data, algorithms, trademarks.",
            "Licence compliance: GPL, MIT, Apache, BSD, CC variants.",
            "The five-test diagnostic workflow."])),
    box("exam", "Answer technique",
        p("Name the <span class=\"kw\">principle</span>, then the specific "
          "<span class=\"kw\">obligation breached</span>, then the "
          "<span class=\"kw\">remedy</span>. Prefer the omission-detecting reading of a "
          "scenario: most examination cases turn on what was left undisclosed. Answers that "
          "merely narrate the scenario lose most of the available marks.")),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Define <em>research integrity</em> and distinguish it from <em>research "
           "honesty</em>, with one example from computer science. " + marks("3 marks"),
           "Explain why selective reporting of benchmark results violates honesty even when no "
           "data are fabricated. " + marks("3 marks"),
           "Distinguish <em>idea plagiarism</em> from <em>verbatim plagiarism</em> and provide "
           "one example relevant to a literature review. " + marks("3 marks"),
           "Describe the role of the CRediT taxonomy in supporting integrity in multi-author "
           "work. " + marks("2 marks"),
           "Why is the legal&ndash;ethical boundary important when discussing respect for "
           "intellectual property? Provide one example. " + marks("3 marks"),
           "State the five-test diagnostic workflow and apply it to a scenario of your "
           "choosing. " + marks("5 marks")]),

    sub("10.2 Long-Answer Questions", "s10-2"),
    qlist(["<em>&ldquo;Objectivity is a regulative ideal, not a state.&rdquo;</em> Discuss "
           "with reference to conflicts of interest, confirmation bias and benchmark design in "
           "contemporary machine learning research. " + marks("10 marks"),
           "Analyse a case in which each of the four foundational principles is implicated. "
           "Discuss the institutional mechanisms that can catch or correct such a violation. "
           + marks("10 marks"),
           "Compare the protection of textual IP, software IP and data IP in computer science "
           "research. What licence-attribution practices should a B.Tech project adopt? "
           + marks("10 marks")]),

    sub("10.3 Applied Scenarios", "s10-3"),
    box("eg", "Decide and justify",
        ol(["You are a third-year B.Tech student co-authoring a paper with a peer who has "
            "removed your name from the byline because they disagree with your recent "
            "methodological criticism. How do you proceed, and which principles are at stake?",
            "Your advisor pressures you to report benchmark results from a partial dataset "
            "because &ldquo;the full dataset will take too long&rdquo;. Identify the principles "
            "and propose a constructive course of action.",
            "You find an elegant open-source implementation that does almost what you need. "
            "Compare three options: (a) fork and modify, citing the source; (b) reimplement "
            "from scratch using only the paper's description; (c) use as-is and relicense. "
            "Discuss the IP and integrity implications of each."])),

    sec(11, "Further Reading", "s11"),
    ol(["<em>Singapore Statement on Research Integrity</em> (2010).",
        "<em>European Code of Conduct for Research Integrity</em>, revised edition (ALLEA, 2023).",
        "<em>ACM Code of Ethics and Professional Conduct</em> (2018).",
        "Resnik, D. B. <em>What Is Ethics in Research &amp; Why Is It Important?</em> "
        "National Institute of Environmental Health Sciences.",
        "Steneck, N. H. <em>Introduction to the Responsible Conduct of Research</em>. Office "
        "of Research Integrity, U.S. Department of Health and Human Services.",
        "Pineau, J., et al. (2021). Improving Reproducibility in Machine Learning Research: A "
        "Report from the NeurIPS 2019 Reproducibility Program. <em>Journal of Machine Learning "
        "Research</em>."]),
])
