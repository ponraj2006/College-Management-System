import {
    HiOutlineUserGroup,
    HiOutlineAcademicCap,
    HiOutlineCreditCard,
    HiOutlineExclamationCircle,
    HiOutlineTruck,
    HiOutlineHome,
} from "react-icons/hi";

export default function AdminDashboard({ students }) {
    const totalStudents = students.length;

    const deptCounts = {};
    students.forEach((s) => {
        deptCounts[s.department] = (deptCounts[s.department] || 0) + 1;
    });

    const totalFees = students.reduce((sum, s) => sum + s.fees.totalFees, 0);
    const totalCollected = students.reduce((sum, s) => sum + s.fees.paidAmount, 0);
    const totalPending = students.reduce((sum, s) => sum + s.fees.pendingAmount, 0);
    const totalPenalties = students.reduce((sum, s) => sum + s.fees.penalty, 0);
    const collectionPercent = totalFees > 0 ? Math.round((totalCollected / totalFees) * 100) : 0;

    const busCount = students.filter((s) => s.isBus).length;
    const hostelCount = students.filter((s) => s.isHostel).length;
    const defaulterCount = students.filter((s) => s.fees.feeStatus !== "paid").length;

    const stats = [
        {
            label: "Total Students", value: totalStudents, icon: HiOutlineUserGroup,
            color: "#6c63ff", bg: "rgba(108,99,255,0.12)", detail: `${Object.keys(deptCounts).length} departments`,
        },
        {
            label: "Fee Collection", value: `${collectionPercent}%`, icon: HiOutlineCreditCard,
            color: "#00d4aa", bg: "rgba(0,212,170,0.12)", detail: `₹${totalCollected.toLocaleString()} collected`,
        },
        {
            label: "Pending Fees", value: `₹${(totalPending / 1000).toFixed(0)}K`, icon: HiOutlineExclamationCircle,
            color: "#ff6b8a", bg: "rgba(255,107,138,0.12)", detail: `${defaulterCount} defaulters`,
        },
        {
            label: "Total Penalties", value: `₹${totalPenalties.toLocaleString()}`, icon: HiOutlineExclamationCircle,
            color: "#ffa726", bg: "rgba(255,167,38,0.12)", detail: `Applied to defaulters`,
        },
        {
            label: "Bus Students", value: busCount, icon: HiOutlineTruck,
            color: "#29b6f6", bg: "rgba(41,182,246,0.12)", detail: "Using transport",
        },
        {
            label: "Hostel Students", value: hostelCount, icon: HiOutlineHome,
            color: "#ab47bc", bg: "rgba(171,71,188,0.12)", detail: "Staying in hostel",
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
                    <h1>Admin Dashboard 🛡️</h1>
                    <p className="subtitle">Complete overview of the institution</p>
                </div>
                <div className="header-badge admin-badge">
                    <span>Academic Year 2025–26</span>
                </div>
            </div>

            <div className="stats-grid admin-stats-grid">
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
                                            background: "linear-gradient(90deg, #ef5350, #ff7043)",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Fee Collection Overview</h3>
                    <div className="admin-fee-overview">
                        <div className="admin-fee-bar-section">
                            <div className="admin-fee-bar-label">
                                <span>Collected</span>
                                <span className="text-success">₹{totalCollected.toLocaleString()}</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${collectionPercent}%`,
                                        background: "linear-gradient(90deg, #00d4aa, #00f5c8)",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="admin-fee-bar-section">
                            <div className="admin-fee-bar-label">
                                <span>Pending</span>
                                <span className="text-danger">₹{totalPending.toLocaleString()}</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${100 - collectionPercent}%`,
                                        background: "linear-gradient(90deg, #ff4d6a, #ff7043)",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="admin-fee-bar-section">
                            <div className="admin-fee-bar-label">
                                <span>Penalties</span>
                                <span style={{ color: "#ffa726" }}>₹{totalPenalties.toLocaleString()}</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${totalFees > 0 ? (totalPenalties / totalFees) * 100 : 0}%`,
                                        background: "linear-gradient(90deg, #ffa726, #ffcc02)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
