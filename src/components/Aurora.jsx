// Manchas de color difuminadas que flotan detrás del contenido.
// El padre necesita position: relative (y overflow: hidden para que no desborden)
function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute top-[10%] left-[10%] size-[40vmax] animate-aurora rounded-full bg-primary/15 blur-[120px] motion-reduce:animate-none" />
      <div className="absolute right-[5%] bottom-[5%] size-[35vmax] animate-aurora rounded-full bg-[#7c3aed]/20 blur-[120px] [animation-delay:-9s] motion-reduce:animate-none" />
    </div>
  );
}

export default Aurora;
