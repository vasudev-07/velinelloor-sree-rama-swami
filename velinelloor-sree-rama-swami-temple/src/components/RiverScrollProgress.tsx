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
      style={{ width: 32, pointerEvents: "none" }}
    >
      <svg
        viewBox="0 0 32 1000"
        preserveAspectRatio="none"
        width="32"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          {/* River gradient — cyan at top, blue at bottom */}
          <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22d3ee" /> {/* cyan-400  */}
            <stop offset="50%"  stopColor="#06b6d4" /> {/* cyan-500  */}
            <stop offset="100%" stopColor="#2563eb" /> {/* blue-600  */}
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="riverGlow" x="-80%" y="-5%" width="260%" height="110%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Dim background track (full path, always visible) ── */}
        <path
          d={RIVER_PATH}
          fill="none"
          stroke="rgba(6,182,212,0.10)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />

        {/* ── Animated progress river ── */}
        <motion.path
          d={RIVER_PATH}
          fill="none"
          stroke="url(#riverGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#riverGlow)"
          style={{
            pathLength,
            opacity: glowOpacity,
          }}
        />

        {/* ── Glowing dot at the leading edge ── */}
        <motion.circle
          r="3.5"
          fill="#22d3ee"
          filter="url(#riverGlow)"
          style={{
            opacity: glowOpacity,
            // Position the dot at the scroll progress point along the path
            // Done via offsetDistance on a matching path
            offsetPath: `path('${RIVER_PATH}')`,
            offsetDistance: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          }}
        />
      </svg>
    </div>
  );
}
