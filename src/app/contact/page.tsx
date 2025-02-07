// src/app/contact/page.tsx
import PageWrapper from "@/components/transitions/PageWrapper";
import Link from "next/link";

export default function ContactPage() {
  return (
    <PageWrapper>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Nyxerin", fontSize: "2.5rem", marginBottom: "1rem" }}>
          Get in Touch
        </h1>
        <p style={{ marginBottom: "2rem" }}>
          Let's connect. Reach out via social media or send me an email.
        </p>

        {/* Social Media Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="https://twitter.com/YourProfile" target="_blank">
            <button style={buttonStyle}>Twitter</button>
          </Link>
          <Link href="https://github.com/YourProfile" target="_blank">
            <button style={buttonStyle}>GitHub</button>
          </Link>
          <Link href="https://www.linkedin.com/in/YourProfile/" target="_blank">
            <button style={buttonStyle}>LinkedIn</button>
          </Link>
        </div>

        {/* Email Button */}
        <div>
          <Link href="mailto:youremail@example.com?subject=Hello%20Cyberpunk%20Dev!">
            <button style={buttonStyle}>Email Me</button>
          </Link>
        </div>
      </main>
    </PageWrapper>
  );
}

/* Simple inline style for neon button */
const buttonStyle: React.CSSProperties = {
  background: "linear-gradient(45deg, var(--color-neon-yellow), #ffea00)",
  color: "#000",
  fontWeight: "bold",
  padding: "0.8rem 1.2rem",
  border: "none",
  cursor: "pointer",
  boxShadow: `0 0 5px var(--color-neon-yellow)`,
  textTransform: "uppercase",
  letterSpacing: "1px",
  transition: "box-shadow 0.2s ease, filter 0.2s ease",
};
