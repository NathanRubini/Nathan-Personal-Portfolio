import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  titleComponent: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContainerScroll({
  titleComponent,
  children,
  className,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col items-center py-20", className)}
    >
      <div className="mb-10 text-center">{titleComponent}</div>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformPerspective: 1000,
          transformOrigin: "top center",
        }}
        className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
      >
        {children}
      </motion.div>
    </div>
  );
}
