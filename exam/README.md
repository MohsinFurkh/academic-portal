# Descriptive Class Tests (proctored, typed answers)

A written/subjective class test that runs on this static site (GitHub Pages) with
**Firebase Firestore** as the backend. Students type their answers in a formatting
toolbar with symbols, equations and uploaded diagrams; you watch them live and mark
the papers in the same dashboard.

It is the subjective counterpart to [`../quiz/`](../quiz/README.md) and shares that
system's Firebase project, faculty account and proctoring ideas — but the collections,
the rules and the proctor are separate, so the two never interfere.

| | MCQ quiz (`../quiz/`) | Descriptive test (this folder) |
|---|---|---|
| Answers | pick an option | typed prose, tables, equations, diagrams |
| Grading | automatic | manual, per question, in the dashboard |
| Collections | `quizzes`, `quizKeys`, `attempts` | `exams`, `examKeys`, `examAttempts` |
| Text entry | none | rich editor with an internal-only clipboard |

---

## What protects the test

| Layer | What it does |
|---|---|
| **Full-screen lock** | The test only starts in full screen. Leaving full screen is detected instantly. |
| **Focus enforcement** | Tab switch, app switch, minimise and window-blur each raise a **violation**: a blocking overlay covers the paper, the count goes up, and the event is timestamped in Firestore. |
| **Auto-submit** | On the *n*-th violation (default 3) the paper is submitted automatically with whatever is written. |
| **Screen blanking** | The paper is blurred the instant focus is lost, so a screenshot or screen-share taken while switching away captures nothing. |
| **Paste is dead** | Every route text can take into the answer box — Ctrl+V, right-click paste, middle-click paste, drag-and-drop, autofill, `insertReplacementText` — is blocked and counted. Nothing written in another window can reach the paper. |
| **Internal clipboard** | Cut/copy/paste still work **inside** the exam, served from a JavaScript variable. The system clipboard is never read or written, so text cannot travel in or out. Students can still restructure their own answers. |
| **Keystroke telemetry** | Printable keystrokes are counted and stored next to the word count. A paper with 600 words and 200 keystrokes did not come from that keyboard; the dashboard flags it with ⚑. |
| **Selection fenced** | Text can only be selected inside an answer box, so the question paper itself cannot be swept up and dragged elsewhere. |
| **Dialogs the page opens** | The table sizer, symbol palette, equation box and drawing pad are drawn inside the page, so they cost no focus and can never be a violation. The one unavoidable exception — the operating system's file chooser — opens a *grace window*: the focus loss is excused, but it is logged with its reason, it is time-boxed, and it ends the instant focus returns. |
| **Input blocking** | Right-click, printing, F12, Ctrl+Shift+I/J/C/K, Ctrl+U/S/P/F, Ctrl+T/N/W/O/H. Ctrl+B/I/U/Z/Y stay with the editor, because the student needs them. |
| **Marks cannot be self-written** | Firestore rules forbid a student's browser from writing `score`, `marks`, `graded` or another student's document. |
| **Model answers never leave the server** | The marking scheme lives in `examKeys/{id}`, which students cannot read. |
| **Roster restriction** | Only SAP IDs you upload can start (can be switched off deliberately for an invigilated room). |
| **Identity on record** | Name, SAP ID, mobile and college email are captured before the paper opens, with the email restricted to the domains you set. |
| **Server clock** | The countdown comes from Firestore's server timestamp and is re-synced during the test, so changing the device clock does not buy time. |
| **Reliability** | Autosave ~1 s after each keystroke plus a 20 s heartbeat, retry-with-backoff on every write, resume after refresh/disconnect with the original time remaining, and a downloadable self-contained answer paper if submission ever fails. |
| **Faculty rescue** | A student knocked offline can be put back in from the dashboard — on any device, with extra minutes — or have their paper closed for marking as it stands. |

### What it honestly cannot do

Read this before you rely on it:

