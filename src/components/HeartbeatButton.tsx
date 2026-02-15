import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSwordTransition } from "./SwordTransitionProvider";

const HeartbeatButton = () => {
  const navigate = useNavigate();
  const { triggerTransition } = useSwordTransition();

  const handleClick = () => {
    triggerTransition(() => {
      navigate("/blog");
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1, 1.15, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
      >
        <Heart className="w-4 h-4 text-primary fill-primary" />
      </motion.div>
      <span className="text-sm font-medium text-primary">My Thoughts</span>
    </motion.div>
  );
};

export default HeartbeatButton;
