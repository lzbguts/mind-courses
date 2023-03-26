import { Link } from "react-router-dom";

const Home = () => {
    document.title = "Home - Mind Courses";

    return (
        <>
            <h1 className="dashboard-title">Mind Courses</h1>
            <div className="home-container">
                <div>O lugar perfeito para administrar seus cursos!</div>

                <div className="banner-1">
                    <h1 className="dashboard-title">É muito fácil de usar!</h1>
                    <p>Cadastre-se agora mesmo:</p>
                    <div className="buttons">
                        <Link to="/signUp" >Registrar-se</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;