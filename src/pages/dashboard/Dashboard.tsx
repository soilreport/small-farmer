// src/pages/dashboard/Dashboard.tsx
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import heroImg from "../../assets/farm-hero.jpg";
import devicesImg from "../../assets/devices.png";
import readingsImg from "../../assets/readings.png";
import alertsImg from "../../assets/alerts.png";
import researchImg from "../../assets/research.png";
import AnimatedCard from "../../components/AnimatedCard";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Card navigation handler
  const go = (path: string) => navigate(path);

  // Role label for fallback/demo users
  const roleLabel = user?.role === "researcher" ? "researcher" : "farmer";

  // Show role label for demo names like "farmer" / "research"
  // Otherwise show the user's real full name
  const displayName =
    !user?.fullName ||
    user.fullName.trim().toLowerCase() === "farmer" ||
    user.fullName.trim().toLowerCase() === "research"
      ? roleLabel
      : user.fullName.trim();

  return (
    <div className="dashboard-container">
      {/* HERO IMAGE WITH GREETING */}
      <div
        className="dashboard-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay">
          <h1>
            {getGreeting()}, {displayName}!
          </h1>

          <p>
            Monitor your farm, track sensor data, and get alerts in one place.
          </p>
        </div>
      </div>

      {/* NAVIGATION CARDS */}
      <div className="dashboard-cards">
        <AnimatedCard>
          <div
            className="dashboard-card"
            role="button"
            tabIndex={0}
            onClick={() => go("/devices")}
            onKeyDown={(e) => e.key === "Enter" && go("/devices")}
          >
            <img className="card-icon" src={devicesImg} alt="Devices icon" />
            <h3>Devices</h3>
            <p>
              View and manage your connected sensors and devices.
            </p>
          </div>
        </AnimatedCard>

        <div
          className="dashboard-card"
          role="button"
          tabIndex={0}
          onClick={() => go("/readings")}
          onKeyDown={(e) => e.key === "Enter" && go("/readings")}
        >
          <img className="card-icon" src={readingsImg} alt="Readings icon" />
          <h3>Readings</h3>
          <p>
            Check real-time and past data collected from your devices.
          </p>
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
          <p>
            See alerts when sensor values go outside safe limits.
          </p>
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
          <p>
            Explore insights and tips to improve farming decisions.
          </p>
        </div>
      </div>
    </div>
  );
}