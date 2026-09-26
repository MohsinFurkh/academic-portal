# -*- coding: utf-8 -*-
"""Unit III - Lecture 8: Regulatory Frameworks and Case Studies."""
from kit import (box, card, flow, gauge, goals, grid, marks, ol, p, qlist, rule,
                 sec, stack, sub, table, tw, ul)

STEM = "CSEG3060_Unit3_L08_Regulatory_Frameworks_and_Case_Studies"
RUNNER = "CSEG3060 · Unit III · Lecture 8 — Regulatory Frameworks and Case Studies"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 8 — Regulatory Frameworks and Case Studies",
    "desc": ("Unit III Lecture 8 for Research Methodology in Computer Science "
             "(CSEG3060): international and Indian regulatory frameworks, Institutional "
             "Ethics Committees, UGC and UPES plagiarism policy, ethical dilemmas in "
             "computing, and six case studies."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Regulatory Frameworks and Case Studies",
     "body": stack([
         p("Institutional Ethics Committees · plagiarism policy · ethical dilemmas in "
           "computing", "lead", "max-width:860px;color:var(--mint)"),
         card(p("Principles become obligations only when a committee can refuse your "
                "protocol and a regulation can cancel your degree.", None,
                "margin:0;font-size:19px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 8 of 8 — concluding lecture · 60 minutes · CO3", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO3",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Identify** the principal national and international bodies governing research ethics in India",
         "**Describe** the composition, mandate and review procedure of an Ethics Committee",
         "**Apply** UGC and UPES plagiarism regulations to concrete academic situations",
         "**Analyse** real case studies to detect violations and recommend corrective action",
         "**Evaluate** emerging dilemmas arising from AI, big data and generative systems",
         "**Formulate** a defensible position *using established regulatory language*",
     ]), None, "fill")},

    {"title": "Regulatory architecture", "kicker": "Orientation",
     "h": "Four tiers — distinguished by how each is enforced",
     "body": stack([
         table(["Tier", "Instruments", "Enforcement mechanism"], [
             ["**1 · International codes**", "Nuremberg (1947), Helsinki (1964, rev. 2013), Belmont (1979)",
              "Moral authority; no direct enforcement"],
             ["**2 · Professional codes**", "ACM Code of Ethics (2018), IEEE Code of Ethics",
              "Membership status, venue policy, reputation"],
             ["**3 · National law and guidance**", "ICMR (2017), UGC (2018), DPDP Act (2023), IT Act (2000/2008), CDSCO, MeitY",
              "**Legally binding; penalties attach**"],
             ["**4 · Institutional bodies**", "IECs / IRBs, Research Integrity Offices, Departmental Research Committees",
              "**Operational gatekeepers — approve, refuse, monitor**"],
         ]),
         grid([
             card(p("A multidisciplinary body reviewing research involving human participants "
                    "or sensitive data.", "fine", "margin:0"), "IEC", "tint"),
             card(p("The US equivalent; used interchangeably in the literature.",
                    "fine", "margin:0"), "IRB", "tint"),
             card(p("Percentage of matched text reported by detection software.",
                    "fine", "margin:0"), "Similarity index", "tint"),
             card(p("Fabrication, falsification or plagiarism in proposing, performing, "
                    "reviewing or reporting research (ORI).", "fine", "margin:0"),
                  "Research misconduct", "tint"),
         ], "1fr 1fr 1fr 1.2fr", gap="9px"),
         p("The tiers interlock: a UPES-IEC decision applies <b>Belmont</b> principles through "
           "<b>ICMR</b> procedure — so an institutional refusal ultimately rests on a 1979 "
           "document. Tier 4 is the only layer you will personally interact with.",
           "fine", "margin:0"),
     ], 10)},

    {"title": "Tier 1 — international", "kicker": "Tier 1",
     "h": "The foundational codes",
     "body": stack([
         flow(["Nuremberg 1947", "Helsinki 1964 / rev. 2013", "Belmont 1979"]),
         grid([
             card(p("Arising from the trial of Nazi physicians. Ten principles, foremost "
                    "<b>voluntary informed consent</b> — which now undergirds modern "
                    "data-protection law and CS user studies alike.", "small", "margin:0"),
                  "The Nuremberg Code", "tint"),
             card(p("World Medical Association. Extends Nuremberg and distinguishes "
                    "<b>therapeutic from non-therapeutic</b> research. The most widely adopted "
                    "international standard; referenced by Indian institutional policy.",
                    "small", "margin:0"), "Declaration of Helsinki", "tint"),
             card(p("Three principles that now structure IEC review: <b>respect for "
                    "persons</b> (autonomy, consent), <b>beneficence</b> (minimise harm), "
                    "<b>justice</b> (fair distribution of burdens and benefits).",
                    "small", "margin:0"), "The Belmont Report", "teal"),
         ], "1fr 1fr 1.15fr"),
         card(p("<b>Belmont is the examinable one</b> because IEC review forms are effectively "
                "operationalised Belmont: consent procedures test <b>respect for persons</b>, "
                "risk–benefit analysis tests <b>beneficence</b>, and recruitment criteria test "
                "<b>justice</b>.", "small", "margin:0"), None, "rust"),
         rule("All three were written for medical research — yet each applies directly to a CS "
              "usability study, a crowdsourced annotation task, or an adversarial-testing "
              "protocol involving people. <b>The object of protection is the participant, not "
              "the discipline.</b>"),
     ], 11)},

    {"title": "Tier 2 — professional", "kicker": "Tier 2",
     "h": "Professional codes, and the limits of enforceability",
     "body": stack([
         grid([
             card(ul(["Contribute to society and human well-being",
                      "**Avoid harm**",
                      "Be honest and trustworthy",
                      "Be fair and **take action not to discriminate**",
                      "Respect privacy",
                      "Honour confidentiality"], None, "margin:0;font-size:13px"),
                  "ACM Code of Ethics (2018) — general obligations", "teal"),
             card(p("Commits members to treat all persons fairly and with respect, to refrain "
                    "from harassment and discrimination, to avoid injuring others, and "
                    "explicitly requires <b>responsible disclosure of factors that might "
                    "endanger the public</b>.", "small", "margin:0"),
                  "IEEE Code of Ethics", "teal"),
         ]),
         card(p("Note the structure of both: they impose <b>positive duties</b> — contribute, "
                "act against discrimination, disclose danger — and not merely prohibitions. "
                "Students read all ethics as a list of prohibitions and conclude that doing "
                "nothing is always safe. The ACM code says otherwise.", "small", "margin:0"),
              None, "rust"),
         grid([
             card(p("Sanctioned through <b>membership status, publication venue policy and "
                    "reputational consequence</b> rather than by law. A code violation rarely "
                    "reaches a court — but can end a publication record.", "small", "margin:0"),
                  "Enforceability in practice", "tint"),
             card(p("ACM's “avoid harm” and anti-discrimination duties are the instruments "
                    "under which <b>algorithmic bias</b> and unsafe deployment are argued as "
                    "ethics violations rather than merely engineering defects.",
                    "small", "margin:0"), "Why they matter to computing", "tint"),
         ]),
     ], 10)},

    {"title": "Tier 3 — Indian frameworks", "kicker": "Tier 3",
     "h": "Five bodies, and what each can do to a researcher",
     "body": stack([
         grid([
             card(p("India's most comprehensive ethical standard and the source of IEC "
                    "composition and procedure rules. ICMR has additionally issued dedicated "
                    "ethical guidance on <b>AI in biomedical research and healthcare</b> — "
                    "algorithmic transparency, dataset representativeness, bias mitigation.",
                    "small", "margin:0"),
                  "ICMR — National Ethical Guidelines (2017)", "teal"),
             card(p("The <b>(Promotion of Academic Integrity and Prevention of Plagiarism) "
                    "Regulations, 2018</b> define plagiarism levels and penalties for higher "
                    "education institutions. Subsequent <b>draft revisions</b> address "
                    "similarity thresholds and generative-AI content.", "small", "margin:0"),
                  "UGC", "teal"),
         ]),
         grid([
             card(p("National Strategy for AI (2018) and the <b>Digital Personal Data "
                    "Protection Act, 2023</b> — the operative Indian data-protection statute, "
                    "which applies to <b>your research data handling</b>, not only to "
                    "companies.", "small", "margin:0"), "MeitY", "tint"),
             card(p("Regulates clinical trials and <b>software as a medical device "
                    "(SaMD)</b> — increasingly relevant where CS departments build AI/ML "
                    "diagnostic tools.", "small", "margin:0"), "CDSCO", "tint"),
             card(p("The legal foundation for prosecuting unauthorised data access, digital "
                    "fraud and cybercrime — the statute under which a research data-handling "
                    "failure becomes a <b>criminal</b> rather than an academic matter.",
                    "small", "margin:0"), "IT Act, 2000 (am. 2008)", "tint"),
         ], "1fr 1fr 1.15fr", gap="10px"),
         rule("Naming the correct instrument is a marking criterion. Confusing <b>UGC</b> "
              "(academic integrity) with <b>DPDP</b> (data protection) is a common and costly "
              "error."),
     ], 10)},

    {"title": "IEC purpose and composition", "kicker": "Institutional bodies · 1 of 3",
     "h": "Who sits on the committee, and why",
     "body": stack([
         grid([
             card(ol(["**Protection** of participants' rights and welfare",
                      "**Assurance** that risks are minimised and reasonable",
                      "**Verification** that consent procedures are adequate",
                      "**Oversight** through continuing review"],
                     None, "margin:0;font-size:13px"), "Four purposes", "teal"),
             card(p("Multidisciplinary and gender-balanced, <b>minimum five and maximum twelve "
                    "members</b> under ICMR 2017:", "small", "margin:0 0 6px") +
                  ul(["**Chairperson — external to the institution**",
                      "1–2 basic medical scientists · 1–2 clinicians",
                      "A **legal expert or retired judge**",
                      "A **social scientist or philosopher**",
                      "A **layperson** representing community interests",
                      "Member Secretary — day-to-day administration"],
                     None, "margin:0;font-size:13px"), "Composition", "rust"),
         ], "1fr 1.35fr"),
         grid([
             card(p("Where proposals involve large-scale personal-data processing, the "
                    "committee should additionally include a <b>data protection officer or "
                    "information-security expert</b> — without whom it cannot competently "
                    "assess re-identification risk.", "small", "margin:0"),
                  "The CS-specific addition", "teal"),
             card(p("The <b>external chair</b> guards against institutional self-interest; the "
                    "<b>legal member</b> reads consent documents as enforceable instruments; "
                    "the <b>layperson</b> tests whether disclosure is actually comprehensible "
                    "to a participant.", "small", "margin:0"),
                  "Why multidisciplinarity is not decoration", "tint"),
         ]),
     ], 10)},

    {"title": "Review levels and process", "kicker": "Institutional bodies · 2 of 3",
     "h": "Three review levels, seven steps",
     "body": stack([
         table(["Review level", "Trigger", "Outcome"], [
             ["**Exempt**", "Minimal risk; secondary use of de-identified data; survey of public officials",
              "Notification of exemption"],
             ["**Expedited**", "Minimal risk but not exempt; minor modification to an approved protocol",
              "Approval by Member Secretary and one member"],
             ["**Full board**", "Greater than minimal risk; vulnerable populations; **novel AI/ML systems involving personal data**",
              "Decision at a convened quorum meeting"],
         ]),
         flow(["1 Submission", "2 Screening", "3 Reviewers", "4 Board discussion",
               "5 Decision", "6 Notification", "7 Continuing review"]),
         grid([
             card(p("Submission carries the proposal, consent forms, <b>data management "
                    "plan</b>, recruitment materials and risk–benefit analysis. Notification "
                    "typically follows within <b>4–6 weeks</b>; “modifications required” is "
                    "the most common outcome and is <i>not</i> a rejection.",
                    "small", "margin:0"), None, "tint"),
             card(p("<b>Exemption is a determination the committee makes, not one the "
                    "investigator may assume.</b> Self-exempting a protocol is itself a "
                    "procedural violation — and a protocol amended mid-study without "
                    "resubmission is operating without approval.", "small", "margin:0"),
                  None, "rust"),
         ]),
         rule("Four to six weeks plus a modification cycle means ethics review must be "
              "initiated <b>at proposal stage</b>, not when data collection is about to begin."),
     ], 9)},

    {"title": "The UPES-IEC", "kicker": "Institutional bodies · 3 of 3",
     "h": "Does your project need review?",
     "body": stack([
         grid([
             card(ul(["**Human participants** — surveys, interviews, behavioural experiments, usability studies",
                      "**Personally identifiable information** collected from data subjects",
                      "**Animal subjects** — rare in CS, required for some HCI work",
                      "**Environmental samples** of biological origin",
                      "**Dual-use research of concern (DURC)**"],
                     None, "margin:0;font-size:13px"), "What triggers UPES-IEC review", "rust"),
             stack([
                 card(p("Proposals route through the online <b>Research Management System "
                        "(RMS)</b> portal. The committee meets <b>quarterly</b>, with "
                        "provision for <b>emergency review</b> of time-sensitive studies.",
                        "small", "margin:0"), "Submission and cadence", "tint"),
                 card(p("A usability study, a developer survey, a crowdsourced annotation task "
                        "or an adversarial-testing protocol with human participants "
                        "<b>all require review</b>. A purely computational study on a public, "
                        "properly licensed, de-identified dataset generally does not.",
                        "small", "margin:0"), "For a CS final-year project", "teal"),
             ], 10),
         ], "1fr 1.2fr"),
         card(p("<b>DURC is listed deliberately.</b> Research with legitimate civilian use that "
                "is also weaponisable — vulnerability-discovery tooling, disinformation-capable "
                "generative models, surveillance automation — is within the committee's remit "
                "<b>even with no human participants at all</b>.", "small", "margin:0"),
              None, "rust"),
     ], 11)},

    {"title": "Plagiarism regulation", "kicker": "Policy",
     "h": "UGC 2018: definition, tiers and revisions",
     "body": stack([
         rule("<b>UGC definition:</b> “the practice of taking someone else's work or ideas and "
              "passing them off as one's own” — encompassing verbatim copying, close "
              "paraphrasing without acknowledgement, <b>uncited use of methodologies, datasets "
              "or algorithms</b>, self-plagiarism and collusion."),
         grid([
             stack([
                 gauge([("Up to 10%", "#1F6F66", "Minor — warning; no penalty if properly cited"),
                        ("10–40%", "#D9603F", "Moderate — denial of degree / withdrawal of paper"),
                        ("Above 40%", "#B5452A", "Major — expulsion; blacklisting of authors")]),
                 p("Exclusions: quotes, bibliography, small matches. Thresholds are "
                   "<b>floors for penalty</b> — an institution may be stricter, not laxer.",
                   "fine", "margin:0"),
             ], 9),
             stack([
                 card(ul(["Exclusion of **generative-AI output** from similarity detection",
                          "**Mandatory declaration** of AI-assisted content generation",
                          "Stricter thresholds for doctoral theses",
                          "Explicit treatment of **code plagiarism** using MOSS or JPlag"],
                         None, "margin:0;font-size:13px"),
                      "Proposed revisions under discussion", "tint"),
                 card(p("Note the third clause of the definition: <b>methodologies, datasets or "
                        "algorithms</b>. A borrowed pipeline or dataset is regulated content, "
                        "not just borrowed prose.", "small", "margin:0"), None, "rust"),
             ], 9),
         ], "1fr 1.1fr"),
         p("Verify the tiers and penalties against the gazette text before relying on exact "
           "figures in an examination answer.", "fine", "margin:0"),
     ], 9)},

    {"title": "Dilemmas in computing", "kicker": "Core",
     "h": "Seven contested areas — each tagged to a code",
     "body": stack([
         grid([
             card(p("Participants may not read forms · <b>deception is sometimes necessary</b> "
                    "(phishing susceptibility) · withdrawal after anonymisation is technically "
                    "difficult.", "fine", "margin:0"),
                  "1 · Consent in online studies", "tint"),
             card(p("Social media, mobile and IoT datasets remain <b>re-identifiable</b>; hence "
                    "differential privacy, <i>k</i>-anonymity, federated learning.",
                    "fine", "margin:0"), "2 · Privacy and anonymisation", "tint"),
             card(p("Hiring tools disadvantaging women (Amazon, 2018) · facial recognition with "
                    "elevated error rates for women and people of colour · predictive policing. "
                    "<b>ACM: non-discrimination.</b>", "fine", "margin:0"),
                  "3 · Algorithmic bias", "rust"),
             card(p("Generative models capable of disinformation · vulnerability-discovery "
                    "tooling · surveillance automation. <b>IEEE: public-endangerment "
                    "disclosure.</b>", "fine", "margin:0"), "4 · Dual-use (DURC)", "rust"),
         ], "1fr 1fr 1fr 1fr", gap="9px"),
         grid([
             card(p("Omitted contributors, honorary authorship, competing priority claims.",
                    "fine", "margin:0"), "5 · Authorship disputes", "tint"),
             card(p("Loyalty to colleagues against responsibility to the public. Institutional "
                    "protection aligned to the <b>Public Interest Disclosure and Protection of "
                    "Informers Act, 2010</b>.", "fine", "margin:0"), "6 · Whistleblowing", "tint"),
             card(p("Publication pressure driving selective reporting, p-hacking and, at the "
                    "extreme, invented results.", "fine", "margin:0"),
                  "7 · Reproducibility and fabrication", "tint"),
         ], "1fr 1.15fr 1fr", gap="9px"),
         rule("Ethics is not simply prohibition: some valid questions cannot be studied with "
              "full prior disclosure, which is <b>why a committee exists</b> — to weigh "
              "justification, debriefing and harm rather than apply a blanket rule."),
     ], 9)},

    {"title": "UPES policy in operation", "kicker": "Practical application",
     "h": "Thresholds, workflow, consequences — and a worked case",
     "body": stack([
         grid([
             stack([
                 card(p("<b>Turnitin</b> for textual submissions · <b>Ouriginal</b> for "
                        "cross-checking · <b>MOSS</b> for code at the supervising faculty's "
                        "discretion.", "small", "margin:0"), "Tooling", "tint"),
                 card(p("M.Tech / PhD dissertations <b>≤ 10%</b><br>"
                        "B.Tech project reports <b>≤ 20%</b><br>"
                        "Conference / journal publications <b>≤ 15%</b> (excluding "
                        "self-citation)", "small", "margin:0"),
                      "Thresholds, excluding bibliography and quotes", "teal"),
                 card(p("First offence — written warning and mandatory resubmission<br>"
                        "Second — grade “F” and <b>six-month debarment</b><br>"
                        "Third, or major plagiarism above 40% — expulsion, and degree "
                        "revocation if discovered post-graduation", "small", "margin:0"),
                      "Escalating consequences", "rust"),
             ], 9),
             stack([
                 flow(["Submit via LMS", "Report in 24h", "Supervisor reviews",
                       "Revise if over", "DRC"]),
                 card(p("Generative AI is <b>permitted for grammar and code suggestion</b>, "
                        "subject to <b>explicit declaration in the Acknowledgement "
                        "section</b>. Submitting AI-generated text as one's own original "
                        "writing constitutes academic misconduct.", "small", "margin:0"),
                      "Generative-AI policy", "tint"),
                 card(p("<b>Aditi's B.Tech report.</b> Initial index <b>22%</b>, of which 14% "
                        "is a methodology section closely paraphrasing a published survey "
                        "without quotation marks. Threshold is 20%, so it fails. She rewrites, "
                        "cites the survey and quotes technical definitions; the revised report "
                        "returns <b>9%</b> and the DRC accepts it.<br>Had she not revised: "
                        "grade “F”, and the supervisor must report to the Departmental "
                        "Disciplinary Committee.", "small", "margin:0"),
                      "Worked case", "teal"),
             ], 9),
         ], "1fr 1.2fr"),
     ], 9)},

    {"title": "Six case studies", "kicker": "Case studies",
     "h": "Diagnose the violation, name the instrument",
     "body": stack([
         table(["Case", "Facts", "Lesson"], [
             ["**Facebook emotional contagion (2014)**",
              "Cornell and Facebook manipulated news feeds of ~**689,000** users; no consent, on the basis of terms of service. HHS later clarified such work can require IRB review",
              "Manipulating the user environment triggers obligation even when the data already exist"],
             ["**Cambridge Analytica (2018)**",
              "Data of ~**87 million** users harvested via a personality app for political micro-targeting; **$5bn FTC penalty**",
              "Verify the chain of consent for all secondary data, especially across jurisdictions"],
             ["**Theranos (2003–2018)**",
              "Claimed finger-prick diagnostics; whistleblowers alleged non-functional technology and fabricated results; criminal prosecution",
              "Reporting model accuracy unsupported by experiment is the same category of misconduct"],
             ["**Henrietta Lacks / HeLa**",
              "Cells taken in 1951 without consent; genome published in 2013 without consulting the family; NIH data-access working group established",
              "Data from identifiable sources retain ethical obligations indefinitely"],
             ["**Microsoft “Tay” (2016)**",
              "A learning Twitter chatbot driven to offensive output by coordinated adversarial input within ~16 hours; withdrawn",
              "**ACM “avoid harm” applies at deployment** — red-teaming and safeguards are required"],
             ["**Indian doctoral thesis (2016)**",
              "~**60%** of a thesis found plagiarised via Turnitin and manual review; registration cancelled under UGC Regulations; supervisory committee scrutinised",
              "**Supervisors share responsibility;** checks belong throughout the lifecycle"],
         ]),
         rule("Five of the six harms were <b>foreseeable</b>, and in each the missing element "
              "was an <b>independent review that nobody sought</b>."),
     ], 9)},

    {"title": "Summary and discussion", "kicker": "Consolidation",
     "h": "Five takeaways, and five questions",
     "body": stack([
         grid([
             card(ul(["Enforcement runs through a **four-tier architecture** — international, professional, national, institutional",
                      "**IECs are the operational pivot**; UPES-IEC applies ICMR standards",
                      "**Plagiarism policy** works through thresholds and tiered consequences; generative AI is the live area",
                      "**CS dilemmas** — online consent, re-identification, bias, dual use, authorship, reproducibility",
                      "**Cases** show violations are typically foreseeable; independent review is the missing element"],
                     None, "margin:0;font-size:13px"), "Five takeaways", "teal"),
             stack([
                 card(p("Analyse the Facebook contagion study using the <b>Belmont "
                        "framework</b> — which principles were violated, and how might an IEC "
                        "review have altered the design?", "small", "margin:0"),
                      "Question 1 · exam format", "rust"),
                 card(p("Compare the ACM and IEEE codes. <b>To what extent are they enforceable "
                        "in practice</b>, and what does that imply?", "small", "margin:0"),
                      "Question 2", "tint"),
                 card(p("Examine Cambridge Analytica under the <b>DPDP Act, 2023</b> — what "
                        "liabilities would researchers face today at an Indian institution?",
                        "small", "margin:0"), "Question 3 · exam format", "rust"),
                 card(p("Can consent be meaningfully obtained for large pre-existing datasets? "
                        "· Where should the line fall on dual-use research?",
                        "small", "margin:0"), "Questions 4 and 5", "tint"),
             ], 8),
         ], "1fr 1.15fr"),
         rule("Across eight lectures this unit moved from <i>why literature matters</i>, "
              "through <i>how to analyse it</i>, to <i>the obligations that make the resulting "
              "knowledge trustworthy</i> — and this lecture supplies the machinery that "
              "enforces them."),
     ], 10)},

    {"title": "Exam focus", "kicker": "Exam preparation",
     "h": "Numbers, documents, distinctions, technique",
     "body": stack([
         grid([
             card(ul(["**The numbers:** UGC and UPES thresholds with penalty tiers · IEC size (**5–12**) · notification window (**4–6 weeks**) · UPES thresholds by degree type",
                      "**The documents:** Nuremberg (1947) · Helsinki (1964, rev. 2013) · Belmont (1979) and its three principles · ICMR (2017) · UGC (2018) · DPDP Act (2023) · ACM Code (2018) · IT Act (2000/2008)",
                      "**The distinctions:** exempt vs expedited vs full board · Nuremberg vs Helsinki · plagiarism vs self-plagiarism vs collusion · IEC vs IRB (jurisdictional, not substantive)"],
                     None, "margin:0;font-size:13px"), "What is tested", "teal"),
             stack([
                 card(ol(["Identify the ethical issue",
                          "**Name the governing code or regulation**",
                          "State what review or disclosure was owed",
                          "Recommend the remedy"], None, "margin:0;font-size:13px"),
                      "Four-move case analysis", "rust"),
                 card(p("Tay &rarr; ACM “avoid harm” · Cambridge Analytica &rarr; DPDP / GDPR "
                        "· the thesis case &rarr; UGC 2018. Always link a dilemma to a "
                        "<b>specific instrument</b>.", "small", "margin:0"), None, "tint"),
                 card(p("Expect a current-affairs slant on <b>generative AI</b> and "
                        "<b>DPDP Act enforcement</b>, and be able to explain <b>why IEC "
                        "multidisciplinary composition matters</b> rather than merely listing "
                        "its members.", "small", "margin:0"), None, "tint"),
             ], 8),
         ], "1.15fr 1fr"),
         p("The practical test of this unit: before your next submission, can you name the "
           "<b>committee</b>, the <b>threshold</b> and the <b>declaration</b> that apply to it?",
           "fine", "margin:0"),
     ], 10)},
]

