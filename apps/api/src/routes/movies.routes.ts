import { Router } from "express";
import { MovieController } from "../controllers/movies.controllers.js";

export const moviesRouter: Router = Router();

moviesRouter.get("/", MovieController.getAll);

moviesRouter.get("/:imdb_id", MovieController.getByImdbId);