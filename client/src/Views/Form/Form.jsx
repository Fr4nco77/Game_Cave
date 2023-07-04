import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, getVideogames, postVideogame } from "../../Redux/Actions";
import validation from "./validation";
import Loader from "../Components/Loader/Loader";
import styles from "./Form.module.css";

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const games = useSelector((state) => state.videoGames);
    const [ errors, setErrors] = useState({
        name: "Campo Obligatorio",
        released: "Campo Obligatorio",
        rating: "Campo Obligatorio",
        platforms: "Selecciona al menos uno",
        genres: "Selecciona al menos uno",
        description: "Campo Obligatorio",
    });
    const [ data, setData ] = useState({
        name: "",
        released: "",
        rating: 0,
        platforms: [],
        tags: [],
        description: "",
        // short_screenshots: [],
        genres: [],
    });
    const [image, setImage] = useState("");

    useEffect(()=> {
        if(!games.length) dispatch(getVideogames());
        if(!genres.length) dispatch(getGenres());
    }, []);

    const handleImage = (e) => {
        setImage(e.target.value);
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value });

        setErrors(validation({...data}));
    };
    
    const handleCheckboxChange = (e) => {
        const { name, checked, value } = e.target;
        let newData = { ...data };
        if (checked) {
            newData[name].push(value);
        } 
        else {
            newData[name] = newData[name].filter((element) => element !== value);
        }
        setData(newData);
    };
    
    const handleTagSubmit = (e) => {
        e.preventDefault();
        const tagInput = document.getElementById("tag-input");
        if (tagInput.value !== "") {
            setData({ ...data, tags: [...data.tags, tagInput.value] });
            tagInput.value = "";
        }
    };

      
    const deleteTag = (indexToDelete) => {
        setData({
            ...data,
            tags: data.tags.filter((_, index) => index !== indexToDelete)
        });
    };
    
    // const handleScreenshotSubmit = (e) => {
    //     e.preventDefault();
    //     const screenshotInput = document.getElementById("screenshot-input");
    //     if (screenshotInput.value !== "") {
    //         setData({ ...data, short_screenshots: [...data.short_screenshots, screenshotInput.value] });
    //         screenshotInput.value = "";
    //     }
    // };

    const disabled = () => {
        let disable = true;
        for(let error in errors) {
            if(errors[error] === "") disable = false;
            else {
                disable = true;
                break;
            };
        };
        return disable;
    }
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(image.trim() !== "") {
            setData({
                ...data,
                image: image
            });
        }
        dispatch(postVideogame(data));
        navigate("/home");
        //console.log(data);
    };
    
    if(!genres.length || !platforms.length) return <Loader/>;

    return (
        <div id={styles.container}>
            <form id={styles.form} onSubmit={handleSubmit}>
                <div id={styles.top}>
                    <div id={styles.left}>
                        <div id={styles.data}>
                            <label htmlFor="name-input">Nombre:</label>
                            <div id={styles.name} className={styles.inputs}>
                                <input type="text" id="name-input" name="name" onChange={handleInputChange} />
                                <span>{errors.name}</span>
                            </div>
                            <label htmlFor="released-input">Fecha de lanzamiento:</label>
                            <div className={styles.inputs} id={styles.date}>
                                <input type="date" id="released-input" name="released" onChange={handleInputChange} />
                                <span>{errors.released}</span>
                            </div>
                            <label htmlFor="rating-input">Rating:</label>
                            <div className={styles.inputs}>
                                <input type="number" id="rating-input" name="rating" step="0.1" onChange={handleInputChange} />
                                <span>{errors.rating}</span>
                            </div>
                        </div>
                        <div className={styles.options}>
                            <div>
                               <label>Plataformas:</label>
                               <span>{errors.platforms}</span>
                            </div> 
                            <div className={styles.checkBox}>
                                {
                                    platforms.map((platform, index) => {
                                        return (
                                            <label className={styles.label} key={index} htmlFor={platform}>{platform}
                                                <input type="checkbox" id={platform} name="platforms" value={platform} onChange={handleCheckboxChange} />
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.options}>
                            <div>
                                <label>Géneros:</label>
                                <span>{errors.genres}</span>
                            </div>
                            <div className={styles.checkBox}>
                                {
                                    genres.map((genre) => {
                                        return (
                                            <label className={styles.label} key={genre.id} htmlFor={genre.name}>{genre.name}
                                                <input type="checkbox" id={genre.name} name="genres" value={genre.name} onChange={handleCheckboxChange} />
                                            </label>                         
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div id={styles.right}>
                        <div id={styles.image}>
                            <label htmlFor="image-input">Imagen:</label>
                            <input type="text" id="image-input" onChange={handleImage} />
                        </div>
                        <img src={image} alt="Vista_previa" />
                        {/* <label htmlFor="screenshot-input">Screenshots:</label>
                        <input type="text" id="screenshot-input" name="screenshot" />
                        <button type="button" onClick={handleScreenshotSubmit}>Agregar</button> */}
                        <div id={styles.tags}>
                            <label htmlFor="tag-input">Tags:</label>
                            <div id={styles.tagsSubmit}>
                                <input type="text" id="tag-input" name="tag" />
                                <button type="submit" onClick={handleTagSubmit}>Agregar</button>
                            </div>
                            <div id={styles.showTags}>
                                {data.tags.map((tag, index) => (
                                    <div key={index}>
                                        <span >{tag}</span><button type="button" className="delete-btn" onClick={()=>deleteTag(index)}>x</button>
                                    </div>
                                ))}    
                            </div>
                        </div>
                    </div>
                </div>
                <div id={styles.bottom}>
                    <div>
                        <label htmlFor="description-input">Descripción:</label>
                        <span>{errors.description}</span>
                    </div>
                    <textarea id="description-input" name="description" onChange={handleInputChange}></textarea>    
                </div>
                <button  id={styles.submit} type="submit" disabled={disabled()}>Guardar</button>
        </form>
    </div>
    )
}

export default Form;