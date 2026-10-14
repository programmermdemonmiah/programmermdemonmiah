import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const root = process.cwd();
const output = path.join(root, "public", "cv.pdf");
const avatarPath = path.join(root, "public", "avatar.png");

// Ensure public directory exists
fs.mkdirSync(path.dirname(output), { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 32, bottom: 24, left: 36, right: 36 },
  autoFirstPage: false,
  bufferPages: true,
  info: {
    Title: "MD. Emon Miah — Curriculum Vitae",
    Author: "MD. Emon Miah",
    Subject: "Full Stack Mobile & Backend Developer Resume",
    Keywords: "Flutter, Go, Golang, Laravel, Python, Django, WebSockets, Real-time Systems",
  },
});

const stream = fs.createWriteStream(output);
doc.pipe(stream);

// Color Palette — Executive Obsidian & Crimson Accent
const COLOR = {
  primary: "#D32F2F",       // Executive Ruby Crimson
  primaryLight: "#EF5350",
  primaryBg: "#FFF1F2",
  textHeading: "#0F172A",   // Slate 900
  textBody: "#334155",      // Slate 700
  textMuted: "#64748B",     // Slate 500
  textSubtle: "#94A3B8",    // Slate 400
  border: "#E2E8F0",        // Slate 200
  borderDark: "#CBD5E1",
  bgSubtle: "#F8FAFC",      // Slate 50
  bgCard: "#F1F5F9",
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 523.28

function drawSectionHeader(title, y) {
  // Pill marker
  doc
    .roundedRect(MARGIN, y, 3.5, 12, 1.5)
    .fillColor(COLOR.primary)
    .fill();

  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(COLOR.textHeading)
    .text(title, MARGIN + 9, y + 1.5, { lineBreak: false });

  const textWidth = doc.widthOfString(title);
  doc
    .moveTo(MARGIN + 14 + textWidth, y + 6.5)
    .lineTo(PAGE_WIDTH - MARGIN, y + 6.5)
    .strokeColor(COLOR.border)
    .lineWidth(0.75)
    .stroke();

  return y + 18;
}

// ============================================================================
// PAGE 1: Header + Summary + Work Experience (N. I. Biz Soft Progression)
// ============================================================================
doc.addPage();

// 1. Header with Avatar & Details
const headerTop = 32;
const avatarSize = 60;

if (fs.existsSync(avatarPath)) {
  try {
    const avatarX = PAGE_WIDTH - MARGIN - avatarSize;
    const avatarY = headerTop;
    doc.save();
    doc.roundedRect(avatarX, avatarY, avatarSize, avatarSize, 8).clip();
    doc.image(avatarPath, avatarX, avatarY, { width: avatarSize, height: avatarSize });
    doc.restore();

    doc
      .roundedRect(avatarX, avatarY, avatarSize, avatarSize, 8)
      .strokeColor(COLOR.primary)
      .lineWidth(1.5)
      .stroke();
  } catch (err) {
    console.error("Avatar render skipped:", err.message);
  }
}

// Candidate Name & Title
doc
  .font("Helvetica-Bold")
  .fontSize(22)
  .fillColor(COLOR.textHeading)
  .text("MD. EMON MIAH", MARGIN, headerTop, { width: CONTENT_WIDTH - 75, lineBreak: false });

doc
  .font("Helvetica-Bold")
  .fontSize(10.5)
  .fillColor(COLOR.primary)
  .text("FULL STACK MOBILE & BACKEND DEVELOPER", MARGIN, headerTop + 25, { width: CONTENT_WIDTH - 75, lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textMuted)
  .text("Flutter (GetX / Provider)  ·  Go (Gin)  ·  PHP (Laravel)  ·  Python (Django)  ·  Real-Time WebSockets", MARGIN, headerTop + 40, { width: CONTENT_WIDTH - 75, lineBreak: false });

// Contact Info Grid
const contactY = headerTop + 54;
doc
  .roundedRect(MARGIN, contactY, CONTENT_WIDTH, 26, 4)
  .fillColor(COLOR.bgSubtle)
  .fill();

doc
  .roundedRect(MARGIN, contactY, CONTENT_WIDTH, 26, 4)
  .strokeColor(COLOR.border)
  .lineWidth(0.5)
  .stroke();

const colW = CONTENT_WIDTH / 3;
doc.font("Helvetica").fontSize(7.5).fillColor(COLOR.textBody);

doc.text("Phone: +8801405665854 / +8801568147387", MARGIN + 8, contactY + 5, { width: colW - 12, lineBreak: false });
doc.text("Location: Uttara, Dhaka, Bangladesh", MARGIN + 8, contactY + 15, { width: colW - 12, lineBreak: false });

doc.text("Email: contact.mdemonmiah@gmail.com", MARGIN + colW + 4, contactY + 5, { width: colW - 8, lineBreak: false });
doc.text("Portfolio: programmermdemonmiah.vercel.app", MARGIN + colW + 4, contactY + 15, { width: colW - 8, lineBreak: false });

doc.text("GitHub: github.com/programmermdemonmiah", MARGIN + colW * 2, contactY + 5, { width: colW - 8, lineBreak: false });
doc.text("LinkedIn: linkedin.com/in/MdEmonMiah", MARGIN + colW * 2, contactY + 15, { width: colW - 8, lineBreak: false });

// 2. Professional Summary
let curY = contactY + 36;
curY = drawSectionHeader("PROFESSIONAL SUMMARY", curY);

const summaryText =
  "Senior Full Stack Engineer with proven track record architecting high-performance cross-platform Flutter applications and scalable backend microservices. Deep expertise designing low-latency real-time systems using WebSockets in Go (Gin), modular REST APIs in Laravel and Django, and complex enterprise ERPs. Specialist in Clean Architecture, reactive state management (GetX/Provider), payment gateway integrations (bKash, Nagad, Stripe, SSLCommerz), and high-throughput concurrent workflows with 99.9% uptime.";

doc
  .roundedRect(MARGIN, curY, CONTENT_WIDTH, 44, 4)
  .fillColor(COLOR.bgSubtle)
  .fill();

doc
  .roundedRect(MARGIN, curY, 3, 44, 1.5)
  .fillColor(COLOR.primary)
  .fill();

doc
  .font("Helvetica")
  .fontSize(8.2)
  .fillColor(COLOR.textBody)
  .text(summaryText, MARGIN + 10, curY + 6, {
    width: CONTENT_WIDTH - 20,
    lineGap: 2,
  });

// 3. Work Experience
curY += 54;
curY = drawSectionHeader("PROFESSIONAL EXPERIENCE", curY);

// Company Block: N. I. Biz Soft
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor(COLOR.textHeading)
  .text("N. I. Biz Soft", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textMuted)
  .text(" — Uttara-15, Dhaka, Bangladesh", MARGIN + 62, curY + 1.5, { lineBreak: false });

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.primary)
  .text("Dec 2023 – May 2026 (2.5+ Years Full-Time)", MARGIN, curY + 1.5, { width: CONTENT_WIDTH, align: "right" });

curY += 15;

function drawRole(roleTitle, duration, bullets) {
  doc
    .font("Helvetica-Bold")
    .fontSize(8.8)
    .fillColor(COLOR.textHeading)
    .text(roleTitle, MARGIN + 8, curY, { lineBreak: false });

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(COLOR.textMuted)
    .text(duration, MARGIN, curY + 1, { width: CONTENT_WIDTH, align: "right" });

  curY += 11;

  for (const b of bullets) {
    doc.circle(MARGIN + 12, curY + 4, 1.3).fillColor(COLOR.primary).fill();
    doc
      .font("Helvetica")
      .fontSize(7.8)
      .fillColor(COLOR.textBody)
      .text(b, MARGIN + 19, curY, { width: CONTENT_WIDTH - 22, lineGap: 1.4 });
    curY = doc.y + 2;
  }
  curY += 5;
}

drawRole(
  "Senior Software Engineer (Mobile & Backend)",
  "May 2025 – May 2026",
  [
    "Spearheaded full-stack engineering across multi-platform Flutter apps and microservice backend systems.",
    "Engineered scalable real-time architectures using WebSockets in Go and live video/audio pipelines (Zego Cloud).",
    "Designed and optimized RESTful API architectures in Go (Gin), Laravel, and Django with connection pooling.",
    "Led technical code reviews, guided clean architectural standards, and oversaw CI/CD production deployments.",
    "Architected high-throughput concurrency models utilizing Go routines for live room streaming and viewer presence.",
  ]
);

drawRole(
  "Mid-Level Mobile & Backend Developer",
  "Apr 2024 – Apr 2025",
  [
    "Built and optimized full-stack systems bridging cross-platform mobile clients with relational database backends.",
    "Integrated multi-channel payment gateways including bKash, Nagad, Stripe, and SSLCommerz with webhook verification.",
    "Implemented real-time bi-directional messaging, order status feeds, and rider GPS location tracking.",
    "Significantly reduced app cold-start latencies and improved SQL query indexing for large product catalogs.",
  ]
);

drawRole(
  "App Developer",
  "Dec 2023 – Mar 2024",
  [
    "Developed production-ready cross-platform mobile applications for Android & iOS using Flutter and Dart.",
    "Implemented clean state management architectures utilizing GetX (Reactive/DI) and Provider patterns.",
    "Integrated RESTful APIs using Dio and HTTP client with structured interceptors, error handling, and token refresh.",
    "Built custom responsive UI layouts matching Figma prototypes with high visual fidelity and smooth 60fps animations.",
  ]
);

// ============================================================================
// PAGE 2: Technical Skills Matrix + Key Production Projects (1, 2, 3)
// ============================================================================
doc.addPage();

curY = 44;
curY = drawSectionHeader("TECHNICAL SKILLS & CORE COMPETENCIES", curY);

const skillGroups = [
  {
    title: "Mobile App Development",
    items: "Flutter, Dart, Clean Architecture, MVC/MVVM, Dio/REST, SQLite (Sqflite), SharedPreferences, 60fps Animations, Profiling",
  },
  {
    title: "State Management",
    items: "GetX (Advanced: Reactive State, DI, Route Management), Provider (App-wide state), Riverpod (Multi-state handling)",
  },
  {
    title: "Backend Frameworks",
    items: "Go (Golang — Gin Framework, Goroutines, Concurrency), PHP (Laravel — MVC, Repository, Blade), Python (Django, Flask)",
  },
  {
    title: "Databases & Storage",
    items: "PostgreSQL (PgSQL), MySQL (Schema Design & Indexing), SQLite, Firebase (Firestore & Realtime DB)",
  },
  {
    title: "Real-Time & Integration",
    items: "WebSockets, Socket.IO, Zego Cloud WebRTC, bKash, Nagad, Stripe, PayPal, SSLCommerz, JWT, OAuth 2.0, OTP Services",
  },
  {
    title: "DevOps & Tooling",
    items: "VS Code, Android Studio, Xcode, Git, GitHub Actions, Postman, Linux Environment, Docker (Containerization Basics)",
  },
];

for (let i = 0; i < skillGroups.length; i += 2) {
  const g1 = skillGroups[i];
  const g2 = skillGroups[i + 1];
  const cardW = (CONTENT_WIDTH - 10) / 2;

  // Box 1
  doc.roundedRect(MARGIN, curY, cardW, 35, 4).fillColor(COLOR.bgSubtle).fill();
  doc.roundedRect(MARGIN, curY, cardW, 35, 4).strokeColor(COLOR.border).lineWidth(0.5).stroke();
  doc.font("Helvetica-Bold").fontSize(7.8).fillColor(COLOR.primary).text(g1.title, MARGIN + 7, curY + 4, { width: cardW - 14, lineBreak: false });
  doc.font("Helvetica").fontSize(7.2).fillColor(COLOR.textBody).text(g1.items, MARGIN + 7, curY + 14, { width: cardW - 14, lineGap: 1 });

  // Box 2
  if (g2) {
    const x2 = MARGIN + cardW + 10;
    doc.roundedRect(x2, curY, cardW, 35, 4).fillColor(COLOR.bgSubtle).fill();
    doc.roundedRect(x2, curY, cardW, 35, 4).strokeColor(COLOR.border).lineWidth(0.5).stroke();
    doc.font("Helvetica-Bold").fontSize(7.8).fillColor(COLOR.primary).text(g2.title, x2 + 7, curY + 4, { width: cardW - 14, lineBreak: false });
    doc.font("Helvetica").fontSize(7.2).fillColor(COLOR.textBody).text(g2.items, x2 + 7, curY + 14, { width: cardW - 14, lineGap: 1 });
  }

  curY += 40;
}

curY += 4;
curY = drawSectionHeader("KEY COMMERCIAL & PRODUCTION PROJECTS", curY);

function drawProject(num, title, platform, role, liveUrl, arch, bullets) {
  // Title row
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(COLOR.textHeading)
    .text(`${num}. ${title}`, MARGIN, curY, { lineBreak: false });

  if (liveUrl) {
    doc
      .font("Helvetica-Bold")
      .fontSize(7.2)
      .fillColor(COLOR.primary)
      .text(`[ Live Link: ${liveUrl} ]`, MARGIN, curY + 1.5, { width: CONTENT_WIDTH, align: "right", lineBreak: false });
  }

  curY += 12;

  // Role & Platform meta
  doc
    .font("Helvetica-Bold")
    .fontSize(7.6)
    .fillColor(COLOR.textMuted)
    .text(`Role: `, MARGIN, curY, { lineBreak: false });

  doc
    .font("Helvetica")
    .fontSize(7.6)
    .fillColor(COLOR.textBody)
    .text(`${role}   |   `, doc.x, curY, { lineBreak: false });

  doc
    .font("Helvetica-Bold")
    .fontSize(7.6)
    .fillColor(COLOR.textMuted)
    .text(`Platform: `, doc.x, curY, { lineBreak: false });

  doc
    .font("Helvetica")
    .fontSize(7.6)
    .fillColor(COLOR.textBody)
    .text(platform, doc.x, curY, { lineBreak: false });

  curY += 10;

  // Architecture Callout
  doc
    .roundedRect(MARGIN, curY, CONTENT_WIDTH, 17, 3)
    .fillColor(COLOR.bgSubtle)
    .fill();

  doc
    .roundedRect(MARGIN, curY, 2.5, 17, 1)
    .fillColor(COLOR.primary)
    .fill();

  doc
    .font("Helvetica-Bold")
    .fontSize(7.2)
    .fillColor(COLOR.primary)
    .text("Architecture: ", MARGIN + 6, curY + 4, { lineBreak: false });

  doc
    .font("Helvetica")
    .fontSize(7.2)
    .fillColor(COLOR.textBody)
    .text(arch, doc.x, curY + 4, { width: CONTENT_WIDTH - 70, lineBreak: false });

  curY += 21;

  // Bullets
  for (const b of bullets) {
    doc.circle(MARGIN + 6, curY + 3.5, 1.2).fillColor(COLOR.textMuted).fill();
    doc
      .font("Helvetica")
      .fontSize(7.6)
      .fillColor(COLOR.textBody)
      .text(b, MARGIN + 14, curY, { width: CONTENT_WIDTH - 16, lineGap: 1.2 });
    curY = doc.y + 1.5;
  }
  curY += 7;
}

drawProject(
  "1",
  "Live Streaming Mobile Platform",
  "Flutter Mobile App + Go (Golang) Microservice Backend",
  "Full Stack Engineer (Flutter + Go Microservices)",
  "play.google.com/store/apps/details?id=com.swish.app",
  "Separate Go microservices (API Server + Core Backend), WebSocket real-time pipelines, and Goroutine concurrency.",
  [
    "Engineered real-time audio and video live streaming with host approval room join/leave workflow.",
    "Integrated VIP instant-join privileges, virtual gift economy system, and live rankings with animated entries.",
    "Handled high-throughput viewer concurrency utilizing Go routines, event dispatchers, and stateful memory caches.",
  ]
);

drawProject(
  "2",
  "LA’AM Enterprise Garments ERP System",
  "Web Platform (Laravel + MySQL) + WordPress API Pipeline",
  "System Architect & Backend Developer",
  "erpecom.deepverselab.com/login",
  "Laravel MVC engine with direct WordPress order sync, inventory webhooks, and courier tracking pipelines.",
  [
    "Multi-tier employee Role-Based Access Control (RBAC), team permissions, and incentive calculation rules.",
    "Courier auto-tracking with dynamic weight-based shipping calculation and real-time inventory ledger.",
    "Complete accounting module (income, expense, profit/loss balance sheets) and employee internal wallet system.",
  ]
);

drawProject(
  "3",
  "Xovalley — Multi Vendor E-commerce Platform",
  "Web (React.js) + 3 Flutter Mobile Apps + Laravel REST API",
  "Full Stack Engineer (Laravel + Flutter + System Design)",
  "xovalley.com & play.google.com/store/apps/details?id=com.xovalley.user_app",
  "Unified Laravel API backend powering customer, vendor, and rider Flutter apps with live delivery tracking.",
  [
    "Multi-vendor marketplace cataloging, seller commissions, and automated vendor payout ledger.",
    "Customer App, Seller App, and Delivery Man App with live Google Maps rider GPS location updates.",
    "Integrated multi-channel payment gateway verification (bKash, Nagad, debit/credit cards) with webhook logs.",
  ]
);

// ============================================================================
// PAGE 3: Key Projects (4, 5, 6) + Education + Training + Languages
// ============================================================================
doc.addPage();

curY = 44;
curY = drawSectionHeader("KEY COMMERCIAL & PRODUCTION PROJECTS (CONTINUED)", curY);

drawProject(
  "4",
  "ARACO Healthcare Ecosystem",
  "Flutter App (GetX) + Django Web Admin + Zego Cloud",
  "Full Stack Engineer (Flutter + Django + System Design)",
  "araco.com.bd",
  "GetX client state architecture connected to Zego Cloud WebRTC pipelines and Django administration backend.",
  [
    "Online pharmacy with digital prescription upload, order fulfillment, and automatic customer dispatch.",
    "Doctor appointment scheduling with encrypted video/audio consultations powered by Zego Cloud WebRTC.",
    "Clinical lab test home sample collection booking, automated report delivery, and clinic admin POS billing.",
  ]
);

drawProject(
  "5",
  "Propeta — Real Estate Discovery Platform",
  "Flutter Mobile Application + Django REST API Backend",
  "Full Stack Engineer (Flutter + Django + System Design)",
  "",
  "Layered Service-Repository architecture with geocoded spatial indexing and local offline state caching.",
  [
    "Multi-criteria spatial search & filtering (price brackets, geo-coordinates, property types, and verified amenities).",
    "Agent portfolio verification, in-app client inquiry routing, and high-resolution photo gallery viewer.",
  ]
);

drawProject(
  "6",
  "CashMart — Digital Banking & Mobile Wallet",
  "Flutter Mobile Application + Django (Python) Backend",
  "Backend Engineer (Django API) & Mobile Developer",
  "",
  "Secure cryptographic ledger with multi-factor OTP validation and QR code transaction verification.",
  [
    "Instant peer-to-peer balance transfers, QR code cashout at agent outlets, and exportable PDF statements.",
    "Tiered deposit rewards, profit-sharing calculation rules, and strict audit-trail security logging.",
  ]
);

curY += 4;
curY = drawSectionHeader("EDUCATION & ACADEMIC BACKGROUND", curY);

const educationList = [
  {
    degree: "BSc in Computer Science & Engineering (CSE)",
    institution: "Uttara University, Dhaka",
    status: "Running / Enrolled",
    grade: "Bachelor of Science",
  },
  {
    degree: "Diploma in Engineering",
    institution: "Sylhet Polytechnic Institute, Sylhet",
    status: "Completed",
    grade: "CGPA: 3.68 / 4.00",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "M.A.H.K Bhashani Degree College",
    status: "Completed",
    grade: "GPA: 4.33 / 5.00",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "P.T.M High School",
    status: "Completed",
    grade: "GPA: 4.33 / 5.00",
  },
];

for (const edu of educationList) {
  doc
    .font("Helvetica-Bold")
    .fontSize(8.2)
    .fillColor(COLOR.textHeading)
    .text(edu.degree, MARGIN + 8, curY, { lineBreak: false });

  doc
    .font("Helvetica-Bold")
    .fontSize(7.8)
    .fillColor(COLOR.primary)
    .text(edu.grade, MARGIN, curY, { width: CONTENT_WIDTH - 8, align: "right", lineBreak: false });

  curY += 10.5;

  doc
    .font("Helvetica")
    .fontSize(7.2)
    .fillColor(COLOR.textMuted)
    .text(`${edu.institution}  ·  Status: ${edu.status}`, MARGIN + 8, curY, { lineBreak: false });

  curY += 11;
}

curY += 4;
curY = drawSectionHeader("PROFESSIONAL TRAINING & CERTIFICATIONS", curY);

doc
  .font("Helvetica-Bold")
  .fontSize(8.2)
  .fillColor(COLOR.textHeading)
  .text("Mobile Application Development (Flutter & Dart)", MARGIN + 8, curY, { lineBreak: false });

doc
  .font("Helvetica-Bold")
  .fontSize(7.8)
  .fillColor(COLOR.primary)
  .text("Aug 2023 – Nov 2023", MARGIN, curY, { width: CONTENT_WIDTH - 8, align: "right", lineBreak: false });

curY += 10.5;

doc
  .font("Helvetica")
  .fontSize(7.2)
  .fillColor(COLOR.textMuted)
  .text("Atova Technology — Comprehensive training in Clean Architecture, reactive state, and native platform channels.", MARGIN + 8, curY, { lineBreak: false });

curY += 17;

// Languages & Strengths Grid
const bottomW = (CONTENT_WIDTH - 10) / 2;

// Box 1: Languages
doc.roundedRect(MARGIN, curY, bottomW, 44, 4).fillColor(COLOR.bgSubtle).fill();
doc.roundedRect(MARGIN, curY, bottomW, 44, 4).strokeColor(COLOR.border).lineWidth(0.5).stroke();
doc.font("Helvetica-Bold").fontSize(8).fillColor(COLOR.primary).text("LANGUAGES", MARGIN + 8, curY + 5, { lineBreak: false });
doc.font("Helvetica").fontSize(7.5).fillColor(COLOR.textBody).text("• Bangla — Native fluency\n• English — Professional working proficiency", MARGIN + 8, curY + 17, { lineGap: 3 });

// Box 2: Core Strengths
const x2 = MARGIN + bottomW + 10;
doc.roundedRect(x2, curY, bottomW, 44, 4).fillColor(COLOR.bgSubtle).fill();
doc.roundedRect(x2, curY, bottomW, 44, 4).strokeColor(COLOR.border).lineWidth(0.5).stroke();
doc.font("Helvetica-Bold").fontSize(8).fillColor(COLOR.primary).text("CORE ARCHITECTURAL STRENGTHS", x2 + 8, curY + 5, { lineBreak: false });
doc.font("Helvetica").fontSize(7.2).fillColor(COLOR.textBody).text("• Full-Stack system architecture & high concurrency (Goroutines)\n• Production Clean Architecture & maintainable modular code\n• Low-latency WebSocket & WebRTC media streaming systems", x2 + 8, curY + 16, { lineGap: 2 });

// ============================================================================
// SECOND PASS: Running Headers and Footers via bufferPages
// ============================================================================
const totalPages = doc.bufferedPageRange().count;

for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  doc.page.margins.bottom = 0; // prevent page overflow

  // Running Header for pages > 0
  if (i > 0) {
    const subtitle = i === 1 ? "Technical Skills & Commercial Projects" : "Projects, Education & Qualifications";

    doc
      .font("Helvetica-Bold")
      .fontSize(7.5)
      .fillColor(COLOR.primary)
      .text("MD. EMON MIAH", MARGIN, 20, { lineBreak: false });

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(COLOR.textMuted)
      .text(`— ${subtitle}`, MARGIN + 72, 20, { lineBreak: false });

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(COLOR.textMuted)
      .text("contact.mdemonmiah@gmail.com · +8801405665854", MARGIN, 20, {
        width: CONTENT_WIDTH,
        align: "right",
        lineBreak: false,
      });

    doc
      .moveTo(MARGIN, 31)
      .lineTo(PAGE_WIDTH - MARGIN, 31)
      .strokeColor(COLOR.border)
      .lineWidth(0.5)
      .stroke();
  }

  // Footer for all pages
  const footY = PAGE_HEIGHT - 22;
  doc
    .moveTo(MARGIN, footY - 5)
    .lineTo(PAGE_WIDTH - MARGIN, footY - 5)
    .strokeColor(COLOR.border)
    .lineWidth(0.5)
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(7.2)
    .fillColor(COLOR.textMuted)
    .text("MD. Emon Miah — Full Stack Mobile & Backend Developer  ·  Uttara, Dhaka, Bangladesh", MARGIN, footY, { width: 340, lineBreak: false });

  doc
    .font("Helvetica")
    .fontSize(7.2)
    .fillColor(COLOR.textMuted)
    .text(`Page ${i + 1} of ${totalPages}`, PAGE_WIDTH - MARGIN - 80, footY, { width: 80, align: "right", lineBreak: false });
}

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`Generated professional executive CV PDF (${totalPages} pages) at: ${output}`);
