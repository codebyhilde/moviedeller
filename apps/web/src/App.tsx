import Home from "./views/Home";
import { Loader } from "./components/Loader";
import { FiltersProvider } from "./context/FiltersContext";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MovieDetails = lazy(() => import("./views/MovieDetails"));

function App() {
    return (
        <FiltersProvider>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/movie/:imdb_id"
                            element={<MovieDetails />}
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </FiltersProvider>
    );
}

export default App;
