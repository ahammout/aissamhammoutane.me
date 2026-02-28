import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSwordTransition } from "./SwordTransitionProvider";
import { useI18n } from "@/lib/i18n";

const HeartbeatButton = () => {
  const navigate = useNavigate();
  const { triggerTransition } = useSwordTransition();
  const { t } = useI18n();

  const handleClick = () => {
    triggerTransition(() => {
      navigate("/blog");
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      >
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary fill-primary" />
      </motion.div>
      <span className="text-[10px] sm:text-xs font-medium text-primary">{t("blog.label")}</span>
    </motion.div>
  );
};

export default HeartbeatButton;
