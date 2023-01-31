import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importando arquivos
import Home from "./pages/Home";
import Login from "./pages/Login";
import Deshboard from "./pages/Dashboard";

export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Deshboard/>} />
            </Routes>
        </Router>
    )
}