"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const HistoryModal = dynamic(
  () => import("@/components/HistoryModal"),
  { ssr: false, loading: () => null }
);

const ENGLISH   = "Velinelloor Sree Rama Swami Temple";
const MALAYALAM = "വെളിനല്ലൂർ ശ്രീരാമസ്വാമി ക്ഷേത്രം";

const textVariants = {
  enter:  { opacity: 0, y: 18, filter: "blur(6px)" },
  center: { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
  exit:   { opacity: 0, y: -14, filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" } },
};

// ── Sun ray angles (8 rays fanning from top-left origin) ─────────
const RAY_ANGLES = [18, 30, 42, 54, 66, 78, 90, 104];

export default function HeroSection() {
  const [isMalayalam, setIsMalayalam] = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);

  return (
    <section
      aria-label="Temple Hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >

      {/* ══════════════════════════════════════════════════════════
          ANIMATED SVG BACKGROUND — reference: aerial temple photo
          Elements: golden sunrays · morning mist · teal river ·
                    lush green canopy edges · warm amber sky glow
          No image files. Pure SVG + CSS transforms (GPU only).
          ══════════════════════════════════════════════════════════ */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* ── Sky gradient (warm amber → ivory) ── */}
            <radialGradient id="skyGlow" cx="18%" cy="12%" r="70%">
              <stop offset="0%"   stopColor="#F5C842" stopOpacity="0.32" />
              <stop offset="35%"  stopColor="#E8A020" stopOpacity="0.14" />
              <stop offset="70%"  stopColor="#FFF8E7" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0" />
            </radialGradient>

            {/* ── River glow (teal shimmer, bottom-right) ── */}
            <radialGradient id="riverGlow" cx="82%" cy="88%" r="40%">
              <stop offset="0%"   stopColor="#4DD0C4" stopOpacity="0.18" />
              <stop offset="50%"  stopColor="#22B5A8" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#22B5A8" stopOpacity="0" />
            </radialGradient>

            {/* ── Foliage glow (green edges) ── */}
            <radialGradient id="foliageL" cx="0%" cy="100%" r="45%">
              <stop offset="0%"   stopColor="#2D6A2D" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2D6A2D" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="foliageR" cx="100%" cy="100%" r="40%">
              <stop offset="0%"   stopColor="#1D5C1D" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#1D5C1D" stopOpacity="0" />
            </radialGradient>

            {/* ── Ray gradient (bright at origin, fades out) ── */}
            <linearGradient id="rayGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#F5C842" stopOpacity="0.55" />
              <stop offset="40%"  stopColor="#F5C842" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
            </linearGradient>

            {/* ── Mist gradient ── */}
            <linearGradient id="mistGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#FFF8E7" stopOpacity="0" />
              <stop offset="30%"  stopColor="#FFF8E7" stopOpacity="0.45" />
              <stop offset="70%"  stopColor="#FFF8E7" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0" />
            </linearGradient>

            {/* ── River water shimmer ── */}
            <linearGradient id="riverWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4DD0C4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#007A70" stopOpacity="0.08" />
            </linearGradient>

            <filter id="softBlur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="mistBlur">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <filter id="riverBlur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* ── Base sky warm glow ── */}
          <rect width="1200" height="700" fill="url(#skyGlow)" />

          {/* ── Green foliage ambience (corners) ── */}
          <rect width="1200" height="700" fill="url(#foliageL)" />
          <rect width="1200" height="700" fill="url(#foliageR)" />

          {/* ── River teal glow (bottom-right) ── */}
          <rect width="1200" height="700" fill="url(#riverGlow)" />

          {/* ── Sun disc (at top-left origin) ── */}
          <circle cx="120" cy="80" r="55" fill="#F7D44C" opacity="0.18" filter="url(#softBlur)" />
          <circle cx="120" cy="80" r="28" fill="#F9E070" opacity="0.28" filter="url(#softBlur)" />

          {/* ── Sunrays (static SVG paths, animated via motion below) ── */}
          {RAY_ANGLES.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const len = 900 + i * 30;
            const width = 38 - i * 2;
            // Perpendicular offset for ray width
            const ox = Math.sin(rad) * width;
            const oy = -Math.cos(rad) * width;
            const ex = 120 + Math.cos(rad) * len;
            const ey = 80  + Math.sin(rad) * len;
            return (
              <polygon
                key={i}
                points={`${120 + ox},${80 + oy} ${ex + ox * 0.05},${ey + oy * 0.05} ${ex - ox * 0.05},${ey - oy * 0.05} ${120 - ox},${80 - oy}`}
                fill="url(#rayGrad)"
                opacity={0.55 - i * 0.04}
              />
            );
          })}

          {/* ── River surface (bottom-right diagonal band) ── */}
          <path
            d="M 820 420 C 880 400, 960 440, 1020 420 C 1080 400, 1140 450, 1200 440 L 1200 700 L 820 700 Z"
            fill="url(#riverWater)"
            filter="url(#riverBlur)"
          />
          {/* River ripple lines */}
          {[0,1,2,3].map((i) => (
            <path
              key={i}
              d={`M ${850 + i*20} ${500 + i*30} C ${950 + i*15} ${490 + i*28}, ${1050 + i*10} ${520 + i*25}, ${1180} ${505 + i*30}`}
              fill="none"
              stroke="#4DD0C4"
              strokeWidth="1.5"
              opacity={0.12 - i * 0.02}
            />
          ))}
        </svg>

        {/* ── ANIMATED LAYERS (Framer Motion — opacity/transform only) ── */}

        {/* Pulsing sun glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 220, height: 220,
            left: -40, top: -60,
            background: "radial-gradient(circle, rgba(245,200,60,0.30) 0%, rgba(245,200,60,0) 70%)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* Animated rays — slow pulse */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"
            className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {RAY_ANGLES.map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const len = 880 + i * 25;
              const width = 20 - i;
              const ox = Math.sin(rad) * width;
              const oy = -Math.cos(rad) * width;
              const ex = 120 + Math.cos(rad) * len;
              const ey = 80  + Math.sin(rad) * len;
              return (
                <polygon
                  key={i}
                  points={`${120+ox},${80+oy} ${ex+ox*0.04},${ey+oy*0.04} ${ex-ox*0.04},${ey-oy*0.04} ${120-ox},${80-oy}`}
                  fill="#F5C842"
                  opacity={0.10 - i * 0.006}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Mist band 1 — slow drift left to right */}
        <motion.div
          className="absolute"
          style={{
            left: "-30%", top: "28%",
            width: "85%", height: "140px",
            background: "linear-gradient(to right, transparent, rgba(255,248,231,0.42) 30%, rgba(255,248,231,0.30) 70%, transparent)",
            filter: "blur(22px)",
            borderRadius: "50%",
          }}
          animate={{ x: [0, 80, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        />

        {/* Mist band 2 — opposite drift, higher up */}
        <motion.div
          className="absolute"
          style={{
            right: "-20%", top: "15%",
            width: "70%", height: "110px",
            background: "linear-gradient(to left, transparent, rgba(255,248,231,0.35) 40%, rgba(255,248,231,0.22) 70%, transparent)",
            filter: "blur(28px)",
            borderRadius: "50%",
          }}
          animate={{ x: [0, -60, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut", delay: 3 }}
        />

        {/* Mist band 3 — thin wisp mid-page */}
        <motion.div
          className="absolute"
          style={{
            left: "10%", top: "48%",
            width: "60%", height: "60px",
            background: "linear-gradient(to right, transparent, rgba(255,248,231,0.28) 50%, transparent)",
            filter: "blur(18px)",
            borderRadius: "50%",
          }}
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 6 }}
        />

        {/* River shimmer pulse (bottom-right) */}
        <motion.div
          className="absolute"
          style={{
            right: 0, bottom: 0,
            width: "40%", height: "40%",
            background: "radial-gradient(ellipse at 80% 90%, rgba(45,200,190,0.14) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        {/* Green foliage shimmer — bottom-left */}
        <motion.div
          className="absolute bottom-0 left-0"
          style={{
            width: "35%", height: "45%",
            background: "radial-gradient(ellipse at 0% 100%, rgba(40,100,40,0.10) 0%, transparent 70%)",
            filter: "blur(16px)",
          }}
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
        />

        {/* Green foliage shimmer — bottom-right */}
        <motion.div
          className="absolute bottom-0 right-0"
          style={{
            width: "30%", height: "40%",
            background: "radial-gradient(ellipse at 100% 100%, rgba(30,90,30,0.09) 0%, transparent 70%)",
            filter: "blur(16px)",
          }}
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* ── Top border accent ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), var(--saffron), var(--gold), transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          CONTENT
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center gap-7 md:gap-10 text-center max-w-4xl mx-auto w-full">

        {/* ── Om symbol ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
          className="text-6xl select-none drop-shadow-sm"
          style={{ color: "var(--gold)", fontFamily: "var(--font-ml)", textShadow: "0 2px 12px rgba(201,150,42,0.25)" }}
          aria-hidden
        >
          ॐ
        </motion.div>

        {/* ── Animated title ── */}
        <div className="relative h-auto min-h-[5rem] sm:min-h-[7rem] md:min-h-[8.5rem] flex items-center justify-center w-full">
          <AnimatePresence mode="wait" initial={false}>
            {isMalayalam ? (
              <motion.h1
                key="malayalam"
                variants={textVariants}
                initial="enter" animate="center" exit="exit"
                className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug font-semibold cursor-pointer select-none px-2"
                style={{ fontFamily: "var(--font-ml)", color: "var(--maroon)",
                  letterSpacing: "0.01em", textShadow: "0 2px 16px rgba(123,34,48,0.08)" }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMalayalam(false)}
                title="Click to switch to English"
                lang="ml"
              >
                {MALAYALAM}
              </motion.h1>
            ) : (
              <motion.h1
                key="english"
                variants={textVariants}
                initial="enter" animate="center" exit="exit"
                className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-light tracking-wide cursor-pointer select-none px-2"
                style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)",
                  textShadow: "0 2px 16px rgba(123,34,48,0.08)" }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMalayalam(true)}
                title="Click to view in Malayalam"
                lang="en"
              >
                {ENGLISH}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* ── Toggle hint ── */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sm tracking-widest uppercase"
          style={{ color: "var(--stone)", fontFamily: "var(--font-sans)" }}
        >
          {isMalayalam ? "Tap to read in English" : "Tap the title to read in Malayalam"}
        </motion.p>

        {/* ── Ornamental divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-xs" aria-hidden
        >
          <div className="h-px w-full" style={{
            background: "linear-gradient(90deg, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)",
          }} />
          <div className="flex justify-center mt-3">
            <span className="text-xl" style={{ color: "var(--gold)" }}>✦</span>
          </div>
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base md:text-lg font-light max-w-md leading-relaxed"
          style={{ color: "var(--ink)", opacity: 0.55, fontFamily: "var(--font-serif)", letterSpacing: "0.01em" }}
        >
          A sacred sanctuary of devotion, heritage, and timeless grace.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.55, ease: "easeOut" }}
        >
          <motion.button
            onClick={() => setModalOpen(true)}
            aria-label="Open temple history"
            className="relative px-8 py-3.5 rounded-xl text-white text-sm tracking-widest uppercase font-medium overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #D4A017 0%, #B8860B 100%)",
              fontFamily: "var(--font-sans)",
              boxShadow: "0 4px 20px -4px rgba(212,160,23,0.55), 0 2px 8px rgba(0,0,0,0.10)",
              minHeight: "48px",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 28px -4px rgba(212,160,23,0.70), 0 4px 12px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span aria-hidden className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }} />
            <span className="relative flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
              </svg>
              Discover Our Legendary History
            </span>
          </motion.button>
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--stone-light)" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, var(--gold-light), transparent)" }}
          />
        </motion.div>
      </div>

      <HistoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
