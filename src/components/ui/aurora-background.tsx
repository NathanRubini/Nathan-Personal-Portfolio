"use client"; // harmless comment in Vite

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative flex flex-col", className)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute -inset-[10px] opacity-40 blur-[10px] animate-aurora",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
          )}
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, #3b82f6 0%, #a5b4fc 15%, #eff6ff 30%, #6366f1 45%, #c7d2fe 60%)",
              "repeating-linear-gradient(100deg, #93c5fd 0%, #ddd6fe 20%, #bfdbfe 40%, #818cf8 60%, #e0e7ff 80%)",
            ].join(", "),
            backgroundSize: "400% 400%, 300% 300%",
            backgroundAttachment: "fixed",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
