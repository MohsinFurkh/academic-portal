# Lecture Deck — Addressing Plagiarism
**Course:** Research Methodology in CS (CSEG3060_3) · **Unit III:** Ethical Conduct and Literature Studies
**Lecture 4:** Definition, Types (Direct, Self, Mosaic, Accidental) and Detection Tools
**Mapped Course Outcome:** CO3
**Programme:** B.Tech (Computer Science), Semester V · **Duration:** 60 minutes · **Deck length:** 15 slides

*Suggested pacing:* Slides 1–2 (4 min) · Slides 3–4 (8 min) · Slides 5–8 (18 min) · Slides 9–11 (12 min) · Slides 12–13 (10 min) · Slide 14 (5 min) · Slide 15 (3 min)

---

## Slide 1 — Title Slide

**Title:** Addressing Plagiarism: Definition, Types and Detection Tools

**Slide Content**
- Research Methodology in Computer Science — CSEG3060_3, Unit III: Ethical Conduct and Literature Studies
- Lecture 4 of the Unit III sequence · B.Tech (CSE), Semester V · Duration: 60 minutes
- Mapped Course Outcome: **CO3**
- Guiding claim for the session: *"Attribution is not a formatting requirement. It is the mechanism by which knowledge remains traceable."*
- Instructor, department and academic session details

**Professor Speaker Notes**
Open by naming the discomfort in the room honestly — a lecture on plagiarism is heard as an accusation unless it is framed as professional training, so present it as the craft of attribution rather than a warning about punishment. State the guiding claim and note that in computing, what must be attributed extends past prose to code, datasets, figures and model weights. Tell students the session ends with an applied review scenario of exactly the kind the examination uses.

**Visual / Layout Recommendation**
Full-bleed title slide with a faint background motif of a citation chain linking a source node to a derived work. CO3 tag as a coloured chip lower-right; guiding claim as a centred pull-quote.

---

## Slide 2 — Learning Objectives & Lecture Agenda

**Slide Content**
- **Objective 1:** Define plagiarism in academic and research contexts with precision.
- **Objective 2:** Identify and differentiate the major types — **direct, self, mosaic, accidental**.
- **Objective 3:** Apply recognised citation frameworks (APA, IEEE, ACM, MLA) to mitigate attribution errors.
- **Objective 4:** Operate common detection tools and **interpret similarity reports critically**.
- **Objective 5:** Recognise the ethical, legal and professional consequences of plagiarism in computer science research.
- **Objective 6:** Formulate institutional and personal strategies to uphold academic integrity.
- **Agenda:** Why now → Definitions and constituents → Four principal types → CS-specific forms → Detection methods → Ten safeguards → Tool landscape → Reading a similarity report → Case studies → Exam focus

**Professor Speaker Notes**
Draw attention to Objective 4, which contains the word *critically*: the most common professional error is not committing plagiarism but misreading a similarity index, in both directions. Note that Objectives 1–2 are recall-and-discriminate items while 4–6 are applied, and the examination weights the applied ones more heavily. Signal that this lecture is where Unit III turns from literature technique to ethical conduct, the pivot the unit title announces.

**Visual / Layout Recommendation**
Two-column layout: left column the six objectives with operative verbs colour-coded (Define/Identify = blue; Apply/Operate/Recognise/Formulate = amber); right column a vertical agenda timeline with minute allocations.

---

## Slide 3 — Why This Matters Now: The Changed Landscape

**Slide Content**
- **Structural shift:** digital repositories, open-access journals, generative AI tools and code-sharing platforms have transformed how knowledge is produced and consumed — accelerating innovation while **expanding the surface area for misconduct**.
- **Empirical picture:** plagiarism remains among the most frequently reported violations in higher education and a leading cause of paper retraction globally.
- **Discipline-specific trend:** a 2023 *Retraction Watch* analysis indicates plagiarism-related retractions in computer science rose approximately **38% over the preceding decade**, a significant proportion attributed to **inadequate paraphrasing and improper reuse of prior work**.
- **The CS complication:** research outputs here include **source code, algorithms, datasets and documentation** — artefacts whose boundaries of acceptable reuse are genuinely harder to define than those of prose.
- **Implication for this cohort:** the two fastest-growing categories — poor paraphrase and self-reuse — are precisely the ones students believe are not plagiarism.

