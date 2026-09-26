# -*- coding: utf-8 -*-
"""Unit III - Lecture 7: Ethical Considerations in Research."""
from kit import (box, card, flow, goals, grid, marks, ol, p, qlist, rule, sec,
                 stack, sub, table, tw, ul)

STEM = "CSEG3060_Unit3_L07_Ethical_Considerations_in_Research"
RUNNER = "CSEG3060 · Unit III · Lecture 7 — Ethical Considerations in Research"

DECK_META = {
    "title": "CSEG3060 · Unit III · Lecture 7 — Ethical Considerations in Research",
    "desc": ("Unit III Lecture 7 for Research Methodology in Computer Science "
             "(CSEG3060): informed consent, confidentiality and data protection, data "
             "fabrication and falsification, authorship norms under ICMJE and CRediT, and "
             "conflict of interest."),
    "runner": RUNNER,
}

SLIDES = [
    {"title": "Title", "dark": True, "nofoot": True,
     "kicker": "CSEG3060 · Research Methodology in Computer Science",
     "h1": "Ethical Considerations in Research",
     "body": stack([
         p("Informed consent · confidentiality · fabrication and falsification · authorship "
           "norms · conflict of interest", "lead", "max-width:860px;color:var(--mint)"),
         card(p("Research rests on trust. Every rule in this lecture exists because trust "
                "can be broken at a specific point.", None,
                "margin:0;font-size:20px;font-family:var(--display);color:var(--peach)"),
              None, "dark", "border-color:#2b5360"),
         p("Unit III · Lecture 7 of 8 · 60 minutes · CO3", "fine",
           "color:#C9D6D4;margin-top:auto"),
         p("Dr. Mohsin Furkh Dar · School of Computer Science, UPES", "fine",
           "color:#C9D6D4;margin:0"),
         p("→ / Space next · ← back · <b>O</b> overview · <b>N</b> speaker notes · <b>F</b> full screen",
           "fine", "color:#7d9498;margin:6px 0 0"),
     ], 10)},

    {"title": "Learning objectives", "kicker": "Learning objectives · CO3",
     "h": "By the end of this session, you can…",
     "body": card(goals([
         "**Define and apply** informed consent in human-subjects research",
         "**Explain** the mechanisms that preserve confidentiality and protect data",
         "**Distinguish** fabrication, falsification and legitimate data transformation",
         "**Identify** criteria for legitimate authorship and the cost of honorary or ghost authorship",
         "**Recognise, disclose and manage** conflicts of interest",
         "**Connect** each principle to concrete computer science scenarios",
     ]), None, "fill")},

    {"title": "Five pillars", "kicker": "Orientation",
     "h": "Five domains — and who each one protects",
     "body": stack([
         table(["Domain", "Core principle", "Primary risk if violated", "Who is protected"], [
             ["**Informed consent**", "Voluntary, informed, capacitated agreement",
              "Coercion, exploitation", "Participants"],
             ["**Confidentiality**", "Privacy protection and controlled disclosure",
              "Privacy breach, identity exposure", "Data subjects"],
             ["**Fabrication / falsification**", "Honest data collection and reporting",
              "Loss of scientific validity", "Readers and the record"],
             ["**Authorship norms**", "Credit for substantial intellectual contribution",
              "Misattribution of credit", "Collaborators"],
             ["**Conflict of interest**", "Transparent disclosure of competing interests",
              "Compromised objectivity", "The public and peer review"],
         ]),
         grid([
             card(p("CS research now involves <b>human participants</b> (HCI, user studies, "
                    "AI fairness), <b>large-scale personal datasets</b>, and "
                    "<b>multi-institution collaborations</b> — each activating a different "
                    "ethical regime.", "small", "margin:0"), "Why this binds computing", "rust"),
             card(p("Belmont principles · Declaration of Helsinki · <b>ICMR National Ethical "
                    "Guidelines (2017)</b> · <b>DPDPA 2023</b> and <b>GDPR</b> · "
                    "<b>ICMJE</b> and <b>COPE</b> · <b>ORI</b> misconduct definitions",
                    "small", "margin:0"), "Regulatory anchors", "tint"),
         ]),
     ], 11)},

    {"title": "Informed consent I", "kicker": "Pillar 1 · part 1",
     "h": "Five components of valid consent",
     "body": stack([
         rule("Consent is a <b>process, not a signature</b>: voluntary agreement after being "
              "fully informed of purpose, procedures, risks, benefits, alternatives and data "
              "handling. Rooted in Belmont's <b>respect for persons</b>; reaffirmed in "
              "<b>Article 6 of the Declaration of Helsinki</b>."),
         flow(["Disclosure", "Understanding", "Voluntariness", "Capacity", "Documentation"]),
         grid([
             card(p("Purpose, duration, procedures, foreseeable risks, expected benefits, "
                    "compensation.", "fine", "margin:0"), "Disclosure", "tint"),
             card(p("Language the participant comprehends — <b>free of jargon and undue "
                    "influence</b>.", "fine", "margin:0"), "Understanding", "tint"),
             card(p("Free from coercion or penalty for refusal — a live concern when you "
                    "recruit classmates or juniors.", "fine", "margin:0"),
                  "Voluntariness", "rust"),
             card(p("Legal and cognitive capacity; <b>surrogate or parental consent</b> for "
                    "minors and incapacitated individuals.", "fine", "margin:0"),
                  "Capacity", "tint"),
             card(p("Normally a signed form; <b>click-through or recorded verbal</b> consent "
                    "is acceptable in some digital contexts.", "fine", "margin:0"),
                  "Documentation", "tint"),
         ], "1fr 1fr 1fr 1fr 1fr", gap="8px"),
         card(p("A consent form written at postgraduate reading level fails the "
                "<b>understanding</b> criterion no matter how complete its disclosure.",
                "small", "margin:0"), None, "rust"),
     ], 11)},

    {"title": "Informed consent II", "kicker": "Pillar 1 · part 2",
     "h": "The hard cases in computing",
     "body": stack([
         grid([
             card(p("Consent must be obtained <b>before task exposure</b>. IP addresses and "
                    "metadata may themselves constitute <b>identifiable information</b> even "
                    "when no name is collected.", "small", "margin:0"),
                  "Crowdsourcing — MTurk, Prolific", "tint"),
             card(p("Reuse beyond the original consent's scope <b>may violate the "
                    "agreement</b> under which data were collected — however public the "
                    "dataset now appears.", "small", "margin:0"),
                  "Secondary use of existing datasets", "tint"),
             card(p("Many firms experiment on users without explicit consent, raising "
                    "unresolved concerns about <b>autonomy and transparency</b>. A practice "
                    "being routine does not settle whether it is ethical.", "small", "margin:0"),
                  "Industry A/B testing", "tint"),
         ], "1fr 1fr 1fr"),
         card(stack([
             p("A usability study of a new authentication mechanism, 100 participants. Each "
               "must be told:", "small", "margin:0"),
             ul(["that they may **withdraw at any time**",
                 "that their **keystroke dynamics** will be collected",
                 "**how the data will be stored and destroyed**",
                 "**whom to contact** with grievances"], None, "margin:0;font-size:14px"),
         ], 6), "Worked example", "teal"),
         rule("Failure to disclose the keystroke logging is a violation <b>even if the "
              "protocol received institutional approval</b>. Committee approval does not "
              "substitute for participant disclosure."),
     ], 11)},

    {"title": "Confidentiality I", "kicker": "Pillar 2 · part 1",
     "h": "The obligation, the distinction, the regulators",
     "body": stack([
         rule("The obligation to protect participants' private information and prevent "
              "<b>unauthorised access, use or disclosure</b>."),
         grid([
             card(p("Identifiers present. Directly attributable to a person.", "fine", "margin:0"),
                  "Identified", "rust"),
             card(p("Identifiers replaced by keys held separately — <b>still "
                    "re-identifiable</b>, so not anonymisation under GDPR.", "fine", "margin:0"),
                  "Pseudonymised", "tint"),
             card(p("Link destroyed. <b>Cannot</b> be traced back to an individual.",
                    "fine", "margin:0"), "Anonymised", "teal"),
         ], "1fr 1fr 1fr"),
         grid([
             card(ol(["**Minimisation** — collect only what the question requires",
                      "**Anonymisation or pseudonymisation** — remove or replace identifiers",
                      "**Secure storage** — encryption, access controls, audit logs",
                      "**Controlled access** — authorised personnel under binding agreements"],
                     None, "margin:0;font-size:13px"), "Four operational practices", "teal"),
             stack([
                 card(p("<b>India — DPDPA 2023</b> · <b>EU — GDPR</b> · <b>US — HIPAA</b> "
                        "for medical data", "small", "margin:0"), "Regulatory frameworks", "tint"),
                 card(p("<b>Minimisation is the strongest safeguard:</b> data never collected "
                        "cannot be breached, subpoenaed, re-identified or leaked.",
                        "small", "margin:0"), None, "rust"),
             ], 9),
         ], "1.1fr 1fr"),
     ], 10)},

    {"title": "Confidentiality II", "kicker": "Pillar 2 · part 2",
     "h": "Technical mechanisms — and their costs",
     "body": stack([
         grid([
             card(p("<b>TLS 1.3</b> in transit, <b>AES-256</b> at rest. The baseline "
                    "expectation, not an advanced measure.<br><br><i>Cost: negligible.</i>",
                    "small", "margin:0"), "Encryption", "teal"),
             card(p("Calibrated noise so the presence or absence of any individual cannot be "
                    "inferred — <b>bounding re-identification risk mathematically</b> rather "
                    "than by assertion.<br><br><i>Cost: accuracy, against the privacy "
                    "budget.</i>", "small", "margin:0"), "Differential privacy", "teal"),
             card(p("Training across devices or institutions <b>without transferring raw "
                    "data</b> — the architecture used where data cannot lawfully be pooled."
                    "<br><br><i>Cost: efficiency; leakage via model updates.</i>",
                    "small", "margin:0"), "Federated learning", "teal"),
             card(p("Joint computation over inputs that <b>no party reveals</b> to the "
                    "others.<br><br><i>Cost: computationally expensive.</i>",
                    "small", "margin:0"), "Secure multi-party computation", "teal"),
         ], "1fr 1fr 1fr 1fr", gap="10px"),
         card(p("Most relevant in <b>health informatics, social-network analysis and "
                "behavioural analytics</b> — the subfields where confidentiality obligations "
                "are strictest and research questions most demanding.", "small", "margin:0"),
              None, "tint"),
         rule("<b>None is a complete solution.</b> Technical safeguards reduce risk; they do "
              "not replace consent."),
     ], 12)},

    {"title": "Locating the boundary", "kicker": "Pillar 3 · part 1",
     "h": "Fabrication, falsification — and legitimate transformation",
     "body": stack([
         grid([
             card(p("Making up data, results or records and reporting them as real.",
                    "fine", "margin:0"), "Fabrication", "rust"),
             card(p("Manipulating materials, equipment or processes, or <b>changing, omitting "
                    "or selectively reporting</b> data so the research is not accurately "
                    "represented.", "fine", "margin:0"), "Falsification", "rust"),
             card(p("Appropriating another's ideas, processes, results or words without "
                    "credit — Lectures 4 and 5.", "fine", "margin:0"), "Plagiarism", "tint"),
         ], "1fr 1.3fr 1fr"),
         table(["Practice", "Ethical status"], [
             ["Removing outliers with **documented statistical justification**", "Generally acceptable"],
             ["Applying anonymisation or aggregation", "Acceptable, often required"],
             ["Cherry-picking supportive results while omitting null findings", "**Unethical — selective reporting**"],
             ["Generating synthetic data to fill missing records **without disclosure**", "**Unethical — fabrication**"],
             ["Re-running an experiment until the result is significant", "**Unethical — manipulation**"],
             ["Image manipulation that alters figure content", "**Unethical — falsification**"],
         ]),
         rule("Two discriminating variables: <b>disclosure</b> and <b>documentation</b>. "
              "Synthetic data disclosed as synthetic is a method; the same data presented as "
              "observed is fabrication. Note that the ORI definition includes "
              "<b><i>omitting</i></b>."),
     ], 10)},

    {"title": "FFP in computing", "kicker": "Pillar 3 · part 2",
     "h": "Where falsification enters a CS experiment",
     "body": stack([
         flow(["Dataset selection", "Hyperparameter tuning", "Metric selection", "Run reporting"]),
         grid([
             card(p("Cherry-picking benchmarks, omitting unfavourable datasets and "
                    "<b>tuning hyperparameters on the test set</b> are all falsification — "
                    "notwithstanding that each step looks like ordinary engineering iteration.",
                    "small", "margin:0"), "Benchmark falsification", "rust"),
             card(p("Once the test set has informed a design decision, the reported number is "
                    "a <b>training-set estimate presented as a generalisation estimate</b> — "
                    "a misrepresentation of what the experiment measured.", "small", "margin:0"),
                  "Test-set contamination", "rust"),
         ]),
         grid([
             card(p("Figures in computational biology and imaging can be altered in "
                    "general-purpose editors — which is why journals now require "
                    "<b>raw image data</b> alongside submitted figures.", "small", "margin:0"),
                  "Image manipulation", "tint"),
             card(p("Many published ML results cannot be replicated, substantially because of "
                    "<b>undisclosed preprocessing and selective reporting</b> rather than "
                    "outright invention.", "small", "margin:0"),
                  "The reproducibility crisis", "tint"),
             card(p("<b>Jan Hendrik Schön (2002)</b> — fabricated data across semiconductor "
                    "studies at Bell Labs.<br><b>Hwang Woo-suk (2004–05)</b> — fabricated "
                    "stem-cell data; retraction and criminal conviction.<br>Contemporary cases "
                    "are catalogued by <b>Retraction Watch</b>.", "small", "margin:0"),
                  "Documented cases", "tint"),
         ], "1fr 1fr 1.2fr", gap="10px"),
     ], 10)},

    {"title": "Authorship norms", "kicker": "Pillar 4 · part 1",
     "h": "ICMJE's four criteria — all four, not any one",
     "body": stack([
         grid([
             card(ol(["Substantial contribution to conception, design, data acquisition, analysis or interpretation",
                      "Drafting or critical revision for important intellectual content",
                      "Final approval of the version to be published",
                      "**Accountability for all aspects of the work**"],
                     None, "margin:0;font-size:14px"),
                  "The four ICMJE criteria — conjunctive", "teal"),
             card(p("Contributors meeting fewer than four should be <b>acknowledged, not "
                    "listed</b>.<br><br><b>Criterion 4 is the one students overlook:</b> "
                    "accepting authorship means accepting answerability for the whole paper, "
                    "including parts you did not produce — which is why a gift author is "
                    "<i>exposed</i>, not merely flattered.", "small", "margin:0"),
                  None, "rust"),
         ], "1.15fr 1fr"),
         table(["Misconduct", "Description"], [
             ["**Gift authorship**", "Listing senior colleagues without their meaningful contribution"],
             ["**Guest authorship**", "Adding a well-known researcher to enhance credibility"],
             ["**Ghost authorship**", "Omitting a contributor who made substantive contributions"],
             ["**Coercive authorship**", "Senior authors pressuring juniors to include unrelated contributors"],
             ["**Mutual-benefit authorship**", "Reciprocal name-swapping across papers without genuine contribution"],
         ]),
         p("<b>COPE</b> and <b>ICMJE</b> are the standards journals apply when an authorship "
           "dispute is escalated.", "fine", "margin:0"),
     ], 10)},

    {"title": "Authorship in CS", "kicker": "Pillar 4 · part 2",
     "h": "CRediT, mega-author papers and the advisor–student asymmetry",
     "body": stack([
         rule("ICMJE criteria were designed around individually authored manuscripts. CS "
              "produces <b>collaboratively built software, datasets and infrastructure</b> "
              "whose contributors do not map cleanly onto drafting and revision."),
         card(p("<b>CRediT — 14 roles:</b> conceptualisation · methodology · "
                "<b>software</b> · validation · formal analysis · investigation · "
                "<b>data curation</b> · writing – original draft · writing – review and "
                "editing · visualisation · supervision · project administration · funding "
                "acquisition · resources", "small", "margin:0"), None, "teal"),
         grid([
             card(p("Submissions at venues such as NeurIPS may carry <b>30 or more "
                    "authors</b>, at which point a byline conveys almost no information and "
                    "<b>per-role contribution statements</b> become the only meaningful "
                    "transparency.", "small", "margin:0"), "Mega-author papers", "tint"),
             card(p("A student who is the primary contributor <b>should be listed as first "
                    "author</b>. The power asymmetry means the student rarely raises it — so "
                    "the remedy is a <b>documented authorship agreement before work "
                    "begins</b>, not a negotiation after submission.", "small", "margin:0"),
                  "Advisor–student dynamics", "rust"),
         ]),
         p("<b>Software</b>, <b>data curation</b> and <b>validation</b> are the roles this "
           "cohort most often fills uncredited. Naming them explicitly is how the contribution "
           "becomes visible.", "fine", "margin:0"),
     ], 11)},

    {"title": "Conflict of interest", "kicker": "Pillar 5 · practical application",
     "h": "Types, disclosure duty and the management ladder",
     "body": stack([
         rule("A COI exists when personal, financial, professional or institutional interests "
              "could compromise — <b>or appear to compromise</b> — the objectivity, integrity "
              "or independence of the research. <b>Appearance is sufficient.</b>"),
         grid([
             card(p("Stock, consulting fees, royalties, honoraria from parties who benefit "
                    "from the outcome.<br><i>Evaluating a self-driving system funded by its "
                    "manufacturer.</i>", "fine", "margin:0"), "Financial", "tint"),
             card(p("Close relationships with individuals or organisations.<br><i>Benchmarking "
                    "against a competing library you maintain.</i>", "fine", "margin:0"),
                  "Personal", "tint"),
             card(p("Pressure from a funder whose product is under evaluation.",
                    "fine", "margin:0"), "Institutional", "tint"),
             card(p("Strongly held theoretical commitments that bias interpretation.",
                    "fine", "margin:0"), "Intellectual", "tint"),
             card(p("Acutely relevant in AI ethics, algorithmic fairness and policy research.",
                    "fine", "margin:0"), "Political / ideological", "tint"),
         ], "1fr 1fr 1fr 1fr 1fr", gap="8px"),
         grid([
             card(p("IEEE, ACM, NeurIPS and ICML all require declaration of <b>funding "
                    "sources, employment, equity interests, advisory memberships</b> and any "
                    "other relevant relationship within roughly the past three years.",
                    "small", "margin:0"), "Disclosure requirements", "teal"),
             card(p("<b>Disclose</b> &rarr; <b>blind</b> &rarr; <b>independent oversight</b> "
                    "&rarr; <b>recompose the team</b> &rarr; <b>recuse</b>. Disclosure is the "
                    "floor.", "small", "margin:0"), "Management ladder", "teal"),
         ]),
         rule("<b>Failure to disclose is itself a violation</b>, regardless of whether the "
              "research was actually biased."),
     ], 9)},

    {"title": "Cases and enforcement", "kicker": "Case studies",
     "h": "Four scenarios, and who catches them",
     "body": stack([
         grid([
             table(["Scenario", "Domain", "Lesson"], [
                 ["A fairness paper reports a 2% parity gap computed on a **favourable dataset subset**; retracted",
                  "**Falsification**", "Selective reporting and benchmark manipulation are falsification"],
                 ["A platform runs a large-scale A/B test **manipulating emotional valence** of feeds; published without consent",
                  "**Informed consent**", "Scale does not suspend the consent obligation"],
                 ["A company's medical writer drafts a manuscript; only academic authors listed; writer later untraceable",
                  "**Authorship** (ghost)", "Ghost authorship destroys accountability; breaches ICMJE"],
                 ["A researcher praises an AI hiring tool; **stock options** in the vendor emerge later",
                  "**Conflict of interest**", "Non-disclosure undermines the credibility of the finding"],
             ]),
             stack([
                 card(ul(["**IRB / Ethics Committees** — human-subjects protocols",
                          "**IECs under ICMR** guidelines in India",
                          "**Research Integrity Offices** — misconduct allegations",
                          "**Funding agencies** — DST, SERB, UGC: ethics training and certification"],
                         None, "margin:0;font-size:13px"), "Who catches these", "teal"),
                 card(p("Retraction · funding blacklist · termination · degree revocation · "
                        "civil or criminal liability where data-protection law is breached. "
                        "Confirmed cases are documented publicly by <b>Retraction Watch</b>.",
                        "small", "margin:0"), "Consequences", "rust"),
             ], 9),
         ], "1.45fr 1fr"),
         p("Scenarios are illustrative composites for teaching. The interdependence point: "
           "case 2 implicates consent <i>and</i> confidentiality; case 1 implicates "
           "falsification <i>and</i> authorship accountability.", "fine", "margin:0"),
     ], 9)},

    {"title": "Summary and scenarios", "kicker": "Consolidation",
     "h": "Five takeaways, and four scenarios to decide",
     "body": stack([
         grid([
             card(ul(["**Consent** — voluntary, informed, capacitated, documented; approval ≠ disclosure",
                      "**Confidentiality** — technical *and* procedural; distinguish anonymity from pseudonymity",
                      "**Fabrication/falsification** — honest reporting is non-negotiable; **omission counts**",
                      "**Authorship** — credit tracks substantial contribution; use CRediT",
                      "**COI** — disclose all relevant interests; manage or recuse"],
                     None, "margin:0;font-size:13px"), "Five takeaways", "teal"),
             stack([
                 card(p("A PhD student wants to scrape user reviews from a public website for "
                        "sentiment analysis. Identify the ethical concerns and propose "
                        "safeguards.", "small", "margin:0"), "Scenario 1", "tint"),
                 card(p("Three students collaborate; one writes the paper, the other two did "
                        "coding and analysis, all three are listed. Evaluate against ICMJE.",
                        "small", "margin:0"), "Scenario 2", "tint"),
                 card(p("You are reviewing a paper and notice the lead author co-founded the "
                        "startup whose product is evaluated. What do you do?",
                        "small", "margin:0"), "Scenario 3", "tint"),
                 card(p("A dataset contains personal data and its terms prohibit "
                        "re-identification. Discuss the ethical and legal implications.",
                        "small", "margin:0"), "Scenario 4", "tint"),
             ], 8),
         ], "1fr 1.15fr"),
         rule("Failure in one domain <b>cascades into others</b>: falsification typically also "
              "misleads co-authors, converting a data offence into an authorship and trust "
              "offence."),
     ], 10)},

    {"title": "Exam focus", "kicker": "Exam preparation",
     "h": "Distinctions, bodies and answer technique",
     "body": stack([
         grid([
             card(ul(["**Definitions:** fabrication · falsification · informed consent · ICMJE criteria · COI",
                      "**Distinctions:** confidentiality vs anonymity (and pseudonymisation) · fabrication vs falsification · gift vs ghost authorship · legitimate transformation vs selective reporting",
                      "**Bodies and instruments:** IRB/EC · ICMR (2017) · ICMJE · COPE · ORI · Retraction Watch · GDPR · DPDPA (2023) · HIPAA"],
                     None, "margin:0;font-size:13px"), "What is tested", "teal"),
             stack([
                 card(p("<b>Definition &rarr; principle &rarr; CS example &rarr; "
                        "consequence.</b> Always ground the example in computing — HCI, "
                        "datasets, benchmarking, AI fairness — rather than medical research. "
                        "State the institutional and legal ramifications.", "small", "margin:0"),
                      "Answer technique", "rust"),
                 card(p("Given a scenario: identify the violated domain, name the governing "
                        "standard, prescribe the remedy.", "small", "margin:0"),
                      "Expect applied items", "tint"),
             ], 9),
         ], "1.2fr 1fr"),
         p("<b>Further reading:</b> Belmont Report (1979) · Declaration of Helsinki (rev. 2013) · "
           "ICMR National Ethical Guidelines (2017) · DPDPA (2023) · GDPR · ICMJE "
           "Recommendations · COPE Guidelines · ORI <i>Introduction to RCR</i> · Retraction "
           "Watch.", "fine", "margin:0"),
     ], 11)},
]

