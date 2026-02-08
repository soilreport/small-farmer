// src/pages/dashboard/Dashboard.tsx
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

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

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>{getGreeting()}, {user?.fullName || "Farmer"}! 👋</h1>
          <p className="welcome-text">Welcome to your Soil Monitoring Dashboard</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card temperature">
            <h3>🌡 Temperature</h3>
            <p className="value">{soilData.temperature}°C</p>
            <p className="status">Optimal</p>
          </div>
          
          <div className="stat-card moisture">
            <h3>💧 Moisture</h3>
            <p className="value">{soilData.moisture}%</p>
            <p className="status">Good</p>
          </div>
          
          <div className="stat-card ph">
            <h3>⚗️ pH Level</h3>
            <p className="value">{soilData.ph}</p>
            <p className="status">Neutral</p>
          </div>
          
          <div className="stat-card alerts">
            <h3>⚠️ Active Alerts</h3>
            <p className="value">{soilData.alerts}</p>
            <p className="status">Needs Attention</p>
          </div>
          
          <div className="stat-card devices">
            <h3>📡 Devices</h3>
            <p className="value">{soilData.devices}</p>
            <p className="status">All Online</p>
          </div>
          
          <div className="stat-card npk">
            <h3>🌱 NPK Levels</h3>
            <p className="value">N:{soilData.nitrogen} P:{soilData.phosphorus} K:{soilData.potassium}</p>
            <p className="status">Balanced</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="action-btn">View Devices</button>
          <button className="action-btn">Check Alerts</button>
          <button className="action-btn">Export Data</button>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>🌡 Temperature spike detected 2 hours ago</li>
            <li>💧 Irrigation recommendation: Water in 4 hours</li>
            <li>⚠️ Low nitrogen alert for Field A</li>
            <li>✅ Device #3 synced successfully</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}