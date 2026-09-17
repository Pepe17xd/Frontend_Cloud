import { NavLink } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";
import { AstraLogo } from "./AstraLogo";

const links = [
  ["/", "Inicio"],
  ["/explore", "Explorar"],
  ["/clubs", "Clubes"],
  ["/profile", "Mis películas"],
  ["/analytics", "Analítica"],
] as const;

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <header className="navbar">
      <NavLink to="/" className="brand" aria-label="ASTRA, inicio">
        <AstraLogo className="brand-logo" />
        <span>ASTRA</span>
      </NavLink>
      <nav className="nav-links" aria-label="Navegación principal">
        {links.map(([to, label]) => {
          if (to === "/analytics" && user?.role !== 'ADMIN') return null;
          return (
            <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => isActive ? "active" : ""}>
              {label}
            </NavLink>
          );
        })}
      </nav>
      {isAuthenticated ? <div className="profile-actions"><NavLink to="/profile" className="profile-link" aria-label="Abrir perfil"><span className="status-dot" /><span className="avatar">{user?.name?.slice(0, 2).toUpperCase() || "U"}</span><span>{user?.name || "Perfil"}</span></NavLink><button className="logout-button" onClick={logout}>Salir</button></div> : <NavLink to="/login" className="profile-link">Iniciar sesión</NavLink>}
    </header>
  );
}
