// src/pages/auth/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setApiError("Login failed. Please check your credentials.");
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    
    if (apiError) {
      setApiError("");
    }
  };

  const handleDemoLogin = async (role: 'farmer' | 'researcher') => {
    setLoading(true);
    setApiError("");
    
    const demoCredentials = {
      farmer: { email: "farmer@soil.com", password: "demo123" },
      researcher: { email: "research@soil.com", password: "demo123" }
    };
    
    try {
      await login(demoCredentials[role].email, demoCredentials[role].password);
      navigate("/dashboard");
    } catch (error) {
      setApiError("Demo login failed. Please try again.");
      console.error("Demo login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h1>🌱 Soil Monitoring Platform</h1>
          <p className="auth-subtitle">Login to your agricultural dashboard</p>
        </div>

        {apiError && (
          <div className="api-error">
            <span className="error-icon">⚠️</span>
            {apiError}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
            disabled={loading}
            autoComplete="email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group">
          <div className="password-label-row">
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
            disabled={loading}
            autoComplete="current-password"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? (
            <span className="loading-spinner">
              <span className="spinner"></span> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        <div className="demo-login-section">
          <p className="demo-label">Quick Demo:</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="demo-button farmer"
              onClick={() => handleDemoLogin('farmer')}
              disabled={loading}
            >
              Login as Farmer
            </button>
            <button 
              type="button" 
              className="demo-button researcher"
              onClick={() => handleDemoLogin('researcher')}
              disabled={loading}
            >
              Login as Researcher
            </button>
          </div>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one here
            </Link>
          </p>
          
          <div className="context-info">
            <small>
              This platform is designed for Azerbaijani farmers and researchers to monitor soil health.
            </small>
          </div>
        </div>
      </form>
    </div>
  );
}