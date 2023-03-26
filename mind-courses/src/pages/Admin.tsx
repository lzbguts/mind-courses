import { useEffect, useState } from "react";
import Card from "../components/Card";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { FaTimes } from 'react-icons/fa';

const Admin = () => {
    document.title = "Admin Dashboard - Mind Courses";
    const [cursos, setCursos] = useState<any[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const pesquisaInicial = "";

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    useEffect(() => {
        const getCursos = async (token: any) => {
            const req = await fetch(`${API}/courses/all`, {
                method: "POST",
                body: JSON.stringify({ "token": token, pesquisa: pesquisaInicial }),
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
    }, [API, pesquisa]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const req = await fetch(`${API}/courses/all`, {
            method: "POST",
            body: JSON.stringify({ "token": localStorage.getItem("token"), pesquisa: pesquisa }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const data = await req.json();

        setCursos(data.data);
    }

    const clear = () => {
        setPesquisa("");
        const p = document.querySelector("#pesquisa") as any;
        p.value = "";
    }

    return (
        <>
            <h1 className="dashboard-title">Todos os cursos</h1>
            <form onSubmit={handleSubmit} className="form-search">
                <input type="text" name="pesquisa" id="pesquisa" placeholder="Pesquisar..." onChange={(e) => setPesquisa(e.target.value)} />
                <button type="submit" className="search"><HiMagnifyingGlass /></button>
                <button type="button" className="search" onClick={clear}><FaTimes /></button>
            </form>
            <div className="dashboard">
                { cursos.map((curso) => <Card curso={curso} key={curso.id} />) }
            </div>
        </>
    );
}

export default Admin;