// ── Staff Salary Page ──
import StaffSalaryComponent from "../../components/staff/StaffSalary";
import { currentStaffSalary } from "../../data/staffData";

export default function Salary() {
    return <StaffSalaryComponent salaryData={currentStaffSalary} />;
}
