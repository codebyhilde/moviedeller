import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  
  useEffect(() => {
    fetch("http://localhost:3001/movies?lang=es")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return (
    <>
    <header className="flex flex-col align-content text-center">
      <h1 className="text-5xl">Moviedeller</h1>
      <p>Encuentra toda la información que necesitas de tus películas favoritas</p>
    </header>
    <main>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem"}}>
        {data && (
          data.movies?.map((movie, index) => {
          return (
          <section key={index}>
            <img src={movie.poster} alt={`Imagen de ${movie.title}`} />
            <p className="text-xl text-gray-800 text-center">{movie.title}</p>
            <p>{movie.plot}</p>
          </section>)
          })
        )}
      </div>
    </main>
    <footer>
      <p>©Moviedeller - 2024</p>
    </footer>
    </>
  )
}

export default App
