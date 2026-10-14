import { motion as Motion } from "framer-motion";

// Título de sección del inicio: blanco con la palabra clave (<span>) en neón.
// Entra desenfocado y debajo se dibuja una línea neón.
function SectionTitle({ children }) {
  return (
    <Motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-12 flex flex-col items-center gap-4"
    >
      <Motion.h2
        variants={{
          hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
          show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="text-center font-display text-[clamp(1.75rem,5vw,2.5rem)] font-bold tracking-[0.12em] text-foreground uppercase [&>span]:text-primary [&>span]:[text-shadow:0_0_15px_rgb(0_255_213/0.5)]"
      >
        {children}
      </Motion.h2>
      <Motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="h-0.5 w-24 rounded-full bg-linear-to-r from-transparent via-primary to-transparent"
      />
    </Motion.div>
  );
}

export default SectionTitle;
