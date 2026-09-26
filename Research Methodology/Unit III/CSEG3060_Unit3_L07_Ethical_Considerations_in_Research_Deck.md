# Lecture Deck — Ethical Considerations in Research
**Course:** Research Methodology in CS (CSEG3060_3) · **Unit III:** Ethical Conduct and Literature Studies
**Lecture 7:** Informed Consent, Confidentiality, Data Fabrication/Falsification, Authorship Norms and Conflict of Interest
**Mapped Course Outcome:** CO3 — Demonstrate an understanding of ethical practices, scholarly conduct and responsible research behaviour.
**Programme:** B.Tech (Computer Science), Semester V · **Duration:** 60 minutes · **Deck length:** 15 slides

*Suggested pacing:* Slides 1–3 (7 min) · Slides 4–5 (10 min) · Slides 6–7 (10 min) · Slides 8–9 (10 min) · Slides 10–11 (9 min) · Slide 12 (7 min) · Slide 13 (4 min) · Slides 14–15 (3 min)

---

## Slide 1 — Title Slide

**Title:** Ethical Considerations in Research: Consent, Confidentiality, Data Integrity, Authorship and Conflict of Interest

**Slide Content**
- Research Methodology in Computer Science — CSEG3060_3, Unit III: Ethical Conduct and Literature Studies
- Lecture 7 of the Unit III sequence · B.Tech (CSE), Semester V · Duration: 60 minutes
- Mapped Course Outcome: **CO3** — ethical practices, scholarly conduct and responsible research behaviour
- Guiding claim for the session: *"Research rests on trust. Every rule in this lecture exists because trust can be broken at a specific point."*
- Instructor, department and academic session details

**Professor Speaker Notes**
Open by distinguishing this lecture from the previous one: Lecture 6 supplied the four governing *principles*, and this session covers the five *domains* in which those principles become concrete obligations with named procedures and regulators. State the guiding claim, then note that each of the five domains corresponds to a distinct point at which trust fails — participants, data subjects, readers, collaborators and the public respectively. Tell students this is the most regulation-dense lecture of the unit, and that naming the right regulator is worth marks.

**Visual / Layout Recommendation**
Full-bleed title slide with a faint background motif of five linked nodes labelled *Consent · Confidentiality · Data Integrity · Authorship · COI*. CO3 tag as a coloured chip lower-right; guiding claim as a centred pull-quote.

---

## Slide 2 — Learning Objectives & Lecture Agenda

**Slide Content**
- **Objective 1:** Define and apply the principle of **informed consent** in human-subjects research.
- **Objective 2:** Explain the mechanisms used to preserve **confidentiality** and protect data.
- **Objective 3:** Distinguish **data fabrication**, **falsification** and **legitimate data transformation**.
- **Objective 4:** Identify criteria for legitimate **authorship** and the consequences of honorary or ghost authorship.
- **Objective 5:** Recognise, disclose and manage **conflicts of interest**.
- **Objective 6:** Connect each ethical principle to concrete computer science research scenarios.
- **Agenda:** Five pillars at a glance → Informed consent → Confidentiality → Fabrication and falsification → Authorship norms → Conflict of interest → Cases and enforcement → Exam focus

**Professor Speaker Notes**
Point out that Objective 3 is the one with a genuine intellectual edge: students can recite that fabrication is wrong, but the examinable skill is locating the boundary between documented outlier removal and undisclosed data repair. Note that Objective 6 governs how answers should be written — a correct answer framed in medical-research terms earns less than the same answer grounded in HCI, datasets or benchmarking. Flag that scenario-based items dominate assessment on this topic.

**Visual / Layout Recommendation**
Two-column layout: left column the six objectives with operative verbs colour-coded (Define/Explain/Identify/Recognise = blue; Distinguish/Apply/Connect = amber); right column a vertical agenda timeline with minute allocations.

---

## Slide 3 — The Five Pillars and Why They Bind Computer Scientists

