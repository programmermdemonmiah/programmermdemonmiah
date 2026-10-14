"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CVPage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact.mdemonmiah@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
            <div className="cv-client-actions">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="cv-btn cv-btn-subtle"
                title="Copy email to clipboard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {copied ? (
                    <polyline points="20 6 9 17 4 12" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </>
                  )}
                </svg>
                <span>{copied ? "Email Copied!" : "Copy Email"}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="cv-btn cv-btn-secondary"
                title="Print CV or save as PDF"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>Print CV</span>
              </button>
            </div>

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
                  Flutter · Go (Gin) · PHP (Laravel) · Python (Django) · Real-Time WebSockets · PostgreSQL
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

            {/* Contact Details */}
            <div className="cv-contact-grid">
              <div className="cv-contact-item">
                <span className="cv-contact-label">Phone</span>
                <a href="tel:+8801405665854" className="cv-contact-val">+8801405665854</a>
                <span className="cv-contact-sep">/</span>
                <a href="tel:+8801568147387" className="cv-contact-val">+8801568147387</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">Email</span>
                <a href="mailto:contact.mdemonmiah@gmail.com" className="cv-contact-val">contact.mdemonmiah@gmail.com</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">Location</span>
                <span className="cv-contact-val">Uttara-15, Dhaka, Bangladesh</span>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">LinkedIn</span>
                <a href="https://linkedin.com/in/MdEmonMiah" target="_blank" rel="noopener noreferrer" className="cv-contact-val">linkedin.com/in/MdEmonMiah</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">GitHub</span>
                <a href="https://github.com/programmermdemonmiah" target="_blank" rel="noopener noreferrer" className="cv-contact-val">github.com/programmermdemonmiah</a>
              </div>
              <div className="cv-contact-item">
                <span className="cv-contact-label">Portfolio</span>
                <a href="https://programmermdemonmiah.vercel.app" target="_blank" rel="noopener noreferrer" className="cv-contact-val">programmermdemonmiah.vercel.app</a>
              </div>
            </div>
          </header>

          {/* Section: Professional Summary */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Professional Summary</span>
            </h2>
            <div className="cv-summary-card">
              <p>
                Full Stack Engineer specializing in high performance Flutter applications and scalable backend systems. Proven experience in designing real time architectures using WebSocket, building fintech, healthcare, live streaming and e-commerce platforms. Strong focus on clean architecture, modular code and production ready system design.
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
              <span className="cv-badge cv-badge-primary">12/2023 – 05/2026</span>
            </div>

            <div className="cv-roles-stack">
              {/* Role 1: Senior Software Engineer */}
              <div className="cv-role-card">
                <div className="cv-role-head">
                  <h4 className="cv-role-title-text">Senior Software Engineer (Mobile &amp; Backend)</h4>
                  <span className="cv-role-period">12/2023 – 05/2026</span>
                </div>
                <ul className="cv-bullet-list">
                  <li>Leading full stack system development (Flutter + Backend)</li>
                  <li>Designing scalable real time architectures (WebSocket based systems)</li>
                  <li>Backend development in Go (Gin), Laravel &amp; Django</li>
                  <li>System design for fintech, e-commerce and live streaming platforms</li>
                  <li>API architecture design &amp; performance optimization</li>
                  <li>Mentoring junior developers and reviewing code structure</li>
                  <li>Handling production level deployments and system stability</li>
                </ul>
              </div>

              {/* Role 2: Mid-Level Developer */}
              <div className="cv-role-card">
                <div className="cv-role-head">
                  <h4 className="cv-role-title-text">Mid-Level Mobile &amp; Backend Developer</h4>
                  <span className="cv-role-period">N. I. Biz Soft</span>
                </div>
                <ul className="cv-bullet-list">
                  <li>Worked as Full Stack (Flutter + Backend) developer</li>
                  <li>Built scalable API integrations with backend systems</li>
                  <li>Implemented real time features using WebSocket (Go)</li>
                  <li>Payment gateway integration (bKash, Nagad, SSLCommerz)</li>
                  <li>Improved app performance &amp; backend response time</li>
                  <li>Collaborated on system level architecture decisions</li>
                </ul>
              </div>

              {/* Role 3: App Developer */}
              <div className="cv-role-card">
                <div className="cv-role-head">
                  <h4 className="cv-role-title-text">App Developer</h4>
                  <span className="cv-role-period">N. I. Biz Soft</span>
                </div>
                <ul className="cv-bullet-list">
                  <li>Flutter mobile application development (Android &amp; iOS)</li>
                  <li>REST API integration and UI implementation</li>
                  <li>State management (GetX / Provider)</li>
                  <li>Bug fixing, feature implementation and app maintenance</li>
                  <li>Clean architecture basics (Service + Repository pattern)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Education */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Education</span>
            </h2>

            <div className="cv-edu-table-wrap">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>Degree / Certificate</th>
                    <th>Institution</th>
                    <th>Result / CGPA</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cv-td-bold">BSC in CSE</td>
                    <td>Uttara University</td>
                    <td>Bachelor of Science</td>
                    <td><span className="cv-pill cv-pill-active">Running / Enrolled</span></td>
                  </tr>
                  <tr>
                    <td className="cv-td-bold">Diploma in Engineering</td>
                    <td>Sylhet Polytechnic Institute</td>
                    <td className="cv-td-accent">CGPA: 3.68 / 4.00</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td className="cv-td-bold">HSC</td>
                    <td>M.A.H.K Bhashani Degree College</td>
                    <td className="cv-td-accent">GPA: 4.33 / 5.00</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td className="cv-td-bold">SSC</td>
                    <td>P.T.M High School</td>
                    <td className="cv-td-accent">GPA: 4.33 / 5.00</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Technical Skills */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Technical Skills</span>
            </h2>

            <div className="cv-skills-grid">
              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Mobile App Development (Flutter)</h4>
                <ul className="cv-skill-detail-list">
                  <li>Cross platform app development (Android &amp; iOS)</li>
                  <li>Clean Architecture (Layered, Scalable, Maintainable)</li>
                  <li>MVC, MVVM design patterns</li>
                  <li>API Integration (REST, Dio, HTTP)</li>
                  <li>Performance optimization &amp; reusable components</li>
                </ul>
              </div>

              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">State Management (Flutter)</h4>
                <ul className="cv-skill-detail-list">
                  <li><strong>GetX (Advanced):</strong> Reactive state management, Dependency Injection, Route management</li>
                  <li><strong>Provider (Advanced):</strong> Scalable state handling, App-wide state management</li>
                  <li><strong>Riverpod (Mid Level):</strong> Scalable state handling, Big project and multi state handling</li>
                </ul>
              </div>

              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Local Storage (Flutter)</h4>
                <ul className="cv-skill-detail-list">
                  <li><strong>SQLite (Sqflite):</strong> Structured relational local database, Complex query handling, Data persistence with schema design</li>
                  <li><strong>SharedPreferences:</strong> Key value storage, Lightweight data persistence (token, settings)</li>
                </ul>
              </div>

              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Backend Development</h4>
                <ul className="cv-skill-detail-list">
                  <li><strong>Go (Golang) – Gin Framework:</strong> REST API development, WebSocket (real time system), Middleware, routing, error handling, Concurrent system design</li>
                  <li><strong>PHP (Laravel):</strong> MVC architecture, Repository architecture, REST API development, Authentication &amp; authorization, ERP &amp; E-commerce system, Blade, Ajax</li>
                  <li><strong>Python:</strong> Django (backend &amp; API &amp; Template Based), Flask</li>
                </ul>
              </div>

              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">Database Systems</h4>
                <ul className="cv-skill-detail-list">
                  <li><strong>MySQL:</strong> Relational database design &amp; query optimization</li>
                  <li><strong>PostgreSQL (PgSQL):</strong> Relational schema design, indexing &amp; performance tuning</li>
                  <li><strong>Firebase:</strong> Firestore / Realtime Database</li>
                </ul>
              </div>

              <div className="cv-skill-card">
                <h4 className="cv-skill-cat">System Design &amp; Integration</h4>
                <ul className="cv-skill-detail-list">
                  <li>Real time systems (WebSockets, Socket.io)</li>
                  <li>Payment gateway integration: bKash, Nagad, Stripe, PayPal, SSLCommerz</li>
                  <li>OTP &amp; token based authentication</li>
                  <li>API security &amp; performance optimization</li>
                </ul>
              </div>

              <div className="cv-skill-card" style={{ gridColumn: "1 / -1" }}>
                <h4 className="cv-skill-cat">Tools &amp; Environment</h4>
                <p className="cv-skill-tags">
                  VS Code, Android Studio, Xcode, Git, Postman, Docker (Basic)
                </p>
              </div>
            </div>
          </section>

          {/* Section: Key Projects */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Key Projects</span>
            </h2>

            <div className="cv-projects-stack">
              {/* Project 1: Swish Live Streaming */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">Live Streaming Platform</h3>
                    <p className="cv-proj-sub"><strong>Platform:</strong> Flutter App + Go Backend (Microservices Architecture)</p>
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
                  <strong>System Architecture:</strong>
                  <ul className="cv-sub-bullets">
                    <li>Separate Go based microservices (API Server + Streaming Core Backend)</li>
                    <li>WebSocket based real time communication system</li>
                    <li>Scalable event driven architecture for live interactions</li>
                  </ul>
                </div>
                <div className="cv-proj-features">
                  <strong>Core Features:</strong>
                  <ul className="cv-bullet-list">
                    <li>Real time audio/video live streaming</li>
                    <li>Live room join/leave system</li>
                    <li>Host controlled join request approval system</li>
                    <li>VIP instant join &amp; premium access system</li>
                    <li>Gift sending &amp; virtual economy system</li>
                    <li>Live ranking system with entry animations</li>
                    <li>Viewer tracking in real time</li>
                    <li>High performance concurrency handling (Go routines)</li>
                  </ul>
                </div>
                <p className="cv-role-tag"><strong>Role:</strong> Full Stack Engineer (Flutter + Go Microservice Backend)</p>
              </div>

              {/* Project 2: LA'AM ERP */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">LA’AM ERP System, Enterprise Resource Planning System</h3>
                    <p className="cv-proj-sub"><strong>Platform:</strong> Web System + Backend</p>
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
                <div className="cv-proj-features">
                  <strong>Core Modules:</strong>
                  <ul className="cv-bullet-list">
                    <li>Employee Management System (Role based access control)</li>
                    <li>Team based role &amp; permission system</li>
                    <li>Incentive system per employee &amp; per product</li>
                    <li>Courier integration system &amp; auto courier status tracking system</li>
                    <li>Shipping system (weight based calculation)</li>
                    <li>Inventory management system</li>
                    <li>Accounting module (income, expense, profit/loss)</li>
                    <li>Wallet system for employees</li>
                    <li>Reporting dashboard (full business analytics)</li>
                  </ul>
                </div>
                <div className="cv-proj-arch">
                  <strong>Integration Systems:</strong>
                  <ul className="cv-sub-bullets">
                    <li>WordPress plugin integration (order sync)</li>
                    <li>WordPress order → direct ERP pipeline</li>
                    <li>Real time order &amp; inventory sync</li>
                  </ul>
                </div>
                <p className="cv-role-tag"><strong>Role:</strong> System Architect &amp; Backend Developer</p>
              </div>

              {/* Project 3: Xovalley */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">Xovalley – Multi Vendor E-commerce Platform</h3>
                    <p className="cv-proj-sub"><strong>Platform:</strong> Web + Mobile + Admin + Delivery System Backend</p>
                  </div>
                  <div className="cv-proj-links-wrap">
                    <a href="https://xovalley.com" target="_blank" rel="noopener noreferrer" className="cv-proj-link">Web Store ↗</a>
                    <a href="https://play.google.com/store/apps/details?id=com.xovalley.user_app" target="_blank" rel="noopener noreferrer" className="cv-proj-link">Google Play App ↗</a>
                  </div>
                </div>
                <div className="cv-proj-arch">
                  <strong>Technology Stack:</strong> Laravel (API + Core Business Logic) · React.js (Web Frontend) · Flutter (Customer App, Seller App, Delivery Man App)
                </div>
                <div className="cv-proj-features">
                  <strong>Features:</strong>
                  <ul className="cv-bullet-list">
                    <li>Multi vendor marketplace system</li>
                    <li>Product, cart, order management</li>
                    <li>Delivery tracking system</li>
                    <li>Affiliate marketing system</li>
                    <li>Commission &amp; payout system</li>
                    <li>Payment gateway integration</li>
                  </ul>
                </div>
                <p className="cv-role-tag"><strong>Role:</strong> Full Stack Engineer (Laravel + Flutter + System Design)</p>
              </div>

              {/* Project 4: ARACO Healthcare */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">ARACO Healthcare System, Healthcare Ecosystem</h3>
                    <p className="cv-proj-sub"><strong>Platform:</strong> Flutter App + Web System · <strong>Backend:</strong> Django + Template based Admin Panel</p>
                  </div>
                  <a href="https://araco.com.bd" target="_blank" rel="noopener noreferrer" className="cv-proj-link">Live Portal ↗</a>
                </div>
                <div className="cv-proj-features">
                  <strong>Mobile App Features (Flutter + GetX):</strong>
                  <ul className="cv-bullet-list">
                    <li>Online pharmacy system (medicine order + prescription upload)</li>
                    <li>Doctor appointment &amp; telemedicine system</li>
                    <li>Video/audio calling (Zego Cloud integration)</li>
                    <li>Lab test booking system &amp; Caregiver booking system</li>
                    <li>Health package subscription system</li>
                  </ul>
                </div>
                <div className="cv-proj-arch">
                  <strong>Healthcare Workflow:</strong> Patient → Doctor appointment → Video consultation → E-prescription · Lab technician home collection system → digital report delivery · Health package auto doctor assignment
                </div>
                <div className="cv-proj-features">
                  <strong>Admin System:</strong> Role based access control (RBAC), POS system, Inventory management, Invoice generation, Staff &amp; doctor management system
                </div>
                <p className="cv-role-tag"><strong>Role:</strong> Full Stack Engineer (Flutter + Django + System Design)</p>
              </div>

              {/* Project 5: Propeta */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">Propeta – Real Estate Platform</h3>
                    <p className="cv-proj-sub"><strong>Platform:</strong> Flutter App + API Backend</p>
                  </div>
                </div>
                <div className="cv-proj-features">
                  <strong>Features:</strong>
                  <ul className="cv-bullet-list">
                    <li>Property listing system</li>
                    <li>Property search &amp; filtering</li>
                    <li>Agent based listing system</li>
                    <li>API driven architecture</li>
                    <li>MVC based backend structure</li>
                  </ul>
                </div>
                <p className="cv-role-tag"><strong>Role:</strong> Mobile App Developer</p>
              </div>

              {/* Project 6: CashMart */}
              <div className="cv-project-card">
                <div className="cv-proj-top">
                  <div>
                    <h3 className="cv-proj-name">CashMart – Digital Banking + E-commerce System</h3>
                    <p className="cv-proj-sub"><strong>Platform:</strong> Flutter App · <strong>Backend:</strong> Django (Python)</p>
                  </div>
                </div>
                <div className="cv-proj-features">
                  <strong>Core Banking Features:</strong>
                  <ul className="cv-bullet-list">
                    <li>Send money system</li>
                    <li>Cashout via QR system</li>
                    <li>Transaction history with export (PDF)</li>
                    <li>OTP based authentication</li>
                    <li>Wallet system</li>
                  </ul>
                </div>
                <div className="cv-proj-arch">
                  <strong>E-commerce + Finance Hybrid:</strong> Product purchase system, Profit sharing system (purchase based earning logic), MLM style deposit &amp; reward system, Balance + commission tracking system
                </div>
                <p className="cv-role-tag"><strong>Role:</strong> Backend Engineer (Django API Development)</p>
              </div>
            </div>
          </section>

          {/* Section: Training */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Training</span>
            </h2>
            <div className="cv-training-card">
              <div className="cv-training-top">
                <h4 className="cv-training-name">Mobile Application Development (Flutter)</h4>
                <span className="cv-training-date">08/2023 – 11/2023</span>
              </div>
              <p className="cv-training-desc">
                <strong>Atova Technology</strong> — Professional training in cross-platform mobile development, clean architecture, reactive state management, and production API integration.
              </p>
            </div>
          </section>

          {/* Section: Programming Languages & Languages */}
          <section className="cv-section">
            <div className="cv-split-grid">
              <div className="cv-split-card">
                <h3 className="cv-split-title">Programming Languages</h3>
                <p className="cv-tech-pills">
                  <span className="tech-pill">Dart</span>
                  <span className="tech-pill">Go</span>
                  <span className="tech-pill">PHP</span>
                  <span className="tech-pill">Python</span>
                </p>
              </div>
              <div className="cv-split-card">
                <h3 className="cv-split-title">Languages</h3>
                <ul className="cv-check-list">
                  <li><strong>Bangla:</strong> Native</li>
                  <li><strong>English:</strong> Fluent</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Core Strengths */}
          <section className="cv-section">
            <h2 className="cv-sec-title">
              <span className="cv-sec-bar" />
              <span>Core Strengths</span>
            </h2>
            <div className="cv-summary-card">
              <ul className="cv-bullet-list">
                <li>Full Stack System Development</li>
                <li>Real time Application Engineering (WebSocket, Socket.io)</li>
                <li>Clean &amp; Scalable Architecture</li>
                <li>API Design &amp; Integration</li>
                <li>Problem Solving &amp; Performance Optimization</li>
              </ul>
            </div>
          </section>

          {/* Bottom Footer on Web */}
          <footer className="cv-bottom-footer">
            <p>MD. Emon Miah — Full Stack Mobile &amp; Backend Developer · Uttara-15, Dhaka, Bangladesh</p>
            <p className="cv-foot-sub">Updated Professional Curriculum Vitae</p>
          </footer>
        </article>
      </main>
    </div>
  );
}
