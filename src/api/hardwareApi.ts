/**
 * Hardware routes from Postman collection "Soil-Report" → hardware folder.
 * Base URL + path only (auth via api.ts Bearer token).
 */
import { api, type ApiResponse } from "./api";

function qs(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/** GET /devices */
export function getDevices(): Promise<ApiResponse<unknown>> {
  return api.get("/devices");
}

/** GET /groups */
export function getGroups(): Promise<ApiResponse<unknown>> {
  return api.get("/groups");
}

/** GET /device — pass deviceId if your API requires it */
export function getDevice(deviceId: string): Promise<ApiResponse<unknown>> {
  return api.get(`/device${qs({ deviceId })}`);
}

/** GET /deviceAnomalies */
export function getDeviceAnomalies(deviceId: string): Promise<ApiResponse<unknown>> {
  return api.get(`/deviceAnomalies${qs({ deviceId })}`);
}

/** GET /device-state-latest */
export function getDeviceStateLatest(deviceId: string): Promise<ApiResponse<unknown>> {
  return api.get(`/device-state-latest${qs({ deviceId })}`);
}

/** GET /device-timeseries-hourly */
export function getDeviceTimeseriesHourly(deviceId: string): Promise<ApiResponse<unknown>> {
  return api.get(`/device-timeseries-hourly${qs({ deviceId })}`);
}

/** GET /device-trends-daily */
export function getDeviceTrendsDaily(deviceId: string): Promise<ApiResponse<unknown>> {
  return api.get(`/device-trends-daily${qs({ deviceId })}`);
}

/** GET /device-out-of-range-events */
export function getDeviceOutOfRangeEvents(deviceId: string): Promise<ApiResponse<unknown>> {
  return api.get(`/device-out-of-range-events${qs({ deviceId })}`);
}
