# -*- coding: utf-8 -*-
"""Unit III - Lecture 5: Plagiarism Prevention Strategies."""
from kit import (box, card, codeline, flow, gauge, goals, grid, marks, ol, p,
                 qlist, rule, sec, stack, sub, table, tw, ul, eq)

STEM = "CSEG3060_Unit3_L05_Plagiarism_Prevention_Strategies"
RUNNER = "CSEG3060 · Unit III · Lecture 5 — Plagiarism Prevention Strategies"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 5 — Plagiarism Prevention Strategies",
    "desc": ("Unit III Lecture 5 for Research Methodology in Computer Science "
             "(CSEG3060): proper paraphrasing and the five-step method, APA and IEEE "
             "citation styles, reference management with Mendeley, Zotero and BibTeX, and "
             "interpreting Turnitin and URKUND similarity reports."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Plagiarism Prevention Strategies",
     "body": stack([
         p("Paraphrasing, citation styles, reference management and similarity checking",
           "lead", "max-width:850px;color:var(--mint)"),
         card(p("Knowing that plagiarism is wrong prevents nothing. A workflow does.", None,
                "margin:0;font-size:21px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 5 of 8 · 60 minutes · CO3", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO3",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**LO1 · Understand** — differentiate acceptable paraphrasing from disguised copying",
         "**LO2 · Apply** — use APA 7th and IEEE citation styles correctly",
         "**LO3 · Apply** — organise sources and generate bibliographies with Mendeley or Zotero",
         "**LO4 · Analyse** — interpret Turnitin / URKUND similarity reports and act on them",
         "**LO5 · Create** — formulate a personal anti-plagiarism workflow for your thesis",
     ]), None, "fill")},

    {"title": "The four pillars", "kicker": "Orientation",
     "h": "From the philosophy of ethics to its practice",
     "body": stack([
         rule("Knowing that plagiarism is unethical is <b>necessary but not sufficient</b>. "
              "The operational skills that prevent it fall into four interrelated domains."),
         grid([
             card(p("Restating ideas in your own voice while preserving meaning.",
                    "fine", "margin:0"), "1 · Paraphrasing", "teal"),
             card(p("The formal language that credits sources unambiguously.",
                    "fine", "margin:0"), "2 · Citation styles", "teal"),
             card(p("Systematic organisation of bibliographic data.", "fine", "margin:0"),
                  "3 · Reference management", "teal"),
             card(p("The technological verification layer that confirms originality.",
                    "fine", "margin:0"), "4 · Detection tools", "teal"),
         ], "1fr 1fr 1fr 1fr", gap="10px"),
         table(["Term", "Meaning"], [
             ["**Paraphrase**", "Restatement in different words **and structure**, meaning preserved"],
             ["**Citation**", "In-text reference acknowledging the source of an idea or finding"],
             ["**Similarity index**", "Percentage of submitted text matching comparison databases"],
             ["**Originality report**", "Annotated output showing matched sources and overlap statistics"],
         ]),
         p("They reinforce each other: annotation during reading feeds paraphrasing; the "
           "reference manager supplies the citation; the similarity check verifies the result.",
           "fine", "margin:0"),
     ], 11)},

    {"title": "What we are preventing", "kicker": "Target",
     "h": "Each pillar defeats a specific failure mode",
     "body": stack([
         table(["Type", "Description", "Severity"], [
             ["**Direct**", "Verbatim copying without quotation marks or citation", "Most severe"],
             ["**Mosaic / patchwork**", "Mixing phrases from multiple sources without citation", "Severe"],
             ["**Idea**", "Using another's conceptual framework without attribution", "Severe"],
             ["**Self**", "Reusing one's own published work without disclosure", "Moderate to severe"],
             ["**Accidental**", "Unintentional misuse through poor note-taking", "Moderate"],
         ]),
         grid([
             card(p("Accidental &rarr; <b>reference management</b><br>"
                    "Mosaic &rarr; <b>genuine paraphrasing</b><br>"
                    "Direct &rarr; <b>quotation and citation</b><br>"
                    "Idea &rarr; <b>attributing concepts, not only sentences</b>",
                    "small", "margin:0"), "The prevention mapping", "teal"),
             card(p("CS papers contain <b>algorithms, pseudocode and architectural "
                    "diagrams</b>. Copying an algorithm description and presenting it as your "
                    "own contribution is plagiarism <b>even if the words are modified</b> — "
                    "the idea belongs to its author.", "small", "margin:0"),
                  "Why CS is distinctive", "rust"),
         ]),
     ], 11)},

    {"title": "Paraphrasing I", "kicker": "Pillar 1 · part 1",
     "h": "Patchwriting versus genuine paraphrase",
     "body": stack([
         rule("<b>Patchwriting</b> — replacing a few words with synonyms while leaving the "
              "sentence structure intact — is a form of plagiarism, because it preserves the "
              "original author's <b>syntax and voice</b> without attribution."),
         grid([
             card(ul(["The **sentence structure changes completely**",
                      "The **vocabulary** suits your own discipline and audience",
                      "**Fidelity** to the original meaning is maintained",
                      "A **citation** is included even though no original words remain"],
                     None, "margin:0;font-size:14px"),
                  "Four requirements of a genuine paraphrase", "teal"),
             card(ol(["**Read and comprehend** the passage thoroughly",
                      "**Set aside** the original so it cannot be visually copied",
                      "**Restate** the idea in your own words and structures",
                      "**Compare** against the original for accuracy and originality",
                      "**Cite** the source"], None, "margin:0;font-size:14px"),
                  "The five-step method", "rust"),
         ]),
         card(p("<b>Step 2 is the load-bearing one.</b> Paraphrasing with the source in view "
                "produces patchwriting almost automatically, because the eye supplies the "
                "original syntax before the mind supplies an alternative.", "small", "margin:0"),
              None, "tint"),
     ], 12)},

    {"title": "Paraphrasing II", "kicker": "Pillar 1 · part 2",
     "h": "A worked example — three versions",
     "body": stack([
         card(p("<i>“Deep learning is a particular kind of machine learning that achieves "
                "great power and flexibility by learning to represent the world as a nested "
                "hierarchy of concepts, with each concept defined in relation to simpler "
                "concepts.”</i>", "small", "margin:0"),
              "Original — Goodfellow, Bengio &amp; Courville (2016, p. 96)", "tint"),
         card(p("<i>“Deep learning is a <b>specific type</b> of machine learning that achieves "
                "<b>high</b> power and flexibility by learning to represent the world as a "
                "nested hierarchy of concepts, <b>where</b> each concept is defined in "
                "relation to simpler <b>ones</b>.”</i><br>"
                "<b>Critique:</b> only synonyms changed; sentence structure intact. Turnitin "
                "will flag it.", "small", "margin:0"),
              "Unacceptable — patchwriting", "rust"),
         card(p("<i>“By modeling reality through layers of increasingly abstract "
                "representations — where each higher-level construct is built upon the "
                "lower-level ones — deep learning derives its representational capacity from "
                "hierarchical feature composition, distinguishing it from classical machine "
                "learning paradigms (Goodfellow et al., 2016).”</i><br>"
                "<b>Critique:</b> structure inverted, vocabulary domain-appropriate, meaning "
                "preserved, citation included.", "small", "margin:0"),
              "Acceptable — genuine paraphrase", "teal"),
         rule("<b>Diagnostic question for your own draft:</b> could a reader reconstruct the "
              "original sentence's skeleton from mine? If yes, it is patchwriting."),
     ], 10)},

    {"title": "Quote, paraphrase, summarise", "kicker": "Pillar 1 · part 3",
     "h": "Choosing the right instrument",
     "body": stack([
         table(["Technique", "When to use", "Length", "Citation requirement"], [
             ["**Quotation**", "The original wording is uniquely authoritative or stylistically essential",
              "Exact words; usually ≤ 40 words", "Required **plus quotation marks**"],
             ["**Paraphrase**", "The idea matters but the wording does not",
              "Approximately the original's length", "Required (no quotation marks)"],
             ["**Summary**", "A long passage must be condensed",
              "Substantially shorter", "Required (no quotation marks)"],
         ]),
         grid([
             card(p("Reserve <b>direct quotation</b> for definitions, formal theorems and "
                    "standards language. Use <b>paraphrase</b> for algorithm descriptions and "
                    "prior-work summaries.", "small", "margin:0"),
                  "Rule of thumb for CS theses", "teal"),
             card(p("Paraphrasing a <i>shall</i> clause from an IEEE standard or an RFC can "
                    "change its normative meaning. Quote it.", "small", "margin:0"),
                  "The standards exception", "rust"),
         ]),
         rule("<b>All three require citation.</b> Removing quotation marks does not remove the "
              "obligation — it changes which obligation applies. The belief that “no quotation "
              "marks means no citation needed” is the direct cause of mosaic plagiarism."),
     ], 11)},

    {"title": "Citation styles I", "kicker": "Pillar 2 · part 1",
     "h": "The same source, rendered two ways",
     "body": stack([
         grid([
             stack([
                 card(p("<i>Recent work has demonstrated the efficacy of transformer "
                        "architectures for low-resource NLP tasks <b>(Devlin et al., "
                        "2019)</b>.</i>", "small", "margin:0"), "APA 7th — in-text, paraphrase", "teal"),
                 card(p("<i>“The model architecture is a multi-layer bidirectional Transformer "
                        "encoder” <b>(Devlin et al., 2019, p. 4171)</b>.</i>",
                        "small", "margin:0"), "APA 7th — quotation, with page", "teal"),
                 card(p("Devlin, J., Chang, M.-W., Lee, K., &amp; Toutanova, K. (2019). BERT: "
                        "Pre-training of deep bidirectional transformers for language "
                        "understanding. <i>Proceedings of NAACL-HLT</i>, 4171–4186. "
                        "https://doi.org/10.18653/v1/N19-1423", "fine", "margin:0"),
                      "APA reference entry", "tint"),
             ], 9),
             stack([
                 card(p("<i>Recent work has demonstrated the efficacy of transformer "
                        "architectures for low-resource NLP tasks <b>[1]</b>.</i>",
                        "small", "margin:0"), "IEEE — in-text", "rust"),
                 card(p("[1] J. Devlin, M.-W. Chang, K. Lee, and K. Toutanova, “BERT: "
                        "Pre-training of deep bidirectional transformers for language "
                        "understanding,” in <i>Proc. NAACL-HLT</i>, 2019, pp. 4171–4186, "
                        "doi: 10.18653/v1/N19-1423.", "fine", "margin:0"),
                      "IEEE reference entry", "tint"),
                 card(p("Author set, title, venue, year, pages and DOI appear in <b>both</b>. "
                        "Only the ordering, punctuation and in-text marker differ. Learning a "
                        "style is learning a convention, not new content.", "small", "margin:0"),
                      "What stays constant", "teal"),
             ], 9),
         ]),
     ], 10)},

    {"title": "Citation styles II", "kicker": "Pillar 2 · part 2",
     "h": "Element comparison, selection and style drift",
     "body": stack([
         table(["Element", "APA 7th", "IEEE"], [
             ["**In-text marker**", "(Author, Year)", "[Number]"],
             ["**Reference ordering**", "Alphabetical by author", "Order of appearance"],
             ["Article title case", "Sentence case", "Lower case except proper nouns"],
             ["DOI format", "https://doi.org/…", "doi: 10.…"],
             ["Author name format", "Last, F. M.", "F. Last"],
         ]),
         grid([
             card(p("<b>IEEE</b> — IEEE, ACM, Springer LNCS and Elsevier submissions, and most "
                    "B.Tech/M.Tech theses in Indian universities including UPES.<br>"
                    "<b>APA</b> — HCI, cognitive science, education research, interdisciplinary "
                    "work.<br><b>ACM Reference Format</b> — for ACM venues specifically.",
                    "small", "margin:0"), "Which style, when", "teal"),
             card(p("Beginning in APA and switching to IEEE mid-document produces a mixed "
                    "bibliography that IEEE reviewers <b>reject outright</b>. Fix the style at "
                    "the <b>start</b>, configure the reference manager to it exclusively, and "
                    "verify against the official manual before submission.",
                    "small", "margin:0"), "Style drift and its remedy", "rust"),
         ]),
         rule("IEEE numbering by <b>order of appearance</b> means inserting one new citation "
              "renumbers everything downstream — which is precisely why manual citation "
              "management fails at thesis scale."),
     ], 11)},

    {"title": "Reference management I", "kicker": "Pillar 3 · part 1",
     "h": "The big three compared",
     "body": stack([
         rule("A B.Tech thesis typically carries <b>30–80 references</b>. At that scale manual "
              "citation management guarantees errors in ordering, formatting and completeness."),
         table(["Feature", "Mendeley", "Zotero", "EndNote"], [
             ["Developer", "Elsevier", "Roy Rosenzweig Center (open source)", "Clarivate"],
             ["Cost", "Free, optional premium", "Free, open source", "Paid institutional licence"],
             ["PDF storage", "Excellent", "Excellent (with web plugin)", "Good"],
             ["Word integration", "Yes", "Yes", "Yes"],
             ["Browser capture", "Web Importer", "Connector", "Web capture"],
             ["Collaboration", "Private groups", "Group libraries", "Shared libraries"],
             ["Best for", "PDF-heavy workflows", "Open-source advocates", "Large institutional projects"],
         ]),
         grid([
             card(p("Mis-ordered numeric citations · inconsistent author formats · missing "
                    "DOIs · orphaned in-text markers · forgotten references — the mechanical "
                    "causes of accidental plagiarism.", "small", "margin:0"),
                  "What the tool eliminates", "teal"),
             card(p("It does <b>not</b> decide whether a citation is <i>needed</i>. That "
                    "judgement remains yours.", "small", "margin:0"),
                  "What it does not do", "rust"),
         ]),
     ], 10)},

    {"title": "Reference management II", "kicker": "Pillar 3 · part 2",
     "h": "The six-step workflow, and LaTeX",
     "body": stack([
         flow(["1 Capture", "2 Organise", "3 Annotate", "4 Cite while writing",
               "5 Verify", "6 Back up"]),
         grid([
             card(ul(["**Capture** — browser connector; save from Scholar, IEEE Xplore, ACM DL, SpringerLink, arXiv",
                      "**Organise** — folders by chapter; rename PDFs `Author_Year_Keyword_Title.pdf`",
                      "**Annotate** — highlight and note inside the PDF: *this builds the scaffolding for paraphrasing*",
                      "**Cite while writing** — insert from the plugin; **never type citations manually**",
                      "**Verify** — cross-check against the style manual; tools miss conference-vs-journal nuances",
                      "**Back up** — synchronise weekly; a lost library is a research catastrophe"],
                     None, "margin:0;font-size:13px"), None, "teal"),
             stack([
                 card(p("Mendeley and Zotero export <code>.bib</code> files consumed by "
                        "<b>BibTeX</b> (legacy, universal) or <b>biblatex</b> (modern, "
                        "flexible). The <b>Better BibTeX</b> Zotero plugin generates stable "
                        "keys such as <code>vaswani2017attention</code>.", "small", "margin:0"),
                      "LaTeX workflow"),
                 card(codeline("@inproceedings{devlin2019bert,") +
                      codeline("&nbsp; author = {Jacob Devlin and Ming-Wei Chang and ...},") +
                      codeline("&nbsp; title = {{BERT}: Pre-training of Deep ...},") +
                      codeline("&nbsp; booktitle = {Proceedings of NAACL-HLT},") +
                      codeline("&nbsp; year = {2019}, pages = {4171--4186}}"),
                      None, "tint", "padding:12px"),
             ], 9),
         ], "1.1fr 1fr"),
         p("The double braces around <code>{BERT}</code> stop BibTeX lowercasing the acronym "
           "under IEEE style — a reminder that the tool is a program, not a formatter.",
           "fine", "margin:0"),
     ], 9)},

    {"title": "Detection tools", "kicker": "Pillar 4 · part 1",
     "h": "What Turnitin and URKUND actually measure",
     "body": stack([
         rule("These tools <b>do not detect plagiarism — they detect textual similarity</b>. "
              "Interpretation is a human responsibility. A match is not plagiarism; an "
              "<b>unattributed</b> match may be."),
         grid([
             card(p("Billions of continuously updated pages", "fine", "margin:0"),
                  "1 · Internet archive", "tint"),
             card(p("Journal articles, conference proceedings, e-books", "fine", "margin:0"),
                  "2 · Published content", "tint"),
             card(p("Prior student submissions at the same university", "fine", "margin:0"),
                  "3 · Institutional repository", "tint"),
         ], "1fr 1fr 1fr", gap="10px"),
         grid([
             card(p("Submissions are broken into overlapping text segments; each is matched "
                    "against the databases; a similarity index is computed as matched text "
                    "over total length; colour-coded highlights link each match to its "
                    "suspected source. Integrated into the UPES LMS.", "small", "margin:0"),
                  "Turnitin — how it works", "teal"),
             card(ul(["**Cross-language detection** — identifies translated plagiarism",
                      "**Modular API** for LMS integration",
                      "**Character-by-character analysis** — finer than n-gram matching",
                      "**Generative-AI detection module** added in 2023"],
                     None, "margin:0;font-size:13px"),
                  "URKUND / Ouriginal — distinctive features", "rust"),
         ]),
         p("URKUND was rebranded <b>Ouriginal</b> after a 2020 merger with PlagScan. "
           "<b>MOSS</b> remains the tool for source code; free web checkers offer basic "
           "reports with no reference exclusion.", "fine", "margin:0"),
     ], 9)},

    {"title": "Reading the report", "kicker": "Pillar 4 · part 2",
     "h": "Interpret, then act",
     "body": stack([
         grid([
             stack([
                 gauge([("0–10%", "#1F6F66", "Excellent originality"),
                        ("11–24%", "#86D3C7", "Acceptable with proper attribution"),
                        ("25–50%", "#D9603F", "Substantial similarity; significant revision"),
                        ("&gt; 50%", "#B5452A", "Likely unattributed copying; rewrite")]),
                 card(p("<b>UPES permits 10–20%</b> for theses, excluding references, "
                        "quotations and common methodological phrasing. A <b>0% score does "
                        "not guarantee originality</b> — translated, well-paraphrased and "
                        "non-textual content (code, diagrams) can evade detection.",
                        "small", "margin:0"), None, "tint"),
             ], 10),
             stack([
                 card(ol(["**Review** each highlighted segment individually",
                          "**Identify the source** by clicking the match",
                          "**Classify**: cited quotation / paraphrase with citation / common knowledge / reference entry / **unattributed overlap**",
                          "**Revise** offending passages with the five-step method",
                          "**Resubmit** and confirm the index falls below threshold"],
                         None, "margin:0;font-size:13px"), "Five-step action protocol", "teal"),
                 card(p("<b>27% report.</b> 8% cited quotations · 12% methodological phrasing "
                        "common to all CS theses · 5% reference-list titles · <b>2% one "
                        "uncited paragraph from a survey paper</b>.<br>"
                        "<b>Effective index: 2%.</b> The thesis is in good standing; the one "
                        "paragraph must be rewritten with attribution.", "small", "margin:0"),
                      "Always compute the effective index", "rust"),
             ], 10),
         ]),
     ], 10)},

    {"title": "Cases and your workflow", "kicker": "Case studies",
     "h": "Two traps, and the workflow that avoids them",
     "body": stack([
         grid([
             card(p("<b>Original (McMahan et al., 2017):</b> <i>“Federated learning is a "
                    "machine learning setting where many clients collaboratively train a "
                    "model under the coordination of a central server, while keeping their "
                    "training data decentralized.”</i><br><br>"
                    "<b>Student draft:</b> <i>“Federated learning is a setting of machine "
                    "learning where many clients train a model collaboratively under the "
                    "coordination of a central server, while keeping training data "
                    "decentralized.”</i> — structure preserved, trivial reordering: "
                    "<b>patchwriting</b>.<br><br>"
                    "<b>Corrected:</b> <i>“The federated learning paradigm distributes model "
                    "training across numerous client devices, each retaining local data, "
                    "while a central coordinator aggregates updates without direct access to "
                    "the underlying datasets (McMahan et al., 2017).”</i>",
                    "small", "margin:0"), "Case 1 — the patchwriting trap", "rust"),
             stack([
                 card(p("A student begins coursework in APA, switches to IEEE for the thesis, "
                        "and submits a mixed bibliography. IEEE reviewers reject it "
                        "immediately. <b>Resolution:</b> fix the style at the outset, "
                        "configure the reference manager, verify before submission.",
                        "small", "margin:0"), "Case 2 — citation style drift", "tint"),
                 card(p("Read and annotate &rarr; <b>close the source</b> &rarr; draft the "
                        "paraphrase &rarr; insert the citation from the plugin &rarr; run a "
                        "pre-submission check &rarr; compute the effective index &rarr; "
                        "back up.", "small", "margin:0"), "Your integrated workflow (LO5)", "teal"),
                 card(p("<b>Verification is last, never first.</b> A workflow that begins with "
                        "a similarity check is editing for a score rather than writing with "
                        "integrity.", "small", "margin:0"), None, "rust"),
             ], 9),
         ], "1.15fr 1fr"),
     ], 9)},

    {"title": "Summary and exam focus", "kicker": "Consolidation",
     "h": "What to retain, and what the examiner asks",
     "body": stack([
         grid([
             card(ul(["**Paraphrasing** — comprehension, restructuring, citation; never synonym substitution",
                      "**Citation styles** — IEEE dominates CS; consistency is non-negotiable",
                      "**Reference management** — six steps: capture, organise, annotate, cite, verify, back up",
                      "**Detection tools** — an effective index below **10–20%** after legitimate exclusions"],
                     None, "margin:0;font-size:13px"), "Four takeaways", "teal"),
             card(ol(["Memorise **one** style thoroughly — IEEE; produce in-text and reference entries from memory",
                      "Practise the **five-step method** on three short technical passages",
                      "Install **Mendeley or Zotero**; build a library of 5–10 references",
                      "Self-check a paragraph before formal submission",
                      "Read the **UPES Academic Integrity Code** and confirm your department's threshold"],
                     None, "margin:0;font-size:13px"), "Preparation actions", "rust"),
         ]),
         card(p("Expected items: the three Turnitin databases · components of an IEEE in-text "
                "citation and reference entry · the UPES maximum similarity index excluding "
                "references and quotations · the five-step paraphrasing method with a CS "
                "example · Mendeley versus Zotero · the <b>applied task</b> (two paraphrased "
                "passages with IEEE citations and a justification) · the <b>constructive "
                "task</b> (design and justify a personal anti-plagiarism workflow).",
                "small", "margin:0"), "Exam focus", "tint"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Mark the pivot explicitly: Lecture 4 established what plagiarism is and what it costs; this session is entirely about the operational skills that prevent it. The most common student failure here is moral agreement combined with procedural incompetence.",
    2: "Point out the Bloom progression — the lecture climbs from understand to create, and LO5 is assessed as a constructed workflow rather than recall. LO2 and LO3 are hands-on: students who leave without a reference manager installed have not met them.",
    3: "Establish the pillar ordering as the spine of the lecture. Stress the reinforcement point: a well-annotated PDF library is what makes genuine paraphrase possible, because students who paraphrase from a passage they understood write differently from those staring at a paragraph.",
    4: "Keep this brisk — Lecture 4 covered the typology. Dwell only on the CS-distinctive point, because students believe rewriting an algorithm description in their own words discharges the obligation, when the idea itself still requires citation.",
    5: "Name patchwriting explicitly and repeatedly; students who have never heard the term believe synonym substitution is the skill being asked of them. Closing the PDF before writing changes the output more than any amount of good intention.",
    6: "Display all three versions and let students identify which is acceptable before revealing it — the middle version looks like work, which is why it traps people. Trace the structural inversion aloud so they see what makes it the writer's own sentence.",
    7: "Make the CS rule of thumb the centre: students arriving from school-level writing habits over-quote heavily, and a related-work section built from quotations demonstrates no synthesis at all. Explain the standards exception concretely.",
    8: "Use the same source in both styles so students see the underlying bibliographic record is identical and the style is purely presentational. Note that the APA quotation carries a page number while the paraphrase does not — a distinction examiners test.",
    9: "Draw attention to the ordering row: IEEE numbering by order of appearance means inserting a citation renumbers everything downstream. Present style drift as an ordinary consequence of writing over several months, so the remedy reads as workflow design.",
    10: "State plainly that the tool choice is the least important decision here and adoption timing the most important — a reference manager installed after the draft exists recovers almost none of its value. This pillar is the structural defence against accidental plagiarism.",
    11: "Emphasise step 4 as an absolute rule: manually typed citations are where numbering breaks. Explain the double braces around BERT, since BibTeX will otherwise lowercase the acronym under IEEE style — the tool is a program, not a formatter.",
    12: "Lead with the caveat and repeat it: everything on the next slide depends on students abandoning the belief that the percentage is a verdict. Highlight the institutional-repository database — it is why copying a senior's thesis is the most reliably detected misconduct in a university.",
    13: "Make the 27%-to-2% case the centre: it teaches simultaneously that a frightening number can be benign and that a 2% residue can still require action. Warn that exclusion settings must be configured, or the report misleads both student and supervisor.",
    14: "Run case 1 as a cold-call diagnosis: display the student draft alone and ask whether it is acceptable. Close on the ordering point — a workflow optimised for a low index rather than honest writing is the precise inversion this unit exists to prevent.",
    15: "Return to the guiding claim and ask which pillar a student who agrees plagiarism is wrong but owns no reference manager has actually implemented. Set the three paraphrasing exercises and the installation as compulsory practice: both exam tasks are performance items.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 5 Notes — Plagiarism Prevention Strategies",
    "desc": ("Student notes for Unit III Lecture 5 of CSEG3060: the five-step paraphrasing "
             "method and patchwriting, APA 7th and IEEE citation styles, reference management "
             "with Mendeley, Zotero, EndNote and BibTeX, and interpreting and acting on "
             "Turnitin and URKUND similarity reports."),
    "lecno": "5",
    "lectitle": "Plagiarism Prevention Strategies",
    "subline": ("Paraphrasing, citation styles, reference management and Turnitin/URKUND "
                "&middot; 60 minutes &middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO3", "Paraphrasing", "IEEE &amp; APA", "Zotero / Mendeley",
               "BibTeX", "Similarity reports"],
    "pager": [("CSEG3060_Unit3_L04_Addressing_Plagiarism_Notes.html",
               "&larr; Lecture 4: Addressing Plagiarism"),
              ("CSEG3060_Unit3_L06_Research_Ethics_Principles_Notes.html",
               "Lecture 6: Research Ethics &mdash; Foundational Principles &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 5 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO3",
        p("Demonstrate the ability to conduct ethical research and follow academic integrity "
          "standards through proper literature analysis, citation practices and plagiarism "
          "avoidance.")
        + p("Lecture 4 established what plagiarism is and what it costs. This lecture is "
            "entirely about the <span class=\"kw\">operational skills</span> that prevent it.")),

    box("exam", "How to use these notes",
        p("Knowing that plagiarism is unethical is necessary but not sufficient. Four "
          "competencies do the actual preventing: <span class=\"kw\">paraphrasing</span>, "
          "<span class=\"kw\">citation styles</span>, <span class=\"kw\">reference "
          "management</span> and <span class=\"kw\">detection tools</span>.")
        + p("Two items are hands-on rather than readable: install a reference manager "
            "(Section 5) and practise the five-step method on three technical passages "
            "(Section 3.2). The examination tests both as performance items.")),

    sec(1, "Learning Objectives", "s1"),
    tw(table(["#", "Objective", "Bloom's level"], [
        ["LO1", "Differentiate between acceptable paraphrasing and disguised copying", "Understand"],
        ["LO2", "Apply at least two major citation styles (APA, IEEE) correctly", "Apply"],
        ["LO3", "Use a reference management tool to organise sources and generate bibliographies", "Apply"],
        ["LO4", "Interpret similarity reports from Turnitin/URKUND and act upon them", "Analyse"],
        ["LO5", "Formulate a personal anti-plagiarism workflow for thesis and paper writing", "Create"],
    ])),

    sec(2, "The Four Pillars", "s2"),
    p("Research is a cumulative enterprise, and misrepresenting the source of an idea is "
      "among the most serious violations of academic integrity. The operational skills that "
      "prevent it fall into four interrelated domains:"),
    ol(["<span class=\"kw\">Paraphrasing</span> &mdash; the art of restating ideas in one's "
        "own voice while preserving meaning.",
        "<span class=\"kw\">Citation styles</span> &mdash; the formal language that credits "
        "sources unambiguously.",
        "<span class=\"kw\">Reference management</span> &mdash; the systematic organisation "
        "of bibliographic data.",
        "<span class=\"kw\">Plagiarism detection tools</span> &mdash; the technological "
        "verification layer that confirms originality."]),
    tw(table(["Term", "Meaning"], [
        ["**Paraphrase**", "Restatement of text in different words <em>and structure</em> while preserving meaning"],
        ["**Citation**", "In-text reference acknowledging the source of an idea, finding or quotation"],
        ["**Reference list**", "Comprehensive list of all sources cited in a document"],
        ["**Similarity index**", "Percentage of text in a submission matching comparison databases"],
        ["**Originality report**", "Annotated output indicating matched sources and overlap statistics"],
    ])),
    box("caution", "Each pillar defeats a specific failure mode",
        p("Accidental plagiarism is defeated by <em>reference management</em>; mosaic "
          "plagiarism by <em>genuine paraphrasing</em>; direct plagiarism by <em>quotation "
          "and citation</em>; idea plagiarism by <em>attributing concepts, not only "
          "sentences</em>. The techniques are not interchangeable good habits.")
        + p("Computer science papers frequently include algorithms, pseudocode and "
            "architectural diagrams. Copying an algorithm description from a paper and "
            "presenting it as one's own contribution constitutes plagiarism <em>even if the "
            "words are modified slightly</em> &mdash; the intellectual contribution belongs to "
            "the original author.")),

    sec(3, "Paraphrasing", "s3"),
    sub("3.1 What Paraphrasing Is &mdash; and Is Not", "s3-1"),
    box("caution", "Patchwriting",
        p("A common misconception is that paraphrasing means replacing a few words with "
          "synonyms while leaving the sentence structure intact. This practice, called "
          "<span class=\"kw\">patchwriting</span>, is a form of plagiarism because it "
          "preserves the original author's <em>syntax and voice</em> without attribution.")),
    p("A genuine paraphrase:"),
    ul(["<span class=\"kw\">Changes the sentence structure</span> completely.",
        "<span class=\"kw\">Uses vocabulary</span> appropriate to the writer's own discipline "
        "and audience.",
        "<span class=\"kw\">Maintains fidelity</span> to the original meaning, without "
        "distortion.",
        "<span class=\"kw\">Includes a citation</span>, even though the original words have "
        "not been used."]),

    sub("3.2 The Five-Step Paraphrasing Method", "s3-2"),
    ol(["<span class=\"kw\">Read and comprehend</span> the original passage thoroughly.",
        "<span class=\"kw\">Set aside</span> the original text so it cannot be visually "
        "copied.",
        "<span class=\"kw\">Restate</span> the idea in your own words and sentence structures.",
        "<span class=\"kw\">Compare</span> your paraphrase with the original to ensure "
        "accuracy and originality.",
        "<span class=\"kw\">Cite</span> the source, even though you have not used the "
        "original words."]),
    p("Step 2 is the load-bearing one. Paraphrasing with the source in view produces "
      "patchwriting almost automatically, because the eye supplies the original syntax before "
      "the mind supplies an alternative. Note also the ordering of steps 3 and 4: restate "
      "first, then verify &mdash; checking during composition collapses back into word "
      "substitution. Step 4 also guards against the opposite failure, a paraphrase so free "
      "that it misrepresents the source."),

    sub("3.3 Worked Example", "s3-3"),
    box("eg", "Original &mdash; Goodfellow, Bengio and Courville (2016, p. 96)",
        p("<em>&ldquo;Deep learning is a particular kind of machine learning that achieves "
          "great power and flexibility by learning to represent the world as a nested "
          "hierarchy of concepts, with each concept defined in relation to simpler "
          "concepts.&rdquo;</em>")),
    box("caution", "Unacceptable &mdash; patchwriting",
        p("<em>&ldquo;Deep learning is a specific type of machine learning that achieves high "
          "power and flexibility by learning to represent the world as a nested hierarchy of "
          "concepts, where each concept is defined in relation to simpler ones.&rdquo;</em>")
        + p("<span class=\"kw\">Critique:</span> only synonyms are changed &mdash; "
            "<em>specific</em> for <em>particular</em>, <em>high</em> for <em>great</em>, "
            "<em>where</em> for <em>with</em>. Sentence structure is preserved, and this "
            "would still be flagged by Turnitin.")),
    box("eg", "Acceptable &mdash; genuine paraphrase",
        p("<em>&ldquo;By modeling reality through layers of increasingly abstract "
          "representations &mdash; where each higher-level construct is built upon the "
          "lower-level ones &mdash; deep learning derives its representational capacity from "
          "hierarchical feature composition, distinguishing it from classical machine "
          "learning paradigms (Goodfellow et al., 2016).&rdquo;</em>")
        + p("<span class=\"kw\">Critique:</span> sentence structure inverted, vocabulary "
            "domain-appropriate (<em>representational capacity</em>, <em>hierarchical feature "
            "composition</em>), meaning preserved, citation included.")),
    box("exam", "Diagnostic question for your own draft",
        p("Could a reader reconstruct the original sentence's skeleton from mine? If yes, it "
          "is patchwriting.")),

    sub("3.4 Quotation, Paraphrase or Summary", "s3-4"),
    tw(table(["Technique", "When to use", "Length", "Citation"], [
        ["**Quotation**",
         "When the original wording is uniquely authoritative or stylistically essential",
         "Exact words; usually 40 words or fewer", "Required, plus quotation marks"],
        ["**Paraphrase**", "When the idea is important but the wording is not",
         "Approximately the same length as the original", "Required (no quotation marks)"],
        ["**Summary**", "When condensing a long passage into a brief statement",
         "Substantially shorter than the original", "Required (no quotation marks)"],
    ])),
    p("<span class=\"kw\">Rule of thumb for CS theses:</span> reserve direct quotations for "
      "definitions, formal theorems and standards language; use paraphrases for algorithm "
      "descriptions and prior-work summaries. Paraphrasing a <em>shall</em> clause from an "
      "IEEE standard or an RFC can change its normative meaning, so quote it."),
    box("caution", "All three require citation",
        p("Removing quotation marks does not remove the obligation &mdash; it changes which "
          "obligation applies. The belief that &ldquo;no quotation marks means no citation "
          "needed&rdquo; is the direct cause of mosaic plagiarism.")),

    sec(4, "Citation Styles", "s4"),
    p("A citation style is a standardised format for documenting sources. Choosing the "
      "correct style and applying it consistently is a hallmark of academic rigour. In "
      "computing the dominant styles are <span class=\"kw\">IEEE Editorial Style</span>, "
      "<span class=\"kw\">APA 7th Edition</span> and, for ACM venues, the "
      "<span class=\"kw\">ACM Reference Format</span>."),

    sub("4.1 APA 7th Edition", "s4-1"),
    ul(["<span class=\"kw\">In-text, paraphrase:</span> Recent work has demonstrated the "
        "efficacy of transformer architectures for low-resource NLP tasks (Devlin et al., "
        "2019).",
        "<span class=\"kw\">In-text, direct quotation with page number:</span> &ldquo;The "
        "model architecture is a multi-layer bidirectional Transformer encoder&rdquo; (Devlin "
        "et al., 2019, p. 4171).",
        "<span class=\"kw\">Reference entry:</span> Devlin, J., Chang, M.-W., Lee, K., &amp; "
        "Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for "
        "language understanding. <em>Proceedings of NAACL-HLT</em>, 4171&ndash;4186. "
        "https://doi.org/10.18653/v1/N19-1423"]),

    sub("4.2 IEEE Editorial Style", "s4-2"),
    ul(["<span class=\"kw\">In-text:</span> Recent work has demonstrated the efficacy of "
        "transformer architectures for low-resource NLP tasks [1].",
        "<span class=\"kw\">Reference entry:</span> [1] J. Devlin, M.-W. Chang, K. Lee, and "
        "K. Toutanova, &ldquo;BERT: Pre-training of deep bidirectional transformers for "
        "language understanding,&rdquo; in <em>Proc. NAACL-HLT</em>, 2019, pp. "
        "4171&ndash;4186, doi: 10.18653/v1/N19-1423."]),
    p("Note what stays constant across both: author set, title, venue, year, pages and DOI. "
      "Only the ordering, punctuation and in-text marker differ. Learning a style is learning "
      "a convention, not new content."),

    sub("4.3 Element Comparison", "s4-3"),
    tw(table(["Element", "APA 7th", "IEEE"], [
        ["In-text marker", "(Author, Year)", "[Number]"],
        ["Reference ordering", "Alphabetical by author", "Order of appearance"],
        ["Title case for articles", "Sentence case", "Lower case except proper nouns"],
        ["DOI format", "https://doi.org/&hellip;", "doi: 10.&hellip;"],
        ["Author format", "Last, F. M.", "F. Last"],
    ])),
    p("The ordering row has a practical consequence: IEEE numbering by order of appearance "
      "means that inserting one new citation renumbers everything downstream &mdash; which is "
      "precisely why manual citation management fails at thesis scale."),

    sub("4.4 Which Style, and Style Drift", "s4-4"),
    ul(["<span class=\"kw\">IEEE</span> &mdash; for submissions to IEEE, ACM, Springer LNCS "
        "and Elsevier journals, and most B.Tech and M.Tech theses in Indian universities "
        "including UPES.",
        "<span class=\"kw\">APA</span> &mdash; for HCI, cognitive science, education research "
        "and interdisciplinary work.",
        "<span class=\"kw\">ACM Reference Format</span> &mdash; when submitting to ACM venues."]),
    box("caution", "Style drift",
        p("A student begins writing in APA for a coursework assignment and switches to IEEE "
          "for the project thesis, producing a mixed bibliography. IEEE reviewers reject such "
          "a submission outright, and even APA-only evaluators flag the inconsistency.")
        + p("<span class=\"kw\">Resolution:</span> establish the citation style at the start "
            "of the document, configure the reference management software to use that style "
            "exclusively, and verify the bibliography against the official style guide before "
            "submission. Always confirm the style required by your target venue or supervisor "
            "before writing.")),

    sec(5, "Reference Management", "s5"),
    p("For a B.Tech student managing <span class=\"kw\">30&ndash;80 references</span> across a "
      "thesis, reference management software is not a luxury &mdash; at that scale manual "
      "management guarantees errors in ordering, formatting and completeness."),

    sub("5.1 The Big Three", "s5-1"),
    tw(table(["Feature", "Mendeley", "Zotero", "EndNote"], [
        ["Developer", "Elsevier", "Roy Rosenzweig Center (open source)", "Clarivate"],
        ["Cost", "Free, with optional premium", "Free, open source", "Paid institutional licence"],
        ["PDF storage", "Excellent", "Excellent (with web plugin)", "Good"],
        ["Word integration", "Yes", "Yes", "Yes"],
        ["Browser capture", "Web Importer", "Connector", "Web capture"],
        ["Collaboration", "Private groups", "Group libraries", "Shared libraries"],
        ["Best for", "PDF-heavy workflows", "Open-source advocates", "Large institutional projects"],
    ])),
    p("For this cohort, either Mendeley or Zotero. Both are free and integrate with Word and "
      "LaTeX; <span class=\"kw\">the choice matters far less than adopting one before the "
      "writing begins</span>. A reference manager installed after the draft exists recovers "
      "almost none of its value."),

    sub("5.2 The Six-Step Workflow", "s5-2"),
    ol(["<span class=\"kw\">Capture</span> &mdash; install the browser connector (Mendeley "
        "Web Importer or Zotero Connector) and save references directly from Google Scholar, "
        "IEEE Xplore, ACM DL, SpringerLink and arXiv.",
        "<span class=\"kw\">Organise</span> &mdash; create folders by chapter or topic; "
        "rename PDFs using a clear convention such as "
        "<code>Author_Year_Keyword_Title.pdf</code>.",
        "<span class=\"kw\">Annotate</span> &mdash; highlight key passages and add notes "
        "directly in the PDF within the manager. <em>This is where prevention actually "
        "happens:</em> annotation converts reading into comprehension, and comprehension is "
        "the precondition of genuine paraphrase.",
        "<span class=\"kw\">Cite while writing</span> &mdash; insert citations from the Word "
        "or LaTeX plugin. <em>Never type citations manually.</em>",
        "<span class=\"kw\">Verify</span> &mdash; cross-check the auto-generated bibliography "
        "against the official style guide; tools occasionally miss publication-type nuances "
        "such as the conference-versus-journal distinction.",
        "<span class=\"kw\">Back up</span> &mdash; synchronise the library to the cloud "
        "weekly. A lost library is a research catastrophe."]),

    sub("5.3 LaTeX and BibTeX", "s5-3"),
    p("For theses written in LaTeX, reference managers integrate through "
      "<span class=\"kw\">BibTeX</span> (legacy but universally supported) or "
      "<span class=\"kw\">biblatex</span> (modern and more flexible). Mendeley and Zotero "
      "export <code>.bib</code> files that the compiler processes; the "
      "<span class=\"kw\">Better BibTeX</span> Zotero plugin generates stable citation keys "
      "such as <code>vaswani2017attention</code>."),
    eq("@inproceedings{devlin2019bert, author = {Jacob Devlin and Ming-Wei Chang and Kenton "
       "Lee and Kristina Toutanova}, title = {{BERT}: Pre-training of Deep Bidirectional "
       "Transformers for Language Understanding}, booktitle = {Proceedings of NAACL-HLT}, "
       "year = {2019}, pages = {4171--4186}, doi = {10.18653/v1/N19-1423}}",
       "a BibTeX record"),
    p("The double braces around <code>{BERT}</code> stop BibTeX lowercasing the acronym under "
      "IEEE style &mdash; a small detail that teaches the useful lesson that the tool is a "
      "program rather than a formatter."),

    sec(6, "Detection Tools: Turnitin and URKUND", "s6"),
    box("caution", "The foundational caveat",
        p("Plagiarism detection software <em>does not detect plagiarism</em> &mdash; it "
          "detects <span class=\"kw\">textual similarity</span>. The interpretation of "
          "similarity reports is a human responsibility. A match is not plagiarism; an "
          "<em>unattributed</em> match may be.")),
    p("These tools compare submitted text against three databases:"),
    ol(["The <span class=\"kw\">internet archive</span> &mdash; billions of continuously "
        "updated web pages.",
        "<span class=\"kw\">Published content</span> &mdash; journal articles, conference "
        "proceedings, e-books.",
        "The <span class=\"kw\">institutional repository</span> &mdash; prior student "
        "submissions at the same university. This is why copying a senior's thesis is the "
        "most reliably detected form of misconduct in a university setting."]),

    sub("6.1 Turnitin", "s6-1"),
    p("Submissions are broken into overlapping text segments; each segment is matched against "
      "the comparison databases; a similarity index is computed as the percentage of matched "
      "text to total submission length; and colour-coded highlights link each match to its "
      "suspected source. Turnitin is integrated into the UPES learning-management ecosystem."),

    sub("6.2 URKUND (Ouriginal)", "s6-2"),
    ul(["<span class=\"kw\">Cross-language detection</span> &mdash; can identify translated "
        "plagiarism.",
        "<span class=\"kw\">Modular API</span> &mdash; readily integrated into an "
        "institutional LMS.",
        "<span class=\"kw\">Character-by-character analysis</span> &mdash; finer granularity "
        "than n-gram matching.",
        "<span class=\"kw\">Generative-AI detection module</span> &mdash; added in 2023."]),
    p("URKUND was rebranded <span class=\"kw\">Ouriginal</span> following a 2020 merger with "
      "PlagScan. A typical workflow runs: submission &rarr; LMS upload &rarr; server &rarr; "
      "document parsed &rarr; compared against the three databases &rarr; similarity report "
      "generated &rarr; delivered to the instructor, often within thirty minutes."),
    tw(table(["Feature", "Turnitin", "URKUND / Ouriginal", "iThenticate", "Free checkers"], [
        ["Market", "Academic (student work)", "Academic and research", "Research and publication", "General"],
        ["Colour-coded report", "Yes", "Yes", "Yes", "Basic"],
        ["Excludes references", "Yes (configurable)", "Yes", "Manual", "No"],
        ["AI content detection", "Yes (since 2023)", "Yes", "Limited", "No"],
        ["Cost", "Institutional licence", "Institutional licence", "Per-check", "Free tier"],
    ])),

    sub("6.3 Interpreting the Index", "s6-3"),
    tw(table(["Similarity index", "Typical interpretation", "Recommended action"], [
        ["0&ndash;10%", "Excellent originality", "Acceptable for most work"],
        ["11&ndash;24%", "Acceptable with proper attribution", "Review highlighted sources"],
        ["25&ndash;50%", "Substantial similarity detected", "Significant revision required"],
        ["Above 50%", "Likely unattributed copying", "Rewriting and resubmission mandatory"],
    ])),
    p("Most Indian universities, including UPES, permit a maximum similarity index of "
      "<span class=\"kw\">10&ndash;20 per cent</span> for theses, excluding references, "
      "quotations and common methodological phrases. Exceeding the threshold triggers "
      "mandatory revision and supervisor review."),
    box("caution", "Two caveats that cut both ways",
        p("A <span class=\"kw\">0 per cent score does not guarantee originality</span>: "
          "translated, well-paraphrased and non-textual content &mdash; code, diagrams &mdash; "
          "can evade detection. Conversely, legitimate matches arise naturally from common "
          "phrases, boilerplate text and standard methodological description.")),

    sub("6.4 Acting on the Report", "s6-4"),
    ol(["<span class=\"kw\">Review</span> each highlighted segment individually.",
        "<span class=\"kw\">Identify the source</span> by clicking on the match.",
        "<span class=\"kw\">Classify</span> each match as: a properly cited quotation "
        "(acceptable); a properly paraphrased passage with citation (acceptable); common "
        "knowledge or a methodological phrase (excludable); a reference-list entry "
        "(excludable); or <span class=\"kw\">unattributed textual overlap</span> (action "
        "required).",
        "<span class=\"kw\">Revise</span> the offending passages using the five-step method.",
        "<span class=\"kw\">Resubmit</span> and verify that the index has dropped below the "
        "institutional threshold."]),
    box("eg", "Worked case &mdash; a 27% report",
        p("Investigation reveals: 8% from properly cited quotations; 12% from methodological "
          "phrases common to all CS theses (&ldquo;the experimental setup was designed to "
          "evaluate&hellip;&rdquo;); 5% from reference-list titles (excludable); and 2% from "
          "<em>one uncited paragraph lifted from a survey paper</em>.")
        + p("<span class=\"kw\">Effective similarity index: 2 per cent.</span> The thesis is "
            "otherwise in good standing, but the student must rewrite the uncited paragraph "
            "with proper attribution. Always compute the <em>effective</em> index, excluding "
            "acceptable categories &mdash; tools provide filters for exactly this purpose, but "
            "they must be configured.")),

    sec(7, "Case Studies", "s7"),
    sub("7.1 The Patchwriting Trap", "s7-1"),
    p("A student writing the Related Work section of a thesis on federated learning reads "
      "McMahan et al. (2017) and drafts by replacing some words with synonyms."),
    box("caution", "Original and student draft",
        p("<em>Original:</em> &ldquo;Federated learning is a machine learning setting where "
          "many clients collaboratively train a model under the coordination of a central "
          "server, while keeping their training data decentralized.&rdquo;")
        + p("<em>Student draft:</em> &ldquo;Federated learning is a setting of machine "
            "learning where many clients train a model collaboratively under the coordination "
            "of a central server, while keeping training data decentralized.&rdquo;")
        + p("<span class=\"kw\">Diagnosis:</span> sentence structure preserved, only minor "
            "synonym substitution and reordering. This is patchwriting and will be flagged.")),
    box("eg", "Corrected paraphrase with citation",
        p("<em>The federated learning paradigm distributes model training across numerous "
          "client devices, each retaining local data, while a central coordinator aggregates "
          "updates without direct access to the underlying datasets (McMahan et al., 2017).</em>")),

    sub("7.2 Citation Style Drift", "s7-2"),
    p("A student begins in APA for coursework and switches to IEEE for the project thesis; "
      "the bibliography contains mixed entries. IEEE reviewers reject the submission "
      "immediately, and even APA-only evaluators flag the inconsistency. The resolution is "
      "structural: fix the style at the outset, configure the reference manager accordingly, "
      "and verify against the official manual before submission."),

    sec(8, "Your Personal Anti-Plagiarism Workflow", "s8"),
    p("This is the answer to LO5, and to the ten-mark constructive question:"),
    ol(["<span class=\"kw\">Read and annotate</span> in the reference manager &mdash; defeats "
        "shallow comprehension.",
        "<span class=\"kw\">Close the source</span> &mdash; defeats patchwriting.",
        "<span class=\"kw\">Draft the paraphrase</span> in your own structure.",
        "<span class=\"kw\">Insert the citation</span> from the plugin, in the mandated style "
        "&mdash; defeats numbering and format drift.",
        "<span class=\"kw\">Run a pre-submission similarity check.</span>",
        "<span class=\"kw\">Compute the effective index</span> and revise any unattributed "
        "overlap &mdash; catches what the first four steps missed.",
        "<span class=\"kw\">Back up the library.</span>"]),
    box("caution", "Why the order is fixed",
        p("Verification is the <em>last</em> step, never the first. A workflow that begins "
          "with a similarity check is editing for a score rather than writing with integrity "
          "&mdash; the precise inversion this unit exists to prevent.")),

    sec(9, "Summary", "s9"),
    ol(["<span class=\"kw\">Paraphrasing</span> is a cognitive skill requiring comprehension, "
        "restructuring and citation &mdash; not synonym substitution. The five-step method is "
        "the foundation.",
        "<span class=\"kw\">Citation styles</span> are formal languages that vary by "
        "discipline. IEEE dominates computing; style consistency is non-negotiable.",
        "<span class=\"kw\">Reference management software</span> eliminates manual citation "
        "errors and integrates with Word and LaTeX. Follow the six-step workflow.",
        "<span class=\"kw\">Detection tools</span> produce similarity reports that require "
        "human interpretation. An effective index below 10&ndash;20 per cent, after excluding "
        "references, quotations and methodological phrases, indicates compliance with UPES "
        "standards."]),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Preparation actions",
        ul(["<span class=\"kw\">Memorise</span> the structure of one citation style in detail "
            "&mdash; preferably IEEE. Produce both an in-text citation and a reference entry "
            "from memory.",
            "<span class=\"kw\">Practise</span> paraphrasing three short technical passages "
            "using the five-step method.",
            "<span class=\"kw\">Install</span> Mendeley or Zotero before the next assignment "
            "and build a library of 5&ndash;10 references.",
            "<span class=\"kw\">Submit</span> a sample paragraph through a free checker before "
            "formal submission, to identify accidental overlap.",
            "<span class=\"kw\">Review</span> the UPES Academic Integrity Code and the "
            "specific similarity threshold for theses in your department."])),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Differentiate between paraphrasing and patchwriting. Why is the latter ethically "
           "problematic? " + marks("3 marks"),
           "List the four components of a complete IEEE in-text citation and reference entry. "
           + marks("2 marks"),
           "What are the three databases against which Turnitin compares submissions? "
           + marks("3 marks"),
           "State the UPES-recommended maximum similarity index for a B.Tech thesis, "
           "excluding references and quotations. " + marks("2 marks")]),

    sub("10.2 Medium-Answer Questions", "s10-2"),
    qlist(["Explain the five-step paraphrasing method with an example drawn from a CS research "
           "paper of your choice. " + marks("5 marks"),
           "Compare Mendeley and Zotero as reference management tools. Under what "
           "circumstances would you prefer one over the other? " + marks("5 marks"),
           "A student receives a Turnitin similarity index of 32%. Describe, step by step, "
           "how they should analyse and act upon this report. " + marks("5 marks")]),

    sub("10.3 Long-Answer and Application", "s10-3"),
    qlist(["<span class=\"kw\">Application.</span> You are writing the Literature Review "
           "chapter of a B.Tech thesis on <em>Privacy-Preserving Machine Learning in "
           "Healthcare</em>. Draft (a) two properly paraphrased passages from a selected paper "
           "with IEEE citations, (b) the corresponding IEEE reference entries, and (c) a short "
           "justification of your paraphrasing choices. " + marks("10 marks"),
           "<span class=\"kw\">Analytical.</span> Critically evaluate: <em>&ldquo;A high "
           "similarity index from Turnitin always indicates plagiarism.&rdquo;</em> Discuss "
           "the limitations of similarity-detection tools and the importance of human "
           "interpretation. " + marks("10 marks"),
           "<span class=\"kw\">Constructive.</span> Design a personal anti-plagiarism workflow "
           "for a B.Tech thesis project, integrating paraphrasing technique, citation style, "
           "reference management and similarity checking. Justify each step with reference to "
           "the ethical principles discussed in Unit III. " + marks("10 marks")]),

    sec(11, "Suggested Reading", "s11"),
    ol(["American Psychological Association (2020). <em>Publication Manual of the American "
        "Psychological Association</em> (7th ed.).",
        "<em>IEEE Editorial Style Manual</em> (2022). IEEE.",
        "Roig, M. (2015). <em>Avoiding plagiarism, self-plagiarism, and other questionable "
        "writing practices: A guide to ethical writing</em>. Office of Research Integrity.",
        "University of Wisconsin&ndash;Madison Writing Center (2023). <em>Paraphrasing</em>.",
        "UPES (2023). <em>Academic Integrity and Plagiarism Policy</em>. UPES Student Handbook."]),
])
