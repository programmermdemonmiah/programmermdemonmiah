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
  margins: { top: 32, bottom: 28, left: 36, right: 36 },
  autoFirstPage: false,
  bufferPages: true,
  info: {
    Title: "MD. Emon Miah — Curriculum Vitae",
    Author: "MD. Emon Miah",
    Subject: "Full Stack Mobile & Backend Developer Resume",
    Keywords: "Flutter, Go, Golang, Laravel, Python, Django, WebSockets, Real-time Systems, PostgreSQL",
  },
});

const stream = fs.createWriteStream(output);
doc.pipe(stream);

// Color Palette — Executive Crimson & Dark Slate
const COLOR = {
  primary: "#D32F2F",       // Ruby Crimson
  primaryLight: "#EF5350",
  primaryBg: "#FFF1F2",
  textHeading: "#0F172A",   // Slate 900
  textBody: "#334155",      // Slate 700
  textMuted: "#64748B",     // Slate 500
  textSubtle: "#94A3B8",    // Slate 400
  border: "#CBD5E1",        // Slate 300
  borderLight: "#E2E8F0",
  bgSubtle: "#F8FAFC",      // Slate 50
  bgCard: "#F1F5F9",
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 523.28

function drawSectionHeader(title, y) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor(COLOR.textHeading)
    .text(title, MARGIN, y, { lineBreak: false });

  const textY = y + 15;
  doc
    .moveTo(MARGIN, textY)
    .lineTo(PAGE_WIDTH - MARGIN, textY)
    .strokeColor(COLOR.textHeading)
    .lineWidth(1)
    .stroke();

  return textY + 8;
}

function drawBullet(text, x, y, width = CONTENT_WIDTH - 20) {
  doc.circle(x + 4, y + 4, 1.3).fillColor(COLOR.textHeading).fill();
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(COLOR.textBody)
    .text(text, x + 12, y, { width: width, lineGap: 1.5 });
  return doc.y + 2;
}

// ============================================================================
// PAGE 1: Header + Summary + Experience + Education
// ============================================================================
doc.addPage();

let curY = 32;

// Name & Title
doc
  .font("Helvetica-Bold")
  .fontSize(20)
  .fillColor(COLOR.textHeading)
  .text("MD. EMON MIAH", MARGIN, curY, { lineBreak: false });

curY += 24;

doc
  .font("Helvetica-Bold")
  .fontSize(11)
  .fillColor(COLOR.textHeading)
  .text("Full Stack Mobile & Backend Developer", MARGIN, curY, { lineBreak: false });

curY += 16;

// Contact info line 1
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("contact.mdemonmiah@gmail.com   +8801405665854 / +8801568147387", MARGIN, curY, { lineBreak: false });

curY += 13;

// Contact info line 2
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("linkedin.com/in/MdEmonMiah   github.com/programmermdemonmiah", MARGIN, curY, { lineBreak: false });

curY += 22;

// Professional Summary
curY = drawSectionHeader("Professional Summary", curY);

const summaryText =
  "Full Stack Engineer specializing in high performance Flutter applications and scalable backend systems. Proven experience in designing real time architectures using WebSocket, building fintech, healthcare, live streaming and e-commerce platforms. Strong focus on clean architecture, modular code and production ready system design.";

doc
  .font("Helvetica")
  .fontSize(8.3)
  .fillColor(COLOR.textBody)
  .text(summaryText, MARGIN, curY, { width: CONTENT_WIDTH, lineGap: 2.2 });

curY = doc.y + 14;

// Professional Experience
curY = drawSectionHeader("Professional Experience", curY);

// Senior Role Header
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor(COLOR.textHeading)
  .text("Senior Software Engineer (Mobile & Backend), N. I. Biz Soft", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("12/2023 – 05/2026", MARGIN, curY, { width: CONTENT_WIDTH, align: "right" });

curY += 11;

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textMuted)
  .text("Uttara-15", MARGIN, curY, { width: CONTENT_WIDTH, align: "right" });

const seniorBullets = [
  "Leading full stack system development (Flutter + Backend)",
  "Designing scalable real time architectures (WebSocket based systems)",
  "Backend development in Go (Gin), Laravel & Django",
  "System design for fintech, e-commerce and live streaming platforms",
  "API architecture design & performance optimization",
  "Mentoring junior developers and reviewing code structure",
  "Handling production level deployments and system stability",
];

for (const b of seniorBullets) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 4;

// Mid-Level Role Header
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor(COLOR.textHeading)
  .text("Mid-Level Mobile & Backend Developer", MARGIN, curY, { lineBreak: false });

curY += 12;

const midBullets = [
  "Worked as Full Stack (Flutter + Backend) developer",
  "Built scalable API integrations with backend systems",
  "Implemented real time features using WebSocket (Go)",
  "Payment gateway integration (bKash, Nagad, SSLCommerz)",
  "Improved app performance & backend response time",
  "Collaborated on system level architecture decisions",
];

