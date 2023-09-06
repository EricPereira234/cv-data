import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";



//importando arquivos
import Logo from "../../images/logoEric.png";

export default function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [handleLoader, setHandleLoader] = useState('Logar');

    function logar(e) {
        e.preventDefault();
        setHandleLoader('Carregando..')
        signInWithEmailAndPassword(auth, email, senha).then(() => {
            toast.success('bem-vindo de volta!');
            setHandleLoader('Logar');
            navigate('/dashboard');
        }).catch(() => {
            toast.error('usuario não logado verifique todos os campos');
            setHandleLoader('Logar');
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
                    <button type={'submit'} >{handleLoader}</button>
                </form>
            </div>
        </div>
    )
}