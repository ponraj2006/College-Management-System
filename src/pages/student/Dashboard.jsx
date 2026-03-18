// ── Student Dashboard Page ──
// Wrapper that imports the existing Dashboard component
import DashboardComponent from "../../components/student/Dashboard";
import { studentData as localStudentData } from "../../data/studentData";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleNavigate = (page) => {
        navigate(`/student/${page}`);
    };

    return <DashboardComponent data={localStudentData} onNavigate={handleNavigate} />;
}
