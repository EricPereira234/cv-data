import "./home.css";
import { useState, useEffect } from "react";


import { db, auth } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";



//importando arquivos
import Menu from "../../componets/Menu";


export default function Home() {

    let data = new Date();
    let dia = data.getDate()
    let mes = data.getMonth();
    let dataFormatada;
     
    if (dia < 10 || mes < 10) {
        dataFormatada = data.getFullYear() + "/" + 0 +((data.getMonth() + 1)) + "/" + 0 + ((data.getDate())); 
    } else {
        dataFormatada = data.getFullYear() + "/" + ((data.getMonth() + 1)) + "/" + ((data.getDate())); 
    }

   

    //alert(dataFormatada);

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
            <Menu />
            <div className="card-home" >

            </div>

        </>
    )
}