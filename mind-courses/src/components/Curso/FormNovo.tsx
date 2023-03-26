import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensagem from "../Mensagem";

const FormNovo = () => {
    const [nome, setNome] = useState("");
    const [professor, setProfessor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [message, setMessage] = useState({ status: -1, texto: "" });
    const navigate = useNavigate();

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const obj = document.getElementById("imagem") as any;
        if(obj.files[0] && !"image/png image/webp image/jpg image/jpeg".includes(obj.files[0].type)) {
            setMessage({
                status: 3,
                texto: "Imagem: Formato inválido."
            });
            return;
        }

        const dados = {
            "token": localStorage.getItem("token"),
            "nome": nome,
            "professor": professor,
            "categoria": categoria,
            "descricao": descricao,
        }

        fetch(`${API}/courses/new`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (req) => {
            const data = await req.json();

            setMessage({
                status: data.status,
                texto: data.message
            });
    
            if(!obj.files[0]) {
                localStorage.setItem(data.id.toString(), "/assets/no-image.png");
                navigate(`/curso/${data.id}`);
                return;
            }

            const reader = new FileReader();

            reader.readAsDataURL(obj.files[0] as any);

            reader.addEventListener('load', () => {
                localStorage.setItem(data.id.toString(), reader.result as any);
            });

            navigate(`/curso/${data.id}`);
        });
    }

    const mudarImagem = (e: any) => {
        if(e.target.files[0] && "image/png image/webp image/jpg image/jpeg".includes(e.target.files[0].type)) {
            const imgCurso = document.getElementById("imgCurso") as any;
            imgCurso.src = URL.createObjectURL(e.target.files[0]);
        }
    }

    return (
        <>
            <h1 className="dashboard-title">Criar novo curso</h1>
            <div className="curso-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <img src="/assets/no-image.png" alt="" id="imgCurso" />
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" name="nome" id="nome" placeholder="Insira o nome do curso." required onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="professor">Professor:</label>
                            <input type="text" name="professor" id="professor" placeholder="Insira o professor do curso." required onChange={(e) => setProfessor(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="categoria">Categoria:</label>
                            <input type="text" name="categoria" id="categoria" placeholder="Insira a categoria do curso." required onChange={(e) => setCategoria(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="descricao">Descrição:</label>
                            <input type="text" name="descricao" id="descricao" placeholder="Insira a descrição do curso." required onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="imagem">Imagem:</label>
                            <label htmlFor="imagem" className="imgInputLabel">Enviar imagem...</label>
                            <input type="file" name="imagem" id="imagem" className="imgInput" accept="image/png, image/webp, image/jpg, image/jpeg" onChange={mudarImagem} />
                        </div>
                        <div className="form-control buttons center">
                            <button type="submit">Enviar</button>
                        </div>
                        { message && <Mensagem texto={message.texto} /> }
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormNovo;