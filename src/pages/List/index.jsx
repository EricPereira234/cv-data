import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./list.module.css";


import { db, auth } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

export default function List() {

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

    // Ordenar o array com base na propriedade 'name' e colocar em ordem alfabética
    links.sort((a, b) => a.name.localeCompare(b.name));


    return (
        <div className={styles.cardArea} >
            <div className={styles.cardMenu} >
                <Link to={'/niver'}>Aniversariantes</Link>
            </div>
            <div className={styles.cardList} >
                {links.map(item => {
                    return (
                        <label>{item.name}</label>
                    )
                })}


            </div>
        </div>
    )
}