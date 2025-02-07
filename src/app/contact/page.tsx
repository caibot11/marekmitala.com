// src/app/contact/page.tsx

import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: "80vh",         // fill most of the viewport
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",  // center vertically
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontFamily: "Nyxerin, sans-serif",
          fontSize: "2rem",
          marginBottom: "1rem",
          textTransform: "uppercase",
          color: "#ffd700",         // bright yellow accent for heading
          letterSpacing: "2px",
        }}
      >
        Contact Me
      </h1>
      <p style={{ maxWidth: "600px", marginBottom: "2rem", color: "#ccc", lineHeight: 1.6 }}>
        Let’s connect! Reach out via social media or send me an email.
      </p>

      {/* Social links row */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",      // to handle smaller screens gracefully
          marginBottom: "2rem",
        }}
      >
        <Link href="https://github.com/yourProfile" target="_blank">
          <button style={buttonStyle}>GitHub</button>
        </Link>
        <Link href="https://www.linkedin.com/in/yourProfile/" target="_blank">
          <button style={buttonStyle}>LinkedIn</button>
        </Link>
      </div>

      {/* Email link */}
      <Link href="mailto:youremail@example.com?subject=Hello">
        <button style={buttonStyle}>Email Me</button>
      </Link>
    </main>
  );
}

/** Button style with bright yellow box, visible border, and bold text */
const buttonStyle: React.CSSProperties = {
  background: "#ffd700",         // bright yellow
  color: "#000",                 // black text
  fontWeight: "bold",
  padding: "0.8rem 1.2rem",
  border: "2px solid #ffd700",   // ensure a visible box
  borderRadius: "4px",
  cursor: "pointer",
  boxShadow: "0 0 5px #ffd700",
  textTransform: "uppercase",
  letterSpacing: "1px",
  transition: "box-shadow 0.2s ease, filter 0.2s ease",
  fontFamily: "inherit",         // keep consistent with the page font
};
