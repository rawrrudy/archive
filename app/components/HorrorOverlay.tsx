"use client";

import React, { useEffect, useState } from "react";

type HorrorOverlayProps = {
  active: boolean;
  duration?: number;
  children?: React.ReactNode;
};

export default function HorrorOverlay({
  active,
  duration = 900,
  children,
}: HorrorOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none bg-black flex items-center justify-center overflow-hidden">

      {/* Full-screen red warning background */}
      <div className="absolute inset-0 bg-red-950/80 animate-pulse" />

      {/* Glitching warning content */}
      <div className="relative z-10 text-center px-8 archive-warning-content">

        <div className="text-red-500 text-3xl md:text-6xl font-bold tracking-[0.25em]">
          {children}
        </div>

        <div className="mt-6 text-red-300 text-xs tracking-[0.4em]">
          ARCHIVE SYSTEM FAILURE!
        </div>

      </div>

    </div>
  );
}