import { useState } from "react";
import Mensagem from "../Mensagem";

const FormNovo = () => {
    const [nome, setNome] = useState("");
    const [professor, setProfessor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("1.webp");
    const [message, setMessage] = useState({ status: -1, texto: "" });

    const API = process.env.REACT_APP_API || "http://localhost:4000";

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const dados = {
            "token": localStorage.getItem("token"),
            "nome": nome,
            "professor": professor,
            "categoria": categoria,
            "descricao": descricao,
            "imagem": imagem
        }

        const req = await fetch(`${API}/courses/new`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await req.json();

        setMessage({
            status: data.status,
            texto: data.message
        });
    }

    return (
        <>
            <h1 className="dashboard-title">Criar novo curso</h1>
            <div className="curso-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <img src={`/assets/courses/${imagem}`} alt="" />
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
                            <select name="imagem" id="imagem" defaultValue="1.webp" onChange={(e) => setImagem(e.target.value)}>
                                <option value="1.webp">Matemática</option>
                                <option value="2.webp">Programação</option>
                                <option value="3.webp">Livros</option>
                                <option value="4.jpg">Natureza</option>
                                <option value="5.jpg">Tecnologia</option>
                                <option value="6.jpg">Arduino</option>
                                <option value="7.jpg">Direito</option>
                                <option value="8.jpg">Nutrição</option>
                                <option value="9.jpg">Engenharia</option>
                                <option value="10.jpg">Recursos Humanos</option>
                            </select>
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