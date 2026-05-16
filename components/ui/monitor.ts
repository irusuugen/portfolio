import { useEffect, RefObject } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { fragmentShader, vertexShader } from "./shaders";

export function monitor(
  canvasRef: RefObject<HTMLElement>,
  listRef: RefObject<HTMLElement>,
  textRef: RefObject<HTMLElement>,
  defaultImg: string = "/projects/munch.png"
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const list = listRef.current;
    const textEl = textRef.current;
    if (!canvas || !list) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      24,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.15, 1);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    canvas.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 5));

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(15, 10, -5);
    scene.add(dirLight);

    const topLight = new THREE.PointLight(0xffffff, 5, 10);
    topLight.position.set(-5, -2.5, 0);
    topLight.decay = 0.3;
    scene.add(topLight);

    const monitorGroup = new THREE.Group();
    scene.add(monitorGroup);

    new GLTFLoader().load("/monitor.glb", (gltf: any) => {
      const model = gltf.scene;
      const center = new THREE.Box3()
        .setFromObject(model)
        .getCenter(new THREE.Vector3());
      model.position.sub(center);
      monitorGroup.add(model);
    });

    function createScreenGeometry(w: number, h: number, r: number) {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);

      const geometry = new THREE.ShapeGeometry(shape);
      const positions = geometry.attributes.position;
      const uvs = new Float32Array(positions.count * 2);

      for (let i = 0; i < positions.count; i++) {
        uvs[i * 2] = (positions.getX(i) - x) / w;
        uvs[i * 2 + 1] = (positions.getY(i) - y) / h;
      }

      geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      return geometry;
    }

    const textureLoader = new THREE.TextureLoader();
    const textureCache: Record<string, THREE.Texture> = {};
    let displayMaterial: THREE.ShaderMaterial;

    function loadTexture(src: string) {
      if (textureCache[src]) return textureCache[src];
      const texture = textureLoader.load(src, () => {
        if (displayMaterial) {
          displayMaterial.uniforms.imageAspect.value =
            texture.image.width / texture.image.height;
        }
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureCache[src] = texture;
      return texture;
    }

    const defaultTexture = loadTexture(defaultImg);

    displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: defaultTexture },
        imageAspect: { value: 1 },
        planeAspect: { value: 0.28 / 0.235 },
        iResolution: { value: new THREE.Vector2(512, 512) },
        glitchIntensity: { value: 0.0 },
        time: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    });

    const displayPlane = new THREE.Mesh(
      createScreenGeometry(1, 1, 0.03),
      displayMaterial
    );
    displayPlane.scale.set(0.28, 0.235, 1);
    displayPlane.position.set(-0.008, 0.005, 0.041);
    displayPlane.rotation.set(-0.18, 0, 0);
    monitorGroup.add(displayPlane);

    const mouse = { x: 0, y: 0 };
    const lerpedMouse = { x: 0, y: 0 };
    const timer = new THREE.Timer();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      timer.update();
      displayMaterial.uniforms.time.value = timer.getElapsed();
      lerpedMouse.x = gsap.utils.interpolate(lerpedMouse.x, mouse.x, 0.05);
      lerpedMouse.y = gsap.utils.interpolate(lerpedMouse.y, mouse.y, 0.05);
      monitorGroup.rotation.x = lerpedMouse.y * 0.1;
      monitorGroup.rotation.y = lerpedMouse.x * 0.2;
      renderer.render(scene, camera);
    }

    animate();
    camera.position.z = Math.max(1, 768 / canvas.clientWidth);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / innerWidth - 0.5) * 4;
      mouse.y = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const glitchState = { intensity: 0 };
    let glitchAnimation: gsap.core.Tween | null = null;

    function setDisplayImage(src: string, text: string = "") {
      const texture = loadTexture(src);
      displayMaterial.uniforms.map.value = texture;

      if (textEl) {
        textEl.textContent = text;
        textEl.style.opacity = text ? "1" : "0";
      }

      if (glitchAnimation) glitchAnimation.kill();
      glitchState.intensity = 1.0;

      glitchAnimation = gsap.to(glitchState, {
        intensity: 0,
        duration: 0.75,
        ease: "power3.out",
        onUpdate() {
          displayMaterial.uniforms.glitchIntensity.value =
            glitchState.intensity;
        },
      });

      const updateAspect = () => {
        displayMaterial.uniforms.imageAspect.value =
          texture.image.width / texture.image.height;
      };
      texture.image
        ? updateAspect()
        : texture.addEventListener("load", updateAspect);
    }

    const listItems = list.querySelectorAll("li");
    listItems.forEach((li) => {
      li.addEventListener("mouseenter", () => {
        const img = li.getAttribute("data-img");
        const text = li.getAttribute("data-text") ?? "";
        if (img) setDisplayImage(img, text);
      });
    });

    const handleMouseLeave = () => {
      setDisplayImage(defaultImg);
      if (textEl) textEl.style.opacity = "0";
    };
    list.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      list.removeEventListener("mouseleave", handleMouseLeave);
      listItems.forEach((li) => li.replaceWith(li.cloneNode(true)));
      renderer.dispose();
      renderer.domElement.remove();
      displayMaterial.dispose();
      Object.values(textureCache).forEach((t) => t.dispose());
    };
  }, [canvasRef, listRef, textRef]);
}
