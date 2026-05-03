"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PHONE_DISPLAY = "+91 97474 12014";
const PHONE_TEL     = "tel:+919747412014";
const WHATSAPP_URL  = "https://wa.me/919747412014";

// ── Inline WhatsApp SVG (official icon path) ──────────────────────
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L.057 23.077a.75.75 0 0 0 .92.92l5.344-1.49A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 0 1-4.953-1.354l-.355-.21-3.685 1.027 1.006-3.574-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

// ── Phone icon ───────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-16 md:py-24 px-4 md:px-8"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">

        {/* ── Section header ── */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-14"
        >
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
          >
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light"
            style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
          >
            Contact Us
          </h2>
          <p
            className="text-base font-light max-w-sm leading-relaxed"
            style={{ color: "var(--stone)", fontFamily: "var(--font-serif)" }}
          >
            For inquiries about the temple, Ulsavam events, or seva bookings,
            feel free to reach us directly.
          </p>

          {/* Ornamental rule */}
          <div className="mt-2 flex items-center gap-3 w-full max-w-xs" aria-hidden>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }} />
            <span style={{ color: "var(--gold)", fontSize: "1.1rem" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }} />
          </div>
        </motion.div>

        {/* ── Contact card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as any, delay: 0.15 }}
          whileHover={{ y: -2, boxShadow: "0 20px 60px -12px rgba(90,50,20,0.18), 0 4px 16px rgba(90,50,20,0.06)" }}
          className="w-full flex flex-col items-center gap-6 rounded-2xl px-8 py-10"
          style={{
            background: "var(--cream)",
            border: "1px solid rgba(201,150,42,0.20)",
            boxShadow: "0 8px 40px -8px rgba(90,50,20,0.12), 0 2px 8px rgba(90,50,20,0.04)",
            transition: "box-shadow 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* ── Phone number ── */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "var(--stone)", fontFamily: "var(--font-sans)" }}
            >
              Phone
            </span>

            <motion.a
              href={PHONE_TEL}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
              className="group flex items-center gap-2.5 text-2xl md:text-3xl font-medium tracking-wide"
              style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
              whileHover={{ scale: 1.03, color: "var(--saffron)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span style={{ color: "var(--gold)" }}>
                <PhoneIcon />
              </span>
              {PHONE_DISPLAY}
            </motion.a>

            <span
              className="text-xs"
              style={{ color: "var(--stone-light)", fontFamily: "var(--font-sans)" }}
            >
              Tap to call
            </span>
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-px"
            style={{ background: "linear-gradient(to right, transparent, var(--stone-light), transparent)" }}
            aria-hidden
          />

          {/* ── WhatsApp button ── */}
          <div className="flex flex-col items-center gap-2 w-full">
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "var(--stone)", fontFamily: "var(--font-sans)" }}
            >
              WhatsApp
            </span>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="inline-flex items-center justify-center gap-3 w-full max-w-xs min-h-[48px] px-8 py-3 rounded-xl font-medium text-white text-base tracking-wide"
              style={{
                background: "#25D366",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 16px -4px rgba(37,211,102,0.40)",
              }}
              whileHover={{
                y: -3,
                boxShadow: "0 10px 28px -4px rgba(37,211,102,0.55)",
              }}
              whileTap={{ y: 0, boxShadow: "0 4px 16px -4px rgba(37,211,102,0.40)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-xs text-center tracking-wide"
          style={{ color: "var(--stone-light)", fontFamily: "var(--font-sans)" }}
        >
          We typically respond within a few hours.
        </motion.p>

      </div>
    </section>
  );
}
