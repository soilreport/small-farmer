import { useDevices } from "../../hooks/useDevices";
import "./Devices.css";

const defaultDevices: import("../../hooks/useDevices").Device[] = [
  { id: "1", name: "Field A", type: "Soil Sensor", status: "online", location: "Field A" },
  { id: "2", name: "Field B", type: "Soil Sensor", status: "online", location: "Field B" },
];

export default function DeviceGroups() {
  const { devices } = useDevices({ initialDevices: defaultDevices });

  const byLocation = devices.reduce<Record<string, import("../../hooks/useDevices").Device[]>>(
    (acc, d) => {
      const loc = d.location || "Unassigned";
      if (!acc[loc]) acc[loc] = [];
      acc[loc].push(d);
      return acc;
    },
    {}
  );

  return (
    <div className="devices-container">
      <h1>Device groups</h1>
      <p>Devices grouped by location.</p>
      <div className="device-groups">
        {Object.entries(byLocation).map(([location, list]) => (
          <div key={location} className="device-group-card">
            <h3>📍 {location}</h3>
            <ul>
              {list.map((d) => (
                <li key={d.id}>{d.name} ({d.status})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
