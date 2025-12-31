import { useFiltersContext } from "../context/FiltersContext";
import { FilterInputError } from "./FilterInputError";
import { UserSearch, Film } from "lucide-react";

export function FilterPeopleSection() {
    const { filters, handleFiltersChange, validateName, filterFormatErrors } =
        useFiltersContext();

    return (
        <section className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Actor
                </label>
                <div className="relative">
                    <UserSearch className="absolute left-3 top-3 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search actor..."
                        value={filters.actor || ""}
                        onChange={e => {
                            handleFiltersChange("actor", e.target.value);
                            validateName("actor", e.target.value);
                        }}
                        className="w-full bg-surface-dark border border-white/5 hover:border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-primary/50 transition-shadow transition-colors"
                    />
                    {filterFormatErrors.actor && (
                        <FilterInputError error={filterFormatErrors.actor} />
                    )}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Director
                </label>
                <div className="relative">
                    <Film className="absolute left-3 top-3 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search director..."
                        value={filters.director || ""}
                        onChange={e => {
                            handleFiltersChange("director", e.target.value);
                            validateName("director", e.target.value);
                        }}
                        className="w-full bg-surface-dark border border-white/5 hover:border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-primary/50 transition-shadow transition-colors"
                    />
                    {filterFormatErrors.director && (
                        <FilterInputError error={filterFormatErrors.director} />
                    )}
                </div>
            </div>
        </section>
    );
}
