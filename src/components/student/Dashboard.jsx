import {
    HiOutlineClipboardCheck,
    HiOutlineAcademicCap,
    HiOutlineCreditCard,
    HiOutlineTrendingUp,
    HiOutlineArrowRight,
} from "react-icons/hi";

export default function Dashboard({ data, onNavigate }) {

    if (!data) return null;

    const { attendance = {}, marks = {}, fees = {}, personal = {} } = data;

    const latestSemester =
        marks?.semesters && marks.semesters.length > 0
            ? marks.semesters[marks.semesters.length - 1]
            : null;

    // Time-based greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

    const stats = [
        {
            label: "Overall Attendance",
            value: attendance?.overall ? `${attendance.overall}%` : "0%",
            icon: HiOutlineClipboardCheck,
            color: "#6c63ff",
            bg: "rgba(108, 99, 255, 0.12)",
            detail: attendance?.subjects
                ? `${attendance.subjects.length} subjects tracked`
                : "0 subjects tracked",
        },
        {
            label: "Current CGPA",
            value: marks?.cgpa ? marks.cgpa.toFixed(2) : "0.00",
            icon: HiOutlineAcademicCap,
            color: "#00d4aa",
            bg: "rgba(0, 212, 170, 0.12)",
            detail: marks?.semesters
                ? `${marks.semesters.length} semesters completed`
                : "0 semesters completed",
        },
        {
            label: "Fees Paid",
            value:
                fees?.paidAmount && fees?.totalFees
                    ? `₹${(fees.paidAmount / 1000).toFixed(1)}K`
                    : "₹0K",
            icon: HiOutlineCreditCard,
            color: "#ff6b8a",
            bg: "rgba(255, 107, 138, 0.12)",
            detail:
                fees?.pendingAmount
                    ? `₹${(fees.pendingAmount / 1000).toFixed(1)}K pending`
                    : "₹0K pending",
        },
        {
            label: "Latest GPA",
            value:
                latestSemester?.gpa
                    ? latestSemester.gpa.toFixed(1)
                    : "0.0",
            icon: HiOutlineTrendingUp,
            color: "#ffa726",
            bg: "rgba(255, 167, 38, 0.12)",
            detail: latestSemester?.semester || "No semester",
        },
    ];

    const paidPercentage =
        fees?.paidAmount && fees?.totalFees
            ? (fees.paidAmount / fees.totalFees) * 100
            : 0;

    const overdueCount =
        fees?.dueDates
            ? fees.dueDates.filter(d => d.status === "overdue").length
            : 0;

    const lowSubjects = attendance?.subjects?.filter(s => s.percentage < 75) || [];

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>
                        {greeting}, {personal?.name ? personal.name.split(" ")[0] : "Student"}! 👋
                    </h1>
                    <p className="subtitle">
                        Here's your academic overview for the current semester
                    </p>
                </div>
                <div className="header-badge">
                    <span>
                        {personal?.year || ""} • {personal?.semester || ""}
                    </span>
                </div>
            </div>

            {/* Alert for low attendance */}
            {lowSubjects.length > 0 && (
                <div className="dashboard-alert">
                    <span className="alert-icon">⚠️</span>
                    <span>
                        <strong>{lowSubjects.length} subject(s)</strong> below 75% attendance:
                        {" "}{lowSubjects.map(s => s.name).join(", ")}
                    </span>
                </div>
            )}

            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div className="stat-card" key={i} style={{ "--accent": stat.color }}>
                        <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">{stat.label}</p>
                            <h2 className="stat-value">{stat.value}</h2>
                            <p className="stat-detail">{stat.detail}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            {onNavigate && (
                <div className="quick-actions">
                    <button className="quick-action-btn" onClick={() => onNavigate("attendance")}>
                        <HiOutlineClipboardCheck size={20} />
                        <span>View Attendance</span>
                        <HiOutlineArrowRight size={16} />
                    </button>
                    <button className="quick-action-btn" onClick={() => onNavigate("marks")}>
                        <HiOutlineAcademicCap size={20} />
                        <span>View Marks</span>
                        <HiOutlineArrowRight size={16} />
                    </button>
                    <button className="quick-action-btn" onClick={() => onNavigate("fees")}>
                        <HiOutlineCreditCard size={20} />
                        <span>Fee Details</span>
                        <HiOutlineArrowRight size={16} />
                    </button>
                </div>
            )}

            <div className="dashboard-grid">
                <div className="card attendance-summary">
                    <h3 className="card-title">Subject-wise Attendance</h3>
                    <div className="mini-attendance-list">
                        {attendance?.subjects?.map((sub, i) => (
                            <div className="mini-attendance-item" key={i}>
                                <div className="mini-attendance-info">
                                    <span className="subject-name">{sub.name}</span>
                                    <span className={`percentage ${sub.percentage < 75 ? "low" : sub.percentage >= 90 ? "high" : "mid"}`}>
                                        {sub.percentage}%
                                    </span>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${sub.percentage}%`,
                                            background: sub.percentage >= 90
                                                ? "linear-gradient(90deg, #00d4aa, #00b894)"
                                                : sub.percentage >= 75
                                                    ? "linear-gradient(90deg, #6c63ff, #5046e5)"
                                                    : "linear-gradient(90deg, #ff4d6a, #e03050)",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card recent-marks">
                    <h3 className="card-title">Latest Semester Performance</h3>
                    <div className="mini-marks-list">
                        {latestSemester?.subjects?.map((sub, i) => (
                            <div className="mini-marks-item" key={i}>
                                <div className="subject-code-badge">{sub.code}</div>
                                <div className="mini-marks-info">
                                    <span className="subject-name">{sub.name}</span>
                                    <span className="marks-total">{sub.total}/150</span>
                                </div>
                                <div className={`grade-badge grade-${sub.grade?.replace("+", "plus")}`}>
                                    {sub.grade}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card fees-overview">
                    <h3 className="card-title">Fees Overview</h3>
                    <div className="donut-chart">
                        <svg viewBox="0 0 36 36" className="donut-svg">
                            <path
                                className="donut-ring"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="donut-segment"
                                strokeDasharray={`${paidPercentage}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="donut-center">
                            <span className="donut-percentage">
                                {Math.round(paidPercentage)}%
                            </span>
                            <span className="donut-label">Paid</span>
                        </div>
                    </div>

                    {overdueCount > 0 && (
                        <div className="overdue-alert">
                            ⚠️ You have {overdueCount} overdue payment(s)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}