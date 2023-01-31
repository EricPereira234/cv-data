import "./login.css";

//importando arquivos
import Logo from "../../images/logoEric.png";
export default function Login(){
    return(
        <div className="card-login" >
            <div className="card-logo ">
                <img src={Logo} alt="logo do sistema" />
            </div>

            <form>
                <label>Email</label>
                <input type={'email'} placeholder="exemple@gmail.com" />
                <label>Senha</label>
                <input type={'password'} placeholder="*******" />
                <button>Entrar</button>
            </form>
        </div>
    )
}