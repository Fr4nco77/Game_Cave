import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import { useState, useEffect } from "react";
import GTA from "../../img/Landing/GTA.png";
import Halo from "../../img/Landing/Halo.png";
import Journie from "../../img/Landing/Journie.png";
import LastOfUs from "../../img/Landing/Last_of_Us.png";
import LifeIsStrange from "../../img/Landing/Life_is_Strange.png";
import Zelda from "../../img/Landing/Zelda.png";

const Landing = () => {
    const navigate = useNavigate()
    const [currentImage, setCurrentImage] = useState(0);
    const images = [ GTA, Halo, Journie, LastOfUs, LifeIsStrange, Zelda ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id={styles.container}>
            <div id={styles.landing}>
                <div id={styles.left}>
                    <h1>Game<span>Hub</span></h1>
                    <p>¡Welcome to GameHub, your ultimate destination for everything related to video games!</p>
                    <p>Immerse yourself in the exciting world of GameHub, where you will find detailed information, personalized filtering options, and the opportunity to create your own video games. Don't waste any more time and start your adventure on GameHub right now!</p>
                    <button onClick={()=>navigate("/home")}>Empieza Aquí</button>
                </div>
                <div id={styles.right}>
                    <img src={images[currentImage]} alt="carrusel" />
                </div>
            </div>
        </div>
    )
}

export default Landing;