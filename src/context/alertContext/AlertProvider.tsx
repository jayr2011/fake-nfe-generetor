import { useState } from "react";
import type { ReactNode } from "react";
import { AlertContext, type AlertContextProps } from "./AlertContext";

export function AlertProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const value: AlertContextProps = {
    isOpen, open, close,
    error: null
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
}
