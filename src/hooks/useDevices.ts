// src/hooks/useDevices.ts

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

export type DeviceStatus = "online" | "offline" | "maintenance";

export interface Device {
  id: string;
  name: string;
  type: string;
  location?: string;
  status: DeviceStatus;
  battery?: number;
  lastSeen?: string;
}

interface UseDevicesOptions {
  initialDevices?: Device[];
}

interface UseDevicesResult {
  devices: Device[];
  loading: boolean;
  error: string | null;
  onlineCount: number;
  offlineCount: number;
  maintenanceCount: number;
  addDevice: (device: Device) => boolean;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  removeDevice: (id: string) => void;
  getDeviceById: (id: string) => Device | undefined;
  setDevices: Dispatch<SetStateAction<Device[]>>;
  clearDevices: () => void;
}

/**
 * Hook for managing device data
 *good for dashboard, devices page, and future api integration
 */
export function useDevices(
  options: UseDevicesOptions = {}
): UseDevicesResult {
  const { initialDevices = [] } = options;

  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [loading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onlineCount = useMemo(
    () => devices.filter((device) => device.status === "online").length,
    [devices]
  );

  const offlineCount = useMemo(
    () => devices.filter((device) => device.status === "offline").length,
    [devices]
  );

  const maintenanceCount = useMemo(
    () => devices.filter((device) => device.status === "maintenance").length,
    [devices]
  );

  const addDevice = (device: Device): boolean => {
    const alreadyExists = devices.some((item) => item.id === device.id);

    if (alreadyExists) {
      setError("Device with this ID already exists.");
      return false;
    }

    setDevices((prev) => [...prev, device]);
    setError(null);
    return true;
  };

  const updateDevice = (id: string, updates: Partial<Device>) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      )
    );
  };

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  const getDeviceById = (id: string) => {
    return devices.find((device) => device.id === id);
  };

  const clearDevices = () => {
    setDevices([]);
    setError(null);
  };

  return {
    devices,
    loading,
    error,
    onlineCount,
    offlineCount,
    maintenanceCount,
    addDevice,
    updateDevice,
    removeDevice,
    getDeviceById,
    setDevices,
    clearDevices,
  };
}