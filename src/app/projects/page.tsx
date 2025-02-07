// src/app/projects/page.tsx
import PageWrapper from "@/components/transitions/PageWrapper";

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <main style={{ padding: "2rem" }}>
        <h1 style={{ fontFamily: "Nyxerin", fontSize: "2.5rem", marginBottom: "1rem", textAlign: "center" }}>
          My Projects
        </h1>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {/* Example project cards */}
          <div style={{ width: "200px", border: "2px solid var(--color-neon-cyan)", padding: "1rem" }}>
            <h2>Project A</h2>
            <p>Brief description here...</p>
          </div>
          <div style={{ width: "200px", border: "2px solid var(--color-neon-cyan)", padding: "1rem" }}>
            <h2>Project B</h2>
            <p>Brief description here...</p>
          </div>
          <div style={{ width: "200px", border: "2px solid var(--color-neon-cyan)", padding: "1rem" }}>
            <h2>Project C</h2>
            <p>Brief description here...</p>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
