// ── Student Attendance Page ──
import AttendanceComponent from "../../components/student/Attendance";
import { studentData as localStudentData } from "../../data/studentData";

export default function Attendance() {
    return <AttendanceComponent data={localStudentData.attendance} />;
}
