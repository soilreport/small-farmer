// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SoilInsightsProvider } from "./context/SoilInsightsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* basename must match your repo name for GitHub Pages */}
    <BrowserRouter basename="/small-farmer">
      {/* now all pages can access readings + computed alerts */}
      <SoilInsightsProvider>
        <App />
      </SoilInsightsProvider>
    </BrowserRouter>
  </React.StrictMode>
);