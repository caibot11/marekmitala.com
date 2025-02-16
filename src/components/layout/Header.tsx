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
      {/* Neon bar at the top */}
      <div className={styles.neonLine}></div>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            Marek Mitala
          </Link>
        </div>
        {/* Desktop navigation */}
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
          {/* New Fun page link with rainbow effect */}
          <Link href="/fun" className={`${styles.link} ${styles.rainbowLink}`}>
            Fun
          </Link>
        </nav>
        {/* Hamburger icon for mobile */}
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>
      {/* Mobile navigation */}
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
          {/* New Fun page link for mobile as well */}
          <Link href="/fun" className={`${styles.link} ${styles.rainbowLink}`}>
            Fun
          </Link>
        </nav>
      )}
    </header>
  );
}
