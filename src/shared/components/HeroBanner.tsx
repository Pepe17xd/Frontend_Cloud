import { Link } from "react-router-dom";

import type { Movie } from "../../modules/catalog/types/Movie";
import { getBackdropUrl, getDurationLabel, getGenresLabel } from "../../modules/catalog/utils/movieImages";

type HeroBannerProps = { movie: Movie };

export function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(6, 6, 8, .98) 2%, rgba(6, 6, 8, .76) 43%, rgba(6, 6, 8, .12) 76%), linear-gradient(0deg, #09090b 0%, transparent 35%), url(${getBackdropUrl(movie)})` }}>
      <div className="hero-content">
        <span className="live-pill"><i /> EN CARTELERA</span>
        <p className="hero-kicker">UNA NUEVA FORMA DE VIVIR EL CINE</p>
        <h1>{movie?.title || "El cine ya no"}</h1>
        <p>Explora mundos. Comparte historias. Viaja con otros.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to={`/movie/${movie.id}`}>▶ <span>Ver película</span></Link>
          <Link className="button button-secondary" to={`/cinema/${movie.id}`}>✦ <span>Crear Órbita</span></Link>
        </div>
        <div className="hero-meta"><span>★ {movie.rating}</span><span>{getGenresLabel(movie)}</span><span>{getDurationLabel(movie.durationMinutes)}</span><span className="quality">4K</span></div>
      </div>
    </section>
  );
}
