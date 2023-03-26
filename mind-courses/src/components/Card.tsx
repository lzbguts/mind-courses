import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Card = ({ curso } : any) => {
    return (
        <div className="card">
            <Link to={`/curso/${curso.id}`} ><img src={localStorage.getItem(curso.id as any) || "/assets/no-image.png"} alt="imagem" /></Link>
            <div className="card-desc">
                <p>{curso.nome}</p>
                <div className="card-actions">
                    <Link to={`/curso/${curso.id}`} ><BsEye/></Link>
                    <Link to={`/curso/${curso.id}/edit`} ><BsPencilSquare/></Link>
                    <Link to={`/curso/${curso.id}/delete`} ><BsTrash/></Link>
                </div>
            </div>
        </div>
    );
}

export default Card;