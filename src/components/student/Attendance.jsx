import { useState, useMemo } from "react";
import {
    HiOutlineClipboardCheck,
    HiOutlineExclamation,
    HiOutlineCalendar,
    HiOutlineExclamationCircle,
} from "react-icons/hi";

export default function Attendance({ data }) {
    const [activeTab, setActiveTab] = useState("subjects");
    const allDays = data.days || [];
    const subjects = data.subjects || [];

    const availableMonths = useMemo(() => {
        const monthSet = new Set();
        allDays.forEach((d) => {
            const yearMonth = d.date.substring(0, 7);
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

    const lowAttendanceSubjects = subjects.filter((s) => s.percentage < 75);

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
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return `${monthNames[parseInt(m) - 1]} ${y}`;
    };

    const getSubjectColor = (pct) => {
        if (pct >= 90) return "#00d4aa";
        if (pct >= 75) return "#6c63ff";
        return "#ff4d6a";
    };

    const getSubjectBg = (pct) => {
        if (pct >= 90) return "rgba(0, 212, 170, 0.1)";
        if (pct >= 75) return "rgba(108, 99, 255, 0.1)";
        return "rgba(255, 77, 106, 0.1)";
    };

    return (
        <div className="attendance-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Attendance Details</h1>
                    <p className="subtitle">Track your attendance across all subjects</p>
                </div>
                {lowAttendanceSubjects.length > 0 && (
                    <div className="attendance-alert-badge">
                        <HiOutlineExclamationCircle size={16} />
                        <span>{lowAttendanceSubjects.length} subject(s) below 75%</span>
                    </div>
                )}
            </div>

            <div className="attendance-overview-cards">
                <div className="card overall-attendance-card">
                    <div className="overall-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="circle-fill"
                                strokeDasharray={`${data.overall}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                style={{
                                    stroke: data.overall >= 90 ? "#00d4aa" : data.overall >= 75 ? "#6c63ff" : "#ff4d6a",
                                }}
                            />
                        </svg>
                        <div className="circle-text">
                            <span className="circle-percentage">{data.overall}%</span>
                            <span className="circle-label">Overall</span>
                        </div>
                    </div>
                </div>

                <div className="card attendance-stats-card">
                    <div className="attendance-stat-item">
                        <HiOutlineClipboardCheck size={24} color="#00d4aa" />
                        <div><h4>{presentDays}</h4><p>Days Present</p></div>
                    </div>
                    <div className="attendance-stat-item warning">
                        <HiOutlineExclamation size={24} color="#ff4d6a" />
                        <div><h4>{absentDays}</h4><p>Days Absent</p></div>
                    </div>
                    <div className="attendance-stat-item">
                        <HiOutlineCalendar size={24} color="#ffa726" />
                        <div><h4>{leaveDays}</h4><p>On Leave</p></div>
                    </div>
                    <div className="attendance-stat-item">
                        <HiOutlineCalendar size={24} color="#6c63ff" />
                        <div><h4>{holidays}</h4><p>Holidays</p></div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="attendance-tabs">
                <button
                    className={`att-tab ${activeTab === "subjects" ? "active" : ""}`}
                    onClick={() => setActiveTab("subjects")}
                >
                    📊 Subject-wise
                </button>
                <button
                    className={`att-tab ${activeTab === "datewise" ? "active" : ""}`}
                    onClick={() => setActiveTab("datewise")}
                >
                    📅 Date-wise
                </button>
                <button
                    className={`att-tab ${activeTab === "trend" ? "active" : ""}`}
                    onClick={() => setActiveTab("trend")}
                >
                    📈 Monthly Trend
                </button>
            </div>

            {/* Subject-wise Attendance */}
            {activeTab === "subjects" && (
                <div className="subject-attendance-section fade-in">
                    <div className="subject-attendance-grid">
                        {subjects.map((sub, i) => (
                            <div
                                className={`subject-attendance-card ${sub.percentage < 75 ? "low-attendance" : ""}`}
                                key={i}
                                style={{ "--subject-color": getSubjectColor(sub.percentage) }}
                            >
                                <div className="subject-att-header">
                                    <div className="subject-att-code" style={{ background: getSubjectBg(sub.percentage), color: getSubjectColor(sub.percentage) }}>
                                        {sub.code}
                                    </div>
                                    {sub.percentage < 75 && (
                                        <div className="low-badge">
                                            <HiOutlineExclamationCircle size={14} />
                                            Low
                                        </div>
                                    )}
                                </div>
                                <h4 className="subject-att-name">{sub.name}</h4>
                                <div className="subject-att-visual">
                                    <div className="subject-att-ring">
                                        <svg viewBox="0 0 36 36" className="subject-ring-svg">
                                            <path className="circle-bg"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path
                                                className="circle-fill"
                                                strokeDasharray={`${sub.percentage}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                style={{ stroke: getSubjectColor(sub.percentage) }}
                                            />
                                        </svg>
                                        <div className="subject-ring-text">
                                            <span className="subject-ring-pct" style={{ color: getSubjectColor(sub.percentage) }}>
                                                {sub.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="subject-att-details">
                                        <div className="subject-att-stat">
                                            <span className="sat-label">Attended</span>
                                            <span className="sat-value">{sub.attended}</span>
                                        </div>
                                        <div className="subject-att-stat">
                                            <span className="sat-label">Total</span>
                                            <span className="sat-value">{sub.totalClasses}</span>
                                        </div>
                                        <div className="subject-att-stat">
                                            <span className="sat-label">Missed</span>
                                            <span className="sat-value" style={{ color: sub.totalClasses - sub.attended > 5 ? "#ff4d6a" : "inherit" }}>
                                                {sub.totalClasses - sub.attended}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Date-wise Attendance Table */}
            {activeTab === "datewise" && (
                <div className="card fade-in">
                    <div className="staff-attendance-header">
                        <h3 className="card-title" style={{ marginBottom: 0 }}>
                            Date-wise Attendance
                        </h3>
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
            )}

            {/* Monthly Trend */}
            {activeTab === "trend" && (
                <div className="card fade-in">
                    <h3 className="card-title">Monthly Attendance Trend</h3>
                    <div className="monthly-trend">
                        {data.monthly.map((m, i) => (
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
            )}
        </div>
    );
}
