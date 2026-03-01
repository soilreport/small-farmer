// src/pages/readings/Readings.tsx
//soil readings: Temperature, Moisture, pH, NPK + Charts + Recent Activity

import "./Readings.css";
import ReadingsCharts from "./ReadingsCharts";
import { useSoilInsights } from "../../context/SoilInsightsContext";

/**
 * Readings page now updates the global context
 *changing values here updates Alerts + Research pages automatically
 */
export default function Readings() {
  const { readings, setReadings, insights } = useSoilInsights();

  //chart demo (still mock)
  const chartReadings = [
    { time: "Mon", temperature: 24, moisture: 53, ph: 6.4 },
    { time: "Tue", temperature: 26, moisture: 48, ph: 6.6 },
    { time: "Wed", temperature: 25, moisture: 50, ph: 6.5 },
    { time: "Thu", temperature: 27, moisture: 55, ph: 6.7 },
    { time: "Fri", temperature: 24, moisture: 52, ph: 6.4 },
  ];

  //helper: check if there is an alert for a metric
  const hasAlert = (metric: string) => insights.alerts.some((a) => a.metric === metric);

  return (
    <div className="readings-container">
      <h1>Soil Readings</h1>
      <p>Current sensor readings and recent activity.</p>

      {/* Local controls to simulate live sensor readings */}
      <div className="recent-activity" style={{ marginBottom: 18 }}>
        <h2>Live Test Controls (Local)</h2>
        <p style={{ opacity: 0.85 }}>
          Change values here → Alerts + Research update automatically.
        </p>

        <div
          style={{
            display: "grid",
            gap: 10,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <label>
            Temperature (°C)
            <input
              type="number"
              value={readings.temperature ?? 0}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  temperature: Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            Moisture (%)
            <input
              type="number"
              value={readings.moisture ?? 0}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  moisture: Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            pH
            <input
              type="number"
              step="0.1"
              value={readings.ph ?? 0}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  ph: Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            EC / Salinity (dS/m) (optional)
            <input
              type="number"
              step="0.1"
              value={readings.ec ?? 0}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  ec: Number(e.target.value),
                }))
              }
            />
          </label>
        </div>
      </div>

      {/* Main cards */}
      <div className="stats-grid">
        <div className="stat-card temperature">
          <h3>🌡 Temperature</h3>
          <p className="value">{readings.temperature}°C</p>
          <p className="status">{hasAlert("temperature") ? "Alert" : "OK"}</p>
        </div>

        <div className="stat-card moisture">
          <h3>💧 Moisture</h3>
          <p className="value">{readings.moisture}%</p>
          <p className="status">{hasAlert("moisture") ? "Alert" : "OK"}</p>
        </div>

        <div className="stat-card ph">
          <h3>⚗️ pH Level</h3>
          <p className="value">{readings.ph}</p>
          <p className="status">{hasAlert("ph") ? "Alert" : "OK"}</p>
        </div>

        <div className="stat-card npk">
          <h3>🌱 NPK Levels</h3>
          <p className="value">
            N:{readings.nitrogen} P:{readings.phosphorus} K:{readings.potassium}
          </p>
          <p className="status">Info</p>
        </div>
      </div>

      {/* Charts */}
      <ReadingsCharts readings={chartReadings} />

      {/* Recent asctivity now uses real computed alerts */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          {insights.alerts.length === 0 ? (
            <li>✅ No active alerts right now</li>
          ) : (
            insights.alerts.slice(0, 4).map((a) => (
              <li key={a.id}>
                ⚠️ {a.title} (value: {a.value}) — source: Article {a.sourceArticleId}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}