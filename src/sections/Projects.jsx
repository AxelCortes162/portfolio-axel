// src/sections/Projects.jsx
import React, { useState } from 'react';
import Card from '../components/Card';
import ProjectModal from '../components/ProjectModal';
import { projectsData } from '../assets/projects/projectsData';
import "../styles/Projects.css";

function Projects() {
  const [activeTab, setActiveTab] = useState('games'); // Pestaña activa por defecto
  const [selectedProject, setSelectedProject] = useState(null);

  // Filtra los proyectos según la pestaña seleccionada
  const filteredProjects = projectsData.filter(project => project.category === activeTab);

  // Reinicia el video desde el inicio al hacer hover
  const handleMouseEnter = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const handleProjectClick = (project) => {
    if (project.type === 'vr') {
      setSelectedProject(project);
    } else {
      window.open(project.link, '_blank');
    }
  };

  return (
    <section id="projects" className="projects-section container">
      <h2>Mis <span>Proyectos</span></h2>
      
      {/* SECCIÓN RESTAURADA: Pestañas de Navegación */}
      <div className="projects-tabs">
        <button 
          className={activeTab === 'games' ? 'active' : ''} 
          onClick={() => setActiveTab('games')}
        >
          <i className='bx bx-joystick'></i> Videojuegos & VR
        </button>
        <button 
          className={activeTab === 'web' ? 'active' : ''} 
          onClick={() => setActiveTab('web')}
        >
          <i className='bx bx-code-block'></i> Web Development
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="project-item" 
            data-format={project.format}
            onClick={() => handleProjectClick(project)}
            onMouseEnter={handleMouseEnter}
          >
            <Card>
              <div className="project-card-content">
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-img" />
                  
                  {project.videoPreview && (
                    <video 
                      src={project.videoPreview} 
                      className="project-video" 
                      loop 
                      muted 
                      playsInline
                    />
                  )}
                  
                  {project.type === 'vr' && <div className="vr-badge">VR Experience</div>}
                </div>
                
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                {/* SECCIÓN RESTAURADA: Tecnologías (Tags) */}
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-action-indicator">
                  {project.type === 'vr' ? (
                    <><i className='bx bx-plus-circle'></i> Ver Detalles</>
                  ) : (
                    <><i className='bx bx-link-external'></i> Ver Proyecto</>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}

export default Projects;