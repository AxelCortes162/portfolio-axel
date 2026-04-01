import React from 'react';
import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Lado Izquierdo: Copyright */}
        <p className="footer-copy">
          &copy; {anioActual} <span>Axel Cortes</span> | Web & Game Developer
        </p>

        {/* Lado Derecho: Redes */}
        <div className="footer-links">
          <a href="https://github.com/AxelCortes162" target="_blank" rel="noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/axel-alejandro-cortes-fonseca/" target="_blank" rel="noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:axelcortes.developer@gmail.com" title="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;