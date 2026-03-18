import {
    HiOutlineViewGrid,
    HiOutlineUserGroup,
    HiOutlineCreditCard,
    HiOutlineExclamationCircle,
    HiOutlineTruck,
    HiOutlineHome,
    HiOutlineLogin,
    HiOutlineLogout,
    HiOutlineShieldCheck,
    HiOutlineAcademicCap,
    HiOutlineClipboardCheck,
    HiOutlineCurrencyRupee,
} from "react-icons/hi";
import ThemeToggle from "../ThemeToggle";

const navItems = [
    { id: "admin-dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
    { id: "admin-students", label: "Students", icon: HiOutlineUserGroup },
    { id: "admin-staffs", label: "Staff", icon: HiOutlineAcademicCap },
    { id: "admin-staff-attendance", label: "Staff Attendance", icon: HiOutlineClipboardCheck },
    { id: "admin-staff-salary", label: "Staff Salary", icon: HiOutlineCurrencyRupee },
    { id: "admin-fees", label: "Fees Management", icon: HiOutlineCreditCard },
    { id: "admin-penalty", label: "Penalties", icon: HiOutlineExclamationCircle },
    { id: "admin-bus", label: "Bus Students", icon: HiOutlineTruck },
    { id: "admin-hostel", label: "Hostel Students", icon: HiOutlineHome },
    { id: "admin-logins", label: "Student Logins", icon: HiOutlineLogin },
];

export default function AdminSidebar({ activePage, onNavigate, onLogout }) {
    return (
        <aside className="sidebar admin-sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon admin-logo-accent">
                        <HiOutlineShieldCheck size={28} />
                    </div>
                    <span className="logo-text admin-logo-text">Admin Panel</span>
                </div>
            </div>

            <div className="student-profile admin-profile-card">
                <div className="avatar admin-avatar">
                    <span>AD</span>
                </div>
                <div className="student-info">
                    <h3>Administrator</h3>
                    <p>Super Admin</p>
                    <p className="dept">EduConnect System</p>
                </div>
            </div>

            <nav className="nav-menu">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? "active admin-nav-active" : ""}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                        {activePage === item.id && <div className="active-indicator admin-indicator" />}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-theme-toggle">
                    <span className="theme-label">Theme</span>
                    <ThemeToggle />
                </div>
                <button className="nav-item logout" onClick={onLogout}>
                    <HiOutlineLogout size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
