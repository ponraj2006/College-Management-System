// ── Staff Service ──
// CRUD for `staff/{staffId}` collection
import { getAll, getById, set, update, remove, queryDocs, where, batchWrite } from "../firebase/firestore";

const COLLECTION = "staff";

const staffService = {
    getAll: () => getAll(COLLECTION),
    getById: (staffId) => getById(COLLECTION, staffId),
    create: (staffId, data) => set(COLLECTION, staffId, {
        staffId,
        ...data,
        status: "active",
    }),
    update: (staffId, data) => update(COLLECTION, staffId, data),
    delete: (staffId) => remove(COLLECTION, staffId),

    /** Get staff by department */
    getByDepartment: (departmentId) =>
        queryDocs(COLLECTION, where("departmentId", "==", departmentId)),

    /** Get active staff */
    getActive: () =>
        queryDocs(COLLECTION, where("status", "==", "active")),

    /** Batch seed staff */
    seed: (dataArray) => batchWrite(COLLECTION, dataArray),
};

export default staffService;
