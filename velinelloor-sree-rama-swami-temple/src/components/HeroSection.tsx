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

const textVariants: any = {
  enter:  { opacity: 0, y: 18, filter: "blur(6px)" },
  center: { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -14, filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" } },
};

export default function HeroSection() {
  const [isMalayalam, setIsMalayalam] = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);

  return (
    <section
      aria-label="Temple Hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* ── Subtle background texture ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 30%, var(--gold) 0%, transparent 55%), radial-gradient(circle at 78% 70%, var(--saffron) 0%, transparent 55%)",
        }}
      />

      {/* ── Top border accent ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), var(--saffron), var(--gold), transparent)",
        }}
      />

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
                style={{
                  fontFamily: "var(--font-ml)",
                  color: "var(--maroon)",
                  letterSpacing: "0.01em",
                  textShadow: "0 2px 16px rgba(123,34,48,0.08)",
                }}
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
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--maroon)",
                  textShadow: "0 2px 16px rgba(123,34,48,0.08)",
                }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sm tracking-widest uppercase"
          style={{ color: "var(--stone)", fontFamily: "var(--font-sans)" }}
        >
          {isMalayalam ? "Tap to read in English" : "Tap the title to read in Malayalam"}
        </motion.p>

        {/* ── Ornamental divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-xs"
          aria-hidden
        >
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)",
            }}
          />
          <div className="flex justify-center mt-3">
            <span className="text-xl" style={{ color: "var(--gold)" }}>✦</span>
          </div>
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base md:text-lg font-light max-w-md leading-relaxed"
          style={{ color: "var(--ink)", opacity: 0.55, fontFamily: "var(--font-serif)", letterSpacing: "0.01em" }}
        >
          A sacred sanctuary of devotion, heritage, and timeless grace.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
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
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 28px -4px rgba(212,160,23,0.70), 0 4px 12px rgba(0,0,0,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
              }}
            />
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--stone-light)" }}>
            Scroll
          </span>
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
