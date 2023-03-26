import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import verifyLogin from "../utils/verify";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
    const [dados, setDados] = useState({ "logado": false, "nivel": 0 });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            verifyLogin(localStorage.getItem("token")).then((data) => {
                if(location.pathname === "/admin" && data.token !== 2) navigate("/dashboard"); // Tentando acessar dashboard de admin sem permissão

                else if(location.pathname === "/dashboard" && data.token === 0) { localStorage.removeItem("token"); navigate("/"); } // Tentando entrar na dashboard com token inválido

                else if((location.pathname === "/signIn" || location.pathname === "/signUp") && data.token === 1) navigate("/dashboard"); // Tentando entrar na página SignIn/SignUp sendo usuário
                else if((location.pathname === "/signIn" || location.pathname === "/signUp") && data.token === 2) navigate("/admin"); // Tentando entrar na página SignIn/SignUp sendo admin
            
                setDados({
                    "logado": true,
                    "nivel": data.token
                });
            })
        }
        else if(location.pathname !== "/signIn" && location.pathname !== "/signUp" && location.pathname !== "/") navigate("/");
    }, [location, navigate])

    return (
        <header className="header">
            <div className="home">
                <Link to="/"><img src="/logo.png" alt="logo" /></Link>
                <Link to="/dashboard">Mind Courses</Link>
            </div>
            <div className="buttons">
                <HeaderButtons logado={dados.logado} nivel={dados.nivel} />
            </div>
        </header>
    )
}

export default Header