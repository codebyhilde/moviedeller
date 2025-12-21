export interface MovieResponse {
  id: string;
  imdb_id: string;
  year: number | null;
  director: string | null;
  duration: string | null;
  actors: string[];
  poster: string | null;
  rate: number | null;
  title: string;
  plot: string;
  genre: string[];
}

export interface MoviesCollectionResponse {
  count: number;
  movies: MovieResponse[];
}
