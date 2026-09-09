export interface Movie {
  id: string;
  title: string;
  description: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  genres: string[];
  rating: number;
  durationMinutes: number;
}

export interface MovieSection { name: string; movies: Movie[]; }
export interface MovieHomeResponse { featuredMovie: Movie | null; sections: MovieSection[]; }
export interface MovieArtist { name: string; biography: string | null; photoUrl: string | null; type: string; }
export interface MovieDetailResponse extends Movie { artists: MovieArtist[]; }
export interface MovieStream { url: string; type: string; }
export interface MovieSessionResponse { movieId: string; title: string; durationMinutes: number; stream: MovieStream | null; subtitles: unknown[]; }
