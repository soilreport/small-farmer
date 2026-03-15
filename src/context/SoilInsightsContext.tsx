// src/context/SoilInsightsContext.tsx

/**
 * This context stores:
 * - latest sensor readings (single source of truth)
 * - computed alerts + recommendations from research rules
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { RESEARCH_DATA } from "../pages/research/researchData";
import {
  evaluateInsights,
  type InsightsResult,
  type SoilReadings,
} from "../utils/evaluateInsights";

interface SoilInsightsContextValue {
  readings: SoilReadings;
  setReadings: Dispatch<SetStateAction<SoilReadings>>;
  insights: InsightsResult;
}

const SoilInsightsContext = createContext<SoilInsightsContextValue | null>(null);

const DEFAULT_READINGS: SoilReadings = {
  temperature: 24,
  moisture: 53,
  ph: 6.4,
  ec: 0.6,

  // NPK shown in UI (not compared with rules yet)
  nitrogen: 115,
  phosphorus: 45,
  potassium: 210,
};

export function SoilInsightsProvider({ children }: { children: ReactNode }) {
  const [readings, setReadings] = useState<SoilReadings>(DEFAULT_READINGS);

  /**
   * Recompute insights whenever readings change
   */
  const insights = useMemo(() => {
    return evaluateInsights(readings, RESEARCH_DATA);
  }, [readings]);

  const value = useMemo<SoilInsightsContextValue>(
    () => ({
      readings,
      setReadings,
      insights,
    }),
    [readings, insights]
  );

  return (
    <SoilInsightsContext.Provider value={value}>
      {children}
    </SoilInsightsContext.Provider>
  );
}

/**
 * Hook for easier usage in components
 */
export function useSoilInsights(): SoilInsightsContextValue {
  const context = useContext(SoilInsightsContext);

  if (!context) {
    throw new Error("useSoilInsights must be used inside SoilInsightsProvider");
  }

  return context;
}