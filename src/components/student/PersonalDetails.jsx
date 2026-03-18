import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineIdentification,
    HiOutlineUserGroup,
} from "react-icons/hi";

export default function PersonalDetails({ data }) {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="personal-page fade-in">
            <div className="page-header">
                <h1>Personal Details</h1>
                <p className="subtitle">Your profile and contact information</p>
            </div>

            <div className="personal-grid">
                <div className="card profile-card">
                    <div className="profile-hero">
                        <div className="profile-avatar-large">
                            <span>{data.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                        </div>
                        <h2>{data.name}</h2>
                        <p className="roll-badge">{data.rollNumber}</p>
                        <div className="profile-tags">
                            <span className="tag">{data.department}</span>
                            <span className="tag">{data.year}</span>
                            <span className="tag">Section {data.section}</span>
                        </div>
                    </div>
                </div>

                <div className="card info-card">
                    <h3 className="card-title">
                        <HiOutlineIdentification size={20} />
                        Academic Information
                    </h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Registration No.</span>
                            <span className="info-value">{data.registrationNo}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Department</span>
                            <span className="info-value">{data.department}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Year & Semester</span>
                            <span className="info-value">{data.year} - {data.semester}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Section</span>
                            <span className="info-value">{data.section}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Admission Date</span>
                            <span className="info-value">{formatDate(data.admissionDate)}</span>
                        </div>
                    </div>
                </div>

                <div className="card info-card">
                    <h3 className="card-title">
                        <HiOutlineUser size={20} />
                        Personal Information
                    </h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Date of Birth</span>
                            <span className="info-value">
                                <HiOutlineCalendar size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                {formatDate(data.dob)}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Gender</span>
                            <span className="info-value">{data.gender}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Blood Group</span>
                            <span className="info-value blood-group">{data.bloodGroup}</span>
                        </div>
                    </div>
                </div>

                <div className="card info-card">
                    <h3 className="card-title">
                        <HiOutlineMail size={20} />
                        Contact Information
                    </h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">
                                <HiOutlineMail size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                {data.email}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone</span>
                            <span className="info-value">
                                <HiOutlinePhone size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                {data.phone}
                            </span>
                        </div>
                        <div className="info-item full-width">
                            <span className="info-label">Address</span>
                            <span className="info-value">
                                <HiOutlineLocationMarker size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                {data.address}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card info-card guardian-card">
                    <h3 className="card-title">
                        <HiOutlineUserGroup size={20} />
                        Guardian Details
                    </h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name</span>
                            <span className="info-value">{data.guardian.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Relation</span>
                            <span className="info-value">{data.guardian.relation}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone</span>
                            <span className="info-value">
                                <HiOutlinePhone size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                {data.guardian.phone}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Occupation</span>
                            <span className="info-value">{data.guardian.occupation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HiOutlineUser(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={props.size || 24} height={props.size || 24}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    );
}
