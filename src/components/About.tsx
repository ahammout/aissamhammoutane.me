import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative mx-auto md:mx-0 max-w-[260px] sm:max-w-sm md:max-w-none"
          >
            <div className="aspect-[3.8/5] rounded-2xl overflow-hidden gradient-border select-none">
              <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <img
                  src="aissam.jpeg"
                  alt="Aissam Hammoutane"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover protected-img"
                  style={{ WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-16 sm:w-24 h-16 sm:h-24 bg-primary/10 rounded-full blur-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-3">
              {t("about.label")}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t("about.title1")}{" "}
              <span className="text-gradient">{t("about.title2")}</span>{" "}
              {t("about.title3")}
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-10">
              {[
                { number: "3+", labelKey: "about.years" },
                { number: "40+", labelKey: "about.projects" },
                { number: "15+", labelKey: "about.clients" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm mt-1">{t(stat.labelKey)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
