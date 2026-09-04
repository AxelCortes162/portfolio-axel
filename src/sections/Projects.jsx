import { useState } from "react";
import Card from "../components/Card";
import ProjectModal from "../components/ProjectModal";
import { projectsData } from "../assets/projects/projectsData";
import "../styles/Projects.css";

function Projects() {
  const [activeTab, setActiveTab] = useState("games");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter(
    (project) => project.category === activeTab
  );

  const opensModal = (project) =>
    project.type === "vr" || project.category === "games";

  const handleMouseEnter = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  // Antes el video seguía reproduciéndose (y consumiendo CPU) al salir el cursor
  const handleMouseLeave = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleProjectClick = (project) => {
    if (opensModal(project)) {
      setSelectedProject(project);
    } else {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e, project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleProjectClick(project);
    }
  };

  return (
    <section id="projects" className="projects-section">
      <h2>
        Mis <span>Proyectos</span>
      </h2>

      <div className="projects-tabs" role="tablist" aria-label="Categorías de proyectos">
        <button
          role="tab"
          aria-selected={activeTab === "games"}
          className={activeTab === "games" ? "active" : ""}
          onClick={() => setActiveTab("games")}
        >
          <i className="bx bx-joystick"></i> Videojuegos &amp; VR
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "web"}
          className={activeTab === "web" ? "active" : ""}
          onClick={() => setActiveTab("web")}
        >
          <i className="bx bx-code-alt"></i> Web Development
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-item"
            data-format={project.format}
            role="button"
            tabIndex={0}
            aria-label={
              opensModal(project)
                ? `Ver detalles de ${project.title}`
                : `Abrir ${project.title} en una pestaña nueva`
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleProjectClick(project)}
            onKeyDown={(e) => handleKeyDown(e, project)}
          >
            <Card>
              <div className="project-card-content">
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={`Captura de ${project.title}`}
                    className="project-img"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* preload="metadata" descarga solo la cabecera del MP4 (unos
                      KB) en vez de los megas completos, pero deja que play()
                      arranque al instante al pasar el cursor. */}
                  {project.videoPreview && (
                    <video
                      src={project.videoPreview}
                      className="project-video"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  )}

                  {project.type === "vr" && (
                    <div className="vr-badge">VR Experience</div>
                  )}

                  {project.featured && (
                    <div className="featured-badge">
                      <i className="bx bxs-star"></i> Destacado
                    </div>
                  )}
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  <span className="project-action-indicator">
                    {opensModal(project) ? (
                      <>
                        <i className="bx bx-plus-circle"></i> Ver detalles
                      </>
                    ) : (
                      <>
                        <i className="bx bx-link-external"></i> Ver proyecto
                      </>
                    )}
                  </span>

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="project-repo-link"
                      aria-label={`Ver el código de ${project.title} en GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="bx bxl-github"></i> Código
                    </a>
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
