"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
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
        object.material.envMapIntensity = 1.55;
        object.material.roughness = Math.min(object.material.roughness, 0.56);
        object.material.metalness = Math.max(object.material.metalness, 0.1);
      }
    });
  }, [cloned]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = state.pointer.x * 0.42 + Math.sin(t * 0.24) * 0.045;
    const targetX = -state.pointer.y * 0.15;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2.6, state.clock.getDelta());
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.6, state.clock.getDelta());
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(t * 0.8) * 0.065, 2.8, state.clock.getDelta());
  });

  return (
    <group ref={group}>
      <primitive object={cloned} scale={1.75} position={[0, -1.05, 0]} />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();

  useFrame((state, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.38, 2.1, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.08 + state.pointer.y * 0.16, 2.1, delta);
    camera.lookAt(0, -0.42, 0);
  });

  return null;
}

function OrbitScene() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z += delta * 0.18;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.12;
    if (ringC.current) ringC.current.rotation.x += delta * 0.1;
    if (ringA.current) ringA.current.position.y = Math.sin(t * 0.55) * 0.06;
  });

  return (
    <>
      <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.15, 0]}>
        <torusGeometry args={[2.45, 0.012, 12, 160]} />
        <meshBasicMaterial color="#e53935" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.8, -0.45, 0.2]}>
        <torusGeometry args={[2.82, 0.008, 10, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.13} />
      </mesh>
      <mesh ref={ringC} rotation={[0.65, Math.PI / 2.5, 0]}>
        <torusGeometry args={[3.25, 0.006, 10, 160]} />
        <meshBasicMaterial color="#e53935" transparent opacity={0.18} />
      </mesh>

      <Float speed={1.35} rotationIntensity={1.15} floatIntensity={1.1}>
        <mesh position={[-2.55, 1.35, 0.25]} rotation={[0.3, 0.5, 0.2]}>
          <icosahedronGeometry args={[0.16, 1]} />
          <meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={0.8} metalness={0.8} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={1.25} floatIntensity={1.2}>
        <mesh position={[2.65, 0.85, 0.35]} rotation={[0.4, 0.1, 0.5]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial color="#f3f3f3" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={1.1} floatIntensity={1.15}>
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
  const reducedMotion = useReducedMotion();

  return (
    <section className="three-d-showcase" aria-label="MD. Emon Miah hero and interactive 3D experience">
      <div className="three-d-grid" aria-hidden="true" />
      <div className="three-d-noise" aria-hidden="true" />
      <div className="three-d-glow three-d-glow-one" aria-hidden="true" />
      <div className="three-d-glow three-d-glow-two" aria-hidden="true" />

      <div className="three-d-topline">
        <span><i /> SOFTWARE ENGINEER · BANGLADESH</span>
        <span>INTERACTIVE 3D PORTFOLIO</span>
      </div>

      <motion.div className="three-d-copy three-d-copy-left" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
        <span className="three-d-index">01 / 03</span>
        <h1>Building software<br />that <strong>works.</strong></h1>
        <p>I build mobile apps, backend services, and web products—from the first screen to deployment.</p>
        <div className="three-d-actions">
          <a className="three-d-button" href="#projects">View my work <span>↗</span></a>
          <a className="three-d-link" href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">GitHub profile ↗</a>
        </div>
        <ul className="three-d-tech" aria-label="Main technologies">
          <li>Flutter</li><li>Go</li><li>Next.js</li><li>Laravel</li>
        </ul>
      </motion.div>

      <motion.div className="three-d-stage" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.15, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}>
        {!ready && <Loading />}
        <Canvas
          dpr={[1, 1.8]}
          camera={{ position: [0, 0.08, 6.6], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => setReady(true)}
          shadows
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#0c0c0c"]} />
            <ambientLight intensity={0.52} />
            <hemisphereLight intensity={0.72} color="#ffffff" groundColor="#160707" />
            <spotLight position={[4, 5, 4]} angle={0.48} penumbra={1} intensity={16} color="#ffffff" castShadow />
            <pointLight position={[-4, 1, 2]} intensity={8} color="#e53935" />
            <pointLight position={[2, -2, 2]} intensity={4} color="#ff6b67" />
            <Environment preset="city" environmentIntensity={0.78} />
            <Stars radius={12} depth={5} count={reducedMotion ? 250 : 900} factor={1.5} saturation={0} fade speed={reducedMotion ? 0 : 0.3} />
            <OrbitScene />
            <Model />
            <CameraRig />
            <OrbitControls enablePan={false} minDistance={4.9} maxDistance={8} minPolarAngle={Math.PI / 2.35} maxPolarAngle={Math.PI / 1.65} autoRotate={!reducedMotion} autoRotateSpeed={0.42} enableDamping dampingFactor={0.045} />
          </Suspense>
        </Canvas>
      </motion.div>

      <motion.div className="three-d-copy three-d-copy-right" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="three-d-stat"><strong>360°</strong><span>Interactive view</span></div>
        <div className="three-d-stat"><strong>PBR</strong><span>Material lighting</span></div>
        <div className="three-d-stat"><strong>60FPS</strong><span>Motion focused</span></div>
        <div className="three-d-stat"><strong>01</strong><span>Current scene</span></div>
      </motion.div>

      <div className="three-d-bottomline">
        <span>MOVE · DRAG · EXPLORE</span>
        <span className="three-d-line" />
        <span>SCROLL TO CONTINUE</span>
      </div>
    </section>
  );
}

useGLTF.preload(MODEL_URL);
