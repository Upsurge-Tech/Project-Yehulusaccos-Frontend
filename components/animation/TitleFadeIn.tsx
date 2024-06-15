"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  title: string;
  className: string;
  duration?: number;
  delay?: number;
}

const TitleFadeIn = ({ title, className, delay, duration }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h2
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
      {title}
    </motion.h2>
  );
};

export default TitleFadeIn;
