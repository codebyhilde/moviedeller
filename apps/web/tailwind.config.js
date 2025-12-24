/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#4f47e6",
                "primary-light": "#818cf8",
                "primary-dark": "#4f46e5",
                "background-dark": "#0f172a",
                "surface-dark": "#1e293b",
                "input-dark": "#1e293b",
                "amber-gold": "#fbbf24"
            },
            fontFamily: {
                display: ["Spline Sans", "sans-serif"]
            },
            backgroundImage: {
                "electric-gradient":
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
            }
        }
    },
    plugins: []
};
