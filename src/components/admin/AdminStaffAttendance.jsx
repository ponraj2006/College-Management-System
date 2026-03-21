import { useState } from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

const STATUSES = ["P", "A", "OD", "H"];

const getStatusStyle = (status) => {
    switch (status) {
        case "P":  return { bg: "rgba(0,212,170,0.15)",  color: "#00d4aa", label: "Present"  };
        case "A":  return { bg: "rgba(255,77,106,0.15)", color: "#ff4d6a", label: "Absent"   };
        case "OD": return { bg: "rgba(108,99,255,0.15)", color: "#6c63ff", label: "On Duty"  };
        case "H":  return { bg: "rgba(255,167,38,0.15)", color: "#ffa726", label: "Holiday"  };
        default:   return { bg: "rgba(0,212,170,0.15)",  color: "#00d4aa", label: status     };
    }
};

const nextStatus = (current) => {
    const idx = STATUSES.indexOf(current);
    return STATUSES[(idx + 1) % STATUSES.length];
};

export default function AdminStaffAttendance({ staffs, onMarkAttendance }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendance, setAttendance] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const loadStaff = () => {
        const initial = {};
        staffs.forEach((s) => {
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
            [id]: nextStatus(prev[id] || "P"),
        }));
    };

    const setBulkStatus = (status) => {
        const updated = {};
        staffs.forEach((s) => { updated[s.id] = status; });
        setAttendance(updated);
    };

    const handleSubmit = () => {
        if (onMarkAttendance) onMarkAttendance(selectedDate, attendance);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const countByStatus = (s) => Object.values(attendance).filter(v => v === s).length;

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
                        <button className="staff-add-btn" onClick={loadStaff}>Load Staff</button>
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
                            <span className="attendance-summary-badge present">P: {countByStatus("P")}</span>
                            <span className="attendance-summary-badge absent">A: {countByStatus("A")}</span>
                            <span className="attendance-summary-badge onduty">OD: {countByStatus("OD")}</span>
                            <span className="attendance-summary-badge holiday">H: {countByStatus("H")}</span>
                            <button className="staff-bulk-btn present" onClick={() => setBulkStatus("P")}>All Present</button>
                            <button className="staff-bulk-btn absent"  onClick={() => setBulkStatus("A")}>All Absent</button>
                            <button className="staff-bulk-btn onduty"  onClick={() => setBulkStatus("OD")}>All On Duty</button>
                            <button className="staff-bulk-btn holiday" onClick={() => setBulkStatus("H")}>All Holiday</button>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="att-legend-bar" style={{ marginBottom: "16px" }}>
                        {STATUSES.map(s => {
                            const st = getStatusStyle(s);
                            return (
                                <span key={s} className="att-legend-item" style={{ color: st.color }}>
                                    <span className="att-dot" style={{ background: st.color }}></span>
                                    {st.label} ({s})
                                </span>
                            );
                        })}
                        <span className="att-legend-hint">Click a status to cycle: P → A → OD → H</span>
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
                                                    style={{ background: style.bg, color: style.color, border: `1px solid ${style.color}40` }}
                                                    onClick={() => toggleAttendance(staff.id)}
                                                    title="Click to cycle: Present → Absent → On Duty → Holiday"
                                                >
                                                    <span>{style.label}</span>
                                                    <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>({status})</span>
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

