// ── Marks Service ──
// CRUD for `marks/{markId}` collection
import { getAll, getById, create, update, remove, queryDocs, where, set } from "../firebase/firestore";

const COLLECTION = "marks";

const marksService = {
    getAll: () => getAll(COLLECTION),
    getById: (id) => getById(COLLECTION, id),
    create: (data) => create(COLLECTION, {
        studentId: data.studentId,
        semester: data.semester,
        subjectId: data.subjectId,
        internal: data.internal,
        external: data.external,
        total: (data.internal || 0) + (data.external || 0),
        grade: data.grade || "",
        updatedBy: data.updatedBy,
    }),
    update: (id, data) => update(COLLECTION, id, data),
    delete: (id) => remove(COLLECTION, id),

    /** Save marks with composite key (dept-year-section-exam-subject) */
    save: async (examType, subject, dept, year, section, marksData) => {
        const docId = `${dept}-${year}-${section}-${examType}-${subject}`.replace(/\s+/g, "_");
        await set(COLLECTION, docId, {
            examType, subject, dept, year, section,
            marks: marksData,
            updatedAt: new Date().toISOString(),
        });
    },

    /** Get marks by student */
    getByStudent: (studentId) =>
        queryDocs(COLLECTION, where("studentId", "==", studentId)),

    /** Get marks by subject */
    getBySubject: (subjectId) =>
        queryDocs(COLLECTION, where("subjectId", "==", subjectId)),
};

export default marksService;
