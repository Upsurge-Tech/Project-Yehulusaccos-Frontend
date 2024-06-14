"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className: string;
  from: "left" | "right";
  duration?: number;
  delay?: number;
}

const SlideFrom = ({ children, className, from, duration, delay }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const transitionValues = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : from === "left" ? -475 : 475,
  };

  return (
    <motion.div
      ref={ref}
      initial={transitionValues}
      animate={transitionValues}
      transition={{
        duration: duration ? duration : 0.75,
        delay: delay ? delay : 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideFrom;
