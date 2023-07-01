import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
    const { id, name, image, rating, genres } = props.data;
    return (
        <div className={styles.container}>
            <Link to={`/game/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div id={styles.image}>
                    <img src={image} alt={name}/>
                </div>
                <div id={styles.info}>
                    <div id={styles.text}>
                        <p id={styles.title}>{name}</p>
                        <p id={styles.rating}>Rating: {rating}/5</p>
                    </div>
                    <ul id={styles.genres}>
                        {
                            genres?.map((genre, index) => <li key={index}>{genre}</li>)
                        }
                    </ul>
                </div>
            </Link>
            
        </div>
    )
}

export default Card;