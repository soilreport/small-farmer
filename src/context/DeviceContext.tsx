import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Device {
  id: string;
  name: string;
  status: string;
  lastReading?: number;
}

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updated: Partial<Device>) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);

  const addDevice = (device: Device) => {
    setDevices((prev) => [...prev, device]);
  };

  const updateDevice = (id: string, updated: Partial<Device>) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
  };

  return (
    <DeviceContext.Provider value={{ devices, addDevice, updateDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) throw new Error("useDevices must be used within DeviceProvider");
  return context;
};