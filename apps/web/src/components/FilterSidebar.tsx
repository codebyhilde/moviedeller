import { useFiltersContext } from "../context/FiltersContext";
import { FilterHeader } from "./FilterHeader";
import { FilterGenreSection } from "./FilterGenreSection";
import { FilterBasicInfoSection } from "./FilterBasicInfoSection";
import { FilterPeopleSection } from "./FilterPeopleSection";
import { FilterRatingSection } from "./FilterRatingSection";
import { FilterFooter } from "./FilterFooter";

interface FilterSidebarProps {
    onApply: () => void;
}

export function FilterSidebar({ onApply }: FilterSidebarProps) {
    const { isFilterOpen, closeFilters } = useFiltersContext();

    if (!isFilterOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={closeFilters}
            ></div>

            <div className="relative w-full max-w-md h-full bg-background-dark shadow-2xl border-l border-white/5 flex flex-col animate-slide-in-right">
                <FilterHeader />

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <FilterGenreSection />
                    <FilterBasicInfoSection />

                    <FilterPeopleSection />

                    <FilterRatingSection />
                </div>

                <FilterFooter onApply={onApply} />
            </div>
        </div>
    );
}