**Slide Content**
- **Why CS can no longer treat this as someone else's problem:** research here increasingly involves **human participants** (HCI, user studies, AI fairness assessments), **large-scale personal datasets**, and **multi-author, multi-institution collaborations** — each of which activates a different ethical regime.
- **The five domains, their governing principle, and the risk if violated:**

  | Domain | Core principle | Primary risk if violated |
  |---|---|---|
  | **Informed consent** | Voluntary, informed, capacitated agreement | Coercion, exploitation |
  | **Confidentiality** | Privacy protection and controlled disclosure | Privacy breach, identity exposure |
  | **Fabrication / falsification** | Honest data collection and reporting | Loss of scientific validity |
  | **Authorship norms** | Credit for substantial intellectual contribution | Misattribution of credit |
  | **Conflict of interest** | Transparent disclosure of competing interests | Compromised objectivity |

- **Who is protected in each case:** participants · data subjects · readers and the scientific record · collaborators · the public and the peer-review system.
- **The regulatory anchors used throughout this lecture:** **Belmont Report** principles · **Declaration of Helsinki** · **ICMR National Ethical Guidelines (2017)** · **DPDPA (India, 2023)** and **GDPR** · **ICMJE** and **COPE** authorship standards · **ORI** misconduct definitions.
- **Ethical awareness is a core competency**, not a compliance formality — it determines whether a result is admissible as knowledge at all.

**Professor Speaker Notes**
Use the "who is protected" row as the organising insight, because it explains why five separate regimes exist rather than one general duty of good behaviour. Note that ICMR's guidelines, though framed for biomedical and health research, are routinely applied to CS work that touches human data — which surprises students who assume medical regulation is irrelevant to them. Tell them the table is the deck's index and will be reprised as the summary on Slide 14.

**Visual / Layout Recommendation**
Dominant five-row table with a colour chip per domain, carried consistently through the rest of the deck. Beneath it, a "who is protected" strip aligning each domain to its protected party, and a footer band listing the six regulatory anchors.

---

## Slide 4 — Informed Consent I: The Five Components of Valid Consent

**Slide Content**
- **Definition:** a **process** — not a signature — by which a participant voluntarily agrees to take part after being fully informed of the study's purpose, procedures, risks, benefits, alternatives and data handling. Rooted in the Belmont Report's principle of **respect for persons** and reaffirmed in **Article 6 of the Declaration of Helsinki**.
- **Disclosure:** the researcher must state purpose, duration, procedures, foreseeable risks, expected benefits and any compensation.
- **Understanding:** information must be in language the participant comprehends — **free of jargon and undue influence**.
- **Voluntariness:** participation must be free from coercion, undue pressure, or penalty for refusal — a live concern when the researcher is also the participants' instructor or employer.
- **Capacity and documentation:** the participant must have legal and cognitive capacity, with **surrogate or parental consent** for minors and incapacitated individuals; consent is normally documented by signed form, though **click-through or recorded verbal consent** is acceptable in some digital contexts.

**Professor Speaker Notes**
Emphasise that consent is a process rather than a form, because students treat the signature as the deliverable and therefore optimise for obtaining it rather than for the participant's understanding. Raise the voluntariness problem in its most local form: recruiting your own classmates or juniors carries an implicit pressure that must be actively neutralised. Note that a consent form written at postgraduate reading level fails the understanding criterion no matter how complete its disclosure.

**Visual / Layout Recommendation**
Five-component diagram arranged as a gate that consent must pass through in sequence (Disclosure → Understanding → Voluntariness → Capacity → Documentation), with a failure example annotated beneath each gate. Key-highlight chip: "Consent is a process, not a signature."

---

## Slide 5 — Informed Consent II: The Hard Cases in Computing

**Slide Content**
- **Online experiments and crowdsourcing** (Amazon Mechanical Turk, Prolific): consent must be obtained **before task exposure**, and **IP addresses and metadata may themselves constitute identifiable information** even when no name is collected.
- **Secondary use of existing datasets:** consent problems arise when researchers use pre-existing data containing personal information — **reuse beyond the original consent's scope may violate the agreement** under which the data were collected, however public the dataset now appears.
- **Industry A/B testing:** many large technology firms experiment on users without explicit consent, raising unresolved concerns about **autonomy and transparency** — the fact that a practice is routine does not settle whether it is ethical.
- **Worked example — a usability study of a new authentication mechanism, 100 participants.** Each must be told: that they may **withdraw at any time** · that their **keystroke dynamics** will be collected · **how the data will be stored and destroyed** · **whom to contact** with grievances.
- **The decisive point of that example:** failure to disclose the keystroke logging is an ethical violation **even if the protocol received institutional approval** — committee approval does not substitute for participant disclosure.

