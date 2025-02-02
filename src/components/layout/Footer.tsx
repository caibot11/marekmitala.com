// src/components/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p style={paragraphStyle}>
        &copy; {new Date().getFullYear()} My Personal Website. All rights reserved.
      </p>
    </footer>
  );
};

// Inline styles (or replace these with your CSS classes)
const footerStyle: React.CSSProperties = {
  background: '#333',
  padding: '1rem 2rem',
  color: '#fff',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

const paragraphStyle: React.CSSProperties = {
  margin: 0,
};

export default Footer;
