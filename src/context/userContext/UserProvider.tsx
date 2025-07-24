import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { type UserResponse } from "@/interfaces/UserProfile";


export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);

    const saveUser = useCallback((userData: UserResponse) => {
        setUser(userData);
    }, [])

    const clearUser = useCallback(() => {
        setUser(null);
        localStorage.removeItem("jwt_token");
    },[])

    return (
        <UserContext.Provider value={{ user, saveUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}