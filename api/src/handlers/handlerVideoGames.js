const { getAllVideogames, getById, postDB, deleteGameDB, updateGameDB } = require("../controllers/controllerVideoGames");

const getVideoGames = async(req, res) => {
    const { name } = req.query
    try {
        let games;
        name ? games = await getAllVideogames(name) : games = await getAllVideogames()

        res.status(200).json(games);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const getVideoGamesById = async(req, res) => {
    const { id } = req.params;
    try {
        const game = await getById(id);
        res.status(200).json(game)

    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const postVideoGame = async(req, res) => {
    try {
        const newGame = await postDB(req.body);
        res.status(200).json(newGame);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteVideoGame = async(req, res) => {
    const { id } = req.params;
    try {
        const deleteGame = await deleteGameDB(id)
        res.status(200).json(deleteGame);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const updateVideoGame = async(req, res) => {
    const { id } = req.params;
    try {
        const updateGame = await updateGameDB(id, req.body);
        res.status(200).json(updateGame)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    getVideoGames,
    getVideoGamesById,
    postVideoGame,
    deleteVideoGame,
    updateVideoGame
}