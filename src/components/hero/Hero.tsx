"use client";
import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      {/* Decorative lines */}
      <div className={styles.linesContainer}>
        <div className={styles.verticalLine}></div>
        <div className={styles.angledLine}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>MAREK MITALA</h1>
        <p className={styles.heroSubtitle}>
          Developer
        </p>
        <p className={styles.heroDescription}>
          Bringing futuristic designs to life using modern web technologies.
          <br />
          Skilled in React, Next.js, and CSS animations.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaButton}>View My Work</button>
          <button className={styles.ctaButtonSecondary}>Contact Me</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
