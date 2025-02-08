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
  color: "#000", // Black text on yellow
  cursor: "pointer",
  textTransform: "uppercase",
  textDecoration: "none",
  fontWeight: "bold",
};

// Updated logo style to make images responsive and centered
const logoStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px", // The logo will fill the container up to 400px
  height: "auto",
  display: "block",
  margin: "0 auto 1rem auto", // Center the image and add bottom margin
  objectFit: "contain",
};

export default function AboutPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        background: "#101010",
      }}
    >
      <h1 style={titleStyle}>About Me</h1>

      <section style={{ marginBottom: "2rem" }}>
        <p style={paraStyle}>
          I am currently a student at <strong>Fontys ICT</strong>, where I am
          expanding my expertise in modern technologies and software development.
        </p>
        <p style={paraStyle}>
          Previously, I studied at <strong>SPŠE Zochova 9, Bratislava</strong>,
          where I completed the Intelligent Technologies course. During that
          course, I gained hands-on experience in networking (CCNA1 and CCNA2),
          robotics, cybersecurity, programming, database systems, electronics, and
          IoT devices.
        </p>
        <p style={paraStyle}>
          Beyond my formal education, I have a strong passion for continuous
          learning and innovation. I enjoy exploring new technologies—whether it's
          experimenting with emerging frameworks, diving into cybersecurity
          challenges, or exploring the potential of IoT and AI. My hands-on experience
          with projects like the Arduino-based weather station and various
          collaborative initiatives has sharpened my problem-solving skills and
          prepared me for real-world challenges. I actively seek opportunities to work
          on cutting-edge projects, and I am excited to contribute to and learn from the
          tech community.
        </p>
      </section>

      <section style={mapSectionStyle}>
        {/* Map #1: Fontys ICT */}
        <div style={mapContainerStyle}>
          <h2 style={mapTitleStyle}>Fontys ICT</h2>
          <img src="/images/fontyslogo.png" alt="Fontys Logo" style={logoStyle} />
          <iframe
            title="Fontys Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
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

        {/* Map #2: SPŠE Zochova */}
        <div style={mapContainerStyle}>
          <h2 style={mapTitleStyle}>SPŠE Zochova</h2>
          <img src="/images/spselogo.png" alt="SPŠE Logo" style={logoStyle} />
          <iframe
            title="SPSE Map"
            width="100%"
            height="400"
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
