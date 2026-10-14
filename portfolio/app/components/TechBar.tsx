import {
  Smartphone,
  Server,
  Layers,
  Radio,
  Database,
  Container,
  Code2,
  Workflow,
  Cpu,
  Globe,
  Terminal,
  ShieldCheck,
} from "lucide-react";

const TECH_ITEMS = [
  { name: "Flutter & Dart", category: "Mobile", icon: Smartphone },
  { name: "Go (Golang)", category: "Backend", icon: Server },
  { name: "Next.js & React", category: "Frontend", icon: Layers },
  { name: "PHP & Laravel", category: "Web / APIs", icon: Globe },
  { name: "PostgreSQL & MySQL", category: "Databases", icon: Database },
  { name: "Docker & Linux", category: "DevOps", icon: Container },
  { name: "Redis & Caching", category: "Performance", icon: Cpu },
  { name: "WebSocket & WebRTC", category: "Realtime", icon: Radio },
  { name: "LiveKit Streaming", category: "Media", icon: Workflow },
  { name: "Microservices & REST", category: "Architecture", icon: Code2 },
  { name: "CI/CD & Git", category: "Delivery", icon: Terminal },
  { name: "API Security & Auth", category: "Security", icon: ShieldCheck },
];

export default function TechBar() {
  return (
    <section className="tech-strip-section" aria-label="Core Engineering Technologies">
      <div className="tech-strip-container">
        <div className="tech-strip-heading">
          <span className="tech-strip-label">CORE TOOLKIT</span>
          <span className="tech-strip-divider" aria-hidden="true" />
        </div>
        <div className="tech-grid">
          {TECH_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="tech-pill">
                <Icon size={16} className="tech-pill-icon" aria-hidden="true" />
                <span className="tech-pill-name">{item.name}</span>
                <span className="tech-pill-category">{item.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
