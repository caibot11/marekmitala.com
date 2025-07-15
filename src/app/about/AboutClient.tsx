"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./About.module.css";
import CustomMap from "@/components/CustomMap";

export default function AboutClient() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>About Me</h1>

      <section style={{ marginBottom: "2rem" }}>
        <p className={styles.para}>
          I am currently a student at <strong>Fontys ICT</strong>, where I am expanding my expertise in modern technologies and software development.
        </p>
        <p className={styles.para}>
          Previously, I studied at <strong>SPŠE Zochova 9, Bratislava</strong>, where I completed the Intelligent Technologies course. During that course, I gained hands-on experience in networking (CCNA1 and CCNA2), robotics, cybersecurity, programming, database systems, electronics, and IoT devices.
        </p>
        <p className={styles.para}>
          Beyond my formal education, I have a strong passion for continuous learning and innovation. I enjoy exploring new technologies—whether it's experimenting with emerging frameworks, diving into cybersecurity challenges, or exploring the potential of IoT and AI. My hands-on experience with projects like the Arduino-based weather station and various collaborative initiatives has sharpened my problem-solving skills and prepared me for real-world challenges.
        </p>
      </section>

      <section className={styles.mapSection}>
        {/* Map #1: Fontys ICT */}
        <div className={styles.mapContainer}>
          <h2 className={styles.mapTitle}>Fontys ICT</h2>
          <CustomMap lat={51.4512} lng={5.4811} />
          <div className={styles.buttonWrapper}>
            <img
              src="/images/fontyslogo.png"
              alt="Fontys Logo"
              className={styles.buttonLogo}
            />
            <span className={styles.arrowIcon}>
              <FaArrowRight />
            </span>
            <a
              href="https://www.fontys.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Visit Fontys Website
            </a>
          </div>
        </div>

        {/* Map #2: SPŠE Zochova */}
        <div className={styles.mapContainer}>
          <h2 className={styles.mapTitle}>SPŠE Zochova</h2>
          <CustomMap lat={48.146810172090234} lng={17.099894297962074} />
          <div className={styles.buttonWrapper}>
            <img
              src="/images/spse.png"
              alt="SPŠE Logo"
              className={styles.buttonLogo}
            />
            <span className={styles.arrowIcon}>
              <FaArrowRight />
            </span>
            <a
              href="https://zochova.sk/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Visit SPŠE Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 