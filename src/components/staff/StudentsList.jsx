import { useState, useMemo } from "react";
import {
    HiOutlineSearch, HiOutlinePlus, HiOutlineEye, HiOutlinePencil,
    HiOutlineBan, HiOutlineTrash, HiOutlineExclamationCircle
} from "react-icons/hi";
import { departments, years } from "../../data/staffStudentsData";

export default function StudentsList({ students, onViewStudent, onEditStudent, onAddStudent, onSuspendStudent, onDeleteStudent }) {
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filtered = useMemo(() => {
        return students.filter((s) => {
            const matchDept = selectedDept === "All" || s.department === selectedDept;
            const matchYear = selectedYear === "All" || s.year === selectedYear;
            const q = searchQuery.toLowerCase();
            const matchSearch =
                !q || s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
            return matchDept && matchYear && matchSearch;
        });
    }, [students, selectedDept, selectedYear, searchQuery]);

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

    const handleDeleteClick = (id) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = (id) => {
        if (onDeleteStudent) onDeleteStudent(id);
        setDeleteConfirm(null);
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Students List 🎓</h1>
                    <p className="subtitle">Manage and view all student records</p>
                </div>
                <button className="staff-add-btn" onClick={onAddStudent}>
                    <HiOutlinePlus size={18} />
                    <span>Add Student</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="staff-filters-bar">
                <div className="staff-filter-group">
                    <label className="staff-filter-label">Department</label>
                    <select
                        className="staff-select"
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                    >
                        <option value="All">All Departments</option>
                        {departments.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div className="staff-filter-group">
                    <label className="staff-filter-label">Year</label>
                    <select
                        className="staff-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="All">All Years</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div className="staff-filter-group staff-search-group">
                    <label className="staff-filter-label">Search</label>
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

            {/* Results Count */}
            <div className="staff-results-count">
                Showing <strong>{filtered.length}</strong> of {students.length} students
            </div>

            {/* Table */}
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
                                <th>Attendance</th>
                                <th>CGPA</th>
                                <th>Fee Status</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="staff-empty-row">
                                        No students found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((student) => (
                                    <tr key={student.id} className={student.suspended ? "row-suspended" : ""}>
                                        <td>
                                            <span className="code-badge">{student.regNo}</span>
                                        </td>
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
                                            <div className="cell-progress">
                                                <span className={`status-badge ${getStatusClass(student.attendancePercent)}`}>
                                                    {student.attendancePercent}%
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <strong>{student.cgpa.toFixed(2)}</strong>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${getFeeClass(student.feeStatus)}`}>
                                                {student.feeStatus}
                                            </span>
                                        </td>
                                        <td>
                                            {student.suspended ? (
                                                <span className="status-badge status-suspended">Suspended</span>
                                            ) : (
                                                <span className="status-badge status-active-student">Active</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="staff-actions">
                                                <button
                                                    className="staff-action-btn view"
                                                    title="View Details"
                                                    onClick={() => onViewStudent(student.id)}
                                                >
                                                    <HiOutlineEye size={16} />
                                                </button>
                                                <button
                                                    className="staff-action-btn edit"
                                                    title="Edit Student"
                                                    onClick={() => onEditStudent(student.id)}
                                                >
                                                    <HiOutlinePencil size={16} />
                                                </button>
                                                <button
                                                    className={`staff-action-btn ${student.suspended ? "unsuspend" : "suspend"}`}
                                                    title={student.suspended ? "Unsuspend Student" : "Suspend Student"}
                                                    onClick={() => onSuspendStudent && onSuspendStudent(student.id)}
                                                >
                                                    <HiOutlineBan size={16} />
                                                </button>
                                                <button
                                                    className="staff-action-btn delete"
                                                    title="Delete Student"
                                                    onClick={() => handleDeleteClick(student.id)}
                                                >
                                                    <HiOutlineTrash size={16} />
                                                </button>
                                            </div>

                                            {deleteConfirm === student.id && (
                                                <div className="delete-confirm-popup">
                                                    <HiOutlineExclamationCircle size={18} color="#ff4d6a" />
                                                    <span>Delete {student.name}?</span>
                                                    <button className="confirm-yes" onClick={() => confirmDelete(student.id)}>Yes</button>
                                                    <button className="confirm-no" onClick={() => setDeleteConfirm(null)}>No</button>
                                                </div>
                                            )}
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
