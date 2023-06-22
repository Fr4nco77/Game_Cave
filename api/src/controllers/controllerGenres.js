require("dotenv").config();
const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

const postGenres = async() => {
    const dataGenres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
    const genres = dataGenres.map(({ name }) => ({name}));
    
    await Genre.bulkCreate(genres);
    const genresDB = await Genre.findAll();
    return genresDB;
}

module.exports = {
    postGenres,
}