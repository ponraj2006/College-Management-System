import { useState, useMemo } from "react";
import {
    HiOutlineSearch, HiOutlineEye, HiOutlinePencil, HiOutlineTrash,
    HiOutlineExclamationCircle
} from "react-icons/hi";

const departments = [
    "All Departments",
    "Computer Science & Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
];

export default function AdminStaffsList({ staffs, onViewStaff, onEditStaff, onDeleteStaff }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDept, setFilterDept] = useState("All Departments");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filteredStaffs = useMemo(() => {
        return staffs.filter((s) => {
            const matchesSearch =
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.regNo.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDept = filterDept === "All Departments" || s.department === filterDept;
            return matchesSearch && matchesDept;
        });
    }, [staffs, searchQuery, filterDept]);

    const handleDeleteClick = (id) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = (id) => {
        onDeleteStaff(id);
        setDeleteConfirm(null);
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Staff Management 👥</h1>
                    <p className="subtitle">View and manage all staff members</p>
                </div>
                <div className="header-badge">
                    <span>{staffs.length} Total Staff</span>
                </div>
            </div>

            <div className="card">
                <div className="admin-list-controls">
                    <div className="admin-search-box">
                        <HiOutlineSearch size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or staff ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="admin-filter-select"
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                    >
                        {departments.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
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
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaffs.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#8a8a9a" }}>
                                        No staff members found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredStaffs.map((staff, idx) => (
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
                                        <td>{staff.phone}</td>
                                        <td>
                                            <span className={`status-badge ${staff.status === "active" ? "status-excellent" : "status-low"}`}>
                                                {staff.status === "active" ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view" title="View Details" onClick={() => onViewStaff(staff.id)}>
                                                    <HiOutlineEye size={16} />
                                                </button>
                                                <button className="action-btn edit" title="Edit" onClick={() => onEditStaff(staff.id)}>
                                                    <HiOutlinePencil size={16} />
                                                </button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDeleteClick(staff.id)}>
                                                    <HiOutlineTrash size={16} />
                                                </button>
                                            </div>

                                            {deleteConfirm === staff.id && (
                                                <div className="delete-confirm-popup">
                                                    <HiOutlineExclamationCircle size={18} color="#ff4d6a" />
                                                    <span>Delete {staff.name}?</span>
                                                    <button className="confirm-yes" onClick={() => confirmDelete(staff.id)}>Yes</button>
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