**Professor Speaker Notes**
Lead with the composition of the 38% rather than the number itself: the growth is concentrated in *inadequate paraphrasing* and *improper reuse*, not in brazen copying, which means the risk to a careful student is negligence rather than dishonesty. Use the code-and-data point to pre-empt the objection that reuse is normal in computing — reuse *is* normal, and what distinguishes legitimate from illegitimate reuse is disclosure and licence compliance. Set the expectation that the lecture will supply operational rules, not moral lecturing.

**Visual / Layout Recommendation**
Split slide: left a rising bar or trend line for the 38% decade increase with the two dominant causes annotated as its drivers; right a four-icon row for the CS artefact types (code, algorithms, datasets, documentation) each labelled "attribution required".

---

## Slide 4 — Defining Plagiarism: Authoritative Definitions and Core Constituents

**Slide Content**
- **Etymology:** from Latin **plagiarius** — "kidnapper" — reflecting the historical framing of appropriated ideas as abducted property.
- **Four authoritative definitions:**

  | Source | Definition |
  |---|---|
  | **ORI (USA)** | "the appropriation of another person's ideas, processes, results, or words without giving appropriate credit" |
  | **Council of Science Editors** | using the work, ideas or words of others without proper attribution, **irrespective of intent** |
  | **IEEE Publication Policy** | "copying ideas, text, data, software, or any other material without proper citation" |
  | **UGC (India) Regulations 2018** | taking someone else's work or ideas and passing them off as one's own |

- **Four core constituents:** **originality of the source** (the material originates from a verifiable source) · **lack of attribution** (credit not commensurate with what was borrowed) · **intent or negligence** (deliberate deception *or* reckless disregard for citation norms) · **scope of appropriation** (from a phrase to an entire manuscript).
- **The decisive phrase:** *irrespective of intent*. Negligence suffices — which is why the accidental category on Slide 8 is not an excuse but a category of offence.
- **Note the breadth:** ORI and IEEE both name **processes, results, data and software**, not merely words — this is the textual basis for code and data plagiarism being plagiarism proper.

**Professor Speaker Notes**
Make students read the ORI and IEEE definitions closely enough to notice that neither is restricted to text, since this is the single most common misconception in a computing cohort. Emphasise *irrespective of intent* explicitly — most institutional policies, including UGC's, are constructed on a negligence standard rather than an intent standard. Tell them to memorise one definition verbatim, preferably ORI's, because definitional questions open this topic in examinations.

**Visual / Layout Recommendation**
Upper half: four-row definitions table with the words *processes, results, software, irrespective of intent* highlighted across the rows. Lower half: four constituent cards arranged as a chain (source → attribution failure → intent/negligence → scope), with a key-highlight chip: "Negligence is sufficient."

---

## Slide 5 — Type I: Direct Plagiarism

**Slide Content**
- **Definition:** verbatim copying of text, code, data or visual content from a source **without quotation marks, citation or any indication of the original author**.
- **Diagnostic characteristics:** identical reproduction of sentences or paragraphs · no quotation marks · complete absence of citation · usually the most blatant and most easily detected form.
- **Illustration:** a thesis paragraph reading *"Deep learning is a subset of machine learning that employs neural networks with many layers. These networks can learn complex patterns in large datasets, enabling breakthroughs in image recognition, natural language processing, and autonomous systems"* — lifted word-for-word from a published article with neither quotation marks nor citation — is direct plagiarism.
- **Quantification:** $$\text{Overlap Ratio} = \frac{\text{Matched words or phrases}}{\text{Total words or phrases in document}} \times 100\%$$ A directly copied paragraph typically yields an overlap ratio exceeding **85–90%** *within that segment*.
- **Severity:** highest — especially where copied material constitutes a substantial portion of the submission.

**Professor Speaker Notes**
Point out the deceptive innocence of the example: the copied paragraph is textbook-level content that a student may consider common knowledge, yet the specific wording belongs to its author and reproducing it verbatim is still direct plagiarism. Clarify the arithmetic of the overlap ratio — the 85–90% figure applies to the copied *segment*, not to the whole document, which is why a document-level index of 12% can still conceal a wholly copied paragraph. Note the remedy is trivially available: quotation marks plus a citation converts the offence into legitimate scholarship.

