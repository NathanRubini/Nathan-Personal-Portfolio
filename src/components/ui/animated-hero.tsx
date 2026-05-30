import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedRoleProps {
  titles: string[];
  intervalMs?: number;
  className?: string;
}

export function AnimatedRole({
  titles,
  intervalMs = 2000,
  className,
}: AnimatedRoleProps) {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [titles.length, intervalMs]);

  return (
    <div className={cn("relative h-[1.2em] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={prefersReduced ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          animate={prefersReduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
