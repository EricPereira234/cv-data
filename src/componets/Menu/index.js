import "./menu.css";
import { Link } from "react-router-dom";

export default function Menu(){
    return (
        <div className="card-menu" >
            <label>Aniversariante do Mês</label>
            <Link to={'/login'} >Login</Link>
        </div>
    )
}