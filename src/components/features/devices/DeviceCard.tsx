import type { Device } from "../../../hooks/useDevices";
import "../../../styles/animations.css";

interface DeviceCardProps {
  device: Device;
  onView?: (id: string) => void;
}

export default function DeviceCard({ device, onView }: DeviceCardProps) {
  const statusClass =
    device.status === "online"
      ? "device-card--online"
      : device.status === "offline"
        ? "device-card--offline"
        : "device-card--maintenance";

  return (
    <div
      className={`device-card fade-in-up ${statusClass}`}
      role={onView ? "button" : undefined}
      onClick={() => onView?.(device.id)}
      onKeyDown={(e) => onView && e.key === "Enter" && onView(device.id)}
      tabIndex={onView ? 0 : undefined}
    >
      <div className="device-card__header">
        <span className="device-card__name">{device.name}</span>
        <span className="device-card__status">{device.status}</span>
      </div>
      <div className="device-card__type">{device.type}</div>
      {device.location && (
        <div className="device-card__location">📍 {device.location}</div>
      )}
      <div className="device-card__meta">
        {device.battery != null && (
          <span>Battery: {device.battery}%</span>
        )}
        {device.lastSeen && <span>Last seen: {device.lastSeen}</span>}
      </div>
    </div>
  );
}
