import {
    HiOutlineViewGrid,
    HiOutlineUserGroup,
    HiOutlineClipboardCheck,
    HiOutlineLogout,
    HiOutlineAcademicCap,
    HiOutlinePencilAlt,
    HiOutlineCurrencyRupee,
    HiOutlineCalendar,
} from "react-icons/hi";
import ThemeToggle from "../ThemeToggle";

const navItems = [
    { id: "staff-dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
    { id: "students", label: "Students", icon: HiOutlineUserGroup },
    { id: "mark-attendance", label: "Attendance", icon: HiOutlineClipboardCheck },
    { id: "mark-entry", label: "Marks Entry", icon: HiOutlinePencilAlt },
    { id: "staff-salary", label: "My Salary", icon: HiOutlineCurrencyRupee },
    { id: "staff-attendance", label: "My Attendance", icon: HiOutlineCalendar },
];

export default function StaffSidebar({ activePage, onNavigate, onLogout }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon staff-logo-icon">
                        <HiOutlineAcademicCap size={28} />
                    </div>
                    <span className="logo-text">EduConnect</span>
                </div>
            </div>

            <div className="student-profile staff-profile-card">
                <div className="avatar staff-avatar">
                    <span>ST</span>
                </div>
                <div className="student-info">
                    <h3>Prof. Ramesh K</h3>
                    <p>Staff ID: STF2024001</p>
                    <p className="dept">Computer Science & Engineering</p>
                </div>
            </div>

            <nav className="nav-menu">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? "active" : ""}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                        {activePage === item.id && <div className="active-indicator" />}
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
