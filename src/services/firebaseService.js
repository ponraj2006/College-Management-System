// ── Firestore CRUD Service ──
import {
    collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc,
    query, where, addDoc, writeBatch
} from "firebase/firestore";
import { db } from "../firebase";

// ═════════════════════════════════
//  GENERIC HELPERS
// ═════════════════════════════════
const getAll = async (collectionName) => {
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

const getById = async (collectionName, id) => {
    const snap = await getDoc(doc(db, collectionName, String(id)));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

const create = async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
};

const update = async (collectionName, id, data) => {
    await updateDoc(doc(db, collectionName, String(id)), data);
};

const remove = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, String(id)));
};

// ═════════════════════════════════
//  ADMIN STUDENTS
// ═════════════════════════════════
export const adminStudentsService = {
    getAll: () => getAll("adminStudents"),
    getById: (id) => getById("adminStudents", id),
    update: (id, data) => update("adminStudents", id, data),
    delete: (id) => remove("adminStudents", id),
    create: (data) => create("adminStudents", data),
};

// ═════════════════════════════════
//  STAFF MEMBERS (Admin view)
// ═════════════════════════════════
export const staffMembersService = {
    getAll: () => getAll("staffMembers"),
    getById: (id) => getById("staffMembers", id),
    update: (id, data) => update("staffMembers", id, data),
    delete: (id) => remove("staffMembers", id),
    create: (data) => create("staffMembers", data),
};

// ═════════════════════════════════
//  STAFF STUDENTS (Staff's view)
// ═════════════════════════════════
export const staffStudentsService = {
    getAll: () => getAll("staffStudents"),
    getById: (id) => getById("staffStudents", id),
    update: (id, data) => update("staffStudents", id, data),
    delete: (id) => remove("staffStudents", id),
    create: (data) => create("staffStudents", data),
};

// ═════════════════════════════════
//  STUDENT DATA (logged-in student)
// ═════════════════════════════════
export const studentDataService = {
    get: () => getById("studentData", "current"),
    update: (data) => update("studentData", "current", data),
    set: (data) => setDoc(doc(db, "studentData", "current"), data),
};

// ═════════════════════════════════
//  STAFF DATA (logged-in staff — salary & attendance)
// ═════════════════════════════════
export const currentStaffService = {
    getSalary: () => getById("currentStaff", "salary"),
    setSalary: (data) => setDoc(doc(db, "currentStaff", "salary"), data),
    getAttendance: () => getById("currentStaff", "attendance"),
    setAttendance: (data) => setDoc(doc(db, "currentStaff", "attendance"), data),
};

// ═════════════════════════════════
//  MARKS
// ═════════════════════════════════
export const marksService = {
    getAll: () => getAll("marks"),
    save: async (examType, subject, dept, year, section, marksData) => {
        const docId = `${dept}-${year}-${section}-${examType}-${subject}`.replace(/\s+/g, "_");
        await setDoc(doc(db, "marks", docId), {
            examType, subject, dept, year, section, marks: marksData,
            updatedAt: new Date().toISOString(),
        });
    },
};

// ═════════════════════════════════
//  ATTENDANCE RECORDS
// ═════════════════════════════════
export const attendanceService = {
    save: async (date, records) => {
        await setDoc(doc(db, "attendance", date), {
            date, records, updatedAt: new Date().toISOString(),
        });
    },
    getByDate: (date) => getById("attendance", date),
    getAll: () => getAll("attendance"),
};

// ═════════════════════════════════
//  BATCH SEED HELPER
// ═════════════════════════════════
export const seedCollection = async (collectionName, dataArray) => {
    const batch = writeBatch(db);
    dataArray.forEach((item, index) => {
        const docId = item.id ? String(item.id) : String(index + 1);
        const ref = doc(db, collectionName, docId);
        // Remove getter functions — Firestore can't store them
        const clean = JSON.parse(JSON.stringify(item));
        batch.set(ref, clean);
    });
    await batch.commit();
};

export const seedDocument = async (collectionName, docId, data) => {
    const clean = JSON.parse(JSON.stringify(data));
    await setDoc(doc(db, collectionName, docId), clean);
};
