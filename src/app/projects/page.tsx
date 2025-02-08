import React from "react";
import styles from "./Projects.module.css";
import {
  SiArduino,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiLinux,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  languages: string[];
}

const projects: Project[] = [
  {
    title: "Graduation Thesis Project - High School",
    description:
      "For my high school graduation thesis, I developed an Arduino‑based weather and information station. The system featured a main Arduino R4 with WiFi and an LCD that displayed real‑time sensor data, along with an auxiliary ESP32 with an OLED display for individual meters. Sensors measured indoor air quality (Air Meter), ambient light and soil moisture (Lux Meter), and vital signs such as pulse and SpO₂ (Heart Meter). I also integrated data from the OpenWeather API and used Thingspeak to upload sensor data to the cloud for remote monitoring.",
    languages: ["Arduino"],
  },
  {
    title: "WannaSmile – College Team Project (Fontys ICT, Sem 1)",
    description:
      "WannaSmile was a collaborative project addressing connectivity issues in a student apartment complex by creating a local intranet. I configured a Flask‑based website running on a Raspberry Pi 4 and built a Python client that interfaced with an Arduino to capture sensor data. Key features included real‑time temperature updates (via OpenWeather), a chat system, file sharing, user management, event scheduling, energy monitoring, and remote socket control. My responsibilities covered full‑stack web development, Raspberry Pi and network configuration, and system integration.",
    languages: ["Python", "JavaScript", "HTML", "CSS", "Linux"],
  },
  {
    title: "Mario Lugi's Pizzeria – College Team Project (Fontys ICT, Sem 1)",
    description:
      "This group project tackled a fictional restaurant’s ordering system by developing a web‑based ordering platform integrated with Arduino‑controlled hardware. The website allowed customers to place orders and featured an admin panel for order tracking. For the hardware, I led the Arduino integration by designing a system that displayed order IDs on a 2x16 LCD screen and functioned as a 'Smart Oven'—complete with control buttons and a blinking red LED to indicate when a pizza was ready.",
    languages: ["Python", "HTML", "CSS", "Arduino"],
  },
];

const languageIconMap: { [key: string]: JSX.Element } = {
  Arduino: <SiArduino />,
  Python: <SiPython />,
  JavaScript: <SiJavascript />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  Linux: <SiLinux />,
};

const ProjectsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.card}>
            <h2 className={styles.cardTitle}>{project.title}</h2>
            <p className={styles.cardDescription}>{project.description}</p>
            <div className={styles.languages}>
              {project.languages.map((lang, i) => (
                <span key={i} className={styles.languageIcon} title={lang}>
                  {languageIconMap[lang]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className={styles.note}>More projects coming soon...</p>
    </div>
  );
};

export default ProjectsPage;
