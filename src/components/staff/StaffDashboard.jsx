import {
    HiOutlineUserGroup,
    HiOutlineAcademicCap,
    HiOutlineClipboardCheck,
    HiOutlineTrendingUp,
} from "react-icons/hi";

export default function StaffDashboard({ students }) {
    const totalStudents = students.length;
    const deptCounts = {};
    students.forEach((s) => {
        deptCounts[s.department] = (deptCounts[s.department] || 0) + 1;
    });
    const avgAttendance = totalStudents > 0
        ? Math.round(students.reduce((sum, s) => sum + s.attendancePercent, 0) / totalStudents)
        : 0;
    const avgCgpa = totalStudents > 0
        ? (students.reduce((sum, s) => sum + s.cgpa, 0) / totalStudents).toFixed(2)
        : "0.00";

    const stats = [
        {
            label: "Total Students",
            value: totalStudents,
            icon: HiOutlineUserGroup,
            color: "#6c63ff",
            bg: "rgba(108, 99, 255, 0.12)",
            detail: `${Object.keys(deptCounts).length} departments`,
        },
        {
            label: "Departments",
            value: Object.keys(deptCounts).length,
            icon: HiOutlineAcademicCap,
            color: "#00d4aa",
            bg: "rgba(0, 212, 170, 0.12)",
            detail: "Active departments",
        },
        {
            label: "Avg Attendance",
            value: `${avgAttendance}%`,
            icon: HiOutlineClipboardCheck,
            color: "#ff6b8a",
            bg: "rgba(255, 107, 138, 0.12)",
            detail: "Across all students",
        },
        {
            label: "Avg CGPA",
            value: avgCgpa,
            icon: HiOutlineTrendingUp,
            color: "#ffa726",
            bg: "rgba(255, 167, 38, 0.12)",
            detail: "Overall performance",
        },
    ];

    const yearCounts = {};
    students.forEach((s) => {
        yearCounts[s.year] = (yearCounts[s.year] || 0) + 1;
    });

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Staff Dashboard 👨‍🏫</h1>
                    <p className="subtitle">Overview of your students and department</p>
                </div>
                <div className="header-badge">
                    <span>Academic Year 2025–26</span>
                </div>
            </div>

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

            <div className="dashboard-grid">
                <div className="card">
                    <h3 className="card-title">Department-wise Students</h3>
                    <div className="dept-breakdown-list">
                        {Object.entries(deptCounts).map(([dept, count]) => (
                            <div className="dept-breakdown-item" key={dept}>
                                <div className="dept-breakdown-info">
                                    <span className="dept-name">{dept}</span>
                                    <span className="dept-count">{count} students</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${(count / totalStudents) * 100}%`,
                                            background: "linear-gradient(90deg, #6c63ff, #8b83ff)",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Year-wise Distribution</h3>
                    <div className="dept-breakdown-list">
                        {["I Year", "II Year", "III Year", "IV Year"].map((yr) => (
                            <div className="dept-breakdown-item" key={yr}>
                                <div className="dept-breakdown-info">
                                    <span className="dept-name">{yr}</span>
                                    <span className="dept-count">{yearCounts[yr] || 0} students</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${((yearCounts[yr] || 0) / totalStudents) * 100}%`,
                                            background: "linear-gradient(90deg, #00d4aa, #00f5c8)",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
