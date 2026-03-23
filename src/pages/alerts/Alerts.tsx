// src/pages/alerts/Alerts.tsx

import { Link } from "react-router-dom";
import "./Alerts.css";
import { useSoilInsights } from "../../context/SoilInsightsContext";
import type { SoilAlert } from "../../utils/evaluateInsights";
import { formatMetricValue } from "../../utils/formatters";
import { METRIC_LABELS } from "../../utils/constants";
import type { SoilMetric } from "../research/researchData";

export default function Alerts() {
  const { readings, insights } = useSoilInsights();

  const soilAlerts = insights.alerts;
  const activeAlertsCount = soilAlerts.length;

  return (
    <div className="alerts-container">
      <h1>Alerts</h1>
      <p>
        Alerts appear when your soil conditions go outside safe limits. Check them
        to take action and protect your crops.
      </p>

      <div className="alerts-summary-card">
        <h3>⚠️ Active Alerts</h3>
        <p className="value">{activeAlertsCount}</p>
        <p className="status">
          {activeAlertsCount > 0 ? "Needs attention" : "All conditions are normal"}
        </p>

        <p style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
          Current readings → pH: {formatMetricValue("ph", readings.ph)}, Moisture:{" "}
          {formatMetricValue("moisture", readings.moisture)}, Temp:{" "}
          {formatMetricValue("temperature", readings.temperature)}
        </p>
      </div>

      <div className="alerts-list">
        <p style={{ marginBottom: "0.5rem" }}>
          <Link to="/alerts/settings" className="forgot-password">
            Manage alert settings
          </Link>
        </p>

        <h2>Recommendations</h2>

        {soilAlerts.length === 0 ? (
          <p className="no-alerts">
            ✅ No alerts right now. Your soil conditions are within safe ranges.
          </p>
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
 */
function SoilAlertItem({ alert }: { alert: SoilAlert }) {
  const level =
    alert.severity === "critical"
      ? "high"
      : alert.severity === "warning"
      ? "medium"
      : "low";

  const metricLabel = getMetricDisplayLabel(alert.metric);
  const metricValue = formatMetricValue(alert.metric, alert.value);

  return (
    <li className={`alert-item soil-alert soil-alert-${level}`}>
      <span className="alert-type">{alert.title}</span>

      <span className="alert-metric">
        {metricLabel}: {metricValue}
      </span>

      {alert.recommendation ? (
        <p className="alert-recommendation">
          💡 {alert.recommendation}
        </p>
      ) : (
        <p className="alert-recommendation">
          💡 Check the research section for recommendations on this value.
        </p>
      )}

      <p style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>
        Source: Article {alert.sourceArticleId} — {alert.sourceArticleTitle}
      </p>
    </li>
  );
}

function getMetricDisplayLabel(metric: SoilMetric): string {
  if (metric === "ec") return "EC (Salinity)";
  return METRIC_LABELS[metric] ?? metric.toUpperCase();
}