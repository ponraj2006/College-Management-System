import { useState, useMemo } from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

export default function AdminStaffAttendance({ staffs, onMarkAttendance }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendance, setAttendance] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const loadStaff = () => {
        const initial = {};
        staffs.forEach((s) => {
            // Check if there's already attendance for this date
            const existing = s.attendanceHistory?.find((a) => a.date === selectedDate);
            initial[s.id] = existing ? existing.status : "P";
        });
        setAttendance(initial);
        setLoaded(true);
        setSubmitted(false);
    };

    const toggleAttendance = (id) => {
        setAttendance((prev) => ({
            ...prev,
            [id]: prev[id] === "P" ? "A" : prev[id] === "A" ? "L" : "P",
        }));
    };

    const markAllPresent = () => {
        const updated = {};
        staffs.forEach((s) => { updated[s.id] = "P"; });
        setAttendance(updated);
    };

    const markAllAbsent = () => {
        const updated = {};
        staffs.forEach((s) => { updated[s.id] = "A"; });
        setAttendance(updated);
    };

    const handleSubmit = () => {
        if (onMarkAttendance) {
            onMarkAttendance(selectedDate, attendance);
        }
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "P": return { bg: "rgba(0,212,170,0.15)", color: "#00d4aa", label: "Present" };
            case "A": return { bg: "rgba(255,77,106,0.15)", color: "#ff4d6a", label: "Absent" };
            case "L": return { bg: "rgba(255,167,38,0.15)", color: "#ffa726", label: "Leave" };
            default: return { bg: "rgba(108,99,255,0.15)", color: "#6c63ff", label: status };
        }
    };

    const presentCount = Object.values(attendance).filter(v => v === "P").length;
    const absentCount = Object.values(attendance).filter(v => v === "A").length;
    const leaveCount = Object.values(attendance).filter(v => v === "L").length;

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Staff Attendance 📋</h1>
                    <p className="subtitle">Mark daily attendance for all staff members</p>
                </div>
            </div>

            {submitted && (
                <div className="staff-toast">
                    ✅ Staff attendance submitted successfully for {selectedDate}!
                </div>
            )}

            <div className="card staff-attendance-selectors">
                <h3 className="card-title">Select Date</h3>
                <div className="staff-filters-bar">
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Date</label>
                        <input
                            type="date"
                            className="staff-form-input"
                            value={selectedDate}
                            onChange={(e) => { setSelectedDate(e.target.value); setLoaded(false); }}
                        />
                    </div>
                    <div className="staff-filter-group" style={{ alignSelf: "flex-end" }}>
                        <button className="staff-add-btn" onClick={loadStaff}>
                            Load Staff
                        </button>
                    </div>
                </div>
            </div>

            {loaded && (
                <div className="card">
                    <div className="staff-attendance-header">
                        <h3 className="card-title" style={{ marginBottom: 0 }}>
                            Staff Attendance • {selectedDate}
                        </h3>
                        <div className="staff-attendance-bulk-actions">
                            <span className="attendance-summary-badge present">P: {presentCount}</span>
                            <span className="attendance-summary-badge absent">A: {absentCount}</span>
                            <span className="attendance-summary-badge leave">L: {leaveCount}</span>
                            <button className="staff-bulk-btn present" onClick={markAllPresent}>All Present</button>
                            <button className="staff-bulk-btn absent" onClick={markAllAbsent}>All Absent</button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Staff ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map((staff, idx) => {
                                    const status = attendance[staff.id] || "P";
                                    const style = getStatusStyle(status);
                                    return (
                                        <tr key={staff.id}>
                                            <td>{idx + 1}</td>
                                            <td><span className="code-badge">{staff.regNo}</span></td>
                                            <td>
                                                <div className="student-name-cell">
                                                    <div className="student-avatar-mini">
                                                        {staff.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                                    </div>
                                                    <span>{staff.name}</span>
                                                </div>
                                            </td>
                                            <td><span className="dept-tag">{staff.department.split(" ")[0]}</span></td>
                                            <td>{staff.designation}</td>
                                            <td>
                                                <button
                                                    className="staff-att-toggle-large"
                                                    style={{ background: style.bg, color: style.color, border: `1px solid ${style.color}30` }}
                                                    onClick={() => toggleAttendance(staff.id)}
                                                    title="Click to toggle: P → A → L → P"
                                                >
                                                    {status === "P" ? <HiOutlineCheck size={16} /> : status === "A" ? <HiOutlineX size={16} /> : "🟡"}
                                                    <span>{style.label}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="staff-form-actions" style={{ marginTop: "20px" }}>
                        <button className="staff-save-btn" onClick={handleSubmit}>
                            <HiOutlineCheck size={18} />
                            <span>Submit Attendance</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
