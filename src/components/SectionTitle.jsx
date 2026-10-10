// Título de sección del inicio: blanco con la palabra clave (<span>) en neón
function SectionTitle({ children }) {
  return (
    <h2 className="mb-12 text-center font-display text-[clamp(1.75rem,5vw,2.5rem)] font-bold tracking-[0.12em] text-foreground uppercase [&>span]:text-primary [&>span]:[text-shadow:0_0_15px_rgb(0_255_213/0.5)]">
      {children}
    </h2>
  );
}

export default SectionTitle;
