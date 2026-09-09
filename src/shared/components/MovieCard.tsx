import { Link } from "react-router-dom";

import type { Movie } from "../../modules/catalog/types/Movie";
import { FALLBACK_POSTER, getGenresLabel, getPosterUrl } from "../../modules/catalog/utils/movieImages";

type MovieCardProps = { movie: Movie; rank?: number };

export function MovieCard({ movie, rank }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-poster-wrap">
        {rank ? <span className="movie-rank">{rank}</span> : null}
        <img className="movie-poster" src={getPosterUrl(movie)} alt={`Póster de ${movie?.title || "película"}`} loading="lazy" onError={(event) => { event.currentTarget.src = FALLBACK_POSTER; }} />
        <div className="movie-overlay">
          <Link className="round-play" to={`/movie/${movie.id}`} aria-label={`Ver detalle de ${movie.title}`}>▶</Link>
          <Link className="detail-link" to={`/movie/${movie.id}`}>Ver detalle</Link>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie?.title || "Título no disponible"}</h3>
        <p>{getGenresLabel(movie)}</p>
        <span>★ {movie.rating}</span>
      </div>
    </article>
  );
}
