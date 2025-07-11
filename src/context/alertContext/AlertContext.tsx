import { createContext, useContext } from "react";

export interface AlertContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  error: Error | null;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert deve ser usado dentro de AlertProvider");
  }
  return context;
}