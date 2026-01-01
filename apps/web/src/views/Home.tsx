import { useEffect, useMemo } from "react";
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { NoMoviesFound } from "../components/NoMoviesFound";
import { useMovies } from "../hooks/useMovies";
import { useFiltersContext } from "../context/FiltersContext";

function Home() {
    const { movies, loading, error, fetchMovies } = useMovies();
    const { filters } = useFiltersContext();
    
    const handleApplyFilters = () => {
        fetchMovies(filters);
    };
    
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
            <Header />
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
            <FilterSidebar onApply={handleApplyFilters}/>
            <footer className="p-4 text-center text-gray-300">
                <p>©Moviedeller - 2025</p>
            </footer>
        </div>
    );
}

export default Home;