SPEAKER_NOTES = {
    1: "Mark the transition explicitly: Lectures 6 and 7 supplied principles and domains; this session covers the machinery that makes them enforceable — committees that can decline approval, regulations that carry penalties, and cases where both were tested.",
    2: "Draw attention to Objective 6's final clause — arguing a position in regulatory language is a marking criterion rather than decoration. Objectives 1–3 are factual recall; 4–6 carry the ten-mark questions.",
    3: "Teach the tiers by their enforcement mechanism rather than their chronology: that is what explains why the Belmont Report shapes committee criteria while only the UGC Regulations can cancel a registration. Tier 4 is the only layer students personally interact with.",
    4: "Use the Belmont-to-review-form mapping as the central insight; it converts three abstract nouns into the actual sections of a protocol students will one day submit. Address the transferability objection head-on: the object of protection is the participant, not the discipline.",
    5: "Emphasise the positive-duty structure, because students read all ethics as prohibitions and conclude that doing nothing is always safe. Comparing ACM and IEEE on enforceability is a standard long-answer item, and the honest answer is that both depend on community sanction.",
    6: "Make the CDSCO point concrete: students building a diagnostic classifier rarely realise they may be building a regulated medical device. Stress that the DPDP Act applies to their research data handling directly, not only to companies.",
    7: "Teach the composition by the function each member performs — 'why does multidisciplinary composition matter' is a stated examination item and a memorised list cannot answer it. The external chair requirement addresses a structural conflict of exactly the kind Lecture 7 described.",
    8: "Lead with the timeline consequence: the most common practical failure is a student discovering in week ten that a study needed approval never sought. Novel AI/ML systems touching personal data land in full-board review — the trigger students most need to recognise.",
    9: "Make the practical determination explicit, because the question students actually have is 'does my project need this?' — and the answer turns on human participants, identifiable data, or dual-use potential. Confirm the RMS route and cadence against the live policy.",
    10: "Before teaching the penalties, verify them against the gazette text of the Regulations, which set out graded levels with their own consequences and timelines. Emphasise the exclusions clause, which connects to the effective-index skill from Lecture 5.",
    11: "Use the deception problem to show that ethics is not simply prohibition: some valid research questions cannot be studied with full prior disclosure, which is why a committee weighs justification and harm rather than applying a blanket rule.",
    12: "Walk the Aditi example end to end: it is the concrete answer to the question every student has. Draw out the instructive detail — the 14% methodology paraphrase was fixable by citation and quotation, so the offence was attribution, not writing ability.",
    13: "Run as cold-call diagnosis: give the facts, ask which principle and which instrument applies, reveal the lesson afterwards. Draw the connecting thread aloud, and spend the extra minute on the Indian thesis case, which establishes that supervisors are also accountable.",
    14: "Work discussion question 1 aloud: respect for persons was violated by absent consent, beneficence by unassessed psychological risk, and an IEC would likely have required consent, debriefing and harm monitoring. Reward honest argument on question 2.",
    15: "Give the four-move structure and insist on move two, because answers that identify the issue but cite no instrument lose most of the marks. Have students build a one-page reference card of documents, years and key provisions.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 8 Notes — Regulatory Frameworks and Case Studies",
    "desc": ("Student notes for Unit III Lecture 8 of CSEG3060: international and Indian "
             "regulatory frameworks, Institutional Ethics Committees and their review "
             "process, UGC and UPES plagiarism policy, ethical dilemmas in computer science, "
             "and six case studies with enforcement mechanisms."),
    "lecno": "8",
    "lectitle": "Regulatory Frameworks and Case Studies",
    "subline": ("Institutional Ethics Committees, plagiarism policies and ethical dilemmas "
                "&middot; 60 minutes &middot; B.Tech. (CSE) &middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO3", "Four-tier architecture", "IEC / IRB", "UGC 2018",
               "UPES policy", "Case studies"],
    "pager": [("CSEG3060_Unit3_L07_Ethical_Considerations_in_Research_Notes.html",
               "&larr; Lecture 7: Ethical Considerations in Research"),
              ("../index.html", "Course home &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 8 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO3",
        p("Demonstrate ethical conduct in research with adherence to academic integrity "
          "standards.")
        + p("Lecture 7 examined the domains of research ethics. This concluding lecture covers "
            "the <span class=\"kw\">operational and regulatory mechanisms</span> that "
            "translate ethical principles into enforceable practice.")),

    box("caution", "Verify the numbers before you rely on them",
        p("The UGC similarity tiers in Section 6 and the UPES-specific thresholds, tools and "
          "workflow in Sections 5.5 and 6.4 are reproduced from the lecture notes. Because "
          "students are examined on exact percentages, check both against the current gazette "
          "text of the UGC Regulations and the live UPES policy document, and correct them if "
          "the institution has revised them.")),

    sec(1, "Learning Objectives", "s1"),
    ol(["<span class=\"kw\">Identify</span> the principal national and international regulatory "
        "bodies governing research ethics in India.",
        "<span class=\"kw\">Describe</span> the composition, mandate and review procedure of "
        "Institutional Ethics Committees.",
        "<span class=\"kw\">Apply</span> the UGC and UPES plagiarism regulations to concrete "
        "academic situations.",
        "<span class=\"kw\">Analyse</span> real-world case studies to detect ethical violations "
        "and recommend corrective action.",
        "<span class=\"kw\">Evaluate</span> emerging ethical dilemmas in computer science "
        "research, including those arising from artificial intelligence, big data and "
        "generative systems.",
        "<span class=\"kw\">Formulate</span> a defensible position on contested ethical issues "
        "<em>using established regulatory language</em>."]),

    sec(2, "The Four-Tier Regulatory Architecture", "s2"),
    p("In computer science, where algorithms increasingly mediate decisions affecting human "
      "welfare, finance, healthcare and civil liberties, the gap between ethical aspiration "
      "and regulatory enforcement is the practical problem. Four tiers close it, and they are "
      "best distinguished by <em>how each is enforced</em>."),
    tw(table(["Tier", "Instruments", "Enforcement mechanism"], [
        ["**1 &mdash; International codes**",
         "Nuremberg (1947), Declaration of Helsinki (1964, rev. 2013), Belmont Report (1979)",
         "Moral authority; no direct enforcement"],
        ["**2 &mdash; Professional society codes**",
         "ACM Code of Ethics (2018), IEEE Code of Ethics",
         "Enforceable through membership and publication venues"],
        ["**3 &mdash; National law and guidance**",
         "ICMR (2017), UGC (2018), DPDP Act (2023), IT Act (2000, am. 2008), CDSCO, MeitY",
         "Legally binding; penalties attach"],
        ["**4 &mdash; Institutional bodies**",
         "IECs / IRBs / RECs, Research Integrity Offices, Departmental Research Committees",
         "Operational gatekeepers &mdash; approve, refuse, monitor"],
    ])),
    p("The tiers interlock. A UPES-IEC decision applies Belmont principles through ICMR "
      "procedure, so an institutional refusal ultimately rests on a 1979 document. Tier 4 is "
      "the only layer you will personally interact with as a researcher."),
    tw(table(["Concept", "Brief definition"], [
        ["**Institutional Ethics Committee (IEC)**",
         "A multidisciplinary body constituted to review, approve and monitor research "
         "involving human participants or sensitive data"],
        ["**Institutional Review Board (IRB)**",
         "The US equivalent of an IEC; used interchangeably in international literature"],
        ["**Similarity index**",
         "A quantitative measure produced by plagiarism-detection software, expressed as a "
         "percentage of matched text"],
        ["**Research misconduct**",
         "Fabrication, falsification or plagiarism in proposing, performing or reviewing "
         "research, or in reporting results (ORI definition)"],
    ])),

    sec(3, "Tier 1: International Frameworks", "s3"),
    sub("3.1 The Nuremberg Code (1947)", "s3-1"),
    p("Originating from the trials of Nazi physicians, the Nuremberg Code established ten "
      "principles for ethical human-subjects research, the foremost being "
      "<span class=\"kw\">voluntary informed consent</span>. Although written for biomedical "
      "research, the consent principle undergirds modern data-protection regulation, including "
      "its application to user studies in computer science."),

    sub("3.2 The Declaration of Helsinki (1964, rev. 2013)", "s3-2"),
    p("Issued by the World Medical Association, this declaration extends the Nuremberg "
      "principles and distinguishes therapeutic from non-therapeutic research. It is the most "
      "widely adopted international standard for research involving human participants and is "
      "referenced by Indian institutional policies."),

    sub("3.3 The Belmont Report (1979)", "s3-3"),
    p("The US National Commission articulated three principles that now inform most IEC review "
      "criteria: <span class=\"kw\">respect for persons</span>, "
      "<span class=\"kw\">beneficence</span> and <span class=\"kw\">justice</span>."),
    box("exam", "Why Belmont is the examinable one",
        p("IEC review forms are effectively operationalised Belmont: consent procedures test "
          "<em>respect for persons</em>, risk&ndash;benefit analysis tests "
          "<em>beneficence</em>, and recruitment criteria test <em>justice</em>. The three "
          "principles are a near-certain multiple-choice item.")
        + p("All three documents were written for medical research, yet each applies directly "
            "to a CS usability study, a crowdsourced annotation task or an adversarial-testing "
            "protocol involving people. <em>The object of protection is the participant, not "
            "the discipline.</em>")),

    sec(4, "Tier 2: Professional Society Codes", "s4"),
    p("The <span class=\"kw\">ACM Code of Ethics and Professional Conduct (2018)</span> "
      "outlines general ethical responsibilities for computing professionals:"),
    ul(["Contribute to society and human well-being.",
        "Avoid harm.",
        "Be honest and trustworthy.",
        "Be fair and take action not to discriminate.",
        "Respect privacy.",
        "Honour confidentiality."]),
    p("The <span class=\"kw\">IEEE Code of Ethics</span> commits members to treat all persons "
      "fairly and with respect, to refrain from harassment and discrimination, to avoid "
      "injuring others, and explicitly requires responsible disclosure of factors that might "
      "endanger the public."),
    box("caution", "Positive duties, not just prohibitions",
        p("Both codes impose <em>positive duties</em> &mdash; contribute, act against "
          "discrimination, disclose danger &mdash; and not merely prohibitions. Students read "
          "all ethics as a list of prohibitions and consequently believe that doing nothing is "
          "always safe. The ACM code says otherwise.")),
    p("On enforceability: these are professional codes, sanctioned through membership status, "
      "publication-venue policy and reputational consequence rather than by law. A code "
      "violation rarely reaches a court but can end a publication record. The ACM's "
      "&ldquo;avoid harm&rdquo; and anti-discrimination duties are the instruments under which "
      "algorithmic bias and unsafe deployment are argued as <em>ethics violations</em> rather "
      "than merely engineering defects."),

    sec(5, "Tier 3 and 4: Indian Frameworks and Ethics Committees", "s5"),
    sub("5.1 The Indian Regulatory Landscape", "s5-1"),
    ul(["<span class=\"kw\">ICMR &mdash; National Ethical Guidelines for Biomedical and Health "
        "Research Involving Human Participants (2017).</span> India's most comprehensive "
        "ethical standard and the source of IEC composition and procedure rules. ICMR has "
        "additionally issued dedicated ethical guidance on artificial intelligence in "
        "biomedical research and healthcare, addressing algorithmic transparency, dataset "
        "representativeness and bias mitigation &mdash; the provisions most directly relevant "
        "to computing.",
        "<span class=\"kw\">UGC.</span> The (Promotion of Academic Integrity and Prevention of "
        "Plagiarism) Regulations, 2018 define plagiarism levels and penalties for "
        "higher-education institutions; subsequent draft revisions address similarity "
        "thresholds and generative-AI content.",
        "<span class=\"kw\">MeitY.</span> Issues policy on emerging technology, including the "
        "National Strategy for Artificial Intelligence (2018) and the Digital Personal Data "
        "Protection Act, 2023 &mdash; the operative Indian data-protection statute, which "
        "applies to <em>your</em> research data handling, not only to companies.",
        "<span class=\"kw\">CDSCO.</span> Oversees clinical trials and software as a medical "
        "device (SaMD) &mdash; increasingly relevant where CS departments build AI/ML "
        "diagnostic tools. Students building a diagnostic classifier rarely realise they may "
        "be building a regulated medical device.",
        "<span class=\"kw\">Information Technology Act, 2000</span> (and 2008 amendments). The "
        "legal foundation for prosecuting unauthorised data access, digital fraud and "
        "cybercrime &mdash; the statute under which a research data-handling failure becomes a "
        "criminal rather than an academic matter."]),
    box("exam", "Name the right instrument",
        p("Naming the correct Indian instrument in an answer is a marking criterion. Confusing "
          "<span class=\"kw\">UGC</span> (academic integrity) with <span class=\"kw\">DPDP</span> "
          "(data protection) is a common and costly error.")),

    sub("5.2 Purpose and Composition of an IEC", "s5-2"),
    box("def", "Definition &mdash; Institutional Ethics Committee",
        p("An <span class=\"kw\">IEC</span> &mdash; also called an Institutional Review Board "
          "or Research Ethics Board &mdash; is a formally constituted body that reviews "
          "research proposals to ensure conformity with ethical standards <em>before</em> the "
          "research begins.")),
    p("Four purposes: <span class=\"kw\">protection</span> of the rights and welfare of "
      "participants; <span class=\"kw\">assurance</span> that risks are minimised and "
      "reasonable in relation to anticipated outcomes; <span class=\"kw\">verification</span> "
      "that informed-consent procedures are adequate; and <span class=\"kw\">oversight</span> "
      "of ongoing research through continuing review."),
    p("Per ICMR 2017 guidelines, an IEC must be multidisciplinary and gender-balanced, with a "
      "<span class=\"kw\">minimum of five and a maximum of twelve members</span>:"),
    ul(["Chairperson &mdash; <em>external to the institution</em>.",
        "One or two basic medical scientists.",
        "One or two clinicians.",
        "One legal expert or retired judge.",
        "One social scientist or philosopher.",
        "One layperson representing community interests.",
        "Member Secretary, who conducts day-to-day administration."]),
    p("For computer science research, an IEC should additionally include a "
      "<span class=\"kw\">data protection officer</span> or "
      "<span class=\"kw\">information-security expert</span> when proposals involve "
      "large-scale personal-data processing &mdash; without whom the committee cannot "
      "competently assess re-identification risk."),
    box("exam", "Why multidisciplinary composition matters",
        p("This is a stated examination item, and a memorised membership list cannot answer it. "
          "The <em>external chairperson</em> guards against institutional self-interest; the "
          "<em>legal member</em> reads consent documents as enforceable instruments; the "
          "<em>layperson</em> tests whether disclosure is actually comprehensible to a "
          "participant.")),

    sub("5.3 Levels of Review", "s5-3"),
    tw(table(["Review level", "Trigger", "Outcome"], [
        ["**Exempt review**",
         "Minimal risk; secondary use of de-identified data; survey of public officials",
         "Notification of exemption"],
        ["**Expedited review**",
         "Minimal risk but not exempt; minor modifications to approved protocols",
         "Approval by Member Secretary and one member"],
        ["**Full board review**",
         "Greater than minimal risk; vulnerable populations; novel AI/ML systems involving "
         "personal data", "Decision at a convened quorum meeting"],
    ])),
    box("caution", "Exemption is a determination, not an assumption",
        p("Exemption is a determination the committee makes, <em>not</em> one the investigator "
          "may assume. Self-exempting a protocol is itself a procedural violation. Note also "
          "that novel AI/ML systems touching personal data land in full-board review &mdash; "
          "the trigger students most need to recognise in their own project plans.")),

    sub("5.4 The Review Process", "s5-4"),
    ol(["<span class=\"kw\">Submission.</span> The principal investigator submits a protocol "
        "including the research proposal, consent forms, data management plan, recruitment "
        "materials and risk&ndash;benefit analysis.",
        "<span class=\"kw\">Administrative screening.</span> The Member Secretary checks for "
        "completeness.",
        "<span class=\"kw\">Primary reviewer assignment.</span> Two or more members conduct "
        "detailed reviews.",
        "<span class=\"kw\">Board discussion.</span> At a convened quorum meeting, the "
        "investigator may be invited for questions.",
        "<span class=\"kw\">Decision.</span> Approval, modifications required, deferral or "
        "disapproval. &ldquo;Modifications required&rdquo; is the most common outcome and is "
        "<em>not</em> a rejection.",
        "<span class=\"kw\">Notification.</span> A formal letter communicates the decision, "
        "typically within 4&ndash;6 weeks.",
        "<span class=\"kw\">Continuing review.</span> Annual progress reports; any amendment "
        "requires resubmission. A protocol amended mid-study without resubmission is operating "
        "without approval."]),
    p("Four to six weeks plus a possible modification cycle means ethics review must be "
      "initiated <em>at proposal stage</em>, not when data collection is about to begin. The "
      "most common practical failure is a student discovering in week ten that a study needed "
      "approval they never sought."),

    sub("5.5 The UPES-IEC", "s5-5"),
    p("UPES maintains an Institutional Ethics Committee that reviews research proposals "
      "involving:"),
    ul(["Human participants &mdash; surveys, interviews, behavioural experiments, usability "
        "studies.",
        "Personally identifiable information collected from data subjects.",
        "Animal subjects &mdash; less common in CS but required for some HCI work.",
        "Environmental samples of biological origin.",
        "<span class=\"kw\">Dual-use research of concern (DURC)</span>."]),
    p("Submissions are routed through the online <span class=\"kw\">Research Management System "
      "(RMS)</span> portal, and the committee meets quarterly with provision for emergency "
      "review of time-sensitive studies. Plan around the quarterly cycle."),
    box("eg", "Does your CS project need review?",
        p("A usability study, a survey of developers, a crowdsourced annotation task, or an "
          "adversarial-testing protocol with human participants <em>all require review</em>. A "
          "purely computational study on a public, properly licensed, de-identified dataset "
          "generally does not.")
        + p("DURC is listed deliberately: research with legitimate civilian use that is also "
            "weaponisable &mdash; vulnerability-discovery tooling, disinformation-capable "
            "generative models, surveillance automation &mdash; is within the committee's "
            "remit <em>even with no human participants at all</em>.")),

    sec(6, "Plagiarism Policy", "s6"),
    sub("6.1 The UGC Definition", "s6-1"),
    box("def", "UGC Regulations (2018)",
        p("&ldquo;The practice of taking someone else's work or ideas and passing them off as "
          "one's own.&rdquo;")
        + p("The definition encompasses verbatim copying without attribution; close "
            "paraphrasing without acknowledgement; <span class=\"kw\">uncited use of "
            "methodologies, datasets or algorithms</span>; self-plagiarism; and collusion "
            "(coordinated submission of identical work).")),
    p("Note the third clause: it places CS artefacts squarely inside the regulation. A borrowed "
      "pipeline or dataset is regulated content, not just borrowed prose."),

    sub("6.2 Similarity Index Thresholds", "s6-2"),
    tw(table(["Similarity index", "Category", "Penalty (minimum)"], [
        ["Up to 10% (excluding quotes, bibliography, small matches)", "Minor",
         "Warning; no penalty if properly cited"],
        ["10&ndash;40%", "Moderate",
         "Denial of degree for students; withdrawal of paper for faculty"],
        ["Above 40%", "Major", "Expulsion; blacklisting of authors"],
    ])),
    p("Two structural points to retain: the exclusions mean that the <em>effective</em> index "
      "is what the regulation addresses; and thresholds are <span class=\"kw\">floors for "
      "penalty</span>, so an institution may impose stricter limits than the UGC minimum but "
      "not laxer ones."),

    sub("6.3 Proposed Revisions", "s6-3"),
    ul(["Exclusion of generative-AI output from similarity detection.",
        "Mandatory declaration of AI-assisted content generation.",
        "Stricter thresholds for doctoral theses.",
        "Specific treatment of code plagiarism using tools such as MOSS or JPlag."]),

    sub("6.4 The UPES Policy in Operation", "s6-4"),
    ol(["<span class=\"kw\">Software in use.</span> UPES licenses Turnitin for textual "
        "submissions and Ouriginal for cross-checking. Code submissions may be checked using "
        "MOSS at the discretion of the supervising faculty.",
        "<span class=\"kw\">Acceptance thresholds</span> (excluding bibliography and quoted "
        "material): M.Tech and PhD dissertations, similarity index at or below 10%; B.Tech "
        "project reports, at or below 20%; conference and journal publications from UPES, at "
        "or below 15% excluding self-citation.",
        "<span class=\"kw\">Submission workflow.</span> Submit via the LMS integrated with "
        "Turnitin &rarr; receive the similarity report within 24 hours &rarr; supervisor "
        "reviews marked regions &rarr; revise and resubmit if the threshold is exceeded &rarr; "
        "final submission to the Departmental Research Committee.",
        "<span class=\"kw\">Consequences.</span> First offence: written warning and mandatory "
        "resubmission. Second offence: project grade of &ldquo;F&rdquo; and six-month "
        "debarment from re-registration. Third offence, or major plagiarism above 40%: "
        "expulsion, and revocation of degree if discovered post-graduation.",
        "<span class=\"kw\">Generative AI.</span> Use for grammar and code-suggestion purposes "
        "is permitted but requires explicit declaration in the Acknowledgement section. "
        "Submitting AI-generated text as one's own original writing constitutes academic "
        "misconduct."]),
    box("eg", "Worked case &mdash; applying the policy",
        p("Aditi submits her final-year project report for Turnitin screening. The report "
          "yields a <span class=\"kw\">22%</span> similarity index, with 14% attributable to a "
          "methodology section that closely paraphrases a published survey without quotation "
          "marks.")
        + ol(["<em>Review.</em> Her supervisor notes the flagged regions.",
              "<em>Threshold check.</em> For B.Tech reports the threshold is 20%; 22% exceeds "
              "it.",
              "<em>Remedial action.</em> Aditi rewrites the methodology section, citing the "
              "original survey and using quotation marks for technical definitions.",
              "<em>Resubmission.</em> The new report shows <span class=\"kw\">9%</span>.",
              "<em>Clearance.</em> The Departmental Research Committee accepts the revised "
              "report."])
        + p("Had she not revised, the project would have received an &ldquo;F&rdquo; grade, and "
            "her supervisor would have been required to report the incident to the "
            "Departmental Disciplinary Committee. The instructive detail: the 14% was fixable "
            "by citation and quotation, so the offence was one of <em>attribution</em> rather "
            "than of writing ability.")),

    sec(7, "Ethical Dilemmas in Computer Science", "s7"),
    ul(["<span class=\"kw\">Informed consent in online studies.</span> Participants may not "
        "read consent forms; deception is sometimes methodologically necessary (studying "
        "susceptibility to phishing); and withdrawal of data after collection is technically "
        "difficult once results are anonymised and aggregated.",
        "<span class=\"kw\">Data privacy and anonymisation.</span> Datasets from social media, "
        "mobile phones and IoT devices often remain re-identifiable. Simple anonymisation is "
        "rarely sufficient; differential privacy, <em>k</em>-anonymity and federated learning "
        "have emerged as responses.",
        "<span class=\"kw\">Algorithmic bias and fairness.</span> Algorithms trained on biased "
        "data perpetuate and amplify social inequities &mdash; hiring algorithms that "
        "discriminate against women (the Amazon recruiting tool case, 2018), facial "
        "recognition with higher error rates for women and people of colour, predictive "
        "policing that disproportionately targets minority neighbourhoods. <em>ACM: "
        "non-discrimination.</em>",
        "<span class=\"kw\">Dual-use research of concern.</span> Research with legitimate "
        "civilian applications that is also weaponisable: large language models that generate "
        "disinformation, vulnerability-discovery tools that facilitate cyberattacks, AI systems "
        "that automate surveillance. <em>IEEE: public-endangerment disclosure.</em>",
        "<span class=\"kw\">Authorship and credit disputes.</span> Omitted contributors, "
        "honorary authorship, and competing claims of priority for the same idea.",
        "<span class=\"kw\">Whistleblowing and disclosure.</span> Loyalty to peers against "
        "responsibility to the public. Many institutions, including UPES, have whistleblower "
        "protection policies aligned with the Public Interest Disclosure and Protection of "
        "Informers Act, 2010.",
        "<span class=\"kw\">Reproducibility and data fabrication.</span> Publication pressure "
        "drives selective reporting, p-hacking and, at the extreme, outright fabrication."]),
    box("caution", "Ethics is not simply prohibition",
        p("Some valid research questions cannot be studied with full prior disclosure &mdash; "
          "which is precisely why a committee exists: to weigh justification, debriefing and "
          "harm rather than to apply a blanket rule.")),

    sec(8, "Case Studies", "s8"),
    sub("8.1 The Facebook Emotional Contagion Study (2014)", "s8-1"),
    p("Researchers at Cornell University, in collaboration with Facebook, manipulated the news "
      "feeds of approximately 689,000 users to study emotional contagion. Users were not asked "
      "for consent, on the basis that the study was conducted under the platform's terms of "
      "service."),
    p("<em>Ethical issues:</em> lack of informed consent; potential psychological harm; "
      "insufficient IRB oversight. <em>Outcome:</em> public outcry and regulatory scrutiny; "
      "the US Department of Health and Human Services clarified that certain social-media "
      "research does qualify as human-subjects research requiring IRB review; the lead "
      "researcher issued a public apology."),
    p("<span class=\"kw\">Lesson:</span> even when research uses existing data, manipulation of "
      "the user environment triggers ethical obligations. CS researchers must engage an ethics "
      "committee for any study that alters user experience."),

    sub("8.2 The Cambridge Analytica Scandal (2018)", "s8-2"),
    p("Personal data of approximately 87 million Facebook users was harvested through a "
      "personality-prediction app and used for political micro-targeting without consent."),
    p("<em>Ethical issues:</em> violation of informed consent; misuse of data beyond stated "
      "purposes; mass-scale privacy violation. <em>Outcome:</em> investigations in the US, UK "
      "and EU; congressional hearings; a $5 billion FTC penalty; and impetus for GDPR "
      "enforcement and for India's DPDP Act, 2023."),
    p("<span class=\"kw\">Lesson:</span> researchers must verify the chain of consent for any "
      "secondary data, particularly when data crosses jurisdictional lines."),

    sub("8.3 Theranos (2003&ndash;2018)", "s8-3"),
    p("Theranos claimed to have developed blood-testing technology requiring only a finger-prick "
      "sample. Internal whistleblowers alleged that the technology was non-functional and that "
      "results were being run on conventional machines or fabricated. Outcome: criminal "
      "prosecution of the founders, SEC and FDA investigations, dissolution of the company."),
    p("<span class=\"kw\">Lesson:</span> data fabrication in computer science research &mdash; "
      "for instance, reporting model accuracy not supported by experiments &mdash; is research "
      "misconduct of the same category, with severe consequences."),

    sub("8.4 Henrietta Lacks and the HeLa Cells", "s8-4"),
    p("In 1951, Henrietta Lacks's cancer cells were taken without her knowledge or consent and "
      "became the basis for decades of biomedical breakthroughs. The HeLa genome was published "
      "in 2013 without consulting the Lacks family. The NIH subsequently established a HeLa "
      "Genome Data Access Working Group including family members to govern future access."),
    p("<span class=\"kw\">Lesson:</span> data derived from identifiable sources retain ethical "
      "obligations even decades later. The case inspired data-access frameworks in "
      "computational biology."),

    sub("8.5 Microsoft &ldquo;Tay&rdquo; (2016)", "s8-5"),
    p("Microsoft released a Twitter chatbot that learned from interactions with users. Within "
      "roughly sixteen hours, coordinated adversarial input caused it to produce racist, "
      "misogynistic and otherwise offensive output, and it was shut down."),
    p("<em>Ethical issues:</em> failure to anticipate adversarial manipulation; inadequate "
      "pre-deployment testing; lack of safety guardrails. <span class=\"kw\">Lesson:</span> "
      "researchers deploying interactive AI must implement safeguards, conduct red-teaming, "
      "and engage ethics review where human participants are involved in adversarial testing. "
      "ACM's &ldquo;avoid harm&rdquo; applies at deployment, not only at design."),

    sub("8.6 A Domestic Plagiarism Case (2016)", "s8-6"),
    p("A doctoral scholar at an Indian IIT was found to have plagiarised approximately 60 per "
      "cent of a thesis. The plagiarism was detected through Turnitin and confirmed by manual "
      "review. Under the UGC Regulations, the scholar's registration was cancelled, and the "
      "supervising committee faced scrutiny for inadequate oversight."),
    p("<span class=\"kw\">Lesson:</span> supervisors bear responsibility for ensuring the "
      "originality of student work, and institutions must conduct periodic checks throughout "
      "the research lifecycle, not only at submission."),
    box("caution", "The connecting thread",
        p("In five of these six cases the harm was foreseeable, and the missing element was an "
          "<span class=\"kw\">independent review that nobody sought</span>.")),

    sec(9, "Summary", "s9"),
    ul(["Research ethics is enforced through a <span class=\"kw\">multi-tiered regulatory "
        "architecture</span> spanning international codes (Nuremberg, Helsinki, Belmont), "
        "professional society codes (ACM, IEEE), national frameworks (ICMR, UGC, DPDP Act) and "
        "institutional bodies (IECs, IRBs).",
        "<span class=\"kw\">Institutional Ethics Committees</span> are the operational pivot; "
        "their composition, procedures and authority are governed by ICMR and equivalent "
        "standards, and UPES operates the UPES-IEC with specific provisions for CS research.",
        "<span class=\"kw\">Plagiarism policies</span> at UPES and under UGC use similarity "
        "thresholds and tiered consequences, with generative AI the live area of revision.",
        "<span class=\"kw\">Ethical dilemmas in computer science</span> include online consent, "
        "algorithmic bias, dual-use concerns, authorship disputes and reproducibility.",
        "<span class=\"kw\">Case studies</span> illustrate the real-world consequences of "
        "violations and underscore the necessity of institutional review."]),
    p("Across eight lectures this unit moved from <em>why literature matters</em>, through "
      "<em>how to analyse it</em>, to <em>the obligations that make the resulting knowledge "
      "trustworthy</em>. This lecture supplies the machinery by which those obligations are "
      "enforced."),

    sec(10, "Exam Preparation", "s10"),
    box("exam", "Seven preparation points",
        ol(["<span class=\"kw\">Memorise the specific thresholds.</span> UGC and UPES "
            "thresholds are frequently asked; know the exact percentages and corresponding "
            "penalty levels.",
            "<span class=\"kw\">Differentiate review levels.</span> Understand when full-board, "
            "expedited and exempt review apply.",
            "<span class=\"kw\">Be familiar with named documents:</span> Nuremberg Code, "
            "Declaration of Helsinki, Belmont Report, ICMR 2017, UGC 2018, DPDP Act 2023.",
            "<span class=\"kw\">Practise case analysis.</span> Examiners present a hypothetical "
            "and ask you to identify the issue and recommend a remedy.",
            "<span class=\"kw\">Know the composition of an IEC</span> and be ready to explain "
            "<em>why</em> multidisciplinary composition matters.",
            "<span class=\"kw\">Link each dilemma to a specific code.</span> The Tay case "
            "implicates ACM's &ldquo;avoid harm&rdquo;; Cambridge Analytica implicates "
            "DPDP/GDPR; the thesis case implicates UGC 2018.",
            "<span class=\"kw\">Stay current.</span> Generative AI and DPDP Act enforcement are "
            "likely current-affairs items."])),
    box("exam", "Four-move case analysis",
        ol(["Identify the ethical issue.",
            "<span class=\"kw\">Name the governing code or regulation.</span>",
            "State what review or disclosure was owed.",
            "Recommend the remedy."])
        + p("Answers that identify the issue correctly but cite no instrument lose most of the "
            "available marks.")),

    sub("10.1 Short-Answer Questions", "s10-1"),
    qlist(["Define &ldquo;Institutional Ethics Committee&rdquo; and list three of its mandatory "
           "members as per ICMR 2017 guidelines. " + marks("3 marks"),
           "State the UGC similarity-index threshold for &ldquo;minor&rdquo; plagiarism and the "
           "corresponding minimum penalty. " + marks("2 marks"),
           "Differentiate between the Nuremberg Code and the Declaration of Helsinki. "
           + marks("3 marks"),
           "What is dual-use research of concern? Provide one example relevant to computer "
           "science. " + marks("2 marks")]),

    sub("10.2 Long-Answer Questions", "s10-2"),
    qlist(["Describe the composition, mandate and review procedure of an Institutional Ethics "
           "Committee. How does this apply at UPES for computer science research? "
           + marks("10 marks"),
           "Discuss the UGC Plagiarism Regulations (2018) and the proposed revisions. How does "
           "UPES operationalise these in its academic workflow? " + marks("10 marks"),
           "Analyse the Facebook Emotional Contagion Study (2014) using the Belmont Report "
           "framework. What principles were violated, and how could an IEC review have altered "
           "the study design? " + marks("10 marks"),
           "Compare and contrast the ACM Code of Ethics (2018) with the IEEE Code of Ethics. To "
           "what extent are they enforceable in practice? " + marks("10 marks"),
           "Examine the Cambridge Analytica case in the context of the Digital Personal Data "
           "Protection Act, 2023. What liabilities would researchers face if a similar incident "
           "occurred today at an Indian institution? " + marks("10 marks")]),

    sub("10.3 Multiple-Choice Practice", "s10-3"),
    box("eg", "Select the correct option",
        ol(["The Belmont Report articulates which three principles? "
            "(a) Honesty, Justice, Beneficence &middot; (b) Respect for Persons, Beneficence, "
            "Justice &middot; (c) Confidentiality, Autonomy, Non-maleficence &middot; "
            "(d) Integrity, Transparency, Accountability",
            "According to UGC 2018, a similarity index above what percentage is classified as "
            "&ldquo;major&rdquo; plagiarism? (a) 20% &middot; (b) 30% &middot; (c) 40% &middot; "
            "(d) 60%",
            "Which of the following is NOT typically a member of an IEC? (a) Legal expert "
            "&middot; (b) Layperson from the community &middot; (c) Marketing executive of the "
            "sponsor &middot; (d) Clinician or medical scientist",
            "The HeLa cells case primarily deals with which ethical issue? (a) Data fabrication "
            "&middot; (b) Informed consent and data ownership &middot; (c) Dual-use research "
            "&middot; (d) Algorithmic bias"])),

    sec(11, "References", "s11"),
    ol(["Indian Council of Medical Research (2017). <em>National Ethical Guidelines for "
        "Biomedical and Health Research Involving Human Participants</em>. New Delhi: ICMR.",
        "University Grants Commission (2018). <em>UGC (Promotion of Academic Integrity and "
        "Prevention of Plagiarism) Regulations, 2018</em>. New Delhi: UGC.",
        "World Medical Association (2013). <em>Declaration of Helsinki</em>.",
        "National Commission for the Protection of Human Subjects (1979). <em>The Belmont "
        "Report</em>.",
        "Association for Computing Machinery (2018). <em>ACM Code of Ethics and Professional "
        "Conduct</em>.",
        "Government of India (2023). <em>The Digital Personal Data Protection Act, 2023</em>.",
        "UPES (2024). <em>Research Ethics and Academic Integrity Policy</em>. Dehradun: UPES.",
        "Kramer, A. D. I., Guillory, J. E., &amp; Hancock, J. T. (2014). Experimental evidence "
        "of massive-scale emotional contagion through social networks. <em>PNAS</em>, 111(24), "
        "8788&ndash;8790.",
        "Cadwalladr, C., &amp; Graham-Harrison, E. (2018, March 17). Revealed: 50 million "
        "Facebook profiles harvested for Cambridge Analytica in major data breach. <em>The "
        "Guardian</em>."]),
])
