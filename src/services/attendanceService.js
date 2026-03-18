// ── Attendance Service ──
// CRUD for `attendance/{attendanceId}` collection
import { getAll, getById, create, update, remove, queryDocs, where, set } from "../firebase/firestore";

const COLLECTION = "attendance";

const attendanceService = {
    getAll: () => getAll(COLLECTION),
    getById: (id) => getById(COLLECTION, id),
    create: (data) => create(COLLECTION, {
        studentId: data.studentId,
        subjectId: data.subjectId,
        date: data.date,
        status: data.status, // P, A, L (Present, Absent, Leave)
        markedBy: data.markedBy,
        createdAt: new Date().toISOString(),
    }),
    update: (id, data) => update(COLLECTION, id, data),
    delete: (id) => remove(COLLECTION, id),

    /** Save attendance by date (bulk) */
    saveByDate: (date, records) => set(COLLECTION, date, {
        date,
        records,
        updatedAt: new Date().toISOString(),
    }),

    /** Get attendance by date */
    getByDate: (date) => getById(COLLECTION, date),

    /** Get attendance by student */
    getByStudent: (studentId) =>
        queryDocs(COLLECTION, where("studentId", "==", studentId)),

    /** Get attendance by subject */
    getBySubject: (subjectId) =>
        queryDocs(COLLECTION, where("subjectId", "==", subjectId)),
};

export default attendanceService;
