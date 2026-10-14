"use client";

import { useState } from "react";

export default function CVClientActions() {
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
  );
}
