import { useState, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function AdminStudentLogins({ students }) {
    const [search, setSearch] = useState("");

    // Flatten all login history
    const allLogins = useMemo(() => {
        const logs = [];
        students.forEach((s) => {
            (s.loginHistory || []).forEach((log) => {
                logs.push({
                    id: s.id,
                    regNo: s.regNo,
                    name: s.name,
                    department: s.department,
                    ...log,
                });
            });
        });
        // Sort by date descending
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        return logs;
    }, [students]);

    const filtered = useMemo(() => {
        if (!search) return allLogins;
        const q = search.toLowerCase();
        return allLogins.filter(
            (l) => l.name.toLowerCase().includes(q) || l.regNo.toLowerCase().includes(q)
        );
    }, [allLogins, search]);

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Student Logins 🔐</h1>
                    <p className="subtitle">Monitor student login activity</p>
                </div>
                <div className="header-badge admin-badge">
                    <span>{allLogins.length} total logins</span>
                </div>
            </div>

            <div className="staff-filters-bar">
                <div className="staff-filter-group staff-search-group" style={{ flex: 1 }}>
                    <label className="staff-filter-label">Search Student</label>
                    <div className="staff-search-wrapper">
                        <HiOutlineSearch className="staff-search-icon" size={16} />
                        <input
                            type="text"
                            className="staff-search-input"
                            placeholder="Search by student name or reg no..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="staff-results-count">
                Showing <strong>{filtered.length}</strong> login records
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Reg No</th>
                                <th>Student Name</th>
                                <th>Department</th>
                                <th>Login Date & Time</th>
                                <th>IP Address</th>
                                <th>Device / Browser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="staff-empty-row">No login records found.</td>
                                </tr>
                            ) : (
                                filtered.map((log, i) => (
                                    <tr key={`${log.id}-${i}`}>
                                        <td><span className="code-badge">{log.regNo}</span></td>
                                        <td>
                                            <div className="staff-student-name-cell">
                                                <div className="staff-mini-avatar">
                                                    {log.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </div>
                                                <span>{log.name}</span>
                                            </div>
                                        </td>
                                        <td className="staff-dept-cell">{log.department}</td>
                                        <td>{log.date}</td>
                                        <td><span className="code-badge">{log.ip}</span></td>
                                        <td>
                                            <span className="method-badge">{log.device}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
