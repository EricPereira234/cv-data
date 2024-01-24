

import { Link } from "react-router-dom";
import styles from "./list.module.css";

export default function List(){
    return(
        <div className={styles.cardArea} >
            <div className={styles.cardMenu} >
                <Link to={'/niver'}>Aniversariantes</Link>
            </div>
            <div className={styles.cardList} >
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
                <label>Raimundo José e família do cajueiro</label>
            </div>
        </div>
    )
}