// Variantes de framer-motion compartidas entre páginas
export const ease = [0.22, 1, 0.36, 1];

// Sube y pasa de borroso a nítido; el padre decide el escalonado
export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
