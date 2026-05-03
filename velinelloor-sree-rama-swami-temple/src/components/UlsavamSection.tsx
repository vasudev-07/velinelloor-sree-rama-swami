"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────
const ulsavamDays = [
  { day: 1,  label: "Day 1",  imagePath: "/day1.jpg"  },
  { day: 2,  label: "Day 2",  imagePath: "/day2.jpg"  },
  { day: 3,  label: "Day 3",  imagePath: "/day3.jpg"  },
  { day: 4,  label: "Day 4",  imagePath: "/day4.jpg"  },
  { day: 5,  label: "Day 5",  imagePath: "/day5.jpg"  },
  { day: 6,  label: "Day 6",  imagePath: "/day6.jpg"  },
  { day: 7,  label: "Day 7",  imagePath: "/day7.jpg"  },
  { day: 8,  label: "Day 8",  imagePath: "/day8.jpg"  },
  { day: 9,  label: "Day 9",  imagePath: "/day9.jpg"  },
  { day: 10, label: "Day 10", imagePath: "/day10.jpg" },
] as const;

type UlsavamDay = (typeof ulsavamDays)[number];

// ── Arrow icon ───────────────────────────────────────────────────
function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      {dir === "left"
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

// ── Expand icon ──────────────────────────────────────────────────
function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" className="w-4 h-4">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// FULL-SCREEN MODAL with prev / next navigation
// ─────────────────────────────────────────────────────────────────
function NoticeModal({
  day, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
  day: UlsavamDay;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft"  && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Reset zoom when day changes
  useEffect(() => { setZoomed(false); }, [day.day]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
      style={{ background: "rgba(10,5,2,0.90)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${day.label} Ulsavam Notice`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as any }}
        className="relative flex flex-col w-full max-w-xl sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px -12px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ background: "var(--maroon)" }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              key={day.day}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
              style={{ background: "var(--gold)", color: "var(--cream)", fontFamily: "var(--font-sans)" }}
            >
              {day.day}
            </motion.span>
            <motion.span
              key={`label-${day.day}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm tracking-widest uppercase"
              style={{ color: "var(--cream)", fontFamily: "var(--font-sans)", opacity: 0.9 }}
            >
              {day.label} — Ulsavam Notice
            </motion.span>
          </div>
          <div className="flex items-center gap-2">
            {/* Zoom toggle */}
            <button
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              title={zoomed ? "Zoom out" : "Zoom in"}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{ background: zoomed ? "var(--gold)" : "rgba(255,255,255,0.12)", color: "var(--cream)" }}
            >
              <ExpandIcon />
            </button>
            <button
              onClick={onClose}
              aria-label="Close notice"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:opacity-70 transition-opacity focus:outline-none"
              style={{ background: "rgba(255,255,255,0.12)", color: "var(--cream)" }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Image area ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            background: "#F0EDE8",
            aspectRatio: zoomed ? "1/1" : "3/4",
            transition: "aspect-ratio 0.4s ease",
            boxShadow: "0 16px 48px -8px rgba(10,5,0,0.40)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={day.imagePath}
                alt={`${day.label} official Ulsavam notice`}
                fill
                className={`transition-all duration-500 ${zoomed ? "object-cover" : "object-contain"}`}
                sizes="(max-width: 640px) 100vw, 576px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gold corner accents */}
          {["top-0 left-0 border-t-2 border-l-2 rounded-tl","bottom-0 right-0 border-b-2 border-r-2 rounded-br"].map((cls, i) => (
            <div key={i} aria-hidden className={`absolute w-8 h-8 pointer-events-none ${cls}`}
              style={{ borderColor: "var(--gold-light)", opacity: 0.5 }} />
          ))}
        </div>

        {/* ── Prev / Next navigation ── */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ background: "var(--cream-dark)", borderTop: "1px solid rgba(201,150,42,0.15)" }}
        >
          <motion.button
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label="Previous day"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs tracking-widest uppercase font-medium transition-all disabled:opacity-30"
            style={{ fontFamily: "var(--font-sans)", color: "var(--maroon)", background: "rgba(123,34,48,0.08)" }}
            whileHover={hasPrev ? { scale: 1.04, background: "rgba(123,34,48,0.16)" } : {}}
            whileTap={hasPrev ? { scale: 0.96 } : {}}
          >
            <ChevronIcon dir="left" /> Prev
          </motion.button>

          {/* Day dots */}
          <div className="flex items-center gap-1.5">
            {ulsavamDays.map((d) => (
              <motion.div
                key={d.day}
                className="rounded-full cursor-pointer"
                style={{
                  width: d.day === day.day ? 20 : 6,
                  height: 6,
                  background: d.day === day.day ? "var(--maroon)" : "rgba(123,34,48,0.20)",
                }}
                animate={{ width: d.day === day.day ? 20 : 6 }}
                transition={{ duration: 0.3 }}
                title={`Day ${d.day}`}
              />
            ))}
          </div>

          <motion.button
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next day"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs tracking-widest uppercase font-medium transition-all disabled:opacity-30"
            style={{ fontFamily: "var(--font-sans)", color: "var(--maroon)", background: "rgba(123,34,48,0.08)" }}
            whileHover={hasNext ? { scale: 1.04, background: "rgba(123,34,48,0.16)" } : {}}
            whileTap={hasNext ? { scale: 0.96 } : {}}
          >
            Next <ChevronIcon dir="right" />
          </motion.button>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-[10px] py-2 tracking-widest uppercase select-none"
          style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-sans)", background: "var(--cream-dark)" }}>
          ← → Arrow keys to navigate · Esc to close
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HORIZONTAL DAY SELECTOR STRIP
// ─────────────────────────────────────────────────────────────────
function DayStrip({ activeDay, onSelect }: {
  activeDay: number | null;
  onSelect: (idx: number) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);

  // Scroll active pill into view
  useEffect(() => {
    if (activeDay !== null && stripRef.current) {
      const btn = stripRef.current.querySelector(`[data-day="${activeDay}"]`) as HTMLElement;
      btn?.scrollIntoView({ inline: "center", behavior: "smooth" });
    }
  }, [activeDay]);

  return (
    <div
      ref={stripRef}
      className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:-mx-8 md:px-8"
      style={{ scrollbarWidth: "none" }}
    >
      {ulsavamDays.map((d, i) => {
        const isActive = d.day === activeDay;
        return (
          <motion.button
            key={d.day}
            data-day={d.day}
            onClick={() => onSelect(i)}
            aria-label={`Jump to ${d.label}`}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all"
            style={{
              fontFamily: "var(--font-sans)",
              background: isActive ? "var(--maroon)" : "rgba(123,34,48,0.08)",
              color: isActive ? "var(--cream)" : "var(--maroon)",
              border: `1px solid ${isActive ? "var(--maroon)" : "rgba(123,34,48,0.18)"}`,
              minHeight: 36,
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            animate={{
              background: isActive ? "var(--maroon)" : "rgba(123,34,48,0.08)",
              color: isActive ? "var(--cream)" : "var(--maroon)",
            }}
            transition={{ duration: 0.2 }}
          >
            <span style={{
              width: 18, height: 18, borderRadius: "50%", display: "inline-flex",
              alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 600,
              background: isActive ? "rgba(255,255,255,0.18)" : "var(--maroon)", color: "var(--cream)",
            }}>
              {d.day}
            </span>
            {d.label}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// NOTICE CARD (enriched hover states)
// ─────────────────────────────────────────────────────────────────
function NoticeCard({ day, label, imagePath, index, isHighlighted, onOpen }: {
  day: number; label: string; imagePath: string;
  index: number; isHighlighted: boolean; onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      id={`notice-card-${day}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as any, delay: index * 0.05 }}
      className="group flex flex-col w-full"
    >
      {/* ── Day badge row ── */}
      <div className="flex items-center gap-3 mb-4">
        <motion.span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0"
          animate={{
            background: isHighlighted ? "var(--gold)" : "var(--maroon)",
            scale: isHighlighted ? 1.12 : 1,
          }}
          style={{ color: "var(--cream)", fontFamily: "var(--font-sans)" }}
        >
          {day}
        </motion.span>
        <span
          className="text-base font-light tracking-wider uppercase"
          style={{ color: isHighlighted ? "var(--maroon)" : "var(--stone)", fontFamily: "var(--font-sans)" }}
        >
          {label}
        </span>
        <div className="flex-1 h-px"
          style={{ background: "linear-gradient(to right, var(--stone-light), transparent)" }} aria-hidden />
      </div>

      {/* ── Clickable image thumbnail ── */}
      <motion.button
        onClick={onOpen}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        aria-label={`View ${label} notice`}
        className="relative w-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        style={{
          borderRadius: 14,
          boxShadow: isHighlighted
            ? "0 12px 40px -8px rgba(123,34,48,0.30), 0 4px 12px rgba(123,34,48,0.12)"
            : "0 4px 24px -4px rgba(90,60,20,0.12), 0 1px 4px rgba(90,60,20,0.06)",
          border: `1.5px solid ${isHighlighted ? "rgba(123,34,48,0.40)" : "rgba(201,150,42,0.15)"}`,
          background: "var(--cream-dark)",
          aspectRatio: "3/4",
          display: "block",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        whileHover={{ scale: 1.018, y: -4 }}
        whileTap={{ scale: 0.984 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <Image
          src={imagePath}
          alt={`${label} Ulsavam notice thumbnail`}
          fill
          className="object-contain"
          style={{ transition: "transform 0.5s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}
          sizes="(max-width: 768px) 100vw, 520px"
        />

        {/* Gradient hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-3"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "linear-gradient(to top, rgba(20,8,4,0.75) 0%, rgba(20,8,4,0.1) 50%, transparent 100%)" }}
          aria-hidden
        >
          <span
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm tracking-widest uppercase font-medium"
            style={{ background: "var(--gold)", color: "var(--cream)", fontFamily: "var(--font-sans)",
              boxShadow: "0 4px 20px rgba(212,160,23,0.40)" }}
          >
            <ExpandIcon /> View Notice
          </span>
          <span className="text-[10px] tracking-widest uppercase text-white/50"
            style={{ fontFamily: "var(--font-sans)" }}>
            Click to expand
          </span>
        </motion.div>

        {/* Gold corner accents */}
        <div aria-hidden className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
          style={{ borderTop:"2px solid var(--gold-light)", borderLeft:"2px solid var(--gold-light)", borderTopLeftRadius:14, opacity:0.55 }} />
        <div aria-hidden className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
          style={{ borderBottom:"2px solid var(--gold-light)", borderRight:"2px solid var(--gold-light)", borderBottomRightRadius:14, opacity:0.55 }} />
      </motion.button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function UlsavamSection() {
  const [activeDayIdx, setActiveDayIdx] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const activeDay = activeDayIdx !== null ? ulsavamDays[activeDayIdx] : null;

  const closeModal  = useCallback(() => setActiveDayIdx(null), []);
  const prevDay     = useCallback(() => setActiveDayIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextDay     = useCallback(() => setActiveDayIdx((i) => (i !== null && i < 9 ? i + 1 : i)), []);

  // Scroll the corresponding card into view when strip pill clicked
  const handleStripSelect = (idx: number) => {
    const card = document.getElementById(`notice-card-${idx + 1}`);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <section
        id="ulsavam"
        aria-labelledby="ulsavam-heading"
        className="w-full py-16 md:py-24 px-4 md:px-8"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-2xl mx-auto">

          {/* ── Section Header ── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-10"
          >
            <span className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}>
              10-Day Festival
            </span>
            <h2 id="ulsavam-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-light mb-5"
              style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}>
              Ulsavam Notice Board
            </h2>
            <p className="text-base md:text-lg font-light max-w-md leading-relaxed mb-8"
              style={{ color: "var(--stone)", fontFamily: "var(--font-serif)" }}>
              Tap any day&apos;s notice to open it in full. Navigate with arrows or keyboard.
            </p>
            <div className="flex items-center gap-3 w-full max-w-xs" aria-hidden>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }} />
              <span style={{ color: "var(--gold)", fontSize: "1.1rem" }}>✦</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }} />
            </div>
          </motion.div>

          {/* ── Sticky Day Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="sticky top-16 z-20 py-3 mb-12"
            style={{ background: "var(--cream)", borderBottom: "1px solid rgba(201,150,42,0.12)" }}
          >
            <DayStrip
              activeDay={activeDayIdx !== null ? ulsavamDays[activeDayIdx].day : null}
              onSelect={handleStripSelect}
            />
          </motion.div>

          {/* ── Notice Cards ── */}
          <div className="flex flex-col gap-16">
            {ulsavamDays.map((item, index) => (
              <NoticeCard
                key={item.day}
                {...item}
                index={index}
                isHighlighted={activeDayIdx === index}
                onOpen={() => setActiveDayIdx(index)}
              />
            ))}
          </div>

          {/* ── Footer note ── */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center text-sm"
            style={{ color: "var(--stone-light)", fontFamily: "var(--font-sans)" }}
          >
            All timings are as per the official temple schedule. Subject to change.
          </motion.p>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {activeDay && (
          <NoticeModal
            key={activeDay.day}
            day={activeDay}
            onClose={closeModal}
            onPrev={prevDay}
            onNext={nextDay}
            hasPrev={activeDayIdx !== null && activeDayIdx > 0}
            hasNext={activeDayIdx !== null && activeDayIdx < 9}
          />
        )}
      </AnimatePresence>
    </>
  );
}
