"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type MotionRevealProps = PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
}>;

export function MotionReveal({
  children,
  delay = 0,
  y = 28,
  className,
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