**Professor Speaker Notes**
Dwell on the keystroke case, because it captures the behavioural-telemetry problem generally: CS studies routinely collect signals the participant does not think of as data about them. Make the secondary-use point concrete with scraped social-media text — publicly accessible is not the same as consented for research use, which is exactly the tension in the scenario question on Slide 14. Underline the final bullet, since students assume ethics-committee approval is a complete defence, when in fact it establishes the protocol's acceptability and nothing about what was actually told to participants.

**Visual / Layout Recommendation**
Upper half: three hard-case cards (crowdsourcing · secondary dataset use · industry A/B testing) each with its unresolved question stated. Lower half: a case box for the authentication study listing the four mandatory disclosures, with the keystroke item flagged in red and the caption "approval ≠ disclosure".

---

## Slide 6 — Confidentiality I: The Obligation, the Distinction and the Regulators

**Slide Content**
- **Definition:** the obligation to protect participants' private information and prevent **unauthorised access, use or disclosure**.
- **Confidentiality is not anonymity** — the distinction is examinable: **anonymised** data cannot be linked back to an individual at all, while **confidential** data *are* linkable but protected by safeguards. **Pseudonymisation** replaces identifiers with keys and therefore remains re-identifiable, which is why it is *not* anonymisation under GDPR.
- **Four operational practices:** **minimisation** — collect only what the research question requires · **anonymisation or pseudonymisation** — remove or replace direct identifiers · **secure storage** — encryption, access controls, audit logs · **controlled access** — restrict to authorised personnel under binding agreements.
- **Regulatory frameworks:** **India — DPDPA 2023**, governing the processing of digital personal data · **EU — GDPR**, setting strict consent and data-handling standards with extraterritorial reach · **US — HIPAA**, governing medical data confidentiality.
- **Why minimisation is the strongest safeguard:** data never collected cannot be breached, subpoenaed, re-identified or leaked — every other control merely reduces the risk of data you chose to hold.

**Professor Speaker Notes**
Drill the anonymity–confidentiality–pseudonymisation triad, since "explain the difference and why it matters for CS research" is close to a certain short-answer item and students conflate all three. Make the re-identification point empirically: quasi-identifiers such as postcode, birth date and sex have repeatedly been shown sufficient to re-identify individuals in supposedly anonymised datasets, so claiming anonymisation is a technical assertion requiring justification. Present minimisation as the engineer's instinct that happens to be the best ethics available.

**Visual / Layout Recommendation**
Left: a three-panel distinction diagram — Identified / Pseudonymised (key held separately) / Anonymised (link destroyed) — with re-identifiability marked under each. Right: the four practices as a checklist, and a footer band with DPDPA · GDPR · HIPAA and their jurisdictions.

---

## Slide 7 — Confidentiality II: Technical Mechanisms as Ethical Instruments

**Slide Content**
- **Encryption in transit and at rest:** **TLS 1.3** for transmission, **AES-256** for storage — the baseline expectation, not an advanced measure.
- **Differential privacy:** adding calibrated noise so that the presence or absence of any single individual cannot be inferred from released results, **bounding re-identification risk mathematically** rather than by assertion.
- **Federated learning:** training models across devices or institutions **without transferring raw data** to a central server — the architecture used precisely where data cannot lawfully be pooled.
- **Secure multi-party computation:** enabling joint computation over inputs that **no party reveals to the others**.
- **Where these matter most:** health informatics, social-network analysis and behavioural analytics — the CS subfields in which confidentiality obligations are strictest and the research questions most demanding.
- **The honest caveat:** each mechanism has costs — differential privacy trades accuracy for its privacy budget, federated learning trades efficiency and introduces new leakage channels through model updates, and SMPC is computationally expensive. **None is a complete solution.**

**Professor Speaker Notes**
Make the framing point explicit: this slide is where computer science stops being a consumer of ethics rules and becomes a producer of ethical instruments, which students find genuinely motivating. Explain differential privacy's distinctive claim — it offers a *provable* guarantee under a stated budget, unlike ad-hoc de-identification, which offers only a hope. Close on the caveat, because presenting these techniques as solved problems invites the belief that a privacy-preserving pipeline discharges the consent obligation from Slide 5, which it does not.

