export interface MoviesQueryParams {
  genre?: string;
  year?: string;
  actor?: string;
  director?: string;
  min_rating?: string;
  max_rating?: string;
  lang?: 'en' | 'es';
}
