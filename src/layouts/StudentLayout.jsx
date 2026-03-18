// ── Student Layout ──
// Wraps student pages with sidebar navigation
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/student/Sidebar";
import { studentData as localStudentData } from "../data/studentData";

export default function StudentLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Derive active page from URL path
    const pathSegment = location.pathname.split("/").pop() || "dashboard";

    const handleNavigate = (page) => {
        navigate(`/student/${page}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("educonnect-auth");
        navigate("/login");
    };

    const studentName = localStudentData.personal.name;
    const rollNumber = localStudentData.personal.rollNumber;
    const department = localStudentData.personal.department;

    return (
        <div className="app">
            <Sidebar
                activePage={pathSegment}
                onNavigate={handleNavigate}
                studentName={studentName}
                rollNumber={rollNumber}
                department={department}
                onLogout={handleLogout}
            />
            <main className="main-content">
                <div className="page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
