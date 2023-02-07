import "./dashboard.css";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

//importando icones
import { AiOutlinePlusCircle } from "react-icons/ai";


export default function Deshboard() {

    async function logout() {
        await signOut(auth)
    }

    return (
        <>
            <div className="menu-dashboard">
                <label>Deshboard</label>
                <Link to={'/new'} ><AiOutlinePlusCircle size={25} color={'#fff'} /></Link>
                <button onClick={logout} >Sair</button>
            </div>
            <div className="card-home" >



            </div>

        </>
    )
}