import axios from "axios";

const interactionClient = axios.create({
  baseURL: import.meta.env.VITE_INTERACTION_API_URL,
  headers: { "Content-Type": "application/json" },
});

export interface InteractionMovie {
  id: string;
  title: string;
  poster_url: string;
}

export interface InteractionResponse {
  total: number;
  skip: number;
  limit: number;
  items: InteractionMovie[];
}

export const interactionApi = {
  async getUserLikes(userId: number): Promise<InteractionMovie[]> {
    const { data } = await interactionClient.get<InteractionResponse>(`/api/v1/users/${userId}/likes`);
    return data.items || [];
  },
  
  async getUserWatchlist(userId: number): Promise<InteractionMovie[]> {
    const { data } = await interactionClient.get<InteractionResponse>(`/api/v1/users/${userId}/watchlist`);
    return data.items || [];
  }
};
