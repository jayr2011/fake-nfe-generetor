import { createContext, useContext } from "react";
import type { NfeFormInterface } from "@/interfaces/formInterface";

export interface ApiContextProps {
  isLoadingCreate: boolean;
  isErrorCreating: string | null;
  createNfe: (data: NfeFormInterface) => Promise<void>;
}

export const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi deve ser usado dentro de ApiProvider");
  }
  return context;
}