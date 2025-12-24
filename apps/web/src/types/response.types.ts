export interface Movie {
  id: string;
  imdb_id: string;
  year: number;
  director: string;
  duration: string;
  actors: string[];
  poster: string;
  rate: number;
  title: string;
  plot: string;
  genre: string[];
}

export interface MovieResponse {
  count: number;
  movies: Movie[];
}

export interface FilterState {
  lang: 'es' | 'en';
  actor?: string;
  year?: string;
  director?: string;
  genre?: string;
  min_rate?: number;
  max_rate?: number;
}