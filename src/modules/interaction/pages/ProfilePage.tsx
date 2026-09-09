import { useAuth } from "../../auth/hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();
  const initials = user?.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "U";
  return <main className="page-shell"><p className="page-eyebrow">TU ESPACIO</p><h1>Mi perfil</h1><section className="profile-panel"><div className="profile-avatar">{initials}</div><div><h2>{user?.name || "Usuario"}</h2><p>{user?.email}</p></div></section><h2 className="subheading">Mis películas</h2><div className="empty-state"><span>＋</span><p>Tu próximo mundo está esperando ser descubierto.</p></div></main>;
}
