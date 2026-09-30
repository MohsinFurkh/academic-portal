# Assignments (individual and group, typed, deadline-based)

Take-home assignments that run on this static site (GitHub Pages) with **Firebase
Firestore** as the backend. Students write in the same editor as the class test —
formatting, tables, symbols, equations — over days, from any device, alone or in a
group of 2–6. You watch progress live, see **who wrote what**, and mark it in the same
dashboard.

It sits next to [`../quiz/`](../quiz/README.md) and [`../exam/`](../exam/README.md) and
shares their Firebase project and faculty account. Its collections, rules and sign-in
are separate, so the three never interfere.

| | Class test (`../exam/`) | Assignment (this folder) |
|---|---|---|
| Duration | minutes, one sitting | days, any number of sittings |
| Proctoring | full screen, violations, auto-submit | **none** |
| Closes | when the timer runs out | at the **deadline** (server clock), automatically |
| Who | one student | one student **or a group of 2–6** |
| Student sign-in | anonymous, tied to one browser | **email + password account**, any device |
| Paste from outside | blocked | blocked (same editor) |
| Pictures / files | uploaded diagrams | **links** to the student's own Google Drive / OneDrive / GitHub — nothing is uploaded |
| Collections | `exams`, `examKeys`, `examAttempts` | `assignments`, `assignmentKeys`, `assignSubs`, … (below) |

---

## One-time setup

1. **Email/Password sign-in** is already enabled (the faculty account uses it). Students
   create their own accounts on the assignment page — nothing to do in the console.
2. **Publish the rules.** Copy the whole of [`../firestore.rules`](../firestore.rules) into
   Firebase console → Firestore → Rules → **Publish**. The assignment section is new; the
   quiz and exam sections are unchanged.
3. **Create the indexes** Firestore asks for. The dashboard runs a few `where("aid", "==", …)`
   queries; if the console shows *"The query requires an index"* with a link, click it.
   (Single-field equality queries normally need none.)
4. Open `assignment/selftest.html` — every check should pass.

Students open **`assignment/`**. You open **`assignment/admin.html`**.

---

## Creating an assignment

In the dashboard, **Create an assignment**:

- **Brief** — title, course, instructions.
- **Deadline** — in your computer's time zone. At that moment the Firestore rules stop
  accepting edits; whatever is saved is final, even if nobody pressed Submit.
- **Open / closed** — *Closed* stops everyone at once, extensions included.
  **Visible** — hide it from the students' list without deleting anything.
- **Individual or group.** For a group assignment set the smallest and largest group
  (2–6) and choose:
  - **Students form their own** — one student creates a group and gets an 8-character
    join code; team-mates join with it; the creator (leader) confirms the group when
    everyone is in. After confirmation nobody joins or leaves except through you.
  - **I set the groups** — one line per group: `Team Alpha: 500101, 500102, 500103`.
    Each student lands in their group the first time they open the assignment.
- **Roster** — the SAP IDs allowed in (or tick *any student*), and the allowed email
  domains (exact match: `stu.upes.ac.in` does not admit `x.stu.upes.ac.in`).
- **Topics (optional, first come first served)** — one topic per line, with an optional
  description after `|` (or a `"topics"` list in the JSON). Each group sees every topic
  marked *Available* or *Taken by (group name)*, live. The first group to choose a topic
  gets it; any member can choose, the choice is final, and **writing opens only once the
  group has a topic**. When a group may propose its **own topic**: only once every listed
  topic is taken (default), at any time, or never. The rules enforce all of this: a topic
  can be claimed once, so two groups clicking together cannot both get it. In the table,
  **Manage** releases a topic or assigns a free one by hand.
- **Template (optional)** — upload a file up to 4 MB (stored in Firestore in chunks,
  downloaded from the brief) **or** give a link to one. Each section can also carry
  **starter text** (`## Heading`, `- bullet`, plain lines) that appears in the editor
  before the student types — handy for a required report structure.
- **Sections** — the tasks, each with marks, optional word limits, guidance and a
  **marking scheme** that only you can read. Load them from JSON
  ([`sample-assignment.json`](sample-assignment.json)) or type them.

You can edit an assignment later (**Edit an existing assignment…**): brief, deadline,
roster, template and sections. Section ids are kept, so rewording a section never
detaches answers. Once students have started, individual/group settings are locked;
change groups from the table instead.

---

## How group work is kept honest

Every member of a group writes in **one shared submission**. The page records the
evidence you need to mark individuals fairly:

