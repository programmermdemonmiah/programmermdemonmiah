"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars, useGLTF } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_URL = "https://raw.githubusercontent.com/programmermdemonmiah/programmermdemonmiah/main/assets/tripo_pbr_model_47f48f2a-77c7-4a1c-8e45-7bf8597d942a_meshopt.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const layout = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z, 0.001);
    return { center, scale: 4.25 / maxSize };
  }, [cloned]);

  useEffect(() => {
    cloned.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (object.material instanceof THREE.MeshStandardMaterial) {
        object.material.envMapIntensity = 2.1;
        object.material.roughness = Math.min(object.material.roughness || 0.5, 0.46);
        object.material.metalness = Math.max(object.material.metalness, 0.12);
      }
    });
  }, [cloned]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = state.pointer.x * 0.18 + t * 0.045;
    const targetX = -state.pointer.y * 0.06;

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2.4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.4, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, 0.72, 2.4, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(t * 0.42) * 0.045, 2.5, delta);
  });

  return <group ref={group} scale={layout.scale}><primitive object={cloned} position={[-layout.center.x, -layout.center.y, -layout.center.z]} /></group>;
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.06, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, state.pointer.y * 0.035, 2.2, delta);
    camera.lookAt(0.48, 0, 0);
  });
  return null;
}

function SceneDecor() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.11;
      ringA.current.rotation.y += delta * 0.035;
      ringA.current.position.y = Math.sin(t * 0.4) * 0.035;
    }
    if (ringB.current) ringB.current.rotation.z -= delta * 0.065;
    if (ringC.current) ringC.current.rotation.x += delta * 0.045;
  });

  return <>
    <mesh ref={ringA} rotation={[Math.PI / 2.2, 0.18, 0]}><torusGeometry args={[2.55, 0.012, 14, 180]} /><meshBasicMaterial color="#e53935" transparent opacity={0.4} /></mesh>
    <mesh ref={ringB} rotation={[Math.PI / 2.75, -0.45, 0.2]}><torusGeometry args={[3.05, 0.007, 10, 180]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.09} /></mesh>
    <mesh ref={ringC} rotation={[0.6, Math.PI / 2.5, 0]}><torusGeometry args={[3.45, 0.005, 10, 180]} /><meshBasicMaterial color="#e53935" transparent opacity={0.13} /></mesh>
    <Float speed={0.75} rotationIntensity={0.7} floatIntensity={0.7}><mesh position={[-2.45, 1.35, 0.4]}><icosahedronGeometry args={[0.13, 1]} /><meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.65} metalness={0.8} roughness={0.22} /></mesh></Float>
    <Float speed={0.8} rotationIntensity={0.65} floatIntensity={0.75}><mesh position={[2.45, 1.0, 0.45]}><octahedronGeometry args={[0.12, 0]} /><meshStandardMaterial color="#f5f5f5" metalness={0.9} roughness={0.18} /></mesh></Float>
    <Float speed={0.85} rotationIntensity={0.65} floatIntensity={0.7}><mesh position={[2.15, -1.55, 0.5]}><boxGeometry args={[0.17, 0.17, 0.17]} /><meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.6} metalness={0.7} roughness={0.24} /></mesh></Float>
  </>;
}

function Loading() { return <div className="three-d-loading">LOADING 3D EXPERIENCE <span>●</span></div>; }

