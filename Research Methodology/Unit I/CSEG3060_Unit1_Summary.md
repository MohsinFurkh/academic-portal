# CSEG3060 · Research Methodology in Computer Science
## Unit I — Introduction to Research Problem
### Teaching-note summary of all nine lectures

**Unit I · 9 syllabus hours · maps to CO1** (*Identify and formulate research problems using defined criteria and characteristics*), with Lecture 7 also opening CO2.

**Syllabus text this unit must cover:** Understanding Research Problem — meaning and significance, sources and identification · Criteria and Characteristics of a Good Research Problem — essential attributes, errors in selection · Scope, Objectives and Approaches — defining scope and objectives, investigative approaches for solutions, data collection, analysis, interpretation, necessary instrumentation.

**Grounding.** Lectures 1–4 below are summarised from the delivered decks (`Lecture00`, `Unit1_L01`, `L02`, `L03`, `L04`) — terminology, hooks and examples match what students have already seen. Lectures 5–9 are drafted forward from the delivery plan and the syllabus, carrying the same vocabulary so the unit reads as one argument.

**The spine of the unit.** One sentence per lecture, in order:

> *Research creates the future* → *a research problem is a gap you could be wrong about* → *gaps come from five findable places* → *FINER decides whether a gap is worth two semesters* → *most failures are five predictable errors* → *scope and objectives turn a question into a plan* → *four investigative approaches turn a plan into evidence* → *data must be collected, analysed and interpreted honestly* → *instrumentation and case studies make it reproducible.*

**Four ingredients introduced in Lecture 2 and never dropped:** **baseline · dataset · metric · constraint**. Every later lecture is a way of pinning one of them down.

---

## Lecture 1 — Course Introduction; Research: Meaning, Importance, Types of Research

**Purpose.** Not a syllabus reading. The hour buys motivation: students should leave able to name one problem in the world they personally want to solve.

**Key concepts.**

*Research is how the future gets created.* The opening move is seven "how did this happen?" questions — ChatGPT, Google Search, Netflix recommendations, Tesla autonomy, Instagram reels, Git, Maps traffic prediction, zero-cost UPI. None happened by accident. Every one is the tail end of a long research chain: Perceptron 1958 → Backprop 1986 → PageRank 1998 → ImageNet/CNN 2012 → Transformer 2017 → ChatGPT 2022. **The 64-year sentence:** the product you used this morning is the last two years of a story whose first sixty years were written in papers by people whose names you do not know.

*Every product is a question, not a thing.* Google Maps = "can shortest paths be computed on a graph with millions of edges in milliseconds?" WhatsApp = "can two strangers agree on a secret key over a channel everyone can read?" ChatGPT = "can attention alone replace recurrence?" The framing is deliberate: students who see products see engineering; students who see questions see research.

*The anatomy of every research story.* **Problem → Question → Failures → Breakthrough → Impact.** The step everyone skips when retelling the story is *failures*. Six worked stories (PageRank, Transformer, AlphaGo, Git, UPI, ISRO) all show the same shape.

*Types of research (outline only, expanded in Unit II).* Basic vs applied; theoretical vs empirical vs design-oriented; qualitative vs quantitative. At this stage students need only the distinction that computing research usually mixes them — a systems paper is design plus empirical, a complexity paper is purely theoretical.

**Pedagogy.** Storytelling + Think–Pair–Share ("which single piece of technology changed your life most?" — rule: not "the internet", not "my phone") + group activity.

**Assessment.** Ungraded diagnostic mini-challenge: write three problem statements. These come back in Lecture 3 as raw material.

**Common pitfall to name early.** Students arrive good at *execution* — they have shipped apps, trained models. What the course adds is deciding *what deserves to be executed*, and defending that decision to a reviewer.

---

## Lecture 2 — Understanding Research Problems: Meaning, Significance and Need

