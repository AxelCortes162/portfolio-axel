import { motion as Motion } from "framer-motion";
import { trackPointer } from "@/lib/utils";
import { ease } from "@/lib/motion";

// La tarjeta entra y luego escalona a los hijos que usen variants="hidden/show"
const entrada = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease, staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

function Card({ title, children, className = "" }) {
  return (
    <Motion.div
      initial="hidden"
      animate="show"
      variants={entrada}
      onMouseMove={trackPointer}
      className={`card spotlight ${className}`.trim()}
    >
      {/* Solo renderiza el título si existe: evita un <h2> vacío en el DOM */}
      {title && <h2>{title}</h2>}
      {children}
    </Motion.div>
  );
}

export default Card;
