import axios from "axios";

import { toApiError } from "../../../core/api/apiError";
import type { AuthUser, LoginInput, LoginResponse, RegisterInput } from "../types/Auth";

const TOKEN_KEY = "astra.accessToken";
const USER_KEY = "astra.currentUser";

const identityClient = axios.create({
  baseURL: import.meta.env.VITE_IDENTITY_API_URL || "https://0cnn5rae1d.execute-api.us-east-1.amazonaws.com",
  headers: { "Content-Type": "application/json" },
});

type JwtClaims = Record<string, unknown>;

function decodeJwt(token: string): JwtClaims | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(atob(base64).split("").map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`).join(""))) as JwtClaims;
  } catch { return null; }
}

function userFromClaims(token: string): AuthUser | null {
  const claims = decodeJwt(token);
  if (!claims) return null;
  const id = claims.sub ?? claims.id ?? claims.userId ?? claims.user_id;
  if ((typeof id !== "string" && typeof id !== "number") || !String(id)) return null;
  return { id: String(id), name: typeof claims.name === "string" ? claims.name : typeof claims.username === "string" ? claims.username : "", email: typeof claims.email === "string" ? claims.email : "" };
}

export function getAccessToken(): string | null { return localStorage.getItem(TOKEN_KEY); }

type ApiRecord = Record<string, unknown>;

function record(value: unknown): ApiRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as ApiRecord : null;
}

function unwrap(value: unknown): unknown {
  const valueRecord = record(value);
  return valueRecord?.data ?? valueRecord?.result ?? value;
}

function toUser(value: unknown): AuthUser | null {
  const user = record(unwrap(value));
  if (!user) return null;
  const id = user.id ?? user.userId ?? user.user_id ?? user.sub;
  if ((typeof id !== "string" && typeof id !== "number") || !String(id)) return null;
  return {
    id: String(id),
    name: typeof user.name === "string" ? user.name : typeof user.username === "string" ? user.username : "",
    email: typeof user.email === "string" ? user.email : "",
  };
}

function tokenFrom(value: unknown): string | null {
  const response = record(unwrap(value));
  const token = response?.accessToken ?? response?.token ?? response?.jwt;
  return typeof token === "string" && token ? token : null;
}

export const authApi = {
  async register(input: RegisterInput): Promise<AuthUser> {
    try {
      const response = await identityClient.post("/api/auth/register", input);
      const responseBody = unwrap(response.data);
      const responseRecord = record(responseBody);
      const user = toUser(responseRecord?.user ?? responseBody);
      if (!user) throw new Error("La respuesta de registro no contiene un usuario válido.");
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch (error) { throw toApiError(error, "Identity Service"); }
  },
  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      const response = await identityClient.post("/api/auth/login", input);
      const accessToken = tokenFrom(response.data);
      if (!accessToken) throw new Error("La respuesta de inicio de sesión no contiene un JWT válido.");
      localStorage.setItem(TOKEN_KEY, accessToken);
      const responseBody = unwrap(response.data);
      const responseRecord = record(responseBody);
      const user = userFromClaims(accessToken) ?? toUser(responseRecord?.user);
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { accessToken };
    } catch (error) { throw toApiError(error, "Identity Service"); }
  },
  logout(): void { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); },
  getCurrentUser(): AuthUser | null {
    const token = getAccessToken();
    if (!token) return null;
    const fromToken = userFromClaims(token);
    if (fromToken) return fromToken;
    try { return JSON.parse(localStorage.getItem(USER_KEY) ?? "null") as AuthUser | null; } catch { return null; }
  },
};
