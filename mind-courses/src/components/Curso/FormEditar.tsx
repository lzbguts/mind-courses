import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensagem from "../Mensagem";

const FormEditar = ({ id } : any) => {
    const [nome, setNome] = useState("");
    const [professor, setProfessor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const [situacao, setSituacao] = useState(1);
    const [message, setMessage] = useState({ status: -1, texto: "" });
    const navigate = useNavigate();

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    useEffect(() => {
        const getCurso = async () => {
            const req = await fetch(`${API}/courses/c/${id}`, {
                method: "POST",
                body: JSON.stringify({ "token": localStorage.getItem("token") }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const req2 = await req.json();
            const data = req2.data[0];

            setNome(data.nome);
            setProfessor(data.professor);
            setCategoria(data.categoria);
            setDescricao(data.descricao);
            setImagem(data.imagem);
            setSituacao(data.situacao);
        }

        getCurso().catch((err) => console.log(err));
    }, [API, id]);

    const getImagem = async (obj: any) => {
        return new Promise(
            (resolve, reject) => {
                if(obj.files[0]) {
                    const reader = new FileReader();
        
                    reader.readAsDataURL(obj.files[0] as any);
        
                    reader.addEventListener('load', () => {
                        resolve(reader.result);
                    });
                }
                else resolve(imagem);
            }
        )
    }

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
            "id": id,
            "nome": nome,
            "professor": professor,
            "categoria": categoria,
            "descricao": descricao,
            "imagem": await getImagem(obj),
            "situacao": situacao
        }

        const req = await fetch(`${API}/courses/edit`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await req.json();

        if(data.status === 0) navigate(`/curso/${data.id}`);

        setMessage({
            status: data.status,
            texto: data.message
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
            <h1 className="dashboard-title">Editar curso</h1>
            <div className="curso-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <img src={imagem} alt="" id="imgCurso" />
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" name="nome" id="nome" placeholder="Insira o nome do curso." required value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="professor">Professor(a):</label>
                            <input type="text" name="professor" id="professor" placeholder="Insira o professor do curso." required value={professor} onChange={(e) => setProfessor(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="categoria">Categoria:</label>
                            <input type="text" name="categoria" id="categoria" placeholder="Insira a categoria do curso." required value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="descricao">Descrição:</label>
                            <input type="text" name="descricao" id="descricao" placeholder="Insira a descrição do curso." required value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="imagem">Imagem:</label>
                            <label htmlFor="imagem" className="imgInputLabel">Enviar imagem...</label>
                            <input type="file" name="imagem" id="imagem" className="imgInput" accept="image/png, image/webp, image/jpg, image/jpeg" onChange={mudarImagem} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="situacao">Situação:</label>
                            <select name="situacao" id="situacao" value={situacao} onChange={(e : any) => setSituacao(e.target.value)}>
                                <option value="1">Ativado</option>
                                <option value="0">Desativado</option>
                            </select>
                        </div>
                        <div className="form-control buttons center">
                            <button type="submit">Salvar</button>
                        </div>
                        { message && <Mensagem texto={message.texto} /> }
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormEditar;