import { X } from "lucide-react";

interface FilterHeaderProps {
    onClose: () => void;
}

export function FilterHeader({ onClose }: FilterHeaderProps) {
    return (
        <header className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-background-dark/50 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white tracking-tight">
                Filters
            </h2>
            <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors flex justify-center gap-2"
            >
                <X />
                <span>Close</span>
            </button>
        </header>
    );
}
