// ── User Service ──
// CRUD for `users/{uid}` collection
import { getAll, getById, set, update, remove } from "../firebase/firestore";

const COLLECTION = "users";

const userService = {
    getAll: () => getAll(COLLECTION),
    getById: (uid) => getById(COLLECTION, uid),
    create: (uid, data) => set(COLLECTION, uid, {
        uid,
        role: data.role || "student",
        email: data.email,
        name: data.name,
        regNo: data.regNo || null,
        departmentId: data.departmentId || null,
        isActive: true,
        createdAt: new Date().toISOString(),
        ...data,
    }),
    update: (uid, data) => update(COLLECTION, uid, data),
    delete: (uid) => remove(COLLECTION, uid),
};

export default userService;
