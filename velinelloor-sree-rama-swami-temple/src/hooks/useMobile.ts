"use client";

import { useState, useEffect } from "react";

/**
 * useMobile — shared mobile detection hook.
 * Returns true when viewport < 768px.
 * Uses passive resize listener with no re-renders on desktop.
 */
export function useMobile(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return mobile;
}
