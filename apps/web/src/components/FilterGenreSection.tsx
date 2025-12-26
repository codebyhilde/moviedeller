import type { FilterState } from "../types/response.types";
import { FilterGenreButtons } from "./FilterGenreButtons";
import { GENRES, SPANISH_GENRES } from "../constants/genres";

interface FilterGenreSectionProps {
    filters: FilterState;
    handleChange: (key: keyof FilterState, value: string | number) => void;
}

export function FilterGenreSection({
    filters,
    handleChange
}: FilterGenreSectionProps) {
    return (
        <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Genre
            </h3>
            {filters.lang === "es" ? (
                <FilterGenreButtons
                    genres={SPANISH_GENRES}
                    filters={filters}
                    handleChange={handleChange}
                />
            ) : (
                <FilterGenreButtons
                    genres={GENRES}
                    filters={filters}
                    handleChange={handleChange}
                />
            )}
        </section>
    );
}
