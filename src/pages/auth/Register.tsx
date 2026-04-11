// src/pages/auth/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateRequired } from "../../utils/validators";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "farmer" as "farmer" | "researcher",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
    };

    let isValid = true;

    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const password = form.password;

    const nameRequired = validateRequired(fullName, "Full name");
    if (!nameRequired.valid) {
      newErrors.fullName = "Please enter your full name";
      isValid = false;
    }

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
      newErrors.password = "Please create a password";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Register error:", err);
      const msg =
        err instanceof Error ? err.message : "Registration failed. Please try again.";

      if (msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch")) {
        setApiError("Network error. Please check your connection.");
      } else {
        setApiError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p className="auth-subtitle">
            Create your account to start monitoring your farm data.
          </p>
        </div>

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
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            disabled={loading}
            autoComplete="name"
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && (
            <span className="error-text">{errors.fullName}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            autoComplete="email"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            autoComplete="new-password"
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="farmer">Farmer</option>
            <option value="researcher">Researcher</option>
          </select>
        </div>

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
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}