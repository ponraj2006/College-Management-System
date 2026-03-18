import { useState, useMemo } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { departments, years, sections } from "../../data/staffStudentsData";

const examTypes = ["Internal 1", "Internal 2", "Internal 3", "External"];
const subjectsList = [
    "Artificial Intelligence", "Database Management Systems", "Computer Networks",
    "Software Engineering", "Operating Systems", "Digital Signal Processing",
    "Thermodynamics", "Structural Analysis", "Engineering Mathematics",
];

export default function MarksEntry({ students }) {
    const [selectedDept, setSelectedDept] = useState(departments[0]);
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [selectedSection, setSelectedSection] = useState(sections[0]);
    const [selectedExam, setSelectedExam] = useState(examTypes[0]);
    const [selectedSubject, setSelectedSubject] = useState(subjectsList[0]);
    const [marks, setMarks] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const maxMarks = selectedExam.startsWith("Internal") ? 50 : 100;

    const filteredStudents = useMemo(() => {
        return students.filter(
            (s) => s.department === selectedDept && s.year === selectedYear && s.section === selectedSection
        );
    }, [students, selectedDept, selectedYear, selectedSection]);

    const loadStudents = () => {
        const initial = {};
        filteredStudents.forEach((s) => {
            initial[s.id] = "";
        });
        setMarks(initial);
        setLoaded(true);
        setSubmitted(false);
    };

    const handleMarkChange = (studentId, value) => {
        const numVal = value === "" ? "" : Math.min(Math.max(0, parseInt(value) || 0), maxMarks);
        setMarks((prev) => ({ ...prev, [studentId]: numVal }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Marks Entry 📝</h1>
                    <p className="subtitle">Enter marks for students by class and exam</p>
                </div>
            </div>

            {submitted && (
                <div className="staff-toast">
                    ✅ Marks submitted successfully for {selectedSubject} — {selectedExam}!
                </div>
            )}

            <div className="card staff-attendance-selectors">
                <h3 className="card-title">Select Class & Exam</h3>
                <div className="staff-filters-bar">
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Department</label>
                        <select className="staff-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Year</label>
                        <select className="staff-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            {years.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Section</label>
                        <select className="staff-select" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                            {sections.map((sec) => <option key={sec} value={sec}>{sec}</option>)}
                        </select>
                    </div>
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Exam Type</label>
                        <select className="staff-select" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                            {examTypes.map((e) => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                    <div className="staff-filter-group">
                        <label className="staff-filter-label">Subject</label>
                        <select className="staff-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            {subjectsList.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="staff-filter-group" style={{ alignSelf: "flex-end" }}>
                        <button className="staff-add-btn" onClick={loadStudents}>Load Students</button>
                    </div>
                </div>
            </div>

            {loaded && filteredStudents.length > 0 && (
                <div className="card">
                    <div className="staff-attendance-header">
                        <h3 className="card-title" style={{ marginBottom: 0 }}>
                            {selectedSubject} • {selectedExam} (Max: {maxMarks})
                        </h3>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Reg No</th>
                                    <th>Student Name</th>
                                    <th>Marks (out of {maxMarks})</th>
                                    <th>Percentage</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, idx) => {
                                    const mark = marks[student.id];
                                    const pct = mark !== "" && mark !== undefined ? Math.round((parseInt(mark) / maxMarks) * 100) : null;
                                    return (
                                        <tr key={student.id}>
                                            <td>{idx + 1}</td>
                                            <td><span className="code-badge">{student.regNo}</span></td>
                                            <td>{student.name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="marks-input"
                                                    min="0"
                                                    max={maxMarks}
                                                    value={mark}
                                                    onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                                    placeholder={`0-${maxMarks}`}
                                                />
                                            </td>
                                            <td>
                                                {pct !== null ? (
                                                    <div className="cell-progress">
                                                        <div className="cell-progress-bar">
                                                            <div
                                                                className="cell-progress-fill"
                                                                style={{
                                                                    width: `${pct}%`,
                                                                    background: pct >= 80 ? "#00d4aa" : pct >= 50 ? "#6c63ff" : "#ff4d6a",
                                                                }}
                                                            />
                                                        </div>
                                                        <span>{pct}%</span>
                                                    </div>
                                                ) : <span style={{ color: "#555" }}>—</span>}
                                            </td>
                                            <td>
                                                {pct !== null ? (
                                                    <span className={`status-badge ${pct >= 80 ? "status-excellent" : pct >= 50 ? "status-good" : "status-low"}`}>
                                                        {pct >= 80 ? "Pass" : pct >= 50 ? "Average" : "Fail"}
                                                    </span>
                                                ) : <span style={{ color: "#555" }}>—</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="staff-form-actions" style={{ marginTop: "20px" }}>
                        <button className="staff-save-btn" onClick={handleSubmit}>
                            <HiOutlineCheck size={18} />
                            <span>Submit Marks</span>
                        </button>
                    </div>
                </div>
            )}

            {loaded && filteredStudents.length === 0 && (
                <div className="card">
                    <p style={{ textAlign: "center", padding: "40px", color: "#8a8a9a" }}>
                        No students found for the selected class combination.
                    </p>
                </div>
            )}
        </div>
    );
}
