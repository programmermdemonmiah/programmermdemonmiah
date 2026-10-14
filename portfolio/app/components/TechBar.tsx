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
  CreditCard,
} from "lucide-react";

type TechItem = {
  name: string;
  category: string;
  icon: typeof Smartphone;
  color: string;
  bg: string;
  border: string;
};

const TECH_ITEMS: TechItem[] = [
  {
    name: "Flutter & Dart",
    category: "Mobile",
    icon: Smartphone,
    color: "#38BDF8",
    bg: "rgba(56, 189, 248, 0.12)",
    border: "rgba(56, 189, 248, 0.32)",
  },
  {
    name: "Go (Golang)",
    category: "Backend",
    icon: Server,
    color: "#00ADD8",
    bg: "rgba(0, 173, 216, 0.12)",
    border: "rgba(0, 173, 216, 0.32)",
  },
  {
    name: "PHP & Laravel",
    category: "Web & APIs",
    icon: Globe,
    color: "#FB7185",
    bg: "rgba(251, 113, 133, 0.12)",
    border: "rgba(251, 113, 133, 0.32)",
  },
  {
    name: "Next.js & React",
    category: "Frontend",
    icon: Layers,
    color: "#67E8F9",
    bg: "rgba(103, 232, 249, 0.12)",
    border: "rgba(103, 232, 249, 0.32)",
  },
  {
    name: "Python & Django",
    category: "Backend / ML",
    icon: Code2,
    color: "#FACC15",
    bg: "rgba(250, 204, 21, 0.12)",
    border: "rgba(250, 204, 21, 0.32)",
  },
  {
    name: "PostgreSQL & MySQL",
    category: "Databases",
    icon: Database,
    color: "#60A5FA",
    bg: "rgba(96, 165, 250, 0.12)",
    border: "rgba(96, 165, 250, 0.32)",
  },
  {
    name: "WebSocket & WebRTC",
    category: "Realtime",
    icon: Radio,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.32)",
  },
  {
    name: "LiveKit Streaming",
    category: "Media",
    icon: Workflow,
    color: "#34D399",
    bg: "rgba(52, 211, 153, 0.12)",
    border: "rgba(52, 211, 153, 0.32)",
  },
  {
    name: "bKash, Nagad & Gateways",
    category: "Fintech",
    icon: CreditCard,
    color: "#E879F9",
    bg: "rgba(232, 121, 249, 0.12)",
    border: "rgba(232, 121, 249, 0.32)",
  },
  {
    name: "Docker & Linux",
    category: "DevOps",
    icon: Container,
    color: "#38BDF8",
    bg: "rgba(56, 189, 248, 0.12)",
    border: "rgba(56, 189, 248, 0.32)",
  },
  {
    name: "Redis & Caching",
    category: "Performance",
    icon: Cpu,
    color: "#F87171",
    bg: "rgba(248, 113, 113, 0.12)",
    border: "rgba(248, 113, 113, 0.32)",
  },
  {
    name: "Git & CI/CD Pipelines",
    category: "Delivery",
    icon: Terminal,
    color: "#FB923C",
    bg: "rgba(251, 146, 60, 0.12)",
    border: "rgba(251, 146, 60, 0.32)",
  },
];

export default function TechBar() {
  return (
    <section className="tech-strip-section" aria-label="Core Engineering Technologies">
      <div className="tech-strip-container">
        <div className="tech-strip-heading">
          <span className="tech-strip-label">CORE TOOLKIT &amp; TECHNOLOGIES</span>
          <span className="tech-strip-divider" aria-hidden="true" />
        </div>
        <div className="tech-grid">
          {TECH_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="tech-pill"
                style={{
                  borderColor: item.border,
                  backgroundColor: item.bg,
                }}
              >
                <span
                  className="tech-pill-icon-box"
                  style={{ color: item.color }}
                  aria-hidden="true"
                >
                  <Icon size={16} />
                </span>
                <span className="tech-pill-name">{item.name}</span>
                <span
                  className="tech-pill-category"
                  style={{ color: item.color, borderColor: item.border }}
                >
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
