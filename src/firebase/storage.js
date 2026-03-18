// ── Firebase Storage Helpers ──
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebaseConfig";

/** Upload a file and return its download URL */
export const uploadFile = async (path, file) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
};

/** Get download URL for an existing file */
export const getFileURL = (path) => getDownloadURL(ref(storage, path));

/** Delete a file */
export const deleteFile = (path) => deleteObject(ref(storage, path));
