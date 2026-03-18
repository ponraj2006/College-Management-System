// ── Student Profile Page ──
import PersonalDetails from "../../components/student/PersonalDetails";
import { studentData as localStudentData } from "../../data/studentData";

export default function Profile() {
    return <PersonalDetails data={localStudentData.personal} />;
}
