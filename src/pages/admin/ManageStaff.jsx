// ── Admin Manage Staff Page ──
import { useState } from "react";
import AdminStaffsList from "../../components/admin/AdminStaffsList";
import AdminStaffDetail from "../../components/admin/AdminStaffDetail";
import { staffMembers as initialStaffs } from "../../data/staffData";

export default function ManageStaff() {
    const [staffs, setStaffs] = useState(initialStaffs);
    const [selectedId, setSelectedId] = useState(null);

    const handleViewStaff = (id) => setSelectedId(id);
    const handleEditStaff = (id) => setSelectedId(id);
    const handleDeleteStaff = (id) => {
        setStaffs((prev) => prev.filter((s) => s.id !== id));
    };

    const handleSaveStaff = (updated) => {
        setStaffs((prev) =>
            prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
        );
    };

    const handleBack = () => setSelectedId(null);

    if (selectedId) {
        const staff = staffs.find(
            (s) => s.id === selectedId || String(s.id) === String(selectedId)
        );
        return (
            <AdminStaffDetail
                staff={staff}
                onBack={handleBack}
                onSave={handleSaveStaff}
            />
        );
    }

    return (
        <AdminStaffsList
            staffs={staffs}
            onViewStaff={handleViewStaff}
            onEditStaff={handleEditStaff}
            onDeleteStaff={handleDeleteStaff}
        />
    );
}
