# Lecture Deck — Approaches to Literature Review
**Course:** Research Methodology in CS (CSEG3060_3) · **Unit III:** Ethical Conduct and Literature Studies
**Lecture 2:** Systematic, Narrative, Scoping and Meta-Analytical Methods
**Mapped Course Outcome:** CO2 — Demonstrate an understanding of literature exploration and ethical considerations in conducting research.
**Duration:** 60 minutes · **Deck length:** 15 slides

*Suggested pacing:* Slides 1–2 (4 min) · Slides 3–4 (8 min) · Slides 5–8 (18 min) · Slides 9–11 (14 min) · Slides 12–14 (12 min) · Slide 15 (4 min)

---

## Slide 1 — Title Slide

**Title:** Approaches to Literature Review: Systematic, Narrative, Scoping and Meta-Analytical Methods

**Slide Content**
- Research Methodology in Computer Science — CSEG3060_3, Unit III: Ethical Conduct and Literature Studies
- Lecture 2 of the Unit III sequence · Duration: 60 minutes
- Mapped Course Outcome: **CO2** — literature exploration and ethical considerations in research
- Guiding question for the session: *"Given my research question, which review method can legitimately answer it?"*
- Instructor, department and academic session details

**Professor Speaker Notes**
Open by framing the review not as a chapter students must write to satisfy a template, but as a *method* with its own protocol, failure modes and standards of proof. State the guiding question aloud and tell students it will reappear as the decision heuristic on Slide 12, so they listen with a selection problem in mind. Note that this lecture supplies the methodological vocabulary their own project literature review will be assessed against.

**Visual / Layout Recommendation**
Full-bleed title slide. Place a faint four-quadrant background motif labelled *Systematic · Narrative · Scoping · Meta-Analysis* to pre-announce the deck's structure; CO2 tag as a coloured chip in the lower-right corner.

---

## Slide 2 — Learning Objectives & Lecture Agenda

**Slide Content**
- **Objective 1:** Define and distinguish the four principal review approaches — systematic, narrative, scoping, meta-analytical.
- **Objective 2:** Identify the methodological steps required to execute each approach.
- **Objective 3:** Evaluate which approach is appropriate for a given CS research question.
- **Objective 4:** Apply reporting standards (PRISMA, PRISMA-S, PRISMA-ScR) to structure and report a review.
- **Objective 5:** Critically appraise published reviews for methodological rigour.
- **Agenda:** Foundations → Four approaches in depth → Comparative synthesis → SLR workflow → Cybersecurity case study → Exam focus

**Professor Speaker Notes**
Read the five objectives as the assessment contract for this lecture: examination items will ask students to *differentiate*, *select* and *critique*, not merely to recall definitions. Highlight that Objective 5 — critical appraisal — is the highest-order skill and is exercised in the case study on Slide 14. Signal that the comparative table on Slide 12 is the single most examinable artefact in the deck.

**Visual / Layout Recommendation**
Two-column layout: left column the five objectives numbered with Bloom-level verbs colour-coded (Define/Identify = blue, Evaluate/Apply/Appraise = amber); right column a vertical agenda timeline with minute allocations.

---

## Slide 3 — What a Literature Review Is — and What It Is Not

**Slide Content**
- **Definition:** a *critical, structured and reproducible survey* of scholarly publications — a **synthesis**, not a descriptive summary of what each paper said.
- **Four legitimate functions:** maps the intellectual terrain; exposes gaps, contradictions and unresolved questions; justifies the contribution of new work; supplies theoretical and empirical grounding for hypotheses.
- **Why method choice matters:** it determines the **breadth and depth** of evidence, the **reproducibility** of search and synthesis, the **type of inference** permitted (qualitative vs. quantitative), and the **defensibility** of claims under peer review.
- **Disciplinary urgency:** computer science output roughly doubles every five years — an unmethodical search is now guaranteed to be an unrepresentative one.
- **Contrast to reject:** an annotated bibliography *lists and describes*; a review *aggregates, compares, adjudicates and concludes*.

