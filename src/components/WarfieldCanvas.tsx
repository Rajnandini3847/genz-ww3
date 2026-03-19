"use client";

import { useRef, useEffect, useCallback } from "react";

// ═══ TYPES ═══
type VehicleType = "tank" | "jet" | "heli" | "drone" | "ship" | "missile";

interface Vec2 { x: number; y: number; }

interface Vehicle {
  type: VehicleType;
  pos: Vec2;
  vel: Vec2;
  size: number;
  angle: number;
  life: number;
  maxLife: number;
  trail: Vec2[];
  color: string;
}

interface Particle {
  pos: Vec2;
  vel: Vec2;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Explosion {
  pos: Vec2;
  life: number;
  maxLife: number;
  particles: Particle[];
}

// ═══ COLORS ═══
const COLORS = {
  radar: "#00FF6640",
  radarLine: "#00FF6618",
  tank: "#ff2d78",
  jet: "#4d4dff",
  heli: "#00ff66",
  drone: "#eeff00",
  ship: "#ff6b35",
  missile: "#ff4444",
  grid: "#ffffff06",
  explosion: ["#ff2d78", "#ff6b35", "#eeff00", "#ffffff", "#4d4dff"],
};

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function dist(a: Vec2, b: Vec2) { return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2); }

export default function WarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vehiclesRef = useRef<Vehicle[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);
  const mouseRef = useRef<Vec2>({ x: -1000, y: -1000 });
  const radarAngleRef = useRef(0);
  const frameRef = useRef(0);
  const dimRef = useRef({ w: 0, h: 0 });

  const spawnVehicle = useCallback((w: number, h: number): Vehicle => {
    const types: VehicleType[] = ["tank", "tank", "jet", "jet", "heli", "drone", "drone", "ship"];
    const type = types[Math.floor(Math.random() * types.length)];
    const edge = Math.floor(Math.random() * 4);
    let pos: Vec2, vel: Vec2, size: number;

    switch (type) {
      case "tank":
        size = rand(6, 10);
        pos = edge < 2 ? { x: edge === 0 ? -20 : w + 20, y: rand(h * 0.5, h) } : { x: rand(0, w), y: edge === 2 ? -20 : h + 20 };
        vel = { x: rand(-0.4, 0.4), y: rand(-0.1, 0.1) };
        if (pos.x < 0) vel.x = Math.abs(vel.x) + 0.2;
        if (pos.x > w) vel.x = -Math.abs(vel.x) - 0.2;
        break;
      case "jet":
        size = rand(5, 8);
        pos = { x: edge % 2 === 0 ? -30 : w + 30, y: rand(0, h * 0.4) };
        vel = { x: pos.x < 0 ? rand(2, 4) : rand(-4, -2), y: rand(-0.5, 0.5) };
        break;
      case "heli":
        size = rand(7, 11);
        pos = { x: rand(0, w), y: rand(-30, -10) };
        vel = { x: rand(-0.5, 0.5), y: rand(0.2, 0.6) };
        break;
      case "drone":
        size = rand(3, 5);
        pos = { x: rand(0, w), y: rand(0, h) };
        vel = { x: rand(-1, 1), y: rand(-1, 1) };
        break;
      case "ship":
        size = rand(10, 16);
        pos = { x: edge % 2 === 0 ? -40 : w + 40, y: rand(h * 0.85, h) };
        vel = { x: pos.x < 0 ? rand(0.15, 0.35) : rand(-0.35, -0.15), y: 0 };
        break;
      default:
        size = 5;
        pos = { x: 0, y: 0 };
        vel = { x: 1, y: 0 };
    }

    return {
      type, pos, vel, size,
      angle: Math.atan2(vel.y, vel.x),
      life: 0, maxLife: rand(400, 1200),
      trail: [],
      color: COLORS[type],
    };
  }, []);

  const spawnExplosion = useCallback((pos: Vec2, intensity: number) => {
    const particles: Particle[] = [];
    const count = Math.floor(intensity * 12);
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.5, 3) * intensity;
      particles.push({
        pos: { ...pos },
        vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        life: 0, maxLife: rand(20, 50),
        size: rand(1, 3),
        color: COLORS.explosion[Math.floor(Math.random() * COLORS.explosion.length)],
      });
    }
    explosionsRef.current.push({ pos: { ...pos }, life: 0, maxLife: 60, particles });
  }, []);

  const fireMissile = useCallback((from: Vehicle, to: Vehicle) => {
    const dx = to.pos.x - from.pos.x;
    const dy = to.pos.y - from.pos.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const speed = 2.5;
    vehiclesRef.current.push({
      type: "missile",
      pos: { ...from.pos },
      vel: { x: (dx / d) * speed, y: (dy / d) * speed },
      size: 2,
      angle: Math.atan2(dy, dx),
      life: 0, maxLife: d / speed + 20,
      trail: [],
      color: COLORS.missile,
    });
  }, []);

  // ═══ DRAW FUNCTIONS ═══
  const drawTank = (ctx: CanvasRenderingContext2D, v: Vehicle) => {
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);
    ctx.rotate(v.angle);
    // Body
    ctx.fillStyle = v.color + "80";
    ctx.fillRect(-v.size, -v.size * 0.4, v.size * 2, v.size * 0.8);
    // Turret
    ctx.fillStyle = v.color + "cc";
    ctx.fillRect(-v.size * 0.3, -v.size * 0.25, v.size * 0.6, v.size * 0.5);
    // Barrel
    ctx.fillStyle = v.color;
    ctx.fillRect(v.size * 0.3, -v.size * 0.08, v.size * 0.8, v.size * 0.16);
    // Treads
    ctx.strokeStyle = v.color + "40";
    ctx.lineWidth = 1;
    ctx.strokeRect(-v.size, -v.size * 0.5, v.size * 2, v.size);
    ctx.restore();
  };

  const drawJet = (ctx: CanvasRenderingContext2D, v: Vehicle) => {
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);
    ctx.rotate(v.angle);
    ctx.fillStyle = v.color + "90";
    // Fuselage
    ctx.beginPath();
    ctx.moveTo(v.size * 1.2, 0);
    ctx.lineTo(-v.size * 0.8, -v.size * 0.15);
    ctx.lineTo(-v.size * 0.8, v.size * 0.15);
    ctx.closePath();
    ctx.fill();
    // Wings
    ctx.fillStyle = v.color + "60";
    ctx.beginPath();
    ctx.moveTo(v.size * 0.1, 0);
    ctx.lineTo(-v.size * 0.4, -v.size * 0.8);
    ctx.lineTo(-v.size * 0.6, -v.size * 0.6);
    ctx.lineTo(-v.size * 0.3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(v.size * 0.1, 0);
    ctx.lineTo(-v.size * 0.4, v.size * 0.8);
    ctx.lineTo(-v.size * 0.6, v.size * 0.6);
    ctx.lineTo(-v.size * 0.3, 0);
    ctx.closePath();
    ctx.fill();
    // Exhaust glow
    ctx.fillStyle = v.color + "30";
    ctx.beginPath();
    ctx.arc(-v.size, 0, v.size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawHeli = (ctx: CanvasRenderingContext2D, v: Vehicle) => {
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);
    // Body
    ctx.fillStyle = v.color + "70";
    ctx.beginPath();
    ctx.ellipse(0, 0, v.size * 0.6, v.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Tail
    ctx.fillStyle = v.color + "50";
    ctx.fillRect(-v.size * 0.8, -v.size * 0.06, v.size * 0.7, v.size * 0.12);
    // Rotor (spinning)
    const rotorAngle = v.life * 0.3;
    ctx.strokeStyle = v.color + "90";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(rotorAngle) * v.size, Math.sin(rotorAngle) * v.size * 0.15);
    ctx.lineTo(Math.cos(rotorAngle + Math.PI) * v.size, Math.sin(rotorAngle + Math.PI) * v.size * 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(Math.cos(rotorAngle + Math.PI / 2) * v.size * 0.8, Math.sin(rotorAngle + Math.PI / 2) * v.size * 0.12);
    ctx.lineTo(Math.cos(rotorAngle + Math.PI * 1.5) * v.size * 0.8, Math.sin(rotorAngle + Math.PI * 1.5) * v.size * 0.12);
    ctx.stroke();
    ctx.restore();
  };

  const drawDrone = (ctx: CanvasRenderingContext2D, v: Vehicle) => {
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);
    // X frame
    ctx.strokeStyle = v.color + "80";
    ctx.lineWidth = 1;
    const r = v.size;
    ctx.beginPath();
    ctx.moveTo(-r, -r); ctx.lineTo(r, r);
    ctx.moveTo(r, -r); ctx.lineTo(-r, r);
    ctx.stroke();
    // Rotors
    const pulse = Math.sin(v.life * 0.5) * 0.3 + 0.7;
    ctx.fillStyle = v.color + Math.floor(pulse * 80).toString(16).padStart(2, "0");
    for (const [dx, dy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) {
      ctx.beginPath();
      ctx.arc(dx, dy, v.size * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
    // Center light
    ctx.fillStyle = v.color;
    ctx.beginPath();
    ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawShip = (ctx: CanvasRenderingContext2D, v: Vehicle) => {
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);
    ctx.rotate(v.angle);
    ctx.fillStyle = v.color + "60";
    // Hull
    ctx.beginPath();
    ctx.moveTo(v.size, 0);
    ctx.lineTo(v.size * 0.6, -v.size * 0.25);
    ctx.lineTo(-v.size * 0.8, -v.size * 0.2);
    ctx.lineTo(-v.size, 0);
    ctx.lineTo(-v.size * 0.8, v.size * 0.2);
    ctx.lineTo(v.size * 0.6, v.size * 0.25);
    ctx.closePath();
    ctx.fill();
    // Superstructure
    ctx.fillStyle = v.color + "90";
    ctx.fillRect(-v.size * 0.2, -v.size * 0.35, v.size * 0.5, v.size * 0.15);
    // Antenna
    ctx.strokeStyle = v.color + "70";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -v.size * 0.35);
    ctx.lineTo(0, -v.size * 0.55);
    ctx.stroke();
    ctx.restore();
  };

  const drawMissile = (ctx: CanvasRenderingContext2D, v: Vehicle) => {
    // Trail
    for (let i = 0; i < v.trail.length; i++) {
      const alpha = (i / v.trail.length) * 0.4;
      ctx.fillStyle = `rgba(255,68,68,${alpha})`;
      ctx.beginPath();
      ctx.arc(v.trail[i].x, v.trail[i].y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    // Head
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);
    ctx.rotate(v.angle);
    ctx.fillStyle = "#ff4444";
    ctx.beginPath();
    ctx.moveTo(3, 0);
    ctx.lineTo(-2, -1.5);
    ctx.lineTo(-2, 1.5);
    ctx.closePath();
    ctx.fill();
    // Glow
    ctx.fillStyle = "#ff444440";
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      dimRef.current = { w, h };
    };

    resize();
    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(document.body);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Spawn initial vehicles
    const { w, h } = dimRef.current;
    for (let i = 0; i < 18; i++) {
      const v = spawnVehicle(w, h);
      v.pos = { x: rand(0, w), y: rand(0, h) };
      vehiclesRef.current.push(v);
    }

    let running = true;

    const frame = () => {
      if (!running) return;
      const { w, h } = dimRef.current;
      ctx.clearRect(0, 0, w, h);

      // ─── RADAR SWEEP ───
      radarAngleRef.current += 0.005;
      const cx = w / 2;
      const cy = h * 0.35;
      const radarR = Math.max(w, h);
      const ra = radarAngleRef.current;

      ctx.save();
      ctx.globalAlpha = 0.15;
      const grad = ctx.createConicGradient(ra, cx, cy);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.03, "#00ff6612");
      grad.addColorStop(0.06, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radarR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Radar line
      ctx.strokeStyle = COLORS.radarLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ra) * radarR, cy + Math.sin(ra) * radarR);
      ctx.stroke();

      // ─── GRID ───
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 0.5;
      const gs = 80;
      for (let x = 0; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // ─── UPDATE + DRAW VEHICLES ───
      const vehicles = vehiclesRef.current;
      const mouse = mouseRef.current;

      for (let i = vehicles.length - 1; i >= 0; i--) {
        const v = vehicles[i];
        v.life++;

        // Mouse repulsion
        const md = dist(v.pos, mouse);
        if (md < 120 && v.type !== "missile") {
          const force = (120 - md) / 120 * 0.8;
          const dx = v.pos.x - mouse.x;
          const dy = v.pos.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          v.vel.x += (dx / d) * force;
          v.vel.y += (dy / d) * force;
        }

        // Drone wobble
        if (v.type === "drone") {
          v.vel.x += rand(-0.1, 0.1);
          v.vel.y += rand(-0.1, 0.1);
          v.vel.x *= 0.98;
          v.vel.y *= 0.98;
        }

        // Speed limits
        const maxSpeed = v.type === "jet" ? 5 : v.type === "missile" ? 3 : v.type === "drone" ? 1.5 : 1;
        const speed = Math.sqrt(v.vel.x ** 2 + v.vel.y ** 2);
        if (speed > maxSpeed) {
          v.vel.x = (v.vel.x / speed) * maxSpeed;
          v.vel.y = (v.vel.y / speed) * maxSpeed;
        }

        v.pos.x += v.vel.x;
        v.pos.y += v.vel.y;
        v.angle = Math.atan2(v.vel.y, v.vel.x);

        // Trail for missiles and jets
        if (v.type === "missile" || v.type === "jet") {
          v.trail.push({ ...v.pos });
          if (v.trail.length > (v.type === "missile" ? 20 : 8)) v.trail.shift();
        }

        // Remove if off screen or expired
        const margin = 60;
        if (v.pos.x < -margin || v.pos.x > w + margin || v.pos.y < -margin || v.pos.y > h + margin || v.life > v.maxLife) {
          if (v.type === "missile") {
            spawnExplosion(v.pos, 0.6);
          }
          vehicles.splice(i, 1);
          continue;
        }

        // Draw
        switch (v.type) {
          case "tank": drawTank(ctx, v); break;
          case "jet": drawJet(ctx, v); break;
          case "heli": drawHeli(ctx, v); break;
          case "drone": drawDrone(ctx, v); break;
          case "ship": drawShip(ctx, v); break;
          case "missile": drawMissile(ctx, v); break;
        }
      }

      // ─── MISSILE FIRING ───
      if (Math.random() < 0.008 && vehicles.length > 3) {
        const shooters = vehicles.filter((v) => v.type !== "missile" && v.type !== "drone");
        const targets = vehicles.filter((v) => v.type !== "missile");
        if (shooters.length > 0 && targets.length > 1) {
          const from = shooters[Math.floor(Math.random() * shooters.length)];
          const to = targets.filter((t) => t !== from)[Math.floor(Math.random() * (targets.length - 1))];
          if (to && dist(from.pos, to.pos) < 400) {
            fireMissile(from, to);
          }
        }
      }

      // ─── EXPLOSIONS ───
      const explosions = explosionsRef.current;
      for (let i = explosions.length - 1; i >= 0; i--) {
        const ex = explosions[i];
        ex.life++;
        if (ex.life > ex.maxLife) { explosions.splice(i, 1); continue; }

        // Ring
        const ringProgress = ex.life / ex.maxLife;
        ctx.strokeStyle = `rgba(255,45,120,${(1 - ringProgress) * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ex.pos.x, ex.pos.y, ringProgress * 30, 0, Math.PI * 2);
        ctx.stroke();

        // Particles
        for (let j = ex.particles.length - 1; j >= 0; j--) {
          const p = ex.particles[j];
          p.life++;
          if (p.life > p.maxLife) { ex.particles.splice(j, 1); continue; }
          p.pos.x += p.vel.x;
          p.pos.y += p.vel.y;
          p.vel.x *= 0.96;
          p.vel.y *= 0.96;
          const alpha = 1 - p.life / p.maxLife;
          ctx.fillStyle = p.color + Math.floor(alpha * 200).toString(16).padStart(2, "0");
          ctx.beginPath();
          ctx.arc(p.pos.x, p.pos.y, p.size * (1 - p.life / p.maxLife * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ─── SPAWN NEW VEHICLES ───
      if (vehicles.filter((v) => v.type !== "missile").length < 20 && Math.random() < 0.02) {
        vehicles.push(spawnVehicle(w, h));
      }

      frameRef.current = requestAnimationFrame(frame);
    };

    frameRef.current = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouse);
      resizeObs.disconnect();
    };
  }, [spawnVehicle, spawnExplosion, fireMissile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
