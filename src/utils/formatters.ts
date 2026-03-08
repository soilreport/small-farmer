// src/utils/formatters.ts

import type { SoilMetric } from "../pages/research/researchData";
import { DEFAULT_NO_DATA_TEXT } from "./constants";
import { getMetricLabel, getMetricUnit, isValidNumber } from "./helpers";

/**
 * Format any number with fixed decimal places
 */
export function formatNumber(value: number, digits = 1): string {
  return value.toFixed(digits);
}

/**
 * Format metric values for UI display
 * Example:
 * - temperature -> 24.5 °C
 * - moisture -> 55 %
 * - ph -> 6.8
 * - ec -> 1.2 dS/m
 */
export function formatMetricValue(
  metric: SoilMetric,
  value: number | null | undefined
): string {
  if (!isValidNumber(value)) return DEFAULT_NO_DATA_TEXT;

  const unit = getMetricUnit(metric);

  let digits = 1;
  if (metric === "ph" || metric === "ec") digits = 2;
  if (metric === "moisture" || metric === "temperature") digits = 1;

  const formatted = formatNumber(value, digits);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Format a metric with its label. example: "Temperature: 24.5 °C"
 */
export function formatMetricLabelValue(
  metric: SoilMetric,
  value: number | null | undefined
): string {
  return `${getMetricLabel(metric)}: ${formatMetricValue(metric, value)}`;
}

/**
 * Format percentage safely. example: 0.82 -> 82%
 */
export function formatPercent(value: number | null | undefined, digits = 0): string {
  if (!isValidNumber(value)) return DEFAULT_NO_DATA_TEXT;
  return `${(value * 100).toFixed(digits)}%`;
}

/**
 * Format date/time string from sensor/history data.
 * If parsing fails, return original string.
 */
export function formatDateTime(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : DEFAULT_NO_DATA_TEXT;
  }

  return date.toLocaleString();
}

/**
 * Format date only
 */
export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : DEFAULT_NO_DATA_TEXT;
  }

  return date.toLocaleDateString();
}

/**
 * Format time only
 */
export function formatTime(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : DEFAULT_NO_DATA_TEXT;
  }

  return date.toLocaleTimeString();
}

/**
 * Shorten long text for cards or previews
 */
export function truncateText(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}