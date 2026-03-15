import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import "./Admin.css";

const MOCK_USERS = [
  { id: "1", email: "farmer@example.com", fullName: "Demo Farmer", role: "farmer" as const },
  { id: "2", email: "research@example.com", fullName: "Demo Researcher", role: "researcher" as const },
];

export default function Users() {
  const { user } = useAuth();

  return (
    <div className="admin-page">
      <h1>Users</h1>
      <p>Manage user accounts. (Admin: {user?.email})</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
        {MOCK_USERS.map((u) => (
          <Card key={u.id} title={u.fullName}>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>{u.email} · {u.role}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
