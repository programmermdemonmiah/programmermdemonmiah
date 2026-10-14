"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_URL = "https://raw.githubusercontent.com/programmermdemonmiah/programmermdemonmiah/main/assets/tripo_pbr_model_47f48f2a-77c7-4a1c-8e45-7bf8597d942a_meshopt.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => { cloned.traverse((object) => { if (!(object instanceof THREE.Mesh)) return; object.castShadow = true; object.receiveShadow = true; if (object.material instanceof THREE.MeshStandardMaterial) { object.material.envMapIntensity = 1.55; object.material.roughness = Math.min(object.material.roughness, 0.56); object.material.metalness = Math.max(object.material.metalness, 0.1); } }); }, [cloned]);
  useFrame((state, delta) => { if (!group.current) return; const t = state.clock.elapsedTime; group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.42 + Math.sin(t * 0.24) * 0.045, 2.6, delta); group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.15, 2.6, delta); group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(t * 0.8) * 0.065, 2.8, delta); });
  return <group ref={group}><primitive object={cloned} scale={1.75} position={[0, -1.05, 0]} /></group>;
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state, delta) => { camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.38, 2.1, delta); camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.08 + state.pointer.y * 0.16, 2.1, delta); camera.lookAt(0, -0.42, 0); });
  return null;
}

function OrbitScene() {
  const ringA = useRef<THREE.Mesh>(null); const ringB = useRef<THREE.Mesh>(null); const ringC = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => { const t = state.clock.elapsedTime; if (ringA.current) { ringA.current.rotation.z += delta * 0.18; ringA.current.position.y = Math.sin(t * 0.55) * 0.06; } if (ringB.current) ringB.current.rotation.z -= delta * 0.12; if (ringC.current) ringC.current.rotation.x += delta * 0.1; });
  return <>
    <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.15, 0]}><torusGeometry args={[2.45, 0.012, 12, 160]} /><meshBasicMaterial color="#e53935" transparent opacity={0.5} /></mesh>
    <mesh ref={ringB} rotation={[Math.PI / 2.8, -0.45, 0.2]}><torusGeometry args={[2.82, 0.008, 10, 160]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.13} /></mesh>
    <mesh ref={ringC} rotation={[0.65, Math.PI / 2.5, 0]}><torusGeometry args={[3.25, 0.006, 10, 160]} /><meshBasicMaterial color="#e53935" transparent opacity={0.18} /></mesh>
    <Float speed={1.35} rotationIntensity={1.15} floatIntensity={1.1}><mesh position={[-2.55, 1.35, 0.25]} rotation={[0.3, 0.5, 0.2]}><icosahedronGeometry args={[0.16, 1]} /><meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.8} metalness={0.8} roughness={0.25} /></mesh></Float>
    <Float speed={1.1} rotationIntensity={1.25} floatIntensity={1.2}><mesh position={[2.65, 0.85, 0.35]} rotation={[0.4, 0.1, 0.5]}><octahedronGeometry args={[0.13, 0]} /><meshStandardMaterial color="#f3f3f3" metalness={0.9} roughness={0.2} /></mesh></Float>
    <Float speed={1.3} rotationIntensity={1.1} floatIntensity={1.15}><mesh position={[2.2, -1.55, 0.5]} rotation={[0.1, 0.7, 0.4]}><boxGeometry args={[0.18, 0.18, 0.18]} /><meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.65} metalness={0.7} roughness={0.25} /></mesh></Float>
  </>;
}

function Loading() { return <div className="three-d-loading">LOADING 3D EXPERIENCE<span>•</span></div>; }

