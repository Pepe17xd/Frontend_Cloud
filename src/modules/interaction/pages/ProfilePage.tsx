import { useAuth } from "../../auth/hooks/useAuth";
import { useUserLikes, useUserWatchlist } from "../hooks/useInteraction";
import { Link } from "react-router-dom";

export function ProfilePage() {
  const { user } = useAuth();
  
  // Cast user.id to number as expected by the backend
  const userId = user?.id ? Number(user.id) : undefined;
  
  const { data: likes, isLoading: loadingLikes } = useUserLikes(userId);
  const { data: watchlist, isLoading: loadingWatchlist } = useUserWatchlist(userId);

  const initials = user?.name?.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <main className="page-shell" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <p className="page-eyebrow" style={{ color: "#666", fontSize: "0.9rem", fontWeight: "bold" }}>TU ESPACIO</p>
      <h1 style={{ marginTop: "0.5rem" }}>Mi perfil</h1>
      
      <section className="profile-panel" style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "#f0f4f8", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <div className="profile-avatar" style={{ background: "#007bff", color: "white", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: "bold" }}>
          {initials}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{user?.name || "Usuario"}</h2>
          <p style={{ margin: "0.25rem 0 0 0", color: "#555" }}>{user?.email}</p>
        </div>
      </section>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        
        {/* Watchlist Section */}
        <section style={{ flex: "1 1 400px" }}>
          <h2 className="subheading" style={{ borderBottom: "2px solid #eee", paddingBottom: "0.5rem" }}>Mi Watchlist (Por Ver)</h2>
          {loadingWatchlist && <p>Cargando tu watchlist...</p>}
          {!loadingWatchlist && (!watchlist || watchlist.length === 0) ? (
            <div className="empty-state" style={{ padding: "2rem", textAlign: "center", background: "#fafafa", borderRadius: "8px", color: "#888" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>＋</span>
              <p>Tu próximo mundo está esperando ser descubierto.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1rem" }}>
              {watchlist?.map(movie => (
                <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <img src={movie.poster_url} alt={movie.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <p style={{ padding: "0.5rem", margin: 0, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Likes Section */}
        <section style={{ flex: "1 1 400px" }}>
          <h2 className="subheading" style={{ borderBottom: "2px solid #eee", paddingBottom: "0.5rem" }}>Películas que me gustaron</h2>
          {loadingLikes && <p>Cargando tus likes...</p>}
          {!loadingLikes && (!likes || likes.length === 0) ? (
            <div className="empty-state" style={{ padding: "2rem", textAlign: "center", background: "#fafafa", borderRadius: "8px", color: "#888" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>❤️</span>
              <p>Aún no le has dado like a ninguna película.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1rem" }}>
              {likes?.map(movie => (
                <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <img src={movie.poster_url} alt={movie.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <p style={{ padding: "0.5rem", margin: 0, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
