import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Asegúrate de que sea @tsparticles/slim

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // En la v3, inicializamos el motor en un useEffect
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null; // No renderiza nada hasta que el motor esté listo

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Las líneas se conectan al mouse
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1
              }
            }
          }
        },
        particles: {
          color: {
            value: "#00ffd5",
          },
          links: {
            color: "#00ffd5",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5, // Un poco más lento para que no distraiga del contenido
            direction: "none",
            outModes: {
              default: "bounce", // Rebotan en los bordes para que no se vacíe el fondo
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;