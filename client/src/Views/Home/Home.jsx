import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, paginate, removeFilters, removeVideogames } from "../../Redux/Actions";
import Cards from "../Components/Cards/Cards";
import Filters from "../Components/Filters/Filters";
import Loader from "../Components/Loader/Loader";
import styles from "./Home.module.css";

const Home = () => {

    const dispatch = useDispatch();
    const games = useSelector((state) => state.paginate);
    const page = useSelector((state) => state.currentPage);
    const allGames = useSelector((state) => state.videoGames);
    const genres = useSelector((state) => state.genres);

    useEffect(() => {
        if(!games.length) dispatch(getVideogames());
        if(!genres.length) dispatch(getGenres());
    }, [allGames])

    const handlePage = (e) => dispatch(paginate(e.target.value))
    
    if(!games.length || !genres.length) return <Loader/>;
    return(
        <div id={styles.container}>
            <div id={styles.main}>
                <div className={styles.cards}>
                    <Cards data={games}/>
                </div>
                <div id={styles.paginate}>
                    <button value="prev" onClick={handlePage} id={styles.arrowLeft}></button>
                    <span>{page + 1}</span>
                    <button value="next"  onClick={handlePage} id={styles.arrowRight}></button>
                </div>
            </div>
            <div id ={styles.filters}>
                <Filters genres={genres}/>
            </div>
        </div>
    )
}

export default Home;