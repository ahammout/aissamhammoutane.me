import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Code2, Cpu } from "lucide-react";

const educationData = [
  {
    period: "2024 — 2025",
    title: "Architect in Digital Technologies",
    subtitle: "Advanced Common Core",
    institution: "1337 Coding School (42 Network)",
    location: "Khouribga, Morocco",
    description:
      "Advanced specialization in scalable architecture, distributed systems, and enterprise-grade application design. Focused on microservices patterns, DevOps practices, and AI integration.",
    achievements: [
      "Scalable microservices architecture design",
      "AI & LLM integration specialist",
      "Enterprise backend development with NestJS",
      "DevOps & containerization with Docker/Kafka",
    ],
    icon: Cpu,
    color: "from-primary to-primary/60",
  },
  {
    period: "2024",
    title: "PFE Internship",
    subtitle: "DICE — Mohammed VI Polytechnic University",
    institution: "UM6P",
    location: "Ben Guerir, Morocco",
    description:
      "End-of-studies internship working on national-scale digital platforms including NARSA and industrial automation systems, applying full-stack expertise in production environments.",
    achievements: [
      "Built national driving exam digital platform (NARSA)",
      "Architected industrial automation microservices",
      "Kafka event streaming & real-time systems",
      "Cross-functional team collaboration",
    ],
    icon: Award,
    color: "from-amber-500 to-orange-500",
  },
  {
    period: "2021 — 2024",
    title: "Software Engineering",
    subtitle: "Common Core",
    institution: "1337 Coding School (42 Network)",
    location: "Khouribga, Morocco",
    description:
      "Intensive, peer-to-peer programming curriculum emphasizing algorithms, memory management, networking, and system design. Mastery-based evaluation with no traditional lectures — learning through real-world projects and collaboration.",
    achievements: [
      "C/C++ systems programming & memory management",
      "Networking protocols & socket programming",
      "Full-stack web development (capstone: ft_transcendence)",
      "Peer-to-peer learning & autonomous problem-solving",
    ],
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 px-4 sm:px-6 overflow-x-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Learning Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Education & <span className="text-gradient">Training</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:-translate-x-px"
          />

          {educationData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                className={`relative flex items-start gap-6 mb-16 last:mb-0 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.2, type: "spring", bounce: 0.5 }}
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-background`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-xl border border-border hover:border-primary/30 p-6 transition-all duration-300 group"
                  >
                    {/* Period badge */}
                    <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-primary/80 mb-1">{item.subtitle}</p>

                    <div className={`flex items-center gap-1.5 text-xs text-muted-foreground mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                          className={`flex items-center gap-2 text-xs text-muted-foreground ${isLeft ? "md:flex-row-reverse" : ""}`}
                        >
                          <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 42 school badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-primary/20">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              1337 — Part of the global <span className="text-primary font-semibold">42 Network</span>
            </span>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
