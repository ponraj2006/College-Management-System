// ── Fee Service ──
// CRUD for `fees/{feeId}` collection
import { getAll, getById, create, update, remove, queryDocs, where } from "../firebase/firestore";

const COLLECTION = "fees";

const feeService = {
    getAll: () => getAll(COLLECTION),
    getById: (id) => getById(COLLECTION, id),
    create: (data) => create(COLLECTION, {
        studentId: data.studentId,
        type: data.type || "Tuition Fee",
        totalAmount: data.totalAmount,
        paidAmount: data.paidAmount || 0,
        remainingAmount: data.totalAmount - (data.paidAmount || 0),
        dueDate: data.dueDate,
        status: data.paidAmount >= data.totalAmount ? "paid" : data.paidAmount > 0 ? "partial" : "unpaid",
    }),
    update: (id, data) => update(COLLECTION, id, data),
    delete: (id) => remove(COLLECTION, id),

    /** Get fees by student */
    getByStudent: (studentId) =>
        queryDocs(COLLECTION, where("studentId", "==", studentId)),

    /** Get overdue fees */
    getOverdue: () =>
        queryDocs(COLLECTION, where("status", "!=", "paid")),
};

export default feeService;
