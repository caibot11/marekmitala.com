// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // For current route
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Get the current path (e.g. "/about", "/projects", etc.)
  const pathname = usePathname();

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
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            About Me
          </Link>
          <Link
            href="/projects"
            className={
              pathname === "/projects"
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={
              pathname === "/contact"
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Contact
          </Link>
          <Link
            href="/fun"
            className={
              pathname === "/fun"
                ? `${styles.link} ${styles.rainbowLink} ${styles.active}`
                : `${styles.link} ${styles.rainbowLink}`
            }
          >
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
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            About Me
          </Link>
          <Link
            href="/projects"
            className={
              pathname === "/projects"
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={
              pathname === "/contact"
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Contact
          </Link>
          <Link
            href="/fun"
            className={
              pathname === "/fun"
                ? `${styles.link} ${styles.rainbowLink} ${styles.active}`
                : `${styles.link} ${styles.rainbowLink}`
            }
          >
            Fun
          </Link>
        </nav>
      )}
    </header>
  );
}
