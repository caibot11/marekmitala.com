import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" legacyBehavior>
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={styles.link}>About</a>
        </Link>
        <Link href="/contact" legacyBehavior>
          <a className={styles.link}>Contact</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
