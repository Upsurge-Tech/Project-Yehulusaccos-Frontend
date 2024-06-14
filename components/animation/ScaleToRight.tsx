"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className: string;
  duration?: number;
  delay?: number;
}

const ScaleToRight = ({ className, children, duration, delay }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{
        scaleX: 0,
      }}
      animate={{
        scaleX: 1,
      }}
      transition={{
        duration: duration ? duration : 1,
        delay: delay ? delay : 0.3,
      }}
      style={{ originX: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleToRight;
