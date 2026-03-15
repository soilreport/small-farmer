/**
 * Device list store (localStorage persistence).
 * Use with DeviceContext or useDevices for a persisted device list.
 */
import type { Device } from "../hooks/useDevices";
import { getFromDb, setInDb } from "../lib/database";

const DEVICES_KEY = "devices";

export function getStoredDevices(): Device[] {
  const stored = getFromDb<Device[]>(DEVICES_KEY);
  return Array.isArray(stored) ? stored : [];
}

export function setStoredDevices(devices: Device[]): void {
  setInDb(DEVICES_KEY, devices);
}
