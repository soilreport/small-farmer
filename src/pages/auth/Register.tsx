// src/pages/auth/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; //changed- use register from context
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth(); //CHANGED

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "farmer" as const, //canged - align with app roles
  });

  //changed -add basic UX like Login(errors/loading)
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (apiError) setApiError(""); //CHANGED
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      //changed- real register call(stores fullName + role)
      await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      //changed- go to dashboard after successful registration
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

        {/* changed- show an error message box like Login */}
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
            value={form.fullName} //changed- controlled input
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
            value={form.email} //CHANGED
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
            value={form.password} //CHANGED
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
            value={form.role} //CHANGED
            onChange={handleChange}
            disabled={loading}
          >
            {/* changed- use correct role names */}
            <option value="farmer">Farmer</option>
            <option value="researcher">Researcher</option>
          </select>
        </div>

        {/* changed- styled button like Login */}
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