**Visual / Layout Recommendation**
Four mechanism cards arranged by what they protect against (interception · re-identification · data centralisation · input disclosure), each with its cost stated beneath in a contrasting colour. Bordered key-highlight: "Technical safeguards reduce risk. They do not replace consent."

---

## Slide 8 — Data Fabrication and Falsification: Locating the Boundary

**Slide Content**
- **The FFP taxonomy** (ORI and most institutional policies): **fabrication** — making up data, results or records and reporting them as real · **falsification** — manipulating materials, equipment or processes, or changing, omitting or selectively reporting data so that the research is not accurately represented · **plagiarism** — appropriating another's ideas, processes, results or words without credit (Lectures 4–5).
- **Not all data modification is misconduct** — the examinable skill is locating the boundary:

  | Practice | Ethical status |
  |---|---|
  | Removing outliers with **documented statistical justification** | Generally acceptable |
  | Applying anonymisation or aggregation | Acceptable, often required |
  | Cherry-picking supportive results while omitting null findings | **Unethical** — selective reporting |
  | Generating synthetic data to fill missing records **without disclosure** | **Unethical** — fabrication |
  | Re-running an experiment until $p < 0.05$ | **Unethical** — manipulation |
  | Image manipulation that alters figure content | **Unethical** — falsification |

- **The discriminating variable is disclosure, not the operation itself:** synthetic data disclosed as synthetic is a legitimate method; the same data presented as observed is fabrication.
- **Falsification includes omission.** Note the wording of the ORI definition — *changing, omitting, or selectively reporting* — which is why leaving unfavourable runs out of a paper falls inside the definition rather than beside it.
- **Second discriminating variable is documentation:** an outlier removal you can justify in writing is method; the same removal undocumented is indistinguishable from data repair.

**Professor Speaker Notes**
Build the slide around the two discriminating variables — disclosure and documentation — because they convert a moral list into a usable test students can apply to their own analysis choices. Read the ORI falsification wording aloud so the class hears *omitting* inside the official definition; this is the single most effective correction to the belief that only invented data counts. Note that p-hacking has direct CS analogues in seed selection and hyperparameter search, which the next slide develops.

**Visual / Layout Recommendation**
Dominant six-row table with a green/red status column, and the two-variable test rendered as a decision gate beneath it: "Disclosed? Documented? → method. Otherwise → misconduct."

---

## Slide 9 — Fabrication and Falsification in Computing Practice

**Slide Content**
- **Benchmark falsification — the field's characteristic failure:** cherry-picking benchmarks, omitting unfavourable datasets, and **tuning hyperparameters on the test set** are all falsification, notwithstanding that each step looks like ordinary engineering iteration.
- **Test-set contamination deserves separate emphasis:** once the test set has informed a design decision, the reported number is a training-set estimate presented as a generalisation estimate — a misrepresentation of what the experiment measured.
- **Image manipulation:** figures in computational-biology and imaging work — western blots, microscopy — can be altered in general-purpose image editors, which is why **journals now require raw image data** alongside submitted figures.
- **The reproducibility crisis as an integrity symptom:** many published ML results cannot be replicated, in substantial part because of **undisclosed preprocessing and selective reporting** rather than outright invention.
- **Documented historical cases:** **Jan Hendrik Schön (2002)** — fabricated data across multiple semiconductor studies at Bell Labs · **Hwang Woo-suk (2004–05)** — fabricated stem-cell data, leading to retraction of high-profile papers and criminal conviction. Contemporary retractions, including benchmark manipulation and undisclosed tuning, are catalogued publicly by **Retraction Watch**.

**Professor Speaker Notes**
Spend the most time on test-set contamination, because it is the offence this cohort is most likely to commit and the one they are least likely to recognise as misconduct rather than sloppiness. Use the Schön case to make a structural point: he was prolific and celebrated before he was caught, which is why community verification rather than individual reputation is the operative safeguard. Direct students to browse the Retraction Watch database once — seeing ordinary, non-famous cases is more instructive than any single scandal.

**Visual / Layout Recommendation**
Upper half: a pipeline diagram of an ML experiment with red flags marked where falsification enters (dataset selection · hyperparameter tuning on test · metric selection · run reporting). Lower half: two compact historical case boxes (Schön, Hwang) with outcomes, and a Retraction Watch reference chip.

---

## Slide 10 — Authorship Norms: The ICMJE Criteria and Five Named Abuses

