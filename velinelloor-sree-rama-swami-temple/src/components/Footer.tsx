"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer
      role="contentinfo"
      className="w-full py-10 md:py-14 px-4 md:px-8 text-center"
      style={{
        background: "var(--cream-dark)",
        borderTop: "1px solid rgba(201,150,42,0.18)",
        boxShadow: "inset 0 1px 0 rgba(201,150,42,0.08)",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto flex flex-col items-center gap-5"
      >
        {/* Om with glow */}
        <span
          className="text-4xl select-none"
          style={{
            color: "var(--gold)",
            fontFamily: "var(--font-ml)",
            textShadow: "0 2px 16px rgba(201,150,42,0.30)",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
          aria-hidden
        >
          ॐ
        </span>

        <p
          className="text-base md:text-lg font-light tracking-wide"
          style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
        >
          Velinelloor Sree Rama Swami Temple
        </p>

        <div
          className="w-20 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--gold-light), transparent)",
          }}
          aria-hidden
        />

        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--stone)", fontFamily: "var(--font-sans)" }}
        >
          All Rights Reserved &copy; {new Date().getFullYear()}
        </p>

        <p
          className="text-xs"
          style={{ color: "var(--stone-light)", fontFamily: "var(--font-sans)", opacity: 0.7 }}
        >
          Velinelloor, Kerala 691510
        </p>
      </motion.div>
    </footer>
  );
}
