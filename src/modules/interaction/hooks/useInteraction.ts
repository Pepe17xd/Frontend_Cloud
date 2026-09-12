import { useQuery } from "@tanstack/react-query";
import { interactionApi } from "../services/interactionApi";

export const useUserLikes = (userId?: number) => {
  return useQuery({
    queryKey: ["interaction", "likes", userId],
    queryFn: () => interactionApi.getUserLikes(userId!),
    enabled: !!userId,
  });
};

export const useUserWatchlist = (userId?: number) => {
  return useQuery({
    queryKey: ["interaction", "watchlist", userId],
    queryFn: () => interactionApi.getUserWatchlist(userId!),
    enabled: !!userId,
  });
};
