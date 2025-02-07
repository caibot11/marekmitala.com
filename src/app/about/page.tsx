// src/app/about/page.tsx
import PageWrapper from "@/components/transitions/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Nyxerin", fontSize: "2.5rem", marginBottom: "1rem" }}>
          About Me
        </h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          I am a passionate developer with a love for futuristic aesthetics.
          <br />
          My skills include React, Next.js, and building immersive web experiences.
        </p>
      </main>
    </PageWrapper>
  );
}
