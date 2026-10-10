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

function Education() {
  return (
    <section id="education" className="py-16">
      <SectionTitle>
        Formación <span>Académica</span>
      </SectionTitle>

      {/* Línea vertical: a la izquierda en móvil, al centro en escritorio */}
      <ol className="relative mx-auto max-w-3xl before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-primary/30 md:before:left-1/2 md:before:-translate-x-1/2">
        {estudios.map((item, index) => {
          const izquierda = index % 2 === 0;
          return (
            <li
              key={item.escuela}
              className={cn(
                "relative mb-8 pl-14 last:mb-0 md:w-1/2",
                izquierda ? "md:pr-10 md:pl-0 md:text-right" : "md:ml-auto md:pl-10"
              )}
            >
              {/* Punto sobre la línea */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-5 left-[13px] size-4 rounded-full border-[3px] border-primary bg-background shadow-[0_0_10px_var(--primary)]",
                  izquierda ? "md:-right-2 md:left-auto" : "md:-left-2"
                )}
              />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-primary/60 hover:bg-primary/5">
                <p className="text-xs font-bold tracking-wide text-muted-foreground">
                  {item.periodo}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-primary">
                  {item.escuela}
                </h3>
                <p className="mt-1 text-sm text-slate-200">{item.titulo}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Education;
