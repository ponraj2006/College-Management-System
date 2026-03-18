import { useState, useMemo } from "react";
import { HiOutlineSearch, HiOutlineHome } from "react-icons/hi";
import { departments, years } from "../../data/adminData";

export default function AdminHostelStudents({ students }) {
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [search, setSearch] = useState("");

    const hostelStudents = useMemo(() => {
        return students.filter((s) => {
            if (!s.isHostel) return false;
            const matchDept = selectedDept === "All" || s.department === selectedDept;
            const matchYear = selectedYear === "All" || s.year === selectedYear;
            const q = search.toLowerCase();
            const matchSearch = !q || s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
            return matchDept && matchYear && matchSearch;
        });
    }, [students, selectedDept, selectedYear, search]);

    const totalHostel = students.filter((s) => s.isHostel).length;

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Hostel Students 🏠</h1>
                    <p className="subtitle">Students staying in college hostel</p>
                </div>
                <div className="header-badge admin-badge">
                    <HiOutlineHome size={16} style={{ marginRight: 6 }} />
                    <span>{totalHostel} hostel students</span>
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
                    <label className="staff-filter-label">Search</label>
                    <div className="staff-search-wrapper">
                        <HiOutlineSearch className="staff-search-icon" size={16} />
                        <input type="text" className="staff-search-input" placeholder="Search by name or reg no..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="staff-results-count">
                Showing <strong>{hostelStudents.length}</strong> hostel students
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
                                <th>Section</th>
                                <th>Hostel Fee Status</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostelStudents.length === 0 ? (
                                <tr><td colSpan="7" className="staff-empty-row">No hostel students found.</td></tr>
                            ) : (
                                hostelStudents.map((s) => (
                                    <tr key={s.id}>
                                        <td><span className="code-badge">{s.regNo}</span></td>
                                        <td>
                                            <div className="staff-student-name-cell">
                                                <div className="staff-mini-avatar">{s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
                                                <span>{s.name}</span>
                                            </div>
                                        </td>
                                        <td className="staff-dept-cell">{s.department}</td>
                                        <td>{s.year}</td>
                                        <td>{s.section}</td>
                                        <td>
                                            <span className={`status-badge ${s.fees.feeStatus === "paid" ? "status-paid" : s.fees.feeStatus === "partial" ? "status-partial" : "status-pending"}`}>
                                                {s.fees.feeStatus}
                                            </span>
                                        </td>
                                        <td>{s.phone}</td>
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
