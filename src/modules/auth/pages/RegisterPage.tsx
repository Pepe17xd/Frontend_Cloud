import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function RegisterPage() {
  const { register } = useAuth(); const navigate = useNavigate(); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setError(null); setLoading(true); try { await register({ name, email, password }); navigate("/login", { replace: true }); } catch { setError("No pudimos crear la cuenta. Inténtalo nuevamente."); } finally { setLoading(false); } };
  return <main className="auth-page"><section className="auth-card"><p className="page-eyebrow">ÚNETE A ASTRA</p><h1>Crear cuenta</h1><form onSubmit={submit}><label>Nombre<input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" /></label><label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label><label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" /></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="button button-primary" disabled={loading}>{loading ? "Creando…" : "Crear cuenta"}</button></form><p className="auth-note">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p></section></main>;
}
