import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";
import { useDispatch } from "react-redux";
import { getVideogames, removeFilters, removeVideogames } from "../../../Redux/Actions";

const Nav = () => {
    const [ gameName, setGameName ] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setGameName(e.target.value);
    };

    const handleSubmit = () => {
        const search = gameName.trim();
        if(search === "") alert("sabes que los espacios vacios no se puden buscar, ya existen en tu vida")
        else {
            // navigate(`/search?results=${encodeURIComponent(search)}`);
            dispatch(getVideogames(gameName));
            navigate("/home");
            
        }
    };

    const handleRemoveSearch = () => {
        dispatch(removeVideogames());
        dispatch(removeFilters());
        setGameName("");
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link to="/home"><img src="" alt="Game Cav" /></Link>
                <ul>
                    <Link to="/home"><li>Home</li></Link>
                    <Link to="/add_game"><li>Add Game</li></Link>
                    <Link to="/about"><li>About</li></Link>
                </ul>
            </div>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Search" value={gameName} onChange={handleChange}/>
                <button onClick={handleSubmit}>Buscar</button>
                <button onClick={handleRemoveSearch}>Remove Search</button>
            </div>
        </div>
    )
}

export default Nav;