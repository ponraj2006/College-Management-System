import { useState } from "react";
import { HiOutlineAcademicCap, HiOutlineTrendingUp } from "react-icons/hi";

export default function Marks({ data }) {
    const [selectedSemester, setSelectedSemester] = useState(data.semesters.length - 1);

    const currentSem = data.semesters[selectedSemester];

    const getGradeColor = (grade) => {
        if (grade.includes("+")) return "#00d4aa";
        if (grade === "A") return "#6c63ff";
        if (grade === "B+") return "#ffa726";
        if (grade === "B") return "#ff8a65";
        return "#ff4d6a";
    };

    return (
        <div className="marks-page fade-in">
            <div className="page-header">
                <h1>Marks & Grades</h1>
                <p className="subtitle">Your academic performance across all semesters</p>
            </div>

            <div className="marks-overview-cards">
                <div className="card cgpa-card">
                    <div className="cgpa-display">
                        <HiOutlineAcademicCap size={32} color="#6c63ff" />
                        <div>
                            <p className="cgpa-label">Cumulative GPA</p>
                            <h2 className="cgpa-value">{data.cgpa.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>

                <div className="card gpa-trend-card">
                    <h3 className="card-title">
                        <HiOutlineTrendingUp size={20} />
                        GPA Trend
                    </h3>
                    <div className="gpa-trend-bars">
                        {data.semesters.map((sem, i) => (
                            <div className="gpa-bar-container" key={i}>
                                <div className="gpa-bar-wrapper">
                                    <div
                                        className="gpa-bar"
                                        style={{
                                            height: `${(sem.gpa / 10) * 100}%`,
                                            background: i === selectedSemester
                                                ? "linear-gradient(180deg, #6c63ff, #5046e5)"
                                                : "linear-gradient(180deg, rgba(108, 99, 255, 0.4), rgba(80, 70, 229, 0.3))",
                                        }}
                                    >
                                        <span className="gpa-bar-value">{sem.gpa}</span>
                                    </div>
                                </div>
                                <span className="gpa-bar-label">S{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="semester-selector">
                {data.semesters.map((sem, i) => (
                    <button
                        key={i}
                        className={`semester-btn ${i === selectedSemester ? "active" : ""}`}
                        onClick={() => setSelectedSemester(i)}
                    >
                        {sem.semester}
                        <span className="semester-gpa">GPA: {sem.gpa}</span>
                    </button>
                ))}
            </div>

            <div className="card">
                <h3 className="card-title">{currentSem.semester} - Detailed Marks</h3>
                <div className="table-container">
                    <table className="data-table marks-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Subject</th>
                                <th>Internal (50)</th>
                                <th>External (100)</th>
                                <th>Total (150)</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSem.subjects.map((sub, i) => (
                                <tr key={i}>
                                    <td><span className="code-badge">{sub.code}</span></td>
                                    <td>{sub.name}</td>
                                    <td>
                                        <div className="marks-cell">
                                            <div className="marks-bar-mini">
                                                <div className="marks-bar-fill" style={{ width: `${(sub.internal / 50) * 100}%` }} />
                                            </div>
                                            <span>{sub.internal}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="marks-cell">
                                            <div className="marks-bar-mini">
                                                <div className="marks-bar-fill" style={{ width: `${(sub.external / 100) * 100}%` }} />
                                            </div>
                                            <span>{sub.external}</span>
                                        </div>
                                    </td>
                                    <td><strong>{sub.total}</strong></td>
                                    <td>
                                        <span
                                            className="grade-chip"
                                            style={{
                                                background: `${getGradeColor(sub.grade)}22`,
                                                color: getGradeColor(sub.grade),
                                                borderColor: `${getGradeColor(sub.grade)}44`,
                                            }}
                                        >
                                            {sub.grade}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" style={{ textAlign: "right", fontWeight: 600 }}>Semester GPA:</td>
                                <td colSpan="2">
                                    <span className="gpa-chip">{currentSem.gpa.toFixed(1)}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="card grade-distribution">
                <h3 className="card-title">Grade Distribution - {currentSem.semester}</h3>
                <div className="grade-chips">
                    {["A+", "A", "B+", "B", "C"].map((grade) => {
                        const count = currentSem.subjects.filter((s) => s.grade === grade).length;
                        return (
                            <div className="grade-count-chip" key={grade} style={{ "--grade-color": getGradeColor(grade) }}>
                                <span className="grade-letter">{grade}</span>
                                <span className="grade-count">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
