import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { communityApi } from "../services/communityApi";
import type { CreateClubInput } from "../types/Club";

const clubsQueryKey = ["community", "clubs"];

export function useClubs() {
  return useQuery({ queryKey: clubsQueryKey, queryFn: () => communityApi.listClubs() });
}

export function useCreateClub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateClubInput) => communityApi.createClub(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: clubsQueryKey }),
  });
}

export function useJoinClub() {
  return useMutation({ mutationFn: (clubId: number) => communityApi.joinClub(clubId) });
}
