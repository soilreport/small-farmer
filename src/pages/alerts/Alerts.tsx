import "./Alerts.css";
import { getAlertsForReading } from "../../utils/soilRanges";
import type { SoilReading, SoilAlert } from "../../utils/soilRanges";

const latestReading: SoilReading = {
  time: "Fri",
  temperature: 24,
  moisture: 32,
  ph: 7.4,
};

export default function Alerts() {
  const soilAlerts = getAlertsForReading(latestReading);
  const activeAlertsCount = soilAlerts.length;

  return (
    <div className="alerts-container">
      <h1>Active Alerts</h1>
      <p>Alerts that need your attention.</p>

      <div className="alerts-summary-card">
        <h3>⚠️ Active Alerts</h3>
        <p className="value">{activeAlertsCount}</p>
        <p className="status">{activeAlertsCount ? "Needs Attention" : "All clear"}</p>
      </div>

      <div className="alerts-list">
        <h2>Recommendations</h2>
        {soilAlerts.length === 0 ? (
          <p className="no-alerts">No soil alerts. All values are in normal range.</p>
        ) : (
          <ul>
            {soilAlerts.map((alert, i) => (
              <SoilAlertItem key={i} alert={alert} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SoilAlertItem({ alert }: { alert: SoilAlert }) {
  const label =
    alert.metric === "temperature"
      ? `Temperature: ${alert.value}°C`
      : alert.metric === "moisture"
        ? `Moisture: ${alert.value}%`
        : `pH: ${alert.value}`;
  return (
    <li className={`alert-item soil-alert soil-alert-${alert.level}`}>
      <span className="alert-type">{alert.message}</span>
      <span className="alert-metric">{label}</span>
      <p className="alert-recommendation">{alert.recommendation}</p>
    </li>
  );
}
