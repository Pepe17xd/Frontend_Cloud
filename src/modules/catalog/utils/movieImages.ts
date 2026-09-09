import type { Movie } from "../types/Movie";

export const FALLBACK_BACKDROP = "/catalog-backdrop-fallback.svg";
export const FALLBACK_POSTER = "/catalog-poster-fallback.svg";

export function getBackdropUrl(movie?: Pick<Movie, "backdropUrl"> | null) {
  return movie?.backdropUrl || FALLBACK_BACKDROP;
}

export function getPosterUrl(movie?: Pick<Movie, "posterUrl"> | null) {
  return movie?.posterUrl || FALLBACK_POSTER;
}

export function getGenresLabel(movie?: Pick<Movie, "genres"> | null) {
  return movie?.genres?.filter(Boolean).join(" · ") || "Sin género disponible";
}

export function getDurationLabel(durationMinutes?: number) {
  return typeof durationMinutes === "number" && durationMinutes > 0 ? `${durationMinutes} min` : "Duración no disponible";
}
