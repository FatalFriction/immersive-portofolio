export const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform float uProgress;
uniform vec2 uResolution;
uniform sampler2D uTexture; // your image
uniform float uSpread;

varying vec2 vUv;

// --- noise ---
float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);

    return mix(
        mix(Hash(i), Hash(i + vec2(1.0, 0.0)), f.x),
        mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
}

void main() {
    vec2 uv = vUv;

    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

    // base dissolve line
    float burnLine = uv.y - uProgress;

    // noisy edge
    float n = fbm(centeredUv * 12.0);
    float d = burnLine + n * uSpread;

    // --- mask zones ---
    float burn = smoothstep(-0.05, 0.0, d);      // burned away
    float edge = smoothstep(0.0, 0.02, d) - smoothstep(0.02, 0.06, d); // flame edge
    float char = smoothstep(-0.08, -0.02, d);    // dark char

    vec4 tex = texture2D(uTexture, uv);

    // --- colors ---
    vec3 fireColor = vec3(1.0, 0.5, 0.1);
    vec3 hotColor = vec3(1.0, 0.9, 0.6);
    vec3 charColor = vec3(0.05, 0.05, 0.05);

    // mix original with charred paper
    vec3 color = mix(tex.rgb, charColor, char);

    // add glowing edge
    color += edge * fireColor * 2.0;
    color += edge * hotColor * 1.2;

    // alpha cutoff (real burn feel, not soft fade)
    float alpha = step(0.001, d);

    gl_FragColor = vec4(color, alpha);
}
`;