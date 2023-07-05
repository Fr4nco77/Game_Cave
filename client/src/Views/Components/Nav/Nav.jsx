import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";
import { useDispatch } from "react-redux";
import { getVideogames, removeFilters, removeVideogames } from "../../../Redux/Actions";

const Nav = () => {
    const [ gameName, setGameName ] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

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

    const handleKeyDown = (e) => {
        if(e.key === "Enter") handleSubmit();
    }

    const handleRemoveSearch = () => {
        dispatch(removeVideogames());
        dispatch(removeFilters());
        setGameName("");
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link to="/home"  style={{ textDecoration: 'none', color: 'inherit' }}><h1>Game<span>Hub</span></h1></Link>
                <ul>
                    <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}><li className={location.pathname === "/home" ? styles.active : ""}>Home</li></Link>
                    <Link to="/add_game" style={{ textDecoration: 'none', color: 'inherit' }}><li className={location.pathname === "/add_game" ? styles.active : ""}>Add Game</li></Link>
                    {/* <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}><li className={location.pathname === "/about" ? styles.active : ""}>About</li></Link> */}
                </ul>
            </div>
            <div className={styles.searchBar}>
                <button id={styles.search} onClick={handleSubmit}><svg width="3vw" height="3vh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#999999" style={{ cursor: 'pointer' }}><path d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z" stroke="#999999" ></path></svg></button>
                <input type="text" placeholder="Search..." value={gameName} onChange={handleChange} onKeyDown={handleKeyDown}/>
                <button id={styles.remove} onClick={handleRemoveSearch}>
                    {
                        gameName !== "" && <svg width="3vw" height="3vh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#1e90ff" style={{ cursor: 'pointer' }}><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="#1e90ff" ></path></svg>
                    }
                </button>
            </div>
        </div>
    )
}

export default Nav;