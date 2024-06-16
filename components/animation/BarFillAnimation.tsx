import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BarFillAnimation = ({ duration, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const fillRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
      if (onComplete) onComplete();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 left-0 h-full w-2 bg-gray-300"></div>
      <motion.div
        ref={fillRef}
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration }}
        className="absolute top-0 left-0 w-2 bg-green-500"
      />
    </div>
  );
};

export default BarFillAnimation;
