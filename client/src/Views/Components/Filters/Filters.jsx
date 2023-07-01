import { useDispatch, useSelector } from "react-redux"
import { filterByGenre, filterByOrigin, removeFilters } from "../../../Redux/Actions"
import styles from "./Filters.module.css";

const Filters = (props) => {
    const { genres } = props;
    const dispatch = useDispatch();
    const filtered = useSelector((state) => state.videoGamesFiltered);

    const handleOptionGenre = (e) => {
        dispatch(filterByGenre(e.target.value));
    }

    const handleOptionOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value));
    }

    const handleFilters = () => {
        dispatch(removeFilters());
    }
    return (
        <aside id={styles.container}>
            <div id={styles.head}>
                <p>Filters</p>
                <button onClick={handleFilters}>{filtered.length ? "Reset" : ""}</button>
            </div>
            <div id={styles.filters}>
                <select onChange={handleOptionGenre}>
                    <option disabled selected>Genres</option>
                    {
                        genres?.map((genre) => {
                            return(
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            )
                        })
                    }
                </select>
                <select onChange={handleOptionOrigin}>
                    <option disabled selected>Origin</option>
                    <option value="API">Other Video Games</option>
                    <option value="DB">Your Video Games</option>
                </select>
            </div>
            
        </aside>
    )
}

export default Filters;