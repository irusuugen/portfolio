export const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fragmentShader = `
    uniform sampler2D map;
    uniform float imageAspect, planeAspect, glitchIntensity, time;
    uniform vec2 iResolution;
    varying vec2 vUv;

    float hash(float n) {
        return fract(sin(n) * 43758.5453123);
    }

    vec2 coverUV(vec2 uv) {
        if (planeAspect > imageAspect) {
            float s = imageAspect / planeAspect;
            uv.y = uv.y * s + (1.0 - s) * 0.5;
        } else {
            float s = planeAspect / imageAspect;
            uv.x = uv.x * s + (1.0 - s) * 0.5;
        }
        return uv;
    }

    void main() {
        vec2 uv = vUv;
        float gl = glitchIntensity;

        // Fixed missing + operator
        uv.x += (hash(floor(uv.y * 20.0 + time * 80.0) + time * 7.0) - 0.5) * 2.0 * gl * 0.15;
        uv.y += (hash(floor(time * 50.0)) - 0.5) * gl * 0.06;

        float rs = 0.001 * gl * 0.025;

        vec3 col;
        col.r = texture2D(map, coverUV(vec2(uv.x + rs, uv.y + rs))).r + 0.05;
        col.g = texture2D(map, coverUV(vec2(uv.x, uv.y - rs * 2.0))).g + 0.05;
        col.b = texture2D(map, coverUV(vec2(uv.x - rs * 2.0, uv.y))).b + 0.05;

        col = clamp(col * 0.93 + 0.07 * col * col, 0.0, 1.0);
        col *= vec3(pow(16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.12));
        col *= vec3(0.95, 1.05, 0.95) * 2.5;
        col *= vec3(0.6 + 0.4 * pow(clamp(0.35 + 0.35 * sin(uv.y * iResolution.y * 1.5), 0.0, 1.0), 1.2));
        
        // Fixed decimal vs comma error
        col *= 1.0 - 0.65 * vec3(clamp((mod(vUv.x * iResolution.x, 2.0) - 1.0) * 2.0, 0.0, 1.0));
        
        // Fixed logic: Add grain instead of multiplying by zero
        col += vec3(hash(uv.x * 100.0 + uv.y * 1000.0 + time * 300.0) * gl * 0.1);
   
        gl_FragColor = vec4(col, 1.0);
    }
`;
