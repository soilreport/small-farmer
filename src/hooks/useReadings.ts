// src/hooks/useReadings.ts

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_MAX_READING_HISTORY, DEFAULT_READING_POLL_INTERVAL_MS } from "../utils/constants";
import { validateReadingInput } from "../utils/validators";

export interface SensorReading {
  time: string;
  temperature: number;
  moisture: number;
  ph: number;
  ec?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
}

interface UseReadingsOptions {
  initialReadings?: SensorReading[];
  pollInterval?: number;
  enablePolling?: boolean;
}

interface UseReadingsResult {
  readings: SensorReading[];
  latestReading: SensorReading | null;
  loading: boolean;
  error: string | null;
  addReading: (reading: SensorReading) => boolean;
  setReadings: React.Dispatch<React.SetStateAction<SensorReading[]>>;
  clearReadings: () => void;
}

/**
 * Hook for managing sensor readings and optional live updates
 * Right now it supports local/mock data cleanly
 * Later can connect fetch/WebSocket/API here
 */
export function useReadings(
  options: UseReadingsOptions = {}
): UseReadingsResult {
  const {
    initialReadings = [],
    pollInterval = DEFAULT_READING_POLL_INTERVAL_MS,
    enablePolling = false,
  } = options;

  const [readings, setReadings] = useState<SensorReading[]>(initialReadings);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const latestReading = useMemo(() => {
    if (readings.length === 0) return null;
    return readings[readings.length - 1];
  }, [readings]);

  const addReading = (reading: SensorReading): boolean => {
    const errors = validateReadingInput({
      temperature: reading.temperature,
      moisture: reading.moisture,
      ph: reading.ph,
      ec: reading.ec,
    });

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return false;
    }

    setError(null);
    setReadings((prev) => {
      const next = [...prev, reading];
      return next.slice(-DEFAULT_MAX_READING_HISTORY);
    });
    return true;
  };

  const clearReadings = () => {
    setReadings([]);
    setError(null);
  };

  useEffect(() => {
    if (!enablePolling) return;

    setLoading(true);

    const interval = setInterval(() => {
      /**
       * Future place for:
       * - fetch from API
       * - fetch from Firebase
       * - read from device endpoint
       * - update readings state
       *
       * For now, polling is enabled structurally but does not fetch real data yet
       */
      setLoading(false);
    }, pollInterval);

    return () => clearInterval(interval);
  }, [enablePolling, pollInterval]);

  return {
    readings,
    latestReading,
    loading,
    error,
    addReading,
    setReadings,
    clearReadings,
  };
}