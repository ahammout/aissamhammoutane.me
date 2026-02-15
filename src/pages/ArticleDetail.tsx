import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getArticleById } from "@/lib/articles";
import FallingLeaves from "@/components/FallingLeaves";
import ThemeToggle from "@/components/ThemeToggle";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <FallingLeaves />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Articles</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            </header>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                {article.content.split("\n").map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  
                  // Handle headers
                  if (trimmed.startsWith("# ")) {
                    return (
                      <h1 key={index} className="font-display text-3xl font-bold mt-8 mb-4 text-foreground">
                        {trimmed.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2 key={index} className="font-display text-2xl font-semibold mt-8 mb-4 text-foreground">
                        {trimmed.replace("## ", "")}
                      </h2>
                    );
                  }
                  
                  // Handle list items
                  if (trimmed.startsWith("- **")) {
                    const match = trimmed.match(/- \*\*(.+?)\*\* - (.+)/);
                    if (match) {
                      return (
                        <div key={index} className="flex gap-3 ml-4">
                          <span className="text-primary">•</span>
                          <p>
                            <strong className="text-foreground">{match[1]}</strong>
                            <span className="text-muted-foreground"> — {match[2]}</span>
                          </p>
                        </div>
                      );
                    }
                  }
                  
                  // Handle inline code
                  const formattedParagraph = trimmed.replace(
                    /`([^`]+)`/g,
                    '<code class="px-1.5 py-0.5 rounded bg-secondary text-primary text-sm font-mono">$1</code>'
                  );
                  
                  return (
                    <p
                      key={index}
                      className="text-foreground/80"
                      dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                    />
                  );
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
