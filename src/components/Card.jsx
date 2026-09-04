import { motion as Motion } from "framer-motion";

function Card({ title, children, className = "" }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`card ${className}`.trim()}
    >
      {/* Solo renderiza el título si existe: evita un <h2> vacío en el DOM */}
      {title && <h2>{title}</h2>}
      {children}
    </Motion.div>
  );
}

export default Card;
