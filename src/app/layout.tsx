// src/app/layout.tsx
import "./globals.css";            // Your global styles
import { Metadata } from "next";
import Header from "@/components/layout/Header"; 
import TransitionsWrapper from "@/components/layout/TransitionsWrapper";

export const metadata: Metadata = {
  title: "Marek Mitala’s Site",
  description: "Smooth page transitions with Next.js + Framer Motion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <TransitionsWrapper> is a client component that animates route changes */}
        <TransitionsWrapper>{children}</TransitionsWrapper>
      </body>
    </html>
  );
}
