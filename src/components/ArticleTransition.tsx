import { motion, AnimatePresence } from "framer-motion";

interface ArticleTransitionProps {
  isActive: boolean;
}

const ArticleTransition = ({ isActive }: ArticleTransitionProps) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Orbiting dots loader */}
            <div className="relative w-12 h-12">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: -4,
                    marginLeft: -4,
                  }}
                  animate={{
                    x: [
                      Math.cos((i * Math.PI) / 2) * 20,
                      Math.cos((i * Math.PI) / 2 + Math.PI / 2) * 20,
                      Math.cos((i * Math.PI) / 2 + Math.PI) * 20,
                      Math.cos((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 20,
                      Math.cos((i * Math.PI) / 2 + 2 * Math.PI) * 20,
                    ],
                    y: [
                      Math.sin((i * Math.PI) / 2) * 20,
                      Math.sin((i * Math.PI) / 2 + Math.PI / 2) * 20,
                      Math.sin((i * Math.PI) / 2 + Math.PI) * 20,
                      Math.sin((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 20,
                      Math.sin((i * Math.PI) / 2 + 2 * Math.PI) * 20,
                    ],
                    scale: [1, 0.8, 1, 0.8, 1],
                    opacity: [1, 0.5, 1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
              {/* Center pulse */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full bg-primary/40"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Expanding line beneath */}
            <motion.div
              className="h-[1px] bg-primary/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: [0, 80, 60, 80] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleTransition;
