import React from 'react';
import "../styles/Skills.css";

function Skills() {
  // Definimos las clases de Boxicons para cada habilidad
  const webSkills = [
    { name: "HTML5", icon: "bx bxl-html5" },
    { name: "CSS3", icon: "bx bxl-css3" },
    { name: "JavaScript", icon: "bx bxl-javascript" },
    { name: "React", icon: "bx bxl-react" },
    { name: "Tailwind CSS", icon: "bx bxl-tailwind-css" },
    { name: "Vite", icon: "bx bxs-zap" } // Vite no tiene logo oficial en Boxicons, usamos un rayo pro
  ];

  const gameSkills = [
    { name: "C#", icon: "bx bx-code-alt" },
    { name: "Unity", icon: "bx bxl-unity" },
    { name: "VR Development", icon: "bx bx-vr" },
    { name: "Mobile Games", icon: "bx bx-mobile-alt" },
    { name: "Game Design", icon: "bx bx-game" }
  ];

  return (
    <section id="skills" className="skills-section">
      <h2>Habilidades Técnicas</h2>
      
      <div className="skills-container">
        <div className="skills-category">
          <h3>Web Development</h3>
          <div className="skills-list">
            {webSkills.map((skill, index) => (
              <span key={index} className="skill-tag">
                <i className={`${skill.icon} skill-icon`}></i>
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3>Unity & Game Dev</h3>
          <div className="skills-list">
            {gameSkills.map((skill, index) => (
              <span key={index} className="skill-tag">
                <i className={`${skill.icon} skill-icon`}></i>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;