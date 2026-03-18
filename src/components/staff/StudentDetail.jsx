import {
    HiOutlineArrowLeft,
    HiOutlinePencil,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineCalendar,
    HiOutlineLocationMarker,
} from "react-icons/hi";

export default function StudentDetail({ student, onBack, onEdit }) {
    if (!student) return null;

    const getStatusClass = (percent) => {
        if (percent >= 90) return "status-excellent";
        if (percent >= 75) return "status-good";
        return "status-low";
    };

    const getFeeClass = (status) => {
        if (status === "paid") return "status-paid";
        if (status === "partial") return "status-partial";
        return "status-pending";
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <button className="staff-back-btn" onClick={onBack}>
                        <HiOutlineArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>Student Details</h1>
                        <p className="subtitle">Complete profile and academic information</p>
                    </div>
                </div>
                <button className="staff-add-btn" onClick={() => onEdit(student.id)}>
                    <HiOutlinePencil size={16} />
                    <span>Edit Student</span>
                </button>
            </div>

            <div className="staff-detail-grid">
                {/* Profile Card */}
                <div className="card staff-profile-main-card">
                    <div className="staff-detail-avatar">
                        {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <h2 className="staff-detail-name">{student.name}</h2>
                    <span className="roll-badge">{student.regNo}</span>
                    <div className="profile-tags">
                        <span className="tag">{student.department}</span>
                        <span className="tag">{student.year}</span>
                        <span className="tag">Section {student.section}</span>
                    </div>

                    <div className="staff-detail-contact">
                        <div className="staff-contact-item">
                            <HiOutlineMail size={16} />
                            <span>{student.email}</span>
                        </div>
                        <div className="staff-contact-item">
                            <HiOutlinePhone size={16} />
                            <span>{student.phone}</span>
                        </div>
                        <div className="staff-contact-item">
                            <HiOutlineCalendar size={16} />
                            <span>{new Date(student.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                    </div>
                </div>

                {/* Academic Summary */}
                <div className="staff-detail-right">
                    <div className="staff-academic-cards">
                        <div className="card staff-mini-stat">
                            <p className="stat-label">Attendance</p>
                            <h2 className={`stat-value ${student.attendancePercent >= 75 ? "text-success" : "text-danger"}`}>
                                {student.attendancePercent}%
                            </h2>
                            <span className={`status-badge ${getStatusClass(student.attendancePercent)}`}>
                                {student.attendancePercent >= 90 ? "Excellent" : student.attendancePercent >= 75 ? "Good" : "Low"}
                            </span>
                        </div>
                        <div className="card staff-mini-stat">
                            <p className="stat-label">CGPA</p>
                            <h2 className="stat-value">{student.cgpa.toFixed(2)}</h2>
                            <span className={`status-badge ${student.cgpa >= 8 ? "status-excellent" : student.cgpa >= 6 ? "status-good" : "status-low"}`}>
                                {student.cgpa >= 9 ? "Outstanding" : student.cgpa >= 8 ? "Very Good" : student.cgpa >= 6 ? "Good" : "Needs Improvement"}
                            </span>
                        </div>
                        <div className="card staff-mini-stat">
                            <p className="stat-label">Fee Status</p>
                            <h2 className="stat-value" style={{ textTransform: "capitalize" }}>{student.feeStatus}</h2>
                            <span className={`status-badge ${getFeeClass(student.feeStatus)}`}>
                                {student.feeStatus}
                            </span>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="card">
                        <h3 className="card-title">Personal Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Gender</span>
                                <span className="info-value">{student.gender}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Blood Group</span>
                                <span className="info-value blood-group">{student.bloodGroup}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Date of Birth</span>
                                <span className="info-value">{new Date(student.dob).toLocaleDateString("en-IN")}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Section</span>
                                <span className="info-value">{student.section}</span>
                            </div>
                            <div className="info-item full-width">
                                <span className="info-label">Email</span>
                                <span className="info-value">{student.email}</span>
                            </div>
                            <div className="info-item full-width">
                                <span className="info-label">Phone</span>
                                <span className="info-value">{student.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Guardian Info */}
                    <div className="card">
                        <h3 className="card-title">Guardian Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Name</span>
                                <span className="info-value">{student.guardian.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Relation</span>
                                <span className="info-value">{student.guardian.relation}</span>
                            </div>
                            <div className="info-item full-width">
                                <span className="info-label">Phone</span>
                                <span className="info-value">{student.guardian.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
