// ── Firebase Configuration ──
// Replace these values with your Firebase project credentials
// Firebase Console → Project Settings → Your Apps → SDK setup

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCnF02hTSEHF6wvS-X_X0s5TJmBSxxtQs",
    authDomain: "educonnect-183d2.firebaseapp.com",
    projectId: "educonnect-183d2",
    storageBucket: "educonnect-183d2.firebasestorage.app",
    messagingSenderId: "823331901417",
    appId: "1:823331901417:web:601008fc6d24aab2f34578"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;


// Import the functions you need from the SDKs you need
