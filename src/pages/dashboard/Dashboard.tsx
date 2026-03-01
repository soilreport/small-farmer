// src/pages/dashboard/Dashboard.tsx
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import heroImg from "../../assets/farm-hero.jpg";
import devicesImg from "../../assets/devices.png";
import readingsImg from "../../assets/readings.png";
import alertsImg from "../../assets/alerts.png";
import researchImg from "../../assets/research.png";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // card navigation handler
  const go = (path: string) => navigate(path);

  const roleLabel = user?.role === "researcher" ? "Researcher" : "Farmer";

  return (
    <div className="dashboard-container">
      {/*  HERO IMAGE WITH GREETING */}
      <div
        className="dashboard-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay">
          <h1>
            {getGreeting()}, {roleLabel}! {user?.fullName ? ` ${user.fullName}!` : ""}
          </h1>

          <p>Welcome to Small Farmer 🌱</p>
        </div>
      </div>

      {/*  NAVIGATION CARDS */}
      <div className="dashboard-cards">
        <div
          className="dashboard-card"
          role="button"
          tabIndex={0}
          onClick={() => go("/devices")}
          onKeyDown={(e) => e.key === "Enter" && go("/devices")}
        >
          <img className="card-icon" src={devicesImg} alt="Devices icon" />
          <h3>Devices</h3>
          <p>Manage and monitor your connected sensors.</p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          tabIndex={0}
          onClick={() => go("/readings")}
          onKeyDown={(e) => e.key === "Enter" && go("/readings")}
        >
          <img className="card-icon" src={readingsImg} alt="Readings icon" />
          <h3>Readings</h3>
          <p>View real-time soil data and history.</p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          tabIndex={0}
          onClick={() => go("/alerts")}
          onKeyDown={(e) => e.key === "Enter" && go("/alerts")}
        >
          <img className="card-icon" src={alertsImg} alt="Alerts icon" />
          <h3>Alerts</h3>
          <p>Check soil warnings and recommendations.</p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          tabIndex={0}
          onClick={() => go("/research")}
          onKeyDown={(e) => e.key === "Enter" && go("/research")}
        >
          <img className="card-icon" src={researchImg} alt="Research icon" />
          <h3>Research</h3>
          <p>Explore scientific soil insights.</p>
        </div>
      </div>
    </div>
  );
}