for (const b of midBullets) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 4;

// App Developer Role Header
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor(COLOR.textHeading)
  .text("App Developer", MARGIN, curY, { lineBreak: false });

curY += 12;

const appBullets = [
  "Flutter mobile application development (Android & iOS)",
  "REST API integration and UI implementation",
  "State management (GetX / Provider)",
  "Bug fixing, feature implementation and app maintenance",
  "Clean architecture basics (Service + Repository pattern)",
];

for (const b of appBullets) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 12;

// Education Section
curY = drawSectionHeader("Education", curY);

function drawEduRow(degree, inst, result, isRunning = false) {
  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(COLOR.textHeading)
    .text(degree, MARGIN, curY, { lineBreak: false });

  doc
    .font("Helvetica-Oblique")
    .fontSize(8)
    .fillColor(COLOR.textBody)
    .text(inst ? `, ${inst}` : "", doc.x, curY, { lineBreak: false });

  curY += 11;

  doc
    .font(isRunning ? "Helvetica-Bold" : "Helvetica")
    .fontSize(8)
    .fillColor(isRunning ? COLOR.primary : COLOR.textBody)
    .text(result, MARGIN, curY, { lineBreak: false });

  curY += 11;
}

drawEduRow("BSC in CSE", "Uttara University", "Running", true);
drawEduRow("Diploma in Engineering", "Sylhet Polytechnic Institute", "CGPA: 3.68 / 4.00");
drawEduRow("HSC", "M.A.H.K Bhashani Degree College", "GPA: 4.33 / 5.00");
drawEduRow("SSC", "P.T.M High School", "GPA: 4.33 / 5.00");

// ============================================================================
// PAGE 2: Technical Skills (2-Column) + Key Projects (Project 1 Start)
// ============================================================================
doc.addPage();

curY = 32;
curY = drawSectionHeader("Technical Skills", curY);

const colWidth = (CONTENT_WIDTH - 20) / 2; // ~251pt
const col1X = MARGIN;
const col2X = MARGIN + colWidth + 20;

let leftY = curY;
let rightY = curY;

// Left Column: Mobile App Dev, Local Storage, Database, Tools
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Mobile App Development (Flutter)", col1X, leftY);
leftY += 11;

const flutterSkills = [
  "Cross platform app development (Android & iOS)",
  "Clean Architecture (Layered, Scalable, Maintainable)",
  "MVC, MVVM design patterns",
  "API Integration (REST, Dio, HTTP)",
  "Performance optimization & reusable components",
];
for (const s of flutterSkills) {
  leftY = drawBullet(s, col1X, leftY, colWidth - 16);
}

leftY += 6;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Local Storage (Flutter)", col1X, leftY);
leftY += 11;

const localStorageSkills = [
  "SQLite (Sqflite)",
  "Structured relational local database",
  "Complex query handling",
  "Data persistence with schema design",
  "SharedPreferences",
  "Key value storage",
  "Lightweight data persistence (token, settings)",
];
for (const s of localStorageSkills) {
  leftY = drawBullet(s, col1X, leftY, colWidth - 16);
}

leftY += 6;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Database Systems", col1X, leftY);
leftY += 11;

const dbSkills = [
  "MySQL (Relational database design & optimization)",
  "PostgreSQL (Relational schema design & indexing)",
  "Firebase Firestore / Realtime Database",
];
for (const s of dbSkills) {
  leftY = drawBullet(s, col1X, leftY, colWidth - 16);
}

leftY += 6;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Tools & Environment", col1X, leftY);
leftY += 11;

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("VS Code, Android Studio, Xcode, Git, Postman, Docker (Basic)", col1X, leftY, { width: colWidth });
leftY = doc.y + 10;

// Right Column: State Management, Backend Development, System Design
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("State Management (Flutter)", col2X, rightY);
rightY += 11;

const stateSkills = [
  "GetX (Advanced)",
  "Reactive state management",
  "Dependency Injection",
  "Route management",
  "Provider (Advanced)",
  "Scalable state handling",
  "App-wide state management",
  "Riverpod (Mid Level)",
  "Scalable state handling",
  "Big project and multi state handling",
];
for (const s of stateSkills) {
  rightY = drawBullet(s, col2X, rightY, colWidth - 16);
}

rightY += 6;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Backend Development", col2X, rightY);
rightY += 11;

const backendSkills = [
  "Go (Golang) – Gin Framework",
  "REST API development",
  "WebSocket (real time system)",
  "Middleware, routing, error handling",
  "Concurrent system design",
  "PHP (Laravel)",
  "MVC architecture",
  "Repository architecture",
  "REST API development",
  "Authentication & authorization",
  "ERP & E-commerce system",
  "Blade, Ajax",
  "Python (Django backend & API & Template Based, Flask)",
];
for (const s of backendSkills) {
  rightY = drawBullet(s, col2X, rightY, colWidth - 16);
}

