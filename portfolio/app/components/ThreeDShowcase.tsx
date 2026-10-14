"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_URL =
  "https://raw.githubusercontent.com/programmermdemonmiah/programmermdemonmiah/main/assets/tripo_pbr_model_47f48f2a-77c7-4a1c-8e45-7bf8597d942a_meshopt.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (object.material instanceof THREE.MeshStandardMaterial) {
        object.material.envMapIntensity = 1.35;
        object.material.roughness = Math.min(object.material.roughness, 0.58);
        object.material.metalness = Math.max(object.material.metalness, 0.08);
      }
    });
  }, [cloned]);

  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.32;
    const targetX = -state.pointer.y * 0.12;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.055);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.055);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.055;
  });

  return (
    <group ref={group}>
      <primitive object={cloned} scale={1.75} position={[0, -1.05, 0]} />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.45, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.18, 0.035);
    camera.lookAt(0, -0.45, 0);
  });

  return null;
}

function OrbitScene() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z = t * 0.18;
    if (ringB.current) ringB.current.rotation.z = -t * 0.13;
    if (ringC.current) ringC.current.rotation.x = t * 0.11;
  });

  return (
    <>
      <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.15, 0]}>
        <torusGeometry args={[2.45, 0.012, 12, 160]} />
        <meshBasicMaterial color="#e53935" transparent opacity={0.48} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.8, -0.45, 0.2]}>
        <torusGeometry args={[2.82, 0.008, 10, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ringC} rotation={[0.65, Math.PI / 2.5, 0]}>
        <torusGeometry args={[3.25, 0.006, 10, 160]} />
        <meshBasicMaterial color="#e53935" transparent opacity={0.18} />
      </mesh>

      <Float speed={1.7} rotationIntensity={1.3} floatIntensity={1.1}>
        <mesh position={[-2.55, 1.35, 0.25]} rotation={[0.3, 0.5, 0.2]}>
          <icosahedronGeometry args={[0.16, 1]} />
          <meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.8} metalness={0.8} roughness={0.25} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.35}>
        <mesh position={[2.65, 0.85, 0.35]} rotation={[0.4, 0.1, 0.5]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial color="#f3f3f3" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.3}>
        <mesh position={[2.2, -1.55, 0.5]} rotation={[0.1, 0.7, 0.4]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.65} metalness={0.7} roughness={0.25} />
        </mesh>
      </Float>
    </>
  );
}

function Loading() {
  return <div className="three-d-loading">LOADING 3D EXPERIENCE<span>•</span></div>;
}

