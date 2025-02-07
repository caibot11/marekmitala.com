// src/app/about/page.tsx

import React from "react";

// Inline style objects
const titleStyle: React.CSSProperties = {
  fontFamily: "Nyxerin, sans-serif",
  fontSize: "2rem",
  marginBottom: "1rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: "#ffd700", // Yellow accent for the heading text
};

const paraStyle: React.CSSProperties = {
  marginBottom: "1rem",
  color: "#e0e0e0",
  lineHeight: 1.6,
};

const mapSectionStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
};

const mapContainerStyle: React.CSSProperties = {
  flex: "1 1 400px",
  background: "#1f1f1f", // Dark gray container
  padding: "1rem",
};

const mapTitleStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontSize: "1.2rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#ffd700", // Yellow accent for subheadings
};

const mapLinkStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "0.5rem",
  padding: "0.5rem 1rem",
  background: "#ffd700", // Yellow accent
  border: "none",
  color: "#000",         // Black text on yellow
  cursor: "pointer",
  textTransform: "uppercase",
  textDecoration: "none",
  fontWeight: "bold",
};

export default function AboutPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", background: "#101010" }}>
      <h1 style={titleStyle}>About Marek Mitala</h1>

      <section style={{ marginBottom: "2rem" }}>
        <p style={paraStyle}>
          I am a student of Fontys ICT, where I'm expanding my expertise in modern
          technologies and software development. Previously, I studied at
          <strong> Stredná Priemyselná škola elektrotechnická, Zochova 9, Bratislava.</strong>
        </p>
        <p style={paraStyle}>
          My current focus is on <strong>Arduino</strong> projects and <strong>Web Development</strong>,
          combining hardware tinkering with front-end creativity.
        </p>
      </section>

      <section style={mapSectionStyle}>
        {/* Map #1: Fontys ICT (Snazzy Maps iframe) */}
        <div style={mapContainerStyle}>
          <h2 style={mapTitleStyle}>Fontys ICT</h2>
          <iframe
            title="Fontys Map"
            width="100%"
            height="600"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            // Embed from Snazzy Maps (keeps the default map UI)
            src="https://snazzymaps.com/embed/681285"
          />
          <a
            href="https://www.fontys.nl/"
            target="_blank"
            rel="noopener noreferrer"
            style={mapLinkStyle}
          >
            Visit Fontys Website
          </a>
        </div>

        {/* Map #2: SPŠE Zochova (Snazzy Maps iframe) */}
        <div style={mapContainerStyle}>
          <h2 style={mapTitleStyle}>SPŠE Zochova</h2>
          <iframe
            title="SPSE Map"
            width="100%"
            height="600"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://snazzymaps.com/embed/681287"
          />
          <a
            href="https://zochova.sk/"
            target="_blank"
            rel="noopener noreferrer"
            style={mapLinkStyle}
          >
            Visit SPŠE Website
          </a>
        </div>
      </section>
    </main>
  );
}
