import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, removeFilters, removeVideogames } from "../../Redux/Actions";
import Cards from "../Components/Cards/Cards";
import Filters from "../Components/Filters/Filters";
import Loader from "../Components/Loader/Loader";
import styles from "./Search.module.css";

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const word = new URLSearchParams(search).get('results')

    const games = useSelector((state) => state.videoGames);
    const gamesFiltered = useSelector((state) => state.videoGamesFiltered);
    const genres = useSelector((state) => state.genres);

    useEffect(() => {
        if(!genres.length) dispatch(getGenres());
        dispatch(getVideogames(word));

        return (
            dispatch(removeVideogames()),
            dispatch(removeFilters())
        ) 
    }, [word])

    if(!games.length || !genres.length) {
        return <Loader/>;
    }

    return (
        <div>
            <div id={styles.container}>
                <div id={styles.cards}>
                    <Cards data={gamesFiltered.length ? gamesFiltered : games}/>
                </div>
                <div id ={styles.filters}>
                    <Filters genres={genres}/>
                </div>
            </div>
        </div>
    )
}

export default Search;