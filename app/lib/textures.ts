/**
 * Global texture system for editorial design
 * SVG-based textures for film grain, halftone dots, and paper fibers
 * Lightweight, scalable, no external files needed
 */

// Film grain noise texture
export const filmGrainSVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)"/>
  </svg>
`)}`;

// Halftone dot pattern (editorial printing press aesthetic)
export const halftoneDotsSVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
    <circle cx="4" cy="4" r="0.8" fill="rgba(255,255,255,0.5)"/>
  </svg>
`)}`;

// Fine halftone dots for subtle texture
export const fineHalftoneSVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4">
    <circle cx="2" cy="2" r="0.4" fill="rgba(255,255,255,0.4)"/>
  </svg>
`)}`;

// Paper fiber texture (horizontal lines)
export const paperFiberSVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="2">
    <line x1="0" y1="1" x2="200" y2="1" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <line x1="20" y1="0.5" x2="80" y2="0.5" stroke="rgba(255,255,255,0.1)" stroke-width="0.3"/>
    <line x1="120" y1="1.5" x2="170" y2="1.5" stroke="rgba(255,255,255,0.08)" stroke-width="0.4"/>
  </svg>
`)}`;

// Micro noise for depth
export const microNoiseSVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">
    <filter id="microNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#microNoise)"/>
  </svg>
`)}`;

// Diagonal line texture for editorial accent
export const diagonalLinesSVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
    <line x1="0" y1="12" x2="12" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
  </svg>
`)}`;
