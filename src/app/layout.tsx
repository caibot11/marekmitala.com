import React from 'react';
import Hero from '@/components/hero/Hero';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>My Personal Website</title>
      </head>
      <body>
        <Header />
        <Hero />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
