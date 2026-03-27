import type { SoilReadings } from "./evaluateInsights";

/**
 * Flattens nested API shapes (data, payload, readings, result) into one object.
 */
function flattenPayload(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object") return {};
  const o = data as Record<string, unknown>;
  const out: Record<string, unknown> = { ...o };
  for (const key of ["data", "readings", "payload", "result", "sensor", "device"]) {
    const inner = o[key];
    if (inner && typeof inner === "object" && !Array.isArray(inner)) {
      Object.assign(out, flattenPayload(inner));
    }
  }
  return out;
}

function pickNumber(obj: Record<string, unknown>, keys: string[]): number | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    if (typeof v === "string" && v.trim() !== "") {
      const n = Number(v);
      if (!Number.isNaN(n)) return n;
    }
  }
  return undefined;
}

/**
 * Maps backend JSON to partial SoilReadings. Adjust keys if your API uses different names.
 */
export function mapDevicePayloadToReadings(data: unknown): Partial<SoilReadings> {
  const flat = flattenPayload(data);
  return {
    temperature: pickNumber(flat, [
      "temperature",
      "temp",
      "airTemperature",
      "soilTemperature",
      "t",
    ]),
    moisture: pickNumber(flat, [
      "moisture",
      "humidity",
      "soilMoisture",
      "water",
      "soilHumidity",
      "m",
    ]),
    ph: pickNumber(flat, ["ph", "soilPh", "pH", "soil_ph"]),
    ec: pickNumber(flat, ["ec", "ecValue", "salinity", "conductivity"]),
    nitrogen: pickNumber(flat, ["nitrogen", "n", "N", "nitrate"]),
    phosphorus: pickNumber(flat, ["phosphorus", "p", "P"]),
    potassium: pickNumber(flat, ["potassium", "k", "K"]),
  };
}
