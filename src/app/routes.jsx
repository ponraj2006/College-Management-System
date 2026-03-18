// ── Route Configuration ──
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import StudentLayout from "../layouts/StudentLayout";
import StaffLayout from "../layouts/StaffLayout";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import StudentAttendance from "../pages/student/Attendance";
import StudentMarks from "../pages/student/Marks";
import StudentFees from "../pages/student/Fees";
import StudentProfile from "../pages/student/Profile";

// Staff Pages
import StaffDashboard from "../pages/staff/Dashboard";
import MarkAttendance from "../pages/staff/MarkAttendance";
import UploadMarks from "../pages/staff/UploadMarks";
import StaffSalary from "../pages/staff/Salary";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import ManageStudents from "../pages/admin/ManageStudents";
import ManageStaff from "../pages/admin/ManageStaff";
import ManageFees from "../pages/admin/ManageFees";
import Reports from "../pages/admin/Reports";

// SuperAdmin Pages
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import ManageDepartments from "../pages/superadmin/ManageDepartments";
import ManageSubjects from "../pages/superadmin/ManageSubjects";
import SystemSettings from "../pages/superadmin/SystemSettings";

const router = createBrowserRouter([
    // ── Public Routes ──
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // ── Student Routes ──
    {
        path: "/student",
        element: <StudentLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <StudentDashboard /> },
            { path: "personal", element: <StudentProfile /> },
            { path: "attendance", element: <StudentAttendance /> },
            { path: "marks", element: <StudentMarks /> },
            { path: "fees", element: <StudentFees /> },
        ],
    },

    // ── Staff Routes ──
    {
        path: "/staff",
        element: <StaffLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <StaffDashboard /> },
            { path: "students", element: <StaffDashboard /> },
            { path: "mark-attendance", element: <MarkAttendance /> },
            { path: "upload-marks", element: <UploadMarks /> },
            { path: "salary", element: <StaffSalary /> },
            { path: "attendance", element: <StaffDashboard /> },
        ],
    },

    // ── Admin Routes ──
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "students", element: <ManageStudents /> },
            { path: "staffs", element: <ManageStaff /> },
            { path: "fees", element: <ManageFees /> },
            { path: "reports", element: <Reports /> },
            { path: "bus", element: <Reports /> },
            { path: "hostel", element: <Reports /> },
            { path: "logins", element: <Reports /> },
            { path: "penalty", element: <ManageFees /> },
            { path: "staff-attendance", element: <Reports /> },
            { path: "staff-salary", element: <Reports /> },
        ],
    },

    // ── Super Admin Routes ──
    {
        path: "/superadmin",
        element: <SuperAdminLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <SuperAdminDashboard /> },
            { path: "departments", element: <ManageDepartments /> },
            { path: "subjects", element: <ManageSubjects /> },
            { path: "settings", element: <SystemSettings /> },
        ],
    },

    // ── Default Redirect ──
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "*", element: <Navigate to="/login" replace /> },
]);

export default router;
