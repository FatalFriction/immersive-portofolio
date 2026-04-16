"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "@/app/lib/shaders/extend";
import BurnImage from "./BurnImage";

type BurnCanvasProps = {
  image: string;
};

export default function BurnCanvas({ image }: BurnCanvasProps) {
  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 2] }}
    >
      <Suspense fallback={null}>
        <BurnImage url={image} />
      </Suspense>
    </Canvas>
  );
}