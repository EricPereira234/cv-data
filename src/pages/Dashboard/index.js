import "./dashboard.css";
import { Link } from "react-router-dom";

//importando icones
import {AiOutlinePlusCircle} from "react-icons/ai";


export default function Deshboard(){
    return(
        <>
            <div className="menu-dashboard">
                <label>Deshboard</label>
                <Link to={'/'} ><AiOutlinePlusCircle size={25} color={'#fff'} /></Link>
                <button>Sair</button>
            </div>
            <div className="card-home" >



            </div>

        </>
    )
}