// src/components/layout/Navbar/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react"; //changed-for mobile menu toggle
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false); //changed-mobile menu state

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // changed- if not logged in, dontt show navbar links/buttons
  //(ProtectedRoute already ensures navbar only appears when logged in,
  //but this makes it extra safe + prevents edge cases)
  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="brand">🌱 Soil Tool</h2>

        {/*changed-hamburger button for mobile */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* changed -responsive menu (collapses on mobile) */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <span className="welcome">
          Welcome, {user.fullName} ({user.role})
        </span>

        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>

        <Link to="/devices" onClick={() => setMenuOpen(false)}>
          Devices
        </Link>

        <Link to="/readings" onClick={() => setMenuOpen(false)}>
          Readings
        </Link>

        <Link to="/alerts" onClick={() => setMenuOpen(false)}>
          Alerts
        </Link>

        {/* NEW - Profile page link */}
        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        {/* NEW - Settings page link */}
        <Link to="/settings" onClick={() => setMenuOpen(false)}>
          Settings
        </Link>

        {user.role === "researcher" && (
          <Link to="/research" onClick={() => setMenuOpen(false)}>
            Research
          </Link>
        )}

        {/*changed-logout button only when user exists (it does) */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
