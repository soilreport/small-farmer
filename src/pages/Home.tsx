import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1>Welcome to Soil Monitoring Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">🌡 Avg Temp: 24°C</div>
          <div className="stat-card">💧 Moisture: 53%</div>
          <div className="stat-card">⚠ Alerts: 2</div>
          <div className="stat-card">📡 Devices: 4</div>
        </div>
      </div>
    </>
  );
}