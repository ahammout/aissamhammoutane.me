import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const newLeaves: Leaf[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
      size: 12 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.2,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-primary/40"
          style={{
            left: `${leaf.x}%`,
            fontSize: leaf.size,
            opacity: leaf.opacity,
          }}
          initial={{ y: -50, rotate: 0, x: 0 }}
          animate={{
            y: "110vh",
            rotate: [0, 45, -30, 60, 0],
            x: [0, 30, -20, 40, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🍂
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeaves;
