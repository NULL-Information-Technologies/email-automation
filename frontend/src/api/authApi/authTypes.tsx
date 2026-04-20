// types/authTypes.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  fullName: string;
  email: string;
  role: string;
  id: string;
  message?: string;
}
