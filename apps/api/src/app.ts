import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

const PORT = process.env.PORT ?? 3001;

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("¡Servidor de películas operativo!");
});

app.listen(PORT, () => {
    console.log(`⚡ server running on http:localhost:${PORT}`);
});
