import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-6"
        >
          {t("hero.welcome")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          {t("hero.title1")}{" "}
          <span className="text-gradient">{t("hero.title2")}</span>
          <br />{t("hero.title3")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-all duration-300 glow-primary text-center"
          >
            {t("hero.cta1")}
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-all duration-300 text-center"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
