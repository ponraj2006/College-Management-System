// ── Admin Layout ──
// Wraps admin pages with sidebar navigation
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Map URL paths to sidebar IDs
    const pathMap = {
        "dashboard": "admin-dashboard",
        "students": "admin-students",
        "student-detail": "admin-students",
        "staffs": "admin-staffs",
        "staff-detail": "admin-staffs",
        "staff-attendance": "admin-staff-attendance",
        "staff-salary": "admin-staff-salary",
        "fees": "admin-fees",
        "penalty": "admin-penalty",
        "bus": "admin-bus",
        "hostel": "admin-hostel",
        "logins": "admin-logins",
    };

    const pathSegment = location.pathname.split("/").pop() || "dashboard";
    const activePage = pathMap[pathSegment] || "admin-dashboard";

    const handleNavigate = (page) => {
        // Map sidebar IDs to URL paths
        const routeMap = {
            "admin-dashboard": "dashboard",
            "admin-students": "students",
            "admin-staffs": "staffs",
            "admin-staff-attendance": "staff-attendance",
            "admin-staff-salary": "staff-salary",
            "admin-fees": "fees",
            "admin-penalty": "penalty",
            "admin-bus": "bus",
            "admin-hostel": "hostel",
            "admin-logins": "logins",
        };
        navigate(`/admin/${routeMap[page] || page}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("educonnect-auth");
        navigate("/login");
    };

    return (
        <div className="app">
            <AdminSidebar
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
