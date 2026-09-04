import { Link } from "react-router-dom";
import "../styles/Hero.css";
import profilePic from "../assets/perfil.webp";
import { personalInfo } from "../data/info";

function Hero({ name, title }) {
  return (
    <section id="hero" className="hero-fullscreen">
      <div className="hero-container">
        {/* Imagen con resplandor */}
        <div className="hero-visual">
          <img
            src={profilePic}
            alt={`Foto de ${name}`}
            className="hero-img"
            width="600"
            height="600"
            fetchPriority="high"
          />
        </div>

        {/* Contenido de texto */}
        <div className="hero-text">
          <h1>{name}</h1>
          <h2>{title}</h2>

          <p className="hero-bio">
            Ingeniero en Sistemas Computacionales apasionado por fusionar el
            mundo del <span>Desarrollo Web</span> con la interactividad de{" "}
            <span>Unity &amp; VR</span>. Creo experiencias digitales que no solo
            funcionan, sino que se sienten.
          </p>

          {/* --- LLAMADAS A LA ACCIÓN --- */}
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              <i className="bx bx-grid-alt"></i> Ver proyectos
            </a>
            <Link to="/contacto" className="btn btn-ghost">
              <i className="bx bx-envelope"></i> Contáctame
            </Link>
            <a
              href={personalInfo.cv}
              download
              className="btn btn-ghost"
              aria-label="Descargar CV en PDF"
            >
              <i className="bx bx-download"></i> Descargar CV
            </a>
          </div>

          {/* Accesos rápidos a redes */}
          <div className="hero-social">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="bx bxl-github"></i>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="bx bxl-linkedin-square"></i>
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Correo">
              <i className="bx bx-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Flecha animada indicando scroll */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
