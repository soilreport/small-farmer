import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const RESET_TOKEN_KEY = "sf-reset-token";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = sessionStorage.getItem(RESET_TOKEN_KEY);
    if (!token) {
      setError("Reset link expired or invalid. Please request a new one.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Mock: clear token and redirect
    sessionStorage.removeItem(RESET_TOKEN_KEY);
    sessionStorage.removeItem("sf-reset-email");
    setDone(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  if (done) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Password reset</h1>
            <p className="auth-subtitle">
              Your password has been updated. Redirecting to login…
            </p>
          </div>
          <Link to="/login" className="auth-link">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Set new password</h1>
          <p className="auth-subtitle">
            Enter your new password below.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="password">New password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Same as above"
              autoComplete="new-password"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button">
            Reset password
          </button>
        </form>
        <Link to="/forgot-password" className="auth-link">
          Request new link
        </Link>
        <Link to="/login" className="auth-link">
          Back to login
        </Link>
      </div>
    </div>
  );
}
