import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Game Cave</h1>
            <button onClick={()=>navigate("/home")}></button>
        </div>
    )
}

export default Landing;