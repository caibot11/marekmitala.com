// src/components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" passHref>
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about" passHref>
          <a style={linkStyle}>About</a>
        </Link>
        <Link href="/contact" passHref>
          <a style={linkStyle}>Contact</a>
        </Link>
      </nav>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  background: '#333',
  padding: '1rem 2rem',
  color: '#fff'
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around'
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem'
};

export default Header;
