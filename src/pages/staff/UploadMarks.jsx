// ── Staff Upload Marks Page ──
import MarksEntryComponent from "../../components/staff/MarksEntry";
import { initialStudents } from "../../data/staffStudentsData";

export default function UploadMarks() {
    return <MarksEntryComponent students={initialStudents} />;
}