export default function ThreeDShowcase() {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  return <section className="three-d-showcase" aria-label="MD. Emon Miah interactive 3D hero">
    <div className="three-d-background" aria-hidden="true" />
    <div className="three-d-grid" aria-hidden="true" />
    <div className="three-d-glow" aria-hidden="true" />

    <div className="three-d-stage" aria-hidden="true">
      {!ready && <Loading />}
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.8], fov: 43 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={() => setReady(true)}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.58} />
          <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#160707" />
          <spotLight position={[4, 5, 5]} angle={0.5} penumbra={1} intensity={18} color="#ffffff" />
          <pointLight position={[-4, 1, 2]} intensity={10} color="#e53935" />
          <pointLight position={[3, -2, 2]} intensity={5} color="#ff7772" />
          <Environment preset="city" environmentIntensity={0.9} />
          <Stars radius={13} depth={6} count={reducedMotion ? 180 : 700} factor={1.45} saturation={0} fade speed={reducedMotion ? 0 : 0.18} />
          <SceneDecor />
          <Model />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>

    <div className="three-d-vignette" aria-hidden="true" />

    <div className="three-d-topline"><span><i /> SOFTWARE ENGINEER · BANGLADESH</span><span>INTERACTIVE 3D PORTFOLIO</span></div>

    <motion.div className="three-d-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <span className="three-d-index">MD. EMON MIAH / 01</span>
      <h1>Building software<br />that <strong>works.</strong></h1>
      <p>Flutter apps, Go backends, and Next.js products—designed, engineered, and shipped from one place.</p>
      <div className="three-d-actions"><a className="three-d-button" href="#projects">Explore projects <span>↗</span></a><a className="three-d-link" href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub ↗</a></div>
    </motion.div>

    <motion.div className="three-d-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.8 }}><span>MOVE POINTER</span><span>SCROLL ↓</span></motion.div>
    <div className="three-d-bottomline"><span>01</span><span className="three-d-line" /><span>FULL-SCREEN 3D EXPERIENCE</span></div>

    <style jsx>{`
      .three-d-showcase{position:relative;min-height:calc(100vh - 82px);height:max(720px,calc(100vh - 82px));overflow:hidden;isolation:isolate;background:#0c0c0c;border-bottom:1px solid #292929}
      .three-d-background{position:absolute;inset:0;z-index:-3;background:radial-gradient(circle at 67% 50%,#260d0d 0%,#130b0b 30%,#0c0c0c 68%,#080808 100%)}
      .three-d-grid{position:absolute;inset:-20%;z-index:-2;opacity:.14;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:78px 78px;transform:perspective(700px) rotateX(58deg) scale(1.5);transform-origin:center bottom;mask-image:linear-gradient(to top,black,transparent 68%)}
      .three-d-glow{position:absolute;z-index:0;width:min(820px,74vw);height:min(820px,74vw);left:68%;top:52%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(229,57,53,.22),rgba(229,57,53,.055) 42%,transparent 72%);filter:blur(24px);pointer-events:none}

      /* The 3D canvas is a true background layer. It stays behind every hero text/control layer. */
      .three-d-stage{position:absolute;z-index:1;inset:0;pointer-events:auto}
      .three-d-stage :global(canvas){position:absolute!important;inset:0;width:100%!important;height:100%!important;display:block}
      .three-d-vignette{position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(90deg,rgba(12,12,12,.93) 0%,rgba(12,12,12,.68) 25%,rgba(12,12,12,.12) 54%,rgba(12,12,12,.24) 100%),radial-gradient(circle at 68% 50%,transparent 0%,transparent 43%,rgba(0,0,0,.48) 100%)}

      .three-d-topline,.three-d-bottomline{position:absolute;z-index:8;left:30px;right:30px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#777;font:600 10px/1.2 Arial,sans-serif;letter-spacing:.16em}.three-d-topline{top:24px}.three-d-topline span:first-child{color:#ddd}.three-d-topline i{display:inline-block;width:6px;height:6px;margin-right:8px;border-radius:50%;background:#e53935;box-shadow:0 0 15px rgba(229,57,53,.9)}.three-d-bottomline{bottom:22px}.three-d-line{height:1px;flex:1;max-width:420px;background:#303030}
      .three-d-copy{position:absolute;z-index:7;left:7%;top:50%;width:min(520px,42vw);transform:translateY(-42%);pointer-events:none}.three-d-index{color:#e53935;font:700 10px/1 Arial,sans-serif;letter-spacing:.18em}.three-d-copy h1{margin:18px 0 20px;color:#f7f7f7;font:600 clamp(54px,6.2vw,94px)/.9 Kanit,Arial,sans-serif;letter-spacing:-.07em;text-shadow:0 12px 35px rgba(0,0,0,.55)}.three-d-copy h1 strong{color:#e53935;font-weight:650}.three-d-copy p{max-width:390px;margin:0;color:#b7b7b7;font:400 14px/1.75 Arial,sans-serif}.three-d-actions{display:flex;align-items:center;gap:22px;margin-top:27px;pointer-events:auto}.three-d-button{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 18px;border:1px solid #e53935;border-radius:5px;background:#e53935;color:#fff;font:600 12px/1 Arial,sans-serif;transition:transform .25s ease,background .25s ease}.three-d-button:hover{transform:translateY(-2px);background:#c62828}.three-d-link{color:#ddd;font:500 12px/1 Arial,sans-serif}.three-d-link:hover{color:#e53935}.three-d-hint{position:absolute;z-index:7;right:5.5%;bottom:17%;display:flex;flex-direction:column;gap:8px;color:#777;font:600 9px/1 Arial,sans-serif;letter-spacing:.15em;text-align:right}.three-d-loading{position:absolute;z-index:2;left:68%;top:50%;transform:translate(-50%,-50%);color:#777;font:600 10px/1 Arial,sans-serif;letter-spacing:.18em;white-space:nowrap}.three-d-loading span{color:#e53935;animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:.15}}

      @media(max-width:900px){.three-d-copy{left:5%;width:430px}.three-d-copy h1{font-size:58px}.three-d-hint{right:5%;bottom:14%}.three-d-glow{left:67%}}
      @media(max-width:700px){.three-d-showcase{height:760px;min-height:760px}.three-d-topline,.three-d-bottomline{left:18px;right:18px}.three-d-topline span:last-child{display:none}.three-d-copy{left:20px;top:92px;width:calc(100% - 40px);transform:none}.three-d-copy h1{margin:11px 0 12px;font-size:43px}.three-d-copy p{max-width:330px;font-size:12px;line-height:1.6}.three-d-actions{margin-top:18px}.three-d-hint{right:20px;bottom:62px;font-size:8px}.three-d-glow{left:68%;top:56%;width:560px;height:560px}.three-d-bottomline{bottom:18px}.three-d-line{max-width:100px}.three-d-vignette{background:linear-gradient(180deg,rgba(12,12,12,.84) 0%,rgba(12,12,12,.3) 35%,rgba(12,12,12,.08) 65%,rgba(12,12,12,.6) 100%)}}
      @media(prefers-reduced-motion:reduce){.three-d-showcase{height:auto;min-height:700px}}
    `}</style>
  </section>;
}

useGLTF.preload(MODEL_URL);
