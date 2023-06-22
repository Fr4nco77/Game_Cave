require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const{ Videogame, Genre } = require("../db");

const getAPI = async(name) => {
    let dataAPI;

    if(name) {
        dataAPI =  (await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;
        if(!dataAPI.length) return dataAPI;
    }else {
        dataAPI = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;
    }

    const videoGamesAPI = dataAPI.map((data) => {
        const { id, name, released, background_image, rating, platforms, genres, tags, short_screenshots } = data;
        const platfomrsNames = platforms.map((e) => e.platform.name);
        const genresNames = genres.map((e) => e.name);
        const tagsNames = tags.map((e) => e.name);
        const screenshots = short_screenshots.map((e) => e.image)
        return {
            id,
            name,
            released,
            image: background_image,
            rating,
            platforms: platfomrsNames,
            genres: genresNames,
            tags: tagsNames,
            short_screenshots: screenshots,
        };
    });

    return videoGamesAPI;
}


const getDB = async(name) => {
    let dataDB;
    if(name) {
        dataDB = await Videogame.findAll({where: {name}, include: Genre});
    }
    else {
        dataDB = await Videogame.findAll({include: Genre});    
    }

    const transformedData = dataDB.map((game) => ({
        ...game.toJSON(),
        genres: game.genres.map((genre) => genre.name),
    }));
      
    return transformedData;
}

const getById = async(id) => {
    if(isNaN(id)) {
        const dataDB = await Videogame.findOne({where: {id}, include: Genre});
        if(!dataDB) throw new Error("No se encontraron coincidencias");

        const transformedData = {
            ...dataDB.toJSON(),
            genres: dataDB.genres.map((genre) => genre.name),
        };
        
        return transformedData;
    }
    const dataAPI = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
    if('detail' in dataAPI) throw new Error("No se encontraron coincidencias");
    
    const { name, released, background_image, rating, platforms, genres, tags, description } = dataAPI;
    const platformsNames = platforms.map((e) => e.platform.name);
    const genresNames = genres.map((e) => e.name);
    const tagsNames = tags.map((e) => e.name);
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
        status: "Creado con exito"
    }
}

const deleteGameDB = async(id) => {
    await Videogame.destroy({where: {id}});
    return {
        status: "Eliminado con exito"
    }
}

const updateGameDB = async(id, data) => {
    await Videogame.update(data, { where: { id } });
    return {
        status: "Actualizado con exito"
    }
}

const getAllVideogames = async (name) => {
    let DB, API;
    if (name) {
        DB = await getDB(name);
        API = await getAPI(name);
    } else {
        DB = await getDB();
        API = await getAPI();
    }
    const allData = DB.concat(API);

    if (!allData.length) throw new Error("No se encontraron elementos");     
    return allData;
};

module.exports = {
    getAllVideogames,
    getById,
    postDB,
    deleteGameDB,
    updateGameDB,
}