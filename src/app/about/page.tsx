import type { Metadata } from "next";
import AboutClient from "./AboutClient.tsx";

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn about Marek Mitala, ICT student at Fontys University and former student at SPŠE Zochova. Discover my educational background, expertise in networking, robotics, cybersecurity, and passion for innovative technologies.',
  keywords: ['Marek Mitala', 'about', 'Fontys ICT', 'SPŠE Zochova', 'education', 'networking', 'robotics', 'cybersecurity', 'IoT', 'Arduino'],
  openGraph: {
    title: 'About Marek Mitala - ICT Student & Developer',
    description: 'Learn about Marek Mitala, ICT student at Fontys University and former student at SPŠE Zochova. Discover my educational background, expertise in networking, robotics, cybersecurity, and passion for innovative technologies.',
    url: 'https://marekmitala.com/about',
  },
  twitter: {
    title: 'About Marek Mitala - ICT Student & Developer',
    description: 'Learn about Marek Mitala, ICT student at Fontys University and former student at SPŠE Zochova. Discover my educational background, expertise in networking, robotics, cybersecurity, and passion for innovative technologies.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
