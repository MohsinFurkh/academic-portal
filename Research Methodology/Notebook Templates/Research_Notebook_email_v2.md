**Subject:** CSEG3060 — Research Notebook: requirement, structure and LaTeX template

Dear Students,

As part of the Research Methodology in Computer Science (CSEG3060) course, each student will maintain an individual **Research Notebook** throughout the semester.

The purpose of this notebook is to help you learn research methodology by actually developing a research idea step-by-step, rather than completing disconnected assignments. By the end of the course, your notebook should contain the complete evolution of your research idea, from identifying a problem to developing and presenting a research proposal.

---

## What should your Research Notebook contain?

Please maintain the following sections in the given order:

1. **Research Interest** – Areas/topics in Computer Science that interest you.
2. **Problem Ideas** – Potential problems that you may investigate.
3. **Problem Statement** – A clearly defined and focused research problem.
4. **Research Questions** – Questions that your research will attempt to answer.
5. **Research Objectives** – Specific and measurable objectives of the study.
6. **Literature Papers** – Relevant research papers identified and studied.
7. **Literature Matrix** – Structured comparison of the selected papers.
8. **Research Gap** – What is missing, insufficient, unexplored, or unresolved in existing research.
9. **Proposed Methodology** – How you plan to investigate the research problem.
10. **Dataset / Data Source** – Data, datasets, systems, users, experiments, or other sources required for the study.
11. **Experimental Plan** – How you will conduct the investigation and collect evidence.
12. **Evaluation Metrics** – Measures that will be used to evaluate your results.
13. **Ethical Considerations** – Ethical, privacy, security, bias, plagiarism, or other relevant research considerations.
14. **Research Proposal** – Your complete and structured research proposal.
15. **Final Presentation** – Your final presentation and key points from your research defense.

---

## A LaTeX template has been prepared for you

You do not have to build this structure yourself. A complete LaTeX template is available here:

**Research Notebook template (CCVT):**
https://prism.openai.com/?u=cc897253-4437-460f-ab85-4b9e892b47cb&pg=1&m=main.tex&d=7

*The Full Stack AI version will be shared separately. Until then, CCVT students should use the link above; Full Stack AI students may either wait for their version or use this one — the structure is identical and only the worked examples differ.*

**I will demonstrate in the next class how to open, copy and use this template.** Please do not worry about the setup for now — just have a look at the link so you know what is coming.

### What is inside the template

**All fifteen sections, already set up.** Each section is a separate file, so after a lecture you open only the one file that lecture relates to. You cannot accidentally break the rest of the document.

**Every section carries five guidance boxes:**

| Box | What it is |
|---|---|
| **What this section is for** | Read this first. It explains what the section must contain and why. |
| **Common trap** | The mistake students most often make in this particular section. |
| **Worked example** | A complete, filled-in example. **Delete it** once you have written your own. |
| **Your work** | A ready-made skeleton with tables and prompts for you to fill in. |
| **Done when** | A checklist to test your own section against before you call it finished. |

**One research idea runs through all fifteen worked examples.** They are not fifteen unrelated samples. You will see a single problem being narrowed, scored against FINER, repaired when a criterion fails, revised after the literature study, and finally defended — which is exactly what your own notebook should look like by December.

**Built-in support for showing evolution.** Two commands let you record how your thinking changed, which is a requirement (see Instruction 3 below), not decoration:

- `\version{2}{2026-09-03}{after Lecture I.6}` — stamps a dated revision. Write the new text **underneath** the old text; do not delete the old.
- `\wasnow{old wording}{new wording}` — shows a single phrase changing, with the old wording struck through.

**A landscape Literature Matrix** with a filled example above and a blank table below. Add as many rows as you need; the table breaks across pages automatically.

**A starter bibliography** (`references.bib`) containing the methodology references from our lectures and a set of papers relevant to your track. Add every paper you read to this file and cite it with `\cite{key}`.

**A lecture log** on page 3 — one line after every class. This is the simplest way for both of us to confirm that the notebook is being maintained continuously.

### Using something other than LaTeX

The template is recommended but not compulsory. If you prefer a different tool, you may use it — but your notebook must still follow the same fifteen sections, in the same order, with the same headings, and must still show the evolution of your thinking with dates.

---

## Important Instructions

**1. Maintain it individually**

The Research Notebook is an individual requirement. Even if you discuss ideas with classmates or work in a group for classroom activities, every student must maintain their own notebook and record their own understanding and progress.

**2. Add something after every lecture**

At the end of each lecture, you will be expected to add at least one meaningful piece of work to your Research Notebook, and to record it in the lecture log. For example:

- After a lecture on research problems → refine your problem statement.
- After a lecture on research questions → add or revise your research questions.
- After a literature-study lecture → add papers to your literature matrix.
- After a lecture on research methodology → improve your experimental plan.
- After an ethics lecture → document the ethical considerations of your study.

Therefore, do not wait until the end of the semester to prepare the notebook.

**3. Show the evolution of your thinking**

Your notebook should not contain only final answers. It should demonstrate how your research idea developed. For example:

*Initial idea → Problem refinement → Literature findings → Research gap → Revised research question → Methodology → Final proposal*

Changes and improvements are a normal and important part of research. In the template, use `\version{...}` and `\wasnow{...}` for this, and never overwrite an earlier answer.

**4. Use credible sources**

For literature-related sections, use relevant and credible academic sources. Record sufficient details of each paper so that you can easily refer to it later. In the template, this means adding each paper to `references.bib` and filling its entry in Section 6 — method, dataset, metric, headline number, and the limitation the authors state themselves.

**5. Keep your work organized**

You may maintain the notebook digitally using a structured document or notebook application. However, it must be clearly organized according to the 15 sections listed above. The template already enforces this organisation for you.

**6. Be prepared to explain your work**

You may be asked during lectures to explain or defend any part of your Research Notebook. Your work should therefore reflect your own understanding and contribution. Deleting the worked examples and replacing them with your own text is part of this — a notebook still containing the sample content is not your work.

---

## The goal

By the end of the semester, your Research Notebook should answer the following question:

> *"What is my research problem, why does it matter, what has already been done, what is still missing, how will I investigate it, how will I evaluate it, and what contribution do I expect to make?"*

This notebook will become the foundation for your research proposal and final presentation.

Please start maintaining your Research Notebook from the very first lecture and update it after every class.

Regards,

**Dr. Mohsin Furkh Dar**
Assistant Professor
Cloud & Software Operations Cluster (SOCS)
