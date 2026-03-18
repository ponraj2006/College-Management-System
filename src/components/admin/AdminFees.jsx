import { useState } from "react";
import { HiOutlineCreditCard, HiOutlineSave } from "react-icons/hi";
import { departments, departmentFeeStructure } from "../../data/adminData";

export default function AdminFees({ students, onApplyFees }) {
    const [selectedDept, setSelectedDept] = useState(departments[0]);
    const [feeConfig, setFeeConfig] = useState({ ...departmentFeeStructure[departments[0]] });
    const [applied, setApplied] = useState(false);

    const handleDeptChange = (dept) => {
        setSelectedDept(dept);
        setFeeConfig({ ...departmentFeeStructure[dept] });
        setApplied(false);
    };

    const handleFeeChange = (key, val) => {
        setFeeConfig((prev) => ({ ...prev, [key]: Number(val) || 0 }));
    };

    const totalFee = Object.values(feeConfig).reduce((a, b) => a + b, 0);

    const handleApply = () => {
        onApplyFees(selectedDept, feeConfig);
        setApplied(true);
        setTimeout(() => setApplied(false), 3000);
    };

    // Department-wise fee status summary
    const deptStudents = students.filter((s) => s.department === selectedDept);
    const deptPaid = deptStudents.filter((s) => s.fees.feeStatus === "paid").length;
    const deptPartial = deptStudents.filter((s) => s.fees.feeStatus === "partial").length;
    const deptPending = deptStudents.filter((s) => s.fees.feeStatus === "pending").length;

    const feeLabels = {
        tuition: "Tuition Fee",
        lab: "Lab Fee",
        exam: "Exam Fee",
        library: "Library Fee",
        hostel: "Hostel Fee",
        transport: "Transport Fee",
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Fees Management 💰</h1>
                    <p className="subtitle">Set and manage fees by department</p>
                </div>
            </div>

            {/* Department Selector */}
            <div className="admin-dept-selector">
                {departments.map((dept) => (
                    <button
                        key={dept}
                        className={`admin-dept-btn ${selectedDept === dept ? "active" : ""}`}
                        onClick={() => handleDeptChange(dept)}
                    >
                        {dept}
                    </button>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Fee Configuration */}
                <div className="card">
                    <h3 className="card-title"><HiOutlineCreditCard size={20} /> Fee Structure — {selectedDept}</h3>
                    <div className="admin-fee-form">
                        {Object.entries(feeConfig).map(([key, val]) => (
                            <div className="admin-fee-form-row" key={key}>
                                <label>{feeLabels[key] || key}</label>
                                <div className="admin-fee-input-wrap">
                                    <span>₹</span>
                                    <input
                                        type="number"
                                        className="admin-fee-input"
                                        value={val}
                                        onChange={(e) => handleFeeChange(key, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="admin-fee-form-row admin-fee-total-row">
                            <label>Total Fee</label>
                            <span className="admin-fee-total">₹{totalFee.toLocaleString()}</span>
                        </div>
                        <button className="staff-add-btn admin-apply-fees-btn" onClick={handleApply}>
                            <HiOutlineSave size={18} />
                            <span>{applied ? "✓ Applied!" : "Apply to Department"}</span>
                        </button>
                    </div>
                </div>

                {/* Department Fee Status */}
                <div className="card">
                    <h3 className="card-title">Department Fee Status</h3>
                    <div className="admin-dept-fee-stats">
                        <div className="admin-dept-fee-stat">
                            <span className="admin-dept-fee-count" style={{ color: "var(--success)" }}>{deptPaid}</span>
                            <span className="admin-dept-fee-label">Fully Paid</span>
                        </div>
                        <div className="admin-dept-fee-stat">
                            <span className="admin-dept-fee-count" style={{ color: "var(--warning)" }}>{deptPartial}</span>
                            <span className="admin-dept-fee-label">Partial</span>
                        </div>
                        <div className="admin-dept-fee-stat">
                            <span className="admin-dept-fee-count" style={{ color: "var(--danger)" }}>{deptPending}</span>
                            <span className="admin-dept-fee-label">Pending</span>
                        </div>
                    </div>

                    <h4 style={{ margin: "20px 0 12px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Students in {selectedDept}</h4>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Reg No</th>
                                    <th>Name</th>
                                    <th>Year</th>
                                    <th>Fee Status</th>
                                    <th>Paid</th>
                                    <th>Pending</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deptStudents.length === 0 ? (
                                    <tr><td colSpan="6" className="staff-empty-row">No students in this department.</td></tr>
                                ) : (
                                    deptStudents.map((s) => (
                                        <tr key={s.id}>
                                            <td><span className="code-badge">{s.regNo}</span></td>
                                            <td>{s.name}</td>
                                            <td>{s.year}</td>
                                            <td>
                                                <span className={`status-badge ${s.fees.feeStatus === "paid" ? "status-paid" : s.fees.feeStatus === "partial" ? "status-partial" : "status-pending"}`}>
                                                    {s.fees.feeStatus}
                                                </span>
                                            </td>
                                            <td className="text-success">₹{s.fees.paidAmount.toLocaleString()}</td>
                                            <td className={s.fees.pendingAmount > 0 ? "text-danger" : ""}>₹{s.fees.pendingAmount.toLocaleString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
