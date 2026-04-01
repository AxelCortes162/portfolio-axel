import { motion } from "framer-motion";

function Card({ title, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h2>{title}</h2>
      {children}
    </motion.div>
  );
}

export default Card;