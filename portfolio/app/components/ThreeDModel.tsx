"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import ThreeDShowcase from "./ThreeDShowcase";

export default function ThreeDModel() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const existing = document.querySelector("[data-three-d-showcase-host]") as HTMLElement | null;
    const target = existing ?? document.createElement("div");

    if (!existing) {
      target.setAttribute("data-three-d-showcase-host", "true");
      header.insertAdjacentElement("afterend", target);
    }

    setHost(target);

    return () => {
      if (!existing && target.parentNode) target.parentNode.removeChild(target);
    };
  }, []);

  if (!host) return null;

  return createPortal(<ThreeDShowcase />, host);
}
