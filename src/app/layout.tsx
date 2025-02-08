import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // Import the Footer component

export const metadata: Metadata = {
  title: "Marek Mitala’s Site",
  description: "A single Header without page transitions",
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
        {/* Add bottom padding so content doesn't overlap with the fixed footer */}
        <div style={{ position: "relative", minHeight: "100vh", paddingBottom: "80px" }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