**Professor Speaker Notes**
This is the conceptual gate for the whole lecture: if students leave believing a review is a summary, every subsequent method becomes arbitrary procedure. Use the doubling-rate point to argue that expert intuition alone can no longer guarantee coverage in fast-moving CS subfields, which is precisely why protocolised methods migrated into the discipline. Ask for a show of hands on who has written an "annotated bibliography dressed as a review" — the honesty primes the pitfalls discussion later.

**Visual / Layout Recommendation**
Split comparison panel: left "Annotated Bibliography — paper 1, paper 2, paper 3…" as a flat list; right "Literature Review — themes, agreements, contradictions, gap" as a converging synthesis diagram. Add a small growth curve inset for the doubling-rate claim.

---

## Slide 4 — Framing the Review: Protocols, Question Formats and Reporting Standards

**Slide Content**
- **Review protocol:** a *pre-specified* plan stating the research question, inclusion/exclusion criteria, search strategy, data-extraction method and synthesis approach — the primary defence against post-hoc bias.
- **PICO** (Population, Intervention, Comparison, Outcome) — for systematic reviews and meta-analyses with quantitative outcomes.
- **PEO** (Population, Exposure, Outcome) — for narrative and scoping treatment of qualitative phenomena.
- **PCC** (Population/Participants, Concept, Context) — the canonical framing device for scoping reviews.
- **Reporting standards:** **PRISMA** (systematic reviews and meta-analyses), **PRISMA-S** (search reporting), **PRISMA-ScR** (scoping reviews) — checklists that govern *reporting quality*, and must not be mistaken for guarantees of *methodological quality*.

**Professor Speaker Notes**
Stress the distinction students most often lose in examinations: a protocol governs *what you will do*, a reporting standard governs *what you must disclose*; compliance with PRISMA does not make a weak review strong, it makes a weak review visible. Give a concrete CS PICO — population: undergraduate programming students; intervention: automated feedback tooling; comparison: manual TA feedback; outcome: assignment defect rate. Note that pre-registration of protocols (PROSPERO in health, institutional archives or OSF in CS) is becoming an expectation in empirical software engineering.

**Visual / Layout Recommendation**
Three-column comparison table for PICO / PEO / PCC with components and typical use, positioned beneath a single horizontal band listing the PRISMA family. Use a "Protocol ≠ Reporting Standard" key-highlight callout box in the margin.

---

## Slide 5 — Systematic Literature Review: Definition and Methodological Anatomy

**Slide Content**
- **Definition:** a review that uses **explicit, reproducible methods** to collate and synthesise *all* studies meeting pre-defined eligibility criteria in answer to a specific, bounded research question.
- **Pre-registered protocol** — published or institutionally archived before screening begins, fixing the criteria in advance.
- **Exhaustive, reproducible search** across multiple sources — IEEE Xplore, ACM Digital Library, Scopus, Web of Science, ScienceDirect, supplemented by Google Scholar and backward/forward citation chasing.
- **Explicit inclusion/exclusion criteria** applied in a two-phase screen; **quality appraisal** of every included study using validated instruments (JBI Critical Appraisal Tools, CASP).
- **Structured data extraction** on standardised forms, with **transparent reporting** via a PRISMA flow diagram; in CS, the canonical procedural reference is **Kitchenham & Charters (2007)**.

**Professor Speaker Notes**
Emphasise the operative word *all*: the SLR's evidentiary authority rests entirely on the claim that nothing eligible was silently omitted, which is why search strings and database lists must be published verbatim. Note that Kitchenham's guidelines — themselves the product of a systematic review of evidence-based software engineering across seven digital libraries — are the field's standard reference and are examinable by name. Mention that double screening with inter-rater agreement (e.g. Cohen's κ) is expected practice in strong software-engineering SLRs.

**Visual / Layout Recommendation**
Vertical process spine with six labelled stages (Protocol → Search → Screen → Appraise → Extract → Report), each annotated with the artefact it produces (protocol document, search log, PRISMA counts, appraisal scores, extraction table, synthesis). Key-highlight chip: "Kitchenham & Charters (2007) — the CS reference".

---

## Slide 6 — The PRISMA Flow: Record Accounting and the SLR Trade-Off

