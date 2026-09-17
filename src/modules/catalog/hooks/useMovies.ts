import { useQuery } from "@tanstack/react-query";

import { catalogApi } from "../services/catalogApi";

export function useMovies(page = 0, size = 20) {
  return useQuery({
    queryKey: ["catalog", "movies", page, size],
    queryFn: () => catalogApi.getMovies(page, size),
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
