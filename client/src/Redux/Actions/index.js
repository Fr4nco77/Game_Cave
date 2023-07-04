import { GET_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, REMOVE_FILTER, ORDER_BY_NAME, ORDER_BY_RATING, PAGINATE, POST_VIDEOGAME, PUT_VIDEOGAME, DELETE_VIDEOGAME, REMOVE_VIDEOGAMES, FILTER_BY_PLATFORM, FILTER_BY_TAGS} from "./actionsType";
import axios from "axios";

export const getVideogames = (name) => {
    return async function(dispatch) {
        try {
            const endpoint = name ? `http://localhost:3001/videogames?name=${name}` : "http://localhost:3001/videogames";
            const response = (await axios(endpoint)).data;
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response
            });
        } catch (error) {
            alert(error.message);
        }
    }
}

export const removeVideogames = () => {
    return async function(dispatch) {
        dispatch({
            type: REMOVE_VIDEOGAMES,
            payload: []
        })
    }
}

export const getGenres = () => {
    return async function(dispatch) {
        try {
            const response = (await axios("http://localhost:3001/genres")).data;
            dispatch({
                type: GET_GENRES,
                payload: response
            });
        } catch (error) {
            alert(error.message);
        }
    }
}

export const postVideogame = (data) => {
    return async function(dispatch) {
        try {
            const response = (await axios.post("http://localhost:3001/videogames", data)).data;
            alert(response.status);
            dispatch({
                type: POST_VIDEOGAME,
                payload: undefined
            })
        } catch (error) {
            alert(error.message);
        }
    }
}

export const putVideogames = (id, data) => {
    return async function(dispatch) {
        try {
            const response = (await axios.put(`http://localhost:3001/videogames/${id}`, data)).data;
            alert(response.status);
            dispatch({
                type: PUT_VIDEOGAME,
                payload: undefined
            })
        } catch (error) {
            alert(error.message);
        }
    }
}

export const deleteVideogame = (id) => {
    return async function(dispatch) {
        try {
            const response = (await axios.delete(`https://localhost:3001/videogames/${id}`)).data;
            alert(response.status);
            dispatch({
                type: DELETE_VIDEOGAME,
                payload: undefined
            });
        } catch (error) {
            alert(error.message);
        }
    }
}

export const filterByGenre = (genre) => {
    return function(dispatch) {
        dispatch({
            type: FILTER_BY_GENRE,
            payload: genre

        })
    }
}

export const filterByOrigin = (origin) => {
    return function(dispatch) {
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload: origin
        })
    }
}

export const filterByPlatform = (platform) => {
    return function(dispatch) {
        dispatch({
            type: FILTER_BY_PLATFORM,
            payload: platform
        })
    }
}

export const filterByTag = (tag) => {
    return function(dispatch) {
        dispatch({
            type: FILTER_BY_TAGS,
            payload: tag
        })
    }
}

export const removeFilters = () => {
    return function(dispatch) {
        dispatch({
            type: REMOVE_FILTER,
            payload: []
        })
    }
}

export const orderByName = (order) => {
    return function(dispatch) {
        dispatch({
            type: ORDER_BY_NAME,
            payload: order
        })
    }
}

export const orderByRating = (order) => {
    return function(dispatch) {
        dispatch({
            type: ORDER_BY_RATING,
            payload: order
        })
    }
}

export const paginate = (order) => {
    return function(dispatch) {
        dispatch({
            type: PAGINATE,
            payload: order
        })
    }
}