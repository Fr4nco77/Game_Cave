import { useDispatch, useSelector } from "react-redux"
import { filterByGenre, filterByOrigin, filterByPlatform, filterByTag, removeFilters } from "../../../Redux/Actions"
import styles from "./Filters.module.css";
import { useState } from "react";

const Filters = (props) => {
    const { genres } = props;
    const [ tag, setTag ] = useState("");
    const dispatch = useDispatch();
    const filtered = useSelector((state) => state.videoGamesFiltered);
    const platforms = useSelector((state) => state.platforms);

    const handleOptionGenre = (e) => {
        dispatch(filterByGenre(e.target.value));
    }

    const handleOptionOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value));
    }

    const handleOptionPlatform = (e) => {
        dispatch(filterByPlatform(e.target.value));
    }

    const handleOptionTag = () => {
        if(tag.trim() !== "") dispatch(filterByTag(tag));
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
                <select onChange={handleOptionPlatform}>
                    <option disabled selected>Platforms</option>
                    {
                        platforms?.map((platform, index) => {
                            return (
                                <option key={index} value={platform}>{platform}</option>
                            )
                        })
                    }
                </select>
                <div id={styles.tags}>
                    <label htmlFor="tag">Tag</label>
                    <div id={styles.submit}>
                        <input id="tag" type="text" value={tag} onChange={(e) => setTag(e.target.value)}/>
                        <button onClick={handleOptionTag}>Submit</button>
                    </div>
                </div>
            </div>
            
        </aside>
    )
}

export default Filters;