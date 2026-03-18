// ── SuperAdmin Dashboard Page ──
export default function Dashboard() {
    return (
        <div className="dashboard-grid">
            <div className="stat-card" style={{ gridColumn: "1 / -1" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
                    🏫 Super Admin Dashboard
                </h2>
                <p style={{ color: "#8a8a9a" }}>
                    System-wide overview and management tools. Coming soon.
                </p>
            </div>
        </div>
    );
}
