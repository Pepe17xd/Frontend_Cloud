import { Link } from "react-router-dom";

import type { Movie } from "../../modules/catalog/types/Movie";
import { getBackdropUrl, getDurationLabel, getGenresLabel } from "../../modules/catalog/utils/movieImages";

type HeroBannerProps = { movie: Movie };

export function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 5, 16, .99) 2%, rgba(5, 5, 16, .76) 43%, rgba(5, 5, 16, .08) 76%), linear-gradient(0deg, #050510 0%, transparent 42%), url(${getBackdropUrl(movie)})` }}>
      <i className="hero-planet" aria-hidden="true" />
      <div className="hero-content">
        <span className="hero-astra">ASTRA</span>
        <span className="live-pill"><i /> EN CARTELERA</span>
        <p className="hero-kicker">UNA NUEVA FORMA DE VIVIR EL CINE</p>
        <h1>Historias que<br /><em>orbitan mejor juntos.</em></h1>
        <p className="hero-featured">{movie?.title || "Una historia lista para descubrir"}</p><p>Una experiencia compartida entre mundos, pantallas y personas.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to={`/movie/${movie.id}`}>▶ <span>Ver película</span></Link>
          <Link className="button button-secondary" to={`/cinema/${movie.id}`}>✦ <span>Crear Órbita</span></Link>
        </div>
        <div className="hero-meta"><span>★ {movie.rating}</span><span>{getGenresLabel(movie)}</span><span>{getDurationLabel(movie.durationMinutes)}</span><span className="quality">4K</span></div>
      </div>
    </section>
  );
}
