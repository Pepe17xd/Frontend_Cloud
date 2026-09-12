import axios from "axios";

const interactionClient = axios.create({
  baseURL: import.meta.env.VITE_INTERACTION_API_URL || "https://ipg8mwz20b.execute-api.us-east-1.amazonaws.com",
  headers: { "Content-Type": "application/json" },
});

interactionClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("astra.accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
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
  },

  async addLike(movieId: string): Promise<void> {
    await interactionClient.post(`/api/v1/movies/${movieId}/like`);
  },
  
  async removeLike(movieId: string): Promise<void> {
    await interactionClient.delete(`/api/v1/movies/${movieId}/like`);
  },
  
  async addToWatchlist(userId: number, movieId: string): Promise<void> {
    await interactionClient.post(`/api/v1/users/${userId}/watchlist`, { movie_id: movieId });
  },
  
  async removeFromWatchlist(userId: number, movieId: string): Promise<void> {
    await interactionClient.delete(`/api/v1/users/${userId}/watchlist/${movieId}`);
  }
};
