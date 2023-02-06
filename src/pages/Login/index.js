import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";



//importando arquivos
import Logo from "../../images/logoEric.png";

export default function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    function logar(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, senha).then(() => {
            //toast.success('bem-vindo de volta!');
            navigate('/dashboard');
        }).catch(() => {
            //toast.error('usuario não logado verifique todos os campos');
        });

        signInWithEmailAndPassword(auth, email, senha).then(() => {
            //toast.success('bem-vindo de volta!');
            navigate('/dashboard');
        }).catch(() => {
            //toast.error('usuario não logado verifique todos os campos');
        });

    }

    return(
        <div className="card" >
        <div className="card-login" >
            <div className="card-logo ">
                <img src={Logo} alt="logo do sistema" />
            </div>

            <form onSubmit={logar} >
                <label>Email</label>
                <input type={'email'} placeholder="exemple@gmail.com" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha</label>
                <input type={'password'} placeholder="*******" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type={'submit'} >Entrar</button>
            </form>
        </div>
        </div>
    )
}