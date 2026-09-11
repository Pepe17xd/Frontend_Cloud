import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { HeroBanner } from "../../../shared/components/HeroBanner";
import { MovieCarousel } from "../../../shared/components/MovieCarousel";
import { BlackHoleLink } from "../../../shared/components/BlackHoleLink";
import { CatalogState } from "../components/CatalogState";
import { useCatalogHome } from "../hooks/useMovies";

const orbitMetadata = [
  { host: "Lucas", viewers: 12, color: "#6558e8" },
  { host: "Valeria", viewers: 8, color: "#536b8f" },
  { host: "Mateo", viewers: 19, color: "#765b78" },
];

export function HomePage() {
  const { data, isLoading, isError } = useCatalogHome();
  const featured = data?.featuredMovie;

  if (isLoading) return <main className="loading-page"><CatalogState status="loading" /></main>;
  if (isError) return <main className="loading-page"><CatalogState status="error" /></main>;
  if (!featured) return <main className="loading-page"><CatalogState status="empty" /></main>;

  return (
    <main>
      <HeroBanner movie={featured} />
      {data.sections.filter((section) => section.movies.length > 0).map((section) => (
        <MovieCarousel key={section.name} title={section.name} eyebrow="TENDENCIAS ESTA SEMANA" movies={section.movies} />
      ))}
      <section className="content-section rooms-section">
        <div className="section-heading"><div><p>AHORA MISMO</p><h2>Órbitas activas</h2></div><Link to="/clubs" className="see-all">Explorar clubes →</Link></div>
        <div className="rooms-grid">
          {(data.sections.flatMap((section) => section.movies)).slice(0, 3).map((movie, index) => {
            const orbit = orbitMetadata[index];
            return (
              <article className="room-card" key={movie.id} style={{ "--room-accent": orbit.color } as CSSProperties}>
                <div className="room-live"><span>● LIVE</span><span>{orbit.viewers} viendo</span></div>
                <div className="room-visual"><span>▶</span></div>
                <div className="room-content"><h3>Órbita {movie.title}</h3><p><span className="mini-avatar">{orbit.host[0]}</span> Guiada por {orbit.host}</p><Link to={`/cinema/${movie.id}`}>Entrar en órbita <span>→</span></Link></div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="community-cta">
        <div><span>COMUNIDAD ASTRA</span><h2>Explora mundos junto a<br />quienes aman el cine.</h2><p>Únete a clubes, comparte listas y haz que cada historia se convierta en una experiencia compartida.</p></div>
        <BlackHoleLink className="button button-primary" to="/clubs">Explorar clubes</BlackHoleLink>
      </section>
    </main>
  );
}
