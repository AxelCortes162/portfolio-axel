import { useEffect, useRef } from "react";
import "../styles/ProjectModal.css";

function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  // Cerrar con Esc + bloquear el scroll del fondo + mover el foco al modal
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Trampa de foco básica: Tab circula dentro del modal
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], video[controls], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          ref={closeBtnRef}
          aria-label="Cerrar detalles del proyecto"
        >
          <i className="bx bx-x"></i>
        </button>

        <div className="modal-body">
          {project.videoPreview && (
            <div className="modal-video-container">
              <video
                src={project.videoPreview}
                controls
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className={
                  project.format === "vertical"
                    ? "modal-video-vertical"
                    : "modal-video-horizontal"
                }
              />
            </div>
          )}

          <div className="modal-header-info">
            <h2 id="modal-title">{project.title}</h2>
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-details-grid">
            <div className="detail-item">
              <h4>Mecánicas principales</h4>
              <p>{project.details.mechanics}</p>
            </div>
            <div className="detail-item">
              <h4>Retos de desarrollo</h4>
              <p>{project.details.devLog}</p>
            </div>
          </div>

          {(project.link || project.repo) && (
            <div className="modal-footer-action">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <i className={project.linkIcon || "bx bx-link-external"}></i>{" "}
                  {project.linkLabel || "Ver proyecto"}
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  <i className="bx bxl-github"></i> Ver código
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
