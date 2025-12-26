import { useState, useMemo } from "react";
import type { FilterState } from "../types/response.types";

export function useFilters() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const initialFiltersState: FilterState = useMemo(
        () => ({
            genre: "",
            year: "",
            actor: "",
            director: "",
            min_rating: 0,
            max_rating: 10,
            lang: "en"
        }),
        []
    );

    const [filters, setFilters] = useState<FilterState>(initialFiltersState);

    const resetFilters = () => {
        setFilters(initialFiltersState);
    };

    return {
        isFilterOpen,
        setIsFilterOpen,
        filters,
        setFilters,
        resetFilters
    };
}
