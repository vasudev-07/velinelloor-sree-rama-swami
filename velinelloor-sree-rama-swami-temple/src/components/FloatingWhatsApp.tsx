"use client";

import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/919747412014";

function WhatsAppSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-7 h-7"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L.057 23.077a.75.75 0 0 0 .92.92l5.344-1.49A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 0 1-4.953-1.354l-.355-.21-3.685 1.027 1.006-3.574-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  return (
    <motion.div
      // ── Fixed to bottom-right of viewport ──
      // bottom-20 on mobile clears Safari's browser chrome; bottom-8 on desktop
      className="fixed bottom-20 right-4 sm:bottom-8 sm:right-7"
      style={{ zIndex: 200 }}
      // ── Slide-in from bottom on page load ──
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      // ── Grow on hover ──
      whileHover={{ scale: 1.14 }}
      whileTap={{ scale: 0.94 }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          "56px",
          height:         "56px",
          borderRadius:   "50%",
          background:     "#25D366",
          boxShadow:
            "0 20px 60px -8px rgba(37,211,102,0.50), 0 8px 24px rgba(0,0,0,0.16)",
          textDecoration: "none",
        }}
      >
        <WhatsAppSVG />
      </a>
    </motion.div>
  );
}
