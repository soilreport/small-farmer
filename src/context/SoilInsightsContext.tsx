// src/context/SoilInsightsContext.tsx
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
  updateReading: (metric: keyof SoilReadings, value: number) => Promise<void>;
  insights: InsightsResult;
  loading: boolean;
  error: string | null;
}

const SoilInsightsContext = createContext<SoilInsightsContextValue | null>(null);

const DEFAULT_READINGS: SoilReadings = {
  temperature: 24,
  moisture: 53,
  ph: 6.4,
  ec: 0.6,
  nitrogen: 115,
  phosphorus: 45,
  potassium: 210,
};

export function SoilInsightsProvider({ children }: { children: ReactNode }) {
  const [readings, setReadings] = useState<SoilReadings>(DEFAULT_READINGS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Update a single reading.
   * Wrap in try/catch to safely handle future API/sensor errors.
   */
  const updateReading = async (metric: keyof SoilReadings, value: number) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate potential API or sensor call
      await new Promise((resolve) => setTimeout(resolve, 100));

      setReadings((prev) => ({
        ...prev,
        [metric]: value,
      }));
    } catch (err: any) {
      console.error("Failed to update reading:", err);
      setError(err.message || "Failed to update reading");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Compute insights whenever readings change
  const insights = useMemo(() => evaluateInsights(readings, RESEARCH_DATA), [readings]);

  const value = useMemo<SoilInsightsContextValue>(
    () => ({ readings, setReadings, updateReading, insights, loading, error }),
    [readings, insights, loading, error]
  );

  return (
    <SoilInsightsContext.Provider value={value}>
      {children}
    </SoilInsightsContext.Provider>
  );
}

/**
 * Hook to use SoilInsights context
 */
export function useSoilInsights(): SoilInsightsContextValue {
  const context = useContext(SoilInsightsContext);
  if (!context) throw new Error("useSoilInsights must be used inside SoilInsightsProvider");
  return context;
}