**Slide Content**
- **Why it matters:** authorship is the primary mechanism for crediting intellectual contribution — misattribution **distorts merit, undermines accountability**, and affects career progression, funding decisions and public trust.
- **The ICMJE criteria — all four required, not any one:** **1** substantial contribution to conception, design, data acquisition, analysis or interpretation · **2** drafting or critical revision for important intellectual content · **3** final approval of the version to be published · **4** **accountability for all aspects of the work**. Contributors meeting fewer than four should be **acknowledged, not listed**.
- **Five named abuses:**

  | Abuse | Description |
  |---|---|
  | **Gift authorship** | Listing senior colleagues without meaningful contribution |
  | **Guest authorship** | Adding a well-known name to enhance credibility |
  | **Ghost authorship** | Omitting a contributor whose work materially shaped the paper |
  | **Coercive authorship** | Senior authors pressuring juniors to include unrelated people |
  | **Mutual-benefit authorship** | Reciprocal name-swapping across papers without contribution |
  
- **Criterion 4 is the one students overlook:** accepting authorship means accepting answerability for the whole paper, including parts you did not produce — which is why a gift author is exposed as well as unearned.
- **COPE and ICMJE are the governing standards** that journals apply when an authorship dispute is escalated.

**Professor Speaker Notes**
Stress the conjunctive requirement — all four criteria, not a menu — because "I wrote the code, so I am an author" and "I supervised, so I am an author" are both incomplete claims under ICMJE. Use criterion 4 to reframe gift authorship as a risk to the recipient rather than a courtesy, which changes how students think about accepting an unearned byline. Note that the abuses have names precisely because they are common enough to have been catalogued by publication-ethics bodies.

**Visual / Layout Recommendation**
Left: the four ICMJE criteria as four locks that must all open, with "Acknowledgement, not authorship" as the exit path for partial contributors. Right: the five-abuse table with gift/ghost highlighted as the two most frequent in student experience.

---

## Slide 11 — Authorship in Computer Science: CRediT and Structural Tensions

**Slide Content**
- **The mismatch to resolve:** ICMJE criteria were designed around individually authored medical manuscripts, while CS research produces **collaboratively built software, datasets and infrastructure** whose contributors do not map cleanly onto drafting and revision.
- **CRediT (Contributor Roles Taxonomy) — 14 roles:** conceptualisation · methodology · **software** · validation · formal analysis · investigation · **data curation** · writing – original draft · writing – review and editing · visualisation · supervision · project administration · funding acquisition · resources.
- **Mega-author papers:** submissions at venues such as NeurIPS may carry **30 or more authors**, at which point a byline alone conveys almost no information and **per-role contribution statements become the only meaningful transparency**.
- **Advisor–student dynamics:** a student who is the primary contributor **should be listed as first author**; this is a recurring source of conflict and the asymmetry of power means the student rarely raises it. The remedy is a **documented authorship agreement before work begins**, not a negotiation after submission.
- **Practical rule for your projects:** agree roles in CRediT terms at the outset, record them in writing, and revisit them when the contribution pattern changes.

**Professor Speaker Notes**
Make the structural argument first — CS did not inherit an authorship framework fit for its artefacts, which is why CRediT matters more here than in the disciplines that wrote the original rules. Flag *software* and *data curation* as the roles this cohort most often fills without credit, and tell them naming those roles explicitly is how the contribution becomes visible. On advisor–student conflict, be candid that the power asymmetry is real and that the only reliable protection is a written agreement made before there is anything to dispute.

**Visual / Layout Recommendation**
Upper half: the 14 CRediT roles as a chip grid, with *software*, *data curation* and *validation* emphasised. Lower half: a before/after case box — a bare 30-name byline versus the same paper with a per-author role matrix — plus a "write it down first" callout for the advisor–student case.

---

## Slide 12 — Conflict of Interest: Types, Disclosure and Management

