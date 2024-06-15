"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className: string;
  duration?: number;
  delay?: number;
}

const PopUpAlt = ({ className, children, duration, delay }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={{ scale: isInView ? [0, 1] : 0 }}
      transition={{ duration: 2.5, ease: [0.42, 0, 0.58, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PopUpAlt;
