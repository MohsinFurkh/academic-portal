// ---------------------------------------------------------------------------
// Firebase configuration
// ---------------------------------------------------------------------------
// 1. Go to https://console.firebase.google.com  ->  Add project (free "Spark" plan).
// 2. Inside the project: Build -> Firestore Database -> Create database
//        (choose "Start in production mode", pick a region close to you).
// 3. Build -> Authentication -> Get started -> Sign-in method
//        -> enable "Anonymous". (Used so only your app can read/write.)
// 4. Project settings (gear icon) -> "Your apps" -> Web app (</>) -> register app
//        -> copy the firebaseConfig object and paste it below.
// 5. Firestore -> Rules tab -> paste the rules from quiz/README.md -> Publish.
// ---------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// >>> PASTE YOUR CONFIG HERE <<<
const firebaseConfig = {
  apiKey: "AIzaSyBwy83dXcTuu3aalPH7lveSHWKT4_Z1LBU",
  authDomain: "academicportal-14829.firebaseapp.com",
  databaseURL: "https://academicportal-14829-default-rtdb.firebaseio.com",
  projectId: "academicportal-14829",
  storageBucket: "academicportal-14829.firebasestorage.app",
  messagingSenderId: "324059193746",
  appId: "1:324059193746:web:078b5c38f8c3ec69f3614b",
  measurementId: "G-95GB6YBP10"
};

// Passcode the faculty must type to open the admin dashboard.
// (Client-side gate only — keep the real protection in your Firestore rules.)
export const ADMIN_PASSCODE = "08022026";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Best-effort anonymous sign-in so Firestore rules can require request.auth != null.
export async function ensureAuth() {
  try {
    if (!auth.currentUser) await signInAnonymously(auth);
    return true;
  } catch (err) {
    console.warn("Anonymous auth failed (check it is enabled in Firebase):", err);
    return false;
  }
}
