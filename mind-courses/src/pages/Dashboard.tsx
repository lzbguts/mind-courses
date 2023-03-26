import { useEffect, useState } from "react";
import Card from "../components/Card";

const Dashboard = () => {
    document.title = "Dashboard - Mind Courses";
    const [cursos, setCursos] = useState<any[]>([]);

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    useEffect(() => {
        const getCursos = async (token: any) => {
            const req = await fetch(`${API}/courses`, {
                method: "POST",
                body: JSON.stringify({ "token": token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            const data = await req.json();
    
            setCursos(data.data);
        }

        getCursos(localStorage.getItem("token")).catch((error) => {
            console.log(error);
        })
    }, [API]);

    return (
        <>
            <h1 className="dashboard-title">Meus cursos</h1>
            <div className="dashboard">
                { cursos.map((curso) => <Card curso={curso} key={curso.id} />) }
            </div>
        </>
    );
}

export default Dashboard;