SPEAKER_NOTES = {
    1: "Distinguish this lecture from the previous one: Lecture 6 supplied the four governing principles; this session covers the five domains in which those principles become concrete obligations with named procedures and regulators. Each domain is a distinct point at which trust fails.",
    2: "Objective 4 contains the word critically: the most common professional error is misreading a similarity index or a consent requirement, in both directions. Objectives 1–2 are recall-and-discriminate; 4–6 are applied and carry more weight.",
    3: "Use the 'who is protected' column as the organising insight — it explains why five separate regimes exist rather than one general duty of good behaviour. Note that ICMR guidelines, though framed for biomedical research, are routinely applied to CS work touching human data.",
    4: "Emphasise that consent is a process rather than a form: students treat the signature as the deliverable and optimise for obtaining it rather than for understanding. Raise voluntariness in its most local form — recruiting your own classmates carries implicit pressure.",
    5: "Dwell on the keystroke case: CS studies routinely collect signals the participant does not think of as data about them. Underline that committee approval establishes the protocol's acceptability and nothing about what was actually told to participants.",
    6: "Drill the anonymity–confidentiality–pseudonymisation triad; it is close to a certain short-answer item and students conflate all three. Make the re-identification point empirically: quasi-identifiers have repeatedly been shown sufficient to re-identify supposedly anonymised data.",
    7: "This is where computer science stops being a consumer of ethics rules and becomes a producer of ethical instruments — students find that genuinely motivating. Close on the caveat: a privacy-preserving pipeline does not discharge the consent obligation.",
    8: "Build the slide around disclosure and documentation, which convert a moral list into a usable test. Read the ORI falsification wording aloud so the class hears 'omitting' inside the official definition — the most effective correction to the belief that only invented data counts.",
    9: "Spend the most time on test-set contamination: it is the offence this cohort is most likely to commit and least likely to recognise as more than sloppiness. Use Schön to make the structural point that community verification, not individual reputation, is the safeguard.",
    10: "Stress the conjunctive requirement — all four criteria, not a menu. 'I wrote the code, so I am an author' and 'I supervised, so I am an author' are both incomplete claims. Criterion 4 reframes gift authorship as a risk to the recipient.",
    11: "Make the structural argument: CS did not inherit an authorship framework fit for its artefacts, which is why CRediT matters more here. Be candid that the advisor–student asymmetry is real and that the only reliable protection is a written agreement made before there is anything to dispute.",
    12: "Lead with the 'or appear to compromise' clause: students assume a COI must be proven to have biased the work. Use the competing-library example, which shows that intellectual and personal conflicts arise in open-source work with no money involved at all.",
    13: "Run as cold-call diagnosis: give the scenario, ask which domain and which remedy. Present the four as teaching composites rather than citable incidents; for documented cases, direct students to Retraction Watch and to Schön and Hwang.",
    14: "Work scenario 2 aloud: coding and analysis satisfy ICMJE criterion 1, but the other three criteria must also be met, so the authorship stands only if all three participated in those as well. Scenario 3's obligation is to declare to the chairs and recuse, not to attempt a fair review.",
    15: "Give the four-move answer structure and insist on the CS-example step — answers written entirely in biomedical terms lose the discipline-specific marks. Have students build the distinction pairs as flashcards.",
}

