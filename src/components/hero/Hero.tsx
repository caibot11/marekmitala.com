import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>City of Neon Shadows</h1>
        <p className={styles.heroSubtitle}>
          Where code meets chaos in a cybernetic twilight.
        </p>
      </div>
    </section>
  );
};

export default Hero;