rightY += 6;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("System Design & Integration", col2X, rightY);
rightY += 11;

const sysDesignSkills = [
  "Real time systems",
  "Payment gateway integration",
  "bKash, Nagad, Stripe, PayPal, SSLCommerz",
  "OTP & token based authentication",
  "API security & performance optimization",
];
for (const s of sysDesignSkills) {
  rightY = drawBullet(s, col2X, rightY, colWidth - 16);
}

curY = Math.max(leftY, rightY) + 12;

// Key Projects Heading
curY = drawSectionHeader("Key Projects", curY);

// Project 1: Live Streaming Platform (Swish)
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR.textHeading)
  .text("Live Streaming Platform", MARGIN, curY);
curY += 12;

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textMuted)
  .text("https://play.google.com/store/apps/details?id=com.swish.app", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("   Platform: ", doc.x, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Flutter App + Go Backend (Microservices Architecture)", doc.x, curY);

curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("System Architecture:", MARGIN, curY);
curY += 11;

const liveArchBullets = [
  "Separate Go based microservices (API Server + Streaming Core Backend)",
  "WebSocket based real time communication system",
  "Scalable event driven architecture for live interactions",
];
for (const b of liveArchBullets) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 4;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Core Features:", MARGIN, curY);
curY += 11;

const liveFeatPage2 = [
  "Real time audio/video live streaming",
  "Live room join/leave system",
  "Host controlled join request approval system",
  "VIP instant join & premium access system",
  "Gift sending & virtual economy system",
];
for (const b of liveFeatPage2) {
  curY = drawBullet(b, MARGIN, curY);
}

// ============================================================================
// PAGE 3: Live Streaming (cont) + LA'AM ERP + Xovalley + ARACO (start)
// ============================================================================
doc.addPage();

curY = 32;

// Live Streaming continued bullets
const liveFeatPage3 = [
  "Live ranking system with entry animations",
  "Viewer tracking in real time",
  "High performance concurrency handling (Go routines)",
];
for (const b of liveFeatPage3) {
  curY = drawBullet(b, MARGIN, curY);
}

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Role: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("Full Stack Engineer (Flutter + Go Microservice Backend)", doc.x, curY);

curY += 16;

// Project 2: LA'AM ERP System
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR.textHeading)
  .text("LA’AM ERP System, Enterprise Resource Planning System", MARGIN, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Platform: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Web System + Backend   ", doc.x, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textMuted)
  .text("https://erpecom.deepverselab.com/login", doc.x, curY);

curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Core Modules:", MARGIN, curY);
curY += 11;

const erpModules = [
  "Employee Management System (Role based access control)",
  "Team based role & permission system",
  "Incentive system per employee & per product",
  "Courier integration system",
  "Auto courier status tracking system",
  "Shipping system (weight based calculation)",
  "Inventory management system",
  "Accounting module (income, expense, profit/loss)",
  "Wallet system for employees",
  "Reporting dashboard (full business analytics)",
];
for (const b of erpModules) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 4;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Integration Systems:", MARGIN, curY);
curY += 11;

const erpIntegrations = [
  "WordPress plugin integration (order sync)",
  "WordPress order -> direct ERP pipeline",
  "Real time order & inventory sync",
];
for (const b of erpIntegrations) {
  curY = drawBullet(b, MARGIN, curY);
}

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Role: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("System Architect & Backend Developer", doc.x, curY);

curY += 16;

// Project 3: Xovalley
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR.textHeading)
  .text("Xovalley – Multi Vendor E-commerce Platform", MARGIN, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Platform: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Web + Mobile + Admin + Delivery System Backend", doc.x, curY);
curY += 11;

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Backend & Web: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Laravel (API + Core Business Logic) · React.js (Web Frontend) · https://xovalley.com", doc.x, curY);
curY += 11;

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Mobile App: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Flutter (Customer App, Seller App, Delivery Man App) · Google Play Store", doc.x, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Features:", MARGIN, curY);
curY += 11;

const xovalleyFeatures = [
  "Multi vendor marketplace system",
  "Product, cart, order management",
  "Delivery tracking system",
  "Affiliate marketing system",
  "Commission & payout system",
  "Payment gateway integration",
];
for (const b of xovalleyFeatures) {
  curY = drawBullet(b, MARGIN, curY);
}

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Role: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("Full Stack Engineer (Laravel + Flutter + System Design)", doc.x, curY);

curY += 16;

// Project 4: ARACO Healthcare System
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR.textHeading)
  .text("ARACO Healthcare System, Healthcare Ecosystem", MARGIN, curY);