**Slide Content**
- **Four documented stages:** Identification → Screening → Eligibility → Included; every record must be accounted for, and every exclusion at the eligibility stage must carry a stated reason.
- **Record accounting identity:** with $N_i$ records identified and $N_e$ finally included,
  $$N_e = N_i - N_{d,s} - N_{d,e} - N_{d,r}, \qquad N_e \leq N_i$$
  where $N_{d,s}$, $N_{d,e}$, $N_{d,r}$ are records removed at screening, eligibility and final inclusion.
- **Strengths:** reproducible and transparent; materially reduces selection bias; licenses genuinely evidence-based conclusions.
- **Limitations:** time- and resource-intensive (typically **6–24 months**); may exclude contextually valuable grey literature (technical reports, arXiv preprints, industrial white papers); quality appraisal in CS is contested because study designs are methodologically heterogeneous.
- **Typical CS domains:** software engineering, cybersecurity, ML benchmarking studies, human–computer interaction.

**Professor Speaker Notes**
Walk the flow diagram with real numbers — for instance 3,142 identified, 2,801 excluded on title/abstract, 294 excluded at full text, 47 included — because students reproduce the diagram far more reliably once they have watched the arithmetic close. Raise the grey-literature tension honestly: in CS, excluding arXiv and industrial reports can systematically remove the most recent and most deployed evidence, so many CS SLRs now justify a deliberate grey-literature strategy. Note that the equation is simply a bookkeeping identity — it is examinable as a statement of completeness, not as a computation.

**Visual / Layout Recommendation**
Canonical PRISMA 2020 flow diagram rendered as the dominant visual with worked counts in each box, and a compact two-column Strengths/Limitations table docked beneath it.

---

## Slide 7 — Narrative Review: Interpretive Synthesis and Expert Judgement

**Slide Content**
- **Definition:** a comprehensive, discursive synthesis of a literature *without* rigidly defined search protocols — **interpretive rather than aggregative**; also termed traditional or qualitative review.
- **Methodological profile:** sources selected on the author's expertise and judgement; no registered protocol; thematic or chronological organisation; quality appraisal informal or absent; goal is breadth, contextualisation and theoretical framing.
- **Three recognised variants:** *editorial review* (short, opinion-driven); *critical review* (evaluative synthesis with an explicit argumentative stance); *state-of-the-art review* (current developments and future directions).
- **Where it appears in CS:** survey articles in *ACM Computing Surveys*; tutorial articles in *IEEE Transactions* introducing an emerging sub-field; the framing chapter of a thesis.
- **Trade-off:** flexible, theoretically deep and viable for emerging topics (**2–8 weeks**), but susceptible to selection bias, hard to replicate, and often methodologically opaque.

**Professor Speaker Notes**
Correct the common student prejudice that narrative reviews are simply lazy systematic reviews: for a three-year-old subfield with forty heterogeneous papers and no comparable metrics, expert interpretive framing is the methodologically *correct* choice. Use the *ACM Computing Surveys* federated-learning survey as the illustration — it synthesised algorithmic and systems work using expert judgement to foreground seminal contributions rather than an exhaustive protocol. Flag that the honest move is disclosure: a narrative review should state that its selection was purposive, not imply exhaustiveness it never attempted.

**Visual / Layout Recommendation**
Case box quoting the federated-learning survey example, beside a three-card row for the variants (Editorial / Critical / State-of-the-art) with a one-line purpose on each card. Use a lighter, "open" visual treatment to contrast deliberately with Slide 5's rigid process spine.

---

## Slide 8 — Scoping Review: Mapping a Heterogeneous Field

**Slide Content**
- **Definition:** a review that maps the key concepts, types of evidence and gaps in an area — the method of choice when a topic is **broad, heterogeneous or not previously reviewed**. Formalised by **Arksey & O'Malley (2005)**, refined by the **Joanna Briggs Institute**.
- **Five stages (+1):** (1) identify the research question — broad and iterative; (2) identify relevant studies — comprehensive but not exhaustive; (3) study selection using *post-hoc* criteria; (4) charting the data in tabular form; (5) collating, summarising and reporting results descriptively and thematically. **Optional stage 6: stakeholder consultation.**
- **Question framing:** the **PCC** mnemonic — Population/Participants, Concept, Context; reported under **PRISMA-ScR**.
- **CS applications:** mapping AI applications in healthcare; cataloguing privacy-preserving techniques in IoT; charting trends in quantum computing research.
- **Trade-off:** excellent for exploratory breadth and gap identification (**3–6 months**), but **does not appraise the quality** of included studies, yields less definitive findings, and can blur conceptually into a narrative review.

