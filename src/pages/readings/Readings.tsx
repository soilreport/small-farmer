// Soil readings: Temperature, Moisture, pH, NPK + Recent Activity
import "./Readings.css";

const soilData = {
  temperature: 24,
  moisture: 53,
  ph: 6.4,
  nitrogen: 115,
  phosphorus: 45,
  potassium: 210,
};

export default function Readings() {
  return (
    <div className="readings-container">
      <h1>Soil Readings</h1>
      <p>Current sensor readings and recent activity.</p>

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

        <div className="stat-card npk">
          <h3>🌱 NPK Levels</h3>
          <p className="value">
            N:{soilData.nitrogen} P:{soilData.phosphorus} K:{soilData.potassium}
          </p>
          <p className="status">Balanced</p>
        </div>
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
  );
}
