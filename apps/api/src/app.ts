import express, { type Express, type Request, type Response } from "express";
import movies from "./data/movies.json" with { type: "json" };
import "dotenv/config";

const app: Express = express();

app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3001;

app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("¡Servidor de películas operativo!");
});

app.get("/movies", (req: Request, res: Response) => {
  const { genre } = req.query;
  
  if (genre) {
    if (typeof genre !== "string") return res.status(400).json({ error: "Genre parameter must be a string" });
    
    const genreLower = genre.toLowerCase();
    
    const filteredMovies = movies.filter(movie => movie.translations.en.genre.some((g: string) => g.toLowerCase() === genreLower));
    return res.json(filteredMovies);
  }
  
  res.json(movies);
});

app.get("/movies/:imdb_id", (req: Request, res: Response) => {
  const { imdb_id } = req.params;
  
  const movie = movies.find(movie => movie.imdb_id === imdb_id);
  
  if (movie) return res.json(movie);
  
  res.status(404).json({ message: "Movie not found!" });
});

app.listen(PORT, () => {
    console.log(`⚡ server running on http:localhost:${PORT}`);
});
