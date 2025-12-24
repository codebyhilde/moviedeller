interface HeaderProps {
    title?: string;
}

export function Header({ title = "MOVIEDELLER" }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20">
            <div className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold tracking-tight">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}
