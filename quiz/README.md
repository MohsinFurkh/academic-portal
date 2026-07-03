# Online Quiz System

A self-contained, proctored MCQ quiz that runs on this static site (GitHub Pages)
with **Firebase Firestore** as the shared backend so the faculty dashboard sees every
student live.

## Features

- Student enters **Name + SAP ID**, picks an active quiz.
- **Copy / cut / paste / right-click disabled** during the quiz (+ common keyboard shortcuts).
- **Tab-switch / minimize detection** — every time the student leaves the window it is
  counted and pushed to Firestore instantly (with timestamps).
- **Countdown timer with auto-submit** when time runs out.
- **Session persistence** — refresh or a brief disconnect resumes the *same* attempt with
  the timer continuing from the original start time. One attempt per SAP ID per quiz.
- **Faculty dashboard** (`admin.html`) — upload a questions JSON, set duration / marks /
  negative marks / shuffle / active-status, and watch a **live table** of students, their
  status, tab-switch counts (flagged at ≥3), scores and timings. **CSV export** included.
- Supports the multiple-response format in `Devops Overview/DevOps_MidSem_MCQs.json`
  (`options` object + `correct_answers` array) *and* the single-answer format in
  `mcq-tests/questions.js` (`options` array + `correctAnswer` index).

## One-time setup (≈5 minutes)

1. **Create a Firebase project** — https://console.firebase.google.com → *Add project*
   (free "Spark" plan is enough). Disable Google Analytics if you like.
2. **Firestore** — Build → *Firestore Database* → *Create database* →
   *Start in production mode* → pick a nearby region.
3. **Anonymous auth** — Build → *Authentication* → *Get started* → *Sign-in method* →
   enable **Anonymous**.
4. **Register a web app** — Project settings (⚙) → *Your apps* → Web (`</>`) → register →
   copy the `firebaseConfig` object.
5. Paste that object into [`firebase-config.js`](firebase-config.js) and set your own
   `ADMIN_PASSCODE`.
6. **Publish security rules** — Firestore → *Rules* → paste the block below → *Publish*.

### Firestore security rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizzes/{quizId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;   // tighten if you add roles
    }
    match /attempts/{attemptId} {
      allow read:          if request.auth != null;
      allow create, update: if request.auth != null;
      allow delete:        if false;
    }
  }
}
```

## Using it

**Faculty:** open `quiz/admin.html` → enter passcode → upload the JSON file →
set duration / marks → **Save Quiz** (set *Active*). Keep the dashboard open to watch
students live. Close a quiz by re-saving isn't needed — set its status to draft next time,
or just leave it; you can also flip `active` in the Firestore console.

**Students:** open `quiz/index.html` → enter Name + SAP ID → choose the quiz →
read instructions → **Start Quiz**.

## Security notes (please read)

- Grading happens **in the browser**, so the quiz document (which includes correct
  answers) is downloaded to the student's device. A technically skilled student could
  read the answers via dev-tools. This is an inherent trade-off of a no-server static
  site and is usually acceptable for in-class, invigilated quizzes where you watch the
  live dashboard. For tamper-proof grading you'd move scoring into a Firebase Cloud
  Function (requires the Blaze plan) and store answers server-side.
- The admin passcode is a **client-side convenience gate**, not real security. Anyone
  with the config can write to Firestore under the rules above. For a classroom this is
  fine; for higher stakes, add Firebase Auth with an allow-listed faculty account and
  restrict `quizzes` writes to that UID.
- Tab-switch detection relies on browser `visibilitychange`/`blur` events. It reliably
  catches tab changes, window minimize and app switches, but cannot see a second physical
  device. Treat the count as a signal, not proof.

## Files

| File | Purpose |
|------|---------|
| `index.html` / `student.js` | Student login + quiz taking + anti-cheat |
| `admin.html` / `admin.js` | Faculty dashboard: upload, configure, monitor |
| `common.js` | JSON normalization + grading (shared) |
| `firebase-config.js` | Your Firebase keys + admin passcode |
| `styles.css` | Styling |
