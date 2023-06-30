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
        <div>
            <img src={game.image} alt={game.name} />
            <h1>{game.name}</h1>
            <p>{game.released}</p>
            <p>{game.rating}</p>
            <p>{game.description}</p>
            <p>{game.platforms}</p>
            <p>{game.genres}</p>
            <p>{game.tags}</p>
        </div>
    )
}

export default Detail;