export default function ThreeDShowcase() {
  const [ready, setReady] = useState(false); const reducedMotion = useReducedMotion();
  return <section className="three-d-showcase" aria-label="MD. Emon Miah hero and interactive 3D experience">
    <div className="three-d-grid" aria-hidden="true" /><div className="three-d-noise" aria-hidden="true" /><div className="three-d-glow three-d-glow-one" aria-hidden="true" /><div className="three-d-glow three-d-glow-two" aria-hidden="true" />
    <div className="three-d-topline"><span><i /> SOFTWARE ENGINEER · BANGLADESH</span><span>INTERACTIVE 3D PORTFOLIO</span></div>
    <motion.div className="three-d-copy three-d-copy-left" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
      <span className="three-d-index">01 / 03</span><h1>Building software<br />that <strong>works.</strong></h1><p>I build mobile apps, backend services, and web products—from the first screen to deployment.</p>
      <div className="three-d-actions"><a className="three-d-button" href="#projects">View my work <span>↗</span></a><a className="three-d-link" href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub profile ↗</a></div>
      <ul className="three-d-tech" aria-label="Main technologies"><li>Flutter</li><li>Go</li><li>Next.js</li><li>Laravel</li></ul>
    </motion.div>
    <motion.div className="three-d-stage" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.15, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}>
      {!ready && <Loading />}
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0.08, 6.6], fov: 34 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={() => setReady(true)} shadows>
        <Suspense fallback={null}><color attach="background" args={["#0c0c0c"]} /><ambientLight intensity={0.52} /><hemisphereLight intensity={0.72} color="#ffffff" groundColor="#160707" /><spotLight position={[4, 5, 4]} angle={0.48} penumbra={1} intensity={16} color="#ffffff" castShadow /><pointLight position={[-4, 1, 2]} intensity={8} color="#e53935" /><pointLight position={[2, -2, 2]} intensity={4} color="#ff6b67" /><Environment preset="city" environmentIntensity={0.78} /><Stars radius={12} depth={5} count={reducedMotion ? 250 : 900} factor={1.5} saturation={0} fade speed={reducedMotion ? 0 : 0.3} /><OrbitScene /><Model /><CameraRig /><OrbitControls enablePan={false} minDistance={4.9} maxDistance={8} minPolarAngle={Math.PI / 2.35} maxPolarAngle={Math.PI / 1.65} autoRotate={!reducedMotion} autoRotateSpeed={0.42} enableDamping dampingFactor={0.045} /></Suspense>
      </Canvas>
    </motion.div>
    <motion.div className="three-d-copy three-d-copy-right" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="three-d-stat"><strong>360°</strong><span>Interactive view</span></div><div className="three-d-stat"><strong>PBR</strong><span>Material lighting</span></div><div className="three-d-stat"><strong>60FPS</strong><span>Motion focused</span></div><div className="three-d-stat"><strong>01</strong><span>Current scene</span></div>
    </motion.div>
    <div className="three-d-bottomline"><span>MOVE · DRAG · EXPLORE</span><span className="three-d-line" /><span>SCROLL TO CONTINUE</span></div>
    <style jsx>{`
      .three-d-showcase{position:relative;min-height:min(800px,calc(100vh - 82px));overflow:hidden;isolation:isolate;background:#0c0c0c;border-bottom:1px solid #292929}
      .three-d-grid{position:absolute;inset:0;opacity:.25;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(circle at 58% 48%,#000 8%,transparent 72%)}
      .three-d-noise{position:absolute;inset:0;opacity:.035;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")}
      .three-d-glow{position:absolute;border-radius:50%;filter:blur(75px);pointer-events:none}.three-d-glow-one{width:480px;height:480px;left:58%;top:46%;transform:translate(-50%,-50%);background:rgba(229,57,53,.14)}.three-d-glow-two{width:300px;height:300px;right:-110px;bottom:-110px;background:rgba(229,57,53,.08)}
      .three-d-topline,.three-d-bottomline{position:absolute;z-index:5;left:28px;right:28px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#777;font:600 10px/1.2 Arial,sans-serif;letter-spacing:.16em}.three-d-topline{top:23px}.three-d-topline span:first-child{color:#ddd}.three-d-topline i{display:inline-block;width:6px;height:6px;margin-right:8px;border-radius:50%;background:#e53935;box-shadow:0 0 15px rgba(229,57,53,.9)}.three-d-bottomline{bottom:21px}.three-d-line{height:1px;flex:1;max-width:340px;background:#303030}
      .three-d-stage{position:absolute;z-index:1;inset:28px 5% 28px 34%;}.three-d-stage :global(canvas){width:100%!important;height:100%!important;display:block}
      .three-d-copy{position:absolute;z-index:4}.three-d-copy-left{left:6%;top:18%;width:min(430px,35vw)}.three-d-copy-right{right:5%;bottom:17%;width:180px;pointer-events:none}
      .three-d-index{color:#e53935;font:700 10px/1 Arial,sans-serif;letter-spacing:.16em}.three-d-copy h1{margin:15px 0 18px;color:#f5f5f5;font:600 clamp(48px,5.7vw,78px)/.92 Kanit,Arial,sans-serif;letter-spacing:-.065em}.three-d-copy h1 strong{color:#e53935;font-weight:650}.three-d-copy-left p{max-width:370px;margin:0;color:#9b9b9b;font:400 14px/1.75 Arial,sans-serif}.three-d-actions{display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:25px}.three-d-button{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 17px;border:1px solid #e53935;border-radius:5px;background:#e53935;color:#fff;font:600 12px/1 Arial,sans-serif;transition:transform .25s ease,background .25s ease}.three-d-button:hover{transform:translateY(-2px);background:#c62828}.three-d-link{color:#c9c9c9;font:500 12px/1 Arial,sans-serif;transition:color .2s ease}.three-d-link:hover{color:#e53935}.three-d-tech{display:flex;flex-wrap:wrap;gap:7px;margin:30px 0 0;padding:0;list-style:none}.three-d-tech li{padding:6px 9px;border:1px solid #303030;border-radius:4px;color:#bdbdbd;font:500 10px/1 Arial,sans-serif;background:rgba(12,12,12,.35);backdrop-filter:blur(6px)}
      .three-d-stat{display:flex;align-items:baseline;justify-content:space-between;gap:18px;padding:11px 0;border-bottom:1px solid #292929}.three-d-stat strong{color:#fff;font:700 19px/1 Kanit,Arial,sans-serif}.three-d-stat span{color:#777;font:400 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.1em}.three-d-loading{position:absolute;z-index:5;inset:50% auto auto 50%;transform:translate(-50%,-50%);color:#777;font:600 10px/1 Arial,sans-serif;letter-spacing:.18em;white-space:nowrap}.three-d-loading span{color:#e53935;margin-left:8px;animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:.15}}
      @media(max-width:1050px){.three-d-stage{inset:55px 0 42px 29%}.three-d-copy-left{left:4%;width:340px}.three-d-copy-right{right:3%;width:145px}.three-d-copy h1{font-size:48px}.three-d-copy-left p{font-size:12px;max-width:300px}}
      @media(max-width:760px){.three-d-showcase{min-height:720px}.three-d-stage{inset:125px -10px 85px}.three-d-copy-left{left:20px;top:84px;width:calc(100% - 40px)}.three-d-copy h1{margin:9px 0 0;font-size:38px}.three-d-copy-left p{display:none}.three-d-actions{position:absolute;top:120px;left:0;margin:0;gap:15px}.three-d-tech{display:none}.three-d-copy-right{right:20px;bottom:72px;width:150px}.three-d-stat{padding:8px 0}.three-d-stat strong{font-size:16px}.three-d-stat span{font-size:7px}.three-d-topline,.three-d-bottomline{left:20px;right:20px}.three-d-topline span:last-child{display:none}.three-d-bottomline span:first-child{display:none}}
      @media(max-width:480px){.three-d-showcase{min-height:680px}.three-d-stage{inset:120px -28px 88px}.three-d-copy h1{font-size:34px}.three-d-copy-right{bottom:65px;width:135px}.three-d-glow-one{width:330px;height:330px}}
      @media(prefers-reduced-motion:reduce){.three-d-showcase *{scroll-behavior:auto!important}.three-d-glow{filter:blur(45px)}}
    `}</style>
  </section>;
}

useGLTF.preload(MODEL_URL);
