import { FilterGenreButtons } from "./FilterGenreButtons";
import { useFiltersContext } from "../context/FiltersContext";
import { GENRES, SPANISH_GENRES } from "../constants/genres";

export function FilterGenreSection() {
    const { filters } = useFiltersContext();

    return (
        <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Genre
            </h3>
            {filters.lang === "es" ? (
                <FilterGenreButtons genres={SPANISH_GENRES} />
            ) : (
                <FilterGenreButtons genres={GENRES} />
            )}
        </section>
    );
}
