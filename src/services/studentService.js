// ── Student Service ──
// CRUD for `students/{studentId}` collection
import { getAll, getById, set, update, remove, queryDocs, where, batchWrite } from "../firebase/firestore";

const COLLECTION = "students";

const studentService = {
    getAll: () => getAll(COLLECTION),
    getById: (studentId) => getById(COLLECTION, studentId),
    create: (studentId, data) => set(COLLECTION, studentId, {
        studentId,
        ...data,
        createdAt: new Date().toISOString(),
    }),
    update: (studentId, data) => update(COLLECTION, studentId, data),
    delete: (studentId) => remove(COLLECTION, studentId),

    /** Get students by department */
    getByDepartment: (departmentId) =>
        queryDocs(COLLECTION, where("personal.departmentId", "==", departmentId)),

    /** Get students by year & semester */
    getBySemester: (year, semester) =>
        queryDocs(COLLECTION, where("personal.year", "==", year), where("personal.semester", "==", semester)),

    /** Get hostel students */
    getHostelStudents: () =>
        queryDocs(COLLECTION, where("isHostel", "==", true)),

    /** Get bus students */
    getBusStudents: () =>
        queryDocs(COLLECTION, where("isBus", "==", true)),

    /** Batch seed students */
    seed: (dataArray) => batchWrite(COLLECTION, dataArray),
};

export default studentService;
