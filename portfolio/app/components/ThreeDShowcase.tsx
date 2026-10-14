"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Code2 } from "lucide-react";

export default function ThreeDShowcase() {
  return (
    <section className="profile-hero" aria-label="MD. Emon Miah portfolio introduction">
      <div className="profile-hero-noise" aria-hidden="true" />
      <div className="profile-hero-grid" aria-hidden="true" />
      <div className="profile-hero-glow" aria-hidden="true" />
      <div className="profile-hero-inner">
        <motion.div
          className="profile-hero-copy"
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="profile-hero-kicker"><span /> SOFTWARE ENGINEER <i /> BANGLADESH</div>
          <p className="profile-hero-index">MD. EMON MIAH / PORTFOLIO</p>
          <h1>Building digital<br />products that <span>work.</span></h1>
          <p className="profile-hero-description">
            I build polished Flutter apps, reliable Go backends, and modern Next.js experiences — from idea to production.
          </p>
          <div className="profile-hero-tags">
            <span><Code2 size={14} /> Flutter</span><span>Go</span><span>Next.js</span><span>Laravel</span>
          </div>
          <div className="profile-hero-actions">
            <a className="profile-hero-primary" href="#projects">Explore projects <ArrowUpRight size={17} /></a>
            <a className="profile-hero-secondary" href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer"><Github size={17} /> GitHub profile</a>
          </div>
          <div className="profile-hero-socials">
            <a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <a href="https://www.linkedin.com/in/MdEmonMiah" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href="#contact" aria-label="Contact"><Mail size={17} /></a>
            <span className="profile-hero-social-line" />
            <span>AVAILABLE FOR MEANINGFUL WORK</span>
          </div>
        </motion.div>

        <motion.div
          className="profile-hero-visual"
          initial={{ opacity: 0, scale: .96, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: .85, delay: .12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="profile-hero-orbit profile-hero-orbit-one" aria-hidden="true" />
          <div className="profile-hero-orbit profile-hero-orbit-two" aria-hidden="true" />
          <div className="profile-hero-image-frame">
            <div className="profile-hero-image-top"><span>PROFILE / 01</span><span className="profile-hero-live"><i /> ONLINE</span></div>
            <img
              src="https://github.com/programmermdemonmiah.png"
              alt="MD. Emon Miah GitHub profile"
              className="profile-hero-avatar"
              fetchPriority="high"
            />
            <div className="profile-hero-image-bottom"><div><small>ENGINEERING</small><strong>Built with purpose.</strong></div><span>EM<span className="profile-hero-mark-dot">.</span></span></div>
          </div>
          <div className="profile-hero-floating profile-hero-floating-top"><span className="profile-hero-floating-dot" /> MOBILE <b>+</b> BACKEND</div>
          <div className="profile-hero-floating profile-hero-floating-bottom"><span>GO</span><i /> FLUTTER <i /> NEXT.JS</div>
          <div className="profile-hero-visual-caption">CRAFTING SOFTWARE THAT MOVES PEOPLE FORWARD</div>
        </motion.div>
      </div>
      <div className="profile-hero-bottom"><span>01 / INTRODUCTION</span><span className="profile-hero-bottom-rule" /><a href="#about">SCROLL TO EXPLORE ↓</a></div>

      <style jsx>{`
        .profile-hero{position:relative;isolation:isolate;min-height:clamp(660px,calc(100svh - 82px),900px);overflow:hidden;background:#0c0c0c;color:#f7f7f7;border-bottom:1px solid #292929}
        .profile-hero-noise{position:absolute;inset:0;z-index:-3;pointer-events:none;background:radial-gradient(ellipse at 78% 48%,rgba(229,57,53,.17),transparent 34%),radial-gradient(ellipse at 0% 100%,rgba(229,57,53,.07),transparent 38%),#0c0c0c}
        .profile-hero-grid{position:absolute;inset:0;z-index:-2;opacity:.16;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(90deg,black,transparent 95%)}
        .profile-hero-glow{position:absolute;z-index:-1;right:6%;top:12%;width:min(650px,55vw);aspect-ratio:1;border-radius:50%;background:rgba(229,57,53,.09);filter:blur(85px);pointer-events:none}
        .profile-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);align-items:center;gap:clamp(30px,5vw,86px);width:min(1320px,100%);min-height:inherit;margin:0 auto;padding:74px clamp(24px,6vw,88px) 94px}
        .profile-hero-copy{position:relative;z-index:4;align-self:center;max-width:700px}
        .profile-hero-kicker{display:flex;align-items:center;gap:10px;color:#ddd;font-size:10px;letter-spacing:.19em;font-weight:650}
        .profile-hero-kicker>span{width:7px;height:7px;border-radius:50%;background:#e53935;box-shadow:0 0 15px rgba(229,57,53,.75)}
        .profile-hero-kicker i{height:1px;width:28px;background:#e53935}
        .profile-hero-index{margin:37px 0 15px;color:#e53935;font-size:11px;font-weight:700;letter-spacing:.18em}
        .profile-hero-copy h1{margin:0;font-size:clamp(48px,6.2vw,92px);font-weight:850;line-height:.96;letter-spacing:-.075em}
        .profile-hero-copy h1 span{color:#e53935}
        .profile-hero-description{max-width:520px;margin:27px 0 0;color:#b8b8b8;font-size:clamp(14px,1.2vw,17px);line-height:1.85;font-weight:350}
        .profile-hero-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:23px}
        .profile-hero-tags span{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border:1px solid #303030;border-radius:4px;background:rgba(255,255,255,.025);color:#dedede;font-size:11px}
        .profile-hero-tags span:first-child svg{color:#e53935}
        .profile-hero-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:29px}
        .profile-hero-primary,.profile-hero-secondary{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:47px;padding:0 17px;border-radius:4px;font-size:12px;font-weight:700;text-decoration:none;transition:transform .2s ease,border-color .2s ease,background .2s ease}
        .profile-hero-primary{background:#e53935;color:white;border:1px solid #e53935;box-shadow:0 8px 28px rgba(229,57,53,.17)}
        .profile-hero-primary:hover{transform:translateY(-2px);background:#f04741}
        .profile-hero-secondary{border:1px solid #393939;color:#f2f2f2;background:#121212}
        .profile-hero-secondary:hover{transform:translateY(-2px);border-color:#e53935}
        .profile-hero-socials{display:flex;align-items:center;gap:13px;margin-top:38px;color:#777}
        .profile-hero-socials a{display:grid;place-items:center;width:32px;height:32px;border:1px solid #303030;border-radius:50%;color:#ccc;transition:color .2s,border-color .2s}
        .profile-hero-socials a:hover{color:#fff;border-color:#e53935}
        .profile-hero-social-line{width:35px;height:1px;margin-left:4px;background:#444}
        .profile-hero-socials>span:last-child{font-size:8px;letter-spacing:.12em}
        .profile-hero-visual{position:relative;z-index:1;display:grid;place-items:center;min-width:0;min-height:480px}
        .profile-hero-orbit{position:absolute;aspect-ratio:1;border:1px solid rgba(229,57,53,.22);border-radius:50%;pointer-events:none}
        .profile-hero-orbit-one{width:min(94%,510px);transform:rotate(-18deg) scaleY(.83)}
        .profile-hero-orbit-two{width:min(78%,420px);border-color:rgba(255,255,255,.12);transform:rotate(28deg) scaleY(.83)}
        .profile-hero-image-frame{position:relative;width:min(82%,390px);padding:12px;border:1px solid rgba(229,57,53,.48);border-radius:8px;background:linear-gradient(145deg,rgba(31,31,31,.98),rgba(12,12,12,.96));box-shadow:0 28px 90px rgba(0,0,0,.52),0 0 65px rgba(229,57,53,.1);transform:rotate(2deg)}
        .profile-hero-image-frame:before{content:"";position:absolute;inset:-6px;border:1px solid rgba(255,255,255,.08);border-radius:10px;pointer-events:none}
        .profile-hero-image-top,.profile-hero-image-bottom{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:12px}
        .profile-hero-image-top{padding:4px 3px 12px;color:#777;font-size:8px;letter-spacing:.15em}
        .profile-hero-live{display:flex;align-items:center;gap:6px;color:#aaa}
        .profile-hero-live i{width:5px;height:5px;border-radius:50%;background:#e53935}
        .profile-hero-avatar{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:4px;filter:grayscale(100%);background:#171717}
        .profile-hero-image-bottom{padding:15px 3px 3px}
        .profile-hero-image-bottom div{display:grid;gap:4px}
        .profile-hero-image-bottom small{color:#e53935;font-size:8px;letter-spacing:.17em}
        .profile-hero-image-bottom strong{font-size:14px;font-weight:650}
        .profile-hero-image-bottom>span{font-size:24px;font-weight:850;letter-spacing:-.08em}
        .profile-hero-mark-dot{color:#e53935}
        .profile-hero-floating{position:absolute;z-index:3;display:flex;align-items:center;gap:8px;padding:11px 13px;border:1px solid #353535;border-radius:4px;background:rgba(16,16,16,.92);box-shadow:0 12px 32px rgba(0,0,0,.28);color:#ccc;font-size:8px;letter-spacing:.13em;backdrop-filter:blur(10px)}
        .profile-hero-floating-top{top:14%;right:0}
        .profile-hero-floating-top b{color:#e53935;font-size:15px}
        .profile-hero-floating-dot{width:6px;height:6px;border-radius:50%;background:#e53935}
        .profile-hero-floating-bottom{bottom:13%;left:0}
        .profile-hero-floating-bottom>span{color:#e53935;font-weight:800}
        .profile-hero-floating-bottom i{width:3px;height:3px;border-radius:50%;background:#e53935}
        .profile-hero-visual-caption{position:absolute;right:0;bottom:4%;color:#686868;font-size:8px;letter-spacing:.17em;text-align:right}
        .profile-hero-bottom{position:absolute;z-index:4;right:clamp(24px,6vw,88px);bottom:24px;left:clamp(24px,6vw,88px);display:flex;align-items:center;gap:15px;color:#666;font-size:8px;letter-spacing:.14em}
        .profile-hero-bottom-rule{flex:1;height:1px;background:linear-gradient(90deg,#444,transparent)}
        .profile-hero-bottom a{color:#aaa;text-decoration:none}
        .profile-hero-bottom a:hover{color:#e53935}
        @media(max-width:900px){.profile-hero{min-height:0}.profile-hero-inner{grid-template-columns:minmax(0,1fr) minmax(260px,.8fr);gap:22px;padding:60px 28px 88px}.profile-hero-copy h1{font-size:clamp(46px,6.8vw,70px)}.profile-hero-visual{min-height:380px}.profile-hero-image-frame{width:min(88%,340px)}.profile-hero-floating-top{right:-2%}.profile-hero-floating-bottom{left:-3%}}
        @media(max-width:680px){.profile-hero-inner{grid-template-columns:1fr;gap:22px;padding:55px 22px 84px}.profile-hero-copy h1{font-size:clamp(47px,12vw,70px)}.profile-hero-index{margin-top:28px}.profile-hero-description{margin-top:20px}.profile-hero-socials{margin-top:28px}.profile-hero-visual{min-height:330px;margin-top:8px}.profile-hero-image-frame{width:min(72%,280px)}.profile-hero-floating-top{top:9%;right:4%}.profile-hero-floating-bottom{bottom:9%;left:4%}.profile-hero-visual-caption{right:2%;bottom:0;font-size:7px}.profile-hero-bottom{bottom:18px;gap:9px;font-size:7px}.profile-hero-bottom-rule{min-width:20px}}
        @media(max-width:390px){.profile-hero-inner{padding-right:17px;padding-left:17px}.profile-hero-copy h1{font-size:45px}.profile-hero-image-frame{width:76%}.profile-hero-socials>span:last-child{font-size:7px}.profile-hero-actions{gap:8px}.profile-hero-primary,.profile-hero-secondary{padding:0 12px}}
        @media(prefers-reduced-motion:reduce){.profile-hero-primary,.profile-hero-secondary,.profile-hero-socials a{transition:none!important}}
      `}</style>
    </section>
  );
}
