import { useState, useEffect } from "react";

// ── Students Imports ──
import LoginPage from "./components/student/LoginPage";
import Sidebar from "./components/student/Sidebar";
import Dashboard from "./components/student/Dashboard";
import PersonalDetails from "./components/student/PersonalDetails";
import Attendance from "./components/student/Attendance";
import Marks from "./components/student/Marks";
import Fees from "./components/student/Fees";

// ── Staffs Imports ──
import StaffSidebar from "./components/staff/StaffSidebar";
import StaffDashboard from "./components/staff/StaffDashboard";
import StudentsList from "./components/staff/StudentsList";
import StudentDetail from "./components/staff/StudentDetail";
import AddEditStudent from "./components/staff/AddEditStudent";
import AttendanceMarking from "./components/staff/AttendanceMarking";
import MarksEntry from "./components/staff/MarksEntry";
import StaffSalary from "./components/staff/StaffSalary";
import StaffAttendanceView from "./components/staff/StaffAttendanceView";

// ── Admin Imports ──
import AdminLoginPage from "./components/admin/AdminLoginPage";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminStudentsList from "./components/admin/AdminStudentsList";
import AdminStudentDetail from "./components/admin/AdminStudentDetail";
import AdminFees from "./components/admin/AdminFees";
import AdminPenalty from "./components/admin/AdminPenalty";
import AdminBusStudents from "./components/admin/AdminBusStudents";
import AdminHostelStudents from "./components/admin/AdminHostelStudents";
import AdminStudentLogins from "./components/admin/AdminStudentLogins";
import AdminStaffsList from "./components/admin/AdminStaffsList";
import AdminStaffDetail from "./components/admin/AdminStaffDetail";
import AdminStaffAttendance from "./components/admin/AdminStaffAttendance";
import AdminStaffSalary from "./components/admin/AdminStaffSalary";

// ── Firebase Services ──
import {
  adminStudentsService,
  staffMembersService,
  staffStudentsService,
  studentDataService,
  currentStaffService,
} from "./services/firebaseService";
import SeedFirebase from "./components/SeedFirebase";

// ── Fallback local data (used if Firebase is not configured) ──
import { studentData as localStudentData } from "./data/studentData";
import { initialStudents as localInitialStudents } from "./data/staffStudentsData";
import { adminStudents as localAdminStudents, adminCredentials as localAdminCreds } from "./data/adminData";
import { staffMembers as localStaffMembers, currentStaffSalary as localStaffSalary, currentStaffAttendance as localStaffAttendance } from "./data/staffData";

import "./App.css";

