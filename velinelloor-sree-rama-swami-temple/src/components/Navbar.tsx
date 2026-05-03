"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#ulsavam",  label: "Ulsavam"  },
  { href: "#contact",  label: "Contact"  },
  { href: "#location", label: "Location" },
];

// ── Hamburger / Close icon ────────────────────────────────────────
function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between" aria-hidden>
      <motion.span
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="block h-px w-full rounded-full"
        style={{ background: "var(--maroon)" }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        className="block h-px w-full rounded-full"
        style={{ background: "var(--maroon)" }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="block h-px w-full rounded-full"
        style={{ background: "var(--maroon)" }}
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Track scroll for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Main header bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? "rgba(250, 247, 242, 0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(201,150,42,0.18)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px -4px rgba(90,50,20,0.10)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={closeMenu}
            className="flex flex-col leading-none text-left"
            aria-label="Velinelloor Sree Rama Swami Temple — Home"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          >
            <span
              className="text-lg md:text-xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
            >
              Velinelloor
            </span>
            <span
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
            >
              Sree Rama Temple
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-9 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm tracking-widest uppercase transition-colors duration-200"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", opacity: 0.75 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color   = "var(--maroon)";
                      (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color   = "var(--ink)";
                      (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop accent dot */}
          <div
            aria-hidden
            className="hidden md:block w-2 h-2 rounded-full"
            style={{ background: "var(--gold)" }}
          />

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg focus:outline-none focus-visible:ring-2"
            style={{ background: "transparent" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile slide-in menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(26,20,16,0.35)", backdropFilter: "blur(2px)" }}
              onClick={closeMenu}
              aria-hidden
            />

            {/* Drawer */}
            <motion.nav
              key="mobile-nav"
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as any }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{
                width: "min(280px, 80vw)",
                background: "var(--cream)",
                borderLeft: "1px solid rgba(201,150,42,0.18)",
                boxShadow: "-8px 0 40px -8px rgba(90,50,20,0.18)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(201,150,42,0.12)" }}
              >
                <span
                  className="text-base font-light tracking-wide"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--maroon)" }}
                >
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  className="w-9 h-9 flex items-center justify-center rounded-full focus:outline-none"
                  style={{ background: "rgba(201,150,42,0.08)" }}
                  aria-label="Close menu"
                >
                  <span style={{ color: "var(--maroon)", fontSize: "1.1rem", lineHeight: 1 }}>✕</span>
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col px-6 pt-6 gap-1 list-none flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center w-full min-h-[52px] px-3 rounded-xl text-sm tracking-widest uppercase font-medium transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--ink)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,150,42,0.08)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--maroon)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Drawer footer */}
              <div
                className="px-6 py-6"
                style={{ borderTop: "1px solid rgba(201,150,42,0.12)" }}
              >
                <p
                  className="text-xs text-center tracking-widest uppercase"
                  style={{ color: "var(--stone-light)", fontFamily: "var(--font-sans)" }}
                >
                  Velinelloor · Kerala
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
