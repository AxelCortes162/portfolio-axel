import { useRef } from "react";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { cn } from "@/lib/utils";

const estudios = [
  {
    escuela: "UVEG",
    titulo: "Ingeniería en Sistemas Computacionales",
    periodo: "2023 - Presente",
  },
  {
    escuela: "AluraLatam · Oracle Next Education",
    titulo: "Front-End Development Program",
    periodo: "2023 - 2024",
  },
];

const ease = [0.22, 1, 0.36, 1];

function Education() {
  const ref = useRef(null);
  // La línea se dibuja conforme la lista cruza la pantalla
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="education" className="py-16">
      <SectionTitle>
        Formación <span>Académica</span>
      </SectionTitle>

      {/* Línea vertical: a la izquierda en móvil, al centro en escritorio */}
      <ol
        ref={ref}
        className="relative mx-auto max-w-3xl before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-primary/10 md:before:left-1/2 md:before:-translate-x-1/2"
      >
        <Motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute inset-y-0 left-5 w-0.5 origin-top bg-linear-to-b from-primary via-[#7c9cff] to-[#c084fc] shadow-[0_0_10px_var(--primary)] md:left-1/2 md:-translate-x-1/2"
        />
        {estudios.map((item, index) => {
          const izquierda = index % 2 === 0;
          return (
            <Motion.li
              key={item.escuela}
              initial={{ opacity: 0, x: izquierda ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease }}
              className={cn(
                "relative mb-8 pl-14 last:mb-0 md:w-1/2",
                izquierda ? "md:pr-10 md:pl-0 md:text-right" : "md:ml-auto md:pl-10"
              )}
            >
              {/* Punto sobre la línea */}
              <Motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
                className={cn(
                  "absolute top-5 left-[13px] z-10 size-4 rounded-full border-[3px] border-primary bg-background shadow-[0_0_10px_var(--primary)]",
                  izquierda ? "md:-right-2 md:left-auto" : "md:-left-2"
                )}
              />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-[border-color,background-color,translate,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_10px_30px_rgb(0_255_213/0.12)]">
                <p className="text-xs font-bold tracking-wide text-muted-foreground">
                  {item.periodo}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-primary">
                  {item.escuela}
                </h3>
                <p className="mt-1 text-sm text-slate-200">{item.titulo}</p>
              </div>
            </Motion.li>
          );
        })}
      </ol>
    </section>
  );
}

export default Education;
