export interface Movie {
  id: string;
  imdb_id: string;
  year: number | null;
  director: string | null;
  duration: string | null;
  actors: string[];
  poster: string | null;
  rate: number | null;
  translations: {
    en: MovieTranslation;
    es: MovieTranslation;
  };
}

export interface MovieTranslation {
  title: string;
  plot: string;
  genre: string[];
}