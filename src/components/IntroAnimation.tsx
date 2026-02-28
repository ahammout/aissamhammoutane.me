import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface IntroAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const IntroAnimation = ({ isVisible, onComplete }: IntroAnimationProps) => {
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setShouldExit(true), 3200);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleExitComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && !shouldExit && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Logo */}
            <motion.img
              src="/logo1.svg"
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="font-display text-base sm:text-lg md:text-xl font-bold text-foreground tracking-wider"
            >
              Aissam Hammoutane
            </motion.p>

            {/* Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
              className="h-px w-12 sm:w-16 bg-primary/40 origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
