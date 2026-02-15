import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Sparkles, Globe, Database, Zap } from "lucide-react";

const skills = [
  {
    icon: Database,
    title: "Backend Development",
    description: "Building robust APIs and database architectures",
    technologies: ["Node.js", "Nest.js", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, and modern JavaScript frameworks",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Globe,
    title: "Full Stack Solutions",
    description: "End-to-end development from concept to deployment",
    technologies: ["AWS", "Vercel", "Docker", "CI/CD", "Microservices", "Terraform"],
  },
  {
    icon: Sparkles,
    title: "AI & LLMS Integration",
    description: "Integrating AI models to enhance user experiences",
    technologies: ["Python", "OpenAI", "React", "TensorFlow", "LangChain"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Ensuring fast load times and smooth experiences",
    technologies: ["Lighthouse", "Core Web Vitals", "SEO", "Caching"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            What I Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <skill.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {skill.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
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