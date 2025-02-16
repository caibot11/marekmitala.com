// app/contact/page.tsx
import Link from "next/link";
import React from "react";
import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <main className={styles.contactContainer}>
      <div className={styles.contactBox}>
        <h1 className={styles.contactTitle}>Contact Me</h1>
        <p className={styles.contactSubtitle}>
          Let’s connect! Reach out via social media or send me an email.
        </p>

        <div className={styles.socialLinks}>
          <Link href="https://github.com/caibot11" target="_blank">
            <button className={styles.contactButton}>GitHub</button>
          </Link>
          <Link href="https://www.linkedin.com/in/yourProfile/" target="_blank">
            <button className={styles.contactButton}>LinkedIn</button>
          </Link>
        </div>

        <Link href="mailto:marek.mitala04@gmail.com?subject=Hello%20Marek&body=I%20would%20like%20to%20connect">
        <button className={styles.contactButton}>Email Me</button>
      </Link>
      </div>
    </main>
  );
}
