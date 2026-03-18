// ── Staff Layout ──
// Wraps staff pages with sidebar navigation
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import StaffSidebar from "../components/staff/StaffSidebar";

export default function StaffLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Map URL paths to sidebar IDs
    const pathMap = {
        "dashboard": "staff-dashboard",
        "students": "students",
        "student-detail": "students",
        "add-student": "students",
        "edit-student": "students",
        "mark-attendance": "mark-attendance",
        "upload-marks": "mark-entry",
        "salary": "staff-salary",
        "attendance": "staff-attendance",
    };

    const pathSegment = location.pathname.split("/").pop() || "dashboard";
    const activePage = pathMap[pathSegment] || "staff-dashboard";

    const handleNavigate = (page) => {
        // Map sidebar IDs to URL paths
        const routeMap = {
            "staff-dashboard": "dashboard",
            "students": "students",
            "mark-attendance": "mark-attendance",
            "mark-entry": "upload-marks",
            "staff-salary": "salary",
            "staff-attendance": "attendance",
        };
        navigate(`/staff/${routeMap[page] || page}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("educonnect-auth");
        navigate("/login");
    };

    return (
        <div className="app">
            <StaffSidebar
                activePage={activePage}
                onNavigate={handleNavigate}
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
