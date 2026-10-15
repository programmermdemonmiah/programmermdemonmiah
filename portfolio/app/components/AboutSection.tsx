import {
  Github,
  Linkedin,
  ArrowUpRight,
  FileText,
  FileDown,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Building2,
} from "lucide-react";

const WORK_EXPERIENCE = [
  {
    role: "Senior Software Engineer (Mobile & Backend)",
    company: "N. I. Biz Soft",
    location: "Uttara-15, Dhaka",
    period: "Dec 2023 – May 2026",
    current: false,
    highlights: [
      "Led full stack system development across Flutter mobile apps and backend systems.",
      "Designed scalable real-time architectures using WebSocket for fintech, e-commerce, and live streaming.",
      "Developed backend APIs in Go (Gin), Laravel, and Django with performance optimization.",
      "Mentored developers, reviewed code structure, and handled production deployments.",
    ],
  },
  {
    role: "Mid-Level Mobile & Backend Developer",
    company: "N. I. Biz Soft",
    location: "Uttara-15, Dhaka",
    period: "Previous",
    highlights: [
      "Engineered real-time features using WebSockets in Go and built scalable backend API integrations.",
      "Integrated regional and global payment gateways: bKash, Nagad, and SSLCommerz.",
      "Optimized mobile app rendering performance and backend API response latencies.",
    ],
  },
  {
    role: "App Developer",
    company: "N. I. Biz Soft",
    location: "Uttara-15, Dhaka",
    period: "Early Career",
    highlights: [
      "Built cross-platform mobile applications for Android and iOS using Flutter and Dart.",
      "Implemented state management with GetX and Provider following clean architecture patterns.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "BSc in Computer Science & Engineering (CSE)",
    institution: "Uttara University",
    status: "Running",
  },
  {
    degree: "Diploma in Engineering",
    institution: "Sylhet Polytechnic Institute",
    status: "CGPA: 3.68 / 4.00",
  },
  {
    degree: "Mobile Application Development (Flutter)",
    institution: "Atova Technology",
    status: "Professional Training (Aug 2023 – Nov 2023)",
  },
];

export default function AboutSection() {
  return (
    <section className="about-section" id="about" aria-label="About MD. Emon Miah">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Background &amp; Experience
          </p>
          <h2 className="section-title">
            Engineering with <span>purpose &amp; precision.</span>
          </h2>
          <p className="section-subtitle">
            Full Stack Mobile &amp; Backend Engineer with hands-on experience designing real-time architectures,
            fintech integrations, live streaming services, and enterprise ERP systems.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-experience-column">
            <div className="about-timeline-card">
              <div className="timeline-card-header">
                <Briefcase size={20} className="timeline-icon" aria-hidden="true" />
                <h3 className="about-card-title">Professional Experience</h3>
              </div>

              <div className="timeline-list">
                {WORK_EXPERIENCE.map((job) => (
                  <div key={job.role} className="timeline-item">
                    <div className="timeline-marker" />
                    <div className="timeline-body">
                      <div className="timeline-title-row">
                        <h4 className="job-role">{job.role}</h4>
                        {job.current && <span className="job-badge">Current</span>}
                      </div>
                      <div className="job-meta">
                        <span className="job-company">
                          <Building2 size={13} aria-hidden="true" />
                          {job.company} · {job.location}
                        </span>
                        <span className="job-period">
                          <Calendar size={13} aria-hidden="true" />
                          {job.period}
                        </span>
                      </div>
                      <ul className="job-bullets">
                        {job.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
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
                  href="https://www.linkedin.com/in/MdEmonMiah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a href="/cv" className="about-link">
                  <FileText size={16} aria-hidden="true" />
                  <span>Curriculum Vitae</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a href="/cv.pdf" download="MD_Emon_Miah_CV.pdf" className="about-link">
                  <FileDown size={16} aria-hidden="true" />
                  <span>Download PDF</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="about-sidebar-column">
            <div className="about-sidebar-card">
              <div className="sidebar-card-header">
                <GraduationCap size={20} className="timeline-icon" aria-hidden="true" />
                <h3 className="about-card-title">Education &amp; Training</h3>
              </div>
              <div className="education-list">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="education-item">
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-institution">{edu.institution}</p>
                    <span className="edu-status">{edu.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-sidebar-card">
              <h3 className="about-card-title">Core Engineering Strengths</h3>
              <div className="about-principles">
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>Full Stack System Development (Flutter + Backend)</span>
                </div>
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>Real-time Engineering (WebSocket, Socket.IO)</span>
                </div>
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>Payment Gateway Integration (bKash, Nagad, SSLCommerz)</span>
                </div>
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>Clean Architecture (Layered, Scalable &amp; Maintainable)</span>
                </div>
                <div className="principle-item">
                  <CheckCircle2 size={16} className="principle-icon" aria-hidden="true" />
                  <span>High Concurrency &amp; Goroutine Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
