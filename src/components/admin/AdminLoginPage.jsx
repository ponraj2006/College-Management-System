import { useState } from "react";
import { FaShieldAlt, FaEnvelope, FaLock, FaSignInAlt, FaUniversity } from "react-icons/fa";

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
            {/* Gold/Amber orbs */}
            <div className="login-bg-orb admin-gold-orb-1"></div>
            <div className="login-bg-orb admin-gold-orb-2"></div>
            <div className="login-bg-orb admin-gold-orb-3"></div>

            <div className="login-card admin-login-card">
                {/* Secure Institution Badge */}
                <div className="admin-institution-badge">
                    <FaUniversity size={12} />
                    <span>EduConnect — Secure Administration System</span>
                </div>

                <div className="login-header">
                    <div className="login-logo">
                        <div className="login-logo-icon admin-gold-logo-icon">
                            <FaShieldAlt size={28} />
                        </div>
                    </div>
                    <h1 className="login-title admin-gold-title">Administration</h1>
                    <p className="login-subtitle admin-gold-subtitle">Authorised Personnel Only</p>
                </div>

                {loginError && (
                    <div className="admin-login-error">
                        <span>⚠️ {loginError}</span>
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className={`input-group admin-gold-input ${errors.email ? "has-error" : ""}`}>
                        <div className="input-icon"><FaEnvelope /></div>
                        <input
                            id="admin-email"
                            type="email"
                            placeholder="Admin Email Address"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }}
                            autoComplete="email"
                        />
                        {errors.email && <span className="input-error">{errors.email}</span>}
                    </div>

                    <div className={`input-group admin-gold-input ${errors.password ? "has-error" : ""}`}>
                        <div className="input-icon"><FaLock /></div>
                        <input
                            id="admin-password"
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: "" })); }}
                            autoComplete="current-password"
                        />
                        {errors.password && <span className="input-error">{errors.password}</span>}
                    </div>

                    <button
                        id="admin-login-submit"
                        type="submit"
                        className={`login-submit-btn admin-gold-submit-btn ${isSubmitting ? "submitting" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="login-spinner"></span>
                        ) : (
                            <>
                                <FaSignInAlt />
                                <span>Access Admin Portal</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="login-footer-text admin-gold-footer">
                    🔒 Restricted Area · © 2026 EduConnect Administration
                </p>
            </div>
        </div>
    );
}
