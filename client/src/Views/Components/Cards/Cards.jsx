import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { orderByName, orderByRating } from "../../../Redux/Actions";
import styles from "./Cards.module.css";

const Cards = (props) => {
    const { data } = props;
    const dispatch = useDispatch();

    const handleOption = (e) => {
        const option = e.target.value;
        if(option === "A" || option === "D") dispatch(orderByName(option));
        if(option === "+" || option === "-") dispatch(orderByRating(option));
    }

    return(
        <div id={styles.container}>
            <div id={styles.orders}>
                <p>Show:</p>
                <select onChange={handleOption}>
                    <option value="Todos" disabled selected>All</option>
                    <optgroup label="Alphabetically"></optgroup>
                        <option value="A">A-Z</option>
                        <option value="D">Z-A</option>
                    <optgroup label="Rating">
                        <option value="+">High</option>
                        <option value="-">Low</option>
                    </optgroup>
                </select>
            </div>
            <section id={styles.cards}>
                {
                    typeof data[0] === "string" ? (<p>{data}</p>) 
                    : 
                    (data?.map((game) => <Card key={game.id} data={game}/>))
                }
            </section>
        </div>
    )
}

export default Cards;