import { useQuery } from "@tanstack/react-query";
import { getMostWatchedGenres, getMostPopularActors, getMostActiveClubs, getKpis, getEngagementFunnel, getGenreEngagement, getPeakHours, getContentGapAnalysis, getMovieLifecycle } from "../services/analyticsService";

export const useMostWatchedGenres = () => {
  return useQuery({
    queryKey: ["analytics", "genres"],
    queryFn: getMostWatchedGenres,
  });
};

export const useMostPopularActors = () => {
  return useQuery({
    queryKey: ["analytics", "actors"],
    queryFn: getMostPopularActors,
  });
};

export const useMostActiveClubs = () => {
  return useQuery({
    queryKey: ["analytics", "clubs"],
    queryFn: getMostActiveClubs,
  });
};

export const useKpis = () => useQuery({ queryKey: ["analytics", "kpis"], queryFn: getKpis });
export const useEngagementFunnel = () => useQuery({ queryKey: ["analytics", "funnel"], queryFn: getEngagementFunnel });
export const useGenreEngagement = () => useQuery({ queryKey: ["analytics", "genre-engagement"], queryFn: getGenreEngagement });
export const usePeakHours = () => useQuery({ queryKey: ["analytics", "peak-hours"], queryFn: getPeakHours });
export const useContentGapAnalysis = () => useQuery({ queryKey: ["analytics", "content-gap"], queryFn: getContentGapAnalysis });
export const useMovieLifecycle = () => useQuery({ queryKey: ["analytics", "movie-lifecycle"], queryFn: getMovieLifecycle });