**Slide Content**
- **Definition:** a COI exists when personal, financial, professional or institutional interests **could compromise — or appear to compromise —** the objectivity, integrity or independence of the research. **Appearance is sufficient**; actual bias need not be demonstrated.
- **Five types:** **financial** — stock, consulting fees, royalties, honoraria from parties who benefit from the outcome · **personal** — close relationships with individuals or organisations · **institutional** — pressure from a funder whose product is under evaluation · **intellectual** — strongly held theoretical commitments that bias interpretation · **political or ideological** — acutely relevant in AI ethics, algorithmic fairness and policy research.
- **Disclosure requirements:** IEEE, ACM, NeurIPS and ICML all require declaration of **funding sources, employment relationships, equity interests, advisory memberships** and any other relevant relationship **within roughly the past three years**. **Failure to disclose is itself a violation, regardless of whether the research was actually biased.**
- **Five management strategies:** **disclosure** to journals, funders and ethics committees · **recusal** from review or decision-making · **independent oversight** — an external statistician or auditor verifying results · **blinding**, including double-blind review where feasible · **team recomposition** — including members without the conflict.
- **CS examples:** evaluating the safety of a self-driving system funded by its manufacturer (financial) · benchmarking against a competing library you maintain (personal/intellectual) · auditing a hiring algorithm from a company you previously consulted for (prior relationship requiring disclosure).

**Professor Speaker Notes**
Lead with the "or appear to compromise" clause, since students assume a COI must be proven to have biased the work when the standard is the reasonable observer's perception. Make the non-disclosure point sharply: the disclosure failure is a separate, independently sanctionable offence, which is why declaring is always cheaper than judging your own impartiality. Use the competing-library example, because it shows that intellectual and personal conflicts arise in open-source work with no money involved at all.

**Visual / Layout Recommendation**
Left: five COI type cards with a CS instance on each. Right: a management ladder from weakest to strongest intervention (disclose → blind → independent oversight → recompose team → recuse), with the note that disclosure is the floor. Bordered key-highlight: "Non-disclosure is itself the violation."

---

## Slide 13 — Case Studies and the Enforcement Machinery

