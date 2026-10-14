"use client";

import { useEffect, useRef, useState } from "react";

const GITHUB_AVATAR = "https://avatars.githubusercontent.com/u/121760927?v=4";

const projects = [
  {
    number: "01", name: "SportsBD", category: "SPORTS PLATFORM",
    summary: "A grassroots sports platform for live scoring, scorecards, tournaments, match insights, live streaming, and community discovery.",
    stack: ["Web Platform", "Sports Tech", "Live Scoring"],
    tone: "red", liveUrl: "https://sportsbd.net/",
    liveLabel: "Visit live website",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://sportsbd.net/"
  },
  {
    number: "02", name: "VerseMart", category: "E-COMMERCE",
    summary: "A production ecommerce platform supported by containerized backend services, product browsing, checkout, and order workflows.",
    stack: ["Next.js", "Go", "PostgreSQL", "Docker"],
    tone: "orange", liveUrl: "https://oxewman.com/",
    liveLabel: "Visit live website",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://oxewman.com/"
  },
  {
    number: "03", name: "Genters", category: "CUSTOMER SHOPPING APP",
    summary: "A single-vendor shopping app for browsing products, managing a cart, and placing orders without mandatory account registration.",
    stack: ["Flutter", "Riverpod", "E-commerce"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.genters.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.genters.customer"
  },
  {
    number: "04", name: "Asmi", category: "ONLINE SUPERMARKET",
    summary: "A grocery shopping app with product discovery, checkout, delivery scheduling, order tracking, and customer support.",
    stack: ["Flutter", "Riverpod", "Mobile Commerce"],
    tone: "orange", liveUrl: "https://apps.apple.com/us/app/asmi-the-online-super-shop/id6762031008",
    liveLabel: "View on App Store",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://apps.apple.com/us/app/asmi-the-online-super-shop/id6762031008"
  },
  {
    number: "05", name: "FantasyMart", category: "MULTI-STORE COMMERCE",
    summary: "A multi-store customer shopping app designed to bring multiple store experiences, product discovery, and checkout into one place.",
    stack: ["Flutter", "E-commerce", "Mobile"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.fantasymart.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.fantasymart.customer"
  },
  {
    number: "06", name: "Medly", category: "DIGITAL READING",
    summary: "A mobile reading experience for discovering digital books, viewing book details, and reading content chapter by chapter.",
    stack: ["Flutter", "Mobile UI", "Content"],
    tone: "orange", liveUrl: "https://play.google.com/store/apps/details?id=com.medly.app",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.medly.app"
  },
  {
    number: "07", name: "Swish", category: "MOBILE APPLICATION",
    summary: "A published mobile product with a dedicated Google Play listing and production release history.",
    stack: ["Flutter", "GetX", "Mobile"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.swish.app"
  },
  {
    number: "08", name: "Ecom Matrix", category: "MULTI-VENDOR COMMERCE",
    summary: "A multi-vendor shopping experience for discovering products across sellers, with a separate seller app for merchant workflows.",
    stack: ["Flutter", "E-commerce", "Customer & Seller Apps"],
    tone: "orange", liveUrl: "https://play.google.com/store/apps/details?id=com.ecommatrix.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.ecommatrix.customer"
  },
  {
    number: "09", name: "Live Streaming Platform", category: "REALTIME & VIDEO",
    summary: "Realtime streaming workflows with host approval, VIP and moderator access, viewer presence, chat, and device-level account security.",
    stack: ["Flutter", "Go", "LiveKit", "WebSocket"],
    tone: "red", liveUrl: null, liveLabel: null, screenshot: null
  },
  {
    number: "10", name: "ERP & Business Systems", category: "BUSINESS SOFTWARE",
    summary: "Business workflows and ecommerce capabilities built around structured data, API integrations, and maintainable backend features.",
    stack: ["PHP", "Laravel", "MySQL", "REST APIs"],
    tone: "orange", liveUrl: null, liveLabel: null, screenshot: null
  },
  {
    number: "11", name: "Mobile & Backend Products", category: "CLIENT APPLICATIONS",
    summary: "Additional customer, healthcare, finance, and service applications delivered with API-driven interfaces and practical state management.",
    stack: ["Flutter", "Dart", "Go", "Laravel"],
    tone: "red", liveUrl: null, liveLabel: null, screenshot: null
  },
  {
    number: "12", name: "Xovalley", category: "MOBILE APPLICATION",
    summary: "A Flutter application built with Provider for state management and Dio for structured API communication.",
    stack: ["Flutter", "Provider", "Dio", "REST API"],
    tone: "orange"
  },
  {
    number: "13", name: "ARACO Healthcare", category: "HEALTHCARE SOFTWARE",
    summary: "Healthcare application work focused on practical digital workflows, user-facing features, and backend integration.",
    stack: ["Flutter", "API Integration", "Healthcare"],
    tone: "red"
  },
  {
    number: "14", name: "CashMart", category: "FINANCE & BANKING",
    summary: "A finance-focused application project involving customer workflows and integration with backend services.",
    stack: ["Mobile", "Backend APIs", "Fintech"],
    tone: "orange"
  },
  {
    number: "15", name: "Propeta MVC", category: "WEB APPLICATION",
    summary: "An MVC-based application project emphasizing organized application structure and maintainable business logic.",
    stack: ["PHP", "MVC", "Backend Development"],
    tone: "red"
  },
  {
    number: "16", name: "DeepVerse Live", category: "REAL-TIME LIVE STREAMING",
    summary: "A live-streaming platform with host and viewer flows, join approvals, realtime presence, and LiveKit-based streaming.",
    stack: ["Flutter", "Go", "WebSocket", "LiveKit"],
    tone: "orange"
  },
  {
    number: "17", name: "DeepVerse Ecommerce Suite", category: "ECOMMERCE & ADMIN",
    summary: "A multi-part commerce system covering a Next.js storefront, Go backend services, and a separate administration interface.",
    stack: ["Next.js", "Go", "React Admin", "Docker"],
    tone: "red"
  }
];
const capabilities = [
  { number: "01", title: "Mobile development", text: "Cross-platform applications with Flutter, maintainable state, and thoughtful user flows.", tags: "Flutter · Dart · GetX · Riverpod · Dio" },
  { number: "02", title: "Backend engineering", text: "Well-structured APIs, business logic, authentication, and service integrations.", tags: "Go · Gin · GORM · PHP · Laravel" },
  { number: "03", title: "Web applications", text: "Responsive product interfaces and operational dashboards built for real workflows.", tags: "Next.js · React · TypeScript" },
  { number: "04", title: "Realtime systems", text: "Live communication features with event-driven updates and presence workflows.", tags: "WebSocket · WebRTC · LiveKit · Socket.IO" },
  { number: "05", title: "Data & integration", text: "Persistence, caching, and data exchange chosen to fit the application.", tags: "PostgreSQL · MySQL · Redis · SQLite · Firebase" },
  { number: "06", title: "Production delivery", text: "Repeatable builds, containerized services, and deployment automation.", tags: "Docker · Linux · Nginx · CI/CD · Git" }
];

const heroMessage = "I build polished mobile apps, dependable backends, and real-time products. Let’s make something useful.";
function useTypewriter(text: string, speed = 34, startDelay = 650) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);
  const previousXRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const { displayed, done } = useTypewriter(heroMessage);
  useEffect(() => {
    const timer = setTimeout(() => setActionsVisible(true), 400);
    const video = videoRef.current;
    if (!video) return () => clearTimeout(timer);
    const seekToTarget = () => {
      if (!video || video.seeking || seekingRef.current || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) < 0.025) return;
      seekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    };
    const onSeeked = () => {
      seekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.04) seekToTarget();
    };
    const onMouseMove = (event: MouseEvent) => {
      if (previousXRef.current === null) { previousXRef.current = event.clientX; return; }
      const delta = event.clientX - previousXRef.current;
      previousXRef.current = event.clientX;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + (delta / window.innerWidth) * 0.8 * video.duration));
      seekToTarget();
    };
    const onLoaded = () => { targetTimeRef.current = Math.min(video.currentTime || 0, video.duration || 0); };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onLoaded);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      clearTimeout(timer);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact.mdemonmiah@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1600);
    } catch { window.location.href = "mailto:contact.mdemonmiah@gmail.com"; }
  };
  const [emailCopied, setEmailCopied] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <main id="top">
    <section className="hero-video-stage" aria-label="Interactive portfolio introduction">
      <video ref={videoRef} className="hero-background-video" muted playsInline preload="auto" aria-hidden="true">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-shade" />
    </section>
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="MD Emon Miah home"><img className="wordmark-avatar" src={GITHUB_AVATAR} alt="" /><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a>
        <div className="nav-links"><a href="#work">Projects</a><span>,</span><a href="#capabilities">Expertise</a><span>,</span><a href="#about">About</a><span>,</span><a href="#contact">Contact</a></div>
        <a className="nav-cta" href="mailto:contact.mdemonmiah@gmail.com">Get in touch <Arrow /></a>
        <button className={'mobile-menu-toggle' + (menuOpen ? ' is-open' : '')} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </nav>
    </header>
    <div className={'mobile-menu-overlay' + (menuOpen ? ' is-open' : '')} aria-hidden={!menuOpen}>
      <nav aria-label="Mobile navigation"><a onClick={closeMenu} href="#work">Projects</a><a onClick={closeMenu} href="#capabilities">Expertise</a><a onClick={closeMenu} href="#about">About</a><a onClick={closeMenu} href="#contact">Contact</a><a className="mobile-contact-link" onClick={closeMenu} href="mailto:contact.mdemonmiah@gmail.com">Get in touch ↗</a></nav>
    </div>

    <section className="hero container">
      <div className="hero-content">
        <p className="eyebrow"><span className="availability-dot" /> MD. EMON MIAH <span className="eyebrow-divider">/</span> SOFTWARE ENGINEER</p>
        <div className="hero-blurred-intro" aria-hidden="true">Hey there, I’m Emon.<br />Mobile, backend &amp; full-stack engineer.</div>
        <h1>Thoughtful software.<br /><span>Built to work in the real world.</span></h1>
        <p className="hero-description typewriter-copy">{displayed}{!done && <span className="typing-cursor" aria-hidden="true" />}</p>
        <div className={'hero-actions hero-pill-actions' + (actionsVisible ? ' is-visible' : '')}>
          <a className="button button-primary" href="#work">Explore my projects <Arrow /></a>
          <a className="button button-light-pill" href="mailto:contact.mdemonmiah@gmail.com?subject=Project%20inquiry">Discuss a project</a>
          <a className="button button-light-pill" href="#about">About my work</a>
          <a className="button button-light-pill" href="/cv.pdf" target="_blank" rel="noreferrer">View résumé ↓</a>
          <button className="button button-outline-pill" type="button" onClick={copyEmail}><span>{emailCopied ? "Email copied!" : <>Reach me: <u>contact.mdemonmiah@gmail.com</u></>}</span><svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true"><rect x="5" y="2" width="9" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M11 12v2H2V5h2" stroke="currentColor" strokeWidth="1.3"/></svg></button>
        </div>
        <div className="hero-specialties"><span>Flutter</span><i /> <span>Go</span><i /> <span>Next.js</span><i /> <span>Laravel</span><i /> <span>Realtime systems</span></div>
      </div>
      <aside className="hero-profile" aria-label="Profile">
        <div className="profile-topline"><span>PROFILE / 2026</span><span>01 — 06</span></div>
        <div className="profile-photo-wrap"><div className="photo-backdrop" /><img src="https://github.com/programmermdemonmiah.png?size=640" alt="MD. Emon Miah" className="profile-photo" referrerPolicy="no-referrer" /></div>
        <div className="profile-caption"><div><strong>MD. Emon Miah</strong><span>Mobile · Backend · Full stack</span></div><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer" aria-label="Open GitHub profile"><Arrow /></a></div>
        <div className="profile-rule" />
        <div className="profile-facts"><div><span>CORE FOCUS</span><strong>Product engineering</strong></div><div><span>FROM</span><strong>Dhaka, Bangladesh</strong></div></div>
      </aside>
      <div className="hero-index"><span>01 / INTRODUCTION</span><a href="#about">SCROLL TO EXPLORE ↓</a></div>
    </section>

    <section className="intro-strip"><div className="container intro-strip-inner"><span>ENGINEERING ACROSS THE STACK</span><p>Mobile applications <b>·</b> Backend systems <b>·</b> Web platforms <b>·</b> Realtime experiences</p></div></section>

    <section className="section container about-section" id="about">
      <div className="section-label"><span>01</span><span className="label-line" /> ABOUT</div>
      <div className="about-grid"><h2>Good software is more than code. <em>It’s how the pieces work together.</em></h2><div className="about-copy"><p>I work across the product stack: Flutter applications, Go and Laravel APIs, Next.js interfaces, administration panels, and realtime features. I care about the experience people use and the engineering decisions that keep it reliable.</p><p>My experience spans ecommerce, ERP, healthcare and finance applications, live streaming, chat, notifications, role-based administration, and Dockerized deployments. I value practical architecture, clear service boundaries, and maintainable code.</p><div className="social-links"><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="/cv.pdf" download="MD-Emon-Miah-CV.pdf">Download résumé <Arrow /></a></div></div></div>
    </section>

    <section className="work-section" id="work"><div className="container"><div className="section-head"><div><div className="section-label"><span>02</span><span className="label-line" /> SELECTED WORK</div><h2>Different domains.<br /><em>Thoughtful engineering.</em></h2></div><p>A broader collection of mobile apps, web products, commerce systems, and real-time platforms I’ve worked on.</p></div>
      <div className="projects-grid">{projects.map(project => <article className="project-card" key={project.number}>
        <a className={'project-art art-' + project.tone} href={project.liveUrl || "#contact"} target={project.liveUrl ? "_blank" : undefined} rel={project.liveUrl ? "noreferrer" : undefined} aria-label={project.liveUrl ? 'Open ' + project.name : project.name + ' — private project'}>
          {project.screenshot ? <img className="project-screenshot" src={project.screenshot} alt={project.name + ' live website screenshot'} loading="lazy" /> : <div className="project-art-fallback"><span>{project.number}</span><small>PROJECT PREVIEW</small></div>}
          <span className="project-number">{project.number} / 17</span><span className="project-art-label">{project.category}</span><span className="art-arrow">↗</span>
        </a>
        <div className="project-details"><div className="project-title-row"><h3>{project.name}</h3><span>{project.number}</span></div><p>{project.summary}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="project-links">{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel}<Arrow /></a> : <span className="private-project-label">Private / no public demo</span>}</div>
        </div></article>)}</div>
      <div className="project-catalog-links"><a href="https://play.google.com/store/apps/dev?id=6275384212045783558" target="_blank" rel="noreferrer">Explore more DeepVerse Lab apps <Arrow /></a><a href="https://play.google.com/store/apps/developer?id=NIBIZ+SOFT" target="_blank" rel="noreferrer">Explore NIBIZ SOFT published apps <Arrow /></a></div>
      <p className="project-footnote">Public projects link to their live website or official store listing. Private client and internal projects are included without fabricated demo links.</p>
    </div></section>

    <section className="section container capability-section" id="capabilities"><div className="section-head"><div><div className="section-label"><span>03</span><span className="label-line" /> EXPERTISE</div><h2>From first screen<br />to <em>production.</em></h2></div><p>The right tools matter. So do clear thinking, maintainable architecture, and attention to the people using the product.</p></div>
      <div className="capability-grid">{capabilities.map(item => <article className="capability-card" key={item.number}><span className="cap-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><div className="cap-tags">{item.tags}</div></article>)}</div>
    </section>

    <section className="approach-section"><div className="container approach-grid"><div><div className="section-label"><span>04</span><span className="label-line" /> APPROACH</div><h2>Build with clarity.<br /><em>Ship with care.</em></h2></div><div className="approach-list"><div><span>01</span><p><strong>Understand the problem</strong><small>Start with the product goal and real user needs.</small></p></div><div><span>02</span><p><strong>Design the system</strong><small>Choose clear boundaries and practical architecture.</small></p></div><div><span>03</span><p><strong>Build and verify</strong><small>Keep implementation understandable and testable.</small></p></div><div><span>04</span><p><strong>Deliver responsibly</strong><small>Make deployment and maintenance part of the work.</small></p></div></div></div></section>

    <section className="contact-section" id="contact"><div className="container contact-inner"><div className="section-label"><span>05</span><span className="label-line" /> CONTACT</div><div className="contact-content"><h2>Have something<br />worth <em>building?</em></h2><div><p>If you’re building a product, improving a backend, or bringing a complex application to life, let’s talk about the engineering behind it.</p><a className="button button-light" href="mailto:contact.mdemonmiah@gmail.com">Start a conversation <Arrow /></a></div></div><div className="contact-meta"><span>MD. EMON MIAH · SOFTWARE ENGINEER</span><span>FLUTTER / GO / NEXT.JS / LARAVEL</span></div></div></section>

    <footer className="footer"><div className="container footer-inner"><a className="wordmark footer-wordmark" href="#top"><img className="wordmark-avatar" src={GITHUB_AVATAR} alt="" /><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a><p>Thoughtful engineering. Useful products.</p><div className="footer-links"><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="mailto:contact.mdemonmiah@gmail.com">Email <Arrow /></a><a href="/cv.pdf" download="MD-Emon-Miah-CV.pdf">Résumé ↓</a></div><span className="copyright">© 2026 MD. EMON MIAH</span></div></footer>
  </main>;
}
