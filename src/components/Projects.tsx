import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink, X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects-data";

const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-background/80"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-background/80"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-4" : "bg-foreground/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
  isInView,
  onSelect,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onSelect: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 flex flex-col cursor-pointer"
    >
      <div className={`aspect-[16/8] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
        <ImageCarousel images={project.images} title={project.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2.5 border border-primary/30 shadow-lg shadow-primary/20">
              <Eye className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary backdrop-blur-sm font-medium">
            {project.organization}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-0.5">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{project.role}</p>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        <p className="text-sm font-medium text-foreground/80 mb-1.5">{project.subtitle}</p>
        <p className="text-muted-foreground text-xs mb-3 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SamuraiLoader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 900);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-12 h-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{ top: "50%", left: "50%", marginTop: -4, marginLeft: -4 }}
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
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full bg-primary/40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="h-[1px] bg-primary/40 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: [0, 80, 60, 80] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-primary/20 shadow-2xl shadow-primary/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 transition-all duration-300 group"
        >
          <X className="h-5 w-5 text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:scale-125 group-hover:rotate-90 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
        </button>

        <div className={`aspect-[21/9] bg-gradient-to-br ${project.color} relative overflow-hidden rounded-t-2xl`}>
          <ImageCarousel images={project.images} title={project.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 pointer-events-none">
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium backdrop-blur-sm">
              {project.organization}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 relative">
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="font-display text-2xl sm:text-3xl font-bold text-foreground"
              >
                {project.title}
              </motion.h3>
              <p className="text-sm text-primary font-medium mt-1">{project.role}</p>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Visit</span>
              </a>
            )}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg font-medium text-foreground/80 mt-2">
            {project.subtitle}
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-muted-foreground mt-4 leading-relaxed">
            {project.description}
          </motion.p>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              ⚔️ Key Contributions
            </h4>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-0.5 flex-shrink-0 text-base">▸</span>
                  <span className="leading-relaxed">{h}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/10">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState<Project | null>(null);

  const handleSelect = useCallback((project: Project) => {
    setLoadingProject(project);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setSelectedProject(loadingProject);
    setLoadingProject(null);
  }, [loadingProject]);

  return (
    <>
      <section id="projects" className="py-32 px-4 sm:px-6 overflow-x-hidden" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Featured Work
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Selected <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
                onSelect={() => handleSelect(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {loadingProject && <SamuraiLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
