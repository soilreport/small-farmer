// Active Alerts page
import "./Alerts.css";

const activeAlertsCount = 2;

const alertsList = [
  { id: 1, type: "Low nitrogen", location: "Field A", time: "2 hours ago", severity: "warning" },
  { id: 2, type: "Moisture below threshold", location: "Field B", time: "5 hours ago", severity: "info" },
];

export default function Alerts() {
  return (
    <div className="alerts-container">
      <h1>Active Alerts</h1>
      <p>Alerts that need your attention.</p>

      <div className="alerts-summary-card">
        <h3>⚠️ Active Alerts</h3>
        <p className="value">{activeAlertsCount}</p>
        <p className="status">Needs Attention</p>
      </div>

      <div className="alerts-list">
        <h2>Alert details</h2>
        <ul>
          {alertsList.map((alert) => (
            <li key={alert.id} className={`alert-item ${alert.severity}`}>
              <span className="alert-type">{alert.type}</span>
              <span className="alert-location">{alert.location}</span>
              <span className="alert-time">{alert.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