- **A second device.** A phone beside the laptop is invisible to the browser. The
  student can read an answer off it and type it in by hand — the keystroke counter will
  look completely normal, because they really did type it.
- **Another person in the room**, or a screen-share to a friend on a different machine.
- **Distinguishing a genuine upload from a pretext.** While the file chooser is open
  the proctor is not counting, so a student could alt-tab during it. The window is
  short, it closes the moment focus returns, the paper stays blurred throughout, and
  every grace is written to the event log with its reason — but it is not zero.
- **Truly preventing** the student from leaving full screen. The browser will not let a
  page trap the user — we can only *detect* the exit and react, which is what we do.
- **An on-screen keyboard or a macro pad** that types the text for them. Blocked pastes
  are caught; synthetic keystrokes from outside the browser are not.
- **Proving identity.** The roster stops an unenrolled ID being used, but not a
  classmate typing an enrolled one. Physical invigilation still matters.

Treat the violation count, the blocked-paste count and the ⚑ flag as **evidence for a
conversation**, not automatic proof of cheating — laptops raise notifications, and a
legitimate student can lose focus or hit Ctrl+V out of habit once.

---

## One-time setup

The Firebase project, the Anonymous/Email sign-in methods and the faculty account are
**already set up** for `../quiz/`. This folder reuses all of them — it even imports
[`../quiz/firebase-config.js`](../quiz/firebase-config.js), so there is only one copy of
the keys and one faculty allow-list.

The only new step is the rules.

> **The complete ruleset for this Firebase project is [`../firestore.rules`](../firestore.rules).**
> It covers the MCQ quiz *and* these descriptive tests. Firestore replaces the entire
> ruleset on every publish, so never paste one system's block on its own — publish the
> whole file or you will delete the other system's rules.

Firestore → **Rules** → replace everything with the contents of
[`../firestore.rules`](../firestore.rules) → **Publish**.

The part that is new for descriptive tests is reproduced below, so you can see what it
does without opening the file. `isAdmin()` is the same function the quiz rules already
use.

```
    // Roster check, read server-side. `rosterOpen` is the deliberate escape
    // hatch for an invigilated room where no roster was prepared.
    function examRosterOk(examId, sapId) {
      return exists(/databases/$(database)/documents/examKeys/$(examId))
             && (get(/databases/$(database)/documents/examKeys/$(examId))
                   .data.get('rosterOpen', false) == true
                 || get(/databases/$(database)/documents/examKeys/$(examId))
                      .data.get('roster', []).hasAny([sapId]));
    }

    // Public: the question paper. No model answers, no marking scheme.
    match /exams/{examId} {
      allow read:  if request.auth != null;
      allow write: if isAdmin();
    }

    // Marking scheme + roster. Faculty only — never readable by a student.
    match /examKeys/{examId} {
      allow read, write: if isAdmin();
    }

    match /examAttempts/{attemptId} {
      // ... get / list / create / claimResume / update / delete, mirroring the
      // quiz attempt rules — see ../firestore.rules for the full block.

      // While writing, a student may only touch these fields. Note what is
      // absent: `marks`, `feedback`, `score` and `graded`, so evaluation can
      // only ever come from the dashboard.
      //     ['answers', 'wordCounts', 'order', 'typedChars', 'pasteAttempts',
      //      'imageCount', 'violations', 'violationLog', 'eventLog',
      //      'lastSeenAt', 'status', 'submittedAt', 'autoSubmitted',
      //      'submitReason']

      // Uploaded diagrams: one document per picture. Ownership is read from the
      // parent attempt, which is what carries the pictures across when a granted
      // resume moves the paper to a new device.
      match /images/{imageId} {
        function paper() {
          return get(/databases/$(database)/documents/examAttempts/$(attemptId)).data;
        }
        allow read: if isAdmin()
                    || (request.auth != null && paper().uid == request.auth.uid);
        allow create: if request.auth != null
                      && request.resource.data.uid == request.auth.uid
                      && paper().uid == request.auth.uid
                      && paper().status == 'in-progress'
                      && request.resource.data.dataUrl is string
                      && request.resource.data.dataUrl.size() < 640000;
        // A submitted diagram is evidence: the student cannot swap or delete it.
        allow update, delete: if isAdmin();
      }
    }
```

