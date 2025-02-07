// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const linkStyle = {
    padding: "0.5rem 1rem",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      background: "#1a1a1a",
      boxShadow: "0 0 5px var(--color-neon-cyan)",
      marginBottom: "1rem",
    }}>
      <Link href="/" style={linkStyle} className={pathname === "/" ? "activeLink" : ""}>
        Home
      </Link>
      <Link href="/about" style={linkStyle} className={pathname === "/about" ? "activeLink" : ""}>
        About
      </Link>
      <Link href="/projects" style={linkStyle} className={pathname === "/projects" ? "activeLink" : ""}>
        Projects
      </Link>
      <Link href="/contact" style={linkStyle} className={pathname === "/contact" ? "activeLink" : ""}>
        Contact
      </Link>
    </nav>
  );
}
