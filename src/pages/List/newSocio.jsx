import styles from "./list.module.css";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { db, auth } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

export default function NewSocio() {
    const [number, setNumber] = useState();
    const [nome, setNome] = useState('');

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

    // buscando o ultimo número do registro para somar com mais 1 e exibir no intput number
    useEffect(()=>{
        var list = [];
    
        links.map(item => {
    
            const codigo = item.numero;
            list.push(parseInt(codigo))
        });
    
        setNumber ( list.pop() + 1)
       
        
    },[nome]);



    function SalvaSócio(e) {
        e.preventDefault();
        if (number != '' && nome != '') {


            addDoc(collection(db, "socios"), {
                numero: number,
                name: nome,
                created: new Date(),
            }).then(() => {
                setNome('');
                toast.success('salvo com sucesso!');
            }).catch((err) => {
                toast.error('que pena não salvou !');
            })




        } else {
            toast.warning('verifique todos os campos!')
        }
    }


    return (
        <div className={styles.cardFrom} >
            <form className={styles.forNewSocio} onSubmit={SalvaSócio} >
                <input type="number" placeholder="Nº"  disabled
                    value={number}
                   
                />
                <input type="text" placeholder="nome do sócio"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <button type="submit" >Salvar</button>
            </form>
        </div>
    )
}