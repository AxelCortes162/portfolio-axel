import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { personalInfo } from "../data/info";

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copy">
          &copy; {anioActual} <span>{personalInfo.name}</span> | Web &amp; Game
          Developer
        </p>

        <div className="footer-links">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub de Axel Cortes"
          >
            <FaGithub />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn de Axel Cortes"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Enviar correo a Axel Cortes"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
