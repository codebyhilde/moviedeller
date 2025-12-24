import React, { useEffect, useState } from "react";
import type { MovieResponse, FilterState } from "./types/response.types";
import { Header } from "./components/Header";
import { MovieCard } from "./components/MovieCard";

const API_URL = import.meta.env.API_URL ?? "http://localhost:3001/movies";

function App() {
  const [movies, setMovies] = useState<MovieResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data: MovieResponse = await response.json();
      setMovies(data.movies);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }
  
  // Cargar películas al montar el componente
  useEffect(() => {
    fetchMovies();
  }, []);
  
  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-background-dark min-h-screen font-display text-white selection:bg-primary selection:text-white pb-20">
    <Header />
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {movies && (
          movies.map((movie, index) => {
          return <MovieCard key={movie.id} movie={movie} />
          })
        )}
      </div>
    </main>
    <footer className="p-4 text-center text-gray-300">
      <p>©Moviedeller - 2024</p>
    </footer>
    </div>
  )
}

export default App
