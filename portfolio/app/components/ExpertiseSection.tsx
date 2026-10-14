"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Server,
  Layers,
  Radio,
  Database,
  Container,
} from "lucide-react";

const EXPERTISE_AREAS = [
  {
    number: "01",
    title: "Mobile App Development",
    icon: Smartphone,
    description:
      "Crafting responsive cross-platform iOS and Android applications with Flutter and Dart. Utilizing scalable state architectures (Riverpod, GetX, Provider) with reliable Dio API client integration.",
    skills: ["Flutter", "Dart", "Riverpod", "GetX", "Dio", "Offline Storage", "State Management"],
  },
  {
    number: "02",
    title: "Backend & API Systems",
    icon: Server,
    description:
      "Designing resilient RESTful microservices and backend architectures using Go (Gin, GORM) and PHP (Laravel). Implementing clean service boundaries, authentication, and high-throughput data pipelines.",
    skills: ["Go (Golang)", "Gin", "GORM", "PHP", "Laravel", "REST APIs", "Microservices"],
  },
  {
    number: "03",
    title: "Modern Web & Frontend",
    icon: Layers,
    description:
      "Engineering fast, responsive web products, customer portals, and admin management dashboards using Next.js, React, and TypeScript. Focused on semantic HTML, strong typography, and maintainable styles.",
    skills: ["Next.js", "React", "TypeScript", "App Router", "JavaScript", "Tailored CSS"],
  },
  {
    number: "04",
    title: "Real-time & Live Streaming",
    icon: Radio,
    description:
      "Building low-latency real-time communications including live chat, viewer presence, notifications, WebSocket pipelines, and video streaming integration using LiveKit and WebRTC.",
    skills: ["WebSocket", "Socket.IO", "LiveKit", "WebRTC", "Event Pipelines", "Push Notifications"],
  },
  {
    number: "05",
    title: "Databases & Caching",
    icon: Database,
    description:
      "Architecting relational data schemas, indexing, and high-performance querying in PostgreSQL and MySQL, backed by Redis in-memory caching for session management and low response latencies.",
    skills: ["PostgreSQL", "MySQL", "Redis", "SQLite", "Firebase", "Query Optimization"],
  },
  {
    number: "06",
    title: "DevOps & Infrastructure",
    icon: Container,
    description:
      "Standardizing containerized delivery using Docker and Docker Compose. Configuring Linux environments, Nginx reverse proxies, Git version control, and GitHub Actions CI/CD workflows.",
    skills: ["Docker", "Linux", "Nginx", "GitHub Actions", "CI/CD", "Git Workflows"],
  },
];

export default function ExpertiseSection() {
  return (
    <section className="expertise-section" id="expertise" aria-label="Technical Expertise">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Capabilities &amp; Specializations
          </p>
          <h2 className="section-title">
            Technical <span>expertise.</span>
          </h2>
          <p className="section-subtitle">
            Core engineering competencies across mobile platforms, backend systems, and web architecture.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="expertise-grid">
          {EXPERTISE_AREAS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.number}
                className="expertise-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="expertise-card-top">
                  <span className="expertise-number">{item.number}</span>
                  <div className="expertise-icon-wrap" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="expertise-card-title">{item.title}</h3>
                <p className="expertise-card-desc">{item.description}</p>

                <div className="expertise-skills-list" aria-label={`Skills for ${item.title}`}>
                  {item.skills.map((skill) => (
                    <span key={skill} className="expertise-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
