import { createContext, useCallback, useMemo, useState } from "react";

import { authApi } from "../services/authApi";
import type { AuthUser, LoginInput, RegisterInput } from "../types/Auth";

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => authApi.getCurrentUser());
  const login = useCallback(async (input: LoginInput) => { await authApi.login(input); setUser(authApi.getCurrentUser()); }, []);
  const register = useCallback((input: RegisterInput) => authApi.register(input), []);
  const logout = useCallback(() => { authApi.logout(); setUser(null); }, []);
  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