**Slide Content**
- **Four diagnostic scenarios** (illustrative composites for teaching):

  | Scenario | Domain implicated | Lesson |
  |---|---|---|
  | A fairness paper reports a 2% demographic parity gap, computed on a **favourable dataset subset**; retracted, institutional investigation opened | Fabrication/**falsification** | Selective reporting and benchmark manipulation constitute falsification |
  | A platform runs a large-scale A/B test **manipulating the emotional valence** of users' feeds; published without explicit consent | **Informed consent**; non-maleficence | Scale does not suspend the consent obligation |
  | A company's medical writer drafts a manuscript; only academic authors are listed, and the writer cannot later be located to verify the analysis | **Authorship** (ghost) | Ghost authorship destroys accountability and breaches ICMJE |
  | A researcher praises an AI hiring tool for reducing bias; **stock options** in the vendor emerge later | **Conflict of interest** | Non-disclosure undermines the credibility of the finding |

- **Who catches these:** **Institutional Review Boards / Ethics Committees** for human-subjects protocols · **Institutional Ethics Committees** under **ICMR** guidelines in India · **Research Integrity Offices** handling misconduct allegations · **funding-agency policies** (DST, SERB, UGC) mandating ethics training and certification.
- **Consequences when violations are confirmed:** retraction of publications · blacklisting by funding agencies · termination of employment · revocation of degrees · civil or criminal liability, particularly where data-protection law is breached.
- **The public record:** platforms such as **Retraction Watch** document confirmed cases openly, functioning simultaneously as deterrent and teaching resource.
- **The interdependence point:** the second scenario implicates consent *and* confidentiality; the first implicates falsification *and* authorship accountability — **failure in one domain typically cascades into others.**

**Professor Speaker Notes**
Run this as cold-call diagnosis — give the scenario, ask which domain and which remedy, and reveal the row afterwards. Present the four scenarios as teaching composites rather than as citable incidents, and if students want documented cases, direct them to Retraction Watch and to the Schön and Hwang cases from Slide 9. Close on the cascade point, since it sets up the summary: a single decision rarely violates exactly one rule.

**Visual / Layout Recommendation**
Left two-thirds: the four-row scenario table with a domain colour chip per row matching the deck's palette. Right third: an enforcement stack (IRB/EC → Research Integrity Office → funder → public record) with the consequence list beneath it.

---

## Slide 14 — Summary, Scenarios & Discussion

**Slide Content**
- **Five domain takeaways:** **informed consent** — voluntary, informed, capacitated and documented agreement is mandatory, and committee approval does not replace participant disclosure · **confidentiality** — protect data by technical *and* procedural safeguards, and distinguish anonymity from pseudonymity · **fabrication/falsification** — honest reporting is non-negotiable, and omission is inside the definition · **authorship** — credit must track substantial intellectual contribution; use **CRediT** · **conflict of interest** — disclose all relevant interests; manage or recuse.
- **They are interdependent:** a single study may require consent, confidentiality, honest reporting, accurate attribution and COI disclosure simultaneously — and **falsification typically also misleads co-authors**, converting a data offence into an authorship and trust offence.
- **Scenario 1:** a PhD student wants to scrape user reviews from a public website for sentiment analysis. Identify the ethical concerns and propose safeguards.
- **Scenario 2:** three students collaborate; one writes the paper, the other two did coding and analysis, all three are listed. Evaluate the authorship claim against ICMJE criteria.
- **Scenario 3:** you are reviewing a conference paper and notice the lead author co-founded the startup whose product is evaluated. What do you do? · **Scenario 4:** a dataset you are using contains personal data and its terms explicitly prohibit re-identification — discuss the ethical and legal implications.
- **Higher-order prompts:** Should research ethics differ between academic and industry research? · Can informed consent be meaningfully obtained for large-scale pre-existing datasets? · How should authorship be attributed for work involving generative AI tools?

**Professor Speaker Notes**
Work Scenario 2 aloud, because the answer is genuinely arguable: coding and analysis satisfy ICMJE criterion 1 but the other three criteria — drafting or critical revision, final approval, accountability — must also be met, so the authorship stands only if all three participated in those as well. Use Scenario 3 to state the reviewer's actual obligation: declare the conflict to the chairs and recuse, rather than attempt a fair review. Note that the generative-AI prompt has no settled answer, and that a good response argues from the accountability criterion, since a tool cannot be accountable and therefore cannot be an author.

**Visual / Layout Recommendation**
Upper third: the five-domain summary table from Slide 3 reprised with takeaways substituted for risks, closing the loop. Lower two-thirds: four scenario boxes in a 2×2 grid with the higher-order prompts as a numbered footer strip.

---

## Slide 15 — Exam Preparation & Further Reading

**Slide Content**
- **Definitions examiners test directly:** fabrication · falsification · informed consent and its components · the ICMJE authorship criteria · conflict of interest.
- **Distinctions you must be able to draw:** **confidentiality vs anonymity** (and pseudonymisation) · **fabrication vs falsification** · **gift vs ghost authorship** · legitimate data transformation vs selective reporting.
- **Know the bodies and instruments:** **IRB/EC**, **ICMR** (National Ethical Guidelines, 2017), **ICMJE**, **COPE**, **ORI**, **Retraction Watch** · and the regulations **GDPR**, **DPDPA (2023)**, **HIPAA** — naming the right instrument strengthens an answer materially.
- **Answer technique:** use the **definition → principle → CS example → consequence** structure for long answers; always ground the example in computing (HCI, datasets, benchmarking, AI fairness) rather than in medical research; and state the institutional and legal ramifications, which examiners reward.
- **Expect applied items:** given a scenario, identify the violated domain, name the governing standard, and prescribe the remedy — the format of Slide 13 and Slide 14.
- **Further reading:** Belmont Report (1979) · Declaration of Helsinki (1964, rev. 2013) · ICMR National Ethical Guidelines (2017) · DPDPA India (2023) · GDPR (2018) · ICMJE Recommendations · COPE Guidelines · ORI *Introduction to RCR* · Martín-Martín et al. (2018) on credit attribution · Retraction Watch database.

**Professor Speaker Notes**
Give the four-move answer structure explicitly and insist on the CS-example step, since answers written entirely in biomedical terms lose the discipline-specific marks this course awards. Have students build the distinction pairs as flashcards — confidentiality/anonymity and fabrication/falsification are the two most reliably examined and the two most reliably confused. Close the unit by naming its arc: from why literature matters, through how to analyse it, to the ethical obligations that make the resulting knowledge trustworthy.

**Visual / Layout Recommendation**
Left two-thirds: a revision matrix with rows for the five domains and columns for *definition · key distinction · governing body · CS example*, left partially blank as a self-test. Right third: bordered "Exam Focus" panel with the four-move answer technique highlighted, and further reading as a footer list. Repeat the CO3 chip from the title slide to close the loop.
