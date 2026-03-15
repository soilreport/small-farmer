import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const RESET_TOKEN_KEY = "sf-reset-token";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }
    // Mock: simulate sending reset link; store a token so ResetPassword can read it
    const mockToken = "mock-reset-" + Date.now();
    sessionStorage.setItem(RESET_TOKEN_KEY, mockToken);
    sessionStorage.setItem("sf-reset-email", trimmed);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Check your email</h1>
            <p className="auth-subtitle">
              We sent a password reset link to <strong>{email.trim()}</strong>.
              For this demo, continue to the reset page to set a new password.
            </p>
          </div>
          <Link to="/reset-password" className="auth-link">
            Go to reset password →
          </Link>
          <Link to="/login" className="auth-link">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Forgot password</h1>
          <p className="auth-subtitle">
            Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button">
            Send reset link
          </button>
        </form>
        <Link to="/login" className="auth-link">
          Back to login
        </Link>
      </div>
    </div>
  );
}
