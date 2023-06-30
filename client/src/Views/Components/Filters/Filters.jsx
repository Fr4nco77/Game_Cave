import { useDispatch } from "react-redux"
import { filterByGenre, filterByOrigin, removeFilters } from "../../../Redux/Actions"


const Filters = (props) => {
    const { genres } = props;
    const dispatch = useDispatch()

    const handleOptionGenre = (e) => {
        dispatch(filterByGenre(e.target.value));
    }

    const handleOptionOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value));
    }

    const handleFilters = () => {
        dispatch(removeFilters());
    }
    return (
        <aside>
            <p>Filtros:</p>
            <select onChange={handleOptionGenre}>
                {
                    genres?.map((genre) => {
                        return(
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        )
                    })
                }
            </select>
            <select onChange={handleOptionOrigin}>
                <option value="API">Other Video Games</option>
                <option value="DB">Your Video Games</option>
            </select>
            <button onClick={handleFilters}>Reset Filters</button>
        </aside>
    )
}

export default Filters;