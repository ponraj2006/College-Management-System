import { HiOutlineCurrencyRupee, HiOutlineDownload, HiOutlineTrendingUp } from "react-icons/hi";

export default function StaffSalary({ salaryData }) {
    const gross = salaryData.basic + salaryData.hra + salaryData.da + salaryData.medical;
    const deductions = salaryData.pfDeduction + salaryData.taxDeduction;
    const netPay = gross - deductions;

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <div>
                    <h1>My Salary 💰</h1>
                    <p className="subtitle">View your salary breakdown and payment history</p>
                </div>
            </div>

            {/* Net Pay Highlight */}
            <div className="salary-hero-card">
                <div className="salary-hero-icon">
                    <HiOutlineCurrencyRupee size={32} />
                </div>
                <div>
                    <p className="salary-hero-label">Net Monthly Salary</p>
                    <h1 className="salary-hero-amount">₹{netPay.toLocaleString()}</h1>
                </div>
            </div>

            <div className="admin-detail-grid">
                {/* Earnings */}
                <div className="card">
                    <h3 className="card-title" style={{ color: "#00d4aa" }}>💚 Earnings</h3>
                    <div className="salary-breakdown-list">
                        <div className="salary-breakdown-item">
                            <span>Basic Pay</span>
                            <span className="salary-amount">₹{salaryData.basic.toLocaleString()}</span>
                        </div>
                        <div className="salary-breakdown-item">
                            <span>House Rent Allowance (HRA)</span>
                            <span className="salary-amount">₹{salaryData.hra.toLocaleString()}</span>
                        </div>
                        <div className="salary-breakdown-item">
                            <span>Dearness Allowance (DA)</span>
                            <span className="salary-amount">₹{salaryData.da.toLocaleString()}</span>
                        </div>
                        <div className="salary-breakdown-item">
                            <span>Medical Allowance</span>
                            <span className="salary-amount">₹{salaryData.medical.toLocaleString()}</span>
                        </div>
                        <div className="salary-breakdown-item total">
                            <span>Gross Pay</span>
                            <span className="salary-amount">₹{gross.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Deductions */}
                <div className="card">
                    <h3 className="card-title" style={{ color: "#ff4d6a" }}>❤️ Deductions</h3>
                    <div className="salary-breakdown-list">
                        <div className="salary-breakdown-item">
                            <span>Provident Fund (PF)</span>
                            <span className="salary-amount deduction">-₹{salaryData.pfDeduction.toLocaleString()}</span>
                        </div>
                        <div className="salary-breakdown-item">
                            <span>Income Tax (TDS)</span>
                            <span className="salary-amount deduction">-₹{salaryData.taxDeduction.toLocaleString()}</span>
                        </div>
                        <div className="salary-breakdown-item total">
                            <span>Total Deductions</span>
                            <span className="salary-amount deduction">-₹{deductions.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="card">
                <div className="staff-attendance-header">
                    <h3 className="card-title" style={{ marginBottom: 0 }}>Payment History</h3>
                </div>
                <div className="table-container" style={{ marginTop: "16px" }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryData.paymentHistory.map((pay, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{pay.month}</td>
                                    <td><span className="code-badge">{pay.txnId}</span></td>
                                    <td>{pay.date}</td>
                                    <td style={{ fontWeight: 700, color: "#00d4aa" }}>₹{pay.amount.toLocaleString()}</td>
                                    <td>
                                        <span className="status-badge status-excellent">
                                            {pay.status === "paid" ? "✅ Paid" : "⏳ Pending"}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn view" title="Download Slip">
                                            <HiOutlineDownload size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
