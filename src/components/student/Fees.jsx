import {
    HiOutlineCreditCard,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineClock,
} from "react-icons/hi";

export default function Fees({ data }) {
    const paidPercentage = Math.round((data.paidAmount / data.totalFees) * 100);

    const getStatusIcon = (status) => {
        switch (status) {
            case "paid":
            case "success":
                return <HiOutlineCheckCircle size={18} color="#00d4aa" />;
            case "pending":
            case "overdue":
                return <HiOutlineExclamationCircle size={18} color="#ff4d6a" />;
            case "partial":
            case "upcoming":
                return <HiOutlineClock size={18} color="#ffa726" />;
            default:
                return null;
        }
    };

    return (
        <div className="fees-page fade-in">
            <div className="page-header">
                <h1>Fees & Payments</h1>
                <p className="subtitle">Track your fee payments and pending dues</p>
            </div>

            <div className="fees-summary-cards">
                <div className="card fee-stat-card total">
                    <HiOutlineCreditCard size={28} />
                    <div>
                        <p>Total Fees</p>
                        <h2>₹{data.totalFees.toLocaleString()}</h2>
                    </div>
                </div>
                <div className="card fee-stat-card paid">
                    <HiOutlineCheckCircle size={28} />
                    <div>
                        <p>Paid Amount</p>
                        <h2>₹{data.paidAmount.toLocaleString()}</h2>
                    </div>
                </div>
                <div className="card fee-stat-card pending">
                    <HiOutlineExclamationCircle size={28} />
                    <div>
                        <p>Pending Amount</p>
                        <h2>₹{data.pendingAmount.toLocaleString()}</h2>
                    </div>
                </div>
                <div className="card fee-stat-card progress">
                    <div className="fee-progress-ring">
                        <svg viewBox="0 0 36 36">
                            <path
                                className="donut-ring"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="donut-segment-green"
                                strokeDasharray={`${paidPercentage}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <span>{paidPercentage}%</span>
                    </div>
                    <p>Payment Progress</p>
                </div>
            </div>

            <div className="fees-content-grid">
                <div className="card">
                    <h3 className="card-title">Fee Breakdown</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Fee Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.breakdown.map((fee, i) => (
                                    <tr key={i}>
                                        <td>{fee.type}</td>
                                        <td>₹{fee.amount.toLocaleString()}</td>
                                        <td>
                                            <span className={`status-badge status-${fee.status}`}>
                                                {getStatusIcon(fee.status)}
                                                {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            {fee.status === "partial" ? (
                                                <span className="partial-info">
                                                    Paid: ₹{fee.paid?.toLocaleString()} | Remaining: ₹{fee.remaining?.toLocaleString()}
                                                </span>
                                            ) : fee.status === "paid" ? (
                                                <span className="text-success">Completed</span>
                                            ) : (
                                                <span className="text-danger">Payment Required</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td style={{ fontWeight: 700 }}>Total</td>
                                    <td style={{ fontWeight: 700 }}>₹{data.totalFees.toLocaleString()}</td>
                                    <td colSpan="2"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Upcoming Due Dates</h3>
                    <div className="due-dates-list">
                        {data.dueDates.map((due, i) => (
                            <div className={`due-date-item ${due.status}`} key={i}>
                                <div className="due-date-icon">{getStatusIcon(due.status)}</div>
                                <div className="due-date-info">
                                    <h4>{due.fee}</h4>
                                    <p>Due: {new Date(due.dueDate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
                                </div>
                                <div className="due-date-amount">₹{due.amount.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="card-title">Payment History</h3>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.paymentHistory.map((txn, i) => (
                                <tr key={i}>
                                    <td><span className="code-badge">{txn.id}</span></td>
                                    <td>{new Date(txn.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</td>
                                    <td>{txn.description}</td>
                                    <td>
                                        <span className="method-badge">{txn.method}</span>
                                    </td>
                                    <td className="text-success" style={{ fontWeight: 600 }}>₹{txn.amount.toLocaleString()}</td>
                                    <td>
                                        <span className="status-badge status-paid">
                                            {getStatusIcon(txn.status)}
                                            Success
                                        </span>
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