function App() {
  // ── Auth State ──
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // ── Data State ──
  const [studentData, setStudentData] = useState(localStudentData);
  const [students, setStudents] = useState(localInitialStudents);
  const [adminStudents, setAdminStudents] = useState(localAdminStudents);
  const [adminStaffs, setAdminStaffs] = useState(localStaffMembers);
  const [adminCredentials, setAdminCredentials] = useState(localAdminCreds);
  const [staffSalaryData, setStaffSalaryData] = useState(localStaffSalary);
  const [staffAttendanceData, setStaffAttendanceData] = useState(localStaffAttendance);

  // ── Navigation State ──
  const [activePage, setActivePage] = useState("staff-dashboard");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [studentActivePage, setStudentActivePage] = useState("dashboard");
  const [adminPage, setAdminPage] = useState("admin-dashboard");
  const [adminSelectedId, setAdminSelectedId] = useState(null);
  const [adminStaffSelectedId, setAdminStaffSelectedId] = useState(null);

  // ── Firebase / UI State ──
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [useFirebase, setUseFirebase] = useState(false);

  // ══════════════════════════════════════════
  //  Load Data from Firebase on Mount
  // ══════════════════════════════════════════
  useEffect(() => {
    const loadFromFirebase = async () => {
      try {
        // Try loading admin students — if it works, Firebase is configured
        const fbAdminStudents = await adminStudentsService.getAll();
        if (fbAdminStudents.length > 0) {
          setAdminStudents(fbAdminStudents);
          setUseFirebase(true);

          // Load all other collections
          const [fbStaffs, fbStudents, fbStudentData, fbSalary, fbAttendance] =
            await Promise.all([
              staffMembersService.getAll(),
              staffStudentsService.getAll(),
              studentDataService.get(),
              currentStaffService.getSalary(),
              currentStaffService.getAttendance(),
            ]);

          if (fbStaffs.length > 0) setAdminStaffs(fbStaffs);
          if (fbStudents.length > 0) setStudents(fbStudents);
          if (fbStudentData) setStudentData(fbStudentData);
          if (fbSalary) setStaffSalaryData(fbSalary);
          if (fbAttendance) setStaffAttendanceData(fbAttendance);

          console.log("✅ Data loaded from Firebase");
        } else {
          console.log("ℹ️ Firebase empty — using local data");
        }
      } catch (err) {
        console.log("ℹ️ Firebase not configured — using local data.", err.message);
      }
      setDataLoaded(true);
    };

    loadFromFirebase();
  }, []);

  // ── Sync helper: writes updates to Firebase if connected ──
  const syncToFirebase = async (serviceFn, ...args) => {
    if (useFirebase) {
      try {
        await serviceFn(...args);
      } catch (err) {
        console.warn("Firebase sync failed:", err.message);
      }
    }
  };

  // ══════════════════════════════════════════
  //  Auth Handlers
  // ══════════════════════════════════════════
  const handleLogin = (role, name) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    if (role === "staff") {
      setActivePage("staff-dashboard");
    } else {
      setStudentActivePage("dashboard");
    }
  };

  const handleAdminLogin = (email, password, onError) => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      setUserRole("admin");
      setUserName("Administrator");
      setIsLoggedIn(true);
      setAdminPage("admin-dashboard");
      setShowAdminLogin(false);
    } else {
      onError("Invalid admin credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    setShowAdminLogin(false);
  };

  // ══════════════════════════════════════════
  //  Staff Handlers
  // ══════════════════════════════════════════
  const handleViewStudent = (id) => {
    setSelectedStudentId(id);
    setActivePage("student-detail");
  };

  const handleEditStudent = (id) => {
    setEditingStudentId(id);
    setActivePage("edit-student");
  };

  const handleAddStudent = () => {
    setIsAddingStudent(true);
    setEditingStudentId(null);
    setActivePage("add-student");
  };

  const handleSaveStudent = (formData) => {
    if (editingStudentId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudentId ? { ...s, ...formData } : s))
      );
      syncToFirebase(staffStudentsService.update, editingStudentId, formData);
      setEditingStudentId(null);
      setActivePage("students");
    } else {
      const newId = students.length > 0 ? Math.max(...students.map((s) => Number(s.id) || 0)) + 1 : 1;
      const newStudent = { ...formData, id: newId };
      setStudents((prev) => [...prev, newStudent]);
      syncToFirebase(staffStudentsService.create, newStudent);
      setIsAddingStudent(false);
      setActivePage("students");
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setIsAddingStudent(false);
    if (selectedStudentId) {
      setActivePage("student-detail");
    } else {
      setActivePage("students");
    }
  };

  const handleBackFromDetail = () => {
    setSelectedStudentId(null);
    setActivePage("students");
  };

  const handleSuspendStudent = (id) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, suspended: !s.suspended };
          syncToFirebase(staffStudentsService.update, id, { suspended: updated.suspended });
          return updated;
        }
        return s;
      })
    );
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    syncToFirebase(staffStudentsService.delete, id);
  };

  // ══════════════════════════════════════════
  //  Admin Handlers
  // ══════════════════════════════════════════
  const handleAdminViewStudent = (id) => {
    setAdminSelectedId(id);
    setAdminPage("admin-student-detail");
  };

  const handleAdminEditStudent = (id) => {
    setAdminSelectedId(id);
    setAdminPage("admin-student-detail");
  };

  const handleAdminViewFees = (id) => {
    setAdminSelectedId(id);
    setAdminPage("admin-student-detail");
  };

  const handleAdminSaveStudent = (updatedStudent) => {
    setAdminStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? { ...s, ...updatedStudent } : s))
    );
    syncToFirebase(adminStudentsService.update, updatedStudent.id, updatedStudent);
  };

  const handleAdminBackFromDetail = () => {
    setAdminSelectedId(null);
    setAdminPage("admin-students");
  };

  const handleApplyFees = (dept, feeConfig) => {
    const total = Object.values(feeConfig).reduce((a, b) => a + b, 0);
    setAdminStudents((prev) =>
      prev.map((s) => {
        if (s.department === dept) {
          const updated = { ...s, fees: { ...s.fees, totalFees: total, pendingAmount: total - s.fees.paidAmount } };
          syncToFirebase(adminStudentsService.update, s.id, updated);
          return updated;
        }
        return s;
      })
    );
  };

  const handleAddPenalty = (studentId, amount) => {
    setAdminStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updated = { ...s, fees: { ...s.fees, penalty: s.fees.penalty + amount } };
          syncToFirebase(adminStudentsService.update, s.id, updated);
          return updated;
        }
        return s;
      })
    );
  };

  const handleBulkPenalty = (amount) => {
    setAdminStudents((prev) =>
      prev.map((s) => {
        if (s.fees.feeStatus !== "paid") {
          const updated = { ...s, fees: { ...s.fees, penalty: s.fees.penalty + amount } };
          syncToFirebase(adminStudentsService.update, s.id, updated);
          return updated;
        }
        return s;
      })
    );
  };

  // ── Admin Staff Handlers ──
  const handleAdminViewStaff = (id) => {
    setAdminStaffSelectedId(id);
    setAdminPage("admin-staff-detail");
  };

  const handleAdminEditStaff = (id) => {
    setAdminStaffSelectedId(id);
    setAdminPage("admin-staff-detail");
  };

  const handleAdminDeleteStaff = (id) => {
    setAdminStaffs((prev) => prev.filter((s) => s.id !== id));
    syncToFirebase(staffMembersService.delete, id);
  };

  const handleAdminSaveStaff = (updatedStaff) => {
    setAdminStaffs((prev) =>
      prev.map((s) => (s.id === updatedStaff.id ? { ...s, ...updatedStaff } : s))
    );
    syncToFirebase(staffMembersService.update, updatedStaff.id, updatedStaff);
  };

  const handleAdminBackFromStaffDetail = () => {
    setAdminStaffSelectedId(null);
    setAdminPage("admin-staffs");
  };

  const handleAdminMarkStaffAttendance = (date, attendanceData) => {
    setAdminStaffs((prev) =>
      prev.map((s) => {
        const status = attendanceData[s.id];
        if (!status) return s;
        const existing = s.attendanceHistory || [];
        const filtered = existing.filter((a) => a.date !== date);
        const updated = { ...s, attendanceHistory: [...filtered, { date, status }] };
        syncToFirebase(staffMembersService.update, s.id, updated);
        return updated;
      })
    );
  };

  const handleAdminPaySalary = (staffId, month) => {
    // UI-only for now
  };

  // ══════════════════════════════════════════
  //  RENDER: Loading
  // ══════════════════════════════════════════
  if (!dataLoaded) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "#0a0a1a", color: "#6c63ff",
        fontSize: "1.2rem", fontWeight: 600,
      }}>
        ⏳ Loading data...
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  RENDER: Seed Overlay
  // ══════════════════════════════════════════
  if (showSeed) {
    return <SeedFirebase />;
  }

  // ══════════════════════════════════════════
  //  RENDER: Login Screen
  // ══════════════════════════════════════════
  if (!isLoggedIn) {
    if (showAdminLogin) {
      return (
        <>
          <AdminLoginPage
            onAdminLogin={handleAdminLogin}
            onBackToMain={() => setShowAdminLogin(false)}
          />
          {/* Seed Button — bottom right corner */}
          <button
            onClick={() => setShowSeed(true)}
            style={{
              position: "fixed", bottom: 20, right: 20, zIndex: 999,
              padding: "8px 16px", borderRadius: 10, border: "none",
              background: "rgba(108,99,255,0.2)", color: "#6c63ff",
              fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            🔥 Seed Firebase
          </button>
        </>
      );
    }
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onAdminLogin={() => setShowAdminLogin(true)}
        />
        {/* Seed Button — bottom right corner */}
        <button
          onClick={() => setShowSeed(true)}
          style={{
            position: "fixed", bottom: 20, right: 20, zIndex: 999,
            padding: "8px 16px", borderRadius: 10, border: "none",
            background: "rgba(108,99,255,0.2)", color: "#6c63ff",
            fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          🔥 Seed Firebase
        </button>
      </>
    );
  }

  // ══════════════════════════════════════════
  //  RENDER: Student Mode
  // ══════════════════════════════════════════
  if (userRole === "student") {
    const renderStudentPage = () => {
      switch (studentActivePage) {
        case "dashboard":
          return <Dashboard data={studentData} onNavigate={setStudentActivePage} />;
        case "personal":
          return <PersonalDetails data={studentData.personal} />;
        case "attendance":
          return <Attendance data={studentData.attendance} />;
        case "marks":
          return <Marks data={studentData.marks} />;
        case "fees":
          return <Fees data={studentData.fees} />;
        default:
          return <Dashboard data={studentData} />;
      }
    };

    return (
      <div className="app">
        <Sidebar
          activePage={studentActivePage}
          onNavigate={setStudentActivePage}
          studentName={studentData.personal.name}
          rollNumber={studentData.personal.rollNumber}
          department={studentData.personal.department}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <div className="page-container">{renderStudentPage()}</div>
        </main>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  RENDER: Admin Mode
  // ══════════════════════════════════════════
  if (userRole === "admin") {
    const renderAdminPage = () => {
      switch (adminPage) {
        case "admin-dashboard":
          return <AdminDashboard students={adminStudents} />;
        case "admin-students":
          return (
            <AdminStudentsList
              students={adminStudents}
              onViewStudent={handleAdminViewStudent}
              onEditStudent={handleAdminEditStudent}
              onViewFees={handleAdminViewFees}
            />
          );
        case "admin-student-detail":
          return (
            <AdminStudentDetail
              student={adminStudents.find((s) => s.id === adminSelectedId || String(s.id) === String(adminSelectedId))}
              onBack={handleAdminBackFromDetail}
              onSave={handleAdminSaveStudent}
            />
          );
        case "admin-fees":
          return <AdminFees students={adminStudents} onApplyFees={handleApplyFees} />;
        case "admin-penalty":
          return (
            <AdminPenalty
              students={adminStudents}
              onAddPenalty={handleAddPenalty}
              onBulkPenalty={handleBulkPenalty}
            />
          );
        case "admin-bus":
          return <AdminBusStudents students={adminStudents} />;
        case "admin-hostel":
          return <AdminHostelStudents students={adminStudents} />;
        case "admin-logins":
          return <AdminStudentLogins students={adminStudents} />;
        case "admin-staffs":
          return (
            <AdminStaffsList
              staffs={adminStaffs}
              onViewStaff={handleAdminViewStaff}
              onEditStaff={handleAdminEditStaff}
              onDeleteStaff={handleAdminDeleteStaff}
            />
          );
        case "admin-staff-detail":
          return (
            <AdminStaffDetail
              staff={adminStaffs.find((s) => s.id === adminStaffSelectedId || String(s.id) === String(adminStaffSelectedId))}
              onBack={handleAdminBackFromStaffDetail}
              onSave={handleAdminSaveStaff}
            />
          );
        case "admin-staff-attendance":
          return (
            <AdminStaffAttendance
              staffs={adminStaffs}
              onMarkAttendance={handleAdminMarkStaffAttendance}
            />
          );
        case "admin-staff-salary":
          return (
            <AdminStaffSalary
              staffs={adminStaffs}
              onPaySalary={handleAdminPaySalary}
            />
          );
        default:
          return <AdminDashboard students={adminStudents} />;
      }
    };

    return (
      <div className="app">
        <AdminSidebar
          activePage={adminPage}
          onNavigate={(page) => {
            setAdminSelectedId(null);
            setAdminStaffSelectedId(null);
            setAdminPage(page);
          }}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <div className="page-container">{renderAdminPage()}</div>
        </main>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  RENDER: Staff Mode
  // ══════════════════════════════════════════
  const renderStaffPage = () => {
    switch (activePage) {
      case "staff-dashboard":
        return <StaffDashboard students={students} />;
      case "students":
        return (
          <StudentsList
            students={students}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onAddStudent={handleAddStudent}
            onSuspendStudent={handleSuspendStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        );
      case "student-detail":
        return (
          <StudentDetail
            student={students.find((s) => s.id === selectedStudentId || String(s.id) === String(selectedStudentId))}
            onBack={handleBackFromDetail}
            onEdit={handleEditStudent}
          />
        );
      case "add-student":
        return (
          <AddEditStudent
            student={null}
            onSave={handleSaveStudent}
            onCancel={handleCancelEdit}
          />
        );
      case "edit-student":
        return (
          <AddEditStudent
            student={students.find((s) => s.id === editingStudentId || String(s.id) === String(editingStudentId))}
            onSave={handleSaveStudent}
            onCancel={handleCancelEdit}
          />
        );
      case "mark-attendance":
        return <AttendanceMarking students={students} />;
      case "mark-entry":
        return <MarksEntry students={students} />;
      case "staff-salary":
        return <StaffSalary salaryData={staffSalaryData} />;
      case "staff-attendance":
        return <StaffAttendanceView attendanceData={staffAttendanceData} />;
      default:
        return <StaffDashboard students={students} />;
    }
  };

  return (
    <div className="app">
      <StaffSidebar
        activePage={activePage}
        onNavigate={(page) => {
          setSelectedStudentId(null);
          setEditingStudentId(null);
          setIsAddingStudent(false);
          setActivePage(page);
        }}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <div className="page-container">{renderStaffPage()}</div>
      </main>
    </div>
  );
}

export default App;
