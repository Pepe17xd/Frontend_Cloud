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
  const { data } = await analyticsClient.get("/api/v1/genres/most-watched");
  return data;
};

export const getMostPopularActors = async (): Promise<ActorStat[]> => {
  const { data } = await analyticsClient.get("/api/v1/actors/most-popular?actor_type=ACTOR&limit=5");
  return data;
};

export const getMostActiveClubs = async (): Promise<ClubStat[]> => {
  const { data } = await analyticsClient.get("/api/v1/clubs/most-active?limit=5");
  return data;
};

export interface KpiData {
  total_movies: string; total_users: string; total_clubs: string;
  total_watch_rooms: string; total_interactions: string; avg_rating: string;
}
export interface EngagementFunnel {
  step: string; count: string;
}
export interface GenreEngagement {
  genre: string; total_movies: string; total_watch_rooms: string;
  avg_rating: string; total_reviews: string; total_likes: string;
}
export interface PeakHour {
  hour: string; total_rooms: string;
}
export interface ContentGap {
  genre: string; catalog_count: string; watch_room_count: string; gap_score: string;
}
export interface MovieLifecycle {
  title: string; catalog_rating: string; avg_user_score: string;
  total_likes: string; total_rooms: string;
}

export const getKpis = async (): Promise<KpiData[]> => { const { data } = await analyticsClient.get("/api/v1/dashboard/kpis"); return data; };
export const getEngagementFunnel = async (): Promise<EngagementFunnel[]> => { const { data } = await analyticsClient.get("/api/v1/dashboard/engagement-funnel"); return data; };
export const getGenreEngagement = async (): Promise<GenreEngagement[]> => { const { data } = await analyticsClient.get("/api/v1/dashboard/genre-engagement"); return data; };
export const getPeakHours = async (): Promise<PeakHour[]> => { const { data } = await analyticsClient.get("/api/v1/dashboard/peak-hours"); return data; };
export const getContentGapAnalysis = async (): Promise<ContentGap[]> => { const { data } = await analyticsClient.get("/api/v1/dashboard/content-gap-analysis"); return data; };
export const getMovieLifecycle = async (): Promise<MovieLifecycle[]> => { const { data } = await analyticsClient.get("/api/v1/dashboard/movie-lifecycle"); return data; };
