import { useEffect, useCallback, useMemo } from "react";
import type { FilterState } from "./types/response.types";
import { Header } from "./components/Header";
import { MovieCard } from "./components/MovieCard";
import { FilterSidebar } from "./components/FilterSidebar";
import { NoMoviesFound } from "./components/NoMoviesFound";
import { useMovies } from "./hooks/useMovies";
import { useFilters } from "./hooks/useFilters";

function App() {
    const { movies, loading, error, fetchMovies } = useMovies();
    const { isFilterOpen, setIsFilterOpen, filters, setFilters, resetFilters } =
        useFilters();

    const handleOpenFilter = useCallback(
        () => setIsFilterOpen(true),
        [setIsFilterOpen]
    );
    const handleCloseFilter = useCallback(
        () => setIsFilterOpen(false),
        [setIsFilterOpen]
    );
    const handleApplyFilters = useCallback(
        (currentFilters: FilterState) => {
            fetchMovies(currentFilters);
        },
        [fetchMovies]
    );
    const handleResetFilters = useCallback(() => {
        resetFilters();
    }, [resetFilters]);

    // Cargar películas al montar el componente
    useEffect(() => {
        fetchMovies(filters);
    }, []);

    // Cards de peliculas memoizada para evitar re-renders innecesarios
    const movieCards = useMemo(() => {
        return movies?.map(movie => <MovieCard key={movie.id} movie={movie} />);
    }, [movies]);

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
            <Header onFilterOpen={handleOpenFilter} />
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {movieCards}
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
                onClose={handleCloseFilter}
                filters={filters}
                setFilters={setFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />
            <footer className="p-4 text-center text-gray-300">
                <p>©Moviedeller - 2025</p>
            </footer>
        </div>
    );
}

export default App;
