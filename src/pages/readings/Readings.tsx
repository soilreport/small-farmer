// src/pages/readings/Readings.tsx
//soil readings: Temperature, Moisture, pH, NPK + Charts + Recent Activity + FAQ

import { useState } from "react";
import "./Readings.css";
import ReadingsCharts from "./ReadingsCharts";
import { useSoilInsights } from "../../context/SoilInsightsContext";

/**
 * Readings page now updates the global context
 *changing values here updates Alerts + Research pages automatically
 */
export default function Readings() {
  const { readings, setReadings, insights } = useSoilInsights();

  const FAQ_ITEMS = [
    {
      question: "What does Small Farmer help me with?",
      answer:
        "Small Farmer helps you keep an eye on soil conditions (temperature, moisture, pH) and see alerts and recommendations based on your readings.",
    },
    {
      question: "Are the charts and tools using real sensor data?",
      answer:
        "Right now the dashboard uses mock data that behaves like real sensor readings. Later, this can be connected to actual devices in the field.",
    },
    {
      question: "Can I use these tools for different fields?",
      answer:
        "Yes. The readings and alerts are generic and can be used for many crops and plots. In the future you can extend this with multiple fields and devices.",
    },
    {
      question: "Does this replace advice from an agronomist?",
      answer:
        "No. The application is meant as a helper. For critical decisions, always confirm with local agronomists or official extension services.",
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

      {/* FAQ section (moved here instead of a separate page) */}
      <section className="readings-faq">
        <h2>Frequently asked questions</h2>
        <p className="readings-faq-intro">
          Short answers about how the Soil Readings, Alerts and tools work in this app.
        </p>
        <div className="readings-faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <button
                key={item.question}
                type="button"
                className={`readings-faq-item ${isOpen ? "open" : ""}`}
                onClick={() =>
                  setOpenFaqIndex((prev) => (prev === index ? null : index))
                }
              >
                <div className="readings-faq-question-row">
                  <span className="readings-faq-question">{item.question}</span>
                  <span className="readings-faq-toggle">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && <p className="readings-faq-answer">{item.answer}</p>}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}