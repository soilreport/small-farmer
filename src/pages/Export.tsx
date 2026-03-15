import { useAuth } from "../context/AuthContext";
import { useSoilInsights } from "../context/SoilInsightsContext";
import Button from "../components/common1/Button/Button";
import { getStoredDevices } from "../stores/deviceStore";
import "./Export.css";

export default function Export() {
  const { user } = useAuth();
  const { readings, insights } = useSoilInsights();
  const devices = getStoredDevices();

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      user: user ? { email: user.email, fullName: user.fullName } : null,
      readings,
      alerts: insights.alerts,
      devices,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `small-farmer-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-page">
      <h1>Export data</h1>
      <p>Download your readings, alerts, and device list as JSON.</p>
      <Button variant="primary" onClick={handleExport}>
        Download export
      </Button>
    </div>
  );
}
