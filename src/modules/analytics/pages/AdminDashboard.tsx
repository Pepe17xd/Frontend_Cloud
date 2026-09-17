import { 
  useMostWatchedGenres, 
  useMostPopularActors, 
  useMostActiveClubs,
  useKpis,
  useGenreEngagement,
  usePeakHours,
  useContentGapAnalysis,
  useMovieLifecycle
} from "../hooks/useAnalytics";

export default function AdminDashboard() {
  const [gapPage, setGapPage] = useState(1);
  const [lifePage, setLifePage] = useState(1);
  const pageSize = 10;
  
  const safeNum = (val: string | null | undefined, dec = 1) => {
    if (!val || val === "null" || isNaN(Number(val))) return "N/A";
    return Number(val).toFixed(dec);
  };

  const { data: genres, isLoading: loadingGenres, error: errorGenres } = useMostWatchedGenres();
  const { data: actors, isLoading: loadingActors, error: errorActors } = useMostPopularActors();
  const { data: clubs, isLoading: loadingClubs, error: errorClubs } = useMostActiveClubs();
  const { data: kpis, isLoading: loadingKpis } = useKpis();
  const { data: genreEngagement, isLoading: loadingGenreEngagement } = useGenreEngagement();
  const { data: peakHours, isLoading: loadingPeakHours } = usePeakHours();
  const { data: contentGap, isLoading: loadingContentGap } = useContentGapAnalysis();
  const { data: movieLifecycle, isLoading: loadingMovieLifecycle } = useMovieLifecycle();

  const kpiData = kpis?.[0] || { total_movies: "0", total_users: "0", total_clubs: "0", total_watch_rooms: "0", total_interactions: "0", avg_rating: "0" };
  const maxPeakHourRooms = peakHours ? Math.max(...peakHours.map(p => Number(p.total_rooms))) : 1;

  const sectionStyle = { 
    background: "rgba(20, 20, 30, 0.6)", 
    backdropFilter: "blur(12px)", 
    padding: "1.5rem", 
    borderRadius: "12px", 
    border: "1px solid rgba(255, 255, 255, 0.1)", 
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)" 
  };
  
  const thStyle = { padding: "0.75rem 0", fontWeight: "normal" as const, color: "#9ca3af", borderBottom: "1px solid rgba(255,255,255,0.1)" };
  const tdStyle = { padding: "1rem 0", color: "#e5e7eb", borderBottom: "1px solid rgba(255,255,255,0.05)" };

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif", color: "#fff" }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#00e5ff" }}>
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", letterSpacing: "1px" }}>Analítica</h1>
      </div>
      
      {/* KPI Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ ...sectionStyle, borderTop: "4px solid #00e5ff" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Películas</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>{loadingKpis ? "..." : kpiData.total_movies}</div>
        </div>
        <div style={{ ...sectionStyle, borderTop: "4px solid #a855f7" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Usuarios</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>{loadingKpis ? "..." : kpiData.total_users}</div>
        </div>
        <div style={{ ...sectionStyle, borderTop: "4px solid #f97316" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Clubes</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>{loadingKpis ? "..." : kpiData.total_clubs}</div>
        </div>
        <div style={{ ...sectionStyle, borderTop: "4px solid #eab308" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Salas</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>{loadingKpis ? "..." : kpiData.total_watch_rooms}</div>
        </div>
        <div style={{ ...sectionStyle, borderTop: "4px solid #ef4444" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Interacciones</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>{loadingKpis ? "..." : kpiData.total_interactions}</div>
        </div>
        <div style={{ ...sectionStyle, borderTop: "4px solid #22c55e" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Rating Promedio</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>{loadingKpis ? "..." : Number(kpiData.avg_rating).toFixed(1)}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
        {/* TOP GENRES */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f3f4f6" }}>Top Géneros</h2>
          </div>
          {loadingGenres && <p style={{ color: "#9ca3af" }}>Cargando tendencias...</p>}
          {errorGenres && <p style={{ color: "#ef4444" }}>Error al cargar géneros.</p>}
          {genres && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Género</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Vistas</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((g) => (
                  <tr key={g.genre}>
                    <td style={tdStyle}>{g.genre}</td>
                    <td style={{ ...tdStyle, color: "#00e5ff", textAlign: "right", fontWeight: "bold" }}>{Number(g.total_reproducciones).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* TOP ACTORS */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f3f4f6" }}>Actores Populares</h2>
          </div>
          {loadingActors && <p style={{ color: "#9ca3af" }}>Cargando talento...</p>}
          {errorActors && <p style={{ color: "#ef4444" }}>Error al cargar actores.</p>}
          {actors && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Actor</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Impacto</th>
                </tr>
              </thead>
              <tbody>
                {actors.map((a) => (
                  <tr key={a.artist_name}>
                    <td style={tdStyle}>{a.artist_name}</td>
                    <td style={{ ...tdStyle, color: "#00e5ff", textAlign: "right", fontWeight: "bold" }}>{Number(a.total_reproducciones).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* TOP CLUBS */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f3f4f6" }}>Clubes Activos</h2>
          </div>
          {loadingClubs && <p style={{ color: "#9ca3af" }}>Cargando comunidades...</p>}
          {errorClubs && <p style={{ color: "#ef4444" }}>Error al cargar clubes.</p>}
          {clubs && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Club</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Salas</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Fans</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((c) => (
                  <tr key={c.club_name}>
                    <td style={tdStyle}>{c.club_name}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{c.total_salas}</td>
                    <td style={{ ...tdStyle, color: "#00e5ff", textAlign: "right", fontWeight: "bold" }}>{c.total_miembros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* NEW SECTIONS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginBottom: "2rem" }}>
        
        {/* ENGAGEMENT POR GÉNERO */}
        <section style={sectionStyle}>
          <h2 style={{ margin: 0, marginBottom: "1.5rem", fontSize: "1.25rem", color: "#f3f4f6" }}>Engagement por Género</h2>
          {loadingGenreEngagement && <p style={{ color: "#9ca3af" }}>Cargando datos...</p>}
          {genreEngagement && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Género</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Películas</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Salas</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Rating Promedio</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Reseñas</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {genreEngagement.map((g) => (
                    <tr key={g.genre}>
                      <td style={tdStyle}>{g.genre}</td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>{g.total_movies}</td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>{g.total_watch_rooms}</td>
                      <td style={{ ...tdStyle, textAlign: "right", color: "#22c55e" }}>{safeNum(g.avg_rating, 1)}</td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>{g.total_reviews}</td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>{g.total_likes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ACTIVIDAD POR HORA */}
        <section style={sectionStyle}>
          <h2 style={{ margin: 0, marginBottom: "1.5rem", fontSize: "1.25rem", color: "#f3f4f6" }}>Actividad por Hora</h2>
          {loadingPeakHours && <p style={{ color: "#9ca3af" }}>Cargando actividad...</p>}
          {peakHours && (
            <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "150px", marginTop: "1rem" }}>
              {peakHours.map((p) => (
                <div key={p.hour} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ 
                    width: "100%", 
                    height: `${(Number(p.total_rooms) / maxPeakHourRooms) * 100}%`, 
                    background: "#00e5ff", 
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.3s ease"
                  }}></div>
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{p.hour}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
          {/* BRECHAS DE CONTENIDO */}
          <section style={sectionStyle}>
            <h2 style={{ margin: 0, marginBottom: "1.5rem", fontSize: "1.25rem", color: "#f3f4f6" }}>Brechas de Contenido</h2>
            {loadingContentGap && <p style={{ color: "#9ca3af" }}>Cargando brechas...</p>}
            {contentGap && (

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Género</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Catálogo</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Salas</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Brecha (Score)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentGap.slice((gapPage - 1) * pageSize, gapPage * pageSize).map((c) => (
                      <tr key={c.genre}>
                        <td style={tdStyle}>{c.genre}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>{c.catalog_count}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>{c.watch_room_count}</td>
                        <td style={{ ...tdStyle, textAlign: "right", color: "#ef4444", fontWeight: "bold" }}>{safeNum(c.gap_score, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
                  <button onClick={() => setGapPage(p => Math.max(1, p - 1))} disabled={gapPage === 1} style={{ background: '#374151', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: gapPage === 1 ? 'not-allowed' : 'pointer' }}>Anterior</button>
                  <span style={{ color: '#9ca3af' }}>Página {gapPage} de {Math.ceil(contentGap.length / pageSize)}</span>
                  <button onClick={() => setGapPage(p => Math.min(Math.ceil(contentGap.length / pageSize), p + 1))} disabled={gapPage === Math.ceil(contentGap.length / pageSize)} style={{ background: '#374151', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: gapPage === Math.ceil(contentGap.length / pageSize) ? 'not-allowed' : 'pointer' }}>Siguiente</button>
                </div>
              </div>
            )}
          </section>

          {/* CICLO DE VIDA DE PELÍCULAS */}
          <section style={sectionStyle}>
            <h2 style={{ margin: 0, marginBottom: "1.5rem", fontSize: "1.25rem", color: "#f3f4f6" }}>Ciclo de Vida de Películas</h2>
            {loadingMovieLifecycle && <p style={{ color: "#9ca3af" }}>Cargando ciclo de vida...</p>}
            {movieLifecycle && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Película</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Rating Cat.</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Rating Usu.</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Salas</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieLifecycle.slice((lifePage - 1) * pageSize, lifePage * pageSize).map((m) => (
                      <tr key={m.title}>
                        <td style={tdStyle}>{m.title}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>{safeNum(m.catalog_rating, 1)}</td>
                        <td style={{ ...tdStyle, textAlign: "right", color: "#eab308" }}>{safeNum(m.avg_user_score, 1)}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>{m.total_rooms}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>{m.total_likes}</td>
                      </tr>
                    ))}
                  </tbody>
                
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
                  <button onClick={() => setLifePage(p => Math.max(1, p - 1))} disabled={lifePage === 1} style={{ background: '#374151', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: lifePage === 1 ? 'not-allowed' : 'pointer' }}>Anterior</button>
                  <span style={{ color: '#9ca3af' }}>Página {lifePage} de {Math.ceil(movieLifecycle.length / pageSize)}</span>
                  <button onClick={() => setLifePage(p => Math.min(Math.ceil(movieLifecycle.length / pageSize), p + 1))} disabled={lifePage === Math.ceil(movieLifecycle.length / pageSize)} style={{ background: '#374151', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: lifePage === Math.ceil(movieLifecycle.length / pageSize) ? 'not-allowed' : 'pointer' }}>Siguiente</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
