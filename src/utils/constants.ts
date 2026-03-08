// src/utils/constants.ts

import type { SoilMetric } from "../pages/research/researchData";

/**
 * Shared constants used across utils, hooks, and pages
 * Keep reusable labels, units, defaults, and status ordering here
 */

export const APP_NAME = "Smart Soil Monitoring System";

export const DEFAULT_NO_DATA_TEXT = "No data available";
export const DEFAULT_OK_TEXT = "No action needed.";

/**
 * App routes
 */
export const APP_ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  devices: "/devices",
  readings: "/readings",
  alerts: "/alerts",
  research: "/research",
  login: "/login",
} as const;

/**
 * Roles for future auth / access control support
 */
export const USER_ROLES = {
  admin: "admin",
  user: "user",
  guest: "guest",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

/**
 * Labels for soil metrics
 */
export const METRIC_LABELS: Record<SoilMetric, string> = {
  temperature: "Temperature",
  moisture: "Moisture",
  ph: "Soil pH",
  ec: "Electrical Conductivity",
};

/**
 * Units for metrics
 */
export const METRIC_UNITS: Partial<Record<SoilMetric, string>> = {
  temperature: "°C",
  moisture: "%",
  ph: "",
  ec: "dS/m",
};

/**
 * Ordering helps with sorting/prioritizing alerts in UI
 */
export const ALERT_SEVERITY_ORDER = {
  info: 0,
  warning: 1,
  critical: 2,
} as const;

/**
 * For soilRanges.ts legacy/simple alert system
 */
export const ALERT_LEVEL_ORDER = {
  ok: 0,
  warning: 1,
  danger: 2,
} as const;

/**
 * Generic reusable colors/statuses can use these string values
 */
export const STATUS_LABELS = {
  ok: "Normal",
  warning: "Warning",
  danger: "Danger",
  info: "Info",
  critical: "Critical",
} as const;

/**
 * Reading refresh defaults
 * Can be used later inside useReadings hook
 */
export const DEFAULT_READING_POLL_INTERVAL_MS = 5000;
export const DEFAULT_MAX_READING_HISTORY = 50;