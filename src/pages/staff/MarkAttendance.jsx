// ── Staff Mark Attendance Page ──
import AttendanceMarkingComponent from "../../components/staff/AttendanceMarking";
import { initialStudents } from "../../data/staffStudentsData";

export default function MarkAttendance() {
    return <AttendanceMarkingComponent students={initialStudents} />;
}