**Hook.** The 2020 Google Health diabetic-retinopathy deployment in Thailand. Lab accuracy ~90%, on par with ophthalmologists, published in *JAMA*. In 11 clinics, the system rejected more than one in five images — poor clinic lighting made photographs "low quality" by the model's standard, and slow internet timed out uploads. Patients who had travelled for hours were sent home. Some nurses stopped using it.

**The diagnosis — and the lecture's central move.** The failure was not overfitting and not bad engineering. The *problem was defined wrongly*. Compare:

| What was actually solved | What should have been asked |
|---|---|
| "Can a CNN classify diabetic retinopathy from retinal photographs as accurately as an ophthalmologist?" | "Can an automated screening system increase the number of patients correctly triaged per day in a rural clinic with intermittent connectivity and uncontrolled lighting?" |
| Answer: yes. And it changed nothing for the patient in the queue. | Harder. Riskier. Actually useful. |

The second statement **carries its constraints inside it**. That is the whole idea.

**Definition.** *A research problem is a clearly stated gap between what is known and what needs to be known, expressed so precisely that (i) an investigation can be designed to close it, and (ii) it is possible to be wrong.*

Four components: something in the world is unsatisfactory → the literature does not tell us why or how → sharp, bounded, answerable → refutable by evidence. **The falsifiability test:** if no possible experimental result would make you say "I was wrong", you do not have a research problem.

**Task vs Project vs Research Problem** — the discriminator is *not* difficulty, duration, or whether it uses AI. It is one thing only: **is the outcome already known?**

| | Task | Project | Research Problem |
|---|---|---|---|
| Starts from | An instruction | A requirement | A gap in knowledge |
| Unknown | Nothing | How to build it | Whether it holds at all |
| Output | A completed action | A working system | A defensible claim + evidence |
| Failure means | You did not do it | It does not work | Still a result, if explained |
| Reviewer asks | "Is it done?" | "Does it work?" | "How do you know? Compared to what?" |

Sorting exercise: dark mode on the fest website = **T**; face-recognition attendance system = **P**; fine-tune BERT and report F1 = **P** (becomes **R** the moment you ask *versus what, and why*); "does attention pruning degrade accuracy more on code-mixed Hinglish than on English?" = **R**; MySQL→PostgreSQL migration = **T**; "does Copilot change defect density in first-year students' code?" = **R**.

**Take-away for students.** Convert a build-task you already have into a researchable problem by adding the four ingredients: **baseline, dataset, metric, constraint**.

---

## Lecture 3 — Sources of Research Problems and Problem Identification Techniques

**Hook.** 2006, Fei-Fei Li. Everyone in vision was tuning models on datasets of tens of thousands of images. She read the same literature and asked a different question: *what if the bottleneck is the data, not the model?* Result: ImageNet, 14M labelled images. Colleagues were unimpressed — "it is just a dataset". In 2012 AlexNet halved the error rate and the deep-learning era began. **She did not find a new answer; she found a different question in the same papers everyone had read.**

**Correcting the myth.** Research problems do not arrive as flashes of insight. Problem-finding is **a search, not a spark** — a systematic sweep of a small number of well-known places.

**The five sources.**

