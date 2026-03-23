// src/context/DeviceContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export interface Device {
  id: string;
  name: string;
  status: string;
  lastReading?: number;
}

interface DeviceContextType {
  devices: Device[];
  loading: boolean;
  error: string | null;
  addDevice: (device: Device) => Promise<void>;
  updateDevice: (id: string, updated: Partial<Device>) => Promise<void>;
  removeDevice: (id: string) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addDevice = async (device: Device) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDevices((prev) => [...prev, device]);
    } catch (err: any) {
      console.error("Add device failed:", err);
      setError(err.message || "Failed to add device");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDevice = async (id: string, updated: Partial<Device>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
      );
    } catch (err: any) {
      console.error("Update device failed:", err);
      setError(err.message || "Failed to update device");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeDevice = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (err: any) {
      console.error("Remove device failed:", err);
      setError(err.message || "Failed to remove device");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeviceContext.Provider
      value={{ devices, loading, error, addDevice, updateDevice, removeDevice }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) throw new Error("useDevices must be used within DeviceProvider");
  return context;
};