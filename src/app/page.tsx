// src/app/page.tsx
import Hero from "@/components/hero/Hero";
import type { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Marek Mitala\'s portfolio. I\'m a software developer and ICT student passionate about Arduino, Python, web development, and innovative technology solutions.',
  openGraph: {
    title: 'Marek Mitala - Software Developer & ICT Student',
    description: 'Welcome to Marek Mitala\'s portfolio. I\'m a software developer and ICT student passionate about Arduino, Python, web development, and innovative technology solutions.',
    url: 'https://marekmitala.com',
  },
  twitter: {
    title: 'Marek Mitala - Software Developer & ICT Student',
    description: 'Welcome to Marek Mitala\'s portfolio. I\'m a software developer and ICT student passionate about Arduino, Python, web development, and innovative technology solutions.',
  },
};

export default function HomePage() {
  const handleContactClick = () => {};
  const handleAboutClick = () => {};
  const handleProjectsClick = () => {};
  const handleFunClick = () => {};

  return (
    <main>
      <Hero 
        onContactClick={handleContactClick}
        onAboutClick={handleAboutClick}
        onProjectsClick={handleProjectsClick}
        onFunClick={handleFunClick}
      />
    </main>
  );
}
