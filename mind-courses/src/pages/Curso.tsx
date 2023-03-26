import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import FormNovo from "../components/Curso/FormNovo";
import ExcluirCurso from "../components/Curso/ExcluirCurso";
import FormEditar from "../components/Curso/FormEditar";
import NotFound from "./NotFound";

const Curso = () => {
    const params = useParams();
    const id = params.id;
    let action = params.action;

    if(id === "novo") action = "novo"

    const [curso, setCurso] = useState({ idUsuario: 0, nome: "", professor: "", categoria: "", descricao: "", imagem: "" })

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    useEffect(() => {
        if(action !== "novo") {
            const getCursos = async (token: any) => {
                const req = await fetch(`${API}/courses/c/${id}`, {
                    method: "POST",
                    body: JSON.stringify({ "token": token }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            
                const data = await req.json();
                
                setCurso(data.data[0]);
            }

            getCursos(localStorage.getItem("token")).catch((error) => {
                console.log(error);
            })
        }
    }, [API, action, curso, id]);

    if(!curso) {
        return <NotFound />
    }

    if(action) {
        if(action === "edit") return <FormEditar id={id} />
        else if(action === "delete") return <ExcluirCurso id={id} />
        else if(action === "novo") return <FormNovo />
        else console.log("invalid");
    }
    else {
        document.title = `${curso.nome} - Mind Courses`;

        return (
            <>
                <h1 className="dashboard-title">{curso.nome}</h1>
                <div className="curso-container">
                    <div className="curso-view">
                        <img src={curso.imagem} alt="imagem" />
                        <div className="curso-view-desc">
                            <p>Professor(a): {curso.professor}</p>
                            <p>Categoria: {curso.categoria}</p>
                            <p>Descrição: {curso.descricao}</p>
                        </div>
                        <div className="curso-actions">
                            <Link to={`/curso/${id}/edit`} ><BsPencilSquare/></Link>
                            <Link to={`/curso/${id}/delete`} ><BsTrash/></Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <></>
    );
}

export default Curso;