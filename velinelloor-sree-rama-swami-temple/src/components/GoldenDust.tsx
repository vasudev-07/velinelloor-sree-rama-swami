"use client";

/**
 * GoldenDust — Eternal ambient particle layer (65 particles).
 *
 * Performance:
 *  • Only x, y, opacity animated (GPU-composited — no layout thrash)
 *  • pointer-events: none — zero click interference
 *  • Deterministic seeded RNG — no hydration mismatch
 *  • Module-level constant — built once, never re-computed
 */

import { motion } from "framer-motion";
import { useMemo } from "react";

// ── Color palette ─────────────────────────────────────────────────
// 50% gold · 30% amber · 20% cream/white
const COLORS = [
  // Gold (50% — 10 entries out of 20)
  "rgba(212,160,23,0.65)",
  "rgba(212,160,23,0.50)",
  "rgba(212,160,23,0.40)",
  "rgba(201,150,42,0.55)",
  "rgba(201,150,42,0.42)",
  "rgba(212,160,23,0.72)",
  "rgba(184,134,11,0.48)",
  "rgba(212,160,23,0.35)",
  "rgba(201,150,42,0.60)",
  "rgba(184,134,11,0.38)",
  // Amber (30% — 6 entries)
  "rgba(251,191,36,0.70)",
  "rgba(251,191,36,0.55)",
  "rgba(245,158,11,0.62)",
  "rgba(251,191,36,0.45)",
  "rgba(245,158,11,0.50)",
  "rgba(251,191,36,0.38)",
  // Cream / soft white (20% — 4 entries)
  "rgba(255,251,235,0.55)",
  "rgba(254,243,199,0.45)",
  "rgba(255,255,255,0.38)",
  "rgba(250,244,230,0.42)",
];

// ── Deterministic seeded pseudo-random ───────────────────────────
function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ── Particle type ─────────────────────────────────────────────────
interface Particle {
  id: number;
  size: number;
  color: string;
  blur: boolean;
  initialX: number;
  initialY: number;
  moveX: [number, number];
  moveY: [number, number];
  opacity: [number, number];
  duration: number;
  delay: number;
}

const PARTICLE_COUNT = 65;

function buildParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const r = (o: number) => sr(i * 19 + o);

    // Size: 2–6 px
    const size     = 2 + r(1) * 4;
    // Colors with defined ratio
    const color    = COLORS[Math.floor(r(2) * COLORS.length)];
    // Cream particles (last 4 colours) get a 1px blur
    const colorIdx = Math.floor(r(2) * COLORS.length);
    const blur     = colorIdx >= 16;

    const initialX = r(3) * 100;   // 0–100 vw
    const initialY = r(4) * 100;   // 0–100 vh

    // Broader drift: 60–180 px on x, 50–160 px on y
    const rangeX   = 60  + r(5) * 120;
    const rangeY   = 50  + r(6) * 110;
    const dirX     = r(7)  > 0.5 ? 1 : -1;
    const dirY     = r(8)  > 0.5 ? 1 : -1;

    // Opacity: 0.30–0.80 base, fades to 0.15–0.45
    const opA      = 0.30 + r(9)  * 0.50;
    const opB      = 0.15 + r(10) * 0.30;

    // Duration: 12–30 s
    const duration = 12 + r(11) * 18;
    // Stagger start across negative values so they're mid-animation on load
    const delay    = r(12) * -20;

    return {
      id: i, size, color, blur, initialX, initialY,
      moveX: [0, dirX * rangeX],
      moveY: [0, dirY * rangeY],
      opacity: [opA, opB],
      duration, delay,
    };
  });
}

const PARTICLES = buildParticles(); // built once at module load

// ── Component ─────────────────────────────────────────────────────
export default function GoldenDust() {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 5, pointerEvents: "none" }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width:         p.size,
            height:        p.size,
            left:          `${p.initialX}%`,
            top:           `${p.initialY}%`,
            background:    p.color,
            filter:        p.blur ? "blur(1px)" : "none",
            pointerEvents: "none",
            willChange:    "transform, opacity",
          }}
          animate={{
            x:       p.moveX,
            y:       p.moveY,
            opacity: p.opacity,
          }}
          transition={{
            duration:   p.duration,
            delay:      p.delay,
            repeat:     Infinity,
            repeatType: "reverse",
            ease:       "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
