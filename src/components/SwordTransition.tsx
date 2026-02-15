import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SwordTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const SwordTransition = ({ isActive, onComplete }: SwordTransitionProps) => {
  const [phase, setPhase] = useState<"idle" | "strike" | "cut" | "reveal">("idle");

  useEffect(() => {
    if (isActive) {
      // Lock scroll to prevent any scroll-related positioning issues
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
      setPhase("strike");
      const cutTimer = setTimeout(() => setPhase("cut"), 400);
      const revealTimer = setTimeout(() => setPhase("reveal"), 900);
      const completeTimer = setTimeout(() => {
        onComplete();
        setPhase("idle");
        document.body.style.overflow = "";
      }, 1400);
      return () => {
        clearTimeout(cutTimer);
        clearTimeout(revealTimer);
        clearTimeout(completeTimer);
        document.body.style.overflow = "";
      };
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
          {/* Dark overlay that fades in */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* The sword blade sweeping across */}
          <motion.div
            className="absolute top-0 left-0 h-full w-[3px] bg-primary"
            initial={{ x: "-10vw", opacity: 0 }}
            animate={
              phase === "strike"
                ? { x: "50vw", opacity: 1 }
                : phase === "cut"
                ? { x: "110vw", opacity: [1, 1, 0] }
                : { opacity: 0 }
            }
            transition={{
              duration: phase === "strike" ? 0.35 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Blade glow trail */}
            <motion.div
              className="absolute top-0 left-[-8px] h-full w-[18px] bg-primary/30 blur-md"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          </motion.div>

          {/* Horizontal slash marks that appear after strike */}
          {(phase === "cut" || phase === "reveal") && (
            <>
              {[0.35, 0.5, 0.65].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 h-[1px] bg-primary/60"
                  style={{ top: `${pos * 100}%` }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: [0, 0.8, 0.3] }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </>
          )}

          {/* Spark particles from the cut */}
          {phase === "cut" &&
            Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-primary"
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: "50%",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 200,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.3,
                  delay: i * 0.02,
                  ease: "easeOut",
                }}
              />
            ))}

          {/* Screen split reveal - top slides up */}
          <motion.div
            className="absolute inset-0 bg-background"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Screen split reveal - bottom slides down */}
          <motion.div
            className="absolute inset-0 bg-background"
            style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center loading pulse between strike and reveal */}
          {(phase === "strike" || phase === "cut") && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              {/* Circular pulse ring */}
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-primary/60"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 2],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              />
              {/* Inner dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 0.4, delay: 0.35 }}
              />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default SwordTransition;
