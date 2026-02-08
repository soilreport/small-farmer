import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; 
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🌱 Soil Tool</h2>

      <div className="nav-links">
        {user && (
          <>
            <span style={{ marginRight: '1rem' }}>
              Welcome, {user.fullName} ({user.role})
            </span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/devices">Devices</Link>
            <Link to="/readings">Readings</Link>
            {user.role === 'researcher' && (
              <Link to="/research">Research</Link>
            )}
          </>
        )}
        <button 
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}