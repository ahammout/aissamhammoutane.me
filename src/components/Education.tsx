import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Code2, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const educationData = [
    {
      period: "2024 - 2025",
      titleKey: "education.arch.title",
      subtitleKey: "education.arch.subtitle",
      institution: "1337 Coding School (42 Network)",
      location: "Khouribga, Morocco",
      descKey: "education.arch.desc",
      achievementKeys: ["education.arch.a1", "education.arch.a2", "education.arch.a3", "education.arch.a4"],
      icon: Cpu,
      color: "from-primary to-primary/60",
    },
    {
      period: "2024",
      titleKey: "education.pfe.title",
      subtitleKey: "education.pfe.subtitle",
      institution: "UM6P",
      location: "Ben Guerir, Morocco",
      descKey: "education.pfe.desc",
      achievementKeys: ["education.pfe.a1", "education.pfe.a2", "education.pfe.a3", "education.pfe.a4"],
      icon: Award,
      color: "from-amber-500 to-orange-500",
    },
    {
      period: "2021 - 2024",
      titleKey: "education.soft.title",
      subtitleKey: "education.soft.subtitle",
      institution: "1337 Coding School (42 Network)",
      location: "Khouribga, Morocco",
      descKey: "education.soft.desc",
      achievementKeys: ["education.soft.a1", "education.soft.a2", "education.soft.a3", "education.soft.a4"],
      icon: Code2,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-x-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-3">{t("education.label")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("education.title1")} <span className="text-gradient">{t("education.title2")}</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line - desktop only */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute hidden md:block left-1/2 top-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent -translate-x-px"
          />

          <div className="flex flex-col gap-4 sm:gap-5 md:gap-0">
            {educationData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  className={`relative md:flex md:items-start md:mb-16 md:last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot - desktop only */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.2, type: "spring", bounce: 0.5 }}
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-background`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <div className={`md:w-[calc(50%-2rem)] w-full ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-xl border border-border hover:border-primary/30 p-4 sm:p-5 md:p-6 transition-all duration-300 group"
                    >
                      {/* Mobile icon + period */}
                      <div className="flex md:hidden items-center gap-2.5 mb-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-primary tracking-wider uppercase">{item.period}</span>
                      </div>

                      {/* Desktop period */}
                      <div className={`hidden md:flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-primary tracking-wider uppercase">{item.period}</span>
                      </div>

                      <h3 className="font-display text-sm sm:text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">{t(item.titleKey)}</h3>
                      <p className="text-[11px] sm:text-xs md:text-sm font-medium text-primary/80 mb-1">{t(item.subtitleKey)}</p>

                      <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>

                      <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed mb-3">{t(item.descKey)}</p>

                      <div className="space-y-1.5 sm:space-y-2">
                        {item.achievementKeys.map((aKey, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                            className={`flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}
                          >
                            <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            <span>{t(aKey)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 42 school badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 sm:mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-card border border-primary/20">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground">
              1337 · {t("education.42badge")} <span className="text-primary font-semibold">42 Network</span>
            </span>
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
