import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Settings, Sun, Moon, Languages } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { articles } from "@/lib/articles";
import FallingLeaves from "@/components/FallingLeaves";
import ArticleTransition from "@/components/ArticleTransition";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";

const Blog = () => {
  const navigate = useNavigate();
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [settingsOpen]);

  const handleArticleClick = useCallback(
    (articleId: string) => {
      setLoadingArticleId(articleId);
      setTimeout(() => { navigate(`/blog/${articleId}`); }, 1200);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-background relative">
      <FallingLeaves />
      <ArticleTransition isActive={!!loadingArticleId} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-xs sm:text-sm">{t("blog.back")}</span>
          </Link>
          
          {/* Settings dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Settings className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${settingsOpen ? "rotate-90 text-primary" : "hover:text-foreground"}`} />
            </button>
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card border border-border shadow-xl p-2 space-y-1"
                >
                  <button
                    onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    {mounted && theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                    <Languages className="w-3.5 h-3.5 text-muted-foreground" />
                    <div className="flex items-center border border-border rounded-md overflow-hidden text-xs font-medium flex-1">
                      <button
                        onClick={() => setLang("en")}
                        className={`flex-1 px-2 py-1 transition-all duration-200 ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang("fr")}
                        className={`flex-1 px-2 py-1 transition-all duration-200 ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        FR
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-xs mb-3">{t("blog.label")}</p>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-3">
              {t("blog.title")} <span className="text-gradient">{t("blog.title2")}</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{t("blog.subtitle")}</p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {articles.map((article, index) => (
              <motion.article key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div onClick={() => handleArticleClick(article.id)} className="group block p-4 sm:p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h2 className="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                        {lang === "fr" ? article.titleFr : article.title}
                      </h2>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 leading-relaxed">{lang === "fr" ? article.excerptFr : article.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(article.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {article.tags.map((tag) => (
                          <span key={tag} className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
