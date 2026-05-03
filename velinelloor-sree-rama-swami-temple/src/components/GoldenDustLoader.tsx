"use client";
import dynamic from "next/dynamic";

// Lazy-load the particle layer client-side only — zero SSR / initial bundle cost
const GoldenDust = dynamic(() => import("@/components/GoldenDust"), {
  ssr: false,
  loading: () => null,
});

export default function GoldenDustLoader() {
  return <GoldenDust />;
}
