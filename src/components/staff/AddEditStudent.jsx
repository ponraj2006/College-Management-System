import { useState, useEffect } from "react";
import { HiOutlineArrowLeft, HiOutlineSave } from "react-icons/hi";
import { departments, years, sections } from "../../data/staffStudentsData";

export default function AddEditStudent({ student, onSave, onCancel }) {
    const isEdit = !!student;

    const emptyForm = {
        name: "",
        regNo: "",
        department: departments[0],
        year: years[0],
        section: sections[0],
        email: "",
        phone: "",
        dob: "",
        gender: "Male",
        bloodGroup: "O+",
        guardian: { name: "", relation: "Father", phone: "" },
        attendancePercent: 0,
        cgpa: 0,
        feeStatus: "pending",
    };

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (student) {
            setForm({ ...student });
        } else {
            setForm(emptyForm);
        }
    }, [student]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const handleGuardianChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            guardian: { ...prev.guardian, [field]: value },
        }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.regNo.trim()) errs.regNo = "Reg No is required";
        if (!form.email.trim()) errs.email = "Email is required";
        if (!form.phone.trim()) errs.phone = "Phone is required";
        if (!form.dob) errs.dob = "Date of birth is required";
        if (!form.guardian.name.trim()) errs.guardianName = "Guardian name is required";
        if (!form.guardian.phone.trim()) errs.guardianPhone = "Guardian phone is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({
            ...form,
            attendancePercent: Number(form.attendancePercent) || 0,
            cgpa: Number(form.cgpa) || 0,
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <button className="staff-back-btn" onClick={onCancel}>
                        <HiOutlineArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>{isEdit ? "Edit Student ✏️" : "Add New Student ➕"}</h1>
                        <p className="subtitle">{isEdit ? "Update student information" : "Fill in the student details below"}</p>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="staff-toast">
                    ✅ Student {isEdit ? "updated" : "added"} successfully!
                </div>
            )}

            <form className="staff-form" onSubmit={handleSubmit}>
                <div className="card">
                    <h3 className="card-title">Personal Details</h3>
                    <div className="staff-form-grid">
                        <div className={`staff-form-group ${errors.name ? "has-error" : ""}`}>
                            <label className="staff-form-label">Full Name *</label>
                            <input
                                type="text"
                                className="staff-form-input"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter full name"
                            />
                            {errors.name && <span className="staff-form-error">{errors.name}</span>}
                        </div>

                        <div className={`staff-form-group ${errors.regNo ? "has-error" : ""}`}>
                            <label className="staff-form-label">Registration No *</label>
                            <input
                                type="text"
                                className="staff-form-input"
                                value={form.regNo}
                                onChange={(e) => handleChange("regNo", e.target.value)}
                                placeholder="e.g. 22CS101"
                            />
                            {errors.regNo && <span className="staff-form-error">{errors.regNo}</span>}
                        </div>

                        <div className="staff-form-group">
                            <label className="staff-form-label">Department</label>
                            <select
                                className="staff-select"
                                value={form.department}
                                onChange={(e) => handleChange("department", e.target.value)}
                            >
                                {departments.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className="staff-form-group">
                            <label className="staff-form-label">Year</label>
                            <select
                                className="staff-select"
                                value={form.year}
                                onChange={(e) => handleChange("year", e.target.value)}
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        <div className="staff-form-group">
                            <label className="staff-form-label">Section</label>
                            <select
                                className="staff-select"
                                value={form.section}
                                onChange={(e) => handleChange("section", e.target.value)}
                            >
                                {sections.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className={`staff-form-group ${errors.email ? "has-error" : ""}`}>
                            <label className="staff-form-label">Email *</label>
                            <input
                                type="email"
                                className="staff-form-input"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="student@college.edu"
                            />
                            {errors.email && <span className="staff-form-error">{errors.email}</span>}
                        </div>

                        <div className={`staff-form-group ${errors.phone ? "has-error" : ""}`}>
                            <label className="staff-form-label">Phone *</label>
                            <input
                                type="text"
                                className="staff-form-input"
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                placeholder="+91 XXXXX XXXXX"
                            />
                            {errors.phone && <span className="staff-form-error">{errors.phone}</span>}
                        </div>

                        <div className={`staff-form-group ${errors.dob ? "has-error" : ""}`}>
                            <label className="staff-form-label">Date of Birth *</label>
                            <input
                                type="date"
                                className="staff-form-input"
                                value={form.dob}
                                onChange={(e) => handleChange("dob", e.target.value)}
                            />
                            {errors.dob && <span className="staff-form-error">{errors.dob}</span>}
                        </div>

                        <div className="staff-form-group">
                            <label className="staff-form-label">Gender</label>
                            <select
                                className="staff-select"
                                value={form.gender}
                                onChange={(e) => handleChange("gender", e.target.value)}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="staff-form-group">
                            <label className="staff-form-label">Blood Group</label>
                            <select
                                className="staff-select"
                                value={form.bloodGroup}
                                onChange={(e) => handleChange("bloodGroup", e.target.value)}
                            >
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                    <option key={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Guardian Information</h3>
                    <div className="staff-form-grid">
                        <div className={`staff-form-group ${errors.guardianName ? "has-error" : ""}`}>
                            <label className="staff-form-label">Guardian Name *</label>
                            <input
                                type="text"
                                className="staff-form-input"
                                value={form.guardian.name}
                                onChange={(e) => handleGuardianChange("name", e.target.value)}
                                placeholder="Guardian full name"
                            />
                            {errors.guardianName && <span className="staff-form-error">{errors.guardianName}</span>}
                        </div>

                        <div className="staff-form-group">
                            <label className="staff-form-label">Relation</label>
                            <select
                                className="staff-select"
                                value={form.guardian.relation}
                                onChange={(e) => handleGuardianChange("relation", e.target.value)}
                            >
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Guardian</option>
                            </select>
                        </div>

                        <div className={`staff-form-group ${errors.guardianPhone ? "has-error" : ""}`}>
                            <label className="staff-form-label">Guardian Phone *</label>
                            <input
                                type="text"
                                className="staff-form-input"
                                value={form.guardian.phone}
                                onChange={(e) => handleGuardianChange("phone", e.target.value)}
                                placeholder="+91 XXXXX XXXXX"
                            />
                            {errors.guardianPhone && <span className="staff-form-error">{errors.guardianPhone}</span>}
                        </div>
                    </div>
                </div>

                {isEdit && (
                    <div className="card">
                        <h3 className="card-title">Academic Information</h3>
                        <div className="staff-form-grid">
                            <div className="staff-form-group">
                                <label className="staff-form-label">Attendance %</label>
                                <input
                                    type="number"
                                    className="staff-form-input"
                                    value={form.attendancePercent}
                                    onChange={(e) => handleChange("attendancePercent", e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div className="staff-form-group">
                                <label className="staff-form-label">CGPA</label>
                                <input
                                    type="number"
                                    className="staff-form-input"
                                    value={form.cgpa}
                                    onChange={(e) => handleChange("cgpa", e.target.value)}
                                    min="0"
                                    max="10"
                                    step="0.01"
                                />
                            </div>
                            <div className="staff-form-group">
                                <label className="staff-form-label">Fee Status</label>
                                <select
                                    className="staff-select"
                                    value={form.feeStatus}
                                    onChange={(e) => handleChange("feeStatus", e.target.value)}
                                >
                                    <option value="paid">Paid</option>
                                    <option value="partial">Partial</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="staff-form-actions">
                    <button type="button" className="staff-cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="staff-save-btn">
                        <HiOutlineSave size={18} />
                        <span>{isEdit ? "Update Student" : "Add Student"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
