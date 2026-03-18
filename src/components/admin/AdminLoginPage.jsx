import { useState } from "react";
import { FaShieldAlt, FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";

export default function AdminLoginPage({ onAdminLogin, onBackToMain }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError("");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            onAdminLogin(email, password, (error) => {
                setIsSubmitting(false);
                if (error) setLoginError(error);
            });
        }, 600);
    };

    return (
        <div className="login-page admin-login-page">
            <div className="login-bg-orb login-bg-orb-1 admin-orb"></div>
            <div className="login-bg-orb login-bg-orb-2 admin-orb"></div>
            <div className="login-bg-orb login-bg-orb-3 admin-orb"></div>

            <div className="login-card admin-login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <div className="login-logo-icon admin-logo-icon">
                            <FaShieldAlt size={28} />
                        </div>
                    </div>
                    <h1 className="login-title admin-title">Admin Portal</h1>
                    <p className="login-subtitle">EduConnect Administration</p>
                </div>

                {loginError && (
                    <div className="admin-login-error">
                        <span>⚠️ {loginError}</span>
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className={`input-group ${errors.email ? "has-error" : ""}`}>
                        <div className="input-icon"><FaEnvelope /></div>
                        <input
                            id="admin-email"
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }}
                            autoComplete="email"
                        />
                        {errors.email && <span className="input-error">{errors.email}</span>}
                    </div>

                    <div className={`input-group ${errors.password ? "has-error" : ""}`}>
                        <div className="input-icon"><FaLock /></div>
                        <input
                            id="admin-password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: "" })); }}
                            autoComplete="current-password"
                        />
                        {errors.password && <span className="input-error">{errors.password}</span>}
                    </div>

                    <button
                        id="admin-login-submit"
                        type="submit"
                        className={`login-submit-btn admin-submit-btn ${isSubmitting ? "submitting" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="login-spinner"></span>
                        ) : (
                            <>
                                <FaSignInAlt />
                                <span>Sign In as Admin</span>
                            </>
                        )}
                    </button>
                </form>

                <button className="admin-back-link" onClick={onBackToMain}>
                    <FaArrowLeft size={14} />
                    <span>Back to Student / Staff Login</span>
                </button>

                <p className="login-footer-text">
                    © 2026 EduConnect &middot; Admin Portal
                </p>
            </div>
        </div>
    );
}
