"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Server,
  Radio,
  Container,
  Github,
  Linkedin,
  ArrowUpRight,
  FileText,
  CheckCircle2,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Smartphone,
    title: "Mobile Product Engineering",
    description: "Production Flutter & Dart applications with modular state architectures (Riverpod, GetX) and native device integrations.",
  },
  {
    icon: Server,
    title: "Backend & Microservices",
    description: "High-concurrency services and RESTful APIs in Go (Gin, GORM) and PHP (Laravel) with robust data structures.",
  },
  {
    icon: Radio,
    title: "Real-time & Live Media",
    description: "Interactive real-time communication architectures utilizing WebSockets, WebRTC, and LiveKit for live streaming and messaging.",
  },
  {
    icon: Container,
    title: "Containerized Delivery",
    description: "Dockerized environments, automated CI/CD workflows, Linux administration, and production-ready deployments.",
  },
];

export default function AboutSection() {
  return (
    <section className="about-section" id="about" aria-label="About MD. Emon Miah">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Background &amp; Philosophy
          </p>
          <h2 className="section-title">
            Engineering with <span>purpose &amp; precision.</span>
          </h2>
          <p className="section-subtitle">
            A software engineer delivering robust mobile applications, backend services, and scalable full-stack platforms.
          </p>
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Left Column: Narrative */}
          <motion.div
            className="about-narrative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="about-text-card">
              <h3 className="about-card-title">Full-Stack Architecture</h3>
              <p>
                I focus on designing, building, and maintaining mobile applications, backend services, and real-time systems.
                My work spans the full development lifecycle—from defining clean API boundaries and database schemas to crafting
                responsive client applications and automating delivery pipelines.
              </p>
              <p>
                My core stack centers on <strong>Flutter</strong>, <strong>Go</strong>, <strong>Next.js</strong>, and{" "}
                <strong>Laravel</strong>. Whether engineering live chat workflows with WebSockets, architecting multi-vendor
                e-commerce modules, or streaming media via LiveKit and WebRTC, I prioritize code clarity, system reliability,
                and maintainability.
              </p>

              <div className="about-principles">
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>API-First &amp; Maintainable Architecture</span>
                </div>
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>Cross-Platform Performance &amp; Native Quality</span>
                </div>
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>Secure Authentication &amp; Production-Ready Delivery</span>
                </div>
              </div>

              <div className="about-social-links">
                <a
                  href="https://github.com/programmermdemonmiah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  <Github size={16} aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mdemonmiah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  <FileText size={16} aria-hidden="true" />
                  <span>View Résumé</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Focus Cards */}
          <div className="about-cards-list">
            {HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="about-highlight-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="highlight-icon-box">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="highlight-content">
                    <h4 className="highlight-title">{item.title}</h4>
                    <p className="highlight-desc">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