**Professor Speaker Notes**
Underline the two structural features that distinguish scoping from systematic work: inclusion criteria are refined *post hoc* as familiarity with the literature grows, and quality appraisal is deliberately not performed — so a scoping review can describe *what exists* but never adjudicate *what works*. Illustrate with the *Machine Learning in Cybersecurity* scoping review, which mapped intrusion detection, malware classification and threat intelligence, and surfaced adversarial robustness in real-world deployment as underexplored. Note that stage 6 consultation is valuable because practitioners routinely identify grey literature and deployment concerns absent from indexed venues.

**Visual / Layout Recommendation**
Horizontal five-stage flow with the sixth stage rendered as a dashed optional box feeding back into stages 1 and 5. Add a small PCC key-highlight chip and a case box for the cybersecurity scoping review with its gap finding called out.

---

## Slide 9 — Meta-Analysis I: Quantitative Synthesis and Effect-Size Metrics

**Slide Content**
- **Definition:** a **quantitative synthesis** that statistically combines results from multiple independent studies addressing the same question to produce a **pooled effect estimate** — a systematic review is its necessary precondition, not its alternative.
- **Continuous outcomes — standardised mean difference:**
  $$\mathrm{SMD} = \frac{\bar{X}_1 - \bar{X}_2}{s_{\text{pooled}}}, \qquad s_{\text{pooled}} = \sqrt{\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}}$$
- **Binary outcomes — odds ratio** from a $2\times2$ contingency table: $\mathrm{OR} = \dfrac{a\cdot d}{b\cdot c}$.
- **Feasibility condition:** studies must report *commensurable* outcomes with dispersion statistics — incompatible metrics, missing variances or incomparable constructs make pooling illegitimate rather than merely difficult.
- **CS applications:** empirical software engineering (e.g. pair programming and defect density); educational data mining (intelligent tutoring effects); HCI (interface design and task-completion time).

**Professor Speaker Notes**
Make the dependency explicit: every defensible meta-analysis sits on top of a systematic search, so the two methods are stacked rather than parallel — a point examiners like to probe. Standardisation is the conceptual key: dividing by the pooled standard deviation converts a raw millisecond or defect-count difference into a unitless quantity that can be averaged across studies with different scales. Cite the Hannay et al. meta-analysis of software development practices as the field's accessible exemplar, pooling effect sizes across dozens of empirical studies on practices such as code review and test-driven development.

**Visual / Layout Recommendation**
Equation panel with each symbol annotated in plain language beside it, plus a small labelled $2\times2$ contingency table ($a,b,c,d$) to anchor the odds-ratio formula. Add a "Meta-analysis = SLR + statistical pooling" key-highlight banner across the top.

---

## Slide 10 — Meta-Analysis II: Fixed-Effect and Random-Effects Pooling

**Slide Content**
- **Fixed-effect model** — assumes a single true effect size across studies; all divergence is sampling error:
  $$\hat{\theta}_{\text{FE}} = \frac{\sum_{i=1}^{k} w_i \hat{\theta}_i}{\sum_{i=1}^{k} w_i}, \qquad w_i = \frac{1}{\operatorname{Var}(\hat{\theta}_i)}$$
- **Random-effects model** — assumes true effects *vary* across studies; adds between-study variance $\tau^2$ to each weight:
  $$w_i^{\text{RE}} = \frac{1}{\operatorname{Var}(\hat{\theta}_i) + \tau^2}$$
- **DerSimonian–Laird estimator** for the between-study variance:
  $$\hat{\tau}^2 = \max\!\left(0,\ \frac{Q-(k-1)}{C}\right), \qquad C = \sum w_i - \frac{\sum w_i^2}{\sum w_i}$$
