# Lecture Deck — Research Ethics: Foundational Principles
**Course:** Research Methodology in CS (CSEG3060_3) · **Unit III:** Ethical Conduct and Literature Studies
**Lecture 6:** Honesty, Objectivity, Integrity and Respect for Intellectual Property
**Mapped Course Outcome:** CO3 — Demonstrate understanding of ethical standards governing scholarly research in computer science.
**Programme:** B.Tech (Computer Science), Semester V · **Duration:** 60 minutes · **Deck length:** 15 slides

*Suggested pacing:* Slides 1–3 (7 min) · Slides 4–5 (10 min) · Slides 6–7 (11 min) · Slides 8–9 (11 min) · Slides 10–11 (10 min) · Slide 12 (5 min) · Slide 13 (4 min) · Slides 14–15 (2 min)

---

## Slide 1 — Title Slide

**Title:** Research Ethics: Honesty, Objectivity, Integrity and Respect for Intellectual Property

**Slide Content**
- Research Methodology in Computer Science — CSEG3060_3, Unit III: Ethical Conduct and Literature Studies
- Lecture 6 — the concluding lecture of Unit III · B.Tech (CSE), Semester V · Duration: 60 minutes
- Mapped Course Outcome: **CO3** — ethical standards governing scholarly research in computing
- Guiding claim for the session: *"A fabricated benchmark does not stay in the paper. It ships."*
- Instructor, department and academic session details

**Professor Speaker Notes**
Open with the guiding claim, because computing students under-estimate the propagation distance of a dishonest result — a corrupted benchmark becomes a design decision, then a product, then a policy assumption. Position this lecture as the conceptual roof over the unit: Lectures 4 and 5 addressed one specific violation and its prevention, and this session supplies the principles from which those rules derive. Note that the four principles will be examined as a system, not as four separate definitions.

**Visual / Layout Recommendation**
Full-bleed title slide with a faint background motif of four interlocking rings labelled *Honesty · Objectivity · Integrity · IP Respect*. CO3 tag as a coloured chip lower-right; guiding claim as a centred pull-quote.

---

## Slide 2 — Learning Objectives & Lecture Agenda

**Slide Content**
- **Objective 1:** Articulate the meaning and operational scope of each of the four foundational principles.
- **Objective 2:** Identify concrete ethical dilemmas computer scientists face in applying these principles.
- **Objective 3:** Distinguish **honest error** from **research misconduct**.
- **Objective 4:** Recognise the forms of intellectual property — ideas, text, code, data, models — that require respect and attribution.
- **Objective 5:** Apply ethical reasoning to ambiguous, real-world scenarios.
- **Agenda:** Why ethics in CS → Honesty → Objectivity → Integrity → Respect for IP → How the four interact and the five-test workflow → Five case studies → Exam focus

**Professor Speaker Notes**
Draw attention to Objective 5, since the examination's highest-mark items are ambiguous scenarios in which no rule mechanically resolves the case and reasoned application is what earns marks. Note that Objective 3 is the most frequently misunderstood: students assume any wrong result is misconduct, which is both false and corrosive to the culture of honest correction. Tell them the lecture ends with a five-test diagnostic they can carry into professional life.

**Visual / Layout Recommendation**
Two-column layout: left column the five objectives with operative verbs colour-coded (Articulate/Identify/Recognise = blue; Distinguish/Apply = amber); right column a vertical agenda timeline with minute allocations.

---

## Slide 3 — Why Research Ethics Matters Acutely in Computing

**Slide Content**
- **The discipline's reach:** computer science outputs increasingly shape commerce, governance, communication, healthcare and warfare — so ethical failures propagate **beyond the laboratory and the publication page**.
- **The propagation mechanism:** a fabricated algorithm, a plagiarised model or a falsified benchmark can **corrupt downstream engineering, mislead policymakers and erode public trust** in the scientific enterprise.
- **The four foundational principles:** **honesty** · **objectivity** · **integrity** · **respect for intellectual property**.
- **They are operational, not aspirational:** each is exercised daily — in designing an experiment, writing a paper, reviewing a peer's manuscript, and assigning credit on a multi-author codebase.
- **International frameworks that codify them:** the **Belmont Report** (1979) · the **Singapore Statement on Research Integrity** (2010) · the **European Code of Conduct for Research Integrity** (ALLEA, revised 2023) · the **ACM Code of Ethics and Professional Conduct** (2018).

