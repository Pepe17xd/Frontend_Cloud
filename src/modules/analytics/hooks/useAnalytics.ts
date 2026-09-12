import { useQuery } from "@tanstack/react-query";
import { getMostWatchedGenres, getMostPopularActors, getMostActiveClubs } from "../services/analyticsService";

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