Note what the update rule enforces: a student can write answers and *increase* their
violation count, but cannot decrease it, cannot write a score or per-question marks,
cannot alter their start time, and cannot edit a paper after submitting. Extra time
(`extraMinutes`) and the resume grant (`resumeAllowed`) are outside the list a student
may write, so only the dashboard can issue them.

**No Cloud Storage is needed.** Diagrams are compressed in the browser and stored as
documents in Firestore, so there is nothing else to enable or configure.

---

## Running a test

**Before the class**

1. Open `exam/admin.html` and sign in with the same faculty account as the quiz.
2. Write the questions in the builder — question text, marks, optional word guidance,
   and whether that question accepts diagrams. Or upload a JSON file
   ([`sample-exam.json`](sample-exam.json) is a working example) and edit what it fills in.
3. Put the **model answer / marking scheme** in each question's second box. It is stored
   in `examKeys/{id}` and shown to you while marking — students never receive it.
4. Set duration, reading time (the compulsory instructions screen, **2 minutes** by
   default; `0` removes it), violations allowed, and the **allowed email domains**.
5. Paste the **roster** of SAP IDs (or upload a `.txt`/`.csv`). Saving is blocked without
   one unless you deliberately tick the open-roster box.
6. Leave status **Draft**. Save. Check the test appears in the monitor dropdown.

**In the class**

7. Change status to **Active** and save.
8. Tell students: laptop only, close other apps, stable network, **answers must be typed —
   pasting is blocked and reported**, and leaving the window three times ends the paper.
9. Keep the dashboard open. Watch **Viol.**, **Blocked**, the ⚑ next to a word count, and
   the **Live** column — "stale" means a browser has not checked in for a minute.

**When a student drops out mid-test**

Their answers are already on the server — saved about a second after they stop typing —
so nothing is lost either way.

| Button | What it does |
|---|---|
| **Allow resume** | Puts the paper back in play. You are asked how many **extra minutes** to grant (pre-filled with the time they lost); the deadline moves by that much. The student signs in again with the same SAP ID — **on any device** — and carries on from their saved text, with their diagrams and violation count intact. The row reads **resume open** until they are back. |
| **Force submit** | Closes the paper as it stands so it can be marked. Shown as `faculty` in the submit-reason column and the CSV. |

**Reopen** does the same for a paper that is already submitted. Any marks it had are
cleared, so it will need evaluating again.

Grant the resume **before** you press *Close test* — a closed test is not listed on the
student page.

**Marking**

10. Press **Close test** so late arrivals cannot start.
11. Press **Evaluate** on a submitted row. You get the whole paper — formatting,
    equations re-rendered, diagrams full size — with the marking scheme beside each
    question, a marks box and a comment box. The total updates as you type; **Save marks**
    writes `marks`, `feedback`, `score` and `graded`.
    The proctoring banner at the top shows the violations, the blocked pastes and the
    first dozen logged events with their timestamps.
12. **Export CSV** — the marks sheet: per-question marks, total, words, keystrokes,
    diagrams, each violation with its kind and timestamp, blocked pastes, extra minutes
    granted, and the true elapsed time from server timestamps.
13. **Download all papers** — every paper as **one** self-contained HTML file: a summary
    table, then each student's full answer paper with diagrams embedded and equations
    rendered. It opens in any browser with no network, and printing it gives one student
    per page.

    The file contains the marking scheme — it is a **faculty copy**, not something to
    hand back as it is.

If a student's submission failed (rare — they will see a red "Submission not confirmed"
panel), they can download their whole paper, diagrams included, as a timestamped HTML
file and email it to you.

---

## What the student gets

