// ======================================================
// ALINDA PREPARATORY SCHOOL - KANARA
// FIREBASE CONFIGURATION
// ======================================================

// Import Firebase functions from the official Firebase SDK.
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";


// ======================================================
// 1. FIREBASE PROJECT CONFIGURATION
// These details identify your Firebase project.
// ======================================================

const firebaseConfig = {

    apiKey: "AIzaSyDI8Jd318evXwMOQihfz2d0etA4gL66H9M",

    authDomain: "alinda-prep-kanara.firebaseapp.com",

    projectId: "alinda-prep-kanara",

    storageBucket: "alinda-prep-kanara.firebasestorage.app",

    messagingSenderId: "943914685053",

    appId: "1:943914685053:web:c1aa8741754714a801d714",

    measurementId: "G-W8NMNT2M7N"

};


// ======================================================
// 2. INITIALISE FIREBASE
// This starts the connection to your Firebase project.
// ======================================================

const app = initializeApp(firebaseConfig);


// ======================================================
// 3. FIREBASE AUTHENTICATION
// Used for user login, logout and account verification.
// ======================================================

export const auth = getAuth(app);


// ======================================================
// 4. CLOUD FIRESTORE DATABASE
// Used to store and retrieve school information.
// ======================================================

export const db = getFirestore(app);


// Export the Firebase application as well.
export { app };


// ======================================================
// FIREBASE CONFIGURATION COMPLETE
// Other HTML pages can now import auth and db.
// ======================================================