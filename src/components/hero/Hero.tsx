// src/components/hero/Hero.tsx
"use client";

import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

// Create a custom AnimatedDiv type that accepts children.
const AnimatedDiv: React.FC<{
  style: any;
  className?: string;
  children: React.ReactNode;
}> = animated.div as unknown as React.FC<{
  style: any;
  className?: string;
  children: React.ReactNode;
}>;

export default function Hero() {
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
        <AnimatedDiv style={fadeIn} className={styles.overlay}>
          <h1 className={styles.heroTitle}>Welcome to My Website :)</h1>
          <p className={styles.heroSubtitle}>
            Hi, I'm Marek Mitala. This site is a creative space where I share my passion for modern web development and Arduino projects.
            Explore my work, read about my journey, and get in touch if you want to collaborate!
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/about">
              <button className={styles.ctaButton}>About Me</button>
            </Link>
            <Link href="/projects">
              <button className={styles.ctaButton}>My Projects</button>
            </Link>
            <Link href="/contact">
              <button className={styles.ctaButton}>Contact</button>
            </Link>
          </div>
        </AnimatedDiv>
      )}
    </section>
  );
}
