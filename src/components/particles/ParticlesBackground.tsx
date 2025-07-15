// components/particles/ParticlesBackground.tsx
"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";

interface ParticlesBackgroundProps {
  options: ISourceOptions;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ options }) => {
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticlesBackground;
