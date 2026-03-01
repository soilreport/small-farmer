// src/context/SoilInsightsContext.tsx
/**
 *this context stores:
 * latest sensor readings (single source of truth)
 * computed alerts + recommendations from research rules
 *
 * Any page can use this:
 * - Readings page updates readings
 * - Alerts page reads computed alerts
 * - Research page reads per-article alerts/recommendations
 */

import React, { createContext, useContext, useMemo, useState } from "react";
import { RESEARCH_DATA } from "../pages/research/researchData";
import {
  evaluateInsights,
  type InsightsResult,
  type SoilReadings,
} from "../utils/evaluateInsights";

interface SoilInsightsContextValue {
  readings: SoilReadings;
  setReadings: React.Dispatch<React.SetStateAction<SoilReadings>>;
  insights: InsightsResult;
}

const SoilInsightsContext = createContext<SoilInsightsContextValue | null>(null);

export function SoilInsightsProvider({ children }: { children: React.ReactNode }) {
  //default readings (mock data)
  
  const [readings, setReadings] = useState<SoilReadings>({
    temperature: 24,
    moisture: 53,
    ph: 6.4,
    ec: 0.6, // optional (salinity)

    // NPK shown in UI (not compared with rules yet)
    nitrogen: 115,
    phosphorus: 45,
    potassium: 210,
  });

  /**
   * recompute insights each time readings change
   */
  const insights = useMemo(() => {
    return evaluateInsights(readings, RESEARCH_DATA);
  }, [readings]);

  const value: SoilInsightsContextValue = {
    readings,
    setReadings,
    insights,
  };

  return (
    <SoilInsightsContext.Provider value={value}>
      {children}
    </SoilInsightsContext.Provider>
  );
}

/**
 * hook for easier usage in components
 */
export function useSoilInsights() {
  const ctx = useContext(SoilInsightsContext);
  if (!ctx) {
    throw new Error("useSoilInsights must be used inside SoilInsightsProvider");
  }
  return ctx;
}