// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.neonLine}></div>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            Marek Mitala
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/about" className={styles.link}>
            About Me
          </Link>
          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/fun" className={`${styles.link} ${styles.rainbowLink}`}>
            Fun
          </Link>
        </nav>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>
      {menuOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/about" className={styles.link}>
            About Me
          </Link>
          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/fun" className={`${styles.link} ${styles.rainbowLink}`}>
            Fun
          </Link>
        </nav>
      )}
    </header>
  );
}
