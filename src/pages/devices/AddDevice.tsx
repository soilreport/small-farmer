import { useNavigate } from "react-router-dom";
import type { Device } from "../../hooks/useDevices";
import DeviceForm from "../../components/features/devices/DeviceForm";
import { getStoredDevices, setStoredDevices } from "../../stores/deviceStore";
import "./Devices.css";

export default function AddDevice() {
  const navigate = useNavigate();

  const handleSubmit = (device: Device) => {
    setStoredDevices([...getStoredDevices(), device]);
    navigate("/devices");
  };

  return (
    <div className="devices-container">
      <h1>Add device</h1>
      <p>Register a new sensor or device.</p>
      <DeviceForm onSubmit={handleSubmit} onCancel={() => navigate("/devices")} />
    </div>
  );
}
