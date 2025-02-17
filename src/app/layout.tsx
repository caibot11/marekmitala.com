// app/layout.tsx
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/particles/ParticlesBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"



export const metadata = {
  title: 'Marek Mitala',
  description: 'Marek Mitala`s personal website',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      {url: '/android-chrome-192x192.png', siezes: '192x192',type:'image/png'},
      {url: '/android-chrome-512x512.png', siezes: '512x512',type:'image/png'},


    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
        <ParticlesBackground />
        <Header />
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
