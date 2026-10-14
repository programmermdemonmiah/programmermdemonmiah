const projects = [
  { id: "01", title: "SportsBD", type: "SPORTS · MOBILE + PLATFORM", description: "A connected sports experience with Flutter apps, Go APIs, realtime communication, notifications, and a web-based administration panel.", stack: ["Flutter", "Riverpod", "Go", "Next.js", "WebSocket"], accent: "lime", mark: "SB", metric: "01 / PLATFORM" },
  { id: "02", title: "Live Streaming", type: "REALTIME · LIVE VIDEO", description: "Live rooms and event-driven streaming workflows with host approval, VIP and moderator access, viewer presence, chat, and device security.", stack: ["Flutter", "Go", "LiveKit", "WebRTC", "WebSocket"], accent: "violet", mark: "LIVE", metric: "02 / REALTIME" },
  { id: "03", title: "Commerce Platforms", type: "FULL STACK · CUSTOMER + ADMIN", description: "Customer and admin journeys covering authentication, guest-to-account cart and wishlist merging, support chat, and containerized services.", stack: ["Next.js", "Go", "Laravel", "PostgreSQL", "Docker"], accent: "blue", mark: "SHOP", metric: "03 / COMMERCE" },
  { id: "04", title: "ERP & Business Systems", type: "BUSINESS SOFTWARE · API INTEGRATION", description: "Laravel-powered ERP and ecommerce workflows with structured business data, API integrations, and maintainable backend features.", stack: ["PHP", "Laravel", "MySQL", "REST APIs"], accent: "amber", mark: "ERP", metric: "04 / OPERATIONS" },
  { id: "05", title: "Mobile Product Engineering", type: "FLUTTER · DOMAIN-DRIVEN FEATURES", description: "Customer, healthcare, finance, and service applications built around practical state management, clear navigation, and API-driven interfaces.", stack: ["Flutter", "Dio", "GetX", "Riverpod", "MVC"], accent: "lime", mark: "APP", metric: "05 / MOBILE" },
  { id: "06", title: "Delivery & Infrastructure", type: "DEVOPS · PRODUCTION WORKFLOWS", description: "Dockerized services, Linux hosting, reverse proxies, CI/CD automation, and deployment workflows designed to be repeatable and maintainable.", stack: ["Docker", "Linux", "Nginx", "GitHub Actions", "CI/CD"], accent: "blue", mark: "OPS", metric: "06 / DELIVERY" }
];
const toolkit = [
  { title: "Mobile", detail: "Native-feeling product experiences", tags: ["Flutter", "Dart", "GetX", "Riverpod", "Provider", "Dio"] },
  { title: "Web", detail: "Responsive web apps and dashboards", tags: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { title: "Backend", detail: "APIs, domain logic, and services", tags: ["Go", "Gin", "GORM", "PHP", "Laravel", "REST APIs", "MVC"] },
  { title: "Data", detail: "Persistence, caching, and app services", tags: ["PostgreSQL", "MySQL", "Redis", "SQLite", "Firebase"] },
  { title: "Realtime", detail: "Live interactions and presence", tags: ["WebSocket", "Socket.IO", "WebRTC", "LiveKit", "Chat"] },
  { title: "Architecture & DevOps", detail: "Reliable delivery and operations", tags: ["Microservices", "Docker", "Linux", "Nginx", "CI/CD", "GitHub Actions", "Git"] }
];
const strengths = [
  ["01", "Product-minded engineering", "I consider the user journey as carefully as the implementation behind it."],
  ["02", "End-to-end ownership", "From Flutter screens and web interfaces to APIs, data models, and deployment."],
  ["03", "Realtime by design", "Presence, chat, notifications, and live interactions built around event-driven behavior."],
  ["04", "Maintainable systems", "Clear boundaries, practical architecture, and code that teammates can extend."]
];
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
export default function Home() {
  return <main id="home">
    <nav className="nav shell" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="Emon Miah home"><span className="brand-mark">e.</span><span>EMON MIAH<span className="brand-sub">SOFTWARE ENGINEER</span></span></a>
      <div className="nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#stack">Toolkit</a></div>
      <a className="nav-contact" href="mailto:contact.mdemonmiah@gmail.com">Let’s talk <Arrow /></a>
    </nav>

    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> SENIOR SOFTWARE ENGINEER <span className="eyebrow-sep">/</span> BANGLADESH</p>
        <h1>Thoughtful code.<br />Products that <em>matter.</em></h1>
        <p className="hero-intro">I’m MD. Emon Miah. I build mobile apps, backend platforms, and full-stack products — connecting polished user experiences to dependable systems behind the scenes.</p>
        <div className="hero-stack"><span>Flutter</span><i /> <span>Go</span><i /> <span>Next.js</span><i /> <span>Laravel</span><i /> <span>Realtime</span></div>
        <div className="hero-actions"><a className="button button-primary" href="#work">Explore selected work <Arrow /></a><a className="button button-quiet" href="/cv.pdf" target="_blank" rel="noreferrer">View CV <Arrow /></a><a className="text-link" href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub profile <Arrow /></a></div>
        <div className="hero-stats"><div><strong>Mobile</strong><span>Flutter products</span></div><div><strong>Backend</strong><span>Go · Laravel</span></div><div><strong>Full stack</strong><span>Web · Realtime · DevOps</span></div></div>
      </div>
      <div className="hero-visual">
        <div className="visual-caption caption-top"><span>INDEPENDENT THINKING</span><b>01 — 06</b></div>
        <div className="portrait-frame"><div className="portrait-glow" /><div className="portrait-outline" /><img className="portrait" src="https://github.com/programmermdemonmiah.png?size=800" alt="MD. Emon Miah GitHub profile photo" referrerPolicy="no-referrer" /><span className="portrait-index">EM / 2026</span></div>
        <div className="floating-card card-code"><span className="mini-icon">{'{ }'}</span><span><b>Engineering</b><small>Mobile to backend</small></span><span className="tiny-arrow">↗</span></div>
        <div className="floating-card card-live"><span className="live-pulse" /><span><b>Realtime systems</b><small>Connected experiences</small></span></div>
        <div className="visual-caption caption-bottom"><span>BUILD · SHIP · IMPROVE</span><span>AVAILABLE FOR THE RIGHT CHALLENGE ↗</span></div>
      </div>
      <div className="hero-bottom-note"><span>01 / INTRODUCTION</span><a href="#about">SCROLL TO DISCOVER <span>↓</span></a></div>
    </section>

    <div className="marquee" aria-label="Areas of engineering"><div>{["MOBILE ENGINEERING", "BACKEND SYSTEMS", "REALTIME PRODUCTS", "FULL-STACK DELIVERY", "MICROSERVICES", "MOBILE ENGINEERING", "BACKEND SYSTEMS"].map((item, i) => <span key={i}>{item}<b>✳</b></span>)}</div></div>

    <section className="section shell about-section" id="about">
      <div className="section-kicker"><span>02</span><i /> A LITTLE ABOUT ME</div>
      <div className="about-layout"><h2>Bridging product<br />thinking with <em>engineering.</em></h2><div className="about-copy"><p>I work across the product stack: Flutter applications, Go and Laravel APIs, Next.js experiences, admin panels, and realtime systems. I care about how a feature feels to a user, how a service behaves under pressure, and how easily another developer can maintain it.</p><p>My work spans ecommerce, ERP, healthcare and finance apps, live streaming, chat, notifications, role-based administration, and Dockerized deployments. I aim for practical architecture, clear service boundaries, and reliable delivery.</p><div className="social-links"><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="/cv.pdf" download="MD-Emon-Miah-CV.pdf">Download CV <Arrow /></a></div></div></div>
    </section>

    <section className="work-section" id="work"><div className="shell">
      <div className="section-heading"><div><div className="section-kicker"><span>03</span><i /> SELECTED WORK</div><h2>Different challenges.<br /><em>One thoughtful approach.</em></h2></div><p>From user-facing mobile apps to the systems and tools that keep products running.</p></div>
      <div className="project-grid">{projects.map(project => <article className={'project-card ' + project.accent} key={project.id}>
        <div className="project-visual"><div className="project-visual-top"><span>{project.metric}</span><span>↗</span></div><div className="project-symbol">{project.mark}</div><div className="visual-lines"><i /><i /><i /></div><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><span className="visual-corner">{project.id}</span></div>
        <div className="project-content"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
      <p className="work-note">These summaries describe engineering areas and product work. Detailed public case studies can be added as they become available.</p>
    </div></section>

    <section className="section shell expertise-section" id="expertise">
      <div className="section-heading"><div><div className="section-kicker"><span>04</span><i /> HOW I WORK</div><h2>Beyond writing<br />code.</h2></div><p>Strong products need more than features. They need clear decisions, reliable systems, and care for the details.</p></div>
      <div className="strength-grid">{strengths.map(item => <article key={item[0]}><span className="strength-number">{item[0]}</span><span className="strength-arrow">↗</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
      <div className="engineering-band"><span className="band-icon">✳</span><div><b>From interface to infrastructure</b><p>API-first thinking · Clear service boundaries · Secure workflows · Production-minded delivery</p></div><span className="band-label">ENGINEERING PRINCIPLES</span></div>
    </section>

    <section className="toolkit-section" id="stack"><div className="shell">
      <div className="section-heading"><div><div className="section-kicker"><span>05</span><i /> ENGINEERING TOOLKIT</div><h2>The tools behind<br />the <em>work.</em></h2></div><p>A practical technology toolkit for mobile, web, backend, data, and connected experiences.</p></div>
      <div className="toolkit-grid">{toolkit.map((item, i) => <article className="toolkit-card" key={item.title}><div className="toolkit-card-head"><span>0{i + 1}</span><h3>{item.title}</h3><b>↗</b></div><p>{item.detail}</p><div className="tool-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
    </div></section>

    <section className="contact-section"><div className="shell contact-inner"><div className="section-kicker"><span>06</span><i /> HAVE A PROJECT IN MIND?</div><h2>Let’s make something<br /><em>worth using.</em></h2><div className="contact-bottom"><p>Have a product idea, an engineering challenge, or a team that needs thoughtful execution? I’d love to hear what you’re building.</p><a className="button button-dark" href="mailto:contact.mdemonmiah@gmail.com">Start a conversation <Arrow /></a></div><span className="contact-watermark">EMON MIAH®</span></div></section>

    <footer className="footer shell"><a className="brand footer-brand" href="#home"><span className="brand-mark">e.</span><span>EMON MIAH<span className="brand-sub">SOFTWARE ENGINEER</span></span></a><span className="footer-note">Independent thinking. Intentional engineering.</span><div className="footer-links"><a href="/cv.pdf" download="MD-Emon-Miah-CV.pdf">CV ↗</a><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="mailto:contact.mdemonmiah@gmail.com">Email ↗</a></div><span className="copyright">© 2026 MD. EMON MIAH</span></footer>
  </main>;
}