1. **Literature gaps** — what published work says it could not do. Four flavours: *explicit* (the authors tell you, in Future Work — easiest, most crowded); *population* (works on English / ImageNet / US data, untested on your language, users, hardware — best value for a final-year project); *contradiction* (paper A says X helps, paper B says it hurts, nobody reconciled them); *assumption* (everyone assumes Y and nobody tested Y — hardest to see, highest payoff; this is ImageNet). Read the last two paragraphs, the Threats to Validity section, OpenReview reviews, and surveys' "open challenges".
2. **Professional practice** — your own irritation, made measurable. Git (2005) came from Linus Torvalds' broken workflow, not a literature survey. Conversion chain: *irritation → measure it → is it general? → has it been solved? → problem statement.* "Our CI is so slow" becomes "can test selection cut CI time by >40% without missing regressions?" **An irritation you cannot measure stays an opinion.** This is the source final-year students underuse most.
3. **Replication** — checking what everyone assumed was true. Google Flu Trends (2008, *Nature*) overestimated flu prevalence by roughly double by 2013; Lazer et al.'s 2014 replication and critique became one of the most-cited papers on the limits of big-data prediction. They invented nothing; they checked something. A gift to students: problem already defined, success criteria already published, either outcome is a result — provided you report honestly, *including when it does reproduce*.
4. **Interdisciplinary overlap** — CS × biology (AlphaFold), medicine, law, agriculture, climate, psychology, economics, and *your* other interest. A technique routine in CS is often unheard of next door, and next door's constraints are ones CS has never had to handle.
5. **Industry pain points** — companies publish their pain in incident reports, issue trackers and engineering blogs, not papers. UPI came straight out of a plainly stated pain. Six places it is public: GitHub issues tagged `help wanted`, public post-mortems (Cloudflare, GitLab, AWS), engineering blogs (Netflix, Uber, Zerodha, Flipkart), high-view Stack Overflow questions with no accepted answer, Smart India Hackathon / ministry problem statements, and "Limitations" pages of commercial API docs.

**The identification technique — a repeatable 30-minute procedure.** (1) Pick a narrow area, 10 min — not "AI", but "hate-speech detection for Indian languages". (2) Find the newest survey, 5 min; read only its open-challenges section. (3) Pull five recent papers, 10 min; read only abstract and last two paragraphs. (4) Tabulate, 5 min: *paper | dataset | language/population | stated limitation*. **The empty cells in that table are your candidate problems.** Repeat weekly; it compounds.

**Three traps that eat final-year projects.** *Method-first* ("I want to use transformers, now let me find a problem") — choose the question first. *Data you cannot get* — confirm access in week 1, in writing. *The crowded gap* — you found it in a famous paper's Future Work, and so did 400 other people; fix it by combining two sources.

**The pattern worth stating aloud.** Problems sitting in two sources are strongest: one source supplies the novelty, the other the significance.

---

## Lecture 4 — Criteria of a Good Research Problem

*(In the delivery plan this hour also absorbs the narrowing funnel from deck L03 — see the note at the end of this section.)*

**Hook.** IBM Watson for Oncology vs AlphaFold. Same ambition, opposite fates. Watson's framing — "use AI to help cure cancer" — was never pinned down: which cancers, which decision, against which standard, measured how, on which population? A university audit reported spending on the order of \$62M before the project was shelved in 2017. **Nothing was ever falsifiable, so nothing was ever settled.** AlphaFold could have been framed as "use AI to solve biology". Instead: one task (3D structure from sequence), one benchmark (CASP), one metric (GDT_TS), one deadline. CASP14 in 2020 produced a median GDT_TS around 92 and organisers called the problem substantially solved. *The difference was not talent, funding or data. One of them had a scoreboard.*

**FINER** — from Hulley, Cummings & Browner, *Designing Clinical Research* (1988), still the default checklist on grant panels.

