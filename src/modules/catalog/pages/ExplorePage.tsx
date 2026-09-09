import { MovieCard } from "../../../shared/components/MovieCard";
import { CatalogState } from "../components/CatalogState";
import { useMovies } from "../hooks/useMovies";

export function ExplorePage() {
  const { data = [], isLoading, isError } = useMovies();
  if (isLoading) return <main className="page-shell"><CatalogState status="loading" /></main>;
  if (isError) return <main className="page-shell"><CatalogState status="error" /></main>;
  if (data.length === 0) return <main className="page-shell"><CatalogState status="empty" /></main>;
  return <main className="page-shell"><p className="page-eyebrow">CATÁLOGO</p><h1>Explora nuevas historias</h1><p className="page-lead">Películas elegidas para ver, comentar y compartir.</p><div className="catalog-grid">{data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div></main>;
}
