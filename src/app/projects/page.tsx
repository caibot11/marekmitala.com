// src/app/projects/page.tsx
export default function ProjectsPage() {
    return (
      <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ 
          fontFamily: "Nyxerin, sans-serif", 
          fontSize: "2rem", 
          textTransform: "uppercase", 
          letterSpacing: "2px",
          marginBottom: "1rem"
        }}>
          Projects
        </h1>
        <p style={{ color: "#ccc", marginBottom: "1rem" }}>
          A collection of Arduino and web development projects I've been working on.
        </p>
        {/* Add your project listings/cards here */}
      </main>
    );
  }
  