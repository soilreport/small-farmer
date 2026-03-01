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

  // changed- if not logged in, dont show navbar
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
        
        {/* user greeting */}
        <span className="welcome">
          Welcome, {user.fullName} ({user.role})
        </span>

        {/* ONLY keep profile & settings in new design */}

        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        <Link to="/settings" onClick={() => setMenuOpen(false)}>
          Settings
        </Link>

        {/*changed-logout button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}