NOTES_META = {
    "title": "CSEG3060 · Unit III · Lecture 7 Notes — Ethical Considerations in Research",
    "desc": ("Student notes for Unit III Lecture 7 of CSEG3060: informed consent, "
             "confidentiality and anonymisation, data fabrication and falsification, "
             "authorship norms under ICMJE and CRediT, and conflicts of interest, with "
             "regulatory references to ICMR, GDPR, DPDPA and HIPAA."),
    "lecno": "7",
    "lectitle": "Ethical Considerations in Research",
    "subline": ("Informed consent, confidentiality, fabrication and falsification, authorship "
                "norms and conflict of interest &middot; 60 minutes &middot; B.Tech. (CSE) "
                "&middot; Dr. Mohsin Furkh Dar"),
    "badges": ["CO3", "Informed consent", "Confidentiality", "FFP", "ICMJE &amp; CRediT",
               "Conflict of interest"],
    "pager": [("CSEG3060_Unit3_L06_Research_Ethics_Principles_Notes.html",
               "&larr; Lecture 6: Research Ethics &mdash; Foundational Principles"),
              ("CSEG3060_Unit3_L08_Regulatory_Frameworks_and_Case_Studies_Notes.html",
               "Lecture 8: Regulatory Frameworks and Case Studies &rarr;")],
    "deck": STEM + ".html",
    "decklabel": "Lecture 7 slides",
}

