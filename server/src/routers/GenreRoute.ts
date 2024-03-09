import { Router } from "express";
import { GenreService } from "../services/GenreService";
import { requestHandler } from "../middlewares/RequestHandler";
import { GenreTransformer } from "../transformers/GenreTransformer";
import { z } from "zod";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const genreService = new GenreService();
const genreTransformer = new GenreTransformer();
const genreRouter = Router();
const GenreSchema = z.string();

genreRouter.post('/', authMiddleware, requestHandler(async (req, res) => {
  const genre = GenreSchema.parse(req.body.name);
  return genreTransformer.transform(await genreService.create(genre));
}))

export {genreRouter};
