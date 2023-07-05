require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const{ Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const getAPI = async(name) => {
    const endpoint = name ? `https://api.rawg.io/api/games?search=${name}&` : `https://api.rawg.io/api/games?`;
    const maxPage = 3;
    const maxSize = 40;
    const dataAPI = [];
    try {
        for (let i = 1; i <= maxPage; i++) {
            const petition = (await axios(endpoint + `key=${API_KEY}&page_size=${maxSize}&page=${i}`)).data.results;
            if(petition.length < maxSize) break;
            dataAPI.push(...petition);
        }
    } catch (error) {
        return dataAPI;
    }
    
    const videoGamesAPI = dataAPI.map((data) => {
        const { id, name, released, background_image, rating, platforms, genres, tags } = data;
        const platfomrsNames = platforms?.map((e) => e.platform.name);
        const genresNames = genres?.map((e) => e.name);
        const tagsNames = tags?.map((e) => e.name);
        return {
            id,
            name,
            released,
            image: background_image,
            rating,
            platforms: platfomrsNames,
            genres: genresNames,
            tags: tagsNames,
        };
    });
    return videoGamesAPI;
}


const getDB = async(name) => {
    let optionsDB = {include: Genre}
    if(name) optionsDB = {where: {name: {[Op.iLike]: `%${name}%`}}, ...optionsDB}
    
    const dataDB = await Videogame.findAll(optionsDB);
    if(!dataDB.length) return dataDB;

    const transformedData = dataDB.map((game) => ({
        ...game.toJSON(),
        genres: game.genres.map((genre) => genre.name),
    }));
    return transformedData;
}

const getById = async(id) => {
    let data;
    if(isNaN(id)) {
        data = await Videogame.findOne({where: {id}, include: Genre});
        if(!data) throw new Error("No matches found");

        const transformedData = {
            ...data.toJSON(),
            genres: data.genres.map((genre) => genre.name),
        };
        return transformedData;
    }
    try {
        data = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
    } catch (error) {
      throw new Error("No matches found");  
    }
    
    const { name, released, background_image, rating, platforms, genres, tags, description } = data;
    const platformsNames = platforms?.map((e) => e.platform.name);
    const genresNames = genres?.map((e) => e.name);
    const tagsNames = tags?.map((e) => e.name);
    return {
        id,
        name,
        released,
        image: background_image,
        rating,
        platforms: platformsNames,
        genres: genresNames,
        tags: tagsNames,
        description
    }
}

const postDB = async(newGameData) => {
    const { name, released, platforms, description, genres } = newGameData;
    if(!name || !released || !Array.isArray(platforms) || !platforms.length || !description || !Array.isArray(genres) ||!genres.length) throw new Error("Faltan datos para subir el juego");

    const newGame = await Videogame.create(newGameData);
    const foundGenres = await Genre.findAll({ where: { name: genres } });
    await newGame.addGenres(foundGenres);

    return {
        status: "Created successfully"
    }
}

const deleteGameDB = async(id) => {
    await Videogame.destroy({where: {id}});
    return {
        status: "Deleted successfully"
    }
}

const updateGameDB = async(id, data) => {
    await Videogame.update(data, { where: { id } });
    return {
        status: "Updated successfully"
    }
}

const getAllVideogames = async (name) => {
    const DB = await getDB(name);
    const API = await getAPI(name);
    const allData = DB.concat(API);
    
    if (!allData.length) throw new Error("No video games were found");     
    return allData;
};

module.exports = {
    getAllVideogames,
    getById,
    postDB,
    deleteGameDB,
    updateGameDB,
}