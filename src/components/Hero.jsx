import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import profilePic from "../assets/perfil.webp";
import { personalInfo } from "../data/info";

const redes = [
  { label: "GitHub", href: personalInfo.github, icon: "bx bxl-github" },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: "bx bxl-linkedin-square" },
  { label: "Correo", href: `mailto:${personalInfo.email}`, icon: "bx bx-envelope" },
];

const ease = [0.22, 1, 0.36, 1];

// El contenedor escalona a sus hijos; cada hijo sube y se enfoca
const contenedor = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};
const letra = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -80 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease } },
};

function Hero({ name, title }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: al bajar, el contenido sube más lento y se desvanece
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const palabras = name.split(" ");

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-24 md:px-[8%]"
    >
      {/* Aura de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[10%] size-[40vmax] animate-aurora rounded-full bg-primary/15 blur-[120px] motion-reduce:animate-none" />
        <div className="absolute right-[5%] bottom-[5%] size-[35vmax] animate-aurora rounded-full bg-[#7c3aed]/20 blur-[120px] [animation-delay:-9s] motion-reduce:animate-none" />
      </div>

      <Motion.div
        style={{ y, opacity }}
        className="flex w-full max-w-6xl flex-col items-center gap-10 text-center md:flex-row md:justify-center md:gap-16 md:text-left"
      >
        {/* Foto con anillo de degradado girando */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease }}
          className="relative shrink-0"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--primary),#7c9cff,#c084fc,transparent,var(--primary))] opacity-80 blur-md motion-reduce:animate-none"
          />
          <img
            src={profilePic}
            alt={`Foto de ${name}`}
            width="600"
            height="600"
            fetchPriority="high"
            className="relative size-44 rounded-full border-4 border-background object-cover transition duration-500 hover:scale-105 hover:rotate-3 motion-reduce:transition-none motion-reduce:hover:transform-none md:size-60"
          />
        </Motion.div>

        <Motion.div variants={contenedor} initial="hidden" animate="show" className="max-w-2xl">
          <Motion.p
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Disponible para proyectos
          </Motion.p>

          {/* Letras separadas solo para la vista; el lector de pantalla lee aria-label */}
          <Motion.h1
            aria-label={name}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-bold tracking-wide text-primary uppercase [perspective:600px] [text-shadow:0_0_15px_rgb(0_255_213/0.3)]"
          >
            {palabras.map((palabra, i) => (
              <span key={i} aria-hidden="true" className="inline-block whitespace-nowrap">
                {palabra.split("").map((l, j) => (
                  <Motion.span key={j} variants={letra} className="inline-block origin-bottom">
                    {l}
                  </Motion.span>
                ))}
                {i < palabras.length - 1 && " "}
              </span>
            ))}
          </Motion.h1>
          {/* Subtítulo como <p>: el primer <h2> de la página es "Habilidades" */}
          <Motion.p
            variants={item}
            className="mt-3 text-[clamp(1.125rem,3vw,1.625rem)] font-light tracking-wide text-foreground/80"
          >
            {title}
          </Motion.p>

          <Motion.p variants={item} className="mt-6 leading-relaxed text-muted-foreground">
            Ingeniero en Sistemas Computacionales apasionado por fusionar el
            mundo del <strong className="text-primary">Desarrollo Web</strong>{" "}
            con la interactividad de{" "}
            <strong className="text-primary">Unity &amp; VR</strong>. Creo
            experiencias digitales que no solo funcionan, sino que se sienten.
          </Motion.p>

          <Motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button asChild size="lg" className="hover:-translate-y-0.5">
              <a href="#projects">
                <i className="bx bx-grid-alt" aria-hidden="true"></i> Ver
                proyectos
              </a>
            </Button>
            <Button asChild size="lg" variant="neon" className="hover:-translate-y-0.5">
              <Link to="/contacto">
                <i className="bx bx-envelope" aria-hidden="true"></i> Contáctame
              </Link>
            </Button>
            <Button asChild size="lg" variant="neon" className="hover:-translate-y-0.5">
              <a href={personalInfo.cv} download aria-label="Descargar CV en PDF">
                <i className="bx bx-download" aria-hidden="true"></i> Descargar
                CV
              </a>
            </Button>
          </Motion.div>

          {/* Redes: 44px de área de toque */}
          <Motion.ul variants={item} className="mt-6 flex justify-center gap-1 md:justify-start">
            {redes.map((red) => (
              <li key={red.label}>
                <a
                  href={red.href}
                  target={red.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={red.label}
                  className="grid size-11 place-items-center rounded-xl text-2xl text-muted-foreground transition hover:-translate-y-1 hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <i className={red.icon} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </Motion.ul>
        </Motion.div>
      </Motion.div>

      {/* Indicador de scroll (decorativo, solo escritorio) */}
      <i
        className="bx bx-chevron-down absolute bottom-8 hidden animate-float text-4xl text-primary/70 motion-reduce:animate-none md:block"
        aria-hidden="true"
      ></i>
    </section>
  );
}

export default Hero;
