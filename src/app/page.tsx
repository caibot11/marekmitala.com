// src/app/page.tsx
import React from 'react';
import Hero from '@/components/hero/Hero';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      {/* Other sections can be added here one at a time */}
    </div>
  );
};

export default HomePage;
