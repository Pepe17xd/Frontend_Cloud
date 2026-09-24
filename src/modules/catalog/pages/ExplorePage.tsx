import { useState, useCallback } from "react";
import { MovieCard } from "../../../shared/components/MovieCard";
import { CatalogState } from "../components/CatalogState";
import { useMovies, useMovieSearch } from "../hooks/useMovies";

const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "Horror",
  "Mystery", "Romance", "Science Fiction", "Thriller",
];

const PAGE_SIZE = 20;

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "8px",
  color: "#fff",
  padding: "0.6rem 1rem",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
};

const btnStyle = (active: boolean): React.CSSProperties => ({
  padding: "0.4rem 1rem",
  borderRadius: "20px",
  border: active ? "1px solid #00e5ff" : "1px solid rgba(255,255,255,0.2)",
  background: active ? "rgba(0,229,255,0.15)" : "transparent",
  color: active ? "#00e5ff" : "#9ca3af",
  cursor: "pointer",
  fontWeight: active ? "bold" : "normal",
  fontSize: "0.85rem",
  transition: "all 0.15s",
  whiteSpace: "nowrap" as const,
});

const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
  padding: "0.5rem 1.5rem",
  background: disabled ? "#1f2937" : "#374151",
  color: disabled ? "#4b5563" : "white",
  border: "none",
  borderRadius: "4px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontWeight: "bold",
});

export function ExplorePage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(0);

  // Debounced search input - only search when input changes
  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(0);
  }, []);

  const handleGenreToggle = (g: string) => {
    setGenre((prev) => (prev === g ? "" : g));
    setPage(0);
  };

  const isSearching = query.trim().length > 0 || genre.trim().length > 0;

  const browseResult = useMovies(page, PAGE_SIZE);
  const searchResult = useMovieSearch(query, genre, page, PAGE_SIZE);

  const isLoading = isSearching ? searchResult.isLoading : (browseResult.isLoading && page === 0);
  const isError   = isSearching ? searchResult.isError   : browseResult.isError;

  const movies      = isSearching ? (searchResult.data?.content ?? []) : (browseResult.data ?? []);
  const totalPages  = isSearching ? (searchResult.data?.totalPages ?? 1) : null;
  const hasNext     = totalPages != null ? page + 1 < totalPages : movies.length >= PAGE_SIZE;

  if (isLoading) return <main className="page-shell"><CatalogState status="loading" /></main>;
  if (isError)   return <main className="page-shell"><CatalogState status="error" /></main>;

  return (
    <main className="page-shell">
      <p className="page-eyebrow">CATÁLOGO</p>
      <h1>Explora nuevas historias</h1>
      <p className="page-lead">Películas elegidas para ver, comentar y compartir.</p>

      {/* ── Search bar ── */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Buscar por título, actor o género…"
          value={query}
          onChange={handleQueryChange}
          style={inputStyle}
        />
        {isSearching && (
          <button
            onClick={() => { setQuery(""); setGenre(""); setPage(0); }}
            style={{ ...navBtnStyle(false), padding: "0.6rem 1rem", background: "#374151", whiteSpace: "nowrap" }}
          >
            ✕ Limpiar
          </button>
        )}
      </div>

      {/* ── Genre pills ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
        {GENRES.map((g) => (
          <button key={g} style={btnStyle(genre === g)} onClick={() => handleGenreToggle(g)}>
            {g}
          </button>
        ))}
      </div>

      {/* ── Results ── */}
      {movies.length === 0 ? (
        <div style={{ textAlign: "center", color: "#9ca3af", padding: "4rem 0" }}>
          <p style={{ fontSize: "1.5rem" }}>🎬</p>
          <p>No encontramos resultados para tu búsqueda.</p>
        </div>
      ) : (
        <>
          {isSearching && (
            <p style={{ color: "#9ca3af", marginBottom: "1rem", fontSize: "0.9rem" }}>
              {searchResult.data?.totalElements ?? movies.length} resultado(s) encontrado(s)
            </p>
          )}
          <div className="catalog-grid">
            {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>

          {/* ── Pagination ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "3rem", marginBottom: "2rem", alignItems: "center" }}>
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={navBtnStyle(page === 0)}>
              ← Anterior
            </button>
            <span style={{ color: "#9ca3af", fontWeight: "bold" }}>Página {page + 1}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={!hasNext} style={navBtnStyle(!hasNext)}>
              Siguiente →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
