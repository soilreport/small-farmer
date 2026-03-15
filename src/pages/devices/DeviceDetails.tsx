import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/common1/Button/Button";
import { getStoredDevices } from "../../stores/deviceStore";
import "./Devices.css";

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const device = id ? getStoredDevices().find((d) => d.id === id) : undefined;

  if (!device) {
    return (
      <div className="devices-container">
        <h1>Device not found</h1>
        <p>This device may have been removed.</p>
        <Button variant="secondary" onClick={() => navigate("/devices")}>
          Back to devices
        </Button>
      </div>
    );
  }

  return (
    <div className="devices-container">
      <h1>{device.name}</h1>
      <p className="device-details-meta">
        {device.type} · {device.status}
        {device.location && ` · ${device.location}`}
      </p>
      <div className="device-details-card">
        <p><strong>Status:</strong> {device.status}</p>
        {device.battery != null && <p><strong>Battery:</strong> {device.battery}%</p>}
        {device.lastSeen && <p><strong>Last seen:</strong> {device.lastSeen}</p>}
      </div>
      <Button variant="secondary" onClick={() => navigate("/devices")}>
        Back to devices
      </Button>
    </div>
  );
}
