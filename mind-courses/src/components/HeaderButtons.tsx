import { Link, useNavigate } from "react-router-dom";

const HeaderButtons = ({ logado, nivel } : any) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate(0);
        
    }

    if(!logado) {
        return (
            <>
                <Link to="/signIn">Entrar</Link>
                <Link to="/signUp">Registrar</Link>
            </>
        );
    }
    else if(nivel === 1) {
        return (
            <>
                <Link to="/curso/novo">Novo Curso</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={handleSignOut}>Sair</button>
            </>
        );
    }
    else if(nivel === 2) {
        return (
            <>
                <Link to="/curso/novo">Novo Curso</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={handleSignOut}>Sair</button>
            </>
        );
    }

    return (<></>);
}

export default HeaderButtons;