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

const particlesOptions = {
  particles: {
    number: { value: 30, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 1,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 7.84,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
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
        <ParticlesBackground options={particlesOptions} />
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
