// ── Role Constants & Helpers ──

export const ROLES = {
    STUDENT: "student",
    STAFF: "staff",
    ADMIN: "admin",
    SUPER_ADMIN: "superadmin",
};

export const ROLE_LABELS = {
    [ROLES.STUDENT]: "Student",
    [ROLES.STAFF]: "Staff",
    [ROLES.ADMIN]: "Administrator",
    [ROLES.SUPER_ADMIN]: "Super Administrator",
};

/** Route prefix for each role */
export const ROLE_ROUTES = {
    [ROLES.STUDENT]: "/student",
    [ROLES.STAFF]: "/staff",
    [ROLES.ADMIN]: "/admin",
    [ROLES.SUPER_ADMIN]: "/superadmin",
};

/** Check helpers */
export const isStudent = (role) => role === ROLES.STUDENT;
export const isStaff = (role) => role === ROLES.STAFF;
export const isAdmin = (role) => role === ROLES.ADMIN;
export const isSuperAdmin = (role) => role === ROLES.SUPER_ADMIN;
export const hasAdminAccess = (role) => role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN;
