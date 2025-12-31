import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FiltersProvider } from "./context/FiltersContext";

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <FiltersProvider>
            <App />
        </FiltersProvider>
    </StrictMode>
);
