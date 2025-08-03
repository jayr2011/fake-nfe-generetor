import axios from 'axios';
import type { CreateUserRequest, LoginRequest, UserResponse, LoginResponse } from '@/interfaces/UserProfile';

const baseURL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

  authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export async function createUser(userData: CreateUserRequest): Promise<UserResponse> {
  try {
    const response = await authApi.post<UserResponse>('/sec/addUser', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Dados inválidos');
      }
      if (error.response?.status === 409) {
        throw new Error('Este email já está cadastrado');
      }
    }
    throw new Error('Erro ao criar usuário. Tente novamente.');
  }
}

export async function getUserProfile(): Promise<UserResponse> {
  try {
    const response = await authApi.get<UserResponse>('sec/user/me');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Usuário não autenticado');
      }
    }
    throw new Error('Erro ao obter perfil do usuário. Tente novamente.');
  }
}

export async function loginUser(loginData: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await authApi.post<LoginResponse>('/auth/login', loginData);
    
    if(response.data.token) {
      localStorage.setItem("jwt_token", response.data.token);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Email ou senha incorretos');
      }
      if (error.response?.status === 400) {
        throw new Error('Dados de login inválidos');
      }
    }
    throw new Error('Erro ao fazer login. Tente novamente.');
  }
}

export default authApi;