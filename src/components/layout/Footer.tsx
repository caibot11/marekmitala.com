import React from "react";
import styles from "./Footer.module.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.socialIcons}>
        
        <a
          href="https://www.linkedin.com/in/caibot-daito-139215213/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/caibot11"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
