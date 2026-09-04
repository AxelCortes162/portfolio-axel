import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Consultas que deciden si vale la pena animar el fondo
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const SMALL_SCREEN = "(max-width: 768px)";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // En móvil las partículas cuestan batería y FPS; y si el usuario pidió
  // menos movimiento, simplemente no las dibujamos.
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION);
    const small = window.matchMedia(SMALL_SCREEN);

    const update = () => setEnabled(!reduced.matches && !small.matches);
    update();

    reduced.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || init) return;
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setInit(true);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, init]);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: "grab" } },
        modes: { grab: { distance: 140, links: { opacity: 1 } } },
      },
      particles: {
        color: { value: "#00ffd5" },
        links: {
          color: "#00ffd5",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          outModes: { default: "bounce" },
        },
        number: { density: { enable: true, area: 800 }, value: 60 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!enabled || !init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticlesBackground;
