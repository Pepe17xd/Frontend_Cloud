import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCreateWatchRoom } from "../../community/hooks/useWatchRooms";
import { useAuth } from "../../auth/hooks/useAuth";
import { CatalogState } from "../components/CatalogState";
import { useMovie } from "../hooks/useMovies";
import { getBackdropUrl, getDurationLabel, getGenresLabel } from "../utils/movieImages";

export function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError } = useMovie(id);
  const createWatchRoom = useCreateWatchRoom();
  const { user } = useAuth();
  const [orbitError, setOrbitError] = useState<string | null>(null);
  const handleCreateOrbit = async () => {
    if (!movie) return;
    setOrbitError(null);
    try {
      if (!user) throw new Error("Debes iniciar sesión para crear una órbita.");
      const room = await createWatchRoom.mutateAsync({
        movieId: movie.id,
        hostUserId: user.id,
        clubId: null,
      });
      navigate(`/orbit/${room.code}`);
    } catch (error) {
      setOrbitError(error instanceof Error ? error.message : "No pudimos crear la órbita.");
    }
  };
  if (isLoading) return <main className="page-shell"><CatalogState status="loading" /></main>;
  if (isError) return <main className="page-shell"><CatalogState status="error" /></main>;
  if (!movie) return <main className="page-shell"><h1>Película no encontrada</h1><Link to="/explore">Volver al catálogo</Link></main>;
  return <main className="movie-detail" style={{ backgroundImage: `linear-gradient(90deg, #08080b 4%, rgba(8,8,11,.88) 47%, rgba(8,8,11,.25)), linear-gradient(0deg, #08080b, transparent 45%), url(${getBackdropUrl(movie)})` }}><div className="detail-content"><Link to="/explore" className="back-link">← Volver a explorar</Link><p className="page-eyebrow">ASTRA PRESENTA</p><h1>{movie.title || "Título no disponible"}</h1><div className="detail-meta"><strong>★ {movie.rating}</strong><span>{getGenresLabel(movie)}</span><span>{getDurationLabel(movie.durationMinutes)}</span><span className="quality">4K</span></div><p className="detail-description">{movie.description || "Sin sinopsis disponible."}</p><div className="hero-actions"><Link className="button button-primary" to={`/cinema/${movie.id}`}>▶ Ver ahora</Link><button className="button button-secondary" onClick={handleCreateOrbit} disabled={createWatchRoom.isPending}>✦ {createWatchRoom.isPending ? "Creando órbita…" : "Crear Órbita"}</button></div>{orbitError ? <p className="orbit-action-error" role="alert">{orbitError}</p> : null}</div></main>;
}
