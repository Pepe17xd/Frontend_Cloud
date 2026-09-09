import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setError(null); setLoading(true); try { await login({ email, password }); navigate((location.state as { from?: string } | null)?.from ?? "/", { replace: true }); } catch { setError("No pudimos iniciar sesión. Revisa tus credenciales."); } finally { setLoading(false); } };
  return <main className="auth-page"><section className="auth-card"><p className="page-eyebrow">BIENVENIDO A ASTRA</p><h1>Iniciar sesión</h1><form onSubmit={submit}><label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label><label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="button button-primary" disabled={loading}>{loading ? "Ingresando…" : "Ingresar"}</button></form><p className="auth-note">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p></section></main>;
}
