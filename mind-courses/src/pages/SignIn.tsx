import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensagem from "../components/Mensagem";

const SignIn = () => {
    document.title = "Entrar - Mind Courses";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState({ status: -1, texto: "" });

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const dados = {
            "email": email,
            "senha": password
        }

        const req = await fetch(`${API}/signIn`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await req.json();

        if(data.token) {
            localStorage.setItem("token", data.token);

            if(data.nivel === 1) navigate("/dashboard");
            else if(data.nivel === 2) navigate("/admin");
        }
        else setMessage({
            status: 1,
            texto: "Dados inválidos."
        });
    }

    return (
        <>
            <h1 className="dashboard-title">Entrar na sua conta</h1>
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
                        <div className="form-control buttons center">
                            <button type="submit">Entrar</button>
                        </div>
                        { message.status >= 0 && <Mensagem texto={message.texto} /> }
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignIn;