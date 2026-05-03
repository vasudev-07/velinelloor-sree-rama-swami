"use client";

/**
 * HistoryModal — Glassmorphism cinematic redesign.
 *
 * Performance: LazyMotion + domAnimation + m.div (smaller FM bundle)
 * Design:      Frosted glass panel, gold gradient heading,
 *              staggered paragraph reveal, spinning X close button.
 */

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

// ── Content ───────────────────────────────────────────────────────
const SECTIONS = [
  {
    heading: "The Sacred Land",
    paragraphs: [
      "The Velinelloor Sri Ramaswamy Temple is the second major Sri Rama temple in Kerala, with the Itthikara river flowing on three sides. This holy land, touched by the feet of Lord Sri Rama himself, bears witness to many epics of the Ramayana.",
      "The main deity within the copper-clad circular sanctum sanctorum is Lord Rama, facing east. Lakshmana dwells in anantabhava, facing west. Under the stewardship of the Travancore Devaswom Board, the temple observes four daily pujas and nitya shiveli.",
    ],
  },
  {
    heading: "Architecture & Ritual",
    paragraphs: [
      "The temple is complete with Anakottil, Balikalpura, Nalambalam, Namaskara Mandapam, Valiyambalam, and Thidappalli. As per ancient belief, the temple initially enshrined only Indilayappan and Bhagavathi. Sri Rama was consecrated as the main deity by Brahmins who journeyed from the north.",
      "A unique ritual known as Nayuveyappu is offered exclusively to Indilayappan — a practice found nowhere else in Kerala.",
    ],
  },
  {
    heading: "Legends of the Land",
    paragraphs: [
      "The surrounding landscape is woven with the threads of Ramayana. The place where Sugreevan was born is called 'Ugramkunn'; where Bali lived, 'Balyankunn'; where the great battle with Jatayu took place, 'Poredam'; and where the wounded Jatayu fell, 'Chadayamangalam'.",
      "It is believed that Sri Rama and Lakshmana, searching for Mata Sita, met Sugriva at the very ground on which the present Velinelloor temple stands. Sugriva had sought refuge here, hiding from the wrath of his brother Bali.",
    ],
  },
  {
    heading: "The Pact & the Trial",
    paragraphs: [
      "A pact was struck — Sugriva and his army would aid Sri Rama in finding Mata Sita, and in return, Sri Rama would slay Bali. Yet Sugriva harboured a secret doubt: knowing that whoever fought Bali would transfer their strength to him, how could Sri Rama prevail?",
      "Sugriva put forth a divine test: Sri Rama must cut down seven Sala trees with a single arrow. These seven trees stood atop a nearby, ancient whirlpool in the Ithikkara River.",
    ],
  },
  {
    heading: "The Arrow of Lord Rama",
    paragraphs: [
      "Sri Rama gazed upon the whirlpool and perceived the truth — the seven trees grew upon the back of a colossal, coiled serpent. Their roots intertwined around the serpent's body, causing them to appear in a circle.",
      "He drew his bow and poked the serpent with a single arrow. Startled by the pain, the great serpent rose erect. As it uncoiled, the seven Sala trees fell into a perfect line. With one supreme arrow, Lord Rama felled all seven trees.",
      "The whirlpool endures to this day, visible before the temple. As per local belief — and despite every attempt across centuries — no one has ever been able to measure the depth of that sacred whirlpool in the Ithikkara River.",
    ],
  },
];

// ── Animation variants ────────────────────────────────────────────
const backdropVariants: any = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants: any = {
  hidden:  { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
  exit: { opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.25, ease: "easeIn" } },
};

const sectionVariants: any = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const paraVariants: any = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

