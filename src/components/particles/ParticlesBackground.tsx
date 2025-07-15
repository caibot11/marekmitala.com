// components/particles/ParticlesBackground.tsx
"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  options: ISourceOptions;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ options }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (_container?: Container) => {
    // You can perform any action here after particles are loaded
  };

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
