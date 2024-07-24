import styles from "./avisoNiver.module.css";
import { useState, useEffect } from "react";


import { db } from "../../services/firebaseConnection";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";



const AvisoNiver = () => {

    let data = new Date();
    let dia = data.getDate()
    let mes = data.getMonth();
    let dataFormatada;

    if (dia < 10 || mes < 10) {
        dataFormatada = data.getFullYear() + "/" + 0 + ((data.getMonth()) + 1) + "/" + 0 + ((data.getDate()));
    } else {
        dataFormatada = data.getFullYear() + "/" + ((data.getMonth()) + 1) + "/" + ((data.getDate()));
    }


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


    //buscando o aniversariante do dia
    const hoje = new Date(dataFormatada)
    const list = [];
    links.map(item => {
        const birth = new Date(item.data);
        if (birth.getDate() === (hoje.getDate() - 1) && birth.getMonth() === hoje.getMonth()) {
            list.push({ name: item.name, data: item.data });
        }

    })

    const [ativaAviso, setAtivaAviso] = useState(false)
    useEffect(()=>{
        setAtivaAviso(true);
    },[list])


    return (
      ativaAviso ?  <div className={styles.cardAvisoNiver} ><span className={styles.textoPiscante}>hoje tem aniversariante </span> </div>  :  <div></div>
    )
}


export default AvisoNiver;