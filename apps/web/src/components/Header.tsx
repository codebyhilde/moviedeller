import { Film, Funnel } from "lucide-react";

interface HeaderProps {
    title?: string;
    onFilterOpen: () => void;
}

export function Header({ title = "MOVIEDELLER", onFilterOpen }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20">
            <div className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-800 text-white shadow-lg shadow-primary/20">
                            <Film />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <button
                            onClick={onFilterOpen}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-colors group"
                        >
                            <Funnel className="text-slate-400 group-hover:text-primary-light" />
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                                Filters
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
