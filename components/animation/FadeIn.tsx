"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className: string;
  duration?: number;
  delay?: number;
}

const FadeIn = ({ children, className, duration, delay }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isInView ? 1 : 0,
      }}
      transition={{
        duration: duration ? duration : 1.5,
        delay: delay ? delay : 0,
      }}
      initial={{ opacity: isInView ? 1 : 0.01 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
