"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HeroPreviewCard } from "@/app/lib/types/card";
import { useTexture } from "@react-three/drei";

type Props = {
  item: HeroPreviewCard;
  index: number;
  cardRefs: React.RefObject<(HTMLElement | null)[]>;
};

type BurnMaterialType = THREE.ShaderMaterial & {
  uniforms: {
    uProgress: { value: number };
    uSpread: { value: number };
  };
};

export default function BurnCard({ item, index, cardRefs }: Props) {
  const texture = useTexture("/reference/oldnews.jpg");

  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<BurnMaterialType | null>(null);
  const rotation = useRef(Math.random() * Math.PI * 2);

  const { size, viewport } = useThree();

  const glow = new THREE.Color(item.palette.glow);

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;

    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // --- POSITION
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const xNorm = centerX / size.width;
    const yNorm = centerY / size.height;

    const x = xNorm * viewport.width - viewport.width / 2;
    const y = -(yNorm * viewport.height - viewport.height / 2);

    meshRef.current.position.set(x, y, 0);

    // --- SCALE
    meshRef.current.scale.set(
      (rect.width / size.width) * viewport.width,
      (rect.height / size.height) * viewport.height,
      1
    );

    // --- SCROLL BURN
    const viewportHeight = window.innerHeight;

    const start = viewportHeight ;
    const end = viewportHeight * 0.2;

    const progress = (start - rect.top) / (start - end);
    const clamped = Math.max(0, Math.min(1, progress));
    
    // stagger
    const delay = 0.5;
    let finalProgress = (clamped - delay) / (1.0 - delay);
    finalProgress = Math.max(0, Math.min(1, finalProgress));

    matRef.current.uniforms.uProgress.value = finalProgress;

    // --- flicker
    matRef.current.uniforms.uSpread.value =
      0.25 + Math.sin(clock.elapsedTime * 6) * 0.03;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <burnMaterial ref={matRef} uColor={glow} uTexture={texture} transparent uRotation={rotation.current}/>
    </mesh>
  );
}