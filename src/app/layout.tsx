// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/particles/ParticlesBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"



export const metadata: Metadata = {
  title: "Marek Mitala",
  description: "A single Header without page transitions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body style={{ margin: 0 }}>
        {/* The ParticlesBackground is fixed and sits at a lower z-index */}
        <ParticlesBackground />
        <Header />
        {/* Ensure main content is positioned above the particle canvas */}
        <div className="id-children">
          {children}
          <Analytics />
          <SpeedInsights />
        </div>
        <Footer />
      </body>
    </html>
  );
}
