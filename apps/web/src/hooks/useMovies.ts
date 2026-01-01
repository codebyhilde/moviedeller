import { useState, useCallback } from "react";
import type {
    Movie,
    MovieResponse,
    FilterState
} from "../types/response.types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/movies";

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movie, setMovie] = useState<Movie>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMovies = useCallback(async (filters: FilterState) => {
        try {
            setLoading(true);
            setError(null);
            setMovies([]);

            // Construir query string con filtros
            const queryParams = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    queryParams.append(key, value);
                }
            });

            const url = `${API_URL}?${queryParams.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }

            const data: MovieResponse = await response.json();
            setMovies(data.movies);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMoviesByImdbId = useCallback(async (imdb_id: string) => {
        try {
            setLoading(true);
            setError(null);
            setMovie({});

            const url = `${API_URL}/${imdb_id}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }

            const data: Movie = await response.json();
            setMovie(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    }, []);

    return { movie, movies, loading, error, fetchMovies, fetchMoviesByImdbId };
}
