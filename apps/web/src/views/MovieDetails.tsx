import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Star } from "lucide-react";
import { useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import { Loader } from "../components/Loader";
import { InfoSection } from "../components/InfoSection";
import type { Movie } from "../types/response.types";

export default function MovieDetails() {
    const { imdb_id } = useParams();
    const navigate = useNavigate();
    const { movie, loading, error, fetchMoviesByImdbId } = useMovies();

    useEffect(() => {
        fetchMoviesByImdbId(imdb_id);
    }, [imdb_id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-background-dark min-h-screen font-display text-white selection:bg-primary selection:text-white pb-20">
            <div className="relative h-[480px] w-full shrink-0">
                <div className="absolute top-4 left-4 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${movie.poster}')` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3 z-10">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-white text-4xl font-bold tracking-tight leading-tight">
                            {movie.title}
                        </h1>
                        <div className="flex items-center gap-3 text-gray-300 text-sm font-medium mt-1">
                            <span>{movie.year}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                            <span>{movie.duration}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white uppercase tracking-wider">
                                PG-13
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <a
                            href={`https://www.imdb.com/title/${imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-12 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center gap-2 font-semibold shadow-[0_0_20px_rgba(79,71,230,0.4)] transition-all active:scale-95 cursor-pointer"
                        >
                            <Eye className="w-5 h-5" />
                            See on IMDb
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 px-5 relative z-10 -mt-2">
                <div className="flex justify-between items-center bg-surface-dark/50 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                    <div className="flex flex-col items-center gap-1 flex-1 border-r border-white/10">
                        <div className="flex items-center gap-1">
                            <Star className="text-amber-gold w-5 h-5 fill-current" />
                            <span className="text-white text-lg font-bold">
                                {movie.rate}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400">
                            IMDb Rating
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1 border-white/10">
                        <div className="text-white text-lg font-bold">96%</div>
                        <span className="text-xs text-gray-400">
                            Rotten Tomatoes
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto w-full pb-2">
                    {movie.genre.map((g, i) => (
                        <div
                            key={g}
                            className="px-2.5 h-8 flex items-center rounded-full bg-primary/10 text-primary-light text-[10px] font-medium border border-primary/20 whitespace-nowrap"
                        >
                            <p className="text-xs font-medium">{g}</p>
                        </div>
                    ))}
                </div>
                <InfoSection title="Storyline">
                    <p className="text-gray-300 text-base leading-relaxed lg:text-lg lg:leading-loose">
                        {movie.plot}
                    </p>
                </InfoSection>
                <InfoSection title="Director">
                    <p className="text-white font-medium text-lg">
                        {movie.director}
                    </p>
                </InfoSection>
                <InfoSection title="Main Actors">
                    {movie.actors?.map((actor, index) => (
                        <p className="text-white text-lg" key={index}>
                            {actor}
                        </p>
                    ))}
                </InfoSection>
            </div>
        </div>
    );
}
