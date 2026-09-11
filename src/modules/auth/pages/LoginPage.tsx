import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { GlassPanel } from "../../../shared/components/GlassPanel";
import { PortalTransition } from "../../../shared/components/PortalTransition";
import { SpaceBackground } from "../../../shared/components/SpaceBackground";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false); const [entering, setEntering] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setError(null); setLoading(true); try { await login({ email, password }); setEntering(true); window.setTimeout(() => navigate((location.state as { from?: string } | null)?.from ?? "/", { replace: true }), 900); } catch { setError("No pudimos iniciar sesión. Revisa tus credenciales."); setLoading(false); } };
  return <main className="auth-page"><SpaceBackground className="auth-space" /><PortalTransition active={entering} /><GlassPanel className="auth-card"><p className="page-eyebrow">BIENVENIDO A ASTRA</p><span className="auth-orbit-mark">✦</span><h1>Iniciar sesión</h1><p className="auth-intro">Tu acceso a un universo de historias compartidas.</p><form onSubmit={submit}><label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label><label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="button button-primary neon-button" disabled={loading}>{loading ? "Abriendo portal…" : "Entrar a ASTRA"}</button></form><p className="auth-note">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p></GlassPanel></main>;
}
