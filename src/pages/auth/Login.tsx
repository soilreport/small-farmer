// src/pages/auth/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateRequired } from "../../utils/validators";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    const email = formData.email.trim();
    const password = formData.password;

    const emailRequired = validateRequired(email, "Email");
    if (!emailRequired.valid) {
      newErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    const passwordRequired = validateRequired(password, "Password");
    if (!passwordRequired.valid) {
      newErrors.password = "Please enter your password";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await login(formData.email.trim(), formData.password);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);
      const msg =
        error instanceof Error ? error.message : "Login failed. Please try again.";

      if (msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch")) {
        setApiError("Network error. Please check your internet connection.");
      } else {
        // Show Firebase / auth message (wrong password, unknown user, missing API key, etc.)
        setApiError(msg);
      }

      setErrors({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleDemoLogin = async (role: "farmer" | "researcher") => {
    setLoading(true);
    setApiError("");

    const demoCredentials = {
      farmer: {
        email: "farmer@soil.com",
        password: "demo123",
        fullName: "farmer",
        role: "farmer" as const,
      },
      researcher: {
        email: "research@soil.com",
        password: "demo123",
        fullName: "research",
        role: "researcher" as const,
      },
    };

    try {
      const demo = demoCredentials[role];
      await login(demo.email, demo.password, {
        fullName: demo.fullName,
        role: demo.role,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Demo login error:", error);
      setApiError("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h1>🌱 Soil Monitoring Platform</h1>
          <p className="auth-subtitle">
            Log in to view your dashboard and monitor your farm data.
          </p>
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
            className={errors.email || apiError ? "error" : ""}
            disabled={loading}
            autoComplete="email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group">
          <div className="password-label-row">
            <label htmlFor="password">Password</label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password || apiError ? "error" : ""}
            disabled={loading}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
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
              onClick={() => handleDemoLogin("farmer")}
              disabled={loading}
            >
              Login as Farmer
            </button>
            <button
              type="button"
              className="demo-button researcher"
              onClick={() => handleDemoLogin("researcher")}
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
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one here
            </Link>
          </p>

          <div className="context-info">
            <small>
              This system helps farmers and researchers monitor soil conditions
              and make better decisions.
            </small>
          </div>
        </div>
      </form>
    </div>
  );
}