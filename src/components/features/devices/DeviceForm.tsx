import { useState } from "react";
import type { Device } from "../../../hooks/useDevices";
import Input from "../../common1/Input/Input";
import Button from "../../common1/Button/Button";

interface DeviceFormProps {
  initial?: Partial<Device>;
  onSubmit: (device: Device) => void;
  onCancel?: () => void;
}

const defaultDevice: Device = {
  id: "",
  name: "",
  type: "Soil Sensor",
  status: "online",
  location: "",
  battery: 100,
  lastSeen: "Just now",
};

export default function DeviceForm({
  initial,
  onSubmit,
  onCancel,
}: DeviceFormProps) {
  const [form, setForm] = useState<Device>(() => ({
    ...defaultDevice,
    ...initial,
    id: initial?.id || "dev-" + Date.now(),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({ ...form, name: form.name.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="device-form">
      <Input
        label="Device name"
        value={form.name}
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        placeholder="e.g. Sensor Field A"
        required
      />
      <div className="input-group">
        <label>Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
        >
          <option value="Soil Sensor">Soil Sensor</option>
          <option value="Weather Station">Weather Station</option>
          <option value="Irrigation">Irrigation</option>
        </select>
      </div>
      <Input
        label="Location (optional)"
        value={form.location || ""}
        onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
        placeholder="e.g. Field A"
      />
      <div className="input-group">
        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              status: e.target.value as Device["status"],
            }))
          }
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      <div className="device-form__actions">
        <Button type="submit" variant="primary">
          {initial?.id ? "Update device" : "Add device"}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
