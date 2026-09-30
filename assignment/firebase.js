// ---------------------------------------------------------------------------
// Firebase for the assignment system
// ---------------------------------------------------------------------------
// Same project, same keys and same faculty list as quiz/ and exam/ — but a
// SEPARATE app instance, so it keeps its own sign-in. That matters: the quiz
// and the exam sign students in anonymously, and that anonymous session is
// what ties a running paper to its browser. If signing in here replaced it, a
// student with an exam open in another tab would lose that exam mid-paper.
// With a named app, the two sessions never touch.
//
// Students here have a real account (email + password): an assignment runs
// for days, is opened from several devices, and in a group is shared by
// several people — none of which an anonymous browser session can survive.
// ---------------------------------------------------------------------------

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app as sharedApp, ADMIN_EMAILS } from "../quiz/firebase-config.js";

const NAME = "assignments";
export const app = getApps().find((a) => a.name === NAME)
  || initializeApp(sharedApp.options, NAME);
export const db = getFirestore(app);
export const auth = getAuth(app);

const ready = setPersistence(auth, browserLocalPersistence).catch(() => { });

export function isAdminUser(user) {
  return !!(user && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
}

export function onUser(cb) {
  return onAuthStateChanged(auth, cb);
}

export async function signIn(email, password) {
  await ready;
  return (await signInWithEmailAndPassword(auth, email.trim(), password)).user;
}

export async function register(email, password) {
  await ready;
  return (await createUserWithEmailAndPassword(auth, email.trim(), password)).user;
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email.trim());
}

export function logOut() {
  return signOut(auth);
}

// Firebase error codes -> a sentence a student can act on.
export function authMessage(e) {
  const c = (e && e.code) || "";
  if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found")) {
    return "Wrong email or password. If you have not used assignments before, choose <b>Create account</b>.";
  }
  if (c.includes("email-already-in-use")) {
    return "An account with this email already exists. Sign in instead, or use <b>Forgot password</b>.";
  }
  if (c.includes("weak-password")) return "Choose a password of at least 8 characters.";
  if (c.includes("invalid-email")) return "That email address is not valid.";
  if (c.includes("too-many-requests")) return "Too many attempts. Wait a few minutes and try again.";
  if (c.includes("operation-not-allowed")) {
    return "Email/password sign-in is not enabled for this portal. Tell your instructor.";
  }
  if (c.includes("network-request-failed")) return "No connection to the server. Check your internet.";
  return (e && e.message) || String(e);
}
