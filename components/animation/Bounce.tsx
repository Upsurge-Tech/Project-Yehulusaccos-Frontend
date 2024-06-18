"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className: string;
  isHorizontal?: boolean;
  duration?: number;
  delay?: number;
}

const Bounce = ({
  children,
  className,
  isHorizontal,
  duration,
  delay,
}: Props) => {
  const transitionValuesY = {
    y: {
      duration: duration ? duration : 2,
      delay: delay ? delay : 0,
      repeat: Infinity,
      ease: "easeOut",
    },
  };

  const transitionValuesX = {
    x: {
      duration: duration ? duration : 2,
      delay: delay ? delay : 0,
      repeat: Infinity,
      ease: "easeOut",
    },
  };

  return (
    <motion.div
      className={className}
      transition={!isHorizontal ? transitionValuesY : transitionValuesX}
      animate={
        !isHorizontal
          ? {
              y: ["20%", "-20%", "20%"],
            }
          : { x: ["10%", "-10%", "10%"] }
      }
    >
      {children}
    </motion.div>
  );
};

export default Bounce;
