# CSEG3060 · Research Methodology in Computer Science
## Unit I — Introduction to Research Problem
### Teaching-note summary of all seven lectures

**Unit I · 9 syllabus hours · maps to CO1** (*Identify and formulate research problems using defined criteria and characteristics*).

**Syllabus text this unit must cover:** Understanding Research Problem — meaning and significance, sources and identification · Criteria and Characteristics of a Good Research Problem — essential attributes, errors in selection · Scope, Objectives and Approaches — defining scope and objectives, investigative approaches for solutions, data collection, analysis, interpretation, necessary instrumentation.

**Grounding.** Lectures 1–4 below are summarised from the delivered decks (`Lecture00`, `Unit1_L01`, `L02`, `L03`, `L04`) — terminology, hooks and examples match what students have already seen. Lectures 5–7 are drafted forward from the delivery plan and the syllabus, carrying the same vocabulary so the unit reads as one argument.

**Note on structure.** What were originally three separate hours — investigative approaches (I.7), data collection and interpretation (I.8), and instrumentation, case studies and unit review (I.9) — are now **merged into a single Lecture 7** covering research fundamentals, SMART objectives and data fundamentals. Unit I therefore ends at Lecture 7; the slot that follows it (25 Aug CCVT / 26 Aug Full Stack AI) is **Quiz 1** — 25 scenario questions, 25 marks, the full slot — and Assignment 1 is collected there.

**The spine of the unit.** One sentence per lecture, in order:

> *Research creates the future* → *a research problem is a gap you could be wrong about* → *gaps come from five findable places* → *FINER decides whether a gap is worth two semesters* → *most failures are five predictable errors* → *scope and objectives turn a question into a plan* → *five types of research, SMART objectives and a named data source turn a plan into something executable.*

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

## Lecture 7 — Fundamentals of Research, SMART Objectives and Data Fundamentals

*Merged hour. Replaces the former I.7 (investigative approaches), I.8 (data collection, analysis and interpretation) and I.9 (instrumentation, case studies and unit review). Delivery-plan topic: fundamentals of research; setting SMART objectives; data fundamentals. Pedagogy: lecture + three drills + a data-plan self-audit. Deck: `Unit I/CSEG3060_Unit1_L07_Research_Fundamentals_SMART_Objectives_Data.html`, 22 slides.*

**Framing.** Lectures 1–6 produced a bounded question with a scope. This hour supplies the three things that make it executable: the *kind* of study it is, the *promises* it makes, and the *material* it will be built from.

**Hook — three sentences about one topic.** (1) "AI coding assistants help students write code faster" — an opinion; nothing was counted, so nothing can be wrong. (2) "In a survey of 400 UPES students, 78% report weekly use" — a fact about a sample; true, checkable, and explains nothing. (3) "Assistant users finished the debugging tasks 22% faster (n = 120, 3 counterbalanced tasks) but left 1.6× more silent defects, and the speed gain did not survive adding repair time back" — a research claim: population, comparison, measure, magnitude, and an outcome that could have gone the other way. *The difference is not the subject or the technology; it is how the sentence was produced and what could refute it.*

### (a) Fundamentals of research

**Definition.** Redman & Mory's "systematized effort to gain new knowledge"; Kothari's systematic search on a defined topic; the OECD *Frascati Manual*'s creative and systematic work to increase the stock of knowledge. Every definition contains the same word: **systematic** — not clever, not novel, not difficult. *Working definition for the course:* a systematic, documented investigation producing a claim about the world that someone else could check and that could turn out to be wrong. **Six features:** systematic · empirical or logical · bias-controlled · replicable · cumulative · communicable (unpublished research is not yet research).

