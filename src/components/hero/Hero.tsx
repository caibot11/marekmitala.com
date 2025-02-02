// src/components/hero/Hero.tsx
"use client";
import React, { useState } from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <section className={`${styles.heroSection} ${styles[theme]}`}>
      <div className={styles.leftPanel}>
        <div className={styles.emblem}>
          <span className={styles.emblemText}>未来は既に始まっている</span>
        </div>
        <h1 className={styles.name}>MAREK MITALA</h1>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.errorWindow}>
          <p>#include &lt;cyber.h&gt;</p>
          <p>printf("HELLO, CYBER!");</p>
          <button className={styles.okButton}>OK</button>
        </div>
        <div className={styles.errorWindow}>
          <p>Error: System override</p>
          <button className={styles.okButton}>OK</button>
        </div>
      </div>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        Toggle Theme
      </button>
    </section>
  );
};

export default Hero;
