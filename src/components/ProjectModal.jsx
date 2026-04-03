// src/components/ProjectModal.jsx
import React from 'react';
import "../styles/ProjectModal.css";

function ProjectModal({ project, onClose }) {
  if (!project) return null; // No renderizar si no hay proyecto seleccionado

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cerrar */}
        <button className="modal-close" onClick={onClose}>
          <i className='bx bx-x'></i>
        </button>

        <div className="modal-body">
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
              <h4>Notas de Desarrollo / Retos</h4>
              <p>{project.details.devLog}</p>
            </div>
          </div>

          {/* Galería de imágenes extra del desarrollo (si existen) */}
          {project.details.extraImages.length > 0 && (
            <div className="modal-gallery">
              <h4>Galería de Desarrollo</h4>
              <div className="gallery-grid">
                {project.details.extraImages.map((img, index) => (
                  <img key={index} src={img} alt={`Desarrollo ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;