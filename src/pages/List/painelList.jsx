import styles from "./list.module.css";
import React, { useState, useEffect } from "react";
import {toast} from "react-toastify";


import { db, auth } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";





export default function PainelList() {

    //buscando registros no firestory
    const [links, setLikis] = useState([]);


    useEffect(() => {

        const linksRef = collection(db, "socios");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    numero: doc.data().numero,

                })
            })

            setLikis(lista);

        })

    }, []);
    
    // ordenando pela letra do alfabeto com base na propriedade nome
    links.sort((a, b)=> a.name.localeCompare(b.name));


    //função de deletar do banco
    async function Deletar(id) {

        let r = prompt('Cuidado ! para excluir digite SIM!');

        if (r === 'sim') {
            const docRef = doc(db, "socios", id);
            await deleteDoc(docRef);
            toast.success(' deletado com sucesso !')
        }
        else {
            toast.error("Not deleted!");
        }

    }

    return (
        <div className={styles.cardGeralList} >

            <div className={styles.cardPainel} >
                {links.map(item => {
                    return (
                        <label className={styles.labelPainelList} >cod: {item.numero} {item.name}   <div className={styles.buttonEx} onClick={()=>Deletar(item.id)}  >[ex]</div> </label>
                    )
                })}
            </div>

        </div>
    )
}