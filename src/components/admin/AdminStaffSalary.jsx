import { useState } from "react";
import { HiOutlineCheck, HiOutlineCurrencyRupee } from "react-icons/hi";

const months = [
    "March 2026", "February 2026", "January 2026", "December 2025",
    "November 2025", "October 2025",
];

export default function AdminStaffSalary({ staffs, onPaySalary }) {
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [paidStatus, setPaidStatus] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handlePay = (staffId) => {
        setPaidStatus((prev) => ({ ...prev, [staffId]: true }));
        if (onPaySalary) onPaySalary(staffId, selectedMonth);
    };

    const handlePayAll = () => {
        const updated = {};
        staffs.forEach((s) => { updated[s.id] = true; });
        setPaidStatus(updated);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const totalSalary = staffs.reduce((sum, s) => {
        const salary = s.salary;
        return sum + (salary.basic + salary.hra + salary.da + salary.medical - salary.pfDeduction - salary.taxDeduction);
    }, 0);

    const paidCount = Object.values(paidStatus).filter(Boolean).length;
    const paidAmount = staffs
        .filter((s) => paidStatus[s.id])
        .reduce((sum, s) => {
            const salary = s.salary;
            return sum + (salary.basic + salary.hra + salary.da + salary.medical - salary.pfDeduction - salary.taxDeduction);
        }, 0);

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Staff Salary 💰</h1>
                    <p className="subtitle">Manage and process staff salary payments</p>
                </div>
            </div>

            {submitted && (
                <div className="staff-toast">
                    ✅ All salaries processed successfully for {selectedMonth}!
                </div>
            )}

            {/* Summary Cards */}
            <div className="stats-grid">
                <div className="stat-card" style={{ "--accent": "#6c63ff" }}>
                    <div className="stat-icon" style={{ background: "rgba(108,99,255,0.12)", color: "#6c63ff" }}>
                        <HiOutlineCurrencyRupee size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Payroll</p>
                        <h2 className="stat-value">₹{totalSalary.toLocaleString()}</h2>
                        <p className="stat-detail">{staffs.length} staff members</p>
                    </div>
                </div>
                <div className="stat-card" style={{ "--accent": "#00d4aa" }}>
                    <div className="stat-icon" style={{ background: "rgba(0,212,170,0.12)", color: "#00d4aa" }}>
                        <HiOutlineCheck size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Paid</p>
                        <h2 className="stat-value">₹{paidAmount.toLocaleString()}</h2>
                        <p className="stat-detail">{paidCount} of {staffs.length} paid</p>
                    </div>
                </div>
                <div className="stat-card" style={{ "--accent": "#ff6b8a" }}>
                    <div className="stat-icon" style={{ background: "rgba(255,107,138,0.12)", color: "#ff6b8a" }}>
                        <HiOutlineCurrencyRupee size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Pending</p>
                        <h2 className="stat-value">₹{(totalSalary - paidAmount).toLocaleString()}</h2>
                        <p className="stat-detail">{staffs.length - paidCount} remaining</p>
                    </div>
                </div>
            </div>

            {/* Month Selection & Pay All */}
            <div className="card">
                <div className="staff-attendance-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <h3 className="card-title" style={{ marginBottom: 0 }}>Salary for</h3>
                        <select
                            className="admin-filter-select"
                            value={selectedMonth}
                            onChange={(e) => { setSelectedMonth(e.target.value); setPaidStatus({}); }}
                        >
                            {months.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <button className="staff-save-btn" onClick={handlePayAll}>
                        <HiOutlineCurrencyRupee size={16} />
                        <span>Pay All</span>
                    </button>
                </div>

                <div className="table-container" style={{ marginTop: "16px" }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Staff ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Gross Pay</th>
                                <th>Deductions</th>
                                <th>Net Pay</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map((staff, idx) => {
                                const s = staff.salary;
                                const gross = s.basic + s.hra + s.da + s.medical;
                                const deductions = s.pfDeduction + s.taxDeduction;
                                const net = gross - deductions;
                                const isPaid = paidStatus[staff.id];

                                return (
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
                                        <td>₹{gross.toLocaleString()}</td>
                                        <td className="text-danger">-₹{deductions.toLocaleString()}</td>
                                        <td style={{ fontWeight: 700, color: "#00d4aa" }}>₹{net.toLocaleString()}</td>
                                        <td>
                                            {isPaid ? (
                                                <span className="status-badge status-excellent">✅ Paid</span>
                                            ) : (
                                                <button className="staff-add-btn" onClick={() => handlePay(staff.id)}>
                                                    <HiOutlineCurrencyRupee size={14} /> Pay
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
