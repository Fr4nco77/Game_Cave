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
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id={styles.container}>
            <div id={styles.landing}>
                <div id={styles.left}>
                    <h1>Game<span>Hub</span></h1>
                    <p>¡Bienvenido a GameHub, tu destino definitivo para todo lo relacionado con videojuegos! Aquí encontrarás una amplia gama de información y características emocionantes para satisfacer tu pasión por los videojuegos. </p>
                    <p>Sumérgete en el emocionante mundo de GameHub, donde encontrarás información detallada, opciones de filtrado personalizadas y la oportunidad de crear tus propios videojuegos. ¡No pierdas más tiempo y comienza tu aventura en GameHub ahora mismo! </p>
                    <button onClick={()=>navigate("/home")}>Empieza Aquí</button>
                </div>
                <div id={styles.right}>
                    <img src={images[currentImage]} alt="Imagen del carrusel" />
                </div>
            </div>
        </div>
    )
}

export default Landing;