- **F · Feasible** — data, compute, time, skill, access. These **multiply**: if any one is zero, the product is zero. Students estimate coding time and forget the other four; coding is usually under a third of the total. *The one-week rule:* if you cannot produce a crude end-to-end result in one week — bad numbers, tiny sample, ugly code — the problem is probably not feasible at your scale.
- **I · Interesting** — to whom? Only you (a hobby, fine, not a thesis) → your advisor → a lab → a research community → an industry or a public. **The test that cannot be faked:** name one specific person or group who would read your result and change what they do. Not "society". Not "researchers".
- **N · Novel** — four kinds: *new answer* (asked before, answered better), *new question* (rarest, riskiest, usually not a student project), *new context* (known method, untested setting — Indic languages, low-end hardware, rural networks), *new evidence* (replication, negative results, ablations). Two false beliefs: "if a paper exists the topic is dead" and, more dangerous, "if no paper exists the topic is good" — sometimes nobody asked because the answer is obvious or useless. Realistically, student novelty comes from **new context** and **new evidence**, and that is respectable.
- **E · Ethical** — five gates, any one of which can stop you: human subjects or their data (consent + committee approval), data obtained lawfully (licence, ToS, robots.txt), misuse potential (dual use), unequal harm to a group (disaggregated evaluation). *"Publicly visible" is not "public"; "public" is not "yours to use."* Expanded in Unit III.
- **R · Relevant** — the "so what" chain, run until someone acts differently: *"our detector cuts false alerts by 40%" → so what? → "an analyst triages 60 alerts a shift instead of 100" → so what? → "the real intrusion gets looked at on day one instead of day four."* Four legal currencies: knowledge, practice, policy, cost. **Relevance theatre** is the sentence that fits every project and therefore none: "this will help society and contribute to the nation's growth."

**M · Measurable — the sixth criterion computer science adds.** *Construct → operational definition → metric → threshold.* Watch two gaps: the **validity gap** (does the metric still mean the construct?) and the **gaming gap** (can the metric be won without the construct?).

| Construct | Operational definition | Metric | Threshold |
|---|---|---|---|
| "code quality" | defects surviving review | defects / KLOC | ≤ baseline − 20% |
| "usable" | task completed unaided | completion rate, time-on-task | ≥ 85%, ≤ 90 s |
| "efficient" | inference on the target device | p95 latency, peak RAM | < 100 ms, < 512 MB |
| "fair" | error parity across groups | max group FPR gap | ≤ 5 pp |

**The scorecard.** Six rows, 1–5 each, thirty points. **The criteria multiply, they do not average — any single 1 is fatal.** Below 20, or any 1: do not start. Note that *feasibility is relative to you*: AlphaGo scores 5 for DeepMind and 1 for a final-year team.

**When a criterion fails there are only four moves.** (1) **Narrow** — shrink scope until F is true; the default move, and the one students resist. (2) **Re-anchor** — change baseline, context or population; fixes N and I. (3) **Re-measure** — replace the metric, keep the question; fixes M and often R; cheapest repair available. (4) **Abandon** — the only move for a hard ethics failure; not a defeat, a saved semester. The move that is *not* on the list: keep the problem and hope the criterion stops mattering. It surfaces at the review panel instead.

**Carried in from deck L03 (narrowing).** The narrowing funnel — *interest → field → topic → task → problem → question* — with the calibration rule: ask at each level how many distinct final-year projects would satisfy this sentence. >100 = too broad; 5–20 = a topic, not a question; **about 1 = you have a question**; 0 = over-narrowed, nobody cares. Narrow by turning **five knobs** — population, task, comparison, metric, setting — and turn about three of them; turn one and you are still too broad, turn all five and you have engineered away everything interesting. Then write it in one of **five templates**: T1 comparative (the default), T2 transfer/population, T3 explanatory, T4 feasibility/design, T5 measurement/validity — T3 and T5 being the most under-used and easiest to defend, since they need no new system. The full statement is **six moves in under 200 words**: context · gap · objective · question · hypothesis · **scope** (the box everyone skips — what you will *not* do). Finally, *cost it*: `methods × datasets × seeds × (1 + ablations) × hours_per_run`. Scope creep is multiplicative, not additive — one extra baseline can cost 45 GPU-hours.

---

## Lecture 5 — Characteristics of a Good Research Problem and Common Errors in Problem Selection

*Delivery-plan topic: "Essential attributes and errors in selection: over-scoping, unfalsifiable claims, already-solved problems, resource-blind choices." Pedagogy: lecture + error clinic.*

**Framing.** Lecture 4 gave the *filter*; this hour gives the *catalogue of failures* that produce each low score. It is diagnostic, not conceptual — students arrive holding a scorecard and their own lowest row.

