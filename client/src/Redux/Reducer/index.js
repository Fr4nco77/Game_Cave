import { GET_VIDEOGAMES, GET_GENRES, REMOVE_FILTER, FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING, PAGINATE, REMOVE_VIDEOGAMES } from "../Actions/actionsType";

const initialState = {
    genres: [],
    videoGames: [],
    videoGamesFiltered: [],
    paginate: [],
    currentPage: 0,
}

const reducer = (state = initialState, { type, payload }) => {
    const itemsPerPage = 15;

    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: payload,
                paginate: [...payload].splice(0, itemsPerPage),
                currentPage: 0
            }
        
        case REMOVE_VIDEOGAMES:
            return {
                ...state,
                videoGames: payload
            }

        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }

        case FILTER_BY_GENRE:
            const filteredByGenre = state.videoGames.filter((game) => game.genres.includes(payload));
            
            if(!filteredByGenre.length) filteredByGenre.push("Ups... No se encontro nada por aquí")

            return {
                ...state,
                videoGamesFiltered: filteredByGenre,
                paginate: [...filteredByGenre].splice(0, itemsPerPage),
                currentPage: 0
            }
            
        case FILTER_BY_ORIGIN:
            let originType = payload === "API" ? "number" : "string";
            const filterByOrigin = state.videoGames.filter((game) => typeof game.id === originType);
            
            if(!filterByOrigin.length) filterByOrigin.push("Ups... No se encontro nada por aquí")

            return {
                ...state,
                videoGamesFiltered: filterByOrigin,
                paginate: [...filterByOrigin].splice(0, itemsPerPage),
                currentPage: 0
            };
              
        case REMOVE_FILTER:
            return {
                ...state,
                videoGamesFiltered: payload,
                paginate: [...state.videoGames].splice(0, itemsPerPage),
                currentPage: 0,
            }

        case ORDER_BY_NAME:
            const toSortByName = state.videoGamesFiltered.length ? [...state.videoGamesFiltered] : [...state.videoGames];

            toSortByName.sort((a, b) => {
                const titleA = a.name.toLowerCase();
                const titleB = b.name.toLowerCase();

                if (payload === 'A') {
                    return titleA.localeCompare(titleB);
                } 
                else {
                    return titleB.localeCompare(titleA);
                }
            });

            return {
                ...state,
                videoGamesFiltered: toSortByName,
                paginate: [...toSortByName].splice(0, itemsPerPage),
                currentPage: 0
            }

        case ORDER_BY_RATING:
            const toSortByRating = state.videoGamesFiltered.length ? [...state.videoGamesFiltered] : [...state.videoGames];

            toSortByRating.sort((a,b) => {
                if(payload === "+") {
                    return b.rating - a.rating
                }
                else {
                    return a.rating - b.rating
                }
            })

            return {
                ...state,
                videoGamesFiltered: toSortByRating,
                paginate: [...toSortByRating].splice(0, itemsPerPage),
                currentPage: 0
            }

        case PAGINATE:
             
            const page = payload === "next";
            const currentPage = state.currentPage;
            
            const newIndex = page ? currentPage + 1 : currentPage - 1;
            const firstIndex = newIndex * itemsPerPage;
            
            const totalItems = state.videoGamesFiltered.length ? state.videoGamesFiltered.length : state.videoGames.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            if (newIndex < 0 || newIndex >= totalPages) return {...state};
            
            const games = state.videoGamesFiltered.length ? [...state.videoGamesFiltered] : [...state.videoGames];
            let paginatedgames = games.slice(firstIndex, firstIndex + itemsPerPage);
            return {
                ...state,
                paginate: paginatedgames,
                currentPage: newIndex
            };
            
        default:
            return {
                ...state
            }
    }
}

export default reducer;