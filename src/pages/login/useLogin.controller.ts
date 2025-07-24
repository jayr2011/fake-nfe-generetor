import { useState } from "react";
import { useUserContext } from "@/context/userContext/UserContext";
import { loginUser, getUserProfile} from "@/services/auth.api"; 
import type {UserResponse, LoginRequest} from '@/interfaces/UserProfile'

export function useLoginController() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);
  const { saveUser, clearUser } = useUserContext();

  async function handleLogin(data: LoginRequest) {
    setLoading(true);
    try {
      await loginUser(data);
      const userProfile = await getUserProfile();
      setUser(userProfile);
      saveUser(userProfile);
      setLoading(false);
      return { success: true, message: "login com seucesso", user: userProfile };
    } catch {
      setLoading(false);
      return { success: false, message: "Erro ao fazer login" };
    }
  }

  function logout() {
    localStorage.removeItem("jwt_token");
    setUser(null);
    clearUser();
  }

  return { handleLogin, loading, user, getUserProfile, logout };
}
