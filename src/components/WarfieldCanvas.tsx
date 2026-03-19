"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URLS = {
  tank: "https://static.poly.pizza/ba4513d6-e5c6-4a4b-a027-2eb7097d6516.glb",
  jet: "https://static.poly.pizza/19d58465-dafb-4df0-a3b8-b0500bd9ed4b.glb",
  heli: "https://static.poly.pizza/7899f9de-bd5d-452f-9248-a96d447ff133.glb",
  missile: "https://static.poly.pizza/bae77cff-57c6-4cb4-8ccf-7bc61a9b1d20.glb",
};

interface Vehicle {
  mesh: THREE.Group;
  type: keyof typeof MODEL_URLS;
  velocity: THREE.Vector3;
  rotSpeed: number;
  life: number;
  maxLife: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function WarfieldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ═══ SCENE SETUP ═══
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 120, 200);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ═══ LIGHTING ═══
    const ambientLight = new THREE.AmbientLight(0x334455, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff2d78, 0.8);
    dirLight.position.set(50, 100, 50);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x4d4dff, 0.5);
    dirLight2.position.set(-50, 80, -50);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00ff66, 0.6, 500);
    pointLight.position.set(0, 50, 0);
    scene.add(pointLight);

    // ═══ GROUND GRID ═══
    const gridHelper = new THREE.GridHelper(800, 40, 0x00ff66, 0x00ff66);
    gridHelper.position.y = -2;
    (gridHelper.material as THREE.Material).opacity = 0.06;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // ═══ RADAR SWEEP (flat disc on ground) ═══
    const radarGeo = new THREE.CircleGeometry(400, 64);
    const radarMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uAngle: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAngle;
        varying vec2 vUv;
        void main() {
          vec2 center = vUv - 0.5;
          float angle = atan(center.y, center.x);
          float diff = mod(angle - uAngle + 6.2832, 6.2832);
          float sweep = smoothstep(0.0, 0.5, diff) * (1.0 - smoothstep(0.5, 1.0, diff));
          float dist = length(center);
          float ring = smoothstep(0.48, 0.5, dist) * (1.0 - smoothstep(0.5, 0.52, dist));
          float alpha = sweep * 0.08 * (1.0 - dist * 2.0) + ring * 0.05;
          gl_FragColor = vec4(0.0, 1.0, 0.4, alpha);
        }
      `,
    });
    const radarMesh = new THREE.Mesh(radarGeo, radarMat);
    radarMesh.rotation.x = -Math.PI / 2;
    radarMesh.position.y = -1;
    scene.add(radarMesh);

    // ═══ EXPLOSION PARTICLES ═══
    const PARTICLE_COUNT = 600;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleVelocities = new Float32Array(PARTICLE_COUNT * 3);
    const particleLifetimes = new Float32Array(PARTICLE_COUNT);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3] = 0;
      particlePositions[i * 3 + 1] = -1000; // hidden below
      particlePositions[i * 3 + 2] = 0;
      particleLifetimes[i] = 0;
      // Random warm colors
      const colors = [[1, 0.18, 0.47], [1, 0.42, 0.21], [0.93, 1, 0], [0.3, 0.3, 1]];
      const c = colors[Math.floor(Math.random() * colors.length)];
      particleColors[i * 3] = c[0];
      particleColors[i * 3 + 1] = c[1];
      particleColors[i * 3 + 2] = c[2];
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ═══ STATE ═══
    const state = {
      scene, camera, renderer,
      vehicles: [] as Vehicle[],
      templates: new Map<string, THREE.Group>(),
      mouse: new THREE.Vector2(0, 0),
      radarAngle: 0,
      radarMesh,
      gridHelper,
      particles,
      particlePositions,
      particleVelocities,
      particleLifetimes,
      clock: new THREE.Clock(),
    };
    sceneRef.current = state;

    // ═══ LOAD MODELS ═══
    const loader = new GLTFLoader();
    const loadPromises = Object.entries(MODEL_URLS).map(([key, url]) =>
      new Promise<void>((resolve) => {
        loader.load(
          url,
          (gltf) => {
            const model = gltf.scene;
            // Normalize model size
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetSize = key === "tank" ? 14 : key === "jet" ? 12 : key === "heli" ? 12 : 6;
            const scale = targetSize / maxDim;
            model.scale.setScalar(scale);
            // Apply emissive tint
            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).emissive) {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.emissive = new THREE.Color(
                    key === "tank" ? 0xff2d78 : key === "jet" ? 0x4d4dff : key === "heli" ? 0x00ff66 : 0xeeff00
                  );
                  mat.emissiveIntensity = 0.15;
                  mesh.material = mat;
                }
              }
            });
            state.templates.set(key, model);
            resolve();
          },
          undefined,
          () => resolve() // fail silently
        );
      })
    );

    Promise.all(loadPromises).then(() => {
      // Spawn initial vehicles
      for (let i = 0; i < 10; i++) {
        spawnVehicle(state);
      }
    });

    // ═══ SPAWN VEHICLE ═══
    function spawnVehicle(s: typeof state) {
      const types = Object.keys(MODEL_URLS).filter((k) => k !== "missile") as (keyof typeof MODEL_URLS)[];
      const type = types[Math.floor(Math.random() * types.length)];
      const template = s.templates.get(type);
      if (!template) return;

      const mesh = template.clone();
      const spread = 350;

      // Spawn from edges
      const edge = Math.floor(Math.random() * 4);
      let x: number, z: number, vx: number, vz: number;
      const speed = type === "jet" ? rand(1.2, 2.0) : type === "heli" ? rand(0.3, 0.6) : rand(0.2, 0.5);

      if (edge === 0) { x = -spread; z = rand(-spread, spread); vx = speed; vz = rand(-0.3, 0.3); }
      else if (edge === 1) { x = spread; z = rand(-spread, spread); vx = -speed; vz = rand(-0.3, 0.3); }
      else if (edge === 2) { x = rand(-spread, spread); z = -spread; vx = rand(-0.3, 0.3); vz = speed; }
      else { x = rand(-spread, spread); z = spread; vx = rand(-0.3, 0.3); vz = -speed; }

      const y = type === "jet" ? rand(40, 80) : type === "heli" ? rand(20, 50) : 0;
      mesh.position.set(x, y, z);

      const velocity = new THREE.Vector3(vx, 0, vz);

      s.scene.add(mesh);
      s.vehicles.push({
        mesh, type, velocity,
        rotSpeed: type === "heli" ? 0.1 : 0,
        life: 0, maxLife: rand(300, 700),
      });
    }

    // ═══ SPAWN EXPLOSION ═══
    function spawnExplosion(s: typeof state, pos: THREE.Vector3) {
      let spawned = 0;
      for (let i = 0; i < PARTICLE_COUNT && spawned < 30; i++) {
        if (s.particleLifetimes[i] <= 0) {
          const angle = rand(0, Math.PI * 2);
          const elev = rand(-Math.PI / 3, Math.PI / 3);
          const speed = rand(1, 5);
          s.particlePositions[i * 3] = pos.x;
          s.particlePositions[i * 3 + 1] = pos.y;
          s.particlePositions[i * 3 + 2] = pos.z;
          s.particleVelocities[i * 3] = Math.cos(angle) * Math.cos(elev) * speed;
          s.particleVelocities[i * 3 + 1] = Math.sin(elev) * speed + 1;
          s.particleVelocities[i * 3 + 2] = Math.sin(angle) * Math.cos(elev) * speed;
          s.particleLifetimes[i] = rand(40, 80);
          spawned++;
        }
      }
    }

    // ═══ MOUSE ═══
    const onMouseMove = (e: MouseEvent) => {
      state.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      state.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ═══ RESIZE ═══
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ═══ ANIMATE ═══
    let running = true;
    let frame = 0;

    function animate() {
      if (!running) return;
      frameRef.current = requestAnimationFrame(animate);
      frame++;
      const s = sceneRef.current;
      if (!s) return;

      const dt = Math.min(s.clock.getDelta(), 0.05);

      // Camera gentle sway
      s.camera.position.x = Math.sin(frame * 0.001) * 30;
      s.camera.position.z = 200 + Math.cos(frame * 0.0007) * 20;
      s.camera.lookAt(0, 10, 0);

      // Radar sweep
      s.radarAngle += dt * 0.8;
      (s.radarMesh.material as THREE.ShaderMaterial).uniforms.uAngle.value = s.radarAngle;

      // Update vehicles
      for (let i = s.vehicles.length - 1; i >= 0; i--) {
        const v = s.vehicles[i];
        v.life++;
        v.mesh.position.add(v.velocity);

        // Face direction of movement
        const lookTarget = v.mesh.position.clone().add(v.velocity);
        v.mesh.lookAt(lookTarget);

        // Heli hover wobble
        if (v.type === "heli") {
          v.mesh.position.y += Math.sin(v.life * 0.05) * 0.1;
        }

        // Remove if too far or expired
        if (v.life > v.maxLife || v.mesh.position.length() > 500) {
          if (v.type !== "missile" && Math.random() < 0.3) {
            spawnExplosion(s, v.mesh.position.clone());
          }
          s.scene.remove(v.mesh);
          s.vehicles.splice(i, 1);
        }
      }

      // Spawn new vehicles
      const nonMissiles = s.vehicles.filter((v: Vehicle) => v.type !== "missile").length;
      if (nonMissiles < 12 && Math.random() < 0.02) {
        spawnVehicle(s);
      }

      // Random explosions at vehicle positions
      if (frame % 90 === 0 && s.vehicles.length > 0) {
        const target = s.vehicles[Math.floor(Math.random() * s.vehicles.length)];
        spawnExplosion(s, target.mesh.position.clone());
      }

      // Update particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (s.particleLifetimes[i] > 0) {
          s.particleLifetimes[i]--;
          s.particlePositions[i * 3] += s.particleVelocities[i * 3];
          s.particlePositions[i * 3 + 1] += s.particleVelocities[i * 3 + 1];
          s.particlePositions[i * 3 + 2] += s.particleVelocities[i * 3 + 2];
          s.particleVelocities[i * 3 + 1] -= 0.05; // gravity
          s.particleVelocities[i * 3] *= 0.98;
          s.particleVelocities[i * 3 + 2] *= 0.98;
        } else {
          s.particlePositions[i * 3 + 1] = -1000;
        }
      }
      s.particles.geometry.attributes.position.needsUpdate = true;

      // Point light color pulse
      pointLight.color.setHSL((frame * 0.002) % 1, 0.8, 0.5);
      pointLight.position.x = Math.sin(frame * 0.01) * 100;
      pointLight.position.z = Math.cos(frame * 0.01) * 100;

      s.renderer.render(s.scene, s.camera);
    }

    animate();

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
