// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgvonqyd", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });
      if (response.ok) {
        form.reset();
        setSubmitted(true);
        setError("");
      } else {
        const result = await response.json();
        setError(result.error || "Submission failed, please try again.");
      }
    } catch (err) {
      console.error("Error submitting the form", err);
      setError("Submission failed, please try again later.");
    }
  }

  return (
    
    <main className={styles.contactContainer}>
      <div className={styles.contactBox}>
        <h1 className={styles.contactTitle}>Contact Me</h1>
        <p className={styles.contactSubtitle}>
          Below you can find my GitHub page and my LinkedIn profile. Be sure to email me via this contact form :)
        </p>

        <div className={styles.socialLinks}>
          <a href="https://github.com/caibot11" target="_blank" rel="noopener noreferrer">
            <button className={styles.contactButton}>GitHub</button>
          </a>
          <a href="https://www.linkedin.com/in/caibot-daito-139215213/" target="_blank" rel="noopener noreferrer">
            <button className={styles.contactButton}>LinkedIn</button>
          </a>
        </div>

        {submitted ? (
          <p className={styles.thankYouMessage}>Thank you for your message!</p>
        ) : (
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {/* Honeypot field to deter spam bots */}
            <div style={{ display: "none" }}>
              <label>
                Leave this field empty:
                <input type="text" name="honeypot" />
              </label>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={styles.inputField}
              required
            />
            <input
              type="email"
              name="_replyto"
              placeholder="Your Email"
              className={styles.inputField}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className={styles.textArea}
              required
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.contactButton}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
