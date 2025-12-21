import type { Movie } from "../types/movie.types.js";
import type { MovieResponse } from "../types/response.types.js";

export function transformMovie(
    movie: Movie,
    language: "en" | "es"
): MovieResponse {
    const translation = movie.translations[language];

    return {
        id: movie.id,
        imdb_id: movie.imdb_id,
        year: movie.year,
        director: movie.director,
        duration: movie.duration,
        actors: movie.actors,
        poster: movie.poster,
        rate: movie.rate,
        title: translation.title,
        plot: translation.plot,
        genre: translation.genre
    };
}

export function transformMoviesCollection(
    movies: Movie[],
    language: "en" | "es"
) {
    const transformed = movies.map(movie => transformMovie(movie, language));

    return {
        count: transformed.length,
        movies: transformed
    };
}
