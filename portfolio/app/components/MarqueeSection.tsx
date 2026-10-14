"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const gallery = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

function ImageRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? [180, -180] : [-180, 180]);
  const items = [...images, ...images, ...images];
  return (
    <div className="marquee-viewport">
      <motion.div ref={trackRef} className="marquee-track" style={{ x, willChange: "transform" }}>
        {items.map((src, index) => (
          <div className="marquee-tile" key={src + index}>
            <img src={src} alt={`Creative project preview ${(index % images.length) + 1}`} loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="marquee-section" aria-label="Creative inspiration gallery">
      <div className="marquee-intro">
        <span className="eyebrow"><span /> Selected visual inspiration</span>
        <p>Design in motion. <strong>Ideas in progress.</strong></p>
      </div>
      <div className="marquee-rows">
        <ImageRow images={gallery.slice(0, 11)} />
        <ImageRow images={gallery.slice(11)} reverse />
      </div>
    </section>
  );
}
