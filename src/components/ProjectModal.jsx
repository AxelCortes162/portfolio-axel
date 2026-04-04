// src/components/ProjectModal.jsx
import React from 'react';
import "../styles/ProjectModal.css";

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className='bx bx-x'></i>
        </button>

        <div className="modal-body">
          {/* SECCIÓN DE VIDEO (Solo si tiene videoPreview) */}
          {project.videoPreview && (
            <div className="modal-video-container">
              <video 
                src={project.videoPreview} 
                controls 
                autoPlay 
                loop 
                className={project.format === 'vertical' ? 'modal-video-vertical' : 'modal-video-horizontal'}
              />
            </div>
          )}

          <div className="modal-header-info">
            <h2>{project.title}</h2>
            <div className="modal-tags">
              {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>

          <p className="modal-description">{project.description}</p>
          
          <div className="modal-details-grid">
            <div className="detail-item">
              <h4>Mecánicas Principales</h4>
              <p>{project.details.mechanics}</p>
            </div>
            <div className="detail-item">
              <h4>Retos de Desarrollo</h4>
              <p>{project.details.devLog}</p>
            </div>
          </div>

          {/* BOTÓN DE ACCIÓN (Si tiene link a tienda/web) */}
          {project.link && (
            <div className="modal-footer-action">
              <a href={project.link} target="_blank" rel="noreferrer" className="btn-store">
                <i className='bx bxl-play-store'></i> Ver en Play Store
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;