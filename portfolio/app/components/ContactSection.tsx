"use client";

import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  FileDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "contact.mdemonmiah@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="contact-footer-section" id="contact" aria-label="Contact and Footer">
      <div className="section-container">
        {/* Contact Invitation Card */}
        <div className="contact-card">
          <div className="contact-card-glow" aria-hidden="true" />

          <div className="contact-card-grid">
            {/* Left Content */}
            <div className="contact-main">
              <p className="section-eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                Let&apos;s Connect
              </p>
              <h2 className="contact-headline">
                Have an ambitious project? <br />
                <span>Let&apos;s build what&apos;s next.</span>
              </h2>
              <p className="contact-desc">
                I am actively considering senior software engineering opportunities, architectural consulting,
                and high-impact mobile &amp; backend projects. Let&apos;s discuss how I can contribute to your team.
              </p>

              <div className="contact-meta-pills">
                <div className="contact-meta-item">
                  <MapPin size={14} className="meta-icon" aria-hidden="true" />
                  <span>Based in Bangladesh (UTC+6)</span>
                </div>
                <div className="contact-meta-item">
                  <Clock size={14} className="meta-icon" aria-hidden="true" />
                  <span>Available for Remote &amp; Hybrid roles</span>
                </div>
              </div>
            </div>

            {/* Right Action Channels */}
            <div className="contact-channels">
              {/* Primary Email Box */}
              <div className="channel-box email-channel-box">
                <div className="channel-box-header">
                  <span className="channel-box-label">DIRECT EMAIL</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="copy-email-btn"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-red" aria-hidden="true" />
                        <span className="text-red">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a href={`mailto:${email}`} className="email-address-link">
                  {email}
                </a>
                <a href={`mailto:${email}`} className="btn-primary contact-send-btn">
                  <Mail size={16} aria-hidden="true" />
                  <span>Send an Email</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              {/* Quick Links Row */}
              <div className="channel-links-grid">
                <a
                  href="https://github.com/programmermdemonmiah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link-card"
                >
                  <div className="channel-link-inner">
                    <Github size={18} aria-hidden="true" />
                    <span className="channel-link-title">GitHub</span>
                  </div>
                  <ArrowUpRight size={14} className="channel-link-arrow" aria-hidden="true" />
                </a>

                <a
                  href="https://www.linkedin.com/in/mdemonmiah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link-card"
                >
                  <div className="channel-link-inner">
                    <Linkedin size={18} aria-hidden="true" />
                    <span className="channel-link-title">LinkedIn</span>
                  </div>
                  <ArrowUpRight size={14} className="channel-link-arrow" aria-hidden="true" />
                </a>

                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link-card channel-link-highlight"
                >
                  <div className="channel-link-inner">
                    <FileDown size={18} aria-hidden="true" />
                    <span className="channel-link-title">Download CV</span>
                  </div>
                  <ArrowUpRight size={14} className="channel-link-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Sub-Footer */}
        <div className="sub-footer">
          <div className="footer-brand">
            <a href="#top" className="brand" aria-label="Return to top">
              <span className="brand-badge">EM</span>
              <span className="brand-meta">
                <span className="brand-name">MD. EMON MIAH</span>
                <span className="brand-title">Software Engineer</span>
              </span>
            </a>
            <p className="footer-copyright">
              © {new Date().getFullYear()} MD. Emon Miah. Handcrafted with Next.js &amp; TypeScript.
            </p>
          </div>

          <div className="footer-actions">
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#about" className="footer-link">About</a>
              <a href="#expertise" className="footer-link">Expertise</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#contact" className="footer-link">Contact</a>
            </nav>

            <button
              type="button"
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