**Essential attributes of a well-posed problem.** *Clear and unambiguous* (a stranger reads the sentence and pictures the same experiment you do) · *specific and bounded* (population, task, baseline, metric, setting all named) · *empirically investigable* (an experiment exists that could be run) · *falsifiable* (some result would make you say "I was wrong") · *significant* (the so-what chain terminates in someone acting differently) · *feasible within your real constraints* · *ethically defensible* · *original in at least one of the four novelty senses* · *situated* (it names three papers it stands next to).

**The five errors, mapped to the criterion each one breaks.**

1. **Over-scoping (breaks F).** "AI for healthcare", "improve the university website". Symptoms: you cannot name the dataset, cannot name the baseline, and your literature search returns 38,000 papers. The result-set size is a free diagnostic. Repair: narrow — turn the population knob first, because nobody else will have turned it the way you do.
2. **Unfalsifiable claims (breaks M, then R).** "We will improve the user experience using modern web technologies." No construct, no metric, no baseline, no threshold. Nothing could count as failure, so nothing counts as success. Repair: re-measure — three named tasks, completion rate and time-on-task, before and after, n ≥ 30.
3. **Already-solved problems (breaks N and R).** "Compare bubble sort, insertion sort and quicksort on random arrays." Settled since the 1960s. The trap is the inference "no recent papers ⇒ open problem" — absence of papers usually means *closed*, not open. Repair: re-anchor to a context nobody has measured — sorting on a specific embedded cache hierarchy, or energy per element.
4. **Resource-blind choices (breaks F).** A beautiful problem needing hospital records behind an eight-month approval, proprietary logs, or 200 GPU-hours you do not have. Three months disappear into emails nobody answers. Repair: re-anchor to a public de-identified or synthetic corpus and state the limitation honestly. **Narrowing does not fix this — a smaller slice of inaccessible data is still inaccessible.** Narrowing fixes scope, never access.
5. **Method-first framing (breaks R, then I).** "We will apply a transformer to our canteen billing data." Nothing changes for anyone if it works, and a reviewer will ask why this method. Repair: start from a person's pain — can the canteen cut the 12:30 queue? — then let the method follow.

Two more worth naming in the clinic: **implausible-result problems** ("predict next-day stock prices at 99% accuracy" — if it worked you would not be publishing it) and **metric-shopping**, changing the dataset or measure until the result looks good, which is an ethics violation revisited in Unit III.

**Error clinic format.** Students swap statements and score a neighbour's cold. What almost always happens: the neighbour scores you lower, usually on M and R, and is usually right — you have context in your head that is not in the sentence, and a reviewer only ever gets the sentence. A 1 found in week three is cheap; a 1 found in week twelve is a semester.

---

## Lecture 6 — Defining Research Scope and Research Objectives

*Delivery-plan topic: "Defining scope, delimitations and objectives: general vs specific objectives; research questions and hypotheses." Pedagogy: lecture + worksheet. **Assignment 1 released here (10 marks, CO1): research problem statement, scope and objectives — due at Lecture 8.***

**Framing.** The question is settled; this hour turns it into something executable and, crucially, something with a defensible boundary.

**Scope, delimitations, limitations — three different things students routinely merge.**

- **Scope** = the boundary you *choose*. Which population, which tasks, which datasets, which time window, which platforms. Stated as inclusions.
- **Delimitations** = the exclusions you choose, with reasons. "Three crops only; no multi-disease co-infection; no yield prediction." This is the box that stops a supervisor, an examiner, or you at 2 a.m. from quietly expanding the project.
- **Limitations** = constraints imposed on you that you did not choose — sample size, hardware, data access, a single institution's data. Declared honestly, they protect the claim; hidden, they destroy it at the viva.

