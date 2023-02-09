import "./dashboard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";


import { db, auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

//importando icones
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";


export default function Deshboard() {
    const [r , sertR] = useState(false);


    async function logout() {
        await signOut(auth)
    }

    //função de deletar do banco
    async function Deletar(id) {
      
        let r =  prompt('Cuidado ! para excluir digite SIM!');

        if (r === 'sim') {
            const docRef = doc(db, "aniversariantes", id);
            await deleteDoc(docRef);
            toast.success('Aniversariante deletado com sucesso !')
        }
        else {
            toast.error("Not deleted!");
        }
       
    }



    //buscando registros no firestory
    const [links, setLikis] = useState([]);

    useEffect(() => {

        const linksRef = collection(db, "aniversariantes");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    data: doc.data().data,

                })
            })

            setLikis(lista);

        })

    }, []);


    return (
        <>
            <div className="menu-dashboard">
                <label>Deshboard</label>
                <Link to={'/new'} ><AiOutlinePlusCircle size={25} color={'#fff'} /></Link>
                <button onClick={logout} >Sair</button>
            </div>
            <div className="card-home-dashboard" >

                {links.map((item, index) => (

                    <article>
                        <p>{item.name}
                            <button onClick={()=>Deletar(item.id)} >
                                <RiDeleteBin6Fill size={15} />
                            </button>
                        </p>
                    </article>

                ))}

            </div>

        </>
    )
}