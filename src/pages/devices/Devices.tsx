// src/pages/devices/Devices.tsx
import "./Devices.css";
import { useDevices, type Device } from "../../hooks/useDevices";

const initialDevices: Device[] = [
  {
    id: "1",
    name: "Sensor Field A",
    type: "Soil Sensor",
    status: "online",
    battery: 85,
    lastSeen: "2 min ago",
    location: "Field A",
  },
  {
    id: "2",
    name: "Sensor Field B",
    type: "Soil Sensor",
    status: "online",
    battery: 72,
    lastSeen: "5 min ago",
    location: "Field B",
  },
  {
    id: "3",
    name: "Sensor Field C",
    type: "Soil Sensor",
    status: "online",
    battery: 90,
    lastSeen: "1 min ago",
    location: "Field C",
  },
  {
    id: "4",
    name: "Sensor Field D",
    type: "Soil Sensor",
    status: "online",
    battery: 68,
    lastSeen: "3 min ago",
    location: "Field D",
  },
];

export default function Devices() {
  const {
    devices,
    onlineCount,
    offlineCount,
    maintenanceCount,
  } = useDevices({
    initialDevices,
  });

  const allOnline = devices.length > 0 && onlineCount === devices.length;

  return (
    <div className="devices-container">
      <h1>My Devices</h1>
      <p>Device status, battery, connectivity, and last sync.</p>

      <div className="devices-summary-card">
        <h3>📡 Devices</h3>
        <p className="value">{devices.length}</p>
        <p className="status">
          {allOnline
            ? "All Online"
            : `${onlineCount} Online • ${offlineCount} Offline • ${maintenanceCount} Maintenance`}
        </p>
      </div>

      <div className="devices-list-section">
        <h2>Device List</h2>

        {devices.length === 0 ? (
          <p>No devices found.</p>
        ) : (
          <ul className="devices-list">
            {devices.map((device) => (
              <li key={device.id} className="device-item">
                <div className="device-name">{device.name}</div>
                <div className="device-meta">
                  <span className="device-status">{formatStatus(device.status)}</span>
                  <span>
                    Battery: {device.battery != null ? `${device.battery}%` : "No data"}
                  </span>
                  <span>Last sync: {device.lastSeen ?? "No data"}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function formatStatus(status: Device["status"]): string {
  switch (status) {
    case "online":
      return "Online";
    case "offline":
      return "Offline";
    case "maintenance":
      return "Maintenance";
    default:
      return status;
  }
}