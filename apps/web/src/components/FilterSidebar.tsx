import type { FilterState } from "../types/response.types";
import { FilterHeader } from "./FilterHeader";
import { FilterGenreSection } from "./FilterGenreSection";
import { FilterBasicInfoSection } from "./FilterBasicInfoSection";
import { FilterPeopleSection } from "./FilterPeopleSection";
import { FilterRatingSection } from "./FilterRatingSection";
import { FilterFooter } from "./FilterFooter";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    setFilters: (f: FilterState) => void;
    onApply: () => void;
}

export function FilterSidebar({
    isOpen,
    onClose,
    filters,
    setFilters,
    onApply
}: FilterSidebarProps) {
    if (!isOpen) return null;

    const handleChange = (key: keyof FilterState, value: string | number) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md h-full bg-background-dark shadow-2xl border-l border-white/5 flex flex-col animate-slide-in-right">
                <FilterHeader onClose={onClose} />

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <FilterGenreSection
                        filters={filters}
                        handleChange={handleChange}
                    />

                    <FilterBasicInfoSection
                        filters={filters}
                        handleChange={handleChange}
                    />

                    <FilterPeopleSection
                        filters={filters}
                        handleChange={handleChange}
                    />

                    <FilterRatingSection
                        filters={filters}
                        handleChange={handleChange}
                    />
                </div>

                <FilterFooter onApply={onApply} onClose={onClose} />
            </div>
        </div>
    );
}
