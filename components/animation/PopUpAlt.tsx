"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className: string;
  duration?: number;
  delay?: number;
}

const PopUpAlt = ({ className, children, duration, delay }: Props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1] }}
      transition={{ duration: 3.5, ease: [0.42, 0, 0.58, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PopUpAlt;
