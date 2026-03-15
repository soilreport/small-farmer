// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Devices from "./pages/devices/Devices";
import AddDevice from "./pages/devices/AddDevice";
import DeviceDetails from "./pages/devices/DeviceDetails";
import DeviceGroups from "./pages/devices/DeviceGroups";
import Readings from "./pages/readings/Readings";
import Alerts from "./pages/alerts/Alerts";
import AlertSettings from "./pages/alerts/AlertSettings";
import Research from "./pages/research/Research";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";
import Export from "./pages/Export";
import Purchases from "./pages/Purchases";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import FarmerTools from "./pages/tools/FarmerTools";
import Resources from "./pages/info/Resources";
import CropRegionPage from "./pages/dynamic/CropRegionPage";
import Users from "./pages/admin/Users";
import System from "./pages/admin/System";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/devices/add" element={<AddDevice />} />
        <Route path="/devices/groups" element={<DeviceGroups />} />
        <Route path="/devices/:id" element={<DeviceDetails />} />
        <Route path="/readings" element={<Readings />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/alerts/settings" element={<AlertSettings />} />
        <Route path="/research" element={<Research />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/export" element={<Export />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/tools" element={<FarmerTools />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/crops/:cropId" element={<CropRegionPage />} />
        <Route path="/regions/:regionId" element={<CropRegionPage />} />
        <Route path="/regions/:regionId/crops/:cropId" element={<CropRegionPage />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="system" element={<System />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;