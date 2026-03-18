import {
    HiOutlineViewGrid,
    HiOutlineUser,
    HiOutlineClipboardCheck,
    HiOutlineAcademicCap,
    HiOutlineCreditCard,
    HiOutlineLogout,
} from "react-icons/hi";
import ThemeToggle from "../ThemeToggle";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
    { id: "personal", label: "Personal Details", icon: HiOutlineUser },
    { id: "attendance", label: "Attendance", icon: HiOutlineClipboardCheck },
    { id: "marks", label: "Marks & Grades", icon: HiOutlineAcademicCap },
    { id: "fees", label: "Fees & Payments", icon: HiOutlineCreditCard },
];

export default function Sidebar({ activePage, onNavigate, studentName, rollNumber, department, onLogout }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">
                        <HiOutlineAcademicCap size={28} />
                    </div>
                    <span className="logo-text">EduConnect</span>
                </div>
            </div>

            <div className="student-profile">
                <div className="avatar">
                    <span>{studentName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                </div>
                <div className="student-info">
                    <h3>{studentName}</h3>
                    <p>{rollNumber}</p>
                    <p className="dept">{department}</p>
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

