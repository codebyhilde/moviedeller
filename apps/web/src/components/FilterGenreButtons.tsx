import { useFiltersContext } from "../context/FiltersContext";

interface FilterGenreButtonsProps {
    genres: readonly string[];
}

export function FilterGenreButtons({ genres }: FilterGenreButtonsProps) {
    const { filters, handleFiltersChange } = useFiltersContext();

    return (
        <div className="flex flex-wrap gap-2">
            {genres.map(g => (
                <button
                    key={g}
                    onClick={() =>
                        handleFiltersChange(
                            "genre",
                            g === filters.genre ? "" : g
                        )
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
    );
}
