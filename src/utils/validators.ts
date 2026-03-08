// src/utils/validators.ts

import type { SoilMetric } from "../pages/research/researchData";
import { SOIL_RANGES } from "./soilRanges";

/**
 * Result returned by validation functions
 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Check if a string is not empty
 */
export function validateRequired(
  value: string | null | undefined,
  fieldName = "This field"
): ValidationResult {
  if (!value || value.trim() === "") {
    return {
      valid: false,
      message: `${fieldName} is required.`,
    };
  }

  return { valid: true };
}

/**
 * Check if a value is a valid number
 */
export function validateNumber(
  value: unknown,
  fieldName = "Value"
): ValidationResult {
  if (value === "" || value == null) {
    return {
      valid: false,
      message: `${fieldName} is required.`,
    };
  }

  const numericValue =
    typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numericValue)) {
    return {
      valid: false,
      message: `${fieldName} must be a valid number.`,
    };
  }

  return { valid: true };
}

/**
 * Check if a numeric value is inside a min/max range
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName = "Value"
): ValidationResult {
  if (value < min || value > max) {
    return {
      valid: false,
      message: `${fieldName} must be between ${min} and ${max}.`,
    };
  }

  return { valid: true };
}

/**
 * Validate pH input using a general scientific range
 */
export function validatePh(value: number): ValidationResult {
  if (value < 0 || value > 14) {
    return {
      valid: false,
      message: "pH must be between 0 and 14.",
    };
  }

  return { valid: true };
}

/**
 * Validate a metric value based on known safe project ranges
 *this is for form/input validation, not alert generation
 */
export function validateSoilMetric(
  metric: SoilMetric,
  value: number
): ValidationResult {
  switch (metric) {
    case "temperature":
      return validateRange(value, -20, 80, "Temperature");

    case "moisture":
      return validateRange(value, 0, 100, "Moisture");

    case "ph":
      return validatePh(value);

    case "ec":
      return validateRange(value, 0, 20, "EC");

    default:
      return { valid: true };
  }
}

/**
 * Validate reading object partially
 */
export function validateReadingInput(reading: {
  temperature?: number;
  moisture?: number;
  ph?: number;
  ec?: number;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (reading.temperature != null) {
    const result = validateSoilMetric("temperature", reading.temperature);
    if (!result.valid && result.message) errors.temperature = result.message;
  }

  if (reading.moisture != null) {
    const result = validateSoilMetric("moisture", reading.moisture);
    if (!result.valid && result.message) errors.moisture = result.message;
  }

  if (reading.ph != null) {
    const result = validateSoilMetric("ph", reading.ph);
    if (!result.valid && result.message) errors.ph = result.message;
  }

  if (reading.ec != null) {
    const result = validateSoilMetric("ec", reading.ec);
    if (!result.valid && result.message) errors.ec = result.message;
  }

  return errors;
}

/**
 * Optional helper:
 * checks whether value is inside the project's normal soil range
 * from soilRanges.ts for core metrics
 */
export function isWithinOptimalRange(
  metric: "temperature" | "moisture" | "ph",
  value: number
): boolean {
  const range = SOIL_RANGES[metric];
  return value >= range.min && value <= range.max;
}