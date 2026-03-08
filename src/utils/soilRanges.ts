// src/utils/soilRanges.ts

/**
 * Normal ranges for core soil metrics and helper functions
 * for alerts, recommendations, and UI status.
 */

export const SOIL_RANGES = {
  temperature: { min: 15, max: 30, unit: "°C" },
  moisture: { min: 40, max: 70, unit: "%" },
  ph: { min: 6.0, max: 7.0, unit: "" },
} as const;

export interface SoilReading {
  time: string;
  temperature: number;
  moisture: number;
  ph: number;
}

export type SoilRangeMetric = keyof typeof SOIL_RANGES;
export type AlertLevel = "warning" | "danger" | "ok";

export interface SoilAlert {
  metric: SoilRangeMetric;
  level: AlertLevel;
  message: string;
  recommendation: string;
  value: number;
}

interface CheckResult {
  level: AlertLevel;
  message: string;
  recommendation: string;
}

function checkTemperature(value: number): CheckResult {
  if (value < 10) {
    return {
      level: "danger",
      message: "Temperature too low",
      recommendation:
        "Protect plants from frost; consider row covers or moving pots indoors.",
    };
  }

  if (value < SOIL_RANGES.temperature.min) {
    return {
      level: "warning",
      message: "Temperature below optimal",
      recommendation:
        "Growth may be slow. Consider warming the soil or waiting for warmer weather.",
    };
  }

  if (value > 35) {
    return {
      level: "danger",
      message: "Temperature too high",
      recommendation:
        "Provide shade and increase watering to reduce heat stress.",
    };
  }

  if (value > SOIL_RANGES.temperature.max) {
    return {
      level: "warning",
      message: "Temperature above optimal",
      recommendation:
        "Mulch to keep soil cooler and water in the early morning.",
    };
  }

  return {
    level: "ok",
    message: "Normal",
    recommendation: "No action needed.",
  };
}

function checkMoisture(value: number): CheckResult {
  if (value < 20) {
    return {
      level: "danger",
      message: "Soil very dry",
      recommendation:
        "Water soon. Consider drip irrigation for even moisture.",
    };
  }

  if (value < SOIL_RANGES.moisture.min) {
    return {
      level: "warning",
      message: "Moisture below optimal",
      recommendation:
        "Water when possible. Avoid midday to reduce evaporation.",
    };
  }

  if (value > 90) {
    return {
      level: "danger",
      message: "Soil waterlogged",
      recommendation:
        "Improve drainage; reduce watering and check for blocked drains.",
    };
  }

  if (value > SOIL_RANGES.moisture.max) {
    return {
      level: "warning",
      message: "Moisture above optimal",
      recommendation:
        "Hold off watering; allow soil to dry slightly to avoid root rot.",
    };
  }

  return {
    level: "ok",
    message: "Normal",
    recommendation: "No action needed.",
  };
}

function checkPh(value: number): CheckResult {
  if (value < 4.5) {
    return {
      level: "danger",
      message: "pH very acidic",
      recommendation:
        "Add lime or wood ash in small amounts and retest after a few weeks.",
    };
  }

  if (value < SOIL_RANGES.ph.min) {
    return {
      level: "warning",
      message: "pH slightly acidic",
      recommendation:
        "Add garden lime or dolomite to raise pH gradually.",
    };
  }

  if (value > 8.5) {
    return {
      level: "danger",
      message: "pH very alkaline",
      recommendation:
        "Add sulfur or peat moss; use acid-loving plant mixes if in containers.",
    };
  }

  if (value > SOIL_RANGES.ph.max) {
    return {
      level: "warning",
      message: "pH slightly alkaline",
      recommendation:
        "Add elemental sulfur or compost to lower pH over time.",
    };
  }

  return {
    level: "ok",
    message: "Normal",
    recommendation: "No action needed.",
  };
}

export function getAlertsForReading(reading: SoilReading): SoilAlert[] {
  const alerts: SoilAlert[] = [];

  const temperature = checkTemperature(reading.temperature);
  const moisture = checkMoisture(reading.moisture);
  const ph = checkPh(reading.ph);

  if (temperature.level !== "ok") {
    alerts.push({
      metric: "temperature",
      value: reading.temperature,
      ...temperature,
    });
  }

  if (moisture.level !== "ok") {
    alerts.push({
      metric: "moisture",
      value: reading.moisture,
      ...moisture,
    });
  }

  if (ph.level !== "ok") {
    alerts.push({
      metric: "ph",
      value: reading.ph,
      ...ph,
    });
  }

  return alerts;
}

export function getStatusForReading(reading: SoilReading): {
  temperature: { level: AlertLevel; message: string };
  moisture: { level: AlertLevel; message: string };
  ph: { level: AlertLevel; message: string };
} {
  const temperature = checkTemperature(reading.temperature);
  const moisture = checkMoisture(reading.moisture);
  const ph = checkPh(reading.ph);

  return {
    temperature: {
      level: temperature.level,
      message: temperature.message,
    },
    moisture: {
      level: moisture.level,
      message: moisture.message,
    },
    ph: {
      level: ph.level,
      message: ph.message,
    },
  };
}