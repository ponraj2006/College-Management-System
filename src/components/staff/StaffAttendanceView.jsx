import { useState, useMemo } from "react";
import { HiOutlineClipboardCheck, HiOutlineExclamation, HiOutlineCalendar } from "react-icons/hi";

export default function StaffAttendanceView({ attendanceData }) {
    const months = attendanceData.monthly || [];
    const allDays = attendanceData.days || [];

    // Get unique months from days data
    const availableMonths = useMemo(() => {
        const monthSet = new Set();
        allDays.forEach((d) => {
            const yearMonth = d.date.substring(0, 7); // "2026-02"
            monthSet.add(yearMonth);
        });
        return Array.from(monthSet).sort().reverse();
    }, [allDays]);

    const [selectedMonth, setSelectedMonth] = useState(availableMonths[0] || "");

    const filteredDays = useMemo(() => {
        return allDays.filter((d) => d.date.startsWith(selectedMonth));
    }, [allDays, selectedMonth]);

    const workingDays = filteredDays.filter((d) => d.status !== "H");
    const presentDays = filteredDays.filter((d) => d.status === "P").length;
    const absentDays = filteredDays.filter((d) => d.status === "A").length;
    const leaveDays = filteredDays.filter((d) => d.status === "L").length;
    const holidays = filteredDays.filter((d) => d.status === "H").length;
    const attendancePct = workingDays.length > 0 ? Math.round((presentDays / workingDays.length) * 100) : 0;

    const getStatusDisplay = (status) => {
        switch (status) {
            case "P": return { label: "Present", className: "att-present", icon: "✅" };
            case "A": return { label: "Absent", className: "att-absent", icon: "❌" };
            case "L": return { label: "Leave", className: "att-leave", icon: "🟡" };
            case "H": return { label: "Holiday", className: "att-holiday", icon: "🔵" };
            default: return { label: status, className: "", icon: "—" };
        }
    };

    const formatMonth = (ym) => {
        const [y, m] = ym.split("-");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[parseInt(m) - 1]} ${y}`;
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>My Attendance 📅</h1>
                    <p className="subtitle">View your daily attendance records</p>
                </div>
                <div className="header-badge">
                    <span>Overall: {attendanceData.overall}%</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="attendance-overview-cards">
                <div className="card overall-attendance-card">
                    <div className="overall-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="circle-fill"
                                strokeDasharray={`${attendancePct}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                style={{ stroke: attendancePct >= 90 ? "#00d4aa" : attendancePct >= 75 ? "#6c63ff" : "#ff4d6a" }}
                            />
                        </svg>
                        <div className="circle-text">
                            <span className="circle-percentage">{attendancePct}%</span>
                            <span className="circle-label">{formatMonth(selectedMonth)}</span>
                        </div>
                    </div>
                </div>

                <div className="card attendance-stats-card">
                    <div className="attendance-stat-item">
                        <HiOutlineClipboardCheck size={24} color="#00d4aa" />
                        <div><h4>{presentDays}</h4><p>Present</p></div>
                    </div>
                    <div className="attendance-stat-item warning">
                        <HiOutlineExclamation size={24} color="#ff4d6a" />
                        <div><h4>{absentDays}</h4><p>Absent</p></div>
                    </div>
                    <div className="attendance-stat-item">
                        <HiOutlineCalendar size={24} color="#ffa726" />
                        <div><h4>{leaveDays}</h4><p>Leave</p></div>
                    </div>
                    <div className="attendance-stat-item">
                        <HiOutlineCalendar size={24} color="#6c63ff" />
                        <div><h4>{holidays}</h4><p>Holidays</p></div>
                    </div>
                </div>
            </div>

            {/* Month Selector & Table */}
            <div className="card">
                <div className="staff-attendance-header">
                    <h3 className="card-title" style={{ marginBottom: 0 }}>Daily Records</h3>
                    <select className="admin-filter-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {availableMonths.map((m) => <option key={m} value={m}>{formatMonth(m)}</option>)}
                    </select>
                </div>
                <div className="table-container" style={{ marginTop: "16px" }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDays.map((day, i) => {
                                const display = getStatusDisplay(day.status);
                                return (
                                    <tr key={i} className={day.status === "A" ? "row-danger" : day.status === "H" ? "row-holiday" : ""}>
                                        <td style={{ fontWeight: 600 }}>{day.date}</td>
                                        <td>{day.day}</td>
                                        <td>
                                            <span className={`attendance-day-badge ${display.className}`}>
                                                {display.icon} {display.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Monthly Trend */}
            <div className="card">
                <h3 className="card-title">Monthly Attendance Trend</h3>
                <div className="monthly-trend">
                    {months.map((m, i) => (
                        <div className="trend-bar-container" key={i}>
                            <div className="trend-bar-wrapper">
                                <div className="trend-bar" style={{
                                    height: `${m.percentage}%`,
                                    background: m.percentage >= 90
                                        ? "linear-gradient(180deg, #00d4aa, #00a88a)"
                                        : m.percentage >= 75
                                            ? "linear-gradient(180deg, #6c63ff, #5046e5)"
                                            : "linear-gradient(180deg, #ff4d6a, #e03050)",
                                }}>
                                    <span className="trend-value">{m.percentage}%</span>
                                </div>
                            </div>
                            <span className="trend-label">{m.month.split(" ")[0]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
