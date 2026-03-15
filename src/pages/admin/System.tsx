import Card from "../../components/Card";
import "./Admin.css";

export default function System() {
  return (
    <div className="admin-page">
      <h1>System</h1>
      <p>System health and configuration.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        <Card title="API">
          <p style={{ margin: 0, fontSize: "0.9rem" }}>Status: OK</p>
        </Card>
        <Card title="Database">
          <p style={{ margin: 0, fontSize: "0.9rem" }}>Connected</p>
        </Card>
        <Card title="Version">
          <p style={{ margin: 0, fontSize: "0.9rem" }}>1.0.0</p>
        </Card>
      </div>
    </div>
  );
}
