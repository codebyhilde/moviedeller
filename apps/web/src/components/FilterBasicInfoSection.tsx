import { ChevronDown } from "lucide-react";
import type { FilterState } from "../types/response.types";

interface FilterBasicInfoSectionProps {
    filters: FilterState;
    handleChange: (key: keyof FilterState, value: string | number) => void;
}

/* 
* Filtra películas por año
* Configura el lenguaje a utilizar en la respuesta de la API (Inglés/Español)
*/
export function FilterBasicInfoSection({ filters, handleChange }: FilterBasicInfoSectionProps) {
    return (
        <section className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Year
                </label>
                <input
                    type="number"
                    placeholder="2009"
                    value={filters.year || ""}
                    onChange={(e) => handleChange("year", e.target.value)}
                    className="w-full bg-surface-dark border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 transition-colors transition-shadow"
                />
            </div>

            <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Language
                </label>
                <select
                    value={filters.lang}
                    onChange={(e) => handleChange("lang", e.target.value)}
                    className="w-full bg-surface-dark border border-white/5 rounded-xl px-4 py-3 pr-10 text-white focus:ring-2 focus:ring-primary/50 appearance-none"
                >
                    <option value="en">English (Default)</option>
                    <option value="es">Español</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
            </div>
        </section>
    );
};