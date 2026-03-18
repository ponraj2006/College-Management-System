// ── Student Marks Page ──
import MarksComponent from "../../components/student/Marks";
import { studentData as localStudentData } from "../../data/studentData";

export default function Marks() {
    return <MarksComponent data={localStudentData.marks} />;
}
