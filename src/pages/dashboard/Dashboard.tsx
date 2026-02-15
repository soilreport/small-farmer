// src/pages/dashboard/Dashboard.tsx
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; //changed
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate(); //canged

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
    //added proper export function
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

      {/* cards stay same */}

      <div className="dashboard-actions">
        <button
          className="action-btn"
          onClick={() => navigate("/devices")} //CHANGED
        >
          View Devices
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/readings")} //CHANnGED
        >
          Check Alerts
        </button>

        <button
          className="action-btn"
          onClick={handleExport} //CHANGED
        >
          Export Data
        </button>
      </div>
    </div>
  );
}