- **Interpretive consequence:** inverse-variance weighting lets precise studies dominate; as $\tau^2$ grows, weights converge, small studies gain relative influence, and the confidence interval widens.
- **Model selection rule:** fixed-effect is defensible only for near-replications under comparable conditions; the methodological and dataset heterogeneity typical of CS experiments makes **random-effects the appropriate default**.

**Professor Speaker Notes**
Frame the choice as a question about the estimand, not about statistical taste: fixed-effect asks "what is *the* effect?", random-effects asks "what is the *average* of a distribution of effects?" — and in CS, where studies differ in datasets, hardware, hyperparameters and participant pools, the second question is almost always the honest one. Show concretely how $\tau^2 = 0$ collapses the random-effects weights exactly onto the fixed-effect weights, so the two models are nested rather than rival. Warn that choosing fixed-effect in the presence of real heterogeneity produces confidence intervals that are too narrow and therefore overconfident conclusions.

**Visual / Layout Recommendation**
Side-by-side comparison panel: left "Fixed Effect — one true value" with study estimates scattered around a single vertical line; right "Random Effects — a distribution of true values" with a normal curve of true effects. Beneath, a forest plot showing how weights and the pooled interval shift between models.

---

## Slide 11 — Meta-Analysis III: Heterogeneity and Publication Bias

**Slide Content**
- **Cochran's heterogeneity statistic:** $Q = \sum_{i=1}^{k} w_i\big(\hat{\theta}_i - \hat{\theta}_{\text{FE}}\big)^2$ — weighted dispersion of study estimates about the fixed-effect pooled value, referred to a $\chi^2$ distribution on $k-1$ degrees of freedom.
- **The $I^2$ statistic** — the proportion of total variability attributable to genuine between-study differences rather than chance:
  $$I^2 = \max\!\left(0,\ \frac{Q-(k-1)}{Q}\right)\times 100\%$$
- **Interpretive bands:** $I^2 < 25\%$ low · $25\% \leq I^2 < 75\%$ moderate · $I^2 \geq 75\%$ high heterogeneity — high values demand subgroup analysis or meta-regression, not a louder pooled claim.
- **Publication bias** — the preferential publication of statistically significant results; diagnosed by **funnel plot asymmetry** and formally tested by **Egger's regression**: $t = b / SE(b)$, where $b$ regresses the standard normal deviate on precision.
- **CS-specific bias pressure:** benchmark culture rewards reporting improvements over null results, so negative findings on a popular architecture are systematically under-published.

**Professor Speaker Notes**
Insist on the conceptual definition of $I^2$ as a *ratio*, not an absolute quantity — a large $I^2$ with tightly clustered effects can be practically unimportant, while a modest $I^2$ across wildly different effect magnitudes still matters, so the statistic must be read beside the forest plot. Explain the funnel plot geometry: precise studies cluster near the top around the pooled estimate and imprecise ones fan out symmetrically below, so a missing lower-left corner indicates small negative studies that were run but never published. Connect this slide back to Unit III's ethics thread — selective reporting and selective citation are research-integrity failures, not merely statistical inconveniences.

**Visual / Layout Recommendation**
Two-panel diagram: left a symmetric funnel plot marked "no evident bias", right an asymmetric funnel with a shaded "missing studies" region. Place the $I^2$ interpretation bands as a colour-coded horizontal gauge (green/amber/red) beneath both plots.

---

## Slide 12 — Comparative Synthesis and the Decision Heuristic

**Slide Content**
- **Eight discriminating dimensions:** research question · protocol · search strategy · quality appraisal · synthesis mode · reproducibility · output · typical duration.

  | Dimension | Systematic | Narrative | Scoping | Meta-Analysis |
  |---|---|---|---|---|
  | Research question | Specific, focused | Broad, contextual | Broad, exploratory | Specific, quantitative |
  | Protocol | Pre-specified | Optional | Optional | Pre-specified |
  | Search strategy | Exhaustive | Selective | Comprehensive, iterative | Exhaustive |
  | Quality appraisal | Mandatory | Informal | Not required | Mandatory |
  | Synthesis | Qualitative or quantitative | Qualitative (thematic) | Descriptive mapping | Quantitative pooling |
  | Reproducibility | High | Low | Moderate | High |
  | Output | Evidence-based conclusions | Conceptual synthesis | Conceptual map | Pooled effect size |
  | Typical duration | 6–24 months | 2–8 weeks | 3–6 months | 3–12 months |

