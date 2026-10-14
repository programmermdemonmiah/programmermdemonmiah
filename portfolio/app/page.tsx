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
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://play.google.com/store/apps/details%3Fid%3Dcom.genters.customer"
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
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://play.google.com/store/apps/details%3Fid%3Dcom.fantasymart.customer"
  },
  {
    number: "06", name: "Medly", category: "DIGITAL READING",
    summary: "A mobile reading experience for discovering digital books, viewing book details, and reading content chapter by chapter.",
    stack: ["Flutter", "Mobile UI", "Content"],
    tone: "orange", liveUrl: "https://play.google.com/store/apps/details?id=com.medly.app",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://play.google.com/store/apps/details%3Fid%3Dcom.medly.app"
  },
  {
    number: "07", name: "Swish", category: "MOBILE APPLICATION",
    summary: "A published mobile product with a dedicated Google Play listing and production release history.",
    stack: ["Flutter", "GetX", "Mobile"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://play.google.com/store/apps/details%3Fid%3Dcom.swish.app"
  },
  {
    number: "08", name: "Ecom Matrix", category: "MULTI-VENDOR COMMERCE",
    summary: "A multi-vendor shopping experience for discovering products across sellers, with a separate seller app for merchant workflows.",
    stack: ["Flutter", "E-commerce", "Customer & Seller Apps"],
    tone: "orange", liveUrl: "https://play.google.com/store/apps/details?id=com.ecommatrix.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://play.google.com/store/apps/details%3Fid%3Dcom.ecommatrix.customer"
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
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
export default function Home() {
  return <main id="top">
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="MD Emon Miah home"><span className="wordmark-icon">em.</span><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a>
        <div className="nav-links"><a href="#about">About</a><a href="#work">Selected work</a><a href="#capabilities">Expertise</a></div>
        <a className="nav-cta" href="mailto:contact.mdemonmiah@gmail.com">Get in touch <Arrow /></a>
      </nav>
    </header>

    <section className="hero container">
      <div className="hero-content">
        <p className="eyebrow"><span className="availability-dot" /> SENIOR SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> BANGLADESH</p>
        <h1>Building useful products.<br /><span>Engineering what’s behind them.</span></h1>
        <p className="hero-description">I’m MD. Emon Miah — a software engineer working across mobile, backend, and full-stack development. I turn complex requirements into dependable products, from the first interface to the services that power it.</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <Arrow /></a><a className="button button-secondary" href="/cv.pdf" target="_blank" rel="noreferrer">View résumé <span className="button-icon">↓</span></a></div>
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

    <section className="work-section" id="work"><div className="container"><div className="section-head"><div><div className="section-label"><span>02</span><span className="label-line" /> SELECTED WORK</div><h2>Different domains.<br /><em>Thoughtful engineering.</em></h2></div><p>A selection of product areas and systems I’ve worked across, from customer-facing applications to backend infrastructure.</p></div>
      <div className="projects-grid">{projects.map(project => <article className="project-card" key={project.number}>
        <a className={'project-art art-' + project.tone} href={project.liveUrl || "#contact"} target={project.liveUrl ? "_blank" : undefined} rel={project.liveUrl ? "noreferrer" : undefined} aria-label={project.liveUrl ? 'Open ' + project.name : project.name + ' — private project'}>
          {project.screenshot ? <img className="project-screenshot" src={project.screenshot} alt={project.name + ' live website screenshot'} loading="lazy" /> : <div className="project-art-fallback"><span>{project.number}</span><small>PROJECT PREVIEW</small></div>}
          <span className="project-number">{project.number} / 11</span><span className="project-art-label">{project.category}</span><span className="art-arrow">↗</span>
        </a>
        <div className="project-details"><div className="project-title-row"><h3>{project.name}</h3><span>{project.number}</span></div><p>{project.summary}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="project-links">{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel}<Arrow /></a> : <span className="private-project-label">Private / no public demo</span>}</div>
        </div></article>)}</div>
      <div className="project-catalog-links"><a href="https://play.google.com/store/apps/dev?id=6275384212045783558" target="_blank" rel="noreferrer">Explore more DeepVerse Lab apps <Arrow /></a><a href="https://play.google.com/store/apps/developer?id=NIBIZ+SOFT" target="_blank" rel="noreferrer">Explore NIBIZ SOFT published apps <Arrow /></a></div>
      <p className="project-footnote">Public projects link directly to their live website or official store listing. Some client projects are private and do not have a public demo URL.</p>
    </div></section>

    <section className="section container capability-section" id="capabilities"><div className="section-head"><div><div className="section-label"><span>03</span><span className="label-line" /> EXPERTISE</div><h2>From first screen<br />to <em>production.</em></h2></div><p>The right tools matter. So do clear thinking, maintainable architecture, and attention to the people using the product.</p></div>
      <div className="capability-grid">{capabilities.map(item => <article className="capability-card" key={item.number}><span className="cap-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><div className="cap-tags">{item.tags}</div></article>)}</div>
    </section>

    <section className="approach-section"><div className="container approach-grid"><div><div className="section-label"><span>04</span><span className="label-line" /> APPROACH</div><h2>Build with clarity.<br /><em>Ship with care.</em></h2></div><div className="approach-list"><div><span>01</span><p><strong>Understand the problem</strong><small>Start with the product goal and real user needs.</small></p></div><div><span>02</span><p><strong>Design the system</strong><small>Choose clear boundaries and practical architecture.</small></p></div><div><span>03</span><p><strong>Build and verify</strong><small>Keep implementation understandable and testable.</small></p></div><div><span>04</span><p><strong>Deliver responsibly</strong><small>Make deployment and maintenance part of the work.</small></p></div></div></div></section>

    <section className="contact-section" id="contact"><div className="container contact-inner"><div className="section-label"><span>05</span><span className="label-line" /> CONTACT</div><div className="contact-content"><h2>Have something<br />worth <em>building?</em></h2><div><p>If you’re building a product, improving a backend, or bringing a complex application to life, let’s talk about the engineering behind it.</p><a className="button button-light" href="mailto:contact.mdemonmiah@gmail.com">Start a conversation <Arrow /></a></div></div><div className="contact-meta"><span>MD. EMON MIAH · SOFTWARE ENGINEER</span><span>FLUTTER / GO / NEXT.JS / LARAVEL</span></div></div></section>

    <footer className="footer"><div className="container footer-inner"><a className="wordmark footer-wordmark" href="#top"><span className="wordmark-icon">em.</span><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a><p>Thoughtful engineering. Useful products.</p><div className="footer-links"><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="mailto:contact.mdemonmiah@gmail.com">Email <Arrow /></a><a href="/cv.pdf" download="MD-Emon-Miah-CV.pdf">Résumé ↓</a></div><span className="copyright">© 2026 MD. EMON MIAH</span></div></footer>
  </main>;
}
