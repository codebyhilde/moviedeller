import type { Movie } from "../types/response.types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link to={`/movie/${movie.imdb_id}`} className="block">
            <article className="group relative flex bg-surface-dark rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/30 transition-[transform,box-shadow,border-color] duration-300 hover:shadow-primary/5 hover:-translate-y-1 h-48">
                <div className="w-32 shrink-0 bg-slate-800 relative overflow-hidden">
                    <img
                        src={movie.poster}
                        alt={`Poster de la película: ${movie.title}`}
                        className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-center">
                    <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-primary-light transition-colors">
                            {movie.title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                        <span>{movie.year}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                        <span className="text-xs border border-slate-600 px-1.5 rounded text-slate-400">
                            {movie.duration}
                        </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                        {movie.plot}
                    </p>

                    <div className="flex content-center gap-1.5 mb-2">
                        <Star className="text-amber-gold h-5 fill-current" />
                        <span className="text-amber-gold font-bold text-base">
                            {movie.rate}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {movie.genre.slice(0, 3).map(g => (
                            <span
                                key={g}
                                className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-light text-[10px] font-medium border border-primary/20 whitespace-nowrap"
                            >
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </Link>
    );
}
