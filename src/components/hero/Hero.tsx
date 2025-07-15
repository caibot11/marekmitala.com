// src/components/hero/Hero.tsx
"use client";

import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <section className={styles.heroSection}>
      {mounted && (
        <animated.div style={fadeIn} className={styles.overlay}>
          <h1 className={styles.heroTitle}>
            Hi, I&apos;m <span className={styles.glow}>Marek Mitala</span>
          </h1>
          <p className={styles.heroSubtitle}>
            This is my perosnal website where I show my creativity, passion for modern web development and Arduino projects. Check out my{" "}
            <Link href="/projects" className={styles.inlineLink}>
              Projects
            </Link>
            , learn more {" "}
            <Link href="/about" className={styles.inlineLink}>
              About Me
            </Link>
            , or get in touch via{" "}
            <Link href="/contact" className={styles.inlineLink}>
              Contact
            </Link>
            .
          </p>
        </animated.div>
      )}
    </section>
  );
}

export default Hero;