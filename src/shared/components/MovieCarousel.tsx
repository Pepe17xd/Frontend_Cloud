import type { Movie } from "../../modules/catalog/types/Movie";
import { MovieCard } from "./MovieCard";

type MovieCarouselProps = { title: string; eyebrow?: string; movies: Movie[] };

export function MovieCarousel({ title, eyebrow, movies }: MovieCarouselProps) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>{eyebrow ? <p>{eyebrow}</p> : null}<h2>{title}</h2></div>
        <span className="see-all">Ver todo →</span>
      </div>
      <div className="movie-carousel">
        {movies.map((movie, index) => <MovieCard key={movie.id} movie={movie} rank={index + 1} />)}
      </div>
    </section>
  );
}
