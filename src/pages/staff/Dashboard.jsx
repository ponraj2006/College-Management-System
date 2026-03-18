// ── Staff Dashboard Page ──
import StaffDashboardComponent from "../../components/staff/StaffDashboard";
import { initialStudents } from "../../data/staffStudentsData";

export default function Dashboard() {
    return <StaffDashboardComponent students={initialStudents} />;
}
