import type { Device } from "../../../hooks/useDevices";
import DeviceCard from "./DeviceCard";

interface DeviceListProps {
  devices: Device[];
  onViewDevice?: (id: string) => void;
}

export default function DeviceList({ devices, onViewDevice }: DeviceListProps) {
  if (devices.length === 0) {
    return (
      <div className="device-list device-list--empty">
        <p>No devices yet. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="device-list">
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onView={onViewDevice}
        />
      ))}
    </div>
  );
}
