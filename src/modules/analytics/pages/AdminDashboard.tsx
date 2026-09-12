import { useMostWatchedGenres, useMostPopularActors, useMostActiveClubs } from "../hooks/useAnalytics";

export default function AdminDashboard() {
  const { data: genres, isLoading: loadingGenres, error: errorGenres } = useMostWatchedGenres();
  const { data: actors, isLoading: loadingActors, error: errorActors } = useMostPopularActors();
  const { data: clubs, isLoading: loadingClubs, error: errorClubs } = useMostActiveClubs();

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif", color: "#fff" }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#00e5ff" }}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", letterSpacing: "1px" }}>Tendencia</h1>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        
        {/* TOP GENRES */}
        <section style={{ background: "rgba(20, 20, 30, 0.6)", backdropFilter: "blur(12px)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#a855f7" }}>
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f3f4f6" }}>Top Géneros</h2>
          </div>

          {loadingGenres && <p style={{ color: "#9ca3af" }}>Cargando tendencias...</p>}
          {errorGenres && <p style={{ color: "#ef4444" }}>Error al cargar géneros.</p>}
          {genres && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal" }}>Género</th>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal", textAlign: "right" }}>Vistas</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((g) => (
                  <tr key={g.genre} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 0", color: "#e5e7eb" }}>{g.genre}</td>
                    <td style={{ padding: "1rem 0", color: "#00e5ff", textAlign: "right", fontWeight: "bold" }}>{Number(g.total_reproducciones).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* TOP ACTORS */}
        <section style={{ background: "rgba(20, 20, 30, 0.6)", backdropFilter: "blur(12px)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#eab308" }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f3f4f6" }}>Actores Populares</h2>
          </div>

          {loadingActors && <p style={{ color: "#9ca3af" }}>Cargando talento...</p>}
          {errorActors && <p style={{ color: "#ef4444" }}>Error al cargar actores.</p>}
          {actors && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal" }}>Actor</th>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal", textAlign: "right" }}>Impacto</th>
                </tr>
              </thead>
              <tbody>
                {actors.map((a) => (
                  <tr key={a.artist_name} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 0", color: "#e5e7eb" }}>{a.artist_name}</td>
                    <td style={{ padding: "1rem 0", color: "#00e5ff", textAlign: "right", fontWeight: "bold" }}>{Number(a.total_reproducciones).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* TOP CLUBS */}
        <section style={{ background: "rgba(20, 20, 30, 0.6)", backdropFilter: "blur(12px)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#f97316" }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f3f4f6" }}>Clubes Activos</h2>
          </div>
          
          {loadingClubs && <p style={{ color: "#9ca3af" }}>Cargando comunidades...</p>}
          {errorClubs && <p style={{ color: "#ef4444" }}>Error al cargar clubes.</p>}
          {clubs && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal" }}>Club</th>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal", textAlign: "center" }}>Salas</th>
                  <th style={{ padding: "0.75rem 0", fontWeight: "normal", textAlign: "right" }}>Fans</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((c) => (
                  <tr key={c.club_name} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 0", color: "#e5e7eb" }}>{c.club_name}</td>
                    <td style={{ padding: "1rem 0", color: "#e5e7eb", textAlign: "center" }}>{c.total_salas}</td>
                    <td style={{ padding: "1rem 0", color: "#00e5ff", textAlign: "right", fontWeight: "bold" }}>{c.total_miembros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

      </div>
    </main>
  );
}
