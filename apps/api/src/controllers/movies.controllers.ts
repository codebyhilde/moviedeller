import { MovieModel } from "../models/movies.models.js";
import {
    transformMovie,
    transformMoviesCollection
} from "../utils/movie-transformers.js";
import type { Request, Response } from "express";
import type { MoviesQueryParams } from "../types/requests.types.js";

export class MovieController {
    static async getAll(
        req: Request<{}, {}, {}, MoviesQueryParams>,
        res: Response
    ) {
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

        const movies = await MovieModel.getAll({
            genre,
            year,
            actor,
            director,
            min_rating,
            max_rating,
            lang
        });

        if (movies.length === 0) {
            return res.status(404).json({ message: "No matching movies" });
        }

        const transformedMovies = transformMoviesCollection(movies, lang);

        res.json(transformedMovies);
    }

    static async getByImdbId(req: Request, res: Response) {
        const { imdb_id } = req.params;
        const { lang = "en" } = req.query;

        // Validar lenguaje si se proporciona
        if (lang !== "en" && lang !== "es") {
            return res
                .status(400)
                .json({ error: "Language must be 'en' or 'es'" });
        }

        const movie = await MovieModel.getByImdbId({ imdbId: imdb_id });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        const transformedMovie = transformMovie(movie, lang);

        res.json(transformedMovie);
    }
}
