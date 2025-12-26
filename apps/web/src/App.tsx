import { useEffect, useState, useMemo } from "react";
import type { Movie, MovieResponse, FilterState } from "./types/response.types";
import { Header } from "./components/Header";
import { MovieCard } from "./components/MovieCard";
import { FilterSidebar } from "./components/FilterSidebar";
import { NoMoviesFound } from "./components/NoMoviesFound";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/movies";

function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const initialFiltersState: FilterState = useMemo(() => ({
        genre: "",
        year: "",
        actor: "",
        director: "",
        min_rating: 0,
        max_rating: 10,
        lang: "en"
    }), []);
    
    const [filters, setFilters] = useState<FilterState>(initialFiltersState);
    
    const resetFilters = () => {
      setFilters(initialFiltersState);
    }
    
    const fetchMovies = async () => {
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
    };

    // Cargar películas al montar el componente
    useEffect(() => {
        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="bg-background-dark min-h-screen font-display text-white selection:bg-primary selection:text-white pb-20">
                <div className="h-40 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-dark min-h-screen font-display text-white selection:bg-primary selection:text-white pb-20">
            <Header onFilterOpen={() => setIsFilterOpen(true)} />
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {movies &&
                        movies.map(movie => {
                            return <MovieCard key={movie.id} movie={movie} />;
                        })}
                </div>
                {!loading && movies?.length === 0 && (
                    <NoMoviesFound
                        errorMessage={
                            error ?? "No movies found matching your criteria."
                        }
                    />
                )}
            </main>
            <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                setFilters={setFilters}
                onApply={fetchMovies}
                onReset={resetFilters}
            />
            <footer className="p-4 text-center text-gray-300">
                <p>©Moviedeller - 2025</p>
            </footer>
        </div>
    );
}

export default App;
