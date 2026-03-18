// ── Reusable Firestore CRUD Helpers ──
import {
    collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc,
    query, where, addDoc, writeBatch, orderBy, limit,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

/** Get all documents from a collection */
export const getAll = async (collectionName) => {
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Get a single document by ID */
export const getById = async (collectionName, id) => {
    const snap = await getDoc(doc(db, collectionName, String(id)));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/** Create a document with auto-generated ID */
export const create = async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
};

/** Create or overwrite a document with a specific ID */
export const set = async (collectionName, id, data) => {
    await setDoc(doc(db, collectionName, String(id)), data);
    return { id, ...data };
};

/** Update specific fields of a document */
export const update = async (collectionName, id, data) => {
    await updateDoc(doc(db, collectionName, String(id)), data);
};

/** Delete a document */
export const remove = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, String(id)));
};

/** Query documents with filters */
export const queryDocs = async (collectionName, ...queryConstraints) => {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Batch write helper */
export const batchWrite = async (collectionName, dataArray) => {
    const batch = writeBatch(db);
    dataArray.forEach((item, index) => {
        const docId = item.id ? String(item.id) : String(index + 1);
        const ref = doc(db, collectionName, docId);
        const clean = JSON.parse(JSON.stringify(item));
        batch.set(ref, clean);
    });
    await batch.commit();
};

// Re-export query helpers for use in services
export { where, orderBy, limit, collection, doc, db };
