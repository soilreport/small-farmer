// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SoilInsightsProvider } from "./context/SoilInsightsContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Devices from "./pages/devices/Devices";
import Readings from "./pages/readings/Readings";
import Alerts from "./pages/alerts/Alerts";
import Research from "./pages/research/Research";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";

// new pages
import FarmerTools from "./pages/tools/FarmerTools";
import Resources from "./pages/info/Resources";
import CropRegionPage from "./pages/dynamic/CropRegionPage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <SoilInsightsProvider>
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
            <Route path="/research" element={<Research />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* New protected pages */}
            <Route path="/tools" element={<FarmerTools />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/crops/:cropId" element={<CropRegionPage />} />
            <Route path="/regions/:regionId" element={<CropRegionPage />} />
            <Route
              path="/regions/:regionId/crops/:cropId"
              element={<CropRegionPage />}
            />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </SoilInsightsProvider>
    </AuthProvider>
  );
}

export default App;