curY += 12;

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textMuted)
  .text("https://araco.com.bd   ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Platform: ", doc.x, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Flutter App + Web System Backend: Django + Template based Admin Panel", doc.x, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Mobile App Features (Flutter + GetX):", MARGIN, curY);
curY += 11;

const aracoMobile = [
  "Online pharmacy system (medicine order + prescription upload)",
  "Doctor appointment & telemedicine system",
  "Video/audio calling (Zego Cloud integration)",
  "Lab test booking system",
  "Caregiver booking system",
  "Health package subscription system",
];
for (const b of aracoMobile) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 4;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Healthcare Workflow:", MARGIN, curY);
curY += 11;

const aracoWorkflow = [
  "Patient -> Doctor appointment -> Video consultation -> E-prescription",
  "Lab technician home collection system -> digital report delivery",
  "Health package auto doctor assignment system",
];
for (const b of aracoWorkflow) {
  curY = drawBullet(b, MARGIN, curY);
}

// ============================================================================
// PAGE 4: ARACO (Admin System) + Propeta + CashMart + Training + Languages + Core Strengths
// ============================================================================
doc.addPage();

curY = 32;

// ARACO Admin System
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Admin System:", MARGIN, curY);
curY += 11;

const aracoAdmin = [
  "Role based access control (RBAC)",
  "POS system",
  "Inventory management",
  "Invoice generation",
  "Staff & doctor management system",
];
for (const b of aracoAdmin) {
  curY = drawBullet(b, MARGIN, curY);
}

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Role: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("Full Stack Engineer (Flutter + Django + System Design)", doc.x, curY);

curY += 16;

// Project 5: Propeta
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR.textHeading)
  .text("Propeta – Real Estate Platform", MARGIN, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Platform: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Flutter App + API Backend", doc.x, curY);
curY += 11;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Features:", MARGIN, curY);
curY += 11;

const propetaFeatures = [
  "Property listing system",
  "Property search & filtering",
  "Agent based listing system",
  "API driven architecture",
  "MVC based backend structure",
];
for (const b of propetaFeatures) {
  curY = drawBullet(b, MARGIN, curY);
}

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Role: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("Mobile App Developer", doc.x, curY);

curY += 16;

// Project 6: CashMart
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR.textHeading)
  .text("CashMart – Digital Banking + E-commerce System", MARGIN, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("Platform: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Flutter App Backend: Django (Python)", doc.x, curY);
curY += 12;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Core Banking Features:", MARGIN, curY);
curY += 11;

const cashMartBanking = [
  "Send money system",
  "Cashout via QR system",
  "Transaction history with export (PDF)",
  "OTP based authentication",
  "Wallet system",
];
for (const b of cashMartBanking) {
  curY = drawBullet(b, MARGIN, curY);
}

curY += 4;
doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("E-commerce + Finance Hybrid:", MARGIN, curY);
curY += 11;

const cashMartHybrid = [
  "Product purchase system",
  "Profit sharing system (purchase based earning logic)",
  "MLM style deposit & reward system",
  "Balance + commission tracking system",
];
for (const b of cashMartHybrid) {
  curY = drawBullet(b, MARGIN, curY);
}

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Role: ", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("Backend Engineer (Django API Development)", doc.x, curY);

curY += 18;

// Training
curY = drawSectionHeader("Training", curY);

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Mobile Application Development (Flutter), Atova Technology", MARGIN, curY, { lineBreak: false });

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textHeading)
  .text("08/2023 – 11/2023", MARGIN, curY, { width: CONTENT_WIDTH, align: "right" });

curY += 18;

// Programming Languages
curY = drawSectionHeader("Programming Languages", curY);

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Programming Languages", MARGIN, curY);
curY += 11;

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(COLOR.textBody)
  .text("Dart, Go, PHP, Python", MARGIN, curY);

curY += 18;

// Languages
curY = drawSectionHeader("Languages", curY);

const langColW = (CONTENT_WIDTH - 20) / 2;

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("Bangla", MARGIN, curY);

doc
  .font("Helvetica-Bold")
  .fontSize(8.5)
  .fillColor(COLOR.textHeading)
  .text("English", MARGIN + langColW, curY);

curY += 11;

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Native", MARGIN, curY);

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(COLOR.textBody)
  .text("Fluent", MARGIN + langColW, curY);

curY += 18;

// Core Strengths
curY = drawSectionHeader("Core Strengths", curY);

const coreStrengths = [
  "Full Stack System Development",
  "Real time Application Engineering (WebSocket, Socket.io)",
  "Clean & Scalable Architecture",
  "API Design & Integration",
  "Problem Solving & Performance Optimization",
];
for (const b of coreStrengths) {
  curY = drawBullet(b, MARGIN, curY);
}

// Finalize Document
doc.end();

stream.on("finish", () => {
  console.log(`Generated professional executive CV PDF (4 pages) at: ${output}`);
});
