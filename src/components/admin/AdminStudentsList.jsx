import { useState, useMemo } from "react";
import { HiOutlineSearch, HiOutlineEye, HiOutlinePencil, HiOutlineCreditCard } from "react-icons/hi";
import { departments, years } from "../../data/adminData";

export default function AdminStudentsList({ students, onViewStudent, onEditStudent, onViewFees }) {
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = useMemo(() => {
        return students.filter((s) => {
            const matchDept = selectedDept === "All" || s.department === selectedDept;
            const matchYear = selectedYear === "All" || s.year === selectedYear;
            const q = searchQuery.toLowerCase();
            const matchSearch = !q || s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
            return matchDept && matchYear && matchSearch;
        });
    }, [students, selectedDept, selectedYear, searchQuery]);

    const getFeeClass = (status) => {
        if (status === "paid") return "status-paid";
        if (status === "partial") return "status-partial";
        return "status-pending";
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>All Students 🎓</h1>
                    <p className="subtitle">View, edit, and manage fee details for all students</p>
                </div>
            </div>

            <div className="staff-filters-bar">
                <div className="staff-filter-group">
                    <label className="staff-filter-label">Department</label>
                    <select className="staff-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                        <option value="All">All Departments</option>
                        {departments.map((d) => (<option key={d} value={d}>{d}</option>))}
                    </select>
                </div>
                <div className="staff-filter-group">
                    <label className="staff-filter-label">Year</label>
                    <select className="staff-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="All">All Years</option>
                        {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                </div>
                <div className="staff-filter-group staff-search-group">
                    <label className="staff-filter-label">Search by Reg No</label>
                    <div className="staff-search-wrapper">
                        <HiOutlineSearch className="staff-search-icon" size={16} />
                        <input
                            type="text"
                            className="staff-search-input"
                            placeholder="Search by name or reg no..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="staff-results-count">
                Showing <strong>{filtered.length}</strong> of {students.length} students
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Sec</th>
                                <th>Fee Status</th>
                                <th>Paid</th>
                                <th>Pending</th>
                                <th>Penalty</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="staff-empty-row">No students found matching your filters.</td>
                                </tr>
                            ) : (
                                filtered.map((student) => (
                                    <tr key={student.id}>
                                        <td><span className="code-badge">{student.regNo}</span></td>
                                        <td>
                                            <div className="staff-student-name-cell">
                                                <div className="staff-mini-avatar">
                                                    {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </div>
                                                <span>{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="staff-dept-cell">{student.department}</td>
                                        <td>{student.year}</td>
                                        <td>{student.section}</td>
                                        <td>
                                            <span className={`status-badge ${getFeeClass(student.fees.feeStatus)}`}>
                                                {student.fees.feeStatus}
                                            </span>
                                        </td>
                                        <td className="text-success" style={{ fontWeight: 600 }}>
                                            ₹{student.fees.paidAmount.toLocaleString()}
                                        </td>
                                        <td className={student.fees.pendingAmount > 0 ? "text-danger" : ""} style={{ fontWeight: 600 }}>
                                            ₹{student.fees.pendingAmount.toLocaleString()}
                                        </td>
                                        <td>
                                            {student.fees.penalty > 0 ? (
                                                <span className="status-badge status-pending">₹{student.fees.penalty.toLocaleString()}</span>
                                            ) : (
                                                <span style={{ color: "var(--text-muted)" }}>—</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="staff-actions">
                                                <button className="staff-action-btn view" title="View Details" onClick={() => onViewStudent(student.id)}>
                                                    <HiOutlineEye size={16} />
                                                </button>
                                                <button className="staff-action-btn edit" title="Edit Student" onClick={() => onEditStudent(student.id)}>
                                                    <HiOutlinePencil size={16} />
                                                </button>
                                                <button className="staff-action-btn admin-fee-btn" title="View Fees" onClick={() => onViewFees(student.id)}>
                                                    <HiOutlineCreditCard size={16} />
                                                </button>
                                            </div>
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
