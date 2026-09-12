import { useMostWatchedGenres, useMostPopularActors, useMostActiveClubs } from "../hooks/useAnalytics";

export default function AdminDashboard() {
  const { data: genres, isLoading: loadingGenres, error: errorGenres } = useMostWatchedGenres();
  const { data: actors, isLoading: loadingActors, error: errorActors } = useMostPopularActors();
  const { data: clubs, isLoading: loadingClubs, error: errorClubs } = useMostActiveClubs();

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>📊 Analytics Dashboard (AWS Athena)</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
        
        {/* TOP GENRES */}
        <section style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>🎬 Top Géneros</h2>
          {loadingGenres && <p>Cargando datos de Athena...</p>}
          {errorGenres && <p style={{ color: "red" }}>Error al cargar géneros.</p>}
          {genres && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                  <th style={{ padding: "0.5rem" }}>Género</th>
                  <th style={{ padding: "0.5rem" }}>Reproducciones</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((g) => (
                  <tr key={g.genre} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "0.5rem" }}>{g.genre}</td>
                    <td style={{ padding: "0.5rem" }}>{g.total_reproducciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* TOP ACTORS */}
        <section style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>⭐ Actores Más Populares</h2>
          {loadingActors && <p>Cargando datos de Athena...</p>}
          {errorActors && <p style={{ color: "red" }}>Error al cargar actores.</p>}
          {actors && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                  <th style={{ padding: "0.5rem" }}>Actor</th>
                  <th style={{ padding: "0.5rem" }}>Vistas Totales</th>
                </tr>
              </thead>
              <tbody>
                {actors.map((a) => (
                  <tr key={a.artist_name} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "0.5rem" }}>{a.artist_name}</td>
                    <td style={{ padding: "0.5rem" }}>{a.total_reproducciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* TOP CLUBS */}
        <section style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>🔥 Clubes Activos</h2>
          {loadingClubs && <p>Cargando datos de Athena...</p>}
          {errorClubs && <p style={{ color: "red" }}>Error al cargar clubes.</p>}
          {clubs && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                  <th style={{ padding: "0.5rem" }}>Club</th>
                  <th style={{ padding: "0.5rem" }}>Salas Creadas</th>
                  <th style={{ padding: "0.5rem" }}>Miembros</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((c) => (
                  <tr key={c.club_name} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "0.5rem" }}>{c.club_name}</td>
                    <td style={{ padding: "0.5rem" }}>{c.total_salas}</td>
                    <td style={{ padding: "0.5rem" }}>{c.total_miembros}</td>
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