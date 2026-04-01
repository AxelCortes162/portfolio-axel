import React from 'react';
import "../styles/Skills.css";

function Skills() {
  const webSkills = ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Vite"];
  const gameSkills = ["C#", "Unity", "Virtual Reality (VR)", "Mobile Games", "Game Design"];

  return (
    <section id="skills" className="skills-section">
      <h2>Habilidades Técnicas</h2>
      
      <div className="skills-container">
        {/* Categoría Web */}
        <div className="skills-category">
          <h3>Web Development</h3>
          <div className="skills-list">
            {webSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        {/* Categoría Videojuegos */}
        <div className="skills-category">
          <h3>Unity & Game Dev</h3>
          <div className="skills-list">
            {gameSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;