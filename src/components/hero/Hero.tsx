// src/components/hero/Hero.tsx
"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <h1 className={styles.heroTitle}>Welcome to my Webiste :)</h1>
        <p className={styles.heroSubtitle}>
          Exploring modern web development <br /> & Arduino skills.
        </p>
      </div>
    </section>
  );
}
