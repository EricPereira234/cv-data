import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./list.module.css";
import { FaBirthdayCake } from "react-icons/fa";
import AvisoNiver from "../../componets/AvisoNiver";

import { db } from "../../services/firebaseConnection";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function List() {
  const [links, setLinks] = useState([]);

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
        });
      });
      setLinks(lista);
    });

    return () => unsub();
  }, []);

  const sortedLinks = [...links].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <FaBirthdayCake size={20} color="#fff" />
          <Link to="/niver" className={styles.linkNiver}>
            Ver aniversariantes do mês
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <AvisoNiver />

        <h2 className={styles.title}>Lista de Sócios</h2>

        <div className={styles.listContainer}>
          {sortedLinks.map((item) => (
            <div key={item.id} className={styles.listItem}>
              <div className={styles.avatar}>
                {item.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.code}>Cód. {item.numero}</p>
              </div>
            </div>
          ))}

          {sortedLinks.length === 0 && (
            <p className={styles.empty}>Nenhum sócio cadastrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}
