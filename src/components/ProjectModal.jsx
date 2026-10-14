import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Radix Dialog ya maneja Esc, el foco atrapado y el bloqueo del scroll
function ProjectModal({ project, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-lenis-prevent className="block max-h-[90dvh] gap-0 overflow-y-auto rounded-3xl border-primary/20 bg-slate-900 p-0 shadow-[0_25px_50px_rgb(0_0_0/0.6),0_0_40px_rgb(0_255_213/0.1)] [scrollbar-color:rgb(0_255_213/0.3)_transparent] [scrollbar-width:thin] sm:max-w-3xl [&>[data-slot=dialog-close]]:grid [&>[data-slot=dialog-close]]:size-11 [&>[data-slot=dialog-close]]:place-items-center [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-slate-900/80 [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]_svg]:size-5">
        {project && (
          <>
            {project.videoPreview && (
              <div className="flex justify-center overflow-hidden border-b border-white/5 bg-black">
                <video
                  src={project.videoPreview}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={cn(
                    project.format === "vertical"
                      ? "h-[420px] w-auto max-w-full object-contain md:h-[550px]"
                      : "max-h-[450px] w-full object-cover"
                  )}
                />
              </div>
            )}

            <div className="p-6 md:px-10 md:pt-8 md:pb-10">
              <DialogTitle className="mb-3 pr-12 font-display text-2xl font-bold text-primary [text-shadow:0_0_15px_rgb(0_255_213/0.3)] md:text-3xl">
                {project.title}
              </DialogTitle>
              <ul className="mb-6 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 px-3 py-1 font-bold text-primary">
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>

              <DialogDescription className="mb-8 text-base leading-relaxed text-slate-300 md:text-[17px]">
                {project.description}
              </DialogDescription>

              <div className="mb-8 grid gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:grid-cols-2">
                {[
                  ["Mecánicas principales", project.details.mechanics],
                  ["Retos de desarrollo", project.details.devLog],
                ].map(([titulo, texto]) => (
                  <div key={titulo}>
                    <h3 className="mb-3 flex items-center gap-2 font-bold before:h-4 before:w-1 before:rounded-full before:bg-primary">
                      {titulo}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {texto}
                    </p>
                  </div>
                ))}
              </div>

              {(project.link || project.repo) && (
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  {project.link && (
                    <Button asChild size="lg">
                      <a href={project.link} target="_blank" rel="noreferrer">
                        <i
                          className={project.linkIcon || "bx bx-link-external"}
                          aria-hidden="true"
                        ></i>{" "}
                        {project.linkLabel || "Ver proyecto"}
                      </a>
                    </Button>
                  )}
                  {project.repo && (
                    <Button asChild size="lg" variant="neon">
                      <a href={project.repo} target="_blank" rel="noreferrer">
                        <i className="bx bxl-github" aria-hidden="true"></i> Ver
                        código
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProjectModal;
