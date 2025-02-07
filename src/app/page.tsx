// src/app/page.tsx
import PageWrapper from "@/components/transitions/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Nyxerin", fontSize: "3rem", marginBottom: "1rem" }}>
          Welcome to My Cyberpunk World
        </h1>
        <p style={{ maxWidth: "600px", margin: "0 auto" }}>
          Step into a futuristic realm of neon lights and cutting-edge tech.
        </p>
      </main>
    </PageWrapper>
  );
}
