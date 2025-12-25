import { SearchAlert } from "lucide-react";

interface NoMoviesFoundProps {
  errorMessage: string;
}

export function NoMoviesFound({ errorMessage }: NoMoviesFoundProps) {
    return (
        <div className="flex justify-center gap-2 items-center text-center py-20 text-slate-500">
            <SearchAlert className="text-4xl mb-2" />
            <p>{errorMessage}</p>
        </div>
    );
}
