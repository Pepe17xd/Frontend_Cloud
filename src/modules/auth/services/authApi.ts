import axios from "axios";

import { toApiError } from "../../../core/api/apiError";
import type { AuthUser, LoginInput, LoginResponse, RegisterInput } from "../types/Auth";

const TOKEN_KEY = "astra.accessToken";
const USER_KEY = "astra.currentUser";

const identityClient = axios.create({
  baseURL: import.meta.env.VITE_IDENTITY_API_URL || "https://0cnn5rae1d.execute-api.us-east-1.amazonaws.com",
  headers: { "Content-Type": "application/json" },
});

const communityClient = axios.create({
  baseURL: import.meta.env.VITE_COMMUNITY_API_URL || "https://tv9kgos66m.execute-api.us-east-1.amazonaws.com",
  headers: { "Content-Type": "application/json" },
});

export function getAccessToken(): string | null { return localStorage.getItem(TOKEN_KEY); }

export const authApi = {
  async register(input: RegisterInput): Promise<AuthUser> {
    try {
      const response = await identityClient.post("/api/auth/register", input);
      return await this.login({ email: input.email, password: input.password }) as unknown as AuthUser;
    } catch (error) { throw toApiError(error, "Identity Service"); }
  },
  
  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      // 1. Obtener Token de Identity
      const response = await identityClient.post("/api/auth/login", input);
      const accessToken = response.data.accessToken || response.data.token || response.data.jwt;
      if (!accessToken) throw new Error("No JWT token");
      localStorage.setItem(TOKEN_KEY, accessToken);
      
      // 2. Obtener Perfil Real de Community (con el ID entero real)
      const meResponse = await communityClient.get("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const user = {
        id: String(meResponse.data.id), // Forzamos a String para el tipo AuthUser pero contiene el número
        name: meResponse.data.username || meResponse.data.display_name,
        email: meResponse.data.email
      };
      
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { accessToken };
    } catch (error) { throw toApiError(error, "Auth Service"); }
  },
  
  logout(): void { 
    localStorage.removeItem(TOKEN_KEY); 
    localStorage.removeItem(USER_KEY); 
  },
  
  getCurrentUser(): AuthUser | null {
    try { 
      return JSON.parse(localStorage.getItem(USER_KEY) ?? "null"); 
    } catch { 
      return null; 
    }
  },
};
