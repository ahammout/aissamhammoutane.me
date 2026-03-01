import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import samuraiImg from "@/assets/samurai-404.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(var(--primary)/0.15) 40px, hsl(var(--primary)/0.15) 41px),
                            repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(var(--primary)/0.15) 40px, hsl(var(--primary)/0.15) 41px)`
        }}
      />

      {/* Subtle red mist */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      {/* Vertical Japanese decorative lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Samurai Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-8xl sm:text-9xl font-display font-black text-primary/20 tracking-tighter leading-none select-none">
            404
          </h1>
        </motion.div>

        {/* Poetic Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-wide">
            The path you seek does not exist
          </h2>
          <div className="max-w-md mx-auto">
            <p className="text-muted-foreground text-sm sm:text-base italic leading-relaxed font-serif">
              "Even the greatest warrior knows when the road has ended.
              <br />
              Turn back, regroup, and find your way once more."
            </p>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="my-8 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary border border-primary/30 rounded-none hover:bg-primary/10 transition-all duration-300 group"
          >
            <span className="w-4 h-px bg-primary/50 group-hover:w-6 transition-all duration-300" />
            Return Home
            <span className="w-4 h-px bg-primary/50 group-hover:w-6 transition-all duration-300" />
          </Link>
        </motion.div>

        {/* Bottom signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40"
        >
          Hammoutane Aissam
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