**General vs specific objectives.** One **general objective** restates the research question as an intention ("to measure and explain the accuracy degradation of a PlantVillage-trained classifier on field-captured images for three Uttarakhand crops"). Three to five **specific objectives** are the steps that, if all completed, discharge it — each starting with a verb that names an observable action: *assemble* a field-captured evaluation set of n images; *reproduce* the published baseline within x points; *quantify* the top-1 drop; *attribute* the drop across background clutter, illumination and blur; *measure* on-device latency on a sub-\$80 handset.

The discipline: **use measurable verbs** — measure, compare, quantify, characterise, evaluate, attribute — and avoid *understand, explore, study, look into*, which name no observable and therefore cannot be checked off. Each specific objective should map to exactly one experiment and one table or figure in the final report; if an objective produces no artefact, it is a wish.

**Research questions and hypotheses.** The question is interrogative and neutral; the hypothesis is declarative and takes a risk. Directional ("field accuracy will drop by more than 10 points") is stronger than non-directional ("accuracy will differ"), because it can be wrong in a specific way. Where a statistical test will be used, state the null and alternative explicitly and say *before* running anything what result would count as support and what would count as refutation — pre-committing is what separates a finding from a story told after the fact.

**The chain that must hold, checked left to right.** *Problem → question → objectives → hypotheses → method → data → metric → claim.* Every link must be traceable: no objective without a question, no method without an objective, no claim without a metric. A worksheet in which students trace their own chain and find the missing link is the core activity of the hour.

**Common failures.** Objectives that are activities rather than outcomes ("study the literature", "learn PyTorch"); more objectives than weeks; an objective the chosen method cannot possibly discharge; and a scope section that lists only inclusions, leaving the project with no wall to stop against.

---

## Lecture 7 — Investigative Approaches for Solving Research Problems

*Delivery-plan topic: "Investigative approaches for solutions in computing: analytical, experimental, simulation-based and design-science approaches." Maps to CO1 **and CO2** — this is the hinge into Unit II. Pedagogy: lecture + comparison.*

**Framing.** The question is fixed and scoped. Now: what *kind of evidence* would settle it? The recurring error is choosing a method because it is familiar rather than because it answers the question.

**The four approaches.**

1. **Analytical / theoretical.** Evidence is a proof or a derived bound — complexity results, correctness proofs, information-theoretic limits, convergence guarantees. Strength: conclusions hold universally, for all inputs, with no dataset to argue about. Cost: requires a formalisable model; assumptions carry the whole argument, and an unrealistic assumption invalidates a valid proof. Typical question: *what is the lower bound on communication for this consensus protocol?*
2. **Experimental / empirical.** Evidence is measured behaviour on real systems and real data, under controlled variation. This is the default in ML, systems and software engineering. Requires: a named baseline, held-out data, controlled variables, repeated runs (**three seeds minimum, or the result is noise**), and reported variance. Strength: external validity — it worked on the real thing. Cost: results are bound to the artefacts and settings you measured. Typical question: *does method X improve metric M over baseline B on dataset D under constraint C?* — the T1 template.
3. **Simulation-based.** Evidence is behaviour of a model of the system, where the real system is inaccessible, too large, too slow, too expensive or too risky — network protocols at 10⁶ nodes, scheduling policies, cache hierarchies, epidemic or traffic models. Strength: exhaustive control, cheap sweeps of the parameter space, scenarios you could never stage. Cost: **validity is inherited from the simulator** — a result is only as good as the fidelity you can demonstrate, so validating the simulator against a small real trace is part of the work, not an optional extra.
4. **Design science / constructive.** Evidence is an artefact — a system, algorithm, framework, method or tool — plus a rigorous evaluation of it against the problem it was built for. The build alone is a project (Lecture 2); it becomes research when the artefact embodies a claim and the evaluation could refute it. Structure: *problem relevance → design → demonstration → evaluation → contribution to knowledge.* Typical question: *can a system achieve outcome O subject to constraints C1 and C2, and at what cost?* — the T4 template.

