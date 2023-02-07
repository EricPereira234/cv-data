import "./new.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

import { db, auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

//importando icones
import { AiOutlinePlusCircle } from "react-icons/ai";


export default function New() {
    const [nameInput, setNameInput] = useState('');
    const [dateInput, setDateInput] = useState('');

    async function logout() {
        await signOut(auth)
    }


     //função que salva os links
     async function SalvaRegitro(e) {
        e.preventDefault();

        if(nameInput === '' || dateInput === ''){
            toast.error('Preencha todos os campos');
            return;
        }

    

        addDoc(collection(db, "aniversariantes"), {
            name: nameInput,
            data: dateInput,
            created: new Date(),
        }).then(()=>{
            setNameInput('');
            setDateInput('');
            toast.success('salvo com sucesso!');
        }).catch((err)=>{
            toast.error('que pena não salvou !')
        })
    }

    return (
        <>
            <div className="menu-dashboard">
                <label><Link to={'/dashboard'} style={{ color: '#fff' }} >Deshboard</Link></label>
                <Link to={'/new'} ><AiOutlinePlusCircle size={25} color={'#fff'} /></Link>
                <button onClick={logout} >Sair</button>
            </div>

            <div className="card-new" >
                <div className="card-form-new" >
                    <form onSubmit={SalvaRegitro} >
                        <h1>Novo Aniversariante</h1>
                        <input type={'date'} />
                        <input type={'text'} placeholder={'nome'} 
                            onChange={(e)=>setNameInput(e.target.value)}
                        />
                        <button type={'submit'}>Salvar</button>
                    </form>
                </div>
            </div>
        </>
    )
}