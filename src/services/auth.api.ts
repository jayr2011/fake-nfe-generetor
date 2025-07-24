import axios from 'axios';

export interface CreateUserRequest {
  name: string;
  email: string;
  documentNumber: number;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  documentNumber: number;
}

export interface LoginResponse {
  message: string;
  user?: UserResponse;
}

const authApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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

export async function loginUser(loginData: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await authApi.post<string>('/auth/login', loginData);
    
    return {
      message: response.data,
    };
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

export async function getUserProfile(userId: string): Promise<UserResponse> {
  try {
    const response = await authApi.get<UserResponse>(`/sec/user/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado');
      }
      if (error.response?.status === 401) {
        throw new Error('Não autorizado');
      }
    }
    throw new Error('Erro ao obter perfil do usuário. Tente novamente.');
  }
}

export default authApi;