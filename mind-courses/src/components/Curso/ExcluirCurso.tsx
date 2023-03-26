import { Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API || "http://localhost:4000";

const ExcluirCurso = ({ id } : any) => {
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const req = await fetch(`${API}/courses/delete`, {
            method: "POST",
            body: JSON.stringify({ "token": localStorage.getItem("token"), "id": id }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await req.json();

        if(!data.status) navigate("/admin");
    }

    return (
        <>
            <h1 className="dashboard-title">Excluir curso?</h1>
            <div className="curso-container">
                <form onSubmit={handleSubmit} className="form-container-excluir">
                    <div className="buttons flex">
                        <button type="submit">Sim</button>
                        <Link to="/dashboard" >Não</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ExcluirCurso;