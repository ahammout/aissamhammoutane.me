import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Settings, Sun, Moon, Languages } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getArticleById } from "@/lib/articles";
import FallingLeaves from "@/components/FallingLeaves";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "next-themes";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
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

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const title = lang === "fr" ? article.titleFr : article.title;
  const content = lang === "fr" ? article.contentFr : article.content;

  return (
    <div className="min-h-screen bg-background relative">
      <FallingLeaves />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-xs sm:text-sm">{t("blog.backToArticles")}</span>
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
        <div className="max-w-3xl mx-auto">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <header className="mb-8 sm:mb-12">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                ))}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{title}</h1>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(article.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>
            </header>

            <div className="prose-article">
              <div className="space-y-4 sm:space-y-5 text-foreground/90 leading-relaxed">
                {content.split("\n").map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  
                  if (trimmed.startsWith("# ")) {
                    return <h1 key={index} className="font-display text-xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 mb-3 text-foreground">{trimmed.replace("# ", "")}</h1>;
                  }
                  if (trimmed.startsWith("## ")) {
                    return <h2 key={index} className="font-display text-lg sm:text-xl md:text-2xl font-semibold mt-6 sm:mt-8 mb-3 text-foreground">{trimmed.replace("## ", "")}</h2>;
                  }
                  
                  if (trimmed.startsWith("- **")) {
                    const match = trimmed.match(/- \*\*(.+?)\*\* - (.+)/);
                    if (match) {
                      return (
                        <div key={index} className="flex gap-2.5 ml-2 sm:ml-4">
                          <span className="text-primary">•</span>
                          <p className="text-sm sm:text-base">
                            <strong className="text-foreground">{match[1]}</strong>
                            <span className="text-muted-foreground"> · {match[2]}</span>
                          </p>
                        </div>
                      );
                    }
                  }
                  
                  const formattedParagraph = trimmed.replace(
                    /`([^`]+)`/g,
                    '<code class="px-1 py-0.5 rounded bg-secondary text-primary text-xs sm:text-sm font-mono">$1</code>'
                  );
                  
                  return <p key={index} className="text-sm sm:text-base text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
                })}
              </div>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
