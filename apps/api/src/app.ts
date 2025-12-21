import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { moviesRouter } from "./routes/movies.routes.js";

const app: Express = express();

app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3001;

// Health check
app.get("/", (_req: Request, res: Response) => {
    res.json({
        status: "ok",
        message: "Movie API is running",
        version: "1.0.0",
        supportedLanguages: ["en", "es"]
    });
});

// Uso de cors
app.use(corsMiddleware());

// Enrutamiento de la API
app.use("/movies", moviesRouter);

app.listen(PORT, () => {
    console.log(`⚡ server running on http:localhost:${PORT}`);
});
