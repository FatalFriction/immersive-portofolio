import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const BurnMaterial = shaderMaterial(
  {
    uProgress: 0,
    uTexture: null,
    uColor: new THREE.Color("#E25822"),
    uResolution: new THREE.Vector2(1, 1),
    uSpread: 0.75,
    uRotation: 0,
  },

  // vertex
  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,

  // fragment
  `
  uniform float uProgress;
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uSpread;
  uniform float uRotation;

  varying vec2 vUv;

  float hash(vec2 p){
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
  }

  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0,0.0)), f.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p){
    float v = 0.0;
    v += noise(p) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  vec2 rotateUV(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);

    uv -= 0.5;
    uv = mat2(c, -s, s, c) * uv;
    uv += 0.5;

    return uv;
  }

  void main() {
    vec2 uv = vUv;
    vec2 texUv = rotateUV(vUv, uRotation);

    float burnLine = uv.y - uProgress - 0.35;

    float n = fbm(uv * 10.0);
    float texNoise = texture2D(uTexture, texUv * 2.5).r;

    float fiber = texture2D(uTexture, texUv * 3.0).r;

    float d = burnLine + n * uSpread * 0.6 + fiber * 0.12;

    float edge = smoothstep(-0.04, 0.04, d) - smoothstep(0.04, 0.12, d);

    float char1 = smoothstep(-0.15, -0.05, d);
    float char2 = smoothstep(-0.25, -0.1, d);

    vec3 tex = texture2D(uTexture, texUv).rgb;

    vec3 paper = tex;

    vec3 color = paper;

    color = mix(color, vec3(0.02), char2);
    color = mix(color, vec3(0.15), char1);

    color = mix(color, uColor * paper, 0.33);

    // fire edge
    color += edge * uColor * 2.2;
    color += edge * vec3(1.0, 0.8, 0.4) * 0.2;

    float alpha = smoothstep(0.0, 0.25, d);

    gl_FragColor = vec4(color, alpha);
  }
  `
);