**Professor Speaker Notes**
Make the propagation argument concrete with a chain students recognise: an inflated accuracy claim becomes a cited baseline, then a procurement criterion, then a deployed system making decisions about people. Note that the ACM Code is the document they are professionally bound by as computing practitioners, not merely an academic reference. Stress that the four principles are the *source* of the specific rules in Lectures 4 and 5 — rules are derivative, principles are generative.

**Visual / Layout Recommendation**
Left: a propagation cascade diagram — dishonest result → cited baseline → engineering decision → deployed system → public consequence. Right: four principle cards above a footer band listing the four codifying frameworks with their years.

---

## Slide 4 — Principle I: Honesty and Its Computing-Specific Failure Modes

**Slide Content**
- **Definition:** the **truthful representation of methods, procedures, data, results and contributions** — the bedrock on which the credibility of scientific knowledge rests.
- **Five obligations:** report results **as observed**, including negative and unexpected findings · disclose methodologies faithfully, **including their limitations** · avoid **fabrication** (inventing data, results or experiments) · avoid **falsification** (manipulating materials, equipment or processes, or altering or omitting data) · **report errors promptly** and correct the record.
- **Why artefacts raise the stakes:** CS research is driven by software, hardware, datasets, benchmarks and trained models, and the **reproducibility of every one of them depends on honest reporting**.
- **Failure mode 1 — selective reporting:** reporting only the best of many runs artificially inflates claimed performance gains. This is *selective honesty* — technically true statements that omit context and mislead the reader. (A 2023 audit of machine-learning papers by Oakden-Rayner et al. documents the pattern.)
- **Failure modes 2 and 3 — novelty and data:** claiming an algorithm is "novel" when it is a renamed prior method is dishonest even though it is hard to detect · reporting on a cleaned subset **without disclosing exclusions** leads reviewers to invalid conclusions.

**Professor Speaker Notes**
Spend most of this slide on selective honesty, because it is the failure mode students will actually encounter and the one they do not currently recognise as dishonesty — every sentence is true, and the paper still misleads. Connect the point to their own practice: reporting a single best run without the variance across seeds is the undergraduate version of the same offence. Note that the obligation to report *negative* findings cuts against every publication incentive, which is precisely why it must be stated as a duty.

**Visual / Layout Recommendation**
Left: five-obligation checklist with *fabrication* and *falsification* marked as the two named misconduct categories. Right: a "selective honesty" illustration — ten run results plotted, nine greyed out and one circled as "reported", with the caption "every statement true; the paper still lies".

---

## Slide 5 — Honest Error Versus Misconduct

**Slide Content**
- **The distinction rests on intent and transparency, not on being wrong.** Not every incorrect result is misconduct — science advances by correcting honest error.
- **Four discriminating dimensions:**

  | Dimension | Honest error | Misconduct |
  |---|---|---|
  | Intent | Unintentional, accidental | Willful or reckless |
  | Response to discovery | Open acknowledgment, correction | Concealment, denial |
  | Documentation | Reproducible records of process | Inconsistent, missing |
  | Frequency | Sparse and explainable | A pattern of irregularities |

- **The FFP framework:** research-integrity policy worldwide centres on **Fabrication, Falsification, Plagiarism** as the core misconduct categories; honesty is the positive disposition that prevents all three.
- **Note that "reckless" sits on the misconduct side:** negligence severe enough to disregard obvious checks is not excused by absence of intent to deceive — the same negligence standard met in Lecture 4.
- **Operational practices:** maintain a **tamper-evident research log** (version-controlled lab notebook) · preserve **raw data with metadata** indefinitely where feasible · adopt **pre-registration** for confirmatory studies · uphold **double-blind review** norms, which deflate the incentive for selective reporting.

**Professor Speaker Notes**
Teach the *response to discovery* row as the decisive one in practice: how a researcher behaves in the hour after finding their own error is the clearest available signal of character. Point out that a version-controlled notebook is the cheapest available protection, because it produces exactly the documentation that distinguishes error from misconduct if a claim is ever challenged. Reassure students explicitly that admitting an error is a professional act, not a confession — a culture that punishes correction manufactures concealment.

