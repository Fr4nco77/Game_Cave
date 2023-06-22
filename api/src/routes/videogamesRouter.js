const { Router } = require("express");
const { getVideoGames, getVideoGamesById, postVideoGame, deleteVideoGame, updateVideoGame } = require("../handlers/handlerVideoGames");
const videogamesRouter = Router();

videogamesRouter
    .get("/", getVideoGames)
    .get("/:id", getVideoGamesById)
    .post("/", postVideoGame)
    .delete("/:id", deleteVideoGame)
    .put("/:id", updateVideoGame)
module.exports = videogamesRouter;
