import { useQuery } from "@tanstack/react-query";

import { catalogApi } from "../services/catalogApi";

export function useMovies(page = 0, size = 20) {
  return useQuery({
    queryKey: ["catalog", "movies", page, size],
    queryFn: () => catalogApi.getMovies(page, size),
  });
}

export function useMovieSearch(q: string, genre: string, page = 0, size = 20) {
  const isActive = q.trim().length > 0 || genre.trim().length > 0;
  return useQuery({
    queryKey: ["catalog", "search", q, genre, page, size],
    queryFn: () => catalogApi.searchMovies(q, genre, page, size),
    enabled: isActive,
    placeholderData: (prev) => prev,
  });
}


export function useCatalogHome() {
  return useQuery({
    queryKey: ["catalog", "home"],
    queryFn: catalogApi.getHome,
  });
}

export function useMovie(id?: string) {
  return useQuery({
    queryKey: ["catalog", "movie", id],
    queryFn: () => catalogApi.getMovie(id!),
    enabled: Boolean(id),
  });
}

export function useMovieSession(id?: string) {
  return useQuery({
    queryKey: ["catalog", "movie-session", id],
    queryFn: () => catalogApi.getMovieSession(id!),
    enabled: Boolean(id),
  });
}
