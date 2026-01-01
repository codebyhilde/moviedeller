import Home from "./views/Home";
import { FiltersProvider } from "./context/FiltersContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <FiltersProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </FiltersProvider>
    );
}

export default App;
