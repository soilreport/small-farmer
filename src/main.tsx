// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SoilInsightsProvider } from "./context/SoilInsightsContext";
import { DeviceProvider } from "./context/DeviceContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    { /* BrowserRouter enables routing in the app, with a basename for GitHub Pages deployment */}
    <BrowserRouter basename="/small-farmer">
      { /* Context Providers wrap the entire app to provide global state */}
      <SoilInsightsProvider>
        <ThemeProvider> 
          <DeviceProvider>
        <App />
          </DeviceProvider> 
        </ThemeProvider>
      </SoilInsightsProvider>
    </BrowserRouter>
  </React.StrictMode>
);