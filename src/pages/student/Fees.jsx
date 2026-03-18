// ── Student Fees Page ──
import FeesComponent from "../../components/student/Fees";
import { studentData as localStudentData } from "../../data/studentData";

export default function Fees() {
    return <FeesComponent data={localStudentData.fees} />;
}
