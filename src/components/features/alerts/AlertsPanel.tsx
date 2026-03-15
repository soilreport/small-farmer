import type { SoilAlert } from "../../../utils/evaluateInsights";
import Alert from "./AlertItem";

interface AlertsPanelProps {
  alerts: SoilAlert[];
  title?: string;
}

export default function AlertsPanel({ alerts, title = "Alerts" }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="alerts-panel alerts-panel--empty">
        <h3>{title}</h3>
        <p>No active alerts.</p>
      </div>
    );
  }

  return (
    <div className="alerts-panel">
      <h3>{title}</h3>
      <ul>
        {alerts.map((a) => (
          <li key={a.id}>
            <Alert
              message={a.title}
              type={a.severity === "critical" ? "error" : a.severity === "warning" ? "info" : "info"}
            />
            {a.recommendation && (
              <p className="alerts-panel-recommendation">{a.recommendation}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
