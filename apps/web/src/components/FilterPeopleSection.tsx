import { UserSearch, Film } from "lucide-react";
import type { FilterState } from "../types/response.types";

interface FilterPeopleSectionProps {
    filters: FilterState;
    handleChange: (key: keyof FilterState, value: string | number) => void;
}

export function FilterPeopleSection({
    filters,
    handleChange
}: FilterPeopleSectionProps) {
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
                        onChange={e => handleChange("actor", e.target.value)}
                        className="w-full bg-surface-dark border border-white/5 hover:border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-primary/50 transition-shadow transition-colors"
                    />
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
                        onChange={e => handleChange("director", e.target.value)}
                        className="w-full bg-surface-dark border border-white/5 hover:border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-primary/50 transition-shadow transition-colors"
                    />
                </div>
            </div>
        </section>
    );
}
