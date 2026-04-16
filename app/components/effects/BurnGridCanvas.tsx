"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "@/app/lib/shaders/extend";
import BurnCard from "../card/BurnCard";
import { HeroPreviewCard } from "@/app/lib/types/card";

type Props = {
  items: HeroPreviewCard[];
  cardRefs: React.RefObject<(HTMLElement | null)[]>;
};

export default function BurnGridCanvas({ items, cardRefs }: Props) {
  return (
    <Canvas
    className="fixed inset-0 pointer-events-none"
    gl={{ alpha: true }}
    camera={{ position: [0, 0, 5] }}
  >
      <Suspense fallback={null}>
        {items.map((item, i) => (
            <BurnCard
                key={i}
                item={item}
                index={i}
                cardRefs={cardRefs}
            />
        ))}
      </Suspense>
    </Canvas>
  );
}