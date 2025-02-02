import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.paragraph}>
        &copy; {new Date().getFullYear()} My Personal Website. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
