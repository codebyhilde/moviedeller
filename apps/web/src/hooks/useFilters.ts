import { useState, useMemo } from "react";
import type { FilterState } from "../types/response.types";

export function useFilters() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterFormatErrors, setFilterFormatErrors] = useState({
        year: "",
        actor: "",
        director: ""
    });

    const validateName = (name: "actor" | "director", value: string) => {
        let error = "";

        const trimmedValue = value.trim();

        const isValidName = (text: string): boolean => {
            // Regex que permite letras, acentos, ñ, ü y espacios
            return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(text);
        };

        if (!isValidName(trimmedValue)) {
            const fieldNames: Record<string, string> = {
                actor: "Actor",
                director: "Director"
            };

            error = `${
                fieldNames[name] || "field"
            } can only contain letters and spaces"`;
        }

        setFilterFormatErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateYear = (name: "year", value: string) => {
        let error = "";
        const trimmedValue = value.trim();
        const currentYear = new Date().getFullYear();

        if (trimmedValue === "") {
            setFilterFormatErrors(prev => ({ ...prev, [name]: error }));
            return;
        }

        // Patrón para verificar que solo hayan digitos
        const YEAR_REGEX = /^\d+$/;

        if (!YEAR_REGEX.test(trimmedValue)) {
            error = "Please enter a valid year";
        } else {
            const numberValue = parseInt(trimmedValue, 10);

            if (numberValue < 1900) {
                error = "Year cannot be earlier than 1900";
            } else if (numberValue > currentYear) {
                error = "Year cannot be in the future";
            }
        }

        setFilterFormatErrors(prev => ({ ...prev, [name]: error }));
    };

    const isApplyButtonDisabled =
        !!filterFormatErrors.year ||
        !!filterFormatErrors.actor ||
        !!filterFormatErrors.director;

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
        resetFilters,
        validateName,
        validateYear,
        isApplyButtonDisabled
    };
}
