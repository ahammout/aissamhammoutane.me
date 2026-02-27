import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Sparkles, Globe, Database, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const skills = [
    {
      icon: Database,
      titleKey: "skills.backend.title",
      descKey: "skills.backend.desc",
      technologies: ["Node.js", "Nest.js", "PostgreSQL", "REST APIs", "GraphQL"],
    },
    {
      icon: Code2,
      titleKey: "skills.frontend.title",
      descKey: "skills.frontend.desc",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Globe,
      titleKey: "skills.fullstack.title",
      descKey: "skills.fullstack.desc",
      technologies: ["AWS", "Vercel", "Docker", "CI/CD", "Microservices", "Terraform"],
    },
    {
      icon: Sparkles,
      titleKey: "skills.ai.title",
      descKey: "skills.ai.desc",
      technologies: ["Python", "OpenAI", "React", "TensorFlow", "LangChain"],
    },
    {
      icon: Zap,
      titleKey: "skills.perf.title",
      descKey: "skills.perf.desc",
      technologies: ["Lighthouse", "Core Web Vitals", "SEO", "Caching"],
    },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            {t("skills.label")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            {t("skills.title1")} <span className="text-gradient">{t("skills.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-5 sm:p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">
                {t(skill.titleKey)}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-4 leading-relaxed">
                {t(skill.descKey)}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
