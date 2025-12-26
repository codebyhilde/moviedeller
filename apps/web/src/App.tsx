import { useEffect } from "react";
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

    // Cargar películas al montar el componente
    useEffect(() => {
        fetchMovies(filters);
    }, [fetchMovies]);

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
                onApply={() => fetchMovies(filters)}
                onReset={resetFilters}
            />
            <footer className="p-4 text-center text-gray-300">
                <p>©Moviedeller - 2025</p>
            </footer>
        </div>
    );
}

export default App;
