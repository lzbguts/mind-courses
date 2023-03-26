import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensagem from "../components/Mensagem";

const SignUp = () => {
    document.title = "Registrar - Mind Courses";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({ status: -1, texto: "" });
    const navigate = useNavigate();

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const dados = {
            "email": email,
            "senha": password
        }

        if(password !== confirmPassword) return;

        const req = await fetch(`${API}/signUp`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await req.json();
        
        setMessage({
            status: data.status,
            texto: data.message
        });

        if(message.status === 0) navigate("/signIn");
    }

    return (
        <>
            <h1 className="dashboard-title">Criar nova conta</h1>
            <div className="curso-container">
                <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="nome">Email:</label>
                            <input type="email" name="email" id="email" placeholder="Insira seu email." required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha" id="senha" placeholder="Insira sua senha." required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="confirmarSenha">Confirmar senha:</label>
                            <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder="Confirme sua senha." required onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="form-control buttons center">
                            <button type="submit">Criar conta</button>
                        </div>
                        { password !== confirmPassword && <Mensagem texto="As senhas devem ser iguais." /> }
                        { message.status >= 0 && <Mensagem texto={message.texto} /> }
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;