// ── Admin Manage Fees Page ──
import { useState } from "react";
import AdminFees from "../../components/admin/AdminFees";
import AdminPenalty from "../../components/admin/AdminPenalty";
import { adminStudents as initialStudents } from "../../data/adminData";

export default function ManageFees() {
    const [students, setStudents] = useState(initialStudents);
    const [showPenalty, setShowPenalty] = useState(false);

    const handleApplyFees = (dept, feeConfig) => {
        const total = Object.values(feeConfig).reduce((a, b) => a + b, 0);
        setStudents((prev) =>
            prev.map((s) => {
                if (s.department === dept) {
                    return {
                        ...s,
                        fees: {
                            ...s.fees,
                            totalFees: total,
                            pendingAmount: total - s.fees.paidAmount,
                        },
                    };
                }
                return s;
            })
        );
    };

    const handleAddPenalty = (studentId, amount) => {
        setStudents((prev) =>
            prev.map((s) => {
                if (s.id === studentId) {
                    return {
                        ...s,
                        fees: { ...s.fees, penalty: s.fees.penalty + amount },
                    };
                }
                return s;
            })
        );
    };

    const handleBulkPenalty = (amount) => {
        setStudents((prev) =>
            prev.map((s) => {
                if (s.fees.feeStatus !== "paid") {
                    return {
                        ...s,
                        fees: { ...s.fees, penalty: s.fees.penalty + amount },
                    };
                }
                return s;
            })
        );
    };

    if (showPenalty) {
        return (
            <div>
                <button
                    onClick={() => setShowPenalty(false)}
                    style={{
                        marginBottom: 16, padding: "8px 16px", borderRadius: 8,
                        border: "none", background: "rgba(108,99,255,0.2)",
                        color: "#6c63ff", cursor: "pointer", fontWeight: 600,
                    }}
                >
                    ← Back to Fees
                </button>
                <AdminPenalty
                    students={students}
                    onAddPenalty={handleAddPenalty}
                    onBulkPenalty={handleBulkPenalty}
                />
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={() => setShowPenalty(true)}
                style={{
                    marginBottom: 16, padding: "8px 16px", borderRadius: 8,
                    border: "none", background: "rgba(255,77,106,0.2)",
                    color: "#ff4d6a", cursor: "pointer", fontWeight: 600,
                }}
            >
                ⚠️ Manage Penalties
            </button>
            <AdminFees students={students} onApplyFees={handleApplyFees} />
        </div>
    );
}