NOTES_BODY = "\n".join([
    box("def", "Course outcome addressed &mdash; CO3",
        p("Demonstrate an understanding of ethical practices, scholarly conduct and "
          "responsible research behaviour.")
        + p("Lecture 6 supplied the four governing <em>principles</em>. This lecture covers "
            "the five <em>domains</em> in which those principles become concrete obligations "
            "with named procedures and regulators.")),

    box("exam", "How to use these notes",
        p("This is the most regulation-dense lecture of the unit, and naming the right "
          "instrument is worth marks. Build flashcards for the distinction pairs in Section "
          "8: <span class=\"kw\">confidentiality versus anonymity</span> and "
          "<span class=\"kw\">fabrication versus falsification</span> are the two most "
          "reliably examined and the two most reliably confused.")
        + p("Each of the five domains corresponds to a distinct point at which trust fails "
            "&mdash; participants, data subjects, readers, collaborators and the public "
            "respectively. That is why five separate regimes exist rather than one general "
            "duty of good behaviour.")),

    sec(1, "Learning Objectives", "s1"),
    ul(["Define and apply the principle of informed consent in human-subjects research.",
        "Explain the mechanisms used to preserve confidentiality and protect data.",
        "Distinguish between data fabrication, falsification and legitimate data "
        "transformation.",
        "Identify the criteria for legitimate authorship and the consequences of honorary or "
        "ghost authorship.",
        "Recognise, disclose and manage conflicts of interest in research.",
        "Connect each ethical principle to concrete computer science research scenarios."]),

    sec(2, "The Five Pillars", "s2"),
    p("Research is built upon trust. In computer science, where research increasingly involves "
      "human participants (HCI, user studies, AI fairness assessments), large-scale datasets "
      "and multi-author collaborations, ethical awareness is a core competency rather than an "
      "optional extra."),
    tw(table(["Ethical domain", "Core principle", "Primary risk if violated", "Who is protected"], [
        ["**Informed consent**", "Voluntary, informed, capacitated agreement",
         "Coercion, exploitation", "Participants"],
        ["**Confidentiality**", "Privacy protection and controlled disclosure",
         "Privacy breach, identity exposure", "Data subjects"],
        ["**Fabrication / falsification**", "Honest data collection and reporting",
         "Loss of scientific validity", "Readers and the scientific record"],
        ["**Authorship norms**", "Credit for substantial intellectual contribution",
         "Misattribution of credit", "Collaborators"],
        ["**Conflict of interest**", "Transparent disclosure of competing interests",
         "Compromised objectivity", "The public and peer review"],
    ])),

    sec(3, "Informed Consent", "s3"),
    sub("3.1 Definition", "s3-1"),
    box("def", "Definition &mdash; Informed consent",
        p("<span class=\"kw\">Informed consent</span> is a <em>process</em> by which a "
          "participant voluntarily agrees to take part in a research study after being fully "
          "informed about its purpose, procedures, risks, benefits, alternatives and the "
          "handling of their data. It is rooted in the Belmont Report's principle of "
          "<em>respect for persons</em> and reaffirmed in Article 6 of the Declaration of "
          "Helsinki.")),
    p("Note the word <em>process</em>. Students treat the signature as the deliverable and "
      "therefore optimise for obtaining it rather than for the participant's understanding."),

    sub("3.2 Five Components of Valid Consent", "s3-2"),
    ol(["<span class=\"kw\">Disclosure.</span> The researcher must disclose the study's "
        "purpose, duration, procedures, foreseeable risks, expected benefits and any "
        "compensation.",
        "<span class=\"kw\">Understanding.</span> Information must be presented in language "
        "the participant can comprehend, free from jargon or undue influence. A form written "
        "at postgraduate reading level fails this criterion however complete its disclosure.",
        "<span class=\"kw\">Voluntariness.</span> Participation must be free from coercion, "
        "undue pressure, or penalty for non-participation &mdash; a live concern when the "
        "researcher is also the participants' instructor or senior.",
        "<span class=\"kw\">Capacity.</span> The participant must have the legal and cognitive "
        "capacity to consent. For minors or incapacitated individuals, surrogate or parental "
        "consent is required.",
        "<span class=\"kw\">Comprehension and documentation.</span> Usually recorded through a "
        "signed consent form, although click-through or recorded verbal consent is acceptable "
        "in some digital contexts."]),

    sub("3.3 Hard Cases in Computing", "s3-3"),
    ul(["<span class=\"kw\">Online experiments and crowdsourcing</span> (Amazon Mechanical "
        "Turk, Prolific). Consent must be obtained <em>prior to task exposure</em>, and IP "
        "addresses and metadata may themselves constitute identifiable information even when "
        "no name is collected.",
        "<span class=\"kw\">AI fairness and dataset research.</span> Consent issues arise when "
        "researchers use pre-existing datasets containing personal information. Secondary use "
        "beyond the original consent's scope may violate the agreement under which the data "
        "were collected &mdash; however public the dataset now appears.",
        "<span class=\"kw\">A/B testing in industry.</span> Many large technology firms conduct "
        "experiments on users without explicit consent. This raises unresolved concerns about "
        "autonomy and transparency; the fact that a practice is routine does not settle "
        "whether it is ethical."]),
    box("eg", "Worked example &mdash; a usability study",
        p("A researcher studying the usability of a new authentication mechanism recruits 100 "
          "participants. Each participant must be told:")
        + ul(["that they may withdraw at any time;",
              "that their <em>keystroke dynamics</em> data will be collected;",
              "how the data will be stored and destroyed;",
              "whom to contact for grievances."])
        + p("<span class=\"kw\">Failure to disclose the keystroke logging constitutes an "
            "ethical violation even if the protocol was institutionally approved.</span> "
            "Committee approval establishes the protocol's acceptability; it says nothing "
            "about what was actually told to participants.")),

    sec(4, "Confidentiality", "s4"),
    sub("4.1 Definition and the Key Distinction", "s4-1"),
    box("def", "Definition &mdash; Confidentiality",
        p("<span class=\"kw\">Confidentiality</span> is the obligation of researchers to "
          "protect the private information of participants and prevent unauthorised access, "
          "use or disclosure.")),
    box("exam", "Confidentiality, anonymity and pseudonymisation",
        p("<span class=\"kw\">Anonymised</span> data cannot be linked back to an individual at "
          "all. <span class=\"kw\">Confidential</span> data <em>are</em> linkable but are "
          "protected by safeguards. <span class=\"kw\">Pseudonymised</span> data replace "
          "identifiers with keys held separately and therefore remain re-identifiable &mdash; "
          "which is why pseudonymisation is <em>not</em> anonymisation under GDPR.")
        + p("Claiming anonymisation is a technical assertion requiring justification: "
            "quasi-identifiers such as postcode, birth date and sex have repeatedly been shown "
            "sufficient to re-identify individuals in supposedly anonymised datasets.")),

    sub("4.2 Four Operational Practices", "s4-2"),
    ol(["<span class=\"kw\">Minimisation.</span> Collect only the data necessary to answer the "
        "research question.",
        "<span class=\"kw\">Anonymisation and pseudonymisation.</span> Remove or replace direct "
        "identifiers.",
        "<span class=\"kw\">Secure storage.</span> Use encryption, access controls and audit "
        "logs.",
        "<span class=\"kw\">Controlled access.</span> Restrict data access to authorised "
        "personnel under binding agreements."]),
    p("Minimisation is the strongest safeguard available, and the one engineers reach for "
      "naturally: data never collected cannot be breached, subpoenaed, re-identified or "
      "leaked. Every other control merely reduces the risk attaching to data you chose to "
      "hold."),

    sub("4.3 Regulatory Frameworks", "s4-3"),
    ul(["<span class=\"kw\">India</span> &mdash; the Digital Personal Data Protection Act "
        "(DPDPA), 2023, governs the processing of digital personal data.",
        "<span class=\"kw\">European Union</span> &mdash; the General Data Protection "
        "Regulation (GDPR) sets strict consent and data-handling standards, with "
        "extraterritorial reach.",
        "<span class=\"kw\">United States</span> &mdash; the Health Insurance Portability and "
        "Accountability Act (HIPAA) governs medical data confidentiality."]),

    sub("4.4 Technical Mechanisms and Their Costs", "s4-4"),
    tw(table(["Mechanism", "What it protects against", "Its cost"], [
        ["**Encryption** &mdash; AES-256 at rest, TLS 1.3 in transit", "Interception",
         "Negligible; this is the baseline expectation"],
        ["**Differential privacy**", "Re-identification, bounded mathematically",
         "Accuracy, traded against the privacy budget"],
        ["**Federated learning**", "Data centralisation",
         "Efficiency; new leakage channels through model updates"],
        ["**Secure multi-party computation**", "Disclosure of individual inputs",
         "Computationally expensive"],
    ])),
    p("These mechanisms matter most in health informatics, social-network analysis and "
      "behavioural analytics &mdash; the CS subfields in which confidentiality obligations are "
      "strictest and research questions most demanding. Differential privacy's distinctive "
      "claim is that it offers a <em>provable</em> guarantee under a stated budget, unlike "
      "ad-hoc de-identification, which offers only a hope."),
    box("caution", "Technical safeguards do not replace consent",
        p("None of these mechanisms is a complete solution. Presenting them as solved problems "
          "invites the belief that a privacy-preserving pipeline discharges the consent "
          "obligation from Section 3 &mdash; which it does not.")),

    sec(5, "Data Fabrication and Falsification", "s5"),
    sub("5.1 Definitions", "s5-1"),
    p("The U.S. Office of Research Integrity and most institutional policies classify research "
      "misconduct into three categories, known as <span class=\"kw\">FFP</span>:"),
    ul(["<span class=\"kw\">Fabrication</span> &mdash; making up data, results or records and "
        "reporting them as if they were real.",
        "<span class=\"kw\">Falsification</span> &mdash; manipulating research materials, "
        "equipment or processes, or <em>changing, omitting, or selectively reporting</em> data, "
        "such that the research is not accurately represented.",
        "<span class=\"kw\">Plagiarism</span> &mdash; appropriation of another person's ideas, "
        "processes, results or words without giving appropriate credit (Lectures 4 and 5)."]),
    box("exam", "Read the falsification wording carefully",
        p("The official definition includes <em>omitting</em>. This is why leaving unfavourable "
          "runs out of a paper falls <em>inside</em> the definition rather than beside it "
          "&mdash; the most effective correction to the belief that only invented data counts "
          "as misconduct.")),

    sub("5.2 The Boundary Between Method and Misconduct", "s5-2"),
    tw(table(["Practice", "Ethical status"], [
        ["Removing outliers with documented statistical justification", "Generally acceptable"],
        ["Applying anonymisation or aggregation", "Acceptable and often required"],
        ["Cherry-picking results that support a hypothesis while omitting null results",
         "Unethical &mdash; selective reporting"],
        ["Generating synthetic data to fill missing records without disclosure",
         "Unethical &mdash; fabrication"],
        ["Re-running an experiment until the result becomes significant",
         "Unethical &mdash; manipulation"],
        ["Image manipulation in figures that alters content",
         "Unethical &mdash; falsification"],
    ])),
    box("def", "The two discriminating variables",
        p("<span class=\"kw\">Disclosure</span> and <span class=\"kw\">documentation</span>. "
          "Synthetic data disclosed as synthetic is a legitimate method; the same data "
          "presented as observed is fabrication. An outlier removal you can justify in writing "
          "is method; the same removal undocumented is indistinguishable from data repair.")),

    sub("5.3 Computer Science Specific Issues", "s5-3"),
    ul(["<span class=\"kw\">Benchmark falsification.</span> Cherry-picking benchmarks, omitting "
        "unfavourable datasets, and <em>tuning hyperparameters on the test set</em> are all "
        "falsification &mdash; notwithstanding that each step looks like ordinary engineering "
        "iteration.",
        "<span class=\"kw\">Test-set contamination.</span> Once the test set has informed a "
        "design decision, the reported number is a training-set estimate presented as a "
        "generalisation estimate &mdash; a misrepresentation of what the experiment measured. "
        "This is the offence this cohort is most likely to commit and least likely to "
        "recognise as more than sloppiness.",
        "<span class=\"kw\">Image manipulation.</span> Figures in computational biology and "
        "imaging papers can be altered in general-purpose image editors, which is why journals "
        "now require raw image data alongside submitted figures.",
        "<span class=\"kw\">Reproducibility crisis.</span> Many published ML results cannot be "
        "replicated, in substantial part because of undisclosed data preprocessing and "
        "selective reporting rather than outright invention."]),
    box("eg", "Documented cases",
        p("<span class=\"kw\">Jan Hendrik Schön (2002)</span> &mdash; a physicist at Bell Labs "
          "fabricated data across multiple semiconductor studies. He was prolific and "
          "celebrated before he was caught, which is why community verification rather than "
          "individual reputation is the operative safeguard.")
        + p("<span class=\"kw\">Hwang Woo-suk (2004&ndash;2005)</span> &mdash; fabricated data "
            "in stem-cell research, leading to retraction of high-profile papers and a "
            "criminal conviction.")
        + p("Contemporary retractions, including benchmark manipulation and undisclosed "
            "tuning, are catalogued publicly by <em>Retraction Watch</em>. Browsing ordinary, "
            "non-famous cases is more instructive than any single scandal.")),

    sec(6, "Authorship Norms", "s6"),
    sub("6.1 Why Authorship Matters", "s6-1"),
    p("Authorship is the primary mechanism through which researchers receive credit for "
      "intellectual contributions. Misattribution distorts merit, undermines accountability, "
      "and affects career progression, funding decisions and public trust."),

    sub("6.2 The ICMJE Criteria", "s6-2"),
    p("The <span class=\"kw\">ICMJE</span> (International Committee of Medical Journal "
      "Editors) and <span class=\"kw\">COPE</span> (Committee on Publication Ethics) have "
      "established the widely accepted criteria. Under ICMJE, authorship requires:"),
    ol(["Substantial contributions to conception, design, data acquisition, analysis or "
        "interpretation.",
        "Drafting the work or revising it critically for important intellectual content.",
        "Final approval of the version to be published.",
        "<span class=\"kw\">Accountability for all aspects of the work.</span>"]),
    box("exam", "All four, not any one",
        p("The criteria are <em>conjunctive</em>. &ldquo;I wrote the code, so I am an "
          "author&rdquo; and &ldquo;I supervised, so I am an author&rdquo; are both incomplete "
          "claims. Contributors who do not meet all four may be acknowledged but not listed.")
        + p("Criterion 4 is the one students overlook: accepting authorship means accepting "
            "answerability for the whole paper, including parts you did not produce &mdash; "
            "which is why a gift author is <em>exposed</em> as well as unearned.")),

    sub("6.3 Five Named Abuses", "s6-3"),
    tw(table(["Misconduct", "Description"], [
        ["**Gift authorship**", "Listing senior colleagues without their meaningful contribution"],
        ["**Guest authorship**", "Adding a well-known researcher to enhance credibility"],
        ["**Ghost authorship**",
         "Omitting a contributor &mdash; a medical writer, a junior researcher &mdash; who made "
         "substantive contributions"],
        ["**Coercive authorship**",
         "Senior authors pressuring juniors to include unrelated contributors"],
        ["**Mutual-benefit authorship**",
         "Researchers agreeing to add each other across papers without genuine contribution"],
    ])),

    sub("6.4 Authorship in Computer Science", "s6-4"),
    p("Traditional authorship criteria were designed around individually authored manuscripts, "
      "while CS research produces collaboratively built software, datasets and infrastructure "
      "whose contributors do not map cleanly onto drafting and revision. This is why the "
      "<span class=\"kw\">CRediT</span> taxonomy matters more here than in the disciplines "
      "that wrote the original rules."),
    p("<span class=\"kw\">CRediT defines fourteen roles:</span> conceptualisation, methodology, "
      "software, validation, formal analysis, investigation, data curation, writing &ndash; "
      "original draft preparation, writing &ndash; review and editing, visualisation, "
      "supervision, project administration, funding acquisition, resources."),
    ul(["<span class=\"kw\">Mega-author papers.</span> Submissions at venues such as NeurIPS "
        "may carry thirty or more authors, at which point a byline conveys almost no "
        "information and per-role contribution statements become the only meaningful "
        "transparency.",
        "<span class=\"kw\">Advisor&ndash;student dynamics.</span> A student who is the primary "
        "contributor should be listed as first author. This is a recurring source of conflict, "
        "and the power asymmetry means the student rarely raises it. The remedy is a "
        "<em>documented authorship agreement before work begins</em>, not a negotiation after "
        "submission."]),
    p("<em>Software</em>, <em>data curation</em> and <em>validation</em> are the roles this "
      "cohort most often fills uncredited. Naming them explicitly is how the contribution "
      "becomes visible."),

    sec(7, "Conflict of Interest", "s7"),
    sub("7.1 Definition and Types", "s7-1"),
    box("def", "Definition &mdash; Conflict of interest",
        p("A <span class=\"kw\">conflict of interest</span> exists when a researcher's "
          "personal, financial, professional or institutional interests could compromise "
          "&mdash; <em>or appear to compromise</em> &mdash; the objectivity, integrity or "
          "independence of the research. <span class=\"kw\">Appearance is sufficient</span>; "
          "actual bias need not be demonstrated.")),
    ol(["<span class=\"kw\">Financial.</span> Stock holdings, consulting fees, royalties or "
        "honoraria from entities that could benefit from the research outcome.",
        "<span class=\"kw\">Personal.</span> Close relationships with individuals or "
        "organisations that could bias the research.",
        "<span class=\"kw\">Institutional.</span> Institutional pressures, such as funding from "
        "a company whose product is being evaluated.",
        "<span class=\"kw\">Intellectual.</span> Strongly held theoretical commitments that may "
        "bias interpretation of data.",
        "<span class=\"kw\">Political or ideological.</span> Particularly relevant in AI "
        "ethics, algorithmic fairness and policy research."]),

    sub("7.2 Disclosure Requirements", "s7-2"),
    p("IEEE, ACM, NeurIPS and ICML all require authors to declare funding sources, employment "
      "relationships, equity interests, advisory board memberships and any other relevant "
      "relationships within roughly the past three years."),
    box("caution", "Non-disclosure is itself the violation",
        p("Failure to disclose is a separate, independently sanctionable offence "
          "<em>regardless of whether the research was actually biased</em> &mdash; which is "
          "why declaring is always cheaper than judging your own impartiality.")),

    sub("7.3 Managing a Conflict", "s7-3"),
    ol(["<span class=\"kw\">Disclosure</span> &mdash; full transparency to journals, funders "
        "and ethics committees. This is the floor.",
        "<span class=\"kw\">Blinding</span> &mdash; double-blind review where feasible.",
        "<span class=\"kw\">Independent oversight</span> &mdash; an independent statistician or "
        "auditor verifies results.",
        "<span class=\"kw\">Recomposition of research teams</span> &mdash; including members "
        "without the conflict to balance perspectives.",
        "<span class=\"kw\">Recusal</span> &mdash; removing oneself from review or "
        "decision-making processes."]),
    box("eg", "CS examples",
        ul(["Evaluating the safety of a self-driving system funded by its manufacturer "
            "&mdash; a clear financial conflict.",
            "Benchmarking against a competing library that you maintain &mdash; an "
            "intellectual and personal conflict, with no money involved at all.",
            "Auditing a hiring algorithm from a company you previously consulted for &mdash; a "
            "prior relationship requiring disclosure."])),

    sec(8, "Cross-Cutting Themes", "s8"),
    sub("8.1 Interdependence", "s8-1"),
    p("A single study may require informed consent from participants, confidentiality "
      "protection for the data collected, honest reporting without fabrication or "
      "falsification, accurate authorship attribution, and transparent disclosure of conflicts. "
      "Failure in one domain often cascades into others: falsification of data typically "
      "involves misleading co-authors, converting a data offence into an authorship and trust "
      "offence."),

    sub("8.2 Institutional Mechanisms", "s8-2"),
    ul(["<span class=\"kw\">Institutional Review Boards (IRBs)</span> or Ethics Committees "
        "for human-subjects research.",
        "<span class=\"kw\">Institutional Ethics Committees (IECs)</span> under Indian Council "
        "of Medical Research guidelines.",
        "<span class=\"kw\">Research Integrity Offices</span> handling allegations of "
        "misconduct.",
        "<span class=\"kw\">Funding agency policies</span> &mdash; DST, SERB, UGC in India "
        "&mdash; requiring ethics training and certification."]),
    p("In India, ICMR's <em>National Ethical Guidelines for Biomedical and Health Research "
      "Involving Human Participants</em> (2017) is a widely cited reference, applicable even "
      "to CS research when it involves human data."),

    sub("8.3 Consequences", "s8-3"),
    p("Confirmed violations may lead to retraction of publications, blacklisting by funding "
      "agencies, termination of employment, loss of academic degrees, and civil or criminal "
      "liability &mdash; especially where data-protection law has been breached. Platforms "
      "such as <em>Retraction Watch</em> document these cases publicly, serving as both "
      "deterrent and educational resource."),

    sec(9, "Case Studies", "s9"),
    p("The following are illustrative composites for teaching. For documented incidents, see "
      "the Schön and Hwang cases in Section 5.3 and the Retraction Watch database."),
    tw(table(["Scenario", "Domain implicated", "Lesson"], [
        ["A fairness paper reports a 2% demographic parity gap computed on a favourable subset "
         "of the dataset; the paper is retracted and an institutional investigation opened",
         "Fabrication / falsification",
         "Selective reporting and benchmark manipulation constitute falsification"],
        ["A platform runs a large-scale A/B test manipulating the emotional valence of users' "
         "feeds, published without explicit consent", "Informed consent; non-maleficence",
         "Scale does not suspend the consent obligation"],
        ["A company's medical writer drafts a manuscript; only academic authors are listed, and "
         "the writer cannot later be located to verify the analysis", "Authorship (ghost)",
         "Ghost authorship destroys accountability and breaches ICMJE criteria"],
        ["A researcher publishes a paper praising an AI hiring tool; stock options in the "
         "vendor emerge later", "Conflict of interest",
         "Non-disclosure undermines the credibility of the finding"],
    ])),

    sec(10, "Summary", "s10"),
    tw(table(["Domain", "Core takeaway"], [
        ["**Informed consent**",
         "Voluntary, informed, capacitated and documented agreement is mandatory &mdash; and "
         "committee approval does not replace participant disclosure"],
        ["**Confidentiality**",
         "Protect data through technical <em>and</em> procedural safeguards; distinguish "
         "anonymity from pseudonymity"],
        ["**Fabrication / falsification**",
         "Honest reporting is non-negotiable; omission is inside the definition"],
        ["**Authorship norms**",
         "Credit must reflect substantial intellectual contribution; use CRediT"],
        ["**Conflict of interest**",
         "Disclose all relevant interests; manage or recuse when necessary"],
    ])),

    sec(11, "Exam Preparation", "s11"),
    box("exam", "What is tested, and how to answer",
        ol(["<span class=\"kw\">Memorise definitions:</span> fabrication, falsification, "
            "informed consent and its components, the ICMJE authorship criteria, conflict of "
            "interest.",
            "<span class=\"kw\">Apply, do not just define.</span> Expect a hypothetical "
            "scenario and a request to identify the violation.",
            "<span class=\"kw\">Know the bodies:</span> IRB, ICMJE, COPE, ICMR, ORI, "
            "Retraction Watch.",
            "<span class=\"kw\">Connect to CS.</span> Always bring examples back to computing "
            "&mdash; HCI, AI, datasets, benchmarking. Answers written entirely in biomedical "
            "terms lose the discipline-specific marks.",
            "<span class=\"kw\">Use structured responses:</span> definition &rarr; principle "
            "&rarr; CS example &rarr; consequence.",
            "<span class=\"kw\">Distinguish similar concepts:</span> confidentiality versus "
            "anonymity; fabrication versus falsification; gift versus ghost authorship.",
            "<span class=\"kw\">Link to regulations:</span> referencing GDPR, DPDPA, ICMR or "
            "HIPAA strengthens an answer materially.",
            "<span class=\"kw\">Discuss consequences.</span> Examiners reward awareness of "
            "institutional and legal ramifications."])),

    sub("11.1 Short-Answer Questions", "s11-1"),
    qlist(["Define informed consent. List its essential components. " + marks("3 marks"),
           "Differentiate between fabrication and falsification, with one CS-relevant example "
           "of each. " + marks("3 marks"),
           "What are the ICMJE criteria for authorship? Why is each important? "
           + marks("4 marks"),
           "Explain the difference between anonymisation and pseudonymisation. Why does the "
           "distinction matter for CS research? " + marks("3 marks"),
           "What is a conflict of interest? List three types with examples. " + marks("3 marks")]),

    sub("11.2 Long-Answer Questions", "s11-2"),
    qlist(["Discuss the ethical issues surrounding the use of publicly available social-media "
           "data for research. Address informed consent, confidentiality and applicable "
           "regulations. " + marks("10 marks"),
           "Critically evaluate the criteria for authorship in large multi-institutional "
           "machine learning collaborations. How does the CRediT taxonomy help resolve "
           "ambiguities? " + marks("10 marks"),
           "A CS researcher at your institute is suspected of manipulating benchmark results. "
           "Outline the institutional process for investigating the allegation and the "
           "potential consequences. " + marks("10 marks"),
           "Compare the ICMR (India) and GDPR (EU) frameworks in their treatment of informed "
           "consent and data protection. Which is more restrictive, and why? " + marks("10 marks"),
           "Discuss the role of differential privacy in protecting participant confidentiality. "
           "What are its limitations? " + marks("10 marks")]),

    sub("11.3 Scenario-Based Questions", "s11-3"),
    box("eg", "Diagnose and prescribe",
        ol(["A PhD student wants to scrape user reviews from a public website for a "
            "sentiment-analysis study. Identify the ethical concerns and propose safeguards.",
            "Three students collaborate on a project. Only the first writes the paper, but all "
            "three are listed as authors; the other two performed coding and analysis. "
            "Evaluate this authorship claim against ICMJE standards.",
            "You are reviewing a paper for an AI conference and notice that the lead author is "
            "a co-founder of the startup whose product is being evaluated. What should you do?",
            "A dataset used in your research contains personal information, but its terms of "
            "use explicitly prohibit re-identification. Discuss the ethical and legal "
            "implications."])),

    sub("11.4 Higher-Order Questions", "s11-4"),
    qlist(["To what extent should research ethics differ between academic and industry "
           "research?",
           "Can informed consent be meaningfully obtained for large-scale, pre-existing "
           "datasets? Justify your position.",
           "How should authorship be attributed in projects involving generative AI tools such "
           "as large language models? <em>Argue from the accountability criterion: a tool "
           "cannot be accountable and therefore cannot be an author.</em>",
           "Should conflict-of-interest disclosures be made public for all funded research? "
           "Argue both sides."]),

    sec(12, "Further Reading", "s12"),
    ol(["<em>Belmont Report</em> (1979).",
        "<em>Declaration of Helsinki</em> (1964, last revised 2013).",
        "ICMR <em>National Ethical Guidelines for Biomedical and Health Research Involving "
        "Human Participants</em> (2017).",
        "<em>Digital Personal Data Protection Act</em>, India (2023).",
        "<em>General Data Protection Regulation</em>, EU.",
        "ICMJE <em>Recommendations for the Conduct, Reporting, Editing, and Publication of "
        "Scholarly Work in Medical Journals</em>.",
        "COPE (Committee on Publication Ethics) Guidelines.",
        "Office of Research Integrity &mdash; <em>Introduction to RCR</em>.",
        "Mart&iacute;n-Mart&iacute;n, A., et al. (2018). Ordinary authors and invisible "
        "contributors: The need to improve credit attribution in research.",
        "<em>Retraction Watch</em> database."]),
])
