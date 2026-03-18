import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineSave } from "react-icons/hi";

export default function AdminPenalty({ students, onAddPenalty, onBulkPenalty }) {
    const [penaltyAmounts, setPenaltyAmounts] = useState({});
    const [bulkAmount, setBulkAmount] = useState("");
    const [appliedIds, setAppliedIds] = useState([]);
    const [bulkApplied, setBulkApplied] = useState(false);

    // Students who haven't fully paid
    const defaulters = students.filter((s) => s.fees.feeStatus !== "paid");

    const handlePenaltyChange = (id, val) => {
        setPenaltyAmounts((prev) => ({ ...prev, [id]: val }));
    };

    const handleApplyPenalty = (studentId) => {
        const amount = Number(penaltyAmounts[studentId]) || 0;
        if (amount <= 0) return;
        onAddPenalty(studentId, amount);
        setAppliedIds((prev) => [...prev, studentId]);
        setTimeout(() => setAppliedIds((prev) => prev.filter((id) => id !== studentId)), 2000);
    };

    const handleBulkApply = () => {
        const amount = Number(bulkAmount) || 0;
        if (amount <= 0) return;
        onBulkPenalty(amount);
        setBulkApplied(true);
        setTimeout(() => setBulkApplied(false), 3000);
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Penalty Management ⚠️</h1>
                    <p className="subtitle">Add penalties to students with unpaid fees</p>
                </div>
            </div>

            {/* Bulk Penalty */}
            <div className="card admin-bulk-penalty-card">
                <h3 className="card-title"><HiOutlineExclamationCircle size={20} /> Bulk Penalty for All Defaulters</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: 16 }}>
                    Apply a penalty amount to all {defaulters.length} students who haven't fully paid their fees.
                </p>
                <div className="admin-bulk-penalty-row">
                    <div className="admin-fee-input-wrap">
                        <span>₹</span>
                        <input
                            type="number"
                            className="admin-fee-input"
                            placeholder="Penalty amount"
                            value={bulkAmount}
                            onChange={(e) => setBulkAmount(e.target.value)}
                        />
                    </div>
                    <button className="staff-add-btn admin-penalty-btn" onClick={handleBulkApply}>
                        <HiOutlineSave size={18} />
                        <span>{bulkApplied ? "✓ Applied!" : `Apply to All Defaulters (${defaulters.length})`}</span>
                    </button>
                </div>
            </div>

            {/* Defaulters Table */}
            <div className="card">
                <h3 className="card-title">Fee Defaulters ({defaulters.length})</h3>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Fee Status</th>
                                <th>Pending</th>
                                <th>Current Penalty</th>
                                <th>Add Penalty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defaulters.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="staff-empty-row">
                                        🎉 No defaulters! All students have paid their fees.
                                    </td>
                                </tr>
                            ) : (
                                defaulters.map((s) => (
                                    <tr key={s.id} className="row-danger">
                                        <td><span className="code-badge">{s.regNo}</span></td>
                                        <td>
                                            <div className="staff-student-name-cell">
                                                <div className="staff-mini-avatar">
                                                    {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </div>
                                                <span>{s.name}</span>
                                            </div>
                                        </td>
                                        <td className="staff-dept-cell">{s.department}</td>
                                        <td>{s.year}</td>
                                        <td>
                                            <span className={`status-badge ${s.fees.feeStatus === "partial" ? "status-partial" : "status-pending"}`}>
                                                {s.fees.feeStatus}
                                            </span>
                                        </td>
                                        <td className="text-danger" style={{ fontWeight: 600 }}>
                                            ₹{s.fees.pendingAmount.toLocaleString()}
                                        </td>
                                        <td>
                                            {s.fees.penalty > 0 ? (
                                                <span className="status-badge status-pending">₹{s.fees.penalty.toLocaleString()}</span>
                                            ) : (
                                                <span style={{ color: "var(--text-muted)" }}>₹0</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="admin-fee-input-wrap admin-penalty-input-wrap">
                                                <span>₹</span>
                                                <input
                                                    type="number"
                                                    className="admin-fee-input admin-penalty-input"
                                                    placeholder="Amount"
                                                    value={penaltyAmounts[s.id] || ""}
                                                    onChange={(e) => handlePenaltyChange(s.id, e.target.value)}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className="staff-action-btn admin-apply-single-penalty"
                                                onClick={() => handleApplyPenalty(s.id)}
                                                title="Apply Penalty"
                                            >
                                                {appliedIds.includes(s.id) ? "✓" : <HiOutlineSave size={16} />}
                                            </button>
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
