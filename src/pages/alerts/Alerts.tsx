// src/pages/alerts/Alerts.tsx
/**
 * Before: Used utils/soilRanges.ts + hardcoded latestReading
 * Now: Uses global context (SoilInsightsContext) which is driven by Readings page
 * Readings page updates readings -> evaluateInsights runs -> insights.alerts updates ->
 * this Alerts page renders real alerts + recommendations.
 */

import "./Alerts.css";
import { useSoilInsights } from "../../context/SoilInsightsContext";
import type { SoilAlert } from "../../utils/evaluateInsights";

export default function Alerts() {
  //get global, computed alerts from context
  const { readings, insights } = useSoilInsights();

  const soilAlerts = insights.alerts; // global alert list
  const activeAlertsCount = soilAlerts.length;

  return (
    <div className="alerts-container">
      <h1>Active Alerts</h1>
      <p>Alerts that need your attention.</p>

      {/* Summary card */}
      <div className="alerts-summary-card">
        <h3>⚠️ Active Alerts</h3>
        <p className="value">{activeAlertsCount}</p>
        <p className="status">{activeAlertsCount ? "Needs Attention" : "All clear"}</p>

        {/* Small hint: what readings are currently being used */}
        <p style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
          Current readings → pH: {readings.ph ?? "-"}, Moisture: {readings.moisture ?? "-"}%, Temp:{" "}
          {readings.temperature ?? "-"}°C
        </p>
      </div>

      {/* List */}
      <div className="alerts-list">
        <h2>Recommendations</h2>

        {soilAlerts.length === 0 ? (
          <p className="no-alerts">✅ No soil alerts. All values are in normal range.</p>
        ) : (
          <ul>
            {soilAlerts.map((alert) => (
              <SoilAlertItem key={alert.id} alert={alert} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Single alert item UI
 * Our new system uses severity: info/warning/critical.
 * So we map them to keep your styling working.
 */
function SoilAlertItem({ alert }: { alert: SoilAlert }) {
  //map severity -> CSS-friendly alert level
  const level =
    alert.severity === "critical" ? "high" : alert.severity === "warning" ? "medium" : "low";

  //display label based on metric
  const label =
    alert.metric === "temperature"
      ? `Temperature: ${alert.value}°C`
      : alert.metric === "moisture"
        ? `Moisture: ${alert.value}%`
        : alert.metric === "ph"
          ? `pH: ${alert.value}`
          : alert.metric === "ec"
            ? `EC (Salinity): ${alert.value} dS/m`
            : `${String(alert.metric).toUpperCase()}: ${alert.value}`; // ✅ FIX: never -> safe string

  return (
    <li className={`alert-item soil-alert soil-alert-${level}`}>
      {/* Alert message */}
      <span className="alert-type">{alert.title}</span>

      {/* Metric value */}
      <span className="alert-metric">{label}</span>

      {/* Recommendation */}
      {alert.recommendation ? (
        <p className="alert-recommendation">{alert.recommendation}</p>
      ) : (
        <p className="alert-recommendation">Recommendation: Check research details for this metric.</p>
      )}

      {/* Source article */}
      <p style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>
        Source: Article {alert.sourceArticleId} — {alert.sourceArticleTitle}
      </p>
    </li>
  );
}