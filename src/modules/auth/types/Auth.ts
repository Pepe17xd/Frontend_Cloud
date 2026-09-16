export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: 'ADMIN' | 'USER';
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
