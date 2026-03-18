import { useState } from "react";
import {
    HiOutlineArrowLeft, HiOutlinePencil, HiOutlineCheck, HiOutlineX,
    HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineAcademicCap,
    HiOutlineCurrencyRupee,
} from "react-icons/hi";

export default function AdminStaffDetail({ staff, onBack, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: staff?.name || "",
        phone: staff?.phone || "",
        email: staff?.email || "",
        designation: staff?.designation || "",
        department: staff?.department || "",
        qualification: staff?.qualification || "",
    });

    if (!staff) {
        return (
            <div className="dashboard-page fade-in">
                <p>Staff member not found.</p>
                <button className="staff-add-btn" onClick={onBack}>← Go Back</button>
            </div>
        );
    }

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave({ ...staff, ...form });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm({
            name: staff.name, phone: staff.phone, email: staff.email,
            designation: staff.designation, department: staff.department,
            qualification: staff.qualification,
        });
        setIsEditing(false);
    };

    const salary = staff.salary;

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <button className="back-btn" onClick={onBack}>
                        <HiOutlineArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>{staff.name}</h1>
                        <p className="subtitle">{staff.regNo} • {staff.designation}</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button className="staff-add-btn" onClick={() => setIsEditing(true)}>
                        <HiOutlinePencil size={16} /> Edit
                    </button>
                ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button className="staff-save-btn" onClick={handleSave}>
                            <HiOutlineCheck size={16} /> Save
                        </button>
                        <button className="staff-cancel-btn" onClick={handleCancel}>
                            <HiOutlineX size={16} /> Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="admin-detail-grid">
                {/* Personal Information */}
                <div className="card">
                    <h3 className="card-title">Personal Information</h3>
                    <div className="detail-rows">
                        <div className="detail-row">
                            <span className="detail-label">Full Name</span>
                            {isEditing ? (
                                <input className="staff-form-input" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                            ) : (
                                <span className="detail-value">{staff.name}</span>
                            )}
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Staff ID</span>
                            <span className="detail-value"><span className="code-badge">{staff.regNo}</span></span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Department</span>
                            {isEditing ? (
                                <select className="staff-select" value={form.department} onChange={(e) => handleChange("department", e.target.value)}>
                                    <option>Computer Science & Engineering</option>
                                    <option>Electronics & Communication</option>
                                    <option>Mechanical Engineering</option>
                                    <option>Civil Engineering</option>
                                </select>
                            ) : (
                                <span className="detail-value">{staff.department}</span>
                            )}
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Designation</span>
                            {isEditing ? (
                                <input className="staff-form-input" value={form.designation} onChange={(e) => handleChange("designation", e.target.value)} />
                            ) : (
                                <span className="detail-value">{staff.designation}</span>
                            )}
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Gender</span>
                            <span className="detail-value">{staff.gender}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Date of Birth</span>
                            <span className="detail-value">{staff.dob}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Joining Date</span>
                            <span className="detail-value">{staff.joiningDate}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Experience</span>
                            <span className="detail-value">{staff.experience}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="card">
                    <h3 className="card-title">Contact & Qualifications</h3>
                    <div className="detail-rows">
                        <div className="detail-row">
                            <span className="detail-label"><HiOutlineMail size={14} /> Email</span>
                            {isEditing ? (
                                <input className="staff-form-input" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                            ) : (
                                <span className="detail-value">{staff.email}</span>
                            )}
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><HiOutlinePhone size={14} /> Phone</span>
                            {isEditing ? (
                                <input className="staff-form-input" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                            ) : (
                                <span className="detail-value">{staff.phone}</span>
                            )}
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><HiOutlineAcademicCap size={14} /> Qualification</span>
                            {isEditing ? (
                                <input className="staff-form-input" value={form.qualification} onChange={(e) => handleChange("qualification", e.target.value)} />
                            ) : (
                                <span className="detail-value">{staff.qualification}</span>
                            )}
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Subjects</span>
                            <span className="detail-value">
                                {staff.subjects?.map((sub, i) => (
                                    <span key={i} className="code-badge" style={{ marginRight: "6px" }}>{sub}</span>
                                ))}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Salary Breakdown */}
                <div className="card" style={{ gridColumn: "1 / -1" }}>
                    <h3 className="card-title"><HiOutlineCurrencyRupee size={18} /> Salary Details</h3>
                    <div className="salary-grid">
                        <div className="salary-section earnings">
                            <h4>Earnings</h4>
                            <div className="salary-row"><span>Basic Pay</span><span>₹{salary.basic?.toLocaleString()}</span></div>
                            <div className="salary-row"><span>HRA</span><span>₹{salary.hra?.toLocaleString()}</span></div>
                            <div className="salary-row"><span>DA</span><span>₹{salary.da?.toLocaleString()}</span></div>
                            <div className="salary-row"><span>Medical</span><span>₹{salary.medical?.toLocaleString()}</span></div>
                            <div className="salary-row total"><span>Gross Pay</span><span>₹{(salary.basic + salary.hra + salary.da + salary.medical).toLocaleString()}</span></div>
                        </div>
                        <div className="salary-section deductions">
                            <h4>Deductions</h4>
                            <div className="salary-row"><span>PF</span><span>₹{salary.pfDeduction?.toLocaleString()}</span></div>
                            <div className="salary-row"><span>Tax</span><span>₹{salary.taxDeduction?.toLocaleString()}</span></div>
                            <div className="salary-row total"><span>Total Deductions</span><span>₹{(salary.pfDeduction + salary.taxDeduction).toLocaleString()}</span></div>
                        </div>
                        <div className="salary-section net-pay">
                            <div className="net-pay-card">
                                <span>Net Pay (Monthly)</span>
                                <h2>₹{(salary.basic + salary.hra + salary.da + salary.medical - salary.pfDeduction - salary.taxDeduction).toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
