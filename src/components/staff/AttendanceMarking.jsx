import { useState, useMemo } from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { departments, years, sections } from "../../data/staffStudentsData";

const HOURS = ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5", "Hour 6"];

export default function AttendanceMarking({ students }) {
    const [selectedDept, setSelectedDept] = useState(departments[0]);
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [selectedSection, setSelectedSection] = useState(sections[0]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendance, setAttendance] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const filteredStudents = useMemo(() => {
        return students.filter(
            (s) =>
                s.department === selectedDept &&
                s.year === selectedYear &&
                s.section === selectedSection
        );
    }, [students, selectedDept, selectedYear, selectedSection]);

    // Initialize attendance for new filter combo
    const initAttendance = () => {
        const initial = {};
        filteredStudents.forEach((s) => {
            initial[s.id] = {};
            HOURS.forEach((h) => {
                initial[s.id][h] = "P";
            });
        });
        setAttendance(initial);
        setSubmitted(false);
    };

    const toggleCell = (studentId, hour) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [hour]: prev[studentId]?.[hour] === "P" ? "A" : "P",
            },
        }));
    };

    const markAllPresent = () => {
        const updated = {};
        filteredStudents.forEach((s) => {
            updated[s.id] = {};
            HOURS.forEach((h) => {
                updated[s.id][h] = "P";
            });
        });
        setAttendance(updated);
    };

    const markAllAbsent = () => {
        const updated = {};
        filteredStudents.forEach((s) => {
            updated[s.id] = {};
            HOURS.forEach((h) => {
                updated[s.id][h] = "A";
            });
        });
        setAttendance(updated);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const hasStudents = filteredStudents.length > 0;
    const hasAttendanceData = Object.keys(attendance).length > 0;

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Mark Attendance 📋</h1>
                    <p className="subtitle">Record hour-wise attendance for students</p>
                </div>
            </div>

            {submitted && (
                <div className="staff-toast">
                    ✅ Attendance submitted successfully for {selectedDate}!
                </div>
            )}

            {/* Selection Panel */}
            <div className="card staff-attendance-selectors">
                <h3 className="card-title">Select Class</h3>
                <div className="staff-filters-bar">
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Department</label>
                        <select
                            className="staff-select"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        >
                            {departments.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Year</label>
                        <select
                            className="staff-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Section</label>
                        <select
                            className="staff-select"
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                        >
                            {sections.map((sec) => (
                                <option key={sec} value={sec}>{sec}</option>
                            ))}
                        </select>
                    </div>

                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Date</label>
                        <input
                            type="date"
                            className="staff-form-input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="staff-filter-group" style={{ alignSelf: "flex-end" }}>
                        <button className="staff-add-btn" onClick={initAttendance}>
                            Load Students
                        </button>
                    </div>
                </div>
            </div>

            {/* Attendance Grid */}
            {hasAttendanceData && hasStudents && (
                <div className="card">
                    <div className="staff-attendance-header">
                        <h3 className="card-title" style={{ marginBottom: 0 }}>
                            {selectedDept} • {selectedYear} • Section {selectedSection} • {selectedDate}
                        </h3>
                        <div className="staff-attendance-bulk-actions">
                            <button className="staff-bulk-btn present" onClick={markAllPresent}>
                                All Present
                            </button>
                            <button className="staff-bulk-btn absent" onClick={markAllAbsent}>
                                All Absent
                            </button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table staff-attendance-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Reg No</th>
                                    <th>Student Name</th>
                                    {HOURS.map((h) => (
                                        <th key={h} className="staff-hour-th">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, idx) => (
                                    <tr key={student.id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <span className="code-badge">{student.regNo}</span>
                                        </td>
                                        <td>{student.name}</td>
                                        {HOURS.map((hour) => {
                                            const val = attendance[student.id]?.[hour] || "P";
                                            return (
                                                <td key={hour} className="staff-attendance-cell">
                                                    <button
                                                        className={`staff-att-toggle ${val === "P" ? "present" : "absent"}`}
                                                        onClick={() => toggleCell(student.id, hour)}
                                                        title={val === "P" ? "Present — click to mark absent" : "Absent — click to mark present"}
                                                    >
                                                        {val === "P" ? (
                                                            <HiOutlineCheck size={16} />
                                                        ) : (
                                                            <HiOutlineX size={16} />
                                                        )}
                                                        <span>{val}</span>
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="staff-form-actions" style={{ marginTop: "20px" }}>
                        <button className="staff-save-btn" onClick={handleSubmit}>
                            <HiOutlineCheck size={18} />
                            <span>Submit Attendance</span>
                        </button>
                    </div>
                </div>
            )}

            {hasAttendanceData && !hasStudents && (
                <div className="card">
                    <p className="staff-empty-row" style={{ textAlign: "center", padding: "40px" }}>
                        No students found for the selected class combination.
                    </p>
                </div>
            )}
        </div>
    );
}