- **Decision heuristic:** choose **meta-analysis** when quantitative pooling is feasible and metrics are compatible; **systematic review** when a precise question demands exhaustive, reproducible synthesis; **scoping review** to map an emerging or heterogeneous field; **narrative review** for conceptual or theoretical framing without formal synthesis.
- **Fastest diagnostic pair:** *Is the question broad or precise?* and *Are the outcome metrics commensurable?* — these two answers isolate the correct method almost every time.
- **Reality check:** feasibility constraints — time, team size, database access — legitimately shape the choice and should be stated in the methods section rather than concealed.

**Professor Speaker Notes**
Tell students plainly that this table is the highest-yield artefact in the lecture and that examiners routinely test the *quality appraisal* and *reproducibility* rows, because those are where the four methods differ most consequentially. Work the heuristic live on two or three questions volunteered from the class, insisting each time that they name the deciding dimension rather than guessing the label. Reinforce that duration figures are realistic planning estimates, which is why a single-semester student project usually justifies a scoping or narrative review rather than a full SLR.

**Visual / Layout Recommendation**
Full-slide comparison table with rows colour-banded by method family, followed by a compact decision-tree flowchart implementing the heuristic (two decision diamonds: question breadth, metric compatibility) as a footer strip.

---

## Slide 13 — Practical Workflow: Executing an SLR in Computer Science, and Where Bias Enters

**Slide Content**
- **Steps 1–2 — Question and protocol:** formulate with PICO/PEO; fix search strings, databases, inclusion/exclusion criteria and appraisal instruments *before* screening. *Bias risk:* a question so narrow it guarantees a pre-decided answer.
- **Steps 3–4 — Search and screen:** query IEEE Xplore, ACM DL, Scopus, ScienceDirect and Google Scholar using Boolean logic,
  $$\text{Search string} = (\text{term}_1 \lor \text{term}_2) \land (\text{term}_3) \land \neg(\text{exclusion term})$$
  then screen in two phases — title/abstract, followed by full text. *Bias risk:* single-database reliance, over-restrictive terms, unjustified language or date limits.
- **Steps 5–6 — Extract and appraise:** standardised extraction forms capturing metadata, methodology and findings; validated checklists (JBI, CASP) applied by at least two reviewers. *Bias risk:* extraction drift and unappraised weak studies treated as equal evidence.
- **Steps 7–8 — Synthesise and report:** thematic synthesis, quantitative pooling where legitimate, reported under **PRISMA 2020**. *Bias risk:* selective citation of confirming studies and silent method reclassification.
- **Seven recurring pitfalls:** review written as an annotated bibliography · no clear research question · search bias · absent quality appraisal · selective citation · misclassified review type · unspecified and unjustified publication window.

**Professor Speaker Notes**
Present this as the operational checklist students should keep beside them while producing their own project review, adapted from Kitchenham's evidence-based software engineering guidelines. Dwell on the temporal dimension pitfall, which is endemic in CS: a review of deep learning that silently begins in 2012 has made a substantive methodological commitment and must defend it explicitly. Note that the most damaging misclassification — running a purposive, expert-judgement search and reporting it as systematic — is a reporting-integrity failure and links directly to the plagiarism and research-ethics material in this unit.

**Visual / Layout Recommendation**
Eight-step horizontal workflow across the top with a parallel red "bias enters here" annotation track running beneath each step, and the seven pitfalls listed as a numbered warning sidebar down the right-hand margin.

---

## Slide 14 — Case Study: Zero-Day Intrusion Detection Through Four Review Lenses

**Slide Content**
- **Research question:** *"What is the effectiveness of deep learning models in detecting zero-day network intrusions?"*

  | Approach | What you actually do | What you legitimately obtain |
  |---|---|---|
  | **Narrative** | Synthesise seminal deep-learning IDS work using expert judgement | Conceptual framing; identification of dominant architectures |
  | **Systematic** | Exhaustive PRISMA-governed search across CS databases | Reproducible evidence on model effectiveness across 47 primary studies |
  | **Scoping** | Map all ML applications across cybersecurity subdomains | Gaps surfaced — e.g. adversarial robustness in real deployments |
  | **Meta-Analysis** | Pool F1-scores and detection rates across comparable studies | Quantitative estimate of average performance improvement |

