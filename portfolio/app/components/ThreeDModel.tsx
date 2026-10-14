"use client";

import ThreeDShowcase from "./ThreeDShowcase";

export default function ThreeDModel() {
  return (
    <>
      <ThreeDShowcase />
      <style jsx global>{`
        #projects .projects-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
        #projects .project-card{position:relative;overflow:hidden;border-radius:5px;background:linear-gradient(145deg,#171717,#101010);transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .28s ease,box-shadow .28s ease}
        #projects .project-card::after{content:"";position:absolute;left:0;right:0;top:0;height:1px;transform:scaleX(0);transform-origin:left;background:#e53935;transition:transform .35s ease}
        #projects .project-card:hover{transform:translateY(-5px) scale(1.012);border-color:#6f2d2b;box-shadow:0 16px 45px rgba(0,0,0,.28)}
        #projects .project-card:hover::after{transform:scaleX(1)}
        #projects .project-art{min-height:88px;aspect-ratio:auto;padding:13px;background:radial-gradient(circle at 85% 15%,rgba(229,57,53,.12),transparent 35%),#141414}
        #projects .project-art-fallback{gap:5px}
        #projects .project-art-fallback>span{font-size:9px}
        #projects .project-art-fallback strong{font-size:14px;line-height:1.1;letter-spacing:-.025em}
        #projects .project-art-fallback small{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:8px}
        #projects .project-category{right:9px;bottom:8px;left:auto;max-width:58%;font-size:7px}
        #projects .project-arrow{top:9px;right:9px;width:15px}
        #projects .project-details{min-height:0;padding:11px 12px 12px}
        #projects .project-title-row h3{font-size:13px;line-height:1.25}
        #projects .project-title-row>span{font-size:9px}
        #projects .project-details>p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;margin:6px 0 0;font-size:10px;line-height:1.45}
        #projects .tag-list{gap:4px;margin:8px 0 7px}
        #projects .tag-list li{padding:3px 5px;font-size:8px}
        #projects .project-links{padding-top:3px}
        #projects .project-links a{font-size:10px}
        #projects .results-count{display:flex;align-items:center;gap:9px;color:#777}
        #projects .results-count::before{content:"";width:22px;height:1px;background:#e53935}
        @media(max-width:1100px){#projects .projects-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media(max-width:720px){#projects .projects-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}#projects .project-art{min-height:82px}#projects .project-details>p{-webkit-line-clamp:1}}
        @media(max-width:470px){#projects .projects-grid{grid-template-columns:1fr}#projects .project-card{display:grid;grid-template-columns:38% 62%}#projects .project-art{min-height:118px;border-bottom:0;border-right:1px solid #343434}}
      `}</style>
    </>
  );
}
