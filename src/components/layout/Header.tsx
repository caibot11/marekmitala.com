// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {/* BRAND */}
      <Link href="/" className={styles.brandLink}>
        Marek Mitala
      </Link>

      {/* NAV LINKS */}
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === "/" ? styles.activeLink : ""}`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`${styles.link} ${
            pathname === "/about" ? styles.activeLink : ""
          }`}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={`${styles.link} ${
            pathname === "/projects" ? styles.activeLink : ""
          }`}
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className={`${styles.link} ${
            pathname === "/contact" ? styles.activeLink : ""
          }`}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
