import { useState } from "react";
import { FaGraduationCap, FaChalkboardTeacher, FaUser, FaEnvelope, FaLock, FaSignInAlt, FaShieldAlt } from "react-icons/fa";

function LoginPage({ onLogin, onAdminLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        // Simulate a quick auth delay
        setTimeout(() => {
            onLogin(formData.role, formData.name);
        }, 600);
    };

    return (
        <div className="login-page">
            {/* Animated background orbs */}
            <div className="login-bg-orb login-bg-orb-1"></div>
            <div className="login-bg-orb login-bg-orb-2"></div>
            <div className="login-bg-orb login-bg-orb-3"></div>

            <div className="login-card">
                {/* Header / Branding */}
                <div className="login-header">
                    <div className="login-logo">
                        <div className="login-logo-icon">
                            <FaGraduationCap size={28} />
                        </div>
                    </div>
                    <h1 className="login-title">EduConnect</h1>
                    <p className="login-subtitle">College Management Portal</p>
                </div>

                {/* Role Selector */}
                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-btn ${formData.role === "student" ? "active" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, role: "student" }))}
                    >
                        <FaGraduationCap />
                        <span>Student</span>
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${formData.role === "staff" ? "active" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, role: "staff" }))}
                    >
                        <FaChalkboardTeacher />
                        <span>Staff</span>
                    </button>
                    <div
                        className="role-slider"
                        style={{ transform: formData.role === "staff" ? "translateX(100%)" : "translateX(0)" }}
                    ></div>
                </div>

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className={`input-group ${errors.name ? "has-error" : ""}`}>
                        <div className="input-icon"><FaUser /></div>
                        <input
                            id="login-name"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                        {errors.name && <span className="input-error">{errors.name}</span>}
                    </div>

                   


                    {/* Email */}
                    <div className={`input-group ${errors.email ? "has-error" : ""}`}>
                        <div className="input-icon"><FaEnvelope /></div>
                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                        {errors.email && <span className="input-error">{errors.email}</span>}
                    </div>

                    {/* Password */}
                    <div className={`input-group ${errors.password ? "has-error" : ""}`}>
                        <div className="input-icon"><FaLock /></div>
                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        {errors.password && <span className="input-error">{errors.password}</span>}
                    </div>

                    {/* Submit */}
                    <button
                        id="login-submit"
                        type="submit"
                        className={`login-submit-btn ${isSubmitting ? "submitting" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="login-spinner"></span>
                        ) : (
                            <>
                                <FaSignInAlt />
                                <span>Sign In as {formData.role === "student" ? "Student" : "Staff"}</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="login-footer-text">
                    © 2026 EduConnect &middot; College Management System
                </p>
                <p className="admin-subtle-link-text">
                    <button className="admin-subtle-link" onClick={onAdminLogin}>
                        Admin Access
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
