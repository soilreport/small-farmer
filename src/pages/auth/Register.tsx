// src/pages/auth/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; //CHANGED
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  //changed  use register from context (and not just navigate)
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "farmer" as const, //changed "user" -> "farmer" to match app roles
  });

  // changed = add UX like Login (loading + error)
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (apiError) setApiError(""); //changed =clear error when typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      //changed; call real register() which stores fullName + role + email
      await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      // changed-after register go to dashboard (ProtectedRoute will allow)
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      setApiError("Registration failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Join the Soil Monitoring Platform</p>
        </div>

        {/*changed -show error box same style as Login */}
        {apiError && (
          <div className="api-error">
            <span className="error-icon">⚠️</span>
            {apiError}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Your full name"
            value={form.fullName} //changed - controlled input
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email} //changed -controlled input
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password (min 6 chars)"
            value={form.password} // changed - controlled input
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role} // changed- controlled select
            onChange={handleChange}
            disabled={loading}
          >
            {/*changed- correct role names */}
            <option value="farmer">Farmer</option>
            <option value="researcher">Researcher</option>
          </select>
        </div>

        {/* changed - styled button like Login */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? (
            <span className="loading-spinner">
              <span className="spinner"></span> Creating account...
            </span>
          ) : (
            "Register"
          )}
        </button>

        <div className="auth-footer">
          <p>
            Already registered?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
