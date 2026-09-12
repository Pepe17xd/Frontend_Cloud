import axios from "axios";

const analyticsClient = axios.create({
  baseURL: import.meta.env.VITE_ANALYTICS_API_URL || "https://cnwsv2rkvh.execute-api.us-east-1.amazonaws.com",
  headers: { "Content-Type": "application/json" },
});

export interface GenreStat {
  genre: string;
  total_reproducciones: string;
}

export interface ActorStat {
  artist_name: string;
  artist_type: string;
  peliculas_en_catalogo: string;
  total_reproducciones: string;
}

export interface ClubStat {
  club_name: string;
  visibility: string;
  total_miembros: string;
  total_salas: string;
}

export const getMostWatchedGenres = async (): Promise<GenreStat[]> => {
  const { data } = await analyticsClient.get("/v1/genres/most-watched");
  return data;
};

export const getMostPopularActors = async (): Promise<ActorStat[]> => {
  const { data } = await analyticsClient.get("/v1/actors/most-popular?actor_type=ACTOR&limit=5");
  return data;
};

export const getMostActiveClubs = async (): Promise<ClubStat[]> => {
  const { data } = await analyticsClient.get("/v1/clubs/most-active?limit=5");
  return data;
};
