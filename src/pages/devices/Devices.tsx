// Devices page: device count summary + device list
import "./Devices.css";

const devicesCount = 4;
const devicesList = [
  { id: 1, name: "Sensor Field A", status: "Online", battery: "85%", lastSync: "2 min ago" },
  { id: 2, name: "Sensor Field B", status: "Online", battery: "72%", lastSync: "5 min ago" },
  { id: 3, name: "Sensor Field C", status: "Online", battery: "90%", lastSync: "1 min ago" },
  { id: 4, name: "Sensor Field D", status: "Online", battery: "68%", lastSync: "3 min ago" },
];

export default function Devices() {
  return (
    <div className="devices-container">
      <h1>My Devices</h1>
      <p>Device status, battery, connectivity, and last sync.</p>

      <div className="devices-summary-card">
        <h3>📡 Devices</h3>
        <p className="value">{devicesCount}</p>
        <p className="status">All Online</p>
      </div>

      <div className="devices-list-section">
        <h2>Device List</h2>
        <ul className="devices-list">
          {devicesList.map((device) => (
            <li key={device.id} className="device-item">
              <div className="device-name">{device.name}</div>
              <div className="device-meta">
                <span className="device-status">{device.status}</span>
                <span>Battery: {device.battery}</span>
                <span>Last sync: {device.lastSync}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
