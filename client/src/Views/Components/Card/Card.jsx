import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
    const { id, name, image, rating, short_screenshots, genres } = props.data;
    return (
        <div className={styles.container}>
            <Link to={`/game/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={image} alt={name}/>
            <h3>{name}</h3>
            <p id={styles.rating}>{rating}/5</p>
            <p id={styles.genres}>{genres}</p>
            </Link>
        </div>
    )
}

export default Card;