- **The contributions are complementary, not competing** — each answers a different question about the same literature.
- **Sequential research programme:** scoping review to locate a defensible gap → systematic review to answer the bounded question rigorously → meta-analysis where reported metrics permit pooling.
- **Feasibility caution:** pooling F1-scores across studies using different datasets, threat models and train/test splits invites exactly the methodological heterogeneity that inflates $I^2$ — report it, stratify by dataset, and resist a single triumphant pooled number.
- **Appraisal exercise:** for each row, name the one methodological weakness a hostile reviewer would attack first.

**Professor Speaker Notes**
Run this slide as guided discussion rather than exposition: give the question, ask which approach the class would choose, then reveal that a mature research programme uses three of them in sequence. Press hard on the meta-analysis row, since students find pooled performance numbers seductive — ask what it means to average F1-scores computed on NSL-KDD, CICIDS2017 and a proprietary enterprise trace, and let them reach the heterogeneity objection themselves. Close by linking the appraisal exercise to Objective 5 and to the critique question they will face in the examination.

**Visual / Layout Recommendation**
Case box headline with the research question, followed by the four-row comparison table, and a left-to-right sequential arrow diagram (Scoping → Systematic → Meta-Analysis) underneath with the narrative review shown as a framing input feeding the whole pipeline.

---

## Slide 15 — Summary, Discussion Questions and Exam Preparation

**Slide Content**
- **Four takeaways:** **Systematic** reviews deliver reproducible, protocol-driven synthesis and are the gold standard for specific bounded questions · **Narrative** reviews offer flexibility and theoretical depth for emerging or interdisciplinary topics · **Scoping** reviews map heterogeneous literatures to expose boundaries, definitions and gaps · **Meta-analyses** pool quantitative results and formally assess heterogeneity and bias.
- **Governing principle:** method follows from the *research question*, the *available evidence* and the *intended inference* — never from convenience or prestige.
- **Discussion questions:** (i) Is a systematic review *always* superior to a narrative review — defend your answer with CS examples. (ii) For *federated learning in healthcare*, would you scope or systematise, and why? (iii) What does $I^2 = 80\%$ oblige you to do before reporting a pooled estimate? (iv) Why is stakeholder consultation more valuable in CS scoping reviews than the original framework anticipated?
- **Exam focus:** master the Slide 12 comparative table · memorise the PRISMA stages and the Arksey & O'Malley five(+1) stages · be able to contrast fixed-effect vs random-effects models and interpret $I^2$ conceptually · know PRISMA vs PRISMA-ScR and their purposes · practise applying the decision heuristic to unseen research questions · practise critiquing a published review for selection bias, missing appraisal or inappropriate synthesis.
- **Numerical practice:** given three studies ($d = 0.45$, $SE = 0.10$; $d = 0.62$, $SE = 0.15$; $d = 0.38$, $SE = 0.08$), compute fixed-effect weights $w_i = 1/SE_i^2$, the pooled effect, $Q$, $I^2$, and interpret the heterogeneity.
- **Further reading:** Kitchenham & Charters (2007) · Arksey & O'Malley (2005) · Moher et al. (2009) · Tricco et al. (2018, PRISMA-ScR) · Borenstein et al. (2009) · Page et al. (2021, PRISMA 2020).

**Professor Speaker Notes**
Consolidate by returning to the guiding question from Slide 1 and having the class answer it in one sentence per method. Set the numerical exercise as compulsory homework and warn that it is the fastest way to discover whether their understanding of inverse-variance weighting is genuine or verbal. Direct students to read one published CS systematic review and one meta-analysis before the next session, since Objective 5 is assessed through critique of real papers, not recall of definitions.

**Visual / Layout Recommendation**
Four-quadrant summary card (one method per quadrant, each with a one-line takeaway), with discussion questions as a numbered strip along the bottom and exam tips in a bordered "Exam Focus" highlight box on the right. Repeat the CO2 chip from the title slide to close the loop.
