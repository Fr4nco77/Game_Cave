const { Genre } = require("../db");
const { postGenres } = require("../controllers/controllerGenres");

const getGenres = async(req, res) => {
    try {
        let genres = Genre.findAll();
        if(!genres.length) {
            genres = await postGenres();
        };
        res.status(200).json(genres);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = {
    getGenres,
}