**Visual / Layout Recommendation**
Upper half: the four-row comparison table with the *Response to discovery* row emphasised as the practical discriminator. Lower half: FFP shown as three pillars with "Honesty" as the foundation slab beneath them, plus a four-item operational-practice strip.

---

## Slide 6 — Principle II: Objectivity as a Regulative Ideal

**Slide Content**
- **Definition:** the commitment to let **evidence — not personal interest, ideology, prior commitment or external pressure — drive** design, analysis and interpretation. It is the discipline of letting data speak even when the message is unwelcome.
- **Four obligations:** design evaluations that could **in principle falsify** the hypothesis · **avoid conflicts of interest, or disclose** them when unavoidable · distinguish **empirical observation from interpretation** · submit claims to **peer scrutiny** rather than defend them rhetorically.
- **The CS-specific illusion:** computing feels objective because it handles formal systems — yet **every layer of an empirical CS study** (dataset choice, hyperparameter selection, evaluation metric) is shaped by human judgement. Objectivity is a **regulative ideal requiring continuous effort**, not a property of the subject matter.
- **Three pressure points:** **confirmation bias in algorithm design** — emotional investment in a proposed method leads to benchmarks that unconsciously favour it; the remedy is matched baseline conditions, standard suites and reporting across the **full input distribution** rather than cherry-picked cases · **conflicts of interest** — industry funding, equity, consulting and personal relationships compromise disinterest; disclosure is necessary but **never fully neutralising** · **significance hunting** — tweaking architectures, hyperparameters, seeds or preprocessing until a result "works" corrodes objectivity even when each step is conventional.
- **Operational practices:** **pre-registered** protocols · **blinding** — whoever runs benchmarks should not know which system is the proposed one · explicit **conflict-of-interest disclosure** · **adversarial collaboration** — design the experiment a sceptic would accept.

**Professor Speaker Notes**
Lead with the illusion, since a room full of computer scientists genuinely believes objectivity is automatic in a formal discipline and will not guard against a bias they consider impossible. Make the significance-hunting point carefully: every individual action in the loop is standard practice, which is exactly why the aggregate is so hard to see and so easy to rationalise. Present adversarial collaboration as the most practical heuristic available — design the experiment your harshest reviewer would accept, before running it.

**Visual / Layout Recommendation**
Centre: a "regulative ideal" dial that must be actively held rather than set once. Around it, three pressure-point cards (confirmation bias · conflicts of interest · significance hunting) each paired with its countermeasure. Key-highlight chip: "Formal subject matter does not confer objectivity."

---

## Slide 7 — Objectivity as Competence: Reporting Uncertainty Honestly

