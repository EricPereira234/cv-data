import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importando arquivos
import Home from "./pages/Home";

export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
        </Router>
    )
}