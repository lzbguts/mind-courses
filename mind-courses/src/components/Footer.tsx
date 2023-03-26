import { BsGithub, BsLinkedin, BsEnvelope } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="footer">
            <div></div>
            <div className="copyright">
                <p>© Gustavo Henrique Felicidade 2023.</p>
            </div>
            <div className="social">
                <a href="https://github.com/lzbguts" target="_blank" rel="noreferrer"><BsGithub /></a>
                <a href="https://www.linkedin.com/in/lzbguts/" target="_blank" rel="noreferrer"><BsLinkedin /></a>
                <a href="mailto:gustavo.h.felicidade@gmail.com"><BsEnvelope /></a>
            </div>
        </footer>
    )
}

export default Footer