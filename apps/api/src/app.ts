import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import {
    transformMovie,
    transformMoviesCollection
} from "./utils/movie-transformers.js";
import type { MoviesQueryParams } from "./types/requests.types.js";
import movies from "./data/movies.json" with { type: "json" };

const app: Express = express();

app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3001;

app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("¡Servidor de películas operativo!");
});

app.get(
    "/movies",
    (req: Request<{}, {}, {}, MoviesQueryParams>, res: Response) => {
        const {
            genre,
            year,
            actor,
            director,
            min_rating,
            max_rating,
            lang = "en"
        } = req.query;

        if (lang !== "en" && lang !== "es") {
            return res
                .status(400)
                .json({ error: "Language must be 'en' or 'es'" });
        }

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

        if (result.length === 0) {
            return res.status(404).json({ message: "No matching movies" });
        }

        // Transformación de resultados según idioma
        const response = transformMoviesCollection(result, lang);

        res.json(response);
    }
);

app.get("/movies/:imdb_id", (req: Request, res: Response) => {
    const { imdb_id } = req.params;
    const { lang = "es" } = req.query;

    const movie = movies.find(movie => movie.imdb_id === imdb_id);

    if (!movie) {
        return res.status(404).json({ message: "Movie not found!" });
    }

    // Validar lenguaje si se proporciona
    if (lang !== "en" && lang !== "es") {
        return res.status(400).json({ error: "Language must be 'en' or 'es'" });
    }

    const transformedMovie = transformMovie(movie, lang);

    res.json(transformedMovie);
});

app.listen(PORT, () => {
    console.log(`⚡ server running on http:localhost:${PORT}`);
});
