import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useState, useCallback } from "react";
import { articles } from "@/lib/articles";
import FallingLeaves from "@/components/FallingLeaves";
import ThemeToggle from "@/components/ThemeToggle";
import ArticleTransition from "@/components/ArticleTransition";

const Blog = () => {
  const navigate = useNavigate();
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);

  const handleArticleClick = useCallback(
    (articleId: string) => {
      setLoadingArticleId(articleId);
      setTimeout(() => {
        navigate(`/blog/${articleId}`);
      }, 1200);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-background relative">
      <FallingLeaves />
      <ArticleTransition isActive={!!loadingArticleId} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Thoughts & Writings
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Articles</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Sharing insights from my journey in software development,
              architecture, and the art of building great products.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="space-y-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  onClick={() => handleArticleClick(article.id)}
                  className="group block p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <h2 className="font-display text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <ArrowLeft className="w-5 h-5 text-primary rotate-180" />
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