**Visual / Layout Recommendation**
Case box showing the offending paragraph twice — left marked "As submitted" in red with no marks, right marked "Corrected" in green with quotation marks and an inline citation. Overlap-ratio formula in a bordered key-highlight strip beneath.

---

## Slide 6 — Type II: Self-Plagiarism (Auto-Plagiarism)

**Slide Content**
- **Definition:** reuse of one's own previously published work, in whole or part, **without proper disclosure or citation**. Ownership of the ideas does not exempt the author from the transparency obligations of academic publishing.
- **Manifestations in CS research:** submitting the same paper to multiple journals (**duplicate publication**) · reusing substantial portions of methodology sections across papers without citation · recycling previously published datasets, code or algorithms without acknowledgement.
- **Why it is a violation despite ownership:** **misrepresentation of novelty** — reviewers and readers are led to believe the work is original · **copyright infringement** — publishers typically hold exclusive rights to the published version · **abuse of peer review** — duplicate submission wastes reviewer effort and editorial capacity.
- **Illustration:** a 2022 paper in *Journal A* on "Efficient Graph Neural Networks for Social Networks", substantially reproduced in a 2024 submission to *Conference B* without citing the earlier work, is self-plagiarism — notwithstanding common authorship.
- **Mitigation:** disclose prior related work in the cover letter *and* the manuscript · quote and cite reused exact text · obtain publisher permission where required · confine cross-manuscript overlap to cited methodology and standard references.

**Professor Speaker Notes**
Address the intuition head-on — students find this category genuinely counter-intuitive, so lead with the three harms rather than the rule, because each harm exists independently of who wrote the text. Note the legitimate and common case: a conference paper extended into a journal article is entirely acceptable *when* the extension is disclosed, the earlier paper cited and the added contribution stated, which is exactly what most venues require. Warn that the incremental-publication habit is professionally damaging even when it escapes detection.

**Visual / Layout Recommendation**
Timeline diagram: 2022 *Journal A* paper → 2024 *Conference B* submission, with a broken citation arrow marked in red between them and a green "corrected" version showing the citation arrow restored. Three-harm sidebar (novelty · copyright · peer review).

---

## Slide 7 — Type III: Mosaic (Patchwork) Plagiarism

**Slide Content**
- **Definition:** combining text, ideas or data from multiple sources with only **superficial modification** — synonym substitution, sentence restructuring, light paraphrase — and without proper citation.
- **Diagnostic characteristics:** no single source contributes a dominant share, hence "mosaic" · modifications are cosmetic and do not evidence genuine understanding · citations absent or selectively applied · detection requires **semantic** analysis rather than string matching.
- **Worked contrast.** *Original:* "Convolutional neural networks have revolutionized image classification by automatically learning hierarchical features from raw pixel data." *Mosaic version:* "CNNs have transformed image categorization by autonomously extracting multi-level representations directly from unprocessed pixel inputs." Every content word is substituted; structure, idea and intellectual contribution are unchanged — this is plagiarism.
- **Why string matching fails:** modern tools model meaning, quantifying overlap by cosine similarity over embedding vectors $$\text{Similarity}(\mathbf{u},\mathbf{v}) = \frac{\mathbf{u}\cdot\mathbf{v}}{\|\mathbf{u}\|\,\|\mathbf{v}\|}$$ where $\mathbf{u}$ and $\mathbf{v}$ represent the original and submitted passages; values above roughly **0.80** signal significant semantic overlap.
- **The operative test:** genuine paraphrase requires comprehension, restructuring of the *argument*, **and** citation — synonym substitution alone is disguise, not scholarship.

**Professor Speaker Notes**
Read both versions aloud and ask the class which is the student's own intellectual work; the answer is neither, and hearing it makes the point that a thesaurus is not a research method. Explain the cosine measure qualitatively — near-parallel vectors mean near-identical meaning regardless of surface wording, which is precisely why the "change every word" strategy now fails. Stress that this is the fastest-growing category in the retraction data from Slide 3, making it the highest-risk form for this cohort.

**Visual / Layout Recommendation**
Side-by-side text panels with substituted word pairs connected by dotted lines (revolutionized↔transformed, hierarchical↔multi-level, raw↔unprocessed) to expose the one-to-one mapping. Cosine-similarity formula with a 0-to-1 gauge marked at the 0.80 threshold beneath.

