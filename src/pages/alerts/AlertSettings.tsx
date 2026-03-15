import { useState } from "react";
import Input from "../../components/common1/Input/Input";
import Button from "../../components/common1/Button/Button";
import "./Alerts.css";

const STORAGE_KEY = "sf-alert-settings";

export interface AlertSettingsState {
  emailNotifications: boolean;
  moistureMin: number;
  moistureMax: number;
  tempMin: number;
  tempMax: number;
  phMin: number;
  phMax: number;
}

const defaults: AlertSettingsState = {
  emailNotifications: true,
  moistureMin: 40,
  moistureMax: 70,
  tempMin: 15,
  tempMax: 30,
  phMin: 6,
  phMax: 7,
};

function load(): AlertSettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

function save(s: AlertSettingsState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export default function AlertSettings() {
  const [settings, setSettings] = useState<AlertSettingsState>(load);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof AlertSettingsState>(key: K, value: AlertSettingsState[K]) => {
    setSettings((p) => ({ ...p, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    save(settings);
    setSaved(true);
  };

  return (
    <div className="alert-settings-page" style={{ padding: "1.5rem", maxWidth: 500 }}>
      <h1>Alert settings</h1>
      <p>Configure when you get notified about soil conditions.</p>

      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={(e) => update("emailNotifications", e.target.checked)}
        />
        Email notifications
      </label>

      <Input
        label="Moisture low (%)"
        type="number"
        value={String(settings.moistureMin)}
        onChange={(e) => update("moistureMin", Number(e.target.value) || 0)}
      />
      <Input
        label="Moisture high (%)"
        type="number"
        value={String(settings.moistureMax)}
        onChange={(e) => update("moistureMax", Number(e.target.value) || 0)}
      />
      <Input
        label="Temperature min (°C)"
        type="number"
        value={String(settings.tempMin)}
        onChange={(e) => update("tempMin", Number(e.target.value) || 0)}
      />
      <Input
        label="Temperature max (°C)"
        type="number"
        value={String(settings.tempMax)}
        onChange={(e) => update("tempMax", Number(e.target.value) || 0)}
      />
      <Input
        label="pH min"
        type="number"
        step="0.1"
        value={String(settings.phMin)}
        onChange={(e) => update("phMin", Number(e.target.value) || 0)}
      />
      <Input
        label="pH max"
        type="number"
        step="0.1"
        value={String(settings.phMax)}
        onChange={(e) => update("phMax", Number(e.target.value) || 0)}
      />

      <Button variant="primary" onClick={handleSave}>
        Save settings
      </Button>
      {saved && <p className="alert-settings-saved">Settings saved.</p>}
    </div>
  );
}
