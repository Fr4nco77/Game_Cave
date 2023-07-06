import { GET_VIDEOGAMES, GET_GENRES, REMOVE_FILTER, FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING, PAGINATE, REMOVE_VIDEOGAMES, FILTER_BY_PLATFORM, FILTER_BY_TAGS } from "../Actions/actionsType";

const initialState = {
    genres: [],
    platforms: new Set(),
    videoGames: [],
    videoGamesFiltered: [],
    paginate: [],
    currentPage: 0,
}

const reducer = (state = initialState, { type, payload }) => {
    const itemsPerPage = 15;

    const applyFilter = (filterProperty) => {
        const toFilter = state.videoGamesFiltered.length ? state.videoGamesFiltered : state.videoGames;
        let filtered;
        if(filterProperty === "origin") {
            const originType = payload === "API" ? "number" : "string";
            filtered = toFilter.filter((game) => typeof game.id === originType);
        }
        else {
            filtered = toFilter.filter((game) => game[filterProperty]?.includes(payload));
        }
        
        if (!filtered.length) {
          alert("I'm afraid that the last filter didn't yield any results. I invite you to apply another one");
          return {
            ...state
          };
        };
      
        return {
          ...state,
          videoGamesFiltered: filtered,
          paginate: [...filtered].splice(0, itemsPerPage),
          currentPage: 0
        };
    };
      
    switch (type) {
        case GET_VIDEOGAMES:
            const platforms = new Set([...state.platforms]);
            if(!platforms.size) {
                payload.forEach(game => {
                    game.platforms.forEach((platform => {
                        platforms.add(platform);
                    }));
                });
            }
            return {
                ...state,
                platforms: [...platforms],
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
            return applyFilter("genres");
    
        case FILTER_BY_PLATFORM:
            return applyFilter("platforms");
    
        case FILTER_BY_TAGS:
            return applyFilter("tags");
            
        case FILTER_BY_ORIGIN:
            return applyFilter("origin");
        // case FILTER_BY_ORIGIN:
        //     const toFilterByOrigin = state.videoGamesFiltered.length ? state.videoGamesFiltered : state.videoGames;
        //     let originType = payload === "API" ? "number" : "string";

        //     const filterByOrigin = toFilterByOrigin.filter((game) => typeof game.id === originType);
            
        //     if(!filterByOrigin.length) {
        //         alert("I'm afraid that the last filter didn't yield any results. I invite you to apply another one");
        //         return {
        //             ...state
        //         }
        //     }

        //     return {
        //         ...state,
        //         videoGamesFiltered: filterByOrigin,
        //         paginate: [...filterByOrigin].splice(0, itemsPerPage),
        //         currentPage: 0
        //     };

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