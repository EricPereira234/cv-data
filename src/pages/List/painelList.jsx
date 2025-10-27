import styles from "./list.module.css";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import { FaTrashAlt, FaEdit, FaPrint } from "react-icons/fa";

import { db } from "../../services/firebaseConnection";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

export default function PainelList() {
  const [filterSocio, setFilterSocio] = useState("");
  const [socios, setSocios] = useState([]);

  useEffect(() => {
    const sociosRef = collection(db, "socios");
    const queryRef = query(sociosRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          numero: doc.data().numero,
        });
      });
      setSocios(lista);
    });

    return () => unsub();
  }, []);

  const filteredSocios = socios
    .filter((item) =>
      item.name.toLowerCase().includes(filterSocio.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Deletar
  async function Deletar(id) {
    let r = prompt("Cuidado! Para excluir digite SIM");
    if (r?.toLowerCase() === "sim") {
      const docRef = doc(db, "socios", id);
      await deleteDoc(docRef);
      toast.success("Deletado com sucesso!");
    } else {
      toast.error("Ação cancelada!");
    }
  }

  // Editar
  async function Editar(id, nomeAtual) {
    const novoNome = prompt("Digite o novo nome:", nomeAtual);
    if (novoNome && novoNome.trim() !== "") {
      const docRef = doc(db, "socios", id);
      await updateDoc(docRef, { name: novoNome });
      toast.success("Nome atualizado com sucesso!");
    } else {
      toast.error("Alteração cancelada ou nome inválido.");
    }
  }

  // Gerar tabela para impressão
  function imprimirTabela() {
    const meses = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const tabelaHTML = `
      <html>
      <head>
        <title>Controle de Contribuições dos Sócios do programa da rádio</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #aaa;
            text-align: center;
            padding: 6px;
            font-size: 14px;
          }
          th {
            background: #f0f0f0;
          }
          td:first-child {
            text-align: left;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <h2>Controle de Contribuições Mensais</h2>
        <table>
          <thead>
            <tr>
              <th>Nome do Sócio</th>
              ${meses.map(m => `<th>${m}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${filteredSocios.map(socio => `
              <tr>
                <td>${socio.name}</td>
                ${meses.map(() => "<td></td>").join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(tabelaHTML);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <div className={styles.cardGeralList}>
      <div className={styles.header}>
        <h2>Controle de Sócios</h2>

        <div className={styles.topActions}>
          <div className={styles.cardInputSearch}>
            <IoIosSearch size={22} className={styles.iconSearch} />
            <input
              type="text"
              placeholder="Buscar sócio..."
              value={filterSocio}
              onChange={(e) => setFilterSocio(e.target.value)}
            />
          </div>

          <button className={styles.btnPrint} onClick={imprimirTabela}>
            <FaPrint size={16} />
            <span>Imprimir Tabela</span>
          </button>
        </div>
      </div>

      <div className={styles.cardPainel}>
        {filteredSocios.map((item) => (
          <div key={item.id} className={styles.socioCard}>
            <div>
              <strong>{item.numero}</strong> - {item.name}
            </div>
            <div className={styles.actions}>
              <FaEdit
                className={styles.iconEdit}
                title="Editar"
                onClick={() => Editar(item.id, item.name)}
              />
              <FaTrashAlt
                className={styles.iconDelete}
                title="Excluir"
                onClick={() => Deletar(item.id)}
              />
            </div>
          </div>
        ))}

        {filteredSocios.length === 0 && (
          <p className={styles.empty}>Nenhum sócio encontrado...</p>
        )}
      </div>
    </div>
  );
}
