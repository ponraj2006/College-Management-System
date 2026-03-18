// ── Seed Firebase with Initial Mock Data ──
// Run this ONCE to populate Firestore with all your mock data.
// After seeding, you can remove the button from the UI.

import { useState } from "react";
import { seedCollection, seedDocument } from "../services/firebaseService";
import { adminStudents, adminCredentials } from "../data/adminData";
import { initialStudents } from "../data/staffStudentsData";
import { studentData } from "../data/studentData";
import { staffMembers, currentStaffSalary, currentStaffAttendance } from "../data/staffData";

export default function SeedFirebase() {
    const [status, setStatus] = useState("idle"); // idle | seeding | done | error
    const [log, setLog] = useState([]);

    const addLog = (msg) => setLog((prev) => [...prev, msg]);

    const handleSeed = async () => {
        setStatus("seeding");
        setLog([]);

        try {
            // 1. Admin Students
            addLog("📚 Seeding admin students...");
            const cleanAdminStudents = adminStudents.map((s) => ({
                ...s,
                fees: {
                    totalFees: s.fees.totalFees,
                    paidAmount: s.fees.paidAmount,
                    pendingAmount: s.fees.pendingAmount,
                    feeStatus: s.fees.feeStatus,
                    penalty: s.fees.penalty,
                    paymentHistory: s.fees.paymentHistory || [],
                },
            }));
            await seedCollection("adminStudents", cleanAdminStudents);
            addLog("✅ Admin students seeded!");

            // 2. Admin Credentials
            addLog("🔑 Seeding admin credentials...");
            await seedDocument("config", "adminCredentials", adminCredentials);
            addLog("✅ Admin credentials seeded!");

            // 3. Staff Members
            addLog("👨‍🏫 Seeding staff members...");
            const cleanStaff = staffMembers.map((s) => ({
                ...s,
                salary: {
                    basic: s.salary.basic,
                    hra: s.salary.hra,
                    da: s.salary.da,
                    medical: s.salary.medical,
                    pfDeduction: s.salary.pfDeduction,
                    taxDeduction: s.salary.taxDeduction,
                },
            }));
            await seedCollection("staffMembers", cleanStaff);
            addLog("✅ Staff members seeded!");

            // 4. Staff Students
            addLog("🎓 Seeding staff students...");
            await seedCollection("staffStudents", initialStudents);
            addLog("✅ Staff students seeded!");

            // 5. Student Data (single student)
            addLog("📋 Seeding student data...");
            await seedDocument("studentData", "current", JSON.parse(JSON.stringify(studentData)));
            addLog("✅ Student data seeded!");

            // 6. Current Staff Salary
            addLog("💰 Seeding staff salary...");
            const cleanSalary = {
                basic: currentStaffSalary.basic,
                hra: currentStaffSalary.hra,
                da: currentStaffSalary.da,
                medical: currentStaffSalary.medical,
                pfDeduction: currentStaffSalary.pfDeduction,
                taxDeduction: currentStaffSalary.taxDeduction,
                paymentHistory: currentStaffSalary.paymentHistory,
            };
            await seedDocument("currentStaff", "salary", cleanSalary);
            addLog("✅ Staff salary seeded!");

            // 7. Current Staff Attendance
            addLog("📅 Seeding staff attendance...");
            await seedDocument("currentStaff", "attendance", JSON.parse(JSON.stringify(currentStaffAttendance)));
            addLog("✅ Staff attendance seeded!");

            addLog("🎉 ALL DATA SEEDED SUCCESSFULLY!");
            setStatus("done");
        } catch (err) {
            addLog(`❌ Error: ${err.message}`);
            setStatus("error");
            console.error("Seed error:", err);
        }
    };

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.85)", display: "flex",
            alignItems: "center", justifyContent: "center",
        }}>
            <div style={{
                background: "#1a1a2e", borderRadius: 20, padding: 32,
                border: "1px solid rgba(108,99,255,0.3)", maxWidth: 520, width: "90%",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}>
                <h2 style={{
                    fontSize: "1.4rem", fontWeight: 700, marginBottom: 8,
                    background: "linear-gradient(135deg, #6c63ff, #00d4aa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                    🔥 Seed Firebase Database
                </h2>
                <p style={{ color: "#8a8a9a", fontSize: "0.88rem", marginBottom: 20 }}>
                    This will upload all mock data to your Firestore database.
                    Run this once, then remove the seed button.
                </p>

                {status === "idle" && (
                    <button onClick={handleSeed} style={{
                        padding: "12px 28px", borderRadius: 12, border: "none",
                        background: "linear-gradient(135deg, #6c63ff, #5046e5)",
                        color: "white", fontSize: "0.92rem", fontWeight: 600,
                        cursor: "pointer", fontFamily: "inherit",
                    }}>
                        🚀 Start Seeding
                    </button>
                )}

                {status === "seeding" && (
                    <div style={{ color: "#ffa726", fontSize: "0.88rem", fontWeight: 600 }}>
                        ⏳ Seeding in progress...
                    </div>
                )}

                {log.length > 0 && (
                    <div style={{
                        marginTop: 16, padding: 16, borderRadius: 12,
                        background: "rgba(0,0,0,0.3)", maxHeight: 250,
                        overflowY: "auto", fontSize: "0.82rem",
                        fontFamily: "'JetBrains Mono', monospace",
                    }}>
                        {log.map((line, i) => (
                            <div key={i} style={{
                                padding: "4px 0",
                                color: line.startsWith("✅") ? "#00d4aa"
                                    : line.startsWith("❌") ? "#ff4d6a"
                                        : line.startsWith("🎉") ? "#ffa726"
                                            : "#c0c0c0",
                            }}>
                                {line}
                            </div>
                        ))}
                    </div>
                )}

                {status === "done" && (
                    <p style={{ color: "#00d4aa", fontSize: "0.88rem", fontWeight: 600, marginTop: 16 }}>
                        ✅ Database ready! You can now remove this seed component.
                    </p>
                )}
            </div>
        </div>
    );
}
