"use client";

import Script from "next/script";
import { createElement } from "react";

const ModelViewerElement = "model-viewer" as unknown as React.ComponentType<Record<string, unknown>>;

export default function ThreeDModel() {
  return (
    <div className="hero-model-wrap">
      <Script
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        type="module"
        strategy="afterInteractive"
      />
      <div className="hero-model-frame">
        <span className="model-label"><span /> Interactive 3D model</span>
        {createElement(ModelViewerElement, {
          src: "https://raw.githubusercontent.com/programmermdemonmiah/programmermdemonmiah/main/assets/tripo_pbr_model_47f48f2a-77c7-4a1c-8e45-7bf8597d942a_meshopt.glb",
          alt: "Interactive 3D portfolio model",
          "camera-controls": true,
          "auto-rotate": true,
          "auto-rotate-delay": "1200",
          "rotation-per-second": "12deg",
          "shadow-intensity": "1",
          "exposure": "1.05",
          "environment-image": "neutral",
          "interaction-prompt": "auto",
          "touch-action": "pan-y",
          "disable-zoom": false,
          ar: false,
        })}
        <span className="model-hint">Drag to rotate · Scroll to explore</span>
        <span className="model-corner model-corner-top" aria-hidden="true" />
        <span className="model-corner model-corner-bottom" aria-hidden="true" />
      </div>
      <p className="photo-caption">MD. Emon Miah <span>· Software Engineer</span></p>
    </div>
  );
}
