// src/app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import TransitionsWrapper from "@/components/layout/TransitionsWrapper";

export const metadata: Metadata = {
  title: "Marek Mitala’s Site",
  description: "A single Header with smooth page transitions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#101010", color: "#fff" }}>
        <Header />
        {/* Use a container with position relative to contain the absolutely positioned motion.div */}
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <TransitionsWrapper>{children}</TransitionsWrapper>
        </div>
      </body>
    </html>
  );
}