**Choosing.** The approach follows the *kind of claim* you want to defend. Claim about all inputs → analytical. Claim about behaviour under real conditions → experimental. Claim about scales or scenarios you cannot stage → simulation. Claim that something is buildable under constraints → design science. Most good computing work is a **hybrid**: build the artefact (design science), argue a bound (analytical), measure it against baselines (experimental), and stress it at scale you cannot deploy (simulation).

**Validity, introduced now and returned to in Unit II.** *Internal* — did the thing you changed cause the effect, or something else? *External* — does it hold outside your sample? *Construct* — did you measure the thing you named? *Conclusion* — do the statistics support the strength of the claim? Every approach has a characteristic failure: analytical work fails on unrealistic assumptions, experimental work on weak baselines and single seeds, simulation on unvalidated models, design science on evaluations that only demonstrate rather than test.

---

## Lecture 8 — Data Collection, Data Analysis and Interpretation

*Delivery-plan topic: data collection, analysis and interpretation. **Quiz 1 (10 marks, CO1) in the last 20 minutes; Assignment 1 due today.** Pedagogy: workshop + peer review on students' own problems.*

**Data collection.** *Primary* — you generate it: benchmark runs, instrumented systems, logs, user studies, surveys, expert annotation. *Secondary* — it exists: public datasets, repository mining (GitHub, Stack Overflow), archives, administrative data. Sampling must be stated and justified: random, stratified, purposive, convenience — and **convenience sampling must be declared as a limitation, not hidden**, since it is what most student projects actually use.

Non-negotiables before collection begins: the metric and threshold are fixed *in advance* (Lecture 4's M); a held-out test set is separated *before* any modelling and touched once; provenance, licence and consent are recorded for every source (Lecture 4's E); and the collection procedure is written down in enough detail that a stranger could repeat it. **Data leakage** is the error to name loudest — test data influencing training through preprocessing on the full set, temporal shuffling of time-ordered data, near-duplicates across splits, or tuning on the test set. It inflates results silently and invalidates everything downstream.

**Data analysis.** Start with *descriptive* work: distributions, central tendency, spread, missingness, class balance, outliers — and look at the data before modelling it, because most defects are visible in a histogram. Then *inferential*: an effect is not a result until it survives variation. Report **mean ± standard deviation over ≥ 3 seeds**, confidence intervals, and an appropriate significance test with its assumptions checked. Prefer **effect size** to p-values alone — a statistically significant 0.2% improvement is a fact about your sample size, not about your method. Correct for multiple comparisons when you test many configurations. Qualitative data (interviews, open-ended responses, code review comments) is analysed too — coding, thematic analysis, and inter-rater agreement reported with a statistic such as Cohen's κ.

**Interpretation — where most damage is done.** Four disciplines: (1) **answer the question you asked**, not the one your results happen to support; (2) **do not confuse correlation with causation** — only a controlled intervention licenses a causal claim; (3) **state limitations before someone else does**, tying each to the scope and delimitations from Lecture 6; (4) **report negative and null results honestly** — a well-run experiment that refutes your hypothesis is a result, and suppressing it is the same failure as metric-shopping. Interpretation closes the *so what* chain from Lecture 4: what should a reader now do differently, and what would change their mind back?

**Named malpractices** (previewed here, treated fully in Unit III): HARKing (hypothesising after results are known), p-hacking, cherry-picked baselines, unfair tuning budgets between your method and the comparison, and selective reporting of the best seed.

**Workshop.** Students bring their own problem statement and, in pairs, specify: exact data source and access route, sample size and sampling method, the analysis that would answer their question, and the single result that would refute their hypothesis. Peer review is scored on whether the plan is *executable by the reviewer*, not on whether it sounds impressive.

---

## Lecture 9 — Research Instrumentation, Case Studies and Unit Review

*Syllabus wording: "necessary instrumentation". Consolidation hour for Unit I.*

