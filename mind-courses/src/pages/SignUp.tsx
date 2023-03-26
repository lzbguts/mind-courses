import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    document.title = "Sign Up - Mind Courses";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({ status: -1, texto: "" });

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
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Insira seu email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder="Insira sua senha" required onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme sua senha" required onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="submit" value="Entrar" />
            </form>
            { password !== confirmPassword && <p>As senhas devem ser iguais.</p> }
            {
                message.status === 0 ? (
                    <p>{message.texto} Entre na sua conta <Link to="/signIn">aqui</Link></p>
                )
                : message.status === 1 && (
                    <p>{message.texto}</p>
                )
            }
        </>
    );
}

export default SignUp;