export default function ThreeDShowcase() {
  const [ready, setReady] = useState(false);

  return (
    <section className="three-d-showcase" aria-label="Interactive 3D experience">
      <div className="three-d-grid" aria-hidden="true" />
      <div className="three-d-glow three-d-glow-one" aria-hidden="true" />
      <div className="three-d-glow three-d-glow-two" aria-hidden="true" />

      <div className="three-d-topline">
        <span><i /> REAL-TIME 3D EXPERIENCE</span>
        <span>TRIPO PBR · INTERACTIVE SCENE</span>
      </div>

      <div className="three-d-copy three-d-copy-left">
        <span className="three-d-index">01 / 03</span>
        <h2>Built in<br /><strong>three dimensions.</strong></h2>
        <p>Explore the interactive character model. Move your cursor, drag the scene, and watch the environment respond in real time.</p>
      </div>

      <div className="three-d-stage">
        {!ready && <Loading />}
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.1, 6.6], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => setReady(true)}
          shadows
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#0c0c0c"]} />
            <ambientLight intensity={0.55} />
            <hemisphereLight intensity={0.7} color="#ffffff" groundColor="#190707" />
            <spotLight position={[4, 5, 4]} angle={0.48} penumbra={1} intensity={16} color="#ffffff" castShadow />
            <pointLight position={[-4, 1, 2]} intensity={8} color="#e53935" />
            <pointLight position={[2, -2, 2]} intensity={4} color="#ff6b67" />
            <Environment preset="city" environmentIntensity={0.75} />
            <Stars radius={12} depth={5} count={900} factor={1.5} saturation={0} fade speed={0.35} />
            <OrbitScene />
            <Model />
            <CameraRig />
            <OrbitControls enablePan={false} minDistance={4.9} maxDistance={8} minPolarAngle={Math.PI / 2.35} maxPolarAngle={Math.PI / 1.65} autoRotate autoRotateSpeed={0.55} enableDamping dampingFactor={0.055} />
          </Suspense>
        </Canvas>
      </div>

      <div className="three-d-copy three-d-copy-right">
        <div className="three-d-stat"><strong>360°</strong><span>Interactive view</span></div>
        <div className="three-d-stat"><strong>PBR</strong><span>Material lighting</span></div>
        <div className="three-d-stat"><strong>60FPS</strong><span>Motion focused</span></div>
      </div>

      <div className="three-d-bottomline">
        <span>SCROLL TO CONTINUE</span>
        <span className="three-d-line" />
        <span>MD. EMON MIAH</span>
      </div>

      <style jsx>{`
        .three-d-showcase {
          position: relative;
          min-height: min(820px, 92vh);
          overflow: hidden;
          isolation: isolate;
          border-bottom: 1px solid #2b2b2b;
          background: #0c0c0c;
        }
        .three-d-stage {
          position: absolute;
          inset: 58px 12% 48px;
          z-index: 1;
        }
        .three-d-stage :global(canvas) { width: 100% !important; height: 100% !important; }
        .three-d-grid {
          position: absolute;
          inset: 0;
          opacity: .26;
          background-image: linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(circle at center, black 10%, transparent 72%);
        }
        .three-d-glow { position:absolute; border-radius:50%; filter:blur(70px); pointer-events:none; }
        .three-d-glow-one { width:420px; height:420px; left:50%; top:38%; transform:translate(-50%,-50%); background:rgba(229,57,53,.16); }
        .three-d-glow-two { width:260px; height:260px; right:-100px; bottom:-90px; background:rgba(229,57,53,.1); }
        .three-d-topline,.three-d-bottomline { position:absolute; z-index:4; left:28px; right:28px; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#888; font:600 10px/1.2 Arial,sans-serif; letter-spacing:.16em; }
        .three-d-topline { top:24px; }
        .three-d-topline span:first-child { color:#ddd; }
        .three-d-topline i { display:inline-block; width:6px; height:6px; margin-right:8px; border-radius:50%; background:#e53935; box-shadow:0 0 15px rgba(229,57,53,.9); }
        .three-d-bottomline { bottom:23px; }
        .three-d-line { height:1px; flex:1; max-width:340px; background:#333; }
        .three-d-copy { position:absolute; z-index:3; width:250px; pointer-events:none; }
        .three-d-copy-left { left:6%; top:29%; }
        .three-d-copy-right { right:5%; bottom:22%; }
        .three-d-index { color:#e53935; font:700 10px/1 Arial,sans-serif; letter-spacing:.16em; }
        .three-d-copy h2 { margin:16px 0; color:#f5f5f5; font:500 clamp(32px,4vw,58px)/.95 Kanit,Arial,sans-serif; letter-spacing:-.055em; }
        .three-d-copy h2 strong { color:#e53935; font-weight:600; }
        .three-d-copy-left p { margin:0; max-width:230px; color:#999; font:400 12px/1.75 Arial,sans-serif; }
        .three-d-stat { display:flex; align-items:baseline; justify-content:space-between; gap:20px; padding:12px 0; border-bottom:1px solid #292929; }
        .three-d-stat strong { color:#fff; font:700 19px/1 Kanit,Arial,sans-serif; }
        .three-d-stat span { color:#777; font:400 9px/1 Arial,sans-serif; text-transform:uppercase; letter-spacing:.12em; }
        .three-d-loading { position:absolute; z-index:5; inset:50% auto auto 50%; transform:translate(-50%,-50%); color:#777; font:600 10px/1 Arial,sans-serif; letter-spacing:.18em; white-space:nowrap; }
        .three-d-loading span { color:#e53935; margin-left:8px; animation:blink 1s steps(2,end) infinite; }
        @keyframes blink { 50% { opacity:.15; } }
        @media (max-width: 900px) {
          .three-d-showcase { min-height: 720px; }
          .three-d-stage { inset: 105px 0 80px; }
          .three-d-copy-left { left:24px; top:118px; width:190px; }
          .three-d-copy-left p { display:none; }
          .three-d-copy h2 { font-size:32px; }
          .three-d-copy-right { right:24px; bottom:80px; width:170px; }
          .three-d-topline,.three-d-bottomline { left:20px; right:20px; }
          .three-d-topline span:last-child { display:none; }
        }
        @media (max-width: 560px) {
          .three-d-showcase { min-height: 650px; }
          .three-d-stage { inset: 105px -12px 80px; }
          .three-d-copy-left { left:20px; top:112px; }
          .three-d-copy-right { right:20px; bottom:72px; width:150px; }
          .three-d-stat { padding:8px 0; }
          .three-d-stat strong { font-size:16px; }
          .three-d-stat span { font-size:8px; }
          .three-d-bottomline span:first-child { display:none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .three-d-stage { opacity:.9; }
        }
      `}</style>
    </section>
  );
}

useGLTF.preload(MODEL_URL);
