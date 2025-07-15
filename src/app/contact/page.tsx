import type { Metadata } from "next";
import ContactClient from "./ContactClient.tsx";

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Marek Mitala. Connect via GitHub, LinkedIn, or send a message through the contact form.',
  keywords: ['contact', 'Marek Mitala', 'GitHub', 'LinkedIn', 'email'],
  openGraph: {
    title: 'Contact Marek Mitala - Software Developer',
    description: 'Get in touch with Marek Mitala. Connect via GitHub, LinkedIn, or send a message through the contact form.',
    url: 'https://marekmitala.com/contact',
  },
  twitter: {
    title: 'Contact Marek Mitala - Software Developer',
    description: 'Get in touch with Marek Mitala. Connect via GitHub, LinkedIn, or send a message through the contact form.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
