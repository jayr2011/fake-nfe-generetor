import { createContext, useContext } from "react";
import type { UserResponse } from "@/interfaces/UserProfile";

export interface UserContextType {
  user: UserResponse | null;
  saveUser: (user: UserResponse) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useCepApi deve ser usado dentro de CepApiProvider");
    }
    return context;
}
