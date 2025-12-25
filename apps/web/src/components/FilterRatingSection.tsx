import type { FilterState } from "../types/response.types";

interface FilterRatingSectionProps {
    filters: FilterState;
    handleChange: (key: keyof FilterState, value: string | number) => void;
}

export function FilterRatingSection({
    filters,
    handleChange
}: FilterRatingSectionProps) {
    return (
        <section className="space-y-6">
            <div>
                <div className="flex justify-between items-end mb-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Min Rating
                    </label>
                    <span className="text-primary-light font-bold">
                        {filters.min_rating || 0}
                    </span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={filters.max_rating || 10}
                    step="0.5"
                    value={filters.min_rating || 0}
                    onChange={e => {
                        const value = parseFloat(e.target.value);
                        handleChange("min_rating", value);
                        if (value > (filters.max_rating || 10)) {
                            handleChange("max_rating", value);
                        }
                    }}
                    className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            <div>
                <div className="flex justify-between items-end mb-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Max Rating
                    </label>
                    <span className="text-primary-light font-bold">
                        {filters.max_rating || 10}
                    </span>
                </div>
                <input
                    type="range"
                    min={filters.min_rating || 0}
                    max="10"
                    step="0.5"
                    value={filters.max_rating || 10}
                    onChange={e => {
                        const value = parseFloat(e.target.value);
                        handleChange("max_rating", value);
                        if (value < (filters.min_rating || 0)) {
                            handleChange("min_rating", value);
                        }
                    }}
                    className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            <div className="pt-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Range:</span>
                    <span className="text-primary-light font-bold">
                        {filters.min_rating || 0} - {filters.max_rating || 10}
                    </span>
                </div>
            </div>
        </section>
    );
}
