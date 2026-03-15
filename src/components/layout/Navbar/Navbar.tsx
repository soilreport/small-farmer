// src/components/layout/Navbar/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";
import Button from "../../common1/Button/Button";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

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

        {/* main navigation links */}

        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>

        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        <Link to="/settings" onClick={() => setMenuOpen(false)}>
          Settings
        </Link>

        <Link to="/export" onClick={() => setMenuOpen(false)}>Export</Link>
        <Link to="/purchases" onClick={() => setMenuOpen(false)}>Purchases</Link>

        {user.role === "admin" && (
          <>
            <Link to="/admin/users" onClick={() => setMenuOpen(false)}>Users</Link>
            <Link to="/admin/system" onClick={() => setMenuOpen(false)}>System</Link>
          </>
        )}

        <Button
          variant="ghost"
          onClick={() => {
            toggleTheme();
            setMenuOpen(false);
          }}
        >
          {theme === "light" ? "Dark" : "Light"}
        </Button>

        {/*changed-logout button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}