// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Devices from "./pages/devices/Devices";
import Readings from "./pages/readings/Readings";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

//changed - add a Research page so navbar link doesnt 404
function Research() {
  return (
    <div>
      <h1>Research</h1>
      <p>Research tools coming soon...</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/readings" element={<Readings />} />
          <Route path="/profile" element={<div>Profile Page</div>} />

          {/* CHANGED */}
          <Route path="/research" element={<Research />} />
        </Route>

        {/* redirect root to dashboard (ProtectedRoute will send to login if not authed) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
