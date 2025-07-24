import { useState } from "react";
import { loginUser, getUserProfile, type UserResponse, type LoginRequest } from "@/services/auth.api";

export function useLoginController() {
  const [loading, setLoading] = useState(false);
  const [user] = useState<UserResponse | null>(null);

  async function handleLogin(data: LoginRequest) {
    setLoading(true);
    try {
      const response = await loginUser(data);
      setLoading(false);
      return { success: true, message: response.message, user: response.user };
    } catch {
      setLoading(false);
      return { success: false, message: "Erro ao fazer login" };
    }
  }

  return { handleLogin, loading, user, getUserProfile  };
}
