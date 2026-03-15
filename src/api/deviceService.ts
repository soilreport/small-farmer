/**
 * Device API service (mock). Replace with real backend when available.
 */
import { api } from "./api";
import type { Device } from "../hooks/useDevices";

export async function fetchDevices(): Promise<Device[]> {
  const res = await api.get<Device[]>("/devices");
  return res.ok && Array.isArray(res.data) ? res.data : [];
}

export async function createDevice(device: Device) {
  return api.post<Device>("/devices", device);
}

export async function updateDevice(id: string, updates: Partial<Device>) {
  return api.put<Device>(`/devices/${id}`, updates);
}
