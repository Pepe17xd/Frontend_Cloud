import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useToggleLike = (userId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ movieId, isLiked }: { movieId: string, isLiked: boolean }) => {
      if (isLiked) {
        await interactionApi.removeLike(movieId);
      } else {
        await interactionApi.addLike(movieId);
      }
    },
    onSuccess: () => {
      if (userId) queryClient.invalidateQueries({ queryKey: ["interaction", "likes", userId] });
    }
  });
};

export const useToggleWatchlist = (userId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ movieId, inWatchlist }: { movieId: string, inWatchlist: boolean }) => {
      if (inWatchlist) {
        await interactionApi.removeFromWatchlist(userId!, movieId);
      } else {
        await interactionApi.addToWatchlist(userId!, movieId);
      }
    },
    onSuccess: () => {
      if (userId) queryClient.invalidateQueries({ queryKey: ["interaction", "watchlist", userId] });
    }
  });
};
