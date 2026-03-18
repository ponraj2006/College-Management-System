// ── Admin Manage Students Page ──
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminStudentsList from "../../components/admin/AdminStudentsList";
import AdminStudentDetail from "../../components/admin/AdminStudentDetail";
import { adminStudents as initialStudents } from "../../data/adminData";

export default function ManageStudents() {
    const [students, setStudents] = useState(initialStudents);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const handleViewStudent = (id) => setSelectedId(id);
    const handleEditStudent = (id) => setSelectedId(id);
    const handleViewFees = (id) => setSelectedId(id);

    const handleSaveStudent = (updated) => {
        setStudents((prev) =>
            prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
        );
    };

    const handleBack = () => setSelectedId(null);

    if (selectedId) {
        const student = students.find(
            (s) => s.id === selectedId || String(s.id) === String(selectedId)
        );
        return (
            <AdminStudentDetail
                student={student}
                onBack={handleBack}
                onSave={handleSaveStudent}
            />
        );
    }

    return (
        <AdminStudentsList
            students={students}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onViewFees={handleViewFees}
        />
    );
}
