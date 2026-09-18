import { useState } from "react";
import { MovieCard } from "../../../shared/components/MovieCard";
import { CatalogState } from "../components/CatalogState";
import { useMovies } from "../hooks/useMovies";

export function ExplorePage() {
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const { data = [], isLoading, isError } = useMovies(page, pageSize);

  if (isLoading && page === 0) return <main className="page-shell"><CatalogState status="loading" /></main>;
  if (isError) return <main className="page-shell"><CatalogState status="error" /></main>;

  return (
    <main className="page-shell">
      <p className="page-eyebrow">CATÁLOGO</p>
      <h1>Explora nuevas historias</h1>
      <p className="page-lead">Películas elegidas para ver, comentar y compartir.</p>
      
      {data.length === 0 && page === 0 ? (
        <CatalogState status="empty" />
      ) : (
        <>
          <div className="catalog-grid">
            {data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))} 
              disabled={page === 0 || isLoading}
              style={{ padding: '0.5rem 1.5rem', background: '#374151', color: 'white', border: 'none', borderRadius: '4px', cursor: (page === 0 || isLoading) ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
            >
              ← Anterior
            </button>
            <span style={{ display: 'flex', alignItems: 'center', color: '#9ca3af', fontWeight: 'bold' }}>Página {page + 1}</span>
            <button 
              onClick={() => setPage(p => p + 1)} 
              disabled={data.length < pageSize || isLoading}
              style={{ padding: '0.5rem 1.5rem', background: '#374151', color: 'white', border: 'none', borderRadius: '4px', cursor: (data.length < pageSize || isLoading) ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
