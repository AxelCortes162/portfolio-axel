import { useState } from "react";
import { motion as Motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ProjectModal from "../components/ProjectModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn, trackPointer } from "@/lib/utils";
import { projectsData } from "../assets/projects/projectsData";

const categorias = [
  { id: "games", label: "Videojuegos & VR", icon: "bx bx-joystick" },
  { id: "web", label: "Web Development", icon: "bx bx-code-alt" },
];

const abreModal = (project) =>
  project.type === "vr" || project.category === "games";

// Los <video> de las tarjetas se reproducen solo con el cursor encima
const reproducir = (e) => {
  const video = e.currentTarget.querySelector("video");
  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }
};

const pausar = (e) => {
  const video = e.currentTarget.querySelector("video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
};

function ProjectCard({ project, onOpen, index }) {
  const vertical = project.format === "vertical";

  // "Enlace estirado": el botón/enlace del título cubre toda la tarjeta con
  // ::after, así la tarjeta entera es clicable sin anidar elementos interactivos
  const accionClase =
    "text-left outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']";

  return (
    <Motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={reproducir}
      onMouseLeave={pausar}
      onMouseMove={trackPointer}
      className="spotlight group relative flex w-full max-w-[400px] flex-col rounded-2xl border border-primary/30 bg-white/5 p-5 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_20px_40px_-10px_rgb(0_255_213/0.35)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-primary motion-reduce:hover:translate-y-0"
    >
      <div
        className={cn(
          "relative mb-5 flex items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-[#010409]",
          vertical ? "h-80 md:h-[450px]" : "h-50 md:h-60"
        )}
      >
        <img
          src={project.image}
          alt={`Captura de ${project.title}`}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute h-full transition-transform duration-700 ease-out group-hover:scale-105",
            vertical ? "w-auto object-contain" : "w-full object-cover"
          )}
        />

        {/* preload="metadata" descarga solo la cabecera del MP4 (unos KB) */}
        {project.videoPreview && (
          <video
            src={project.videoPreview}
            loop
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute h-full opacity-0 transition-opacity duration-400 group-hover:opacity-100",
              vertical ? "w-auto object-contain" : "w-full object-cover"
            )}
          />
        )}

        {project.type === "vr" && (
          <Badge className="absolute top-3 right-3 z-10 rounded-full border-primary/30 bg-primary/20 text-primary backdrop-blur-sm">
            VR Experience
          </Badge>
        )}
        {project.featured && (
          <Badge className="absolute top-3 left-3 z-10 rounded-full font-extrabold tracking-wide uppercase shadow-[0_4px_16px_rgb(0_255_213/0.35)]">
            <i className="bx bxs-star" aria-hidden="true"></i> Destacado
          </Badge>
        )}
      </div>

      <h3 className="mb-2.5 font-display text-xl font-bold md:text-[22px]">
        {abreModal(project) ? (
          <button type="button" onClick={() => onOpen(project)} className={accionClase}>
            {project.title}
          </button>
        ) : (
          <a href={project.link} target="_blank" rel="noreferrer" className={accionClase}>
            {project.title}
          </a>
        )}
      </h3>
      <p className="mb-5 grow text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mb-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline" className="border-primary/15 bg-primary/5 text-primary">
              {tag}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        <span className="flex items-center gap-2 text-sm font-bold text-primary" aria-hidden="true">
          {abreModal(project) ? (
            <>
              <i className="bx bx-plus-circle"></i> Ver detalles
            </>
          ) : (
            <>
              <i className="bx bx-link-external"></i> Ver proyecto
            </>
          )}
        </span>

        {/* z-10 lo pone encima del enlace estirado */}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver el código de ${project.title} en GitHub`}
            className="relative z-10 inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <i className="bx bxl-github text-base" aria-hidden="true"></i> Código
          </a>
        )}
      </div>
    </Motion.article>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tab, setTab] = useState("games");

  const abrir = (project) => {
    setSelectedProject(project);
    setModalAbierto(true);
  };

  return (
    <section id="projects" className="flex flex-col items-center py-10">
      <SectionTitle>
        Mis <span>Proyectos</span>
      </SectionTitle>

      <Tabs value={tab} onValueChange={setTab} className="w-full items-center gap-0">
        <TabsList className="mb-12 gap-2 bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto">
          {categorias.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="isolate h-11 flex-none rounded-xl border-white/10 bg-white/[0.02] px-5 font-semibold data-[state=active]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary max-sm:px-4 max-sm:text-xs"
            >
              {/* La píldora activa se desliza de una pestaña a otra */}
              {tab === cat.id && (
                <Motion.span
                  layoutId="tab-activa"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  className="absolute inset-0 -z-10 rounded-xl border border-primary/40 bg-primary/10 shadow-[0_0_15px_rgb(0_255_213/0.15)]"
                />
              )}
              <i className={`${cat.icon} text-lg`} aria-hidden="true"></i>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categorias.map((cat) => (
          <TabsContent
            key={cat.id}
            value={cat.id}
            className="grid w-full max-w-6xl grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] justify-items-center gap-8"
          >
            {projectsData
              .filter((project) => project.category === cat.id)
              .map((project, i) => (
                <ProjectCard key={project.id} project={project} onOpen={abrir} index={i} />
              ))}
          </TabsContent>
        ))}
      </Tabs>

      <ProjectModal
        project={selectedProject}
        open={modalAbierto}
        onOpenChange={setModalAbierto}
      />
    </section>
  );
}

export default Projects;
