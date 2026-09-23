import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { communityApi } from "../services/communityApi";
import type { CreateClubInput } from "../types/Club";

const clubsQueryKey = ["community", "clubs"];

export function useClubs(page: number = 1, search: string = "") {
  return useQuery({ 
    queryKey: [...clubsQueryKey, page, search], 
    queryFn: () => communityApi.listClubs(page, search) 
  });
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
