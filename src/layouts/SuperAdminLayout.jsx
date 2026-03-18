// ── Super Admin Layout ──
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    HiOutlineViewGrid,
    HiOutlineOfficeBuilding,
    HiOutlineBookOpen,
    HiOutlineCog,
    HiOutlineLogout,
    HiOutlineShieldCheck,
} from "react-icons/hi";
import ThemeToggle from "../components/ThemeToggle";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
    { id: "departments", label: "Departments", icon: HiOutlineOfficeBuilding },
    { id: "subjects", label: "Subjects", icon: HiOutlineBookOpen },
    { id: "settings", label: "System Settings", icon: HiOutlineCog },
];

export default function SuperAdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathSegment = location.pathname.split("/").pop() || "dashboard";

    const handleNavigate = (page) => {
        navigate(`/superadmin/${page}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("educonnect-auth");
        navigate("/login");
    };

    return (
        <div className="app">
            <aside className="sidebar admin-sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon admin-logo-accent">
                            <HiOutlineShieldCheck size={28} />
                        </div>
                        <span className="logo-text admin-logo-text">Super Admin</span>
                    </div>
                </div>

                <div className="student-profile admin-profile-card">
                    <div className="avatar admin-avatar">
                        <span>SA</span>
                    </div>
                    <div className="student-info">
                        <h3>Super Administrator</h3>
                        <p>System Manager</p>
                        <p className="dept">EduConnect System</p>
                    </div>
                </div>

                <nav className="nav-menu">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${pathSegment === item.id ? "active admin-nav-active" : ""}`}
                            onClick={() => handleNavigate(item.id)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {pathSegment === item.id && <div className="active-indicator admin-indicator" />}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-theme-toggle">
                        <span className="theme-label">Theme</span>
                        <ThemeToggle />
                    </div>
                    <button className="nav-item logout" onClick={handleLogout}>
                        <HiOutlineLogout size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <div className="page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
