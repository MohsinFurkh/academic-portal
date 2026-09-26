# -*- coding: utf-8 -*-
"""Unit III - Lecture 4: Addressing Plagiarism."""
from kit import (box, card, eqbox, flow, gauge, goals, grid, marks, ol, p,
                 qlist, rule, sec, stack, sub, table, tw, ul, eq)

STEM = "CSEG3060_Unit3_L04_Addressing_Plagiarism"
RUNNER = "CSEG3060 · Unit III · Lecture 4 — Addressing Plagiarism"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 4 — Addressing Plagiarism",
    "desc": ("Unit III Lecture 4 for Research Methodology in Computer Science "
             "(CSEG3060): definitions of plagiarism, the four principal types — direct, "
             "self, mosaic and accidental — code and AI-assisted forms, detection methods "
             "and tools, and reading a similarity report critically."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Addressing Plagiarism",
     "body": stack([
         p("Definition, types — direct, self, mosaic, accidental — and detection tools",
           "lead", "max-width:850px;color:var(--mint)"),
         card(p("Attribution is not a formatting requirement. It is the mechanism by which "
                "knowledge remains traceable.", None,
                "margin:0;font-size:20px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 4 of 8 · 60 minutes · CO3", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO3",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Define** plagiarism in academic and research contexts with precision",
         "**Differentiate** the major types: direct, self, mosaic and accidental",
         "**Apply** citation frameworks — APA, IEEE, ACM, MLA — to mitigate attribution errors",
         "**Interpret** similarity reports from detection tools *critically*",
         "**Recognise** the ethical, legal and professional consequences in CS research",
         "**Formulate** institutional and personal strategies to uphold integrity",
     ]), None, "fill")},

    {"title": "Why this matters now", "kicker": "Context",
     "h": "The surface area for misconduct has expanded",
     "body": stack([
         rule("Digital repositories, open-access journals, generative AI and code-sharing "
              "platforms accelerate innovation — and simultaneously <b>expand the surface "
              "area for academic misconduct</b>."),
         grid([
             card(p("A 2023 <i>Retraction Watch</i> analysis indicates plagiarism-related "
                    "retractions in computer science rose approximately <b>38% over the "
                    "preceding decade</b>.", "small", "margin:0"), "The trend", "rust"),
             card(p("A significant proportion is attributed to <b>inadequate paraphrasing</b> "
                    "and <b>improper reuse of prior work</b> — not to brazen copying.",
                    "small", "margin:0"), "Its composition", "rust"),
         ]),
         grid([
             card(p("Source code", "fine", "margin:0"), "Attribution required", "tint"),
             card(p("Algorithms", "fine", "margin:0"), "Attribution required", "tint"),
             card(p("Datasets", "fine", "margin:0"), "Attribution required", "tint"),
             card(p("Documentation", "fine", "margin:0"), "Attribution required", "tint"),
         ], "1fr 1fr 1fr 1fr", gap="9px"),
         card(p("The two fastest-growing categories — <b>poor paraphrase</b> and "
                "<b>self-reuse</b> — are precisely the ones students believe are not "
                "plagiarism.", "small", "margin:0"), None, "rust"),
     ], 11)},

    {"title": "Defining plagiarism", "kicker": "Definition",
     "h": "Four authoritative definitions, and four constituents",
     "body": stack([
         p("From Latin <b>plagiarius</b> — “kidnapper”.", "fine", "margin:0"),
         table(["Source", "Definition"], [
             ["**ORI (USA)**", "“the appropriation of another person's ideas, **processes, results**, or words without giving appropriate credit”"],
             ["**Council of Science Editors**", "using the work, ideas or words of others without proper attribution, ***irrespective of intent***"],
             ["**IEEE Publication Policy**", "“copying ideas, text, **data, software**, or any other material without proper citation”"],
             ["**UGC (India) Regulations 2018**", "taking someone else's work or ideas and passing them off as one's own"],
         ]),
         grid([
             card(p("The material originates from a verifiable source", "fine", "margin:0"),
                  "1 · Originality of source", "tint"),
             card(p("Credit not commensurate with what was borrowed", "fine", "margin:0"),
                  "2 · Lack of attribution", "tint"),
             card(p("Deliberate deception **or** reckless disregard", "fine", "margin:0"),
                  "3 · Intent or negligence", "tint"),
             card(p("From a phrase to an entire manuscript", "fine", "margin:0"),
                  "4 · Scope of appropriation", "tint"),
         ], "1fr 1fr 1fr 1fr", gap="9px"),
         rule("Note what ORI and IEEE both name: <b>processes, results, data and software</b> "
              "— not merely words. And note the decisive phrase: <b>irrespective of intent</b>. "
              "Negligence suffices."),
     ], 10)},

    {"title": "Type I — direct", "kicker": "Type 1 of 4",
     "h": "Direct plagiarism: verbatim copying",
     "body": stack([
         rule("Verbatim copying of text, code, data or visual content <b>without quotation "
              "marks, citation or any indication of the original author</b>."),
         grid([
             card(ul(["Identical reproduction of sentences or paragraphs",
                      "No quotation marks",
                      "Complete absence of citation",
                      "Usually the most blatant and most easily detected form"],
                     None, "margin:0;font-size:14px"), "Diagnostic characteristics"),
             stack([
                 card(p("<i>“Deep learning is a subset of machine learning that employs "
                        "neural networks with many layers. These networks can learn complex "
                        "patterns in large datasets, enabling breakthroughs in image "
                        "recognition, natural language processing, and autonomous "
                        "systems.”</i>", "small", "margin:0"),
                      "As submitted — no marks, no citation", "rust"),
                 card(p("Textbook-level content a student may consider common knowledge — "
                        "yet the <b>specific wording</b> belongs to its author. Quotation "
                        "marks plus a citation converts the offence into scholarship.",
                        "small", "margin:0"), None, "teal"),
             ], 10),
         ], "1fr 1.25fr"),
         grid([
             eqbox("Overlap ratio = (matched words / total words) &times; 100%"),
             card(p("A directly copied paragraph typically exceeds <b>85–90%</b> overlap "
                    "<i>within that segment</i> — which is why a document-level index of 12% "
                    "can still conceal a wholly copied paragraph.", "small", "margin:0"),
                  None, "tint"),
         ], "1fr 1.15fr"),
     ], 10)},

    {"title": "Type II — self", "kicker": "Type 2 of 4",
     "h": "Self-plagiarism: ownership does not exempt you",
     "body": stack([
         rule("Reuse of one's own previously published work, in whole or part, <b>without "
              "proper disclosure or citation</b>."),
         grid([
             card(ul(["Submitting the same paper to multiple journals — **duplicate publication**",
                      "Reusing substantial portions of methodology sections without citation",
                      "Recycling published datasets, code or algorithms without acknowledgement"],
                     None, "margin:0;font-size:14px"), "Manifestations in CS research"),
             card(ul(["**Misrepresentation of novelty** — readers believe the work is original",
                      "**Copyright infringement** — publishers hold exclusive rights",
                      "**Abuse of peer review** — duplicate submission wastes reviewer effort"],
                     None, "margin:0;font-size:14px"),
                  "Three harms, independent of who wrote it", "rust"),
         ]),
         grid([
             card(p("A 2022 paper in <i>Journal A</i> on “Efficient Graph Neural Networks for "
                    "Social Networks”, substantially reproduced in a 2024 submission to "
                    "<i>Conference B</i> <b>without citing the earlier work</b> — "
                    "self-plagiarism, notwithstanding common authorship.", "small", "margin:0"),
                  "Illustration", "tint"),
             card(ul(["Disclose prior related work in the cover letter *and* the manuscript",
                      "Quote and cite reused exact text",
                      "Obtain publisher permission where required",
                      "Confine overlap to cited methodology and standard references"],
                     None, "margin:0;font-size:13px"), "Mitigation", "teal"),
         ]),
         p("The legitimate case: a conference paper extended into a journal article is "
           "entirely acceptable <b>when</b> the extension is disclosed, the earlier paper "
           "cited, and the added contribution stated.", "fine", "margin:0"),
     ], 10)},

    {"title": "Type III — mosaic", "kicker": "Type 3 of 4",
     "h": "Mosaic plagiarism: the fastest-growing category",
     "body": stack([
         rule("Combining text, ideas or data from multiple sources with only <b>superficial "
              "modification</b> — synonym substitution, sentence restructuring, light "
              "paraphrase — and without proper citation."),
         grid([
             card(p("<i>“Convolutional neural networks have <b>revolutionized</b> image "
                    "<b>classification</b> by <b>automatically</b> learning "
                    "<b>hierarchical</b> features from <b>raw</b> pixel data.”</i>",
                    "small", "margin:0"), "Original", "tint"),
             card(p("<i>“CNNs have <b>transformed</b> image <b>categorization</b> by "
                    "<b>autonomously</b> extracting <b>multi-level</b> representations "
                    "directly from <b>unprocessed</b> pixel inputs.”</i>", "small", "margin:0"),
                  "Mosaic version — still plagiarism", "rust"),
         ]),
         grid([
             card(ul(["No single source dominates — hence “mosaic”",
                      "Modifications cosmetic; no evidence of understanding",
                      "Citations absent or selectively applied",
                      "Resists exact-string matching entirely"],
                     None, "margin:0;font-size:13px"), "Characteristics"),
             stack([
                 eqbox("cos(u, v) = (u &middot; v) / (&#8214;u&#8214; &#8214;v&#8214;)"),
                 card(p("Vectors <b>u</b> and <b>v</b> represent the original and submitted "
                        "passages. Values above roughly <b>0.80</b> signal significant "
                        "semantic overlap. Near-parallel vectors mean near-identical meaning "
                        "regardless of surface wording.", "small", "margin:0"),
                      None, "tint"),
             ], 9),
         ], "1fr 1.2fr"),
         rule("The operative test: genuine paraphrase requires <b>comprehension, restructuring "
              "of the argument, and citation</b>. Synonym substitution alone is disguise, not "
              "scholarship."),
     ], 9)},

    {"title": "Type IV — accidental", "kicker": "Type 4 of 4",
     "h": "Accidental plagiarism: no intent required",
     "body": stack([
         rule("Plagiarism occurring <b>without intent to deceive</b> — from ignorance of "
              "citation conventions, careless note-taking, or structural imitation."),
         grid([
             card(p("Reproducing information without having recorded the reference.",
                    "fine", "margin:0"), "1 · Forgotten citations", "tint"),
             card(p("Insufficient transformation, with no quotation marks.", "fine", "margin:0"),
                  "2 · Improper paraphrasing", "tint"),
             card(p("Following a source's organisational outline too closely.", "fine", "margin:0"),
                  "3 · Structural replication", "tint"),
             card(p("Subconscious reproduction of material believed to be original.",
                    "fine", "margin:0"), "4 · Cryptomnesia", "tint"),
             card(p("Citing a secondary source in place of the original, or the reverse.",
                    "fine", "margin:0"), "5 · Misattribution", "tint"),
         ], "1fr 1fr 1fr 1fr 1fr", gap="8px"),
         grid([
             card(p("A student summarises a Wikipedia paragraph, omits the citation because "
                    "they “thought it was common knowledge”, and submits it. Accidental — "
                    "and nonetheless plagiarism under most institutional policies.",
                    "small", "margin:0"), "Illustration", "rust"),
             card(p("Because the causes are <b>procedural</b>, the fixes are procedural: a "
                    "literature log, a reference manager, and citation capture <b>at the "
                    "moment of reading</b> rather than at the moment of writing.",
                    "small", "margin:0"), "Structural remedy, not moral resolve", "teal"),
         ]),
         rule("<b>Absence of malicious intent does not absolve the author.</b> Most policies "
              "treat accidental plagiarism as a punishable offence, typically with a lesser "
              "sanction on a first offence."),
     ], 9)},

    {"title": "CS-specific forms", "kicker": "Emerging and CS-specific",
     "h": "Six further recognised forms",
     "body": stack([
         table(["Form", "Description"], [
             ["**Idea plagiarism**", "Appropriating concepts or theoretical frameworks without attribution"],
             ["**Code plagiarism**", "Copying source code, algorithms or software components without credit — acutely relevant in CS"],
             ["**Data plagiarism**", "Reusing datasets without permission or acknowledgement"],
             ["**Image plagiarism**", "Reproducing figures, diagrams or screenshots without citation"],
             ["**Translation plagiarism**", "Translating a foreign-language source and presenting it as original"],
             ["**AI-assisted plagiarism**", "Submitting AI-generated text as one's own, or paraphrasing AI output without disclosure"],
         ]),
         grid([
             card(p("Open-source licences — <b>MIT, GPL, Apache, BSD</b> — impose "
                    "<i>specific attribution formats</i>. Copying a Stack Overflow snippet or "
                    "a GitHub function without the required notice is simultaneously an "
                    "academic and a <b>licensing</b> violation.", "small", "margin:0"),
                  "Code is not exempt because reuse is normal", "rust"),
             card(p("Venues differ, but the emerging norm is <b>disclosure of AI assistance "
                    "plus author responsibility for verification</b>. Unverified AI output "
                    "additionally risks fabricated citations.", "small", "margin:0"),
                  "AI-assisted work — the live question", "teal"),
         ]),
     ], 11)},

    {"title": "How detection works", "kicker": "Detection",
     "h": "Five methodological approaches",
     "body": stack([
         table(["Approach", "Methodology", "Strengths", "Limitations"], [
             ["**String matching**", "Exact or near-exact text comparison", "Fast, transparent", "Fails on paraphrased content"],
             ["**Fingerprinting**", "Hash-based indexing of n-grams", "Efficient over large corpora", "Sensitive to word-order change"],
             ["**Stylometry**", "Statistical analysis of writing style", "Detects ghostwriting", "Needs substantial reference text"],
             ["**Semantic similarity**", "NLP embedding comparison", "Identifies paraphrase", "Computationally intensive"],
             ["**Citation analysis**", "Examination of citation patterns", "Detects missing citations", "Limited to structured documents"],
         ]),
         grid([
             card(p("String matching catches <b>direct</b> plagiarism · fingerprinting scales "
                    "it to web-sized corpora · semantic similarity catches <b>mosaic</b> "
                    "plagiarism · stylometry addresses <b>authorship</b>, not overlap.",
                    "small", "margin:0"), "Method maps to offence type", "teal"),
             card(p("Identifier renaming, statement reordering and reformatting defeat text "
                    "comparison entirely — which is why <b>token-based and structural</b> "
                    "methods exist for source code.", "small", "margin:0"),
                  "Code needs its own algorithms", "rust"),
         ]),
     ], 11)},

    {"title": "Ten safeguards", "kicker": "Prevention",
     "h": "Build attribution into the workflow",
     "body": stack([
         flow(["Read", "Record", "Draft", "Paraphrase / quote", "Cite", "Check", "Submit"]),
         grid([
             card(ul(["Maintain a structured **literature log** with quotations and references",
                      "Use **Zotero, Mendeley or EndNote** so citation data is never reconstructed from memory"],
                     None, "margin:0;font-size:13px"), "Capture as you read", "teal"),
             card(ul(["Know the style your venue mandates — **IEEE and ACM** for computing",
                      "Comprehend, **restructure the argument**, then cite",
                      "Use **quotation marks** for verbatim text beyond standard terminology"],
                     None, "margin:0;font-size:13px"), "Write responsibly"),
             card(ul(["**Attribute ideas, not only words** — a paraphrased concept still needs a citation",
                      "**Disclose prior work** when extending your own publications",
                      "Honour **open-source licence** attribution formats"],
                     None, "margin:0;font-size:13px"), "Attribute fully"),
             card(ul(["Use **AI tools responsibly** — disclose where required, verify all output",
                      "Run **pre-submission checks** through institutional Turnitin or iThenticate"],
                     None, "margin:0;font-size:13px"), "Verify before submitting", "rust"),
         ], "1fr 1fr 1fr 1fr", gap="10px"),
         rule("Capture the citation <b>while reading</b>, not while writing. Nine of the ten "
              "safeguards fail silently if deferred to the drafting stage."),
     ], 11)},

    {"title": "The tool landscape", "kicker": "Practical application",
     "h": "Matching instrument to purpose",
     "body": stack([
         grid([
             stack([
                 card(p("<b>Turnitin</b> — institutional student submissions; web, student-paper "
                        "repositories and publications; similarity index with highlighted "
                        "matches; LMS integration. Weak on well-paraphrased text and ideas.",
                        "small", "margin:0"), "Text and manuscript", "teal"),
                 card(p("<b>iThenticate</b> — publisher-side, built on the <b>CrossCheck</b> "
                        "database, integrated with editorial workflow. Subscription; "
                        "primarily textual.", "small", "margin:0"), None, "teal"),
                 card(p("<b>Grammarly</b> · <b>Copyscape</b> · <b>PlagScan</b> · "
                        "<b>Urkund/Ouriginal</b> — lightweight, web-oriented or "
                        "institutional; smaller databases.", "small", "margin:0"),
                      None, "tint"),
             ], 9),
             stack([
                 card(p("<b>MOSS</b> — Measure of Software Similarity: purpose-built for code, "
                        "using <b>winnowing and fingerprinting</b> adapted to programming "
                        "structure. The standard for programming assignments.",
                        "small", "margin:0"), "Source code — essential in CS", "rust"),
                 card(p("<b>JPlag</b> — open-source, multi-language, <b>token-based</b> "
                        "comparison.", "small", "margin:0"), None, "rust"),
                 card(p("<b>GPTZero</b> · <b>Originality.ai</b> · <b>Turnitin AI Writing "
                        "Detection</b> · <b>Copyleaks</b> — estimate machine generation from "
                        "perplexity, burstiness and stylistic pattern.", "small", "margin:0"),
                      "AI-text detectors"),
             ], 9),
         ]),
         card(p("<b>Critical caveat.</b> AI-detector reliability remains <b>contested, with "
                "documented false-positive rates</b> — non-native English writers and heavily "
                "edited prose are disproportionately flagged. Such output is a prompt for "
                "human inquiry, <b>never evidence of misconduct on its own</b>.",
                "small", "margin:0"), None, "rust"),
     ], 10)},

    {"title": "Reading a similarity report", "kicker": "Practical application",
     "h": "The index is a pointer, not a verdict",
     "body": stack([
         grid([
             stack([
                 gauge([("&lt; 10%", "#1F6F66", "Generally acceptable"),
                        ("10–20%", "#86D3C7", "Review required"),
                        ("20–40%", "#D9603F", "Significant overlap; likely revision"),
                        ("&gt; 40%", "#B5452A", "High concern; restructure or cite properly")]),
                 card(p("Thresholds are institution- and journal-specific. <b>IEEE permits up "
                        "to 30%</b> for review articles under certain conditions; the "
                        "<b>UGC Regulations 2018</b> set graded levels for theses with "
                        "escalating consequences, beginning at a tolerance of up to 10%.",
                        "small", "margin:0"), None, "tint"),
             ], 10),
             stack([
                 card(ol(["**Identify sources** — do matches come from cited works?",
                          "**Recognise quoted material** — exclude legitimate quotations",
                          "**Exclude common knowledge** — standard terminology",
                          "**Allow methodology overlap** — standard methods recur legitimately",
                          "**Verify reference-list exclusion** is configured correctly"],
                         None, "margin:0;font-size:13px"), "Five interpretation steps", "teal"),
                 card(p("<b>32% can be clean</b> — if composed of quoted, cited and "
                        "bibliographic matches.<br><b>6% can be serious</b> — if that 6% is "
                        "an uncited verbatim paragraph.", "small", "margin:0"),
                      "The two symmetric errors", "rust"),
             ], 10),
         ]),
     ], 11)},

    {"title": "Cases and consequences", "kicker": "Case studies",
     "h": "Three cases, and what follows a confirmed violation",
     "body": stack([
         grid([
             stack([
                 card(p("<b>Hwang Woo-suk (2004–05).</b> Landmark <i>Science</i> papers "
                        "claiming stem-cell cloning; investigation revealed fabricated data "
                        "and <b>duplicated figures</b>, with image reuse and uncredited "
                        "methodology. Retraction, revoked funding, criminal conviction. "
                        "<i>Lesson: applying detection to figures and data reveals what "
                        "textual review misses.</i>", "small", "margin:0"), None, "tint"),
                 card(p("<b>Springer retraction (2019).</b> A CS paper retracted after editors "
                        "identified substantially overlapping content in two venues "
                        "<b>without cross-citation</b>. <i>Lesson: self-plagiarism is serious "
                        "even where the author owns both works.</i>", "small", "margin:0"),
                      None, "tint"),
                 card(p("<b>Code plagiarism in programming courses.</b> MOSS-based studies "
                        "report <b>15–25% of submitted assignments</b> containing significant "
                        "overlap in some cohorts. <i>Mitigations: MOSS or JPlag screening, "
                        "per-student parameterisation, viva voce verification, integrity "
                        "education from week one.</i>", "small", "margin:0"), None, "rust"),
             ], 9),
             stack([
                 card(p("Zero grade · course failure · probation · suspension · expulsion · "
                        "degree revocation", "small", "margin:0"), "Academic", "tint"),
                 card(p("Retraction · journal and conference blacklisting · loss of funding · "
                        "termination", "small", "margin:0"), "Professional", "tint"),
                 card(p("Copyright infringement suits · breach of publisher agreements · "
                        "damages and injunctions", "small", "margin:0"), "Legal", "tint"),
                 card(p("Durable loss of credibility · difficulty securing collaborations · "
                        "<b>a retraction notice is a permanent, indexed, citable record</b>",
                        "small", "margin:0"), "Reputational — the most durable", "rust"),
             ], 9),
         ], "1.3fr 1fr"),
     ], 9)},

    {"title": "Summary and exam focus", "kicker": "Consolidation",
     "h": "What to retain, and what the examiner asks",
     "body": stack([
         grid([
             card(ul(["Plagiarism is **uncredited appropriation** of ideas, text, data and code",
                      "Four types: **direct, self, mosaic, accidental** — differing in characteristic and severity",
                      "Detection combines **fingerprinting, semantic similarity and stylometry**",
                      "Similarity indices demand **contextual interpretation**, not threshold arithmetic",
                      "CS raises distinctive challenges in **code plagiarism and AI authorship**"],
                     None, "margin:0;font-size:13px"), "Five takeaways", "teal"),
             card(ol(["Be precise about the **boundaries between the four types**",
                      "Memorise the **ORI, IEEE and UGC** definitions",
                      "Explain **n-gram fingerprinting** and **cosine similarity** qualitatively",
                      "Pair each **tool with its use case** — MOSS → code, iThenticate → manuscripts",
                      "Expect **applied case items**: classify, then remediate",
                      "Cite correctly even within examination answers"],
                     None, "margin:0;font-size:13px"), "Exam focus", "rust"),
         ]),
         card(p("<b>Work this one.</b> A manuscript reuses <b>four paragraphs verbatim from "
                "the authors' own 2021 conference paper</b> with neither citation nor "
                "quotation marks, and <b>paraphrases two further paragraphs from a 2019 "
                "journal article</b> without attribution. Classify each instance and "
                "prescribe the corrective action.", "small", "margin:0"),
              "Applied scenario", "tint"),
         p("Next — <b>Lecture 5: Plagiarism Prevention Strategies</b>: paraphrasing, citation "
           "styles, reference management and Turnitin/URKUND usage.", "fine", "margin:0"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Name the discomfort honestly — a lecture on plagiarism is heard as an accusation unless framed as professional training. Present it as the craft of attribution, and note that in computing what must be attributed extends past prose to code, datasets, figures and model weights.",
    2: "Objective 4 contains the word 'critically': the most common professional error is not committing plagiarism but misreading a similarity index, in both directions. This lecture is where Unit III turns from literature technique to ethical conduct.",
    3: "Lead with the composition of the 38% rather than the number: the growth is concentrated in inadequate paraphrasing and improper reuse, which means the risk to a careful student is negligence rather than dishonesty. Reuse is normal in computing; disclosure is what makes it legitimate.",
    4: "Make students read the ORI and IEEE definitions closely enough to notice that neither is restricted to text — the commonest misconception in a computing cohort. Emphasise 'irrespective of intent': most policies are built on a negligence standard.",
    5: "Point out the deceptive innocence of the example: textbook-level content a student considers common knowledge, yet the specific wording belongs to its author. Clarify that the 85–90% figure applies to the copied segment, not the whole document.",
    6: "Address the intuition head-on — students find this category counter-intuitive, so lead with the three harms, each of which exists independently of who wrote the text. Note the legitimate case: a conference paper extended into a journal article, properly disclosed and cited.",
    7: "Read both versions aloud and ask which is the student's own intellectual work; the answer is neither. Explain cosine similarity qualitatively — near-parallel vectors mean near-identical meaning regardless of wording, which is why 'change every word' now fails.",
    8: "Spend the time here rather than on deliberate misconduct: this is the category that will actually threaten students in this room. Nobody forgets a citation at the moment they read the paper — they forget it three weeks later, so the remedy is a tool and a habit.",
    9: "Make the licensing point concrete: students experience code reuse as ordinary engineering and are surprised that attribution obligations are legally binding. On AI, avoid both permissiveness and prohibition — the rule is venue-specific and disclosure is the safe default.",
    10: "Organise around the pairing of method to offence type; that mapping is the examinable insight and makes the tool landscape predictable rather than a list to memorise. Fingerprinting in one sentence: hash overlapping n-grams and compare hash sets.",
    11: "Frame these as workflow engineering rather than virtue. The single highest-leverage habit is capturing the citation at the moment of reading. The pre-submission check is diagnostic, not exculpatory — it finds negligence before a reviewer does.",
    12: "Insist on the examinable pairing — MOSS and JPlag for code, iThenticate for manuscripts, Turnitin for student work. Spend a moment on false positives: acting on an AI-detector score alone is an injustice as well as a methodological error. No tool detects idea plagiarism.",
    13: "Teach the two symmetric errors as the core skill: a 32% report composed entirely of quoted, cited and bibliographic matches is a clean document; a 7% report containing one uncited copied paragraph is not. Exclusion settings must be configured, not assumed.",
    14: "Sequence the cases deliberately — a famous fabrication, a mundane self-plagiarism retraction, and a classroom statistic — so students see the risk runs from spectacular to ordinary, and that the third case describes their own cohort. Close on the permanence asymmetry.",
    15: "Work the applied scenario live: four instances of self-plagiarism requiring citation and quotation or rewriting, and two instances of mosaic plagiarism requiring genuine paraphrase with attribution. Return to the guiding claim — attribution keeps knowledge traceable.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 4 Notes — Addressing Plagiarism",
    "desc": ("Student notes for Unit III Lecture 4 of CSEG3060: definitions of plagiarism "
             "from ORI, CSE, IEEE and UGC; direct, self, mosaic and accidental plagiarism; "
             "code, data and AI-assisted forms; detection approaches and tools including "
             "MOSS and JPlag; and interpreting similarity reports."),
    "lecno": "4",
    "lectitle": "Addressing Plagiarism",
    "subline": ("Definition, types &mdash; direct, self, mosaic, accidental &mdash; and "
                "detection tools &middot; 60 minutes &middot; B.Tech. (CSE) &middot; "
                "Dr. Mohsin Furkh Dar"),
    "badges": ["CO3", "Four types", "Code plagiarism", "AI-assisted",
               "Detection tools", "Similarity index"],
    "pager": [("CSEG3060_Unit3_L03_Literature_Analysis_Techniques_Notes.html",
               "&larr; Lecture 3: Literature Analysis Techniques"),
              ("CSEG3060_Unit3_L05_Plagiarism_Prevention_Strategies_Notes.html",
               "Lecture 5: Plagiarism Prevention Strategies &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 4 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO3",
        p("Demonstrate ethical conduct in research with adherence to academic integrity "
          "standards.")
        + p("Lectures 1&ndash;3 covered how to find, appraise and synthesise literature. "
            "This lecture covers the principal way that process goes ethically wrong, and "
            "the machinery that detects it.")),

    box("exam", "How to use these notes",
        p("Two things in this lecture are examined most often: the <span class=\"kw\">"
          "boundaries between the four types</span> (Section 4), and the ability to "
          "<span class=\"kw\">interpret a similarity report</span> rather than read the "
          "percentage as a verdict (Section 6.3).")
        + p("Note throughout that the definitions name <em>processes, results, data and "
            "software</em> &mdash; not merely words. This is the textual basis for code and "
            "data plagiarism being plagiarism proper.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["Define plagiarism in academic and research contexts with precision.",
        "Identify and differentiate the major types: direct, self, mosaic and accidental.",
        "Apply recognised citation frameworks (APA, IEEE, ACM, MLA) to mitigate attribution "
        "errors.",
        "Operate commonly used detection tools and interpret similarity reports critically.",
        "Recognise the ethical, legal and professional consequences of plagiarism in computer "
        "science research.",
        "Formulate institutional and personal strategies to uphold academic integrity."]),

    sec(2, "Why This Matters Now", "s2"),
    p("The proliferation of digital repositories, open-access journals, generative AI tools "
      "and code-sharing platforms has transformed how knowledge is produced and consumed in "
      "computer science. While these advances accelerate innovation, they simultaneously "
      "<span class=\"kw\">expand the surface area for academic misconduct</span>."),
    p("A 2023 analysis by <em>Retraction Watch</em> indicated that plagiarism-related "
      "retractions in computer science rose by approximately <span class=\"kw\">38 per "
      "cent</span> over the previous decade, with a significant proportion attributed to "
      "<em>inadequate paraphrasing</em> and <em>improper reuse of prior work</em>."),
    box("caution", "What the composition of that figure means for you",
        p("The growth is concentrated in poor paraphrase and self-reuse &mdash; not in brazen "
          "copying. These are precisely the two categories students believe are not "
          "plagiarism, which means the realistic risk to a careful student is "
          "<em>negligence</em> rather than dishonesty.")),
    p("For computer scientists, whose research outputs include source code, algorithms, "
      "datasets and documentation, the boundaries of acceptable reuse require careful "
      "definition. Reuse is normal engineering practice; what distinguishes legitimate from "
      "illegitimate reuse is <span class=\"kw\">disclosure and licence compliance</span>."),

    sec(3, "Defining Plagiarism", "s3"),
    sub("3.1 Etymology and Authoritative Definitions", "s3-1"),
    p("The term derives from the Latin <em>plagiarius</em>, meaning &ldquo;kidnapper&rdquo;, "
      "reflecting the historical framing of appropriated ideas as abducted property."),
    tw(table(["Source", "Definition"], [
        ["**Office of Research Integrity (USA)**",
         "&ldquo;Plagiarism is the appropriation of another person's ideas, processes, "
         "results, or words without giving appropriate credit.&rdquo;"],
        ["**Council of Science Editors**",
         "Using the work, ideas or words of others without proper attribution, "
         "<em>irrespective of intent</em>."],
        ["**IEEE Publication Policy**",
         "Plagiarism includes &ldquo;copying ideas, text, data, software, or any other "
         "material without proper citation.&rdquo;"],
        ["**UGC (India) Regulations 2018**",
         "The practice of taking someone else's work or ideas and passing them off as one's "
         "own."],
    ])),

    sub("3.2 Four Core Constituents", "s3-2"),
    ol(["<span class=\"kw\">Originality of the source.</span> The appropriated material must "
        "originate from a verifiable source.",
        "<span class=\"kw\">Lack of attribution.</span> The borrower fails to provide credit "
        "commensurate with the borrowed content.",
        "<span class=\"kw\">Intent or negligence.</span> Either deliberate deception "
        "<em>or</em> reckless disregard for citation norms.",
        "<span class=\"kw\">Scope of appropriation.</span> The extent may range from a phrase "
        "to an entire manuscript."]),
    box("exam", "The decisive phrase",
        p("<em>Irrespective of intent.</em> Negligence suffices. Most institutional policies, "
          "including the UGC Regulations, are constructed on a negligence standard rather "
          "than an intent standard &mdash; which is why the accidental category in Section "
          "4.4 is not an excuse but a category of offence.")),

    sec(4, "Typology of Plagiarism", "s4"),
    sub("4.1 Direct Plagiarism", "s4-1"),
    box("def", "Definition &mdash; Direct plagiarism",
        p("The verbatim copying of text, code, data or visual content from a source without "
          "quotation marks, citation, or any indication of the original author.")),
    ul(["Identical reproduction of sentences or paragraphs.",
        "No use of quotation marks.",
        "Complete absence of citations.",
        "Often the most blatant and most easily detected form."]),
    box("eg", "Illustration",
        p("A thesis paragraph reading: <em>&ldquo;Deep learning is a subset of machine "
          "learning that employs neural networks with many layers. These networks can learn "
          "complex patterns in large datasets, enabling breakthroughs in image recognition, "
          "natural language processing, and autonomous systems.&rdquo;</em>")
        + p("If taken word-for-word from a published article without quotation marks or "
            "citation, this is direct plagiarism &mdash; notwithstanding that the content is "
            "textbook-level and may feel like common knowledge. The <em>specific wording</em> "
            "belongs to its author.")),
    p("Textual overlap can be expressed conceptually as:"),
    eq("Overlap ratio = (matched words or phrases / total words or phrases) &times; 100%",
       "overlap ratio"),
    p("A directly copied paragraph typically yields an overlap ratio exceeding "
      "<span class=\"kw\">85&ndash;90 per cent within that segment</span>. Note that this is "
      "a segment-level figure, not a document-level one: a whole-document index of 12 per "
      "cent can still conceal a wholly copied paragraph. Severity is highest, particularly "
      "where the copied material forms a substantial portion of the submission."),

    sub("4.2 Self-Plagiarism (Auto-Plagiarism)", "s4-2"),
    box("def", "Definition &mdash; Self-plagiarism",
        p("Reuse of one's own previously published work, or portions of it, without proper "
          "disclosure or citation. Although the author retains ownership of the ideas, "
          "academic publishing ethics require transparency about prior dissemination.")),
    p("Manifestations in computer science research:"),
    ul(["Submitting the same research paper to multiple journals &mdash; "
        "<span class=\"kw\">duplicate publication</span>.",
        "Reusing substantial portions of methodology sections across papers without citation.",
        "Recycling previously published datasets, code or algorithms in new publications "
        "without acknowledgement."]),
    p("Three harms, each of which exists independently of who wrote the text:"),
    ol(["<span class=\"kw\">Misrepresentation of novelty.</span> Reviewers and readers may "
        "believe the work is original.",
        "<span class=\"kw\">Copyright infringement.</span> Publishers often hold exclusive "
        "rights to the published version.",
        "<span class=\"kw\">Violation of peer review.</span> Multiple submissions waste "
        "reviewer effort and editorial resources."]),
    box("eg", "Example, and the legitimate case",
        p("A researcher publishes in <em>Journal A</em> in 2022 on &ldquo;Efficient Graph "
          "Neural Networks for Social Networks&rdquo;. In 2024 they submit a substantially "
          "similar paper to <em>Conference B</em> without citing the 2022 publication. This "
          "is self-plagiarism even though the author owns both works.")
        + p("By contrast, a conference paper <em>extended</em> into a journal article is "
            "entirely acceptable when the extension is disclosed, the earlier paper cited, "
            "and the added contribution stated &mdash; which is exactly what most venues "
            "require.")),
    p("Mitigation: disclose prior related work in the cover letter and the manuscript; use "
      "quotation marks and citations when reusing exact text; obtain permission from the "
      "original publisher where required; limit textual overlap across manuscripts to cited "
      "methodology and standard references."),

    sub("4.3 Mosaic (Patchwork) Plagiarism", "s4-3"),
    box("def", "Definition &mdash; Mosaic plagiarism",
        p("Combining text, ideas or data from multiple sources while making superficial "
          "modifications &mdash; synonym substitution, sentence restructuring, light "
          "paraphrase &mdash; without proper citation.")),
    ul(["No single source contributes a dominant share; the document is a &ldquo;mosaic&rdquo;.",
        "Modifications are superficial and do not reflect genuine understanding.",
        "Citations are either absent or selectively applied.",
        "Detection requires sophisticated semantic analysis rather than simple string matching."]),
    box("eg", "Worked contrast",
        p("<em>Original:</em> &ldquo;Convolutional neural networks have revolutionized image "
          "classification by automatically learning hierarchical features from raw pixel "
          "data.&rdquo;")
        + p("<em>Mosaic version:</em> &ldquo;CNNs have transformed image categorization by "
            "autonomously extracting multi-level representations directly from unprocessed "
            "pixel inputs.&rdquo;")
        + p("Every content word is substituted, yet the structure, idea and intellectual "
            "contribution remain unchanged. This is plagiarism.")),
    p("Modern tools model meaning rather than surface form. Semantic overlap between an "
      "original and a paraphrased passage is quantified by cosine similarity over embedding "
      "vectors:"),
    eq("cos(u, v) = (u &middot; v) / (&#8214;u&#8214; &middot; &#8214;v&#8214;)",
       "cosine similarity"),
    p("where <span class=\"mv\">u</span> and <span class=\"mv\">v</span> are vector "
      "representations of the original and submitted passages. A value above approximately "
      "<span class=\"kw\">0.80</span> typically signals significant semantic overlap. "
      "Near-parallel vectors mean near-identical meaning regardless of surface wording, "
      "which is precisely why the &ldquo;change every word&rdquo; strategy now fails."),
    box("caution", "The operative test",
        p("Genuine paraphrase requires <span class=\"kw\">comprehension, restructuring of the "
          "argument, and citation</span>. Synonym substitution alone is disguise, not "
          "scholarship. This is the fastest-growing category in the retraction data and "
          "therefore the highest-risk form for this cohort.")),

    sub("4.4 Accidental Plagiarism", "s4-4"),
    box("def", "Definition &mdash; Accidental plagiarism",
        p("Plagiarism that occurs without intent to deceive, arising from ignorance of "
          "citation conventions, careless note-taking, or structural imitation of a source.")),
    ol(["<span class=\"kw\">Forgotten citations.</span> Reproducing information from a source "
        "without having recorded the reference.",
        "<span class=\"kw\">Improper paraphrasing.</span> Failing to transform the original "
        "wording sufficiently while neglecting quotation marks.",
        "<span class=\"kw\">Unintentional structural replication.</span> Following the "
        "organisational outline of a source too closely.",
        "<span class=\"kw\">Cryptomnesia.</span> Subconscious reproduction of material "
        "encountered previously but believed to be original.",
        "<span class=\"kw\">Misattribution.</span> Citing a secondary source rather than the "
        "original, or the reverse."]),
    box("eg", "Illustration",
        p("A student summarises a paragraph from a Wikipedia article, omits the citation "
          "because they &ldquo;thought it was common knowledge&rdquo;, and submits the text "
          "in an assignment. Although unintentional, this constitutes accidental plagiarism "
          "under most institutional policies.")),
    box("caution", "Intent does not absolve",
        p("The absence of malicious intent does not absolve the author. Most academic "
          "integrity policies treat accidental plagiarism as a punishable offence, albeit "
          "typically with lesser sanctions on a first offence.")
        + p("Because the causes are <em>procedural</em>, the remedies are procedural: a "
            "literature log, a reference manager, and citation capture at the moment of "
            "reading rather than at the moment of writing. Cryptomnesia is a documented "
            "cognitive phenomenon; it explains, but does not excuse.")),

    sub("4.5 Further Recognised Forms", "s4-5"),
    tw(table(["Form", "Description"], [
        ["**Idea plagiarism**", "Appropriating concepts or theoretical frameworks without attribution"],
        ["**Code plagiarism**",
         "Copying source code, algorithms or software components without credit &mdash; "
         "particularly relevant in CS"],
        ["**Data plagiarism**", "Reusing datasets without permission or acknowledgement"],
        ["**Image plagiarism**", "Reproducing figures, diagrams or screenshots without citation"],
        ["**Translation plagiarism**",
         "Translating a foreign-language source and presenting it as original"],
        ["**AI-assisted plagiarism**",
         "Submitting AI-generated text as one's own, or paraphrasing AI output without disclosure"],
    ])),
    box("caution", "Code is not exempt because reuse is normal",
        p("Open-source licences &mdash; <span class=\"kw\">MIT, GPL, Apache, BSD</span> "
          "&mdash; impose <em>specific attribution formats</em>. Copying a Stack Overflow "
          "snippet or a GitHub function without the required notice is simultaneously an "
          "academic and a licensing violation, and the licensing obligation is legally "
          "binding rather than merely academic.")),
    p("On AI-assisted work the norms are still settling. Venues differ, but the emerging "
      "expectation is <span class=\"kw\">disclosure of AI assistance plus author "
      "responsibility for verification</span>; unverified AI output additionally risks "
      "fabricated citations. Lecture 5 covers the UPES declaration requirement."),

    sec(5, "How Detection Works", "s5"),
    tw(table(["Approach", "Methodology", "Strengths", "Limitations"], [
        ["**String matching**", "Exact or near-exact text comparison", "Fast, transparent",
         "Fails on paraphrased content"],
        ["**Fingerprinting**", "Hash-based indexing of n-grams", "Efficient for large corpora",
         "Sensitive to word-order changes"],
        ["**Stylometry**", "Statistical analysis of writing style", "Detects ghostwriting",
         "Requires substantial reference text"],
        ["**Semantic similarity**", "NLP-based embedding comparison", "Identifies paraphrasing",
         "Computationally intensive"],
        ["**Citation analysis**", "Examination of citation patterns", "Detects missing citations",
         "Limited to structured documents"],
    ])),
    box("exam", "Method maps to offence type",
        p("String matching catches <em>direct</em> plagiarism; fingerprinting scales that "
          "comparison to web-sized corpora; semantic similarity is what catches "
          "<em>mosaic</em> plagiarism; stylometry addresses <em>authorship</em> rather than "
          "overlap. Be able to explain n-gram fingerprinting and cosine similarity "
          "qualitatively &mdash; hash overlapping n-grams and compare hash sets, so "
          "comparison cost becomes independent of document length.")),
    p("Source code needs its own algorithms: identifier renaming, statement reordering and "
      "formatting changes defeat text comparison entirely, which is why token-based and "
      "structural methods exist."),

    sec(6, "Detection Tools", "s6"),
    sub("6.1 Text and Manuscript Tools", "s6-1"),
    ul(["<span class=\"kw\">Turnitin</span> &mdash; the most widely deployed platform for "
        "student submissions. Compares against internet sources, student-paper repositories "
        "and publications; outputs a similarity index with highlighted matching passages; "
        "integrates with learning management systems. Does not detect well-paraphrased text "
        "or ideas, and thresholds vary by institution.",
        "<span class=\"kw\">iThenticate</span> &mdash; preferred by journal publishers for "
        "research manuscripts; built on the CrossCheck database of published scholarly "
        "content; integrated with editorial workflows. Subscription-based and primarily "
        "text-based.",
        "<span class=\"kw\">Grammarly</span> &mdash; lightweight checking integrated with "
        "writing assistance; convenient for early drafts, with a limited database.",
        "<span class=\"kw\">Copyscape</span> &mdash; effective for detecting unauthorised "
        "online republication; less suitable for academic manuscript review.",
        "<span class=\"kw\">PlagScan</span> &mdash; enterprise and institutional deployment; "
        "configurable sensitivity and multi-format support; smaller database than Turnitin.",
        "<span class=\"kw\">Urkund (Ouriginal)</span> &mdash; European institutional "
        "deployments; multilingual support; LMS integration."]),

    sub("6.2 Source-Code and AI Detectors", "s6-2"),
    ul(["<span class=\"kw\">MOSS</span> (Measure of Software Similarity) &mdash; designed "
        "specifically for source code, using winnowing and fingerprinting algorithms adapted "
        "for programming structure. The standard tool for programming assignments.",
        "<span class=\"kw\">JPlag</span> &mdash; open-source, multi-language, token-based "
        "comparison.",
        "<span class=\"kw\">AI-generated text detectors</span> &mdash; GPTZero, "
        "Originality.ai, Turnitin AI Writing Detection, Copyleaks AI Content Detector. These "
        "analyse perplexity, burstiness and stylistic patterns to estimate the likelihood of "
        "machine generation."]),
    box("caution", "The AI-detector caveat",
        p("Reliability remains <span class=\"kw\">contested, with documented false-positive "
          "rates</span>. Non-native English writers and heavily edited prose are "
          "disproportionately flagged. Such output is a prompt for human inquiry, "
          "<em>never evidence of misconduct on its own</em>. Note also that no tool detects "
          "<em>idea</em> plagiarism, which is why human review remains irreplaceable.")),

    sub("6.3 Interpreting Similarity Reports", "s6-3"),
    p("A high similarity index does not automatically imply plagiarism, and a low index does "
      "not prove its absence. Proper interpretation requires five steps:"),
    ol(["<span class=\"kw\">Source identification.</span> Determine whether matches originate "
        "from properly cited sources.",
        "<span class=\"kw\">Quoted material recognition.</span> Exclude legitimately quoted "
        "passages with quotation marks.",
        "<span class=\"kw\">Common knowledge exclusion.</span> Phrases or terminology widely "
        "accepted as common knowledge.",
        "<span class=\"kw\">Methodology overlap.</span> Standard methods or equations appear "
        "legitimately across multiple papers.",
        "<span class=\"kw\">Reference list exclusions.</span> Most tools exclude "
        "bibliographies &mdash; verify that this is configured correctly."]),
    tw(table(["Similarity index", "Typical interpretation"], [
        ["Below 10%", "Generally acceptable"],
        ["10&ndash;20%", "Review required"],
        ["20&ndash;40%", "Significant overlap; likely requires revision"],
        ["Above 40%", "High concern; requires major restructuring or proper citation"],
    ])),
    p("These thresholds are indicative and are institution- and journal-specific. IEEE "
      "permits up to 30 per cent similarity for review articles under certain conditions, and "
      "the UGC Regulations 2018 set graded similarity levels for theses and dissertations "
      "with escalating consequences, beginning with a tolerance of up to 10 per cent. "
      "Confirm your own programme's threshold rather than relying on the indicative bands."),
    box("exam", "The two symmetric errors",
        p("Treating a 32 per cent index composed entirely of quoted, cited and bibliographic "
          "matches as misconduct &mdash; and treating a 6 per cent index as clearance when "
          "that 6 per cent is an uncited verbatim paragraph. Both are failures of "
          "interpretation, and avoiding them is the skill being assessed.")),

    sec(7, "Case Studies", "s7"),
    sub("7.1 The Hwang Woo-suk Affair (2004&ndash;2005)", "s7-1"),
    p("The South Korean researcher published landmark papers in <em>Science</em> claiming "
      "successful cloning of human embryonic stem cells. Investigations revealed that data "
      "had been fabricated and key figures duplicated from earlier publications; the incident "
      "included image reuse and uncredited appropriation of research methodologies. Papers "
      "were retracted, funding revoked, and a criminal conviction followed, prompting reform "
      "of research-integrity oversight."),
    p("<span class=\"kw\">Lesson:</span> detection tools applied rigorously to figures and "
      "data can reveal inconsistencies that textual review misses."),

    sub("7.2 Retraction of a CS Paper for Self-Plagiarism (2019)", "s7-2"),
    p("A paper in a Springer journal was retracted after editors identified that the authors "
      "had published substantially overlapping content in two separate venues without "
      "cross-citation."),
    p("<span class=\"kw\">Lesson:</span> self-plagiarism is a serious ethical violation even "
      "when the author owns both works. Maintain a careful publication record and disclose "
      "prior related work."),

    sub("7.3 Code Plagiarism in Programming Courses", "s7-3"),
    p("Universities report widespread code plagiarism in introductory programming courses. "
      "Studies using MOSS have shown that in some cohorts <span class=\"kw\">15&ndash;25 per "
      "cent</span> of submitted programming assignments contain significant code overlap "
      "with other submissions."),
    p("Mitigation strategies: use MOSS or JPlag for automated detection; design assignments "
      "with unique parameters per student; conduct viva voce examinations to verify "
      "understanding; and educate students about academic integrity policies from the outset "
      "of the course."),

    sec(8, "Consequences", "s8"),
    tw(table(["Level", "Consequences"], [
        ["**Academic**",
         "Failure or zero grade; course failure or academic probation; suspension or "
         "expulsion; revocation of degrees in severe cases"],
        ["**Professional**",
         "Retraction of published papers; blacklisting from journals and conferences; loss of "
         "research funding; termination of employment"],
        ["**Legal**",
         "Copyright infringement lawsuits; breach of publisher agreements; damages and "
         "injunctions in civil proceedings"],
        ["**Reputational**",
         "Long-term damage to professional credibility; difficulty securing collaborations; "
         "public retraction notices affecting future publications"],
    ])),
    p("Note the asymmetry: the reputational consequence outlasts every other category, "
      "because a retraction notice is itself a permanent, indexed, citable record attached to "
      "the original paper."),

    sec(9, "Best Practices", "s9"),
    ol(["Begin research with a <span class=\"kw\">structured literature log</span>, recording "
        "quotations and paraphrases with their sources.",
        "Use <span class=\"kw\">reference management tools</span> &mdash; Zotero, Mendeley or "
        "EndNote &mdash; to organise citations systematically.",
        "<span class=\"kw\">Master the citation style</span> mandated by your target venue "
        "(APA, IEEE, ACM, MLA, Chicago).",
        "<span class=\"kw\">Paraphrase responsibly:</span> comprehend the original, "
        "restructure the argument, and cite the source.",
        "Use <span class=\"kw\">quotation marks</span> for any verbatim text beyond standard "
        "terminology.",
        "<span class=\"kw\">Attribute ideas, not just text.</span> Even paraphrased concepts "
        "require citation.",
        "<span class=\"kw\">Disclose prior work</span> when extending your own publications.",
        "<span class=\"kw\">For code, attribute origins.</span> Open-source licences (MIT, "
        "GPL, Apache) require specific attribution formats.",
        "<span class=\"kw\">Use AI tools responsibly.</span> Disclose assistance where the "
        "venue requires it, and verify generated content against sources.",
        "<span class=\"kw\">Run pre-submission checks</span> using institutional access to "
        "Turnitin or iThenticate."]),
    box("caution", "The one habit that matters most",
        p("Capture the citation <em>at the moment of reading</em>, not at the moment of "
          "writing. Nine of these ten safeguards fail silently if deferred to the drafting "
          "stage. Note also that a pre-submission check is <em>diagnostic, not "
          "exculpatory</em>: it finds negligence before a reviewer does, but running it does "
          "not license whatever it fails to flag.")),

    sec(10, "Summary", "s10"),
    ul(["Plagiarism is the uncredited appropriation of another's intellectual work, "
        "encompassing ideas, text, data and code.",
        "The principal types are <span class=\"kw\">direct, self, mosaic and "
        "accidental</span>, each with distinct characteristics and severities.",
        "Modern detection employs fingerprinting, NLP-based semantic similarity and "
        "stylometric analysis.",
        "Similarity indices must be interpreted contextually; quoted material, references and "
        "common knowledge all affect interpretation.",
        "Computer science introduces unique challenges, particularly regarding code "
        "plagiarism and AI-assisted authorship.",
        "Rigorous citation practices, reference management and pre-submission checks are the "
        "essential safeguards."]),

    sec(11, "Exam Preparation", "s11"),
    box("exam", "Six preparation points",
        ol(["<span class=\"kw\">Distinguish definitional nuances.</span> Be precise about the "
            "differences between direct, self, mosaic and accidental plagiarism. Examiners "
            "test comprehension of the boundaries.",
            "<span class=\"kw\">Memorise institutional definitions</span> &mdash; UGC, IEEE "
            "and ACM.",
            "<span class=\"kw\">Understand detection algorithms.</span> Explain "
            "fingerprinting, n-gram analysis and cosine similarity qualitatively.",
            "<span class=\"kw\">Know the tools</span> and their primary use cases &mdash; "
            "MOSS for code, iThenticate for manuscripts, Turnitin for student work.",
            "<span class=\"kw\">Practise applied scenarios.</span> Expect case-study "
            "questions requiring you to identify the type and recommend remediation.",
            "<span class=\"kw\">Cite correctly in answers</span>, even under examination "
            "conditions."])),

    sub("11.1 Short-Answer Questions", "s11-1"),
    qlist(["Define plagiarism as per the Office of Research Integrity. " + marks("2 marks"),
           "Differentiate between direct plagiarism and mosaic plagiarism, with one example "
           "of each. " + marks("3 marks"),
           "What is self-plagiarism? Why is it unethical even though the author owns the "
           "original work? " + marks("3 marks"),
           "List any four causes of accidental plagiarism. " + marks("2 marks"),
           "Name two plagiarism detection tools designed specifically for source code. "
           + marks("2 marks")]),

    sub("11.2 Long-Answer Questions", "s11-2"),
    qlist(["Discuss the four major types of plagiarism in detail, providing a real-world or "
           "hypothetical example for each. " + marks("10 marks"),
           "Explain the working principles of plagiarism detection tools. Compare "
           "string-matching approaches with semantic similarity methods. " + marks("10 marks"),
           "Describe the consequences of plagiarism at academic, professional and legal "
           "levels. What policies has the UGC framed to address plagiarism in higher "
           "education? " + marks("10 marks"),
           "MOSS and JPlag are used for source-code plagiarism detection. Compare their "
           "methodologies and explain why specialised tools are needed for code. "
           + marks("8 marks"),
           "With the rise of generative AI tools, how has the definition and detection of "
           "plagiarism evolved? Discuss the ethical responsibilities of researchers. "
           + marks("10 marks")]),

    sub("11.3 Application Question", "s11-3"),
    box("eg", "Classify and remediate",
        p("You are reviewing a manuscript in which the authors have reused four paragraphs "
          "verbatim from their own 2021 conference paper without citation or quotation marks, "
          "and have paraphrased two additional paragraphs from a 2019 journal article without "
          "attribution.")
        + p("Identify each instance of plagiarism, classify its type, and recommend the "
            "corrective action in each case.")),

    sec(12, "Further Reading", "s12"),
    ol(["Roig, M. (2015). <em>Avoiding Plagiarism, Self-Plagiarism, and Other Questionable "
        "Writing Practices: A Guide to Ethical Writing</em>. Office of Research Integrity.",
        "Anderson, M. S., &amp; Steneck, N. H. (2011). <em>The Problem of Plagiarism</em>. "
        "Urologic Oncology.",
        "Wager, E. (2014). Defining and responding to plagiarism. <em>Learned Publishing</em>, "
        "27(1), 33&ndash;42.",
        "IEEE Publication Services and Products Board Operations Manual &mdash; sections on "
        "author ethics and plagiarism.",
        "UGC (India) (2018). <em>University Grants Commission (Promotion of Academic "
        "Integrity and Prevention of Plagiarism in Higher Educational Institutions) "
        "Regulations, 2018</em>."]),
])
