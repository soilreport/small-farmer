// src/utils/helpers.ts

import type { SoilMetric } from "../pages/research/researchData";
import { ALERT_SEVERITY_ORDER, METRIC_LABELS, METRIC_UNITS } from "./constants";

/**
 * Returns true if value is null,undefined,or an empty string
 */
export function isEmpty(value: unknown): boolean {
  return value == null || (typeof value === "string" && value.trim() === "");
}

/**
 * Returns true if value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

/**
 * Remove duplicate strings while preserving order
 */
export function uniqueStrings(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Generic unique-by helper for arrays of objects
 */
export function uniqueBy<T>(items: T[], getKey: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Sort alerts by severity, highest first.
 */
export function sortBySeverity<T extends { severity: "info" | "warning" | "critical" }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) => ALERT_SEVERITY_ORDER[b.severity] - ALERT_SEVERITY_ORDER[a.severity]
  );
}

/**
 * Capitalize first letter of a string.
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert metric key to readable label.
 */
export function getMetricLabel(metric: SoilMetric): string {
  return METRIC_LABELS[metric] ?? capitalize(metric);
}

/**
 * Get metric unit from constants.
 */
export function getMetricUnit(metric: SoilMetric): string {
  return METRIC_UNITS[metric] ?? "";
}

/**
 * Build a display value like "25 °C" or "6.8".
 */
export function withUnit(value: number, metric: SoilMetric): string {
  const unit = getMetricUnit(metric);
  return unit ? `${value} ${unit}` : `${value}`;
}

/**
 * Safe string match helper
 */
export function includesText(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}