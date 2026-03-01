// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Devices from "./pages/devices/Devices";
import Readings from "./pages/readings/Readings";
import Alerts from "./pages/alerts/Alerts";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

//added-real profile pages
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";

//use real Research page file (instead of placeholder function)
import Research from "./pages/research/Research";

// new pages (added without changing existing ones)
import FarmerTools from "./pages/tools/FarmerTools";
import Resources from "./pages/info/Resources";
import CropRegionPage from "./pages/dynamic/CropRegionPage";

//changed - add a Research page so navbar link doesnt 404
//we now use the real Research page component from /pages/research
// (so we don't need the placeholder function anymore)

// function Research() {
//   return (
//     <div>
//       <h1>Research</h1>
//       <p>Research tools coming soon...</p>
//     </div>
//   );
// }

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
          <Route path="/alerts" element={<Alerts />} />

          {/* ADDED - use real profile page instead of placeholder */}
          <Route path="/profile" element={<Profile />} />

          {/* ADDED - settings page */}
          <Route path="/settings" element={<Settings />} />

          {/* CHANGED */}
          {/* UPDATED: show the real Research page with articles */}
          <Route path="/research" element={<Research />} />

          {/* NEW: farmer tools (weather + yield calculator) */}
          <Route path="/tools" element={<FarmerTools />} />

          {/* NEW: information pages */}
          <Route path="/resources" element={<Resources />} />

          {/* NEW: dynamic crop / region routing examples */}
          <Route path="/crops/:cropId" element={<CropRegionPage />} />
          <Route path="/regions/:regionId" element={<CropRegionPage />} />
          <Route path="/regions/:regionId/crops/:cropId" element={<CropRegionPage />} />
        </Route>

        {/* redirect root to dashboard (ProtectedRoute will send to login if not authed) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;