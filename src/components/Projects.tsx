import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ExternalLink, X, Eye, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/projects-data";
import { useI18n } from "@/lib/i18n";

const ProtectedImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img
    src={src}
    alt={alt}
    className={`${className || ''} protected-img`}
    draggable={false}
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
    onTouchStart={(e) => { if (e.touches.length > 1) e.preventDefault(); }}
    style={{ WebkitUserSelect: "none", userSelect: "none", pointerEvents: "auto", WebkitTouchCallout: "none" } as React.CSSProperties}
  />
);

const ImageCarousel = ({ images, title, autoPlay = false }: { images: string[]; title: string; autoPlay?: boolean }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, autoPlay]);

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
    <div className="relative w-full h-full overflow-hidden group/carousel select-none">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <ProtectedImage src={images[current]} alt={`${title} screenshot ${current + 1}`} className="w-full h-full object-cover object-top" />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-background/80">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-background/80">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-4" : "bg-foreground/40"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index, isInView, onSelect }: { project: Project; index: number; isInView: boolean; onSelect: () => void }) => {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 flex flex-col cursor-pointer"
    >
      <div className={`aspect-[16/8] bg-gradient-to-br ${project.color} relative overflow-hidden select-none`}>
        <ProtectedImage src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2.5 border border-primary/30 shadow-lg shadow-primary/20">
              <Eye className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary backdrop-blur-sm font-medium">{project.organization}</span>
        </div>
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-0.5">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold group-hover:text-primary transition-colors truncate">{project.title}</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{project.role}</p>
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0">
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}
        </div>
        <p className="text-xs sm:text-sm font-medium text-foreground/80 mb-1">{t(project.subtitleKey)}</p>
        <p className="text-muted-foreground text-[10px] sm:text-xs mb-2 sm:mb-3 leading-relaxed line-clamp-2">{t(project.descriptionKey)}</p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SamuraiLoader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => { const timer = setTimeout(onComplete, 900); return () => clearTimeout(timer); }, [onComplete]);
  return (
    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-12 h-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-primary" style={{ top: "50%", left: "50%", marginTop: -4, marginLeft: -4 }}
              animate={{
                x: [Math.cos((i * Math.PI) / 2) * 20, Math.cos((i * Math.PI) / 2 + Math.PI / 2) * 20, Math.cos((i * Math.PI) / 2 + Math.PI) * 20, Math.cos((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 20, Math.cos((i * Math.PI) / 2 + 2 * Math.PI) * 20],
                y: [Math.sin((i * Math.PI) / 2) * 20, Math.sin((i * Math.PI) / 2 + Math.PI / 2) * 20, Math.sin((i * Math.PI) / 2 + Math.PI) * 20, Math.sin((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 20, Math.sin((i * Math.PI) / 2 + 2 * Math.PI) * 20],
                scale: [1, 0.8, 1, 0.8, 1], opacity: [1, 0.5, 1, 0.5, 1],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full bg-primary/40" animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <motion.div className="h-[1px] bg-primary/40 rounded-full" initial={{ width: 0 }} animate={{ width: [0, 80, 60, 80] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { t } = useI18n();
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [onClose]);
  const displayHighlights = project.highlightKeys.length > 0 ? project.highlightKeys.map((k) => t(k)) : project.highlights;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.4, type: "spring", bounce: 0.2 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-primary/20 shadow-2xl shadow-primary/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-1.5 transition-all duration-300 group">
          <X className="h-5 w-5 text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:scale-125 group-hover:rotate-90 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
        </button>
        <div className={`aspect-[21/9] bg-gradient-to-br ${project.color} relative overflow-hidden rounded-t-2xl`}>
          <ImageCarousel images={project.images} title={project.title} autoPlay={true} />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 pointer-events-none">
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium backdrop-blur-sm">{project.organization}</span>
          </div>
        </div>
        <div className="p-6 sm:p-8 relative">
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <motion.h3 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="font-display text-2xl sm:text-3xl font-bold text-foreground">{project.title}</motion.h3>
              <p className="text-sm text-primary font-medium mt-1">{project.role}</p>
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">{t("projects.visit")}</span>
              </a>
            )}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg font-medium text-foreground/80 mt-2">{t(project.subtitleKey)}</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-muted-foreground mt-4 leading-relaxed">{t(project.descriptionKey)}</motion.p>
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{t("projects.contributions")}</h4>
            <ul className="space-y-3">
              {displayHighlights.map((h, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08 }} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5 flex-shrink-0 text-base">▸</span>
                  <span className="leading-relaxed">{h}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/10">{tag}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ITEMS_PER_PAGE = 4;

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { t } = useI18n();

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleSelect = useCallback((project: Project) => {
    setLoadingProject(project);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setSelectedProject(loadingProject);
    setLoadingProject(null);
  }, [loadingProject]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <>
      <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-x-hidden" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-14"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-3">{t("projects.label")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("projects.title1")} <span className="text-gradient">{t("projects.title2")}</span>
            </h2>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-6 sm:mb-8 md:mb-12"
          >
            {[t("projects.all"), ...projectCategories].map((cat) => {
              const catKey = cat === t("projects.all") ? "All" : cat;
              const isActive = activeCategory === catKey;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(catKey)}
                  className={`relative px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} isInView={isInView} onSelect={() => handleSelect(project)} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Show More / Show Less */}
          {filteredProjects.length > ITEMS_PER_PAGE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => {
                  if (hasMore) setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
                  else setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 rounded-lg transition-all duration-300"
              >
                {hasMore ? (
                  <>
                    {t("projects.showMore")}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    {t("projects.showLess")}
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>{loadingProject && <SamuraiLoader onComplete={handleLoaderComplete} />}</AnimatePresence>
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </>
  );
};

export default Projects;