**Slide Content**
- **Objectivity is partly a technical competence, not only a disposition** — a researcher who cannot quantify uncertainty cannot report it honestly, however good their intentions.
- **The worked claim:** "a new compiler optimisation yields a mean speedup of 12% over baseline." Without confidence intervals, standard deviations, hardware variance and sample-size justification, this is **a number but not an empirical finding**.
- **Effect size — how large is the difference?** $$\text{Cohen's } d = \frac{\mu_{\text{new}} - \mu_{\text{baseline}}}{\sigma_{\text{pooled}}}$$
- **Uncertainty — how well is it pinned down?** $$\text{95\% CI: } \bar{x} \pm t_{0.025,\,n-1}\cdot\frac{s}{\sqrt{n}}$$
- **Why both are required:** effect size without uncertainty overstates confidence; uncertainty without effect size obscures practical relevance. Together they let readers **assess the claim on its merits rather than on the author's enthusiasm**.

**Professor Speaker Notes**
Make the competence argument explicitly, because it reframes statistics from an examination hurdle into an ethical obligation — you cannot report honestly what you cannot measure. Use the 12% example live: ask how many runs, on what hardware, with what variance, and let the class watch a confident number dissolve into an unfalsifiable one. Note that this is the same statistical vocabulary introduced for meta-analysis in Lecture 2, now serving an ethical rather than a synthesis purpose.

**Visual / Layout Recommendation**
Split panel: left "12% faster" rendered as a bold bare number with a red question mark; right the same claim rendered properly with error bars, n, hardware and a confidence interval. The two formulae in a bordered key-highlight strip beneath, each annotated with the question it answers.

---

## Slide 8 — Principle III: Integrity as Consistency of Character

**Slide Content**
- **Definition and contrast:** where **honesty** pertains to specific statements and data, **integrity** pertains to the **character and consistency of the researcher** across the entire research lifecycle.
- **The operative test:** a researcher of integrity acts ethically **when no one is watching**, when peer pressure pushes the other way, and when expedience tempts compromise.
- **What integrity subsumes:** adherence to institutional and professional standards · **consistency between public statement and private conduct** · willingness to take ethical stands that are **costly** — retracting one's own work, or reporting a colleague's misconduct · the disposition to ask *"Is this the right thing to do?"* before every significant research decision.
- **Why the distinction is examinable:** honesty can be satisfied statement by statement; integrity cannot be satisfied piecemeal — it is the property of a *pattern* of conduct, which is why the frequency row on Slide 5 matters.
- **Operational practices:** adopt transparent authorship frameworks (**CRediT**) · establish **lab agreements** on data ownership and publication · **document difficult decisions and their ethical reasoning** at the time they are made.

**Professor Speaker Notes**
Anchor the slide on the honesty-versus-integrity distinction, since "define research integrity and distinguish it from honesty" is an almost certain short-answer item. Use the costly-stands bullet to make the point that integrity is only observable under pressure — conduct that costs nothing tests nothing. Recommend the documentation practice concretely: writing down why a judgement call was made, at the moment it was made, is what allows a decision to be defended years later.

**Visual / Layout Recommendation**
Left: a two-column contrast card — "Honesty: this statement, this dataset" versus "Integrity: this researcher, this career". Right: a lifecycle ring (design → conduct → analysis → authorship → publication → review → mentoring) with integrity shown as the band encircling every stage.

---

## Slide 9 — Integrity in Practice: Authorship, Mentorship and Whistleblowing

**Slide Content**
- **Authorship attribution — the CRediT taxonomy:** fourteen contributor roles (conceptualisation, methodology, software, validation, formal analysis, investigation, data curation, writing – original draft, writing – review and editing, visualisation, supervision, project administration, funding acquisition, resources). **Misattribution of these roles is an integrity violation.**
- **Two named abuses:** **gift authorship** — including someone who did not meaningfully contribute · **ghost authorship** — omitting a contributor whose work materially shaped the paper. Both are breaches, and the second is the one that harms students.
- **Order of authorship:** the CS convention of **alphabetical ordering** sometimes masks the actual contribution distribution; integrity requires **transparent disclosure when the alphabet misrepresents the work**.
- **Mentorship failures that compromise integrity:** pressuring students to keep the lab's "story" consistent in review responses · accepting authorship **in exchange for funding or lab resources** · failing to credit students whose code, datasets or experiments populate the papers.
- **Whistleblowing and its costs:** whistleblowers often face retaliation, ostracism and stalled careers, yet the practice is **essential to the integrity of the scientific system**. Institutional **ombudspersons**, confidential reporting channels and protective law (**U.S. Whistleblower Protection Act**, **EU Directive 2019/1937**) exist to mitigate the cost.

**Professor Speaker Notes**
Teach CRediT as a practical instrument rather than a list to memorise: agreeing roles in writing before submission prevents nearly every authorship dispute that reaches a supervisor. Address the power asymmetry honestly — students are the party structurally exposed to both ghost authorship and mentorship failure, and naming that openly is more useful than pretending the risk is symmetric. Note that B.Tech graduates entering industry research may genuinely face a whistleblowing decision, so knowing that protective channels exist is part of their professional preparation.

**Visual / Layout Recommendation**
Upper half: the fourteen CRediT roles as a compact chip grid, with *software*, *data curation* and *validation* highlighted as the roles students most often fill uncredited. Lower half: two case boxes — "Gift authorship" and "Ghost authorship" — beside a footer strip naming the protective mechanisms and statutes.

---

## Slide 10 — Principle IV: The Five Categories of Intellectual Property in CS

**Slide Content**
- **Definition:** respect for IP acknowledges that **ideas, expressions, methods, data and code have authors** with legitimate claims to attribution and, in some cases, to control of use and commercialisation. It bridges ethics and law — and **extends beyond what law strictly requires**.
- **A — Textual IP:** **verbatim plagiarism** (copying without quotation marks or citation) and **idea plagiarism** (paraphrasing an argument so closely that structure and substance remain the source's). CS papers are densely argumentative, so **the threshold for attribution is lower than in many other disciplines** — even a single lifted sentence is misconduct.
- **B — Software and code IP:** honour licence terms, which differ materially across **GPL, MIT, Apache and BSD** · do not re-implement a protected expressive structure after reading another team's code · **cite the libraries** used in experiments · deposit your own code under a permissive licence where possible.
- **C — Data IP:** **cite dataset creators** · respect licences (Creative Commons variants, dataset-specific terms) · never redistribute restricted-access data through side channels · **respect the consent terms** under which human-subjects data were collected.
- **D and E — Methods and marks:** unpatented algorithms still have authors, and the community convention is eponymous citation — **RSA, Dijkstra's algorithm, Adam (Kingma & Ba), Transformer (Vaswani et al.), ResNet (He et al.)** · naming a system after a competitor's trademark, or using proprietary screenshots beyond fair use, risks infringement and is in any case unprofessional.

**Professor Speaker Notes**
Emphasise the licence-difference point, since students treat "open source" as a single permission when GPL, MIT, Apache and BSD impose materially different obligations that can bind a commercial product. Use the eponymous-citation convention as a positive illustration: the field's habit of naming methods after their originators *is* respect for IP operating as ordinary professional courtesy. Flag the consent clause under data IP as the bridge to human-subjects ethics, which is where the Belmont Report's principles apply directly.

**Visual / Layout Recommendation**
Five-category grid (Text · Code · Data · Methods · Marks), each card listing its obligation and one concrete CS instance. Add a licence-badge strip (GPL · MIT · Apache · BSD · CC) beneath the code and data cards with the caption "different licences, different duties".

---

## Slide 11 — The Legal–Ethical Boundary

**Slide Content**
- **The two domains do not coincide.** IP law is *broader* than research ethics in some respects (patent law) and *narrower* in others — many forms of idea plagiarism are perfectly legal and clearly unethical.
- **Schematic comparison:**

  | Act | Legal status | Ethical status |
  |---|---|---|
  | Verbatim copying of text without citation | Generally not illegal in small amounts (fair use) | Unethical |
  | Re-implementing an algorithm after reading prior code | Generally legal | Often unethical |
  | Using a copyrighted figure in a review paper | Often permitted under fair use | Still requires citation |
  | Falsifying results | Not typically illegal | Unethical; sometimes illegal (e.g. federal grants) |
  | Stockpiling research data for years | Generally legal | May be unethical if it blocks community progress |

- **The governing rule:** the ethical principle of respect for IP operates **independently of, and often more strictly than, the legal minimum** — "it is legal" is never a sufficient answer to an ethical question.
- **Why this matters professionally:** legal compliance is assessed by counsel after the fact; ethical compliance is assessed by the community continuously, and reputational sanction does not require a court.
- **Operational practices:** track every idea, method and quotation in a **citation manager** (Zotero, Mendeley, EndNote) · run submissions through **plagiarism detection** (Turnitin, iThenticate) before submitting · maintain a **licence-awareness checklist for every dependency** · when paraphrasing, ensure **the structure as well as the wording** is your own.

**Professor Speaker Notes**
Make the "it is legal" rebuttal the centrepiece, because it is the rationalisation students and practitioners reach for most often and the table dismantles it row by row. Draw attention to the data-stockpiling row as the most interesting case: withholding data harms the community without breaking any rule, which shows that ethics addresses obligations law does not reach. Note that the operational practices are the same instruments from Lecture 5, now justified by principle rather than by policy compliance.

**Visual / Layout Recommendation**
Dominant five-row legal-versus-ethical table with the two cells colour-coded (green = permitted, red = prohibited) to make the mismatches visible at a glance. Bordered key-highlight beneath: "Legal is the floor, not the standard."

---

## Slide 12 — Synthesis: How the Four Principles Interact

**Slide Content**
- **They are not independent — a single act typically implicates all four.** **Fabricating data** is dishonest, decouples inference from evidence (objectivity), reflects a failure of character (integrity), and betrays the community's trust (IP respect in its broadest sense).
- **Second illustration:** **plagiarism** disrespects IP, is dishonest about the authorship of contribution, corrupts the integrity of the scholarly record, and **skews objectivity in the literature** by inflating apparent support for a claim.
- **The five-test diagnostic workflow for borderline decisions:** **1 Honesty test** — can I state this plainly, including what is less flattering? · **2 Objectivity test** — has the evidence, not my preference, driven this conclusion? · **3 Integrity test** — would I be comfortable if this decision were reported in the campus newspaper? · **4 IP-respect test** — have I credited sources, code, data and methods? · **5 Public-reason test** — can I justify this in a forum of respected peers?
- **How to use it:** if all five pass, the decision is almost certainly ethical; **if any fails, further reflection — or consultation with an advisor or ethics officer — is warranted.**
- **The systemic claim:** weakness in one principle weakens the whole system, which is why adherence in computing — a field whose outputs scale rapidly into society — is **constitutive of the discipline's claim to scientific status**, not an optional overlay.

**Professor Speaker Notes**
Present the workflow as the portable takeaway of the entire unit — students will not remember four definitions in five years, but they can carry five questions. Note that tests 3 and 5 are deliberately social rather than technical, because the most reliable check on a rationalisation is imagining it stated aloud to people whose judgement you respect. Emphasise that a failed test is a prompt to consult rather than a verdict of guilt; the workflow is for thinking, not for self-prosecution.

**Visual / Layout Recommendation**
Left: a Venn-style four-ring overlap diagram with "fabrication" and "plagiarism" plotted in the central region where all four rings intersect. Right: the five tests as a numbered decision checklist with a single gate at the bottom — "all pass → proceed · any fail → reflect or consult".

---

## Slide 13 — Case Studies: Diagnosing Real Scenarios

**Slide Content**
- **Five scenarios, principle and remedy:**

  | Scenario | Principle implicated | Verdict and best practice |
  |---|---|---|
  | **Trimmed benchmarks** — proposed architecture loses to three baselines; after re-runs and tuning it wins; only final results reported | **Honesty**, partly Integrity | Misconduct. Report the full set of runs, document the hyperparameter search protocol, use statistical tests |
  | **The borrowed paragraph** — a survey paragraph, synonyms swapped, no citation | **Respect for IP** (plagiarism) | High severity. Reread, set aside, rewrite in your own framing with citation — or quote verbatim with marks and citation |
  | **The ghost in the code** — student implements and evaluates; advisor adds a paragraph, puts both names on the byline, says authorship "will be sorted out later" | **Integrity** (authorship credit) | Agree authorship **before** submission under a documented policy consistent with the venue's standards |
  | **The open-source re-use trap** — a GPL library forked, modified, shipped inside closed-source product on the argument that "we wrote the changes" | **Respect for IP**, also Integrity | Derivative work; high legal exposure and a clear ethical breach. Maintain a dependency licence inventory; consult counsel |
  | **The convenient control experiment** — a known, recently published open-source baseline that outperforms the system is silently omitted "for time" | **Objectivity** | High severity. Disclose all known relevant comparators and explain any exclusion |

- **The common structure:** in four of the five cases the offending act is an **omission**, not a falsehood — which is why the honesty test on Slide 12 asks specifically about *what is less flattering*.
- **Note the escalation:** each case has a cheap preventive remedy and an expensive remedial one; the preventive remedy is always a disclosure made *before* submission.

**Professor Speaker Notes**
Run this slide as cold-call diagnosis — present each scenario, ask for the principle and the verdict, and only then reveal the row. Draw out the omission pattern explicitly, since students expect misconduct to look like lying and are genuinely surprised that four of five cases involve things left unsaid. Spend extra time on the ghost-in-the-code case, because it is the one this cohort is most likely to experience personally, and rehearse the actual sentence a student can use to raise authorship before submission.

**Visual / Layout Recommendation**
Five-row case table with a principle-colour chip per row matching the four principle colours used throughout the deck. Add a footer banner: "Four of five are omissions, not falsehoods."

---

## Slide 14 — Summary, Applied Scenarios & Discussion

**Slide Content**
- **Four takeaways:** **honesty** demands truthful reporting of methods, data and findings, and is the antidote to fabrication, falsification and selective reporting · **objectivity** demands that evidence rather than interest drives inference, requiring management of conflicts, resistance to confirmation bias, and methodological rigour · **integrity** demands consistency of conduct across the whole lifecycle, including authorship, mentorship and the willingness to defend truth at a cost · **respect for IP** demands attribution of ideas, text, code, data and methods together with licence compliance.
- **The systemic point:** the principles operate together and **weakness in one weakens the whole**; in a field whose outputs scale rapidly into society, adherence is constitutive of the discipline's scientific standing.
- **Applied scenario 1:** a co-author removes your name from the byline because they disagree with your methodological criticism. How do you proceed, and which principles are at stake?
- **Applied scenario 2:** your advisor presses you to report benchmark results from a partial dataset because "the full dataset will take too long." Identify the principles and propose a constructive course of action.
- **Applied scenario 3:** an elegant open-source implementation does almost what you need. Compare (a) fork and modify with citation, (b) reimplement from the paper's description alone, (c) use as-is and relicense — discussing the IP and integrity implications of each.
- **Discussion prompts:** Why is selective reporting a violation of honesty when no data are fabricated? · *"Objectivity is a regulative ideal, not a state"* — discuss with reference to conflicts of interest, confirmation bias and benchmark design.

**Professor Speaker Notes**
Work scenario 2 aloud if time permits, because the pressure it describes is real, asymmetric and resolvable — the constructive answer is to propose reporting the partial result *labelled as preliminary* with the full run to follow, which satisfies both the supervisor and the honesty obligation. Use scenario 3 to show that option (b), clean-room reimplementation from the paper, is ethically safest and often the most costly, which is exactly the kind of trade-off professional practice involves. Close by noting that the applied prompts are the format of the highest-mark examination items.

**Visual / Layout Recommendation**
Upper third: a four-quadrant summary card, one principle and takeaway per quadrant, reusing the deck's principle colours. Lower two-thirds: three applied scenarios as bordered "Decide" boxes, with the two discussion prompts as a numbered footer strip.

---

## Slide 15 — Exam Preparation & Further Reading

**Slide Content**
- **Revision concept map — nine clusters:** honest error vs misconduct (intent, response, documentation, frequency) · **FFP** (fabrication–falsification–plagiarism) · selective reporting vs negative-results reporting · objectivity vs confirmation bias vs conflict of interest · integrity vs honesty (character vs specific statement) · authorship (gift, ghost, alphabetical, **CRediT** roles) · IP categories (text, code, data, algorithms, trademarks) · licence compliance (GPL, MIT, Apache, BSD, CC variants) · the **five-test diagnostic workflow**.
- **Expected short-answer items:** define research **integrity** and distinguish it from **honesty** with a CS example · explain why **selective benchmark reporting** violates honesty absent any fabrication · distinguish **idea** from **verbatim** plagiarism with a literature-review example · describe the role of **CRediT** in multi-author integrity · explain why the **legal–ethical boundary** matters, with an example · state the five tests and apply them to a scenario.
- **Expected long-answer items:** discuss *"objectivity is a regulative ideal, not a state"* with reference to conflicts of interest, confirmation bias and benchmark design · analyse a case implicating **all four** principles and the institutional mechanisms that catch or correct it · compare protection of **textual, software and data IP**, and prescribe licence-attribution practice for a B.Tech project.
- **Answer technique:** name the principle, then the specific obligation breached, then the remedy — and prefer the **omission-detecting** reading of a scenario, since most examination cases turn on what was left undisclosed.
- **Further reading:** Singapore Statement on Research Integrity (2010) · European Code of Conduct for Research Integrity (ALLEA, 2023) · ACM Code of Ethics and Professional Conduct (2018) · Resnik, *What Is Ethics in Research & Why Is It Important?* (NIEHS) · Steneck, *Introduction to the Responsible Conduct of Research* (ORI) · Pineau et al., "Improving Reproducibility in Machine Learning Research," *JMLR* (2021).

**Professor Speaker Notes**
Give students the three-move answer technique explicitly — principle, breached obligation, remedy — because case-analysis answers that merely narrate the scenario lose most of the available marks. Recommend Pineau et al. as the CS-specific reading, since it connects this lecture's abstract principles to the concrete reproducibility checklists their own conference submissions will face. Close the unit by naming the arc: Lecture 1 argued that ethical research begins in the library, and Lecture 6 supplies the principles that claim rests on.

**Visual / Layout Recommendation**
Left two-thirds: the nine-cluster concept map as a compact radial diagram for revision, with the five-test workflow at its centre. Right third: a bordered "Exam Focus" panel with the answer technique highlighted and further reading as a footer list. Repeat the CO3 chip from the title slide to close the loop.