**Instrumentation — what it means in computing.** In the social sciences an instrument is a questionnaire or scale; in computing it is the whole apparatus that produces your numbers: benchmark suites and harnesses, profilers and timers, logging and tracing, measurement rigs (latency, memory, energy), annotation tools and guidelines, survey instruments where humans are involved, and the software stack itself — libraries, versions, random seeds, hardware.

**The instrument must be validated before it is trusted.** Ask: is it *reliable* (repeated measurement of the same thing gives the same answer — check run-to-run variance before comparing methods), is it *valid* (it measures the construct you named, not a proxy that drifts from it), and is it *unbiased* (measurement overhead, warm-up effects, thermal throttling, caching, and observer effects in user studies). A benchmark that is faster on the second run is telling you about the cache, not the algorithm.

**Reproducibility as an instrumentation requirement, not an afterthought.** Version-control everything including configs; pin dependency versions; fix and *report* seeds; script the pipeline end-to-end so a single command regenerates every table and figure; record hardware and runtime; publish data and code where licence and ethics permit; write a README that a stranger can follow. The working standard: **someone else can reproduce it** — which is exactly the "ends when" row from the Lecture 2 comparison table.

**Case studies as a method.** A case study is an in-depth investigation of a phenomenon in its real context, used when the boundary between phenomenon and context is exactly what is interesting and a controlled experiment is impossible — a single organisation's migration, one team's adoption of a tool, one deployment's failure. Rigour comes from an explicit case-selection rationale, multiple sources of evidence, **triangulation** across them, a chain of evidence from question to conclusion, and honesty about generalisability: a case study supports *analytic* generalisation to theory, not statistical generalisation to a population. Unit I's own recurring cases model this — the Thailand retinopathy deployment (a problem defined for the lab, not the clinic), Watson for Oncology vs AlphaFold (scope and measurability), Google Flu Trends (replication), ImageNet (the assumption gap), Git and UPI (practice and industry pain).

**Unit review — the ten things that must survive.**

1. A research problem is a gap you could be *wrong* about; if nothing could refute it, it is not one.
2. Task, project and research problem differ on one axis only: is the outcome already known?
3. Problem-finding is a search, not a spark — five sources, six places to look, a 30-minute procedure repeated weekly.
4. The best gaps are *assumptions*, not absences; problems sitting in two sources are strongest.
5. Narrow with the funnel and the five knobs until about one project fits; write it in a template, in under 200 words, with a scope line.
6. FINER + M is a *product*, not a sum — any single 1 is fatal, and feasibility is relative to you.
7. When a criterion fails there are four moves: narrow, re-anchor, re-measure, abandon. Hoping is not one.
8. Objectives use measurable verbs and each maps to one experiment and one artefact.
9. The investigative approach follows the kind of claim, not the method you already know.
10. Interpretation is where honesty is tested: negative results are results, and limitations are stated by you first.

**Exit check for CO1.** Every student leaves with a one-page statement — six moves, a scored FINERM card with evidence in every row, three specific objectives, a named approach, a data-access plan, and one sentence naming their project's single biggest risk *as a criterion*.

---

### Sources

- `Unit I/CSEG3060_Lecture00_Why_Research_Matters.pdf`
- `Unit I/CSEG3060_Unit1_L01_Understanding_Research_Problem.pdf`
- `Unit I/CSEG3060_Unit1_L02_Sources_of_Research_Problems.pdf`
- `Unit I/CSEG3060_Unit1_L03_Identifying_and_Narrowing.pdf`
- `Unit I/CSEG3060_Unit1_L04_Criteria_FINER.pdf`
- `Syllabus_RMinCS_B.Tech CSE_AY2024.pdf` — Unit I scope and CO mapping
- `CSEG3060_Course_Delivery_Plan_Aug-Dec_2026.xlsx` (via `index.html` plan data) — topics, pedagogy and assessment for I.5–I.8
