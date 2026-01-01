import type { ReactNode } from "react";

interface InfoSectionProps {
    title: string;
    children: ReactNode;
}

export function InfoSection({ title, children }: InfoSectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                {title}
            </h3>
            {children}
        </section>
    );
}
