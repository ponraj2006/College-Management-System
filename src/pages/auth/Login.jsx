// ── Login Page ──
// Uses the existing styled LoginPage and AdminLoginPage components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../components/student/LoginPage";
import AdminLoginPage from "../../components/admin/AdminLoginPage";

export default function Login() {
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (role, name) => {
        // Store auth info in sessionStorage for now
        sessionStorage.setItem("educonnect-auth", JSON.stringify({ role, name, isLoggedIn: true }));

        if (role === "staff") {
            navigate("/staff/dashboard");
        } else {
            navigate("/student/dashboard");
        }
    };

    const handleAdminLogin = (email, password, onError) => {
        // Using the same admin credentials
        if (email === "admin@educonnect.edu" && password === "admin123") {
            sessionStorage.setItem("educonnect-auth", JSON.stringify({
                role: "admin", name: "Administrator", isLoggedIn: true,
            }));
            navigate("/admin/dashboard");
        } else {
            onError("Invalid admin credentials. Please try again.");
        }
    };

    if (showAdminLogin) {
        return (
            <AdminLoginPage
                onAdminLogin={handleAdminLogin}
                onBackToMain={() => setShowAdminLogin(false)}
            />
        );
    }

    return (
        <LoginPage
            onLogin={handleLogin}
            onAdminLogin={() => setShowAdminLogin(true)}
        />
    );
}
