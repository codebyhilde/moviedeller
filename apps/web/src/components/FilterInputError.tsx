interface FilterInputErrorProps {
    error: string;
}

export function FilterInputError({ error }: FilterInputErrorProps) {
    return <p className="text-red-500 text-xs mt-2 truncate w-full">{error}</p>;
}
