"use client";
import dynamic from "next/dynamic";

const RiverScrollProgress = dynamic(
  () => import("@/components/RiverScrollProgress"),
  { ssr: false, loading: () => null }
);

export default function RiverProgressLoader() {
  return <RiverScrollProgress />;
}
