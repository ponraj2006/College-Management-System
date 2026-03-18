// ── Firebase Auth Helpers ──
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

/** Sign in with email & password */
export const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

/** Register a new user */
export const registerUser = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(cred.user, { displayName });
    }
    return cred;
};

/** Sign out */
export const logoutUser = () => signOut(auth);

/** Subscribe to auth state changes */
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);
