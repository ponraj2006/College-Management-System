// ── Role Context ──
// Provides role-based access helpers
import { createContext, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { ROLES } from "../firebase/roles";

const RoleContext = createContext();

export function RoleProvider({ children }) {
    const { userData } = useAuthContext();

    const role = userData?.role || null;

    const value = {
        role,
        isStudent: role === ROLES.STUDENT,
        isStaff: role === ROLES.STAFF,
        isAdmin: role === ROLES.ADMIN,
        isSuperAdmin: role === ROLES.SUPER_ADMIN,
        hasAdminAccess: role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN,
    };

    return (
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRoleContext() {
    const context = useContext(RoleContext);
    if (!context) throw new Error("useRoleContext must be used within RoleProvider");
    return context;
}

export default RoleContext;
