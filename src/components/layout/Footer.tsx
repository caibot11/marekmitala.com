// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "1rem",
      background: "#1a1a1a",
      boxShadow: "0 0 5px var(--color-neon-cyan)",
      marginTop: "1rem",
    }}>
      <p style={{ fontSize: "0.9rem" }}>
        © 2025 My Personal Website. All rights reserved.
      </p>
    </footer>
  );
}
