import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🌱 Soil Tool</h2>

      <div className="nav-links">
        <Link to="/home">Dashboard</Link>
        <Link to="/login">Logout</Link>
      </div>
    </nav>
  );
}