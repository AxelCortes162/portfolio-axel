import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import profilePic from "../assets/perfil.webp";
import { personalInfo } from "../data/info";

const redes = [
  { label: "GitHub", href: personalInfo.github, icon: "bx bxl-github" },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: "bx bxl-linkedin-square" },
  { label: "Correo", href: `mailto:${personalInfo.email}`, icon: "bx bx-envelope" },
];

function Hero({ name, title }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-24 md:px-[8%]"
    >
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center md:flex-row md:justify-center md:gap-16 md:text-left">
        {/* Foto con resplandor */}
        <img
          src={profilePic}
          alt={`Foto de ${name}`}
          width="600"
          height="600"
          fetchPriority="high"
          className="size-44 shrink-0 rounded-full border-4 border-primary object-cover shadow-[0_0_30px_rgb(0_255_213/0.6),inset_0_0_15px_rgb(0_255_213/0.4)] transition duration-500 hover:scale-105 hover:rotate-3 hover:shadow-[0_0_50px_rgb(0_255_213/0.8)] motion-reduce:transition-none motion-reduce:hover:transform-none md:size-60"
        />

        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-bold tracking-wide text-primary uppercase [text-shadow:0_0_15px_rgb(0_255_213/0.3)]">
            {name}
          </h1>
          {/* Subtítulo como <p>: el primer <h2> de la página es "Habilidades" */}
          <p className="mt-3 text-[clamp(1.125rem,3vw,1.625rem)] font-light tracking-wide text-foreground/80">
            {title}
          </p>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            Ingeniero en Sistemas Computacionales apasionado por fusionar el
            mundo del <strong className="text-primary">Desarrollo Web</strong>{" "}
            con la interactividad de{" "}
            <strong className="text-primary">Unity &amp; VR</strong>. Creo
            experiencias digitales que no solo funcionan, sino que se sienten.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button asChild size="lg">
              <a href="#projects">
                <i className="bx bx-grid-alt" aria-hidden="true"></i> Ver
                proyectos
              </a>
            </Button>
            <Button asChild size="lg" variant="neon">
              <Link to="/contacto">
                <i className="bx bx-envelope" aria-hidden="true"></i> Contáctame
              </Link>
            </Button>
            <Button asChild size="lg" variant="neon">
              <a href={personalInfo.cv} download aria-label="Descargar CV en PDF">
                <i className="bx bx-download" aria-hidden="true"></i> Descargar
                CV
              </a>
            </Button>
          </div>

          {/* Redes: 44px de área de toque */}
          <ul className="mt-6 flex justify-center gap-1 md:justify-start">
            {redes.map((red) => (
              <li key={red.label}>
                <a
                  href={red.href}
                  target={red.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={red.label}
                  className="grid size-11 place-items-center rounded-xl text-2xl text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <i className={red.icon} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Indicador de scroll (decorativo, solo escritorio) */}
      <i
        className="bx bx-chevron-down absolute bottom-8 hidden animate-float text-4xl text-primary/70 motion-reduce:animate-none md:block"
        aria-hidden="true"
      ></i>
    </section>
  );
}

export default Hero;
