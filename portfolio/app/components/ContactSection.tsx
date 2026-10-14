"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Github,
  Linkedin,
  FileDown,
  FileText,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "contact.mdemonmiah@gmail.com";
  const primaryPhone = "+8801405665854";
  const secondaryPhone = "+8801568147387";

  const handleCopy = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2200);
      }
    } catch {
      // Fallback
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
                Have a project or opening? <br />
                <span>Let&apos;s build what&apos;s next.</span>
              </h2>
              <p className="contact-desc">
                Full Stack Mobile &amp; Backend Engineer open for senior software engineering opportunities,
                architectural consulting, and full-stack Flutter &amp; Go/Laravel projects. Reach out via email or phone directly.
              </p>

              <div className="contact-meta-pills">
                <div className="contact-meta-item">
                  <MapPin size={14} className="meta-icon" aria-hidden="true" />
                  <span>Uttara, Dhaka, Bangladesh (UTC+6)</span>
                </div>
                <div className="contact-meta-item">
                  <Clock size={14} className="meta-icon" aria-hidden="true" />
                  <span>Available for Full-time, Remote, and Contract Roles</span>
                </div>
              </div>
            </div>

            {/* Right Action Channels */}
            <div className="contact-channels">
              {/* Direct Email Box */}
              <div className="channel-box email-channel-box">
                <div className="channel-box-header">
                  <span className="channel-box-label">PRIMARY EMAIL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(email, "email")}
                    className="copy-email-btn"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
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
                  <span>Send Direct Email</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              {/* Direct Phone / WhatsApp Box */}
              <div className="channel-box">
                <div className="channel-box-header">
                  <span className="channel-box-label">PHONE &amp; WHATSAPP</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(primaryPhone, "phone")}
                    className="copy-email-btn"
                    title="Copy phone to clipboard"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? (
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
                <div className="contact-phone-numbers">
                  <a href={`tel:${primaryPhone}`} className="contact-phone-link">
                    <Phone size={14} aria-hidden="true" />
                    <span>{primaryPhone}</span>
                  </a>
                  <span className="phone-sep">/</span>
                  <a href={`tel:${secondaryPhone}`} className="contact-phone-link">
                    <span>{secondaryPhone}</span>
                  </a>
                </div>
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
                  href="https://www.linkedin.com/in/MdEmonMiah"
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
                  href="/cv"
                  className="channel-link-card channel-link-highlight"
                >
                  <div className="channel-link-inner">
                    <FileText size={18} aria-hidden="true" />
                    <span className="channel-link-title">View Curriculum Vitae</span>
                  </div>
                  <ArrowUpRight size={14} className="channel-link-arrow" aria-hidden="true" />
                </a>

                <a
                  href="/cv.pdf"
                  download="MD_Emon_Miah_CV.pdf"
                  className="channel-link-card"
                >
                  <div className="channel-link-inner">
                    <FileDown size={18} aria-hidden="true" />
                    <span className="channel-link-title">Download CV (PDF)</span>
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
              <div className="brand-avatar-box">
                <img
                  src="https://github.com/programmermdemonmiah.png"
                  alt="MD. Emon Miah"
                  className="brand-avatar-img"
                  width={38}
                  height={38}
                />
              </div>
              <span className="brand-meta">
                <span className="brand-name">MD. EMON MIAH</span>
                <span className="brand-title">Full Stack Mobile &amp; Backend Developer</span>
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
              <Link href="/admin" className="footer-link">Admin</Link>
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
