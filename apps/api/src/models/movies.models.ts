import movies from "../data/movies.json" with { type: "json" };
import type { MoviesQueryParams } from "../types/requests.types.js";

export class MovieModel {
    static async getAll({
        genre,
        year,
        actor,
        director,
        min_rating,
        max_rating,
        lang = "en"
    }: MoviesQueryParams) {
        let result = [...movies];
        
        // Filtro por género
        if (genre) {
            const genreLower = genre.toLowerCase();
            result = result.filter(
                movie =>
                    movie.translations[lang as "en" | "es"]?.genre?.some(
                        (g: string) => g.toLowerCase() === genreLower
                    ) ?? false
            );
        }

        // Filtro por año
        if (year) {
            const yearNum = parseInt(year);
            if (!isNaN(yearNum)) {
                result = result.filter(movie => movie.year === yearNum);
            }
        }

        // Filtro por actor
        if (actor) {
            const actorLower = actor.toLowerCase();
            result = result.filter(movie =>
                movie.actors.some((a: string) =>
                    a.toLowerCase().includes(actorLower)
                )
            );
        }

        // Filtro por director
        if (director) {
            const directorLower = director.toLowerCase();
            result = result.filter(
                movie => movie.director?.toLowerCase().includes(directorLower)
            );
        }

        // Filtro por rating mínimo
        if (min_rating) {
            const minRating = parseFloat(min_rating);
            if (!isNaN(minRating)) {
                result = result.filter(
                    movie => movie.rate !== null && movie.rate >= minRating
                );
            }
        }

        // Filtro por rating máximo
        if (max_rating) {
            const maxRating = parseFloat(max_rating);
            if (!isNaN(maxRating)) {
                result = result.filter(
                    movie => movie.rate !== null && movie.rate <= maxRating
                );
            }
        }

        return result;
    }

    static async getByImdbId({ imdbId }: {imdbId: string}) {
        const movie = movies.find(movie => movie.imdb_id === imdbId);
        
        return movie;
    }
}
