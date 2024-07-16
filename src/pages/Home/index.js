import "./home.css";
import { useState, useEffect } from "react";


import { db } from "../../services/firebaseConnection";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";



//importando arquivos
import Menu from "../../componets/Menu";


export default function Home() {

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


    //buscando o aniversariante do dia
    const hoje = new Date(dataFormatada)
    const list = [];
    links.map(item => {
        const birth = new Date(item.data);
        if (birth.getDate() === (hoje.getDate() - 1) && birth.getMonth() === hoje.getMonth()) {
            list.push({ name: item.name, data: item.data });
        }

    })



    //buscando o aniversariante do mês
    const list2 = [];
    links.map(item => {
        const birth = new Date(item.data);
        if (birth.getMonth() === hoje.getMonth()) {
            list2.push({ name: item.name, data: birth.getDate() + 1 });
        }

    })

    // ordenando numericamente apartir do campo item.data
    list2.sort((a, b) => a.data - b.data);





    return (
        <div>
            <Menu />
            <div className="card-home" >
                <h1>aniversariante do dia</h1>
                {list.map((item, index) => (

                    <div className="card-home-niver" >

                        <h3>{item.name}  <label>🥳</label> </h3>

                    </div>

                ))}

            </div>

            <div className="card-home2" >
                <h1>aniversariantes do mês</h1>
                {list2.map((item, index) => (

                    <div className="card-item-todos-do-mes" >

                        <div className="item-todos-do-mes" >
                            <div className="item-todos-do-mes-name">{item.name}</div> 
                            <div className="item-todos-do-mes-dia">{item.data}</div>
                        </div>

                    </div>

                ))}
            </div>

        </div>
    )
}