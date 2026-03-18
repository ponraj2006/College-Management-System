// ── Auth Context ──
// Provides Firebase Auth state to the entire app
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthChange, loginWithEmail, registerUser, logoutUser } from "../firebase/auth";
import userService from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthChange(async (user) => {
            setCurrentUser(user);
            if (user) {
                try {
                    const data = await userService.getById(user.uid);
                    setUserData(data);
                } catch (err) {
                    console.warn("Could not load user data:", err.message);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        const cred = await loginWithEmail(email, password);
        const data = await userService.getById(cred.user.uid);
        setUserData(data);
        return { user: cred.user, userData: data };
    };

    const register = async (email, password, name, role = "student", extraData = {}) => {
        const cred = await registerUser(email, password, name);
        const newUserData = { email, name, role, ...extraData };
        await userService.create(cred.user.uid, newUserData);
        setUserData({ uid: cred.user.uid, ...newUserData });
        return cred;
    };

    const logout = async () => {
        await logoutUser();
        setUserData(null);
    };

    const value = {
        currentUser,
        userData,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
}

export default AuthContext;
