import React from 'react';

interface StructuredDataProps {
  type: 'person' | 'website' | 'organization' | 'breadcrumb';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {};

  if (type === 'person') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Marek Mitala",
      "url": "https://marekmitala.com",
      "image": "https://marekmitala.com/images/og-image.svg",
      "sameAs": [
        "https://github.com/caibot11",
        "https://www.linkedin.com/in/caibot-daito-139215213/"
      ],
      "jobTitle": "Software Developer",
      "description": "ICT student at Fontys University with expertise in Arduino, Python, web development, and innovative technology solutions.",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Fontys ICT",
        "url": "https://www.fontys.nl/",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NL"
        }
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "SPŠE Zochova 9, Bratislava",
          "url": "https://zochova.sk/",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "SK"
          }
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
        "Robotics",
        "Next.js",
        "React",
        "HTML",
        "CSS",
        "Database Systems",
        "Electronics"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Software Developer",
        "occupationLocation": {
          "@type": "Country",
          "name": "Netherlands"
        }
      }
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
      },
      "inLanguage": "en",
      "copyrightYear": 2024,
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://marekmitala.com/projects",
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === 'organization') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Marek Mitala - Software Development",
      "url": "https://marekmitala.com",
      "description": "Professional software development services specializing in Arduino, Python, web development, and IoT solutions.",
      "founder": {
        "@type": "Person",
        "name": "Marek Mitala"
      },
      "serviceType": "Software Development",
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands"
      }
    };
  } else if (type === 'breadcrumb' && data) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 