**Formatting** — headings, sub-headings, minor headings, quote blocks, monospace blocks,
**bold**, *italic*, underline, strikethrough, superscript, subscript, bulleted and
numbered lists, tables (any size up to 20×10) and horizontal rules.

**Symbols (Ω)** — a palette of Greek letters, operators, relations, set and logic symbols,
arrows, superscript/subscript digits and units, inserted straight into the text as
ordinary characters.

**Equations (√x)** — a LaTeX box with a live KaTeX preview and one-click templates for
fractions, roots, powers, summations, products, integrals, limits, derivatives, partial
derivatives, logarithms, big-O, binomials, matrices, cases, vectors and Bayes' rule. Only
the LaTeX is stored; it is re-rendered from that source everywhere it is shown, so no
student-authored HTML is ever trusted.

**Diagrams — two routes.** **✏ Draw** opens a pad inside the page: mouse, trackpad,
finger or stylus, four pen colours, three widths, an eraser, and an Undo that also undoes
a Clear. It exports at twice the on-screen resolution; a line drawing typically lands
around 20 KB. **🖼 Upload** takes a photograph of something drawn on paper and resizes it
to 1500 px, re-encoding until it is small enough to store. Both routes produce the same
figure with an editable caption, and both are capped at 4 per question and 15 per paper.

Tell students to prefer **Draw**: it is the only one of the two that opens no
operating-system window, so it cannot interrupt their paper at all.

**Tables (▦)** — a size dialog with a live preview, inside the page. Up to 20 rows by 10
columns, with an optional heading row.

**Word counts** — live per answer, against the min/max you suggested, and shown to you in
the dashboard and on every dot in the question navigator.

---

## Testing it without a class

Open `exam/selftest.html`. It runs ~50 offline checks over the sanitiser, the identity
checks, the word counter and the proctoring engine (fake document, fake clock — nothing
is written anywhere), and gives you the real answer editor in a sandbox so you can try
the toolbar, the symbol palette, the equation dialog and diagram upload before a class.

Run it after changing `common.js`, `proctor.js` or `editor.js`.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` / `exam.js` | Student sign-in, proctored test runner, submission |
| `editor.js` | The answer editor: toolbar, internal clipboard, symbols, equations, diagram upload and compression |
| `proctor.js` | Proctoring engine tuned for typing — see the comments at the top for what it allows and why |
| `admin.html` / `admin.js` | Faculty: write tests, roster, live monitor, evaluation, CSV, offline report |
| `common.js` | Sanitiser, word counting, identity checks, image limits, timing helpers |
| `selftest.html` / `selftest.js` | Offline checks + editor sandbox |
| `sample-exam.json` | A working four-question paper you can upload |
| `styles.css` | Styling, including the editor, the modals and the proctor overlay |
| `../quiz/firebase-config.js` | Firebase keys and the faculty allow-list — shared with the quiz |

## Data model

```
exams/{examId}         public   { title, instructions, durationMinutes, maxViolations,
                                  readingMinutes, emailDomains[], active, maxScore,
                                  questions[] }                    ← no model answers
examKeys/{examId}      faculty  { rubric: { qid: modelAnswer }, roster[], rosterOpen }
examAttempts/{examId__sapId}    { uid, name, sapId, mobile, email, status,
                                  startedAt, submittedAt, lastSeenAt,
                                  answers: { qid: html },          ← diagrams stripped out
                                  wordCounts: { qid: n }, order[],
                                  typedChars, pasteAttempts, imageCount,
                                  violations, violationLog[], eventLog[],
                                  marks: { qid: n }, feedback: { qid: text },
                                  score, graded, autoSubmitted, submitReason,
                                  extraMinutes, resumeAllowed }    ← faculty-set
examAttempts/{id}/images/{imgId} { uid, qid, sapId, dataUrl, bytes, w, h, at }
```

The answer HTML holds `<figure class="dgm" data-img="…">` placeholders, never pixels, so
a paper with fifteen photographs still writes a few kilobytes on every autosave.
