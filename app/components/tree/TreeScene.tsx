"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Float, Billboard, OrbitControls, useTexture, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import face from "../../assets/portrait.jpg";
import { treeNodes } from "../../content";

const GREENS = ["#5b8c5a", "#6faf6e", "#82c281", "#4a7a4a", "#9bd199", "#3f6f3f"];

// Deterministic PRNG — keeps useMemo pure and positions stable.
function makeRng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Canopy: a full, rounded low-poly crown -------------------------------
function Canopy({ count = 150 }: { count?: number }) {
  const leaves = useMemo(() => {
    const rng = makeRng(1337);
    const out: { pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number]; color: string }[] = [];
    const cy = 4.1; // crown center height
    for (let i = 0; i < count; i++) {
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const r = 1.5 + rng() * 1.7; // tighter cluster → reads as one mass
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = cy + r * Math.cos(phi) * 0.78;
      const z = r * Math.sin(phi) * Math.sin(theta);
      const s = 0.55 + rng() * 0.5; // bigger, overlapping leaves
      out.push({
        pos: [x, y, z],
        scale: [s, s * 0.72, s],
        rot: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI],
        color: GREENS[Math.floor(rng() * GREENS.length)],
      });
    }
    return out;
  }, [count]);

  return (
    <Instances limit={count} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial flatShading roughness={0.8} metalness={0} />
      {leaves.map((l, i) => (
        <Instance key={i} position={l.pos} rotation={l.rot} scale={l.scale} color={l.color} />
      ))}
    </Instances>
  );
}

// --- Trunk + branches ------------------------------------------------------
function Trunk() {
  const bark = "#6b4a2f";
  return (
    <group>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.62, 4.4, 12]} />
        <meshStandardMaterial color={bark} flatShading roughness={1} />
      </mesh>
      {[
        { p: [0.15, 2.6, 0.2], r: [0, 0, -0.7], l: 1.7 },
        { p: [-0.2, 2.9, -0.15], r: [0.35, 0, 0.85], l: 1.5 },
        { p: [0.1, 3.2, -0.25], r: [-0.45, 0, -0.35], l: 1.3 },
        { p: [-0.1, 2.3, 0.25], r: [0.5, 0.4, 0.4], l: 1.3 },
      ].map((b, i) => (
        <mesh key={i} position={b.p as [number, number, number]} rotation={b.r as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.09, 0.17, b.l, 8]} />
          <meshStandardMaterial color={bark} flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

// --- Face medallion — billboarded so it always faces the viewer -----------
function FaceMedallion() {
  const tex = useTexture(face.src);
  return (
    <Billboard position={[0, 4.7, 0]}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        {/* soft backing glow — drawn on top so the face is never buried */}
        <mesh position={[0, 0, -0.06]} renderOrder={998}>
          <circleGeometry args={[1.62, 48]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} depthTest={false} />
        </mesh>
        {/* glowing ring */}
        <mesh renderOrder={999}>
          <torusGeometry args={[1.34, 0.08, 16, 64]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.7} toneMapped={false} depthTest={false} />
        </mesh>
        {/* face disc */}
        <mesh renderOrder={1000}>
          <circleGeometry args={[1.25, 64]} />
          <meshBasicMaterial map={tex} toneMapped={false} depthTest={false} />
        </mesh>
      </Float>
    </Billboard>
  );
}

// --- Falling rain ----------------------------------------------------------
function Rain({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const rng = makeRng(7);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rng() - 0.5) * 20;
      positions[i * 3 + 1] = rng() * 16;
      positions[i * 3 + 2] = (rng() - 0.5) * 16;
      speeds[i] = 0.05 + rng() * 0.1;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i];
      if (arr[i * 3 + 1] < -1.5) arr[i * 3 + 1] = 15;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#cfeccf" size={0.05} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

// --- One interactive label: hover reveals a teaser, click scrolls ---------
function TreeLabel({
  node,
  position,
  onPick,
}: {
  node: (typeof treeNodes)[number];
  position: [number, number, number];
  onPick: (href: string) => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Html position={position} center zIndexRange={[30, 0]} className="select-none">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onPick(node.href)}
        className="tree-label group relative flex flex-col items-center"
        style={{ animationDelay: "0ms" }}
      >
        <span
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur transition-all duration-300 ${
            hover ? "scale-110 border-amber bg-amber text-[#0b1026]" : "border-white/15 bg-black/70 text-white"
          }`}
        >
          {node.label}
        </span>
        {/* teaser on hover */}
        <span
          className={`pointer-events-none absolute top-full mt-1.5 w-44 rounded-lg border border-white/10 bg-black/85 px-3 py-1.5 text-[11px] leading-snug text-muted backdrop-blur transition-all duration-200 ${
            hover ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          {node.teaser}
        </span>
      </button>
    </Html>
  );
}

function Labels({ onPick }: { onPick: (href: string) => void }) {
  const positions = useMemo(() => {
    // spread around the crown edge, raised, avoiding the trunk/bottom
    return treeNodes.map((_, i) => {
      const a = (i / treeNodes.length) * Math.PI * 2 - Math.PI / 2;
      const R = 4.7;
      const y = 3.4 + ((i % 3) - 1) * 1.0;
      return [Math.cos(a) * R, y, Math.sin(a) * R] as [number, number, number];
    });
  }, []);
  return (
    <>
      {treeNodes.map((n, i) => (
        <TreeLabel key={n.href} node={n} position={positions[i]} onPick={onPick} />
      ))}
    </>
  );
}

// --- Scene -----------------------------------------------------------------
function Scene({ onPick, mobile }: { onPick: (href: string) => void; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!group.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline();
    tl.from(group.current.scale, { x: 0, y: 0, z: 0, duration: 1.2, ease: "back.out(1.5)" });
    tl.from(camera.position, { y: -1, z: 16, duration: 1.5, ease: "power3.out" }, 0);
    return () => {
      tl.kill();
    };
  }, [camera]);

  useFrame((state) => {
    if (!group.current) return;
    const target = state.pointer.x * 0.25;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.025;
  });

  return (
    <>
      <hemisphereLight args={["#dfeffd", "#2c3a2c", 0.9]} />
      <directionalLight position={[6, 10, 5]} intensity={1.6} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#7c3aed" />
      <group ref={group}>
        <Suspense fallback={null}>
          <Trunk />
          <Canopy count={mobile ? 90 : 150} />
          <FaceMedallion />
          <Labels onPick={onPick} />
        </Suspense>
        <Rain count={mobile ? 140 : 280} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
          <circleGeometry args={[7, 48]} />
          <meshStandardMaterial color="#3f6b3e" roughness={1} transparent opacity={0.5} />
        </mesh>
      </group>
      <OrbitControls
        makeDefault
        target={[0, 3, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.95}
        autoRotate
        autoRotateSpeed={0.45}
      />
    </>
  );
}

export default function TreeScene({ onPick }: { onPick: (href: string) => void }) {
  const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  return (
    <Canvas
      camera={{ position: [0, 3.5, 13], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Scene onPick={onPick} mobile={mobile} />
    </Canvas>
  );
}
