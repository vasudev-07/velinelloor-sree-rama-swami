"use client";

/**
 * RiverScrollProgress — Fixed right-side SVG river that draws itself
 * as the user scrolls, powered by Framer Motion useScroll + pathLength.
 *
 * Performance:
 *  • pathLength is a MotionValue — updates without re-rendering React tree
 *  • pointer-events: none — never blocks UI interaction
 *  • z-index 30 — above page content, below modals (z-50+)
 */

import { useScroll, useTransform, motion } from "framer-motion";

// ── River SVG path — sinusoidal meander across the full height ───
// ViewBox: 0 0 32 1000 (narrow, tall)
// The path weaves gently left → right → left three times
const RIVER_PATH =
  "M 16 0 " +
  "C 2 120, 30 260, 16 400 " +
  "S 2 560, 16 680 " +
  "S 30 820, 16 1000";

export default function RiverScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Clamp 0→1 and add a tiny spring feel via transform
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Glow intensity follows scroll — brighter as you get deeper into the page
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.35, 0.65, 0.9]);

  return (
    <div
      aria-hidden
      className="fixed right-2.5 top-0 bottom-0 z-30"
      style={{ width: 4, pointerEvents: "none" }}
    >
      {/* ── Dim background track ── */}
      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(6,182,212,0.10)" }} />

      {/* ── Animated progress river (hardware accelerated CSS) ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-600"
        style={{
          scaleY: scrollYProgress,
          transformOrigin: "top",
          opacity: glowOpacity,
          willChange: "transform",
          transform: "translateZ(0)",
          height: "100%",
          boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
        }}
      />
    </div>
  );
}
