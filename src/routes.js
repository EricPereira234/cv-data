import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importando arquivos
import Home from "./pages/Home";
import Login from "./pages/Login";
import Deshboard from "./pages/Dashboard";
import New from "./pages/New";
import Private from "./Private";

export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={ <Private><Deshboard/></Private> } />
                <Route path="/new" element={<Private><New/></Private>} />
            </Routes>
        </Router>
    )
}