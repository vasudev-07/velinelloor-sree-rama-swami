import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UlsavamSection from "@/components/UlsavamSection";
import ContactSection from "@/components/ContactSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// ── Reusable gold divider ─────────────────────────────────────────
function GoldDivider() {
  return (
    <div
      aria-hidden
      className="w-full h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(201,150,42,0.3), transparent)",
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      {/* overflow-x-hidden at the page level to lock horizontal bounce
          from any animated element that overshoots viewport bounds */}
      <main className="overflow-x-hidden">
        <Navbar />
        <HeroSection />

        <GoldDivider />
        <UlsavamSection />

        <GoldDivider />
        <ContactSection />

        <GoldDivider />
        <LocationSection />

        <GoldDivider />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
