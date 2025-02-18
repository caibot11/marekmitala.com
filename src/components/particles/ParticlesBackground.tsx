// components/particles/ParticlesBackground.tsx
"use client";

import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    // Attempt to destroy any existing particles instance.
    if (
      typeof window !== "undefined" &&
      (window as any).pJSDom &&
      (window as any).pJSDom.length
    ) {
      (window as any).pJSDom[0].pJS.fn.vendors.destroypJS();
      (window as any).pJSDom = [];
    }

    // Dynamically import particles.js and initialize it.
    import("particles.js").then(() => {
      if (
        typeof window !== "undefined" &&
        (window as any).particlesJS
      ) {
        (window as any).particlesJS("particles-js", {
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
              image: { src: "img/github.svg", width: 100, height: 100 },
            },
            opacity: {
              value: 1,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 7.84,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "bounce",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });
      }
    });

    // Cleanup: destroy particles instance and remove the canvas element.
    return () => {
      if (typeof window !== "undefined") {
        // Attempt to destroy instance via pJSDom
        if ((window as any).pJSDom && (window as any).pJSDom.length) {
          (window as any).pJSDom[0].pJS.fn.vendors.destroypJS();
          (window as any).pJSDom = [];
        }
        // Manually remove canvas from container.
        const container = document.getElementById("particles-js");
        if (container) {
          container.innerHTML = "";
        }
      }
    };
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#1f1f1f",
      }}
    />
  );
}
