import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    document.title = "Sign In - Mind Courses";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Insira seu email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder="Insira sua senha" required onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Entrar" />
            </form>
        </>
    );
}

export default SignIn;