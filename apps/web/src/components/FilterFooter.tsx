import { MoveRight, Eraser } from "lucide-react";

interface FilterFooterProps {
    onApply: () => void;
    onClose: () => void;
    onReset: () => void;
}

export function FilterFooter({ onApply, onClose, onReset }: FilterFooterProps) {
    return (
        <div className="p-6 bg-gradient-to-t from-background-dark to-background-dark/95 border-t border-white/5 flex flex-col sm:flex-row gap-1.5">
            <button
                onClick={() => {
                    onApply();
                    onClose();
                    onReset();
                }}
                className="group w-full py-4 rounded-xl bg-electric-gradient text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                Apply Filters
                <MoveRight className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
            </button>
            <button
                onClick={() => {
                    onReset();
                }}
                className="group w-full py-4 rounded-xl bg-electric-gradient text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                Reset
                <Eraser className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
            </button>
        </div>
    );
}
