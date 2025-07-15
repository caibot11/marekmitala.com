import React from 'react';

interface StructuredDataProps {
  type: 'person' | 'website';
}

export default function StructuredData({ type }: StructuredDataProps) {
  let structuredData = {};

  if (type === 'person') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Marek Mitala",
      "url": "https://marekmitala.com",
      "sameAs": [
        "https://github.com/caibot11",
        "https://www.linkedin.com/in/caibot-daito-139215213/"
      ],
      "jobTitle": "Software Developer",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Fontys ICT"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "SPŠE Zochova 9, Bratislava"
        }
      ],
      "knowsAbout": [
        "Arduino",
        "Python",
        "JavaScript",
        "Web Development",
        "IoT",
        "Cybersecurity",
        "Networking",
        "Robotics"
      ]
    };
  } else if (type === 'website') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Marek Mitala Portfolio",
      "url": "https://marekmitala.com",
      "description": "Marek Mitala is a software developer and ICT student at Fontys University. Explore my projects, experience in Arduino, Python, web development, and more.",
      "author": {
        "@type": "Person",
        "name": "Marek Mitala"
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 