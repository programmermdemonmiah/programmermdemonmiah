"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Github, Linkedin, ExternalLink, MapPin, Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section" aria-label="Introduction and Overview">
      <div className="hero-grid">
        {/* Left Column: Information & Actions */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Status Badge */}
          <div className="status-badge" role="status">
            <span className="status-indicator">
              <span className="status-dot-pulse" aria-hidden="true" />
              <span className="status-dot" aria-hidden="true" />
            </span>
            <span className="status-text">Available for Mobile &amp; Backend Engineering</span>
          </div>

          {/* Heading */}
          <div className="hero-title-group">
            <p className="hero-greeting">Hi, I&apos;m</p>
            <h1 className="hero-name">
              MD. Emon Miah<span className="accent-dot">.</span>
            </h1>
            <p className="hero-role">
              Full Stack Mobile &amp; Backend Developer
            </p>
          </div>

          {/* Professional Summary from CV */}
          <p className="hero-summary">
            Specializing in high-performance <strong>Flutter</strong> applications and scalable backend systems.
            Proven experience designing real-time architectures using <strong>WebSocket</strong>, building fintech,
            healthcare, live streaming, and e-commerce platforms with <strong>Go</strong>, <strong>Laravel</strong>, and <strong>Python</strong>.
          </p>

          {/* Core Stack Pills */}
          <div className="hero-stack-tags" aria-label="Core Engineering Technologies">
            <span className="stack-tag stack-tag-highlight">Flutter &amp; Dart</span>
            <span className="stack-tag stack-tag-highlight">Go (Gin)</span>
            <span className="stack-tag stack-tag-highlight">PHP (Laravel)</span>
            <span className="stack-tag">Python &amp; Django</span>
            <span className="stack-tag">WebSocket Real-time</span>
            <span className="stack-tag">MySQL &amp; Firebase</span>
            <span className="stack-tag">Payment Gateways</span>
          </div>

          {/* CTA Actions */}
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              <span>Explore Projects</span>
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail size={16} aria-hidden="true" />
              <span>Contact Me</span>
            </a>
            <a
              href="tel:+8801405665854"
              className="btn-icon"
              aria-label="Call +8801405665854"
              title="Call +8801405665854"
            >
              <Phone size={17} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/programmermdemonmiah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/MdEmonMiah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Handcrafted Profile Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="profile-card">
            {/* Ambient Card Glow */}
            <div className="profile-card-glow" aria-hidden="true" />

            {/* Profile Frame Top Header */}
            <div className="profile-frame-bar">
              <div className="frame-indicators">
                <span className="frame-dot frame-dot-red" />
                <span className="frame-dot" />
                <span className="frame-dot" />
              </div>
              <span className="frame-tag">ENGINEER PROFILE</span>
              <span className="frame-live">
                <span className="live-dot" /> LIVE
              </span>
            </div>

            {/* Profile Image Wrap */}
            <div className="profile-avatar-wrapper">
              <img
                src="https://github.com/programmermdemonmiah.png"
                alt="MD. Emon Miah - Full Stack Mobile & Backend Developer"
                className="profile-avatar-img"
                width={380}
                height={380}
                fetchPriority="high"
              />
              <div className="profile-overlay-gradient" aria-hidden="true" />

              {/* Bottom Card Bar */}
              <div className="profile-overlay-info">
                <div>
                  <span className="profile-badge-small">FLUTTER · GO · LARAVEL</span>
                  <p className="profile-caption-name">MD. Emon Miah</p>
                </div>
                <div className="profile-location">
                  <MapPin size={13} aria-hidden="true" />
                  <span>Uttara, Dhaka</span>
                </div>
              </div>
            </div>

            {/* Frame Footer Details */}
            <div className="profile-card-footer">
              <div className="profile-metric">
                <span className="metric-label">CURRENT ROLE</span>
                <span className="metric-val">Senior Software Engineer</span>
              </div>
              <a
                href="https://github.com/programmermdemonmiah"
                target="_blank"
                rel="noopener noreferrer"
                className="profile-github-link"
              >
                <span>@programmermdemonmiah</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