| Evidence | How it is collected | Can a student fake it? |
|---|---|---|
| **Who wrote each paragraph** | Every paragraph, list item, table cell and heading is stamped with the SAP ID of the member who last typed in it. The dashboard counts the words under each stamp and can colour the text by author. | Not through the page — typing in a paragraph is the only way to take it over, and starter-template text is credited to nobody. A console-savvy student editing a section could re-stamp paragraphs by hand; every earlier version is in the edit history, so it shows. |
| **Keys typed, active time, edit sessions** | Counted by the editor, per member. The rules let each member update **only their own** counters. | A member could only inflate their own numbers by tampering in the browser console — and words-vs-keys mismatches are flagged ⚑. |
| **Edit history** | Every editing session writes an immutable snapshot (who, which section, words before → after, keys, the text itself) stamped with the **server's** time. You can open any snapshot. | No — entries are create-only and time-stamped by the server. |
| **Private declaration** | Each member splits 100% of the work across the group and describes their own part. Stored in a separate document **only that student and you can read** — team-mates never see how they were rated. Open until 72 h after the deadline. | It is an opinion, and is shown as one: team-mates' average rating is reported separately from the self-rating. |
| **Blocked pastes** | Every attempt to paste or drop text from outside is refused and counted per member. | — |

In the **Evaluate** window you mark each section once (the group mark), then each member
gets an individual mark = group total × factor. The **suggested factor** comes from
the team-mates' ratings (self-ratings excluded), rescaled so the group adds up to 100% —
so a group where everyone rates themselves generously is not marked down as a whole —
divided by an equal share. Until every member has been rated it falls back to the share
of words written. It is limited to 0.5–1.2. Change any factor, or type a mark directly.

### Editing together without overwriting each other

Only one member edits a section at a time. Clicking a section takes it; team-mates see
*"Aisha is editing this section"* and watch the text update live. It is freed when the
member presses **Done editing**, leaves the page, or stops typing for 3 minutes. A section
whose holder has gone silent for 70 seconds (laptop closed, network lost) can be taken
over. Different members can edit different sections at the same time.

---

## During and after

- **Live table** — status, words, a bar of who wrote how much, last edit, declarations,
  links, mark. *Students who have not started / not in a group* lists everyone missing.
- **Extend** — a later deadline for one submission only (optionally reopening a
  submitted one).
- **Reopen / Mark submitted** — per submission.
- **Manage** (groups) — rename, change leader, add or remove a member, confirm, delete an
  empty group. Removing a member keeps everything they wrote.
- **Reset account link** — a student who forgot their password, or whose SAP ID was
  claimed by someone else: the old account loses access and the student's next sign-in
  (new or same account) goes straight back into their submission.
- **Release marks** — each student then sees **only their own** mark, the section marks,
  the feedback and any comment written for them. Hide again at any time.
- **Download all** — every submission in one HTML file, coloured by author, with marks
  and feedback. **Export CSV** — one row per student with every contribution figure.

---

## Data model

| Collection | Holds | Who can read |
|---|---|---|
| `assignments/{aid}` | brief, sections, deadline, settings, template info | any signed-in user |
| `assignmentKeys/{aid}` | roster, marking schemes | faculty |
| `assignTemplates/{aid}/chunks/{n}` | the template file, base64 | any signed-in user |
| `assignProfiles/{uid}` | name, SAP ID (fixed once set), mobile, email | the student, faculty |
| `assignStudents/{aid}__{sap}` | claim: this account speaks for this SAP ID here | the student, faculty |
| `assignGroupIndex/{aid}__{sap}` | teacher-set group of a student | get by id only |
| `assignSubs/{sid}` | the submission: members, text, locks, links, counters | its members, faculty |
| `assignSubs/{sid}/revs/{id}` | edit history | its members, faculty |
| `assignDecls/{sid}__{sap}` | private declaration | that student, faculty |
| `assignTopicBoards/{aid}` | which group holds which topic | any signed-in user |
| `assignEvals/{sid}` | your full evaluation | faculty |
| `assignGrades/{sid}__{sap}` | what one student sees after release | that student (after release), faculty |

No student file is ever stored — only links.

---

## What it honestly cannot do

- **Stop outside help.** Text can be typed in from another screen or dictated by a
  friend. Pasting is blocked and counted; *typing* someone else's words is not
  detectable by a browser.
- **Prove who is at the keyboard.** A member could sign in to a team-mate's account if
  given the password. The declaration and your knowledge of the group are the check.
- **Guarantee the live numbers are untouched.** A technically able student can alter
  their *own* keystroke/active-time counters from the browser console (never anyone
  else's), and can re-stamp paragraphs in a section they are editing. They cannot touch
  the edit history or anyone's declaration. When the figures and the history disagree,
  trust the history.
- **Verify link sharing.** The page reminds students to share links as "anyone with the
  link"; it cannot check. Open them before marking.
- **Reset forgotten passwords by email reliably at scale.** Firebase's free plan limits
  password-reset emails. Use **Reset account link** in the dashboard instead.

---

## Files

| File | Purpose |
|---|---|
| `index.html`, `student.js` | Student page: accounts, list, workspace, groups, submission |
| `admin.html`, `admin.js` | Faculty dashboard |
| `editor.js` | The exam's editor without image upload, plus authorship stamps and read-only mode |
| `guard.js` | Copy/paste guard (the exam's rules without proctoring) |
| `common.js` | Pure helpers: authorship, peer assessment, links, groups, time — unit-tested |
| `firebase.js` | A separate Firebase app instance, so this sign-in never disturbs a quiz or exam open in another tab |
| `selftest.html`, `selftest.js` | Offline checks |
| `sample-assignment.json` | Example sections file |
