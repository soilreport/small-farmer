// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SoilInsightsProvider } from "./context/SoilInsightsContext";
import { DeviceProvider } from "./context/DeviceContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <SoilInsightsProvider>
          <ThemeProvider>
            <DeviceProvider>
              <App />
            </DeviceProvider>
          </ThemeProvider>
        </SoilInsightsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);