**Objectives of research** — keep two senses of the word apart. *Objectives of research as an activity* (Kothari's four groups): **exploratory/formulative**, **descriptive**, **diagnostic**, **hypothesis-testing**; in four verbs, research exists to **describe, explain, predict and design** — computing does a great deal of the fourth. *Your research objectives* are the three to five sentences in the proposal that say what this study will produce: a contract with the examiner, the table of contents of the results chapter, and the thing you are marked against. **The kind of objective decides the type of study**, which is the bridge into the next section.

**The five types.** *Exploratory* — "what is going on here?"; no hypothesis, small, flexible, mostly qualitative; output is a sharper question (CS: 12 interviews with clinic staff before designing a triage tool). *Descriptive* — "what is the case?"; measures and characterises without manipulating (CS: mining 50,000 repositories for how often CI is left red). *Analytical* — "what does it mean?"; takes facts already available and relates them critically (CS: re-analysing those repositories to test whether red-CI spells predict defect density, controlling for team size). *Theoretical* — "what must be true?"; proofs, bounds, models, no data collection (CS: the impossibility of deterministic asynchronous consensus with one crash fault). *Empirical* — "what actually happens?"; controlled variation, repetition, reported variance (CS: two schedulers, same workload, three seeds, mean ± SD with an effect size).

Each type has a characteristic failure, and the comparison table is what an examiner will ask for: exploratory work reported as if it proved something; descriptive work sliding into causal language; analytical work reading correlation as causation; theoretical work proving something valid about an assumption no real system satisfies; empirical work with a weak baseline and one seed.

**The point most students miss: types are axes, not boxes.** Exploratory is a *stage*, not a category. Descriptive vs analytical is about what you do *with* data; theoretical vs empirical is about where the *warrant* comes from. A measurement study is both descriptive and empirical, and asking which label it "really" is wastes the hour — ask instead what would make the claim wrong. One worked project ("does an AI assistant help first-year students debug?") is decomposed into exploratory, descriptive, empirical and analytical phases. Basic vs applied and qualitative vs quantitative are named as further axes, not as sixth and seventh types.

**Drill A (6 items).** Name the dominant type from the study description; feedback stresses that several items are arguable and the argument is the learning. Reliable shortcut given at the end: *ask what would make the claim wrong* — a bad assumption → theoretical; a different sample → descriptive; a confounder → analytical; a different baseline or seed → empirical.

### (b) Setting SMART objectives

**Aim → general objective → specific objectives.** The *aim* is the direction of travel in plain language and is allowed to be unmeasurable. The *general objective* restates the research question as a bounded intention. Three to five *specific objectives* are the steps that, completed, **discharge** it. The test that catches almost every weak set: *if I completed all your specific objectives and nothing else, would the general objective be answered?* "No, you would also need to…" names a missing objective; "yes, and more besides" names one that belongs to a different project.

**SMART, with a ten-second test per letter.** **S** — names population, task, baseline, setting; *test:* two strangers design the same study. **M** — names metric *and* threshold; *test:* you can state today the number that would count as failure. **A** — fits data, compute, skill, access and calendar, which multiply; *test:* a crude end-to-end version exists within one week. **R** — serves this question and someone would act on the answer; *test:* the so-what chain ends at a named person or group. **T** — carries a date or week number; *test:* it is a bar on the Gantt chart. A single worked objective is shown with all five letters annotated inline.

**Repair clinic** — four real student objectives rewritten: "study deep learning for medical imaging" (S, then M and T); "improve the accuracy of our classifier" (M — no baseline, no threshold, so nothing counts as failure *or* success); "build a fully autonomous campus delivery robot" (A — repaired by re-anchoring to simulation); "count weekly commits in our repository" (**R** — flawless on the other four letters and answers nothing).

**The sentence the hour turns on: SMART is a filter, not a generator.** It removes bad objectives; it does not produce good ones, and a worthless objective can pass all five letters. R is the letter students score themselves highest on and reviewers score them lowest on.

**Mechanics.** Measurable verbs (*measure, quantify, compare, characterise, evaluate, attribute, implement, validate, replicate, derive*) versus verbs naming states of mind (*understand, study, explore, look into, investigate, gain insight into*) — you cannot show an examiner that you understood something; you can show them a table. **The artefact rule:** each specific objective maps to one experiment, one table or figure, and one subsection. **Two traps SMART does not catch:** measurable but meaningless (95% accuracy where the majority class is 94% — the validity gap from Lecture 4) and achievable but trivial (shrunk until no result could surprise anyone — a task, not research). Calibration: three to five objectives for a semester; more objectives than working weeks is the commonest Assignment 2 failure.

**Drill B (6 items).** Given an objective, name the letter that fails first and worst.

### (c) Data fundamentals

**Primary vs secondary.** *Primary* — benchmark runs, instrumented systems, logs you chose to collect, questionnaires, interviews, commissioned annotation; buys exact fit, known provenance and control; costs time, money, ethics approval, recruitment, and the risk that the semester depends on people replying. *Secondary* — public datasets and benchmarks, repository and forum mining, government and administrative data, published results tables, existing organisational logs; buys scale, speed, cost and history; costs a fit gap, unknown collection bias, licence limits, stale definitions, and no way to add the variable you wish someone had recorded. **Rule: always search secondary first** — the cheapest primary study is the one you did not have to run — then ask the two questions that decide whether you may use it: *what was it collected for, and who is missing from it?* Plus the licence, always.

**Qualitative vs quantitative.** Qualitative = *meaning* (why and how; small purposive samples, coding and themes, agreement reported with a statistic such as Cohen's κ, generalises to theory not to a population). Quantitative = *magnitude* (how much, how often, is the difference real; larger samples, fixed instruments, descriptive then inferential statistics, variance and effect size). The two axes make a 2 × 2 with a worked CS example in each cell. **Mixed methods is the normal case:** qualitative work tells you what to measure, quantitative work tells you whether it holds.

**Tool 1 · Questionnaires.** *Items:* one construct per item ("is the app fast and easy?" is two questions); closed items to measure plus two or three open items to catch the unanticipated; 5- or 7-point Likert with every anchor labelled; no leading wording, jargon or double negatives; reverse-code some items to catch straight-lining; demographics last; under ten minutes. *Sampling:* state population, sampling frame and method; **convenience sampling must be declared as a limitation, never hidden**; report the response rate, because non-response bias is the default failure. *Before sending:* pilot with 5–10 people and time it; every item maps to an objective or it is deleted; scoring written down before any data is seen; Cronbach's α planned for multi-item scales; consent, anonymity, right to withdraw, and no identifier you do not need.

**Tool 2 · Observation logs.** Use when what people *do* differs from what they *say* they do — which is almost always. *Kinds:* structured (fixed coding scheme, counts and durations) vs unstructured field notes; participant vs non-participant; think-aloud as the standard interface instrument. *Guidelines:* write the coding scheme **before** observing, with an inclusion and an exclusion example per code; keep **observation and interpretation in separate columns** ("paused 14 s at the OTP field" is data; "was confused" is not); time-stamp events and log verbatim quotes; two observers on ≥ 20% of sessions with inter-rater agreement reported; observe to **saturation** and report how many sessions that took; name the observer effect and the mitigation. A six-column log line is given as a template — *ts | participant | task | code | verbatim | observer note* — with the rule that a log you cannot analyse mechanically is a diary, and a diary is not data.

**Tool 3 · System monitoring and instrumentation.** Computing's own instrument, replacing the questionnaire as the field's default tool: application logs and event streams, metrics and telemetry, traces and profilers, benchmark harnesses, hardware counters, energy meters, packet captures. *Guidelines:* fix metric **and aggregate** before collecting (p50/p95/p99, not just the mean); monotonic clock, one source across machines; sample rather than log everything, then measure and report the probe overhead; discard warm-up runs and say how many; record versions, seeds, hardware and OS with every result; keep raw per-run data, because a distribution cannot be recomputed from a mean. *Threats specific to the tool:* probe overhead, thermal throttling, cold caches, log loss under load, survivorship (only the requests that finished were logged). *Privacy:* a log becomes personal data the moment it holds a user id, an IP or content — minimise, pseudonymise, set retention, and put all three in the ethics section.

**Drill C (6 items).** Choose the instrument for a given question; the pattern the drill teaches is *machines for machine truth, observation for behaviour, questionnaires for what only a person can report, and secondary data for anything that already exists* — with two items designed so that monitoring finds *where* and observation finds *why*.

**Self-audit (12 items, six starred as non-negotiable).** Source named; **access confirmed in writing with a name and a date**; each source labelled primary/secondary and qual/quant; metric and threshold fixed before collection; test set held out before modelling and split **by group** (patient, user, repository) not by row; licence, consent and ethics recorded per source — plus six further items on sampling, piloting, item-to-objective mapping, repeatability, raw-data retention and identifier minimisation. Live scoring gives four verdicts from "an intention, not a plan" to "publication standard". **The two that end projects are access and leakage**, and the slide says so explicitly.

**Ten takeaways** close the hour, ending on: *an objective nobody can tick off, and data you cannot actually obtain, are the two ways a good research question still dies.*

**Notebook task.** Lecture log with the protocol score out of 12 · Section 3: the dominant type of your own study, justified in one sentence, plus the type of each stage · Section 4: one general objective and three specific SMART objectives, each with metric, threshold, week number and artefact · Section 8: a data table — *source | primary/secondary | qual/quant | tool | access route | licence/consent | confirmed by* — where the last column is a name and a date, not "should be fine".

---

### Sources

- `Unit I/CSEG3060_Lecture00_Why_Research_Matters.pdf`
- `Unit I/CSEG3060_Unit1_L01_Understanding_Research_Problem.pdf`
- `Unit I/CSEG3060_Unit1_L02_Sources_of_Research_Problems.pdf`
- `Unit I/CSEG3060_Unit1_L03_Identifying_and_Narrowing.pdf`
- `Unit I/CSEG3060_Unit1_L04_Criteria_FINER.pdf`
- `Unit I/CSEG3060_Unit1_L05_Errors_in_Problem_Selection.html`
- `Unit I/CSEG3060_Unit1_L06_Scope_Objectives_Hypotheses.html`
- `Unit I/CSEG3060_Unit1_L07_Research_Fundamentals_SMART_Objectives_Data.html`
- `Syllabus_RMinCS_B.Tech CSE_AY2024.pdf` — Unit I scope and CO mapping
- `CSEG3060_Course_Delivery_Plan_Aug-Dec_2026.xlsx` (via `index.html` plan data) — topics, pedagogy and assessment for I.5–I.7 and the Quiz 1 slot
