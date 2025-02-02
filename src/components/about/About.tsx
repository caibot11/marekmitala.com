// src/components/about/About.tsx
"use client";
import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <h2 className={styles.title}>About Me</h2>
      <p className={styles.text}>
        Digital Nomad. Code Alchemist. Creator of Neon Realities.
      </p>
    </section>
  );
};

export default About;
