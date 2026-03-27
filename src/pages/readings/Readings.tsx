// src/pages/readings/Readings.tsx
// Soil readings: Temperature, Moisture, pH, NPK + Charts + Recent Activity + FAQ

import { useState, useCallback } from "react";
import "./Readings.css";
import ReadingsCharts from "./ReadingsCharts";
import { useSoilInsights } from "../../context/SoilInsightsContext";
import { isApiConfigured, API_DEVICE_ID } from "../../config/env";
import { getDeviceStateLatest } from "../../api/deviceService";
import { mapDevicePayloadToReadings } from "../../utils/mapDevicePayload";
import Button from "../../components/common1/Button/Button";
import type { SoilMetric } from "../research/researchData";
import { formatMetricValue } from "../../utils/formatters";
import { DEFAULT_NO_DATA_TEXT } from "../../utils/constants";

/**
 * Readings page updates the global soil insights context.
 * Changing values here updates Alerts + Research pages automatically.
 */
export default function Readings() {
  const { readings, setReadings, insights } = useSoilInsights();

  const [deviceIdInput, setDeviceIdInput] = useState(API_DEVICE_ID);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchFromBackend = useCallback(async () => {
    if (!isApiConfigured()) {
      setApiError("Set VITE_API_BASE_URL in .env.local (see .env.example).");
      setApiMessage(null);
      return;
    }
    const id = deviceIdInput.trim() || API_DEVICE_ID;
    setApiLoading(true);
    setApiError(null);
    setApiMessage(null);
    try {
      const res = await getDeviceStateLatest(id);
      if (!res.ok) {
        setApiError(res.error || "Request failed");
        return;
      }
      const partial = mapDevicePayloadToReadings(res.data);
      const keys = Object.keys(partial).filter(
        (k) => partial[k as keyof typeof partial] !== undefined
      );
      if (keys.length === 0) {
        setApiMessage(
          "Backend responded OK, but no temperature/moisture/pH fields were recognized. Check mapDevicePayload.ts field names."
        );
        console.log("Backend JSON (raw):", res.data);
        return;
      }
      setReadings((prev) => ({ ...prev, ...partial }));
      setApiMessage(`Loaded ${keys.length} value(s) from backend for device ${id}.`);
      console.log("Backend device state:", res.data);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setApiLoading(false);
    }
  }, [deviceIdInput, setReadings]);

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

  // chart demo data (still mock)
  const chartReadings = [
    { time: "Mon", temperature: 24, moisture: 53, ph: 6.4 },
    { time: "Tue", temperature: 26, moisture: 48, ph: 6.6 },
    { time: "Wed", temperature: 25, moisture: 50, ph: 6.5 },
    { time: "Thu", temperature: 27, moisture: 55, ph: 6.7 },
    { time: "Fri", temperature: 24, moisture: 52, ph: 6.4 },
  ];

  const hasAlert = (metric: SoilMetric) =>
    insights.alerts.some((alert) => alert.metric === metric);

  const formatNpkValue = (value?: number) =>
    value == null ? DEFAULT_NO_DATA_TEXT : String(value);

  return (
    <div className="readings-container">
      <h1>Soil Readings</h1>
      <p>Current sensor readings and recent activity.</p>

      {isApiConfigured() && (
        <div className="readings-api-section recent-activity">
          <h2>Backend sensor data</h2>
          <p className="readings-api-hint">
            Fetches <code>GET /device-state-latest?deviceId=…</code> and maps fields into the cards
            above. Configure <code>VITE_API_BASE_URL</code> and optional{" "}
            <code>VITE_API_TOKEN</code> in <code>.env.local</code>.
          </p>
          <div className="readings-api-row">
            <label className="readings-api-label">
              Device ID
              <input
                type="text"
                value={deviceIdInput}
                onChange={(e) => setDeviceIdInput(e.target.value)}
                placeholder={API_DEVICE_ID}
              />
            </label>
            <Button
              type="button"
              variant="primary"
              onClick={() => void fetchFromBackend()}
              disabled={apiLoading}
            >
              {apiLoading ? "Loading…" : "Fetch from backend"}
            </Button>
          </div>
          {apiError && <p className="readings-api-error">{apiError}</p>}
          {apiMessage && <p className="readings-api-success">{apiMessage}</p>}
        </div>
      )}

      {!isApiConfigured() && (
        <div className="readings-api-section readings-api-section--muted recent-activity">
          <h2>Backend sensor data</h2>
          <p>
            To load live data from your API, create <code>.env.local</code> with{" "}
            <code>VITE_API_BASE_URL</code> (see <code>.env.example</code>) and restart{" "}
            <code>npm run dev</code>.
          </p>
        </div>
      )}

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
              value={readings.temperature ?? ""}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  temperature:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            Moisture (%)
            <input
              type="number"
              value={readings.moisture ?? ""}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  moisture:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            pH
            <input
              type="number"
              step="0.1"
              value={readings.ph ?? ""}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  ph: e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            EC / Salinity (dS/m) (optional)
            <input
              type="number"
              step="0.1"
              value={readings.ec ?? ""}
              onChange={(e) =>
                setReadings((prev) => ({
                  ...prev,
                  ec: e.target.value === "" ? undefined : Number(e.target.value),
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
          <p className="value">
            {formatMetricValue("temperature", readings.temperature)}
          </p>
          <p className="status">{hasAlert("temperature") ? "Alert" : "OK"}</p>
        </div>

        <div className="stat-card moisture">
          <h3>💧 Moisture</h3>
          <p className="value">
            {formatMetricValue("moisture", readings.moisture)}
          </p>
          <p className="status">{hasAlert("moisture") ? "Alert" : "OK"}</p>
        </div>

        <div className="stat-card ph">
          <h3>⚗️ pH Level</h3>
          <p className="value">{formatMetricValue("ph", readings.ph)}</p>
          <p className="status">{hasAlert("ph") ? "Alert" : "OK"}</p>
        </div>

        <div className="stat-card npk">
          <h3>🌱 NPK Levels</h3>
          <p className="value">
            N: {formatNpkValue(readings.nitrogen)} P:{" "}
            {formatNpkValue(readings.phosphorus)} K:{" "}
            {formatNpkValue(readings.potassium)}
          </p>
          <p className="status">Info</p>
        </div>
      </div>

      {/* Charts */}
      <ReadingsCharts readings={chartReadings} />

      {/* Recent activity uses real computed alerts */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          {insights.alerts.length === 0 ? (
            <li>✅ No active alerts right now</li>
          ) : (
            insights.alerts.slice(0, 4).map((alert) => (
              <li key={alert.id}>
                ⚠️ {alert.title} (value: {alert.value}) — source:{" "}
                {alert.sourceArticleTitle}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* FAQ section */}
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