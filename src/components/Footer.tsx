import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();

  // Hide footer completely on auth pages
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  if (hideFooter) return null;

  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© 2026 Small Farmer</span>
        {location.pathname !== "/about" && (
          <Link to="/about" className="footer-link">
            About
          </Link>
        )}
      </div>
    </footer>
  );
}