import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <h1>About Small Farmer</h1>
      <p>
        Small Farmer is a platform designed to help Azerbaijani farmers and researchers
        monitor soil health and make data-driven decisions.
      </p>
      <p>
        You can track temperature, moisture, pH, EC, and nutrient levels in your soil,
        receive alerts, and explore research-based insights to improve crop yield.
      </p>
      <p>
        The system is easy to use, providing a dashboard with connected devices, readings,
        alerts, and research recommendations.
      </p>

      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  );
}