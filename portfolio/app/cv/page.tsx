import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CVClientActions from "./CVClientActions";

export const metadata: Metadata = {
  title: "Curriculum Vitae — MD. Emon Miah | Senior Mobile & Backend Developer",
  description:
    "Executive Curriculum Vitae of MD. Emon Miah — Full Stack Mobile & Backend Developer specializing in Flutter, Go, Laravel, Python, and Real-Time WebSockets.",
};

export default function CVPage() {
  return (
    <div className="cv-page-wrapper">
      {/* Top Action Bar — Hidden in Print */}
      <header className="cv-top-bar no-print">
        <div className="cv-container cv-bar-inner">
          <Link href="/" className="cv-back-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>

          <div className="cv-actions-group">
            <CVClientActions />
            <a
              href="/cv.pdf"
              download="MD_Emon_Miah_CV.pdf"
              className="cv-btn cv-btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Sheet */}
      <main className="cv-container cv-sheet-wrapper">
        <article className="cv-sheet">
          {/* Header Row */}
          <header className="cv-header">
            <div className="cv-header-main">
              <div className="cv-title-group">
                <h1 className="cv-name">MD. EMON MIAH</h1>
                <p className="cv-role-title">
                  FULL STACK MOBILE &amp; BACKEND DEVELOPER
                </p>
                <p className="cv-tech-subline">
                  Flutter (GetX / Provider) · Go (Gin) · PHP (Laravel) · Python (Django) · Real-Time WebSockets
                </p>
              </div>

              {/* Avatar */}
              <div className="cv-avatar-wrap">
                <Image
                  src="/avatar.png"
                  alt="MD. Emon Miah"
                  width={96}
                  height={96}
                  className="cv-avatar-img"
                  priority
                />
              </div>
            </div>

            {/* Contact Pills */}
            <div className="cv-contact-grid">
              <div className="cv-contact-item">
                <span className="cv-contact-label">Phone</span>
                <a href="tel:+8801405665854" className="cv-contact-val">+880 1405-665854</a>
                <span className="cv-contact-sep">/</span>
                <a href="tel:+8801568147387" className="cv-contact-val">+880 1568-147387</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">Email</span>
                <a href="mailto:contact.mdemonmiah@gmail.com" className="cv-contact-val">contact.mdemonmiah@gmail.com</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">Location</span>
                <span className="cv-contact-val">Uttara, Dhaka, Bangladesh</span>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">GitHub</span>
                <a href="https://github.com/programmermdemonmiah" target="_blank" rel="noopener noreferrer" className="cv-contact-val">github.com/programmermdemonmiah</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">LinkedIn</span>
                <a href="https://www.linkedin.com/in/MdEmonMiah" target="_blank" rel="noopener noreferrer" className="cv-contact-val">linkedin.com/in/MdEmonMiah</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">Portfolio</span>
                <a href="https://programmermdemonmiah.vercel.app" target="_blank" rel="noopener noreferrer" className="cv-contact-val">programmermdemonmiah.vercel.app</a>
              </div>
            </div>
          </header>

          {/* Section: Executive Summary */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Professional Summary</span>
            </h2>
            <div className="cv-summary-card">
              <p>
                Senior Full Stack Engineer with extensive experience architecting high-performance cross-platform Flutter applications and scalable backend microservices. Proven track record designing low-latency real-time systems using WebSockets in Go (Gin), modular REST APIs in Laravel and Django, and complex enterprise ERPs. Specialist in Clean Architecture, reactive state management (GetX / Provider), payment gateway integrations (bKash, Nagad, Stripe, SSLCommerz), and high-throughput concurrent workflows with 99.9% uptime.
              </p>
            </div>
          </section>

          {/* Section: Professional Experience */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Professional Experience</span>
            </h2>

            <div className="cv-company-header">
              <div>
                <h3 className="cv-company-name">N. I. Biz Soft</h3>
                <span className="cv-company-loc">Uttara-15, Dhaka, Bangladesh</span>
              </div>
              <span className="cv-badge cv-badge-primary">Dec 2023 – May 2026 (2.5+ Years Full-Time)</span>
            </div>

            <div className="cv-roles-stack">
              {/* Role 1 */}
              <div className="cv-role-card">
                <div className="cv-role-head">
                  <h4 className="cv-role-title-text">Senior Software Engineer (Mobile &amp; Backend)</h4>
                  <span className="cv-role-period">May 2025 – May 2026</span>
                </div>
                <ul className="cv-bullet-list">
                  <li>Spearheaded full-stack engineering across multi-platform Flutter apps and microservice backend systems.</li>
                  <li>Engineered scalable real-time architectures using WebSockets in Go and live video/audio pipelines (Zego Cloud).</li>
                  <li>Designed and optimized RESTful API architectures in Go (Gin), Laravel, and Django with connection pooling.</li>
                  <li>Led technical code reviews, guided clean architectural standards, and oversaw CI/CD production deployments.</li>
                  <li>Architected high-throughput concurrency models utilizing Go routines for live room streaming and viewer presence.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="cv-role-card">
                <div className="cv-role-head">
                  <h4 className="cv-role-title-text">Mid-Level Mobile &amp; Backend Developer</h4>
                  <span className="cv-role-period">Apr 2024 – Apr 2025</span>
                </div>
                <ul className="cv-bullet-list">
                  <li>Built and optimized full-stack systems bridging cross-platform mobile clients with relational database backends.</li>
                  <li>Integrated multi-channel payment gateways including bKash, Nagad, Stripe, and SSLCommerz with webhook verification.</li>
                  <li>Implemented real-time bi-directional messaging, order status feeds, and rider GPS location tracking.</li>
                  <li>Significantly reduced app cold-start latencies and improved SQL query indexing for large product catalogs.</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="cv-role-card">
                <div className="cv-role-head">
                  <h4 className="cv-role-title-text">App Developer</h4>
                  <span className="cv-role-period">Dec 2023 – Mar 2024</span>
                </div>
                <ul className="cv-bullet-list">
                  <li>Developed production-ready cross-platform mobile applications for Android &amp; iOS using Flutter and Dart.</li>
                  <li>Implemented clean state management architectures utilizing GetX (Reactive/DI) and Provider patterns.</li>
                  <li>Integrated RESTful APIs using Dio and HTTP client with structured interceptors, error handling, and token refresh.</li>
                  <li>Built custom responsive UI layouts matching Figma prototypes with high visual fidelity and smooth 60fps animations.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Technical Skills Matrix */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Technical Skills &amp; Core Competencies</span>
            </h2>

            <div className="cv-skills-grid">
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Mobile App Development</h4>
                <p className="cv-skill-tags">
                  Flutter, Dart, Clean Architecture, MVC, MVVM, Dio, SQLite (Sqflite), SharedPreferences, 60fps Animations, Profiling
                </p>
              </div>
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">State Management</h4>
                <p className="cv-skill-tags">
                  GetX (Advanced: Reactive State, DI, Route Management), Provider (App-wide state), Riverpod (Multi-state handling)
                </p>
              </div>
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Backend Frameworks</h4>
                <p className="cv-skill-tags">
                  Go (Golang — Gin Framework, Goroutines, Concurrency), PHP (Laravel — MVC, Repository, Blade), Python (Django, Flask)
                </p>
              </div>
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Databases &amp; Storage</h4>
                <p className="cv-skill-tags">
                  PostgreSQL (PgSQL), MySQL (Relational Schema Design, Indexing &amp; Query Tuning), SQLite, Firebase (Firestore, Realtime DB)
                </p>
              </div>
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Real-Time &amp; Integration</h4>
                <p className="cv-skill-tags">
                  WebSockets, Socket.IO, Zego Cloud WebRTC, bKash, Nagad, Stripe, PayPal, SSLCommerz, JWT, OAuth 2.0, OTP Services
                </p>
              </div>
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">DevOps &amp; Tooling</h4>
                <p className="cv-skill-tags">
                  VS Code, Android Studio, Xcode, Git, GitHub Actions, Postman, Linux Terminal, Docker (Basics)
                </p>
              </div>
            </div>
          </section>

          {/* Section: Key Projects */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Key Commercial &amp; Production Projects</span>
            </h2>

            <div className="cv-projects-stack">
              {/* Project 1 */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">1. Live Streaming Mobile Platform</h3>
                    <p className="cv-proj-sub">Full Stack Engineer (Flutter + Go Microservices) · Flutter Mobile App + Go Backend</p>
                  </div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.swish.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-proj-link"
                  >
                    Google Play Store ↗
                  </a>
                </div>
                <div className="cv-proj-arch">
                  <strong>Architecture:</strong> Separate Go microservices (API Server + Core Backend), WebSocket real-time pipelines, and Goroutine concurrency.
                </div>
                <ul className="cv-bullet-list">
                  <li>Engineered real-time audio and video live streaming with host approval room join/leave workflow.</li>
                  <li>Integrated VIP instant-join privileges, virtual gift economy system, and live rankings with animated entries.</li>
                  <li>Handled high-throughput viewer concurrency utilizing Go routines, event dispatchers, and stateful memory caches.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">2. LA’AM Enterprise Garments ERP System</h3>
                    <p className="cv-proj-sub">System Architect &amp; Backend Developer · Web Platform (Laravel + MySQL) + WordPress Pipeline</p>
                  </div>
                  <a
                    href="https://erpecom.deepverselab.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-proj-link"
                  >
                    Live Portal ↗
                  </a>
                </div>
                <div className="cv-proj-arch">
                  <strong>Architecture:</strong> Laravel MVC engine with direct WordPress order sync, inventory webhooks, and courier tracking pipelines.
                </div>
                <ul className="cv-bullet-list">
                  <li>Multi-tier employee Role-Based Access Control (RBAC), team permissions, and incentive calculation rules.</li>
                  <li>Courier auto-tracking with dynamic weight-based shipping calculation and real-time inventory ledger.</li>
                  <li>Complete accounting module (income, expense, profit/loss balance sheets) and employee internal wallet system.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">3. Xovalley — Multi Vendor E-Commerce Platform</h3>
                    <p className="cv-proj-sub">Full Stack Engineer (Laravel + Flutter + System Design) · Web (React.js) + 3 Flutter Apps + Laravel REST API</p>
                  </div>
                  <div className="cv-proj-links-wrap">
                    <a href="https://xovalley.com" target="_blank" rel="noopener noreferrer" className="cv-proj-link">Web Store ↗</a>
                    <a href="https://play.google.com/store/apps/details?id=com.xovalley.user_app" target="_blank" rel="noopener noreferrer" className="cv-proj-link">Play Store ↗</a>
                  </div>
                </div>
                <div className="cv-proj-arch">
                  <strong>Architecture:</strong> Unified Laravel API backend powering customer, vendor, and rider Flutter apps with live delivery tracking.
                </div>
                <ul className="cv-bullet-list">
                  <li>Multi-vendor marketplace cataloging, seller commissions, and automated vendor payout ledger.</li>
                  <li>Customer App, Seller App, and Delivery Man App with live Google Maps rider GPS location updates.</li>
                  <li>Integrated multi-channel payment gateway verification (bKash, Nagad, debit/credit cards) with webhook logs.</li>
                </ul>
              </div>

              {/* Project 4 */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">4. ARACO Healthcare Ecosystem</h3>
                    <p className="cv-proj-sub">Full Stack Engineer (Flutter + Django + System Design) · Flutter App (GetX) + Django Web Admin + Zego Cloud</p>
                  </div>
                  <a href="https://araco.com.bd" target="_blank" rel="noopener noreferrer" className="cv-proj-link">Live Portal ↗</a>
                </div>
                <div className="cv-proj-arch">
                  <strong>Architecture:</strong> GetX client state architecture connected to Zego Cloud WebRTC pipelines and Django administration backend.
                </div>
                <ul className="cv-bullet-list">
                  <li>Online pharmacy with digital prescription upload, order fulfillment, and automatic customer dispatch.</li>
                  <li>Doctor appointment scheduling with encrypted video/audio consultations powered by Zego Cloud WebRTC.</li>
                  <li>Clinical lab test home sample collection booking, automated report delivery, and clinic admin POS billing.</li>
                </ul>
              </div>

              {/* Project 5 */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">5. Propeta — Real Estate Discovery Platform</h3>
                    <p className="cv-proj-sub">Full Stack Engineer (Flutter + Django + System Design) · Flutter Mobile Application + Django REST API</p>
                  </div>
                </div>
                <div className="cv-proj-arch">
                  <strong>Architecture:</strong> Layered Service-Repository architecture with geocoded spatial indexing and local offline state caching.
                </div>
                <ul className="cv-bullet-list">
                  <li>Multi-criteria spatial search &amp; filtering (price brackets, geo-coordinates, property types, and verified amenities).</li>
                  <li>Agent portfolio verification, in-app client inquiry routing, and high-resolution photo gallery viewer.</li>
                </ul>
              </div>

              {/* Project 6 */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">6. CashMart — Digital Banking &amp; Mobile Wallet</h3>
                    <p className="cv-proj-sub">Backend Engineer (Django API) &amp; Mobile Developer · Flutter Mobile Application + Django (Python) Backend</p>
                  </div>
                </div>
                <div className="cv-proj-arch">
                  <strong>Architecture:</strong> Secure cryptographic ledger with multi-factor OTP validation and QR code transaction verification.
                </div>
                <ul className="cv-bullet-list">
                  <li>Instant peer-to-peer balance transfers, QR code cashout at agent outlets, and exportable PDF statements.</li>
                  <li>Tiered deposit rewards, profit-sharing calculation rules, and strict audit-trail security logging.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Education */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Education &amp; Academic Background</span>
            </h2>

            <div className="cv-edu-table-wrap">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>Degree / Qualification</th>
                    <th>Institution</th>
                    <th>Result / Grade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cv-td-bold">BSc in Computer Science &amp; Engineering (CSE)</td>
                    <td>Uttara University, Dhaka</td>
                    <td>Bachelor of Science</td>
                    <td><span className="cv-pill cv-pill-active">Running / Enrolled</span></td>
                  </tr>
                  <tr>
                    <td className="cv-td-bold">Diploma in Engineering</td>
                    <td>Sylhet Polytechnic Institute, Sylhet</td>
                    <td className="cv-td-accent">CGPA: 3.68 / 4.00</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td className="cv-td-bold">Higher Secondary Certificate (HSC)</td>
                    <td>M.A.H.K Bhashani Degree College</td>
                    <td className="cv-td-accent">GPA: 4.33 / 5.00</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td className="cv-td-bold">Secondary School Certificate (SSC)</td>
                    <td>P.T.M High School</td>
                    <td className="cv-td-accent">GPA: 4.33 / 5.00</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Professional Training */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Professional Training &amp; Certifications</span>
            </h2>
            <div className="cv-training-card">
              <div className="cv-training-top">
                <h4 className="cv-training-name">Mobile Application Development (Flutter &amp; Dart)</h4>
                <span className="cv-training-date">Aug 2023 – Nov 2023</span>
              </div>
              <p className="cv-training-desc">
                <strong>Atova Technology</strong> — Intensive hands-on training covering Clean Architecture, reactive state management (GetX/Provider), Dio REST networking, local caching, and native Android/iOS platform channels.
              </p>
            </div>
          </section>

          {/* Section: Languages & Strengths Grid */}
          <section className="cv-section">
            <div className="cv-split-grid">
              <div className="cv-split-card">
                <h3 className="cv-split-title">Languages</h3>
                <ul className="cv-check-list">
                  <li><strong>Bangla:</strong> Native fluency</li>
                  <li><strong>English:</strong> Professional working proficiency</li>
                </ul>
              </div>
              <div className="cv-split-card">
                <h3 className="cv-split-title">Core Architectural Strengths</h3>
                <ul className="cv-check-list">
                  <li>Full-Stack system architecture &amp; high concurrency (Goroutines)</li>
                  <li>Production Clean Architecture &amp; maintainable modular codebases</li>
                  <li>Low-latency WebSocket &amp; WebRTC media streaming systems</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom Footer on Web */}
          <footer className="cv-bottom-footer">
            <p>MD. Emon Miah — Full Stack Mobile &amp; Backend Developer · Uttara, Dhaka, Bangladesh</p>
            <p className="cv-foot-sub">Updated for 2026 Production Standards</p>
          </footer>
        </article>
      </main>
    </div>
  );
}
