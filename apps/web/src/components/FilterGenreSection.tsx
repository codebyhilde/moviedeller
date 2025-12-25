import type { FilterState } from "../types/response.types";

interface FilterGenreSectionProps {
    filters: FilterState;
    handleChange: (key: keyof FilterState, value: string | number) => void;
}

export function FilterGenreSection({ filters, handleChange }: FilterGenreSectionProps) {
    const genres = [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film-Noir",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Sport",
        "Thriller",
        "War",
        "Western"
    ];

    return (
        <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Genre
            </h3>
            <div className="flex flex-wrap gap-2">
                {genres.map(g => (
                    <button
                        key={g}
                        onClick={() =>
                            handleChange("genre", g === filters.genre ? "" : g)
                        }
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-[background-color,color,box-shadow,border-color] duration-200 ${
                            filters.genre === g
                                ? "bg-electric-gradient text-white shadow-lg shadow-indigo-500/20"
                                : "bg-surface-dark text-slate-400 border border-white/5 hover:border-white/10"
                        }`}
                    >
                        {g}
                    </button>
                ))}
            </div>
        </section>
    );
}
