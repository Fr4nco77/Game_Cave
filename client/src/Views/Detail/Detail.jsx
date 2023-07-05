import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVideogame, putVideogame, removeFilters, removeVideogames } from "../../Redux/Actions";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import styles from "./Detail.module.css";

const Detail = () => {
    const { id } = useParams();
    const [ game, setGame ] = useState(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const petition = async() => {
        const response = (await axios(`http://localhost:3001/videogames/${id}`)).data;
        setGame(response);
    }

    useEffect(()=> {
        petition();
        return setGame(undefined);
    }, [id])

    const handleRemove = () => {
        dispatch(removeVideogames());
        dispatch(removeFilters());
        dispatch(deleteVideogame(id));
        navigate("/home");
    }

    // const handlePut = () => {
    //     dispatch(putVideogame());
    //     navigate(`/game/${id}`);
    // }
    if(!game) return <Loader/>

    return (
        <div id={styles.container}>
            <div id={styles.title}>
                <h1>{game.name}</h1>
                {
                    id.includes("-") && <button onClick={handleRemove}>Remove</button>
                }
            </div>
            <div id={styles.head}>
                <img src={game.image} alt={game.name} />
                <div id={styles.info}>
                    <div id={styles.category}>
                        <div id={styles.left}>
                            <p>Released: {game.released}</p>
                            <p>Rating: {game.rating}</p>
                            <p>Platforms</p>
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
                                    game.tags?.map((tag) => <p>{tag}</p>)
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