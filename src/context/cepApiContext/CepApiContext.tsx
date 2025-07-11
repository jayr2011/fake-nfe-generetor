import { createContext, useContext } from "react";
import type { CepApiContextProps } from "@/interfaces/cepApiContextInterface";

export const CepApiContext = createContext<CepApiContextProps | undefined>(undefined);

export function useCepApi() {
    const context = useContext(CepApiContext);
    if (!context) {
        throw new Error("useCepApi deve ser usado dentro de CepApiProvider");
    }
    return context;
}
