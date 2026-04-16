"use client";

import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

type BurnImageProps = {
  url: string;
};

type BurnMaterialType = THREE.ShaderMaterial & {
  uniforms: {
    uProgress: { value: number };
    uSpread: { value: number };
  };
};

export default function BurnImage({ url }: BurnImageProps) {
  const matRef = useRef<BurnMaterialType | null>(null);
  const texture = useTexture(url);

  const handleEnter = () => {
    if (!matRef.current) return;

    gsap.to(matRef.current.uniforms.uProgress, {
      value: 1,
      duration: 1.2,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!matRef.current) return;

    gsap.to(matRef.current.uniforms.uProgress, {
      value: 0,
      duration: 0.6,
    });
  };

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    matRef.current.uniforms.uSpread.value =
      0.25 + Math.sin(clock.elapsedTime * 8) * 0.02;
  });

  return (
    <mesh onPointerEnter={handleEnter} onPointerLeave={handleLeave}>
      <planeGeometry args={[2, 1.5]} />
      {/* @ts-ignore */}
      <burnMaterial ref={matRef} uTexture={texture} transparent />
    </mesh>
  );
}