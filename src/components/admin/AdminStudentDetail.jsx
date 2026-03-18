import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlinePencil, HiOutlineSave, HiOutlineX } from "react-icons/hi";

export default function AdminStudentDetail({ student, onBack, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...student });

    if (!student) return <div className="dashboard-page fade-in"><p>Student not found.</p></div>;

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    const getFeeClass = (status) => {
        if (status === "paid") return "status-paid";
        if (status === "partial") return "status-partial";
        return "status-pending";
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <button className="staff-action-btn view" onClick={onBack} title="Back">
                        <HiOutlineArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>{student.name} 👤</h1>
                        <p className="subtitle">Student Profile & Fee Details</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {isEditing ? (
                        <>
                            <button className="staff-add-btn" onClick={handleSave}>
                                <HiOutlineSave size={18} /> <span>Save</span>
                            </button>
                            <button className="staff-action-btn edit" onClick={() => { setIsEditing(false); setFormData({ ...student }); }}>
                                <HiOutlineX size={18} />
                            </button>
                        </>
                    ) : (
                        <button className="staff-add-btn" onClick={() => setIsEditing(true)}>
                            <HiOutlinePencil size={18} /> <span>Edit</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="admin-detail-grid">
                {/* Personal Info */}
                <div className="card">
                    <h3 className="card-title">Personal Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Registration No</span>
                            <span className="info-value"><span className="code-badge">{student.regNo}</span></span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Name</span>
                            {isEditing ? (
                                <input className="admin-edit-input" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                            ) : (
                                <span className="info-value">{student.name}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Department</span>
                            <span className="info-value">{student.department}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Year / Section</span>
                            <span className="info-value">{student.year} — {student.section}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            {isEditing ? (
                                <input className="admin-edit-input" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                            ) : (
                                <span className="info-value">{student.email}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone</span>
                            {isEditing ? (
                                <input className="admin-edit-input" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                            ) : (
                                <span className="info-value">{student.phone}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Date of Birth</span>
                            <span className="info-value">{new Date(student.dob).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Gender</span>
                            <span className="info-value">{student.gender}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Blood Group</span>
                            <span className="info-value blood-group">{student.bloodGroup}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Guardian</span>
                            <span className="info-value">{student.guardian.name} ({student.guardian.relation})</span>
                        </div>
                    </div>
                </div>

                {/* Academic */}
                <div className="card">
                    <h3 className="card-title">Academic Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">CGPA</span>
                            <span className="info-value" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{student.cgpa.toFixed(2)}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Attendance</span>
                            <span className="info-value" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{student.attendancePercent}%</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Bus Student</span>
                            <span className={`status-badge ${student.isBus ? "status-paid" : "status-pending"}`}>
                                {student.isBus ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Hostel Student</span>
                            <span className={`status-badge ${student.isHostel ? "status-paid" : "status-pending"}`}>
                                {student.isHostel ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Fee Info */}
                <div className="card" style={{ gridColumn: "span 2" }}>
                    <h3 className="card-title">Fee Details</h3>
                    <div className="admin-fee-detail-cards">
                        <div className="admin-fee-mini-card">
                            <p>Total Fees</p>
                            <h2>₹{student.fees.totalFees.toLocaleString()}</h2>
                        </div>
                        <div className="admin-fee-mini-card paid">
                            <p>Paid</p>
                            <h2>₹{student.fees.paidAmount.toLocaleString()}</h2>
                        </div>
                        <div className="admin-fee-mini-card pending">
                            <p>Pending</p>
                            <h2>₹{student.fees.pendingAmount.toLocaleString()}</h2>
                        </div>
                        <div className="admin-fee-mini-card penalty">
                            <p>Penalty</p>
                            <h2>₹{student.fees.penalty.toLocaleString()}</h2>
                        </div>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <span className="info-label">Fee Status: </span>
                        <span className={`status-badge ${getFeeClass(student.fees.feeStatus)}`}>
                            {student.fees.feeStatus.charAt(0).toUpperCase() + student.fees.feeStatus.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
