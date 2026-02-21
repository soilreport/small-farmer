import DashboardCharts from "./DashboardCharts";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const soilData = {
    temperature: 24,
    moisture: 53,
    ph: 6.4,
    nitrogen: 115,
    phosphorus: 45,
    potassium: 210,
    alerts: 2,
    devices: 4
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(soilData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "soil-data.json";
    a.click();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{getGreeting()}, {user?.fullName || "Farmer"}! 👋</h1>
        <p className="welcome-text">
          Welcome to your Soil Monitoring Dashboard
        </p>
      </div>

      <div className="dashboard-actions">
        <button
          className="action-btn"
          onClick={() => navigate("/readings")}
        >
          View Readings
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/devices")}
        >
          View Devices
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/alerts")}
        >
          Check Alerts
        </button>
        <button
          className="action-btn"
          onClick={handleExport}
        >
          Export Data
        </button>
      </div>
      <DashboardCharts readings={[]} />
    </div>
  );
}
