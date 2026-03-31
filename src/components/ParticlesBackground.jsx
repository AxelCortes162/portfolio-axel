import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim"; // o "tsparticles" para versión completa

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div id="tsparticles">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
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
              speed: 2,
            },
            number: {
              value: 80,
            },
            size: {
              value: 3,
            },
          },
        }}
      />
    </div>
  );
};

export default ParticlesBackground;