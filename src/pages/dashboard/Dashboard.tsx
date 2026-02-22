import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleExport = () => {
    const data = { exportedAt: new Date().toISOString(), message: "Export from Small Farmer" };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "soil-data.json";
    a.click();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{getGreeting()}, {user?.fullName || "Farmer"}!</h1>
        <p className="welcome-text">Welcome to Small Farmer</p>
      </header>

      <nav className="dashboard-actions">
        <button className="action-btn" onClick={() => navigate("/readings")}>
          View Readings
        </button>
        <button className="action-btn" onClick={() => navigate("/devices")}>
          View Devices
        </button>
        <button className="action-btn" onClick={() => navigate("/alerts")}>
          Check Alerts
        </button>
        <button className="action-btn" onClick={handleExport}>
          Export Data
        </button>
      </nav>
    </div>
  );
}
