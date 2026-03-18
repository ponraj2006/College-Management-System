// ── Admin Dashboard Page ──
import AdminDashboardComponent from "../../components/admin/AdminDashboard";
import { adminStudents } from "../../data/adminData";

export default function Dashboard() {
    return <AdminDashboardComponent students={adminStudents} />;
}
