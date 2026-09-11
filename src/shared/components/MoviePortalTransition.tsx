export function MoviePortalTransition({ poster }: { poster: string }) {
  return <div className="movie-portal-transition" aria-label="Viajando hacia la película"><img src={poster} alt="" /><div className="movie-portal-vortex" /><p>ABRIENDO UNIVERSO</p></div>;
}