---

## Slide 8 — Type IV: Accidental Plagiarism

**Slide Content**
- **Definition:** plagiarism occurring **without intent to deceive** — arising from ignorance of citation conventions, careless note-taking or structural imitation of a source.
- **Five recognised causes:** **forgotten citations** (information reproduced without the reference having been recorded) · **improper paraphrasing** (insufficient transformation with no quotation marks) · **unintentional structural replication** (following a source's organisational outline too closely) · **cryptomnesia** (subconscious reproduction of previously encountered material believed to be original) · **misattribution** (citing a secondary source in place of the original, or the reverse).
- **Illustration:** a student summarises a Wikipedia paragraph, omits the citation because they "thought it was common knowledge", and submits it — accidental, and nonetheless plagiarism under most institutional policies.
- **The governing principle:** **absence of malicious intent does not absolve the author.** Most policies treat accidental plagiarism as a punishable offence, typically with lesser sanction on a first offence.
- **Structural remedy, not moral resolve:** because the causes are procedural, the fixes are procedural — a literature log, a reference manager, and citation capture at the moment of reading rather than at the moment of writing.

**Professor Speaker Notes**
This is the category that will actually threaten students in this room, so spend the time here rather than on deliberate misconduct. Make the procedural argument explicitly: nobody forgets a citation at the moment they read the paper, they forget it three weeks later, which means the remedy is a tool and a habit rather than better intentions. Introduce cryptomnesia carefully as a documented cognitive phenomenon and not as an available defence — it explains, but does not excuse.

**Visual / Layout Recommendation**
Five-cause diagram arranged as a funnel converging on a single "unattributed text" outcome, with the corresponding procedural remedy paired against each cause on the right. Bordered key-highlight: "No intent required. Negligence is enough."

---

## Slide 9 — CS-Specific and Emerging Forms of Plagiarism

**Slide Content**
- **Six additional recognised forms:**

  | Form | Description |
  |---|---|
  | **Idea plagiarism** | Appropriating concepts or theoretical frameworks without attribution |
  | **Code plagiarism** | Copying source code, algorithms or software components without credit — acutely relevant in CS |
  | **Data plagiarism** | Reusing datasets without permission or acknowledgement |
  | **Image plagiarism** | Reproducing figures, diagrams or screenshots without citation |
  | **Translation plagiarism** | Translating a foreign-language source and presenting it as original |
  | **AI-assisted plagiarism** | Submitting AI-generated text as one's own, or paraphrasing AI output without disclosure |

- **Code is not exempt because reuse is normal:** open-source licences (**MIT, GPL, Apache**) impose *specific attribution formats*, so copying a Stack Overflow snippet or a GitHub function without the required notice is simultaneously an academic and a licensing violation.
- **Data and images are frequently overlooked:** reusing a benchmark dataset or reproducing a figure requires acknowledgement and, often, explicit permission.
- **AI-assisted work — the live question:** venues differ, but the emerging norm is **disclosure of AI assistance plus author responsibility for verification**; unverified AI output additionally risks fabricated citations.
- **Translation plagiarism** is a real risk in multilingual research environments and is not mitigated by the change of language.

**Professor Speaker Notes**
Make the licensing point concrete, because students experience code reuse as ordinary engineering practice and are genuinely surprised that attribution obligations are legally binding rather than merely academic. On AI assistance, avoid both permissiveness and prohibition — state that the rule is venue-specific, that disclosure is the safe default, and that the author remains answerable for every claim and citation in the submitted text. Note that idea plagiarism is the hardest form to detect and the most damaging to the person whose idea it was.

**Visual / Layout Recommendation**
Six-card grid for the additional forms with the two CS-critical cards (code, AI-assisted) visually emphasised. Add a small licence-badge strip (MIT · GPL · Apache) beneath the code card with the caption "attribution is a licence term, not a courtesy".

---

## Slide 10 — How Detection Works: Five Methodological Approaches

**Slide Content**
- **Comparison of approaches:**

  | Approach | Methodology | Strengths | Limitations |
  |---|---|---|---|
  | **String matching** | Exact or near-exact text comparison | Fast, transparent | Fails on paraphrased content |
  | **Fingerprinting** | Hash-based indexing of n-grams | Efficient over large corpora | Sensitive to word-order change |
  | **Stylometry** | Statistical analysis of writing style | Detects ghostwriting | Needs substantial reference text |
  | **Semantic similarity** | NLP embedding comparison | Identifies paraphrase | Computationally intensive |
  | **Citation analysis** | Examination of citation patterns | Detects missing citations | Limited to structured documents |

- **The matching progression:** string matching catches **direct** plagiarism; fingerprinting scales that comparison to web-sized corpora; semantic similarity is what catches **mosaic** plagiarism; stylometry addresses **authorship** rather than overlap.
- **Detection capability determines offence visibility:** the fact that mosaic plagiarism was historically undetectable is why it proliferated — and why its detection now drives retraction growth.
- **Code needs its own algorithms:** identifier renaming, statement reordering and formatting changes defeat text comparison entirely, which is why **token-based and structural** methods (winnowing, fingerprinting adapted to parse structure) exist for source code.
- **Examination note:** be able to explain **n-gram fingerprinting** and **cosine similarity** qualitatively, and to pair each approach with the plagiarism type it detects.

**Professor Speaker Notes**
Organise the slide around the pairing of method to offence type, because that mapping is the examinable insight and it makes the tool landscape on the next slide predictable rather than a list to memorise. Explain fingerprinting in one sentence — hash overlapping n-grams and compare hash sets, so comparison cost becomes independent of document length. Use the code point to motivate MOSS and JPlag before naming them, so students see the algorithmic necessity rather than just the tool names.

**Visual / Layout Recommendation**
Five-row comparison table as the dominant visual, with a mapping strip beneath linking each approach to the plagiarism type it best detects (string→direct, semantic→mosaic, stylometry→ghostwriting, citation→accidental omission).

---

## Slide 11 — Ten Safeguards: Building Attribution Into the Workflow

**Slide Content**
- **Capture sources as you read:** maintain a structured **literature log** recording quotations and paraphrases with their references at the moment of reading · use **Zotero, Mendeley or EndNote** so citation data is never reconstructed from memory.
- **Master the required style:** know the style mandated by your target venue — **IEEE and ACM** for computing, APA, MLA or Chicago elsewhere — and apply it consistently.
- **Paraphrase properly:** comprehend the original, **restructure the argument**, and cite; use **quotation marks** for any verbatim text beyond standard terminology.
- **Attribute ideas, not only words:** a paraphrased concept still requires a citation · **disclose prior work** transparently when extending your own publications.
- **Respect code and tooling obligations:** honour open-source licence attribution formats (MIT, GPL, Apache) · use **AI tools responsibly**, disclosing assistance where the venue requires it and verifying all generated content against sources · run **pre-submission checks** through institutional Turnitin or iThenticate access.

**Professor Speaker Notes**
Frame these as workflow engineering rather than virtue: nine of the ten fail silently if left until the writing stage, and the single highest-leverage habit is capturing the citation at the moment of reading. Have students install a reference manager this week and note that examiners in later units will expect consistent IEEE or ACM formatting in their project reports. Point out that the pre-submission check is diagnostic rather than exculpatory — it finds negligence before a reviewer does, but running it does not license whatever it fails to flag.

**Visual / Layout Recommendation**
Workflow timeline across the slide — Read → Record → Draft → Paraphrase/Quote → Cite → Check → Submit — with the ten safeguards positioned as labelled checkpoints at the stage where each applies. Key-highlight chip: "Capture the citation while reading, not while writing."

---

## Slide 12 — The Tool Landscape: Matching Instrument to Purpose

**Slide Content**
- **Text and manuscript tools:** **Turnitin** — institutional student submissions; compares against web, student-paper repositories and publications; outputs a similarity index with highlighted matches; strong web index and LMS integration, but weak on well-paraphrased text and ideas · **iThenticate** — the publisher-side tool for manuscripts, built on the **CrossCheck** database of published scholarship, integrated with editorial workflow, subscription-based and primarily textual.
- **Lightweight and web-oriented:** **Grammarly** — convenient for early drafts with writing feedback, but a limited database · **Copyscape** — effective against unauthorised online republication, less suited to academic manuscripts · **PlagScan** — enterprise deployment with configurable sensitivity and multi-format support, smaller database · **Urkund/Ouriginal** — European institutional use, multilingual, LMS-integrated.
- **Source-code tools — essential in CS:** **MOSS (Measure of Software Similarity)** — purpose-built for code, using **winnowing and fingerprinting** adapted to programming structure, standard for programming assignments · **JPlag** — open-source, multi-language, **token-based** comparison.
- **AI-text detectors:** **GPTZero**, **Originality.ai**, **Turnitin AI Writing Detection**, **Copyleaks AI Content Detector** — estimating likelihood of machine generation from perplexity, burstiness and stylistic pattern.
- **Critical caveat:** AI-detector **reliability remains contested with documented false-positive rates** — such output is a prompt for human inquiry, never evidence of misconduct on its own.

**Professor Speaker Notes**
Insist on the examinable pairing — MOSS and JPlag for code, iThenticate for manuscripts, Turnitin for student work — because "name two code-plagiarism tools" is a standard short-answer item. Spend a moment on the false-positive caveat, since non-native English writers and heavily edited prose are disproportionately flagged by AI detectors, which makes acting on a score alone an injustice as well as a methodological error. Note that no tool detects *idea* plagiarism, which is why human review remains irreplaceable.

**Visual / Layout Recommendation**
Three-column tool map — Text/Manuscript · Code · AI-generated — with each tool as a card carrying its database and one-line use case. Red-bordered caveat box beneath the AI column: "Contested reliability. Documented false positives. Not evidence on its own."

---

## Slide 13 — Reading a Similarity Report Critically

**Slide Content**
- **The governing principle:** a **high similarity index does not by itself imply plagiarism**, and a low index does not prove its absence — the index is a pointer to passages requiring human judgement.
- **Five interpretation steps:** **identify sources** — do matches come from properly cited works? · **recognise quoted material** — exclude legitimate quotations · **exclude common knowledge** — standard terminology and accepted phrasing · **allow methodology overlap** — standard methods and equations recur legitimately across papers · **verify reference-list exclusion** is correctly configured, since bibliographies otherwise inflate the index.
- **Indicative thresholds (not universal):**

  | Similarity index | Typical interpretation |
  |---|---|
  | < 10% | Generally acceptable |
  | 10–20% | Review required |
  | 20–40% | Significant overlap; likely revision needed |
  | > 40% | High concern; major restructuring or proper citation required |

- **Policy variation is real:** thresholds are institution- and journal-specific — **IEEE permits up to 30% similarity for review articles under certain conditions**, and the **UGC Regulations 2018** set graded similarity levels with escalating consequences for theses and dissertations, beginning with a tolerance of up to 10%.
- **The two symmetric errors:** treating a 35% index from correctly cited methodology as misconduct, and treating a 6% index as clearance when that 6% is an uncited verbatim paragraph.

**Professor Speaker Notes**
Teach the two symmetric errors as the core skill of this slide, because students and inexperienced reviewers alike treat the percentage as a verdict rather than as an index to be read. Work one example aloud — a 32% report composed entirely of quoted, cited and bibliographic matches is a clean document, while a 7% report containing one uncited copied paragraph is not. Direct students to confirm their own programme's threshold and configuration rather than relying on the indicative bands, and note that the UGC levels are the operative standard for Indian dissertations.

**Visual / Layout Recommendation**
Left: the four-band threshold table as a colour-coded vertical gauge (green → amber → red). Right: two contrasting mock report cards — "32%: clean" and "7%: serious" — each with its match composition broken out, plus a footer strip naming IEEE and UGC policy variation.

---

## Slide 14 — Case Studies and Consequences

**Slide Content**
- **Case 1 — the Hwang Woo-suk affair (2004–05):** landmark *Science* papers claiming human embryonic stem-cell cloning; investigation revealed **fabricated data and duplicated figures**, alongside image reuse and uncredited appropriation of methodology. Outcome: retraction, revoked funding, criminal conviction and reform of research-integrity oversight. **Lesson:** rigorous application of detection to *figures and data* reveals what textual review misses.
- **Case 2 — self-plagiarism retraction (Springer, 2019):** a computer science paper retracted after editors identified **substantially overlapping content published in two venues without cross-citation**. **Lesson:** self-plagiarism is a serious violation even where the author owns both works; maintain a publication record and disclose related prior work.
- **Case 3 — code plagiarism in programming courses:** MOSS-based studies report that in some cohorts **15–25% of submitted programming assignments** contain significant overlap with other submissions. **Mitigations:** MOSS or JPlag screening · per-student assignment parameterisation · viva voce verification of understanding · integrity education from the first week.
- **Consequences at four levels:** **academic** — zero grade, course failure, probation, suspension, expulsion, degree revocation · **professional** — retraction, journal and conference blacklisting, loss of funding, termination · **legal** — copyright infringement suits, breach of publisher agreements, damages and injunctions · **reputational** — durable loss of credibility, difficulty securing collaborations, public retraction notices attached permanently to one's name.
- **Asymmetry worth stating:** the reputational consequence outlasts every other category, because a retraction notice is itself a permanent, indexed, citable record.

**Professor Speaker Notes**
Sequence the cases deliberately — a famous fabrication, a mundane self-plagiarism retraction, and a classroom statistic — so students see that the risk runs from the spectacular to the ordinary and that the third case describes their own cohort. Emphasise the 15–25% code-overlap figure without accusation, framing the mitigations as course design rather than surveillance. Close on the permanence asymmetry: sanctions expire, but a retraction notice is indexed forever alongside the original paper.

**Visual / Layout Recommendation**
Three stacked case boxes (one per case) with the lesson from each set in a contrasting accent colour. Right-hand column: a four-tier consequence pyramid (academic → professional → legal → reputational) with "most durable" marked at the reputational tier.

---

## Slide 15 — Summary, Discussion Questions & Exam Preparation

**Slide Content**
- **Six takeaways:** plagiarism is the **uncredited appropriation** of intellectual work — ideas, text, data and code · the principal types are **direct, self, mosaic and accidental**, differing in characteristic and severity · detection combines **fingerprinting, NLP semantic similarity and stylometry** · similarity indices demand **contextual interpretation**, not threshold arithmetic · CS raises distinctive challenges in **code plagiarism and AI-assisted authorship** · rigorous citation, reference management and pre-submission checks are the operative safeguards.
- **Applied scenario (work this one):** a manuscript reuses **four paragraphs verbatim from the authors' own 2021 conference paper** with neither citation nor quotation marks, and **paraphrases two further paragraphs from a 2019 journal article** without attribution. Classify each instance and prescribe the corrective action for each.
- **Discussion questions:** (i) Why is self-plagiarism unethical when the author owns the original work? (ii) Why do specialised tools exist for code, and how do MOSS and JPlag differ methodologically? (iii) How has generative AI changed both the definition and the detection of plagiarism, and what does it oblige of a researcher? (iv) Is a 35% similarity index ever acceptable — defend your answer.
- **Exam focus:** be precise about the **boundaries between the four types** · memorise the **ORI, IEEE and UGC** definitions · explain **n-gram fingerprinting and cosine similarity** qualitatively · pair each **tool with its use case** (MOSS → code, iThenticate → manuscripts) · expect **applied case-study items** requiring classification plus remediation · cite correctly even within examination answers.
- **Further reading:** Roig (2015), *Avoiding Plagiarism, Self-Plagiarism and Other Questionable Writing Practices* (ORI) · Anderson & Steneck (2011) · Wager (2014), *Learned Publishing* 27(1) · IEEE PSPB Operations Manual, author-ethics sections · UGC (India) Regulations 2018 on academic integrity.

**Professor Speaker Notes**
Work the applied scenario live if time permits, since it is the archetype of the examination's highest-mark item: four instances of self-plagiarism requiring citation and quotation or rewriting, and two instances of mosaic plagiarism requiring genuine paraphrase with attribution. Consolidate by returning to the guiding claim from Slide 1 — attribution keeps knowledge traceable, which is why negligence damages the record as surely as deception does. Preview that the final lecture of this unit addresses research ethics more broadly, of which attribution is one instance.

**Visual / Layout Recommendation**
Upper third: a 2×2 summary card of the four principal types with a one-line discriminator each. Middle: the applied scenario in a bordered "Work This" case box. Lower third: exam-focus checklist on the left, discussion questions numbered on the right, further reading as a compact footer. Repeat the CO3 chip from the title slide to close the loop.
