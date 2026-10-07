"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export default function CursorGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // We need to wait until mounted to check the theme safely to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use springs for smooth movement
  const mouseX = useSpring(-1000, { stiffness: 75, damping: 20, restDelta: 0.001 });
  const mouseY = useSpring(-1000, { stiffness: 75, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    if (!mounted || resolvedTheme !== "dark") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the size of the glow (800px / 2 = 400px) so the cursor is exactly in the center
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted, resolvedTheme, mouseX, mouseY]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-0 w-[800px] h-[800px] rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0) 70%)",
      }}
    />
  );
}
