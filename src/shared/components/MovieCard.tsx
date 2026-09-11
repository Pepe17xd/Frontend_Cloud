import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Movie } from "../../modules/catalog/types/Movie";
import { FALLBACK_POSTER, getGenresLabel, getPosterUrl } from "../../modules/catalog/utils/movieImages";
import { MoviePortalTransition } from "./MoviePortalTransition";

type MovieCardProps = { movie: Movie; rank?: number };

export function MovieCard({ movie, rank }: MovieCardProps) {
  const navigate = useNavigate();
  const [travelling, setTravelling] = useState(false);
  const poster = getPosterUrl(movie);
  const enterMovie = () => {
    if (travelling) return;
    setTravelling(true);
    window.setTimeout(() => navigate(`/movie/${movie.id}`), 720);
  };

  return <><article className="movie-card"><button className="movie-card-action" onClick={enterMovie} aria-label={`Abrir ${movie.title}`}><div className="movie-poster-wrap">{rank ? <span className="movie-rank">{rank}</span> : null}<img className="movie-poster" src={poster} alt={`Póster de ${movie?.title || "película"}`} loading="lazy" onError={(event) => { event.currentTarget.src = FALLBACK_POSTER; }} /><div className="movie-overlay"><span className="round-play">▶</span><span className="detail-link">Viajar a la historia</span></div></div><div className="movie-info"><h3>{movie?.title || "Título no disponible"}</h3><p>{getGenresLabel(movie)}</p><span>★ {movie.rating}</span></div></button></article>{travelling ? <MoviePortalTransition poster={poster} /> : null}</>;
}