// ── Props ─────────────────────────────────────────────────────────
interface HistoryModalProps { isOpen: boolean; onClose: () => void; }

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ── Dark cinematic backdrop ── */}
            <m.div
              key="hist-backdrop"
              variants={backdropVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed inset-0 z-[110] bg-black/65"
              style={{ backdropFilter: "blur(6px)" }}
              onClick={onClose}
              aria-hidden
            />

            {/* ── Glass panel ── */}
            <m.div
              key="hist-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hist-title"
              variants={panelVariants}
              initial="hidden" animate="visible" exit="exit"
              className="
                fixed z-[120]
                inset-x-3 sm:inset-x-auto
                top-[4vh]
                sm:left-1/2 sm:-translate-x-1/2
                sm:w-full sm:max-w-2xl
                bottom-[4vh] sm:max-h-[92vh] sm:bottom-auto
                flex flex-col rounded-3xl overflow-hidden
                max-md:!backdrop-blur-none max-md:!shadow-none max-md:!bg-zinc-900
              "
              style={{
                backdropFilter: "blur(24px) saturate(160%)",
                background: "rgba(10, 6, 2, 0.72)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow:
                  "inset 0 0 28px rgba(212,160,23,0.10), 0 32px 80px -12px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.30)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ── */}
              <div
                className="shrink-0 flex items-start justify-between gap-4 px-7 sm:px-10 pt-8 pb-6"
                style={{ borderBottom: "1px solid rgba(212,160,23,0.15)" }}
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-amber-400/70"
                    style={{ fontFamily: "var(--font-sans)" }}>
                    Sacred History
                  </span>
                  <h2
                    id="hist-title"
                    className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-sm"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Legend &amp; Legacy
                  </h2>
                  <p className="text-xs text-stone-400 tracking-wide"
                    style={{ fontFamily: "var(--font-sans)" }}>
                    Velinelloor Sree Rama Swami Temple
                  </p>
                </div>

                {/* Spinning golden close button */}
                <m.button
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  style={{
                    background: "rgba(212,160,23,0.10)",
                    border: "1px solid rgba(212,160,23,0.25)",
                    color: "#D4A017",
                    fontSize: "1rem",
                  }}
                  whileHover={{
                    rotate: 90,
                    background: "rgba(212,160,23,0.22)",
                    boxShadow: "0 0 16px rgba(212,160,23,0.40)",
                    borderColor: "rgba(212,160,23,0.60)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  ✕
                </m.button>
              </div>

              {/* ── Scrollable content ── */}
              <div
                className="golden-scroll overflow-y-auto overscroll-contain px-7 sm:px-10 py-7 flex flex-col gap-9"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {SECTIONS.map((section, si) => (
                  <m.div
                    key={si}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={sectionVariants}
                    className="flex flex-col gap-4 overflow-x-hidden"
                  >
                    {/* Section heading */}
                    <m.h3
                      variants={paraVariants}
                      className="text-base sm:text-lg font-semibold tracking-wide bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {section.heading}
                    </m.h3>

                    {/* Paragraphs — each fades + slides up individually */}
                    {section.paragraphs.map((para, pi) => (
                      <m.p
                        key={pi}
                        variants={paraVariants}
                        className="text-sm sm:text-base leading-loose text-stone-200"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                      >
                        {para}
                      </m.p>
                    ))}

                    {/* Thin gold separator */}
                    {si < SECTIONS.length - 1 && (
                      <m.div
                        variants={paraVariants}
                        className="h-px w-24 mt-1"
                        style={{ background: "linear-gradient(to right, rgba(212,160,23,0.45), transparent)" }}
                        aria-hidden
                      />
                    )}
                  </m.div>
                ))}

                {/* Closing shloka */}
                <m.p
                  variants={paraVariants}
                  className="text-center text-base italic text-amber-300/70 pt-2 pb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  ॐ श्री रामाय नमः
                </m.p>
              </div>

              {/* ── Footer ── */}
              <div
                className="shrink-0 px-7 sm:px-10 py-4 flex items-center justify-center"
                style={{ borderTop: "1px solid rgba(212,160,23,0.12)" }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  Scroll to read · Esc to close
                </p>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
