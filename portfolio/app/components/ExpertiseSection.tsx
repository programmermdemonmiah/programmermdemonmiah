"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Server,
  Layers,
  Radio,
  Database,
  CreditCard,
} from "lucide-react";

const EXPERTISE_AREAS = [
  {
    number: "01",
    title: "Mobile App Development (Flutter)",
    icon: Smartphone,
    description:
      "Cross-platform iOS and Android application engineering with Flutter and Dart. Implementing Clean Architecture (Layered, Scalable, Maintainable), MVC/MVVM patterns, and optimized REST/Dio integrations.",
    skills: ["Flutter", "Dart", "Clean Architecture", "MVC / MVVM", "Dio & HTTP", "Performance Tuning"],
  },
  {
    number: "02",
    title: "Flutter State Management & Storage",
    icon: Layers,
    description:
      "Advanced state handling with GetX (Reactive, DI, Route management), Provider (scalable app-wide state), and Riverpod. Relational offline persistence with SQLite (Sqflite) and SharedPreferences.",
    skills: ["GetX (Advanced)", "Provider (Advanced)", "Riverpod", "SQLite (Sqflite)", "SharedPreferences"],
  },
  {
    number: "03",
    title: "Go (Golang) — Gin Framework",
    icon: Server,
    description:
      "High-throughput RESTful services and concurrent system design with Go and Gin. Designing low-latency WebSocket real-time hubs, custom middleware, error handling pipelines, and Goroutine concurrency.",
    skills: ["Go (Golang)", "Gin Framework", "WebSockets", "Concurrency & Goroutines", "REST APIs", "Middleware"],
  },
  {
    number: "04",
    title: "PHP (Laravel) & Python (Django)",
    icon: Database,
    description:
      "Robust backend engineering across PHP (Laravel MVC, Repository architecture, Blade, Ajax) and Python (Django REST APIs, template admin panels, Flask) for fintech, ERP, and commerce.",
    skills: ["PHP (Laravel)", "Repository Pattern", "Python (Django)", "Django REST", "Flask", "ERP Systems"],
  },
  {
    number: "05",
    title: "Real-time & Live Streaming Systems",
    icon: Radio,
    description:
      "Architecting scalable event-driven communication protocols using WebSocket and Socket.IO. Experience in live audio/video streaming, host-approved room joins, VIP access, and real-time viewer tracking.",
    skills: ["WebSocket", "Socket.IO", "Live Streaming", "Event Pipelines", "Viewer Presence", "Live Chat"],
  },
  {
    number: "06",
    title: "System Design & Payment Gateways",
    icon: CreditCard,
    description:
      "End-to-end integration of regional and international payment gateways (bKash, Nagad, SSLCommerz, Stripe, PayPal). Token and OTP-based authentication, API security, and database optimization.",
    skills: ["bKash & Nagad", "SSLCommerz", "Stripe & PayPal", "OTP & JWT Auth", "PostgreSQL & MySQL", "Firebase"],
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
            Core engineering competencies across mobile development, Go and Laravel backends, real-time protocols, and system design.
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
