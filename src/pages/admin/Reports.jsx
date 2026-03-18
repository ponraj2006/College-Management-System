// ── Admin Reports Page ──
// Combines bus students, hostel students, and login views
import { useState } from "react";
import AdminBusStudents from "../../components/admin/AdminBusStudents";
import AdminHostelStudents from "../../components/admin/AdminHostelStudents";
import AdminStudentLogins from "../../components/admin/AdminStudentLogins";
import AdminStaffAttendance from "../../components/admin/AdminStaffAttendance";
import AdminStaffSalary from "../../components/admin/AdminStaffSalary";
import { adminStudents } from "../../data/adminData";
import { staffMembers } from "../../data/staffData";

const tabs = [
    { id: "bus", label: "🚌 Bus Students" },
    { id: "hostel", label: "🏠 Hostel Students" },
    { id: "logins", label: "🔑 Student Logins" },
    { id: "staff-attendance", label: "📋 Staff Attendance" },
    { id: "staff-salary", label: "💰 Staff Salary" },
];

export default function Reports() {
    const [activeTab, setActiveTab] = useState("bus");

    const renderTab = () => {
        switch (activeTab) {
            case "bus":
                return <AdminBusStudents students={adminStudents} />;
            case "hostel":
                return <AdminHostelStudents students={adminStudents} />;
            case "logins":
                return <AdminStudentLogins students={adminStudents} />;
            case "staff-attendance":
                return <AdminStaffAttendance staffs={staffMembers} onMarkAttendance={() => { }} />;
            case "staff-salary":
                return <AdminStaffSalary staffs={staffMembers} onPaySalary={() => { }} />;
            default:
                return <AdminBusStudents students={adminStudents} />;
        }
    };

    return (
        <div>
            <div style={{
                display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap",
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: "8px 18px", borderRadius: 10, border: "none",
                            background: activeTab === tab.id
                                ? "linear-gradient(135deg, #6c63ff, #5046e5)"
                                : "rgba(108,99,255,0.1)",
                            color: activeTab === tab.id ? "#fff" : "#8a8a9a",
                            fontWeight: 600, cursor: "pointer", fontSize: "0.85rem",
                            transition: "all 0.2s ease",
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {renderTab()}
        </div>
    );
}
