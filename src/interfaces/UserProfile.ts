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
  token: string;
}