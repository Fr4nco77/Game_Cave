const { Router } = require("express");
const { getGenres } = require("../handlers/handlerGenres");
const genresRouter = Router();

genresRouter.get("/", getGenres);

module.exports = genresRouter;