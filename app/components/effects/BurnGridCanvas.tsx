"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import "@/app/lib/shaders/extend";
import BurnCard from "../card/BurnCard";
import { HeroPreviewCard } from "@/app/content/homeTypes";

type Props = {
  items: HeroPreviewCard[];
  cardRefs: React.RefObject<(HTMLElement | null)[]>;
};

export default function BurnGridCanvas({ items, cardRefs }: Props) {

  const rectCache = useRef<(DOMRect | null)[]>([]);

  useEffect(() => {
    const updateRects = () => {
      rectCache.current = cardRefs.current.map((el) =>
        el ? el.getBoundingClientRect() : null
      );
    };

    updateRects();

    window.addEventListener("scroll", updateRects);
    window.addEventListener("resize", updateRects);

    return () => {
      window.removeEventListener("scroll", updateRects);
      window.removeEventListener("resize", updateRects);
    };
  }, []);

  return (
  <Canvas
    style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 50,
      pointerEvents: 'none',  // ← CSS level
    }}
    gl={{ alpha: true }}
    camera={{ position: [0, 0, 5] }}
    dpr={[1, 1.5]}
    onCreated={({ gl }) => {
      gl.domElement.style.pointerEvents = "none";  // ← DOM level, overrides R3F
      gl.domElement.style.position = "fixed";
    }}
  >
    <Suspense fallback={null}>
      {items.map((item, i) => (
        <BurnCard key={i} item={item} index={i} cardRefs={cardRefs} rectCache={rectCache} />
      ))}
    </Suspense>
  </Canvas>
);
}