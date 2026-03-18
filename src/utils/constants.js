// ── Constants ──

export const DEPARTMENTS = [
    { id: "cse", name: "Computer Science & Engineering" },
    { id: "ece", name: "Electronics & Communication" },
    { id: "mech", name: "Mechanical Engineering" },
    { id: "civil", name: "Civil Engineering" },
];

export const YEARS = ["I Year", "II Year", "III Year", "IV Year"];
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
export const SECTIONS = ["A", "B", "C"];

export const ATTENDANCE_STATUS = {
    P: { label: "Present", color: "#00d4aa" },
    A: { label: "Absent", color: "#ff4d6a" },
    L: { label: "Leave", color: "#ffa726" },
    H: { label: "Holiday", color: "#8a8a9a" },
};

export const FEE_STATUS = {
    paid: { label: "Paid", color: "#00d4aa" },
    partial: { label: "Partial", color: "#ffa726" },
    unpaid: { label: "Unpaid", color: "#ff4d6a" },
    pending: { label: "Pending", color: "#ff4d6a" },
};

export const GRADE_COLORS = {
    "A+": "#00d4aa",
    "A": "#00b894",
    "B+": "#ffa726",
    "B": "#f39c12",
    "C": "#e74c3c",
    "F": "#ff4d6a",
};
