// components/particles/ParticlesBackground.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions, Particle } from "@tsparticles/engine";
import { tsParticles } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  options: ISourceOptions;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  options,
}) => {
  const [init, setInit] = useState(false);
  const [container, setContainer] = useState<Container>();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      setContainer(container);
    }
  }, []);

  useEffect(() => {
    if (!container) {
      return;
    }

    tsParticles.setOnClickHandler((event: Event, particles?: Particle[]) => {
      if (!container) {
        return;
      }
      const mouseEvent = event as MouseEvent;
      if (particles && particles.length > 0) {
        for (const particle of particles) {
          container.particles.remove(particle);
        }
      } else {
        container.particles.addParticle({
          x: mouseEvent.offsetX,
          y: mouseEvent.offsetY,
        });
      }
    });
  }, [container]);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;
