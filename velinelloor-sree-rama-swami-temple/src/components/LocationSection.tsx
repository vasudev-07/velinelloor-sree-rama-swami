"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ADDRESS_LINE1  = "Velinelloor, Kerala";
const ADDRESS_LINE2  = "691510";
const DIRECTIONS_URL = "https://maps.app.goo.gl/DkoBT3m3yxi47Ghm7";

// Embed URL — searches the exact location on Google Maps
const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Velinelloor,Kerala,691510&output=embed&z=15";

// ── Map Pin SVG ──────────────────────────────────────────────────
function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ── Arrow icon for button ────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69L5.22 13.72a.75.75 0 0 0 0 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="w-full py-16 md:py-24 px-4 md:px-8"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* ── Section Header ── */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-4"
        >
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
          >
            Find Us
          </span>
          <h2
            id="location-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light"
            style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
          >
            Temple Location
          </h2>
          <p
            className="text-base font-light max-w-sm leading-relaxed"
            style={{ color: "var(--stone)", fontFamily: "var(--font-serif)" }}
          >
            We warmly welcome all devotees to our sacred space.
          </p>

          {/* Ornamental rule */}
          <div className="mt-1 flex items-center gap-3 w-full max-w-xs" aria-hidden>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }} />
            <span style={{ color: "var(--gold)", fontSize: "1.1rem" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }} />
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* ── LEFT: Address + Directions ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            {/* Address card */}
            <motion.div
              className="flex flex-col gap-6 rounded-2xl px-8 py-9"
              whileHover={{ y: -3, boxShadow: "0 20px 56px -12px rgba(90,50,20,0.15), 0 4px 16px rgba(90,50,20,0.06)" }}
              style={{
                background: "var(--cream-dark)",
                border: "1px solid rgba(201,150,42,0.22)",
                boxShadow: "0 8px 32px -8px rgba(90,50,20,0.10), 0 2px 6px rgba(90,50,20,0.04)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
            >
              {/* Pin icon + address */}
              <div className="flex items-start gap-4">
                <span style={{ color: "var(--maroon)" }}>
                  <MapPinIcon />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-xs tracking-[0.25em] uppercase mb-1"
                    style={{ color: "var(--stone)", fontFamily: "var(--font-sans)" }}
                  >
                    Address
                  </span>
                  <p
                    className="text-2xl md:text-3xl font-light leading-snug"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
                  >
                    {ADDRESS_LINE1}
                  </p>
                  <p
                    className="text-xl font-light"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)", opacity: 0.7 }}
                  >
                    {ADDRESS_LINE2}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: "linear-gradient(to right, var(--stone-light), transparent)" }}
                aria-hidden
              />

              {/* State + Country pill */}
              <div className="flex flex-wrap gap-3">
                {["Kerala", "India", "Hindu Temple"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(201,150,42,0.1)",
                      color: "var(--gold)",
                      fontFamily: "var(--font-sans)",
                      border: "1px solid rgba(201,150,42,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Get Directions button */}
            <motion.a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Velinelloor Sree Rama Swami Temple"
              className="inline-flex items-center justify-center gap-3 w-full min-h-[48px] px-8 py-3 rounded-xl text-sm tracking-widest uppercase font-medium"
              style={{
                background: "var(--maroon)",
                color: "var(--cream)",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 20px -4px rgba(123,34,48,0.35)",
              }}
              whileHover={{
                scale: 1.025,
                boxShadow: "0 10px 32px -4px rgba(123,34,48,0.50)",
              }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <MapPinIcon />
              Get Directions
              <ArrowIcon />
            </motion.a>
          </motion.div>

          {/* ── RIGHT: Google Maps embed ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            whileHover={{ scale: 1.015, boxShadow: "0 16px 56px -8px rgba(90,50,20,0.20), 0 4px 12px rgba(90,50,20,0.08)" }}
            className="w-full overflow-hidden"
            style={{
              borderRadius: "16px",
              boxShadow: "0 8px 40px -8px rgba(90,50,20,0.14), 0 2px 8px rgba(90,50,20,0.06)",
              border: "1px solid rgba(201,150,42,0.18)",
              aspectRatio: "4/3",
              minHeight: "280px",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
          >
            <iframe
              title="Velinelloor Sree Rama Swami Temple location on Google Maps"
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
