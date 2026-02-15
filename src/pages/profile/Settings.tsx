// src/pages/profile/Settings.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css"; // added-reuse same css to stay consistent

export default function Settings() {
  const { user } = useAuth();

  // added -simple local settings (frontend only for now)
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [emailAlerts, setEmailAlerts] = useState(true);

  if (!user) {
    return (
      <div className="profile-container">
        <h1>Settings</h1>
        <p>Loading settings...</p>
      </div>
    );
  }

  const handleSave = () => {
    // added- later this becomes api call
    alert("Settings saved (demo).");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>⚙️ Settings</h1>
        <p className="profile-subtitle">Personal preferences (demo)</p>
      </div>

      <div className="profile-card">
        <div className="profile-row">
          <span className="label">User</span>
          <span className="value">{user.fullName}</span>
        </div>

        <div className="settings-row">
          <label className="label" htmlFor="units">
            Units
          </label>
          <select
            id="units"
            value={units}
            onChange={(e) => setUnits(e.target.value as "metric" | "imperial")}
            className="select"
          >
            <option value="metric">Metric (°C, %)</option>
            <option value="imperial">Imperial (°F)</option>
          </select>
        </div>

        <div className="settings-row checkbox-row">
          <label className="label" htmlFor="alerts">
            Email Alerts
          </label>
          <input
            id="alerts"
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
