import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    useMemo
} from "react";
import type { ReactNode } from "react";
import type { FilterState } from "../types/response.types";

interface FiltersContextType {
    isFilterOpen: boolean;
    filters: FilterState;
    filterFormatErrors: {
        year: string;
        actor: string;
        director: string;
    };
    isApplyButtonDisabled: boolean;
    openFilters: () => void;
    closeFilters: () => void;
    updateFilters: (updates: Partial<FilterState>) => void;
    handleFiltersChange: (
        key: keyof FilterState,
        value: string | number
    ) => void;
    resetFilters: () => void;
    validateName: (name: "actor" | "director", value: string) => void;
    validateYear: (name: "year", value: string) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
    undefined
);

const initialFiltersState: FilterState = {
    genre: "",
    year: "",
    actor: "",
    director: "",
    min_rating: 0,
    max_rating: 10,
    lang: "en"
};

const initialState = {
    isFilterOpen: false,
    filters: initialFiltersState,
    filterFormatErrors: {
        year: "",
        actor: "",
        director: ""
    }
};

type FiltersAction =
    | { type: "OPEN_FILTERS" }
    | { type: "CLOSE_FILTERS" }
    | { type: "UPDATE_FILTERS"; payload: Partial<FilterState> }
    | { type: "RESET_FILTERS" }
    | {
          type: "SET_VALIDATION_ERROR";
          payload: {
              field: keyof typeof initialState.filterFormatErrors;
              error: string;
          };
      };

function filtersReducer(state: typeof initialState, action: FiltersAction) {
    switch (action.type) {
        case "OPEN_FILTERS":
            return { ...state, isFilterOpen: true };
        case "CLOSE_FILTERS":
            return { ...state, isFilterOpen: false };
        case "UPDATE_FILTERS":
            return {
                ...state,
                filters: { ...state.filters, ...action.payload }
            };
        case "RESET_FILTERS":
            return {
                ...state,
                filters: initialFiltersState,
                filterFormatErrors: { year: "", actor: "", director: "" }
            };
        case "SET_VALIDATION_ERROR":
            return {
                ...state,
                filterFormatErrors: {
                    ...state.filterFormatErrors,
                    [action.payload.field]: action.payload.error
                }
            };
        default:
            return state;
    }
}

// Provider
interface FiltersProviderProps {
    children: ReactNode;
}

export function FiltersProvider({ children }: FiltersProviderProps) {
    const [state, dispatch] = useReducer(filtersReducer, initialState);

    const openFilters = useCallback(
        () => dispatch({ type: "OPEN_FILTERS" }),
        []
    );
    const closeFilters = useCallback(
        () => dispatch({ type: "CLOSE_FILTERS" }),
        []
    );

    const updateFilters = useCallback((updates: Partial<FilterState>) => {
        dispatch({ type: "UPDATE_FILTERS", payload: updates });
    }, []);

    const handleFiltersChange = useCallback(
        (key: keyof FilterState, value: string | number) => {
            updateFilters({ [key]: value });
        },
        [updateFilters]
    );

    const resetFilters = useCallback(() => {
        dispatch({ type: "RESET_FILTERS" });
    }, []);

    const validateName = useCallback(
        (name: "actor" | "director", value: string) => {
            let error = "";
            const trimmedValue = value.trim();

            const isValidName = (text: string): boolean => {
                return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(text);
            };

            if (trimmedValue && !isValidName(trimmedValue)) {
                const fieldNames = {
                    actor: "Actor",
                    director: "Director"
                };
                error = `${
                    fieldNames[name] || "field"
                } can only contain letters and spaces`;
            }

            dispatch({
                type: "SET_VALIDATION_ERROR",
                payload: { field: name, error }
            });
        },
        []
    );

    const validateYear = useCallback((name: "year", value: string) => {
        let error = "";
        const trimmedValue = value.trim();
        const currentYear = new Date().getFullYear();

        if (trimmedValue === "") {
            dispatch({
                type: "SET_VALIDATION_ERROR",
                payload: { field: name, error }
            });
            return;
        }

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

        dispatch({
            type: "SET_VALIDATION_ERROR",
            payload: { field: name, error }
        });
    }, []);

    const isApplyButtonDisabled = useMemo(
        () =>
            !!state.filterFormatErrors.year ||
            !!state.filterFormatErrors.actor ||
            !!state.filterFormatErrors.director,
        [state.filterFormatErrors]
    );

    const value = {
        isFilterOpen: state.isFilterOpen,
        filters: state.filters,
        filterFormatErrors: state.filterFormatErrors,
        isApplyButtonDisabled,
        openFilters,
        closeFilters,
        updateFilters,
        handleFiltersChange,
        resetFilters,
        validateName,
        validateYear
    };

    return (
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>
    );
}

export function useFiltersContext() {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "useFiltersContext must be used within a FiltersProvider"
        );
    }
    return context;
}
