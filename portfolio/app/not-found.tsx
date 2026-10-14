import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-container" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0C0C0C",
      color: "#FFFFFF",
      padding: "24px",
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "480px" }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "rgba(229, 57, 53, 0.12)",
          border: "1px solid rgba(229, 57, 53, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          color: "#E53935"
        }}>
          <AlertCircle size={28} />
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "8px" }}>404 - Page Not Found</h1>
        <p style={{ color: "#94A3B8", fontSize: "0.95rem", marginBottom: "24px", lineHeight: 1.5 }}>
          The requested verified page could not be located on this portfolio system.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#E53935",
            color: "#FFFFFF",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none"
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Portfolio Home</span>
        </Link>
      </div>
    </div>
  );
}
