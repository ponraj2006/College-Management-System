// ── Payment Service ──
// CRUD for `payments/{paymentId}` collection
import { getAll, getById, create, update, remove, queryDocs, where } from "../firebase/firestore";

const COLLECTION = "payments";

const paymentService = {
    getAll: () => getAll(COLLECTION),
    getById: (id) => getById(COLLECTION, id),
    create: (data) => create(COLLECTION, {
        studentId: data.studentId,
        amount: data.amount,
        method: data.method || "UPI",
        txnId: data.txnId,
        description: data.description || "",
        status: data.status || "success",
        paidAt: new Date().toISOString(),
    }),
    update: (id, data) => update(COLLECTION, id, data),
    delete: (id) => remove(COLLECTION, id),

    /** Get payments by student */
    getByStudent: (studentId) =>
        queryDocs(COLLECTION, where("studentId", "==", studentId)),
};

export default paymentService;
