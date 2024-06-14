"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  startImmediately: boolean;
}

const ScaleToRight = ({
  className,
  children,
  duration,
  delay,
  startImmediately,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  let scaleX: number = 1;
  if (!startImmediately && !isInView) {
    scaleX = 0;
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        scaleX: 0,
      }}
      animate={{
        scaleX,
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
