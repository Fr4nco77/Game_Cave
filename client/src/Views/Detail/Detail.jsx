import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import styles from "./Detail.module.css";

const Detail = () => {
    const { id } = useParams();
    const [ game, setGame ] = useState(undefined);
    
    const petition = async() => {
        const response = (await axios(`http://localhost:3001/videogames/${id}`)).data;
        setGame(response);
    }

    useEffect(()=> {
        petition();
        return setGame(undefined);
    }, [id])


    if(!game) return <Loader/>

    return (
        <div id={styles.container}>
            <div id={styles.title}>
                <h1>{game.name}</h1>
            </div>
            <div id={styles.head}>
                <img src={game.image} alt={game.name} />
                <div id={styles.info}>
                    <div id={styles.category}>
                        <div id={styles.left}>
                            <p>Released: {game.released}</p>
                            <p>Rating: {game.rating}</p>
                            <p><u>Platforms</u></p>
                            <div id={styles.platforms}>
                            {
                                game.platforms.map((platform, index) => <p key={index}>{platform}</p>)
                            }
                            </div>
                        </div>
                        <div id={styles.right}>
                            <p>Genres</p>
                            <div id={styles.genres}>
                                {
                                    game.genres.map((genre, index) => <p key={index}>{genre}</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <div id={styles.bottom}>
                        <p>Tags</p>
                        <div id={styles.tags}>
                                {
                                    game.tags.map((tag) => <p>{tag}</p>)
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div id={styles.description}>
                <p dangerouslySetInnerHTML={{__html:game.description}}></p>
            </div>
        </div>
    )
}

export default Detail;