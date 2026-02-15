// src/pages/profile/Profile.tsx
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Profile.css"; // added- page styling

export default function Profile() {
  const { user } = useAuth();

  //added-basic safety fallback (shouldnt happen because of ProtectedRoute)
  if (!user) {
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        <p>Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <p className="profile-subtitle">Your account details</p>
      </div>

      <div className="profile-card">
        <div className="profile-row">
          <span className="label">Full Name</span>
          <span className="value">{user.fullName}</span>
        </div>

        <div className="profile-row">
          <span className="label">Email</span>
          <span className="value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="label">Role</span>
          <span className={`badge ${user.role}`}>{user.role}</span>
        </div>
      </div>

      <div className="profile-actions">
        {/* added- easy navigation to Settings */}
        <Link className="profile-btn" to="/settings">
          Open Settings
        </Link>
      </div>
    </div>
  );
}
