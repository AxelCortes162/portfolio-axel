import React from 'react';
import "../styles/Hero.css";
import profilePic from "../assets/perfil.jpg"; 

function Hero({ name, title }) {
  return (
    <section id="hero" className="hero-fullscreen">
      <div className="hero-container">
        {/* Imagen con resplandor */}
        <div className="hero-visual">
          <img src={profilePic} alt={name} className="hero-img" />
        </div>
        
        {/* Contenido de texto */}
        <div className="hero-text">
          <h1>{name}</h1>
          <h2>{title}</h2>
          
          {/* El "Sobre mí" sutil integrado */}
          <p className="hero-bio">
            Ingeniero en Sistemas Computacionales apasionado por 
            fusionar el mundo del <span>Desarrollo Web</span> con la 
            interactividad de <span>Unity & VR</span>. 
            Creo experiencias digitales que no solo funcionan, sino que se sienten.
          </p>
        </div>
      </div>

      {/* Flecha animada indicando scroll */}
      <div className="scroll-indicator">
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