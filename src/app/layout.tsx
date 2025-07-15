// app/layout.tsx
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/particles/ParticlesBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import StructuredData from "@/components/StructuredData";
import type { Metadata } from "next";
import React from 'react';


export const metadata = {
  title: {
    default: 'Marek Mitala - Software Developer & ICT Student',
    template: '%s | Marek Mitala'
  },
  description: 'Marek Mitala is a software developer and ICT student at Fontys University. Explore my projects, experience in Arduino, Python, web development, and more.',
  keywords: ['Marek Mitala', 'software developer', 'ICT student', 'Fontys University', 'Arduino', 'Python', 'web development', 'programming', 'portfolio'],
  authors: [{ name: 'Marek Mitala' }],
  creator: 'Marek Mitala',
  publisher: 'Marek Mitala',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://marekmitala.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marekmitala.com',
    title: 'Marek Mitala - Software Developer & ICT Student',
    description: 'Marek Mitala is a software developer and ICT student at Fontys University. Explore my projects, experience in Arduino, Python, web development, and more.',
    siteName: 'Marek Mitala Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marek Mitala - Software Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marek Mitala - Software Developer & ICT Student',
    description: 'Marek Mitala is a software developer and ICT student at Fontys University. Explore my projects, experience in Arduino, Python, web development, and more.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
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
      <head>
        <StructuredData type="person" />
        <StructuredData type="website" />
      </head>
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
